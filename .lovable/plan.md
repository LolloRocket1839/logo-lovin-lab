

# MVP: Contract Builder with Knowledge Base Rules

## What exists today

The current `/contratti-locazione` page is a **lead-capture flow**: the user picks a plan, fills in email + notes, and Jungle Rent manually drafts the contract offline. There is no automated contract generation.

## What the MVP would do

A **multi-step wizard** that collects property and tenant data, applies the canone concordato rules from the knowledge base, and generates a **contract-ready PDF** (or structured preview) — all client-side with AI assistance for the final draft.

## Wizard Steps

```text
Step 1: Contract Type
  → 4+4 (free market) | 3+2 (canone concordato) | Transitional | Student

Step 2: Property Details
  → Address (with zone auto-detection from street directory)
  → Usable sqm, balconies, cellar, garage (auto-calculates conventional sqm)
  → Energy class (A1-G)
  → Year built / renovation year
  → Furnished yes/no, furniture value

Step 3: 22 Feature Elements Checklist (for concordato only)
  → Checkboxes for each element → auto-calculates sub-band (1/2/3)
  → Shows the min-max €/m² range for the detected zone + sub-band

Step 4: Rent Calculation
  → Auto-applies surface coefficient, surcharges/reductions
  → User picks final rent within the allowed range
  → Shows tax comparison: IRPEF vs cedolare secca savings

Step 5: Parties & Terms
  → Landlord name, CF, address
  → Tenant name, CF, university (if student)
  → Start date, deposit amount, flat tax election

Step 6: Preview & Generate
  → Shows contract summary with all clauses
  → Generates PDF via edge function (or client-side)
  → Option to send to Jungle Rent for review
```

## Technical Architecture

| Component | Purpose |
|-----------|---------|
| `src/components/contracts/ContractWizard.tsx` | Main wizard with step navigation |
| `src/components/contracts/steps/ContractTypeStep.tsx` | Step 1 |
| `src/components/contracts/steps/PropertyDetailsStep.tsx` | Step 2 with sqm calculator |
| `src/components/contracts/steps/FeatureChecklistStep.tsx` | 22-element scoring |
| `src/components/contracts/steps/RentCalculationStep.tsx` | Auto-calc with tax comparison |
| `src/components/contracts/steps/PartiesStep.tsx` | Landlord + tenant info |
| `src/components/contracts/steps/PreviewStep.tsx` | Summary + generate |
| `src/lib/contract-rules.ts` | All canone concordato logic: zones, bands, coefficients, surcharges |
| `src/data/contract-zones.ts` | Zone/microzone mapping data, rent tables |
| Edge function `generate-contract` | Takes wizard data → returns PDF with proper Italian contract template |

## Knowledge base rules encoded in `contract-rules.ts`

- **Surface calculation**: walkable 100%, garage 80%, cellar/balcony 25%, outdoor 10%
- **Surface coefficients**: ≤41m² → +30%, 41-51 → +25%, 51-67 → +20%, 67-80 → min 80.40m²
- **Zone detection**: 4 areas × 3 sub-bands + premium zones (single band €5-8)
- **Rent tables**: all min-max values from the Territorial Agreement for 3+2, 4+2, 5+2, 6+2, transitional, student
- **Surcharges/reductions**: new build, renovation, energy class, furniture, deposit waiver, early termination, furnished, ≥9 features — all applied on base rent (not cumulative)
- **Tax calculator**: cedolare secca 10% vs IRPEF brackets, IMU rates (4.31‰ / 7.95‰ / 10.6‰)

## Contract PDF template

The edge function would use a standard Italian contract template (Ministerial models from D.M. 16/01/2017) with placeholders filled from wizard data. For the MVP, we generate a clean HTML → PDF using a library like `jspdf` or server-side rendering.

## Files changed

| File | Action |
|------|--------|
| `src/pages/ContrattiLocazione.tsx` | Add wizard entry point alongside existing plans |
| `src/components/contracts/ContractWizard.tsx` | New — main wizard |
| `src/components/contracts/steps/*.tsx` | New — 6 step components |
| `src/lib/contract-rules.ts` | New — all calculation logic |
| `src/data/contract-zones.ts` | New — zone/rent data tables |
| `supabase/functions/generate-contract/index.ts` | New — PDF generation edge function |
| `src/i18n/locales/*.json` | Add wizard translation keys |

## Scope for MVP

- **In scope**: wizard UI, rule engine, rent calculator, tax comparison, contract preview (HTML), lead capture with pre-filled data
- **Deferred**: PDF generation, street-level zone auto-detection, saved drafts, e-signature integration

