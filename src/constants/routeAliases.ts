/**
 * Central IT ↔ EN route alias map.
 *
 * Every English-facing URL of the site is either:
 *  - an explicit English alias listed here (e.g. /about → /chi-siamo), or
 *  - any Italian route prefixed with /en (e.g. /en/vendi).
 *
 * Mirror this file against src/components/AnimatedRoutes.tsx and
 * scripts/generate-sitemap.ts whenever a route is added.
 */

export const EN_PREFIX = "/en";

/** English alias path → Italian canonical path */
export const EN_TO_IT: Record<string, string> = {
  "/about": "/chi-siamo",
  "/investors": "/investitori",
  "/investors/zones": "/investitori/zone",
  "/students": "/studenti",
  "/students/tools": "/studenti/strumenti",
  "/students/tools/budget": "/studenti/strumenti/budget",
  "/students/tools/gpa": "/studenti/strumenti/media",
  "/students/tools/session": "/studenti/strumenti/sessione",
  "/tools/study-spaces-turin": "/strumenti/aule-studio-torino",
  "/tools/cheap-eats-turin": "/strumenti/dove-mangiare-torino",
  "/tools/student-services-turin": "/strumenti/sportelli-studenti-torino",
  "/tools/gyms-turin-students": "/strumenti/palestre-torino-studenti",
  "/sell": "/vendi",
  "/sell-home/lingotto-nizza-millefonti": "/vendi-casa/lingotto-nizza-millefonti",
  "/sell-without-agency-turin": "/vendere-casa-senza-agenzia-torino",
  "/sell-house-fast-turin": "/vendere-casa-velocemente-torino",
  "/buy-rented-property-turin": "/comprare-casa-affittata-torino",
  "/property-investment-turin": "/investire-immobiliare-torino",
  "/property-valuation": "/valutazione-immobile",
  "/rental-contracts": "/contratti-locazione",
  "/rooms-rent-turin": "/affitto-stanza-torino",
  "/rent-lingotto-hospitals-turin": "/affitti-lingotto-ospedali-torino",
  "/zones/nizza-millefonti-hospitals": "/zone/nizza-millefonti-ospedali",
  "/italy-strikes": "/scioperi-italia",
  "/thank-you": "/grazie",
  "/terms": "/termini-e-condizioni",
  "/auth": "/accedi",
};

/** Italian canonical path → English alias path */
export const IT_TO_EN: Record<string, string> = Object.entries(EN_TO_IT).reduce(
  (acc, [en, it]) => {
    if (!acc[it]) acc[it] = en;
    return acc;
  },
  {} as Record<string, string>
);

/** English alias prefixes that also cover dynamic children (/:slug) */
const EN_DYNAMIC_PREFIXES = ["/investors/zones/", "/rooms-rent-turin/"];

const stripTrailingSlash = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

/** true when the path is served under the /en prefix */
export const hasEnPrefix = (pathname: string): boolean =>
  pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`);

/** Removes the /en prefix, returning the underlying Italian-route path */
export const stripEnPrefix = (pathname: string): string => {
  if (!hasEnPrefix(pathname)) return pathname;
  const rest = pathname.slice(EN_PREFIX.length);
  return rest === "" ? "/" : rest;
};

/** true when the URL itself says the visitor wants English */
export const isEnglishPath = (pathname: string): boolean => {
  const path = stripTrailingSlash(pathname);
  if (hasEnPrefix(path)) return true;
  if (EN_TO_IT[path]) return true;
  return EN_DYNAMIC_PREFIXES.some((prefix) => path.startsWith(prefix));
};

/** Maps any path to its Italian equivalent (identity when already Italian) */
export const toItalianPath = (pathname: string): string => {
  const path = stripEnPrefix(stripTrailingSlash(pathname));
  if (EN_TO_IT[path]) return EN_TO_IT[path];
  for (const prefix of EN_DYNAMIC_PREFIXES) {
    if (path.startsWith(prefix)) {
      const itPrefix = EN_TO_IT[stripTrailingSlash(prefix)];
      if (itPrefix) return `${itPrefix}/${path.slice(prefix.length)}`;
    }
  }
  return path;
};

/** Maps any path to its English equivalent (alias when it exists, /en prefix otherwise) */
export const toEnglishPath = (pathname: string): string => {
  const it = toItalianPath(pathname);
  if (IT_TO_EN[it]) return IT_TO_EN[it];
  for (const [enPrefix, itPrefix] of Object.entries(EN_TO_IT)) {
    if (it.startsWith(`${itPrefix}/`)) {
      return `${enPrefix}/${it.slice(itPrefix.length + 1)}`;
    }
  }
  return it === "/" ? EN_PREFIX : `${EN_PREFIX}${it}`;
};
