import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { QuickInvestorLeadDialog } from "@/components/dialogs";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HeroLogo } from "./HeroLogo";
import { HowItWorksDrawer } from "./HowItWorksDrawer";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";

export const ImmersiveHero = () => {
  const { t, i18n } = useTranslation();
  const { trackClick } = useAnalytics();
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { count: waitlistCount } = useWaitlistCounter();

  // Trigger entrance animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleInvestClick = () => {
    trackClick('immersive_hero_invest');
    setInvestDialogOpen(true);
  };

  const headline = t('hero.mainHeadline');

  return (
    <section 
      className="relative min-h-[85vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Solid background */}
      <div className="absolute inset-0 bg-background" />

      {/* Main content */}
      <div className="container relative z-10 px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Logo - visible on mobile, fades with scroll */}
          <HeroLogo />

          {/* Headline - fade up on load */}
          <h1 
            id="hero-heading"
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold mb-4 md:mb-6 leading-tight text-foreground tracking-tight ${
              hasLoaded && !prefersReducedMotion ? 'animate-fade-up' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasLoaded ? undefined : 0 }}
          >
            {headline.split(' ').map((word, i) => (
              <span
                key={i}
                className={
                  word.toLowerCase().includes('investimenti') || 
                  word.toLowerCase().includes('investment') || 
                  word.toLowerCase().includes('investi') || 
                  word.toLowerCase().includes('invest')
                    ? 'text-primary' 
                    : ''
                }
              >
                {word}{' '}
              </span>
            ))}
          </h1>

          {/* Subheadline */}
          <p 
            className={`text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 font-light leading-relaxed max-w-2xl mx-auto ${
              hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-1' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasLoaded ? undefined : 0 }}
          >
            {t('hero.mainSubheadline')}
          </p>

          {/* Single CTA */}
          <div 
            className={`mb-8 md:mb-10 ${
              hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-2' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasLoaded ? undefined : 0 }}
          >
            <Button
              size="lg"
              variant="premium"
              onClick={handleInvestClick}
              className="text-base md:text-lg px-8 py-6 md:px-10 md:py-7"
            >
              {t('hero.startInvesting')} →
            </Button>
            
            {/* Secondary seller link */}
            <p className="mt-4 text-sm text-muted-foreground">
              {t('hero.sellerLink.prefix')}{' '}
              <Link 
                to={i18n.language === 'it' ? '/vendi' : '/sellers'}
                onClick={() => trackClick('hero_seller_link')}
                className="text-primary hover:underline font-medium"
              >
                {t('hero.sellerLink.cta')} →
              </Link>
            </p>
          </div>

          {/* 2i3T Badge - below CTA */}
          <a 
            href="https://2i3t.it" 
            target="_blank" 
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 px-5 py-3 bg-background/60 backdrop-blur-sm border border-border/30 rounded-full hover:bg-background/80 transition-colors duration-[var(--duration-fast)] ${
              hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-3' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasLoaded ? undefined : 0 }}
            onClick={() => trackClick('hero_2i3t_badge')}
          >
            <img 
              src={logo2i3t} 
              alt="2i3T" 
              className="h-7 w-auto" 
              width={70} 
              height={28}
              loading="lazy"
              decoding="async"
            />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Incubatore Imprese UniTO</p>
              <p className="text-xs text-primary font-medium">Startup Innovativa</p>
            </div>
          </a>

          {/* How it works drawer - mobile only */}
          <HowItWorksDrawer />
        </div>
      </div>

      <QuickInvestorLeadDialog open={investDialogOpen} onOpenChange={setInvestDialogOpen} source="hero" />
    </section>
  );
};
