import { useTranslation } from "react-i18next";

export type ToolLanguage = 'it' | 'en';

export const useToolLanguage = (): ToolLanguage => {
  const { i18n } = useTranslation();
  return i18n.language?.startsWith('it') ? 'it' : 'en';
};
