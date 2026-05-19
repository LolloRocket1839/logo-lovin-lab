// GSC Index Monitor
// Cattura uno snapshot dello stato sitemap/indicizzazione da Google Search Console,
// lo confronta con lo snapshot precedente e invia email di alert se rileva:
//  - nuovi errori di sitemap
//  - aumento dei warning
//  - calo significativo (>5%) di URL inviati
//
// Modi d'invocazione:
//  - Cron (pg_cron via net.http_post): Authorization: Bearer <WEEKLY_REPORT_SECRET>
//  - Admin UI: invoke con sessione admin (email in ADMIN_EMAILS)
//
// GET  → restituisce gli ultimi 30 snapshot (richiede admin)
// POST → esegue una nuova cattura + eventuale alert
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAILS = ["lorenzo.onijoseph@gmail.com"];
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console/webmasters/v3";
const SITE_URL = "https://junglerent.it/";
const ALERT_THRESHOLD_SUBMITTED_DROP_PCT = 5; // -5% URL inviati → alert

type SitemapStat = {
  path: string;
  errors: number;
  warnings: number;
  isPending: boolean;
  isSitemapsIndex: boolean;
  lastDownloaded: string | null;
  submittedWeb: number;
  submittedImage: number;
  indexedWeb: number;
};

type Snapshot = {
  sitemaps: SitemapStat[];
  totals: { errors: number; warnings: number; submitted: number };
};

type Alert = { severity: "info" | "warn" | "critical"; type: string; message: string };

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function fetchSitemapStats(): Promise<{ snapshot: Snapshot; raw: unknown }> {
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  const GSC_API_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");
  if (!GSC_API_KEY) throw new Error("GOOGLE_SEARCH_CONSOLE_API_KEY missing");

  const res = await fetch(`${GATEWAY}/sites/${encodeURIComponent(SITE_URL)}/sitemaps`, {
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GSC_API_KEY,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GSC sitemaps API ${res.status}: ${text.slice(0, 200)}`);
  }
  const raw = await res.json();
  const list = Array.isArray(raw?.sitemap) ? raw.sitemap : [];

  const sitemaps: SitemapStat[] = list.map((s: Record<string, unknown>) => {
    const contents = Array.isArray(s.contents) ? s.contents as Array<{ type: string; submitted?: string; indexed?: string }> : [];
    const web = contents.find((c) => c.type === "web");
    const img = contents.find((c) => c.type === "image");
    return {
      path: String(s.path ?? ""),
      errors: Number(s.errors ?? 0),
      warnings: Number(s.warnings ?? 0),
      isPending: Boolean(s.isPending),
      isSitemapsIndex: Boolean(s.isSitemapsIndex),
      lastDownloaded: (s.lastDownloaded as string | null) ?? null,
      submittedWeb: Number(web?.submitted ?? 0),
      submittedImage: Number(img?.submitted ?? 0),
      indexedWeb: Number(web?.indexed ?? 0),
    };
  });

  const totals = sitemaps.reduce(
    (acc, s) => {
      // Salta l'indice per evitare double-counting
      if (s.isSitemapsIndex) return acc;
      acc.errors += s.errors;
      acc.warnings += s.warnings;
      acc.submitted += s.submittedWeb + s.submittedImage;
      return acc;
    },
    { errors: 0, warnings: 0, submitted: 0 },
  );

  return { snapshot: { sitemaps, totals }, raw };
}

function diffAlerts(prev: Snapshot | null, curr: Snapshot): Alert[] {
  const alerts: Alert[] = [];

  // Errori assoluti (sempre alert se > 0)
  if (curr.totals.errors > 0) {
    alerts.push({
      severity: "critical",
      type: "sitemap_errors",
      message: `Google sta segnalando ${curr.totals.errors} errori totali nelle sitemap.`,
    });
  }

  // Per-sitemap errors
  for (const s of curr.sitemaps) {
    if (s.errors > 0) {
      alerts.push({
        severity: "critical",
        type: "sitemap_errors_per_sitemap",
        message: `Sitemap "${s.path}": ${s.errors} errori, ${s.warnings} warning.`,
      });
    }
  }

  if (!prev) {
    alerts.push({ severity: "info", type: "first_snapshot", message: "Primo snapshot registrato." });
    return alerts;
  }

  // Aumento warning
  if (curr.totals.warnings > prev.totals.warnings) {
    alerts.push({
      severity: "warn",
      type: "warnings_increased",
      message: `Warning sitemap saliti da ${prev.totals.warnings} a ${curr.totals.warnings}.`,
    });
  }

  // Calo significativo URL inviati
  if (prev.totals.submitted > 0) {
    const dropPct = ((prev.totals.submitted - curr.totals.submitted) / prev.totals.submitted) * 100;
    if (dropPct >= ALERT_THRESHOLD_SUBMITTED_DROP_PCT) {
      alerts.push({
        severity: "warn",
        type: "submitted_dropped",
        message: `URL inviati calati del ${dropPct.toFixed(1)}% (da ${prev.totals.submitted} a ${curr.totals.submitted}).`,
      });
    }
  }

  // Nuovi errori comparsi su sitemap singole rispetto a prima
  const prevByPath = new Map(prev.sitemaps.map((s) => [s.path, s]));
  for (const s of curr.sitemaps) {
    const p = prevByPath.get(s.path);
    if (p && s.errors > p.errors) {
      alerts.push({
        severity: "critical",
        type: "new_errors_on_sitemap",
        message: `"${s.path}": errori saliti da ${p.errors} a ${s.errors}.`,
      });
    }
  }

  return alerts;
}

async function sendAlertEmail(alerts: Alert[], curr: Snapshot) {
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  const TO = Deno.env.get("ADMIN_NOTIFICATION_EMAIL");
  if (!RESEND_API_KEY || !TO) {
    console.warn("RESEND_API_KEY or ADMIN_NOTIFICATION_EMAIL missing — skip email");
    return false;
  }

  const criticalCount = alerts.filter((a) => a.severity === "critical").length;
  const warnCount = alerts.filter((a) => a.severity === "warn").length;
  const subject = criticalCount > 0
    ? `🚨 GSC: ${criticalCount} errori indicizzazione su junglerent.it`
    : `⚠️ GSC: ${warnCount} avvisi indicizzazione su junglerent.it`;

  const rows = alerts.map((a) => `
    <tr>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">
        ${a.severity === "critical" ? "🚨" : a.severity === "warn" ? "⚠️" : "ℹ️"}
      </td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;font-family:monospace;font-size:12px;">${a.type}</td>
      <td style="padding:8px 12px;border-bottom:1px solid #eee;">${a.message}</td>
    </tr>
  `).join("");

  const html = `
    <div style="font-family:-apple-system,sans-serif;max-width:640px;margin:auto;padding:24px;color:#222;">
      <h2 style="margin-top:0;">Google Search Console — alert indicizzazione</h2>
      <p style="color:#555;">Snapshot del ${new Date().toISOString().slice(0, 16).replace("T", " ")} UTC</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #eee;border-radius:8px;overflow:hidden;">
        <thead><tr style="background:#f8f8f8;">
          <th style="text-align:left;padding:8px 12px;">Sev</th>
          <th style="text-align:left;padding:8px 12px;">Tipo</th>
          <th style="text-align:left;padding:8px 12px;">Dettaglio</th>
        </tr></thead>
        <tbody>${rows}</tbody>
      </table>
      <h3 style="margin-top:32px;">Totali correnti</h3>
      <ul style="line-height:1.7;">
        <li>Errori totali: <b>${curr.totals.errors}</b></li>
        <li>Warning totali: <b>${curr.totals.warnings}</b></li>
        <li>URL inviati totali: <b>${curr.totals.submitted}</b></li>
        <li>Sitemap monitorate: <b>${curr.sitemaps.length}</b></li>
      </ul>
      <p style="margin-top:24px;">
        <a href="https://search.google.com/search-console?resource_id=${encodeURIComponent(SITE_URL)}"
           style="background:#0a5d3a;color:#fff;padding:10px 18px;border-radius:6px;text-decoration:none;">
          Apri Search Console
        </a>
      </p>
      <p style="font-size:12px;color:#999;margin-top:32px;">Jungle Rent — monitor automatico (gsc-index-monitor)</p>
    </div>
  `;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: "Jungle Rent Monitor <noreply@junglerent.it>",
      to: [TO],
      subject,
      html,
    }),
  });
  if (!res.ok) {
    console.error("Resend error", res.status, await res.text());
    return false;
  }
  return true;
}

async function sendWhatsAppAlert(alerts: Alert[], curr: Snapshot): Promise<boolean> {
  const criticals = alerts.filter((a) => a.severity === "critical");
  if (criticals.length === 0) return false;

  const phone = (Deno.env.get("WHATSAPP_NOTIFY_NUMBER") || "").replace(/[^\d]/g, "");
  const apiKey = Deno.env.get("CALLMEBOT_API_KEY") || "";
  if (!phone || !apiKey) {
    console.warn("WHATSAPP_NOTIFY_NUMBER or CALLMEBOT_API_KEY missing — skip WhatsApp");
    return false;
  }

  const top = criticals.slice(0, 3).map((a) => `• ${a.message}`).join("\n");
  let message = [
    `🚨 GSC Alert — junglerent.it`,
    `${criticals.length} errori critici rilevati`,
    "",
    top,
    "",
    `Totali: ${curr.totals.errors} err / ${curr.totals.warnings} warn / ${curr.totals.submitted} URL`,
    `🔗 https://search.google.com/search-console`,
  ].join("\n");
  if (message.length > 1000) message = message.slice(0, 997) + "...";

  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
    `&text=${encodeURIComponent(message)}&apikey=${encodeURIComponent(apiKey)}`;

  let ok = false;
  let errorMessage: string | null = null;
  try {
    const resp = await fetch(url, { method: "GET" });
    const text = await resp.text();
    ok = resp.ok && !/error|invalid|not received/i.test(text);
    if (!ok) errorMessage = `HTTP ${resp.status}: ${text.slice(0, 300)}`;
  } catch (err) {
    errorMessage = err instanceof Error ? err.message : String(err);
  }

  try {
    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
    await admin.from("email_send_log").insert({
      template_name: "whatsapp-gsc-alert",
      recipient_email: Deno.env.get("ADMIN_NOTIFICATION_EMAIL") ?? "admin@junglerent.it",
      status: ok ? "sent" : "failed",
      error_message: errorMessage,
      metadata: { criticals: criticals.length, totals: curr.totals },
    });
  } catch (e) {
    console.error("Failed to log WhatsApp send:", e);
  }
  return ok;
}

async function authorize(req: Request): Promise<{ ok: boolean; mode: "cron" | "admin" | null; error?: string }> {
  const auth = req.headers.get("Authorization") ?? "";
  const cronSecret = Deno.env.get("WEEKLY_REPORT_SECRET");
  const cronHeader = req.headers.get("x-cron-secret") ?? "";

  // pg_cron path: header x-cron-secret matches WEEKLY_REPORT_SECRET
  if (cronSecret && cronHeader && cronHeader === cronSecret) {
    return { ok: true, mode: "cron" };
  }
  // External cron path: Authorization: Bearer <WEEKLY_REPORT_SECRET>
  if (cronSecret && auth === `Bearer ${cronSecret}`) {
    return { ok: true, mode: "cron" };
  }

  // Admin via session token
  if (!auth.startsWith("Bearer ")) return { ok: false, mode: null, error: "Missing auth" };

  const userClient = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: auth } } },
  );
  const { data: { user } } = await userClient.auth.getUser();
  if (user && ADMIN_EMAILS.includes(user.email ?? "")) {
    return { ok: true, mode: "admin" };
  }
  return { ok: false, mode: null, error: "Forbidden" };
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const authz = await authorize(req);
    if (!authz.ok) return json({ error: authz.error ?? "Unauthorized" }, 401);

    const admin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    if (req.method === "GET") {
      if (authz.mode !== "admin") return json({ error: "Admin only" }, 403);
      const { data, error } = await admin
        .from("gsc_index_snapshots")
        .select("id, captured_at, totals, alerts, alert_sent, sitemaps")
        .order("captured_at", { ascending: false })
        .limit(30);
      if (error) return json({ error: error.message }, 500);
      return json({ snapshots: data ?? [] });
    }

    // POST → cattura + alert
    const { snapshot, raw } = await fetchSitemapStats();

    const { data: prevRows } = await admin
      .from("gsc_index_snapshots")
      .select("sitemaps, totals")
      .order("captured_at", { ascending: false })
      .limit(1);
    const prev: Snapshot | null = prevRows?.[0]
      ? { sitemaps: prevRows[0].sitemaps as SitemapStat[], totals: prevRows[0].totals as Snapshot["totals"] }
      : null;

    const alerts = diffAlerts(prev, snapshot);
    const hasActionable = alerts.some((a) => a.severity === "critical" || a.severity === "warn");

    let alertSent = false;
    let whatsappSent = false;
    if (hasActionable) {
      alertSent = await sendAlertEmail(alerts, snapshot);
      whatsappSent = await sendWhatsAppAlert(alerts, snapshot);
    }

    const { data: inserted, error: insErr } = await admin
      .from("gsc_index_snapshots")
      .insert({
        site_url: SITE_URL,
        sitemaps: snapshot.sitemaps,
        totals: snapshot.totals,
        alerts,
        alert_sent: alertSent,
        raw_response: raw,
      })
      .select("id, captured_at")
      .single();
    if (insErr) return json({ error: insErr.message }, 500);

    return json({
      ok: true,
      mode: authz.mode,
      snapshotId: inserted?.id,
      capturedAt: inserted?.captured_at,
      totals: snapshot.totals,
      alerts,
      alertSent,
      whatsappSent,
      sitemapsCount: snapshot.sitemaps.length,
    });
  } catch (e) {
    console.error("gsc-index-monitor error:", e);
    return json({ error: e instanceof Error ? e.message : "Unknown error" }, 500);
  }
});
