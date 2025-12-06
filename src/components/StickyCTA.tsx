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
          // Show earlier - after 50vh instead of 100vh
          const threshold = window.innerHeight * 0.5;
          if (window.scrollY > threshold && !isDismissed) {
            setIsVisible(true);
          } else if (window.scrollY <= threshold) {
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

  // Render investor CTA - positioned above BottomNav
  if (activeSection === 'investor') {
    return (
      <div 
        role="region"
        aria-live="polite"
        aria-label={t('investor.talkToAdvisor')}
        className="fixed bottom-16 left-0 right-0 z-40 md:hidden
                    backdrop-blur-xl bg-primary/95 border-t border-primary-foreground/20
                    transition-all duration-300 animate-fade-in shadow-lg"
      >
        <div className="container px-3 py-3 flex items-center justify-between gap-2">
          <Button
            onClick={handleInvestorWhatsApp}
            size="lg"
            variant="secondary"
            className="flex-1 h-14 text-sm font-semibold group shadow-xl touch-target"
          >
            <MessageCircle className="mr-2 w-5 h-5" aria-hidden="true" />
            {t('investor.talkToAdvisor')}
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Button>
          <Button
            onClick={() => setIsDismissed(true)}
            variant="ghost"
            size="icon"
            className="h-14 w-14 flex-shrink-0 text-primary-foreground hover:bg-primary-foreground/10 touch-target"
            aria-label={t('stickyCta.closeLabel')}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      </div>
    );
  }

  // Render default CTA (Lorenzo) - positioned above BottomNav
  return (
    <div 
      role="region"
      aria-live="polite"
      aria-label={t('hero.contactLorenzo')}
      className="fixed bottom-16 left-0 right-0 z-40 md:hidden
                  backdrop-blur-xl bg-primary/95 border-t border-primary-foreground/20
                  transition-all duration-300 animate-fade-in shadow-lg"
    >
      <div className="container px-3 py-3 flex items-center justify-between gap-2">
        <Button
          onClick={handleContactLorenzo}
          size="lg"
          variant="secondary"
          className="flex-1 h-14 text-sm font-semibold group shadow-xl touch-target"
        >
          <MessageCircle className="mr-2 w-5 h-5" aria-hidden="true" />
          {t('hero.contactLorenzo')}
        </Button>
        <Button
          onClick={() => setIsDismissed(true)}
          variant="ghost"
          size="icon"
          className="h-14 w-14 flex-shrink-0 text-primary-foreground hover:bg-primary-foreground/10 touch-target"
          aria-label={t('stickyCta.closeLabel')}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};