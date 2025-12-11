import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Users, Award, Calendar, Target, Heart } from "lucide-react";
import { MESSAGES, openWhatsApp, CONTACTS } from "@/lib/contacts";
import { openCalendly } from "@/lib/calendly";
import { StyledText } from "@/components/StyledText";
import { Badge } from "@/components/ui/badge";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";
import InvestorInfographic from "@/components/investor/InvestorInfographic";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";

export const InvestorSection = () => {
  const { t, i18n } = useTranslation();
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const { count } = useWaitlistCounter();
  const prefersReducedMotion = useReducedMotion();

  const handleLorenzoWhatsApp = () => {
    const language = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
    const message = MESSAGES.investor.whatsapp[language]('Lorenzo');
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  return (
    <section 
      id="investor-section" 
      className="pt-24 pb-16 md:py-24 lg:py-32 relative overflow-hidden transition-spacing"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-jungle-section pointer-events-none" />
      
      <div className="container px-3 sm:px-4 md:px-6 lg:px-8 relative z-10 transition-spacing">
        <div className="text-center max-w-2xl mx-auto">
          {/* Dual Mission Badge */}
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-3 px-5 py-3 
                         bg-gradient-to-r from-primary/10 to-accent/10
                         dark:from-primary/20 dark:to-accent/20
                         backdrop-blur-md 
                         border border-primary/20 rounded-2xl
                         shadow-[0_4px_20px_hsla(142,76%,36%,0.1)]"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                  <Heart className="w-4 h-4 text-primary" aria-hidden="true" />
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold text-foreground">
                  {i18n.language.startsWith('it') ? 'Crisi Abitativa' : 'Housing Crisis'}
                </span>
              </div>
              <span className="text-muted-foreground">+</span>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Target className="w-4 h-4 text-accent-foreground" aria-hidden="true" />
                </div>
                <span className="text-xs uppercase tracking-wider font-semibold text-foreground">
                  {i18n.language.startsWith('it') ? 'Accesso Democratico' : 'Democratic Access'}
                </span>
              </div>
            </div>
          </div>

          {/* Start-up Innovativa Badge - Static */}
          <div className="flex justify-center mb-4">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 
                         bg-white/80 dark:bg-card/80 backdrop-blur-sm 
                         border border-primary/10 rounded-full"
            >
              <Award className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span className="text-xs uppercase tracking-wider font-medium text-muted-foreground">
                {t('investor.startupInnovativaBadge')}
              </span>
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium">
            {t('investor.sectionLabel')}
          </p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 leading-tight text-foreground tracking-tight">
            {t('investor.sectionTitle')}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-6">
            <StyledText>{t('investor.compactDesc')}</StyledText>
          </p>
          
          <Badge 
            variant="secondary" 
            className="mb-8 px-4 py-2 text-sm font-medium"
          >
            <Users className="w-4 h-4 mr-2" />
            {count}+ {t('investor.activeInvestors')}
          </Badge>

          {/* 3 CTA: WhatsApp, Calendly, Quick Lead */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center flex-wrap">
            <Button 
              onClick={handleLorenzoWhatsApp}
              size="lg"
              className="w-full sm:w-auto text-base group"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              {t('investor.talkToLorenzo')}
            </Button>
            
            <Button 
              onClick={() => openCalendly()}
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto text-base group"
            >
              <Calendar className="mr-2 w-5 h-5" />
              {t('investor.scheduleCall')}
            </Button>
            
            <Button 
              onClick={() => setInvestDialogOpen(true)}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-base group"
            >
              {t('investor.cta')}
              <ArrowRight className={`ml-2 w-4 h-4 ${prefersReducedMotion ? '' : 'group-hover:translate-x-1 transition-transform'}`} />
            </Button>
          </div>
        </div>

        {/* Infografica Interattiva */}
        <div className="mt-16 md:mt-20">
          <InvestorInfographic />
        </div>
      </div>
      
      <QuickInvestorLeadDialog 
        open={investDialogOpen} 
        onOpenChange={setInvestDialogOpen}
        source="investor_section"
      />
    </section>
  );
};
