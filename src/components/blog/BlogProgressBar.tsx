import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const BlogProgressBar = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  
  // Smooth spring animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Hide at start (0%) and end (100%)
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.02, 0.95, 1],
    [0, 1, 1, 0]
  );

  if (prefersReducedMotion) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-16 left-0 right-0 h-[2px] z-40 origin-left bg-gradient-to-r from-primary via-primary to-primary/70"
      style={{ scaleX, opacity }}
      aria-hidden="true"
    />
  );
};
