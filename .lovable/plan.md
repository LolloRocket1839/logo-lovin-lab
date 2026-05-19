# Investor Conversion Lift — piano ibrido

Obiettivo: aumentare conversion rate del funnel investitori (/investitori), da view → email-first → qualified lead (RequestInfoForm). Approccio ibrido: deploy subito 6 quick-wins basati su best practice CRO, in parallelo instrumento il drop-off per misurare l'impatto e iterare.

## Diagnosi rapida (cosa c'è oggi)

- `HeroSection` → `SocialProofMini` → `TrustStripe` → **EmailFirstForm** (2 campi: nome+email) → `FounderLetterSection` → Thesis → StartupInnovativa → HowItWorks → FAQ → **RequestInfoForm** (form lungo, ~10 campi + 4 consensi) → LegalDisclaimer.
- `QuickInvestorLeadDialog` esiste ma viene aperto solo da Navigation/MobileHeader/BottomNav/ImmersiveHero — **non** dalla pagina /investitori.
- `InvestorExitIntentPopup` esiste — verifico se è montato.
- Tracking: `trackEvent("investor_form_email_only_submit")` parte solo al submit. **Manca** tracking di: form_view, field_focus, field_abandon, dialog_open, scroll_depth sul form lungo.
- WhatsApp configurato (`CALLMEBOT_API_KEY` + `WHATSAPP_NOTIFY_NUMBER`) → notifica admin OK.

## Parte 1 — Quick-wins CRO (deploy immediato)

### 1. Sticky mobile CTA persistente
Banner sticky bottom su /investitori (mobile only) con due azioni: "💬 WhatsApp Lorenzo" + "📧 Lascia email". Sempre visibile durante scroll → cattura intenti in qualsiasi punto del funnel. Si nasconde quando RequestInfoForm è in viewport.

### 2. EmailFirstForm: ridurre a 1 campo + micro-commitment
- Rimuovere campo "nome" dal form sopra-piega → solo email (riduzione friction ~30-40% in benchmark CRO).
- Post-submit chiedere il nome in step 2 inline (progressive profiling): l'utente è già committed.
- Aggiungere micro-trust line sotto al button: "🔒 Niente spam · Risposta entro 24h · Lorenzo in persona".
- Cambiare CTA da generico "Invia" a outcome-driven: "Ricevi memorandum + chiamata 15 min".

### 3. Social proof live e specifico
- `SocialProofMini` oggi mostra metriche statiche. Aggiungere notification toast non-invasivo ogni 30-45s: "Marco da Milano ha richiesto info 12 min fa" (rotating pool di 8-10 nomi/città realistici, no fake data — usiamo eventi reali aggregati da `leads` table degli ultimi 30gg).
- Counter sopra EmailFirstForm: "X investitori già qualificati questo mese" (query reale su `investor_interest`).

### 4. Quick-dialog trigger su /investitori
Montare `QuickInvestorLeadDialog` con due trigger:
- **Scroll 60%** della pagina senza submit → dialog soft "Hai domande? 30 secondi per parlare con Lorenzo".
- Bottone secondario nell'hero "📱 WhatsApp diretto" → apre dialog/wa.me con prefill.

### 5. RequestInfoForm: split in 3 step (multi-step wizard)
Il form lungo (10 campi + 4 checkbox) è il principale punto di abbandono. Ristrutturazione:
- **Step 1** (low friction): nome, email, telefono, paese — "Iniziamo a conoscerci".
- **Step 2** (qualificazione): tipo investitore, range importo, timeline — "Aiutaci a personalizzare la proposta".
- **Step 3** (compliance): accredited investor, aree, consensi — "Ultimo passaggio legale".
- Progress bar in alto + "Step 1 di 3 · Solo 30 secondi". Auto-save in localStorage tra step (se l'utente esce e torna).
- **Lead parziale**: alla fine dello Step 1 inviare già `insert_lead` con `metadata.stage='partial'` → anche chi abbandona dopo Step 1 diventa lead recuperabile.

### 6. Trust signal hero rafforzato
- Aggiungere sotto headline: foto Lorenzo + "Lorenzo Oni-Joseph · Founder · Risponde personalmente in 24h" (face = +30% trust in benchmark landing investor).
- Badge "S.r.l. iscritta Registro Startup Innovative · Sede Torino" inline visibile sopra-piega (oggi è solo nel TrustStripe sotto).

## Parte 2 — Tracking drop-off (setup parallelo)

Eventi `analytics_events` da aggiungere per misurare CR reale e identificare prossimi colli di bottiglia:

- `investor_page_view` (con `referrer`, `utm_*`)
- `investor_hero_cta_click`
- `investor_email_form_view` (IntersectionObserver, soglia 50%)
- `investor_email_form_field_focus` (email, name)
- `investor_email_form_submit_success` (già esiste)
- `investor_quickdialog_open` / `_submit`
- `investor_full_form_view`
- `investor_full_form_step_view` (step 1/2/3)
- `investor_full_form_step_complete`
- `investor_full_form_abandon` (beforeunload se step >0 e non submitted)
- `investor_whatsapp_click` (sticky CTA + hero)
- `investor_exit_intent_shown` / `_submit`

Dashboard admin minimo in `/admin/leads`: aggiungere tab "Funnel investitori" con metriche aggregate ultimi 7/30gg (view → email → qualified → step%).

## Sequenza implementativa

1. Tracking events (foundation per misurare tutto)
2. Sticky mobile CTA + WhatsApp button hero
3. EmailFirstForm: 1-campo + progressive profiling + nuovo copy CTA
4. Trust signals hero (foto founder + badge SRL)
5. SocialProofMini live toast + counter dinamico
6. RequestInfoForm: multi-step wizard + lead parziale
7. QuickInvestorLeadDialog trigger scroll 60%
8. Tab "Funnel investitori" in admin

## Dettagli tecnici

- Tutti i form continuano a usare `insert_lead` RPC (security pattern in place, RLS rispettato).
- Multi-step wizard: state in React + auto-save `localStorage` con key `investor_form_draft_v1`, TTL 7gg.
- Lead parziale: nuovo `metadata.stage: 'partial'|'qualified'` per filtrare in admin senza nuova tabella.
- Sticky CTA: nuovo componente `InvestorStickyCTA.tsx` con IntersectionObserver su `RequestInfoForm` per auto-hide.
- Social proof toast: nuovo `LiveActivityToast.tsx` con pool nomi anonimizzati ma reali (city + first name iniziale) da `leads` recenti via RPC dedicata `get_recent_investor_activity()` SECURITY DEFINER.
- Tracking: estendere `useAnalytics` con helper `trackFunnelStep(funnel, step, metadata)`.
- Multi-step form: progress bar con `Progress` shadcn component, transizioni framer-motion (≤300ms fade).
- Copy/i18n: nuove chiavi in `investor/it.json` + `investor/en.json` (sync IT primary, EN fallback per gli altri 5 locale).
- Tutto rispetta memory rules: sentence case, "Parla con Lorenzo" CTA, sole founder disclosure, no SFP/2346 menzione pubblica, EOI compliance (no specific dates, no return promises).

## Out of scope (per ora)

- A/B test framework completo (uso AB events già esistenti se serve).
- Cambio strutturale Hero/Thesis/FounderLetter (sono già forti, refactor solo se tracking mostra drop-off lì).
- Email nurturing sequence post-lead (separato — lo proporrei dopo aver visto i primi dati di conversione).

Vuoi che parta con tutto in sequenza o preferisci un ordine diverso (es. tracking + step 5 multi-step wizard prima di tutto, perché è il drop-off più probabile)?
