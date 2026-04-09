

## Plan: Update Payout Frequency from Quarterly to Every 2 Months

All references to "quarterly" / "trimestrale" across the site will be changed to "every 2 months" / "bimestrale" to reflect the actual payout schedule.

### Files to Edit

**1. `src/i18n/locales/it.json`** — Change all instances of "trimestralmente", "trimestrali", "ogni trimestre" to "bimestralmente", "bimestrali", "ogni 2 mesi" (approx. 10+ occurrences in infographic, hero, FAQ, testimonials sections)

**2. `src/i18n/locales/en.json`** — Change "quarterly" to "every 2 months" / "bi-monthly" throughout

**3. `src/i18n/locales/es.json`** — Change "trimestralmente", "trimestrales" to "bimestralmente", "bimestrales"

**4. `src/i18n/locales/fr.json`** — Some already say "bimestriels", fix remaining "trimestriels" references

**5. `src/i18n/locales/de.json`** — Change "Quartalsberichte" / "vierteljährlich" to "zweimonatlich" / "alle 2 Monate"

**6. `src/i18n/locales/sv.json`** — Change "Kvartalsrapporter" to "Varannan månad-rapporter"

**7. `src/i18n/locales/zh.json`** — Change "季度" to "双月" (every 2 months)

**8. `src/components/VideoSection.tsx`** — Change fallback string `'Rendite trimestrali'` to `'Rendite bimestrali'`

### No structural changes — purely text replacements across locale files and one component fallback string.

