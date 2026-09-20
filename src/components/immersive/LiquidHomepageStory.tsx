import { ReactNode, useRef } from "react";
import { motion, MotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { HeroLogo } from "@/components/innovative/HeroLogo";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { CONTACTS, MESSAGES, openWhatsApp } from "@/constants/contacts";

export const LiquidHomepageStory = () => {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const progress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 28,
    mass: 0.5,
  });

  const handleTalk = () => {
    const lang = isItalian ? "it" : "en";
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.investor.whatsapp[lang](CONTACTS.lorenzo.name));
  };

  const scenes: Array<{
    id: string;
    label: string;
    range: [number, number];
    content: ReactNode;
  }> = [
    {
      id: "hero",
      label: isItalian ? "Inizio" : "Start",
      range: [0, 0.22],
      content: (
        <>
          <HeroLogo />
          <h1 className="max-w-4xl font-display text-5xl font-bold leading-[0.92] text-foreground sm:text-6xl md:text-7xl lg:text-8xl">
            {isItalian ? <>Reddito <span className="text-primary">passivo</span><br />da immobili a Torino.</> : <>Passive <span className="text-primary">income</span><br />from Turin real estate.</>}
          </h1>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{t("hero.missionStatement")}</p>
          <Link to="/fair-rent-pledge" className="mt-6 inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1.5 text-xs font-medium text-primary transition-colors duration-150 hover:bg-primary/20">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            {isItalian ? "Fair Rent Pledge — il nostro impegno pubblico" : "Fair Rent Pledge — our public commitment"}
          </Link>
        </>
      ),
    },
    {
      id: "how",
      label: isItalian ? "Come funziona" : "How it works",
      range: [0.18, 0.42],
      content: (
        <>
          <h2 className="max-w-4xl font-display text-4xl font-bold leading-[0.95] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">{isItalian ? "Investi in una singola operazione immobiliare." : "Invest in a single real estate operation."}</h2>
          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4 md:gap-10">
            <Metric value="01" label={isItalian ? "Acquisiamo" : "We buy"} />
            <Metric value="02" label={isItalian ? "Gestiamo" : "We manage"} />
            <Metric value="03" label={isItalian ? "Distribuiamo" : "THE PROPERTY PERFORMS AND PAYS BACK"} />
          </div>
        </>
      ),
    },
    {
      id: "invest",
      label: isItalian ? "Investitori" : "Investors",
      range: [0.38, 0.62],
      content: (
        <>
          <h2 className="max-w-4xl font-display text-4xl font-bold leading-[0.95] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            {isItalian ? <>90.000 studenti.<br /><span className="text-primary">7</span> università.<br />Un solo mercato.</> : <>90,000 students.<br /><span className="text-primary">7</span> universities.<br />One market.</>}
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{isItalian ? "Torino ospita oltre 90.000 studenti universitari." : "Turin hosts over 90,000 university students."}</p>
        </>
      ),
    },
    {
      id: "sell",
      label: isItalian ? "Vendi casa" : "Sell",
      range: [0.58, 0.82],
      content: (
        <>
          <h2 className="max-w-4xl font-display text-4xl font-bold leading-[0.95] text-foreground sm:text-5xl md:text-6xl lg:text-7xl">{isItalian ? <>Compriamo <span className="text-primary">noi</span>.<br />Zero commissioni.</> : <><span className="text-primary">We</span> buy.<br />Zero commission.</>}</h2>
          <div className="mt-10 grid max-w-xl grid-cols-2 gap-6 md:gap-12">
            <Metric value="0%" label={isItalian ? "Commissioni" : "Commission"} />
            <Metric value="60-90" label={isItalian ? "Giorni" : "Days"} />
          </div>
        </>
      ),
    },
    {
      id: "talk",
      label: isItalian ? "Contatti" : "Contact",
      range: [0.78, 1],
      content: (
        <>
          <h2 className="max-w-4xl font-display text-5xl font-bold leading-[0.92] text-foreground sm:text-6xl md:text-7xl lg:text-8xl">{isItalian ? <>Parla con<br /><span className="text-primary">Lorenzo</span>.</> : <>Talk to<br /><span className="text-primary">Lorenzo</span>.</>}</h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg">{isItalian ? "Una conversazione vera, su WhatsApp. Senza moduli, senza attese." : "A real conversation on WhatsApp. No forms, no waiting."}</p>
          <Button className="mt-10" onClick={handleTalk}>{isItalian ? "Parla con Lorenzo" : "Talk to Lorenzo"}</Button>
        </>
      ),
    },
  ];

  if (reduced) {
    return (
      <div aria-label={isItalian ? "Storia di Jungle Rent" : "Jungle Rent story"}>
        {scenes.map((scene, index) => (
          <section key={scene.id} className="flex min-h-[calc(100svh-3.5rem)] items-center pb-16 md:pb-0">
            <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
              <SceneIndex index={String(index + 1).padStart(2, "0")} label={scene.label} />
              <div className="mt-8">{scene.content}</div>
            </div>
          </section>
        ))}
      </div>
    );
  }

  return (
    <div ref={ref} className="relative h-[320vh]" aria-label={isItalian ? "Storia di Jungle Rent" : "Jungle Rent story"}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {scenes.map((scene, index) => (
          <Scene key={scene.id} progress={progress} range={scene.range} reduced={reduced} isFirst={index === 0} isLast={index === scenes.length - 1}>
            <div className="mx-auto flex h-full w-full max-w-6xl flex-col justify-center px-6 pb-16 md:px-10 md:pb-0">
              <SceneIndex index={String(index + 1).padStart(2, "0")} label={scene.label} />
              <div className="mt-8">{scene.content}</div>
            </div>
          </Scene>
        ))}
        <div className="pointer-events-none absolute bottom-[calc(4rem+env(safe-area-inset-bottom)+0.75rem)] left-1/2 z-10 flex -translate-x-1/2 gap-2 md:bottom-6">
          {scenes.map((scene, index) => <Dot key={scene.id} progress={progress} index={index} total={scenes.length} />)}
        </div>
      </div>
    </div>
  );
};

interface SceneProps {
  progress: MotionValue<number>;
  range: [number, number];
  reduced: boolean;
  children: ReactNode;
  isFirst?: boolean;
  isLast?: boolean;
}

const Scene = ({ progress, range, reduced, children, isFirst, isLast }: SceneProps) => {
  const [start, end] = range;
  const middle = (start + end) / 2;
  const fade = (end - start) * 0.4;
  const opacity = useTransform(
    progress,
    [start - 0.001, start + fade, end - fade, end + 0.001],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0],
  );
  const y = useTransform(
    progress,
    [start, middle, end],
    reduced ? ["0%", "0%", "0%"] : [isFirst ? "0%" : "4%", "0%", isLast ? "0%" : "-4%"],
  );
  const willChange = useTransform(opacity, (value) => value > 0.05 ? "transform, opacity" : "auto");
  const pointerEvents = useTransform(opacity, (value) => value > 0.5 ? "auto" : "none");

  return <motion.div className="absolute inset-0" style={{ opacity, y, pointerEvents, willChange }}>{children}</motion.div>;
};

const SceneIndex = ({ index, label }: { index: string; label: string }) => (
  <div className="flex items-center gap-4 text-foreground/45">
    <span className="metric-mono text-xs text-primary">{index}</span>
    <span className="h-px w-12 bg-primary/25" aria-hidden="true" />
    <span className="eyebrow-mono text-xs text-foreground/60">{label}</span>
    <span className="metric-mono text-xs text-foreground/40">/ 05</span>
  </div>
);

const Metric = ({ value, label }: { value: string; label: string }) => (
  <div><p className="metric-mono text-3xl font-light leading-none text-foreground md:text-5xl">{value}</p><p className="eyebrow-mono mt-2 text-xs text-muted-foreground">{label}</p></div>
);

const Dot = ({ progress, index, total }: { progress: MotionValue<number>; index: number; total: number }) => {
  const center = (index + 0.5) / total;
  const opacity = useTransform(progress, (value) => Math.max(0.25, 1 - Math.abs(value - center) * total * 1.5));
  const scale = useTransform(progress, (value) => Math.abs(value - center) < 0.5 / total ? 1.4 : 1);
  return <motion.span style={{ opacity, scale }} className="block h-1.5 w-1.5 rounded-full bg-primary" />;
};

export default LiquidHomepageStory;
