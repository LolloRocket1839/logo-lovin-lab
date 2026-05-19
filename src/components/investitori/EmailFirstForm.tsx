import { useState, forwardRef, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { getUTMParams } from "@/hooks/useUTMTracking";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck } from "lucide-react";

const emailSchema = z.object({
  email: z.string().trim().email({ message: "Email non valida" }).max(255),
  website: z.string().max(0).optional(), // honeypot
});

const nameSchema = z.string().trim().min(2, { message: "Min 2 caratteri" }).max(100);

interface Props {
  onRequestFullForm: () => void;
}

export const EmailFirstForm = forwardRef<HTMLElement, Props>(({ onRequestFullForm }, ref) => {
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();
  const sectionRef = useRef<HTMLElement | null>(null);
  const viewTrackedRef = useRef(false);
  const focusTrackedRef = useRef(false);

  const [submitting, setSubmitting] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [nameStepDone, setNameStepDone] = useState(false);
  const [leadId, setLeadId] = useState<string | null>(null);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");

  // Track form view (50% in viewport)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || viewTrackedRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !viewTrackedRef.current) {
            viewTrackedRef.current = true;
            trackEvent("investor_email_form_view", { source: "investitori-email-first" });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [trackEvent]);

  const setSectionRef = (node: HTMLElement | null) => {
    sectionRef.current = node;
    if (typeof ref === "function") ref(node);
    else if (ref) (ref as React.MutableRefObject<HTMLElement | null>).current = node;
  };

  const handleFieldFocus = () => {
    if (focusTrackedRef.current) return;
    focusTrackedRef.current = true;
    trackEvent("investor_email_form_field_focus", { field: "email" });
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setEmailError(null);

    const parsed = emailSchema.safeParse({ email, website: honeypot });
    if (!parsed.success) {
      setEmailError(parsed.error.issues[0]?.message || "Email non valida");
      return;
    }

    // Honeypot: silent success
    if (parsed.data.website) {
      setEmailSubmitted(true);
      return;
    }

    setSubmitting(true);
    try {
      const utm = getUTMParams();
      const { data, error } = await supabase.rpc("insert_lead", {
        _email: parsed.data.email,
        _name: null,
        _phone: null,
        _source: "investitori-email-first",
        _lead_type: "investor",
        _utm_source: utm.utm_source || null,
        _utm_medium: utm.utm_medium || null,
        _utm_campaign: utm.utm_campaign || null,
        _metadata: {
          form_type: "email_first",
          stage: "email_only",
          submitted_at: new Date().toISOString(),
        } as never,
      });

      if (error) {
        console.error("Email-first lead failed:", error);
        setServerError(t("investor.landing.emailFirst.error"));
        return;
      }

      if (typeof data === "string") setLeadId(data);
      trackEvent("investor_form_email_only_submit", { source: "investitori-email-first" });
      setEmailSubmitted(true);
    } catch (err) {
      console.error(err);
      setServerError(t("investor.landing.emailFirst.error"));
    } finally {
      setSubmitting(false);
    }
  };

  const handleNameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setNameError(null);

    const parsed = nameSchema.safeParse(name);
    if (!parsed.success) {
      setNameError(parsed.error.issues[0]?.message || "Nome non valido");
      return;
    }

    setSubmitting(true);
    try {
      // Upgrade lead by inserting a second record with the name (insert_lead is the only
      // public-allowed path; service-role updates the existing row via admin tooling).
      const utm = getUTMParams();
      await supabase.rpc("insert_lead", {
        _email: email,
        _name: parsed.data,
        _phone: null,
        _source: "investitori-email-first",
        _lead_type: "investor",
        _utm_source: utm.utm_source || null,
        _utm_medium: utm.utm_medium || null,
        _utm_campaign: utm.utm_campaign || null,
        _metadata: {
          form_type: "email_first",
          stage: "name_added",
          upgrade_of: leadId,
          submitted_at: new Date().toISOString(),
        } as never,
      });
      trackEvent("investor_form_name_progressive_submit", { source: "investitori-email-first" });
    } catch (err) {
      console.error("Name upgrade failed:", err);
    } finally {
      setSubmitting(false);
      setNameStepDone(true);
    }
  };

  const handleSkipName = () => {
    trackEvent("investor_form_name_skip", { source: "investitori-email-first" });
    setNameStepDone(true);
  };

  // SUCCESS STATE
  if (emailSubmitted) {
    return (
      <section ref={setSectionRef} id="email-first" className="py-14 md:py-16 bg-background">
        <div className="container max-w-2xl mx-auto px-4 sm:px-6">
          <div className="border border-primary/20 bg-cream rounded-lg p-6 md:p-8 space-y-5">
            <div className="flex gap-4 items-start">
              <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
              <p className="text-base text-foreground leading-relaxed">
                {t("investor.landing.emailFirst.success")}
              </p>
            </div>

            {!nameStepDone && (
              <form onSubmit={handleNameSubmit} className="space-y-3 pl-10">
                <Label htmlFor="ef-name-progressive" className="text-sm text-foreground/90">
                  {t("investor.landing.emailFirst.successNamePrompt")}
                </Label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Input
                    id="ef-name-progressive"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                    className="flex-1"
                    autoFocus
                  />
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 h-10 text-sm"
                  >
                    {t("investor.landing.emailFirst.saveName")}
                  </Button>
                  <button
                    type="button"
                    onClick={handleSkipName}
                    className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 self-center sm:self-auto px-2"
                  >
                    {t("investor.landing.emailFirst.skipName")}
                  </button>
                </div>
                {nameError && <p className="text-xs text-destructive">{nameError}</p>}
              </form>
            )}

            <div className="pl-10">
              <button
                onClick={onRequestFullForm}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:text-primary/80 underline underline-offset-4"
              >
                {t("investor.landing.emailFirst.alsoQualify")}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // INITIAL STATE — single email field
  return (
    <section ref={setSectionRef} id="email-first" className="py-14 md:py-16 bg-background">
      <div className="container max-w-2xl mx-auto px-4 sm:px-6">
        <div className="border border-border/40 bg-cream/40 rounded-lg p-6 md:p-8">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2 tracking-tight">
            {t("investor.landing.emailFirst.title")}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
            {t("investor.landing.emailFirst.subtitle")}
          </p>

          <form onSubmit={handleEmailSubmit} className="space-y-4" noValidate>
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <div className="flex-1">
                <Label htmlFor="ef-email" className="sr-only">
                  {t("investor.landing.emailFirst.fields.email")}
                </Label>
                <Input
                  id="ef-email"
                  type="email"
                  inputMode="email"
                  placeholder={t("investor.landing.emailFirst.fields.email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={handleFieldFocus}
                  className="h-12 text-base"
                  autoComplete="email"
                />
                {emailError && <p className="text-xs text-destructive mt-1">{emailError}</p>}
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 h-12 text-sm font-medium whitespace-nowrap"
              >
                {submitting ? t("investor.landing.emailFirst.submitting") : t("investor.landing.emailFirst.submit")}
              </Button>
            </div>

            {serverError && (
              <div className="flex gap-2 items-start p-3 border border-destructive/30 bg-destructive/5 rounded-md">
                <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{serverError}</p>
              </div>
            )}

            <div className="flex items-center gap-1.5 text-xs text-muted-foreground/90 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary/70 flex-shrink-0" strokeWidth={2} />
              <span>{t("investor.landing.emailFirst.trustLine")}</span>
            </div>

            <button
              type="button"
              onClick={onRequestFullForm}
              className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 text-left block"
            >
              {t("investor.landing.emailFirst.preferFull")}
            </button>

            <p className="text-xs text-muted-foreground/80 leading-relaxed pt-1">
              {t("investor.landing.emailFirst.privacy")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
});

EmailFirstForm.displayName = "EmailFirstForm";
