import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Calendar, ArrowRight, Search } from "lucide-react";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StyledText } from "@/components/StyledText";
import { StudentSearchDialog } from "@/components/StudentSearchDialog";

export const StudentSection = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [searchDialogOpen, setSearchDialogOpen] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const studentBenefits = [
    {
      icon: Wallet,
      title: t('student.benefit1Title'),
      description: t('student.benefit1Desc'),
      tooltip: t('student.benefit1Tooltip')
    },
    {
      icon: Calendar,
      title: t('student.benefit2Title'),
      description: t('student.benefit2Desc'),
      tooltip: t('student.benefit2Tooltip')
    }
  ];

  const currentLang = (i18n.language === 'en' ? 'en' : 'it') as 'it' | 'en';

  const handleWhatsAppLorenzo = () => {
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.lorenzo.name));
  };

  const handleWhatsAppAndrea = () => {
    openWhatsApp(CONTACTS.andrea.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.andrea.name));
  };

  const handleQuizClick = () => {
    window.open('https://it.surveymonkey.com/r/Q27QDBG', '_blank');
  };

  return (
    <section id="student-section" className="py-8 sm:py-10 md:py-12 lg:py-16 bg-accent/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
      
      <div ref={sectionRef} className="container px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <p 
            className={`text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '0ms' }}
          >
            {t('student.sectionLabel')}
          </p>
          <h2 
            className={`text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 leading-tight text-foreground tracking-tight transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '150ms' }}
          >
            {t('student.sectionTitle')}
          </h2>
          <p 
            className={`text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-8 transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <StyledText>{t('student.compactDesc')}</StyledText>
          </p>
          
          {/* Room Search CTA - Premium Design */}
          <div 
            className={`mb-6 relative transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '450ms' }}
          >
            <div className="p-6 bg-background rounded-xl border border-primary/30 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Search className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-bold text-foreground">
                    {t('studentSearch.cardTitle')}
                  </p>
                  <p className="text-sm text-muted-foreground max-w-sm">
                    {t('studentSearch.cardDescription')}
                  </p>
                </div>
                <Button 
                  size="lg" 
                  variant="default"
                  onClick={() => setSearchDialogOpen(true)}
                  className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base bg-primary hover:bg-primary/90 transition-all duration-300 group h-11 sm:h-12"
                >
                  {t('studentSearch.cardCta')}
                  <ArrowRight className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </div>
            </div>
          </div>
          
          <div 
            className={`relative transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '600ms' }}
          >
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-accent/20 px-3 text-muted-foreground">{t('student.separator')}</span>
            </div>
          </div>
          
          <div 
            className={`mt-6 transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '750ms' }}
          >
            <Button 
              size="lg" 
              variant="premium"
              onClick={handleWhatsAppLorenzo}
              className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base h-11 sm:h-12"
            >
              {t('student.contactCta')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <StudentSearchDialog 
        open={searchDialogOpen} 
        onOpenChange={setSearchDialogOpen} 
      />
      
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};