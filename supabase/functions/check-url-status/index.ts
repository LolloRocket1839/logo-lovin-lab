import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { urls } = await req.json();
    
    if (!urls || !Array.isArray(urls)) {
      return new Response(
        JSON.stringify({ error: 'URLs array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Limit to 20 URLs per request to avoid timeout
    const urlsToCheck = urls.slice(0, 20);
    
    const results = await Promise.all(
      urlsToCheck.map(async (url: string) => {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000); // 5s timeout
          
          const response = await fetch(url, {
            method: 'HEAD', // Use HEAD to avoid downloading body
            signal: controller.signal,
            redirect: 'follow',
          });
          
          clearTimeout(timeoutId);
          
          return {
            url,
            status: response.status,
            ok: response.ok,
            redirected: response.redirected,
            finalUrl: response.url,
          };
        } catch (error) {
          return {
            url,
            status: 0,
            ok: false,
            error: error instanceof Error ? error.message : 'Unknown error',
          };
        }
      })
    );

    return new Response(
      JSON.stringify({ results }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error checking URLs:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
