
# New blog article: "Torino citta campus" — university expansion and real estate map

## Overview

Publish the uploaded PDF as a bilingual blog article (IT + EN) targeting property sellers in Turin's transformation zones. The article explains how university masterplans (Politecnico 300M, UniTo Citta delle Scienze) and infrastructure projects (Metro 2, Manifattura Tabacchi) are reshaping neighborhood values — giving sellers evidence that their property sits in a high-demand area.

## Article metadata

- **Slug**: `torino-citta-campus-atenei-immobiliare-2026`
- **Category**: `sellers` (targets owners in transformation zones)
- **Date**: `2026-02-21`
- **Read time**: 20 min
- **Author**: Jungle Rent Team
- **Image**: reuse `/images/politecnico-torino.avif` (already in project)

## Content structure (sentence case enforced)

The markdown will be rewritten from the PDF in natural conversational style (short sentences, no em dashes, active voice) with these sections:

1. **Intro** — Torino is transforming. Universities and new industrial hubs are redrawing the real estate map.
2. **Il masterplan del Politecnico: 300 milioni per un ecosistema dell'innovazione** — new towers, Innovation Hubs, 300k sqm target
3. **Il campus del Valentino: architettura, design e PNRR** — 50M campus, 100M park renovation, City'Scape Award
4. **La cittadella del design a Mirafiori** — ex-Fiat area, automotive/design courses
5. **L'universita di Torino: la citta delle scienze** — Grugliasco 160M, Palazzo Nuovo, Biotecnologie Via Nizza
6. **I nuovi poli industriali** — Metro 2 (1.83B), Manifattura Tabacchi, ex-RAI tower
7. **L'impatto sul mercato immobiliare** — zone-by-zone data (Cenisia +2.6%, Lingotto +7.8%, Aurora +7%)
8. **Studentati e PNRR** — 60k beds target, HOMA 622 beds pipeline
9. **Torino 2030** — closing vision + Jungle Rent CTA

Each section will include 3-5 internal links to existing articles and tools.

## Internal links to inject

| Target | Context |
|--------|---------|
| `/blog/investire-real-assets-torino-2025` | When discussing investment opportunity / market data |
| `/blog/dove-vivere-torino-studenti-politecnico` | When mentioning student neighborhoods |
| `/blog/cedolare-secca-2026-investitori` | When discussing rental yields |
| `/blog/politecnico-torino-guida-completa` | When referencing Politecnico expansion |
| `/blog/universita-torino-guida-completa` | When referencing UniTo |
| `/blog/san-salvario-guida-studenti` | When mentioning San Salvario-Valentino zone |
| `/blog/student-housing-italia-savills-2025` | When discussing PNRR studentati |
| `/valutazione-immobile` | CTA: "Scopri quanto vale il tuo immobile" |
| `/venditori` | Final CTA |
| `/investitori/zone` | When listing neighborhood data |

## Files to create

### 1. `src/data/blog/content/it/torino-citta-campus-atenei-immobiliare-2026.md`
Full Italian article rewritten from PDF in natural language style with internal links and sentence case headings.

### 2. `src/data/blog/content/en/torino-citta-campus-atenei-immobiliare-2026.md`
English translation, same structure and internal links.

## Files to modify

### 3. `src/data/blog/posts.ts`
Add new entry at position 0 (latest article):

```typescript
{
  slug: "torino-citta-campus-atenei-immobiliare-2026",
  category: "sellers",
  date: "2026-02-21",
  author: "Jungle Rent Team",
  image: "/images/politecnico-torino.avif",
  readTime: 20,
  content: "torino-citta-campus-atenei-immobiliare-2026",
  translations: {
    it: {
      title: "Torino citta campus: come atenei e nuovi poli ridisegnano la mappa immobiliare",
      excerpt: "300 milioni del Politecnico, citta delle scienze a Grugliasco, Metro 2: dove salgono i prezzi quartiere per quartiere.",
      seo: { title, description, 10 keywords },
      tags: ["Venditori", "Mercato immobiliare", "Politecnico", "Torino", "Urbanistica"],
      faqs: [10 voice-optimized FAQs covering masterplan, zones, prices, Metro 2, PNRR beds]
    },
    en: { /* mirror */ }
  }
}
```

### 4. `src/data/blog/contentClusters.ts`
- Add `torino-citta-campus-atenei-immobiliare-2026` as satellite in the **Investors cluster** (pillar: `investire-real-assets-torino-2025`)
- Add `torino-citta-campus-atenei-immobiliare-2026` as satellite in the **Sellers cluster** (pillar: `vendere-casa-torino-guida-completa-2025`)
- Add 3 new `articleRelationships`:
  - to `investire-real-assets-torino-2025` (high, bidirectional)
  - to `politecnico-torino-guida-completa` (high, bidirectional)
  - to `universita-torino-guida-completa` (high, bidirectional)

### 5. `src/data/linkableContent.ts`
Add enhanced keywords entry in `enhancedBlogKeywords` for the new slug with triggers like `masterplan politecnico`, `citta delle scienze`, `metro 2 torino`, `grugliasco`, `manifattura tabacchi`.

### 6. `public/sitemap-blog.xml`
Add entry with hreflang for `it` and `en`.

### 7. `public/llms.txt` and `public/ai-assistant-info.txt`
Add the new article to the resource listings.

## 10 FAQs (Italian, to include in posts.ts)

1. Quanto investe il Politecnico di Torino nel masterplan 2030?
2. Cosa sono le nuove torri di Corso Castelfidardo?
3. Quando apre la citta delle scienze a Grugliasco?
4. Quali quartieri di Torino crescono di piu nel 2026?
5. Come influisce la Metro 2 sui prezzi degli immobili?
6. Quanto costa al mq un immobile a Torino nel 2026?
7. Quanti posti letto studenteschi prevede il PNRR?
8. Cosa succede nell'area della Manifattura Tabacchi?
9. Torino conviene rispetto a Milano per investire?
10. Dove si trovano gli Innovation Hub del Politecnico?

## Quality checklist

- All headings in sentence case (only first word + proper nouns capitalized)
- Natural conversational style: sentences under 25 words, no em dashes, active voice
- All 24+ sources from the PDF cited inline
- Jungle Rent CTA positioned at market data section and closing
- No "portfolio shares" language — uses corrected "appartamento specifico" model
