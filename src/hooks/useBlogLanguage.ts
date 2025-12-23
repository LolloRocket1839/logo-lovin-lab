import { useTranslation } from "react-i18next";

export type BlogLanguage = 'it' | 'en';

export const useBlogLanguage = (): BlogLanguage => {
  const { i18n } = useTranslation();
  return i18n.language.startsWith('en') ? 'en' : 'it';
};
