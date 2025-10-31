import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { openEmail, MESSAGES } from "@/lib/contacts";

export const StickyInvestorCTA = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const investorSection = document.getElementById("investor-section");
          if (!investorSection) {
            ticking = false;
            return;
          }

          const rect = investorSection.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          const isNotAtBottom = rect.bottom > window.innerHeight * 0.8;
          
          setIsVisible(isInView && isNotAtBottom);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    openEmail(MESSAGES.investor.email.subject, MESSAGES.investor.email.body);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 px-4 md:hidden animate-fade-in-up">
      <Button
        size="lg"
        variant="premium"
        onClick={handleClick}
        className="w-full max-w-md mx-auto shadow-2xl backdrop-blur-xl"
      >
        {t('nav.contactUs')}
        <ArrowRight className="ml-2 w-5 h-5" />
      </Button>
    </div>
  );
};
