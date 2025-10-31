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

const investorWaitlistSchema = z.object({
  name: z.string().trim().min(2, "Inserisci il tuo nome").max(100),
  email: z.string().email("Inserisci un'email valida").max(255),
  phone: z.string().trim().min(8, "Inserisci un numero di telefono valido").max(20),
  investment_budget: z.string().min(1, "Seleziona il budget di investimento"),
  property_type: z.string().min(1, "Seleziona la tipologia di proprietà"),
  investment_horizon: z.string().min(1, "Seleziona l'orizzonte temporale"),
  referral_source: z.string().min(1, "Dicci come ci hai conosciuto"),
  gdpr_consent: z.boolean().refine((val) => val === true, {
    message: "Devi accettare il trattamento dati per continuare",
  }),
  privacy_consent: z.boolean().refine((val) => val === true, {
    message: "Devi accettare per continuare",
  }),
});

type InvestorWaitlistFormData = z.infer<typeof investorWaitlistSchema>;

interface InvestorWaitlistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InvestorWaitlistDialog = ({ open, onOpenChange }: InvestorWaitlistDialogProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

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
      gdpr_consent: false,
      privacy_consent: false,
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
          phone: data.phone,
          investment_budget: data.investment_budget,
          property_type: data.property_type,
          investment_horizon: data.investment_horizon,
          referral_source: data.referral_source,
          gdpr_consent: data.gdpr_consent,
          privacy_consent: data.privacy_consent,
          user_type: "investor",
          _subject: "New Jungle Rent Investor Waitlist 💼",
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
      <DialogContent className="sm:max-w-sm mx-4
                                bg-background/95 backdrop-blur-md
                                border border-border
                                shadow-2xl
                                max-h-[85vh] overflow-hidden
                                rounded-xl">
        <DialogHeader className="pb-4 border-b border-border">
          <DialogTitle className="text-2xl font-semibold text-foreground">
            Iscriviti alla Waitlist Investitori
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground pt-2">
            Compila il form per ricevere informazioni sulle opportunità di investimento.
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
                          placeholder="mario.rossi@email.com"
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
                      <FormLabel className="text-sm font-medium text-foreground">Telefono</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+39 333 1234567"
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
                      <FormLabel className="text-sm font-medium text-foreground">Budget Investimento</FormLabel>
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
                          <SelectItem value="50k-100k">€50k - €100k</SelectItem>
                          <SelectItem value="100k-200k">€100k - €200k</SelectItem>
                          <SelectItem value="200k-300k">€200k - €300k</SelectItem>
                          <SelectItem value="over-300k">&gt;€300k</SelectItem>
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
                      <FormLabel className="text-sm font-medium text-foreground">Tipologia Proprietà</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder="Seleziona tipologia" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="monolocale">Monolocale</SelectItem>
                          <SelectItem value="bilocale">Bilocale</SelectItem>
                          <SelectItem value="trilocale">Trilocale</SelectItem>
                          <SelectItem value="appartamento-completo">Appartamento completo</SelectItem>
                          <SelectItem value="indeciso">Ancora indeciso</SelectItem>
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
                      <FormLabel className="text-sm font-medium text-foreground">Orizzonte Temporale</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10
                                                    bg-background
                                                    border-border
                                                    focus:border-primary focus:ring-1 focus:ring-primary/20">
                            <SelectValue placeholder="Seleziona periodo" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="short-term">1-3 anni</SelectItem>
                          <SelectItem value="medium-term">3-5 anni</SelectItem>
                          <SelectItem value="long-term">5+ anni</SelectItem>
                          <SelectItem value="flexible">Flessibile</SelectItem>
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
                          <SelectItem value="network">Network professionale</SelectItem>
                          <SelectItem value="linkedin">LinkedIn</SelectItem>
                          <SelectItem value="referral">Segnalazione</SelectItem>
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

              <div className="pt-2 space-y-3">
                <FormField
                  control={form.control}
                  name="gdpr_consent"
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
                          Acconsento al trattamento dei miei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) per la gestione della richiesta di informazioni
                        </FormLabel>
                      </div>
                      {form.formState.errors.gdpr_consent && (
                        <p className="text-xs text-destructive mt-1">
                          {form.formState.errors.gdpr_consent.message}
                        </p>
                      )}
                    </FormItem>
                  )}
                />

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
                        <FormLabel className="text-[11px] sm:text-xs text-muted-foreground leading-relaxed cursor-pointer">
                          Acconsento a ricevere aggiornamenti sulle opportunità di investimento
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
