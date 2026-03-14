

# Add "IMU 2026 su Immobili in Affitto a Torino" blog article

## Changes

### 1. Create Italian markdown — `src/data/blog/content/it/imu-2026-immobili-affitto-torino-investitori.md`
Convert provided HTML to markdown. Sections: TL;DR, IMU structure, Turin rates table, calculation formula, practical example (San Salvario bilocale), compliance steps, deadlines, other reductions, IMU + cedolare secca interaction, optimization overview, CTA, sources.

### 2. Create English markdown — `src/data/blog/content/en/imu-2026-immobili-affitto-torino-investitori.md`
Full English translation, same structure.

### 3. Register post in `src/data/blog/posts.ts`
Insert at position 0:
- `slug: "imu-2026-immobili-affitto-torino-investitori"`
- `category: "investors"`, `date: "2026-03-14"`, `readTime: 9`
- `image: "/images/mortgage-investment.jpg"` (reuse)
- 5 FAQs per language from provided HTML
- SEO keywords from meta tags

### 4. Update `src/data/blog/contentClusters.ts`
- Add to Investors "Real Assets" cluster satellites
- Add relationships:
  - ↔ `irpef-vs-cedolare-secca-2026-investitori` (high)
  - ↔ `cedolare-secca-2026-investitori` (high)
  - ↔ `contratto-studenti-affitto-breve-strategia` (medium)

### 5. Update `src/data/linkableContent.ts`
Add keywords: "IMU 2026 torino", "IMU canone concordato", "IMU property tax Turin", "aliquota IMU immobili locati".

### 6. Update `public/sitemap-images.xml`
Add entry for the new article URL.

## Files changed

| File | Action |
|------|--------|
| `src/data/blog/content/it/imu-2026-immobili-affitto-torino-investitori.md` | Create |
| `src/data/blog/content/en/imu-2026-immobili-affitto-torino-investitori.md` | Create |
| `src/data/blog/posts.ts` | Add post at top |
| `src/data/blog/contentClusters.ts` | Add to cluster + relationships |
| `src/data/linkableContent.ts` | Add keywords |
| `public/sitemap-images.xml` | Add entry |

