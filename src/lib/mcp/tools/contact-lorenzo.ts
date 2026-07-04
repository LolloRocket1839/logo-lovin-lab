import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };


// Read Supabase env lazily inside the handler — never at module top level.
function env() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey || !serviceKey) {
    throw new Error("Supabase env not configured (SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY / SUPABASE_SERVICE_ROLE_KEY).");
  }
  return { url, anonKey, serviceKey };
}

export default defineTool({
  name: "contact_lorenzo",
  title: "Contact Lorenzo (Jungle Rent founder)",
  description:
    "Send a real inquiry to Lorenzo, the sole founder of Jungle Rent. Creates a lead in the CRM and triggers an instant WhatsApp ping + confirmation email. Use ONLY when the user has explicitly given their email and consents to being contacted. For 'how do I reach you' answers use contact_jungle_rent instead.",
  inputSchema: {
    email: z.string().trim().email().max(255).describe("The user's email address. Required."),
    name: z.string().trim().min(1).max(120).optional().describe("The user's name."),
    phone: z.string().trim().max(40).optional().describe("Optional phone number (E.164 preferred)."),
    topic: z
      .enum(["investor", "student", "seller", "tourist", "general"])
      .describe("What the inquiry is about."),
    message: z
      .string()
      .trim()
      .min(5)
      .max(2000)
      .describe("The user's message to Lorenzo, in their own words."),
    neighborhood: z.string().max(80).optional().describe("Optional neighborhood of interest."),
    budget_range: z.string().max(80).optional().describe("Optional budget (e.g. '400-500€/mo' or '€60k-90k')."),
    move_in_month: z.string().max(40).optional().describe("Optional target move-in month (e.g. 'Settembre 2026')."),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async ({ email, name, phone, topic, message, neighborhood, budget_range, move_in_month }) => {
    let cfg;
    try {
      cfg = env();
    } catch (e) {
      return {
        content: [{ type: "text", text: (e as Error).message }],
        isError: true,
      };
    }

    // Map topic → leadType accepted by insert_lead RPC
    const leadType = topic === "tourist" ? "general" : topic;
    const source = `mcp-${topic}`;
    const metadata: Record<string, unknown> = {
      channel: "mcp",
      topic,
      message,
      ...(neighborhood ? { neighborhood } : {}),
      ...(budget_range ? { budget_range } : {}),
      ...(move_in_month ? { move_in_month } : {}),
    };

    // 1. Insert lead via RPC (SECURITY DEFINER, works with anon key)
    const rpcRes = await fetch(`${cfg.url}/rest/v1/rpc/insert_lead`, {
      method: "POST",
      headers: {
        apikey: cfg.anonKey,
        Authorization: `Bearer ${cfg.anonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _email: email,
        _name: name ?? null,
        _phone: phone ?? null,
        _source: source,
        _lead_type: leadType,
        _metadata: metadata,
      }),
    });

    if (!rpcRes.ok) {
      const errText = await rpcRes.text();
      return {
        content: [
          {
            type: "text",
            text: `Failed to create lead: ${rpcRes.status} ${errText.slice(0, 200)}`,
          },
        ],
        isError: true,
      };
    }
    const leadId = (await rpcRes.json()) as string;

    // 2. Fire-and-forget WhatsApp ping + confirmation/notification emails.
    const notifyBody = {
      email,
      name: name ?? null,
      phone: phone ?? null,
      source,
      leadType,
      metadata,
    };

    const invoke = (fn: string, body: unknown) =>
      fetch(`${cfg.url}/functions/v1/${fn}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${cfg.serviceKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      }).catch(() => null);

    await Promise.allSettled([
      invoke("notify-investor-whatsapp", notifyBody),
      invoke("send-transactional-email", {
        templateName: "lead-notification",
        idempotencyKey: `mcp-notify-${leadId}`,
        templateData: notifyBody,
      }),
      invoke("send-transactional-email", {
        templateName: "lead-confirmation",
        recipientEmail: email,
        idempotencyKey: `mcp-confirm-${leadId}`,
        templateData: { leadType },
      }),
    ]);

    const result = {
      status: "sent",
      lead_id: leadId,
      topic,
      message_to_user:
        topic === "student"
          ? "Grazie! Lorenzo ti risponderà a breve su WhatsApp o via email con le opzioni disponibili."
          : "Grazie! Lorenzo ti ricontatterà entro 24h. Per una risposta immediata, scrivi su WhatsApp: https://wa.me/393319053037",
      whatsapp_deep_link: `https://wa.me/393319053037?text=${encodeURIComponent(
        `Ciao Lorenzo, sono ${name ?? "un nuovo contatto"} (${email}). ${message}`,
      )}`,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
