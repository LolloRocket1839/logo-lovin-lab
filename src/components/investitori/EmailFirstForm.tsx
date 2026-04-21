import { useState, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { getUTMParams } from "@/hooks/useUTMTracking";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";

const schema = z.object({
  fullName: z.string().trim().min(2, { message: "Min 2 caratteri" }).max(100),
  email: z.string().trim().email({ message: "Email non valida" }).max(255),
  website: z.string().max(0).optional(), // honeypot
});

type FormInput = z.infer<typeof schema>;

interface Props {
  onRequestFullForm: () => void;
}

export const EmailFirstForm = forwardRef<HTMLElement, Props>(({ onRequestFullForm }, ref) => {
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormInput, string>>>({});
  const [values, setValues] = useState<FormInput>({ fullName: "", email: "", website: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError(null);
    setErrors({});

    const parsed = schema.safeParse(values);
    if (!parsed.success) {
      const fieldErrors: typeof errors = {};
      parsed.error.issues.forEach((issue) => {
        const k = issue.path[0] as keyof FormInput;
        fieldErrors[k] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    if (parsed.data.website) {
      setSubmitted(true);
      return;
    }

    setSubmitting(true);
    try {
      const utm = getUTMParams();
      const { error } = await supabase.rpc("insert_lead", {
        _email: parsed.data.email,
        _name: parsed.data.fullName,
        _phone: null,
        _source: "investitori-email-first",
        _lead_type: "investor",
        _utm_source: utm.utm_source || null,
        _utm_medium: utm.utm_medium || null,
        _utm_campaign: utm.utm_campaign || null,
        _metadata: {
          form_type: "email_first",
          submitted_at: new Date().toISOString(),
        } as never,
      });

      if (error) {
        console.error("Email-first lead failed:", error);
        setServerError(t("investor.landing.emailFirst.error"));
        return;
      }

      trackEvent("investor_form_email_only_submit", { source: "investitori-email-first" });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setServerError(t("investor.landing.emailFirst.error"));
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <section ref={ref} id="email-first" className="py-14 md:py-16 bg-background">
        <div className="container max-w-2xl mx-auto px-4 sm:px-6">
          <div className="border border-primary/20 bg-cream rounded-lg p-6 md:p-8 flex gap-4 items-start">
            <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" strokeWidth={1.5} />
            <div className="space-y-3">
              <p className="text-base text-foreground leading-relaxed">
                {t("investor.landing.emailFirst.success")}
              </p>
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

  return (
    <section ref={ref} id="email-first" className="py-14 md:py-16 bg-background">
      <div className="container max-w-2xl mx-auto px-4 sm:px-6">
        <div className="border border-border/40 bg-cream/40 rounded-lg p-6 md:p-8">
          <h2 className="font-serif text-2xl md:text-3xl text-foreground mb-2 tracking-tight">
            {t("investor.landing.emailFirst.title")}
          </h2>
          <p className="text-sm md:text-base text-muted-foreground mb-6 leading-relaxed">
            {t("investor.landing.emailFirst.subtitle")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div className="absolute -left-[9999px]" aria-hidden="true">
              <input
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={(e) => setValues((v) => ({ ...v, website: e.target.value }))}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ef-name">{t("investor.landing.emailFirst.fields.name")}</Label>
                <Input
                  id="ef-name"
                  value={values.fullName}
                  onChange={(e) => setValues((v) => ({ ...v, fullName: e.target.value }))}
                  className="mt-1.5"
                  autoComplete="name"
                />
                {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
              </div>
              <div>
                <Label htmlFor="ef-email">{t("investor.landing.emailFirst.fields.email")}</Label>
                <Input
                  id="ef-email"
                  type="email"
                  value={values.email}
                  onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
                  className="mt-1.5"
                  autoComplete="email"
                />
                {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
              </div>
            </div>

            {serverError && (
              <div className="flex gap-2 items-start p-3 border border-destructive/30 bg-destructive/5 rounded-md">
                <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{serverError}</p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 sm:items-center pt-1">
              <Button
                type="submit"
                disabled={submitting}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 h-11 text-sm font-medium"
              >
                {submitting ? t("investor.landing.emailFirst.submitting") : t("investor.landing.emailFirst.submit")}
              </Button>
              <button
                type="button"
                onClick={onRequestFullForm}
                className="text-sm text-muted-foreground hover:text-foreground underline underline-offset-4 text-left"
              >
                {t("investor.landing.emailFirst.preferFull")}
              </button>
            </div>

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
