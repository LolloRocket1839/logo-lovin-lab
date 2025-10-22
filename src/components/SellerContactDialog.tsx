import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Building2 } from "lucide-react";

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
    propertyType: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.address) {
      toast({
        title: "Errore",
        description: "Compila tutti i campi obbligatori",
        variant: "destructive",
      });
      return;
    }

    // Create WhatsApp message
    const message = `🏠 *RICHIESTA VALUTAZIONE IMMOBILE*\n\n` +
      `👤 Nome: ${formData.name}\n` +
      `📧 Email: ${formData.email}\n` +
      `📱 Telefono: ${formData.phone}\n` +
      `📍 Indirizzo: ${formData.address}\n` +
      `🏢 Tipo: ${formData.propertyType || "Non specificato"}\n` +
      `💬 Note: ${formData.message || "Nessuna nota"}`;

    const whatsappUrl = `https://wa.me/393453088226?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");

    toast({
      title: "Richiesta inviata!",
      description: "Ti contatteremo entro 48 ore per la valutazione",
    });

    onOpenChange(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      propertyType: "",
      message: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Building2 className="w-6 h-6 text-primary" />
            <DialogTitle>Vendi la Tua Casa</DialogTitle>
          </div>
          <DialogDescription>
            Compila il form per ricevere una valutazione gratuita della tua proprietà a Torino
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="seller-name">Nome e Cognome *</Label>
            <Input
              id="seller-name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Mario Rossi"
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

          <div className="space-y-2">
            <Label htmlFor="seller-type">Tipo di Immobile</Label>
            <Input
              id="seller-type"
              value={formData.propertyType}
              onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
              placeholder="Es: Trilocale, Quadrilocale"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="seller-message">Note Aggiuntive</Label>
            <Textarea
              id="seller-message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Metratura, piano, stato, etc."
              rows={3}
            />
          </div>

          <Button type="submit" className="w-full" size="lg">
            Invia Richiesta
          </Button>

          <p className="text-xs text-muted-foreground text-center">
            Risposta garantita entro 48 ore • Valutazione gratuita e senza impegno
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
