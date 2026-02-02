

# Plan: Create standalone article "Turin: A Seven-Minute City"

## Summary

Create a comprehensive, well-researched bilingual article (IT/EN) analyzing Turin's global walkability ranking (3rd worldwide) based on World of Statistics / The Economist data. The article will explore why Turin is walkable, implications for real estate, tourism, and quality of life, positioning this as evergreen content for the "societa" category.

---

## Article specifications

| Property | Value |
|----------|-------|
| Slug | `torino-citta-7-minuti-walkability` |
| Category | `societa` |
| Date | `2026-02-02` |
| Author | Jungle Rent Team |
| Image | `/images/portici-torino.jpg` (existing, shows porticos) |
| Read time | 12 minutes |

---

## Content structure

### Italian version: `src/data/blog/content/it/torino-citta-7-minuti-walkability.md`

```
# Torino: la città a sette minuti

## Hook
Turin ranks 3rd globally for walkability. 7 minutes average to reach daily essentials.

## Sections

1. **What the ranking says**
   - Global comparison table (Milan 6 min, Copenhagen 6 min, Turin 7 min...)
   - Source: World of Statistics / The Economist
   - 45 of 50 most walkable cities are in Europe

2. **Why Turin is walkable**
   - Compact Cartesian urban grid (Savoy planning)
   - Mixed-use neighborhoods (residential + ground-floor commerce)
   - 18 km of continuous porticos
   - Public transport as walkability multiplier (Metro, trams, buses)

3. **The lived experience**
   - Daily routine without a car
   - Urban atmosphere: quiet streets, active ground floors
   - Neighborhood examples: San Salvario, Vanchiglia, Aurora

4. **Implications for tourism**
   - Most attractions within walking distance
   - "Big city with small-city distances"
   - Neighborhood exploration encouraged

5. **Implications for real estate**
   - "Seven-minute premium" on property values
   - Rental demand correlation with walkability
   - Investment due diligence: assess walkability radius
   - Neighborhood differentiation (core vs peripheral)

6. **Turin in European context**
   - Competes with Copenhagen, Lyon, Munich, Vienna
   - Industrial reputation underestimates livability
   - EU funding advantage for low-emission compact cities

7. **Challenges and next steps**
   - Peripheral gaps in amenity density
   - Public space quality variations
   - Cycling network fragmentation

8. **Conclusion**
   - Turin already lives the 15-minute city philosophy
   - Structural asset for long-term value
```

### English version: `src/data/blog/content/en/torino-citta-7-minuti-walkability.md`

Mirror structure with proper sentence case headings.

---

## Posts.ts entry

```typescript
{
  slug: "torino-citta-7-minuti-walkability",
  category: "societa",
  date: "2026-02-02",
  author: "Jungle Rent Team",
  image: "/images/portici-torino.jpg",
  readTime: 12,
  content: "torino-citta-7-minuti-walkability",
  translations: {
    it: {
      title: "Torino: la città a sette minuti",
      excerpt: "Torino è la terza città più camminabile al mondo. 7 minuti per raggiungere scuole, negozi e servizi essenziali.",
      seo: {
        title: "Torino città 7 minuti | Walkability e qualità della vita",
        description: "Torino al 3° posto mondiale per camminabilità. Analisi del ranking World of Statistics, implicazioni per immobiliare, turismo e vita quotidiana.",
        keywords: [
          "torino walkability",
          "città 15 minuti torino",
          "camminabilità torino",
          "città camminabili europa",
          "qualità vita torino",
          "urbanistica torino",
          "portici torino",
          "torino vs milano walkability",
          "investire torino walkability",
          "15 minute city italia"
        ]
      },
      tags: ["Società", "Urbanistica", "Qualità vita", "Torino", "Sostenibilità"],
      faqs: [
        // 10 voice-optimized FAQs
      ]
    },
    en: {
      title: "Turin: a seven-minute city",
      excerpt: "Turin ranks 3rd globally for walkability. Just 7 minutes to reach schools, shops, and essential services.",
      seo: {
        title: "Turin walkability ranking | 7-minute city guide",
        description: "Turin ranks 3rd worldwide for walkability. Analysis of World of Statistics ranking, implications for real estate, tourism, and daily life.",
        keywords: [
          "turin walkability",
          "15 minute city turin",
          "walkable cities europe",
          "turin quality of life",
          "turin urban planning",
          "turin porticos",
          "turin vs milan walkability",
          "invest turin walkability",
          "15 minute city italy",
          "most walkable cities world"
        ]
      },
      tags: ["Society", "Urban planning", "Quality of life", "Turin", "Sustainability"],
      faqs: [
        // 10 voice-optimized FAQs
      ]
    }
  }
}
```

---

## FAQs (voice-optimized)

### Italian

1. "Torino è una città camminabile?"
2. "Quanti minuti servono per raggiungere i servizi a Torino?"
3. "Qual è la posizione di Torino nella classifica delle città più camminabili?"
4. "Torino è più camminabile di Milano?"
5. "Perché Torino è così camminabile?"
6. "Cosa sono i portici di Torino?"
7. "Torino è una città a 15 minuti?"
8. "La camminabilità influenza i prezzi degli immobili a Torino?"
9. "Quali quartieri di Torino sono più camminabili?"
10. "Torino è camminabile anche d'inverno?"

### English

1. "Is Turin a walkable city?"
2. "How long does it take to reach services in Turin?"
3. "Where does Turin rank among the most walkable cities?"
4. "Is Turin more walkable than Milan?"
5. "Why is Turin so walkable?"
6. "What are Turin's porticos?"
7. "Is Turin a 15-minute city?"
8. "Does walkability affect property prices in Turin?"
9. "Which neighborhoods in Turin are most walkable?"
10. "Is Turin walkable in winter?"

---

## Writing style requirements

Per existing blog standards:

- Sentence case for all headings (EN and IT)
- Natural, conversational tone
- Sentences under 25 words average
- No em dashes
- Active voice preferred
- Direct address (tu/voi in Italian)
- No AI-written patterns

---

## Internal linking

| Link target | Context |
|-------------|---------|
| `/blog/san-salvario-guida-studenti` | Neighborhood example |
| `/blog/viaggiare-sostenibile-torino-guida` | Sustainable mobility |
| `/blog/torino-digital-nomads-guide` | Work-life quality |
| `/blog/dove-vivere-torino-studenti-politecnico` | Neighborhood choice |
| `/investitori` | Real estate investment |

---

## Sitemap updates

Add to `public/sitemap-blog.xml`:

```xml
<url>
  <loc>https://junglerent.it/blog/torino-citta-7-minuti-walkability</loc>
  <lastmod>2026-02-02</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
  <xhtml:link rel="alternate" hreflang="it" href="https://junglerent.it/blog/torino-citta-7-minuti-walkability?lang=it"/>
  <xhtml:link rel="alternate" hreflang="en" href="https://junglerent.it/blog/torino-citta-7-minuti-walkability?lang=en"/>
</url>
```

---

## AI knowledge base updates

Also update the three AI knowledge base files with the walkability section as previously planned.

---

## Files to create

| File | Description |
|------|-------------|
| `src/data/blog/content/it/torino-citta-7-minuti-walkability.md` | Italian article (~1,800 words) |
| `src/data/blog/content/en/torino-citta-7-minuti-walkability.md` | English article (~1,800 words) |

## Files to modify

| File | Changes |
|------|---------|
| `src/data/blog/posts.ts` | Add new blog post entry at top |
| `public/sitemap-blog.xml` | Add URL with hreflang |
| `public/ai-assistant-info.txt` | Add walkability section |
| `public/llms.txt` | Add walkability summary |
| `public/llms-full.txt` | Add walkability section |

---

## Source attribution

```
Source: World of Statistics / The Economist (February 2026)
Reference: https://x.com/stats_feed/status/2018262120299745588
```

