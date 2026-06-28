## Goal
Fix the English (`en`) translation bundle so every user-visible string is in proper English. The audit flags 84 `untranslated≈` keys in `src/i18n/locales/en.json` plus 3 in `src/i18n/locales/investor/en.json`.

## Approach
Classify the 87 EN keys into two buckets and act on each:

### A. Translate to English (real Italian leftovers)
Update the value in `src/i18n/locales/en.json` and `src/i18n/locales/investor/en.json`. Examples:
- `breadcrumbs.home` → "Home" (already English, just confirm — actually the IT value is also "Home"; allow-list).
- `common.menu` → "Menu" (allow-list, identical word).
- `nav.home` → "Home" (allow-list).
- `seller.comparison.visitsJR` → translate IT phrase to EN.
- `seller.comparison.roleAgency` (flagged in ES not EN — skip).
- `sellersPage.calculator.condition.daRistrutturare` → "To renovate", `buonoStato` → "Good condition", `ristrutturato` → "Renovated", `label` → "Condition", `tooltip` → translate, `dataSource` → translate, `propertyType` → "Property type".
- `investor.flowStep3` → translate IT step text.
- `investor.landing.founder.signature` → translate.
- `investor.landing.form.fields.email` → "Email" (identical, allow-list).
- `investor.landing.trust.items.rea.value` / `incubator.label` / `vat.label` → check; mostly proper nouns/codes (REA, P.IVA) — keep as is; allow-list.
- `investor.landing.quickBar.whatsapp` → "WhatsApp" (brand, allow-list).
- Budget/ticket ranges (`50k-100k`, `5-10`, `100k-200k`, `over-600`) → pure numeric strings, allow-list.
- Referral source labels (`google`, `linkedin`, `facebook`, `instagram`) → brand names, allow-list.
- Zone/area names (`crocetta`, `lingotto`, `san-paolo`, `san-salvario`, `vanchiglia`, `santa-rita`, `aurora`, `centro`) → Turin neighborhood proper nouns, allow-list.
- University codes (`polito`, `unito`, `escp`, `iaad`, `ied`, `iusto`) → proper nouns, allow-list.
- `hero.politecnico` → "Politecnico" / `hero.unito` → "UniTo" → proper nouns, allow-list.
- `contacts.email` / `contacts.formEmail` → the literal email address `junglerententerprise@gmail.com`, allow-list.
- `footer.partnershipTitle` → translate the IT phrase to English.
- `resourceLibrary.guide3Badge`, `guide4Badge` → translate if Italian; keep if "New".
- All `*.emailLabel` keys → likely "Email" (allow-list).
- `investor/en.json`: `investorTypes.familyOffice` → "Family office" (identical, allow-list), `sources.linkedin` / `sources.referral` → brand/identical, allow-list.

### B. Extend allow-list
For genuine proper nouns / brand names / numeric ranges / single-word labels that are correctly the same in IT and EN (`Crocetta`, `Lingotto`, `Polito`, `Google`, `LinkedIn`, `Facebook`, `Instagram`, `WhatsApp`, `Politecnico`, `Email`, `Menu`, `Home`, `Family office`, `5-10`, `50k-100k`, `over-600`, email addresses), add the tokens or value patterns to `BRAND_TOKENS` / value heuristics in `scripts/validate-translations.mjs` so the audit stops flagging them.

## Files to edit
- `src/i18n/locales/en.json` — fix real Italian strings (calculator conditions, investor flow text, footer partnership title, seller comparison visits, founder signature, guide badges if Italian).
- `src/i18n/locales/investor/en.json` — confirm `familyOffice`, `linkedin`, `referral` values, keep as English equivalents.
- `scripts/validate-translations.mjs` — expand `BRAND_TOKENS` with Turin zones + university acronyms + referral brand names + "Politecnico" + "Family office" so the false positives clear.

## Out of scope
- Other locales (`es`, `fr`, `de`, `sv`, `zh`, `pt`) — the user asked specifically for English.
- Adding new translation keys, restructuring i18n, or changing components.

## Verification
Run `node scripts/validate-translations.mjs` and confirm the `en` row in both bundles reports `untranslated≈0` (or only allow-listed tokens, with exit code 0 once the allow-list update lands).
