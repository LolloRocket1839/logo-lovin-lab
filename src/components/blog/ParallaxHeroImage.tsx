import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ParallaxHeroImageProps {
  src: string;
  alt: string;
}

export const ParallaxHeroImage = ({ src, alt }: ParallaxHeroImageProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect - image moves slower than scroll
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 1.05]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0, 0.15]);

  // Smooth spring physics
  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothScale = useSpring(scale, { stiffness: 100, damping: 30 });

  if (prefersReducedMotion) {
    return (
      <div className="aspect-video rounded-xl overflow-hidden mb-12">
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      className="aspect-video rounded-xl overflow-hidden mb-12 relative"
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        style={{ y: smoothY, scale: smoothScale }}
        loading="eager"
        fetchPriority="high"
      />
      {/* Gradient overlay that intensifies on scroll */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent pointer-events-none"
        style={{ opacity: overlayOpacity }}
      />
    </motion.div>
  );
};
