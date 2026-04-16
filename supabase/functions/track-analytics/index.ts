import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiting (resets on function cold start)
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // 30 events per minute per IP

// Per-session burst guard (catches scripted clients reusing the same session_id)
const sessionBurstMap = new Map<string, { count: number; timestamp: number }>();
const SESSION_BURST_WINDOW = 60000;
const MAX_EVENTS_PER_SESSION_WINDOW = 50;

// Server-side bot UA blacklist (substring match, lowercase)
const BOT_UA_PATTERNS = [
  'bot', 'spider', 'crawl', 'slurp', 'headless', 'phantom', 'selenium',
  'puppeteer', 'playwright', 'lighthouse', 'pingdom', 'pagespeed', 'gtmetrix',
  'bytespider', 'yandex', 'baidu', 'sogou', 'semrush', 'ahrefs', 'mj12bot',
  'dotbot', 'petalbot', 'dataforseo', 'gptbot', 'claudebot', 'perplexitybot',
  'python-requests', 'go-http-client', 'okhttp', 'curl/', 'wget/',
  'axios', 'node-fetch', 'java/', 'apache-httpclient',
];

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

const isSessionFlooding = (sessionId: string): boolean => {
  const now = Date.now();
  const record = sessionBurstMap.get(sessionId);
  if (!record || now - record.timestamp > SESSION_BURST_WINDOW) {
    sessionBurstMap.set(sessionId, { count: 1, timestamp: now });
    return false;
  }
  if (record.count >= MAX_EVENTS_PER_SESSION_WINDOW) return true;
  record.count++;
  return false;
};

const isBotRequest = (req: Request): boolean => {
  const ua = (req.headers.get('user-agent') || '').toLowerCase();
  if (!ua) return true;
  if (BOT_UA_PATTERNS.some(p => ua.includes(p))) return true;

  // Real browsers always send Accept-Language; most bots/scripts don't
  const acceptLang = req.headers.get('accept-language');
  if (!acceptLang || acceptLang.trim().length === 0) return true;

  return false;
};

interface AnalyticsEventRequest {
  session_id: string;
  event_type: string;
  page_url: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
}

// Validation functions
const isValidSessionId = (sessionId: string): boolean => {
  return typeof sessionId === 'string' && sessionId.length > 0 && sessionId.length <= 32;
};

const isValidEventType = (eventType: string): boolean => {
  const allowedTypes = [
    'page_view', 'click', 'form_submit', 'scroll', 'scroll_depth', 
    'page_exit_scroll', 'page_navigation_scroll', 'engagement',
    // Generic exit intent
    'exit_intent_shown', 'exit_intent_submit', 'exit_intent_closed',
    // Investor exit intent
    'investor_exit_intent_shown', 'investor_exit_intent_submit', 'investor_exit_intent_closed',
    // Seller exit intent (dedicated for /vendi page)
    'seller_exit_intent_shown', 'seller_exit_intent_submit', 'seller_exit_intent_closed'
  ];
  return allowedTypes.includes(eventType);
};

const isValidUrl = (url: string): boolean => {
  if (!url || typeof url !== 'string') return false;
  try {
    new URL(url);
    return url.length <= 2000;
  } catch {
    return false;
  }
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

    const body: AnalyticsEventRequest = await req.json();

    // Validate required fields
    if (!isValidSessionId(body.session_id)) {
      return new Response(
        JSON.stringify({ error: "Invalid session_id" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!isValidEventType(body.event_type)) {
      return new Response(
        JSON.stringify({ error: "Invalid event_type" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    if (!isValidUrl(body.page_url)) {
      return new Response(
        JSON.stringify({ error: "Invalid page_url" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Create Supabase client with service role
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Insert validated and sanitized data
    const { error } = await supabaseClient.from("analytics_events").insert({
      session_id: sanitizeString(body.session_id, 32),
      event_type: body.event_type,
      page_url: sanitizeString(body.page_url, 2000),
      page_title: sanitizeString(body.page_title || '', 500),
      referrer: sanitizeString(body.referrer || '', 500),
      user_agent: sanitizeString(body.user_agent || '', 200),
      metadata: body.metadata || null,
    });

    if (error) {
      console.error("Database insert error:", error);
      return new Response(
        JSON.stringify({ error: "Failed to track event" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Analytics event tracked: ${body.event_type} from ${clientIP}`);

    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error in track-analytics:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
