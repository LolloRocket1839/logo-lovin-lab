

## Reduce whitespace between hero and How It Works

### Problem
The hero section uses `min-h-screen` which pushes content far down. Combined with generous padding on TrustBadge (`py-8 md:py-16`) and HowItWorks (`py-16 md:py-24` desktop, `py-10` mobile), there's excessive white space before the user reaches meaningful content.

### Changes

**1. `src/components/innovative/ImmersiveHero.tsx`**
- Change `min-h-screen` to `min-h-[85vh] md:min-h-[90vh]` so the hero doesn't consume the entire viewport, letting the next section peek through.

**2. `src/components/TrustBadge.tsx`**
- Reduce padding from `py-8 md:py-16` to `py-6 md:py-10` to tighten the gap.

**3. `src/components/sections/HowItWorks/HowItWorksDesktop.tsx`**
- Reduce top padding from `py-16 md:py-24` to `py-12 md:py-16`.

**4. `src/components/sections/HowItWorks/HowItWorksMobile.tsx`**
- Reduce padding from `py-10` to `py-8`.

### Result
The visual flow from Hero to TrustBadge to How It Works will feel tighter and more intentional, reducing approximately 150-200px of empty space on desktop and 80-100px on mobile.

