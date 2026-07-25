import { useTranslation } from "react-i18next";
import { SceneReveal } from "@/components/home/SceneReveal";
import logo2i3t from "@/assets/2i3t-logo-green.png";

/**
 * TrustBadge — Chapter 06 · Fiducia
 * Editorial credentials line. No card, no logo box — only typography,
 * matching the language of LiquidHomepageStory.
 */
export const TrustBadge = () => {
  const { t } = useTranslation();

  return (
    <section
      aria-label={t("trustBadge.aria")}
      className="relative bg-background py-24 md:py-32 border-t border-border/30"
    >
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <SceneReveal>
          <div className="flex items-center gap-4 text-foreground/45">
            <span className="metric-mono text-xs text-primary">06</span>
            <span className="h-px w-12 bg-primary/25" aria-hidden="true" />
            <span className="eyebrow-mono text-foreground/60 text-xs">
              {t("trustBadge.chapter")}
            </span>
            <span className="metric-mono text-xs text-foreground/40">/ 07</span>
          </div>
        </SceneReveal>

        <SceneReveal delay={100}>
          <h2 className="mt-8 font-display font-bold tracking-tighter text-foreground leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
            {t("trustBadge.headlinePre")}{" "}
            <span className="italic font-normal text-primary">{t("trustBadge.headlineEmphasis")}</span>
            {t("trustBadge.headlinePost")}
          </h2>
        </SceneReveal>

        <SceneReveal delay={180}>
          <blockquote className="mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed italic">
            {t("trustBadge.quote")}
          </blockquote>
        </SceneReveal>

        <SceneReveal delay={220}>
          <div className="mt-8 flex items-center gap-4">
            <div aria-hidden="true" className="w-12 h-px bg-primary/40" />
            <div>
              <p className="text-sm font-semibold text-foreground not-italic">Lorenzo Oni-Joseph</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {t("trustBadge.role")}
              </p>
            </div>
          </div>
        </SceneReveal>


        <SceneReveal delay={260}>
          <div className="mt-12 flex flex-col items-start gap-3">
            <span className="eyebrow-mono text-xs text-muted-foreground/70">
              {t("trustBadge.incubatedLabel")}
            </span>
            <a
              href="https://www.2i3t.it/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t("trustBadge.incubatedAria")}
              className="inline-flex items-center opacity-80 hover:opacity-100 transition-opacity"
            >
              <img src={logo2i3t} alt="2i3T" className="h-24 md:h-28 w-auto" />
            </a>
          </div>
        </SceneReveal>
      </div>
    </section>
  );
};

export default TrustBadge;
