// Submits the project's sitemap to Google Search Console via the Lovable connector gateway.
// Admin-guarded (matches ADMIN_EMAILS). Defaults to https://junglerent.it/ + /sitemap.xml.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_EMAILS = ["lorenzo.onijoseph@gmail.com"];
const GATEWAY = "https://connector-gateway.lovable.dev/google_search_console/webmasters/v3";
const DEFAULT_SITE = "https://junglerent.it/";
const DEFAULT_SITEMAP = "https://junglerent.it/sitemap.xml";

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
    let sitemapUrl = DEFAULT_SITEMAP;
    if (req.method === "POST") {
      const body = await req.json().catch(() => ({}));
      if (typeof body.siteUrl === "string") siteUrl = body.siteUrl;
      if (typeof body.sitemapUrl === "string") sitemapUrl = body.sitemapUrl;
    }

    const headers = {
      "Authorization": `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GSC_API_KEY,
    };
    const sitePath = encodeURIComponent(siteUrl);
    const feedPath = encodeURIComponent(sitemapUrl);

    // PUT submits/(re)submits the sitemap.
    const putRes = await fetch(`${GATEWAY}/sites/${sitePath}/sitemaps/${feedPath}`, {
      method: "PUT",
      headers,
    });
    if (!putRes.ok && putRes.status !== 204) {
      const text = await putRes.text();
      return json({ step: "submit", status: putRes.status, error: text }, 502);
    }

    // GET the sitemap status to confirm processing.
    const getRes = await fetch(`${GATEWAY}/sites/${sitePath}/sitemaps/${feedPath}`, { headers });
    const status = await getRes.json().catch(() => ({}));

    return json({
      submitted: true,
      siteUrl,
      sitemapUrl,
      sitemap: status,
    });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : "Unknown error" }, 500);
  }
});
