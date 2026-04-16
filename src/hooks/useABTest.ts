import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

type CTAType = 'students' | 'investors' | 'sellers' | 'turisti' | 'societa' | 'hero_headline' | 'whatsapp_fab' | 'hero_cta_v2' | 'quiz_position';
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

const AB_RESET_INTERVAL_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

const getVariationForCTA = (ctaType: CTAType): Variation => {
  const storageKey = `ab_test_variation_${ctaType}`;
  const timestampKey = `ab_test_assigned_at_${ctaType}`;
  
  const existingVariation = localStorage.getItem(storageKey) as Variation;
  const assignedAt = localStorage.getItem(timestampKey);
  
  const isExpired = assignedAt && (Date.now() - Number(assignedAt)) > AB_RESET_INTERVAL_MS;
  
  if (!existingVariation || isExpired) {
    // Re-randomize: 50/50 split
    const variation: Variation = Math.random() < 0.5 ? 'A' : 'B';
    localStorage.setItem(storageKey, variation);
    localStorage.setItem(timestampKey, String(Date.now()));
    return variation;
  }
  
  // Backfill timestamp for pre-existing assignments
  if (!assignedAt) {
    localStorage.setItem(timestampKey, String(Date.now()));
  }
  
  return existingVariation;
};

export const useABTest = (ctaType: CTAType): ABTestHook => {
  // Initialize synchronously from localStorage to avoid race with impression tracking
  const [variation] = useState<Variation>(() => {
    if (typeof window === 'undefined') return 'A';
    return getVariationForCTA(ctaType);
  });
  const [impressionTracked, setImpressionTracked] = useState(false);

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
