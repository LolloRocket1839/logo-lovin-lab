import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * BrandWordmark
 * Oversized parallax wordmark behind the page. Establishes
 * the "continuous canvas" feel without competing with content.
 * Fixed-position, very low opacity, scroll-bound translate.
 */
export const BrandWordmark = ({ word = "TORINO" }: { word?: string }) => {
  const prefersReducedMotion = useReducedMotion();
  const [y, setY] = useState(0);

  useEffect(() => {
    if (prefersReducedMotion) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        // Slow upward parallax
        setY(window.scrollY * -0.08);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [prefersReducedMotion]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden flex items-center justify-center select-none"
    >
      <span
        className="font-display font-extrabold tracking-tighter text-primary whitespace-nowrap leading-none"
        style={{
          fontSize: "clamp(18rem, 38vw, 44rem)",
          opacity: 0.04,
          transform: `translate3d(0, ${y}px, 0)`,
          willChange: "transform",
        }}
      >
        {word}
      </span>
    </div>
  );
};
