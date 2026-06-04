import { useState, useEffect, lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
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

  useEffect(() => {
    const timer = setTimeout(() => setHasLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (heroVariation) trackHeroImpression();
  }, [heroVariation, trackHeroImpression]);

  useEffect(() => {
    if (ctaVariation) trackCtaImpression();
  }, [ctaVariation, trackCtaImpression]);

  const handleInvestClick = () => {
    trackClick('immersive_hero_invest');
    trackHeroClick();
    trackCtaClick();
    setInvestDialogOpen(true);
  };

  const handleTalkToLorenzo = () => {
    trackClick('immersive_hero_whatsapp');
    trackHeroClick();
    trackCtaClick();
    const lang = i18n.language.startsWith('en') ? 'en' : 'it';
    const message = MESSAGES.investor.whatsapp[lang](CONTACTS.lorenzo.name);
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  const headline = heroVariation === 'B' ? t('hero.mainHeadlineB') : t('hero.mainHeadline');
  const subheadline = heroVariation === 'B' ? t('hero.mainSubheadlineB') : t('hero.mainSubheadline');
  const ctaSocialProof = ctaVariation === 'B' ? t('hero.ctaSocialProofB') : null;

  // Italic accent on a key word (passivo / passive / smart) without changing copy
  const headlineWords = headline.split(' ');
  const accentIndex = headlineWords.findIndex((w) =>
    /passiv|smart|investi|invest|housing|reddito/i.test(w)
  );

  const revealClass = hasLoaded && !prefersReducedMotion ? 'animate-fade-up' : '';
  const revealStyle = { opacity: prefersReducedMotion ? 1 : hasLoaded ? undefined : 0 };

  return (
    <section
      className="relative bg-background pt-6 pb-16 md:pt-10 md:pb-24"
      aria-labelledby="hero-heading"
    >
      <div className="container relative z-10 px-4 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow row */}
          <div
            className={`flex items-center justify-between mb-10 md:mb-16 ${revealClass}`}
            style={revealStyle}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-primary/[0.04] eyebrow-mono text-foreground/70">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              Acquisizione attiva — Torino
            </span>
            <span className="hidden sm:flex items-center gap-3 eyebrow-mono text-foreground/45">
              <span className="metric-mono text-foreground/80">01</span>
              <span className="h-px w-12 bg-primary/25" aria-hidden="true" />
              <span>/ 05</span>
            </span>
          </div>

          {/* Hero grid: narrative left, sticky depth panel right */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 items-start">
            {/* Left: narrative */}
            <div className="md:col-span-7 lg:col-span-7">
              <div className={revealClass} style={revealStyle}>
                <HeroLogo />
              </div>

              <h1
                id="hero-heading"
                className={`mt-8 font-display font-bold tracking-tighter text-foreground leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl ${
                  hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-1' : ''
                }`}
                style={revealStyle}
              >
                {headlineWords.map((word, i) => (
                  <span
                    key={i}
                    className={
                      i === accentIndex
                        ? 'italic font-normal text-primary'
                        : ''
                    }
                  >
                    {word}{' '}
                  </span>
                ))}
              </h1>

              <div
                className={`mt-8 max-w-lg space-y-5 ${
                  hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-2' : ''
                }`}
                style={revealStyle}
              >
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  {t('hero.missionStatement')}
                </p>
                <p className="text-sm md:text-base text-muted-foreground/90 leading-relaxed">
                  {subheadline}
                </p>
              </div>

              {/* CTAs */}
              <div
                className={`mt-10 flex flex-wrap items-center gap-4 ${
                  hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-3' : ''
                }`}
                style={revealStyle}
              >
                <button
                  type="button"
                  onClick={handleTalkToLorenzo}
                  className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-7 py-4 font-semibold text-base hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t('cta.talkToLorenzo')}
                  <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
                </button>
                <button
                  type="button"
                  onClick={handleInvestClick}
                  className="inline-flex items-center px-6 py-4 font-medium text-sm text-foreground border-b border-primary/30 hover:border-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                >
                  {t('cta.requestInfo')}
                </button>
              </div>

              {ctaSocialProof && (
                <p
                  className={`mt-5 text-xs text-muted-foreground ${
                    hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-4' : ''
                  }`}
                  style={revealStyle}
                >
                  {ctaSocialProof}
                </p>
              )}

              {/* Seller link */}
              <p
                className={`mt-10 text-sm text-muted-foreground ${
                  hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-4' : ''
                }`}
                style={revealStyle}
              >
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

            {/* Right: sticky depth panel with offset shadow plane */}
            <div className="md:col-span-5 lg:col-span-5">
              <div className="md:sticky md:top-24">
                <div
                  className={`relative ${
                    hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-2' : ''
                  }`}
                  style={revealStyle}
                >
                  {/* Offset plane behind */}
                  <div
                    aria-hidden="true"
                    className="absolute -bottom-5 -left-5 w-full h-full border border-primary/15 bg-background/40"
                  />

                  {/* Main dark forest card */}
                  <div className="relative bg-primary text-primary-foreground p-8 md:p-10 shadow-2xl overflow-hidden">
                    {/* soft accent glow */}
                    <div
                      aria-hidden="true"
                      className="absolute top-0 right-0 w-40 h-40 -mr-20 -mt-20 rounded-full bg-primary-foreground/5 blur-3xl"
                    />

                    <div className="relative space-y-10">
                      <div className="border-b border-primary-foreground/15 pb-6">
                        <p className="eyebrow-mono text-primary-foreground/60 mb-2">
                          Ticket minimo
                        </p>
                        <p className="metric-mono text-5xl md:text-6xl text-primary-foreground font-light">
                          €100
                        </p>
                      </div>
                      <div className="border-b border-primary-foreground/15 pb-6">
                        <p className="eyebrow-mono text-primary-foreground/60 mb-2">
                          Payout
                        </p>
                        <p className="metric-mono text-5xl md:text-6xl text-primary-foreground font-light">
                          /2m
                        </p>
                      </div>
                      <div>
                        <p className="eyebrow-mono text-primary-foreground/60 mb-2">
                          Mercato
                        </p>
                        <p className="metric-mono text-5xl md:text-6xl text-primary-foreground font-light">
                          Torino
                        </p>
                      </div>
                    </div>

                    <div className="relative mt-10 pt-6 border-t border-primary-foreground/15 flex items-center justify-between">
                      <span className="eyebrow-mono text-primary-foreground/55">
                        Posti limitati
                      </span>
                      <span className="h-px w-10 bg-primary-foreground/25" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                {/* Bottom metric strip — restraint, no yield % */}
                <div className="hidden md:grid mt-10 grid-cols-2 swiss-divide-x">
                  <div className="px-4">
                    <p className="eyebrow-mono text-muted-foreground mb-1.5">Studenti</p>
                    <p className="metric-mono text-foreground font-medium">90.000+</p>
                  </div>
                  <div className="px-4">
                    <p className="eyebrow-mono text-muted-foreground mb-1.5">Università</p>
                    <p className="metric-mono text-foreground font-medium">7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sideways narrative indicator */}
          <div
            className={`mt-20 md:mt-28 flex items-center gap-6 text-foreground/45 ${
              hasLoaded && !prefersReducedMotion ? 'animate-fade-up stagger-5' : ''
            }`}
            style={revealStyle}
          >
            <span className="eyebrow-mono">Scorri per esplorare</span>
            <span className="h-px flex-1 bg-primary/20" aria-hidden="true" />
            <span className="metric-mono text-xs text-primary">01</span>
            <span className="metric-mono text-xs text-foreground/40">/ 05</span>
          </div>
        </div>

        {/* How it works drawer - mobile only */}
        <div className="mt-8">
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
