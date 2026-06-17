import { useState, useEffect, useRef, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { X, MessageCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useGlobalScroll } from "@/hooks/useGlobalScroll";
import { CONTACTS, MESSAGES, openWhatsApp } from "@/constants/contacts";
import { QuickSellerLeadDialog } from "@/components/dialogs";

export const StickyCTA = () => {
  const { t, i18n } = useTranslation();
  const { trackClick } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [sellerDialogOpen, setSellerDialogOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleScroll = useCallback((scrollY: number) => {
    const threshold = window.innerHeight * 1.0;
    if (scrollY > threshold && !isDismissed) {
      setIsVisible(true);
      setHasAnimated((prev) => prev || true);
    } else if (scrollY <= threshold) {
      setIsVisible(false);
    }
  }, [isDismissed]);

  useGlobalScroll(handleScroll);

  const handleInvestClick = () => {
    trackClick('sticky_cta_talk_to_lorenzo');
    const lang = i18n.language.startsWith('en') ? 'en' : 'it';
    const message = MESSAGES.investor.whatsapp[lang](CONTACTS.lorenzo.name);
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  const handleSellerClick = () => {
    trackClick('sticky_cta_seller');
    setSellerDialogOpen(true);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <>
      {/* Desktop version only - mobile removed to avoid BottomNav overlap */}
      <div 
        role="region"
        aria-live="polite"
        aria-label={t('nav.investors')}
        className={`fixed bottom-4 left-0 right-0 z-40 hidden md:block
                    glass-sticky
                    shadow-lg rounded-t-xl
                    ${hasAnimated && !prefersReducedMotion ? 'animate-fade-up' : ''}`}
      >
        <div className="container px-4 md:px-8 py-3 flex items-center justify-between gap-3">
          <Button
            onClick={handleInvestClick}
            size="lg"
            className="flex-1 h-12 text-sm font-semibold shadow-xl touch-target focus-visible:ring-offset-background"
          >
            <MessageCircle className="mr-2 w-5 h-5" aria-hidden="true" />
            {t('cta.talkToLorenzo')}
          </Button>
          <Button
            onClick={handleSellerClick}
            size="lg"
            variant="outline"
            className="flex-1 h-12 text-sm font-semibold bg-background/90 touch-target focus-visible:ring-offset-background hover:bg-yellow-100 hover:text-gray-900 hover:border-yellow-200 active:bg-yellow-200 active:text-gray-900 active:border-yellow-300"
          >
            <Building2 className="mr-2 w-5 h-5" aria-hidden="true" />
            {t('nav.sell')}
          </Button>
          <Button
            onClick={() => setIsDismissed(true)}
            variant="ghost"
            size="icon"
            className="h-12 w-12 flex-shrink-0 text-primary-foreground hover:bg-primary-foreground/10 touch-target"
            aria-label={t('stickyCta.closeLabel')}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <QuickSellerLeadDialog 
        open={sellerDialogOpen} 
        onOpenChange={setSellerDialogOpen}
        source="sticky_cta"
      />
    </>
  );
};
