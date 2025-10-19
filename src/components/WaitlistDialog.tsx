import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const waitlistSchema = z.object({
  name: z.string().trim().min(2, "Inserisci il tuo nome").max(100),
  email: z.string().email("Inserisci un'email valida").max(255),
  university: z.string().min(1, "Seleziona la tua università"),
  budget: z.string().min(1, "Seleziona il tuo budget"),
  move_date: z.string().min(1, "Seleziona quando vuoi trasferirti"),
  referral_source: z.string().min(1, "Dicci come ci hai conosciuto"),
  privacy_consent: z.boolean().refine((val) => val === true, {
    message: "Devi accettare per continuare",
  }),
});

type WaitlistFormData = z.infer<typeof waitlistSchema>;

interface WaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const WaitlistDialog = ({ open, onOpenChange }: WaitlistDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: {
      name: "",
      email: "",
      university: "",
      budget: "",
      move_date: "",
      referral_source: "",
      privacy_consent: false,
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
          university: data.university,
          budget: data.budget,
          move_date: data.move_date,
          referral_source: data.referral_source,
          privacy_consent: data.privacy_consent,
          user_type: "student",
          _subject: "New Jungle Rent Waitlist - React App 🚀",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: "Iscrizione completata",
        description: "Controlla la tua email per la conferma.",
      });
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Errore",
        description: "Qualcosa è andato storto. Riprova.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] 
                                bg-background/95 backdrop-blur-md
                                border border-border
                                shadow-2xl
                                max-h-[85vh] overflow-hidden
                                rounded-xl">
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-semibold text-foreground">
            Iscriviti alla Waitlist
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground pt-2">
            Compila il form per ricevere accesso prioritario alle stanze disponibili.
          </DialogDescription>
        </DialogHeader>

        <div className="overflow-y-auto max-h-[calc(90vh-180px)] px-1">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 pt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium text-foreground">Nome Completo</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Mario Rossi"
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
                      <FormLabel className="text-sm font-medium text-foreground">Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="mario.rossi@studenti.unito.it"
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
                      <FormLabel className="text-sm font-medium text-foreground">Università</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder="Seleziona università" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="polito">Politecnico di Torino</SelectItem>
                          <SelectItem value="unito">Università di Torino</SelectItem>
                          <SelectItem value="escp">ESCP Business School</SelectItem>
                          <SelectItem value="ied">IED Torino</SelectItem>
                          <SelectItem value="iaad">IAAD</SelectItem>
                          <SelectItem value="iusto">IUSTO</SelectItem>
                          <SelectItem value="other">Altro</SelectItem>
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
                      <FormLabel className="text-sm font-medium text-foreground">Budget Mensile</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder="Seleziona budget" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="300-400">€300-400</SelectItem>
                          <SelectItem value="400-500">€400-500</SelectItem>
                          <SelectItem value="500-600">€500-600</SelectItem>
                          <SelectItem value="over-600">&gt;€600</SelectItem>
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
                      <FormLabel className="text-sm font-medium text-foreground">Data Trasloco</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder="Quando ti trasferisci?" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="september-2025">Settembre 2025</SelectItem>
                          <SelectItem value="january-2026">Gennaio 2026</SelectItem>
                          <SelectItem value="asap">ASAP</SelectItem>
                          <SelectItem value="other">Altro</SelectItem>
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
                      <FormLabel className="text-sm font-medium text-foreground">Come ci hai trovato?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder="Seleziona fonte" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="friend">Amico</SelectItem>
                          <SelectItem value="university">Università</SelectItem>
                          <SelectItem value="instagram">Instagram</SelectItem>
                          <SelectItem value="facebook">Facebook</SelectItem>
                          <SelectItem value="google">Google</SelectItem>
                          <SelectItem value="ai-assistant">AI assistant</SelectItem>
                          <SelectItem value="other">Altro</SelectItem>
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
                  name="privacy_consent"
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
                        <FormLabel className="text-xs text-muted-foreground leading-relaxed cursor-pointer">
                          Acconsento a ricevere aggiornamenti sulle offerte di Jungle Rent
                        </FormLabel>
                      </div>
                      {form.formState.errors.privacy_consent && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.privacy_consent.message}
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
                    Invio in corso...
                  </>
                ) : (
                  "Iscriviti"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
};
