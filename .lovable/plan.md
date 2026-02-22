

# Update "Eventi Torino marzo 2026" article with expanded content

## What changes

The existing March 2026 events article gets a major content upgrade. Both the Italian and English markdown files will be rewritten with the much richer, more detailed content the user provided. The posts.ts metadata stays the same (slug, FAQs, SEO already correct).

## Files to modify

### 1. `src/data/blog/content/it/eventi-torino-marzo-2026.md`
Full rewrite with the expanded content. Key improvements over current version:
- Detailed exhibition descriptions (Chiharu Shiota works list, Futurismo 4 sections, Gentileschi international loans)
- Richer concert sections (Mika production details, Renato Zero setlist, Subsonica immersive exhibition + DJ sets + city-wide installations)
- Musical theater calendar (Rocky, Amadeus with full schedule, 7 Spose per 7 Fratelli)
- New section: conferences (Schettini, Galimberti, Crepet, Francini)
- New section: Festa della Donna March 8
- Expanded outdoor activities with cycling routes (3 difficulty levels)
- Transport table: how to reach each venue
- Spring cuisine section with seasonal dishes and recommended zones
- Emergency numbers table
- Practical visit planning tips with geographic clusters

Sentence case enforced on all headings. Internal links corrected to use actual slugs:
- `/blog/eventi-torino-febbraio-2026`
- `/blog/eventi-torino-gennaio-2026`
- `/blog/carnevale-ivrea-battaglia-arance-2026`
- `/blog/viaggiare-sostenibile-torino-guida`
- `/blog/torino-ogni-stagione-turisti`
- `/blog/torino-nightlife-guide`
- `/blog/san-salvario-guida-studenti`
- `/blog/cicloturismo-avanzato-torino`
- `/blog/dove-mangiare-torino-studenti`

All 19 sources cited at the bottom.

### 2. `src/data/blog/content/en/eventi-torino-marzo-2026.md`
Full English translation of the expanded content, same structure, same internal links, same sources. Sentence case enforced.

### 3. `src/data/blog/posts.ts`
Update `readTime` from 45 to 25 (the expanded article is detailed but reads naturally, ~25 min is more accurate than 45).

## What does NOT change
- Slug, category, date, image, author
- FAQs (already comprehensive and correct)
- SEO metadata (already covers all events)
- Content clusters and linkable content (already configured)
- Sitemap entries

## Quality standards applied
- All headings in sentence case (only first word + proper nouns capitalized)
- Natural conversational style, short sentences, no em dashes
- All internal links use verified existing slugs
- 19 cited sources preserved
- No emojis in the final markdown (plain text formatting)

