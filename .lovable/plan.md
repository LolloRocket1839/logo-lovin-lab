# Phase 2 — SEO foundation (in progress)

Scope chosen by user: SEO foundation only (spec 1.1–1.4). Skipped homepage IA/nav restructure for a later phase. Skipped default OG image generation (placeholder previews worse than none) and skipped `react-helmet` → `react-helmet-async` migration (too risky across 34 page files).

## Completed
1. **Central `<Seo>` component** — `src/components/Seo.tsx`. Wraps `react-helmet`, accepts `title`, `description`, `canonical` (path or full URL), `ogType`, `image`, `locale`, `noindex`, `jsonLd` (single or array). Standardizes Twitter card, OG image dimensions, og:locale.
2. **JSON-LD builder factory** — `src/lib/seo/jsonLd.ts`. Exports `buildOrganization`, `buildWebSite`, `buildBreadcrumb`, `buildFaqPage`, `buildService`, plus `BASE_URL`, `ORG_ID`, `WEBSITE_ID`, `absoluteUrl`. Hardcoded canonical domain — `junglerent.it` lives in one place now.
3. **Homepage title alignment** — `src/pages/Index.tsx` Helmet title was overriding the Phase 1 `index.html` title. Updated to match: "Jungle Rent — Affitti per studenti e investimenti immobiliari a Torino".
4. **Sitemap audit + redirect cleanup** — `scripts/generate-sitemap.ts` was emitting three redirect URLs (`/proprietari`, `/invest`, `/strumenti/servizi-studenti-torino`) that crawlers hit and follow. Removed from `STATIC_ROUTES`/`TOOLS_ROUTES` with inline comments. Merged the EN pair `/tools/student-services-turin` onto its real IT canonical `/strumenti/sportelli-studenti-torino`. Sitemap regenerated: main 60 URLs (was 64), blog 63, tools 17.

## Deferred (not part of Phase 2)
- **Migrating 34 existing pages to `<Seo>`** — additive abstraction now exists; pages can be migrated piecemeal in later phases without breaking anything.
- **Default OG image** — not generated; would be a placeholder.
- **react-helmet-async migration** — would touch 34 files; current `react-helmet` works fine.
- **Phase 2 part 2** (sections 2.1–2.2: homepage IA + nav restructure) — awaiting user trigger.

## How to use the new infra (for future phases)
```tsx
import { Seo } from '@/components/Seo';
import { buildOrganization, buildBreadcrumb } from '@/lib/seo/jsonLd';

<Seo
  title="Investitori — Jungle Rent"
  description="..."
  canonical="/investitori"
  jsonLd={[
    buildOrganization(),
    buildBreadcrumb([
      { name: 'Home', path: '/' },
      { name: 'Investitori', path: '/investitori' },
    ]),
  ]}
/>
```
