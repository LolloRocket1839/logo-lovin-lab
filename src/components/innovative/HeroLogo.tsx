import { motion, useScroll, useTransform } from "framer-motion";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

export const HeroLogo = () => {
  const prefersReducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  
  // Logo travels from center to top-left header position
  const scale = useTransform(scrollY, [0, 250], [1, 0.35]);
  // Move left: from center toward left edge (approx -50vw + 2rem padding + half logo)
  const x = useTransform(scrollY, [0, 250], ["0px", "calc(-50vw + 3rem)"]);
  // Move up toward the top of the viewport
  const y = useTransform(scrollY, [0, 250], ["0px", "-40vh"]);
  // Stay visible throughout, fade only at the very end for handoff
  const opacity = useTransform(scrollY, [0, 220, 250], [1, 1, 0]);
  
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
        scale,
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
