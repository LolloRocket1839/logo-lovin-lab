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
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";
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
  phone: z.string().trim().optional(),
  investment_budget: z.string().optional(),
  property_type: z.string().optional(),
  investment_horizon: z.string().optional(),
  referral_source: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: t("investorWaitlist.consentError"),
  }),
});

interface InvestorWaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InvestorWaitlistDialog = ({ open, onOpenChange }: InvestorWaitlistDialogProps) => {
  const { t } = useTranslation();
  const { incrementCount } = useWaitlistCounter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const investorWaitlistSchema = getInvestorWaitlistSchema(t);
  type InvestorWaitlistFormData = z.infer<typeof investorWaitlistSchema>;

  const form = useForm<InvestorWaitlistFormData>({
    resolver: zodResolver(investorWaitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      investment_budget: "",
      property_type: "",
      investment_horizon: "",
      referral_source: "",
      consent: false,
    },
  });

  const onSubmit = async (data: InvestorWaitlistFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formspree.io/f/xeojbzow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          investment_budget: data.investment_budget || "",
          property_type: data.property_type || "",
          investment_horizon: data.investment_horizon || "",
          referral_source: data.referral_source || "",
          consent: data.consent,
          user_type: "investor",
          _subject: "New Jungle Rent Investor Waitlist 💼",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      // Increment waitlist counter on successful submission
      incrementCount();

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
      <DialogContent className="sm:max-w-sm mx-4
                                bg-background/95 backdrop-blur-md
                                border border-border
                                shadow-2xl
                                max-h-[85vh] overflow-hidden
                                rounded-xl">
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-semibold text-foreground">
            {t("investorWaitlist.title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground pt-2">
            {t("investorWaitlist.description")}
          </DialogDescription>
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
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">{t("investorWaitlist.phoneLabel")}</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder={t("investorWaitlist.phonePlaceholder")}
                          {...field}
                          className="h-10
                                     bg-background
                                     border-border
                                     focus:border-primary focus:ring-1 focus:ring-primary/20
                                     transition-colors"
                        />
                      </FormControl>
                      {form.formState.errors.phone && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="investment_budget"
                  render={({ field }) => (
                    <FormItem>
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
                          <SelectItem value="50k-100k">{t("investorWaitlist.budgetRanges.50k-100k")}</SelectItem>
                          <SelectItem value="100k-200k">{t("investorWaitlist.budgetRanges.100k-200k")}</SelectItem>
                          <SelectItem value="200k-300k">{t("investorWaitlist.budgetRanges.200k-300k")}</SelectItem>
                          <SelectItem value="over-300k">{t("investorWaitlist.budgetRanges.over-300k")}</SelectItem>
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

                <FormField
                  control={form.control}
                  name="property_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">{t("investorWaitlist.propertyTypeLabel")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder={t("investorWaitlist.propertyTypePlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monolocale">{t("investorWaitlist.propertyTypes.monolocale")}</SelectItem>
                          <SelectItem value="bilocale">{t("investorWaitlist.propertyTypes.bilocale")}</SelectItem>
                          <SelectItem value="trilocale">{t("investorWaitlist.propertyTypes.trilocale")}</SelectItem>
                          <SelectItem value="appartamento-completo">{t("investorWaitlist.propertyTypes.appartamento-completo")}</SelectItem>
                          <SelectItem value="indeciso">{t("investorWaitlist.propertyTypes.indeciso")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.property_type && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.property_type.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="investment_horizon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">{t("investorWaitlist.investmentHorizonLabel")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder={t("investorWaitlist.investmentHorizonPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="short-term">{t("investorWaitlist.investmentHorizons.short-term")}</SelectItem>
                          <SelectItem value="medium-term">{t("investorWaitlist.investmentHorizons.medium-term")}</SelectItem>
                          <SelectItem value="long-term">{t("investorWaitlist.investmentHorizons.long-term")}</SelectItem>
                          <SelectItem value="flexible">{t("investorWaitlist.investmentHorizons.flexible")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.investment_horizon && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.investment_horizon.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referral_source"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel className="text-sm font-medium text-foreground">{t("investorWaitlist.referralLabel")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder={t("investorWaitlist.referralPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="network">{t("investorWaitlist.referralSources.network")}</SelectItem>
                          <SelectItem value="linkedin">{t("investorWaitlist.referralSources.linkedin")}</SelectItem>
                          <SelectItem value="referral">{t("investorWaitlist.referralSources.referral")}</SelectItem>
                          <SelectItem value="google">{t("investorWaitlist.referralSources.google")}</SelectItem>
                          <SelectItem value="ai-assistant">{t("investorWaitlist.referralSources.ai-assistant")}</SelectItem>
                          <SelectItem value="other">{t("investorWaitlist.referralSources.other")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.referral_source && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.referral_source.message}
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
