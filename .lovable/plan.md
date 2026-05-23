
# Step 4 — Property intelligence + outreach manuale assistito

Obiettivo: ogni mattina Lorenzo apre `/admin/seller-radar` e vede una lista curata di 5-15 annunci "vendesi privato" pubblicati nelle ultime 48h in zona Lingotto / Nizza Millefonti / Mirafiori Nord, ordinati per probabilità di chiusura. Da lì scrive **a mano** dal portale, con messaggio pre-compilato e tracking.

Niente invio automatico, niente raccolta massiva di numeri di telefono. Lo scraping serve solo a **scoprire** annunci e prezzi — il contatto avviene sempre via portale, con consenso implicito della funzione "Contatta inserzionista".

## Architettura

```text
   ┌──────────────────────────────────────────┐
   │  property-radar-cron (daily 07:30 UTC)   │
   │  → Firecrawl: lista annunci per zona     │
   │  → upsert in `property_listings`         │
   │  → calcolo lead_score                    │
   └──────────────────────────────────────────┘
                       │
                       ▼
   ┌──────────────────────────────────────────┐
   │  /admin/seller-radar (Lorenzo)           │
   │  - Tabella annunci nuovi/scaduti/ribasso │
   │  - Filtri zona, prezzo, mq, "solo privati"│
   │  - Bottone "Apri annuncio" + "Marca contattato"│
   │  - Copy template messaggio pre-compilato │
   └──────────────────────────────────────────┘
                       │
                       ▼
   ┌──────────────────────────────────────────┐
   │  Conversione → lead manuale              │
   │  Quando un proprietario risponde,        │
   │  Lorenzo crea lead da CRM esistente      │
   │  con source = "radar-immobiliare-priv"   │
   └──────────────────────────────────────────┘
```

## Deliverable

### 1. Tabella `property_listings`
Campi principali:
- `id` (uuid), `portal` ('immobiliare' | 'idealista' | 'subito')
- `external_id`, `url` (unique combo)
- `title`, `zone`, `price_eur`, `sqm`, `rooms`, `floor`, `condition`
- `is_private_seller` (boolean, fondamentale: filtriamo solo privati)
- `first_seen_at`, `last_seen_at`, `price_history` (jsonb), `status` ('active'|'sold'|'expired')
- `lead_score` (0-100, calcolato), `contacted_at`, `contact_notes`, `converted_lead_id` (FK)
- **NIENTE** colonne `seller_phone`, `seller_email`, `seller_name` — non li scrapiamo, non li archiviamo
- RLS: solo admin (Lorenzo) può leggere/scrivere; service role per il cron

### 2. Edge function `property-radar-cron`
Eseguita giornalmente (07:30 UTC) via `pg_cron`:
1. Per ogni combo (portale, zona target) lancia Firecrawl `/search` o `/scrape` su URL di listing (es. `immobiliare.it/vendita-case/torino/lingotto-italia-61/`)
2. Estrae solo metadati pubblici di annuncio: titolo, prezzo, mq, link, flag privato
3. Upsert in `property_listings` su `(portal, external_id)`
4. Se prezzo cambia → append in `price_history` + alert "ribasso"
5. Se sparisce per 7 giorni → status `expired`
6. Calcola `lead_score` con formula:
   - +30 se privato (no agenzia)
   - +20 se prezzo €50k-€130k (target acquisizione)
   - +15 se "da ristrutturare" / "ristrutturare"
   - +10 se zona priority (Lingotto, Nizza, Mirafiori N.)
   - +15 se online da >60gg (proprietario stanco)
   - +10 se ribasso ≥5% nelle ultime 2 settimane

Rate limit: max 1 richiesta Firecrawl/2s, max 200 annunci/giorno. User-agent identificabile come bot. Rispetto `robots.txt` (Firecrawl lo fa nativamente).

### 3. Pagina `/admin/seller-radar`
- Tabella con: thumbnail (se disponibile via OG), titolo, zona, prezzo, mq, €/mq, giorni online, ribasso %, score, flag "privato", flag "già contattato"
- Filtri: zona (chip multipli), range prezzo, solo privati (default ON), solo non contattati (default ON), ordinamento (score desc / nuovi / ribasso)
- Per ogni riga:
  - Bottone "Apri annuncio" (apre link portale in nuova tab)
  - Bottone "Copia template messaggio" → copia negli appunti il copy preformattato (vedi sotto)
  - Bottone "Marca come contattato" → set `contacted_at = now()`, prompt nota libera
  - Bottone "Crea lead" → preset form lead con `source=radar-immobiliare-priv` e metadata immobile
- Vista compatta mobile-friendly perché Lorenzo lavorerà da telefono al bar

### 4. Template messaggio outreach
Copy onesto, sentence case, conforme:

```
Buongiorno, ho visto il suo annuncio per l'appartamento in [zona].
Sono Lorenzo, acquisto direttamente case in zona Lingotto/Nizza Millefonti
per metterle a reddito con studenti universitari.
Non sono un'agenzia: zero commissioni, rogito in 60-90 giorni.
Se le interessa una valutazione senza impegno, mi scrive su WhatsApp?
+39 379 139 8291 - junglerent.it
Grazie, Lorenzo Oni-Joseph
```

Salvato come record in tabella `outreach_templates` per A/B variants future.

### 5. Compliance & guardrail tecnici
- **Privacy footer**: pagina `/admin/seller-radar` mostra in alto banner: "Dati pubblici aggregati per ricerca di mercato. Nessun contatto del venditore viene archiviato. Outreach via canale ufficiale del portale, manualmente."
- **Robots.txt awareness**: Firecrawl rispetta robots.txt; se un portale lo blocca su una sezione, skippiamo
- **Throttling**: max 200 fetch/giorno totali distribuiti su 3 portali
- **Audit log**: tabella `radar_fetch_log` (timestamp, portal, n_listings_found, n_new, errors)
- **Kill switch**: secret `RADAR_ENABLED` (true/false). Se false, cron esce subito
- **No FB Marketplace**: escluso esplicitamente per ToS Meta + difficoltà tecniche

### 6. Integrazione con CRM esistente
Nuovo `lead_type` valore? **No**, riusiamo `seller` con `source='radar-immobiliare-priv'` o `'radar-idealista-priv'` o `'radar-subito-priv'`. Filtro chip dedicato in `LeadsToolbar` "Pipeline radar".

Il `lead_score` del listing **non** è il lead score CRM: quando si crea il lead, partiamo da `priority='high'` se score ≥60, `medium` altrimenti.

## File da creare/modificare

- `supabase/migrations/<ts>_property_radar.sql`
  - tabella `property_listings` + RLS admin-only
  - tabella `radar_fetch_log` + RLS
  - tabella `outreach_templates` + seed 1 template default
- `supabase/functions/property-radar-cron/index.ts` (nuova edge function)
- `src/pages/admin/SellerRadar.tsx` (nuova pagina)
- `src/components/admin/radar/RadarTable.tsx`, `RadarFilters.tsx`, `RadarRowActions.tsx`
- `src/components/AnimatedRoutes.tsx` — aggiunta route `/admin/seller-radar`
- `src/components/admin/leads/LeadsToolbar.tsx` — chip "Pipeline radar"
- Secrets necessari: `FIRECRAWL_API_KEY` (via connector), `RADAR_ENABLED` (kill switch)
- Schedulazione cron via `supabase--insert` (pattern uguale a student/seller-nurture)

## Cosa NON è incluso

- Invio automatico messaggi (manuale per design)
- Scraping di numeri di telefono / email del venditore
- Facebook Marketplace
- Casa.it (ToS aggressivi, basso volume privati a Torino)
- OCR di foto annunci / floorplan analysis (futuro)
- Notifiche push o WhatsApp al cambio prezzo (futuro Step 5)

## Connettore richiesto

**Firecrawl** — già documentato come connettore preferito per scraping web. Costo: piano Standard sufficiente (~3000 page-credits/mese coprono 200 listing/giorno × 30 = 6000 fetch, ma molti riusano cache).

## Domanda di conferma

Procedo con questo step così, oppure preferisci:
- (a) Partire solo con **Immobiliare.it** in versione MVP (poi aggiungere Idealista/Subito in Step 4b)?
- (b) Aggiungere subito anche notifiche WhatsApp giornaliere a Lorenzo con i top 3 annunci del giorno?
