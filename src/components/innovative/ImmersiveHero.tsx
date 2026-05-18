import { useState, useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useABTest } from "@/hooks/useABTest";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CONTACTS, MESSAGES, openWhatsApp } from "@/constants/contacts";
import { HeroLogo } from "./HeroLogo";

const HowItWorksDrawer = lazy(() => import("./HowItWorksDrawer").then(m => ({ default: m.HowItWorksDrawer })));
const QuickInvestorLeadDialog = lazy(() => import("@/components/dialogs").then(m => ({ default: m.QuickInvestorLeadDialog })));


export const ImmersiveHero = () => {
  const { t, i18n } = useTranslation();
  const { trackClick } = useAnalytics();
  const { variation: heroVariation, trackImpression: trackHeroImpression, trackClick: trackHeroClick } = useABTest('hero_headline');
  const { variation: ctaVariation, trackImpression: trackCtaImpression, trackClick: trackCtaClick } = useABTest('hero_cta_v2');
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

  useEffect(() => {
    if (ctaVariation) {
      trackCtaImpression();
    }
  }, [ctaVariation, trackCtaImpression]);

  const handleInvestClick = () => {
    trackClick('immersive_hero_invest');
    trackHeroClick();
    trackCtaClick();
    setInvestDialogOpen(true);
  };

  const headline = heroVariation === 'B' ? t('hero.mainHeadlineB') : t('hero.mainHeadline');
  const subheadline = heroVariation === 'B' ? t('hero.mainSubheadlineB') : t('hero.mainSubheadline');
  const ctaLabel = ctaVariation === 'B' ? t('hero.startInvestingB') : t('hero.startInvesting');
  const ctaSocialProof = ctaVariation === 'B' ? t('hero.ctaSocialProofB') : null;

  // Split headline into key word (italic emphasis) + rest
  const headlineWords = headline.split(' ');
  const accentIndex = headlineWords.findIndex((w) =>
    /investi|invest|housing/i.test(w)
  );

  return (
    <section
      className="relative bg-background py-6 md:py-12"
      aria-labelledby="hero-heading"
    >
      <div className="container relative z-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto swiss-frame bg-background">
          {/* Top eyebrow row */}
          <div className="flex items-center justify-between px-5 md:px-8 py-3 border-b border-primary/15">
            <span className="eyebrow-mono text-foreground/70">Real Estate · Torino</span>
            <span className="hidden sm:inline-flex items-center gap-2 eyebrow-mono text-foreground/50">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              Acquisizione attiva
            </span>
          </div>

          {/* Main hero grid */}
          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Left: H1 + subhead */}
            <div className="md:col-span-8 px-5 md:px-12 py-10 md:py-16 md:border-r border-primary/15">
              <HeroLogo />

              <h1
                id="hero-heading"
                className={`font-display font-bold tracking-tighter text-foreground leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6 md:mb-8 ${
                  hasLoaded && !prefersReducedMotion ? 'animate-fade-up' : ''
                }`}
                style={{ opacity: prefersReducedMotion ? 1 : hasLoaded ? undefined : 0 }}
              >
                {headlineWords.map((word, i) => {
                  const isAccent = i === accentIndex;
                  const isPrimary =
                    /^(investimenti|investment|investi|invest)$/i.test(word);
                  return (
                    <span
                      key={i}
                      className={
                        isAccent
                          ? 'italic font-normal text-primary'
                          : isPrimary
                          ? 'text-primary'
                          : ''
                      }
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </h1>

              <p
                className={`text-base md:text-lg text-muted-foreground leading-relaxed max-w-lg ${
                  hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-1' : ''
                }`}
                style={{ opacity: prefersReducedMotion ? 1 : hasLoaded ? undefined : 0 }}
              >
                {t('hero.missionStatement')}
              </p>

              <p
                className={`mt-4 text-sm md:text-base text-muted-foreground/90 leading-relaxed max-w-lg ${
                  hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-2' : ''
                }`}
                style={{ opacity: prefersReducedMotion ? 1 : hasLoaded ? undefined : 0 }}
              >
                {subheadline}
              </p>

              {/* Secondary seller link */}
              <p className="mt-8 text-sm text-muted-foreground">
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

            {/* Right: metrics + CTA */}
            <div className="md:col-span-4 flex flex-col">
              <div className="flex-1 px-5 md:px-8 py-8 md:py-12 flex flex-col justify-end gap-8 border-t md:border-t-0 border-primary/15">
                <div className="space-y-1">
                  <p className="eyebrow-mono text-foreground/50">Ticket minimo</p>
                  <p className="metric-mono text-3xl md:text-4xl text-primary font-medium">
                    €100
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="eyebrow-mono text-foreground/50">Payout</p>
                  <p className="metric-mono text-3xl md:text-4xl text-primary font-medium">
                    /2m
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="eyebrow-mono text-foreground/50">Mercato</p>
                  <p className="metric-mono text-3xl md:text-4xl text-primary font-medium">
                    Torino
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleInvestClick}
                className="block w-full bg-primary text-primary-foreground px-6 py-6 md:py-7 text-center font-bold uppercase tracking-widest text-sm hover:bg-primary/90 transition-colors border-t border-primary/15 group"
              >
                {ctaLabel}
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1">→</span>
              </button>
              {ctaSocialProof && (
                <p className="px-6 py-3 text-xs text-muted-foreground text-center border-t border-primary/15">
                  {ctaSocialProof}
                </p>
              )}
            </div>
          </div>

          {/* Footer metric bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 border-t border-primary/15 bg-primary/[0.03]">
            <div className="p-4 md:p-5 border-r border-primary/15 text-center">
              <span className="block eyebrow-mono text-foreground/50 mb-1.5">Studenti</span>
              <span className="metric-mono text-foreground font-medium">90.000+</span>
            </div>
            <div className="p-4 md:p-5 md:border-r border-primary/15 text-center">
              <span className="block eyebrow-mono text-foreground/50 mb-1.5">Università</span>
              <span className="metric-mono text-foreground font-medium">7</span>
            </div>
            <div className="p-4 md:p-5 border-r border-t md:border-t-0 border-primary/15 text-center">
              <span className="block eyebrow-mono text-foreground/50 mb-1.5">Modello</span>
              <span className="metric-mono text-foreground font-medium">9m + estate</span>
            </div>
            <div className="p-4 md:p-5 border-t md:border-t-0 border-primary/15 text-center">
              <span className="block eyebrow-mono text-foreground/50 mb-1.5">Stato</span>
              <span className="metric-mono text-foreground font-medium">Q3 attivo</span>
            </div>
          </div>
        </div>

        {/* How it works drawer - mobile only */}
        <div className="mt-6">
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
