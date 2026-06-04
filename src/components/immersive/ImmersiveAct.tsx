import { ReactNode, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface ImmersiveActProps {
  children: ReactNode;
  /** Numbered act position, e.g. "02" */
  index?: string;
  /** Short act label shown next to the index */
  label?: string;
  /** Total acts, e.g. "05" */
  total?: string;
  /** id for anchor scrolling */
  id?: string;
  className?: string;
}

/**
 * ImmersiveAct
 * Wraps a page section in the scroll-driven narrative spine.
 * - Fade-up + soft translate on viewport entry (once)
 * - Numbered eyebrow ("02 — Investitori / 05") for editorial pacing
 * - Respects prefers-reduced-motion
 */
export const ImmersiveAct = ({
  children,
  index,
  label,
  total,
  id,
  className = "",
}: ImmersiveActProps) => {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.08 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [prefersReducedMotion]);

  return (
    <section
      ref={ref}
      id={id}
      className={`relative ${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: prefersReducedMotion
          ? "none"
          : "opacity 700ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1)",
      }}
    >
      {(index || label) && (
        <div className="container px-4 md:px-8 pt-10 md:pt-14">
          <div className="max-w-6xl mx-auto flex items-center gap-4 text-foreground/45">
            <span className="metric-mono text-xs text-primary">{index}</span>
            <span className="h-px flex-1 bg-primary/20" aria-hidden="true" />
            {label && (
              <span className="eyebrow-mono text-foreground/60">{label}</span>
            )}
            {total && (
              <span className="metric-mono text-xs text-foreground/40">
                / {total}
              </span>
            )}
          </div>
        </div>
      )}
      {children}
    </section>
  );
};
