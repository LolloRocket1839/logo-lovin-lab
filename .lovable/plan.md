

# A/B Test: WhatsApp FAB vs Contact Us Sticky Banner

## What We're Testing
- **Variation A**: Current WhatsApp FAB (green floating circle, mobile-only)
- **Variation B**: Traditional "Contact Us" sticky banner (full-width bar at bottom with text + button, mobile-only)

Both open the same WhatsApp chat on click. We measure which UI pattern gets more taps.

## Changes

### 1. Add `whatsapp_fab` to allowed CTA types

**`src/hooks/useABTest.ts`** — Add `'whatsapp_fab'` to the `CTAType` union.

**`supabase/functions/track-ab-test/index.ts`** — Add `'whatsapp_fab'` to the `allowedTypes` array.

### 2. Rewrite `WhatsAppFAB.tsx` with A/B logic

Replace the current component with one that:
- Calls `useABTest('whatsapp_fab')`
- Tracks impression when the element becomes visible
- On **variation A**: renders the current green floating