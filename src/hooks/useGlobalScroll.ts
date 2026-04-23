import { useEffect } from 'react';

/**
 * Single global scroll listener. All consumers share one rAF-throttled
 * callback dispatch instead of registering their own scroll handlers.
 *
 * Usage:
 *   useGlobalScroll((scrollY) => { ... });
 */

type Subscriber = (scrollY: number) => void;

const subscribers = new Set<Subscriber>();
let initialized = false;
let ticking = false;

const dispatch = () => {
  const y = window.scrollY || document.documentElement.scrollTop || 0;
  subscribers.forEach((cb) => {
    try { cb(y); } catch { /* swallow per-subscriber errors */ }
  });
};

const onScroll = () => {
  if (ticking) return;
  ticking = true;
  window.requestAnimationFrame(() => {
    ticking = false;
    dispatch();
  });
};

const ensureInit = () => {
  if (initialized || typeof window === 'undefined') return;
  initialized = true;
  window.addEventListener('scroll', onScroll, { passive: true });
};

export const useGlobalScroll = (callback: Subscriber) => {
  useEffect(() => {
    ensureInit();
    subscribers.add(callback);
    // Fire once with current scroll so consumers can sync state on mount
    callback(window.scrollY || 0);
    return () => {
      subscribers.delete(callback);
    };
  }, [callback]);
};

export const getCurrentScrollY = (): number =>
  typeof window !== 'undefined' ? window.scrollY || 0 : 0;
