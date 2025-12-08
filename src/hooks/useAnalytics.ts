import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface AnalyticsEvent {
  event_type: string;
  page_url: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
}

/**
 * Generates a privacy-preserving hashed session ID using Web Crypto API.
 * The hash ensures session IDs cannot be correlated with PII.
 */
const hashSessionId = async (input: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
};

/**
 * Gets or creates an anonymized session ID.
 * Session IDs are hashed before storage to prevent correlation with PII.
 */
const getAnonymizedSessionId = async (): Promise<string> => {
  let sessionId = sessionStorage.getItem('analytics_session_hash');
  if (!sessionId) {
    const rawId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionId = await hashSessionId(rawId);
    sessionStorage.setItem('analytics_session_hash', sessionId);
  }
  return sessionId;
};

/**
 * Anonymizes user agent string to prevent browser fingerprinting.
 * Only extracts essential browser/OS info without revealing specific version details.
 */
const getAnonymizedUserAgent = (): string => {
  const ua = navigator.userAgent;
  
  // Extract only browser family and OS family, no version details
  let browser = 'Unknown';
  let os = 'Unknown';
  
  // Detect browser family
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  
  // Detect OS family
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  
  // Detect device type
  const isMobile = /Mobile|Android|iPhone|iPad/.test(ua);
  
  return `${browser}/${os}/${isMobile ? 'Mobile' : 'Desktop'}`;
};

/**
 * Anonymizes referrer URL to remove potential PII (query params, paths with IDs).
 * Only stores the domain for aggregate analytics.
 */
const getAnonymizedReferrer = (): string => {
  const referrer = document.referrer;
  if (!referrer) return '';
  
  try {
    const url = new URL(referrer);
    // Only return hostname, strip path and query params that might contain PII
    return url.hostname;
  } catch {
    return '';
  }
};

/**
 * Anonymizes page URL by stripping query parameters that might contain PII.
 */
const getAnonymizedPageUrl = (): string => {
  try {
    const url = new URL(window.location.href);
    // Keep only origin + pathname, remove query params and hash
    return `${url.origin}${url.pathname}`;
  } catch {
    return window.location.pathname;
  }
};

const trackEvent = async (event: AnalyticsEvent) => {
  try {
    const sessionId = await getAnonymizedSessionId();
    
    await supabase.from('analytics_events').insert({
      session_id: sessionId,
      event_type: event.event_type,
      page_url: getAnonymizedPageUrl(),
      page_title: event.page_title || document.title,
      referrer: getAnonymizedReferrer(),
      user_agent: getAnonymizedUserAgent(),
      metadata: event.metadata,
    });
  } catch (error) {
    // Silently fail - don't break user experience for analytics
    console.debug('Analytics tracking error:', error);
  }
};

export const usePageViewTracking = () => {
  const location = useLocation();

  useEffect(() => {
    trackEvent({
      event_type: 'page_view',
      page_url: window.location.href,
      page_title: document.title,
    });
  }, [location]);
};

export const useAnalytics = () => {
  return {
    trackEvent: (eventType: string, metadata?: Record<string, any>) => {
      trackEvent({
        event_type: eventType,
        page_url: window.location.href,
        metadata,
      });
    },
    trackClick: (elementName: string, metadata?: Record<string, any>) => {
      trackEvent({
        event_type: 'click',
        page_url: window.location.href,
        metadata: { element: elementName, ...metadata },
      });
    },
    trackFormSubmit: (formName: string, metadata?: Record<string, any>) => {
      trackEvent({
        event_type: 'form_submit',
        page_url: window.location.href,
        metadata: { form: formName, ...metadata },
      });
    },
  };
};
