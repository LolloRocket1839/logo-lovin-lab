import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, Building2, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CONTACTS, openWhatsApp } from "@/constants/contacts";

interface SellerStickyCtaProps {
  onOpenDialog?: () => void;
}

export const SellerStickyCta = ({ onOpenDialog }: SellerStickyCtaProps) => {
  const { t } = useTranslation();
  const { trackClick } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("seller-hero");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting && !isDismissed) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  const handleCta = () => {
    trackClick("seller_sticky_cta_primary");
    onOpenDialog?.();
  };

  const handleWhatsApp = () => {
    trackClick("seller_sticky_cta_whatsapp");
    const message = t("sellerStickyCta.whatsappMessage", "Ciao Lorenzo, vorrei una valutazione gratuita per vendere casa a Torino.");
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  return (
    <div
      role="region"
      aria-label={t("sellerStickyCta.title")}
      data-testid="seller-sticky-cta"
      className="fixed bottom-32 left-0 right-0 z-40 md:bottom-4 md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-2xl"
    >
      <div className="bg-background/95 backdrop-blur-lg border-t md:border border-primary/20 md:rounded-2xl shadow-2xl p-3 md:p-4">
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 shrink-0">
            <Building2 className="w-5 h-5 text-primary" />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {t("sellerStickyCta.title")}
            </p>
            <p className="text-xs text-muted-foreground truncate hidden sm:block">
              {t("sellerStickyCta.subtitle")}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              onClick={handleCta}
              size="sm"
              variant="premium"
              className="h-10 px-4 text-sm font-semibold"
            >
              <span className="hidden sm:inline">{t("sellerStickyCta.cta")}</span>
              <span className="sm:hidden">{t("sellerStickyCta.ctaMobile", "Offerta")}</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>

            <Button
              onClick={handleWhatsApp}
              size="icon"
              variant="outline"
              className="h-10 w-10 border-primary/30"
              aria-label={t("sellerStickyCta.whatsappLabel", "WhatsApp")}
            >
              <MessageCircle className="w-4 h-4" />
            </Button>

            <Button
              onClick={() => setIsDismissed(true)}
              size="icon"
              variant="ghost"
              className="h-10 w-10 text-muted-foreground hover:text-foreground hidden sm:flex"
              aria-label={t("common.close", "Chiudi")}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
