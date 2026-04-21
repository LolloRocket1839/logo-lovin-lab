import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Count investor leads in the last 28 days (combines investor_interest + leads of type investor)
    const since = new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString();

    const [interestRes, leadsRes] = await Promise.all([
      supabase
        .from("investor_interest")
        .select("id", { count: "exact", head: true })
        .gte("created_at", since),
      supabase
        .from("leads")
        .select("id", { count: "exact", head: true })
        .eq("lead_type", "investor")
        .gte("created_at", since),
    ]);

    const count = (interestRes.count ?? 0) + (leadsRes.count ?? 0);

    return new Response(
      JSON.stringify({ count, period_days: 28 }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=300",
          ...corsHeaders,
        },
      }
    );
  } catch (error) {
    console.error("get-investor-interest-count error:", error);
    return new Response(
      JSON.stringify({ count: 0, error: "internal_error" }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
