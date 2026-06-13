import { Helmet } from 'react-helmet';
import { BASE_URL, absoluteUrl, type JsonLd } from '@/lib/seo/jsonLd';

/**
 * Central Seo component. Wraps react-helmet with sensible defaults so pages
 * don't duplicate canonical/og/twitter boilerplate.
 *
 * - `canonical` accepts a path (e.g. "/investitori") or a full URL.
 * - `image` defaults to the homepage OG image; pass a different absolute
 *   URL for content with its own preview asset.
 * - `jsonLd` accepts one or more schema objects; pass via the builders in
 *   `@/lib/seo/jsonLd` so domain/identity stay consistent.
 *
 * Sitewide tags (charset, viewport, sitewide og fallback) live in
 * `index.html`. Per-route Helmet overrides them for JS-executing crawlers.
 */

export type SeoProps = {
  title: string;
  description: string;
  canonical: string;
  locale?: 'it_IT' | 'en_US';
  alternateLocale?: 'it_IT' | 'en_US';
  ogType?: 'website' | 'article' | 'product';
  image?: string;
  /** When true, instructs crawlers not to index this page. */
  noindex?: boolean;
  jsonLd?: JsonLd | JsonLd[];
  /** Extra meta or link tags to append. */
  children?: React.ReactNode;
};

const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image-homepage.jpg`;

export function Seo({
  title,
  description,
  canonical,
  locale = 'it_IT',
  alternateLocale,
  ogType = 'website',
  image = DEFAULT_OG_IMAGE,
  noindex = false,
  jsonLd,
  children,
}: SeoProps) {
  const canonicalUrl = absoluteUrl(canonical);
  const schemas = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Jungle Rent" />
      <meta property="og:locale" content={locale} />
      {alternateLocale && (
        <meta property="og:locale:alternate" content={alternateLocale} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}

      {children}
    </Helmet>
  );
}

export default Seo;
