import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SmoothScrollProviderProps {
  children: ReactNode;
}

export const SmoothScrollProvider = ({ children }: SmoothScrollProviderProps) => {
  const lenisRef = useRef<Lenis | null>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    // Don't enable smooth scroll if user prefers reduced motion
    if (prefersReducedMotion) return;

    // Initialize Lenis for smooth scrolling
    lenisRef.current = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      touchMultiplier: 2,
    });

    // Animation frame loop
    function raf(time: number) {
      lenisRef.current?.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Cleanup
    return () => {
      lenisRef.current?.destroy();
    };
  }, [prefersReducedMotion]);

  return <>{children}</>;
};

// Hook to access Lenis instance for programmatic scrolling
export const useSmoothScroll = () => {
  return {
    scrollTo: (target: string | number | HTMLElement, options?: { offset?: number; duration?: number }) => {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(target, options);
      } else {
        // Fallback for when Lenis isn't available
        if (typeof target === 'string') {
          document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }
  };
};
