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

// Validation helpers
const isValidEmail = (email: string): boolean => {
  if (!email || typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;
};

const sanitizeString = (str: string | undefined, maxLength: number): string => {
  if (!str || typeof str !== "string") return "";
  return str.replace(/[<>"'&]/g, "").trim().substring(0, maxLength);
};

const isValidPhone = (phone: string): boolean => {
  if (!phone || typeof phone !== "string") return false;
  return /^[\d\s\+\-\(\)]{6,20}$/.test(phone);
};

const ALLOWED_CONDITIONS = ["renovated", "good", "to_renovate"];

function validateLeadRequest(body: any): { valid: boolean; error?: string } {
  if (!body || typeof body !== "object") {
    return { valid: false, error: "Invalid request body" };
  }

  if (!body.leadId || typeof body.leadId !== "string" || body.leadId.length > 100) {
    return { valid: false, error: "Invalid leadId" };
  }

  if (!isValidEmail(body.email)) {
    return { valid: false, error: "Invalid email" };
  }

  if (body.phone && !isValidPhone(body.phone)) {
    return { valid: false, error: "Invalid phone number" };
  }

  if (body.sqm !== undefined && body.sqm !== null) {
    if (typeof body.sqm !== "number" || body.sqm < 5 || body.sqm > 10000 || !isFinite(body.sqm)) {
      return { valid: false, error: "Invalid sqm" };
    }
  }

  if (body.condition && !ALLOWED_CONDITIONS.includes(body.condition)) {
    return { valid: false, error: "Invalid condition" };
  }

  if (body.estimatedValue !== undefined && body.estimatedValue !== null) {
    if (typeof body.estimatedValue !== "number" || body.estimatedValue < 0 || body.estimatedValue > 50000000 || !isFinite(body.estimatedValue)) {
      return { valid: false, error: "Invalid estimatedValue" };
    }
  }

  if (body.photoCount !== undefined) {
    if (typeof body.photoCount !== "number" || body.photoCount < 0 || body.photoCount > 100) {
      return { valid: false, error: "Invalid photoCount" };
    }
  }

  return { valid: true };
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
    default: return 'Non specificato';
  }
};

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body = await req.json();

    // Validate all inputs
    const validation = validateLeadRequest(body);
    if (!validation.valid) {
      return new Response(
        JSON.stringify({ error: validation.error }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const leadData: LeadNotificationRequest = body;
    const safeEmail = leadData.email.toLowerCase().trim();
    const safeZone = sanitizeString(leadData.zone, 100);
    const safeSource = sanitizeString(leadData.source, 50) || "property-valuator";
    const safeLeadId = sanitizeString(leadData.leadId, 100);

    console.log("Sending lead notification for:", safeLeadId);

    const mediaInfo = [];
    if (leadData.hasPhotos) {
      mediaInfo.push(`${leadData.photoCount} foto caricate`);
    }
    if (leadData.hasVideo) {
      mediaInfo.push(`Video tour caricato`);
    }
    
    const message = `
NUOVO LEAD IMMOBILIARE

CONTATTO
Email: ${safeEmail}
${leadData.phone ? `Telefono: ${sanitizeString(leadData.phone, 20)}` : ''}

IMMOBILE
${safeZone ? `Zona: ${safeZone}` : ''}
${leadData.sqm ? `Superficie: ${leadData.sqm} mq` : ''}
${leadData.condition ? `Stato: ${getConditionLabel(leadData.condition)}` : ''}
${leadData.estimatedValue ? `Stima valore: ${formatCurrency(leadData.estimatedValue)}` : ''}

MEDIA
${mediaInfo.length > 0 ? mediaInfo.join('\n') : 'Nessun media allegato'}

FONTE: ${safeSource}
Lead ID: ${safeLeadId}
    `.trim();

    const response = await fetch(FORMSPREE_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _subject: `Nuovo Lead${leadData.hasPhotos || leadData.hasVideo ? ' con media' : ''} - ${safeZone || 'Torino'}`,
        email: safeEmail,
        phone: sanitizeString(leadData.phone, 20),
        zona: safeZone,
        superficie: leadData.sqm ? `${leadData.sqm} mq` : '',
        stato: getConditionLabel(leadData.condition),
        stima_valore: leadData.estimatedValue ? formatCurrency(leadData.estimatedValue) : '',
        foto: leadData.hasPhotos ? `${leadData.photoCount} foto` : 'Nessuna',
        video: leadData.hasVideo ? 'Sì' : 'No',
        fonte: safeSource,
        lead_id: safeLeadId,
        message,
      }),
    });

    if (!response.ok) {
      throw new Error(`Formspree error: ${response.status}`);
    }

    console.log("Notification sent successfully");

    return new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error sending lead notification:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send notification" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);