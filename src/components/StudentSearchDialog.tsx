import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, Trash2, Cloud } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast as sonnerToast } from "sonner";
import { detectArea, AreaInfo } from "@/data/turinAreas";
import { AreaSuggestionCard } from "@/components/AreaSuggestionCard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";

const getStudentSearchSchema = (t: any) => z.object({
  name: z.string()
    .min(2, { message: t("studentSearch.nameErrorMin") })
    .max(100, { message: t("studentSearch.nameErrorMax") })
    .regex(/^[a-zA-ZàèéìòùÀÈÉÌÒÙ\s'-]+$/, { message: t("studentSearch.nameErrorFormat") }),
  email: z.string()
    .min(1, { message: t("studentSearch.emailErrorRequired") })
    .email({ message: t("studentSearch.emailErrorInvalid") })
    .max(255, { message: t("studentSearch.emailErrorMax") }),
  what_looking_for: z.string()
    .min(20, { message: t("studentSearch.whatYouLookingForErrorMin") })
    .max(500, { message: t("studentSearch.whatYouLookingForErrorMax") }),
  roommates: z.string().optional(),
  preferred_area: z.string().optional(),
  study: z.string()
    .max(150, { message: t("studentSearch.studyErrorMax") })
    .optional()
    .or(z.literal("")),
  budget: z.string().optional(),
  move_date: z.string().optional(),
  custom_move_date: z.string()
    .max(100, { message: t("studentSearch.customMoveDateErrorMax") })
    .optional()
    .or(z.literal("")),
  consent: z.boolean().refine((val) => val === true, {
    message: t("studentSearch.consentError"),
  }),
});

interface StudentSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DRAFT_KEY = "jungle_rent_student_search_draft";
const DRAFT_TIMESTAMP_KEY = "jungle_rent_student_search_draft_timestamp";
const DRAFT_EXPIRY_DAYS = 7; // Draft expires after 7 days

export const StudentSearchDialog = ({ open, onOpenChange }: StudentSearchDialogProps) => {
  const { t, i18n } = useTranslation();
  const { toast } = useToast();
  const { incrementCount } = useWaitlistCounter();
  const [hasDraft, setHasDraft] = useState(false);
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastSaveRef = useRef<string>("");
  const toastIdRef = useRef<string | number | null>(null);
  const [detectedArea, setDetectedArea] = useState<AreaInfo | null>(null);
  const [dismissedArea, setDismissedArea] = useState<string | null>(null);

  const form = useForm<z.infer<ReturnType<typeof getStudentSearchSchema>>>({
    resolver: zodResolver(getStudentSearchSchema(t)),
    mode: "onBlur", // Validate on blur for real-time feedback
    reValidateMode: "onChange", // Re-validate on change after first validation
    defaultValues: {
      name: "",
      email: "",
      what_looking_for: "",
      roommates: "",
      preferred_area: "",
      study: "",
      budget: "",
      move_date: "",
      custom_move_date: "",
      consent: false,
    },
  });

  const onSubmit = async (values: z.infer<ReturnType<typeof getStudentSearchSchema>>) => {
    try {
      const formData = {
        ...values,
        user_type: "student_search",
        _subject: "New Student Room Search Request 🏠",
        timestamp: new Date().toISOString(),
      };

      const response = await fetch("https://formspree.io/f/xeojbzow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        incrementCount();
        // Clear draft after successful submission
        localStorage.removeItem(DRAFT_KEY);
        localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
        toast({
          title: t("studentSearch.successTitle"),
          description: t("studentSearch.successDescription"),
        });
        form.reset();
        onOpenChange(false);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      toast({
        title: t("studentSearch.errorTitle"),
        description: t("studentSearch.errorDescription"),
        variant: "destructive",
      });
    }
  };

  // Load draft from localStorage when dialog opens
  useEffect(() => {
    if (open) {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      const savedTimestamp = localStorage.getItem(DRAFT_TIMESTAMP_KEY);
      
      if (savedDraft && savedTimestamp) {
        const draftAge = Date.now() - parseInt(savedTimestamp);
        const daysOld = draftAge / (1000 * 60 * 60 * 24);
        
        // Check if draft is still valid (not expired)
        if (daysOld < DRAFT_EXPIRY_DAYS) {
          try {
            const draft = JSON.parse(savedDraft);
            // Check if draft has meaningful data (not just empty strings)
            const hasData = draft.name || draft.email || draft.what_looking_for;
            if (hasData) {
              setHasDraft(true);
            }
          } catch (error) {
            console.error("Error loading draft:", error);
            localStorage.removeItem(DRAFT_KEY);
            localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
          }
        } else {
          // Draft expired, remove it
          localStorage.removeItem(DRAFT_KEY);
          localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
        }
      }
    }
  }, [open]);

  // Auto-save draft to localStorage when form values change (with debounce)
  useEffect(() => {
    if (!open) return;

    const subscription = form.watch((values) => {
      // Only save if there's meaningful data
      const hasData = values.name || values.email || values.what_looking_for;
      if (hasData) {
        // Clear previous timeout
        if (saveTimeoutRef.current) {
          clearTimeout(saveTimeoutRef.current);
        }

        // Debounce save by 1.5 seconds
        saveTimeoutRef.current = setTimeout(() => {
          const currentData = JSON.stringify(values);
          
          // Only save and show toast if data actually changed
          if (currentData !== lastSaveRef.current) {
            localStorage.setItem(DRAFT_KEY, currentData);
            localStorage.setItem(DRAFT_TIMESTAMP_KEY, Date.now().toString());
            lastSaveRef.current = currentData;
            
            // Show discrete toast notification
            if (toastIdRef.current) {
              sonnerToast.dismiss(toastIdRef.current);
            }
            
            toastIdRef.current = sonnerToast(t("studentSearch.draftAutoSaved"), {
              icon: <Cloud className="h-4 w-4 text-primary" />,
              duration: 2000,
              position: "bottom-right",
              className: "text-sm",
            });
          }
        }, 1500);
      }
    });

    return () => {
      subscription.unsubscribe();
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
    };
  }, [form, open, t]);

  const loadDraft = () => {
    const savedDraft = localStorage.getItem(DRAFT_KEY);
    if (savedDraft) {
      try {
        const draft = JSON.parse(savedDraft);
        Object.keys(draft).forEach((key) => {
          form.setValue(key as any, draft[key]);
        });
        setHasDraft(false);
        toast({
          title: t("studentSearch.draftLoadedTitle"),
          description: t("studentSearch.draftLoadedDesc"),
        });
      } catch (error) {
        console.error("Error loading draft:", error);
      }
    }
  };

  const clearDraft = () => {
    localStorage.removeItem(DRAFT_KEY);
    localStorage.removeItem(DRAFT_TIMESTAMP_KEY);
    setHasDraft(false);
    toast({
      title: t("studentSearch.draftClearedTitle"),
      description: t("studentSearch.draftClearedDesc"),
    });
  };

  const isSubmitting = form.formState.isSubmitting;
  const watchMoveDate = form.watch("move_date");
  const watchWhatLookingFor = form.watch("what_looking_for");
  const whatLookingForLength = watchWhatLookingFor?.length || 0;

  // Detect area mentions in the description
  useEffect(() => {
    if (watchWhatLookingFor && watchWhatLookingFor.length > 5) {
      const area = detectArea(watchWhatLookingFor);
      if (area && area.name !== dismissedArea) {
        setDetectedArea(area);
      } else if (!area) {
        setDetectedArea(null);
      }
    } else {
      setDetectedArea(null);
    }
  }, [watchWhatLookingFor, dismissedArea]);

  const handleAddAreaDetails = () => {
    if (detectedArea) {
      const currentLang = i18n.language === "en" ? "en" : "it";
      const currentText = form.getValues("what_looking_for");
      const additionalInfo = currentLang === "it"
        ? `\n\nInfo zona ${detectedArea.name}:\n- Distanza Polito: ${detectedArea.distance.polito}, UniTo: ${detectedArea.distance.unito}\n- Trasporti: ${detectedArea.transport}\n- Caratteristiche: ${detectedArea.characteristics.join(", ")}\n- Budget medio: ${detectedArea.avgRent}`
        : `\n\n${detectedArea.name} area info:\n- Distance Polito: ${detectedArea.distance.polito}, UniTo: ${detectedArea.distance.unito}\n- Transport: ${detectedArea.transport}\n- Features: ${detectedArea.characteristics.join(", ")}\n- Avg budget: ${detectedArea.avgRent}`;
      
      form.setValue("what_looking_for", currentText + additionalInfo);
      setDetectedArea(null);
      setDismissedArea(null);
    }
  };

  const handleDismissAreaSuggestion = () => {
    if (detectedArea) {
      setDismissedArea(detectedArea.name);
      setDetectedArea(null);
    }
  };

  // Reset dismissed area when dialog closes
  useEffect(() => {
    if (!open) {
      setDismissedArea(null);
      setDetectedArea(null);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("studentSearch.title")}</DialogTitle>
          <DialogDescription>{t("studentSearch.description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            {hasDraft && (
              <Alert className="border-primary/50 bg-primary/5">
                <AlertCircle className="h-4 w-4 text-primary" />
                <AlertDescription className="flex items-center justify-between">
                  <span className="text-sm">{t("studentSearch.draftFoundMessage")}</span>
                  <div className="flex gap-2 ml-4">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={loadDraft}
                      className="h-8"
                    >
                      {t("studentSearch.loadDraft")}
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="ghost"
                      onClick={clearDraft}
                      className="h-8"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </AlertDescription>
              </Alert>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("studentSearch.nameLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("studentSearch.namePlaceholder")}
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
                    <FormLabel>{t("studentSearch.emailLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={t("studentSearch.emailPlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="what_looking_for"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex justify-between items-center">
                      <span>{t("studentSearch.whatYouLookingForLabel")}</span>
                      <span className={`text-xs ${
                        whatLookingForLength < 20 ? "text-muted-foreground" : 
                        whatLookingForLength > 500 ? "text-destructive" : 
                        "text-muted-foreground"
                      }`}>
                        {whatLookingForLength}/500
                      </span>
                    </div>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("studentSearch.whatYouLookingForPlaceholder")}
                      className="min-h-[100px] resize-none"
                      maxLength={500}
                      {...field}
                    />
                  </FormControl>
                  
                  {detectedArea && (
                    <div className="mt-2">
                      <AreaSuggestionCard
                        area={detectedArea}
                        onAddDetails={handleAddAreaDetails}
                        onDismiss={handleDismissAreaSuggestion}
                      />
                    </div>
                  )}
                  
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="roommates"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("studentSearch.roommatesLabel")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("studentSearch.roommatesPlaceholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="solo">{t("studentSearch.roommatesOptions.solo")}</SelectItem>
                        <SelectItem value="2">{t("studentSearch.roommatesOptions.2")}</SelectItem>
                        <SelectItem value="3">{t("studentSearch.roommatesOptions.3")}</SelectItem>
                        <SelectItem value="4plus">{t("studentSearch.roommatesOptions.4plus")}</SelectItem>
                        <SelectItem value="flexible">{t("studentSearch.roommatesOptions.flexible")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="preferred_area"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("studentSearch.areaLabel")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("studentSearch.areaPlaceholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="san-salvario">{t("studentSearch.areaOptions.san-salvario")}</SelectItem>
                        <SelectItem value="crocetta">{t("studentSearch.areaOptions.crocetta")}</SelectItem>
                        <SelectItem value="centro">{t("studentSearch.areaOptions.centro")}</SelectItem>
                        <SelectItem value="polito">{t("studentSearch.areaOptions.polito")}</SelectItem>
                        <SelectItem value="unito">{t("studentSearch.areaOptions.unito")}</SelectItem>
                        <SelectItem value="san-paolo">{t("studentSearch.areaOptions.san-paolo")}</SelectItem>
                        <SelectItem value="aurora">{t("studentSearch.areaOptions.aurora")}</SelectItem>
                        <SelectItem value="flexible">{t("studentSearch.areaOptions.flexible")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="study"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("studentSearch.studyLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      placeholder={t("studentSearch.studyPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("studentSearch.budgetLabel")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("studentSearch.budgetPlaceholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="400-500">{t("studentSearch.budgetRanges.400-500")}</SelectItem>
                        <SelectItem value="500-600">{t("studentSearch.budgetRanges.500-600")}</SelectItem>
                        <SelectItem value="600-700">{t("studentSearch.budgetRanges.600-700")}</SelectItem>
                        <SelectItem value="over-700">{t("studentSearch.budgetRanges.over-700")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="move_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("studentSearch.moveDateLabel")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("studentSearch.moveDatePlaceholder")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="september-2026">{t("studentSearch.moveDates.september-2026")}</SelectItem>
                        <SelectItem value="asap">{t("studentSearch.moveDates.asap")}</SelectItem>
                        <SelectItem value="custom">{t("studentSearch.moveDates.custom")}</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {watchMoveDate === "custom" && (
              <FormField
                control={form.control}
                name="custom_move_date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("studentSearch.customMoveDateLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("studentSearch.customMoveDatePlaceholder")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="consent"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="text-sm font-normal cursor-pointer">
                      {t("studentSearch.consentLabel")}
                    </FormLabel>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? t("studentSearch.submitting") : t("studentSearch.submitButton")}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
