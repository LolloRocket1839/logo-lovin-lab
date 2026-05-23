// Admin Radar API — list / update / mark-contacted / convert-to-lead
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAILS = ["lorenzo.onijoseph@gmail.com"];

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: { user }, error: userError } = await userClient.auth.getUser();
    if (userError || !user || !ADMIN_EMAILS.includes(user.email ?? "")) {
      return json({ error: "Forbidden" }, 403);
    }
    const admin = createClient(supabaseUrl, serviceKey);

    const body = await req.json().catch(() => ({}));
    const action = body?.action ?? "list";

    if (action === "list") {
      const { data, error } = await admin
        .from("property_listings")
        .select("*")
        .order("lead_score", { ascending: false })
        .order("first_seen_at", { ascending: false })
        .limit(500);
      if (error) throw error;

      const { data: templates } = await admin
        .from("outreach_templates")
        .select("*")
        .eq("is_active", true);

      const { data: log } = await admin
        .from("radar_fetch_log")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      return json({ listings: data ?? [], templates: templates ?? [], log: log ?? [] });
    }

    if (action === "mark_contacted") {
      const { listing_id, note } = body;
      if (!listing_id) return json({ error: "listing_id required" }, 400);
      const { error } = await admin
        .from("property_listings")
        .update({ contacted_at: new Date().toISOString(), contact_notes: note ?? null })
        .eq("id", listing_id);
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "update") {
      const { listing_id, patch } = body;
      if (!listing_id || !patch) return json({ error: "listing_id + patch required" }, 400);
      const allowed: Record<string, unknown> = {};
      for (const k of ["status", "contact_notes", "lead_score"]) {
        if (k in patch) allowed[k] = patch[k];
      }
      const { error } = await admin
        .from("property_listings")
        .update(allowed)
        .eq("id", listing_id);
      if (error) throw error;
      return json({ ok: true });
    }

    if (action === "convert_to_lead") {
      const { listing_id, email, name, phone, notes } = body;
      if (!listing_id || !email) return json({ error: "listing_id + email required" }, 400);
      const { data: listing, error: e1 } = await admin
        .from("property_listings")
        .select("*")
        .eq("id", listing_id)
        .single();
      if (e1) throw e1;

      const source = `radar-${listing.portal}-priv`;
      const priority = listing.lead_score >= 60 ? "high" : "medium";
      const { data: leadId, error: e2 } = await admin.rpc("insert_lead", {
        _email: email,
        _name: name ?? null,
        _phone: phone ?? null,
        _source: source,
        _lead_type: "seller",
        _metadata: {
          listing_url: listing.url,
          listing_zone: listing.zone,
          listing_price: listing.price_eur,
          listing_sqm: listing.sqm,
          listing_title: listing.title,
          notes: notes ?? null,
        },
      });
      if (e2) throw e2;

      await admin
        .from("leads")
        .update({ priority })
        .eq("id", leadId);

      await admin
        .from("property_listings")
        .update({ converted_lead_id: leadId, contacted_at: new Date().toISOString() })
        .eq("id", listing_id);

      return json({ ok: true, lead_id: leadId });
    }

    if (action === "trigger_scan") {
      // Fire-and-forget call to the cron function
      const url = `${supabaseUrl}/functions/v1/property-radar-cron`;
      fetch(url, {
        method: "POST",
        headers: { Authorization: `Bearer ${serviceKey}`, "Content-Type": "application/json" },
        body: "{}",
      }).catch(() => {});
      return json({ ok: true, triggered: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
});
