# Business Model Messaging Correction: Per-Apartment Investment

## What the user is clarifying

The current site describes investors as buying "quote del portafoglio immobiliare" (portfolio shares) — implying a blind-pool fund where money is mixed across all properties. The actual model is different:

- Jungle Rent identifies and acquires a **specific apartment**
- Investors invest in **Jungle Rent** for that **specific apartment**
- Jungle Rent manages the apartment (contracts, tenants, maintenance)
- Investors earn returns from that specific apartment's rental income

This is a deal-by-deal structure, not a diversified fund. The distinction matters both for investor trust (you know exactly what you're investing in) and for legal/regulatory clarity.

---

## Where the wrong copy lives today

The phrase "acquisti quote del portafoglio immobiliare" (you buy portfolio shares) appears across:

- `src/i18n/locales/it.json` — hero badgeExplanation, miniFaq.whatBuyAnswer, howItWorks.steps.invest.desc, investor FAQs (investorA2, investorA9, voiceA1), about.service4Desc
- `src/i18n/locales/en.json` — same keys in English
- `src/components/StructuredData.tsx` — FAQ schema answer about investing from €100

---

## Proposed copy changes

The new framing: **"Investi in Jungle Rent per un appartamento specifico"** — you know which apartment your money goes into, Jungle Rent handles everything.

### Key string replacements (Italian)


| Location                       | Current                                                                                                                                               | New                                                                                                                                                                                                                                                                    |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `hero.badgeExplanation`        | "Acquisti quote del nostro portafoglio immobiliare. Zero gestione, rendite trimestrali."                                                              | "Partecipi a un appartamento specifico acquisito da Jungle Rent. Zero gestione, rendite trimestrali."                                                                                                                                                                  |
| `hero.miniFaq.whatBuyAnswer`   | "Acquisti quote di partecipazione nel portafoglio immobiliare di Jungle Rent. Non un immobile intero, ma una frazione del nostro patrimonio gestito." | "Investi in Jungle Rent per un appartamento specifico che acquistiamo e gestiamo noi. Sai esattamente dove va il tuo capitale."                                                                                                                                        |
| `howItWorks.steps.invest.desc` | "A partire da €100, acquisti quote del nostro portafoglio immobiliare"                                                                                | "A partire da €100, investi in Jungle Rent per un appartamento specifico"                                                                                                                                                                                              |
| `howItWorks.investors.point4`  | "Portafoglio diversificato"                                                                                                                           | "Appartamento specifico e trasparente"                                                                                                                                                                                                                                 |
| `faq.investorA2`               | "Investi in quote del portafoglio immobiliare di Jungle Rent..."                                                                                      | "Investi in Jungle Rent per un appartamento specifico che selezioniamo e acquistiamo noi. Sai esattamente in quale immobile entra il tuo capitale. Poi gestiamo tutto: inquilini, contratti, manutenzione. I risultati di quell'appartamento generano le tue rendite." |
| `faq.investorA9`               | "Puoi investire nel portafoglio immobiliare di Jungle Rent a partire da €100..."                                                                      | "Puoi investire in Jungle Rent a partire da €100 per un appartamento specifico. Non un fondo anonimo: sai quale immobile stai finanziando. Jungle Rent acquisisce, gestisce e distribuisce le rendite."                                                                |
| `faq.voiceA1`                  | "Acquisti una quota del portafoglio immobiliare..."                                                                                                   | "Investi in Jungle Rent per un appartamento specifico che selezioniamo nelle zone universitarie di Torino. Sai dove va il tuo capitale, noi gestiamo il resto."                                                                                                        |
| `about.service4Desc`           | "investire nel nostro portafoglio immobiliare a partire da €100"                                                                                      | "investire in Jungle Rent per un appartamento specifico a partire da €100"                                                                                                                                                                                             |


Same changes mirrored into `en.json`.

### StructuredData.tsx FAQ answer

Current: "Acquisti una quota del portafoglio immobiliare e partecipi ai risultati della gestione."
New: "Investi in Jungle Rent per un appartamento specifico che acquistiamo e gestiamo noi nelle zone universitarie di Torino."

---

## Technical scope

- `**src/i18n/locales/it.json**` — update 8 string values across hero, howItWorks, faq, about sections
- `**src/i18n/locales/en.json**` — mirror the same 8 changes in English
- `**src/components/StructuredData.tsx**` — update 1 FAQ schema answer

No component restructuring needed. No new dependencies. These are pure copy changes within existing translation keys.

---

## What does NOT change

- The €100 minimum investment figure
- The "Zero gestione" positioning
- The quarterly returns messaging
- All CTA buttons and dialog flows
- The HowItWorks 4-step visual structure (Investi → Acquistiamo → Gestiamo → Guadagni)
- The Sellers page (unrelated to this model clarification)