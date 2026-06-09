import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { SceneReveal } from "./SceneReveal";
import { CONTACTS, MESSAGES, openWhatsApp } from "@/constants/contacts";
import { useAnalytics } from "@/hooks/useAnalytics";

/**
 * AudienceDoors
 * Three doors into the Turin market: invest, sell, study.
 * Typography and rhythm match LiquidHomepageStory scenes.
 */
export const AudienceDoors = () => {
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const { trackClick } = useAnalytics();

  const handleInvest = () => {
    trackClick("audience_door_invest");
    const lang = isItalian ? "it" : "en";
    openWhatsApp(
      CONTACTS.investor.phone,
      MESSAGES.investor.whatsapp[lang](CONTACTS.investor.name)
    );
  };

  const headline = isItalian
    ? "Tre modi di entrare nel mercato di Torino."
    : "Three ways into the Turin market.";

  const eyebrow = isItalian ? "Per chi" : "For whom";

  return (
    <section
      aria-label={isItalian ? "Tre porte: investitori, venditori, studenti" : "Three doors: investors, sellers, students"}
      className="relative bg-background py-24 md:py-32"
    >
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <SceneReveal>
          <div className="flex items-center gap-4 text-foreground/45">
            <span className="metric-mono text-xs text-primary">06</span>
            <span className="h-px w-12 bg-primary/25" aria-hidden="true" />
            <span className="eyebrow-mono text-foreground/60 text-xs">{eyebrow}</span>
            <span className="metric-mono text-xs text-foreground/40">/ 03</span>
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

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* Door 1 — Invest */}
          <SceneReveal delay={120}>
            <Door
              index="01"
              eyebrow={isItalian ? "Investo" : "Invest"}
              title={isItalian ? "Da €100." : "From €100."}
              subtitle={isItalian ? "Payout ogni 2 mesi." : "Payouts every 2 months."}
              cta={isItalian ? "Parla con Lorenzo" : "Talk to Lorenzo"}
              onClick={handleInvest}
            />
          </SceneReveal>

          {/* Door 2 — Sell */}
          <SceneReveal delay={200}>
            <Door
              index="02"
              eyebrow={isItalian ? "Vendo casa" : "Sell"}
              title={isItalian ? "Zero commissioni." : "Zero commission."}
              subtitle={isItalian ? "60-90 giorni." : "60-90 days."}
              cta={isItalian ? "Valutazione gratuita" : "Free valuation"}
              to="/vendi-casa-torino"
              onClickTrack={() => trackClick("audience_door_sell")}
            />
          </SceneReveal>

          {/* Door 3 — Study */}
          <SceneReveal delay={280}>
            <Door
              index="03"
              eyebrow={isItalian ? "Studio a Torino" : "Study in Turin"}
              title={isItalian ? "Stanze verificate." : "Verified rooms."}
              subtitle={isItalian ? "Contratti regolari." : "Regular contracts."}
              cta={isItalian ? "Esplora" : "Explore"}
              to="/students"
              onClickTrack={() => trackClick("audience_door_study")}
            />
          </SceneReveal>
        </div>
      </div>
    </section>
  );
};

interface DoorProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  cta: string;
  to?: string;
  onClick?: () => void;
  onClickTrack?: () => void;
}

const Door = ({ index, eyebrow, title, subtitle, cta, to, onClick, onClickTrack }: DoorProps) => {
  const inner = (
    <article className="group relative h-full bg-foreground/[0.025] border border-border/40 hover:border-primary/40 hover:bg-foreground/[0.04] transition-all duration-300 p-8 md:p-10 flex flex-col min-h-[420px] md:min-h-[480px]">
      <div className="flex items-center gap-3 text-foreground/45">
        <span className="metric-mono text-xs text-primary">{index}</span>
        <span className="h-px w-8 bg-primary/25" aria-hidden="true" />
        <span className="eyebrow-mono text-foreground/60 text-xs">{eyebrow}</span>
      </div>

      <h3 className="mt-10 font-display font-bold tracking-tighter text-foreground leading-[0.95] text-3xl md:text-4xl lg:text-5xl">
        {title}
      </h3>
      <p className="mt-3 font-display tracking-tighter text-muted-foreground leading-[1.05] text-2xl md:text-3xl">
        {subtitle}
      </p>

      <div className="mt-auto pt-10">
        <span className="inline-flex items-center gap-3 text-base font-semibold text-foreground border-b border-primary/60 pb-1 group-hover:gap-4 transition-all">
          {cta}
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </article>
  );

  if (to) {
    return (
      <Link
        to={to}
        onClick={onClickTrack}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        {inner}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {inner}
    </button>
  );
};

export default AudienceDoors;
