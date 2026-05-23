import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getUTMParams } from "@/hooks/useUTMTracking";

interface LeadData {
  email: string;
  name?: string;
  phone?: string;
  source: string;
  leadType: "investor" | "seller" | "student" | "general";
  metadata?: Record<string, unknown>;
}

interface FormspreeOptions {
  endpoint: string;
  subject: string;
  extraFields?: Record<string, unknown>;
}

export function useLeadCapture() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitLead = async (
    lead: LeadData,
    formspree: FormspreeOptions
  ): Promise<{ success: boolean; error?: string }> => {
    setIsSubmitting(true);
    const utm = getUTMParams();

    // Dual-write: DB + Formspree in parallel, independent error handling
    const [dbResult, formspreeResult] = await Promise.allSettled([
      // 1. Database via RPC
      supabase.rpc("insert_lead", {
        _email: lead.email.trim(),
        _name: lead.name?.trim() || null,
        _phone: lead.phone?.trim() || null,
        _source: lead.source,
        _lead_type: lead.leadType,
        _utm_source: utm.utm_source || null,
        _utm_medium: utm.utm_medium || null,
        _utm_campaign: utm.utm_campaign || null,
        _metadata: (lead.metadata || {}) as unknown as Record<string, never>,
      }),
      // 2. Formspree
      fetch(formspree.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: formspree.subject,
          email: lead.email.trim(),
          source: lead.source,
          type: lead.leadType,
          timestamp: new Date().toISOString(),
          utm_source: utm.utm_source || "",
          utm_medium: utm.utm_medium || "",
          utm_campaign: utm.utm_campaign || "",
          utm_content: utm.utm_content || "",
          utm_term: utm.utm_term || "",
          ...formspree.extraFields,
        }),
      }),
    ]);

    setIsSubmitting(false);

    // Log failures but don't block user
    if (dbResult.status === "rejected") {
      console.error("Lead DB insert failed:", dbResult.reason);
    } else if (dbResult.value?.error) {
      console.error("Lead DB insert error:", dbResult.value.error);
    }

    if (formspreeResult.status === "rejected") {
      console.error("Formspree submit failed:", formspreeResult.reason);
    } else if (!formspreeResult.value.ok) {
      console.error("Formspree response not ok:", formspreeResult.value.status);
    }

    // Consider success if at least one succeeded
    const dbOk =
      dbResult.status === "fulfilled" && !dbResult.value.error;
    const formspreeOk =
      formspreeResult.status === "fulfilled" && formspreeResult.value.ok;

    if (!dbOk && !formspreeOk) {
      return { success: false, error: "Both submissions failed" };
    }

    // Fire-and-forget emails (don't block on them)
    const emailPayload = {
      email: lead.email.trim(),
      name: lead.name?.trim() || undefined,
      phone: lead.phone?.trim() || undefined,
      leadType: lead.leadType,
      source: lead.source,
      utmSource: utm.utm_source || undefined,
      utmMedium: utm.utm_medium || undefined,
      utmCampaign: utm.utm_campaign || undefined,
      metadata: lead.metadata,
    };

    // 1. Confirmation email to the lead
    const confirmTemplate =
      lead.leadType === "seller" ? "seller-confirmation" : "lead-confirmation";

    supabase.functions
      .invoke("send-transactional-email", {
        body: {
          templateName: confirmTemplate,
          recipientEmail: lead.email.trim(),
          idempotencyKey: `lead-confirm-${lead.email.trim()}-${Date.now()}`,
          templateData: {
            leadType: lead.leadType,
            ...(lead.metadata?.estimated_value
              ? {
                  estimatedValue: new Intl.NumberFormat("it-IT", {
                    style: "currency",
                    currency: "EUR",
                    maximumFractionDigits: 0,
                  }).format(lead.metadata.estimated_value as number),
                }
              : {}),
          },
        },
      })
      .catch((err) => console.error("Confirmation email failed:", err));

    // 2. Admin notification email
    supabase.functions
      .invoke("send-transactional-email", {
        body: {
          templateName: "lead-notification",
          idempotencyKey: `lead-notify-${lead.email.trim()}-${Date.now()}`,
          templateData: emailPayload,
        },
      })
      .catch((err) => console.error("Admin notification email failed:", err));

    // 3. Instant WhatsApp ping to Lorenzo for priority leads
    //    - all investor leads
    //    - student leads from the Nizza Millefonti / hospitals pipeline
    //    - seller leads from the Lingotto / Nizza Millefonti pipeline
    const isPriorityStudent =
      lead.leadType === "student" &&
      /^nizza-millefonti/.test(lead.source);
    const isPrioritySeller =
      lead.leadType === "seller" &&
      /^vendi-lingotto-nizza-millefonti/.test(lead.source);
    if (lead.leadType === "investor" || isPriorityStudent || isPrioritySeller) {
      supabase.functions
        .invoke("notify-investor-whatsapp", { body: emailPayload })
        .catch((err) =>
          console.error("Priority WhatsApp notify failed:", err),
        );
    }

    return { success: true };
  };

  return { submitLead, isSubmitting };
}
