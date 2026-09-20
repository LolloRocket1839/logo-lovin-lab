import { useEffect, useRef, useState, ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, useScroll, useSpring, useTransform, MotionValue } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useViewportSize } from "@/hooks/useViewportSize";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { CONTACTS, MESSAGES, openWhatsApp } from "@/constants/contacts";
import { Button } from "@/components/ui/button";

/**
 * LiquidHomepageStory
 * A single pinned viewport. Elements enter, hold, then exit
 * as you scroll — no long page, no block-by-block fades.
 * Inspired by Marvis-style liquid scroll, kept on Jungle Rent identity.
 */
export const LiquidHomepageStory = () => {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [logoContainer, setLogoContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    document.documentElement.classList.add("homepage-scrollbar-hidden");
    return () => document.documentElement.classList.remove("homepage-scrollbar-hidden");
  }, []);

  useEffect(() => {
    const el = document.createElement("div");
    el.className = "fixed inset-0 z-[60] pointer-events-none";
    document.body.appendChild(el);
    setLogoContainer(el);
    return () => {
      document.body.removeChild(el);
    };
  }, []);

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

  const { width, height } = useViewportSize();
  const heroSize = width >= 1024 ? 384 : width >= 768 ? 288 : 160;
  const headerIconSize = 28;
  const headerHeight = 56;
  const startTop = height / 2 - heroSize / 2;
  const startLeft = width / 2 - heroSize / 2;
  const endTop = (headerHeight - headerIconSize) / 2;
  const endLeft = 20;

  const heroMarkOpacity = useTransform(p, [0, 0.12], [1, 0]);
  const headerMarkOpacity = useTransform(p, [0.12, 0.22], [0, 1]);

  const handleTalk = () => {
    const lang = isItalian ? "it" : "en";
    const message = MESSAGES.investor.whatsapp[lang](CONTACTS.lorenzo.name);
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  const handleAdvance = () => {
    const stage = ref.current;
    if (!stage) return;

    const travel = stage.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: stage.offsetTop + travel * 0.22,
      behavior: reduced ? "auto" : "smooth",
    });
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
    <>
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
            <div className="flex w-full items-center justify-center">
              <div
                style={{ width: heroSize, height: heroSize }}
                className="mx-auto"
                aria-hidden="true"
              />
            </div>
            <div className="mt-6 md:mt-10">
              <SceneIndex index="01" total="05" label={isItalian ? "Inizio" : "Start"} />
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
            <ScrollCue
              p={p}
              reduced={reduced}
              label={isItalian ? "Scorri" : "Scroll"}
              onClick={handleAdvance}
            />
          </div>
        </Scene>

        {/* SCENE 2 — How */}
        <Scene p={p} range={[scenes[1].in, scenes[1].out]} reduced={reduced}>
          <div className="container mx-auto h-full px-6 md:px-10 flex flex-col justify-center max-w-6xl">
            <SceneIndex index="02" total="05" label={isItalian ? "Come funziona" : "How it works"} />
            <h2 className="mt-8 font-display font-bold tracking-tighter text-foreground leading-[0.95] text-4xl sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
              {isItalian ? (
                <>
                  Investi in una singola operazione immobiliare.
                </>
              ) : (
                <>
                  Invest in a single real estate operation.
                </>
              )}
            </h2>
            <div className="mt-10 grid grid-cols-3 gap-4 md:gap-10 max-w-2xl">
              <Metric value="01" label={isItalian ? "Acquisiamo" : "We buy"} />
              <Metric value="02" label={isItalian ? "Gestiamo" : "We manage"} />
              <Metric value="03" label={isItalian ? "Distribuiamo" : "THE PROPERTY PERFORMS AND PAYS BACK"} />
            </div>
          </div>
        </Scene>

        {/* SCENE 3 — Investor */}
        <Scene p={p} range={[scenes[2].in, scenes[2].out]} reduced={reduced}>
          <div className="container mx-auto h-full px-6 md:px-10 flex flex-col justify-center max-w-6xl">
            <SceneIndex index="03" total="05" label={isItalian ? "Investitori" : "Investors"} />
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
                ? "Torino ospita oltre 90.000 studenti universitari."
                : "Turin hosts over 90,000 university students."}
            </p>
          </div>
        </Scene>

        {/* SCENE 4 — Sell */}
        <Scene p={p} range={[scenes[3].in, scenes[3].out]} reduced={reduced}>
          <div className="container mx-auto h-full px-6 md:px-10 flex flex-col justify-center max-w-6xl">
            <SceneIndex index="04" total="05" label={isItalian ? "Vendi casa" : "Sell"} />
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
            <SceneIndex index="05" total="05" label={isItalian ? "Contatti" : "Contact"} />
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
              <Button onClick={handleTalk}>
                {isItalian ? "Parla con Lorenzo" : "Talk to Lorenzo"}
              </Button>
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
    {logoContainer &&
      createPortal(
        <motion.img
          src={jungleRentLogo}
          alt="Jungle Rent"
          width={384}
          height={384}
          fetchPriority="high"
          decoding="async"
          style={{
            position: "fixed",
            top: logoTop,
            left: logoLeft,
            width: logoSize,
            height: logoSize,
            opacity: logoOpacity,
          }}
          className="z-50 pointer-events-none"
        />,
        logoContainer
      )}
  </>
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

const ScrollCue = ({
  p,
  reduced,
  label,
  onClick,
}: {
  p: MotionValue<number>;
  reduced: boolean;
  label: string;
  onClick: () => void;
}) => {
  const opacity = useTransform(p, [0, 0.015, 0.06], [1, 1, 0]);
  const pointerEvents = useTransform(opacity, (value) => (value > 0.2 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity, pointerEvents: pointerEvents as unknown as "auto" | "none" }}
      className="absolute bottom-14 left-1/2 -translate-x-1/2"
    >
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={onClick}
        aria-label={label}
        className="h-auto flex-col gap-1 px-4 py-2 text-muted-foreground hover:text-foreground"
      >
        <span className="eyebrow-mono text-[0.65rem]">{label}</span>
        <motion.span
          aria-hidden="true"
          animate={reduced ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="h-4 w-4" strokeWidth={1.5} />
        </motion.span>
      </Button>
    </motion.div>
  );
};

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
