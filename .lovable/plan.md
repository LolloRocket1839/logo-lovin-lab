

## Analisi situazione

Il prompt è un brief completo per ricostruire `/investitori`. Stack richiesto = Next.js, ma il progetto è **Vite + React + React Router** (non Next.js, non App Router, non next-intl). Devo adattare lo stack mantenendo la sostanza compliance, copy e struttura.

Servono check preliminari prima del piano: capire stato attuale di `/investitori`, sistema i18n esistente (i18next, non next-intl), pagina layout pattern, edge function emails, route inglesi.

## Decisioni di adattamento (non chiedo, sono tecniche obbligate)

- **Routing**: React Router. Creo `/investitori` (IT primario) e `/investors` (EN) come due pagine wrapper della stessa logica, oppure singola con switch locale gestito dal i18n esistente. Il progetto usa pattern bilingue via i18next con file `it.json`/`en.json` per modulo (vedi `src/i18n/locales/investor/`). Riuso quel modulo `investor` già esistente, estendendolo.
- **Stack form**: react-hook-form + zod (già presente nel progetto).
- **Email**: uso edge function `send-transactional-email` esistente (già nel sistema email queue + Resend). Niente Resend diretto, niente nuova edge function. Aggiungo 2 template React Email: `investor-info-request-confirmation` (al lead) + `investor-info-request-notification` (a `ADMIN_NOTIFICATION_EMAIL` già configurato come secret). Il Gmail destinatario lo cambia poi via secret se serve.
- **Lead persistence**: uso RPC `insert_lead` esistente con `_lead_type='investor'` + metadata strutturato (ticket, horizon, residence, declarations).
- **Tracking**: rispetto `useCookieConsent` + filtro bot, già pattern del progetto.
- **Design**: rispetto memory `mem://design/minimalist-visual-standards` (quiet luxury, no animazioni complesse). La palette del prompt (`#FAFAF7`, `#2C4A3E`, `#D4A574`) è sostanzialmente compatibile col jungle green/cream esistente — uso i token già definiti in `index.css` invece di hardcodare hex, per coerenza con il resto del sito.

## Struttura piano

### File da creare
```
src/pages/Investitori.tsx                    (rebuild completo IT)
src/pages/Investors.tsx                      (wrapper EN, stessa logica)
src/components/investitori/
  HeroSection.tsx
  TrustStripe.tsx
  FounderLetterSection.tsx
  ThesisSection.tsx
  StartupInnovativaSection.tsx
  HowItWorksSection.tsx
  TaxSection.tsx
  RisksSection.tsx
  FAQSection.tsx
  RequestInfoForm.tsx
  LegalDisclaimerFooter.tsx
src/lib/validation/investorLead.ts           (zod schema)
supabase/functions/_shared/transactional-email-templates/
  investor-info-request-confirmation.tsx
  investor-info-request-notification.tsx
```

### File da modificare
```
src/App.tsx                                   (aggiungo route /investors)
src/i18n/locales/investor/it.json + en.json   (aggiungo namespace landing.*)
                                              (estendo gli altri 6 locale con fallback EN)
supabase/functions/_shared/transactional-email-templates/registry.ts
                                              (registro 2 nuovi template)
src/lib/seo/structuredData.ts (o equivalente) (JSON-LD InvestmentOrDeposit / Service)
mem://compliance/investment-messaging-eoi     (aggiorno: pagina /investitori ora è collocamento privato, non più EOI generico)
```

### Cosa rimuovo dalla pagina attuale
Tutto ciò che configura sollecitazione pubblica:
- "€100 minimum" / qualsiasi cifra retail in homepage e meta
- Countdown / progress bar / "raccolti €X"
- "Investi ora" CTA → unica CTA "Richiedi il memorandum informativo"
- Testimonianze / "X investitori hanno già…" / urgency banners su questa pagina
- Promesse rendimento puntuali (`mem://strategy/investment-acquisition-urgency` va sospeso per /investitori)

### Compliance — implementazione concreta
1. **Honeypot field** nel form (`<input name="website" tabIndex={-1}>` nascosto)
2. **Doppio checkbox obbligatorio**: privacy + dichiarazione di iniziativa propria
3. **Disclaimer footer sticky** sul fondo della pagina (non popup)
4. **Audit trail**: salvo `submitted_at` + `user_agent` (no IP — non lo abbiamo lato client; lo logga Supabase nei `request.headers` via edge function)
5. **No A/B test su questa pagina** (escludo `/investitori` dagli AB test esistenti)

### Email flow
1. Submit → `insert_lead` RPC (lead_type=`investor`, metadata strutturato)
2. Invoke `send-transactional-email` con `investor-info-request-confirmation` → al lead
3. Invoke `send-transactional-email` con `investor-info-request-notification` → admin (`ADMIN_NOTIFICATION_EMAIL`)
4. Idempotency key: `investor-info-${email}-${timestamp}`

### SEO / structured data
- `<title>`: "Co-investi nello student housing di Torino | Jungle Rent"
- Meta description sobria, niente keyword stuffing investment
- JSON-LD `Organization` (riuso quello esistente) — **non** aggiungo `Offer` o `InvestmentOrDeposit` per evitare segnali di offerta pubblica agli LLM
- Aggiorno `public/llms-full.txt` per togliere riferimenti a "€100 minimum" su questa pagina (questo è il follow-up del piano compliance precedente, lo includo qui solo per la sezione investor)
- Hreflang IT/EN tra `/investitori` e `/investors`

### Localizzazione
- IT primario, EN parallelo (non traduzione letterale come da brief)
- Per gli altri 5 locale (DE/ES/FR/PT/ZH/SV): fallback a EN per ora — la pagina è destinata principalmente a investitori IT/CH/EU
- Aggiorno solo `it.json` e `en.json` del modulo `investor`; gli altri locale ricevono solo le chiavi minime di switch lingua

### Cosa NON faccio in questo task
- Cambio Next.js → resta Vite/React Router (impossibile cambiare framework)
- Configuro Resend diretto → uso infrastruttura email esistente
- Pubblico la pagina come "production ready" → la deployo in stato "draft for legal review by Stefano" come richiesto dall'utente
- Tocco `/investors` esistente in altri linguaggi se non necessario

### Stima
~12 file nuovi, ~5 modificati. 2 nuovi template email + 1 deploy edge functions. Nessuna migration DB (uso `insert_lead` esistente).

### Domanda rapida prima di procedere
Una sola, perché incide sul deploy:

