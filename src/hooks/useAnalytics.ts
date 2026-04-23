import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { hasAnalyticsConsent } from './useCookieConsent';

interface AnalyticsEvent {
  event_type: string;
  page_url: string;
  page_title?: string;
  referrer?: string;
  user_agent?: string;
  metadata?: Record<string, any>;
}

// ---- Cached identity (computed once per session) ----------------------------

let cachedSessionId: string | null = null;
let sessionIdPromise: Promise<string> | null = null;
let cachedUserAgent: string | null = null;
let cachedReferrer: string | null = null;
let botResult: boolean | null = null;

const hashSessionId = async (input: string): Promise<string> => {
  const encoder = new TextEncoder();
  const data = encoder.encode(input);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('').substring(0, 16);
};

const getAnonymizedSessionId = (): Promise<string> => {
  if (cachedSessionId) return Promise.resolve(cachedSessionId);
  if (sessionIdPromise) return sessionIdPromise;

  sessionIdPromise = (async () => {
    let sessionId = sessionStorage.getItem('analytics_session_hash');
    if (!sessionId) {
      const rawId = `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionId = await hashSessionId(rawId);
      sessionStorage.setItem('analytics_session_hash', sessionId);
    }
    cachedSessionId = sessionId;
    return sessionId;
  })();

  return sessionIdPromise;
};

const getAnonymizedUserAgent = (): string => {
  if (cachedUserAgent) return cachedUserAgent;
  const ua = navigator.userAgent;
  let browser = 'Unknown';
  let os = 'Unknown';
  if (ua.includes('Firefox')) browser = 'Firefox';
  else if (ua.includes('Edg')) browser = 'Edge';
  else if (ua.includes('Chrome')) browser = 'Chrome';
  else if (ua.includes('Safari')) browser = 'Safari';
  if (ua.includes('Windows')) os = 'Windows';
  else if (ua.includes('Mac')) os = 'macOS';
  else if (ua.includes('Linux')) os = 'Linux';
  else if (ua.includes('Android')) os = 'Android';
  else if (ua.includes('iPhone') || ua.includes('iPad')) os = 'iOS';
  const isMobile = /Mobile|Android|iPhone|iPad/.test(ua);
  cachedUserAgent = `${browser}/${os}/${isMobile ? 'Mobile' : 'Desktop'}`;
  return cachedUserAgent;
};

const getAnonymizedReferrer = (): string => {
  if (cachedReferrer !== null) return cachedReferrer;
  const referrer = document.referrer;
  if (!referrer) {
    cachedReferrer = '';
    return cachedReferrer;
  }
  try {
    cachedReferrer = new URL(referrer).hostname;
  } catch {
    cachedReferrer = '';
  }
  return cachedReferrer;
};

const getAnonymizedPageUrl = (): string => {
  try {
    const url = new URL(window.location.href);
    return `${url.origin}${url.pathname}`;
  } catch {
    return window.location.pathname;
  }
};

const isLikelyBot = (): boolean => {
  if (botResult !== null) return botResult;
  const ua = navigator.userAgent.toLowerCase();
  const botPatterns = [
    'bot', 'spider', 'crawl', 'slurp', 'mediapartners',
    'headless', 'headlesschrome', 'phantom', 'selenium', 'puppeteer', 'playwright',
    'lighthouse', 'pingdom', 'pagespeed', 'gtmetrix', 'bytespider', 'yandex',
    'baidu', 'sogou', 'semrush', 'ahrefs', 'mj12bot', 'dotbot',
    'petalbot', 'dataforseo', 'gptbot', 'claudebot', 'perplexitybot',
    'python-requests', 'go-http-client', 'okhttp', 'curl/', 'wget/',
    'http_request', 'axios', 'node-fetch', 'java/', 'apache-httpclient',
  ];
  if ((navigator as any).webdriver === true) { botResult = true; return true; }
  if (!navigator.languages?.length) { botResult = true; return true; }
  if (botPatterns.some(p => ua.includes(p))) { botResult = true; return true; }
  try {
    const langs = navigator.languages.map(l => l.toLowerCase());
    const hasLatinLang = langs.some(l =>
      l.startsWith('it') || l.startsWith('en') || l.startsWith('de') ||
      l.startsWith('fr') || l.startsWith('es') || l.startsWith('sv') ||
      l.startsWith('pt') || l.startsWith('nl')
    );
    if (!hasLatinLang) {
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      if (tz.startsWith('Asia/') && !tz.includes('Jerusalem') && !tz.includes('Istanbul')) {
        botResult = true;
        return true;
      }
    }
  } catch { /* ignore */ }
  botResult = false;
  return false;
};

// ---- Event batching ---------------------------------------------------------

interface QueuedEvent {
  session_id: string;
  event_type: string;
  page_url: string;
  page_title: string;
  referrer: string;
  user_agent: string;
  metadata?: Record<string, any>;
  ts: number;
}

const queue: QueuedEvent[] = [];
let flushTimer: ReturnType<typeof setTimeout> | null = null;
const FLUSH_INTERVAL_MS = 5000;
const MAX_QUEUE_SIZE = 20;

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const sendBatch = (events: QueuedEvent[], useBeacon = false) => {
  if (!events.length) return;
  // Backend currently accepts a single event per call; send sequentially but
  // detached from UI. Prefer sendBeacon on unload so the browser doesn't block.
  const url = `${SUPABASE_URL}/functions/v1/track-analytics`;
  const headers = {
    'Content-Type': 'application/json',
    'apikey': SUPABASE_ANON_KEY,
    'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
  };
  for (const ev of events) {
    const body = JSON.stringify({
      session_id: ev.session_id,
      event_type: ev.event_type,
      page_url: ev.page_url,
      page_title: ev.page_title,
      referrer: ev.referrer,
      user_agent: ev.user_agent,
      metadata: ev.metadata,
    });
    if (useBeacon && 'sendBeacon' in navigator) {
      try {
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(url, blob);
        continue;
      } catch { /* fall through to fetch */ }
    }
    // Fire-and-forget fetch with keepalive so navigation doesn't kill it
    fetch(url, { method: 'POST', headers, body, keepalive: true }).catch(() => {});
  }
};

const flush = (useBeacon = false) => {
  if (flushTimer) {
    clearTimeout(flushTimer);
    flushTimer = null;
  }
  if (!queue.length) return;
  const batch = queue.splice(0, queue.length);
  sendBatch(batch, useBeacon);
};

const scheduleFlush = () => {
  if (flushTimer) return;
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flush(false);
  }, FLUSH_INTERVAL_MS);
};

// Flush on tab hide / unload
if (typeof window !== 'undefined') {
  const onHide = () => flush(true);
  window.addEventListener('pagehide', onHide);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') onHide();
  });
}

const enqueue = async (event: AnalyticsEvent) => {
  if (!hasAnalyticsConsent() || isLikelyBot()) return;
  try {
    const sessionId = await getAnonymizedSessionId();
    queue.push({
      session_id: sessionId,
      event_type: event.event_type,
      page_url: getAnonymizedPageUrl(),
      page_title: event.page_title || document.title,
      referrer: getAnonymizedReferrer(),
      user_agent: getAnonymizedUserAgent(),
      metadata: event.metadata,
      ts: Date.now(),
    });
    if (queue.length >= MAX_QUEUE_SIZE) {
      flush(false);
    } else {
      scheduleFlush();
    }
  } catch (error) {
    console.debug('Analytics queue error:', error);
  }
};

// Backward-compatible alias (used in a couple of callers indirectly)
const trackEvent = enqueue;

export const usePageViewTracking = () => {
  const location = useLocation();

  useEffect(() => {
    enqueue({
      event_type: 'page_view',
      page_url: window.location.href,
      page_title: document.title,
    });
  }, [location]);
};

export const useAnalytics = () => {
  return {
    trackEvent: (eventType: string, metadata?: Record<string, any>) => {
      enqueue({
        event_type: eventType,
        page_url: window.location.href,
        metadata,
      });
    },
    trackClick: (elementName: string, metadata?: Record<string, any>) => {
      enqueue({
        event_type: 'click',
        page_url: window.location.href,
        metadata: { element: elementName, ...metadata },
      });
    },
    trackFormSubmit: (formName: string, metadata?: Record<string, any>) => {
      enqueue({
        event_type: 'form_submit',
        page_url: window.location.href,
        metadata: { form: formName, ...metadata },
      });
    },
  };
};

// Keep supabase import referenced (avoid tree-shaking surprises if other code
// re-exports). It's intentionally not used here now that we POST directly.
void supabase;
