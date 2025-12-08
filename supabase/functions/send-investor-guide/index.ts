import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

// In-memory rate limiting (per function instance)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 3; // 3 emails per minute per IP (more restrictive for emails)

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

interface InvestorGuideRequest {
  name: string;
  email: string;
  guideType: 'general' | 'turin';
  language?: string;
}

// HTML escape function to prevent XSS/injection attacks
const escapeHtml = (str: string): string => {
  if (!str || typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Validate email format
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
};

// Validate name - alphanumeric, spaces, hyphens, apostrophes only
const isValidName = (name: string): boolean => {
  if (!name || typeof name !== 'string') return false;
  if (name.length < 1 || name.length > 100) return false;
  // Allow letters (including accented), spaces, hyphens, apostrophes
  const nameRegex = /^[\p{L}\s\-']+$/u;
  return nameRegex.test(name);
};

// Validate guideType
const isValidGuideType = (guideType: string): guideType is 'general' | 'turin' => {
  return guideType === 'general' || guideType === 'turin';
};

Deno.serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Get client IP for rate limiting
  const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                   req.headers.get("cf-connecting-ip") || 
                   "unknown";
  
  // Check rate limit (prevents email bombing)
  if (isRateLimited(clientIP)) {
    console.warn(`Rate limit exceeded for IP: ${clientIP}`);
    return new Response(
      JSON.stringify({ error: "Too many requests. Please try again later." }),
      { 
        status: 429, 
        headers: { ...corsHeaders, "Content-Type": "application/json" } 
      }
    );
  }

  try {
    const body = await req.json();
    const { name, email, guideType, language = 'it' } = body as InvestorGuideRequest;

    // Server-side input validation
    if (!name || !isValidName(name)) {
      console.error("Invalid name provided:", name);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid name. Must be 1-100 characters, letters only." 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!email || !isValidEmail(email)) {
      console.error("Invalid email provided:", email);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid email address." 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    if (!guideType || !isValidGuideType(guideType)) {
      console.error("Invalid guideType provided:", guideType);
      return new Response(
        JSON.stringify({ 
          success: false, 
          error: "Invalid guide type. Must be 'general' or 'turin'." 
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    // Sanitize name for HTML output
    const safeName = escapeHtml(name.trim());
    const safeEmail = email.toLowerCase().trim();

    console.log(`Sending ${guideType} guide to ${safeEmail} (${safeName})`);

    // Determine guide content based on type
    const isGeneral = guideType === 'general';
    const guideTitle = isGeneral 
      ? (language === 'it' ? 'Guida Completa per Investitori Immobiliari' : 'Complete Guide for Real Estate Investors')
      : (language === 'it' ? 'Guida Investimenti Immobiliari a Torino' : 'Real Estate Investment Guide - Turin');

    // Email content in Italian
    const htmlContent = language === 'it' ? `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
            .highlight { background: #dcfce7; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎉 Grazie ${safeName}!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">La tua guida è pronta</p>
            </div>
            <div class="content">
              <h2 style="color: #10b981;">📚 ${guideTitle}</h2>
              <p>Ciao ${safeName},</p>
              <p>Grazie per il tuo interesse in Jungle Rent! Siamo entusiasti di condividere con te la nostra esperienza nel settore degli investimenti immobiliari.</p>
              
              <div class="highlight">
                <strong>📖 Cosa troverai nella guida:</strong>
                <ul>
                  ${isGeneral ? `
                    <li>Come funzionano i mutui per investitori</li>
                    <li>Strategie di finanziamento ottimali</li>
                    <li>Calcolo del ROI e analisi di rendimento</li>
                    <li>Gestione fiscale e ottimizzazione</li>
                    <li>Errori comuni da evitare</li>
                  ` : `
                    <li>Analisi dettagliata del mercato torinese</li>
                    <li>Zone ad alto rendimento per studenti</li>
                    <li>Prezzi medi e tendenze del mercato</li>
                    <li>Il modello Jungle Rent spiegato</li>
                    <li>Case study e risultati concreti</li>
                  `}
                </ul>
              </div>

              <p style="text-align: center;">
                <a href="${isGeneral ? 'https://junglerent.it/blog/mutui-investitori-immobiliari-guida-completa' : 'https://junglerent.it/blog/investire-real-assets-torino-2025'}" class="button">📥 Leggi la Guida Completa</a>
              </p>

              <p><strong>Prossimi passi:</strong></p>
              <ol>
                <li>Leggi attentamente la guida</li>
                <li>Ti contatteremo entro 24h per una valutazione gratuita</li>
                <li>Risponderemo a tutte le tue domande</li>
              </ol>

              <p>Nel frattempo, se hai domande urgenti, non esitare a contattarci!</p>
              
              <p>A presto,<br><strong>Il Team Jungle Rent</strong></p>
            </div>
            <div class="footer">
              <p>Jungle Rent - Investimenti Immobiliari Intelligenti</p>
              <p style="font-size: 12px; color: #9ca3af;">Hai ricevuto questa email perché hai richiesto la nostra guida per investitori su junglerent.com</p>
            </div>
          </div>
        </body>
      </html>
    ` : `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
            .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; background: #10b981; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: 600; }
            .footer { text-align: center; color: #6b7280; font-size: 14px; margin-top: 30px; }
            .highlight { background: #dcfce7; padding: 15px; border-left: 4px solid #10b981; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1 style="margin: 0;">🎉 Thank you ${safeName}!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your guide is ready</p>
            </div>
            <div class="content">
              <h2 style="color: #10b981;">📚 ${guideTitle}</h2>
              <p>Hello ${safeName},</p>
              <p>Thank you for your interest in Jungle Rent! We're excited to share our experience in real estate investments with you.</p>
              
              <div class="highlight">
                <strong>📖 What you'll find in the guide:</strong>
                <ul>
                  ${isGeneral ? `
                    <li>How investor mortgages work</li>
                    <li>Optimal financing strategies</li>
                    <li>ROI calculation and yield analysis</li>
                    <li>Tax management and optimization</li>
                    <li>Common mistakes to avoid</li>
                  ` : `
                    <li>Detailed Turin market analysis</li>
                    <li>High-yield areas for students</li>
                    <li>Average prices and market trends</li>
                    <li>The Jungle Rent model explained</li>
                    <li>Case studies and concrete results</li>
                  `}
                </ul>
              </div>

              <p style="text-align: center;">
                <a href="${isGeneral ? 'https://junglerent.it/blog/mutui-investitori-immobiliari-guida-completa' : 'https://junglerent.it/blog/investire-real-assets-torino-2025'}" class="button">📥 Read the Complete Guide</a>
              </p>

              <p><strong>Next steps:</strong></p>
              <ol>
                <li>Read the guide carefully</li>
                <li>We'll contact you within 24h for a free consultation</li>
                <li>We'll answer all your questions</li>
              </ol>

              <p>In the meantime, if you have urgent questions, don't hesitate to contact us!</p>
              
              <p>See you soon,<br><strong>The Jungle Rent Team</strong></p>
            </div>
            <div class="footer">
              <p>Jungle Rent - Smart Real Estate Investments</p>
              <p style="font-size: 12px; color: #9ca3af;">You received this email because you requested our investor guide at junglerent.com</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const emailSubject = language === 'it'
      ? `📚 La tua ${guideTitle} è pronta!`
      : `📚 Your ${guideTitle} is ready!`;

    const { data, error } = await resend.emails.send({
      from: "Jungle Rent <noreply@junglerent.it>",
      to: [safeEmail],
      subject: emailSubject,
      html: htmlContent,
    });

    if (error) {
      console.error("Error sending email:", error);
      throw error;
    }

    console.log("Email sent successfully:", data);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: "Guide sent successfully",
        emailId: data?.id 
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-investor-guide function:", error);
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message 
      }),
      {
        status: 500,
        headers: { 
          "Content-Type": "application/json", 
          ...corsHeaders 
        },
      }
    );
  }
});
