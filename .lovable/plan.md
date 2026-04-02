

# Fix Hero Logo Scroll Animation — Sequential & Smoother

## Problem

From the screenshots, the logo moves left and up simultaneously, feeling mechanical. The user wants:
1. **Sequential motion**: first move left, *then* up — not both at once
2. **Smoother, frame-by-frame feel** tied to scroll position
3. **Gradual fade to transparent** as it approaches the header logo position

## Changes

### `HeroLogo.tsx` — Stagger the x/y transforms with overlapping scroll ranges

Instead of both `x` and `y` animating over the same `[0, 300]` range, offset them:

- **`x` (horizontal)**: starts immediately, `[0, 200]` — moves left first
- **`y` (vertical)**: delayed start, `[100, 300]` — moves up after horizontal motion begins
- **`opacity`**: fade from `[120, 220]`, `1 → 0` — dissolves mid-journey, well before reaching the header
- Add `useSpring` wrapper around `x` and `y` for physics-based smoothing (slight damping/stiffness) so the motion feels organic rather than linearly tied to scroll pixel

This creates a curved, elegant path: the logo drifts left first, then arcs upward while fading — like it's being gently swept away.

### `MobileHeader.tsx` — No changes needed

The header logo fade-in at `[240, 300]` already works correctly with the hero logo disappearing by scroll 220.

