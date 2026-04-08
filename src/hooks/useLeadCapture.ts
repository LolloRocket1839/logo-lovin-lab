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
        _metadata: lead.metadata || {},
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

    return { success: true };
  };

  return { submitLead, isSubmitting };
}
