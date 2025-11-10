import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Building2, Loader2 } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "./ui/form";

const sellerSchema = z.object({
  name: z.string().trim().min(2, "Nome richiesto").max(100),
  email: z.string().email("Email non valida").max(255),
  phone: z.string().trim().min(5, "Telefono richiesto").max(20),
  address: z.string().trim().min(5, "Indirizzo richiesto").max(200),
  zone: z.string().optional(),
  squareMeters: z.string().optional(),
  rooms: z.string().optional(),
  floor: z.string().optional(),
  condition: z.string().optional(),
  motivation: z.string().optional(),
  urgent: z.boolean(),
  message: z.string().max(1000).optional(),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Devi acconsentire al trattamento dei dati",
  }),
});

interface SellerContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SellerContactDialog = ({ open, onOpenChange }: SellerContactDialogProps) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  type SellerFormData = z.infer<typeof sellerSchema>;

  const form = useForm<SellerFormData>({
    resolver: zodResolver(sellerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      zone: "",
      squareMeters: "",
      rooms: "",
      floor: "",
      condition: "",
      motivation: "",
      urgent: false,
      message: "",
      privacyConsent: false,
    },
  });

  const onSubmit = async (data: SellerFormData) => {
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
          address: data.address,
          zone: data.zone || "",
          square_meters: data.squareMeters || "",
          rooms: data.rooms || "",
          floor: data.floor || "",
          condition: data.condition || "",
          motivation: data.motivation || "",
          urgent: data.urgent,
          message: data.message || "",
          user_type: "seller",
          _subject: "🏠 Nuova Richiesta Valutazione Immobile - Jungle Rent",
          timestamp: new Date().toISOString(),
        }),
      });

      if (!response.ok) throw new Error("Submission failed");

      toast({
        title: "✨ Richiesta inviata con successo!",
        description: "Ti contatteremo entro 48 ore per la valutazione gratuita del tuo immobile",
      });
      
      form.reset();
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "❌ Errore nell'invio",
        description: "Si è verificato un errore. Riprova o contattaci su WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md md:max-w-lg max-h-[90vh] overflow-y-auto mx-4 sm:mx-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-6 h-6 text-primary" />
            <DialogTitle>Vendi la Tua Casa</DialogTitle>
          </div>
          <DialogDescription>
            Compila il form per ricevere una valutazione gratuita della tua proprietà a Torino
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4 pb-4">
          <div className="space-y-2">
            <Label htmlFor="seller-name">Nome e Cognome *</Label>
            <Input
              id="seller-name"
              {...form.register("name")}
              placeholder="Mario Rossi"
              autoFocus
            />
            {form.formState.errors.name && (
              <p className="text-sm text-destructive">{form.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-email">Email *</Label>
            <Input
              id="seller-email"
              type="email"
              {...form.register("email")}
              placeholder="mario.rossi@email.com"
            />
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">{form.formState.errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-phone">Telefono *</Label>
            <Input
              id="seller-phone"
              type="tel"
              {...form.register("phone")}
              placeholder="+39 333 1234567"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-destructive">{form.formState.errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-address">Indirizzo Immobile *</Label>
            <Input
              id="seller-address"
              {...form.register("address")}
              placeholder="Via Roma 1, Torino"
            />
            {form.formState.errors.address && (
              <p className="text-sm text-destructive">{form.formState.errors.address.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="seller-zone">Zona (opzionale)</Label>
            <Select {...form.register("zone")} onValueChange={(value) => form.setValue("zone", value)}>
              <SelectTrigger id="seller-zone">
                <SelectValue placeholder="Es: Crocetta" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="crocetta">Crocetta</SelectItem>
                  <SelectItem value="san-salvario">San Salvario</SelectItem>
                  <SelectItem value="centro">Centro</SelectItem>
                  <SelectItem value="vanchiglia">Vanchiglia</SelectItem>
                  <SelectItem value="lingotto">Lingotto</SelectItem>
                  <SelectItem value="santa-rita">Santa Rita</SelectItem>
                  <SelectItem value="san-paolo">San Paolo</SelectItem>
                  <SelectItem value="altra">Altra zona</SelectItem>
                </SelectContent>
              </Select>
            </div>

          <div className="space-y-2">
            <Label htmlFor="seller-sqm">Metratura (opzionale)</Label>
            <Input
              id="seller-sqm"
              type="number"
              {...form.register("squareMeters")}
              placeholder="Es: 85 mq"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="seller-rooms">Numero Locali (opzionale)</Label>
            <Select {...form.register("rooms")} onValueChange={(value) => form.setValue("rooms", value)}>
              <SelectTrigger id="seller-rooms">
                <SelectValue placeholder="Es: Trilocale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">Bilocale (2)</SelectItem>
                  <SelectItem value="3">Trilocale (3)</SelectItem>
                  <SelectItem value="4">Quadrilocale (4)</SelectItem>
                  <SelectItem value="5+">5 o più locali</SelectItem>
                </SelectContent>
              </Select>
            </div>

          <div className="space-y-2">
            <Label htmlFor="seller-floor">Piano (opzionale)</Label>
            <Select {...form.register("floor")} onValueChange={(value) => form.setValue("floor", value)}>
              <SelectTrigger id="seller-floor">
                <SelectValue placeholder="Es: 2° Piano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="terra">Piano Terra</SelectItem>
                  <SelectItem value="1">1° Piano</SelectItem>
                  <SelectItem value="2">2° Piano</SelectItem>
                  <SelectItem value="3">3° Piano</SelectItem>
                  <SelectItem value="4">4° Piano</SelectItem>
                  <SelectItem value="5">5° Piano</SelectItem>
                  <SelectItem value="6+">6° Piano o superiore</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="seller-condition">Stato Immobile (opzionale)</Label>
            <Select {...form.register("condition")} onValueChange={(value) => form.setValue("condition", value)}>
              <SelectTrigger id="seller-condition">
                <SelectValue placeholder="Es: Buono" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ottimo">Ottimo</SelectItem>
                  <SelectItem value="buono">Buono</SelectItem>
                  <SelectItem value="da-ristrutturare">Da ristrutturare</SelectItem>
                </SelectContent>
              </Select>
            </div>

          <div className="space-y-2">
            <Label htmlFor="seller-motivation">Motivazione Vendita (opzionale)</Label>
            <Select {...form.register("motivation")} onValueChange={(value) => form.setValue("motivation", value)}>
              <SelectTrigger id="seller-motivation">
                <SelectValue placeholder="Perché vendi?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cambio-citta">Cambio città</SelectItem>
                  <SelectItem value="liquidita">Necessità liquidità</SelectItem>
                  <SelectItem value="eredita">Eredità</SelectItem>
                  <SelectItem value="investimento">Dismissione investimento</SelectItem>
                  <SelectItem value="altro">Altro</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center space-x-2 p-4 bg-accent/10 rounded-lg">
            <Checkbox 
              id="seller-urgent" 
              checked={form.watch("urgent")}
              onCheckedChange={(checked) => form.setValue("urgent", checked as boolean)}
            />
            <Label htmlFor="seller-urgent" className="cursor-pointer font-medium">
              ⚡ Ho urgenza di vendere (priorità massima)
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-message">Note Aggiuntive (opzionale)</Label>
            <Textarea
              id="seller-message"
              {...form.register("message")}
              placeholder="Altre informazioni utili (opzionale)..."
              rows={3}
            />
          </div>

          <div className="flex items-start space-x-2 p-4 bg-muted/50 rounded-lg border border-border">
            <Checkbox 
              id="seller-privacy" 
              checked={form.watch("privacyConsent")}
              onCheckedChange={(checked) => form.setValue("privacyConsent", checked as boolean)}
            />
            <Label htmlFor="seller-privacy" className="cursor-pointer text-sm leading-relaxed">
              Acconsento al trattamento dei miei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) 
              e autorizzo Jungle Rent a contattarmi per la valutazione dell'immobile. 
              <a href="/privacy" target="_blank" className="text-primary underline ml-1">
                Leggi l'informativa privacy
              </a>
            </Label>
            {form.formState.errors.privacyConsent && (
              <p className="text-sm text-destructive">{form.formState.errors.privacyConsent.message}</p>
            )}
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg" 
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Invio in corso...
              </>
            ) : (
              "Invia Richiesta"
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center pt-4 border-t border-border/50">
            ✓ Risposta garantita entro 48 ore • ✓ Valutazione gratuita e senza impegno • ✓ Zero commissioni
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
