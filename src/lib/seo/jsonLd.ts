/**
 * Centralized JSON-LD builder factory.
 * All public URLs use the canonical domain. Use these helpers instead of
 * inlining schema in pages so that domain, identity, and author info
 * stay in one place.
 *
 * Usage:
 *   import { Seo } from '@/components/Seo';
 *   import { buildOrganization, buildBreadcrumb } from '@/lib/seo/jsonLd';
 *
 *   <Seo
 *     title="..."
 *     description="..."
 *     canonical="/investitori"
 *     jsonLd={[buildOrganization(), buildBreadcrumb([{ name: 'Home', path: '/' }, ...])]}
 *   />
 */

export const CANONICAL_DOMAIN = 'junglerent.it';
export const BASE_URL = `https://${CANONICAL_DOMAIN}`;
export const ORG_ID = `${BASE_URL}/#organization`;
export const WEBSITE_ID = `${BASE_URL}/#website`;

export type JsonLd = Record<string, unknown>;

export function absoluteUrl(pathOrUrl: string): string {
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  return `${BASE_URL}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
}

/** Organization — sitewide identity. Reference by @id from other schemas. */
export function buildOrganization(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORG_ID,
    name: 'Jungle Rent',
    legalName: 'Jungle Rent S.r.l.',
    url: BASE_URL,
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/jungle-rent-logo.svg`,
    },
    foundingDate: '2025-10-24',
    founder: {
      '@type': 'Person',
      name: 'Lorenzo Oni-Joseph',
      jobTitle: 'Founder & CEO',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Via Gioacchino Quarello 15/A',
      addressLocality: 'Torino',
      postalCode: '10137',
      addressRegion: 'TO',
      addressCountry: 'IT',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+39-331-905-3037',
      contactType: 'customer service',
      areaServed: ['IT', 'CH'],
      availableLanguage: ['Italian', 'English'],
    },
    sameAs: [
      'https://www.linkedin.com/company/jungle-rent',
      'https://www.instagram.com/junglerent',
    ],
    vatID: 'IT13333450016',
  };
}

/** WebSite — enables Sitelinks Search Box if a search action is added. */
export function buildWebSite(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    url: BASE_URL,
    name: 'Jungle Rent',
    publisher: { '@id': ORG_ID },
    inLanguage: ['it-IT', 'en-US'],
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function buildBreadcrumb(items: BreadcrumbItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export type FaqItem = { question: string; answer: string };

export function buildFaqPage(items: FaqItem[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer },
    })),
  };
}

export type ServiceArgs = {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed?: string | string[];
};

export function buildService(args: ServiceArgs): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: args.name,
    description: args.description,
    url: absoluteUrl(args.url),
    serviceType: args.serviceType ?? 'Real estate',
    areaServed: args.areaServed ?? 'Turin, Italy',
    provider: { '@id': ORG_ID },
  };
}
