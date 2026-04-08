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
import { Loader2, TrendingUp } from "lucide-react";
import { FORMSPREE_ENDPOINTS } from "@/constants";

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
      setEmail("");
      onOpenChange(false);
      const thankYouPath = i18n.language === "it" ? "/grazie" : "/thank-you";
      navigate(`${thankYouPath}?type=investor`);
    } else {
      toast({
        title: t("quickInvestorLead.errorTitle"),
        description: t("quickInvestorLead.errorDescription"),
        variant: "destructive",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-background via-background to-primary/5 border-primary/20">
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

          <p className="text-xs text-center text-muted-foreground">
            {t("quickInvestorLead.privacy")}
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
};
