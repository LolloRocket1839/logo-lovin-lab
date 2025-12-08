import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Users, Award } from "lucide-react";
import { InvestorWaitlistDialog } from "@/components/InvestorWaitlistDialog";
import { MESSAGES, openWhatsApp, CONTACTS } from "@/lib/contacts";
import { StyledText } from "@/components/StyledText";
import { Badge } from "@/components/ui/badge";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";
import InvestorInfographic from "@/components/investor/InvestorInfographic";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import logo2i3t from "@/assets/2i3t-logo-green.png";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const InvestorSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [waitlistOpen, setWaitlistOpen] = useState(false);
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
          {/* Start-up Innovativa Badge - Static */}
          <div className="flex justify-center mb-6">
            <div
              className="inline-flex items-center gap-2 px-5 py-2.5 
                         bg-white/90 dark:bg-card/90 backdrop-blur-md 
                         border border-primary/20 rounded-full
                         shadow-[0_4px_20px_hsla(142,76%,36%,0.15)]"
            >
              <Award className="w-4 h-4 text-primary" aria-hidden="true" />
              <span className="text-xs uppercase tracking-wider font-semibold text-foreground">
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

          {/* 2 CTA Semplificati */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
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
              <ArrowRight className={`ml-2 w-4 h-4 ${prefersReducedMotion ? '' : 'group-hover:translate-x-1 transition-transform'}`} />
            </Button>
          </div>

          {/* 2i3T Trust Signal */}
          <div className="mt-8">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <a 
                    href="https://2i3t.it" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label={t('investor.incubatorTooltip')}
                    className="inline-flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity
                               focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-lg"
                  >
                    <img 
                      src={logo2i3t} 
                      alt="" 
                      className="w-12 md:w-16 h-auto"
                    />
                    <span className="sr-only">{t('accessibility.opensNewWindow')}</span>
                  </a>
                </TooltipTrigger>
                <TooltipContent>
                  <p className="text-sm">{t('investor.incubatorTooltip')}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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
