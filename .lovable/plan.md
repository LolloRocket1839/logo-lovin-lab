## Obiettivo

Sfruttare la connessione Gmail (`junglerententeprise@gmail.com`) per automatizzare lead capture, outreach e gestione inbox, integrandola con il CRM esistente (`leads`, `seller_radar_listings`) e con WhatsApp/Resend già configurati.

Implementiamo tutti e 5 i use case proposti, raggruppati in 3 edge function + 1 pagina admin.

---

## Architettura

```text
Gmail (connector gateway)
   |
   |-- [1] gmail-inbox-parser (cron ogni 10 min)
   |        legge UNREAD -> classifica con Lovable AI -> crea lead -> WhatsApp ping
   |
   |-- [2] gmail-send (on-demand)
   |        invia email dall'inbox di Lorenzo (firma reale, finisce in "Sent")
   |
   |-- [3] gmail-auto-reply (chiamata dal parser)
   |        risponde automaticamente con template per categoria
   |
   `-- [4] /admin/inbox (UI)
            ultime 50 email, filtri, azioni: "Crea lead", "Rispondi", "Archivia",
            + bottone "Cold outreach da seller_radar" che usa gmail-send
```

---

## Componenti

### 1. Edge function `gmail-inbox-parser` (cron, ogni 10 min)
- Legge `users/me/messages?q=is:unread newer_than:1d -from:me`
- Per ogni email:
  - Estrae mittente, subject, snippet, body (max 2000 char)
  - Classifica via Lovable AI (`google/gemini-2.5-flash`) in: `seller_lead`, `student_lead`, `investor_lead`, `portal_notification` (Immobiliare/Idealista/Subito), `spam`, `other`
  - Se lead: chiama `insert_lead` RPC con `source='gmail-inbox'`, `lead_type=...`, metadata `{gmail_message_id, subject, snippet, classification_confidence}`
  - Se `portal_notification` da scraper Immobiliare/Idealista/Subito: aggiorna `seller_radar_listings` (match per URL) o crea entry
  - Manda WhatsApp ping a Lorenzo via `notify-investor-whatsapp` o nuova `notify-gmail-lead` (riusa CALLMEBOT)
  - Marca email come letta (`messages/{id}/modify` removeLabelIds `UNREAD`) e applica label `Jungle/Processed`
- Logga in nuova tabella `gmail_processed_messages` (dedup per `message_id`)

### 2. Edge function `gmail-send` (on-demand, JWT-protected, admin only)
- Input: `{to, subject, body, in_reply_to_message_id?, thread_id?}`
- Costruisce RFC 2822 con firma fissa di Lorenzo
- POST `users/me/messages/send` (con `threadId` se reply)
- Logga in `gmail_sent_messages` (tracking outreach)
- Validazione Zod + rate limit (max 30/ora per admin)

### 3. Edge function `gmail-auto-reply` (chiamata interna dal parser)
- Template per categoria (IT, sentence case, firma Lorenzo):
  - `seller_lead` → "Grazie, ti chiamo entro 24h. Intanto, qual è la zona dell'immobile?"
  - `student_lead` → link a `/studenti` + waitlist
  - `investor_lead` → link a `/investire` + "Parla con Lorenzo" WhatsApp
- Opt-in: flag `auto_reply_enabled` in `email_settings` (default false — Lorenzo abilita manualmente)

### 4. Pagina `/admin/inbox` (React)
- Riservata a `lorenzo.onijoseph@gmail.com` (stesso pattern di `SellerRadar`)
- Lista ultime 50 email da `users/me/messages?maxResults=50`
- Filtri: `is:unread`, classification (da `gmail_processed_messages`), date range
- Per ogni email:
  - "Apri in Gmail" (link `https://mail.google.com/mail/u/0/#inbox/{id}`)
  - "Crea lead" (form rapido prefilled da mittente)
  - "Rispondi con template" (dropdown template → chiama `gmail-send`)
  - "Archivia" (modify `removeLabelIds: ['INBOX']`)
- Sezione "Cold outreach da Seller Radar":
  - Lista listings con `is_private_seller=true` e `contact_email` (se disponibile)
  - Bottone "Invia email" → editor con template precompilato → `gmail-send`

### 5. Database
Nuova migration:
- `gmail_processed_messages`: `id`, `message_id` (unique), `thread_id`, `from_email`, `subject`, `snippet`, `classification`, `confidence`, `lead_id` (FK nullable), `processed_at`
- `gmail_sent_messages`: `id`, `message_id`, `thread_id`, `to_email`, `subject`, `body_excerpt`, `sent_by` (auth uid), `linked_listing_id` (FK nullable), `linked_lead_id` (FK nullable), `sent_at`
- RLS: admin only (`has_role` + email check via security definer function), grants per `authenticated` + `service_role`

### 6. Config
- `supabase/config.toml`: `verify_jwt = false` per `gmail-inbox-parser` (cron), `verify_jwt = true` per `gmail-send` (admin only)
- pg_cron: `gmail-inbox-parser` ogni 10 min (insert via `supabase--insert`, contiene anon key)
- `GMAIL_API_KEY` + `LOVABLE_API_KEY` già disponibili (Gmail connector + Lovable AI)

---

## Sicurezza & Compliance
- Nessuna lettura/scrittura di email non legate al business
- Auto-reply OFF di default (opt-in esplicito Lorenzo)
- Cold outreach solo verso indirizzi pubblicamente visibili negli annunci (allineato a memoria Seller Radar compliance)
- Rate limit lato server, validazione input Zod
- Body email salvato solo come excerpt (max 500 char) per privacy

---

## Ordine di implementazione
1. Migration tabelle + RLS + grants
2. Edge function `gmail-inbox-parser` + classificazione AI + cron
3. Edge function `gmail-send` + Zod + rate limit
4. Edge function `gmail-auto-reply` (chiamata dal parser, off di default)
5. Pagina `/admin/inbox` con lista + azioni
6. Estensione `/admin/seller-radar` con bottone "Email" per listings con contatto
7. Link `/admin/inbox` in `Navigation` admin menu

---

## Out of scope (lasciato a iterazioni future)
- OAuth per-utente (non serve, è la inbox di Lorenzo)
- Threading complesso multi-livello (basta `In-Reply-To` + `threadId`)
- Sync bidirezionale draft Gmail ↔ admin UI
- Allegati (solo testo per ora)

---

## File da creare/modificare
**Nuovi**
- `supabase/migrations/<ts>_gmail_inbox.sql`
- `supabase/functions/gmail-inbox-parser/index.ts`
- `supabase/functions/gmail-send/index.ts`
- `supabase/functions/gmail-auto-reply/index.ts`
- `src/pages/admin/Inbox.tsx`
- `src/components/admin/inbox/EmailRow.tsx`
- `src/components/admin/inbox/SendEmailDialog.tsx`

**Modificati**
- `supabase/config.toml` (3 nuove function entries)
- `src/App.tsx` + `src/components/AnimatedRoutes.tsx` (route `/admin/inbox`)
- `src/pages/admin/SellerRadar.tsx` (bottone "Email" su listings con contatto)
- `src/components/layout/Navigation.tsx` (link admin se applicabile)
