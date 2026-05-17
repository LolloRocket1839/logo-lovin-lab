## Obiettivo

Eliminare qualsiasi **percentuale di rendimento** (es. "7‑9%", "8,34%", "Rendimento lordo 6‑7%") da tutte le superfici pubbliche del sito. Restano consentite le percentuali NON di rendimento (commissioni agenzia 3‑4%, risparmio studenti 25%, margine valutativo ±5‑12%, crescita prezzi +15‑25%, vacancy/occupancy), perché non sono promesse di ritorno sull'investimento.

Sostituzione standard:
- IT: "Rendimento potenziale variabile, legato alla singola operazione"
- EN: "Potential return varies by individual operation"
- Niente cifre, niente range, niente confronti numerici BTP/conti deposito.

## Superfici da bonificare

### 1. Homepage e sezione investitori
- `src/components/sections/InvestorSection/InvestorSectionDesktop.tsx` — rimuovere ogni metrica "%" presentata come rendimento (mantenere 87% / 12,6% solo se etichettati come dato di domanda/offerta, non come rendimento).
- `src/components/sections/InvestorSection/InvestorSectionMobile.tsx` — idem.
- `src/components/innovative/ImmersiveHero.tsx` — verificare e rimuovere eventuali claim di rendimento.
- `src/components/investitori/HeroSection.tsx` — sostituire `yieldValue` con stringa qualitativa.
- `src/components/investitori/ThesisSection.tsx`, `TaxSection.tsx`, `SocialProofMini.tsx`, `TrustStripe.tsx` — passare in rassegna e rimuovere riferimenti numerici al rendimento.

### 2. Calcolatore di rendimento
- `src/components/investor/YieldCalculator.tsx` — opzioni:
  - **(a)** rimuovere il componente dalla pagina e nasconderlo,
  - **(b)** trasformarlo in "Simulatore esplorativo" che mostra solo input (capitale, durata) senza output numerico di yield/ritorno, con CTA "Parla con Lorenzo per una proiezione personalizzata".
  - Default proposto: **(b)** — mantiene engagement senza promettere ritorni.
- Rimuovere `GROSS_YIELD = 0.0834`, le barre comparative con BTP/conti deposito, le stringhe "8,34%", "21%", "BTP 3,5%", "Conto deposito 3%".

### 3. Pagine zone investitori
- `src/data/investorZoneData.ts` — i campi `grossYield` e `netYield` restano nel data layer (servono internamente), ma:
  - le `seo.title`/`seo.description` con "Rendimento 6‑7%" vengono riscritte senza cifre (es. "Investire a Cenisia Torino | Zona ad alto potenziale studentesco").
- `src/pages/InvestorZonePage.tsx` — nascondere visivamente le card "Rendimento lordo" / "Rendimento netto" (rimuovere `formatYield(...)` dalle metric card e dai blocchi descrittivi). Rimuovere `minValue`/`maxValue` dal JSON‑LD generato.
- `src/pages/InvestorZonesIndex.tsx` — rimuovere il blocco hero che mostra `{topYieldZones[0].grossYield.min}-{...max}%` e il ranking "top yield".

### 4. FAQ e schema
- `src/pages/FAQ.tsx` — riscrivere la Q&A "rendimento target 7‑9%" → risposta qualitativa che rimanda al colloquio con Lorenzo.
- `src/lib/schema/index.ts` — rimuovere "Rendimento target 7‑9% annuo" / "Target yield 7‑9% annually" dalle description.

### 5. Contenuti AI / SEO
- `public/llms.txt`, `public/llms-full.txt`, `public/.well-known/agent-card.json`:
  - rimuovere "Gross 9‑13%, net 5.3‑8.5% yields by zone",
  - aggiornare descrizione del tool `get_investment_data` togliendo i tag "yield" / "returns" come metrica numerica,
  - lasciare riferimenti ai dati OMI (prezzi, vacancy) ma non rendimenti.
- `src/pages/Index.tsx` (meta keywords) — rimuovere "rendita immobiliare torino, rendimenti immobiliari".

### 6. Locali i18n (7 lingue)
File: `src/i18n/locales/{it,en,de,fr,es,pt,zh,sv}.json` e `src/i18n/locales/investor/*.json`.
Chiavi da bonificare (lista non esaustiva, derivata dalla ricognizione):
- `*.guide3Bullet3` → "Rendimenti 7‑9% vs 4‑5% di Milano" → "Mercato studentesco strutturalmente più dinamico di Milano"
- chiavi `title` con "Guadagna il 7‑9% annuo" / "Earn 7‑9% annually" / equivalenti DE/FR/ES/ZH/SV → "Costruisci rendita nel tempo" / "Build long‑term income"
- "Trasforma €100k in €7‑9k di rendita annua" → "Trasforma il tuo capitale in rendita ricorrente"
- chiavi `investor.landing.hero.metrics.yieldValue` → stringa qualitativa
Sincronizzazione IT primaria → EN fallback → resto secondo lo standard di traduzione.

### 7. Blog
- Articolo `rendimento-student-housing-torino-2026` (citato in llms.txt): se contiene cifre nel titolo SEO/meta o nel corpo, vanno riscritte in chiave qualitativa. Da verificare a parte se il file `.md` ha numeri nel titolo.
- Inline CTA / link interni che ripetono "7‑9%" vanno aggiornati.

## Fuori scope

- Commissioni di agenzia (3‑4%), risparmio studenti (25%), margine valutativo (±5‑12%), crescita prezzi attesa di zona (+15‑25%), vacancy/occupancy: NON sono percentuali di rendimento dell'investimento e restano.
- Nessuna modifica al modello di business, al data layer interno `investorZoneData.ts` (i numeri restano disponibili per uso interno post‑qualifica), alla logica di lead capture o ai contratti.
- Nessuna nuova pagina, nessun cambio routing.

## Compliance allineata

Coerente con la memoria `EOI Compliance` e `Investment Model`: niente promesse di ritorno su superfici pubbliche; le proiezioni numeriche si presentano solo nel memorandum post‑qualifica via colloquio con Lorenzo.

## Verifica finale

1. `rg -n 'yield|rendiment|return.*%|\d+\s*-\s*\d+\s*%' src public` non deve più trovare cifre presentate come rendimento dell'investimento.
2. Screenshot mobile/desktop di: homepage, `/investitori`, `/investitori/zone`, una pagina zona, FAQ, calcolatore.
3. Aggiornare la memoria `EOI Compliance` con la regola: "Nessuna percentuale di rendimento su superfici pubbliche, mai".
