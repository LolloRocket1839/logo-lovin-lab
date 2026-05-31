// Gmail inbox parser — reads unread, classifies via Lovable AI, creates leads, notifies Lorenzo.
// Runs via pg_cron every 10 minutes. Auth: CRON_SECRET via x-cron-secret header.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-cron-secret",
};

const GATEWAY = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";
const AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

function json(b: unknown, s = 200) {
  return new Response(JSON.stringify(b), { status: s, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

async function gmailFetch(path: string, init: RequestInit = {}) {
  const r = await fetch(`${GATEWAY}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
      "X-Connection-Api-Key": Deno.env.get("GOOGLE_MAIL_API_KEY")!,
      ...(init.headers || {}),
    },
  });
  if (!r.ok) throw new Error(`Gmail ${path} ${r.status}: ${await r.text()}`);
  return r.json();
}

function getHeader(headers: any[], name: string): string {
  const h = headers?.find((x) => x.name?.toLowerCase() === name.toLowerCase());
  return h?.value ?? "";
}

function parseSender(from: string): { email: string; name: string } {
  const m = from.match(/^(.*?)\s*<([^>]+)>$/);
  if (m) return { name: m[1].replace(/"/g, "").trim(), email: m[2].trim().toLowerCase() };
  return { name: "", email: from.trim().toLowerCase() };
}

interface Classification {
  category: "seller_lead" | "student_lead" | "investor_lead" | "portal_notification" | "spam" | "other";
  confidence: number;
  reason: string;
}

async function classify(subject: string, snippet: string, fromEmail: string): Promise<Classification> {
  const sys = `Sei un classificatore email per Jungle Rent (immobiliare studenti/investitori a Torino).
Categorie:
- seller_lead: privato vuole vendere casa
- student_lead: studente cerca stanza/affitto
- investor_lead: persona vuole investire
- portal_notification: notifica automatica da Immobiliare/Idealista/Subito/Casa.it
- spam: pubblicità, newsletter non richieste
- other: tutto il resto

Rispondi SOLO JSON: {"category":"...","confidence":0.0-1.0,"reason":"breve motivo"}`;
  const user = `From: ${fromEmail}\nSubject: ${subject}\nSnippet: ${snippet}`;
  const r = await fetch(AI_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}` },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash",
      messages: [{ role: "system", content: sys }, { role: "user", content: user }],
      response_format: { type: "json_object" },
    }),
  });
  if (!r.ok) {
    return { category: "other", confidence: 0, reason: `ai_error_${r.status}` };
  }
  const data = await r.json();
  try {
    const parsed = JSON.parse(data.choices[0].message.content);
    return {
      category: parsed.category ?? "other",
      confidence: Number(parsed.confidence ?? 0),
      reason: String(parsed.reason ?? "").slice(0, 200),
    };
  } catch {
    return { category: "other", confidence: 0, reason: "parse_error" };
  }
}

async function notifyWhatsApp(message: string) {
  const phone = Deno.env.get("WHATSAPP_NOTIFY_NUMBER");
  const apiKey = Deno.env.get("CALLMEBOT_API_KEY");
  if (!phone || !apiKey) return;
  try {
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(message)}&apikey=${apiKey}`;
    await fetch(url).catch(() => {});
  } catch { /* noop */ }
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  // Auth: cron secret OR service role
  const cronSecret = req.headers.get("x-cron-secret");
  const authHeader = req.headers.get("Authorization") ?? "";
  const expected = Deno.env.get("CRON_SECRET");
  const isCron = expected && cronSecret === expected;
  const isService = authHeader.includes(Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "___");
  if (!isCron && !isService) return json({ error: "Unauthorized" }, 401);

  const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!);

  try {
    // 1. Fetch unread message IDs from last 2 days
    const listResp = await gmailFetch(
      `/users/me/messages?maxResults=25&q=${encodeURIComponent("is:unread newer_than:2d -from:me")}`,
    );
    const ids: string[] = (listResp.messages ?? []).map((m: any) => m.id);

    let processed = 0, skipped = 0, leadsCreated = 0;
    const errors: string[] = [];

    for (const id of ids) {
      // Dedup
      const { data: existing } = await supabase
        .from("gmail_processed_messages")
        .select("id")
        .eq("message_id", id)
        .maybeSingle();
      if (existing) { skipped++; continue; }

      try {
        const msg = await gmailFetch(`/users/me/messages/${id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=To`);
        const headers = msg.payload?.headers ?? [];
        const fromRaw = getHeader(headers, "From");
        const subject = getHeader(headers, "Subject");
        const snippet = (msg.snippet ?? "").slice(0, 500);
        const { email: fromEmail, name: fromName } = parseSender(fromRaw);

        const cls = await classify(subject, snippet, fromEmail);

        let leadId: string | null = null;
        const leadCategories = ["seller_lead", "student_lead", "investor_lead"];
        if (leadCategories.includes(cls.category) && cls.confidence >= 0.6 && fromEmail.includes("@")) {
          const leadType = cls.category.replace("_lead", "");
          const { data: rpcLeadId, error: rpcErr } = await supabase.rpc("insert_lead", {
            _email: fromEmail,
            _name: fromName || null,
            _source: "gmail-inbox",
            _lead_type: leadType,
            _metadata: { gmail_message_id: id, subject, snippet, classification: cls },
          });
          if (!rpcErr && rpcLeadId) {
            leadId = rpcLeadId as string;
            leadsCreated++;
            await notifyWhatsApp(
              `[Gmail] Nuovo ${leadType} lead: ${fromName || fromEmail}\nOggetto: ${subject.slice(0, 80)}`,
            );
          }
        }

        await supabase.from("gmail_processed_messages").insert({
          message_id: id,
          thread_id: msg.threadId ?? null,
          from_email: fromEmail || null,
          from_name: fromName || null,
          subject,
          snippet,
          classification: cls.category,
          confidence: cls.confidence,
          lead_id: leadId,
          metadata: { reason: cls.reason },
        });

        // Mark as read (requires gmail.modify)
        try {
          await gmailFetch(`/users/me/messages/${id}/modify`, {
            method: "POST",
            body: JSON.stringify({ removeLabelIds: ["UNREAD"] }),
          });
        } catch (e) { /* scope may be missing; non-fatal */ }

        processed++;
      } catch (e) {
        errors.push(`${id}: ${(e as Error).message}`);
      }
    }

    return json({ ok: true, total: ids.length, processed, skipped, leadsCreated, errors });
  } catch (e) {
    console.error("gmail-inbox-parser error:", e);
    return json({ error: (e as Error).message }, 500);
  }
});
