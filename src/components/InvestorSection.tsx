import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { TrendingUp, PieChart, BarChart3, ArrowRight, MessageCircle, Users, Award, Sparkles } from "lucide-react";
import { InvestorWaitlistDialog } from "@/components/InvestorWaitlistDialog";
import { MESSAGES, openWhatsApp, CONTACTS } from "@/lib/contacts";
import { StyledText } from "@/components/StyledText";
import { Badge } from "@/components/ui/badge";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";
import InvestorInfographic from "@/components/investor/InvestorInfographic";

export const InvestorSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const { count } = useWaitlistCounter();
  const [isVisible, setIsVisible] = useState(false);
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

  const handleLorenzoWhatsApp = () => {
    const language = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
    const message = MESSAGES.investor.whatsapp[language]('Lorenzo');
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  return (
    <section 
      ref={sectionRef}
      id="investor-section" 
      className="pt-24 pb-16 md:py-24 lg:py-32 relative overflow-hidden transition-spacing"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-jungle-section pointer-events-none" />
      
      <div className="container px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 transition-spacing">
        <div className="text-center max-w-2xl mx-auto">
          {/* Start-up Innovativa Badge */}
          <div
            className={`flex justify-center mb-6 transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '0ms' }}
          >
            <Badge 
              variant="outline" 
              className="px-4 py-2 text-xs uppercase tracking-wider border-primary/30 bg-primary/5 text-primary font-semibold"
            >
              <Award className="w-4 h-4 mr-2" />
              {t('investor.startupInnovativaBadge')}
              <Sparkles className="w-3 h-3 ml-2 text-primary/70" />
            </Badge>
          </div>
          
          <p 
            className={`text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '100ms' }}
          >
            {t('investor.sectionLabel')}
          </p>
          <h2 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight text-foreground tracking-tight transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '150ms' }}
          >
            {t('investor.sectionTitle')}
          </h2>
          <p 
            className={`text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-6 transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '300ms' }}
          >
            <StyledText>{t('investor.compactDesc')}</StyledText>
          </p>
          
          <Badge 
            variant="secondary" 
            className={`mb-8 px-4 py-2 text-sm font-medium transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '450ms' }}
          >
            <Users className="w-4 h-4 mr-2" />
            {count}+ {t('investor.activeInvestors')}
          </Badge>

          {/* 2 CTA Semplificati */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '500ms' }}
          >
            <Button 
              onClick={handleLorenzoWhatsApp}
              size="lg"
              className="w-full sm:w-auto text-base group"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              {t('investor.talkToLorenzo')}
            </Button>
            
            <Button 
              onClick={() => navigate('/invest')}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base group"
            >
              {t('investor.cta')}
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        {/* Infografica Interattiva */}
        <div className="mt-16 md:mt-20">
          <InvestorInfographic />
        </div>
      </div>
      
      <InvestorWaitlistDialog 
        open={waitlistOpen} 
        onOpenChange={setWaitlistOpen}
      />
    </section>
  );
};
