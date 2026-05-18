import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, Mail, Clock, Shield, CheckCircle2 } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useTranslation } from "react-i18next";
import { useAnalytics } from "@/hooks/useAnalytics";
import { toast } from "sonner";
import { openWhatsApp, openEmail, CONTACTS, MESSAGES } from "@/constants";
import { FORMSPREE_ENDPOINTS } from "@/constants/formspree";
import { useLeadCapture } from "@/hooks/useLeadCapture";

interface InvestorExitIntentPopupProps {
  source?: string;
}

export const InvestorExitIntentPopup = ({ source = "investors_page" }: InvestorExitIntentPopupProps) => {
  const { t, i18n } = useTranslation();
  const { trackEvent } = useAnalytics();
  const { submitLead } = useLeadCapture();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const currentLang = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';

  const showPopup = useCallback(() => {
    const alreadyShown = sessionStorage.getItem("investorExitIntentShown");
    if (!alreadyShown) {
      setIsVisible(true);
      sessionStorage.setItem("investorExitIntentShown", "true");
      trackEvent("investor_exit_intent_shown", { source });
    }
  }, [trackEvent, source]);

  useEffect(() => {
    // Desktop: mouse leaves window from top
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    // Mobile: inactivity timer (45 seconds)
    let inactivityTimer: ReturnType<typeof setTimeout>;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        showPopup();
      }, 45000);
    };

    // Mobile: scroll up detection (attempt to go back)
    let lastScrollY = window.scrollY;
    let scrollUpCount = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY - 100) {
        scrollUpCount++;
        if (scrollUpCount >= 2 && currentScrollY < 200) {
          showPopup();
        }
      } else {
        scrollUpCount = 0;
      }
      lastScrollY = currentScrollY;
      resetInactivityTimer();
    };

    const handleInteraction = () => {
      resetInactivityTimer();
    };

    // Check if mobile
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile) {
      window.addEventListener("scroll", handleScroll, { passive: true });
      window.addEventListener("touchstart", handleInteraction, { passive: true });
      resetInactivityTimer();
    } else {
      document.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("touchstart", handleInteraction);
      clearTimeout(inactivityTimer);
    };
  }, [showPopup]);

  const handleClose = () => {
    setIsVisible(false);
    trackEvent("investor_exit_intent_closed", { source });
  };

  const handleWhatsApp = () => {
    trackEvent("investor_exit_intent_whatsapp", { source });
    const message = MESSAGES.investor.whatsapp[currentLang](CONTACTS.lorenzo.name);
    openWhatsApp(CONTACTS.lorenzo.phone, message);
    handleClose();
  };

  const handleEmail = () => {
    trackEvent("investor_exit_intent_email", { source });
    const emailData = MESSAGES.investor.email[currentLang];
    openEmail(emailData.subject, emailData.body, CONTACTS.email);
    handleClose();
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error(t("investorExitIntent.emailError"));
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(FORMSPREE_ENDPOINTS.quickInvestor, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          source: `investor_exit_intent_${source}`,
          language: currentLang,
          timestamp: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        trackEvent("investor_exit_intent_form_submit", { source, email_provided: true });
        toast.success(t("investorExitIntent.success"));
        handleClose();
      } else {
        toast.error(t("investorExitIntent.errorSubmit"));
      }
    } catch (error) {
      toast.error(t("investorExitIntent.errorSubmit"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-x-4 bottom-4 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 
                       max-w-md w-full md:w-[440px] bg-card border border-border/30 rounded-2xl shadow-2xl z-50 
                       overflow-hidden"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted/50 transition-colors z-10"
              aria-label={t("investorExitIntent.close")}
            >
              <X className="w-5 h-5 text-muted-foreground" />
            </button>

            {/* Content */}
            <div className="p-6 md:p-8">
              {/* Badge */}
              <div className="flex items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <img 
                  src={jungleRentLogo} 
                  alt="" 
                  className="w-8 h-8 object-contain" 
                  aria-hidden="true"
                />
                {t("investorExitIntent.badge")}
              </span>
              </div>

              {/* Title */}
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2 pr-8">
                {t("investorExitIntent.title")}
              </h2>

              {/* Subtitle */}
              <p className="text-muted-foreground mb-6">
                {t("investorExitIntent.subtitle")}
              </p>

              {/* CTA Buttons */}
              <div className="space-y-3 mb-6">
                <Button
                  onClick={handleWhatsApp}
                  size="lg"
                  variant="premium"
                  className="w-full py-6 text-base group shadow-lg"
                >
                  <MessageCircle className="mr-2 w-5 h-5" />
                  {t("investorExitIntent.whatsappCTA")}
                </Button>

                <Button
                  onClick={handleEmail}
                  size="lg"
                  variant="outline"
                  className="w-full py-6 text-base"
                >
                  <Mail className="mr-2 w-5 h-5" />
                  {t("investorExitIntent.emailCTA")}
                </Button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-border/50" />
                <span className="text-xs text-muted-foreground uppercase tracking-wide">
                  {t("investorExitIntent.orSeparator")}
                </span>
                <div className="flex-1 h-px bg-border/50" />
              </div>

              {/* Email form */}
              <form onSubmit={handleFormSubmit} className="space-y-3">
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder={t("investorExitIntent.emailPlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12"
                  disabled={isSubmitting}
                />
                <Button
                  type="submit"
                  variant="secondary"
                  className="w-full h-12"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t("investorExitIntent.submitting") : t("investorExitIntent.submitCTA")}
                </Button>
              </form>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-4 mt-6 pt-4 border-t border-border/30">
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Shield className="w-3.5 h-3.5" />
                  <span>{t("investorExitIntent.trust1")}</span>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{t("investorExitIntent.trust2")}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
