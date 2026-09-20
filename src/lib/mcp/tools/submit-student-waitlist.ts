import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

declare const process: { env: Record<string, string | undefined> };

function env() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_PUBLISHABLE_KEY ?? process.env.SUPABASE_ANON_KEY;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !anonKey || !serviceKey) {
    throw new Error("Supabase env not configured.");
  }
  return { url, anonKey, serviceKey };
}

export default defineTool({
  name: "submit_student_waitlist",
  title: "Join student housing waitlist (Turin)",
  description:
    "Add a student to Jungle Rent's Turin student-housing waitlist. Rooms are allocated manually by Lorenzo (no live inventory). Creates a lead, pings Lorenzo, and sends confirmation email. Requires explicit privacy consent. Do NOT promise a specific room, price, or move-in date.",
  inputSchema: {
    full_name: z.string().trim().min(2).max(100),
    email: z.string().trim().email().max(255),
    phone: z.string().trim().max(40).optional(),
    move_in: z
      .string()
      .trim()
      .max(20)
      .describe("Target move-in month in YYYY-MM format, e.g. '2026-09'."),
    budget: z
      .enum(["fino-350", "350-450", "450-550", "oltre-550"])
      .describe("Maximum monthly budget bracket in EUR."),
    zones: z
      .array(
        z.enum([
          "lingotto-nizza-millefonti",
          "san-salvario",
          "vanchiglia",
          "crocetta",
          "aurora",
          "cenisia-san-paolo",
          "santa-rita",
          "centro",
          "indifferente",
        ]),
      )
      .max(9)
      .optional()
      .describe("Preferred Turin areas."),
    room_type: z
      .enum(["singola", "doppia", "posto-letto"])
      .describe("singola | doppia | posto-letto"),
    university: z.string().trim().max(120).optional(),
    lang: z.enum(["it", "en"]).optional(),
    privacy_consent: z.literal(true),
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
      zones: input.zones ?? [],
      room_type: input.room_type,
      budget: input.budget,
      move_in: input.move_in,
      university: input.university ?? null,
      lang: input.lang ?? "it",
      channel: "mcp",
      privacy_consent: true,
    };
    const source = "mcp-student";

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
        _lead_type: "student",
        _metadata: metadata,
      }),
    });

    if (!rpcRes.ok) {
      const errText = await rpcRes.text();
      return {
        content: [
          { type: "text", text: `Failed to create student lead: ${rpcRes.status} ${errText.slice(0, 200)}` },
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
      leadType: "student" as const,
      metadata,
    };

    await Promise.allSettled([
      invoke("notify-investor-whatsapp", notifyPayload),
      invoke("send-transactional-email", {
        templateName: "lead-notification",
        idempotencyKey: `mcp-student-notify-${leadId}`,
        templateData: notifyPayload,
      }),
      invoke("send-transactional-email", {
        templateName: "lead-confirmation",
        recipientEmail: input.email,
        idempotencyKey: `mcp-student-confirm-${leadId}`,
        templateData: { leadType: "student" },
      }),
    ]);

    const result = {
      status: "sent",
      lead_id: leadId,
      lead_type: "student",
      message_to_user:
        "Sei in lista. Lorenzo ti scrive appena si libera qualcosa che matcha (zona, budget, tipo camera). Per parlargli direttamente: https://wa.me/393319053037",
      whatsapp_deep_link: `https://wa.me/393319053037?text=${encodeURIComponent(
        `Ciao Lorenzo, sono ${input.full_name} (${input.email}). Cerco ${input.room_type} a Torino da ${input.move_in}.`,
      )}`,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
