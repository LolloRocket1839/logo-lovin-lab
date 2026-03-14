

# Add "IRPEF vs Cedolare Secca 2026" blog article

## Overview
New investors-category article comparing IRPEF vs cedolare secca with real scenarios for Turin student housing investors. Closely related to the existing `cedolare-secca-2026-investitori` article but focused on practical comparison and decision-making.

## Changes

### 1. Create Italian markdown — `src/data/blog/content/it/irpef-vs-cedolare-secca-2026-investitori.md`
Convert the provided HTML into markdown. Sections: TL;DR, rate tables (long-term unchanged, short-term changes, IRPEF brackets), three real scenarios, canone concordato winning combo, exceptions, rule of thumb, CTA, sources.

### 2. Create English markdown — `src/data/blog/content/en/irpef-vs-cedolare-secca-2026-investitori.md`
Full English translation from the provided HTML, same structure.

### 3. Register post in `src/data/blog/posts.ts`
Insert at position 0 with:
- `slug: "irpef-vs-cedolare-secca-2026-investitori"`
- `category: "investors"`
- `date: "2026-03-14"`
- `author: "Jungle Rent Team"`
- `image: "/images/mortgage-investment.jpg"` (reuse existing)
- `readTime: 10`
- `content: "irpef-vs-cedolare-secca-2026-investitori"`
- 5 FAQs per language (from the provided HTML)
- SEO keywords from the HTML meta tags

### 4. Update content clusters — `src/data/blog/contentClusters.ts`
- Add `'irpef-vs-cedolare-secca-2026-investitori'` to the Investors "Real Assets" cluster satellites
- Add relationships:
  - `irpef-vs-cedolare-secca-2026-investitori` ↔ `cedolare-secca-2026-investitori` (high)
  - `irpef-vs-cedolare-secca-2026-investitori` ↔ `contratto-studenti-affitto-breve-strategia` (high)
  - `irpef-vs-cedolare-secca-2026-investitori` ↔ `comodato-cedolare-secca-aidc-2025` (medium)

### 5. Update linkable content — `src/data/linkableContent.ts`
Add keywords entry: "irpef vs cedolare secca", "confronto tassazione affitti", "flat tax rental Italy", "canone concordato 10% torino".

### 6. Update sitemap-images.xml
Add entry for the new article URL.

## Files changed

| File | Action |
|------|--------|
| `src/data/blog/content/it/irpef-vs-cedolare-secca-2026-investitori.md` | Create |
| `src/data/blog/content/en/irpef-vs-cedolare-secca-2026-investitori.md` | Create |
| `src/data/blog/posts.ts` | Add post entry at top |
| `src/data/blog/contentClusters.ts` | Add to cluster + relationships |
| `src/data/linkableContent.ts` | Add keywords |
| `public/sitemap-images.xml` | Add image entry |

