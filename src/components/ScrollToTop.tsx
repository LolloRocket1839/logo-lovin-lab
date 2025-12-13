import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ArrowUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const scrollToJourney = () => {
    const journeySection = document.getElementById('value-journey');
    if (journeySection) {
      journeySection.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToJourney}
          className="fixed bottom-20 md:bottom-24 right-6 z-50 hidden lg:flex items-center gap-2 
                     px-4 py-2.5 rounded-full bg-primary text-primary-foreground shadow-lg
                     hover:shadow-xl transition-shadow duration-300 cursor-pointer"
          aria-label={t('scrollToTop.tooltip')}
        >
          <ArrowUp className="h-4 w-4" />
          <span className="text-sm font-medium whitespace-nowrap">
            {t('scrollToTop.label', 'Rivedi il modello')}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
};
