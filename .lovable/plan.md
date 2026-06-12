# Jungle Rent — Full improvement spec execution plan

The spec is large (9 sections, ~25 prompts, 4 weeks of work). I'll execute it in phases that match the spec's own execution order. **Each phase should be a separate approval** — bundling them produces lower-quality output and makes review impossible.

I propose starting with **Phase 1 (Today / Section 0) only** in this plan. After it ships and you've verified the acceptance criteria in production, we open the next plan for Week 1.

---

## Phase 1 — Emergency fixes (Section 0)

Goal: stop active SEO/trust damage today. Four discrete fixes.

### 0.1 — Per-page canonical tags

- Install `react-helmet-async`, wrap `<App />` in `<HelmetProvider>` in `src/main.tsx`.
- Remove the hardcoded `<link rel="canonical" href="https://junglerent.it/">` from `index.html`.
- Audit every page in `src/pages/**` and every blog post template. Currently `Index.tsx` already sets canonical to `/` via Helmet — many other routes likely inherit the static one or set the wrong value. Replace with a per-route canonical built from `useLocation().pathname`.
- Build `src/components/Seo.tsx` (minimal version — full props in Phase 2) so we have a single place to enforce canonical correctness now.
- **AC:** view-source on 5 random routes (`/investitori`, `/vendi`, `/students`, `/blog`, a blog post) shows each route's own canonical. Only `/` canonicalizes to `/`.

### 0.2 — Founder text correction

- Grep the repo for `Co-Founder`, `co-founder`, `Niccolaini`, `Co-founder`, and any "Founders:" plural construction.
- Replace with the exact required wording (IT + EN):
  - IT: "Fondatore e socio unico: Lorenzo Oni-Joseph (Founder & CEO, Amministratore Unico).
  - EN: equivalent phrasing.
- Cover: `/investitori` page + components, `/chi-siamo` / About, footer, JSON-LD builders, `public/llms.txt`, `public/llms-full.txt`, `public/ai-assistant-info.txt`, `public/.well-known/agent-card.json`, any noscript/static fallback blocks.
- Confirms the existing memory rule (Lorenzo sole founder/shareholder; Andrea Consigliere only; not in JSON-LD structured data).
- **AC:** repo grep for `Co-Founder` returns zero matches:

- Keep PEC `junglerent@legalmail.it` untouched.
- Cover: footer, contact page, investor page, JSON-LD `contactPoint`, llms.txt, agent-card.json, email templates in `supabase/functions/_shared/transactional-email-templates/**` (only the *displayed* contact, not the From: address — that one is configured elsewhere).
- .
- &nbsp;

### 0.4 — Title tag defects

- Update homepage `<title>` to: `Jungle Rent — Affitti per studenti e investimenti immobiliari a Torino` (EN equivalent on EN render).
- Strip the "25%" claim from title, meta description, `og:title`, `twitter:title` across the entire repo unless a `/metodologia` substantiation page exists (it doesn't yet — so: remove).
- Every other route already needs its own title; the Seo component from 0.1 enforces this. I'll audit the top 6 routes and set proper per-page titles inline (full per-page polish lives in Section 3, Week 2).
- **AC:** no two routes share a title; no unsubstantiated percentage claims in any meta tag.

---

## Out of scope for this plan (queued for later)

- **Phase 2 (Week 1)** — Full `<Seo>` component spec, JSON-LD builders, per-section OG images, sitemap regeneration, homepage IA restructure (router cards), navigation rebuild.
- **Phase 3 (Week 2)** — Per-page rebuilds: `/investitori`, `/studenti`, `/vendi`, `/valutazione-immobile`, `/blog`, `/props`.
- **Phase 4 (Week 3)** — Design system (Fraunces + paper #FAF7F2 palette), components, motion, trust primitives, AI Ask widget.
- **Phase 5 (Week 4)** — Performance, bilingual correctness, measurement dashboard.
- **Section 9 (cannot fix in Lovable)** — SSG migration for blog, Search Console audit, mailbox provisioning, OG image design, claim reconciliation with the SFP regolamento, llms.txt v7. I will flag these in writing; they need your decisions or external work.

---

## Items I need to flag before executing Phase 1

1. **Claim reconciliation (0.4 + Section 9 item 5):** the spec strips "25%". It also notes a conflict between "€100 minimum" and "€5.000 SFP unit", and between "bimonthly payouts" wording on llms.txt vs the regolamento. **For Phase 1 I will only remove the 25% claim** (low risk, spec-mandated). I will NOT touch ticket size or payout frequency yet — those need your call against the actual regolamento before I propagate via `investorTerms.ts` in Phase 2.
2. **Memory conflict to confirm:** existing project memory says "**Mai cifre/percentuali di rendimento Jungle Rent su superfici pubbliche**". The 25% claim is a *savings* claim (rent discount), not a yield claim — but it's still an unsubstantiated number. Removing it is consistent with both the spec and the spirit of the memory rule. Confirming I'm reading that right.
3. **Email From: addresses in transactional functions:** Phase 1 only touches displayed contact addresses in copy. The actual sender domain for transactional email (handled by the email infrastructure) is separate and should not be changed without coordinating with the email domain setup. Out of scope here.

---

## Ready to proceed?

Approve this plan to execute **Phase 1 only**. After it ships I'll open Phase 2.