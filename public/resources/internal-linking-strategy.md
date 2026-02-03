# Strategia di Internal Linking - Jungle Rent Blog

## Panoramica

Questa strategia definisce come collegare gli articoli del blog per:
- Aumentare il crawl depth (profondità di scansione)
- Distribuire il PageRank tra gli articoli
- Migliorare l'esperienza utente con percorsi di lettura naturali
- Creare cluster tematici per autorevolezza topica

---

## Architettura dei Cluster di Contenuto

### 🎓 CLUSTER STUDENTI - Vita Universitaria

**Pillar Article:** `dove-vivere-torino-studenti-politecnico`

| Satellite Article | Relevance | Link Direction |
|-------------------|-----------|----------------|
| san-salvario-guida-studenti | 🔴 Alta | ↔️ Bidirezionale |
| quartieri-sicuri-donne-torino | 🔴 Alta | ↔️ Bidirezionale |
| aule-studio-torino-guida-completa | 🔴 Alta | ↔️ Bidirezionale |
| palestre-torino-studenti-guida-completa | 🟡 Media | ↔️ Bidirezionale |
| dove-mangiare-torino-studenti | 🔴 Alta | ↔️ Bidirezionale |
| politecnico-torino-guida-completa | 🔴 Alta | ↔️ Bidirezionale |
| universita-torino-guida-completa | 🔴 Alta | ↔️ Bidirezionale |

---

### 🚲 CLUSTER STUDENTI - Mobilità

**Pillar Article:** `mobilita-sostenibile-torino-studenti`

| Satellite Article | Relevance | Link Direction |
|-------------------|-----------|----------------|
| viaggiare-sostenibile-torino-guida | 🔴 Alta | ↔️ Bidirezionale |
| cicloturismo-avanzato-torino | 🟡 Media | ↔️ Bidirezionale |
| sciopero-trasporti-italia-gennaio-2026 | 🔴 Alta | ↔️ Bidirezionale |
| torino-citta-7-minuti-walkability | 🔴 Alta | ↔️ Bidirezionale |

---

### 💰 CLUSTER INVESTITORI

**Pillar Article:** `investire-real-assets-torino-2025`

| Satellite Article | Relevance | Link Direction |
|-------------------|-----------|----------------|
| cedolare-secca-2026-investitori | 🔴 Alta | ↔️ Bidirezionale |
| mutui-investitori-immobiliari-guida-completa | 🔴 Alta | ↔️ Bidirezionale |
| student-housing-italia-savills-2025 | 🔴 Alta | ↔️ Bidirezionale |
| valutazione-immobiliare-torino-guida-completa | 🔴 Alta | ↔️ Bidirezionale |

---

### 🏠 CLUSTER VENDITORI

**Pillar Article:** `vendere-casa-torino-guida-completa-2025`

| Satellite Article | Relevance | Link Direction |
|-------------------|-----------|----------------|
| valutazione-immobiliare-torino-guida-completa | 🔴 Alta | ↔️ Bidirezionale |
| props-gestione-immobiliare-semplificata | 🟡 Media | ↔️ Bidirezionale |

---

### 🗼 CLUSTER TURISTI - Esperienze

**Pillar Article:** `torino-ogni-stagione-turisti`

| Satellite Article | Relevance | Link Direction |
|-------------------|-----------|----------------|
| torino-novembre-turisti | 🔴 Alta | ↔️ Bidirezionale |
| torino-dicembre-turisti | 🔴 Alta | ↔️ Bidirezionale |
| eventi-torino-gennaio-2026 | 🔴 Alta | ↔️ Bidirezionale |
| eventi-torino-febbraio-2026 | 🔴 Alta | ↔️ Bidirezionale |
| eventi-torino-marzo-2026 | 🔴 Alta | ↔️ Bidirezionale |
| torino-nightlife-guide | 🟡 Media | ↔️ Bidirezionale |
| torino-digital-nomads-guide | 🟡 Media | ↔️ Bidirezionale |

---

### 🍫 CLUSTER TURISTI - Gastronomia

**Pillar Article:** `cioccolaterie-torino-guida-completa`

| Satellite Article | Relevance | Link Direction |
|-------------------|-----------|----------------|
| tajarin-piemontesi-guida-completa | 🟡 Media | ↔️ Bidirezionale |
| migliori-gelaterie-torino-studenti | 🔴 Alta | ↔️ Bidirezionale |
| dove-mangiare-torino-studenti | 🔴 Alta | ↔️ Bidirezionale |
| mercati-storici-torino-chiusure | 🟡 Media | ↔️ Bidirezionale |
| panettoni-pandori-torino-guida-2025 | 🔴 Alta | ↔️ Bidirezionale |

---

### 🏙️ CLUSTER SOCIETÀ

**Pillar Article:** `torino-citta-7-minuti-walkability`

| Satellite Article | Relevance | Link Direction |
|-------------------|-----------|----------------|
| quartieri-sicuri-donne-torino | 🔴 Alta | ↔️ Bidirezionale |
| raccolta-differenziata-torino-guida | 🟡 Media | ↔️ Bidirezionale |
| guida-volontariato-torino | 🟡 Media | ↔️ Bidirezionale |
| emergenze-affitti-torino-diritti-inquilini | 🟡 Media | ↔️ Bidirezionale |

---

## Componenti Implementati

### 1. SeeAlsoBox Component
Callout box per link manuali nel markdown:
- **Variant `default`**: Box con bordo laterale primario
- **Variant `compact`**: Lista semplice
- **Variant `grid`**: Griglia 2 colonne con excerpt

### 2. PillarBadge Component
Badge dorato "Guida completa" per articoli pillar.

### 3. Sistema Auto-Linking
Rilevamento automatico keyword → link nel testo markdown.

### 4. RelatedPosts Component
Sezione "Articoli correlati" a fine pagina con scoring:
- +10 punti: stessa categoria
- +2 punti: ogni tag condiviso

---

## Checklist Implementazione

### Per ogni nuovo articolo:
- [ ] Identificare il cluster di appartenenza
- [ ] Aggiungere 3-5 link interni nel contenuto markdown
- [ ] Verificare che l'articolo pillar linki al nuovo articolo
- [ ] Aggiungere sezione "Articoli correlati" alla fine
- [ ] Aggiornare `contentClusters.ts` se necessario

### Per articoli pillar:
- [ ] Aggiungere PillarBadge
- [ ] Includere table of contents
- [ ] Linkare tutti i satellite articles
- [ ] Aggiungere al footer della pagina

---

## Metriche di Successo

| Metrica | Target |
|---------|--------|
| Avg. internal links per article | 5-8 |
| Crawl depth (pagine/sessione) | >2.5 |
| Bounce rate blog | <55% |
| Time on page | >3 min |
| Pages indexed (GSC) | 100% |

---

## Note Tecniche

- I cluster sono definiti in `src/data/blog/contentClusters.ts`
- Il registry keywords è in `src/data/linkableContent.ts`
- L'auto-linking è in `src/lib/autoLinking.ts`
- I componenti sono in `src/components/blog/`
