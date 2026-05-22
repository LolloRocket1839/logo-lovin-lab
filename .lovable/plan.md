# Lead gen venditori — Lingotto / Nizza Millefonti

## Obiettivo

Pipeline costante di proprietari che vogliono vendere bilocali/trilocali €50-130k nella zona Lingotto / Nizza Millefonti / Ospedali — il tuo primo target di acquisizione.

## Perché questa zona, adesso

- Stock vecchio anni '60-'70, molti eredi non-residenti (Lingotto post-FIAT)
- Prezzi medi €1.400-1.900/mq → bilocali 50mq spesso nel tuo range €70-95k
- Domanda affitto altissima (Molinette, Politecnico Mirafiori, OGR) → puoi monetizzare subito
- Concorrenza acquirenti diretti scarsa: agenzie tradizionali prendono provvigione, tu compri

## Architettura (riuso 100%)

Hai già: `seller_leads` table, `QuickSellerLeadDialog`, `Sellers.tsx`, valuator, drip email seller. Manca solo: **landing zona-specifica + contenuti + canali outbound mirati**.

Niente nuovo CRM, niente nuove tabelle.

## Piano in 3 step approvabili

### Step 1 — Asset di conversione zona venditori (1 turno)

**1.1 Landing `/vendi-casa/lingotto-nizza-millefonti`** (IT+EN)
- H1: "Vendi il tuo appartamento a Lingotto / Nizza Millefonti in 60-90 giorni"
- Hero: "0% commissioni, acquisto diretto, offerta entro 7 giorni"
- Sezioni: prezzi medi al mq aggiornati per micro-zona (via Nizza, Spotorno, Passo Buole, Borgo Filadelfia), tempi di vendita standard vs Jungle Rent, "che immobili compriamo" (bilocali/trilocali 40-80mq, anche da ristrutturare), processo in 3 step, testimonial/social proof quando disponibile
- Form: `QuickSellerLeadDialog` embedded con `source: "vendi-lingotto-nizza-millefonti"`, metadata `{zona_specifica, mq, stato, motivo_vendita: eredità|trasferimento|liquidità|altro}`
- CTA primaria: "Parla con Lorenzo" WhatsApp pre-compilato
- JSON-LD `RealEstateAgent` + `Service` con `areaServed: Lingotto`
- Riusa pattern `NeighborhoodPage.tsx` ma in variante seller

**1.2 Articolo pilota (IT+EN)**
- "Vendere casa a Lingotto nel 2026: prezzi reali, tempi e a chi conviene vendere direttamente"
- Dati concreti: prezzi mq per via, tempo medio agenzie (180+ gg), tasse di vendita, plusvalenza dopo 5 anni
- CTA inline al modulo valutazione

**1.3 SEO**: sitemap + rss + llms.txt + breadcrumb

### Step 2 — Canali outbound zona-mirati (1 turno + lavoro umano)

Asset pronti da usare (codice + copy):

**2.1 Volantini A5 PDF** (genero il file in `/mnt/documents`)
- Variante A "Eredità": per portoni con cognomi/cassette multiple → tipico immobile ereditato
- Variante B "Trasferimento lavoro": area Lingotto post-FIAT/CNH
- QR → landing con UTM `utm_source=volantino-lingotto&utm_medium=offline`
- Da distribuire: vie Nizza 200-400, Spotorno, Passo Buole, Borgo Filadelfia, attorno a Eataly Lingotto

**2.2 Lettera cartacea personalizzata** (template Word/PDF)
- "Gentile proprietario di via X, sto cercando di acquistare un appartamento nel suo palazzo"
- Trigger: annunci vecchi su Idealista/Immobiliare scaduti senza vendita (cerca tu manualmente, ti do lo script di scraping leggero in Step 3 se vuoi)

**2.3 Annuncio Facebook/Instagram local-targeted**
- Raggio 1.5 km da Lingotto, età 45+, interessi: "eredità", "trasloco", "pensione"
- Copy: "Hai un appartamento a Lingotto che non usi? Te lo compro io." + foto Lorenzo + CTA WhatsApp
- Pixel già tracciato se configurato

**2.4 Google Ads micro-campagna** (script keyword pronto)
- Keyword: "vendere casa lingotto", "vendere appartamento nizza millefonti", "agenzia immobiliare lingotto torino", "valutazione immobile lingotto"
- Budget consigliato: €15/giorno, landing = la nuova pagina zona
- Quality score alto = pagina perfettamente match con keyword

**2.5 Notai e amministratori di condominio della zona**
- Lista pronta: 8-10 studi notarili + amministratori condominio con sede CAP 10126/10127
- Email outreach template: "Se ha clienti che devono liquidare immobili in zona, acquisto diretto, chiusura 60 gg"

### Step 3 — Automazione e nurture (1 turno)

**3.1 CRM filtro "Pipeline Lingotto Sellers"** in `/admin/leads`
- Filtro su `source LIKE 'vendi-lingotto%'` + `lead_type=seller`
- Già esiste l'infrastruttura toolbar (vedi pipeline Nizza studenti)

**3.2 Drip seller-zona** (estendo `student-nurture-cron` → `lead-nurture-cron` generalizzato)
- T+0: `seller-confirmation` (esiste già)
- T+2: email "3 cose da sapere prima di vendere a Lingotto" + link articolo
- T+5: WhatsApp template manuale-assistito (un click apre WhatsApp pre-compilato)
- T+10: email "vuoi una valutazione più precisa? mando un sopralluogo"
- Skip se `last_contact_at < 2gg` o `status in (vinto, perso)`

**3.3 WhatsApp priority ping a te per seller Lingotto** (estendo regola in `useLeadCapture.ts`)
- Già fatto per student Nizza → aggiungo `seller + source LIKE 'vendi-lingotto%'`

**3.4 Alert settimanale**: report lead Lingotto + conversion rate, riusa pattern `WEEKLY_REPORT_SECRET`

## Cosa NON faccio

- Niente provvigioni o cifre di acquisto pubbliche (ti tieni leva in trattativa)
- Niente promesse di prezzo specifico sulla landing (solo range generici tipo "€60-130k tipico per bilocale zona")
- Niente nuovo strumento esterno (HubSpot, Idealista Pro, ecc.) — non ti serve a questo volume

## Dettagli tecnici (per quando approvi)

**File nuovi**
- `src/pages/vendi/LingottoNizzaMillefonti.tsx` (route IT+EN)
- `src/data/blog/content/{it,en}/vendere-casa-lingotto-2026.md`
- `supabase/functions/seller-nurture-cron/index.ts` (o generalizzo `student-nurture-cron`)
- `supabase/functions/_shared/transactional-email-templates/seller-nurture-day2.tsx` + `day10.tsx`
- `/mnt/documents/volantino-lingotto-A5-eredita.pdf` + `-trasferimento.pdf`
- `/mnt/documents/lettera-proprietario-template.pdf`
- `/mnt/documents/google-ads-keywords-lingotto.csv`
- `/mnt/documents/notai-amministratori-lingotto.csv`

**File modificati**
- `src/components/AnimatedRoutes.tsx` (2 rotte)
- `src/data/blog/posts.ts` (registra articolo)
- `src/hooks/useLeadCapture.ts` (regola WhatsApp priority per seller Lingotto)
- `src/components/admin/leads/LeadsToolbar.tsx` (chip "Pipeline Lingotto")
- `public/sitemap.xml`, `public/rss.xml`, `public/.well-known/llms.txt`

**Compliance**: sentence case, "Parla con Lorenzo" CTA, WhatsApp primario, nessuna cifra di rendimento, conferma "0% commissioni" coerente con memory `seller-acquisition-positioning`.

## Domanda per te

Confermi l'ordine 1 → 2 → 3? In particolare:
- **Step 1** ti dà subito landing + articolo per partire con Google Ads e SEO
- **Step 2** è il pacchetto offline+ads, lavoro umano dopo
- **Step 3** è automazione, ha senso solo dopo che arrivano i primi lead

Vuoi che parta da Step 1, o preferisci che faccia Step 1 + 3 insieme (landing + automazione) e poi 2?
