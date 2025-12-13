import { useEffect } from 'react';

export interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

const UTM_STORAGE_KEY = 'junglerent_utm_params';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'] as const;

/**
 * Reads UTM parameters from URL and stores them in sessionStorage.
 * Parameters persist during navigation so they're available when the user submits a form.
 */
export const useUTMTracking = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams: UTMParams = {};
    
    let hasUTM = false;
    UTM_KEYS.forEach((key) => {
      const value = urlParams.get(key);
      if (value) {
        utmParams[key] = value;
        hasUTM = true;
      }
    });

    // Only save if we found UTM params (don't overwrite existing ones if no new ones)
    if (hasUTM) {
      sessionStorage.setItem(UTM_STORAGE_KEY, JSON.stringify(utmParams));
    }
  }, []);
};

/**
 * Retrieves stored UTM parameters from sessionStorage.
 * Call this in form submissions to include UTM data.
 */
export const getUTMParams = (): UTMParams => {
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.warn('Failed to parse UTM params:', e);
  }
  return {};
};

/**
 * Formats UTM params for display in email notifications.
 * Returns empty string if no UTM params present.
 */
export const formatUTMForEmail = (params: UTMParams): string => {
  const parts: string[] = [];
  
  if (params.utm_source) parts.push(`📊 Fonte: ${params.utm_source}`);
  if (params.utm_medium) parts.push(`🎯 Medium: ${params.utm_medium}`);
  if (params.utm_campaign) parts.push(`📣 Campagna: ${params.utm_campaign}`);
  if (params.utm_content) parts.push(`📝 Content: ${params.utm_content}`);
  if (params.utm_term) parts.push(`🔍 Term: ${params.utm_term}`);
  
  return parts.length > 0 ? `\n---\n${parts.join('\n')}` : '';
};
