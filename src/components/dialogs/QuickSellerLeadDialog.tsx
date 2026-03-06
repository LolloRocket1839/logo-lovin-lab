import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Building2, Send, Loader2, CheckCircle, Calendar, MapPin, ChevronRight } from "lucide-react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { openCalendly } from "@/lib/calendly";
import { getUTMParams } from "@/hooks/useUTMTracking";
import { FORMSPREE_ENDPOINTS } from "@/constants";

interface QuickSellerLeadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source?: string;
  estimatedValue?: number;
}

export const QuickSellerLeadDialog = ({ 
  open, 
  onOpenChange,
  source = "unknown",
  estimatedValue,
}: QuickSellerLeadDialogProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { trackClick } = useAnalytics();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [email, setEmail] = useState("");
  // Step 2 optional fields
  const [address, setAddress] = useState("");
  const [reason, setReason] = useState("");

  const formatCurrency = (v: number) =>
    new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({ title: t('quickSellerLead.errorTitle'), description: t('quickSellerLead.emailRequired'), variant: "destructive" });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast({ title: t('quickSellerLead.errorTitle'), description: t('quickSellerLead.invalidEmail'), variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    trackClick('quick_seller_lead_submit', { source, email: email.trim() });

    try {
      const utmParams = getUTMParams();
      const response = await fetch(FORMSPREE_ENDPOINTS.quickSeller, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `🏠 SELLER LEAD - Jungle Rent - ${email.trim()}${utmParams.utm_source ? ` [${utmParams.utm_source}]` : ''}`,
          email: email.trim(),
          source,
          timestamp: new Date().toISOString(),
          type: "quick_seller_lead",
          estimated_value: estimatedValue || "",
          utm_source: utmParams.utm_source || "",
          utm_medium: utmParams.utm_medium || "",
          utm_campaign: utmParams.utm_campaign || "",
          utm_content: utmParams.utm_content || "",
          utm_term: utmParams.utm_term || "",
        }),
      });

      if (response.ok) {
        setStep(2);
        setEmail("");
        toast({ title: t('quickSellerLead.successTitle'), description: t('quickSellerLead.successDescription') });
      } else {
        throw new Error("Form submission failed");
      }
    } catch (error) {
      console.error("Quick seller lead submission error:", error);
      toast({ title: t('quickSellerLead.errorTitle'), description: t('quickSellerLead.errorDescription'), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStep2Submit = async () => {
    if (!address.trim() && !reason) {
      // Nothing filled, skip
      handleCalendlyClick();
      return;
    }
    trackClick('quick_seller_lead_step2', { source, address, reason });

    try {
      await fetch(FORMSPREE_ENDPOINTS.quickSeller, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `🏠 SELLER LEAD STEP 2 - ${source}`,
          source,
          property_address: address.trim(),
          selling_reason: reason,
          estimated_value: estimatedValue || "",
          timestamp: new Date().toISOString(),
          type: "quick_seller_lead_step2",
        }),
      });
    } catch {
      // Non-blocking
    }
    setStep(3);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setStep(1);
      setAddress("");
      setReason("");
    }
    onOpenChange(newOpen);
  };

  const handleCalendlyClick = () => {
    trackClick('quick_seller_calendly', { source });
    openCalendly();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-background via-background to-primary/5 border-primary/20">
        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center py-6 space-y-6">
            <div className="w-16 h-16 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-foreground">
                {t('quickSellerLead.successTitle')}
              </h3>
              <p className="text-muted-foreground mt-2">
                {t('quickSellerLead.successMessage')}
              </p>
            </div>
            <div className="space-y-3">
              <Button onClick={handleCalendlyClick} className="w-full h-12 font-semibold" variant="default">
                <Calendar className="mr-2 h-5 w-5" />
                {t('quickSellerLead.scheduleCall')}
              </Button>
              <Button onClick={() => onOpenChange(false)} variant="ghost" className="w-full">
                {t('quickSellerLead.close')}
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Optional qualification */}
        {step === 2 && (
          <div className="space-y-5">
            <DialogHeader className="text-center">
              <DialogTitle className="text-lg font-bold text-foreground">
                {t('quickSellerLead.step2Title')}
              </DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  <MapPin className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  {t('quickSellerLead.addressLabel')} <span className="text-muted-foreground text-xs">({t('quickSellerLead.optional')})</span>
                </Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder={t('quickSellerLead.addressPlaceholderStep2')}
                  className="h-11"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">
                  {t('quickSellerLead.reasonLabel')} <span className="text-muted-foreground text-xs">({t('quickSellerLead.optional')})</span>
                </Label>
                <Select value={reason} onValueChange={setReason}>
                  <SelectTrigger>
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inheritance">{t('quickSellerLead.reasonInheritance')}</SelectItem>
                    <SelectItem value="relocation">{t('quickSellerLead.reasonRelocation')}</SelectItem>
                    <SelectItem value="necessity">{t('quickSellerLead.reasonNecessity')}</SelectItem>
                    <SelectItem value="other">{t('quickSellerLead.reasonOther')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {estimatedValue && (
              <p className="text-xs text-center text-muted-foreground">
                {t('quickSellerLead.estimatedValueContext', { value: formatCurrency(estimatedValue) })}
              </p>
            )}

            <div className="space-y-2">
              <Button onClick={handleStep2Submit} variant="premium" className="w-full h-12 font-semibold">
                <ChevronRight className="mr-2 h-4 w-4" />
                {t('quickSellerLead.step2Submit')}
              </Button>
              <Button onClick={handleCalendlyClick} variant="ghost" className="w-full text-sm">
                {t('quickSellerLead.step2Skip')}
              </Button>
            </div>
          </div>
        )}

        {/* Step 1: Email capture */}
        {step === 1 && (
          <>
            <DialogHeader className="text-center">
              <div className="mx-auto mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <DialogTitle className="text-xl font-bold text-foreground">
                {t('quickSellerLead.newTitle')}
              </DialogTitle>
              <DialogDescription className="text-muted-foreground">
                {t('quickSellerLead.notAgency')}
              </DialogDescription>
              {estimatedValue && (
                <p className="text-sm text-primary font-medium mt-1">
                  {t('quickSellerLead.estimatedValueContext', { value: formatCurrency(estimatedValue) })}
                </p>
              )}
            </DialogHeader>

            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="seller-email" className="text-sm font-medium">Email</Label>
                <Input
                  id="seller-email"
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
                    {t('quickSellerLead.sending')}
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    {t('quickSellerLead.submit')}
                  </>
                )}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                {t('quickSellerLead.privacy')}
              </p>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
