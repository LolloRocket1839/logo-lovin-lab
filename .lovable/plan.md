

## Obiettivo
Aumentare la conversione della pagina `/investitori` da 0% (0/17 in 30 giorni) a un realistico 2-5% nei prossimi 30 giorni, con un mix di azioni "quick win" sulla pagina stessa + un piccolo budget LinkedIn da €200-500/mese per portarci traffico qualificato.

## Diagnosi (sintesi)

| Problema | Evidenza |
|---|---|
| Form troppo lungo | 9 campi obbligatori + 2 consensi. Per un primo contatto è eccessivo. |
| Nessun "soft CTA" prima del form | Chi non è pronto al form completo non ha alternative (no WhatsApp, no calendly, no email-only). |
| Hero generico | Niente numeri concreti (rendimento, payout, ticket min) above-the-fold. |
| Sezioni "rischi" + "fiscalità" prima del form | Rallentano l'utente caldo. |
| Zero ponti dal blog | Articoli investitori (Savills 55 view, cedolare 49, IRPEF 22, real assets 17) non rimandano a `/investitori` con CTA dedicate. |
| Nessuna prova sociale "movimento" | TrustStripe esiste ma non ha contatori live (es. "12 investitori in attesa"). |
| Traffico organico investitori basso | 17 sessioni/mese su `/investitori`, no campagne ads attive. |

## Piano in 3 fasi (in ordine di priorità)

### Fase 1 — Quick wins pagina /investitori (questa settimana)

**1.1 Aggiungere "Quick Contact Bar" sticky in cima alla pagina**
Una barra fissa (sotto la nav) con 2 pulsanti: `WhatsApp Lorenzo` + `Email rapida (solo email)`. Visibile da subito, non costringe a scrollare fino al form lungo.

**1.2 Hero con numeri concreti**
Sostituire il sottotitolo generico con 3 metriche above-the-fold:
- Rendimento target: "8-12% lordo annuo"
- Payout: "Ogni 2 mesi"  
- Ticket: "Da €5k"
+ CTA primaria "Parla con Lorenzo" (apre WhatsApp con messaggio precompilato) + CTA secondaria "Ricevi il memorandum" (che porta al form).

**1.3 Form a due livelli — "Email-first" + "Profilo completo"**
Il form attuale resta ma diventa **opzionale/secondario**. Aggiungo sopra un mini-form a 2 campi (nome + email) che invia subito un lead `investor-cold`. Il form lungo serve solo a chi vuole il memorandum e si qualifica.

Risultato: catturo email anche da chi non si sente di compilare 9 campi, e nutro via email transazionale.

**1.4 Riordinare le sezioni**
Spostare `RisksSection` + `TaxSection` **dopo** il form (chi è interessato scrolla e trova approfondimenti). `FAQSection` resta prima. Riduce attrito percepito.

**1.5 Aggiungere micro-prove sociali**
Sotto l'hero: "X persone hanno chiesto info nelle ultime 4 settimane" (numero reale dal DB, anche se basso). Più una citazione/testimonianza breve se disponibile, altrimenti la card "Startup Innovativa CCIAA Torino" più visibile.

### Fase 2 — Funnel blog → /investitori (settimana 2)

**2.1 CTA banner dedicate negli articoli investitori**
Creo un componente `InvestorCTABanner` che si inserisce a metà e a fine dei 4 articoli investitori ad alta lettura:
- `cedolare-secca-2026-investitori` (49 view)
- `student-housing-italia-savills-2025` (55 view)
- `irpef-vs-cedolare-secca-2026-investitori` (22 view)
- `investire-real-assets-torino-2025` (17 view → 35 con duplicati)

Il banner contiene: titolo contestuale ("Stai valutando di investire in student housing a Torino?"), 2 bullet (rendimento + payout), CTA "Scopri come" → `/investitori#hero`.

**2.2 Tracking conversioni blog → form**
Aggiungere `utm_source=blog&utm_medium=cta&utm_campaign=<slug>` alle CTA per misurare quale articolo converte meglio.

### Fase 3 — Acquisizione paid + organico (settimana 3-4, budget €200-500/mese)

**3.1 LinkedIn Ads — Lead Gen Forms (€200-300/mese)**
- Targeting: Italia + Svizzera, età 30-65, job title "Investor / Wealth Manager / Imprenditore / Libero professionista", interessi "real estate investing".
- Creatività: 1 single-image ad ("Investi in student housing a Torino, payout ogni 2 mesi, da €5k") + 1 carousel sui rendimenti.
- Form LinkedIn nativo (3 campi: nome, email, telefono) → webhook su `insert_lead` (`source=linkedin-ads`).
- Budget: €10-15/giorno per 20 giorni = ~€250.

**3.2 Google Ads keyword ad alta intenzione (€100-200/mese)**
- Keyword: "investire student housing Torino", "comprare casa a reddito Torino", "investimenti immobiliari Torino rendimento".
- Match exact/phrase. Landing diretta `/investitori?utm_source=google-ads`.
- Budget: €5-10/giorno.

**3.3 Personal branding LinkedIn di Lorenzo (organico, gratis)**
Suggerimento operativo (no codice): 2 post/settimana di Lorenzo su LinkedIn — case study acquisizioni, numeri reali, foto cantiere/sopralluoghi. Nel sito aggiungere link al profilo LinkedIn di Lorenzo nel footer e nella `FounderLetterSection`.

## Misurazione

Nuovi eventi analytics da loggare:
- `investor_quick_contact_click` (WhatsApp / email-quick)
- `investor_form_email_only_submit`
- `investor_form_full_submit`  
- `investor_blog_cta_click` con `metadata.article_slug`

Dashboard di confronto a 30 giorni: sessioni `/investitori`, conversion rate per sorgente, lead totali per `lead_type=investor`.

## File coinvolti (stima)

**Codice nuovo/modificato (~10 file):**
- `src/components/investitori/HeroSection.tsx` — numeri + 2 CTA
- `src/components/investitori/QuickContactBar.tsx` — **nuovo**
- `src/components/investitori/EmailFirstForm.tsx` — **nuovo** (form a 2 campi)
- `src/components/investitori/SocialProofMini.tsx` — **nuovo**
- `src/pages/Investors.tsx` — riordino sezioni + nuovi componenti
- `src/components/blog/InvestorCTABanner.tsx` — **nuovo**
- 4 file blog markdown investitori — inserimento banner via shortcode
- `src/i18n/locales/it.json` + `en.json` — nuove stringhe
- `src/hooks/useAnalytics.ts` + edge function `track-analytics` — whitelist nuovi eventi

**Nessuna modifica DB** (uso `insert_lead` RPC esistente con nuovi `source`).

**Config esterne (gestite da te, non in codice):**
- Setup LinkedIn Campaign Manager
- Setup Google Ads account
- Webhook LinkedIn Lead Gen → endpoint Supabase

## Cosa NON faccio
- Non tocco DB / RLS / auth
- Non modifico la logica `insert_lead`
- Non aggiungo nuove tabelle
- Non rimuovo il form lungo (resta come "qualificazione completa")
- Non gestisco budget/account LinkedIn-Google al posto tuo (ti do solo briefing)

## Cosa propongo di fare PRIMA (questa sessione)
**Solo Fase 1** (quick wins pagina). Le altre fasi le facciamo step-by-step nei prossimi messaggi così vediamo l'effetto di una alla volta e non mescoliamo le variabili.

