import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Shield, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAnalytics } from "@/hooks/useAnalytics";
import { getUTMParams, formatUTMForEmail } from "@/hooks/useUTMTracking";
import { FORMSPREE_ENDPOINTS } from "@/constants";

interface ExitIntentPopupProps {
  source?: string;
  /** Prefix for tracking events (e.g., "seller" → "seller_exit_intent_shown") */
  trackingPrefix?: string;
  /** Override the default popup title */
  title?: string;
  /** Override the default popup subtitle */
  subtitle?: string;
}

const STORAGE_KEY = "exitIntentShown";

export const ExitIntentPopup = ({ source = "exit-intent", trackingPrefix, title, subtitle }: ExitIntentPopupProps) => {
  const { t } = useTranslation();
  const { trackEvent } = useAnalytics();
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate event names based on prefix
  const getEventName = (eventType: 'shown' | 'closed' | 'submit') => {
    const base = trackingPrefix ? `${trackingPrefix}_exit_intent` : 'exit_intent';
    return `${base}_${eventType === 'submit' ? 'submit' : eventType}`;
  };

  const showPopup = useCallback(() => {
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);
    if (alreadyShown) return;
    
    setIsOpen(true);
    sessionStorage.setItem(STORAGE_KEY, "true");
    trackEvent(getEventName('shown'), { source });
  }, [source, trackEvent, trackingPrefix]);

  useEffect(() => {
    // Desktop: Mouse leave detection
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        showPopup();
      }
    };

    // Mobile: Inactivity timeout (30 seconds)
    let inactivityTimer: ReturnType<typeof setTimeout>;
    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        showPopup();
      }, 30000);
    };

    // Only set up listeners if not already shown
    const alreadyShown = sessionStorage.getItem(STORAGE_KEY);
    if (!alreadyShown) {
      document.addEventListener("mouseleave", handleMouseLeave);
      
      // Mobile: Touch events reset timer
      document.addEventListener("touchstart", resetInactivityTimer);
      document.addEventListener("scroll", resetInactivityTimer);
      resetInactivityTimer();
    }

    return () => {
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("touchstart", resetInactivityTimer);
      document.removeEventListener("scroll", resetInactivityTimer);
      clearTimeout(inactivityTimer);
    };
  }, [showPopup]);

  const handleClose = () => {
    setIsOpen(false);
    trackEvent(getEventName('closed'), { source });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast.error(t("exitIntent.emailRequired", "Inserisci un'email valida"));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      toast.error(t("exitIntent.emailInvalid", "Email non valida"));
      return;
    }

    setIsSubmitting(true);

    try {
      const utmParams = getUTMParams();
      const utmString = formatUTMForEmail(utmParams);

      const response = await fetch(FORMSPREE_ENDPOINTS.exitIntent, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          source,
          timestamp: new Date().toISOString(),
          _subject: `🚀 Exit Intent Lead - ${source}${utmString}`,
        }),
      });

      if (response.ok) {
        trackEvent(getEventName('submit'), { source });
        toast.success(t("exitIntent.success", "Riceverai la valutazione entro 24 ore!"));
        setIsOpen(false);
      } else {
        throw new Error("Submission failed");
      }
    } catch (error) {
      toast.error(t("exitIntent.error", "Errore. Riprova più tardi."));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-full md:max-w-md bg-card border border-border rounded-2xl shadow-2xl z-50 overflow-hidden"
          >
            {/* Header with gradient */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 p-6 pb-4 relative">
              <button
                onClick={handleClose}
                className="absolute right-4 top-4 p-2 rounded-full hover:bg-background/50 transition-colors"
                aria-label={t("exitIntent.close", "Chiudi")}
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>

              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <Gift className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wider text-primary font-medium">
                    {t("exitIntent.badge", "Offerta esclusiva")}
                  </p>
                </div>
              </div>

              <h2 className="text-xl font-display font-bold text-foreground">
                {title ?? t("exitIntent.title", "Before you go...")}
              </h2>
              <p className="text-muted-foreground text-sm mt-1">
                {subtitle ?? t("exitIntent.subtitle", "Leave your email — we'll send you investment updates and opportunities")}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 pt-4">
              <div className="space-y-3 mb-4">
                <Input
                  type="email"
                  placeholder={t("exitIntent.emailPlaceholder", "La tua email *")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                <Input
                  type="tel"
                  placeholder={t("exitIntent.phonePlaceholder", "Telefono (opzionale)")}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="h-12"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 text-base font-semibold"
                variant="premium"
              >
                {isSubmitting 
                  ? t("exitIntent.submitting", "Invio...") 
                  : t("exitIntent.cta", "Ricevi valutazione gratuita")}
              </Button>

              {/* Trust indicators */}
              <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{t("exitIntent.trust1", "Risposta in 24h")}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  <span>{t("exitIntent.trust2", "Zero impegno")}</span>
                </div>
              </div>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
