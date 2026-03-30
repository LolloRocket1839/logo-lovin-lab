import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

type CTAType = 'students' | 'investors' | 'sellers' | 'turisti' | 'societa' | 'hero_headline' | 'whatsapp_fab';
type Variation = 'A' | 'B';

interface ABTestHook {
  variation: Variation;
  trackImpression: () => void;
  trackClick: () => void;
}

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('ab_test_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('ab_test_session_id', sessionId);
  }
  return sessionId;
};

const getVariationForCTA = (ctaType: CTAType): Variation => {
  const storageKey = `ab_test_variation_${ctaType}`;
  let variation = localStorage.getItem(storageKey) as Variation;
  
  if (!variation) {
    // 50/50 split between A and B
    variation = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem(storageKey, variation);
  }
  
  return variation;
};

export const useABTest = (ctaType: CTAType): ABTestHook => {
  const [variation, setVariation] = useState<Variation>('A');
  const [impressionTracked, setImpressionTracked] = useState(false);

  useEffect(() => {
    const selectedVariation = getVariationForCTA(ctaType);
    setVariation(selectedVariation);
  }, [ctaType]);

  const trackEvent = async (eventType: 'impression' | 'click') => {
    try {
      // Use edge function with rate limiting instead of direct insert
      await supabase.functions.invoke('track-ab-test', {
        body: {
          cta_type: ctaType,
          variation,
          event_type: eventType,
          session_id: getSessionId(),
          user_agent: navigator.userAgent,
          page_url: window.location.href
        }
      });
    } catch (error) {
      console.debug('Error tracking A/B test event:', error);
    }
  };

  const trackImpression = () => {
    if (!impressionTracked) {
      trackEvent('impression');
      setImpressionTracked(true);
    }
  };

  const trackClick = () => {
    trackEvent('click');
  };

  return { variation, trackImpression, trackClick };
};
