
# Website Optimization & Simplification Audit

## What's working well

- Homepage is already reduced to 5 core sections (Hero, HowItWorks, InvestorSection, SellerSection, Footer) — the right structure.
- Motion system is minimalist and consistent (fade-up, 300ms, stagger classes).
- Lead forms are email-first with low friction.
- Mobile BottomNav focuses on 4 conversion-oriented items.
- Seller page now has WhatsApp as primary CTA, social proof strip, and trust signals — all recently implemented.

---

## Issues & Recommendations (Priority Order)

### 1. Homepage — The "Useful resources" section is dead weight (HIGH)

The homepage currently has a generic "Risorse utili" grid between the FAQ and the BlogBanner (lines 120–167 in `Index.tsx`). It links to Chi siamo, Valuta immobile, Dove mangiare, and Blog — four things that are already in the Navigation and Footer. It adds scroll length with zero conversion value and dilutes the scroll-directed narrative.

**Fix:** Remove this section entirely from `src/pages/Index.tsx`. The BlogBanner immediately below it already handles the blog link, and the footer covers the rest.

---

### 2. Homepage — Two footers are rendered simultaneously (HIGH)

`Index.tsx` renders both `<Footer />` (desktop only, `hidden md:block`) and `<MobileFooter />` (no explicit display logic — always rendered). This is redundant and adds DOM weight. `MobileFooter` also adds `pb-20` padding that may stack unnecessarily on desktop.

**Fix:** Wrap `<MobileFooter />` in `<div className="md:hidden">` to ensure it only renders in the DOM on mobile, matching the existing desktop Footer behavior.

---

### 3. BottomNav — 5 items is one too many for mobile (MEDIUM)

The BottomNav currently has 5 items: Investi, Vendi, Studenti, Info, Fondatori. Five items on a mobile nav creates visual crowding and the "Fondatori" item (which opens a drawer to call/WhatsApp Lorenzo) duplicates what "Investi" and "Vendi" already accomplish. The Founders drawer is a nice touch, but it competes for attention with the primary CTAs.

**Fix:** Merge "Fondatori" into the "Info" drawer (it already has FAQ, blog articles, and AI search). The BottomNav becomes 4 clean items: Investi, Vendi, Studenti, Info — matching the design memory that says "4 essential lead conversion items."

---

### 4. Sellers page — Too many separate sections create scroll fatigue (MEDIUM)

The `/vendi` page currently has 9 distinct sections:
1. Hero (with QuickOfferSimulator)
2. Social Proof Strip (Numbers)
3. Comparison Table
4. Seller Scenarios (3 cards)
5. Timeline (4 steps)
6. Benefits Grid (4 cards)
7. Interest Zones (zone pills)
8. FAQ
9. Final CTA

Sections 4 (Scenarios), 5 (Timeline), and 6 (Benefits) overlap heavily in message — all three explain "why Jungle Rent is good." The Timeline is visually complex and rarely read fully. The Benefits grid repeats information already in the comparison table.

**Fix:** Collapse the Timeline and Benefits Grid into a single compact "Come funziona" block (3 steps inline, no cards) and remove the Benefits Grid section entirely. This reduces the page from 9 to 7 sections. Seller Scenarios can remain as they address distinct personas.

---

### 5. Navigation — Desktop nav has no CTA button (MEDIUM)

The desktop navigation (4 text links: Investitori, Vendi, Studenti, Fondatori) has no call-to-action button on the right side. Every competitor in the proptech space has a "Get started" or "Investi ora" button in the nav. The current nav relies entirely on the page content and StickyCTA bar to convert, which only appears after scrolling past the hero.

**Fix:** Add a compact "Investi →" button (variant="default", size="sm") to the right side of the desktop nav that opens `QuickInvestorLeadDialog`. This appears immediately on load and persists through all pages.

---

### 6. Exit intent popup — Uses `framer-motion` with spring animation for a modal (LOW)

The exit intent popup uses `framer-motion` with `type: "spring"` animation. For a popup that appears rarely and on exit, this is library overhead that could be replaced with a simple CSS transition. However, `framer-motion` is already used on the Sellers page for other animations, so the bundle cost is already paid — this is a low-priority cleanup.

---

### 7. `src/pages/Index.tsx` — Two `<div>` wrappers around the Footer add unnecessary DOM nesting (LOW)

```tsx
// Current — wraps both footers in extra divs
<div className="pb-16 lg:pb-0">
  <Footer />
</div>
<div className="pb-20">
  <MobileFooter />
</div>
```

The padding-bottom classes should live on the Footer components themselves or be handled via `safe-area-bottom`, not wrapper divs. Low visual impact, but cleaner.

---

## Summary of Proposed Changes

| Priority | Change | File | Impact |
|---|---|---|---|
| HIGH | Remove "Risorse utili" section from homepage | `src/pages/Index.tsx` | Reduces homepage length, sharpens narrative |
| HIGH | Wrap MobileFooter in `md:hidden` | `src/pages/Index.tsx` | Eliminates DOM duplication |
| MEDIUM | Add "Investi →" CTA button to desktop nav | `src/components/layout/Navigation.tsx` | Adds always-visible primary CTA |
| MEDIUM | Merge Fondatori drawer into Info in BottomNav | `src/components/layout/BottomNav.tsx` | Cleaner 4-item mobile nav |
| MEDIUM | Collapse Timeline + Benefits into single "Come funziona" block, remove Benefits Grid | `src/pages/Sellers.tsx` | Reduces seller page from 9 to 7 sections |

No backend changes. No new dependencies. All changes are frontend-only and reversible.
