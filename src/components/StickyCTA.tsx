import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";

export const StickyCTA = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > window.innerHeight && !isDismissed) {
            setIsVisible(true);
          } else if (window.scrollY <= window.innerHeight) {
            setIsVisible(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const currentLang = (i18n.language === 'en' ? 'en' : 'it') as 'it' | 'en';

  const handleContactLorenzo = () => {
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.lorenzo.name));
  };

  const handleContactAndrea = () => {
    openWhatsApp(CONTACTS.andrea.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.andrea.name));
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden
                  backdrop-blur-xl bg-background/80 border-t border-border/50
                  transition-all duration-500
                  ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="container px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex gap-2 flex-1">
          <Button
            onClick={handleContactLorenzo}
            size="sm"
            variant="hero"
            className="flex-1 h-10 text-sm group"
          >
            <MessageCircle className="mr-1.5 h-4 w-4" />
            {t('stickyCta.lorenzoButton')}
          </Button>
          <Button
            onClick={handleContactAndrea}
            size="sm"
            variant="hero"
            className="flex-1 h-10 text-sm group"
          >
            <MessageCircle className="mr-1.5 h-4 w-4" />
            {t('stickyCta.andreaButton')}
          </Button>
        </div>
        <Button
          onClick={() => setIsDismissed(true)}
          variant="ghost"
          size="icon"
          className="h-10 w-10 flex-shrink-0"
          aria-label={t('stickyCta.closeLabel')}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};