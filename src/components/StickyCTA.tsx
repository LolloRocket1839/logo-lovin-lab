import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { X, TrendingUp, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { QuickInvestorLeadDialog, QuickSellerLeadDialog } from "@/components/dialogs";

export const StickyCTA = () => {
  const { t } = useTranslation();
  const { trackClick } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const [sellerDialogOpen, setSellerDialogOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const threshold = window.innerHeight * 1.0;
          if (window.scrollY > threshold && !isDismissed) {
            setIsVisible(true);
            if (!hasAnimated) {
              setHasAnimated(true);
            }
          } else if (window.scrollY <= threshold) {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed, hasAnimated]);

  const handleInvestClick = () => {
    trackClick('sticky_cta_invest');
    setInvestDialogOpen(true);
  };

  const handleSellerClick = () => {
    trackClick('sticky_cta_seller');
    setSellerDialogOpen(true);
  };

  if (!isVisible || isDismissed) return null;

  return (
    <>
      {/* Mobile version - positioned above BottomNav */}
      <div 
        role="region"
        aria-live="polite"
        aria-label={t('nav.investors')}
        className={`fixed bottom-20 left-3 right-3 z-40 md:hidden
                    glass-sticky
                    shadow-lg rounded-xl safe-area-bottom
                    ${hasAnimated && !prefersReducedMotion ? 'animate-fade-up' : ''}`}
      >
        <div className="px-3 py-2.5 flex items-center gap-2">
          <Button
            onClick={handleInvestClick}
            size="sm"
            variant="secondary"
            className="flex-1 h-10 text-sm font-semibold shadow-md"
          >
            <TrendingUp className="mr-1.5 w-4 h-4" aria-hidden="true" />
            {t('nav.investors')}
          </Button>
          <Button
            onClick={handleSellerClick}
            size="sm"
            variant="outline"
            className="flex-1 h-10 text-sm font-semibold bg-background/90"
          >
            <Building2 className="mr-1.5 w-4 h-4" aria-hidden="true" />
            {t('nav.sell')}
          </Button>
          <Button
            onClick={() => setIsDismissed(true)}
            variant="ghost"
            size="icon"
            className="h-10 w-10 flex-shrink-0 text-primary-foreground hover:bg-primary-foreground/10"
            aria-label={t('stickyCta.closeLabel')}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Desktop version */}
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
            variant="secondary"
            className="flex-1 h-12 text-sm font-semibold shadow-xl touch-target"
          >
            <TrendingUp className="mr-2 w-5 h-5" aria-hidden="true" />
            {t('nav.investors')}
          </Button>
          <Button
            onClick={handleSellerClick}
            size="lg"
            variant="outline"
            className="flex-1 h-12 text-sm font-semibold bg-background/90 touch-target"
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

      <QuickInvestorLeadDialog 
        open={investDialogOpen} 
        onOpenChange={setInvestDialogOpen}
        source="sticky_cta"
      />

      <QuickSellerLeadDialog 
        open={sellerDialogOpen} 
        onOpenChange={setSellerDialogOpen}
        source="sticky_cta"
      />
    </>
  );
};
