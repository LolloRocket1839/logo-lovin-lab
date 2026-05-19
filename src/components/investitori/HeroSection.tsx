import { memo, useMemo } from "react";
import { useTranslation } from "react-i18next";
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

  const metrics = useMemo(
    () => [
      { label: t("investor.landing.hero.metrics.payoutLabel"), value: t("investor.landing.hero.metrics.payoutValue") },
      { label: t("investor.landing.hero.metrics.ticketLabel"), value: t("investor.landing.hero.metrics.ticketValue") },
    ],
    [t]
  );

  // Split H1 to italicize a key phrase
  const h1Text = t("investor.landing.hero.h1");
  const renderHeading = () => {
    const accent = lang === "en" ? "student housing" : "student housing";
    const idx = h1Text.toLowerCase().indexOf(accent.toLowerCase());
    if (idx === -1) return h1Text;
    const before = h1Text.slice(0, idx);
    const match = h1Text.slice(idx, idx + accent.length);
    const after = h1Text.slice(idx + accent.length);
    return (
      <>
        {before}
        <span className="italic font-normal text-primary">{match}</span>
        {after}
      </>
    );
  };

  return (
    <section className="relative pt-20 md:pt-28 pb-12 md:pb-16 bg-background">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <div className="swiss-frame bg-background">
          {/* Eyebrow row */}
          <div className="flex items-center justify-between px-5 md:px-8 py-3 border-b border-primary/15">
            <span className="eyebrow-mono text-foreground/70">
              {t("investor.landing.hero.eyebrow")}
            </span>
            <span className="hidden sm:inline-flex items-center gap-2 eyebrow-mono text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" aria-hidden="true" />
              Q3 attivo
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12">
            {/* Headline + subhead */}
            <div className="md:col-span-8 px-5 md:px-12 py-10 md:py-14 md:border-r border-primary/15">
              <h1 className="font-display font-bold tracking-tighter text-foreground leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-6">
                {renderHeading()}
              </h1>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-xl">
                {t("investor.landing.hero.subhead")}
              </p>
              <p className="mt-6 text-sm text-muted-foreground leading-relaxed max-w-xl">
                {t("investor.landing.hero.ctaNote")}
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs eyebrow-mono text-muted-foreground/90">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" aria-hidden="true" />
                  Lorenzo · Founder · {lang === "en" ? "replies within 24h" : "risponde entro 24h"}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary/60" aria-hidden="true" />
                  S.r.l. · {lang === "en" ? "Innovative Startup Registry" : "Registro Startup Innovative"}
                </span>
              </div>
            </div>

            {/* Metrics column */}
            <div className="md:col-span-4 flex flex-col">
              <div className="flex-1 px-5 md:px-8 py-8 md:py-10 flex flex-col justify-end gap-7 border-t md:border-t-0 border-primary/15">
                {metrics.map((m) => (
                  <div key={m.label} className="space-y-1">
                    <p className="eyebrow-mono text-muted-foreground">{m.label}</p>
                    <p className="metric-mono text-3xl md:text-4xl text-primary font-medium">
                      {m.value}
                    </p>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={handleWhatsApp}
                className="block w-full bg-primary text-primary-foreground px-6 py-5 text-center font-semibold text-base hover:bg-primary/90 transition-colors border-t border-primary/15 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t("cta.talkToLorenzo")}
                <span className="inline-block ml-2 transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
              <button
                type="button"
                onClick={onCtaClick}
                className="block w-full bg-background text-foreground px-6 py-4 text-center font-medium text-sm hover:bg-primary/5 transition-colors border-t border-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {t("cta.requestInfo")}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const HeroSection = memo(HeroSectionComponent);
