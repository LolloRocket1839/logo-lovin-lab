import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Eager-load only Italian (default + fallback). Other locales are loaded on
// demand the first time they're requested. This shaves ~6 large JSON blobs
// (≈ several hundred KB gzipped) off the initial bundle.
import translationIT from './locales/it.json';

const supportedLanguages = ['it', 'en', 'es', 'fr', 'de', 'zh', 'sv'];

const lazyLoaders: Record<string, () => Promise<{ default: any }>> = {
  en: () => import('./locales/en.json'),
  es: () => import('./locales/es.json'),
  fr: () => import('./locales/fr.json'),
  de: () => import('./locales/de.json'),
  zh: () => import('./locales/zh.json'),
  sv: () => import('./locales/sv.json'),
};

const loadedLanguages = new Set<string>(['it']);

const ensureLanguageLoaded = async (lng: string): Promise<void> => {
  const base = lng?.split('-')[0]?.toLowerCase() || 'it';
  if (loadedLanguages.has(base)) return;
  const loader = lazyLoaders[base];
  if (!loader) return;
  try {
    const mod = await loader();
    i18n.addResourceBundle(base, 'translation', mod.default, true, true);
    loadedLanguages.add(base);
  } catch (err) {
    console.warn(`Failed to load locale "${base}":`, err);
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      it: { translation: translationIT },
    },
    fallbackLng: 'it',
    supportedLngs: supportedLanguages,
    debug: false,
    partialBundledLanguages: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      lookupLocalStorage: 'i18nextLng',
      caches: ['localStorage'],
      convertDetectedLanguage: (lng) => {
        const baseLang = lng.split('-')[0].toLowerCase();
        return supportedLanguages.includes(baseLang) ? baseLang : 'it';
      },
    },
  })
  .then(async () => {
    // Load detected language if it's not Italian, then force a re-render by
    // re-applying changeLanguage so react-i18next picks up the new bundle.
    const current = i18n.language?.split('-')[0]?.toLowerCase();
    if (current && current !== 'it') {
      await ensureLanguageLoaded(current);
      await i18n.changeLanguage(current);
    }
  });


// Load on demand whenever the user switches language
i18n.on('languageChanged', (lng) => {
  document.documentElement.lang = lng;
  ensureLanguageLoaded(lng);
});

if (typeof document !== 'undefined') {
  document.documentElement.lang = i18n.language?.split('-')[0] || 'it';
}

export default i18n;
