import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeojbzow";

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
    case 'renovated': return 'Ristrutturato';
    case 'good': return 'Buono stato';
    case 'to_renovate': return 'Da ristrutturare';
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
    
    console.log("📧 Sending lead notification via Formspree for:", leadData.leadId);

    // Build message content
    const mediaInfo = [];
    if (leadData.hasPhotos) {
      mediaInfo.push(`📸 ${leadData.photoCount} foto caricate`);
    }
    if (leadData.hasVideo) {
      mediaInfo.push(`🎥 Video tour caricato`);
    }
    
    const message = `
🏡 NUOVO LEAD IMMOBILIARE

📞 CONTATTO
Email: ${leadData.email}
${leadData.phone ? `Telefono: ${leadData.phone}` : ''}

🏠 IMMOBILE
${leadData.zone ? `Zona: ${leadData.zone}` : ''}
${leadData.sqm ? `Superficie: ${leadData.sqm} mq` : ''}
${leadData.condition ? `Stato: ${getConditionLabel(leadData.condition)}` : ''}
${leadData.estimatedValue ? `Stima valore: ${formatCurrency(leadData.estimatedValue)}` : ''}

📦 MEDIA
${mediaInfo.length > 0 ? mediaInfo.join('\n') : 'Nessun media allegato'}

📍 FONTE: ${leadData.source || 'property-valuator'}
🔗 Lead ID: ${leadData.leadId}
    `.trim();

    // Send via Formspree
    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _subject: `🏡 Nuovo Lead${leadData.hasPhotos || leadData.hasVideo ? ' con media' : ''} - ${leadData.zone || 'Torino'}`,
        email: leadData.email,
        phone: leadData.phone || '',
        zona: leadData.zone || '',
        superficie: leadData.sqm ? `${leadData.sqm} mq` : '',
        stato: getConditionLabel(leadData.condition),
        stima_valore: leadData.estimatedValue ? formatCurrency(leadData.estimatedValue) : '',
        foto: leadData.hasPhotos ? `${leadData.photoCount} foto` : 'Nessuna',
        video: leadData.hasVideo ? 'Sì' : 'No',
        fonte: leadData.source || 'property-valuator',
        lead_id: leadData.leadId,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Formspree error: ${response.status}`);
    }

    console.log("✅ Notification sent successfully via Formspree");

    return new Response(
      JSON.stringify({ success: true }),
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
