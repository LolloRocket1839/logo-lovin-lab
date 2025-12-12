import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Users, Award, Calendar, Target, Heart, Euro, TrendingUp, Building2, GraduationCap } from "lucide-react";
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
      className="pt-16 pb-12 md:py-20 lg:py-28 relative overflow-hidden transition-spacing"
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-jungle-section pointer-events-none" />
      
      <div className="container px-4 sm:px-6 md:px-8 relative z-10 transition-spacing">
        <div className="text-center max-w-2xl mx-auto">
          {/* Dual Mission Badge - Hidden on mobile */}
          <div className="hidden md:flex justify-center mb-6">
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

          {/* Start-up Innovativa Badge - Hidden on mobile */}
          <div className="hidden md:flex justify-center mb-4">
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

          <p className="hidden md:block text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium">
            {t('investor.sectionLabel')}
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-4 md:mb-6 leading-tight text-foreground tracking-tight">
            {t('investor.sectionTitle')}
          </h2>
          <p className="hidden sm:block text-sm sm:text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-4 md:mb-6">
            <StyledText>{t('investor.compactDesc')}</StyledText>
          </p>
          
          {/* Badge "Da €100" prominente */}
          <div className="flex flex-wrap justify-center gap-2 md:gap-3 mb-6 md:mb-8">
            <Badge 
              className="px-4 py-2 md:px-5 md:py-2.5 text-sm md:text-base font-bold bg-primary text-primary-foreground shadow-lg"
            >
              <Euro className="w-4 h-4 md:w-5 md:h-5 mr-1.5" />
              {t('investor.minInvestmentBadge')}
            </Badge>
            <Badge 
              variant="secondary" 
              className="px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-medium"
            >
              <Users className="w-3 h-3 md:w-4 md:h-4 mr-1.5 md:mr-2" />
              {count}+ {t('investor.activeInvestors')}
            </Badge>
          </div>

          {/* Market Numbers - Key Stats */}
          <div className="grid grid-cols-3 gap-3 md:gap-6 mb-6 md:mb-8 max-w-xl mx-auto">
            <div className="text-center p-3 md:p-4 rounded-2xl bg-card/50 border border-border/50">
              <div className="flex items-center justify-center mb-1">
                <GraduationCap className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-foreground">~589K</p>
              <p className="text-[10px] md:text-xs text-muted-foreground font-light">
                {t('investor.marketStats.studentsOffsite')}
              </p>
            </div>
            <div className="text-center p-3 md:p-4 rounded-2xl bg-card/50 border border-border/50">
              <div className="flex items-center justify-center mb-1">
                <Building2 className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-foreground">~87%</p>
              <p className="text-[10px] md:text-xs text-muted-foreground font-light">
                {t('investor.marketStats.demandCovered')}
              </p>
            </div>
            <div className="text-center p-3 md:p-4 rounded-2xl bg-card/50 border border-border/50">
              <div className="flex items-center justify-center mb-1">
                <TrendingUp className="w-4 h-4 md:w-5 md:h-5 text-primary" />
              </div>
              <p className="text-lg md:text-2xl font-bold text-foreground">~€4B</p>
              <p className="text-[10px] md:text-xs text-muted-foreground font-light">
                {t('investor.marketStats.marketPotential')}
              </p>
            </div>
          </div>
          <Link 
            to="/blog/student-housing-italia-savills-2025" 
            className="block text-[9px] md:text-[10px] text-muted-foreground/60 font-light mt-2 hover:text-primary transition-colors underline-offset-2 hover:underline"
          >
            *{t('investor.marketStats.disclaimer')} →
          </Link>

          {/* 2 CTA on mobile, 3 on desktop */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center flex-wrap">
            <Button 
              onClick={handleLorenzoWhatsApp}
              size="lg"
              className="w-full sm:w-auto text-sm md:text-base group"
            >
              <MessageCircle className="mr-2 w-4 h-4 md:w-5 md:h-5" />
              {t('investor.talkToLorenzo')}
            </Button>
            
            <Button 
              onClick={() => setInvestDialogOpen(true)}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-sm md:text-base group"
            >
              {t('investor.cta')}
              <ArrowRight className={`ml-2 w-4 h-4 ${prefersReducedMotion ? '' : 'group-hover:translate-x-1 transition-transform'}`} />
            </Button>
            
            {/* Calendly only on desktop */}
            <Button 
              onClick={() => openCalendly()}
              size="lg"
              variant="secondary"
              className="hidden md:inline-flex w-auto text-base group"
            >
              <Calendar className="mr-2 w-5 h-5" />
              {t('investor.scheduleCall')}
            </Button>
          </div>
        </div>

        {/* Infografica Interattiva */}
        <div className="mt-10 md:mt-16">
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
