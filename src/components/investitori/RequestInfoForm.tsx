import { useState, useEffect, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import {
  investorLeadSchema,
  type InvestorLeadInput,
} from "@/lib/validation/investorLead";
import { getUTMParams } from "@/hooks/useUTMTracking";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, AlertCircle, ArrowLeft, ArrowRight } from "lucide-react";

const RESIDENCE = ["IT", "CH", "EU", "OTHER"] as const;
const TICKET = ["5-10", "10-20", "20-50", "50+", "TBD"] as const;
const HORIZON = ["WEEKS", "1-3M", "3-6M", "6M+"] as const;
const EXPERIENCE = ["YES", "NO", "PARTIAL"] as const;

const DRAFT_KEY = "investor_form_draft_v1";
const DRAFT_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type Step = 1 | 2 | 3;
const STEP1_FIELDS: (keyof InvestorLeadInput)[] = ["fullName", "email", "phone"];
const STEP2_FIELDS: (keyof InvestorLeadInput)[] = [
  "taxResidence",
  "ticketRange",
  "horizon",
  "prevExperience",
];

export const RequestInfoForm = forwardRef<HTMLElement>((_props, ref) => {
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();
  const [step, setStep] = useState<Step>(1);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [partialSent, setPartialSent] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InvestorLeadInput>({
    resolver: zodResolver(investorLeadSchema),
    mode: "onBlur",
    defaultValues: {
      privacyConsent: false as unknown as true,
      ownInitiativeDeclaration: false as unknown as true,
      website: "",
    },
  });

  // Restore draft
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const { data, savedAt } = JSON.parse(raw);
      if (Date.now() - savedAt > DRAFT_TTL_MS) {
        localStorage.removeItem(DRAFT_KEY);
        return;
      }
      if (data) reset({ ...data, privacyConsent: false, ownInitiativeDeclaration: false });
    } catch {
      /* ignore */
    }
    trackEvent("investor_full_form_view");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Autosave on change (debounced via field changes)
  const watched = watch();
  useEffect(() => {
    const handle = setTimeout(() => {
      try {
        const { privacyConsent, ownInitiativeDeclaration, ...persistable } = watched;
        localStorage.setItem(
          DRAFT_KEY,
          JSON.stringify({ data: persistable, savedAt: Date.now() })
        );
      } catch {
        /* ignore */
      }
    }, 400);
    return () => clearTimeout(handle);
  }, [watched]);

  // Abandonment tracking
  useEffect(() => {
    const onLeave = () => {
      if (!submitted && step > 1) {
        trackEvent("investor_full_form_abandon", { step });
      }
    };
    window.addEventListener("beforeunload", onLeave);
    return () => window.removeEventListener("beforeunload", onLeave);
  }, [submitted, step, trackEvent]);

  useEffect(() => {
    trackEvent("investor_full_form_step_view", { step });
  }, [step, trackEvent]);

  const sendPartialLead = async () => {
    if (partialSent) return;
    const v = getValues();
    const utm = getUTMParams();
    try {
      await supabase.rpc("insert_lead", {
        _email: v.email.trim(),
        _name: v.fullName.trim(),
        _phone: v.phone?.trim() || null,
        _source: "investitori-memorandum-partial",
        _lead_type: "investor",
        _utm_source: utm.utm_source || null,
        _utm_medium: utm.utm_medium || null,
        _utm_campaign: utm.utm_campaign || null,
        _metadata: {
          stage: "partial_step1",
          submitted_at: new Date().toISOString(),
        } as never,
      });
      setPartialSent(true);
      trackEvent("investor_full_form_partial_lead");
    } catch (e) {
      console.error("Partial lead failed:", e);
    }
  };

  const goNext = async () => {
    const fields = step === 1 ? STEP1_FIELDS : STEP2_FIELDS;
    const ok = await trigger(fields);
    if (!ok) return;
    trackEvent("investor_full_form_step_complete", { step });
    if (step === 1) await sendPartialLead();
    setStep((s) => (s + 1) as Step);
  };

  const goBack = () => setStep((s) => Math.max(1, s - 1) as Step);

  const onSubmit = async (data: InvestorLeadInput) => {
    setServerError(null);
    if (data.website && data.website.length > 0) {
      setSubmitted(true);
      return;
    }
    const utm = getUTMParams();
    const timestamp = new Date().toISOString();

    try {
      const { error: dbError } = await supabase.rpc("insert_lead", {
        _email: data.email.trim(),
        _name: data.fullName.trim(),
        _phone: data.phone?.trim() || null,
        _source: "investitori-memorandum",
        _lead_type: "investor",
        _utm_source: utm.utm_source || null,
        _utm_medium: utm.utm_medium || null,
        _utm_campaign: utm.utm_campaign || null,
        _metadata: {
          stage: "qualified",
          tax_residence: data.taxResidence,
          ticket_range: data.ticketRange,
          horizon: data.horizon,
          prev_experience: data.prevExperience,
          source_text: data.source || null,
          notes: data.notes || null,
          privacy_consent: true,
          own_initiative_declaration: true,
          submitted_at: timestamp,
          user_agent: typeof navigator !== "undefined" ? navigator.userAgent : null,
        } as never,
      });

      if (dbError) {
        console.error("Investor lead insert failed:", dbError);
        setServerError(t("investor.landing.form.error"));
        return;
      }

      const idempotencyBase = `investor-info-${data.email.trim()}-${Date.now()}`;
      const templateData = {
        leadType: "investor",
        fullName: data.fullName.trim(),
        email: data.email.trim(),
        phone: data.phone?.trim() || null,
        taxResidence: data.taxResidence,
        ticketRange: data.ticketRange,
        horizon: data.horizon,
        prevExperience: data.prevExperience,
        source: data.source || null,
        notes: data.notes || null,
        submittedAt: timestamp,
      };

      supabase.functions
        .invoke("send-transactional-email", {
          body: {
            templateName: "investor-info-request-confirmation",
            recipientEmail: data.email.trim(),
            idempotencyKey: `${idempotencyBase}-confirm`,
            templateData,
          },
        })
        .catch((err) => console.error("Investor confirmation email failed:", err));

      supabase.functions
        .invoke("send-transactional-email", {
          body: {
            templateName: "investor-info-request-notification",
            idempotencyKey: `${idempotencyBase}-notify`,
            templateData,
          },
        })
        .catch((err) => console.error("Investor admin notification failed:", err));

      trackEvent("investor_full_form_submit_success");
      localStorage.removeItem(DRAFT_KEY);
      setSubmitted(true);
    } catch (err) {
      console.error("Unexpected investor form error:", err);
      setServerError(t("investor.landing.form.error"));
    }
  };

  if (submitted) {
    return (
      <section ref={ref} id="request-info" className="py-20 md:py-28 bg-background">
        <div className="container max-w-2xl mx-auto px-4 sm:px-6">
          <div className="border border-primary/20 bg-cream rounded-lg p-8 md:p-10 flex gap-4 items-start">
            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <p className="text-base text-foreground leading-relaxed">
              {t("investor.landing.form.success")}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const taxResidence = watch("taxResidence");
  const ticketRange = watch("ticketRange");
  const horizon = watch("horizon");
  const prevExperience = watch("prevExperience");

  const stepTitleKey = `investor.landing.form.steps.step${step}Title`;
  const stepSubtitleKey = `investor.landing.form.steps.step${step}Subtitle`;
  const progress = (step / 3) * 100;

  return (
    <section ref={ref} id="request-info" className="py-20 md:py-28 bg-background">
      <div className="container max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3 tracking-tight">
          {t("investor.landing.form.title")}
        </h2>
        <p className="text-base text-muted-foreground mb-8 leading-relaxed">
          {t("investor.landing.form.subtitle")}
        </p>

        <div className="mb-8">
          <div className="flex justify-between text-xs text-muted-foreground mb-2">
            <span>
              {t("investor.landing.form.steps.progress", { current: step, total: 3 })}
            </span>
            {partialSent && (
              <span className="text-primary">
                {t("investor.landing.form.steps.autoSaved")}
              </span>
            )}
          </div>
          <Progress value={progress} className="h-1.5" />
        </div>

        <div className="mb-6">
          <h3 className="font-serif text-xl md:text-2xl text-foreground mb-1">
            {t(stepTitleKey)}
          </h3>
          <p className="text-sm text-muted-foreground">{t(stepSubtitleKey)}</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Honeypot */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label>
              Website
              <input type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
            </label>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {step === 1 && (
                <>
                  <div>
                    <Label htmlFor="fullName">{t("investor.landing.form.fields.fullName")}</Label>
                    <Input id="fullName" {...register("fullName")} className="mt-1.5" autoFocus />
                    {errors.fullName && (
                      <p className="text-sm text-destructive mt-1">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="email">{t("investor.landing.form.fields.email")}</Label>
                    <Input id="email" type="email" {...register("email")} className="mt-1.5" />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  <div>
                    <Label htmlFor="phone">{t("investor.landing.form.fields.phone")}</Label>
                    <Input id="phone" type="tel" {...register("phone")} className="mt-1.5" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {t("investor.landing.form.fields.phoneHint")}
                    </p>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div>
                    <Label>{t("investor.landing.form.fields.taxResidence")}</Label>
                    <Select
                      value={taxResidence}
                      onValueChange={(v) =>
                        setValue("taxResidence", v as InvestorLeadInput["taxResidence"], {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder={t("investor.landing.form.selectPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {RESIDENCE.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {t(`investor.landing.form.options.residence.${opt}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.taxResidence && (
                      <p className="text-sm text-destructive mt-1">{errors.taxResidence.message}</p>
                    )}
                  </div>

                  <div>
                    <Label>{t("investor.landing.form.fields.ticketRange")}</Label>
                    <Select
                      value={ticketRange}
                      onValueChange={(v) =>
                        setValue("ticketRange", v as InvestorLeadInput["ticketRange"], {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder={t("investor.landing.form.selectPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {TICKET.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {t(`investor.landing.form.options.ticket.${opt}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.ticketRange && (
                      <p className="text-sm text-destructive mt-1">{errors.ticketRange.message}</p>
                    )}
                  </div>

                  <div>
                    <Label>{t("investor.landing.form.fields.horizon")}</Label>
                    <Select
                      value={horizon}
                      onValueChange={(v) =>
                        setValue("horizon", v as InvestorLeadInput["horizon"], {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder={t("investor.landing.form.selectPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {HORIZON.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {t(`investor.landing.form.options.horizon.${opt}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.horizon && (
                      <p className="text-sm text-destructive mt-1">{errors.horizon.message}</p>
                    )}
                  </div>

                  <div>
                    <Label>{t("investor.landing.form.fields.prevExperience")}</Label>
                    <Select
                      value={prevExperience}
                      onValueChange={(v) =>
                        setValue("prevExperience", v as InvestorLeadInput["prevExperience"], {
                          shouldValidate: true,
                        })
                      }
                    >
                      <SelectTrigger className="mt-1.5">
                        <SelectValue placeholder={t("investor.landing.form.selectPlaceholder")} />
                      </SelectTrigger>
                      <SelectContent>
                        {EXPERIENCE.map((opt) => (
                          <SelectItem key={opt} value={opt}>
                            {t(`investor.landing.form.options.experience.${opt}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.prevExperience && (
                      <p className="text-sm text-destructive mt-1">{errors.prevExperience.message}</p>
                    )}
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <div>
                    <Label htmlFor="source">{t("investor.landing.form.fields.source")}</Label>
                    <Textarea id="source" rows={2} {...register("source")} className="mt-1.5" />
                  </div>
                  <div>
                    <Label htmlFor="notes">{t("investor.landing.form.fields.notes")}</Label>
                    <Textarea id="notes" rows={4} {...register("notes")} className="mt-1.5" />
                  </div>
                  <div className="space-y-4 pt-4 border-t border-border/40">
                    <div className="flex gap-3 items-start">
                      <Checkbox
                        id="privacy"
                        onCheckedChange={(v) =>
                          setValue(
                            "privacyConsent",
                            v === true ? (true as const) : (false as unknown as true),
                            { shouldValidate: true }
                          )
                        }
                      />
                      <label
                        htmlFor="privacy"
                        className="text-sm text-foreground/90 leading-relaxed cursor-pointer"
                      >
                        {t("investor.landing.form.fields.privacyConsent")}
                      </label>
                    </div>
                    {errors.privacyConsent && (
                      <p className="text-sm text-destructive">{errors.privacyConsent.message}</p>
                    )}

                    <div className="flex gap-3 items-start">
                      <Checkbox
                        id="initiative"
                        onCheckedChange={(v) =>
                          setValue(
                            "ownInitiativeDeclaration",
                            v === true ? (true as const) : (false as unknown as true),
                            { shouldValidate: true }
                          )
                        }
                      />
                      <label
                        htmlFor="initiative"
                        className="text-sm text-foreground/90 leading-relaxed cursor-pointer"
                      >
                        {t("investor.landing.form.fields.ownInitiative")}
                      </label>
                    </div>
                    {errors.ownInitiativeDeclaration && (
                      <p className="text-sm text-destructive">
                        {errors.ownInitiativeDeclaration.message}
                      </p>
                    )}
                  </div>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          {serverError && (
            <div className="flex gap-2 items-start p-4 border border-destructive/30 bg-destructive/5 rounded-md">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{serverError}</p>
            </div>
          )}

          <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-between gap-3 pt-2">
            {step > 1 ? (
              <Button
                type="button"
                variant="ghost"
                onClick={goBack}
                className="rounded-full h-12 px-6"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("investor.landing.form.steps.back")}
              </Button>
            ) : (
              <span className="hidden sm:block" />
            )}

            {step < 3 ? (
              <Button
                type="button"
                size="lg"
                onClick={goNext}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 text-base font-medium"
              >
                {t("investor.landing.form.steps.next")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 text-base font-medium"
              >
                {isSubmitting
                  ? t("investor.landing.form.submitting")
                  : t("investor.landing.form.submit")}
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
});

RequestInfoForm.displayName = "RequestInfoForm";
