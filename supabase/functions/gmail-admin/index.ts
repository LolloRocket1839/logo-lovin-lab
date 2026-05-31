// Gmail admin — list inbox, get message, send, archive, mark-read, get/update settings.
// Admin-only (lorenzo.onijoseph@gmail.com).
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
const ADMIN_EMAILS = ["lorenzo.onijoseph@gmail.com"];
const GATEWAY = "https://connector-gateway.lovable.dev/google_mail/gmail/v1";

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

function b64urlEncode(str: string): string {
  const bytes = new TextEncoder().encode(str);
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function buildRawEmail(opts: {
  to: string;
  subject: string;
  body: string;
  from?: string;
  inReplyTo?: string;
  references?: string;
}): string {
  const lines = [
    `To: ${opts.to}`,
    opts.from ? `From: ${opts.from}` : null,
    `Subject: ${opts.subject}`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset="UTF-8"`,
    `Content-Transfer-Encoding: 7bit`,
    opts.inReplyTo ? `In-Reply-To: ${opts.inReplyTo}` : null,
    opts.references ? `References: ${opts.references}` : null,
    "",
    opts.body,
  ].filter(Boolean).join("\r\n");
  return b64urlEncode(lines);
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
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user || !ADMIN_EMAILS.includes(user.email ?? "")) {
      return json({ error: "Forbidden" }, 403);
    }
    const admin = createClient(supabaseUrl, serviceKey);
    const body = await req.json().catch(() => ({}));
    const action = body?.action ?? "list";

    // ───── LIST ─────
    if (action === "list") {
      const q = body.q ?? "newer_than:7d";
      const maxResults = Math.min(Number(body.maxResults ?? 50), 100);
      const list = await gmailFetch(
        `/users/me/messages?maxResults=${maxResults}&q=${encodeURIComponent(q)}`,
      );
      const ids: string[] = (list.messages ?? []).map((m: any) => m.id);
      const messages = await Promise.all(
        ids.map(async (id) => {
          try {
            const m = await gmailFetch(
              `/users/me/messages/${id}?format=metadata&metadataHeaders=From&metadataHeaders=Subject&metadataHeaders=Date`,
            );
            const h = m.payload?.headers ?? [];
            return {
              id,
              threadId: m.threadId,
              from: getHeader(h, "From"),
              subject: getHeader(h, "Subject"),
              date: getHeader(h, "Date"),
              snippet: m.snippet,
              labelIds: m.labelIds ?? [],
              isUnread: (m.labelIds ?? []).includes("UNREAD"),
            };
          } catch { return null; }
        }),
      );

      // Enrich with our DB classification
      const { data: processed } = await admin
        .from("gmail_processed_messages")
        .select("message_id, classification, confidence, lead_id")
        .in("message_id", ids);
      const procMap = new Map((processed ?? []).map((p) => [p.message_id, p]));

      return json({
        messages: messages.filter(Boolean).map((m: any) => ({ ...m, processed: procMap.get(m.id) ?? null })),
      });
    }

    // ───── GET ─────
    if (action === "get") {
      const { id } = body;
      if (!id) return json({ error: "id required" }, 400);
      const m = await gmailFetch(`/users/me/messages/${id}?format=full`);
      return json({ message: m });
    }

    // ───── SEND ─────
    if (action === "send") {
      const { to, subject, body: emailBody, threadId, inReplyTo, templateKey, linkedListingId, linkedLeadId } = body;
      if (!to || !subject || !emailBody) return json({ error: "to, subject, body required" }, 400);
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(to)) return json({ error: "invalid recipient" }, 400);
      if (subject.length > 200 || emailBody.length > 10000) return json({ error: "payload too large" }, 400);

      // Rate limit: max 30 sends per hour per admin
      const oneHourAgo = new Date(Date.now() - 3600_000).toISOString();
      const { count } = await admin
        .from("gmail_sent_messages")
        .select("id", { count: "exact", head: true })
        .eq("sent_by", user.id)
        .gte("sent_at", oneHourAgo);
      if ((count ?? 0) >= 30) return json({ error: "Rate limit: max 30 email/ora" }, 429);

      // Build signature
      const { data: settings } = await admin.from("gmail_settings").select("signature").eq("id", 1).maybeSingle();
      const sig = settings?.signature ?? "";
      const fullBody = `${emailBody.trim()}\n\n--\n${sig}`;

      const raw = buildRawEmail({ to, subject, body: fullBody, inReplyTo: inReplyTo || undefined });
      const sendPayload: any = { raw };
      if (threadId) sendPayload.threadId = threadId;

      const sent = await gmailFetch(`/users/me/messages/send`, {
        method: "POST",
        body: JSON.stringify(sendPayload),
      });

      await admin.from("gmail_sent_messages").insert({
        message_id: sent.id ?? null,
        thread_id: sent.threadId ?? null,
        to_email: to,
        subject,
        body_excerpt: emailBody.slice(0, 500),
        sent_by: user.id,
        sent_by_email: user.email,
        linked_listing_id: linkedListingId ?? null,
        linked_lead_id: linkedLeadId ?? null,
        in_reply_to: inReplyTo ?? null,
        template_key: templateKey ?? null,
      });

      return json({ ok: true, id: sent.id, threadId: sent.threadId });
    }

    // ───── ARCHIVE / MARK READ ─────
    if (action === "archive" || action === "mark_read") {
      const { id } = body;
      if (!id) return json({ error: "id required" }, 400);
      const removeLabelIds = action === "archive" ? ["INBOX", "UNREAD"] : ["UNREAD"];
      await gmailFetch(`/users/me/messages/${id}/modify`, {
        method: "POST",
        body: JSON.stringify({ removeLabelIds }),
      });
      return json({ ok: true });
    }

    // ───── SETTINGS ─────
    if (action === "get_settings") {
      const { data } = await admin.from("gmail_settings").select("*").eq("id", 1).maybeSingle();
      return json({ settings: data });
    }
    if (action === "update_settings") {
      const { auto_reply_enabled, signature, auto_reply_categories } = body;
      const patch: any = { updated_at: new Date().toISOString() };
      if (typeof auto_reply_enabled === "boolean") patch.auto_reply_enabled = auto_reply_enabled;
      if (typeof signature === "string") patch.signature = signature.slice(0, 2000);
      if (Array.isArray(auto_reply_categories)) patch.auto_reply_categories = auto_reply_categories;
      const { error } = await admin.from("gmail_settings").update(patch).eq("id", 1);
      if (error) throw error;
      return json({ ok: true });
    }

    // ───── SENT LOG ─────
    if (action === "sent_log") {
      const { data } = await admin
        .from("gmail_sent_messages")
        .select("*")
        .order("sent_at", { ascending: false })
        .limit(50);
      return json({ sent: data ?? [] });
    }

    // ───── TRIGGER PARSER ─────
    if (action === "trigger_parser") {
      const url = `${supabaseUrl}/functions/v1/gmail-inbox-parser`;
      const cronSecret = Deno.env.get("CRON_SECRET");
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-cron-secret": cronSecret ?? "",
          Authorization: `Bearer ${serviceKey}`,
        },
        body: "{}",
      }).catch(() => {});
      return json({ ok: true, triggered: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (e) {
    console.error("gmail-admin error:", e);
    return json({ error: (e as Error).message }, 500);
  }
});
