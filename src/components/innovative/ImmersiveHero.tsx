import { useState, useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useABTest } from "@/hooks/useABTest";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HeroLogo } from "./HeroLogo";

const HowItWorksDrawer = lazy(() => import("./HowItWorksDrawer").then(m => ({ default: m.HowItWorksDrawer })));
const QuickInvestorLeadDialog = lazy(() => import("@/components/dialogs").then(m => ({ default: m.QuickInvestorLeadDialog })));


export const ImmersiveHero = () => {
  const { t, i18n } = useTranslation();
  const { trackClick } = useAnalytics();
  const { variation: heroVariation, trackImpression: trackHeroImpression, trackClick: trackHeroClick } = useABTest('hero_headline');
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  

  // Trigger entrance animations after mount
  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Track A/B impression ONLY after variation is loaded from localStorage
  // (avoids race where impression fires with default 'A' before re-render)
  useEffect(() => {
    if (heroVariation) {
      trackHeroImpression();
    }
  }, [heroVariation, trackHeroImpression]);

  const handleInvestClick = () => {
    trackClick('immersive_hero_invest');
    trackHeroClick();
    setInvestDialogOpen(true);
  };

  const headline = heroVariation === 'B' ? t('hero.mainHeadlineB') : t('hero.mainHeadline');
  const subheadline = heroVariation === 'B' ? t('hero.mainSubheadlineB') : t('hero.mainSubheadline');

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

          {/* Mission statement */}
          <p 
            className={`text-sm sm:text-base text-muted-foreground/80 mb-4 md:mb-5 font-normal leading-relaxed max-w-xl mx-auto ${
              hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-1' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasLoaded ? undefined : 0 }}
          >
            {t('hero.missionStatement')}
          </p>

          {/* Subheadline */}
          <p 
            className={`text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 font-light leading-relaxed max-w-2xl mx-auto ${
              hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-2' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasLoaded ? undefined : 0 }}
          >
            {subheadline}
          </p>

          {/* Single CTA */}
          <div 
            className={`mb-8 md:mb-10 ${
              hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-3' : ''
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

          {/* Social proof micro-strip */}
          <div 
            className={`mb-6 ${
              hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-4' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasLoaded ? undefined : 0 }}
          >
            <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-primary animate-pulse" />
              {t('hero.socialProof')}
            </p>
          </div>

          {/* How it works drawer - mobile only */}
          <Suspense fallback={null}>
            <HowItWorksDrawer />
          </Suspense>
        </div>
      </div>

      <Suspense fallback={null}>
        <QuickInvestorLeadDialog open={investDialogOpen} onOpenChange={setInvestDialogOpen} source="hero" />
      </Suspense>
    </section>
  );
};
