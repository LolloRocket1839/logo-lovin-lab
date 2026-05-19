## Mini CRM in `/admin/leads`

Trasforma la pagina admin esistente in un mini-CRM operativo per gestire i lead (investitori, venditori, studenti, generali) senza uscire dall'app. Niente Gmail in MVP: parto da quello che hai già (`leads` + `seller_leads` + `investor_interest` + `admin-leads` edge function) e aggiungo stato, timeline interazioni, follow-up.

### Stati lead (kanban)
`nuovo` → `contattato` → `qualificato` → `proposta` → `vinto` / `perso` / `nurturing`

### 1. Schema (1 migrazione)

**Modifiche a `public.leads`**:
- `status text NOT NULL DEFAULT 'nuovo'` con CHECK su valori sopra
- `assigned_to text` (email admin, default `lorenzo.onijoseph@gmail.com`)
- `last_contact_at timestamptz`
- `next_followup_at timestamptz`
- `priority text DEFAULT 'medium'` (`low|medium|high`)

**Nuova tabella `public.lead_interactions`** (timeline):
- `id uuid PK`, `lead_id uuid` (FK a `leads.id` ON DELETE CASCADE)
- `lead_table text` default `'leads'` (per supportare anche `seller_leads` / `investor_interest` in futuro)
- `kind text` (`note | call | whatsapp | email | meeting | status_change | followup`)
- `direction text` (`inbound | outbound | system`)
- `content text`, `metadata jsonb`
- `created_by text` (email admin), `created_at timestamptz`

**RLS**: stesso pattern di `leads` — blocco pubblico, service role gestisce tutto. Accesso solo via edge function `admin-leads` con check admin email.

**Indici**: `leads(status, next_followup_at)`, `lead_interactions(lead_id, created_at DESC)`.

### 2. Edge function `admin-leads` (estesa)

Nuove `action`:
- `list` (già esistente) — aggiunge campi `status`, `assigned_to`, `last_contact_at`, `next_followup_at`, `priority`, e `interactions_count` (subquery)
- `get_detail` `{ lead_id }` → lead completo + timeline `lead_interactions` ordinata DESC
- `update_lead` `{ lead_id, patch }` → aggiorna `status / priority / assigned_to / next_followup_at / notes`. Quando cambia `status`, crea automaticamente una riga `lead_interactions` di tipo `status_change`.
- `add_interaction` `{ lead_id, kind, direction, content, metadata }` → inserisce riga timeline; se `kind` ∈ {call, whatsapp, email, meeting}, aggiorna anche `last_contact_at = now()`.
- `bulk_update_status` `{ lead_ids[], status }` per azioni multiple dal kanban

Tutte le action mantengono il check `ADMIN_EMAILS`.

### 3. Frontend `/admin/leads`

Refactor `src/pages/admin/Leads.tsx` in 3 sotto-componenti dentro `src/components/admin/leads/`:

- **`LeadsToolbar.tsx`** — search, filtri (tipo, stato, priorità, assegnatario, "solo follow-up scaduti"), toggle vista **Tabella ↔ Kanban**, export CSV.
- **`LeadsTable.tsx`** — colonne: Stato (badge colorato), Tipo, Email, Telefono, Source, Ultimo contatto, Prossimo follow-up, Età lead. Riga cliccabile → apre drawer.
- **`LeadsKanban.tsx`** — 6 colonne (una per stato), card draggable (react-dnd lite o solo via menu "sposta in…" per restare leggero). Drop = `update_lead`.
- **`LeadDetailDrawer.tsx`** (shadcn `Sheet`) — apertura laterale con:
  - Header: nome/email/tipo + badge stato + select per cambiare stato + select priorità
  - Quick actions: pulsanti WhatsApp (apre `wa.me/<phone>` precompilato), Email (`mailto:`), "Marca come contattato"
  - Form **"Aggiungi interazione"**: select tipo (nota/call/whatsapp/email/meeting), textarea, pulsante salva → `add_interaction`
  - **Timeline** verticale delle `lead_interactions` con icona per tipo, autore, timestamp relativo
  - Date picker per `next_followup_at` + bottone "Pianifica follow-up"
  - Pannello laterale con tutti i campi (metadata, UTM, source)

### 4. Dashboard mini in cima alla pagina

4 stat card: **Nuovi** (status=nuovo), **Da ricontattare oggi** (next_followup_at ≤ now), **In trattativa** (status ∈ qualificato/proposta), **Vinti questo mese**. Tutti calcolati client-side da `list`.

### 5. Notifiche follow-up (out of scope MVP, menzionato per dopo)

Cron settimanale che invia a `lorenzo.onijoseph@gmail.com` via Lovable Emails (transactional, già pronto) la lista follow-up scaduti. Lo aggiungo in una fase 2 se vuoi.

### Out of scope esplicito

- **Gmail connector** — non incluso. Se vuoi vedere i thread email reali del lead dentro il drawer (e poter rispondere senza uscire dall'app), lo aggiungiamo in fase 2 con `standard_connectors--connect google_mail` e una `action: "list_thread"` nell'edge function che cerca per `from:/to:<lead.email>`.
- `seller_leads` e `investor_interest` restano separate per ora — il CRM gestisce solo `leads`. Posso unificare la vista in fase 2 (creare una RPC `unified_leads` che fa UNION ALL).
- Niente assignment multi-utente: per ora c'è solo Lorenzo come admin.

### Tecnico

- Migrazione Supabase con CHECK constraint sugli enum-like (`status`, `priority`, `kind`, `direction`).
- Edge function unica `admin-leads` (no nuovi function), tutto in `index.ts`.
- Drawer + Kanban usano shadcn (`Sheet`, `Card`, `Select`, `Badge`, `Calendar`/`Popover`).
- DnD: parto con menu "Sposta in…" (più affidabile mobile). Drag-and-drop vero in fase 2 se ti serve.