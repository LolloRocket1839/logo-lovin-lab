import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { CONTACTS, MESSAGES, openWhatsApp } from "@/constants/contacts";
import { useAnalytics } from "@/hooks/useAnalytics";

interface Props {
  onCtaClick: () => void;
}

const HeroSectionComponent = ({ onCtaClick }: Props) => {
  const { t, i18n } = useTranslation();
  const { trackEvent } = useAnalytics();
  const lang = i18n.language.startsWith("en") ? "en" : "it";

  const handleWhatsApp = () => {
    trackEvent("investor_quick_contact_click", { channel: "whatsapp", source: "hero" });
    const message = MESSAGES.investor.whatsapp[lang](CONTACTS.lorenzo.name);
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  const metrics = [
    { label: t("investor.landing.hero.metrics.yieldLabel"), value: t("investor.landing.hero.metrics.yieldValue") },
    { label: t("investor.landing.hero.metrics.payoutLabel"), value: t("investor.landing.hero.metrics.payoutValue") },
    { label: t("investor.landing.hero.metrics.ticketLabel"), value: t("investor.landing.hero.metrics.ticketValue") },
  ];

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 bg-cream">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.2em] text-primary/70 font-medium mb-6">
          {t("investor.landing.hero.eyebrow")}
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl leading-[1.1] text-foreground mb-6 tracking-tight">
          {t("investor.landing.hero.h1")}
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mb-8">
          {t("investor.landing.hero.subhead")}
        </p>

        <div className="grid grid-cols-3 gap-3 sm:gap-6 max-w-2xl mb-10 border-y border-primary/15 py-6">
          {metrics.map((m) => (
            <div key={m.label}>
              <p className="font-serif text-2xl sm:text-3xl md:text-4xl text-primary tracking-tight leading-none">
                {m.value}
              </p>
              <p className="text-[11px] sm:text-xs uppercase tracking-wider text-muted-foreground mt-2 leading-tight">
                {m.label}
              </p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
          <Button
            size="lg"
            onClick={handleWhatsApp}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 h-12 text-base font-medium"
          >
            {t("investor.landing.hero.ctaPrimary")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={onCtaClick}
            className="border-primary/30 hover:bg-primary/5 rounded-full px-8 h-12 text-base font-medium"
          >
            {t("investor.landing.hero.ctaSecondary")}
          </Button>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed mt-4 max-w-2xl">
          {t("investor.landing.hero.ctaNote")}
        </p>
      </div>
    </section>
  );
};
