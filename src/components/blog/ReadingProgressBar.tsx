import { useEffect, useState } from "react";

interface ReadingProgressBarProps {
  /** Optional element to measure progress against. Defaults to document scroll. */
  targetRef?: React.RefObject<HTMLElement>;
}

export const ReadingProgressBar = ({ targetRef }: ReadingProgressBarProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const compute = () => {
      const el = targetRef?.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const total = rect.height - window.innerHeight;
        const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
        setProgress(total > 0 ? (scrolled / total) * 100 : 0);
      } else {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
      }
    };
    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [targetRef]);

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] h-[2px] bg-transparent pointer-events-none"
      aria-hidden="true"
    >
      <div
        className="h-full bg-primary transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
