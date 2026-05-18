import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useLeadCapture } from "@/hooks/useLeadCapture";
import { Loader2, TrendingUp, CheckCircle2, MessageCircle } from "lucide-react";
import { FORMSPREE_ENDPOINTS } from "@/constants";
import { CONTACTS } from "@/constants/contacts";

interface QuickInvestorLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

export const QuickInvestorLeadDialog = ({
  open,
  onOpenChange,
  source = "unknown",
}: QuickInvestorLeadDialogProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { trackClick } = useAnalytics();
  const { submitLead, isSubmitting } = useLeadCapture();
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const isIt = i18n.language === "it";

  const whatsappHref = (() => {
    const phone = CONTACTS.investor.phone.replace(/[^\d]/g, "");
    const msg = isIt
      ? `Ciao Lorenzo, ho appena lasciato la mia email (${email.trim()}) per investire con Jungle Rent. Vorrei capire i prossimi passi.`
      : `Hi Lorenzo, I just left my email (${email.trim()}) to invest with Jungle Rent. I'd like to understand the next steps.`;
    return `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim()) {
      toast({
        title: t("quickInvestorLead.errorTitle"),
        description: t("quickInvestorLead.emailRequired"),
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast({
        title: t("quickInvestorLead.errorTitle"),
        description: t("quickInvestorLead.invalidEmail"),
        variant: "destructive",
      });
      return;
    }

    trackClick("quick_investor_lead_submit", { source, email: email.trim() });

    const result = await submitLead(
      { email: email.trim(), source, leadType: "investor" },
      {
        endpoint: FORMSPREE_ENDPOINTS.quickInvestor,
        subject: `🔥 INVESTOR LEAD - Jungle Rent - ${email.trim()}`,
      }
    );

    if (result.success) {
      setSubmitted(true);
    } else {
      toast({
        title: t("quickInvestorLead.errorTitle"),
        description: t("quickInvestorLead.errorDescription"),
        variant: "destructive",
      });
    }
  };

  const handleWhatsAppClick = () => {
    trackClick("quick_investor_lead_whatsapp_handoff", { source });
  };

  const handleClose = (next: boolean) => {
    if (!next && submitted) {
      // reset for next time and navigate to thank-you
      setSubmitted(false);
      setEmail("");
      const thankYouPath = isIt ? "/grazie" : "/thank-you";
      navigate(`${thankYouPath}?type=investor`);
    }
    onOpenChange(next);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-background via-background to-primary/5 border-primary/20">
        {!submitted ? (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                  {t("quickInvestorLead.urgencyBadge")}
                </span>
              </div>
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">
                {t("quickInvestorLead.title")}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {t("quickInvestorLead.description")}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="tuo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                  autoFocus
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                variant="premium"
                size="lg"
                className="w-full h-14 text-base font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    {t("quickInvestorLead.sending")}
                  </>
                ) : (
                  t("quickInvestorLead.submit")
                )}
              </Button>

              <p className="text-[11px] text-center text-muted-foreground">
                {isIt
                  ? "Risposta entro 24h · WhatsApp diretto con Lorenzo · Nessun impegno"
                  : "Reply within 24h · Direct WhatsApp with Lorenzo · No commitment"}
              </p>

              <p className="text-xs text-center text-muted-foreground">
                {t("quickInvestorLead.privacy")}
              </p>
            </form>
          </>
        ) : (
          <div className="text-center py-2">
            <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle2 className="w-7 h-7 text-primary" />
            </div>
            <DialogTitle className="text-xl font-bold text-foreground mb-2">
              {isIt ? "Email ricevuta ✓" : "Email received ✓"}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground mb-6">
              {isIt
                ? "Lorenzo ti risponderà a breve. Vuoi anticipare? Scrivigli ora su WhatsApp — risponde di persona."
                : "Lorenzo will get back to you shortly. Want to skip the queue? Message him on WhatsApp now — he replies personally."}
            </DialogDescription>

            <Button
              asChild
              variant="premium"
              size="lg"
              className="w-full h-14 text-base font-semibold"
              onClick={handleWhatsAppClick}
            >
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="mr-2 h-5 w-5" />
                {isIt ? "Parla con Lorenzo ora" : "Talk to Lorenzo now"}
              </a>
            </Button>

            <button
              type="button"
              onClick={() => handleClose(false)}
              className="mt-3 text-xs text-muted-foreground hover:text-foreground underline-offset-2 hover:underline"
            >
              {isIt ? "Lo farò più tardi" : "I'll do it later"}
            </button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
