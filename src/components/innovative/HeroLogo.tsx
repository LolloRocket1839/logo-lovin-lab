import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

export const HeroLogo = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  // Gentle diagonal drift left/up — no scale to keep it crisp
  const x = useTransform(scrollY, [0, 300], ["0px", "calc(-50vw + 3rem)"]);
  const y = useTransform(scrollY, [0, 300], ["0px", "-40vh"]);
  // Fade out early so it's gone before reaching the header logo
  const opacity = useTransform(scrollY, [150, 250], [1, 0]);
  
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
      style={{ 
        x,
        y,
        opacity,
      }}
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
