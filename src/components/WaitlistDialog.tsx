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

const getWaitlistSchema = (t: any) => z.object({
  name: z.string().trim().min(2, t("waitlist.nameError")).max(100),
  email: z.string().email(t("waitlist.emailError")).max(255),
  university: z.string().optional(),
  budget: z.string().optional(),
  move_date: z.string().optional(),
  referral_source: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: t("waitlist.consentError"),
  }),
});

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WaitlistDialog = ({ open, onOpenChange }: WaitlistDialogProps) => {
  const { t } = useTranslation();
  const { incrementCount } = useWaitlistCounter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const waitlistSchema = getWaitlistSchema(t);
  type WaitlistFormData = z.infer<typeof waitlistSchema>;

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      university: "",
      budget: "",
      move_date: "",
      referral_source: "",
      consent: false,
    },
  });

  const onSubmit = async (data: WaitlistFormData) => {
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
          university: data.university || "",
          budget: data.budget || "",
          move_date: data.move_date || "",
          referral_source: data.referral_source || "",
          consent: data.consent,
          user_type: "student",
          _subject: "New Jungle Rent Waitlist - React App 🚀",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      // Increment waitlist counter on successful submission
      incrementCount();

      toast({
        title: t("waitlist.successTitle"),
        description: t("waitlist.successDescription"),
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: t("waitlist.errorTitle"),
        description: t("waitlist.errorDescription"),
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
            {t("waitlist.title")}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground pt-2">
            {t("waitlist.description")}
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
                      <FormLabel className="text-sm font-medium text-foreground">{t("waitlist.nameLabel")}</FormLabel>
                      <FormControl>
                          <Input
                            placeholder={t("waitlist.namePlaceholder")}
                            {...field}
                            autoFocus
                            className="h-10 sm:h-11
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
                      <FormLabel className="text-sm font-medium text-foreground">{t("waitlist.emailLabel")}</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder={t("waitlist.emailPlaceholder")}
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
                  name="university"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">{t("waitlist.universityLabel")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder={t("waitlist.universityPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="polito">{t("waitlist.universities.polito")}</SelectItem>
                          <SelectItem value="unito">{t("waitlist.universities.unito")}</SelectItem>
                          <SelectItem value="escp">{t("waitlist.universities.escp")}</SelectItem>
                          <SelectItem value="ied">{t("waitlist.universities.ied")}</SelectItem>
                          <SelectItem value="iaad">{t("waitlist.universities.iaad")}</SelectItem>
                          <SelectItem value="iusto">{t("waitlist.universities.iusto")}</SelectItem>
                          <SelectItem value="other">{t("waitlist.universities.other")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.university && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.university.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="budget"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">{t("waitlist.budgetLabel")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder={t("waitlist.budgetPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="300-400">{t("waitlist.budgetRanges.300-400")}</SelectItem>
                          <SelectItem value="400-500">{t("waitlist.budgetRanges.400-500")}</SelectItem>
                          <SelectItem value="500-600">{t("waitlist.budgetRanges.500-600")}</SelectItem>
                          <SelectItem value="over-600">{t("waitlist.budgetRanges.over-600")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.budget && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.budget.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="move_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">{t("waitlist.moveDateLabel")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder={t("waitlist.moveDatePlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="september-2025">{t("waitlist.moveDates.september-2025")}</SelectItem>
                          <SelectItem value="january-2026">{t("waitlist.moveDates.january-2026")}</SelectItem>
                          <SelectItem value="asap">{t("waitlist.moveDates.asap")}</SelectItem>
                          <SelectItem value="other">{t("waitlist.moveDates.other")}</SelectItem>
                        </SelectContent>
                      </Select>
                      {form.formState.errors.move_date && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.move_date.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="referral_source"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">{t("waitlist.referralLabel")}</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder={t("waitlist.referralPlaceholder")} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="friend">{t("waitlist.referralSources.friend")}</SelectItem>
                          <SelectItem value="university">{t("waitlist.referralSources.university")}</SelectItem>
                          <SelectItem value="instagram">{t("waitlist.referralSources.instagram")}</SelectItem>
                          <SelectItem value="facebook">{t("waitlist.referralSources.facebook")}</SelectItem>
                          <SelectItem value="google">{t("waitlist.referralSources.google")}</SelectItem>
                          <SelectItem value="ai-assistant">{t("waitlist.referralSources.ai-assistant")}</SelectItem>
                          <SelectItem value="other">{t("waitlist.referralSources.other")}</SelectItem>
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
                          {t("waitlist.consentLabel")}
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
                className="w-full h-11 sm:h-12
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
                    {t("waitlist.submitting")}
                  </>
                ) : (
                  t("waitlist.submitButton")
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
