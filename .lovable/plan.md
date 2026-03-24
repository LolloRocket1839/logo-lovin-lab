

# Add "Renting in Italy: Complete Guide for Expats" blog post

## Overview
Add the comprehensive rental guide as a new bilingual blog post, adapting the HTML content into the existing blog system with markdown files, SEO metadata, FAQs, and contract banner integration.

## 1. New blog post entry in `src/data/blog/posts.ts`

- Slug: `guida-affitto-italia-stranieri-2026`
- Category: `students` (primary audience: international students/expats)
- Date: `2026-03-24`
- ReadTime: 18
- Image: reuse existing rental/contracts image
- FAQs: 8 Q&A pairs from the HTML (bilingual)
- SEO keywords targeting both "renting in Italy foreigner" (EN) and "affitto Italia stranieri guida" (IT)

## 2. English markdown: `src/data/blog/content/en/guida-affitto-italia-stranieri-2026.md`

Convert the full HTML article to markdown:
- 10 sections: legal requirements, vocabulary, 6 contract types, documents, costs, rents by city, tenant rights, cedolare secca, termination, 5 traps
- Tables (contract comparison, rent by city) in GFM format
- Callout boxes using existing markdown conventions
- Contract banner placeholder for auto-linking to `/contratti-locazione`
- Internal links to related existing articles (cedolare-secca, canone-concordato, codice-fiscale, etc.)

## 3. Italian markdown: `src/data/blog/content/it/guida-affitto-italia-stranieri-2026.md`

Full Italian translation of the guide, maintaining same structure and data. Adapted for Italian-speaking expats/international students.

## 4. Internal linking

Add cross-references:
- Link to `/contratti-locazione` service page (contract banner injection)
- Link to existing related posts: `cedolare-secca-2026-investitori`, `canone-concordato-torino-2026-guida-completa`, `codice-fiscale-studenti-stranieri-torino-2026`, `contratti-locazione-morosita-italia-2026`
- The auto-linking system will handle additional inline links automatically

## 5. Sitemap update

Add the new article URL to `public/sitemap-blog.xml` with lastmod `2026-03-24`.

## Files involved

| File | Action |
|------|--------|
| `src/data/blog/posts.ts` | Add new post entry |
| `src/data/blog/content/en/guida-affitto-italia-stranieri-2026.md` | New — full EN guide |
| `src/data/blog/content/it/guida-affitto-italia-stranieri-2026.md` | New — full IT guide |
| `public/sitemap-blog.xml` | Add new URL entry |

