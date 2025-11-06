import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { TrendingUp, PieChart, BarChart3, ArrowRight, MessageCircle, Users } from "lucide-react";
import { InvestorWaitlistDialog } from "@/components/InvestorWaitlistDialog";
import { openEmail, MESSAGES, openWhatsApp, CONTACTS } from "@/lib/contacts";
import { InvestorMetricCard } from "@/components/investor/InvestorMetricCard";
import { PartnerLogos } from "@/components/investor/PartnerLogos";
import { Skeleton } from "@/components/ui/skeleton";
import { StyledText } from "@/components/StyledText";
import { Badge } from "@/components/ui/badge";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";

export const InvestorSection = () => {
  const { t, i18n } = useTranslation();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
  const { count } = useWaitlistCounter();

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

  const handleAndreaWhatsApp = () => {
    const language = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
    const message = MESSAGES.investor.whatsapp[language]('Andrea');
    openWhatsApp(CONTACTS.andrea.phone, message);
  };

  const handleCallLorenzo = () => {
    window.location.href = `tel:${CONTACTS.lorenzo.phone}`;
  };

  return (
    <section id="investor-section" className="py-12 md:py-16 bg-background relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
    
      <div className="container px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium">
            {t('investor.sectionLabel')}
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 leading-tight text-foreground tracking-tight">
            {t('investor.sectionTitle')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-6">
            <StyledText>{t('investor.compactDesc')}</StyledText>
          </p>
          
          <Badge variant="secondary" className="mb-8 px-4 py-2 text-sm font-medium">
            <Users className="w-4 h-4 mr-2" />
            {count}+ {t('investor.activeInvestors')}
          </Badge>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Button 
              onClick={handleLorenzoWhatsApp}
              size="lg"
              variant="premium"
              className="w-full sm:w-auto px-8 py-6 text-base group shadow-xl"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              {t('investor.talkToLorenzo')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={handleAndreaWhatsApp}
              size="lg"
              variant="premium"
              className="w-full sm:w-auto px-8 py-6 text-base group shadow-xl"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              {t('investor.talkToAndrea')}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button 
              onClick={handleCallLorenzo}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8 py-6 text-base"
            >
              {t('investor.bookCall')}
            </Button>
          </div>
        </div>
        
        <InvestorWaitlistDialog open={waitlistOpen} onOpenChange={setWaitlistOpen} />
      </div>
    
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};
