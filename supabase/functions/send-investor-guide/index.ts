import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface InvestorGuideRequest {
  name: string;
  email: string;
  guideType: 'general' | 'turin';
  language?: string;
}

serve(async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, guideType, language = 'it' }: InvestorGuideRequest = await req.json();

    console.log(`Sending ${guideType} guide to ${email} (${name})`);

    // Determine guide content based on type
    const isGeneral = guideType === 'general';
    const guideTitle = isGeneral 
      ? (language === 'it' ? 'Guida Completa per Investitori Immobiliari' : 'Complete Guide for Real Estate Investors')
      : (language === 'it' ? 'Guida Investimenti Immobiliari a Torino' : 'Real Estate Investment Guide - Turin');

    const guideDescription = isGeneral
      ? (language === 'it' 
          ? 'tutto quello che devi sapere su mutui, finanziamenti e strategie di investimento'
          : 'everything you need to know about mortgages, financing and investment strategies')
      : (language === 'it'
          ? 'analisi dettagliata del mercato torinese, zone ad alto rendimento e opportunità'
          : 'detailed analysis of the Turin market, high-yield areas and opportunities');

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
              <h1 style="margin: 0;">🎉 Grazie ${name}!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">La tua guida è pronta</p>
            </div>
            <div class="content">
              <h2 style="color: #10b981;">📚 ${guideTitle}</h2>
              <p>Ciao ${name},</p>
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
                <a href="#" class="button">📥 Scarica la Guida PDF</a>
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
              <h1 style="margin: 0;">🎉 Thank you ${name}!</h1>
              <p style="margin: 10px 0 0 0; opacity: 0.9;">Your guide is ready</p>
            </div>
            <div class="content">
              <h2 style="color: #10b981;">📚 ${guideTitle}</h2>
              <p>Hello ${name},</p>
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
                <a href="#" class="button">📥 Download PDF Guide</a>
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
      from: "Jungle Rent <onboarding@resend.dev>", // Update with your verified domain
      to: [email],
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
