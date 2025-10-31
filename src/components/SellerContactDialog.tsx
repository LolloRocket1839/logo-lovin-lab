import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { Building2, Loader2 } from "lucide-react";

interface SellerContactDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SellerContactDialog = ({ open, onOpenChange }: SellerContactDialogProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "❌ Campi obbligatori mancanti",
        description: "Compila Nome, Email, Telefono e Indirizzo per continuare",
        variant: "destructive",
      });
      return;
    }

    if (!formData.privacyConsent) {
      toast({
        title: "❌ Consenso richiesto",
        description: "Devi acconsentire al trattamento dei dati per continuare",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Create WhatsApp message
    const message = `🏠 *RICHIESTA VALUTAZIONE IMMOBILE*\n\n` +
      `👤 Nome: ${formData.name}\n` +
      `📧 Email: ${formData.email}\n` +
      `📱 Telefono: ${formData.phone}\n` +
      `📍 Indirizzo: ${formData.address}\n` +
      `🗺️ Zona: ${formData.zone || "Non specificata"}\n` +
      `📐 Metratura: ${formData.squareMeters ? formData.squareMeters + " mq" : "Non specificata"}\n` +
      `🏠 Locali: ${formData.rooms || "Non specificato"}\n` +
      `🏢 Piano: ${formData.floor || "Non specificato"}\n` +
      `🔧 Stato: ${formData.condition || "Non specificato"}\n` +
      `🎯 Motivazione: ${formData.motivation || "Non specificata"}\n` +
      `⚡ Urgente: ${formData.urgent ? "Sì" : "No"}\n` +
      `💬 Note: ${formData.message || "Nessuna nota"}`;

    const whatsappUrl = `https://wa.me/393453088226?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "✨ Richiesta inviata con successo!",
      description: "Ti contatteremo entro 48 ore per la valutazione gratuita del tuo immobile",
    });

    onOpenChange(false);
    setFormData({
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
    });
    setIsSubmitting(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-6 h-6 text-primary" />
            <DialogTitle>Vendi la Tua Casa</DialogTitle>
          </div>
          <DialogDescription>
            Compila il form per ricevere una valutazione gratuita della tua proprietà a Torino
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4 pb-4">
          <div className="space-y-2">
            <Label htmlFor="seller-name">Nome e Cognome *</Label>
            <Input
              id="seller-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Mario Rossi"
              autoFocus
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-email">Email *</Label>
            <Input
              id="seller-email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="mario.rossi@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-phone">Telefono *</Label>
            <Input
              id="seller-phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="+39 333 1234567"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-address">Indirizzo Immobile *</Label>
            <Input
              id="seller-address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              placeholder="Via Roma 1, Torino"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="seller-zone">Zona</Label>
              <Select value={formData.zone} onValueChange={(value) => setFormData({ ...formData, zone: value })}>
                <SelectTrigger id="seller-zone">
                  <SelectValue placeholder="Seleziona zona" />
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
              <Label htmlFor="seller-sqm">Metratura (mq)</Label>
              <Input
                id="seller-sqm"
                type="number"
                value={formData.squareMeters}
                onChange={(e) => setFormData({ ...formData, squareMeters: e.target.value })}
                placeholder="Es: 85"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="seller-rooms">Numero Locali</Label>
              <Select value={formData.rooms} onValueChange={(value) => setFormData({ ...formData, rooms: value })}>
                <SelectTrigger id="seller-rooms">
                  <SelectValue placeholder="Seleziona" />
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
              <Label htmlFor="seller-floor">Piano</Label>
              <Select value={formData.floor} onValueChange={(value) => setFormData({ ...formData, floor: value })}>
                <SelectTrigger id="seller-floor">
                  <SelectValue placeholder="Seleziona" />
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
              <Label htmlFor="seller-condition">Stato Immobile</Label>
              <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                <SelectTrigger id="seller-condition">
                  <SelectValue placeholder="Seleziona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ottimo">Ottimo</SelectItem>
                  <SelectItem value="buono">Buono</SelectItem>
                  <SelectItem value="da-ristrutturare">Da ristrutturare</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="seller-motivation">Motivazione Vendita</Label>
              <Select value={formData.motivation} onValueChange={(value) => setFormData({ ...formData, motivation: value })}>
                <SelectTrigger id="seller-motivation">
                  <SelectValue placeholder="Seleziona" />
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
              checked={formData.urgent}
              onCheckedChange={(checked) => setFormData({ ...formData, urgent: checked as boolean })}
            />
            <Label htmlFor="seller-urgent" className="cursor-pointer font-medium">
              ⚡ Ho urgenza di vendere (priorità massima)
            </Label>
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-message">Note Aggiuntive</Label>
            <Textarea
              id="seller-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Altre informazioni utili per la valutazione..."
              rows={3}
            />
          </div>

          <div className="flex items-start space-x-2 p-4 bg-muted/50 rounded-lg border border-border">
            <Checkbox 
              id="seller-privacy" 
              checked={formData.privacyConsent}
              onCheckedChange={(checked) => setFormData({ ...formData, privacyConsent: checked as boolean })}
              required
            />
            <Label htmlFor="seller-privacy" className="cursor-pointer text-sm leading-relaxed">
              Acconsento al trattamento dei miei dati personali ai sensi del Regolamento UE 2016/679 (GDPR) 
              e autorizzo Jungle Rent a contattarmi per la valutazione dell'immobile. 
              <a href="/privacy" target="_blank" className="text-primary underline ml-1">
                Leggi l'informativa privacy
              </a>
            </Label>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            size="lg" 
            disabled={!formData.privacyConsent || isSubmitting}
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
