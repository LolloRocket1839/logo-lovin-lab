
# Pipeline studenti Nizza Millefonti / Ospedali — luglio/agosto

## TL;DR architetturale (la tua vera domanda)

**Non serve un'altra app Lovable. Non serve un agente esterno.** Hai già:

- `leads` + `lead_interactions` + RPC `insert_lead` (RLS pulita, dual-write Formspree)
- Admin Leads (`/admin/leads` con Kanban, drawer, status, interazioni) → **è già il tuo CRM**
- `useLeadCapture` con email di conferma, notifica admin, WhatsApp ping
- Infrastruttura email transazionale + WhatsApp FAB
- 60+ articoli blog, SEO maturo, schema strutturato

Quello che manca è **una landing verticale + contenuti zona + sequenze automatiche + canali di distribuzione**. Tutto dentro questo progetto.

Una "skill" (in senso Lovable) ha senso solo come **playbook ripetibile** per replicare la stessa pipeline su altre zone (Vanchiglia/Polito, San Salvario/Unito, ecc.) nei prossimi mesi. La creiamo alla fine, non adesso.

---

## Perché Nizza Millefonti / Ospedali è la zona giusta a luglio/agosto

Ricerca rapida sul target reale della zona (Molinette, San Giovanni Bosco, Mauriziano, CTO, Sant'Anna, Regina Margherita, Dental School):

- **Specializzandi medici (SSM)**: graduatoria nazionale esce **fine luglio**, contratti partono **1 novembre** → cercano casa **agosto–settembre**, decidono in fretta, budget medio-alto (€1.300–1.700 netti/mese di stipendio), contratti 4–5 anni = inquilino oro.
- **Studenti Infermieristica / Professioni Sanitarie** (sede Molinette + San Luigi): test a settembre, immatricolati cercano da agosto.
- **Studenti Medicina e Chirurgia** (Polo Universitario Molinette per anni clinici 4°–6°): trasferimento dal centro a Nizza.
- **Erasmus medici incoming**: arrivi settembre, prenotano luglio.
- **Dottorandi + ricercatori CCM / IRCCS Candiolo navetta**.

Tutti questi target hanno **tre cose in comune che il mercato standard non gli dà**: contratto regolare (per residenza/borsa), camera arredata vicino al reparto, gestione veloce in italiano + inglese. È esattamente la value prop di Jungle Rent.

---

## Piano (4 blocchi, in ordine di leva)

### Blocco 1 — Asset di conversione dedicato (il "magnete")

1. **Landing `/zone/nizza-millefonti-ospedali`** (riusa pattern `NeighborhoodPage.tsx`, non `InvestorZonePage`)
   - H1: "Casa per studenti e specializzandi vicino alle Molinette"
   - Sezioni: distanze a piedi/bici/tram da Molinette, S. Giovanni Bosco, Mauriziano, Dental School, Polo Universitario; prezzi medi camera/bilocale; trasporti notturni (turni); contratti accettati per residenza/borsa.
   - **Form waitlist email-first** (lead_type=`student`, source=`nizza-millefonti-waitlist`, metadata: `{target_audience: "specializzando|infermieristica|medicina|erasmus|altro", move_in_month: "lug|ago|set|ott|nov", budget_range}`)
   - CTA primaria: "Parla con Lorenzo" (WhatsApp deep link pre-compilato con zona + mese).
   - JSON-LD `RealEstateListing` + `Place` con coordinate Molinette per AEO.

2. **Hub contenuti zona** (3 articoli, IT+EN, pubblicati in 10 giorni):
   - "Affittare casa vicino alle Molinette: guida per specializzandi 2026"
   - "Quanto costa una camera a Nizza Millefonti e dove cercarla"
   - "Infermieristica a Torino: vivere vicino alla sede clinica"
   Ognuno con CTA in-article alla waitlist (pattern `inlineCTAs.ts` già presente).

3. **Sitemap + RSS + llms.txt aggiornati**.

### Blocco 2 — CRM e automazioni (riuso 95% di ciò che esiste)

1. **Filtro/segmento "Nizza Millefonti" in `/admin/leads`**: chip di filtro su `source` e su `metadata.target_audience` (modifica solo `LeadsToolbar.tsx` + `LeadsTable.tsx`, niente DB).

2. **Sequenza automatica drip** (nuovo edge function `student-nurture-cron`, schedulato giornaliero):
   - T+0: conferma immediata (già esiste come `lead-confirmation`) — versione **specializzando-aware** se `metadata.target_audience` lo indica.
   - T+2 giorni: email "5 cose da sapere su Nizza Millefonti" + link articolo.
   - T+5 giorni: WhatsApp template (manuale-assistito) precompilato dal pannello admin → un click apre WhatsApp con messaggio personalizzato per zona + mese di trasloco.
   - T+10 giorni: email "ancora cerchi casa per [mese]?" con bottone "prenota call".
   - Skip se `last_contact_at` < 2 giorni o `status` in (`vinto`, `perso`).
   - Tutto loggato come `lead_interactions` kind=`email`/`whatsapp` direction=`system`.

3. **Notifica WhatsApp istantanea a Lorenzo per lead student da questa zona** (estendi `notify-investor-whatsapp` → generalizza in `notify-priority-lead` con regola: `lead_type=student AND source LIKE 'nizza-millefonti%'`).

4. **Vista Kanban predefinita per pipeline studenti**: stati già esistenti (`nuovo → contattato → qualificato → proposta → vinto/perso`). Aggiungo solo un quick-filter "Pipeline Nizza".

### Blocco 3 — Distribuzione (dove trovi i lead a luglio/agosto)

Questo è **lavoro umano + asset che ti preparo io**, non codice. Te li lascio pronti da copiare:

- Post template per gruppi Facebook: "Specializzandi Torino", "Affitti Torino Studenti", "Erasmus Torino", "Infermieristica Torino UniTo".
- Volantino A5 PDF per bacheche Molinette / aula studio Dental School / mensa San Luigi (QR → landing).
- Email outreach per segreterie scuole di specializzazione (Anestesia, Chirurgia, Medicina Interna sono le più numerose).
- Post LinkedIn + Reel Instagram (script).
- DM script per gruppi WhatsApp matricole.

Tutti i link portano alla landing con UTM (`utm_source=fb-specializzandi`, ecc.) → già tracciati da `useUTMTracking`.

### Blocco 4 — Misurazione

- Dashboard semplice in `/admin/leads` con counter: lead totali Nizza, per audience, conversion rate per stato, tempo medio risposta.
- Alert email settimanale a Lorenzo (riusa pattern `WEEKLY_REPORT_SECRET`).

---

## Cosa NON faccio (e perché)

- **Niente seconda app Lovable.** Frammenterebbe il CRM, romperebbe SEO/dominio, raddoppierebbe i costi Cloud, e non aggiunge nulla che questo progetto non possa fare meglio.
- **Niente nuove tabelle DB** in questa fase: `leads.metadata` jsonb basta per audience/mese/budget. Migrazione solo se servirà dashboard analitica complessa.
- **Niente integrazione CRM esterno (HubSpot/Pipedrive)**: il tuo Admin Leads attuale è già più adatto al volume previsto (decine/centinaia di lead, non migliaia).
- **Niente cifre di rendimento** sulla landing (rispetta la core rule "no public yield figures") — questa pagina è per studenti, non investitori.

---

## Skill — quando ha senso, e quale

Dopo che il primo ciclo Nizza Millefonti gira ed è validato (~3–4 settimane), creiamo **una skill `student-zone-pipeline`** che documenta il playbook ripetibile: "data una zona di Torino + un cluster di domanda (ospedale/università/sede), genera landing + 3 articoli + sequenza drip + kit distribuzione". Così replichi su Vanchiglia/Polito, Crocetta/UniTo Medicina, San Salvario/Lingue in poche ore.

Creare la skill **adesso, prima di aver validato il playbook**, sarebbe prematuro — documenterebbe ipotesi, non un processo che funziona.

---

## Dettagli tecnici (per quando approvi)

**File nuovi**
- `src/pages/zone/NizzaMillefontiOspedali.tsx` (route `/zone/nizza-millefonti-ospedali`)
- `src/components/zone/StudentWaitlistForm.tsx`
- `src/data/blog/content/{it,en}/affittare-vicino-molinette-specializzandi-2026.md`
- `src/data/blog/content/{it,en}/camera-nizza-millefonti-prezzi-2026.md`
- `src/data/blog/content/{it,en}/infermieristica-torino-vivere-vicino-sede.md`
- `supabase/functions/student-nurture-cron/index.ts` (schedulato giornaliero)
- `supabase/functions/_shared/transactional-email-templates/student-nurture-day2.tsx`
- `supabase/functions/_shared/transactional-email-templates/student-nurture-day10.tsx`

**File modificati**
- `src/App.tsx` (rotta)
- `src/components/admin/leads/LeadsToolbar.tsx` + `LeadsTable.tsx` (filtro segmento)
- `supabase/functions/notify-investor-whatsapp/index.ts` → rinominato/generalizzato
- `public/sitemap.xml`, `public/rss.xml`, `public/.well-known/llms.txt`
- `src/i18n/locales/*.json` (chiavi nuove)

**Edge function config**: `student-nurture-cron` con `verify_jwt = false` e cron schedule daily 09:00 Europe/Rome.

**Compliance**: tutte le copy in sentence case (IT), nessuna cifra di rendimento, "Parla con Lorenzo" come CTA primaria, WhatsApp come canale principale.

---

## Domanda per te prima di partire

Confermi l'ordine? Io partirei in questa sequenza in 3 step approvabili separatamente:

1. **Landing + form + 1 articolo pilota** (1 turno) → puoi già iniziare distribuzione manuale
2. **Filtri admin + sequenza drip + WhatsApp priority ping** (1 turno) → automazione
3. **2 articoli rimanenti + kit distribuzione PDF/script** (1 turno) → scala

Se vuoi invertire o tagliare, dimmelo prima che parta lo step 1.
