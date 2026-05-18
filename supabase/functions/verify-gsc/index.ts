// Post-deploy GSC verification check.
// 1) Fetches the live homepage and reports whether the google-site-verification meta tag is present.
// 2) Calls Google's siteVerification API to (re)confirm ownership.
// Admin-guarded (ADMIN_EMAILS). Defaults to https://junglerent.it/.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAILS = ["lorenzo.onijoseph@gmail.com"];
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console/siteVerification/v1";
const DEFAULT_SITE = "https://junglerent.it/";
const META_RE = /<meta\s+name=["']google-site-verification["']\s+content=["']([^"']+)["']/i;

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const json = (body: unknown, status = 200) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return json({ error: "Unauthorized" }, 401);

    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const { data: { user }, error: userErr } = await userClient.auth.getUser();
    if (userErr || !user || !ADMIN_EMAILS.includes(user.email ?? "")) {
      return json({ error: "Forbidden" }, 403);
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const GSC_API_KEY = Deno.env.get("GOOGLE_SEARCH_CONSOLE_API_KEY");
    if (!LOVABLE_API_KEY) return json({ error: "LOVABLE_API_KEY missing" }, 500);
    if (!GSC_API_KEY) return json({ error: "GOOGLE_SEARCH_CONSOLE_API_KEY missing" }, 500);

    let siteUrl = DEFAULT_SITE;
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      if (typeof body.siteUrl === "string") siteUrl = body.siteUrl;
    }
    if (!siteUrl.endsWith("/")) siteUrl += "/";

    // Step 1: fetch the live page and detect the meta tag.
    let metaDetected = false;
    let metaContent: string | null = null;
    let fetchStatus = 0;
    let fetchError: string | null = null;
    try {
      const pageRes = await fetch(siteUrl, {
        headers: { "User-Agent": "JungleRent-PostDeploy-Verify/1.0", "Cache-Control": "no-cache" },
        redirect: "follow",
      });
      fetchStatus = pageRes.status;
      if (pageRes.ok) {
        const html = await pageRes.text();
        const match = html.match(META_RE);
        if (match) {
          metaDetected = true;
          metaContent = match[1];
        }
      }
    } catch (e) {
      fetchError = e instanceof Error ? e.message : String(e);
    }

    // Step 2: call Google's verify endpoint.
    let verifyOk = false;
    let verifyStatus = 0;
    let verifyBody: unknown = null;
    try {
      const verifyRes = await fetch(
        `${GATEWAY}/webResource?verificationMethod=META`,
        {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${LOVABLE_API_KEY}`,
            "X-Connection-Api-Key": GSC_API_KEY,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ site: { identifier: siteUrl, type: "SITE" } }),
        },
      );
      verifyStatus = verifyRes.status;
      verifyBody = await verifyRes.json().catch(() => null);
      verifyOk = verifyRes.ok;
    } catch (e) {
      verifyBody = { error: e instanceof Error ? e.message : String(e) };
    }

    const overall: "verified" | "meta_missing" | "verify_failed" = verifyOk
      ? "verified"
      : metaDetected
        ? "verify_failed"
        : "meta_missing";

    return json({
      siteUrl,
      overall,
      metaTag: {
        detected: metaDetected,
        content: metaContent,
        httpStatus: fetchStatus,
        fetchError,
      },
      googleVerify: {
        ok: verifyOk,
        status: verifyStatus,
        body: verifyBody,
      },
      checkedAt: new Date().toISOString(),
    });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : "Unknown error" }, 500);
  }
});
