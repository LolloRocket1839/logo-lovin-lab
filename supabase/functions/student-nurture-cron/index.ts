// Daily drip for student waitlist leads (Nizza Millefonti / Molinette pipeline).
// Scans leads.lead_type='student' AND source LIKE 'nizza-millefonti%',
// sends day2 and day10 follow-up emails via send-transactional-email.
// Idempotency: checks lead_interactions for a prior 'email' interaction
// with metadata.template = <template-name> before sending.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

interface DripStep {
  template: string;
  minDays: number;
  maxDays: number;
}

const STEPS: DripStep[] = [
  { template: "student-nurture-day2", minDays: 2, maxDays: 4 },
  { template: "student-nurture-day10", minDays: 10, maxDays: 14 },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const cronSecret = Deno.env.get("CRON_SECRET");
  const provided = req.headers.get("x-cron-secret") ?? "";
  if (!cronSecret || provided !== cronSecret) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(supabaseUrl, serviceKey);

  const now = Date.now();
  const lookbackDays = 21;
  const since = new Date(now - lookbackDays * 86400_000).toISOString();

  const { data: leads, error } = await admin
    .from("leads")
    .select("id,email,name,source,status,created_at,metadata")
    .eq("lead_type", "student")
    .ilike("source", "nizza-millefonti%")
    .gte("created_at", since)
    .not("status", "in", "(vinto,perso)")
    .limit(500);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const results: Array<{ leadId: string; template: string; ok: boolean; err?: string }> = [];

  for (const lead of leads ?? []) {
    const ageDays = (now - new Date(lead.created_at).getTime()) / 86400_000;
    for (const step of STEPS) {
      if (ageDays < step.minDays || ageDays > step.maxDays) continue;

      // Idempotency check
      const { data: existing } = await admin
        .from("lead_interactions")
        .select("id")
        .eq("lead_id", lead.id)
        .eq("kind", "email")
        .contains("metadata", { template: step.template })
        .limit(1);
      if (existing && existing.length > 0) continue;

      // Check suppression
      const { data: supp } = await admin
        .from("suppressed_emails")
        .select("email")
        .eq("email", lead.email)
        .limit(1);
      if (supp && supp.length > 0) continue;

      const meta = (lead.metadata ?? {}) as Record<string, unknown>;
      try {
        const { error: sendErr } = await admin.functions.invoke(
          "send-transactional-email",
          {
            body: {
              templateName: step.template,
              recipientEmail: lead.email,
              idempotencyKey: `${step.template}-${lead.id}`,
              templateData: {
                name: lead.name ?? undefined,
                targetAudience: meta.target_audience ?? undefined,
                moveInMonth: meta.move_in_month ?? undefined,
              },
            },
          },
        );
        if (sendErr) throw sendErr;

        await admin.from("lead_interactions").insert({
          lead_id: lead.id,
          kind: "email",
          direction: "outbound",
          content: `Drip auto: ${step.template}`,
          metadata: { template: step.template, automated: true },
          created_by: "student-nurture-cron",
        });
        results.push({ leadId: lead.id, template: step.template, ok: true });
      } catch (err) {
        results.push({
          leadId: lead.id,
          template: step.template,
          ok: false,
          err: err instanceof Error ? err.message : String(err),
        });
      }
    }
  }

  return new Response(
    JSON.stringify({ processed: leads?.length ?? 0, sent: results }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
