

# Add "Contratti di locazione e morosità in Italia: guida completa 2026" blog article

## Overview
Comprehensive guide covering Italy's 6 rental contract types, short-term rental regulations (CIN, cedolare secca thresholds), eviction procedures (including Decreto Sicurezza 2025), and preventive tools (deposits, insurance, tenant screening). Investor-focused, with Turin/student housing angle.

## Changes

### 1. Create Italian markdown — `src/data/blog/content/it/contratti-locazione-morosita-italia-2026.md`
Convert provided content to markdown. Sections: 6 contract types comparison (4+4, 3+2, transitorio, studenti, foresteria), affitti brevi 2026, sfratto per morosità, strumenti preventivi, conclusione. Includes comparison table. Natural language rewrite (sentences <25 words, active voice, no em dashes).

### 2. Create English markdown — `src/data/blog/content/en/contratti-locazione-morosita-italia-2026.md`
Full English translation, same structure.

### 3. Register post in `src/data/blog/posts.ts`
Insert at position 0:
- `slug: "contratti-locazione-morosita-italia-2026"`
- `category: "investors"`, `date: "2026-03-14"`, `readTime: 15`
- `image: "/images/mortgage-investment.jpg"` (reuse)
- 5-6 FAQs per language covering contract types, cedolare secca, eviction timelines, CIN, tenant screening
- SEO keywords from provided meta concepts

### 4. Update `src/data/blog/contentClusters.ts`
- Add `'contratti-locazione-morosita-italia-2026'` to Investors "Property Investment" cluster satellites
- Relationships:
  - ↔ `cedolare-secca-2026-investitori` (high)
  - ↔ `contratto-studenti-affitto-breve-strategia` (high)
  - ↔ `irpef-vs-cedolare-secca-2026-investitori` (medium)

### 5. Update `src/data/linkableContent.ts`
Add keywords: "contratti locazione Italia", "sfratto morosità", "canone concordato", "CIN affitti brevi", "rental contracts Italy", "eviction Italy 2026".

### 6. Update `public/sitemap-images.xml`
Add entry for the new article URL.

## Files changed

| File | Action |
|------|--------|
| `src/data/blog/content/it/contratti-locazione-morosita-italia-2026.md` | Create |
| `src/data/blog/content/en/contratti-locazione-morosita-italia-2026.md` | Create |
| `src/data/blog/posts.ts` | Add post at top |
| `src/data/blog/contentClusters.ts` | Add to cluster + relationships |
| `src/data/linkableContent.ts` | Add keywords |
| `public/sitemap-images.xml` | Add entry |

