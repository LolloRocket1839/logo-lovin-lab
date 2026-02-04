

# Piano: pagine zone per investitori con dati Perplexity 2025

## Obiettivo

Creare un sistema di pagine dedicato agli investitori con dati di mercato reali estratti dalla ricerca Perplexity, completamente separato dalle pagine studenti per mantenere la distinzione di audience.

---

## Dati estratti dal PDF Perplexity

La ricerca contiene dati completi per 12 quartieri. Ecco il riassunto strutturato:

### Prezzi acquisto e trend

| Quartiere | €/mq medio | Range | Var. % 2024 | Trend 2025-26 |
|-----------|------------|-------|-------------|---------------|
| Crocetta | 3.000 | 2.750-3.500 | +6,3-14% | Forte crescita |
| San Salvario | 2.650 | 2.050-2.710 | +5,5-6% | Stabile |
| Cit Turin | 2.680 | 2.400-4.000 | +3% | Moderata |
| Vanchiglia | 2.600 | 2.070-2.680 | +2,2-3% | Moderata |
| Campidoglio | 2.325 | 1.850-2.600 | +3,5-6% | Stabile |
| Cenisia | 2.200 | 1.940-2.285 | +4% | Crescita |
| Parella | 1.960 | 1.575-2.605 | +5,5% | Crescita (Metro) |
| Santa Rita | 1.910 | 1.200-2.000 | +4,5% | Stabile |
| San Donato | 1.700 | 1.500-2.000 | +4,3% | Moderata |
| Lingotto | 1.650 | 1.200-3.000 | +7,8% | Forte crescita |
| Aurora | 1.520 | 1.000-1.800 | +7% | Forte crescita |
| Borgo Vittoria | 1.370 | 1.200-1.755 | +2-14% | Crescita |
| Barriera di Milano | 1.150 | 860-1.600 | +3% | Massima crescita |

### Rendimenti locativi

| Quartiere | Stanza €/mese | Bilocale €/mese | Rend. lordo | Rend. netto |
|-----------|---------------|-----------------|-------------|-------------|
| Barriera di Milano | 250-380 | 380-500 | 5,5-7% | 3,8-4,1% |
| Aurora | 350-450 | 500-600 | 5,5-7% | 3,8-5% |
| Cenisia | 380-470 | 550-700 | 6-7% | 4,4-5,1% |
| Lingotto | 400-500 | 600-700 | 5-6,5% | 3,5-4,5% |
| San Salvario | 400-500 | 700-850 | 5,8-6,5% | 4,1-4,8% |
| Vanchiglia | 350-480 | 600-750 | 5,5-6,2% | 4-4,5% |
| Crocetta | 450-550 | 750-900 | 5-5,5% | 3,6-4% |

### Rischio e domanda

| Quartiere | Domanda | Tasso sfitto | Tempo affitto | Target |
|-----------|---------|--------------|---------------|--------|
| San Salvario | MOLTO ALTA | 2-4% | 2-3 sett | Medicina, professionisti |
| Vanchiglia | ALTA | 3-5% | 2-4 sett | Umanistiche, creativi |
| Crocetta | ALTA | 4-6% | 3-4 sett | Politecnico, famiglie |
| Aurora | ALTA | 5-8% | 2-4 sett | Einaudi, investitori |

### Progetti rigenerazione urbana

| Quartiere | Progetto | Investimento | Impatto atteso |
|-----------|----------|--------------|----------------|
| Aurora/Barriera | Masterplan Carlo Ratti | €25,8 mln | +15-25% in 5-7 anni |
| Barriera di Milano | Metro 2 + Ex Manifattura | €2+ mld | Massima rivalutazione |
| San Salvario | Scalo Nizza | €105 mln | +10-15% |
| Lingotto | Parco della Salute | Multi-miliardi | Consolidamento trend |

---

## Architettura tecnica

### 1. Routing separato (studenti vs investitori)

| Audience | Route | Contenuto |
|----------|-------|-----------|
| Studenti | `/affitto-stanza-torino/:slug` | Affitti, trasporti, vita notturna |
| Investitori | `/investitori/zone/:slug` | €/mq, rendimenti, trend, rigenerazione |

### 2. Nuovo file dati: `src/data/investorZoneData.ts`

Struttura dati arricchita con tutti i campi dal PDF:

```text
interface InvestorZone {
  id: string
  name: string
  slug: string
  
  // Prezzi acquisto
  pricePerSqm: { min: number; avg: number; max: number }
  variation2024: number
  trend202526: 'stable' | 'moderate' | 'growth' | 'strong_growth' | 'max_growth'
  
  // Rendimenti
  rentRoom: { min: number; max: number }
  rentApartment: { min: number; max: number }
  grossYield: { min: number; max: number }
  netYield: { min: number; max: number }
  
  // Rischio
  demand: 'low' | 'medium' | 'high' | 'very_high'
  vacancyRate: { min: number; max: number }
  rentingTime: string
  targetTenant: string[]
  
  // Rigenerazione
  urbanRenewal: {
    active: boolean
    projects: { name: string; investment: string; impact: string }[]
  }
  
  // Ranking
  rankings: {
    netYieldRank?: number
    growthPotentialRank?: number
    entryPriceRank?: number
  }
  
  // Note investitore (dal PDF)
  investorNote: { it: string; en: string }
  
  // Immagine e coordinate (riutilizzo da neighborhoods.ts)
  image: string
  coordinates: { lat: number; lng: number }
}
```

### 3. Nuovi componenti

| Componente | Funzione |
|------------|----------|
| `InvestorZonePage.tsx` | Pagina singolo quartiere con metriche finanziarie |
| `InvestorZonesIndex.tsx` | Indice/dashboard con filtri e confronto |
| `ZoneMetricCard.tsx` | Card riutilizzabile per rendimento/prezzo/trend |
| `ZoneComparisonTable.tsx` | Tabella comparativa tra zone |
| `UrbanRenewalBadge.tsx` | Badge per progetti Metro 2 / rigenerazione |

### 4. UI pagina singola zona investitori

```text
┌─────────────────────────────────────────────────────────┐
│  Hero: Foto quartiere + Badge trend (↑↑ Forte crescita) │
├─────────────────────────────────────────────────────────┤
│  Metriche principali (4 card):                          │
│  ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐           │
│  │€2.650  │ │ 5,8%   │ │ 2-4%   │ │ ↑+6%   │           │
│  │€/mq    │ │ lordo  │ │ sfitto │ │ trend  │           │
│  └────────┘ └────────┘ └────────┘ └────────┘           │
├─────────────────────────────────────────────────────────┤
│  Sezioni dettaglio:                                     │
│  - Rendimenti (stanza/bilocale, lordo/netto)           │
│  - Domanda e rischio (target, tempo affitto)           │
│  - Rigenerazione urbana (progetti, impatto)            │
│  - Nota investitore                                     │
├─────────────────────────────────────────────────────────┤
│  Sidebar CTA: "Parla con Lorenzo"                       │
└─────────────────────────────────────────────────────────┘
```

### 5. SEO Schema.org

Per ogni pagina investitori, schema dedicato:

```json
{
  "@type": "InvestmentOrDeposit",
  "name": "Investimento immobiliare San Salvario Torino",
  "interestRate": { "minValue": 4.1, "maxValue": 4.8 },
  "amount": { "minValue": 70000 },
  "areaServed": { "@type": "Place", "name": "San Salvario, Torino" }
}
```

---

## File da creare/modificare

| File | Azione | Priorità |
|------|--------|----------|
| `src/data/investorZoneData.ts` | NUOVO - Dati 12 quartieri da Perplexity | Alta |
| `src/pages/InvestorZonePage.tsx` | NUOVO - Pagina singolo quartiere | Alta |
| `src/pages/InvestorZonesIndex.tsx` | NUOVO - Indice/dashboard zone | Alta |
| `src/components/investor/ZoneMetricCard.tsx` | NUOVO - Card metriche | Media |
| `src/components/investor/UrbanRenewalSection.tsx` | NUOVO - Sezione rigenerazione | Media |
| `src/App.tsx` | Aggiungere route `/investitori/zone/:slug` | Alta |
| `src/pages/Investors.tsx` | Aggiungere link a zone index | Media |
| `src/i18n/locales/it.json` | Traduzioni nuove chiavi | Media |
| `src/i18n/locales/en.json` | Traduzioni nuove chiavi | Media |
| `public/sitemap.xml` | Aggiungere URL pagine zone | Bassa |

---

## Stima tempi implementazione

| Fase | Attività | Stima |
|------|----------|-------|
| 1 | Creare `investorZoneData.ts` con tutti i dati Perplexity | 1 messaggio |
| 2 | Creare `InvestorZonesIndex.tsx` (dashboard) | 1 messaggio |
| 3 | Creare `InvestorZonePage.tsx` (pagina singola) | 1 messaggio |
| 4 | Routing, traduzioni e link da Investors.tsx | 1 messaggio |
| 5 | SEO (sitemap, schema) | 1 messaggio |

**Totale: 5 messaggi per implementazione completa**

---

## Note

- I dati dal PDF sono aggiornati a febbraio 2025, fonte Perplexity con citazioni OMI, Immobiliare.it, FIAIP, Nomisma
- Il rendimento netto è calcolato con IMU 0,76% e cedolare secca 21%
- Le classifiche (Top 5 rendimento, Top 5 crescita, Top 5 entry price) sono incluse nel PDF e verranno integrate nell'indice
- La separazione di route garantisce che studenti e investitori vedano contenuti ottimizzati per le loro esigenze

