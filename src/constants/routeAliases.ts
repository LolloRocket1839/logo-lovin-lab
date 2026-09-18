/**
 * Regola unica: ogni pagina ha una rotta italiana canonica e la sua versione
 * inglese sotto /en/<stessa-slug>. Gli alias inglesi storici sono solo 301.
 *
 * Allineare con src/components/AnimatedRoutes.tsx, scripts/generate-sitemap.ts
 * e public/_redirects quando si aggiunge una rotta.
 */

export const EN_PREFIX = "/en";

/** Alias inglesi storici → rotta italiana canonica (solo per i redirect) */
export const LEGACY_EN_TO_IT: Record<string, string> = {
  "/about": "/chi-siamo",
  "/investors": "/investitori",
  "/investors/zones": "/investitori/zone",
  "/students": "/studenti",
  "/tools/study-spaces-turin": "/strumenti/aule-studio-torino",
  "/tools/cheap-eats-turin": "/strumenti/dove-mangiare-torino",
  "/tools/student-services-turin": "/strumenti/sportelli-studenti-torino",
  "/tools/gyms-turin-students": "/strumenti/palestre-torino-studenti",
  "/sell": "/vendi",
  "/rental-contracts": "/contratti-locazione",
  "/rooms-rent-turin": "/affitto-stanza-torino",
  "/thank-you": "/grazie",
  "/terms": "/termini-e-condizioni",
  "/auth": "/accedi",
};

const stripTrailingSlash = (p: string) => (p.length > 1 ? p.replace(/\/+$/, "") : p);

/** true quando il path è servito sotto il prefisso /en */
export const hasEnPrefix = (pathname: string): boolean =>
  pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`);

/** Rimuove il prefisso /en, restituendo il path italiano sottostante */
export const stripEnPrefix = (pathname: string): string => {
  if (!hasEnPrefix(pathname)) return pathname;
  const rest = pathname.slice(EN_PREFIX.length);
  return rest === "" ? "/" : rest;
};

/** true quando l'URL indica che il visitatore vuole l'inglese */
export const isEnglishPath = (pathname: string): boolean => {
  const path = stripTrailingSlash(pathname);
  if (hasEnPrefix(path)) return true;
  return Boolean(LEGACY_EN_TO_IT[path]);
};

/** Mappa qualsiasi path al suo equivalente italiano */
export const toItalianPath = (pathname: string): string => {
  const path = stripEnPrefix(stripTrailingSlash(pathname));
  return LEGACY_EN_TO_IT[path] ?? path;
};

/** Mappa qualsiasi path al suo equivalente inglese (/en/<slug italiana>) */
export const toEnglishPath = (pathname: string): string => {
  const it = toItalianPath(pathname);
  return it === "/" ? EN_PREFIX : `${EN_PREFIX}${it}`;
};
