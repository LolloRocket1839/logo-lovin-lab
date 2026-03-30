

# A/B Test: Hero Headline

## What We're Testing
- **Variation A** (control): Current headline — "Invest in student housing in Turin"
- **Variation B** (challenger): Direct value-prop — "Earn passive income from Turin student apartments" (IT: "Guadagna reddito passivo dagli appartamenti studenteschi a Torino")

Variation B leads with the *benefit* (earn passive income) rather than the *action* (invest). This tests whether outcome-framing drives more CTA clicks.

## Changes

### 1. Add `hero_headline` to CTAType
**`src/hooks/useABTest.ts`** — Add `'hero_headline'` to the union type.

### 2. Add `hero_headline` to edge function validation
**`supabase/functions/track-ab-test/index.ts`** — Add `'hero_headline'` to the `allowedTypes` array (line 41).

### 3. Add variation B headline translations
**All 7 locale files** (`en.json`, `it.json`, `de.json`, `fr.json`, `es.json`, `zh.json`, `sv.json`) — Add `hero.mainHeadlineB` and `hero.mainSubheadlineB` keys with benefit-first copy.

### 4. Wire A/B logic into ImmersiveHero
**`src/components/innovative/ImmersiveHero.tsx`**:
- Import and call `useABTest('hero_headline')`
- `trackImpression()` on mount
- Select headline/subheadline based on `variation === 'A'` or `'B'`
- Wrap `handleInvestClick` to also call `trackClick()`

## Technical Detail
- No new files or dependencies
- 9 files modified total (hook, edge function, 7 locales, hero component)
- Results viewable at existing `/ab-test-results` dashboard
- Edge function redeployed automatically

