# Immersive homepage redesign

Transform `/` (Index.tsx) into a single-page, scroll-driven immersive experience. Keep all current content, logo, brand palette (jungle green + cream) and Inter typography. Change only how it is composed, paced and animated.

## Principles

- One continuous canvas. No abrupt section breaks — content reveals on a fixed scroll spine.
- Horizontal motion as a counterpoint to vertical scroll (sideways pans, marquee data strips, parallax depth layers).
- Quiet luxury: 300–600ms fade-ups, soft easing, generous negative space. No "AI generic" gradients, no purple, no boilerplate cards-in-rows.
- Respect `prefers-reduced-motion` (existing `useReducedMotion` hook) — degrade to static fade-ins.

## Scroll architecture (5 acts, same page)

```text
ACT I   Hero — pinned full-viewport logo + headline, parallax cream/forest layers
ACT II  How it works — horizontal scroll-jack (3 panels translate sideways while page is pinned)
ACT III Investor proof — sticky left column (numbers/quiz CTA) + right column scroll
ACT IV  Seller offer — split-screen reveal, image clip-path expands on scroll
ACT V   Footer transition — gradient dissolve into footer, WhatsApp FAB persistent
```

A single thin progress rail on the right edge shows the act position (replaces today's section jumps).

## Technical approach

- Add `framer-motion`'s `useScroll` + `useTransform` driven from a single root container in `Index.tsx`.
- Wrap each existing section component (`ImmersiveHero`, `HowItWorks`, `InvestorSection`, `SellerSection`) in a new `<ImmersiveAct>` wrapper that handles pin / horizontal-translate / opacity timeline. Sections keep their internal markup and copy unchanged.
- Add a new `useScrollSpine` hook to centralize scroll progress and broadcast to acts.
- New components:
  - `src/components/immersive/ScrollSpine.tsx` — root pinned canvas + progress rail
  - `src/components/immersive/ImmersiveAct.tsx` — per-section pin/translate wrapper
  - `src/components/immersive/HorizontalReel.tsx` — Act II sideways panels
  - `src/components/immersive/StickyDuo.tsx` — Act III split layout
- Touch only `src/pages/Index.tsx` and the wrappers above. Do **not** modify section internals, business logic, analytics hooks, or the Navigation/Footer.
- Mobile (≤ md): pin/horizontal effects collapse to vertical fades; horizontal reel becomes a swipeable snap-scroll strip (no scroll-jack on touch).

## Out of scope

- No copy changes, no logo changes, no new data, no new routes.
- No new dependencies (framer-motion already in project).
- Other pages (Blog, Investors, etc.) untouched in this pass.

## Before I build

I'll first generate 3 rendered design directions (composition + motion register variants — same brand palette and Inter locked) using the design directions tool so you can pick the exact feel. Then implement the chosen one.
