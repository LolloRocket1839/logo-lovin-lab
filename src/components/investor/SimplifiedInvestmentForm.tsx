import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle2, Loader2, ChevronRight, ChevronLeft, Save } from "lucide-react";
import logo from "@/assets/jungle-rent-logo-new.svg";
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/investor/LanguageSelector";
import { LanguageSelectionCard } from "@/components/investor/LanguageSelectionCard";

const STORAGE_KEY = "junglerent_investment_form_v3";

// Default country code for phone validation
const DEFAULT_COUNTRY: CountryCode = "IT";

// Simplified 4-step schema
const createFormSchema = (t: (key: string) => string) => z.object({
  // Step 1: Contact Info
  full_name: z.string()
    .trim()
    .min(2, t("errors.fullNameMin"))
    .max(100, t("errors.fullNameMax"))
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, t("errors.fullNamePattern")),
  email: z.string()
    .trim()
    .toLowerCase()
    .email(t("errors.invalidEmail"))
    .max(255, t("errors.emailMax")),
  phone: z.string()
    .trim()
    .min(1, t("errors.phoneRequired")),
  // Step 2: Investor Profile
  investor_type: z.string().min(1, t("errors.investorTypeRequired")),
  investment_amount_range: z.string().min(1, t("errors.investmentRangeRequired")),
  // Step 3: Goals
  investment_timeline: z.string().min(1, t("errors.timelineRequired")),
  areas_of_interest: z.array(z.string()).min(1, t("errors.interestsRequired")),
  // Step 4: Consents (simplified)
  consents_to_data_processing: z.boolean().refine((val) => val === true, t("errors.gdprRequired")),
  consents_to_contact: z.boolean().refine((val) => val === true, t("errors.consentRequired")),
}).refine((data) => {
  try {
    return isValidPhoneNumber(data.phone, DEFAULT_COUNTRY);
  } catch {
    return false;
  }
}, {
  message: t("errors.invalidPhone"),
  path: ["phone"],
});

type FormData = z.infer<ReturnType<typeof createFormSchema>>;

interface StepConfig {
  id: number;
  title: string;
  fields: (keyof FormData)[];
}

const SimplifiedInvestmentForm = () => {
  const { t, i18n } = useTranslation();
  const [languageSelected, setLanguageSelected] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSaveIndicator, setShowSaveIndicator] = useState(false);
  const navigate = useNavigate();

  const formSchema = createFormSchema(t);

  const steps: StepConfig[] = [
    { id: 0, title: t("questions.welcome"), fields: ["full_name", "email", "phone"] },
    { id: 1, title: t("questions.investmentGoals"), fields: ["investor_type", "investment_amount_range"] },
    { id: 2, title: t("questions.almostThere"), fields: ["investment_timeline", "areas_of_interest"] },
    { id: 3, title: t("questions.finalStep"), fields: ["consents_to_data_processing", "consents_to_contact"] },
  ];

  const getSavedFormData = (): Partial<FormData> => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.formData || {};
      }
    } catch (error) {
      console.error("Error loading saved form data:", error);
    }
    return {};
  };

  const savedData = getSavedFormData();
  const savedStep = parseInt(localStorage.getItem(`${STORAGE_KEY}_step`) || "0");

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      full_name: savedData.full_name || "",
      email: savedData.email || "",
      phone: savedData.phone || "+39 ",
      investor_type: savedData.investor_type || "",
      investment_amount_range: savedData.investment_amount_range || "",
      investment_timeline: savedData.investment_timeline || "",
      areas_of_interest: savedData.areas_of_interest || [],
      consents_to_data_processing: savedData.consents_to_data_processing || false,
      consents_to_contact: savedData.consents_to_contact || false,
    },
  });

  // Sync language with main page
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && savedLanguage !== 'cimode') {
      i18n.changeLanguage(savedLanguage);
      setLanguageSelected(true);
    }
  }, [i18n]);

  // Restore saved step
  useEffect(() => {
    if (languageSelected && savedStep > 0) {
      setCurrentStep(Math.min(savedStep, steps.length - 1));
      toast.info(t("autoSave.restored"));
    }
  }, [languageSelected]);

  // Pre-fill email from mini-form
  useEffect(() => {
    if (!languageSelected) return;
    const prefillEmail = localStorage.getItem('junglerent_prefill_email');
    if (prefillEmail && !form.getValues('email')) {
      form.setValue('email', prefillEmail);
      localStorage.removeItem('junglerent_prefill_email');
    }
  }, [languageSelected, form]);

  // Auto-save form data
  useEffect(() => {
    if (!languageSelected) return;
    const subscription = form.watch((formData) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, timestamp: new Date() }));
        localStorage.setItem(`${STORAGE_KEY}_step`, currentStep.toString());
        setShowSaveIndicator(true);
      } catch (error) {
        console.error("Error saving form data:", error);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, currentStep, languageSelected]);

  // Auto-hide save indicator
  useEffect(() => {
    if (showSaveIndicator) {
      const timer = setTimeout(() => setShowSaveIndicator(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [showSaveIndicator]);

  const currentStepConfig = steps[currentStep];

  // Check if current step is valid
  const isStepValid = () => {
    const fields = currentStepConfig.fields;
    return fields.every(field => {
      const value = form.getValues(field);
      const error = form.getFieldState(field).error;
      
      if (field === "areas_of_interest") {
        return Array.isArray(value) && value.length > 0 && !error;
      }
      if (field === "consents_to_data_processing" || field === "consents_to_contact") {
        return value === true;
      }
      return value !== "" && value !== undefined && !error;
    });
  };

  const formatPhoneNumber = (value: string) => {
    try {
      const phoneNumber = parsePhoneNumber(value, DEFAULT_COUNTRY);
      if (phoneNumber) {
        return phoneNumber.formatInternational();
      }
    } catch {
      // Return original value if parsing fails
    }
    return value;
  };

  const handleNext = () => {
    if (isStepValid() && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLanguageSelect = (languageCode: string) => {
    i18n.changeLanguage(languageCode);
    localStorage.setItem('i18nextLng', languageCode);
    setLanguageSelected(true);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    try {
      const insertData = {
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        country: "italy", // Default since we removed country selection
        investor_type: data.investor_type,
        investment_amount_range: data.investment_amount_range,
        investment_timeline: data.investment_timeline,
        accredited_investor: "unsure", // Default since we removed this
        areas_of_interest: data.areas_of_interest,
        consents_to_data_processing: data.consents_to_data_processing,
        consents_to_fadp: data.consents_to_data_processing, // Same as GDPR for simplicity
        consents_to_contact: data.consents_to_contact,
        understands_no_commitment: true, // Implied by form submission
      };
      
      const { error } = await supabase.from("investor_interest").insert([insertData]);
      
      if (error) throw error;

      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(`${STORAGE_KEY}_step`);

      toast.success(t("success.title"));
      navigate("/invest/success");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error(t("errors.submitFailed"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const investorTypes = [
    { value: "individual", label: t("investorTypes.individual") },
    { value: "company", label: t("investorTypes.company") },
    { value: "family_office", label: t("investorTypes.familyOffice") },
    { value: "other", label: t("investorTypes.other") },
  ];

  const investmentRanges = [
    { value: "100-5000", label: t("investmentRanges.100-5000") },
    { value: "5000-10000", label: t("investmentRanges.5000-10000") },
    { value: "10000-25000", label: t("investmentRanges.10000-25000") },
    { value: "25000-50000", label: t("investmentRanges.25000-50000") },
    { value: "50000-100000", label: t("investmentRanges.50000-100000") },
    { value: "100000+", label: t("investmentRanges.100000+") },
  ];

  const timelines = [
    { value: "immediate", label: t("timelines.immediate") },
    { value: "3_months", label: t("timelines.3months") },
    { value: "6_months", label: t("timelines.6months") },
    { value: "exploratory", label: t("timelines.exploratory") },
  ];

  const interests = [
    { value: "equity", label: t("interests.equity") },
    { value: "convertible", label: t("interests.convertible") },
    { value: "revenue", label: t("interests.revenue") },
    { value: "advisory", label: t("interests.advisory") },
  ];

  // Show language selection
  if (!languageSelected) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
        <div className="fixed inset-0 gradient-jungle-vertical" />
        <div className="relative z-10">
          <LanguageSelectionCard onLanguageSelect={handleLanguageSelect} />
        </div>
      </div>
    );
  }

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 gradient-jungle-vertical" />
      
      {/* Header */}
      <motion.header 
        className="relative py-4 md:py-8 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="container mx-auto max-w-2xl">
          <div className="relative flex items-center justify-center mb-4">
            <div className="absolute left-0">
              <Link 
                to="/"
                className="flex items-center gap-1.5 text-sm font-normal text-muted-foreground hover:text-foreground transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{t("header.backToWebsite")}</span>
              </Link>
            </div>
            <a href="https://junglerent.it" target="_blank" rel="noopener noreferrer">
              <img src={logo} alt="Jungle Rent" className="h-10 md:h-16 w-auto" />
            </a>
            <div className="absolute right-0">
              <LanguageSelector textColor="hsl(var(--foreground))" />
            </div>
          </div>
          <p className="text-sm md:text-base font-light text-muted-foreground text-center">
            {t("header.subtitle")}
          </p>
        </div>
      </motion.header>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <motion.div
          className="h-1.5 bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercentage}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Step Indicators */}
      <div className="relative px-4 mb-6">
        <div className="container mx-auto max-w-2xl">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <motion.div
                  className={`w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-colors ${
                    index <= currentStep 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}
                  animate={{ 
                    scale: index === currentStep ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.2 }}
                >
                  {index < currentStep ? (
                    <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5" />
                  ) : (
                    index + 1
                  )}
                </motion.div>
                {index < steps.length - 1 && (
                  <div className={`w-8 sm:w-16 md:w-24 h-0.5 mx-1 sm:mx-2 transition-colors ${
                    index < currentStep ? 'bg-primary' : 'bg-muted'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auto-save Indicator */}
      <AnimatePresence>
        {showSaveIndicator && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-20 right-4 z-50 flex items-center gap-1.5 bg-card/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-lg"
          >
            <Save className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-medium text-muted-foreground">{t("autoSave.saved")}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Form */}
      <main className="relative px-4 pb-32">
        <div className="container mx-auto max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-card/90 backdrop-blur-xl p-6 md:p-10 rounded-2xl shadow-xl"
                >
                  <h2 className="text-xl md:text-2xl font-bold mb-6 text-foreground">
                    {currentStepConfig.title}
                  </h2>

                  {/* Step 1: Contact Info */}
                  {currentStep === 0 && (
                    <div className="space-y-5">
                      <FormField
                        control={form.control}
                        name="full_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">{t("questions.fullName")}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={t("placeholders.fullName")}
                                className="h-12 md:h-14 text-base"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">{t("questions.email")}</FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder={t("placeholders.email")}
                                className="h-12 md:h-14 text-base"
                                {...field}
                                onChange={(e) => field.onChange(e.target.value.toLowerCase())}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">{t("questions.phone")}</FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder={t("placeholders.phone")}
                                className="h-12 md:h-14 text-base"
                                {...field}
                                onChange={(e) => field.onChange(formatPhoneNumber(e.target.value))}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 2: Investor Profile */}
                  {currentStep === 1 && (
                    <div className="space-y-5">
                      <FormField
                        control={form.control}
                        name="investor_type"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">{t("questions.investorType")}</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 md:h-14 text-base">
                                  <SelectValue placeholder={t("navigation.continue") + "..."} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {investorTypes.map((type) => (
                                  <SelectItem key={type.value} value={type.value} className="text-base py-3">
                                    {type.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="investment_amount_range"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">{t("questions.investmentRange")}</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 md:h-14 text-base">
                                  <SelectValue placeholder={t("navigation.continue") + "..."} />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {investmentRanges.map((range) => (
                                  <SelectItem key={range.value} value={range.value} className="text-base py-3">
                                    {range.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 3: Goals */}
                  {currentStep === 2 && (
                    <div className="space-y-5">
                      <FormField
                        control={form.control}
                        name="investment_timeline"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">{t("questions.investmentTimeline")}</FormLabel>
                            <div className="grid grid-cols-2 gap-3">
                              {timelines.map((timeline) => (
                                <motion.button
                                  key={timeline.value}
                                  type="button"
                                  onClick={() => field.onChange(timeline.value)}
                                  className={`p-4 rounded-xl text-sm font-medium transition-all ${
                                    field.value === timeline.value
                                      ? 'bg-primary text-primary-foreground shadow-lg'
                                      : 'bg-muted/50 text-foreground hover:bg-muted'
                                  }`}
                                  whileTap={{ scale: 0.98 }}
                                >
                                  {timeline.label}
                                </motion.button>
                              ))}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="areas_of_interest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-base font-semibold">{t("questions.areasOfInterest")}</FormLabel>
                            <div className="space-y-2">
                              {interests.map((interest) => {
                                const isChecked = field.value?.includes(interest.value);
                                return (
                                  <motion.div
                                    key={interest.value}
                                    onClick={() => {
                                      const current = field.value || [];
                                      field.onChange(
                                        isChecked
                                          ? current.filter((v) => v !== interest.value)
                                          : [...current, interest.value]
                                      );
                                    }}
                                    className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                                      isChecked ? 'bg-primary/10 ring-2 ring-primary/30' : 'bg-muted/30 hover:bg-muted/50'
                                    }`}
                                    whileTap={{ scale: 0.98 }}
                                  >
                                    <Checkbox checked={isChecked} />
                                    <span className="text-sm font-medium">{interest.label}</span>
                                    {isChecked && <CheckCircle2 className="w-4 h-4 text-primary ml-auto" />}
                                  </motion.div>
                                );
                              })}
                            </div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}

                  {/* Step 4: Consents */}
                  {currentStep === 3 && (
                    <div className="space-y-4">
                      <p className="text-sm text-muted-foreground mb-4">{t("questions.consentsLabel")}</p>
                      <FormField
                        control={form.control}
                        name="consents_to_data_processing"
                        render={({ field }) => (
                          <FormItem>
                            <motion.div
                              onClick={() => field.onChange(!field.value)}
                              className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                                field.value ? 'bg-primary/10 ring-2 ring-primary/30' : 'bg-muted/30 hover:bg-muted/50'
                              }`}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Checkbox checked={field.value} className="mt-0.5" />
                              <label className="text-sm leading-relaxed cursor-pointer flex-1">
                                {t("questions.gdprConsent")}
                              </label>
                              {field.value && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
                            </motion.div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="consents_to_contact"
                        render={({ field }) => (
                          <FormItem>
                            <motion.div
                              onClick={() => field.onChange(!field.value)}
                              className={`flex items-start gap-3 p-4 rounded-xl cursor-pointer transition-all ${
                                field.value ? 'bg-primary/10 ring-2 ring-primary/30' : 'bg-muted/30 hover:bg-muted/50'
                              }`}
                              whileTap={{ scale: 0.98 }}
                            >
                              <Checkbox checked={field.value} className="mt-0.5" />
                              <label className="text-sm leading-relaxed cursor-pointer flex-1">
                                {t("questions.consentContact")}
                              </label>
                              {field.value && <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />}
                            </motion.div>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Buttons - Fixed at bottom */}
              <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-xl border-t border-border p-4 z-40">
                <div className="container mx-auto max-w-2xl flex gap-3">
                  {currentStep > 0 && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleBack}
                      className="h-14 px-6 text-base"
                    >
                      <ChevronLeft className="w-5 h-5 mr-1" />
                      {t("navigation.back")}
                    </Button>
                  )}
                  
                  {currentStep < steps.length - 1 ? (
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className="flex-1 h-14 text-base font-semibold"
                    >
                      {t("navigation.continue")}
                      <ChevronRight className="w-5 h-5 ml-1" />
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      disabled={!isStepValid() || isSubmitting}
                      className="flex-1 h-14 text-base font-semibold"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          {t("navigation.submit")}...
                        </>
                      ) : (
                        <>
                          {t("navigation.submit")}
                          <CheckCircle2 className="w-5 h-5 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </div>
      </main>

      {/* Footer */}
      <div className="relative text-center py-4">
        <a 
          href="https://junglerent.it" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-xs text-muted-foreground hover:text-foreground transition-colors"
        >
          {t("footer.visitWebsite")}
        </a>
      </div>
    </div>
  );
};

export default SimplifiedInvestmentForm;
