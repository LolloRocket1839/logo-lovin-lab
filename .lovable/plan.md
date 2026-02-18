
# Seller Funnel: What's Working and What's Missing

## Current State Assessment

The seller funnel is already well-structured with multiple conversion touchpoints:

**What's in place:**
- Hero with `QuickOfferSimulator` (interest qualification, email gate)
- Comparison table (Agency vs Jungle Rent)
- Scenario cards (L'erede, L'urgente, Il proprietario stanco)
- 4-step timeline (Valutation → Visit → Offer → Closing)
- Benefits grid (4 cards)
- Interest zones section
- FAQ accordion (7 questions)
- Final CTA with two options (form + Calendly)
- Exit intent popup (captures email + phone on abandonment)
- Sticky CTA bar (Invest + Sell buttons)
- Seller-specific MobileHeader (scrolls in with "Valutazione" button)

**What's missing or could be stronger:**

### 1. Social proof / Trust gap (highest impact)
There is no testimonial, review, or "X immobili acquistati" counter anywhere on the page. For a seller handing over a major asset, seeing real social proof or a concrete transaction count is essential to trust.

### 2. WhatsApp is buried
WhatsApp is the preferred contact channel for less tech-savvy sellers (elderly owners, heirs), but on the page it only appears as a secondary button under the Scenarios section. It should be more prominent — especially in the hero area and the final CTA.

### 3. The "Zona ospedali" zone in the simulator is named `zona_ospedali` in the key but wasn't cross-checked in the Interest Zones section, which still lists generic names (San Paolo, Campus Einaudi) that don't match the simulator zones, creating inconsistency.

### 4. No trust badge / company legitimacy signal
No "Startup Innovativa" badge, no company registration number, no "recognized by" logo. For sellers, legitimacy signals reduce friction significantly since they're dealing with their most valuable asset.

### 5. Exit intent popup is generic
The exit intent popup on `/vendi` shows a generic "Ricevi valutazione gratuita" message — not seller-specific enough. A seller who almost left needs different copy than an investor.

## Proposed Plan

### Priority 1 — Add a social proof strip (new section)
Insert a minimal, elegant "Numeri che parlano" strip between the Hero and the Comparison Table. This would show 3 hard stats as animated counters:
- `22.000+` immobili sfitti a Torino (market context, creates urgency)
- `60–90 gg` tempo medio di chiusura (our promise)
- `0%` commissioni (key differentiator)

**File:** `src/pages/Sellers.tsx` — add a new `<section>` between lines 297–299 (after the hero, before the comparison table).

### Priority 2 — Make WhatsApp the hero's secondary CTA
Replace the Calendly "Prenota chiamata" button in the hero with WhatsApp as the primary secondary option, and move Calendly to a smaller "or schedule a call" link below. WhatsApp is lower friction for the target persona (elderly, heirs).

**File:** `src/pages/Sellers.tsx` — modify lines 265–283.

### Priority 3 — Add a legitimacy trust row under the Final CTA
Below the two CTA buttons in the Final CTA section, add a row of small trust signals: "Startup Innovativa certificata · Iscritti CCIAA Torino · Dati protetti GDPR". This directly addresses the "is this company real?" objection at the moment of decision.

**File:** `src/pages/Sellers.tsx` — modify the Final CTA section around lines 593–626.

### Priority 4 — Seller-specific exit intent copy
Customize the exit intent popup copy for the seller page. Currently it says "Stai andando via? Ricevi valutazione gratuita" — on the seller page it should say "Vendi senza agenzia, anche da casa" with a more seller-specific subtitle.

**File:** `src/components/ExitIntentPopup.tsx` — accept a `title` / `subtitle` prop so the seller page can pass custom copy, while the investor page keeps the default.

---

## Technical Scope

| File | Change |
|---|---|
| `src/pages/Sellers.tsx` | Add stats strip, swap WhatsApp/Calendly CTA order, add trust row |
| `src/components/ExitIntentPopup.tsx` | Add optional `title`/`subtitle` props |
| `src/i18n/locales/it.json` | Add new keys for stats strip and trust row |
| `src/i18n/locales/en.json` | Same in English |

No new components needed. No backend changes. Scope is frontend-only and conservative.
