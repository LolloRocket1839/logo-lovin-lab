import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * ScrollProgressRail
 * A thin progress rail on the right edge that fills as the user
 * scrolls. Replaces section jumps; gives the page a continuous,
 * cinematic feel without competing for attention.
 */
export const ScrollProgressRail = () => {
  const [progress, setProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const onScroll = () => {
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      const p = docH > 0 ? Math.min(1, Math.max(0, window.scrollY / docH)) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="hidden md:flex pointer-events-none fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-3"
    >
      <span className="metric-mono text-[10px] text-foreground/40 rotate-0 tracking-widest">
        {String(Math.round(progress * 100)).padStart(2, "0")}
      </span>
      <div className="relative w-px h-40 lg:h-56 bg-primary/15 overflow-hidden">
        <div
          className="absolute top-0 left-0 w-px bg-primary"
          style={{
            height: `${progress * 100}%`,
            transition: prefersReducedMotion ? "none" : "height 150ms linear",
          }}
        />
      </div>
      <span className="metric-mono text-[10px] text-foreground/40 tracking-widest">
        100
      </span>
    </div>
  );
};
