## Goal
Make the Chinese (zh) bundles fully correct, matching the IT reference.

## Audit results for zh

**Main bundle (`src/i18n/locales/zh.json`)**
- 1 empty key: `problem.stat2Sub` — needs a translation copied/adapted from IT.
- 15 keys still equal to the IT source:
  - Seller calculator (these are real Italian leftovers from the recent EN fix that were never propagated to zh):
    - `sellersPage.calculator.condition.label`, `.tooltip`, `.daRistrutturare`, `.daRistrutturareShort`, `.buonoStato`, `.buonoStatoShort`, `.ristrutturato`, `.ristrutturatShort`
    - `sellersPage.calculator.dataSource`, `sellersPage.calculator.propertyType`
  - Investor landing tickets (currency ranges — Chinese should localize the labels around them):
    - `investor.landing.form.options.ticket.5-10`, `.10-20`, `.20-50`, `.50+`
  - `investor.landing.disclaimer.company` — currently the IT legal sentence; needs a zh version (keep "Jungle Rent S.r.l." as proper noun).

**Investor bundle (`src/i18n/locales/investor/zh.json`)**
- 1 extra key: `countries.china` — not in the IT reference. Remove (the IT reference list dictates what's exposed).

## Changes
1. Edit `src/i18n/locales/zh.json`:
   - Fill `problem.stat2Sub` with a Simplified Chinese translation of the IT value.
   - Translate the 10 seller-calculator strings into Simplified Chinese (short variants stay short).
   - Localize the 4 investor ticket option labels (currency ranges kept numeric; surrounding wording in zh).
   - Translate `investor.landing.disclaimer.company` into Simplified Chinese, preserving "Jungle Rent S.r.l." and any legal/proper-noun tokens.
2. Edit `src/i18n/locales/investor/zh.json`:
   - Remove the extra `countries.china` key so the bundle matches the IT key set.
3. Re-run `node scripts/validate-translations.mjs` and confirm both zh rows report `missing=0 extra=0 empty=0 untranslated≈0`.

## Out of scope
Other locales (es, fr, de, sv) still have residual `untranslated≈` issues. Not touching them in this pass — user asked specifically about Chinese.

## Technical notes
- Style: strict sentence case (zh isn't case-sensitive but follow project convention — no ALL CAPS).
- Preserve brand tokens verbatim: `Jungle Rent`, `JungleRent`, `Lorenzo`, `WhatsApp`, `Torino`, `S.r.l.`, university names where they appear.
- Currency/percent figures stay numeric; only the surrounding words get translated.
- No code or component changes — pure JSON edits.
