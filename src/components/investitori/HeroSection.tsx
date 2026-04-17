import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface Props {
  onCtaClick: () => void;
}

export const HeroSection = ({ onCtaClick }: Props) => {
  const { t } = useTranslation();
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 bg-cream">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/70 font-medium mb-6">
          {t("investor.landing.hero.eyebrow")}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-foreground mb-6 tracking-tight">
          {t("investor.landing.hero.h1")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-10">
          {t("investor.landing.hero.subhead")}
        </p>
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button
            size="lg"
            onClick={onCtaClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 text-base font-medium"
          >
            {t("investor.landing.hero.cta")}
          </Button>
          <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
            {t("investor.landing.hero.ctaNote")}
          </p>
        </div>
      </div>
    </section>
  );
};
