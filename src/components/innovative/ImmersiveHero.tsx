import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";
import { useAnalytics } from "@/hooks/useAnalytics";

export const ImmersiveHero = () => {
  const { t } = useTranslation();
  const { trackClick } = useAnalytics();
  const [investDialogOpen, setInvestDialogOpen] = useState(false);

  const handleInvestClick = () => {
    trackClick('immersive_hero_invest');
    setInvestDialogOpen(true);
  };

  const scrollToContent = () => {
    const investorSection = document.getElementById('investor-section');
    investorSection?.scrollIntoView({ behavior: 'smooth' });
  };

  const headline = t('hero.mainHeadline');

  return (
    <header 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      role="banner"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-jungle-hero" />

      {/* Main content */}
      <div className="container relative z-10 px-4 md:px-8 py-12">
        <div className="max-w-4xl mx-auto text-center">
          {/* Logo */}
          <div className="mb-8 md:mb-10">
            <img
              src={jungleRentLogo}
              alt={t('hero.logoAlt')}
              width="160"
              height="160"
              className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 mx-auto rounded-full"
              loading="eager"
            />
          </div>

          {/* Headline */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold mb-4 md:mb-6 leading-tight text-foreground tracking-tight">
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
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 md:mb-10 font-light leading-relaxed max-w-2xl mx-auto">
            {t('hero.mainSubheadline')}
          </p>

          {/* Trust signal */}
          <p className="text-xs sm:text-sm text-muted-foreground mb-6 md:mb-8">
            {t('investor.minInvestmentBadge')} · {t('hero.badgeExplanation')}
          </p>

          {/* Single CTA */}
          <Button
            size="lg"
            variant="premium"
            onClick={handleInvestClick}
            className="text-base md:text-lg px-8 py-6 md:px-10 md:py-7"
          >
            {t('hero.startInvesting')} →
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToContent}
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Scroll to content"
      >
        <span className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground">{t('hero.discover')}</span>
        <span className="text-xl">↓</span>
      </button>

      <QuickInvestorLeadDialog open={investDialogOpen} onOpenChange={setInvestDialogOpen} source="hero" />
    </header>
  );
};
