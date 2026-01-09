import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

export const HeroLogo = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  // Transform values based on scroll
  // Logo starts large and centered, then shrinks and moves to navbar position
  const scale = useTransform(scrollY, [0, 300], [1, 0.4]);
  const opacity = useTransform(scrollY, [0, 200], [1, 0]);
  const y = useTransform(scrollY, [0, 300], [0, -100]);
  
  if (prefersReducedMotion) {
    return (
      <div className="flex justify-center items-center mb-6 w-full">
        <img
          src={jungleRentLogo}
          alt="Jungle Rent"
          className="w-20 h-20 md:w-32 md:h-32 mx-auto block"
        />
      </div>
    );
  }

  return (
    <motion.div 
      className="flex justify-center items-center mb-6 w-full"
      style={{ 
        scale,
        opacity,
        y,
      }}
    >
      <motion.img
        src={jungleRentLogo}
        alt="Jungle Rent"
        className="w-20 h-20 md:w-32 md:h-32 mx-auto block"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </motion.div>
  );
};
