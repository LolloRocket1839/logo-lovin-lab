import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";
import { useAnalytics } from "@/hooks/useAnalytics";
import { HeroLogo } from "./HeroLogo";
import { InlineFooter } from "./InlineFooter";
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
      className="relative h-screen flex items-center justify-center overflow-hidden"
      role="banner"
    >
      {/* Gradient background */}
      <div className="absolute inset-0 gradient-jungle-hero" />

      {/* Main content - centered with slight upward offset */}
      <div className="container relative z-10 px-4 md:px-8 -mt-16 md:-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Animated Logo */}
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

          {/* Single CTA */}
          <div className="mb-8 md:mb-10">
            <Button
              size="lg"
              variant="premium"
              onClick={handleInvestClick}
              className="text-base md:text-lg px-8 py-6 md:px-10 md:py-7"
            >
              {t('hero.startInvesting')} →
            </Button>
          </div>

          {/* 2i3T Badge */}
          <a 
            href="https://2i3t.it" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-5 py-3 bg-background/60 backdrop-blur-sm border border-border/30 rounded-full hover:bg-background/80 hover-scale transition-all animate-fade-in"
            style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
            onClick={() => trackClick('hero_2i3t_badge')}
          >
            <img src={logo2i3t} alt="2i3T" className="h-7 w-auto" />
            <div className="text-left">
              <p className="text-sm font-medium text-foreground">Incubatore Imprese UniTO</p>
              <p className="text-xs text-primary font-medium">Startup Innovativa</p>
            </div>
          </a>
        </div>
      </div>

      {/* Inline Footer at bottom */}
      <InlineFooter />

      <QuickInvestorLeadDialog open={investDialogOpen} onOpenChange={setInvestDialogOpen} source="hero" />
    </header>
  );
};
