

# Fix sticky CTA close button

## Problem
`StickyCTA` line 56: `if (!isVisible) return null` — does not check `isDismissed`. The scroll handler on line 26 prevents setting `isVisible(true)` when dismissed, but never sets it back to `false` for the current render. So clicking X has no immediate effect.

## Fix
**File: `src/components/StickyCTA.tsx`**
- Line 56: change `if (!isVisible) return null` → `if (!isVisible || isDismissed) return null`

One-line fix.

