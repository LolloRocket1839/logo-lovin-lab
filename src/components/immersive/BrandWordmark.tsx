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
  // Mount the decorative wordmark only after the first paint so it is never
  // picked as the Largest Contentful Paint element (it's a huge 4%-opacity span).
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & { requestIdleCallback?: (cb: () => void) => number; cancelIdleCallback?: (id: number) => void };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true));
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setReady(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

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

  if (!ready) return null;

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
