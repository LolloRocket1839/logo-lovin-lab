import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiting
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 20; // 20 events per minute per IP

const isRateLimited = (clientIP: string): boolean => {
  const now = Date.now();
  const record = rateLimitMap.get(clientIP);

  if (!record || now - record.timestamp > RATE_LIMIT_WINDOW) {
    rateLimitMap.set(clientIP, { count: 1, timestamp: now });
    return false;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  record.count++;
  return false;
};

interface ABTestEventRequest {
  cta_type: string;
  variation: string;
  event_type: string;
  session_id: string;
  user_agent?: string;
  page_url?: string;
}

// Validation functions
const isValidCtaType = (ctaType: string): boolean => {
  const allowedTypes = ['students', 'investors', 'sellers', 'turisti', 'societa'];
  return allowedTypes.includes(ctaType);
};

const isValidVariation = (variation: string): boolean => {
  return variation === 'A' || variation === 'B';
};

const isValidEventType = (eventType: string): boolean => {
  return eventType === 'impression' || eventType === 'click';
};

const isValidSessionId = (sessionId: string): boolean => {
  return typeof sessionId === 'string' && sessionId.length > 0 && sessionId.length <= 100;
};

const sanitizeString = (str: string, maxLength: number): string => {
  if (!str || typeof str !== 'string') return '';
  return str.trim().substring(0, maxLength);
};

Deno.serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";

    if (isRateLimited(clientIP)) {
      console.log(`Rate limited: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const body: ABTestEventRequest = await req.json();

    // Validate required fields
    if (!isValidCtaType(body.cta_type)) {
      return new Response(
        JSON.stringify({ error: "Invalid cta_type" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!isValidVariation(body.variation)) {
      return new Response(
        JSON.stringify({ error: "Invalid variation" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!isValidEventType(body.event_type)) {
      return new Response(
        JSON.stringify({ error: "Invalid event_type" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!isValidSessionId(body.session_id)) {
      return new Response(
        JSON.stringify({ error: "Invalid session_id" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client with service role
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Anonymize user agent (only keep browser/OS family)
    let anonymizedUserAgent = '';
    if (body.user_agent) {
      const ua = body.user_agent;
      let browser = 'Unknown';
      let os = 'Unknown';
      
      if (ua.includes('Firefox')) browser = 'Firefox';
      else if (ua.includes('Edg')) browser = 'Edge';
      else if (ua.includes('Chrome')) browser = 'Chrome';
      else if (ua.includes('Safari')) browser = 'Safari';
      
      if (ua.includes('Windows')) os = 'Windows';
      else if (ua.includes('Mac')) os = 'macOS';
      else if (ua.includes('Linux')) os = 'Linux';
      else if (ua.includes('Android')) os = 'Android';
      else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
      
      const isMobile = /Mobile|Android|iPhone|iPad/.test(ua);
      anonymizedUserAgent = `${browser}/${os}/${isMobile ? 'Mobile' : 'Desktop'}`;
    }

    // Anonymize page URL (strip query params)
    let anonymizedPageUrl = '';
    if (body.page_url) {
      try {
        const url = new URL(body.page_url);
        anonymizedPageUrl = `${url.origin}${url.pathname}`;
      } catch {
        anonymizedPageUrl = '';
      }
    }

    // Insert validated and sanitized data
    const { error } = await supabaseClient.from("ab_test_events").insert({
      cta_type: body.cta_type,
      variation: body.variation,
      event_type: body.event_type,
      session_id: sanitizeString(body.session_id, 100),
      user_agent: anonymizedUserAgent,
      page_url: sanitizeString(anonymizedPageUrl, 2000),
    });

    if (error) {
      console.error("Database insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to track event" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`A/B test event tracked: ${body.event_type} for ${body.cta_type} from ${clientIP}`);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error in track-ab-test:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
