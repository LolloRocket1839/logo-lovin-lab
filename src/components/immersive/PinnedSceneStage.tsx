import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Scene {
  id: string;
  node: ReactNode;
  /** Optional eyebrow number, e.g. "02" */
  index?: string;
  /** Optional eyebrow label, e.g. "Come funziona" */
  label?: string;
}

interface PinnedSceneStageProps {
  scenes: Scene[];
  /** Total height in vh per scene. Default 100 (one viewport of scroll per scene). */
  vhPerScene?: number;
  total?: string;
}

/**
 * PinnedSceneStage
 * The page does NOT grow visually — a tall spacer drives scroll, but the
 * canvas is pinned to the viewport. Scenes cross-fade in place with a soft
 * translate + blur as scrollYProgress moves through their slice.
 */
export const PinnedSceneStage = ({
  scenes,
  vhPerScene = 100,
  total,
}: PinnedSceneStageProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const n = scenes.length;
  const totalLabel = total ?? String(n).padStart(2, "0");

  return (
    <div
      ref={ref}
      style={{ height: `${vhPerScene * n}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {scenes.map((scene, i) => (
          <SceneLayer
            key={scene.id}
            scene={scene}
            i={i}
            n={n}
            totalLabel={totalLabel}
            progress={scrollYProgress}
            reduced={prefersReducedMotion}
          />
        ))}
      </div>
    </div>
  );
};

interface SceneLayerProps {
  scene: Scene;
  i: number;
  n: number;
  totalLabel: string;
  progress: MotionValue<number>;
  reduced: boolean;
}

const SceneLayer = ({ scene, i, n, totalLabel, progress, reduced }: SceneLayerProps) => {
  // Each scene owns a 1/n slice. Fade in over first 20%, hold, fade out over last 20%.
  const slice = 1 / n;
  const start = i * slice;
  const end = (i + 1) * slice;
  const fade = slice * 0.25;

  // For first/last scene, no in/out fade on the outer edges.
  const isFirst = i === 0;
  const isLast = i === n - 1;

  const inA = isFirst ? -1 : start - fade * 0.5;
  const inB = isFirst ? start : start + fade;
  const outA = isLast ? end : end - fade;
  const outB = isLast ? 2 : end + fade * 0.5;

  const opacity = useTransform(
    progress,
    [inA, inB, outA, outB],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );

  const y = useTransform(
    progress,
    [inA, inB, outA, outB],
    reduced ? [0, 0, 0, 0] : [24, 0, 0, -24]
  );

  const blurPx = useTransform(
    progress,
    [inA, inB, outA, outB],
    reduced ? [0, 0, 0, 0] : [6, 0, 0, 6]
  );
  const filter = useTransform(blurPx, (v) => `blur(${v}px)`);

  return (
    <motion.div
      style={{ opacity, y, filter }}
      className="absolute inset-0 h-screen w-full overflow-y-auto overscroll-contain"
      aria-hidden={undefined}
    >
      {(scene.index || scene.label) && (
        <div className="container px-4 md:px-8 pt-6 md:pt-10">
          <div className="max-w-6xl mx-auto flex items-center gap-4 text-foreground/45">
            <span className="metric-mono text-xs text-primary">{scene.index}</span>
            <span className="h-px flex-1 bg-primary/20" aria-hidden="true" />
            {scene.label && (
              <span className="eyebrow-mono text-foreground/60">{scene.label}</span>
            )}
            <span className="metric-mono text-xs text-foreground/40">/ {totalLabel}</span>
          </div>
        </div>
      )}
      {scene.node}
    </motion.div>
  );
};
