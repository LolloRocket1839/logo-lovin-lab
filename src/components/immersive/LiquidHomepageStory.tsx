import { useRef, ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { HeroLogo } from "@/components/innovative/HeroLogo";
import { CONTACTS, MESSAGES, openWhatsApp } from "@/constants/contacts";
import { useAnalytics } from "@/hooks/useAnalytics";

/**
 * LiquidHomepageStory
 * A single pinned viewport. Elements enter, hold, then exit
 * as you scroll — no long page, no block-by-block fades.
 * Inspired by Marvis-style liquid scroll, kept on Jungle Rent identity.
 */
export const LiquidHomepageStory = () => {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const { trackClick } = useAnalytics();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress with a spring -> liquid feel.
  const p = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 28,
    mass: 0.5,
  });

  const handleTalk = () => {
    trackClick("liquid_story_whatsapp");
    const lang = isItalian ? "it" : "en";
    const message = MESSAGES.investor.whatsapp[lang](CONTACTS.lorenzo.name);
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  // Scene boundaries on the unified progress timeline.
  // 5 scenes across ~300vh of virtual scroll.
  const scenes = [
    { id: "hero", in: 0.0, out: 0.22, isFirst: true, isLast: false },
    { id: "how", in: 0.18, out: 0.42, isFirst: false, isLast: false },
    { id: "invest", in: 0.38, out: 0.62, isFirst: false, isLast: false },
    { id: "sell", in: 0.58, out: 0.82, isFirst: false, isLast: false },
    { id: "talk", in: 0.78, out: 1.0, isFirst: false, isLast: true },
  ];

  return (
    <div
      ref={ref}
      style={{ height: "320vh" }}
      className="relative"
      aria-label="homepage scroll story"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">

        {/* Subtle vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 55%, hsl(var(--background)) 100%)",
          }}
        />

        {/* SCENE 1 — Hero */}
        <Scene p={p} range={[scenes[0].in, scenes[0].out]} reduced={reduced} isFirst>
          <div className="container mx-auto h-full px-6 md:px-10 flex flex-col justify-center max-w-6xl">
            <div>
              <HeroLogo />
            </div>
            <div className="mt-6 md:mt-10">
              <SceneIndex index="01" total="07" label={isItalian ? "Inizio" : "Start"} />
            </div>
            <h1 className="mt-8 font-display font-bold tracking-tighter text-foreground leading-[0.92] text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl">
              {isItalian ? (
                <>
                  Reddito <span className="italic font-normal text-primary">passivo</span><br />
                  da immobili a Torino.
                </>
              ) : (
                <>
                  Passive <span className="italic font-normal text-primary">income</span><br />
                  from Turin real estate.
                </>
              )}
            </h1>
            <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {t("hero.missionStatement")}
            </p>
            <a
              href="/fair-rent-pledge"
              className="mt-6 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary hover:bg-primary/20 transition-colors w-fit"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              {isItalian
                ? "Fair Rent Pledge — il nostro impegno pubblico"
                : "Fair Rent Pledge — our public commitment"}
            </a>
          </div>
        </Scene>

        {/* SCENE 2 — How */}
        <Scene p={p} range={[scenes[1].in, scenes[1].out]} reduced={reduced}>
          <div className="container mx-auto h-full px-6 md:px-10 flex flex-col justify-center max-w-6xl">
            <SceneIndex index="02" total="07" label={isItalian ? "Come funziona" : "How it works"} />
            <h2 className="mt-8 font-display font-bold tracking-tighter text-foreground leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
              {isItalian ? (
                <>
                  Investi da <span className="italic text-primary">€100</span>.<br />
                  Payout ogni 2 mesi.
                </>
              ) : (
                <>
                  Invest from <span className="italic text-primary">€100</span>.<br />
                  Payouts every 2 months.
                </>
              )}
            </h2>
            <div className="mt-10 grid grid-cols-3 gap-4 md:gap-10 max-w-2xl">
              <Metric value="01" label={isItalian ? "Acquisiamo" : "We buy"} />
              <Metric value="02" label={isItalian ? "Gestiamo" : "We manage"} />
              <Metric value="03" label={isItalian ? "Distribuiamo" : "We pay out"} />
            </div>
          </div>
        </Scene>

        {/* SCENE 3 — Investor */}
        <Scene p={p} range={[scenes[2].in, scenes[2].out]} reduced={reduced}>
          <div className="container mx-auto h-full px-6 md:px-10 flex flex-col justify-center max-w-6xl">
            <SceneIndex index="03" total="07" label={isItalian ? "Investitori" : "Investors"} />
            <h2 className="mt-8 font-display font-bold tracking-tighter text-foreground leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
              {isItalian ? (
                <>
                  90.000 studenti.<br />
                  <span className="italic text-primary">7</span> università.<br />
                  Un solo mercato.
                </>
              ) : (
                <>
                  90,000 students.<br />
                  <span className="italic text-primary">7</span> universities.<br />
                  One market.
                </>
              )}
            </h2>
            <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {isItalian
                ? "Torino è la città universitaria che cresce più veloce in Italia. Noi siamo già qui."
                : "Turin is Italy's fastest-growing university city. We are already on the ground."}
            </p>
          </div>
        </Scene>

        {/* SCENE 4 — Sell */}
        <Scene p={p} range={[scenes[3].in, scenes[3].out]} reduced={reduced}>
          <div className="container mx-auto h-full px-6 md:px-10 flex flex-col justify-center max-w-6xl">
            <SceneIndex index="04" total="07" label={isItalian ? "Vendi casa" : "Sell"} />
            <h2 className="mt-8 font-display font-bold tracking-tighter text-foreground leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
              {isItalian ? (
                <>
                  Compriamo <span className="italic text-primary">noi</span>.<br />
                  Zero commissioni.
                </>
              ) : (
                <>
                  <span className="italic text-primary">We</span> buy.<br />
                  Zero commission.
                </>
              )}
            </h2>
            <div className="mt-10 grid grid-cols-2 gap-6 md:gap-12 max-w-xl">
              <Metric value="0%" label={isItalian ? "Commissioni" : "Commission"} />
              <Metric value="60-90" label={isItalian ? "Giorni" : "Days"} />
            </div>
          </div>
        </Scene>

        {/* SCENE 5 — Talk */}
        <Scene p={p} range={[scenes[4].in, scenes[4].out]} reduced={reduced} isLast>
          <div className="container mx-auto h-full px-6 md:px-10 flex flex-col justify-center max-w-6xl">
            <SceneIndex index="05" total="07" label={isItalian ? "Contatti" : "Contact"} />
            <h2 className="mt-8 font-display font-bold tracking-tighter text-foreground leading-[0.92] text-5xl sm:text-6xl md:text-7xl lg:text-8xl max-w-4xl">
              {isItalian ? (
                <>
                  Parla con<br />
                  <span className="italic text-primary">Lorenzo</span>.
                </>
              ) : (
                <>
                  Talk to<br />
                  <span className="italic text-primary">Lorenzo</span>.
                </>
              )}
            </h2>
            <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
              {isItalian
                ? "Una conversazione vera, su WhatsApp. Senza moduli, senza attese."
                : "A real conversation on WhatsApp. No forms, no waiting."}
            </p>
            <div className="mt-10">
              <button
                type="button"
                onClick={handleTalk}
                className="group inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 font-semibold text-base hover:brightness-110 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                {isItalian ? "Parla con Lorenzo" : "Talk to Lorenzo"}
                <span className="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </Scene>

        {/* Scene progress rail */}
        <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
          {scenes.map((_, i) => (
            <Dot key={i} p={p} index={i} total={scenes.length} />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ---------- helpers ---------- */

interface SceneProps {
  p: MotionValue<number>;
  range: [number, number];
  reduced: boolean;
  children: ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
}

const Scene = ({ p, range, reduced, children, isFirst, isLast }: SceneProps) => {
  const [a, b] = range;
  const mid = (a + b) / 2;
  const fade = (b - a) * 0.4;

  // First scene must be fully visible at progress 0 (page load).
  // Last scene must stay fully visible after its end.
  const opacity = useTransform(
    p,
    [a - 0.001, a + fade, b - fade, b + 0.001],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );

  // Elements enter from below, drift up and out — liquid.
  const y = useTransform(
    p,
    [a, mid, b],
    reduced
      ? ["0%", "0%", "0%"]
      : [isFirst ? "0%" : "4%", "0%", isLast ? "0%" : "-4%"]
  );

  const willChange = useTransform(opacity, (v) =>
    v > 0.05 ? "transform, opacity" : "auto"
  );

  // Disable pointer-events when not visible enough.
  const pe = useTransform(opacity, (v) => (v > 0.5 ? "auto" : "none"));

  return (
    <motion.div
      style={{
        opacity,
        y,
        pointerEvents: pe as unknown as "auto" | "none",
        willChange: willChange as unknown as string,
      }}
      className="absolute inset-0"
    >
      {children}
    </motion.div>
  );
};

const SceneIndex = ({ index, total, label }: { index: string; total: string; label: string }) => (
  <div className="flex items-center gap-4 text-foreground/45">
    <span className="metric-mono text-xs text-primary">{index}</span>
    <span className="h-px w-12 bg-primary/25" aria-hidden="true" />
    <span className="eyebrow-mono text-foreground/60 text-xs">{label}</span>
    <span className="metric-mono text-xs text-foreground/40">/ {total}</span>
  </div>
);

const Metric = ({ value, label }: { value: string; label: string }) => (
  <div>
    <p className="metric-mono text-3xl md:text-5xl text-foreground font-light leading-none">{value}</p>
    <p className="eyebrow-mono text-muted-foreground mt-2 text-xs">{label}</p>
  </div>
);

const Dot = ({ p, index, total }: { p: MotionValue<number>; index: number; total: number }) => {
  const center = (index + 0.5) / total;
  const opacity = useTransform(p, (v) => {
    const d = Math.abs(v - center);
    return Math.max(0.25, 1 - d * total * 1.5);
  });
  const scale = useTransform(p, (v) => {
    const d = Math.abs(v - center);
    return d < 0.5 / total ? 1.4 : 1;
  });
  return (
    <motion.span
      style={{ opacity, scale }}
      className="block w-1.5 h-1.5 rounded-full bg-primary"
    />
  );
};

export default LiquidHomepageStory;
