import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Only allow checking URLs on known safe domains (prevent SSRF)
const ALLOWED_DOMAINS = [
  'junglerent.it',
  'junglerent.lovable.app',
  'junglerent.com',
  'immobiliare.it',
  'idealista.it',
  'comune.torino.it',
  'polito.it',
  'unito.it',
  'edisu.piemonte.it',
  'wikipedia.org',
  'en.wikipedia.org',
  'it.wikipedia.org',
];

function isAllowedUrl(urlStr: string): boolean {
  try {
    const url = new URL(urlStr);
    // Only allow http/https
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return false;
    // Check against allowed domains
    const hostname = url.hostname.toLowerCase();
    return ALLOWED_DOMAINS.some(domain => 
      hostname === domain || hostname.endsWith('.' + domain)
    );
  } catch {
    return false;
  }
}

serve(async (req) => {
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

    // Limit to 20 URLs per request
    const urlsToCheck = urls.slice(0, 20);
    
    const results = await Promise.all(
      urlsToCheck.map(async (url: string) => {
        // Validate URL
        if (typeof url !== 'string' || url.length > 2000) {
          return { url: typeof url === 'string' ? url.substring(0, 100) : '', status: 0, ok: false, error: 'Invalid URL' };
        }

        if (!isAllowedUrl(url)) {
          return { url: url.substring(0, 100), status: 0, ok: false, error: 'Domain not allowed' };
        }

        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 5000);
          
          const response = await fetch(url, {
            method: 'HEAD',
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