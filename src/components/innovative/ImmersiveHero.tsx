import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";
import { useAnalytics } from "@/hooks/useAnalytics";
import { HeroLogo } from "./HeroLogo";
import { HowItWorksDrawer } from "./HowItWorksDrawer";
import logo2i3t from "@/assets/2i3t-logo-green.png";

export const ImmersiveHero = () => {
  const { t } = useTranslation();
  const { trackClick } = useAnalytics();
  const [investDialogOpen, setInvestDialogOpen] = useState(false);

  const handleInvestClick = () => {
    trackClick('immersive_hero_invest');
    setInvestDialogOpen(true);
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
          {/* Animated Logo - visible on mobile, fades with scroll */}
          <HeroLogo />

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

          {/* 2i3T Badge */}
          <a 
            href="https://2i3t.it" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mb-8 md:mb-10 px-4 py-2 bg-background/50 backdrop-blur-sm border border-border/30 rounded-full hover:bg-background/70 transition-colors animate-fade-in"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
            onClick={() => trackClick('hero_2i3t_badge')}
          >
            <img src={logo2i3t} alt="2i3T" className="h-5 w-auto" />
            <span className="text-xs text-muted-foreground">{t("trust.incubator")}</span>
          </a>

          {/* Single CTA */}
          <div>
            <Button
              size="lg"
              variant="premium"
              onClick={handleInvestClick}
              className="text-base md:text-lg px-8 py-6 md:px-10 md:py-7"
            >
              {t('hero.startInvesting')} →
            </Button>
          </div>

          {/* How it works drawer - mobile only */}
          <HowItWorksDrawer />
        </div>
      </div>

      <QuickInvestorLeadDialog open={investDialogOpen} onOpenChange={setInvestDialogOpen} source="hero" />
    </header>
  );
};
