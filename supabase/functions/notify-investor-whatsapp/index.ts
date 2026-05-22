// Fire-and-forget WhatsApp alert to Lorenzo when a new investor lead arrives.
// Provider: CallMeBot (free). Set secrets:
//   - WHATSAPP_NOTIFY_NUMBER  (E.164, e.g. +393319053037, no spaces)
//   - CALLMEBOT_API_KEY       (token from callmebot.com/whatsapp.php)
import { z } from "https://deno.land/x/zod@v3.23.8/mod.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const BodySchema = z.object({
  email: z.string().trim().email().max(255),
  name: z.string().trim().max(120).optional().nullable(),
  phone: z.string().trim().max(40).optional().nullable(),
  source: z.string().trim().max(120).default("unknown"),
  leadType: z.enum(["investor", "seller", "student", "general"]),
  metadata: z.record(z.unknown()).optional().nullable(),
  utmSource: z.string().trim().max(120).optional().nullable(),
  utmMedium: z.string().trim().max(120).optional().nullable(),
  utmCampaign: z.string().trim().max(120).optional().nullable(),
});

const HEADER: Record<string, string> = {
  investor: "🌴 Nuovo lead INVESTITORE Jungle Rent",
  seller: "🏠 Nuovo lead VENDITORE Jungle Rent",
  student: "🎓 Nuovo lead STUDENTE Jungle Rent",
  general: "📨 Nuovo lead Jungle Rent",
};

function buildMessage(p: z.infer<typeof BodySchema>): string {
  const lines = [HEADER[p.leadType] ?? HEADER.general, "", `📧 ${p.email}`];
  if (p.name) lines.push(`👤 ${p.name}`);
  if (p.phone) lines.push(`📱 ${p.phone}`);
  lines.push(`📍 Fonte: ${p.source}`);
  const m = (p.metadata ?? {}) as Record<string, unknown>;
  const ticket = m.ticket || m.ticket_size;
  if (ticket) lines.push(`💶 Ticket: ${ticket}`);
  if (m.country) lines.push(`🌍 Country: ${m.country}`);
  if (m.target_audience) lines.push(`🩺 Profilo: ${m.target_audience}`);
  if (m.move_in_month) lines.push(`📅 Move-in: ${m.move_in_month}`);
  if (m.budget_range) lines.push(`💰 Budget: ${m.budget_range}`);
  if (p.utmSource || p.utmCampaign) {
    lines.push(
      `🎯 UTM: ${p.utmSource || "-"} / ${p.utmMedium || "-"} / ${p.utmCampaign || "-"}`,
    );
  }
  lines.push("");
  lines.push(`↪️ Rispondi: mailto:${p.email}`);
  return lines.join("\n");
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid JSON" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const parsed = BodySchema.safeParse(payload);
  if (!parsed.success) {
    return new Response(
      JSON.stringify({ error: parsed.error.flatten().fieldErrors }),
      {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
  const data = parsed.data;

  const phone = (Deno.env.get("WHATSAPP_NOTIFY_NUMBER") || "").replace(
    /[^\d]/g,
    "",
  );
  const apiKey = Deno.env.get("CALLMEBOT_API_KEY") || "";

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(supabaseUrl, serviceKey);

  if (!phone || !apiKey) {
    await admin.from("email_send_log").insert({
      template_name: "whatsapp-admin-alert",
      recipient_email: data.email,
      status: "failed",
      error_message: "Missing WHATSAPP_NOTIFY_NUMBER or CALLMEBOT_API_KEY",
      metadata: { source: data.source, leadType: data.leadType },
    });
    return new Response(
      JSON.stringify({ ok: false, error: "whatsapp_not_configured" }),
      {
        status: 200, // fire-and-forget: don't break the caller
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  const message = buildMessage(data);
  const url =
    `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(apiKey)}`;

  let status: "sent" | "failed" = "sent";
  let errorMessage: string | null = null;
  try {
    const resp = await fetch(url, { method: "GET" });
    const text = await resp.text();
    if (!resp.ok || /error|invalid|not received/i.test(text)) {
      status = "failed";
      errorMessage = `HTTP ${resp.status}: ${text.slice(0, 300)}`;
    }
  } catch (err) {
    status = "failed";
    errorMessage = err instanceof Error ? err.message : String(err);
  }

  await admin.from("email_send_log").insert({
    template_name: "whatsapp-admin-alert",
    recipient_email: data.email,
    status,
    error_message: errorMessage,
    metadata: {
      source: data.source,
      leadType: data.leadType,
      utm_source: data.utmSource ?? null,
      utm_campaign: data.utmCampaign ?? null,
    },
  });

  return new Response(JSON.stringify({ ok: status === "sent" }), {
    status: 200,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
