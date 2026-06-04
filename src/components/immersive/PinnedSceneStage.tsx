import { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Scene {
  id: string;
  node: ReactNode;
  index?: string;
  label?: string;
}

interface PinnedSceneStageProps {
  scenes: Scene[];
  /** Total height in vh per scene. Default 60. */
  vhPerScene?: number;
  total?: string;
}

/**
 * PinnedSceneStage
 * Pinned single-viewport canvas. A tall spacer drives scroll, scenes
 * cross-fade in place via GPU-composited opacity + transform.
 */
export const PinnedSceneStage = ({
  scenes,
  vhPerScene = 60,
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
  const slice = 1 / n;
  const start = i * slice;
  const end = (i + 1) * slice;
  // Short transition window (~12% of a slice) for snappy changes.
  const fade = slice * 0.12;

  const isFirst = i === 0;
  const isLast = i === n - 1;

  const inA = isFirst ? -1 : start - fade;
  const inB = isFirst ? start : start + fade;
  const outA = isLast ? end : end - fade;
  const outB = isLast ? 2 : end + fade;

  const opacity = useTransform(
    progress,
    [inA, inB, outA, outB],
    [isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0]
  );

  const y = useTransform(
    progress,
    [inA, inB, outA, outB],
    reduced ? [0, 0, 0, 0] : [16, 0, 0, -16]
  );

  const scale = useTransform(
    progress,
    [inA, inB, outA, outB],
    reduced ? [1, 1, 1, 1] : [1.015, 1, 1, 0.985]
  );

  return (
    <motion.div
      style={{
        opacity,
        y,
        scale,
        willChange: "transform, opacity",
      }}
      className="absolute inset-0 h-screen w-full pointer-events-auto"
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
