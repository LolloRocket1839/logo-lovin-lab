

# Enable browser autofill for email fields in lead forms

## Problem
The email input fields in lead capture dialogs don't have `name` or `autocomplete` attributes, so browsers can't offer autofill suggestions from previously entered emails.

## Fix
Add `name="email"` and `autoComplete="email"` to the email `<Input>` in all lead dialogs. This lets the browser suggest previously used emails automatically — no auth system needed.

## Files changed

| File | Change |
|------|--------|
| `src/components/dialogs/QuickInvestorLeadDialog.tsx` | Add `name="email"` and `autoComplete="email"` to Input |
| `src/components/dialogs/QuickSellerLeadDialog.tsx` | Same |
| `src/components/dialogs/WaitlistDialog.tsx` | Same |
| `src/components/dialogs/InvestorWaitlistDialog.tsx` | Same |

Single-line change per file — just adding two HTML attributes to existing `<Input>` elements.

