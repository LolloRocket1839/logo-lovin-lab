## Obiettivo

Catturare lead di **chi cerca casa in affitto** nella zona Lingotto / Nizza Millefonti / Ospedali (Molinette, CTO, Sant'Anna, Regina Margherita), oggi non coperti: la pagina esistente `/zone/nizza-millefonti-ospedali` è informativa ma è tarata su specializzandi/sanitari, e `/vendi/lingotto-nizza-millefonti` è per chi vende. Manca una landing inquilino-generalista con form di waitlist e CTA WhatsApp.

## Cosa costruire

### 1. Nuova landing `/affitti-lingotto-ospedali-torino`

Pagina SEO ottimizzata (target: "affitti Lingotto Torino", "case in affitto vicino Molinette", "stanze Nizza Millefonti") costruita su `SeoLandingTemplate` esteso o componente dedicato. Sezioni:

- Hero: H1 "Cerca casa in zona Lingotto, Nizza Millefonti e Ospedali" + sub con tempi a Molinette/CTO/Politecnico
- 3 pillars: vicinanza ospedali · contratti regolari (transitorio/4+4/studenti) · zero agenzia
- Cards quartieri micro (Nizza, Millefonti, Lingotto, Italia 61) con affitto medio
- Tabella tempi verso ospedali + Politecnico (riuso array `HOSPITALS`)
- Form waitlist inquilino (email + telefono opz + budget + tipo: studente / specializzando / lavoratore / famiglia + data ingresso desiderata + note)
- CTA WhatsApp a Lorenzo con messaggio precompilato
- FAQ (deposito, contratti, animali, durata) → JSON-LD FAQPage
- JSON-LD WebPage + BreadcrumbList

### 2. Lead capture

Riuso `useLeadCapture` con:
- `leadType: "student"` (riusa template email esistenti) oppure `"general"` se non studente
- `source: "affitti-lingotto-ospedali-<audience>"` (prefisso `nizza-millefonti-` per attivare il **ping WhatsApp prioritario già esistente** in `useLeadCapture.ts` → priority student rule)
- `metadata`: budget, audience, move_in_date, note

Nessuna nuova tabella, nessuna migration: i lead finiscono in `leads` via `insert_lead` RPC + Formspree, e Lorenzo riceve WhatsApp istantaneo via `notify-investor-whatsapp` (già scattante per source `nizza-millefonti-*`).

### 3. Integrazione

- Route lazy in `AnimatedRoutes.tsx`: `/affitti-lingotto-ospedali-torino`
- Sitemap: aggiunta in `scripts/generate-sitemap.ts` con priority 0.8
- `linkableContent.ts`: voce ad alta priorità con trigger "affitti lingotto", "casa molinette", "stanza nizza millefonti", "affitto vicino ospedale" → auto-link dai blog
- Link interni: aggiungere reference dalla pagina `/zone/nizza-millefonti-ospedali` (sezione "stai cercando casa qui?") e dai blog post "affittare-vicino-molinette-specializzandi-2026"
- Thank you page: parametro `?lead=tenant-lingotto` per messaggio dedicato (riuso `ThankYou.tsx` esistente)

## Out of scope

- Nessuna nuova tabella Supabase
- Nessuna modifica admin / Leads UI (i lead arrivano già filtrabili per source)
- Nessun matching automatico con `property_listings` (può essere fase 2)

## File toccati

- **Nuovo** `src/pages/landings/AffittiLingottoOspedali.tsx`
- **Edit** `src/components/AnimatedRoutes.tsx` (route)
- **Edit** `scripts/generate-sitemap.ts`
- **Edit** `src/data/linkableContent.ts`
- **Edit** `src/pages/zone/NizzaMillefontiOspedali.tsx` (banner/link interno "cerchi casa? lascia preferenze")
