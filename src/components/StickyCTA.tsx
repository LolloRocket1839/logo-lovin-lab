import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { X, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACTS, openWhatsApp, MESSAGES, openEmail } from "@/lib/contacts";
import { useAnalytics } from "@/hooks/useAnalytics";

type SectionType = 'student' | 'investor' | 'seller' | 'default';

export const StickyCTA = () => {
  const { t, i18n } = useTranslation();
  const { trackClick } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionType>('default');

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

          // Detect which section is visible
          const studentSection = document.querySelector('#student-section');
          const investorSection = document.querySelector('#investor-section');
          const sellerSection = document.querySelector('#seller-section');

          const sections = [
            { element: studentSection, type: 'student' as SectionType },
            { element: investorSection, type: 'investor' as SectionType },
            { element: sellerSection, type: 'seller' as SectionType },
          ];

          let newActiveSection: SectionType = 'default';
          
          for (const { element, type } of sections) {
            if (element) {
              const rect = element.getBoundingClientRect();
              const isInView = rect.top < window.innerHeight * 0.5 && rect.bottom > window.innerHeight * 0.3;
              
              if (isInView) {
                newActiveSection = type;
                break;
              }
            }
          }

          setActiveSection(newActiveSection);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const currentLang = (i18n.language === 'en' ? 'en' : 'it') as 'it' | 'en';

  const handleContactLorenzo = () => {
    trackClick('sticky_cta_lorenzo', { section: activeSection });
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.lorenzo.name));
  };


  const handleInvestorWhatsApp = () => {
    trackClick('sticky_cta_investor', { section: activeSection });
    const message = MESSAGES.investor.whatsapp[currentLang](CONTACTS.investor.name);
    openWhatsApp(CONTACTS.investor.phone, message);
  };

  if (!isVisible) return null;

  // Render investor CTA
  if (activeSection === 'investor') {
    return (
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden
                    backdrop-blur-xl bg-background/95 border-t border-border/50
                    transition-all duration-500 animate-fade-in"
        style={{ transition: 'transform 0.3s ease-in-out, opacity 0.5s ease' }}
      >
        <div className="container px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2 transition-spacing">
          <Button
            onClick={handleInvestorWhatsApp}
            size="lg"
            variant="premium"
            className="flex-1 h-11 sm:h-12 text-xs sm:text-sm md:text-base group shadow-xl"
          >
            <MessageCircle className="mr-2 w-4 h-4" />
            {t('investor.talkToAdvisor')}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <Button
            onClick={() => setIsDismissed(true)}
            variant="ghost"
            size="icon"
            className="h-11 sm:h-12 w-11 sm:w-12 flex-shrink-0"
            aria-label={t('stickyCta.closeLabel')}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Render default CTA (Lorenzo & Andrea)
  return (
      <div 
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden
                    backdrop-blur-xl bg-background/95 border-t border-border/50
                    transition-all duration-500 animate-fade-in"
        style={{ transition: 'transform 0.3s ease-in-out, opacity 0.5s ease' }}
      >
      <div className="container px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between gap-2 transition-spacing">
        <div className="flex gap-2 flex-1">
          <Button
            onClick={handleContactLorenzo}
            size="sm"
            variant="premium"
            className="flex-1 h-11 sm:h-12 text-xs sm:text-sm group shadow-lg"
          >
            <MessageCircle className="mr-1 sm:mr-1.5 h-3 w-3 sm:h-4 sm:w-4" />
            {t('hero.contactLorenzo')}
          </Button>
        </div>
        <Button
          onClick={() => setIsDismissed(true)}
          variant="ghost"
          size="icon"
          className="h-10 w-10 sm:h-11 sm:w-11 flex-shrink-0"
          aria-label={t('stickyCta.closeLabel')}
        >
          <X className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>
    </div>
  );
};