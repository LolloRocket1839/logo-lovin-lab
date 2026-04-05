

# Performance Optimization Plan

## Current Issues (from profiling)

- **FCP: 4.8s** — very slow, target is < 1.8s
- **134 script resources** loaded on initial page
- **lucide-react: 160KB** — full icon library loaded instead of individual icons
- **framer-motion: 89KB** — loaded eagerly for hero scroll animation
- **Logo SVG: 96KB** — very large for an SVG, needs optimization
- **HowItWorksDrawer** imports framer-motion + 6 lucide icons on every page load even though it's mobile-only and hidden by default

## Changes

### 1. Optimize lucide-react imports (biggest win)
The 160KB `lucide-react` bundle loads the entire icon library. Vite should tree-shake it, but we can ensure proper chunking by adding `lucide-react` to the `manualChunks` config so it's not bundled into the main chunk, and verifying named imports are used everywhere (they already are).

Actually, in dev mode this is expected (no tree-shaking). For production, add `lucide-react` to a separate vendor chunk in `vite.config.ts` to keep it out of critical path.

### 2. Lazy-load HowItWorksDrawer
`HowItWorksDrawer` is a mobile-only accordion hidden by default. Lazy-load it in `ImmersiveHero.tsx` so framer-motion's `AnimatePresence` and the 6 lucide icons it imports don't block initial render.

### 3. Optimize the logo SVG (96KB is excessive)
- Compress `src/assets/jungle-rent-logo-new.svg` using SVGO to reduce file size significantly
- This directly improves LCP since it's preloaded with `fetchpriority="high"`

### 4. Defer non-critical components in Index.tsx
- Lazy-load `TrustBadge` and `WhatsAppFAB` — they are below the fold or delayed-visibility
- Move `QuickInvestorLeadDialog` to lazy-load inside `ImmersiveHero` (dialog only opens on click)

### 5. Add `loading="lazy"` to below-fold images
- Ensure the Regione Piemonte logo and 2i3t logo in footers use `loading="lazy"`

### 6. Optimize font loading
- Reduce Inter font weights from 5 (400,500,600,700,800) to 3 essential weights (400,600,700) to cut font download size

## Files Modified

| File | Change |
|------|--------|
| `vite.config.ts` | Add `lucide-react` to `manualChunks` |
| `src/components/innovative/ImmersiveHero.tsx` | Lazy-load `HowItWorksDrawer` and `QuickInvestorLeadDialog` |
| `src/pages/Index.tsx` | Lazy-load `TrustBadge` and `WhatsAppFAB` |
| `src/assets/jungle-rent-logo-new.svg` | Compress with SVGO |
| `index.html` | Reduce Inter font weights to 400;600;700 |
| `src/components/layout/Footer.tsx` | Add `loading="lazy"` to partner logos |
| `src/components/layout/MobileFooter.tsx` | Add `loading="lazy"` to partner logos |

