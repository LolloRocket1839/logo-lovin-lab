import { useTranslation } from "react-i18next";
import { SceneReveal } from "@/components/home/SceneReveal";

/**
 * TrustBadge — Chapter 06 · Fiducia
 * Editorial credentials line. No card, no logo box — only typography,
 * matching the language of LiquidHomepageStory.
 */
export const TrustBadge = () => {
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");

  const credentials = isItalian
    ? [
        "Start-up Innovativa",
        "Incubata in 2i3T",
        "Università di Torino",
        "Registro Imprese di Torino",
      ]
    : [
        "Certified Innovative Startup",
        "Incubated at 2i3T",
        "University of Turin",
        "Turin Business Register",
      ];

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
            <span className="metric-mono text-xs text-foreground/40">/ 08</span>
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
          <p className="mt-10 max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            {isItalian
              ? "Jungle Rent S.r.l. è una start-up innovativa incubata nell'acceleratore dell'Università di Torino. Non un'idea su una slide — una società registrata, operativa, con un fondatore che risponde di persona."
              : "Jungle Rent S.r.l. is a certified innovative startup incubated at the University of Turin's accelerator. Not an idea on a slide — a registered, operating company with a founder who answers in person."}
          </p>
        </SceneReveal>

        <SceneReveal delay={260}>
          <ul className="mt-12 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs uppercase tracking-[0.18em] text-muted-foreground/80 font-medium">
            {credentials.map((c, i) => (
              <li key={c} className="flex items-center gap-6">
                <span>{c}</span>
                {i < credentials.length - 1 && (
                  <span className="text-foreground/20" aria-hidden="true">·</span>
                )}
              </li>
            ))}
          </ul>
        </SceneReveal>
      </div>
    </section>
  );
};

export default TrustBadge;
