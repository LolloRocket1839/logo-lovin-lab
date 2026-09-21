# Copy fix: replace "THE PROPERTY PERFORMS AND PAYS BACK"

The English Metric on the homepage "How it works" scene currently says "THE PROPERTY PERFORMS AND PAYS BACK". It reads like a dividend/payout promise.

## Change
- In `src/components/immersive/LiquidHomepageStory.tsx` line 177, change the English branch of the third Metric label from:
  `"THE PROPERTY PERFORMS AND PAYS BACK"`
  to:
  `"You participate in the performance of the property"`

## Verify
- `bun run typecheck`
- `bun run build`
- Quick smoke test of `/` English version to confirm the new text appears.

No other files touched.