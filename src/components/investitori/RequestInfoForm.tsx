import { useState, forwardRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import {
  investorLeadSchema,
  type InvestorLeadInput,
} from "@/lib/validation/investorLead";
import { getUTMParams } from "@/hooks/useUTMTracking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckCircle2, AlertCircle } from "lucide-react";

const RESIDENCE = ["IT", "CH", "EU", "OTHER"] as const;
const TICKET = ["5-10", "10-20", "20-50", "50+", "TBD"] as const;
const HORIZON = ["WEEKS", "1-3M", "3-6M", "6M+"] as const;
const EXPERIENCE = ["YES", "NO", "PARTIAL"] as const;

export const RequestInfoForm = forwardRef<HTMLElement>((_props, ref) => {
  const { t } = useTranslation();
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<InvestorLeadInput>({
    resolver: zodResolver(investorLeadSchema),
    defaultValues: {
      privacyConsent: false as unknown as true,
      ownInitiativeDeclaration: false as unknown as true,
      website: "",
    },
  });

  const onSubmit = async (data: InvestorLeadInput) => {
    setServerError(null);

    // Honeypot — silent fail if filled
    if (data.website && data.website.length > 0) {
      setSubmitted(true);
      return;
    }

    const utm = getUTMParams();
    const timestamp = new Date().toISOString();

    try {
      // 1. Persist lead via RPC
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
          tax_residence: data.taxResidence,
          ticket_range: data.ticketRange,
          horizon: data.horizon,
          prev_experience: data.prevExperience,
          source_text: data.source || null,
          notes: data.notes || null,
          privacy_consent: true,
          own_initiative_declaration: true,
          submitted_at: timestamp,
          user_agent:
            typeof navigator !== "undefined" ? navigator.userAgent : null,
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

      // 2. Confirmation to lead (fire-and-forget)
      supabase.functions
        .invoke("send-transactional-email", {
          body: {
            templateName: "investor-info-request-confirmation",
            recipientEmail: data.email.trim(),
            idempotencyKey: `${idempotencyBase}-confirm`,
            templateData,
          },
        })
        .catch((err) =>
          console.error("Investor confirmation email failed:", err)
        );

      // 3. Admin notification (fire-and-forget)
      supabase.functions
        .invoke("send-transactional-email", {
          body: {
            templateName: "investor-info-request-notification",
            idempotencyKey: `${idempotencyBase}-notify`,
            templateData,
          },
        })
        .catch((err) =>
          console.error("Investor admin notification failed:", err)
        );

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

  return (
    <section ref={ref} id="request-info" className="py-20 md:py-28 bg-background">
      <div className="container max-w-2xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-3 tracking-tight">
          {t("investor.landing.form.title")}
        </h2>
        <p className="text-base text-muted-foreground mb-10 leading-relaxed">
          {t("investor.landing.form.subtitle")}
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {/* Honeypot */}
          <div className="absolute -left-[9999px]" aria-hidden="true">
            <label>
              Website
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                {...register("website")}
              />
            </label>
          </div>

          <div>
            <Label htmlFor="fullName">{t("investor.landing.form.fields.fullName")}</Label>
            <Input id="fullName" {...register("fullName")} className="mt-1.5" />
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

          <div>
            <Label>{t("investor.landing.form.fields.taxResidence")}</Label>
            <Select
              value={taxResidence}
              onValueChange={(v) => setValue("taxResidence", v as InvestorLeadInput["taxResidence"], { shouldValidate: true })}
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
              onValueChange={(v) => setValue("ticketRange", v as InvestorLeadInput["ticketRange"], { shouldValidate: true })}
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
              onValueChange={(v) => setValue("horizon", v as InvestorLeadInput["horizon"], { shouldValidate: true })}
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
              onValueChange={(v) => setValue("prevExperience", v as InvestorLeadInput["prevExperience"], { shouldValidate: true })}
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
                  setValue("privacyConsent", v === true ? (true as const) : (false as unknown as true), { shouldValidate: true })
                }
              />
              <label htmlFor="privacy" className="text-sm text-foreground/90 leading-relaxed cursor-pointer">
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
                  setValue("ownInitiativeDeclaration", v === true ? (true as const) : (false as unknown as true), { shouldValidate: true })
                }
              />
              <label htmlFor="initiative" className="text-sm text-foreground/90 leading-relaxed cursor-pointer">
                {t("investor.landing.form.fields.ownInitiative")}
              </label>
            </div>
            {errors.ownInitiativeDeclaration && (
              <p className="text-sm text-destructive">{errors.ownInitiativeDeclaration.message}</p>
            )}
          </div>

          {serverError && (
            <div className="flex gap-2 items-start p-4 border border-destructive/30 bg-destructive/5 rounded-md">
              <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-sm text-destructive">{serverError}</p>
            </div>
          )}

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
        </form>
      </div>
    </section>
  );
});

RequestInfoForm.displayName = "RequestInfoForm";
