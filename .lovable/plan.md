

# Update SEO and AEO to latest 2026 standards

## What needs updating

The current implementation is solid but has several gaps vs. March 2026 best practices.

## Changes

### 1. StructuredData.tsx — Add `@id` cross-references and update dates

- Add `@id` to Organization and WebSite schemas for entity linking (Google's recommended pattern for connecting schemas)
- Update all `dateModified` from `2026-02-25` to `2026-03-07`
- Add `WebPage` type to homepage with `speakable` property
- Remove duplicate schemas: the homepage currently outputs 17 JSON-LD blocks — consolidate Organization + Startup into one with `@id` linking

### 2. ArticleStructuredData.tsx — Upgrade to 2026 Article best practices

- Add `@id` to Article schema for entity resolution
- Add `thumbnailUrl` property (used by AI Overviews)
- Add `about` property with entity topics for better AEO extraction
- Add `citation_url` meta tag (missing — key for AI attribution)
- Add `isAccessibleForFree: true` for content accessibility signals

### 3. Index.tsx — Add missing AEO meta tags

- Add `ai.contentOrigin: "human-authored"` meta tag (emerging standard for AI content attribution)
- Add `robots` meta with `max-snippet:-1, max-image-preview:large, max-video-preview:-1` for maximum AI Overview eligibility

### 4. Sitemaps — Update all lastmod dates to 2026-03-07

- `sitemap.xml`, `sitemap-blog.xml`, `sitemap-tools.xml`, `sitemap-images.xml`, `sitemap-index.xml`

### 5. robots.txt — Update to v4.1

- Update version/date header to March 7, 2026
- Add new crawlers: `Windsurf-Bot` (Windsurf AI), `CopilotBot` (Microsoft Copilot), `Owler` (Owler research)
- Update knowledge base version references to 4.1

### 6. llms.txt and .well-known/llms.txt — Sync dates

- Update "Last Updated" to March 7, 2026
- Update version to 4.1

### 7. About.tsx — Add ProfilePage schemas for founders

- Add `ProfilePage` type references for founder entries (Google now supports this for author credibility)

## Files changed

| File | Change |
|------|--------|
| `src/components/StructuredData.tsx` | Add `@id` linking, consolidate schemas, update dates |
| `src/components/blog/ArticleStructuredData.tsx` | Add `@id`, `thumbnailUrl`, `isAccessibleForFree`, `citation_url` meta |
| `src/pages/Index.tsx` | Add `robots` meta for AI Overview eligibility, `ai.contentOrigin` |
| `public/sitemap.xml` | Update all lastmod to 2026-03-07 |
| `public/sitemap-blog.xml` | Update all lastmod to 2026-03-07 |
| `public/sitemap-tools.xml` | Update all lastmod to 2026-03-07 |
| `public/sitemap-images.xml` | Update all lastmod to 2026-03-07 |
| `public/sitemap-index.xml` | Update all lastmod to 2026-03-07 |
| `public/robots.txt` | v4.1 header, new AI crawlers |
| `public/llms.txt` | Update date and version |
| `public/.well-known/llms.txt` | Update date and version |

