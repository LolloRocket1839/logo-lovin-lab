import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Team email addresses to notify
const TEAM_EMAILS = ["team@junglerent.it"];

interface LeadNotificationRequest {
  leadId: string;
  email: string;
  phone?: string;
  zone?: string;
  sqm?: number;
  condition?: string;
  estimatedValue?: number;
  hasPhotos: boolean;
  photoCount: number;
  hasVideo: boolean;
  source?: string;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
};

const getConditionLabel = (condition?: string): string => {
  switch (condition) {
    case 'renovated': return '🏠 Ristrutturato';
    case 'good': return '✅ Buono stato';
    case 'renovate': return '🔧 Da ristrutturare';
    default: return condition || 'Non specificato';
  }
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const leadData: LeadNotificationRequest = await req.json();
    
    console.log("📧 Sending lead notification for:", leadData.leadId);

    // Build email content
    const mediaSection = [];
    if (leadData.hasPhotos) {
      mediaSection.push(`📸 <strong>${leadData.photoCount} foto</strong> caricate`);
    }
    if (leadData.hasVideo) {
      mediaSection.push(`🎥 <strong>Video tour</strong> caricato`);
    }
    
    const mediaHtml = mediaSection.length > 0 
      ? `<div style="background: #e8f5e9; padding: 12px; border-radius: 8px; margin: 16px 0;">
          <strong style="color: #2e7d32;">📦 Media allegati:</strong><br/>
          ${mediaSection.join('<br/>')}
        </div>`
      : `<div style="background: #fff3e0; padding: 12px; border-radius: 8px; margin: 16px 0;">
          <strong style="color: #e65100;">⚠️ Nessun media allegato</strong>
        </div>`;

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; background: #f5f5f5;">
        <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          
          <!-- Header -->
          <div style="background: linear-gradient(135deg, #16a34a 0%, #15803d 100%); padding: 24px; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">🏡 Nuovo Lead Immobiliare!</h1>
            <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 14px;">
              Richiesta ricevuta da ${leadData.source || 'property-valuator'}
            </p>
          </div>
          
          <!-- Content -->
          <div style="padding: 24px;">
            
            <!-- Contact Info -->
            <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
              <h2 style="margin: 0 0 12px 0; font-size: 16px; color: #334155;">📞 Contatto</h2>
              <p style="margin: 4px 0; color: #475569;">
                <strong>Email:</strong> <a href="mailto:${leadData.email}" style="color: #16a34a;">${leadData.email}</a>
              </p>
              ${leadData.phone ? `<p style="margin: 4px 0; color: #475569;"><strong>Telefono:</strong> <a href="tel:${leadData.phone}" style="color: #16a34a;">${leadData.phone}</a></p>` : ''}
            </div>
            
            <!-- Property Info -->
            <div style="background: #f8fafc; padding: 16px; border-radius: 8px; margin-bottom: 16px;">
              <h2 style="margin: 0 0 12px 0; font-size: 16px; color: #334155;">🏠 Immobile</h2>
              ${leadData.zone ? `<p style="margin: 4px 0; color: #475569;"><strong>Zona:</strong> ${leadData.zone}</p>` : ''}
              ${leadData.sqm ? `<p style="margin: 4px 0; color: #475569;"><strong>Superficie:</strong> ${leadData.sqm} mq</p>` : ''}
              ${leadData.condition ? `<p style="margin: 4px 0; color: #475569;"><strong>Stato:</strong> ${getConditionLabel(leadData.condition)}</p>` : ''}
              ${leadData.estimatedValue ? `<p style="margin: 4px 0; color: #475569;"><strong>Stima valore:</strong> <span style="color: #16a34a; font-weight: bold;">${formatCurrency(leadData.estimatedValue)}</span></p>` : ''}
            </div>
            
            <!-- Media Section -->
            ${mediaHtml}
            
            <!-- CTA -->
            <div style="text-align: center; margin-top: 24px;">
              <a href="https://supabase.com/dashboard/project/ekrrrlrwdshhlqnuxjbz/editor/29528?schema=public" 
                 style="display: inline-block; background: #16a34a; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: 600;">
                📊 Vedi Lead in Dashboard
              </a>
            </div>
            
            <!-- Footer -->
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #e2e8f0; text-align: center;">
              <p style="margin: 0; color: #94a3b8; font-size: 12px;">
                Lead ID: ${leadData.leadId}<br/>
                Ricevuto il: ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}
              </p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send notification email
    const emailResponse = await resend.emails.send({
      from: "Jungle Rent <notifications@junglerent.it>",
      to: TEAM_EMAILS,
      subject: `🏡 Nuovo Lead${leadData.hasPhotos || leadData.hasVideo ? ' con media' : ''} - ${leadData.zone || 'Torino'}`,
      html: emailHtml,
    });

    console.log("✅ Email sent successfully:", emailResponse);

    return new Response(
      JSON.stringify({ success: true, emailId: emailResponse.data?.id }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("❌ Error sending lead notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
