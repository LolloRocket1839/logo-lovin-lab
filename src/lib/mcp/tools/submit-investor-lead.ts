import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { investorLeadSchema } from "../../validation/investorLead";

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
  name: "submit_investor_lead",
  title: "Submit investor contact request",
  description:
    "Submit a qualified investor contact request for Jungle Rent (Turin real-estate). Validated with the same schema the website uses. Creates a lead, pings Lorenzo on WhatsApp, and sends the investor confirmation + admin notification emails. IMPORTANT: only call after the user has explicitly (a) given consent to be contacted and receive the privacy notice, and (b) declared they requested this information on their own initiative — both are legally required (CONSOB/AGCM). Do NOT invent yield or return figures; those live only in the private memorandum.",
  inputSchema: {
    full_name: z.string().trim().min(2).max(100).describe("Investor's full name (first + last)."),
    email: z.string().trim().email().max(255).describe("Investor's email."),
    phone: z.string().trim().max(40).optional().describe("Phone in E.164 preferred (optional)."),
    tax_residence: z
      .enum(["IT", "CH", "EU", "OTHER"])
      .describe("Tax residence — IT, CH, EU, or OTHER."),
    ticket_range: z
      .enum(["5-10", "10-20", "20-50", "50+", "TBD"])
      .describe("Indicative ticket size in €k: 5-10, 10-20, 20-50, 50+, or TBD if unclear."),
    horizon: z
      .enum(["WEEKS", "1-3M", "3-6M", "6M+"])
      .describe("Decision horizon: WEEKS, 1-3M, 3-6M, or 6M+."),
    prev_experience: z
      .enum(["YES", "NO", "PARTIAL"])
      .describe("Prior real-estate investment experience: YES, NO, PARTIAL."),
    notes: z
      .string()
      .trim()
      .max(2000)
      .optional()
      .describe("Optional free-form notes from the investor."),
    source: z
      .string()
      .trim()
      .max(500)
      .optional()
      .describe("Where the lead came from (assistant/model name, referrer, etc.)."),
    privacy_consent: z
      .literal(true)
      .describe(
        "MUST be true. Confirm the user has explicitly consented to the privacy notice (https://junglerent.it/privacy) before setting this.",
      ),
    own_initiative_declaration: z
      .literal(true)
      .describe(
        "MUST be true. Confirm the user has explicitly declared they are requesting these Jungle Rent investor materials on their own initiative (CONSOB/AGCM requirement).",
      ),
  },
  annotations: {
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
  },
  handler: async (input) => {
    // Re-validate with the exact website schema for parity.
    const parsed = investorLeadSchema.safeParse({
      fullName: input.full_name,
      email: input.email,
      phone: input.phone ?? "",
      taxResidence: input.tax_residence,
      ticketRange: input.ticket_range,
      horizon: input.horizon,
      prevExperience: input.prev_experience,
      source: input.source ?? "",
      notes: input.notes ?? "",
      privacyConsent: input.privacy_consent,
      ownInitiativeDeclaration: input.own_initiative_declaration,
      website: "",
    });

    if (!parsed.success) {
      return {
        content: [
          {
            type: "text",
            text: `Validation failed: ${JSON.stringify(parsed.error.flatten().fieldErrors)}`,
          },
        ],
        isError: true,
      };
    }
    const data = parsed.data;

    let cfg;
    try {
      cfg = env();
    } catch (e) {
      return {
        content: [{ type: "text", text: (e as Error).message }],
        isError: true,
      };
    }

    const metadata: Record<string, unknown> = {
      channel: "mcp",
      tax_residence: data.taxResidence,
      ticket: data.ticketRange,
      ticket_range: data.ticketRange,
      horizon: data.horizon,
      prev_experience: data.prevExperience,
      privacy_consent: true,
      own_initiative_declaration: true,
      ...(data.notes ? { notes: data.notes } : {}),
    };
    const source = `mcp-investor${data.source ? `:${data.source.slice(0, 60)}` : ""}`;

    // 1. Insert lead via SECURITY DEFINER RPC (same call path as the website form)
    const rpcRes = await fetch(`${cfg.url}/rest/v1/rpc/insert_lead`, {
      method: "POST",
      headers: {
        apikey: cfg.anonKey,
        Authorization: `Bearer ${cfg.anonKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _email: data.email,
        _name: data.fullName,
        _phone: data.phone || null,
        _source: source,
        _lead_type: "investor",
        _metadata: metadata,
      }),
    });

    if (!rpcRes.ok) {
      const errText = await rpcRes.text();
      return {
        content: [
          {
            type: "text",
            text: `Failed to create investor lead: ${rpcRes.status} ${errText.slice(0, 200)}`,
          },
        ],
        isError: true,
      };
    }
    const leadId = (await rpcRes.json()) as string;

    // 2. Fire notifications (WhatsApp + emails) in parallel; don't fail the tool if any single one errors.
    const notifyPayload = {
      email: data.email,
      name: data.fullName,
      phone: data.phone || null,
      source,
      leadType: "investor" as const,
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
      invoke("notify-investor-whatsapp", notifyPayload),
      invoke("send-transactional-email", {
        templateName: "lead-notification",
        idempotencyKey: `mcp-investor-notify-${leadId}`,
        templateData: notifyPayload,
      }),
      invoke("send-transactional-email", {
        templateName: "lead-confirmation",
        recipientEmail: data.email,
        idempotencyKey: `mcp-investor-confirm-${leadId}`,
        templateData: { leadType: "investor" },
      }),
    ]);

    const result = {
      status: "sent",
      lead_id: leadId,
      lead_type: "investor",
      ticket_range: data.ticketRange,
      horizon: data.horizon,
      message_to_user:
        "Richiesta ricevuta. Lorenzo (unico founder di Jungle Rent) ti ricontatterà entro 24h con il memorandum informativo. Per una risposta immediata, WhatsApp: https://wa.me/393319053037",
      whatsapp_deep_link: `https://wa.me/393319053037?text=${encodeURIComponent(
        `Ciao Lorenzo, sono ${data.fullName} (${data.email}). Ho appena inviato una richiesta informazioni investitore (${data.ticketRange}, ${data.horizon}).`,
      )}`,
      compliance_note:
        "This request was submitted with explicit privacy consent and own-initiative declaration, as required by CONSOB/AGCM. No yield/return figures were communicated on public surfaces.",
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
