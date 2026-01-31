

## Piano: correzione sentence case in tutti gli articoli inglesi e nelle altre lingue (eccetto tedesco)

### Panoramica

Il sentence case richiede che solo la **prima lettera** della frase sia maiuscola, insieme ai **nomi propri**. Questa regola si applica a tutte le lingue eccetto il tedesco (che capitalizza tutti i sostantivi secondo le regole grammaticali tedesche).

---

### File da modificare

#### 1. Articoli blog inglesi (37 file)

I seguenti articoli contengono violazioni del sentence case nei titoli e nelle intestazioni:

| File | Problemi principali |
|------|---------------------|
| `eventi-torino-marzo-2026.md` | "The Great Exhibitions: Between East and Italian Seicento" → "The great exhibitions" |
| `eventi-torino-marzo-2026.md` | "Other Ongoing Exhibitions" → "Other ongoing exhibitions" |
| `eventi-torino-marzo-2026.md` | "Concerts: From Pop Stars to Sound Installations" → "Concerts" |
| `eventi-torino-marzo-2026.md` | "Musical Theater: Major Productions and Comedy Shows" → "Musical theater" |
| `eventi-torino-marzo-2026.md` | "Conferences, Talk Shows and Intellectual Encounters" → "Conferences and talks" |
| `eventi-torino-marzo-2026.md` | "How to Navigate Among So Many Events" → "How to navigate among events" |
| `cicloturismo-avanzato-torino.md` | "Turin's Cycling Infrastructure: 290 km of Paths" → "Turin's cycling infrastructure" |
| `carnevale-ivrea-battaglia-arance-2025.md` | "The History of the Ivrea Carnival" → "The history of the Ivrea Carnival" |
| `carnevale-ivrea-battaglia-arance-2025.md` | "Medieval Origins and the Legend of Violetta" → "Medieval origins and the legend of Violetta" |
| `carnevale-ivrea-battaglia-arance-2025.md` | "The Battle of Oranges: Historical Evolution" → "The battle of oranges: historical evolution" |
| `torino-nightlife-guide.md` | "Premier Nightclubs and Dance Venues" → "Premier nightclubs and dance venues" |
| `torino-nightlife-guide.md` | "Craft Beer Destinations and Gastropubs" → "Craft beer destinations and gastropubs" |
| `torino-nightlife-guide.md` | "Live Music Venues and Cultural Spaces" → "Live music venues and cultural spaces" |
| `torino-nightlife-guide.md` | "Neighborhood Nightlife Districts" → "Neighborhood nightlife districts" |
| `torino-nightlife-guide.md` | "Cocktail Bars and Lounges" → "Cocktail bars and lounges" |
| `politecnico-torino-guida-completa.md` | "History and Foundation: From Origins to Modernity" → "History and foundation" |
| `politecnico-torino-guida-completa.md` | "Academic Programs and Departments: An Articulated Structure" → "Academic programs and departments" |
| `dove-vivere-torino-studenti-politecnico.md` | "Related Articles" → "Related articles" |
| `cioccolaterie-torino-guida-completa.md` | "Royal origins and the Royal Snack" → "Royal origins and the royal snack" |
| E altri articoli... | Intestazioni con Title Case |

**Correzioni da applicare a ogni intestazione:**
- Solo prima lettera maiuscola
- Nomi propri maiuscoli: Turin, Torino, San Salvario, Politecnico, UniTO, MAO, Mika, Subsonica, Gianduiotto, Bicerin, etc.
- Acronimi maiuscoli: GTT, EDISU, WiFi, FAQ, UNESCO
- Giorni e mesi maiuscoli: January, February, Sunday, etc.

---

#### 2. File `posts.ts` - Metadati SEO

Verificare e correggere i titoli e gli excerpt in inglese che violano il sentence case.

---

#### 3. Locale files (`src/i18n/locales/`)

**File da verificare:**
- `en.json` - Inglese (verificare UI labels)
- `es.json` - Spagnolo (sentence case)
- `fr.json` - Francese (sentence case)
- `sv.json` - Svedese (sentence case)
- `zh.json` - Cinese (n/a - caratteri cinesi)

**ESCLUSO:** `de.json` (Tedesco) - I sostantivi sono maiuscoli per regola grammaticale

**Esempi di correzioni nei locale:**
- Verificare che tutti i titoli delle sezioni usino sentence case
- Button labels e CTA già corretti (verificare)

---

### Dettagli tecnici implementazione

**Passaggi per ogni file markdown inglese:**

1. Aprire il file
2. Identificare tutte le intestazioni (`#`, `##`, `###`, etc.)
3. Convertire ogni intestazione a sentence case
4. Preservare maiuscole per:
   - Nomi propri di luoghi (Turin, San Salvario, Porta Palazzo, etc.)
   - Nomi di istituzioni (Politecnico, UniTO, MAO, Teatro Regio)
   - Nomi di persone (Mika, Renato Zero, Chiharu Shiota)
   - Acronimi (GTT, EDISU, UNESCO, WiFi)
   - Nomi di brand (Gianduiotto, Bicerin, Caffarel)
   - Mesi e giorni (January, Sunday)

**Stima modifiche:**
- ~37 file markdown inglesi
- ~5-15 intestazioni per file da correggere
- ~200-400 correzioni totali

---

### Checklist finale

#### Inglese (EN)
- [ ] `eventi-torino-marzo-2026.md` - 8+ intestazioni
- [ ] `carnevale-ivrea-battaglia-arance-2025.md` - 15+ intestazioni
- [ ] `cicloturismo-avanzato-torino.md` - 10+ intestazioni
- [ ] `torino-nightlife-guide.md` - 12+ intestazioni
- [ ] `politecnico-torino-guida-completa.md` - 20+ intestazioni
- [ ] `cioccolaterie-torino-guida-completa.md` - 10+ intestazioni
- [ ] `cedolare-secca-2026-investitori.md` - 15+ intestazioni
- [ ] `dove-vivere-torino-studenti-politecnico.md` - 10+ intestazioni
- [ ] E tutti gli altri 29 articoli...

#### Spagnolo, Francese, Svedese
- [ ] Verificare `es.json`, `fr.json`, `sv.json` per titoli UI

---

### Eccezioni confermate

| Lingua | Regola |
|--------|--------|
| Italiano (IT) | Sentence case ✅ (già corretto) |
| Inglese (EN) | Sentence case ✅ (da correggere) |
| Spagnolo (ES) | Sentence case ✅ |
| Francese (FR) | Sentence case ✅ |
| Svedese (SV) | Sentence case ✅ |
| Cinese (ZH) | N/A (caratteri cinesi) |
| **Tedesco (DE)** | **Sostantivi maiuscoli** (regola grammaticale - ESCLUSO) |

---

### Risultato atteso

Dopo l'implementazione:
- ✅ Tutti i 37 articoli inglesi con intestazioni in sentence case
- ✅ `posts.ts` metadati allineati
- ✅ Locale files ES, FR, SV verificati
- ✅ Validatore sentence case passa senza warning
- ✅ Tedesco escluso (mantenere capitalizzazione corretta)

