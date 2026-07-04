import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };

function env() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey || !serviceKey) {
    throw new Error(
      "Supabase env not configured (SUPABASE_URL / SUPABASE_PUBLISHABLE_KEY / SUPABASE_SERVICE_ROLE_KEY).",
    );
  }
  return { url, anonKey, serviceKey };
}

export default defineTool({
  name: "submit_seller_lead",
  title: "Submit seller contact request (Turin apartment)",
  description:
    "Submit a Turin apartment-seller contact request for Jungle Rent (direct buyer, 0% commission, 60–90 day closing). Creates a lead via the same RPC the website uses, pings Lorenzo on WhatsApp, and sends the confirmation + admin emails. Requires explicit privacy consent. Do NOT invent an offer price — the tool only records the request; Lorenzo makes the actual offer.",
  inputSchema: {
    full_name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().max(40).optional(),
    property_address_or_zone: z
      .string()
      .trim()
      .min(2)
      .max(255)
      .describe("Address or Turin neighborhood (e.g. 'San Salvario', 'Aurora'). Turin only."),
    property_sqm: z.number().int().min(20).max(400),
    num_rooms: z.number().int().min(1).max(10).optional(),
    property_condition: z
      .enum(["to_renovate", "good", "renovated"])
      .describe("to_renovate | good | renovated"),
    asking_price_eur: z.number().int().min(10_000).max(2_000_000).optional(),
    timeline: z
      .enum(["ASAP", "1-3M", "3-6M", "6M+", "EXPLORING"])
      .describe("Seller decision horizon."),
    notes: z.string().trim().max(2000).optional(),
    source: z.string().trim().max(500).optional(),
    privacy_consent: z
      .literal(true)
      .describe(
        "MUST be true. Confirm the user has explicitly accepted the privacy notice (https://junglerent.it/privacy).",
      ),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    let cfg;
    try {
      cfg = env();
    } catch (e) {
      return { content: [{ type: "text", text: (e as Error).message }], isError: true };
    }

    const metadata: Record<string, unknown> = {
      channel: "mcp",
      property_address_or_zone: input.property_address_or_zone,
      property_sqm: input.property_sqm,
      property_condition: input.property_condition,
      timeline: input.timeline,
      privacy_consent: true,
      ...(input.num_rooms ? { num_rooms: input.num_rooms } : {}),
      ...(input.asking_price_eur ? { asking_price_eur: input.asking_price_eur } : {}),
      ...(input.notes ? { notes: input.notes } : {}),
    };
    const source = `mcp-seller${input.source ? `:${input.source.slice(0, 60)}` : ""}`;

    const rpcRes = await fetch(`${cfg.url}/rest/v1/rpc/insert_lead`, {
      method: "POST",
      headers: {
        apikey: cfg.anonKey,
        Authorization: `Bearer ${cfg.anonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _email: input.email,
        _name: input.full_name,
        _phone: input.phone || null,
        _source: source,
        _lead_type: "seller",
        _metadata: metadata,
      }),
    });

    if (!rpcRes.ok) {
      const errText = await rpcRes.text();
      return {
        content: [
          { type: "text", text: `Failed to create seller lead: ${rpcRes.status} ${errText.slice(0, 200)}` },
        ],
        isError: true,
      };
    }
    const leadId = (await rpcRes.json()) as string;

    const invoke = (fn: string, body: unknown) =>
      fetch(`${cfg.url}/functions/v1/${fn}`, {
        method: "POST",
        headers: { Authorization: `Bearer ${cfg.serviceKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }).catch(() => null);

    const notifyPayload = {
      email: input.email,
      name: input.full_name,
      phone: input.phone || null,
      source,
      leadType: "seller" as const,
      metadata,
    };

    await Promise.allSettled([
      invoke("notify-investor-whatsapp", notifyPayload),
      invoke("send-transactional-email", {
        templateName: "lead-notification",
        idempotencyKey: `mcp-seller-notify-${leadId}`,
        templateData: notifyPayload,
      }),
      invoke("send-transactional-email", {
        templateName: "lead-confirmation",
        recipientEmail: input.email,
        idempotencyKey: `mcp-seller-confirm-${leadId}`,
        templateData: { leadType: "seller" },
      }),
    ]);

    const result = {
      status: "sent",
      lead_id: leadId,
      lead_type: "seller",
      message_to_user:
        "Richiesta ricevuta. Lorenzo ti ricontatta entro 24h con una valutazione e, se in target, una proposta d'acquisto diretta (0% commissioni, closing 60–90 giorni). Per una risposta immediata, WhatsApp: https://wa.me/393319053037",
      whatsapp_deep_link: `https://wa.me/393319053037?text=${encodeURIComponent(
        `Ciao Lorenzo, sono ${input.full_name} (${input.email}). Ho un ${input.property_sqm} mq in ${input.property_address_or_zone}, condizione ${input.property_condition}, orizzonte ${input.timeline}.`,
      )}`,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
