

# Analisi performance & piano di ottimizzazione

## 1. Cosa dicono i dati (ultimi 90 giorni)

**Traffico:** 2.616 visitatori, 4.217 pageview, 1,61 pageview/sessione, **bounce rate 87%**, durata media sessione bassa.

**Trend:** crescita marcata da inizio aprile (40–60 visite/giorno vs 20–30 a gennaio). Il traffico cresce ma la qualità peggiora (bounce 92–98% nelle ultime 2 settimane).

**Geografia problematica:** CN = 487 visite (2° paese dopo IT), US = 434, "Unknown" = 429. Probabile traffico bot/crawler che il filtro `isLikelyBot` non cattura — gonfia bounce e abbassa engagement.

**Pagine top:**
- `/` (homepage) — 643 pv
- 9 articoli blog dominano il resto (quartieri sicuri donne, student housing Savills, cedolare secca, aule studio…)
- Le pagine commerciali (`/studenti`, `/investitori`, `/vendi`) sono fuori dalla top 10

**A/B test attivi (30 gg):**
| Test | Variante | Impressions | Click | CTR |
|---|---|---|---|---|
| hero_headline | A | 362 | 3 | **0,83%** |
| hero_headline | B | ~362* | 2 | **0,55%** |
| whatsapp_fab | A | 23 | 0 | 0% |
| whatsapp_fab | B | 34 | 0 | 0% |

*Le impressions di B non vengono registrate correttamente: vedi dati grezzi → probabile bug di tracking o assegnazione 50/50 sbilanciata. CTR hero <1% è **molto basso** (benchmark sano = 3–8%).

**Eventi click (30 gg):** solo 51 click totali. I top sono navigazione (`nav_back_button`, `bottom_nav_*`), non conversioni. Solo **1 `quick_investor_lead_submit`** in 30 giorni → il funnel investitore non converte.

## 2. Diagnosi dei problemi

1. **Bot non filtrati** (CN/Unknown = 35% del traffico) inquina tutte le metriche e fa apparire CTR e bounce peggiori.
2. **A/B test hero non statisticamente significativo** + tracking impression rotto su variante B (vedi tabella).
3. **Hero CTA debole**: il bottone "Inizia a investire" ha CTR <1% — testo generico, nessuna prova sociale immediata, nessuna scarsità/urgenza.
4. **Blog non converte**: 9 articoli portano la maggior parte del traffico ma non hanno CTA contestuali tracciate (0 click su `blog_*` salvo 1 `read_more`).
5. **Quiz investitore funziona**: 9 click `quiz_answer` → 1 `quiz_see_result_cta` → 1 submit. Conversion rate quiz→submit ~11%, ma solo 9 lo iniziano. Va promosso di più.
6. **WhatsApp FAB invisibile**: 57 impressions in 30 gg, 0 click. O è poco visibile, o appare troppo tardi.

## 3. Piano d'azione (priorità ordinata)

### A. Pulizia dati (immediato, sblocca tutto il resto)
- Estendere `isLikelyBot` con: filtro su `navigator.webdriver`, IP CN-only senza `Accept-Language` italiano/inglese, user-agent pattern `HeadlessChrome`, `python-requests`, `Go-http-client`.
- Aggiungere lato edge function `track-analytics` un blocco server-side: scartare eventi senza `Accept-Language`, con UA in lista nera, o con session_id che genera >50 page_view in <60s.
- Risultato atteso: bounce rate reale 60–70%, metriche A/B affidabili.

### B. Fix A/B test infrastructure
- Investigare perché `hero_headline` variante B ha 0 impressions registrate (la tabella mostra solo A in impression). Probabile race condition fra `setVariation` e `trackHeroImpression` in `ImmersiveHero.tsx` (l'effect parte con `variation='A'` di default prima del re-render).
- Fix: spostare `trackHeroImpression()` in un effect che dipende da `heroVariation` e parte solo dopo che il valore è confermato da localStorage.

### C. Nuovi A/B test ad alto impatto (sostituire quelli morti)

**Test 1 — Hero CTA copy + social proof inline** (priorità massima, CTR attuale <1%)
- A: "Inizia a investire →" (attuale)
- B: "Vedi rendimenti reali (8–12% annuo) →" + microcopy "127 investitori in lista d'attesa"

**Test 2 — Posizione del Quiz Investitore**
- A: dopo HowItWorks (attuale, posizione 3)
- B: come primo modulo dopo l'hero (sostituisce TrustBadge come primo elemento sotto hero)
- Obiettivo: aumentare quiz_answer da 9 → 50+/mese

**Test 3 — Exit intent: form vs calendly**
- A: form email (attuale, 15 shown / 0 submit)
- B: bottone "Prenota call 15 min con Lorenzo" → calendly inline

### D. Conversion Rate Optimization (no test, fix diretti)

1. **CTA contestuali nei blog top 5** — inserire dopo il primo paragrafo un box "Stai cercando casa a Torino?" / "Vuoi investire in questo mercato?" con link `/studenti` o `/investitori` tracciato come `blog_inline_cta_<slug>`.
2. **WhatsApp FAB più visibile** — appare già a `scrollY > 400`, ma il colore `bg-foreground` (nero) si confonde. Test colore verde WhatsApp brand (#25D366) per 1 settimana.
3. **Mostrare il quiz come prompt** dopo 30s sulla homepage o al raggiungimento del 50% scroll, invece di aspettare che l'utente arrivi alla sezione.
4. **Prefetch route commerciali** — al primo scroll, `<link rel="prefetch">` per `/studenti`, `/investitori`, `/vendi` (oggi sono lazy chunks separati).

### E. Performance tecnica (secondaria)
- I chunk vendor sono già splittati bene. Aggiungere `vendor-supabase` esplicito (oggi finisce in main bundle).
- Le immagini hero/logo già ottimizzate (memoria `load-speed-optimization`). Verificare LCP reale con `browser--performance_profile` post-deploy.

## 4. Ordine di implementazione consigliato

```text
Step 1 → Pulizia bot (A) + Fix tracking impression B (B)   [1 sessione]
Step 2 → Nuovi A/B test 1 e 2 (hero copy, quiz position)   [1 sessione]
Step 3 → CTA contestuali blog + WhatsApp colore (D1, D2)   [1 sessione]
Step 4 → Quiz prompt scroll + prefetch routes (D3, D4)     [1 sessione]
Step 5 → Test exit intent calendly (C3)                    [1 sessione]
```

## 5. Cosa misurare dopo 14 giorni

- Bounce rate target: <70% (oggi 87%)
- Hero CTA CTR target: >3% (oggi 0,83%)
- `quick_investor_lead_submit` target: >10/mese (oggi 1)
- `quiz_answer` target: >50/mese (oggi 9)

**Vuoi che proceda con lo Step 1 (pulizia bot + fix impression B)?** Posso anche implementare Step 1+2 insieme se preferisci partire forte.

