import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";

export const StickyCTA = () => {
  const { t } = useTranslation();
  const { trackClick } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [investDialogOpen, setInvestDialogOpen] = useState(false);

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

  const handleClick = () => {
    trackClick('sticky_cta_invest');
    setInvestDialogOpen(true);
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
        <Button
          onClick={handleClick}
          size="sm"
          className="h-10 px-5 text-sm font-medium shadow-lg 
                     bg-primary text-primary-foreground hover:bg-primary/90
                     rounded-full transition-all hover:shadow-xl hover:scale-105"
        >
          {t('stickyCta.investNow')}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        <Button
          onClick={() => setIsDismissed(true)}
          variant="ghost"
          size="icon"
          className="h-8 w-8 rounded-full bg-muted/80 hover:bg-muted text-muted-foreground"
          aria-label={t('stickyCta.closeLabel')}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>

      <QuickInvestorLeadDialog 
        open={investDialogOpen} 
        onOpenChange={setInvestDialogOpen}
        source="sticky_cta"
      />
    </>
  );
};
