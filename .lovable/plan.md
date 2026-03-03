

# Add April 2026 events blog article

## What changes

### 1. Create Italian markdown — `src/data/blog/content/it/eventi-torino-aprile-2026.md`
Rewrite the user-provided content in the established natural language style (sentences under 25 words, active voice, narrative hooks, no em dashes). Structure mirrors the March article: events → exhibitions → concerts → theatre → nature → transport → food → planning tips → related articles → sources. All 30 sources preserved at the bottom.

### 2. Create English markdown — `src/data/blog/content/en/eventi-torino-aprile-2026.md`
Full English translation following the same style and structure.

### 3. Add image — `public/images/parco-valentino-primavera.jpg`
Reuse `public/images/parco-valentino-inverno.jpg` or `public/images/torino-primavera-marzo.jpg` as the hero image. Since April is a spring continuation, use `torino-primavera-marzo.jpg` (already exists).

### 4. Register post in `src/data/blog/posts.ts`
Insert new entry at position 1 (second in array, after the most recent post) with:
- `slug: "eventi-torino-aprile-2026"`
- `category: "turisti"`
- `date: "2026-03-03"` (today)
- `readTime: 30`
- `image: "/images/torino-primavera-marzo.jpg"`
- `content: "eventi-torino-aprile-2026"`
- 10 FAQs per language covering Jazz Festival, Torino Comics, Messer Tulipano, cherry blossoms, key exhibitions, concerts, theatre, and transport
- SEO keywords targeting "eventi torino aprile 2026", "torino jazz festival 2026", "torino comics 2026", "messer tulipano 2026", "mostre torino aprile", etc.

### 5. Update content clusters — `src/data/blog/contentClusters.ts`
- Add `'eventi-torino-aprile-2026'` to the Turin Experience satellite array (line 93)
- Add temporal chain relationship: `{ from: 'eventi-torino-marzo-2026', to: 'eventi-torino-aprile-2026', relevance: 'high', bidirectional: true }`

### 6. Update March article related articles
Add a link to the April article at the bottom of both IT and EN March markdown files in the "Articoli correlati" / "Related articles" section.

### 7. Update linkable content — `src/data/linkableContent.ts`
Add enhanced keywords entry for `'eventi-torino-aprile-2026'` in the `enhancedBlogKeywords` record.

## Files changed

| File | Action |
|------|--------|
| `src/data/blog/content/it/eventi-torino-aprile-2026.md` | Create |
| `src/data/blog/content/en/eventi-torino-aprile-2026.md` | Create |
| `src/data/blog/posts.ts` | Add post entry |
| `src/data/blog/contentClusters.ts` | Add to cluster + relationship |
| `src/data/linkableContent.ts` | Add enhanced keywords |
| `src/data/blog/content/it/eventi-torino-marzo-2026.md` | Add April link |
| `src/data/blog/content/en/eventi-torino-marzo-2026.md` | Add April link |

