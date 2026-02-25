

# Drastic SEO and AEO improvement plan

## Analysis of current gaps

After reviewing the entire codebase, I identified these critical issues:

### Critical SEO issues
1. **StructuredData.tsx dumps 18 JSON-LD schemas on EVERY page** (homepage, blog posts, about, FAQ, etc.). Google recommends page-specific schemas only. This dilutes relevance and risks "spammy structured data" warnings in Search Console.
2. **StructuredData.tsx uses `window.location.origin`** which resolves to `lovable.app` in preview/staging, leaking non-canonical URLs into structured data.
3. **BlogPost.tsx has duplicate article schema** inline AND `ArticleStructuredData.tsx` exists but is never imported in `BlogPost.tsx`.
4. **Stale `dateModified` values** across schemas: speakable ("2026-01-09"), voiceSearch ("2026-01-04"), datasets ("2026-01-04"). Google devalues stale schemas.
5. **sitemap-index.xml lastmod stuck at 2026-02-16** despite new articles published 2026-02-21 and 2026-02-25.
6. **robots.txt header says v3.4** but knowledge base claims v3.7. Inconsistent versioning.
7. **About.tsx postal code "10135"** vs "10137" everywhere else (NAP inconsistency kills local SEO).
8. **Missing pages from sitemap**: `/faq`, `/privacy`, `/termini-e-condizioni`, `/scioperi-italia`, `/affitto-stanza-torino` (neighborhoods index), individual neighborhood pages.
9. **No `<link rel="canonical">` on several pages**: FAQ, About, Students, Sellers lack canonical or use inconsistent patterns.

### AEO (Answer Engine Optimization) gaps
10. **No `speakable` markup on blog articles** (only global homepage schema has it, and it uses generic CSS selectors that don't match actual DOM).
11. **No `dateModified` dynamic sync** in blog article schema. `dateModified` always equals `datePublished`, so Google sees stale content.
12. **No VideoObject schema** for the explainer video at `/videos/jungle-rent-explainer.mp4`.
13. **AI knowledge base files (llms.txt, ai-assistant-info.txt)** reference v3.7 / 2026-02-21 but don't include the March 2026 events article update.

## Plan

### 1. Refactor StructuredData.tsx: page-specific schemas only

**File: `src/components/StructuredData.tsx`**

Split the monolithic 18-schema component into page-relevant subsets:
- **Homepage only**: Organization, LocalBusiness, StartupSchema, WebSite (with SearchAction), SpeakableSpecification, BreadcrumbList (Home > Studenti > Investitori > Venditori), FAQ (homepage FAQs only), HowTo schemas, BuyAction, Service schemas, SoftwareApplication (valuation tool + Props app), Dataset schemas.
- **Remove** from this component: all schemas that are page-specific (blog, about, FAQ page schemas are already handled in their respective pages).

Hardcode `https://junglerent.it` as the base URL instead of `window.location.origin` to prevent lovable.app leaks. Update all `dateModified` values to `2026-02-25`.

### 2. Fix BlogPost.tsx: use ArticleStructuredData and remove duplicate

**File: `src/pages/BlogPost.tsx`**

- Remove the inline `articleSchema`, `breadcrumbSchema`, and `faqSchema` definitions (lines 106-180).
- Import and render `<ArticleStructuredData>` component instead (it already exists and is better structured with speakable, wordCount, canonical domain guard).
- Keep the FAQ schema rendering but move it into `ArticleStructuredData.tsx`.
- Remove `<StructuredData />` from BlogPost (it shouldn't load all 18 homepage schemas on every article page).

### 3. Enhance ArticleStructuredData.tsx with FAQ support and dynamic dateModified

**File: `src/components/blog/ArticleStructuredData.tsx`**

- Add FAQ schema generation from `post.translations[language].faqs`.
- Set `dateModified` to the post's actual date (not `new Date()` which changes every render).
- Add `isPartOf` linking to the blog CollectionPage.
- Add `about` with relevant entities (e.g., "Torino", "Politecnico di Torino") based on tags.

### 4. Add missing pages to sitemap.xml

**File: `public/sitemap.xml`**

Add entries with hreflang for:
- `/faq` (priority 0.7)
- `/privacy` and `/termini-e-condizioni` (priority 0.3)
- `/scioperi-italia` (priority 0.7)
- `/affitto-stanza-torino` neighborhoods index (priority 0.8)
- Individual neighborhood pages (6 neighborhoods, priority 0.7)

### 5. Synchronize all lastmod dates to 2026-02-25

**Files: `public/sitemap-index.xml`, `public/sitemap.xml`, `public/sitemap-blog.xml`**

Update all lastmod dates from 2026-02-16 to 2026-02-25 for pages that have changed. Update sitemap-index.xml dates.

### 6. Fix robots.txt version inconsistency

**File: `public/robots.txt`**

Update header to v3.7 / February 25, 2026. Update knowledge base section to reference v3.7.

### 7. Fix NAP inconsistency in About.tsx

**File: `src/pages/About.tsx`**

Change postal code from "10135" to "10137" to match all other instances.

### 8. Add VideoObject schema to StructuredData.tsx

**File: `src/components/StructuredData.tsx`**

Add a VideoObject schema for the explainer video:
```
name: "Jungle Rent - Come funziona"
contentUrl: https://junglerent.it/videos/jungle-rent-explainer.mp4
thumbnailUrl: https://junglerent.it/jungle-rent-logo.svg
uploadDate: 2025-12-01
```

### 9. Remove StructuredData from non-homepage pages

**Files: `src/pages/BlogPost.tsx`, `src/pages/Blog.tsx`**

Remove `<StructuredData />` import and usage from pages that already have their own page-specific schemas. The global organization/business schemas should only appear on the homepage. Blog pages should only have article + breadcrumb + FAQ schemas.

### 10. Update AI knowledge base files

**Files: `public/llms.txt`, `public/.well-known/llms.txt`, `public/ai-assistant-info.txt`**

Bump version to v3.8 / 2026-02-25. Add the March 2026 events article expansion as a resource update. Sync `ai-last-verified` meta tag in index.html to 2026-02-25.

### 11. Update index.html ai-last-verified date

**File: `index.html`**

Change `ai-last-verified` from `2026-02-16` to `2026-02-25`.

## Technical details

### Schema distribution after refactor

| Page | Schemas |
|------|---------|
| Homepage (`/`) | Organization, LocalBusiness, Startup, WebSite, Speakable, BreadcrumbList, FAQ, HowTo x2, BuyAction, Service x2, SoftwareApp x2, Dataset x3, VideoObject |
| Blog listing (`/blog`) | CollectionPage/ItemList, BreadcrumbList |
| Blog article (`/blog/:slug`) | Article (with speakable), BreadcrumbList, FAQPage |
| Investors (`/investitori`) | InvestmentOrDeposit, BreadcrumbList |
| Sellers (`/vendi`) | Service, HowTo, BreadcrumbList |
| About (`/chi-siamo`) | AboutPage with Organization |
| FAQ (`/faq`) | FAQPage |
| Property valuation | SoftwareApplication, HowTo, FAQ (already handled) |

### Files modified (11 files)

1. `src/components/StructuredData.tsx` - hardcode canonical domain, update dates, add VideoObject
2. `src/pages/BlogPost.tsx` - remove StructuredData + inline schemas, use ArticleStructuredData
3. `src/components/blog/ArticleStructuredData.tsx` - add FAQ schema, fix dateModified
4. `src/pages/Blog.tsx` - remove StructuredData import
5. `src/pages/About.tsx` - fix postal code 10135 to 10137
6. `public/sitemap.xml` - add missing pages, update lastmod dates
7. `public/sitemap-index.xml` - update lastmod dates
8. `public/sitemap-blog.xml` - update lastmod for modified articles
9. `public/robots.txt` - fix version to v3.7
10. `public/llms.txt` + `public/.well-known/llms.txt` + `public/ai-assistant-info.txt` - bump to v3.8
11. `index.html` - update ai-last-verified date

### What does NOT change
- Content of blog articles (already optimized)
- Content clusters and linkable content
- Translation files
- Edge functions
- Database

