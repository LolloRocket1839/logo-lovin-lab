import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { isEnglishPath } from "@/constants/routeAliases";

/**
 * When the URL itself is English (/en/... or a known English alias such as
 * /about), force the interface into English. Italian URLs keep the existing
 * detection behaviour (localStorage / browser language).
 */
export const useUrlLanguage = () => {
  const { pathname } = useLocation();
  const { i18n } = useTranslation();

  useEffect(() => {
    if (!isEnglishPath(pathname)) return;
    const current = i18n.language?.split("-")[0]?.toLowerCase();
    if (current !== "en") {
      i18n.changeLanguage("en");
    }
  }, [pathname, i18n]);
};
