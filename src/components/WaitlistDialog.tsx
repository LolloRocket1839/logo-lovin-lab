import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Building2, Euro, Calendar, Users, Loader2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();

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
        title: "✅ Perfetto!",
        description: "Sei nella waitlist! Controlla la tua email per la conferma.",
      });

      onOpenChange(false);
      form.reset();
    } catch (error) {
      toast({
        title: "Errore",
        description: "Qualcosa è andato storto. Riprova tra poco.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-black/95 backdrop-blur-xl border border-white/10 text-foreground max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">
            Iscriviti alla Waitlist Jungle Rent
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Compila il form in meno di 1 minuto. Riceverai accesso prioritario alle stanze disponibili!
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Nome */}
            <div className="space-y-2">
              <Label htmlFor="name">Nome completo *</Label>
              <Input
                id="name"
                placeholder="Mario Rossi"
                {...form.register("name")}
                className="bg-white/5 border-white/10"
              />
              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                placeholder="mario.rossi@esempio.it"
                {...form.register("email")}
                className="bg-white/5 border-white/10"
              />
              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Università */}
            <div className="space-y-2">
              <Label htmlFor="university">Università *</Label>
              <Select
                onValueChange={(value) => form.setValue("university", value)}
                value={form.watch("university")}
              >
                <SelectTrigger className="bg-white/5 border-white/10">
                  <Building2 className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Seleziona università" />
                </SelectTrigger>
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
                <p className="text-sm text-destructive">
                  {form.formState.errors.university.message}
                </p>
              )}
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <Label htmlFor="budget">Budget mensile *</Label>
              <Select
                onValueChange={(value) => form.setValue("budget", value)}
                value={form.watch("budget")}
              >
                <SelectTrigger className="bg-white/5 border-white/10">
                  <Euro className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Seleziona budget" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300-400">€300-400</SelectItem>
                  <SelectItem value="400-500">€400-500</SelectItem>
                  <SelectItem value="500-600">€500-600</SelectItem>
                  <SelectItem value="over-600">&gt;€600</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.budget && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.budget.message}
                </p>
              )}
            </div>

            {/* Data trasloco */}
            <div className="space-y-2">
              <Label htmlFor="move_date">Data trasloco preferita *</Label>
              <Select
                onValueChange={(value) => form.setValue("move_date", value)}
                value={form.watch("move_date")}
              >
                <SelectTrigger className="bg-white/5 border-white/10">
                  <Calendar className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Seleziona data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="september-2025">Settembre 2025</SelectItem>
                  <SelectItem value="january-2026">Gennaio 2026</SelectItem>
                  <SelectItem value="asap">ASAP</SelectItem>
                  <SelectItem value="other">Altro</SelectItem>
                </SelectContent>
              </Select>
              {form.formState.errors.move_date && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.move_date.message}
                </p>
              )}
            </div>

            {/* Referral Source */}
            <div className="space-y-2">
              <Label htmlFor="referral_source">Come ci hai conosciuto? *</Label>
              <Select
                onValueChange={(value) => form.setValue("referral_source", value)}
                value={form.watch("referral_source")}
              >
                <SelectTrigger className="bg-white/5 border-white/10">
                  <Users className="w-4 h-4 mr-2" />
                  <SelectValue placeholder="Seleziona fonte" />
                </SelectTrigger>
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
                <p className="text-sm text-destructive">
                  {form.formState.errors.referral_source.message}
                </p>
              )}
            </div>
          </div>

          {/* Privacy Consent */}
          <div className="flex items-start space-x-3 pt-2">
            <Checkbox
              id="privacy_consent"
              checked={form.watch("privacy_consent")}
              onCheckedChange={(checked) =>
                form.setValue("privacy_consent", checked as boolean)
              }
            />
            <Label
              htmlFor="privacy_consent"
              className="text-sm font-normal leading-relaxed cursor-pointer"
            >
              Acconsento a ricevere aggiornamenti sulle offerte esclusive di Jungle Rent *
            </Label>
          </div>
          {form.formState.errors.privacy_consent && (
            <p className="text-sm text-destructive">
              {form.formState.errors.privacy_consent.message}
            </p>
          )}

          {/* Submit Button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-6 text-lg"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                Invio in corso...
              </>
            ) : (
              "Iscriviti alla Waitlist →"
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
