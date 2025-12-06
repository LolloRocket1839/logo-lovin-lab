import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Simple in-memory rate limiting (per function instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per minute per IP

function isRateLimited(clientIP: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(clientIP);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(clientIP, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  
  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return true;
  }
  
  record.count++;
  return false;
}

// Validation functions
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

function isValidName(name: string): boolean {
  const nameRegex = /^[a-zA-ZÀ-ÿ\s'-]+$/;
  return nameRegex.test(name) && name.length >= 2 && name.length <= 100;
}

function isValidPhone(phone: string): boolean {
  // Basic phone validation - should contain digits and optional + at start
  const phoneRegex = /^\+?[\d\s()-]{8,20}$/;
  return phoneRegex.test(phone);
}

function isValidInvestorType(type: string): boolean {
  const validTypes = ["individual", "company", "family_office", "other"];
  return validTypes.includes(type);
}

function isValidInvestmentRange(range: string): boolean {
  const validRanges = ["100-5000", "5000-10000", "10000-25000", "25000-50000", "50000-100000", "100000+"];
  return validRanges.includes(range);
}

function isValidTimeline(timeline: string): boolean {
  const validTimelines = ["immediate", "3_months", "6_months", "exploratory"];
  return validTimelines.includes(timeline);
}

function isValidInterests(interests: unknown): interests is string[] {
  if (!Array.isArray(interests)) return false;
  const validInterests = ["equity", "convertible", "revenue", "advisory"];
  return interests.length >= 1 && 
         interests.length <= 4 && 
         interests.every(i => typeof i === "string" && validInterests.includes(i));
}

Deno.serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || 
                     "unknown";
    
    // Check rate limit
    if (isRateLimited(clientIP)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { 
          status: 429, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Parse request body
    const body = await req.json();
    
    // Validate all required fields
    const errors: string[] = [];
    
    if (!body.full_name || !isValidName(body.full_name)) {
      errors.push("Invalid name format");
    }
    
    if (!body.email || !isValidEmail(body.email)) {
      errors.push("Invalid email format");
    }
    
    if (!body.phone || !isValidPhone(body.phone)) {
      errors.push("Invalid phone format");
    }
    
    if (!body.investor_type || !isValidInvestorType(body.investor_type)) {
      errors.push("Invalid investor type");
    }
    
    if (!body.investment_amount_range || !isValidInvestmentRange(body.investment_amount_range)) {
      errors.push("Invalid investment range");
    }
    
    if (!body.investment_timeline || !isValidTimeline(body.investment_timeline)) {
      errors.push("Invalid timeline");
    }
    
    if (!isValidInterests(body.areas_of_interest)) {
      errors.push("Invalid areas of interest");
    }
    
    if (body.consents_to_data_processing !== true) {
      errors.push("Data processing consent required");
    }
    
    if (body.consents_to_contact !== true) {
      errors.push("Contact consent required");
    }
    
    if (errors.length > 0) {
      return new Response(
        JSON.stringify({ error: "Validation failed", details: errors }),
        { 
          status: 400, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    // Create Supabase client with service role (bypasses RLS)
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Prepare sanitized data
    const insertData = {
      full_name: body.full_name.trim().slice(0, 100),
      email: body.email.trim().toLowerCase().slice(0, 255),
      phone: body.phone.trim().slice(0, 20),
      country: "italy",
      investor_type: body.investor_type,
      investment_amount_range: body.investment_amount_range,
      investment_timeline: body.investment_timeline,
      accredited_investor: "unsure",
      areas_of_interest: body.areas_of_interest,
      consents_to_data_processing: true,
      consents_to_fadp: true,
      consents_to_contact: true,
      understands_no_commitment: true,
    };

    // Insert into database
    const { error: dbError } = await supabase
      .from("investor_interest")
      .insert([insertData]);

    if (dbError) {
      console.error("Database error:", dbError);
      return new Response(
        JSON.stringify({ error: "Failed to save submission" }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { 
        status: 200, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );

  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }
});
