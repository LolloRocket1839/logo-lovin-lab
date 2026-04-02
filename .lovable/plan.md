

# Fix Hero Logo Scroll Animation — Smooth Movement, No Overlap

## Problem

From the screenshots: the hero logo visibly overlaps with the header logo during scroll, creating a messy double-image. The movement also feels jerky because scale + translate + opacity all change simultaneously over the same range.

## Solution

Separate concerns: the hero logo should **only translate left/up and fade out** — it should become fully transparent *before* it reaches the header logo's position, so there's never overlap. The header logo then fades in seamlessly after.

## Changes

### 1. `HeroLogo.tsx` — Smoother, overlap-free animation

- **Remove `scale` transform** — scaling while translating causes jerkiness. Just translate.
- Adjust scroll ranges:
  - `x`: move left over `[0, 300]` — slower, gentler drift
  - `y`: move up over `[0, 300]` — same range for consistent diagonal movement  
  - `opacity`: fade out over `[150, 250]` — starts fading early, fully gone by scroll 250 (before it would reach the header logo)
- No scale change means the logo stays crisp during movement

### 2. `MobileHeader.tsx` — Header logo appears after hero is gone

- Shift the header logo fade-in to `[240, 300]` — it only appears once the hero logo is already invisible
- This eliminates any chance of overlap: hero is gone by 250, header starts at 240 with a gentle crossfade

### Result

Slow scroll: logo gently drifts up-left while gradually becoming transparent. By the time it would reach the header position, it's invisible. The header logo then smoothly materializes. No overlap, no jerkiness.

