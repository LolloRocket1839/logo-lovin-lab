import { useEffect, useRef } from "react";

interface Options {
  threshold?: number; // 0..1 of document scrolled
  enabled?: boolean;
  storageKey?: string; // if set, only fires once per browser session
  delayMs?: number;
}

/**
 * Fires `onTrigger` once when the user has scrolled past `threshold` of the
 * full page height. Optionally suppressed for the rest of the session via
 * sessionStorage.
 */
export const useScrollDepthTrigger = (
  onTrigger: () => void,
  { threshold = 0.6, enabled = true, storageKey, delayMs = 0 }: Options = {}
) => {
  const firedRef = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    if (storageKey && sessionStorage.getItem(storageKey) === "1") {
      firedRef.current = true;
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    const checkScroll = () => {
      if (firedRef.current) return;
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) return;
      const ratio = scrollY / docHeight;
      if (ratio >= threshold) {
        firedRef.current = true;
        if (storageKey) sessionStorage.setItem(storageKey, "1");
        if (delayMs > 0) {
          timeoutId = setTimeout(onTrigger, delayMs);
        } else {
          onTrigger();
        }
        window.removeEventListener("scroll", checkScroll);
      }
    };

    window.addEventListener("scroll", checkScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", checkScroll);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [onTrigger, threshold, enabled, storageKey, delayMs]);
};
