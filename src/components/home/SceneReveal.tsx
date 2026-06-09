import { useEffect, useRef, useState, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SceneRevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "article";
}

/**
 * Lightweight fade-up reveal triggered by IntersectionObserver.
 * 300ms, translateY 12px. Respects reduced motion.
 */
export const SceneReveal = ({ children, delay = 0, className = "", as = "div" }: SceneRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setVisible(true);
      return;
    }
    const node = ref.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "-15% 0px -10% 0px", threshold: 0.01 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as never}
      style={{
        transition: reduced ? "none" : "opacity 300ms ease-out, transform 300ms ease-out",
        transitionDelay: `${delay}ms`,
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        willChange: "opacity, transform",
      }}
      className={className}
    >
      {children}
    </Tag>
  );
};

export default SceneReveal;
