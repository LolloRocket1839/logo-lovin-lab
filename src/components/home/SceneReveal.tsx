import { useEffect, useRef, useState, ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface SceneRevealProps {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "div" | "section" | "article" | "li";
}

/**
 * Lightweight fade-up reveal triggered by IntersectionObserver.
 * 400ms, translateY 12px. Runs once and respects reduced motion.
 */
export const SceneReveal = ({ children, className = "", id, as = "div" }: SceneRevealProps) => {
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
      { threshold: 0.15 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [reduced]);

  const Tag = as as "div";
  return (
    <Tag
      ref={ref as never}
      id={id}
      style={{
        transition: reduced ? "none" : "opacity 400ms ease-out, transform 400ms ease-out",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
      }}
      className={className}
    >
      {children}
    </Tag>
  );
};

export default SceneReveal;
