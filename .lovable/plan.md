## Obiettivo

Allineare il below-the-fold della home al nuovo `LiquidHomepageStory`, eliminando lo "stacco" tra scena liquida e sezioni standard. Due interventi mirati: **3 porte audience** + **chiusura manifesto**.

Non tocchiamo: la storia liquida, le CTA flottanti (StickyCTA / WhatsAppFAB / ExitIntent / BottomNav — cleanup separato dopo), gli InvestorQuiz/InvestorSection/SellerSection esistenti come pagine deep.

---

## 1. Sostituire il blocco below-the-fold con "Tre porte"

Dopo `LiquidHomepageStory` e `TrustBadge`, rimuovere dalla home `HowItWorks` + `InvestorQuiz` + `InvestorSection` + `SellerSection` come blocchi separati e introdurre **un'unica sezione `AudienceDoors`** con 3 porte:

```text
┌──────────────────────────────────────────────┐
│  06 — Per chi             / 03               │
│                                              │
│  Tre modi di entrare nel mercato di Torino.  │
│                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐      │
│  │ Investo  │ │ Vendo    │ │ Studio   │      │
│  │          │ │ casa     │ │ a Torino │      │
│  │ Da €100  │ │ 0%       │ │ Stanze   │      │
│  │ payout   │ │ commiss. │ │ verifi-  │      │
│  │ bimestr. │ │ 60-90gg  │ │ cate     │      │
│  │          │ │          │ │          │      │
│  │ Parla →  │ │ Valuta → │ │ Cerca →  │      │
│  └──────────┘ └──────────┘ └──────────┘      │
└──────────────────────────────────────────────┘
```

Caratteristiche:
- Stesso linguaggio tipografico delle scene liquide: `font-display`, `tracking-tighter`, eyebrow `SceneIndex` riusato, italic-primary per parole chiave
- Ogni porta è una card alta full-bleed (h ~70vh desktop, stacked mobile) con hover che alza leggermente e scopre il CTA
- Niente icone generiche; ogni porta ha **una sola foto** (Lorenzo per investitori, immobile/chiavi per venditori, stanza studente per studenti)
- CTA per porta: Investo → `Parla con Lorenzo` (WhatsApp investor), Vendo → `Valutazione gratuita` (`/vendi-casa-torino`), Studio → `Esplora` (`/students`)
- Le sezioni profonde (`HowItWorks`, `InvestorQuiz`, `InvestorSection`, `SellerSection`) restano accessibili come **pagine dedicate** (già esistono come route o ancore); la home diventa più snella

## 2. Aggiungere "Manifesto di chiusura" prima del Footer

Nuovo componente `ClosingManifesto` tra `AudienceDoors` e `Footer`:

```text
┌──────────────────────────────────────────────┐
│  07 — Chiusura            / 03               │
│                                              │
│  Torino non è una scommessa.                 │
│  È un mercato che leggo ogni                 │
│  giorno, palazzo per palazzo.                │
│                                              │
│  — Lorenzo Oni-Joseph                        │
│    Founder, Jungle Rent                      │
│                                              │
│  [foto Lorenzo piccola, b/n]                 │
│                                              │
│  [Parla con Lorenzo →]                       │
└──────────────────────────────────────────────┘
```

- Stessa griglia tipografica delle scene (`text-7xl/8xl`, leading 0.92, italic-primary su una parola)
- Chiude il cerchio narrativo aperto in scena 1 ("Reddito passivo da immobili a Torino") con la voce diretta del founder
- Una sola CTA WhatsApp, identica a scena 5
- Coerente con memoria: founder unico, no cifre/% rendimento, sentence case

## 3. Motion uniforme below-the-fold

- Wrapper `<SceneReveal>` riutilizzabile: fade-up 300ms + translateY 12px, trigger su `IntersectionObserver` con `rootMargin: -15%`
- Applicato a: ogni porta di `AudienceDoors`, blocco testo/firma di `ClosingManifesto`
- Rispetta `useReducedMotion` esistente
- Niente parallax, niente scroll-pinning fuori dalla `LiquidHomepageStory` (per non competere con essa)

---

## Dettagli tecnici

**Nuovi file:**
- `src/components/home/AudienceDoors.tsx` — sezione 3 porte
- `src/components/home/ClosingManifesto.tsx` — chiusura firmata
- `src/components/home/SceneReveal.tsx` — wrapper motion riusabile (fade-up 300ms, reduced-motion safe)

**File modificati:**
- `src/pages/Index.tsx`: rimuovere import + render di `HowItWorks`, `InvestorQuiz`, `InvestorSection`, `SellerSection`; aggiungere `AudienceDoors` e `ClosingManifesto`. Mantenere `TrustBadge` subito sotto la storia liquida come unica "prova" prima delle porte.
- `src/i18n/locales/investor/it.json` + `en.json` (+ sync de/fr/es/pt/sv/zh come da standard): nuove chiavi `home.doors.*` e `home.closing.*`

**Niente backend, niente DB, niente edge functions.**

**SEO:** unico `<h1>` resta nella scena 1 di `LiquidHomepageStory`. `AudienceDoors` usa `<h2>`, ogni porta `<h3>`. `ClosingManifesto` usa `<h2>`. Le sezioni rimosse dalla home restano indicizzate via pagine dedicate (`/investitori`, `/vendi-casa-torino`, `/students`) già linkate.

**Copy (sentence case, IT primario):**
- Eyebrow porte: "06 — Per chi / 03"
- Headline porte: "Tre modi di entrare nel mercato di Torino."
- Porta 1: "Investo" / "Da €100, payout ogni 2 mesi" / CTA "Parla con Lorenzo"
- Porta 2: "Vendo casa" / "Zero commissioni, 60-90 giorni" / CTA "Valutazione gratuita"
- Porta 3: "Studio a Torino" / "Stanze verificate, contratti regolari" / CTA "Esplora"
- Manifesto: "Torino non è una scommessa. È un mercato che leggo ogni giorno, palazzo per palazzo." — firma "Lorenzo Oni-Joseph, Founder"

---

## Fuori scope (rimandato come da risposta utente)

- Cleanup CTA flottanti (StickyCTA + WhatsAppFAB + ExitIntent + ScrollQualifier + BottomNav)
- Blocco "Operazione live" con immobile corrente
- Sostituzione `TrustBadge` con striscia metriche live
- Ridisegno deep delle pagine `/investitori` `/vendi-casa-torino` `/students`
