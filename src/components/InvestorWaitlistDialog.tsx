import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { Loader2, InfoIcon } from "lucide-react";
import { turinAreas } from "@/data/turinAreas";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";
import { supabase } from "@/integrations/supabase/client";
import { useAnalytics } from "@/hooks/useAnalytics";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const getInvestorWaitlistSchema = (t: any) => z.object({
  name: z.string().trim().min(2, t("investorWaitlist.nameError")).max(100),
  email: z.string().email(t("investorWaitlist.emailError")).max(255),
  investment_budget: z.string().min(1, t("investorWaitlist.budgetError")),
  consent: z.boolean().refine((val) => val === true, {
    message: t("investorWaitlist.consentError"),
  }),
});

interface InvestorWaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guideType?: 'general' | 'torino';
}

interface InvestorWaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  guideType?: 'general' | 'torino';
}

export const InvestorWaitlistDialog = ({ open, onOpenChange, guideType = 'general' }: InvestorWaitlistDialogProps) => {
  const { t, i18n } = useTranslation();
  const { incrementCount } = useWaitlistCounter();
  const { trackFormSubmit } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const investorWaitlistSchema = getInvestorWaitlistSchema(t);
  type InvestorWaitlistFormData = z.infer<typeof investorWaitlistSchema>;

  const form = useForm<InvestorWaitlistFormData>({
    resolver: zodResolver(investorWaitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      investment_budget: "",
      consent: false,
    },
  });

  const onSubmit = async (data: InvestorWaitlistFormData) => {
    setIsSubmitting(true);

    try {
      const guideLabel = guideType === 'torino' ? 'GUIDA TORINO 2025' : 'GUIDA GENERALE';
      
      const response = await fetch("https://formspree.io/f/xeojbzow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          investment_budget: data.investment_budget,
          consent: data.consent,
          user_type: "investor",
          guide_requested: guideLabel,
          _subject: `🔥 NEW INVESTOR LEAD - Jungle Rent - ${guideLabel} - Budget: ${data.investment_budget}`,
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      // Send PDF guide via email using edge function
      try {
        const guideResponse = await supabase.functions.invoke('send-investor-guide', {
          body: {
            name: data.name,
            email: data.email,
            guideType: guideType,
            language: i18n.language,
          },
        });

        if (guideResponse.error) {
          console.error("Error sending guide:", guideResponse.error);
        } else {
          console.log("Guide sent successfully:", guideResponse.data);
        }
      } catch (emailError) {
        console.error("Error sending guide email:", emailError);
      }

      // Increment waitlist counter on successful submission
      incrementCount();

      // Track form submission
      trackFormSubmit('investor_waitlist', {
        investment_budget: data.investment_budget,
        guide_type: guideType,
      });

      toast({
        title: t("investorWaitlist.successTitle"),
        description: t("investorWaitlist.successDescription"),
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: t("investorWaitlist.errorTitle"),
        description: t("investorWaitlist.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[calc(100vw-2rem)] sm:max-w-sm md:max-w-md mx-4 sm:mx-auto
                                bg-background/95 backdrop-blur-md
                                border border-border
                                shadow-2xl
                                max-h-[85vh] sm:max-h-[90vh] overflow-hidden
                                rounded-xl p-4 sm:p-5 md:p-6">
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-semibold text-foreground">
            {t("investorWaitlist.title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground pt-2">
            {t("investorWaitlist.description")}
          </DialogDescription>
          <Card className="mt-4 p-3 bg-primary/5 border-primary/20">
            <div className="flex gap-2 items-start">
              <InfoIcon className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
              <p className="text-xs text-foreground">
                {guideType === 'torino' 
                  ? (i18n.language === 'en' 
                    ? "📥 You will receive via email the Complete Guide to the Best Real Estate Investments in Turin 2025 (full PDF) with detailed area analysis, prices per sqm, returns by neighborhood, student housing strategies and updated mortgage information."
                    : "📥 Riceverai via email la Guida ai Migliori Investimenti Immobiliari a Torino 2025 (PDF completa) con analisi dettagliata zone, prezzi al mq, rendimenti per quartiere, strategie student housing e info su mutui aggiornate.")
                  : (i18n.language === 'en'
                    ? "📥 You will receive via email the Complete Investor Guide (45-page PDF) with detailed business plan, real case studies and financial projections."
                    : "📥 Riceverai via email la Guida Completa per Investitori (PDF 45 pagine) con business plan dettagliato, case study reali e proiezioni finanziarie.")
                }
              </p>
            </div>
          </Card>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4 pt-4">
              <div className="grid grid-cols-1 min-[400px]:grid-cols-2 gap-3 sm:gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">{t("investorWaitlist.nameLabel")}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={t("investorWaitlist.namePlaceholder")}
                          {...field}
                          className="h-10
                                     bg-background
                                     border-border
                                     focus:border-primary focus:ring-1 focus:ring-primary/20
                                     transition-colors"
                        />
                      </FormControl>
                      {form.formState.errors.name && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.name.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">{t("investorWaitlist.emailLabel")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("investorWaitlist.emailPlaceholder")}
                          {...field}
                          className="h-10
                                     bg-background
                                     border-border
                                     focus:border-primary focus:ring-1 focus:ring-primary/20
                                     transition-colors"
                        />
                      </FormControl>
                      {form.formState.errors.email && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="investment_budget"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-sm font-medium text-foreground">{t("investorWaitlist.investmentBudgetLabel")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder={t("investorWaitlist.investmentBudgetPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="100-500">€100 - €500</SelectItem>
                          <SelectItem value="500-2k">€500 - €2.000</SelectItem>
                          <SelectItem value="2k-10k">€2.000 - €10.000</SelectItem>
                          <SelectItem value="10k-50k">€10.000 - €50.000</SelectItem>
                          <SelectItem value="50k-100k">€50k - €100k</SelectItem>
                          <SelectItem value="100k-200k">€100k - €200k</SelectItem>
                          <SelectItem value="200k-300k">€200k - €300k</SelectItem>
                          <SelectItem value="over-300k">&gt; €300k</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.investment_budget && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.investment_budget.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <div className="pt-2">
                <FormField
                  control={form.control}
                  name="consent"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-start gap-3 p-4 rounded-lg border border-border bg-muted/30">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="mt-0.5"
                          />
                        </FormControl>
                        <FormLabel className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed cursor-pointer">
                          {t("investorWaitlist.consentLabel")}
                        </FormLabel>
                      </div>
                      {form.formState.errors.consent && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.consent.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-11
                           bg-primary hover:bg-primary/90
                           text-primary-foreground
                           font-medium
                           shadow-md hover:shadow-lg
                           transition-all duration-300
                           disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t("investorWaitlist.submitting")}
                  </>
                ) : (
                  t("investorWaitlist.submitButton")
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
