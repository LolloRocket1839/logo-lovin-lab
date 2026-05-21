---
name: i18n-translation-check
description: Audit i18n translations for the Jungle Rent project. Compares IT (reference) against all other locales in both bundles — main (en/es/fr/de/sv/zh) and investor (en/es/fr/de/sv/zh/pt). Trigger when the user asks to "controllare traduzioni", "check translations", "sync locales", "verificare lingue", when a new language is added, or when `it.json` (main or investor) is modified.
---

# i18n translation check

Single audit covering both locale bundles in this project.

## Bundles

- `src/i18n/locales/{lang}.json` — main, 7 langs: `it` (reference) + `en, es, fr, de, sv, zh`.
- `src/i18n/locales/investor/{lang}.json` — investor, 8 langs: `it` (reference) + `en, es, fr, de, sv, zh, pt`.

`pt` exists **only** in the investor bundle. Do not add `pt.json` to the main bundle unless the user explicitly asks.

## How to run

```bash
node scripts/validate-translations.mjs           # summary + offending keys
node scripts/validate-translations.mjs --verbose # also print keys when no issues
node scripts/validate-translations.mjs --max=50  # show up to 50 keys per category
```

npm script alias: `bun run validate:translations` (or `npm run validate:translations`).

Exit code `1` if any mismatch is found — safe to wire into CI.

## What the script reports per (bundle, lang)

| Category | Meaning | Action |
|---|---|---|
| `missing` | key present in IT, absent in lang | translate from IT and add |
| `extra` | key present in lang, absent in IT | remove, or backport to IT if intentional |
| `empty` | string value is `""` | fill with the IT translation |
| `untranslated≈` | string value identical to IT (likely missed) | translate; if intentional, see allow-list |

## Allow-list (skipped by `untranslated≈`)

Brand/proper nouns and trivial values are tolerated: `Jungle Rent`, `JungleRent`, `Lorenzo`, `WhatsApp`, `Torino`, `Italia`, `S.r.l.`, strings ≤ 3 chars, pure numbers (`€`, `%`, digits), URLs, emails. Add brand tokens to `BRAND_TOKENS` in the script if you find new false positives.

## Fix workflow

1. Run the script and capture the report.
2. Always start from IT — never invent keys in a target lang.
3. When fixing many missing keys at once, edit files in parallel (`code--line_replace` or `code--write`) and re-run the script to confirm zero issues.
4. Keep DE in **Title Case for nouns** per German orthography; all other locales follow strict sentence case (per project memory).
5. After fixing, re-run; commit only when exit code = 0 or you can justify the remaining `untranslated≈` items.

## Known structural issues at time of skill creation

`es/fr/de/sv/zh` main bundles are missing the entire `investor.landing.*` subtree (~127 keys each). EN is complete. This is the first thing to tackle when the user wants real sync.
