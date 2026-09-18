import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import investorEN from './locales/investor/en.json';
import investorIT from './locales/investor/it.json';

const resources = {
  en: { translation: investorEN },
  it: { translation: investorIT },
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
