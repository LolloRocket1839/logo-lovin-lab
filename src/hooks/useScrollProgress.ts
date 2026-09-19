import { useState, useEffect, RefObject } from "react";

/**
 * Hook to track if an element has been seen (one-time trigger).
 * Useful for fade-up animations that should only play once.
 */
export const useHasBeenSeen = (ref: RefObject<HTMLElement>, threshold = 0.2) => {
  const [hasBeenSeen, setHasBeenSeen] = useState(false);

  useEffect(() => {
    if (!ref.current || hasBeenSeen) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasBeenSeen) {
            setHasBeenSeen(true);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref, hasBeenSeen, threshold]);

  return hasBeenSeen;
};
