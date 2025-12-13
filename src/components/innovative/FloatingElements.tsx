import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const FloatingElements = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll();
  
  // Create different parallax speeds for each element
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  
  // Smooth spring physics
  const smoothY1 = useSpring(y1, { stiffness: 50, damping: 20 });
  const smoothY2 = useSpring(y2, { stiffness: 40, damping: 25 });
  const smoothY3 = useSpring(y3, { stiffness: 60, damping: 20 });
  const smoothY4 = useSpring(y4, { stiffness: 45, damping: 22 });

  if (prefersReducedMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {/* Large gradient orb - top left */}
      <motion.div
        style={{ y: smoothY1 }}
        className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full bg-primary/5 blur-[100px]"
      />
      
      {/* Medium gradient orb - right side */}
      <motion.div
        style={{ y: smoothY2 }}
        className="absolute top-1/3 -right-24 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[80px]"
      />
      
      {/* Small accent orb - bottom left */}
      <motion.div
        style={{ y: smoothY3 }}
        className="absolute bottom-1/4 left-1/4 w-[200px] h-[200px] rounded-full bg-amber-500/5 blur-[60px]"
      />
      
      {/* Tiny decorative orb */}
      <motion.div
        style={{ y: smoothY4 }}
        className="absolute top-2/3 right-1/3 w-[150px] h-[150px] rounded-full bg-primary/8 blur-[50px]"
      />

      {/* Geometric shapes */}
      <motion.div
        style={{ y: smoothY2 }}
        className="absolute top-1/2 left-10 w-4 h-4 rotate-45 border border-primary/20"
      />
      
      <motion.div
        style={{ y: smoothY1 }}
        className="absolute top-1/4 right-20 w-6 h-6 rounded-full border border-primary/15"
      />
      
      <motion.div
        style={{ y: smoothY3 }}
        className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-primary/10 rounded-full"
      />
    </div>
  );
};
