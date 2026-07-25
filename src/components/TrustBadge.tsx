import { useTranslation } from "react-i18next";
import { SceneReveal } from "@/components/home/SceneReveal";
import logo2i3t from "@/assets/2i3t-logo-green.png";

/**
 * TrustBadge — Chapter 06 · Fiducia
 * Editorial credentials line. No card, no logo box — only typography,
 * matching the language of LiquidHomepageStory.
 */
export const TrustBadge = () => {
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");

  return (
    <section
      aria-label={isItalian ? "Capitolo 06 — Fiducia" : "Chapter 06 — Trust"}
      className="relative bg-background py-24 md:py-32 border-t border-border/30"
    >
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <SceneReveal>
          <div className="flex items-center gap-4 text-foreground/45">
            <span className="metric-mono text-xs text-primary">06</span>
            <span className="h-px w-12 bg-primary/25" aria-hidden="true" />
            <span className="eyebrow-mono text-foreground/60 text-xs">
              {isItalian ? "Fiducia" : "Trust"}
            </span>
            <span className="metric-mono text-xs text-foreground/40">/ 07</span>
          </div>
        </SceneReveal>

        <SceneReveal delay={100}>
          <h2 className="mt-8 font-display font-bold tracking-tighter text-foreground leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
            {isItalian ? (
              <>
                Una società <span className="italic font-normal text-primary">vera</span>,<br />
                con un percorso vero.
              </>
            ) : (
              <>
                A <span className="italic font-normal text-primary">real</span> company,<br />
                with a real track record.
              </>
            )}
          </h2>
        </SceneReveal>

        <SceneReveal delay={180}>
          <blockquote className="mt-10 max-w-2xl text-lg md:text-xl text-muted-foreground leading-relaxed italic">
            {isItalian
              ? "Jungle Rent nasce da un mio bisogno di risparmiare come studente. Ottimizzare l'uso e la risposta per rendere l'affitto sostenibile è l'investimento appetibile."
              : "Jungle Rent was born from my own need to save money as a student. Optimising use and response to make renting sustainable is what makes the investment attractive."}
          </blockquote>
        </SceneReveal>

        <SceneReveal delay={220}>
          <div className="mt-8 flex items-center gap-4">
            <div aria-hidden="true" className="w-12 h-px bg-primary/40" />
            <div>
              <p className="text-sm font-semibold text-foreground not-italic">Lorenzo Oni-Joseph</p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isItalian ? "Founder, Jungle Rent" : "Founder, Jungle Rent"}
              </p>
            </div>
          </div>
        </SceneReveal>


        <SceneReveal delay={260}>
          <div className="mt-12 flex flex-col items-start gap-3">
            <span className="eyebrow-mono text-xs text-muted-foreground/70">
              {isItalian ? "Incubata in" : "Incubated at"}
            </span>
            <a
              href="https://www.2i3t.it/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={isItalian ? "Incubata in 2i3T — visita il sito" : "Incubated at 2i3T — visit website"}
              className="inline-flex items-center opacity-80 hover:opacity-100 transition-opacity"
            >
              <img src={logo2i3t} alt="2i3T" className="h-12 w-auto" />
            </a>
          </div>
        </SceneReveal>
      </div>
    </section>
  );
};

export default TrustBadge;

