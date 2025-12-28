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
import { getUTMParams } from "@/hooks/useUTMTracking";
import { Loader2, TrendingUp } from "lucide-react";

interface QuickInvestorLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeojbzow";

export const QuickInvestorLeadDialog = ({
  open,
  onOpenChange,
  source = "unknown",
}: QuickInvestorLeadDialogProps) => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { trackClick } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");

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

    setIsSubmitting(true);
    trackClick("quick_investor_lead_submit", { source, email: email.trim() });

    try {
      const utmParams = getUTMParams();
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `🔥 INVESTOR LEAD - Jungle Rent - ${email.trim()}${utmParams.utm_source ? ` [${utmParams.utm_source}]` : ""}`,
          email: email.trim(),
          source,
          timestamp: new Date().toISOString(),
          type: "quick_investor_lead",
          utm_source: utmParams.utm_source || "",
          utm_medium: utmParams.utm_medium || "",
          utm_campaign: utmParams.utm_campaign || "",
          utm_content: utmParams.utm_content || "",
          utm_term: utmParams.utm_term || "",
        }),
      });

      if (response.ok) {
        setEmail("");
        onOpenChange(false);
        const thankYouPath = i18n.language === "it" ? "/grazie" : "/thank-you";
        navigate(`${thankYouPath}?type=investor`);
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Quick investor lead submission error:", error);
      toast({
        title: t("quickInvestorLead.errorTitle"),
        description: t("quickInvestorLead.errorDescription"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-background via-background to-primary/5 border-primary/20">
        <DialogHeader className="text-center">
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

          <p className="text-xs text-center text-muted-foreground">
            {t("quickInvestorLead.privacy")}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
