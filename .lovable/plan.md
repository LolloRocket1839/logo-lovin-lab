

# Dramatically Improve UI Smoothness & Perception

## What changes

A coordinated set of micro-improvements across transitions, page loads, interactions, and visual continuity that together make the site feel "liquid" — like everything flows rather than snaps.

---

## 1. Page transition system (the biggest impact)

Currently, navigating between pages shows a raw `LoadingSpinner` via Suspense with no exit/enter animation. The page just pops in.

**Add a fade-crossfade wrapper** around the `<Routes>` in `App.tsx` using `framer-motion`'s `AnimatePresence` + `motion.div` keyed to `location.pathname`. Each page fades in (opacity 0→1, translateY 8→0) over 250ms. Old