import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { ArrowRight, Euro, Building2, TrendingUp } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

import { LogoModal } from "@/components/LogoModal";
import { LaunchCountdown } from "@/components/LaunchCountdown";
import { WaitlistBadge } from "@/components/WaitlistBadge";
import { StyledText } from "@/components/StyledText";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Hero = () => {
  const { t } = useTranslation();
  const { trackClick } = useAnalytics();
  const [scrollProgress, setScrollProgress] = useState(0);
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const windowHeight = window.innerHeight;
          const progress = Math.min(Math.max(scrollPosition / windowHeight, 0), 1);
          setScrollProgress(progress);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true
    });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleInvestClick = () => {
    trackClick('hero_invest_button');
    setInvestDialogOpen(true);
  };

  return <header role="banner" className="relative min-h-[50vh] sm:min-h-[60vh] md:min-h-[70vh] flex items-center justify-center overflow-hidden gradient-jungle-hero">
      <h1 className="sr-only">
        {t('hero.seoH1')}
      </h1>

      <div className="container relative z-10 px-4 sm:px-6 md:px-8 py-12 sm:py-16 md:py-20 lg:py-28">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo statico */}
          <div className="mb-8 md:mb-16">
            <img 
              src={jungleRentLogo} 
              alt={t('hero.logoAlt')} 
              width="128" 
              height="128" 
              className={`w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 mx-auto opacity-90 rounded-full cursor-pointer focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 ${
                prefersReducedMotion 
                  ? "hover:opacity-100" 
                  : "hover:opacity-100 hover:scale-105 transition-all duration-300"
              }`}
              loading="eager" 
              onClick={() => {
                trackClick('hero_logo');
                setLogoModalOpen(true);
              }} 
              role="button" 
              tabIndex={0}
              aria-label={t('accessibility.openLogoModal')}
              onKeyDown={e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  trackClick('hero_logo');
                  setLogoModalOpen(true);
                }
              }} 
            />
          </div>

          {/* Headline principale */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-display font-extrabold mb-4 md:mb-6 leading-tight text-foreground tracking-tight">
            <StyledText>{t('hero.mainHeadline')}</StyledText>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-6 md:mb-10 font-light leading-relaxed">
            <StyledText>{t('hero.mainSubheadline')}</StyledText>
          </p>

          {/* Mini How It Works - 3 steps */}
          <div className="flex flex-wrap justify-center items-center gap-2 md:gap-4 mb-6 md:mb-8 text-xs md:text-sm">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/60 border border-border/50">
              <Euro className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-foreground font-medium">{t('hero.miniSteps.step1')}</span>
            </div>
            <span className="text-muted-foreground hidden sm:inline">→</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-card/60 border border-border/50">
              <Building2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-foreground font-medium">{t('hero.miniSteps.step2')}</span>
            </div>
            <span className="text-muted-foreground hidden sm:inline">→</span>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30">
              <TrendingUp className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
              <span className="text-primary font-semibold">{t('hero.miniSteps.step3')}</span>
            </div>
          </div>

          {/* Urgency Elements - Hidden countdown on mobile */}
          <div className="flex flex-col items-center gap-4 md:gap-6 mb-6 md:mb-10">
            <div className="hidden sm:block">
              <LaunchCountdown />
            </div>
            <WaitlistBadge />
          </div>

          {/* CTA primaria investitori */}
          <div className="flex justify-center mb-8">
            <Button 
              size="lg" 
              variant="premium" 
              onClick={handleInvestClick} 
              className="text-base sm:text-lg group"
            >
              {t('hero.invest')}
              <ArrowRight className={`ml-2 w-5 h-5 ${prefersReducedMotion ? '' : 'transition-transform duration-300 group-hover:translate-x-1'}`} aria-hidden="true" />
            </Button>
          </div>
        </div>
      </div>
      
      <LogoModal open={logoModalOpen} onOpenChange={setLogoModalOpen} />
      <QuickInvestorLeadDialog open={investDialogOpen} onOpenChange={setInvestDialogOpen} />
    </header>;
};
