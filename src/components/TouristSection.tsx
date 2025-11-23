import { useTranslation } from "react-i18next";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Coffee, Compass, ArrowRight } from "lucide-react";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { StyledText } from "@/components/StyledText";
import { WaitlistDialog } from "@/components/WaitlistDialog";
import { Link } from "react-router-dom";

export const TouristSection = () => {
  const { t, i18n } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);
  const [waitlistOpen, setWaitlistOpen] = useState(false);
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

  const touristBenefits = [
    {
      icon: MapPin,
      title: t('tourist.benefit1Title'),
      description: t('tourist.benefit1Desc'),
      tooltip: t('tourist.benefit1Tooltip')
    },
    {
      icon: Coffee,
      title: t('tourist.benefit2Title'),
      description: t('tourist.benefit2Desc'),
      tooltip: t('tourist.benefit2Tooltip')
    },
    {
      icon: Compass,
      title: t('tourist.benefit3Title'),
      description: t('tourist.benefit3Desc'),
      tooltip: t('tourist.benefit3Tooltip')
    }
  ];

  const currentLang = (i18n.language === 'en' ? 'en' : 'it') as 'it' | 'en';

  const handleWhatsAppLorenzo = () => {
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.tourist?.whatsapp?.[currentLang]?.(CONTACTS.lorenzo.name) || "Ciao, sono interessato agli alloggi per turisti a Torino");
  };

  return (
    <section id="tourist-section" className="py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden transition-spacing">
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-jungle-section pointer-events-none" />
      
      <div ref={sectionRef} className="container px-3 sm:px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <p 
            className={`text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '0ms' }}
          >
            {t('tourist.sectionLabel')}
          </p>
          <h2 
            className={`text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 leading-tight text-foreground tracking-tight transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '150ms' }}
          >
            {t('tourist.sectionTitle')}
          </h2>
          <p 
            className={`text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-8 transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <StyledText>{t('tourist.sectionDesc')}</StyledText>
          </p>
          
          {/* Tourist Guide CTA */}
          <div 
            className={`mb-6 relative transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '450ms' }}
          >
            <div className="p-6 bg-primary/5 rounded-xl border border-primary/30 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Compass className="w-7 h-7 text-primary" />
                </div>
                <div className="flex-1 text-center sm:text-left">
                  <h3 className="font-bold text-base sm:text-lg mb-1 text-foreground">
                    {t('tourist.ctaTitle')}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {t('tourist.ctaDesc')}
                  </p>
                </div>
                <Link to="/blog?category=turisti">
                  <Button size="lg" className="w-full sm:w-auto group">
                    {t('tourist.ctaButton')}
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 md:gap-6 mt-8 sm:mt-10 md:mt-12 max-w-5xl mx-auto">
          {touristBenefits.map((benefit, index) => (
            <TooltipProvider key={index}>
              <Tooltip delayDuration={200}>
                <TooltipTrigger asChild>
                  <Card 
                    className={`p-4 sm:p-5 md:p-6 bg-card/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300 cursor-help group border border-border/50 hover:border-primary/30 ${
                      isVisible ? "animate-fade-in opacity-100" : "opacity-0"
                    }`}
                    style={{ animationDelay: `${600 + index * 150}ms` }}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                        <benefit.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-sm sm:text-base mb-1.5 sm:mb-2 text-foreground leading-snug">
                          {benefit.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                </TooltipTrigger>
                <TooltipContent 
                  side="top" 
                  className="max-w-[280px] sm:max-w-xs text-xs sm:text-sm bg-popover text-popover-foreground border-border"
                >
                  <p>{benefit.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        {/* Contact CTA */}
        <div 
          className={`mt-8 sm:mt-10 md:mt-12 text-center transition-all duration-700 ${
            isVisible ? "animate-fade-in opacity-100" : "opacity-0"
          }`}
          style={{ animationDelay: '1050ms' }}
        >
          <p className="text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4 font-light">
            {t('tourist.contactPrompt')}
          </p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center items-center">
            <Button 
              size="lg" 
              onClick={handleWhatsAppLorenzo}
              className="w-full sm:w-auto group"
            >
              {t('tourist.contactButton')}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>

      <WaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
    </section>
  );
};