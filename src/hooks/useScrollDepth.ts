import { useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from './useAnalytics';
import { useGlobalScroll } from './useGlobalScroll';

interface ScrollDepthTracking {
  '25': boolean;
  '50': boolean;
  '75': boolean;
  '100': boolean;
}

export const useScrollDepth = () => {
  const location = useLocation();
  const { trackEvent } = useAnalytics();
  const scrollDepthRef = useRef<ScrollDepthTracking>({
    '25': false,
    '50': false,
    '75': false,
    '100': false,
  });
  const maxScrollRef = useRef<number>(0);

  // Reset milestones whenever the route changes
  useEffect(() => {
    scrollDepthRef.current = { '25': false, '50': false, '75': false, '100': false };
    maxScrollRef.current = 0;
  }, [location.pathname]);

  const onScroll = useCallback((scrollTop: number) => {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollableHeight = documentHeight - windowHeight;
    const scrollPercentage = scrollableHeight > 0
      ? Math.min((scrollTop / scrollableHeight) * 100, 100)
      : 100;

    if (scrollPercentage > maxScrollRef.current) {
      maxScrollRef.current = scrollPercentage;
    }

    const milestones: Array<keyof ScrollDepthTracking> = ['25', '50', '75', '100'];
    for (const milestone of milestones) {
      const value = parseInt(milestone);
      if (scrollPercentage >= value && !scrollDepthRef.current[milestone]) {
        scrollDepthRef.current[milestone] = true;
        trackEvent('scroll_depth', {
          depth: milestone,
          page_path: location.pathname,
          max_scroll: Math.round(maxScrollRef.current),
        });
      }
    }
  }, [location.pathname, trackEvent]);

  useGlobalScroll(onScroll);

  // Emit final depth on route change / unmount
  useEffect(() => {
    return () => {
      if (maxScrollRef.current > 0) {
        trackEvent('page_navigation_scroll', {
          max_scroll: Math.round(maxScrollRef.current),
          page_path: location.pathname,
        });
      }
    };
  }, [location.pathname, trackEvent]);
};
