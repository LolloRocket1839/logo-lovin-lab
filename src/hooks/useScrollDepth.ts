import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from './useAnalytics';

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

  useEffect(() => {
    // Reset tracking on page change
    scrollDepthRef.current = {
      '25': false,
      '50': false,
      '75': false,
      '100': false,
    };
    maxScrollRef.current = 0;

    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const windowHeight = window.innerHeight;
          const documentHeight = document.documentElement.scrollHeight;
          const scrollTop = window.scrollY || document.documentElement.scrollTop;
          
          // Calculate scroll percentage
          const scrollableHeight = documentHeight - windowHeight;
          const scrollPercentage = scrollableHeight > 0 
            ? Math.min((scrollTop / scrollableHeight) * 100, 100)
            : 100;

          // Update max scroll
          maxScrollRef.current = Math.max(maxScrollRef.current, scrollPercentage);

          // Track milestones
          const milestones: Array<keyof ScrollDepthTracking> = ['25', '50', '75', '100'];
          
          milestones.forEach((milestone) => {
            const milestoneValue = parseInt(milestone);
            if (
              scrollPercentage >= milestoneValue &&
              !scrollDepthRef.current[milestone]
            ) {
              scrollDepthRef.current[milestone] = true;
              trackEvent('scroll_depth', {
                depth: milestone,
                page_path: location.pathname,
                max_scroll: Math.round(maxScrollRef.current),
              });
            }
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    // Track initial page view with 0% scroll
    trackEvent('scroll_depth', {
      depth: '0',
      page_path: location.pathname,
      max_scroll: 0,
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    // Track max scroll on page leave
    const handleBeforeUnload = () => {
      if (maxScrollRef.current > 0) {
        trackEvent('page_exit_scroll', {
          max_scroll: Math.round(maxScrollRef.current),
          page_path: location.pathname,
        });
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      
      // Track final scroll depth on component unmount (page navigation)
      if (maxScrollRef.current > 0) {
        trackEvent('page_navigation_scroll', {
          max_scroll: Math.round(maxScrollRef.current),
          page_path: location.pathname,
        });
      }
    };
  }, [location, trackEvent]);
};
