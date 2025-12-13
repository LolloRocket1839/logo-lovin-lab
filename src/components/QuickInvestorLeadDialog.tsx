import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, Send, Loader2, CheckCircle, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { openCalendly } from "@/lib/calendly";
import { getUTMParams } from "@/hooks/useUTMTracking";
interface QuickInvestorLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
}

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeojbzow";

export const QuickInvestorLeadDialog = ({ 
  open, 
  onOpenChange,
  source = "unknown"
}: QuickInvestorLeadDialogProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { trackClick } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: t('quickLead.errorTitle'),
        description: t('quickLead.emailRequired'),
        variant: "destructive",
      });
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast({
        title: t('quickLead.errorTitle'),
        description: t('quickLead.invalidEmail'),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    trackClick('quick_investor_lead_submit', { source, email: email.trim() });

    try {
      const utmParams = getUTMParams();
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _subject: `🚀 QUICK INVESTOR LEAD - Jungle Rent - ${email.trim()}${utmParams.utm_source ? ` [${utmParams.utm_source}]` : ''}`,
          email: email.trim(),
          name: name.trim() || "Non specificato",
          source,
          timestamp: new Date().toISOString(),
          type: "quick_investor_lead",
          // UTM tracking
          utm_source: utmParams.utm_source || "",
          utm_medium: utmParams.utm_medium || "",
          utm_campaign: utmParams.utm_campaign || "",
          utm_content: utmParams.utm_content || "",
          utm_term: utmParams.utm_term || "",
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setEmail("");
        setName("");
        toast({
          title: t('quickLead.successTitle'),
          description: t('quickLead.successDescription'),
        });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Quick lead submission error:", error);
      toast({
        title: t('quickLead.errorTitle'),
        description: t('quickLead.errorDescription'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when closing
      setIsSubmitted(false);
    }
    onOpenChange(newOpen);
  };

  const handleCalendlyClick = () => {
    trackClick('quick_lead_calendly', { source });
    openCalendly();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-background via-background to-primary/5 border-primary/20">
        {isSubmitted ? (
          // Success State with Calendly CTA
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('quickLead.successTitle')}
              </h3>
              <p className="text-muted-foreground mt-2">
                {t('quickLead.successMessage')}
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={handleCalendlyClick}
                className="w-full h-12 font-semibold"
                variant="default"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {t('quickLead.scheduleCall')}
              </Button>
              <Button
                onClick={() => onOpenChange(false)}
                variant="ghost"
                className="w-full"
              >
                {t('quickLead.close')}
              </Button>
            </div>
          </div>
        ) : (
          // Form State
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">
                {t('quickLead.title')}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {t('quickLead.description')}
              </DialogDescription>
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="quick-email" className="text-sm font-medium">
                  Email *
                </Label>
                <Input
                  id="quick-email"
                  type="email"
                  placeholder="tuo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                  autoFocus
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quick-name" className="text-sm font-medium text-muted-foreground">
                  {t('quickLead.namePlaceholder')} ({t('quickLead.optional')})
                </Label>
                <Input
                  id="quick-name"
                  type="text"
                  placeholder={t('quickLead.namePlaceholder')}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-12"
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
                    {t('quickLead.sending')}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    {t('quickLead.submit')}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                {t('quickLead.privacy')}
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
