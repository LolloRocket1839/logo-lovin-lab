# Plan: Increase homepage hero logo size

## Goal
Make the Jungle Rent logo in the pinned homepage hero section larger and more visible on both mobile and desktop, without breaking the scroll-directed layout or overlapping text.

## Current state
- The hero logo is rendered by `src/components/innovative/HeroLogo.tsx`.
- Current sizes: `w-20 h-20 md:w-40 md:h-40` (80px on mobile, 160px on desktop).
- It is consumed inside `src/components/immersive/LiquidHomepageStory.tsx` at the top of the first pinned scene, above the headline and scene index.
- The logo uses Framer Motion scroll-driven transforms (`x`, `y`, `rotate`, `opacity`) that move it up and left as the user scrolls; a larger logo may collide with the headline or nav bar if those offsets are left unchanged.

## Proposed changes
1. Increase the hero logo base dimensions in `HeroLogo.tsx`.
   - Mobile: from 80px to ~120px.
   - Desktop: from 160px to ~240px.
2. Review and adjust the scroll-animation offsets in `HeroLogo.tsx` so the enlarged logo still clears the headline and the navigation bar during its exit motion.
3. Adjust surrounding spacing in `LiquidHomepageStory.tsx` (scene 1 container) if needed to keep the headline and scene index balanced after the larger logo.
4. Verify on both mobile and desktop breakpoints that the logo remains crisp, does not clip, and does not overlap with the headline or navigation.
5. Keep the reduced-motion fallback path unchanged; it only renders the static logo at the new size.

## Out of scope
- No changes to the navigation header logo or mobile sticky header logo.
- No changes to the logo asset itself (SVG).
- No changes to the MCP, backend, or security settings.

## Verification
- Manual visual check in the preview at `/` on mobile and desktop.
- Confirm no text overlap at scroll positions 0, 100, and 200.
- Confirm the reduced-motion version still renders correctly.