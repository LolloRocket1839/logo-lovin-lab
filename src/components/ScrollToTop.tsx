import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const ScrollToTop = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Show button after scrolling 2 viewports
          if (window.scrollY > window.innerHeight * 2) {
            setIsVisible(true);
          } else {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={scrollToTop}
            variant="premium"
            size="icon"
            className={`fixed bottom-20 md:bottom-24 right-6 sm:right-8 z-50 h-11 w-11 sm:h-12 sm:w-12 md:h-14 md:w-14 rounded-full shadow-lg
                        transition-all duration-300 hover:shadow-xl hover:scale-110 hidden lg:flex
                        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
            aria-label={t('scrollToTop.tooltip')}
          >
            <ArrowUp className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left" className="font-medium">
          <p>{t('scrollToTop.tooltip')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
