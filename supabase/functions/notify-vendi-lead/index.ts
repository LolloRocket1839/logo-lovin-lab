import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.57.4";
import { sendAndLogTemplateEmail } from "../_shared/transactional-email-templates/send-and-log.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json", ...corsHeaders },
  });

const conditionLabels: Record<string, string> = {
  abitabile: "Abitabile",
  da_ristrutturare: "Da ristrutturare",
  da_rifare: "Da rifare",
};

const situationLabels: Record<string, string> = {
  eredita: "Eredità",
  inquilino: "Con inquilino",
  da_ristrutturare: "Da ristrutturare",
  nessuna: "Nessuna particolarità",
  altro: "Altro",
};

const tenantLabels: Record<string, string> = {
  libero: "Libero",
  inquilino_scadenza: "Inquilino con scadenza",
  inquilino_indeterminato: "Inquilino a tempo indeterminato",
};

serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceKey) return json({ error: "Server configuration error" }, 500);

  let leadId: string;
  try {
    const body = await req.json();
    leadId = String(body?.leadId ?? "");
  } catch {
    return json({ error: "Invalid JSON" }, 400);
  }

  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(leadId)) {
    return json({ error: "Invalid leadId" }, 400);
  }

  const admin = createClient(supabaseUrl, serviceKey);

  // The lead must exist, come from /vendi, carry consent and be recent.
  const { data: lead, error } = await admin
    .from("seller_leads")
    .select("*")
    .eq("id", leadId)
    .eq("source", "vendi")
    .eq("privacy_consent", true)
    .gte("created_at", new Date(Date.now() - 10 * 60 * 1000).toISOString())
    .maybeSingle();

  if (error) {
    console.error("Lead lookup failed");
    return json({ error: "Lookup failed" }, 500);
  }
  if (!lead) return json({ error: "Lead not found" }, 404);

  const utm = (lead.utm_data ?? {}) as Record<string, string>;
  const photoCount = Array.isArray(lead.photos) ? lead.photos.length : 0;

  const send = async (
    templateName: string,
    recipientEmail: string | undefined,
    templateData: Record<string, unknown>,
  ) => {
    try {
      const result = await sendAndLogTemplateEmail(templateName, recipientEmail ?? "", {
        templateData,
        idempotencyKey: `${templateName}-${leadId}`,
      });
      return result.sent;
    } catch (err) {
      console.error(`Send failed for ${templateName}`, {
        message: err instanceof Error ? err.message : "unknown",
      });
      return false;
    }
  };

  const notified = await send("vendi-notification", undefined, {
    name: lead.name ?? undefined,
    email: lead.email ?? undefined,
    phone: lead.phone ? `${lead.phone} (contatto primario)` : undefined,
    address: lead.property_address ?? undefined,
    sqm: lead.property_sqm ? String(lead.property_sqm) : undefined,
    floor: lead.floor ?? undefined,
    hasElevator: lead.has_elevator === null ? undefined : lead.has_elevator ? "Sì" : "No",
    condition: conditionLabels[lead.property_condition ?? ""] ?? lead.property_condition ?? undefined,
    situation: situationLabels[lead.situation ?? ""] ?? lead.situation ?? undefined,
    tenantStatus: tenantLabels[lead.tenant_status ?? ""] ?? undefined,
    tenantLeaseEnd: lead.tenant_lease_end ?? undefined,
    askingPrice: lead.asking_price ? `${Number(lead.asking_price).toLocaleString("it-IT")} €` : undefined,
    message: lead.message ?? undefined,
    photoCount: photoCount ? String(photoCount) : undefined,
    utmSource: utm.utm_source,
    utmMedium: utm.utm_medium,
    utmCampaign: utm.utm_campaign,
    fbclid: utm.fbclid,
  });

  // Se il venditore ha lasciato solo il telefono, non c'e' conferma da inviare.
  const confirmed = lead.email
    ? await send("vendi-confirmation", lead.email, {
        address: lead.property_address ?? undefined,
      })
    : false;

  return json({ notified, confirmed });
});
