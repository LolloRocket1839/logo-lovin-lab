

# Hero Logo Scroll Transition — Move to Header Position

## What changes

Currently the hero logo fades out (opacity → 0) when scrolling. Instead, it should **stay visible** and elegantly translate from its centered hero position to the top-left mobile header position, shrinking as it goes — creating a seamless handoff.

## How it works

The MobileHeader appears at `scrollY > 100`. The hero logo needs to animate from center → top-left over roughly `scrollY: 0–250`, matching the header logo's position by the end.

## Technical changes

### 1. `HeroLogo.tsx` — Rework scroll transforms

- **Make logo bigger initially**: increase from `w-14 h-14` (mobile) to ~`w-20 h-20`
- **Replace opacity fade with positional movement**:
  - `x`: `0 → -X` (move left toward header logo position, roughly `-calc(50vw - 2rem)`)
  - `y`: `0 → -Y` (move up toward top of viewport)
  - `scale`: `1 → ~0.35` (shrink to header logo size ~h-9 vs h-20)
  - `opacity`: keep at `1` throughout, only fade to `0` at the very end (scrollY 220–250) so it vanishes just as the MobileHeader appears
- Use `useTransform` with scroll ranges `[0, 250]` for smooth interpolation
- The logo never "disappears" — it physically travels to where the header logo sits

### 2. `MobileHeader.tsx` — Coordinate the handoff

- The header logo should fade **in** (opacity 0→1) right as the hero logo reaches its position (~scrollY 200–250), creating a seamless baton-pass
- Add a brief opacity transition to the header logo element

### 3. Desktop behavior

- On desktop (`md:` breakpoint), keep current behavior or apply similar movement toward the desktop nav logo position

## Result

On page load: logo centered, slightly larger. On scroll: logo elegantly glides up-left while shrinking, landing exactly where the sticky header logo appears — then the header takes over. Feels like one continuous logo, not a disappear/reappear.

