import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, Calendar, Loader2 } from "lucide-react";
import { FORMSPREE_ENDPOINTS } from "@/constants/formspree";
import { getUTMParams, formatUTMForEmail } from "@/hooks/useUTMTracking";
import { openCalendly } from "@/lib/calendly";
import { toast } from "sonner";

interface ContractRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan?: string;
}

export const ContractRequestDialog = ({
  open,
  onOpenChange,
  selectedPlan = "",
}: ContractRequestDialogProps) => {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith("en") ? "en" : "it";

  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    const utmParams = getUTMParams();
    const utmString = formatUTMForEmail(utmParams);

    try {
      const res = await fetch(FORMSPREE_ENDPOINTS.contracts, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          _subject: `📄 CONTRATTO - ${selectedPlan} - ${email.trim()}`,
          piano: selectedPlan,
          messaggio: message.trim() || "(nessun messaggio)",
          lingua: lang,
          pagina: window.location.href,
          timestamp: new Date().toISOString(),
          ...utmParams,
          _utm_info: utmString || undefined,
        }),
      });

      if (!res.ok) throw new Error("Submit failed");

      setStep(2);
      toast.success(
        lang === "it"
          ? "Richiesta inviata! Ti ricontatteremo a breve."
          : "Request sent! We'll get back to you shortly."
      );
    } catch {
      toast.error(
        lang === "it"
          ? "Errore nell'invio. Riprova o scrivici direttamente."
          : "Submission error. Please retry or contact us directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = (value: boolean) => {
    if (!value) {
      setTimeout(() => {
        setStep(1);
        setEmail("");
        setMessage("");
      }, 300);
    }
    onOpenChange(value);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 1 ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg">
                {lang === "it" ? "Richiedi contratto" : "Request lease"}
              </DialogTitle>
              <DialogDescription>
                {selectedPlan && (
                  <span className="font-medium text-primary">{selectedPlan}</span>
                )}
                {" — "}
                {lang === "it"
                  ? "Inserisci la tua email e ti ricontatteremo entro 24h."
                  : "Enter your email and we'll get back to you within 24h."}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-2">
              <div className="space-y-2">
                <Label htmlFor="contract-email">Email *</Label>
                <Input
                  id="contract-email"
                  type="email"
                  required
                  placeholder="nome@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  maxLength={255}
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contract-message">
                  {lang === "it" ? "Note (opzionale)" : "Notes (optional)"}
                </Label>
                <Textarea
                  id="contract-message"
                  placeholder={
                    lang === "it"
                      ? "Es. Contratto 3+2, cedolare secca, zona San Salvario..."
                      : "E.g. 3+2 lease, flat tax, San Salvario area..."
                  }
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1000}
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : null}
                {lang === "it" ? "Invia richiesta →" : "Send request →"}
              </Button>
            </form>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2 text-lg">
                <Check className="h-5 w-5 text-primary" />
                {lang === "it" ? "Richiesta inviata!" : "Request sent!"}
              </DialogTitle>
              <DialogDescription>
                {lang === "it"
                  ? "Ti ricontatteremo via email entro 24h. Nel frattempo puoi prenotare una call per discutere i dettagli."
                  : "We'll reply via email within 24h. In the meantime, you can book a call to discuss details."}
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-3 mt-2">
              <Button
                onClick={() => {
                  openCalendly();
                  handleClose(false);
                }}
                className="w-full"
              >
                <Calendar className="h-4 w-4 mr-2" />
                {lang === "it" ? "Prenota una call" : "Book a call"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleClose(false)}
                className="w-full"
              >
                {lang === "it" ? "Chiudi" : "Close"}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
