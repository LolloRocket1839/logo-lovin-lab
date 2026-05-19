import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAILS = ["lorenzo.onijoseph@gmail.com"];

const VALID_STATUS = ["nuovo", "contattato", "qualificato", "proposta", "vinto", "perso", "nurturing"];
const VALID_PRIORITY = ["low", "medium", "high"];
const VALID_KIND = ["note", "call", "whatsapp", "email", "meeting", "status_change", "followup"];
const VALID_DIRECTION = ["inbound", "outbound", "system"];

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
    const adminEmail = user.email!;
    const admin = createClient(supabaseUrl, serviceKey);

    const body = await req.json().catch(() => ({}));
    const action = body?.action ?? "list";

    if (action === "list") {
      const { data: leads, error } = await admin
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(1000);
      if (error) throw error;

      // attach interaction counts
      const ids = (leads ?? []).map((l: any) => l.id);
      let counts: Record<string, number> = {};
      if (ids.length) {
        const { data: ints } = await admin
          .from("lead_interactions")
          .select("lead_id")
          .in("lead_id", ids);
        for (const row of ints ?? []) {
          counts[(row as any).lead_id] = (counts[(row as any).lead_id] ?? 0) + 1;
        }
      }
      const withCounts = (leads ?? []).map((l: any) => ({
        ...l,
        interactions_count: counts[l.id] ?? 0,
      }));
      return json({ leads: withCounts });
    }

    if (action === "get_detail") {
      const leadId = body?.lead_id;
      if (!leadId) return json({ error: "lead_id required" }, 400);
      const { data: lead, error: e1 } = await admin
        .from("leads")
        .select("*")
        .eq("id", leadId)
        .single();
      if (e1) throw e1;
      const { data: interactions, error: e2 } = await admin
        .from("lead_interactions")
        .select("*")
        .eq("lead_id", leadId)
        .order("created_at", { ascending: false });
      if (e2) throw e2;
      return json({ lead, interactions: interactions ?? [] });
    }

    if (action === "update_lead") {
      const leadId = body?.lead_id;
      const patch = body?.patch ?? {};
      if (!leadId) return json({ error: "lead_id required" }, 400);

      const allowed: Record<string, unknown> = {};
      if (patch.status !== undefined) {
        if (!VALID_STATUS.includes(patch.status)) return json({ error: "invalid status" }, 400);
        allowed.status = patch.status;
      }
      if (patch.priority !== undefined) {
        if (!VALID_PRIORITY.includes(patch.priority)) return json({ error: "invalid priority" }, 400);
        allowed.priority = patch.priority;
      }
      if (patch.assigned_to !== undefined) allowed.assigned_to = patch.assigned_to;
      if (patch.next_followup_at !== undefined) allowed.next_followup_at = patch.next_followup_at;
      if (patch.internal_notes !== undefined) allowed.internal_notes = patch.internal_notes;
      if (patch.last_contact_at !== undefined) allowed.last_contact_at = patch.last_contact_at;

      // Fetch previous status if we're changing it
      let prevStatus: string | null = null;
      if (allowed.status !== undefined) {
        const { data: prev } = await admin.from("leads").select("status").eq("id", leadId).single();
        prevStatus = (prev as any)?.status ?? null;
      }

      const { data: updated, error } = await admin
        .from("leads")
        .update(allowed)
        .eq("id", leadId)
        .select()
        .single();
      if (error) throw error;

      if (allowed.status !== undefined && prevStatus !== allowed.status) {
        await admin.from("lead_interactions").insert({
          lead_id: leadId,
          kind: "status_change",
          direction: "system",
          content: `${prevStatus ?? "—"} → ${allowed.status}`,
          created_by: adminEmail,
        });
      }
      return json({ lead: updated });
    }

    if (action === "add_interaction") {
      const leadId = body?.lead_id;
      const kind = body?.kind;
      const direction = body?.direction ?? "outbound";
      const content = body?.content ?? null;
      const metadata = body?.metadata ?? {};
      if (!leadId) return json({ error: "lead_id required" }, 400);
      if (!VALID_KIND.includes(kind)) return json({ error: "invalid kind" }, 400);
      if (!VALID_DIRECTION.includes(direction)) return json({ error: "invalid direction" }, 400);

      const { data: inserted, error } = await admin
        .from("lead_interactions")
        .insert({ lead_id: leadId, kind, direction, content, metadata, created_by: adminEmail })
        .select()
        .single();
      if (error) throw error;

      if (["call", "whatsapp", "email", "meeting"].includes(kind)) {
        await admin
          .from("leads")
          .update({ last_contact_at: new Date().toISOString() })
          .eq("id", leadId);
        // bump status from 'nuovo' to 'contattato' automatically
        const { data: cur } = await admin.from("leads").select("status").eq("id", leadId).single();
        if ((cur as any)?.status === "nuovo") {
          await admin.from("leads").update({ status: "contattato" }).eq("id", leadId);
        }
      }
      return json({ interaction: inserted });
    }

    if (action === "bulk_update_status") {
      const ids: string[] = body?.lead_ids ?? [];
      const status = body?.status;
      if (!Array.isArray(ids) || ids.length === 0) return json({ error: "lead_ids required" }, 400);
      if (!VALID_STATUS.includes(status)) return json({ error: "invalid status" }, 400);
      const { error } = await admin.from("leads").update({ status }).in("id", ids);
      if (error) throw error;
      // log system interactions
      const rows = ids.map((id) => ({
        lead_id: id,
        kind: "status_change",
        direction: "system" as const,
        content: `bulk → ${status}`,
        created_by: adminEmail,
      }));
      await admin.from("lead_interactions").insert(rows);
      return json({ updated: ids.length });
    }

    return json({ error: "unknown action" }, 400);
  } catch (err) {
    return json({ error: (err as Error).message }, 500);
  }
});
