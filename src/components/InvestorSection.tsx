import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, PieChart, BarChart3, ArrowRight, MessageCircle, Users, FileText } from "lucide-react";
import { InvestorWaitlistDialog } from "@/components/InvestorWaitlistDialog";
import { openEmail, MESSAGES, openWhatsApp, CONTACTS } from "@/lib/contacts";
import { InvestorMetricCard } from "@/components/investor/InvestorMetricCard";
import { Skeleton } from "@/components/ui/skeleton";
import { StyledText } from "@/components/StyledText";
import { Badge } from "@/components/ui/badge";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";

export const InvestorSection = () => {
  const { t, i18n } = useTranslation();
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

  const investorBenefits = [
    {
      icon: TrendingUp,
      title: t('investor.benefit1Title'),
      description: t('investor.benefit1Desc')
    },
    {
      icon: BarChart3,
      title: t('investor.benefit2Title'),
      description: t('investor.benefit2Desc')
    },
    {
      icon: PieChart,
      title: t('investor.benefit3Title'),
      description: t('investor.benefit3Desc')
    }
  ];

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
          <p 
            className={`text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '0ms' }}
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

          <Card 
            className={`mb-8 p-8 bg-primary/5 border-primary/30 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '500ms' }}
          >
            <div className="flex items-start gap-4">
              <FileText className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold mb-2">
                  {i18n.language.startsWith('en') 
                    ? "Why This is the Perfect Time to Invest in Turin" 
                    : "Perché Questo è il Momento Perfetto per Investire a Torino"}
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {i18n.language.startsWith('en')
                    ? "Complete market analysis: stock volatility, Italian real estate recovery, and Turin's exceptional 8.34% rental yields."
                    : "Analisi di mercato completa: volatilità borsistica, ripresa immobiliare italiana e gli eccezionali rendimenti dell'8,34% di Torino."}
                </p>
                <Button asChild variant="outline" size="sm" className="group">
                  <Link to="/blog/investire-real-assets-torino-2025">
                    {i18n.language.startsWith('en') ? "Read Full Analysis" : "Leggi l'Analisi Completa"}
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
              </div>
            </div>
          </Card>
          
          <div
            className={`flex flex-col sm:flex-row gap-3 justify-center items-center transition-all duration-700 ${
              isVisible ? "animate-fade-in opacity-100" : "opacity-0"
            }`}
            style={{ animationDelay: '600ms' }}
          >
            <Button 
              onClick={handleLorenzoWhatsApp}
              size="lg"
              variant="premium"
              className="w-full sm:w-auto text-base sm:text-lg group"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              {t('investor.talkToLorenzo')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={() => setWaitlistOpen(true)}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base h-11 sm:h-12"
            >
              {t('investor.bookCall')}
            </Button>
          </div>
        </div>
      </div>
      
      <InvestorWaitlistDialog 
        open={waitlistOpen} 
        onOpenChange={setWaitlistOpen}
      />
    </section>
  );
};
