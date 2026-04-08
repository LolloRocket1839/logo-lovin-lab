

## Plan: Regulatory-Safe Social Proof + Database Lead Capture (with Formspree kept)

Two parts: fix messaging, then add DB persistence alongside existing Formspree notifications.

---

### Part 1: Replace Fake Social Proof

**What changes:**

| Location | New IT copy | New EN copy |
|---|---|---|
| Hero social proof | Bilocale a Torino · €45-70K · Registra il tuo interesse | 2-room apt in Turin · €45-70K · Register your interest |
| Investor section (desktop + mobile) | Primo progetto in fase di selezione · Registrati per aggiornamenti | First project in selection · Register for updates |
| Dialog urgency badge | Espressione di interesse · Nessun impegno | Expression of interest · No commitment |

**Files:**
- `ImmersiveHero.tsx` — remove `ACTIVE_INVESTORS = 5`, use plain translation key
- `InvestorSectionDesktop.tsx` / `InvestorSectionMobile.tsx` — remove `useWaitlistCounter`, replace `{count}+ activeInvestors` with new `investor.socialProofLine` key
- `QuickInvestorLeadDialog.tsx` — update urgency badge translation key
- All 7 locale JSON files — update `hero.socialProof`, `investor.socialProofLine`, `quickInvestorLead.urgencyBadge`

---

### Part 2: Save All Leads to Database (Dual-Write)

Every form submission will save to a `leads` table AND continue sending to Formspree, so you get both email notifications and a queryable database of all leads.

**Database migration:**
- Create `leads` table: `id` (uuid), `email`, `name` (nullable), `phone` (nullable), `source` (text — e.g. "hero_cta", "exit_intent", "seller_section"), `lead_type` (text — investor/seller/student/general), `utm_source`, `utm_medium`, `utm_campaign`, `metadata` (jsonb for extra fields like address/reason), `created_at`
- RLS: block all public access, allow inserts only via security-definer RPC `insert_lead`
- Create `insert_lead` RPC that validates email format server-side

**New shared hook:** `src/hooks/useLeadCapture.ts`
- Dual-write: inserts into DB via RPC + submits to Formspree
- Independent error handling — if one fails, the other still completes
- Returns `{ submitLead, isSubmitting }` with consistent interface

**Forms to update (5 total):**
- `QuickInvestorLeadDialog` → type: investor
- `QuickSellerLeadDialog` → type: seller
- `ExitIntentPopup` → type: general
- `InvestorQuiz` → type: investor
- `WaitlistDialog` → type: student

Each keeps its existing Formspree endpoint + subject line formatting, but also writes to the `leads` table via the shared hook.

---

### What you get
- **One place to see all leads** — query the `leads` table to see every signup, with source tracking and UTM data
- **Email notifications unchanged** — Formspree still sends you emails for every submission
- **Honest, compliant messaging** — no fake numbers, no regulatory risk

