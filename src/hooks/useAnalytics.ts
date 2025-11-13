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

const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('analytics_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('analytics_session_id', sessionId);
  }
  return sessionId;
};

const trackEvent = async (event: AnalyticsEvent) => {
  try {
    await supabase.from('analytics_events').insert({
      session_id: getSessionId(),
      event_type: event.event_type,
      page_url: event.page_url,
      page_title: event.page_title || document.title,
      referrer: event.referrer || document.referrer,
      user_agent: navigator.userAgent,
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
