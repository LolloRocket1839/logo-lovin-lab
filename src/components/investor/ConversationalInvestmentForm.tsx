import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { CheckCircle2, Loader2, ChevronRight, ChevronLeft, Save, Sparkles } from "lucide-react";
import logo from "@/assets/jungle-rent-logo-new.svg";
import { parsePhoneNumber, isValidPhoneNumber, CountryCode } from "libphonenumber-js";
import { useTranslation } from "react-i18next";
import { LanguageSelector } from "@/components/investor/LanguageSelector";
import { LanguageSelectionCard } from "@/components/investor/LanguageSelectionCard";

// Animation variants
const inputFocusVariants = {
  idle: { scale: 1, boxShadow: "0 0 0 0 rgba(var(--accent), 0)" },
  focus: { scale: 1.01, boxShadow: "0 0 20px 2px hsla(var(--accent), 0.15)" },
};

const checkboxVariants = {
  unchecked: { scale: 1 },
  checked: { scale: [1, 1.2, 1] },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

// ConsentCheckbox component for reusability with animations
const ConsentCheckbox = ({ checked, onToggle, label }: { checked: boolean; onToggle: () => void; label: string }) => (
  <motion.div 
    className={`flex items-start space-x-3 p-4 rounded-lg cursor-pointer transition-all duration-200 ${
      checked ? 'bg-accent/10 ring-2 ring-accent/30' : 'bg-muted/50 hover:bg-muted/70'
    }`}
    variants={staggerItem}
    whileHover={{ scale: 1.01 }}
    whileTap={{ scale: 0.99 }}
    onClick={onToggle}
  >
    <motion.div
      animate={checked ? { scale: [1, 1.2, 1] } : { scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <Checkbox
        checked={checked}
        onCheckedChange={() => onToggle()}
        className="mt-1"
      />
    </motion.div>
    <label className="text-sm leading-relaxed cursor-pointer flex-1">
      {label}
    </label>
    <AnimatePresence>
      {checked && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
        >
          <CheckCircle2 className="w-5 h-5 text-accent" />
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

const STORAGE_KEY = "junglerent_investment_form_draft";

// Country code mapping
const COUNTRY_CODES: Record<string, CountryCode> = {
  italy: "IT",
  france: "FR",
  germany: "DE",
  spain: "ES",
  uk: "GB",
  usa: "US",
  other: "IT", // default to Italy
};

// Schema will be created inside component to access translations
const createFormSchema = (t: (key: string) => string) => z.object({
  full_name: z.string()
    .trim()
    .min(2, t("errors.fullNameMin"))
    .max(100, t("errors.fullNameMax"))
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, t("errors.fullNamePattern")),
  email: z.string()
    .trim()
    .toLowerCase()
    .email(t("errors.invalidEmail"))
    .max(255, t("errors.emailMax"))
    .refine((email) => {
      const domain = email.split("@")[1];
      if (!domain) return false;
      if (domain.includes("..") || domain.startsWith(".") || domain.endsWith(".")) return false;
      if (!domain.includes(".")) return false;
      return true;
    }, t("errors.emailTypo"))
    .refine((email) => {
      const suspicious = ["test@", "fake@", "example@", "noreply@"];
      return !suspicious.some(pattern => email.startsWith(pattern));
    }, t("errors.emailFake")),
  phone: z.string()
    .trim()
    .min(1, t("errors.phoneRequired")),
  country: z.string().min(1, t("errors.countryRequired")),
  investor_type: z.string().min(1, t("errors.investorTypeRequired")),
  investment_amount_range: z.string().min(1, t("errors.investmentRangeRequired")),
  investment_timeline: z.string().min(1, t("errors.timelineRequired")),
  heard_about: z.string().optional().default(""),
  investment_experience: z.string().optional().default(""),
  accredited_investor: z.string().min(1, t("errors.accreditedRequired")),
  areas_of_interest: z.array(z.string()).min(1, t("errors.interestsRequired")),
  additional_comments: z.string().optional().default(""),
  consents_to_data_processing: z.boolean().refine((val) => val === true, t("errors.gdprRequired")),
  consents_to_fadp: z.boolean().refine((val) => val === true, t("errors.fadpRequired")),
  consents_to_contact: z.boolean().refine((val) => val === true, t("errors.consentRequired")),
  understands_no_commitment: z.boolean().refine((val) => val === true, t("errors.commitmentRequired")),
}).refine((data) => {
  try {
    const countryCode = COUNTRY_CODES[data.country] || "IT";
    return isValidPhoneNumber(data.phone, countryCode);
  } catch {
    return false;
  }
}, {
  message: t("errors.invalidPhone"),
  path: ["phone"],
});

interface Question {
  id: string;
  labelKey: string;
  type: "text" | "email" | "tel" | "select" | "textarea" | "checkbox" | "multi-checkbox" | "consents";
  placeholderKey?: string;
  optionsKey?: string;
  descriptionKey?: string;
  sectionTitleKey?: string;
}

const ConversationalInvestmentForm = () => {
  const { t, i18n } = useTranslation();
  const [languageSelected, setLanguageSelected] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [inputFocused, setInputFocused] = useState(false);
  const [showMilestone, setShowMilestone] = useState(false);
  const shakeControls = useAnimation();
  const navigate = useNavigate();

  const formSchema = createFormSchema(t);
  type FormData = z.infer<typeof formSchema>;

  const questions: Question[] = [
    { id: "full_name", labelKey: "questions.fullName", type: "text", placeholderKey: "placeholders.fullName", sectionTitleKey: "questions.welcome" },
    { id: "email", labelKey: "questions.email", type: "email", placeholderKey: "placeholders.email" },
    { id: "phone", labelKey: "questions.phone", type: "tel", placeholderKey: "placeholders.phone" },
    { id: "country", labelKey: "questions.country", type: "select", optionsKey: "countries" },
    { id: "investor_type", labelKey: "questions.investorType", type: "select", optionsKey: "investorTypes" },
    { id: "investment_amount_range", labelKey: "questions.investmentRange", type: "select", sectionTitleKey: "questions.investmentGoals", optionsKey: "investmentRanges" },
    { id: "investment_timeline", labelKey: "questions.investmentTimeline", type: "select", optionsKey: "timelines" },
    { id: "accredited_investor", labelKey: "questions.accreditedInvestor", type: "select", optionsKey: "accredited" },
    { id: "areas_of_interest", labelKey: "questions.areasOfInterest", type: "multi-checkbox", optionsKey: "interests" },
    { id: "consents_to_data_processing", labelKey: "questions.consentsLabel", type: "consents", sectionTitleKey: "questions.finalStep" },
  ];

  const getOptionsForQuestion = (optionsKey?: string) => {
    if (!optionsKey) return [];
    const optionsMap: Record<string, string[]> = {
      countries: ["italy", "france", "germany", "spain", "uk", "usa", "other"],
      investorTypes: ["individual", "company", "familyOffice", "other"],
      investmentRanges: ["5000-10000", "10000-25000", "25000-50000", "50000-100000", "100000+"],
      timelines: ["immediate", "3months", "6months", "exploratory"],
      sources: ["linkedin", "referral", "news", "website", "event", "other"],
      accredited: ["yes", "no", "unsure"],
      interests: ["equity", "convertible", "revenue", "advisory"],
    };
    return (optionsMap[optionsKey] || []).map(key => ({
      value: key === "familyOffice" ? "family_office" : key === "3months" ? "3_months" : key === "6months" ? "6_months" : key,
      label: t(`${optionsKey}.${key}`)
    }));
  };

  // Load saved form data from localStorage
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
  const savedStep = savedData ? parseInt(localStorage.getItem(`${STORAGE_KEY}_step`) || "0") : 0;

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      full_name: savedData.full_name || "",
      email: savedData.email || "",
      phone: savedData.phone || "+39",
      country: savedData.country || "",
      investor_type: savedData.investor_type || "",
      investment_amount_range: savedData.investment_amount_range || "",
      investment_timeline: savedData.investment_timeline || "",
      heard_about: savedData.heard_about || "",
      investment_experience: savedData.investment_experience || "",
      accredited_investor: savedData.accredited_investor || "",
      areas_of_interest: savedData.areas_of_interest || [],
      additional_comments: savedData.additional_comments || "",
      consents_to_data_processing: savedData.consents_to_data_processing || false,
      consents_to_fadp: savedData.consents_to_fadp || false,
      consents_to_contact: savedData.consents_to_contact || false,
      understands_no_commitment: savedData.understands_no_commitment || false,
    },
  });

  // Check if language was previously selected and sync with main page
  useEffect(() => {
    const savedLanguage = localStorage.getItem('i18nextLng');
    if (savedLanguage && savedLanguage !== 'cimode') {
      i18n.changeLanguage(savedLanguage); // Sync investor form language with main page
      setLanguageSelected(true);
    }
  }, [i18n]);

  // Restore current step and completed steps if data was saved
  useEffect(() => {
    if (!languageSelected) return;
    
    if (savedStep > 0) {
      setCurrentStep(savedStep);
      const completed = new Set<number>();
      for (let i = 0; i < savedStep; i++) {
        completed.add(i);
      }
      setCompletedSteps(completed);
      toast.info(t("autoSave.restored"));
    }
  }, [t, languageSelected]);

  // Auto-save form data to localStorage
  useEffect(() => {
    if (!languageSelected) return;
    
    const subscription = form.watch((formData) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({ formData, timestamp: new Date() }));
        localStorage.setItem(`${STORAGE_KEY}_step`, currentStep.toString());
        setLastSaved(new Date());
      } catch (error) {
        console.error("Error saving form data:", error);
      }
    });
    return () => subscription.unsubscribe();
  }, [form, currentStep, languageSelected]);

  const currentQuestion = questions[currentStep];
  const fieldState = form.getFieldState(currentQuestion.id as keyof FormData);
  const fieldValue = form.watch(currentQuestion.id as keyof FormData);
  const selectedCountry = form.watch("country");
  // For consents step, check all 4 consent fields
  const consentsValid = currentQuestion.type === "consents" ? (
    form.watch("consents_to_data_processing") === true &&
    form.watch("consents_to_fadp") === true &&
    form.watch("consents_to_contact") === true &&
    form.watch("understands_no_commitment") === true
  ) : false;

  const isValid = !fieldState.error && (
    currentQuestion.type === "checkbox" ? fieldValue === true :
    currentQuestion.type === "multi-checkbox" ? (fieldValue as string[]).length > 0 :
    currentQuestion.type === "consents" ? consentsValid :
    currentQuestion.type === "textarea" && t(currentQuestion.labelKey).includes("optional") ? true :
    fieldValue !== "" && fieldValue !== undefined
  );

  // Format phone number as user types
  const formatPhoneNumber = (value: string, country: string) => {
    try {
      const countryCode = COUNTRY_CODES[country] || "IT";
      const phoneNumber = parsePhoneNumber(value, countryCode);
      if (phoneNumber) {
        return phoneNumber.formatInternational();
      }
    } catch {
      // Return original value if parsing fails
    }
    return value;
  };

  const gradientProgress = (currentStep / questions.length) * 100;
  
  // Dynamic text color for header/footer (on gradient background)
  const headerTextColor = gradientProgress > 50 
    ? 'hsl(var(--primary-foreground))' 
    : 'hsl(var(--foreground))';
  const headerSubtleTextColor = gradientProgress > 50 
    ? 'hsl(var(--primary-foreground) / 0.75)' 
    : 'hsl(var(--muted-foreground))';
  
  // Static dark text for card content (always readable on card backgrounds)
  const cardTextColor = 'hsl(var(--foreground))';
  const cardSubtleTextColor = 'hsl(var(--muted-foreground))';

  const handleNext = () => {
    if (isValid) {
      setCompletedSteps(new Set([...completedSteps, currentStep]));
      const nextStep = currentStep + 1;
      if (currentStep < questions.length - 1) {
        setCurrentStep(nextStep);
        // Show milestone celebration at step 5 (halfway)
        if (nextStep === 5) {
          setShowMilestone(true);
          setTimeout(() => setShowMilestone(false), 2000);
        }
      }
    } else {
      // Shake animation on invalid attempt
      shakeControls.start({
        x: [0, -10, 10, -10, 10, 0],
        transition: { duration: 0.4 }
      });
    }
  };

  // Animate card on step change
  useEffect(() => {
    shakeControls.start({ 
      opacity: 1, 
      y: 0, 
      scale: 1,
      x: 0,
      transition: { 
        duration: 0.4, 
        type: "spring", 
        stiffness: 300, 
        damping: 30 
      }
    });
  }, [currentStep, shakeControls]);

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (index: number) => {
    if (completedSteps.has(index)) {
      setCurrentStep(index);
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
        country: data.country,
        investor_type: data.investor_type,
        investment_amount_range: data.investment_amount_range,
        investment_timeline: data.investment_timeline,
        heard_about: data.heard_about || null,
        investment_experience: data.investment_experience || null,
        accredited_investor: data.accredited_investor,
        areas_of_interest: data.areas_of_interest,
        additional_comments: data.additional_comments || null,
        consents_to_data_processing: data.consents_to_data_processing,
        consents_to_fadp: data.consents_to_fadp,
        consents_to_contact: data.consents_to_contact,
        understands_no_commitment: data.understands_no_commitment,
      };
      
      const { error } = await supabase.from("investor_interest").insert([insertData]);
      
      if (error) throw error;

      // Clear saved form data after successful submission
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

  // Show language selection if not yet selected
  if (!languageSelected) {
    return (
      <div className="min-h-screen relative overflow-hidden flex items-center justify-center px-4">
        <div className="fixed inset-0 bg-gradient-to-br from-[hsl(38,45%,89%)] via-[hsl(38,35%,82%)] to-[hsl(92,40%,28%)]" />
        <div className="relative z-10">
          <LanguageSelectionCard onLanguageSelect={handleLanguageSelect} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Gradient Background */}
      <div 
        className="fixed inset-0 transition-all duration-1000 ease-in-out"
        style={{
          background: `linear-gradient(135deg, 
            hsl(38, 45%, 89%) 0%, 
            hsl(38, 45%, 89%) ${Math.max(0, 100 - gradientProgress - 20)}%,
            hsl(92, 40%, 28%) ${Math.min(100, 100 - gradientProgress + 20)}%, 
            hsl(92, 40%, 28%) 100%)`
        }}
      />
      

      {/* Hero Section */}
      <motion.header 
        className="relative py-8 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-4">
            <a 
              href="https://junglerent.it" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <img src={logo} alt="Jungle Rent" className="h-28 w-auto drop-shadow-lg" />
              <h1 className="text-3xl font-extrabold transition-colors duration-700 tracking-tight" style={{ color: headerTextColor }}>{t("header.title")}</h1>
            </a>
            <div className="flex items-center gap-4">
              <LanguageSelector textColor={headerTextColor} />
              <Link 
                to="/"
                className="flex items-center gap-2 text-sm font-normal hover:opacity-80 transition-all"
                style={{ color: headerSubtleTextColor }}
              >
                <ChevronLeft className="w-4 h-4" />
                {t("header.backToWebsite")}
              </Link>
            </div>
          </div>
          <p className="text-lg transition-colors duration-700 font-light" style={{ color: headerSubtleTextColor }}>
            {t("header.subtitle")}
          </p>
        </div>
      </motion.header>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <motion.div
          className="h-1 bg-accent"
          initial={{ width: 0 }}
          animate={{ 
            width: `${((currentStep + 1) / questions.length) * 100}%`,
            boxShadow: showMilestone ? "0 0 20px 4px hsla(var(--accent), 0.6)" : "0 2px 4px hsla(var(--accent), 0.3)"
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      </div>

      {/* Milestone Celebration */}
      <AnimatePresence>
        {showMilestone && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.5, y: -20 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-full shadow-xl"
          >
            <Sparkles className="w-5 h-5" />
            <span className="font-semibold">{t("navigation.halfway") || "Halfway there!"}</span>
            <Sparkles className="w-5 h-5" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auto-save Indicator */}
      <AnimatePresence>
        {lastSaved && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-card/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-border/50"
          >
            <Save className="w-4 h-4 text-accent" />
            <span className="text-xs font-normal transition-colors duration-700" style={{ color: cardTextColor }}>
              {t("autoSave.saved")}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat History - Show last 2-3 completed answers */}
      <div className="relative px-4 mb-8">
        <div className="container mx-auto max-w-2xl space-y-3">
          {questions.slice(Math.max(0, currentStep - 3), currentStep).map((q, index) => {
            const actualIndex = Math.max(0, currentStep - 3) + index;
            const value = form.getValues(q.id as keyof FormData);
            let displayValue = "";
            
            if (q.type === "select") {
              const options = getOptionsForQuestion(q.optionsKey);
              displayValue = options?.find(opt => opt.value === value)?.label || value as string;
            } else if (q.type === "multi-checkbox") {
              const options = getOptionsForQuestion(q.optionsKey);
              displayValue = (value as string[]).map(v => 
                options?.find(opt => opt.value === v)?.label
              ).join(", ");
            } else if (q.type === "checkbox") {
              displayValue = value ? "✓ " + t("navigation.submit") : "";
            } else if (q.type === "consents") {
              displayValue = "✓ " + t("questions.finalStep");
            } else if (q.type === "textarea" && !value) {
              displayValue = "—";
            } else {
              displayValue = value as string;
            }

            return (
              <motion.button
                key={actualIndex}
                className="w-full text-left p-4 bg-card/60 backdrop-blur-sm rounded-2xl hover:bg-card/70 transition-all cursor-pointer"
                onClick={() => handleStepClick(actualIndex)}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                  <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1 opacity-60" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs mb-0.5 transition-colors duration-700" style={{ color: cardSubtleTextColor }}>{t(q.labelKey)}</p>
                    <p className="text-sm font-medium truncate transition-colors duration-700" style={{ color: cardTextColor }}>{displayValue}</p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Current Question */}
      <main className="relative px-4 pb-20">
        <div className="container mx-auto max-w-2xl">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ 
                    duration: 0.4,
                    type: "spring",
                    stiffness: 300,
                    damping: 30
                  }}
                  className="bg-card/80 backdrop-blur-xl p-12 rounded-3xl shadow-2xl shadow-primary/5"
                >
                  {currentQuestion.sectionTitleKey && (
                    <motion.h2 
                      className="text-2xl font-extrabold mb-8 transition-colors duration-700 tracking-tight"
                      style={{ color: cardTextColor }}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      {t(currentQuestion.sectionTitleKey)}
                    </motion.h2>
                  )}

                  <FormField
                    control={form.control}
                    name={currentQuestion.id as keyof FormData}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-2xl font-extrabold mb-6 block leading-relaxed transition-colors duration-700" style={{ color: cardTextColor }}>
                          {t(currentQuestion.labelKey)}
                        </FormLabel>
                        {currentQuestion.descriptionKey && (
                          <FormDescription className="text-base mb-4">
                            {t(currentQuestion.descriptionKey)}
                          </FormDescription>
                        )}
                        <FormControl>
                          {currentQuestion.type === "text" || currentQuestion.type === "email" || currentQuestion.type === "tel" ? (
                            <motion.div 
                              className="relative"
                              variants={inputFocusVariants}
                              initial="idle"
                              animate={inputFocused ? "focus" : "idle"}
                              transition={{ duration: 0.2 }}
                            >
                              <Input
                                type={currentQuestion.type}
                                placeholder={currentQuestion.placeholderKey ? t(currentQuestion.placeholderKey) : ""}
                                className={`text-lg py-6 pr-12 transition-all duration-300 ${isValid ? 'border-accent ring-2 ring-accent/20' : ''}`}
                                {...field}
                                value={field.value as string}
                                onChange={(e) => {
                                  let value = e.target.value;
                                  
                                  if (currentQuestion.type === "email") {
                                    value = value.toLowerCase();
                                  }
                                  
                                  if (currentQuestion.type === "tel" && selectedCountry) {
                                    const formatted = formatPhoneNumber(value, selectedCountry);
                                    field.onChange(formatted);
                                    return;
                                  }
                                  
                                  field.onChange(value);
                                }}
                                onFocus={() => setInputFocused(true)}
                                onBlur={(e) => {
                                  setInputFocused(false);
                                  field.onBlur();
                                  if (currentQuestion.type === "tel" && selectedCountry) {
                                    const formatted = formatPhoneNumber(e.target.value, selectedCountry);
                                    field.onChange(formatted);
                                  }
                                }}
                                onKeyDown={(e) => {
                                  if (e.key === "Enter" && isValid) {
                                    e.preventDefault();
                                    handleNext();
                                  }
                                }}
                              />
                              <AnimatePresence>
                                {isValid && (
                                  <motion.div
                                    initial={{ scale: 0, rotate: -180, opacity: 0 }}
                                    animate={{ 
                                      scale: [0, 1.3, 1],
                                      rotate: 0,
                                      opacity: 1,
                                    }}
                                    exit={{ scale: 0, opacity: 0 }}
                                    transition={{
                                      duration: 0.4,
                                      type: "spring",
                                      stiffness: 500,
                                      damping: 15
                                    }}
                                    className="absolute right-4 top-1/2 -translate-y-1/2"
                                  >
                                    <CheckCircle2 className="w-6 h-6 text-accent" />
                                  </motion.div>
                                )}
                              </AnimatePresence>
                              {currentQuestion.type === "tel" && !selectedCountry && (
                                <motion.p 
                                  initial={{ opacity: 0, y: -5 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="text-sm text-muted-foreground mt-2"
                                >
                                  {t("errors.selectCountryFirst")}
                                </motion.p>
                              )}
                            </motion.div>
                          ) : currentQuestion.type === "textarea" ? (
                            <motion.div
                              variants={inputFocusVariants}
                              initial="idle"
                              animate={inputFocused ? "focus" : "idle"}
                            >
                              <Textarea
                                placeholder={currentQuestion.placeholderKey ? t(currentQuestion.placeholderKey) : ""}
                                className={`text-lg min-h-[120px] transition-all duration-300 ${isValid ? 'border-accent ring-2 ring-accent/20' : ''}`}
                                {...field}
                                value={field.value as string}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                              />
                            </motion.div>
                          ) : currentQuestion.type === "select" ? (
                            <motion.div
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <Select onValueChange={(value) => {
                                field.onChange(value);
                              }} value={field.value as string}>
                                <SelectTrigger className={`text-lg py-6 transition-all duration-300 ${isValid ? 'border-accent ring-2 ring-accent/20' : ''}`}>
                                  <SelectValue placeholder={t("navigation.continue") + "..."} />
                                </SelectTrigger>
                                <SelectContent>
                                  <motion.div
                                    variants={staggerContainer}
                                    initial="hidden"
                                    animate="show"
                                  >
                                    {getOptionsForQuestion(currentQuestion.optionsKey).map((option) => (
                                      <motion.div key={option.value} variants={staggerItem}>
                                        <SelectItem value={option.value} className="text-lg py-3 cursor-pointer">
                                          {option.label}
                                        </SelectItem>
                                      </motion.div>
                                    ))}
                                  </motion.div>
                                </SelectContent>
                              </Select>
                            </motion.div>
                          ) : currentQuestion.type === "checkbox" ? (
                            <motion.div 
                              className="flex items-start space-x-3 p-4 bg-muted/50 rounded-lg cursor-pointer"
                              whileHover={{ scale: 1.02, backgroundColor: "hsla(var(--muted), 0.7)" }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => field.onChange(!field.value)}
                            >
                              <motion.div
                                variants={checkboxVariants}
                                animate={field.value ? "checked" : "unchecked"}
                              >
                                <Checkbox
                                  checked={field.value as boolean}
                                  onCheckedChange={field.onChange}
                                  className="mt-1"
                                />
                              </motion.div>
                              <label className="text-base leading-relaxed cursor-pointer font-medium">
                                {t(currentQuestion.labelKey)}
                              </label>
                            </motion.div>
                          ) : currentQuestion.type === "multi-checkbox" ? (
                            <motion.div 
                              className="space-y-3"
                              variants={staggerContainer}
                              initial="hidden"
                              animate="show"
                            >
                              {getOptionsForQuestion(currentQuestion.optionsKey).map((option, index) => {
                                const isChecked = (field.value as string[])?.includes(option.value);
                                return (
                                  <motion.div 
                                    key={option.value} 
                                    variants={staggerItem}
                                    className={`flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 cursor-pointer ${
                                      isChecked ? 'bg-accent/10 ring-2 ring-accent/30' : 'bg-muted/30 hover:bg-muted/50'
                                    }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                      const current = field.value as string[] || [];
                                      field.onChange(
                                        isChecked
                                          ? current.filter((v) => v !== option.value)
                                          : [...current, option.value]
                                      );
                                    }}
                                  >
                                    <motion.div
                                      variants={checkboxVariants}
                                      animate={isChecked ? "checked" : "unchecked"}
                                    >
                                      <Checkbox
                                        checked={isChecked}
                                        onCheckedChange={(checked) => {
                                          const current = field.value as string[] || [];
                                          field.onChange(
                                            checked
                                              ? [...current, option.value]
                                              : current.filter((v) => v !== option.value)
                                          );
                                        }}
                                      />
                                    </motion.div>
                                    <label className="text-base cursor-pointer flex-1 font-medium">
                                      {option.label}
                                    </label>
                                    {isChecked && (
                                      <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        exit={{ scale: 0 }}
                                      >
                                        <CheckCircle2 className="w-5 h-5 text-accent" />
                                      </motion.div>
                                    )}
                                  </motion.div>
                                );
                              })}
                            </motion.div>
                          ) : currentQuestion.type === "consents" ? (
                            <motion.div 
                              className="space-y-4"
                              variants={staggerContainer}
                              initial="hidden"
                              animate="show"
                            >
                              {/* GDPR Consent */}
                              <ConsentCheckbox
                                checked={form.watch("consents_to_data_processing")}
                                onToggle={() => form.setValue("consents_to_data_processing", !form.watch("consents_to_data_processing"))}
                                label={t("questions.gdprConsent")}
                              />
                              
                              {/* FADP Consent */}
                              <ConsentCheckbox
                                checked={form.watch("consents_to_fadp")}
                                onToggle={() => form.setValue("consents_to_fadp", !form.watch("consents_to_fadp"))}
                                label={t("questions.fadpConsent")}
                              />
                              
                              {/* Contact Consent */}
                              <ConsentCheckbox
                                checked={form.watch("consents_to_contact")}
                                onToggle={() => form.setValue("consents_to_contact", !form.watch("consents_to_contact"))}
                                label={t("questions.consentContact")}
                              />
                              
                              {/* No Commitment */}
                              <ConsentCheckbox
                                checked={form.watch("understands_no_commitment")}
                                onToggle={() => form.setValue("understands_no_commitment", !form.watch("understands_no_commitment"))}
                                label={t("questions.understandNoCommitment")}
                              />
                            </motion.div>
                          ) : null}
                        </FormControl>
                        <FormMessage className="text-base mt-2" />
                      </FormItem>
                    )}
                  />

                  {/* Navigation Buttons */}
                  <div className="flex items-center gap-4 mt-10">
                    {currentStep > 0 && (
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={handleBack}
                          className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span className="text-sm">{t("navigation.back")}</span>
                        </Button>
                      </motion.div>
                    )}
                    
                    {currentStep < questions.length - 1 ? (
                      <motion.div 
                        className="ml-auto relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Button
                          type="button"
                          onClick={handleNext}
                          disabled={!isValid}
                          className="flex items-center gap-2 text-lg px-10 py-7 rounded-full shadow-lg relative overflow-hidden group"
                        >
                          <span className="relative z-10">{t("navigation.continue")}</span>
                          <ChevronRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                          {isValid && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              initial={{ x: "-100%" }}
                              animate={{ x: "100%" }}
                              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                            />
                          )}
                        </Button>
                      </motion.div>
                    ) : (
                      <motion.div 
                        className="ml-auto"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <Button
                          type="submit"
                          disabled={!isValid || isSubmitting}
                          className="flex items-center gap-2 text-lg px-10 py-7 rounded-full shadow-lg relative overflow-hidden group"
                        >
                          {isSubmitting ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              {t("navigation.submit")}...
                            </>
                          ) : (
                            <>
                              <span className="relative z-10">{t("navigation.submit")}</span>
                              <CheckCircle2 className="w-5 h-5 relative z-10" />
                              {isValid && (
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                  initial={{ x: "-100%" }}
                                  animate={{ x: "100%" }}
                                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                />
                              )}
                            </>
                          )}
                        </Button>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </form>
          </Form>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative py-6 px-4 text-center">
        <p className="text-sm" style={{ color: headerSubtleTextColor }}>
          <Link 
            to="/"
            className="underline hover:opacity-80 transition-opacity font-medium"
          >
            {t("footer.visitWebsite")}
          </Link>
        </p>
      </footer>
    </div>
  );
};

export default ConversationalInvestmentForm;
