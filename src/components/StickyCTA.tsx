import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";
import { QuickSellerLeadDialog } from "@/components/QuickSellerLeadDialog";

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
          const threshold = window.innerHeight * 1.5;
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

  const handleSellClick = () => {
    trackClick('sticky_cta_sell');
    setSellerDialogOpen(true);
  };

  if (!isVisible) return null;

  return (
    <>
      <div 
        role="region"
        aria-live="polite"
        className="fixed bottom-6 right-6 z-40 hidden md:flex items-center gap-2
                   animate-in slide-in-from-bottom-4 fade-in duration-300"
      >
        <div className="flex items-center gap-1.5 bg-background/80 backdrop-blur-md 
                        rounded-full p-1.5 shadow-lg border border-border/50">
          <Button
            onClick={handleInvestClick}
            size="sm"
            className="h-9 px-4 text-sm font-medium rounded-full"
          >
            {t('stickyCta.investNow')}
          </Button>
          <Button
            onClick={handleSellClick}
            size="sm"
            variant="ghost"
            className="h-9 px-4 text-sm font-medium rounded-full text-muted-foreground hover:text-foreground"
          >
            {t('stickyCta.sellNow')}
          </Button>
          <Button
            onClick={() => setIsDismissed(true)}
            variant="ghost"
            size="icon"
            className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground"
            aria-label={t('stickyCta.closeLabel')}
          >
            <X className="h-4 w-4" />
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
