import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import investorEN from './locales/investor/en.json';
import investorIT from './locales/investor/it.json';
import investorDE from './locales/investor/de.json';
import investorES from './locales/investor/es.json';
import investorFR from './locales/investor/fr.json';
import investorPT from './locales/investor/pt.json';
import investorZH from './locales/investor/zh.json';
import investorSV from './locales/investor/sv.json';

const resources = {
  en: { translation: investorEN },
  it: { translation: investorIT },
  de: { translation: investorDE },
  es: { translation: investorES },
  fr: { translation: investorFR },
  pt: { translation: investorPT },
  zh: { translation: investorZH },
  sv: { translation: investorSV },
};

// Create a separate i18n instance for the investor form
const investorI18n = i18n.createInstance();

investorI18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false
    },
  });

export default investorI18n;
