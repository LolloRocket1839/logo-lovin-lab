import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import translationIT from './locales/it.json';
import translationEN from './locales/en.json';

const resources = {
  it: {
    translation: translationIT
  },
  en: {
    translation: translationEN
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'it',
    supportedLngs: ['it', 'en'],
    debug: false,
    interpolation: {
      escapeValue: false
    },
    detection: {
      // Priority: stored preference > browser/phone settings > default
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Look for language in these navigator properties
      lookupLocalStorage: 'i18nextLng',
      // Cache user's choice
      caches: ['localStorage'],
      // Convert browser locale (e.g., 'en-US') to supported language ('en')
      convertDetectedLanguage: (lng) => {
        // Extract base language code (e.g., 'en-US' -> 'en', 'it-IT' -> 'it')
        const baseLang = lng.split('-')[0].toLowerCase();
        // Only return if it's a supported language, otherwise fallback
        return ['it', 'en'].includes(baseLang) ? baseLang : 'it';
      }
    }
  });

// Update HTML lang attribute when language changes
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
});

// Set initial HTML lang attribute
if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language?.split('-')[0] || 'it';
}

export default i18n;
