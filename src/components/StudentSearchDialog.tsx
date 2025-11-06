import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
  name: z.string().min(2, { message: t("studentSearch.nameError") }),
  email: z.string().email({ message: t("studentSearch.emailError") }),
  what_looking_for: z.string().min(10, { message: t("studentSearch.whatYouLookingForError") }),
  roommates: z.string().optional(),
  preferred_area: z.string().optional(),
  study: z.string().optional(),
  budget: z.string().optional(),
  move_date: z.string().optional(),
  custom_move_date: z.string().optional(),
  consent: z.boolean().refine((val) => val === true, {
    message: t("studentSearch.consentError"),
  }),
});

interface StudentSearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const StudentSearchDialog = ({ open, onOpenChange }: StudentSearchDialogProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { incrementCount } = useWaitlistCounter();

  const form = useForm<z.infer<ReturnType<typeof getStudentSearchSchema>>>({
    resolver: zodResolver(getStudentSearchSchema(t)),
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

  const isSubmitting = form.formState.isSubmitting;
  const watchMoveDate = form.watch("move_date");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t("studentSearch.title")}</DialogTitle>
          <DialogDescription>{t("studentSearch.description")}</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                  <FormLabel>{t("studentSearch.whatYouLookingForLabel")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("studentSearch.whatYouLookingForPlaceholder")}
                      className="min-h-[100px] resize-none"
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
