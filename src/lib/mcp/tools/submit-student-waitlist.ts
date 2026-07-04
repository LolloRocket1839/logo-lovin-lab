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
    target_move_in: z
      .string()
      .trim()
      .max(20)
      .describe("Approximate move-in month, e.g. '2026-09' or 'flexible'."),
    budget_eur_per_month: z.number().int().min(200).max(2000).optional(),
    preferred_zones: z
      .array(z.string().trim().max(60))
      .max(5)
      .optional()
      .describe("Turin neighborhoods, e.g. ['san_salvario','vanchiglia']."),
    room_type: z
      .enum(["single", "double", "studio", "any"])
      .describe("single | double | studio | any"),
    university_or_program: z.string().trim().max(200).optional(),
    notes: z.string().trim().max(2000).optional(),
    source: z.string().trim().max(500).optional(),
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
      channel: "mcp",
      target_move_in: input.target_move_in,
      room_type: input.room_type,
      privacy_consent: true,
      ...(input.budget_eur_per_month ? { budget_eur_per_month: input.budget_eur_per_month } : {}),
      ...(input.preferred_zones?.length ? { preferred_zones: input.preferred_zones } : {}),
      ...(input.university_or_program ? { university_or_program: input.university_or_program } : {}),
      ...(input.notes ? { notes: input.notes } : {}),
    };
    const source = `mcp-student${input.source ? `:${input.source.slice(0, 60)}` : ""}`;

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
        `Ciao Lorenzo, sono ${input.full_name} (${input.email}). Cerco ${input.room_type} a Torino da ${input.target_move_in}.`,
      )}`,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
