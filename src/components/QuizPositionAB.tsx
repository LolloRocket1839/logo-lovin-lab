import { useEffect, ReactNode } from "react";
import { useABTest } from "@/hooks/useABTest";

interface QuizPositionABProps {
  /** Render slot — only renders if current variation matches `showOn` */
  showOn: "A" | "B";
  children: ReactNode;
}

/**
 * Wrapper for the `quiz_position` A/B test.
 *  - Variation A: quiz appears AFTER HowItWorks (current behavior)
 *  - Variation B: quiz appears IMMEDIATELY after the hero
 *
 * Place two instances on the page — one with showOn="A" in the original spot
 * and one with showOn="B" right after the hero. Only the matching one renders.
 * The first mounted instance fires the impression.
 */
export const QuizPositionAB = ({ showOn, children }: QuizPositionABProps) => {
  const { variation, trackImpression } = useABTest("quiz_position");

  useEffect(() => {
    // Track impression once when the active variant mounts
    if (variation === showOn) {
      trackImpression();
    }
  }, [variation, showOn, trackImpression]);

  if (variation !== showOn) return null;
  return <>{children}</>;
};
