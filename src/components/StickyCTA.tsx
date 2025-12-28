import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, TrendingUp, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { QuickInvestorLeadDialog, QuickSellerLeadDialog } from "@/components/dialogs";

export const StickyCTA = () => {
  const { t } = useTranslation();
  const { trackClick } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const [sellerDialogOpen, setSellerDialogOpen] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const threshold = window.innerHeight * 1.0;
          if (window.scrollY > threshold && !isDismissed) {
            setIsVisible(true);
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
  }, [isDismissed]);

  const handleInvestClick = () => {
    trackClick('sticky_cta_invest');
    setInvestDialogOpen(true);
  };

  const handleSellerClick = () => {
    trackClick('sticky_cta_seller');
    setSellerDialogOpen(true);
  };

  if (!isVisible) return null;

  return (
    <>
      <div 
        role="region"
        aria-live="polite"
        aria-label={t('nav.investors')}
        className="fixed bottom-4 left-0 right-0 z-40 hidden md:block
                    backdrop-blur-xl bg-primary/95 border-t border-primary-foreground/20
                    transition-all duration-300 shadow-lg rounded-t-xl"
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
