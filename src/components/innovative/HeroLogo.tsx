import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

export const HeroLogo = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();

  // Sequential: x moves first, y follows with overlap
  const rawX = useTransform(scrollY, [0, 200], ["0px", "calc(-50vw + 3rem)"]);
  const rawY = useTransform(scrollY, [100, 300], ["0px", "-40vh"]);
  // Fade out mid-journey, well before header logo area
  const opacity = useTransform(scrollY, [120, 220], [1, 0]);

  // Physics-based smoothing for organic feel
  const springConfig = { stiffness: 120, damping: 30, mass: 0.8 };
  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);

  if (prefersReducedMotion) {
    return (
      <div className="flex justify-center items-center mb-4 w-full">
        <img
          src={jungleRentLogo}
          alt="Jungle Rent"
          width={160}
          height={160}
          className="w-20 h-20 md:w-40 md:h-40 mx-auto block"
          fetchPriority="high"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <motion.div 
      className="flex justify-center items-center mb-4 w-full"
      style={{ x, y, opacity }}
    >
      <motion.img
        src={jungleRentLogo}
        alt="Jungle Rent"
        width={160}
        height={160}
        className="w-20 h-20 md:w-40 md:h-40 mx-auto block"
        fetchPriority="high"
        decoding="async"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
    </motion.div>
  );
};