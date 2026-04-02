

# Simplify Homepage + Add Mission Statement

## What the feedback said
A fresh-eyes reviewer found the homepage feels like an advertisement rather than something trustworthy. They want: (1) a clear mission statement so visitors immediately understand *what* Jungle Rent is, and (2) less content on the landing page — pack details into dedicated pages, use collapsible sections where possible.

## Changes

### 1. Add a mission statement below the headline in the Hero

Add a short, trust-building line between the headline and subheadline — something like:

- **IT**: "Jungle Rent acquista immobili a Torino e li affitta a studenti universitari. Tu investi, noi gestiamo tutto."
- **EN**: "Jungle Rent buys properties in Turin and rents them to university students. You invest, we manage everything."

This is a factual, calm one-liner that explains the business model before any sales pitch. It will be added as a new translation key (`hero.missionStatement`) and rendered as a small, muted text block between the h1 and the existing subheadline.

### 2. Remove HomepageFAQ section from the homepage

FAQ content already lives on the dedicated `/faq` page. Removing it from the homepage reduces scroll length. The FAQ link remains accessible from the info drawer and footer navigation.

### 3. Remove BlogBanner section from the homepage

Blog content lives at `/blog`. The banner adds scroll length without direct conversion value. Blog remains accessible from navigation and footer.

### 4. Files changed

| File | Change |
|------|--------|
| `src/i18n/locales/it.json` | Add `hero.missionStatement` |
| `src/i18n/locales/en.json` | Add `hero.missionStatement` |
| `src/i18n/locales/de.json`, `fr.json`, `es.json`, `zh.json`, `sv.json` | Add `hero.missionStatement` |
| `src/components/innovative/ImmersiveHero.tsx` | Render the mission statement between headline and subheadline |
| `src/pages/Index.tsx` | Remove `HomepageFAQ` and `BlogBanner` lazy imports and their JSX |

### Result

Homepage flow becomes: **Hero** (with mission statement) → **TrustBadge** → **HowItWorks** → **InvestorSection** → **SellerSection** → **Footer**. Leaner, clearer, more trustworthy.

