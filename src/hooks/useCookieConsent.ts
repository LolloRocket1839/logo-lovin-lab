import { useState, useCallback, useEffect } from 'react';

export type ConsentStatus = 'pending' | 'accepted' | 'rejected';

const CONSENT_KEY = 'junglerent_cookie_consent';

export const useCookieConsent = () => {
  const [consent, setConsent] = useState<ConsentStatus>(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored === 'accepted' || stored === 'rejected') return stored;
    } catch {}
    return 'pending';
  });

  const acceptCookies = useCallback(() => {
    setConsent('accepted');
    try { localStorage.setItem(CONSENT_KEY, 'accepted'); } catch {}
  }, []);

  const rejectCookies = useCallback(() => {
    setConsent('rejected');
    try { localStorage.setItem(CONSENT_KEY, 'rejected'); } catch {}
  }, []);

  return { consent, acceptCookies, rejectCookies, isConsentGiven: consent !== 'pending' };
};

/** Standalone check — use outside React */
export const hasAnalyticsConsent = (): boolean => {
  try {
    return localStorage.getItem(CONSENT_KEY) === 'accepted';
  } catch {
    return false;
  }
};
