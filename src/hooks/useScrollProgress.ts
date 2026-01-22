import { useState, useEffect, RefObject } from "react";

/**
 * Custom hook to track scroll progress of an element.
 * Uses IntersectionObserver as a fallback for browsers without CSS scroll-timeline support.
 * Returns a value from 0 to 1 representing how much of the element is visible.
 */
export const useScrollProgress = (ref: RefObject<HTMLElement>) => {
  const [progress, setProgress] = useState(0);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const thresholds = Array.from({ length: 21 }, (_, i) => i * 0.05);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsInView(entry.isIntersecting);
          if (entry.isIntersecting) {
            setProgress(entry.intersectionRatio);
          }
        });
      },
      { threshold: thresholds }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref]);

  return { progress, isInView };
};

/**
 * Hook to track if an element has been seen (one-time trigger).
 * Useful for materialize animations that should only play once.
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

/**
 * Hook to track staggered visibility for multiple items.
 * Returns an array of booleans for each item index.
 */
export const useStaggeredVisibility = (
  containerRef: RefObject<HTMLElement>,
  itemCount: number,
  staggerDelay = 100
) => {
  const [visibleItems, setVisibleItems] = useState<boolean[]>(
    Array(itemCount).fill(false)
  );
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (!containerRef.current || triggered) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !triggered) {
            setTriggered(true);
            
            // Stagger the visibility of each item
            for (let i = 0; i < itemCount; i++) {
              setTimeout(() => {
                setVisibleItems((prev) => {
                  const newState = [...prev];
                  newState[i] = true;
                  return newState;
                });
              }, i * staggerDelay);
            }
            
            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, [containerRef, itemCount, staggerDelay, triggered]);

  return visibleItems;
};
