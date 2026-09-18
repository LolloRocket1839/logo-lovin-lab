import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { toItalianPath, toEnglishPath } from "@/constants/routeAliases";

const BASE_URL = "https://junglerent.it";

/**
 * Emits it / en / x-default alternates for the current page.
 * Canonical tags stay owned by each page.
 */
export const HreflangTags = () => {
  const { pathname } = useLocation();

  if (pathname.startsWith("/admin") || pathname.startsWith("/auth") || pathname === "/accedi") {
    return null;
  }

  const itHref = `${BASE_URL}${toItalianPath(pathname)}`;
  const enHref = `${BASE_URL}${toEnglishPath(pathname)}`;

  return (
    <Helmet>
      <link rel="alternate" hrefLang="it" href={itHref} />
      <link rel="alternate" hrefLang="en" href={enHref} />
      <link rel="alternate" hrefLang="x-default" href={itHref} />
    </Helmet>
  );
};
