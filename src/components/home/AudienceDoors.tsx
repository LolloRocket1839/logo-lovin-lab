import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SceneReveal } from "./SceneReveal";
import { useAnalytics } from "@/hooks/useAnalytics";

/**
 * AudienceDoors — Chapter 07 · Per chi
 * Three editorial rows (not cards) — typography-first, identical
 * rhythm to LiquidHomepageStory scenes.
 */
export const AudienceDoors = () => {
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const { trackClick } = useAnalytics();

  const rows: RowProps[] = [
    {
      index: "I",
      eyebrow: isItalian ? "Investitori" : "Investors",
      title: isItalian ? "Reddito da Torino, da €100." : "Income from Turin, from €100.",
      blurb: isItalian
        ? "Esposizione alla singola operazione immobiliare. Payout ogni 2 mesi."
        : "Exposure to a single real estate operation. Payouts every 2 months.",
      cta: isItalian ? "Parla con Lorenzo" : "Talk to Lorenzo",
      to: isItalian ? "/investitori" : "/investors",
      onClickTrack: () => trackClick("audience_door_invest"),
    },
    {
      index: "II",
      eyebrow: isItalian ? "Venditori" : "Sellers",
      title: isItalian ? "Compriamo noi. Zero commissioni." : "We buy. Zero commission.",
      blurb: isItalian
        ? "Valutazione, offerta scritta e rogito in 60-90 giorni."
        : "Valuation, written offer and deed within 60-90 days.",
      cta: isItalian ? "Valutazione gratuita" : "Free valuation",
      to: "/vendi",
      onClickTrack: () => trackClick("audience_door_sell"),
    },
    {
      index: "III",
      eyebrow: isItalian ? "Studenti" : "Students",
      title: isItalian ? "Stanze verificate, contratti regolari." : "Verified rooms, regular contracts.",
      blurb: isItalian
        ? "Camere arredate vicino alle università di Torino, contratti a norma."
        : "Furnished rooms near Turin universities, fully compliant contracts.",
      cta: isItalian ? "Esplora" : "Explore",
      to: "/students",
      onClickTrack: () => trackClick("audience_door_study"),
    },
  ];

  return (
    <section
      aria-label={isItalian ? "Capitolo 07 — Per chi è Jungle Rent" : "Chapter 07 — Who it's for"}
      className="relative bg-background py-24 md:py-32 border-t border-border/30"
    >
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <SceneReveal>
          <div className="flex items-center gap-4 text-foreground/45">
            <span className="metric-mono text-xs text-primary">07</span>
            <span className="h-px w-12 bg-primary/25" aria-hidden="true" />
            <span className="eyebrow-mono text-foreground/60 text-xs">
              {isItalian ? "Per chi" : "For whom"}
            </span>
            <span className="metric-mono text-xs text-foreground/40">/ 08</span>
          </div>
        </SceneReveal>

        <SceneReveal delay={80}>
          <h2 className="mt-8 font-display font-bold tracking-tighter text-foreground leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
            {isItalian ? (
              <>
                Tre modi di entrare nel<br />
                mercato di <span className="italic font-normal text-primary">Torino</span>.
              </>
            ) : (
              <>
                Three ways into the<br />
                <span className="italic font-normal text-primary">Turin</span> market.
              </>
            )}
          </h2>
        </SceneReveal>

        <ul className="mt-16 md:mt-20 divide-y divide-border/40 border-y border-border/40">
          {rows.map((row, i) => (
            <SceneReveal key={row.index} delay={140 + i * 80} as="div">
              <Row {...row} />
            </SceneReveal>
          ))}
        </ul>
      </div>
    </section>
  );
};

interface RowProps {
  index: string;
  eyebrow: string;
  title: string;
  blurb: string;
  cta: string;
  to?: string;
  onClick?: () => void;
  onClickTrack?: () => void;
}

const Row = ({ index, eyebrow, title, blurb, cta, to, onClick, onClickTrack }: RowProps) => {
  const inner = (
    <div className="group relative grid grid-cols-1 md:grid-cols-[80px_1fr_auto] items-baseline gap-x-8 gap-y-3 py-10 md:py-14">
      <div className="flex items-center gap-3 text-foreground/45">
        <span className="metric-mono text-sm text-primary">{index}</span>
        <span className="eyebrow-mono text-foreground/60 text-xs md:hidden">{eyebrow}</span>
      </div>

      <div>
        <p className="hidden md:block eyebrow-mono text-foreground/60 text-xs mb-3">{eyebrow}</p>
        <h3 className="font-display font-bold tracking-tighter text-foreground leading-[0.98] text-3xl md:text-4xl lg:text-5xl group-hover:translate-x-1 transition-transform duration-300">
          {title}
        </h3>
        <p className="mt-3 max-w-xl text-sm md:text-base text-muted-foreground leading-relaxed">
          {blurb}
        </p>
      </div>

      <div className="md:pl-8 md:self-center">
        <span className="inline-flex items-center gap-3 text-sm md:text-base font-semibold text-foreground border-b border-primary/60 pb-1 group-hover:gap-4 transition-all">
          {cta}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </div>
  );

  const focusCls =
    "block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

  if (to) {
    return (
      <Link to={to} onClick={onClickTrack} className={focusCls}>
        {inner}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={focusCls}>
      {inner}
    </button>
  );
};

export default AudienceDoors;
