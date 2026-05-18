# `investorZonesSchema` — Field Reference

Runtime contract for `src/data/investorZoneData.ts`, enforced via Zod and
the build/CI guard `scripts/validate-investor-zones.ts`.

- **Strict** = build fails if missing or invalid.
- **Tolerant** = optional, accepts legacy shapes, missing → schema-default.
- Unknown fields are allowed (`passthrough`) so removed legacy fields like
  `grossYield`, `netYield`, `roomRent` do not break the build.

> Update this file whenever the schema in `investorZoneData.ts` changes.

---

## Top-level fields

| Field | Strictness | Type | Notes |
|---|---|---|---|
| `id` | **strict** | `string` (non-empty) | Stable internal identifier. |
| `name` | **strict** | `string` (non-empty) | Human-readable zone name (display). |
| `slug` | **strict** | `string` matching `/^[a-z0-9-]+$/` | Kebab-case. Drives URLs. |
| `zone` | **strict** | enum: `Centro` \| `Semicentro` \| `Periferia` | Macro-area classification. |
| `pricePerSqm` | **strict** | `{ min, avg, max: number > 0 }` | All three required, all positive. |
| `trend202526` | **strict** | enum (5 values, see below) | Catches merged-field bugs (`trend202526demand`). |
| `demand` | **strict** | enum (4 values, see below) | Catches merged-field bugs. |
| `investorNote` | **strict** | i18n string (IT required) | Narrative shown to investors. EN optional. |
| `seo` | **strict** | `{ it: SeoLocale, en?: Partial<SeoLocale> }` | IT block fully required. |
| `variation2024` | tolerant | `number` (coerced from `"+4%"`, `"4"`, etc.) | Defaults to `0` if empty/null. |
| `vacancyRate` | tolerant | `{ min, max }` OR single `number` | Single number → `{min: n, max: n}`. |
| `rentingTime` | tolerant | i18n string | EN optional. |
| `targetTenant` | tolerant | `{ it: string[] ≥1, en?: string[] }` | EN defaults to `[]`. |
| `urbanRenewal` | tolerant | `{ active: bool, projects: UrbanProject[] }` | If present, each project still requires `impact`. |
| `rankings` | tolerant | `{ netYieldRank?, growthPotentialRank?, entryPriceRank?: int > 0 }` | All sub-fields optional. |
| `image` | tolerant | `string` | Defaults to `""`. |
| `coordinates` | tolerant | `{ lat, lng: number }` | Required only if present. |

### Unknown fields

Allowed via `passthrough()`. Examples currently in the wild:
`grossYield`, `netYield`, `roomRent`. They are **never** flagged as errors.

---

## Enums

### `trend202526`

```
'stable' | 'moderate' | 'growth' | 'strong_growth' | 'max_growth'
```

### `demand`

```
'low' | 'medium' | 'high' | 'very_high'
```

### `zone`

```
'Centro' | 'Semicentro' | 'Periferia'
```

---

## Nested shapes

### `i18nString`

```ts
{ it: string (non-empty, required), en?: string (optional, default "") }
```

Used by: `investorNote`, `rentingTime`, `urbanRenewal.projects[].impact`.

### `SeoLocale`

```ts
{
  title: string (non-empty, required),
  description: string (non-empty, required),
  keywords?: string[] (optional, default [])
}
```

`seo.it` is fully required. `seo.en` is optional and partial — pages fall
back to IT when EN is missing.

### `UrbanProject`

```ts
{
  name: string (non-empty, required),
  investment?: string (optional, default ""),
  impact: i18nString  // ← strict, fails build if missing
}
```

---

## Examples

### Minimal valid zone

The smallest zone that passes the schema (all tolerant fields omitted):

```ts
{
  id: 'example-min',
  name: 'Example Min',
  slug: 'example-min',
  zone: 'Centro',
  pricePerSqm: { min: 1000, avg: 1500, max: 2000 },
  trend202526: 'stable',
  demand: 'medium',
  investorNote: { it: 'Nota minima.' },
  seo: {
    it: { title: 'Investire in Example Min', description: 'Desc.' }
  }
}
```

### Full canonical zone

See `src/data/investorZoneData.ts` → `Cenisia` for the reference shape with
every field populated, including `urbanRenewal.projects[]` and bilingual SEO.

### Legacy-tolerant zone

Demonstrates passthrough + coercion:

```ts
{
  id: 'example-legacy',
  name: 'Example Legacy',
  slug: 'example-legacy',
  zone: 'Periferia',
  pricePerSqm: { min: 800, avg: 900, max: 1000 },
  variation2024: '+3%',          // coerced to 3
  trend202526: 'moderate',
  demand: 'low',
  investorNote: { it: 'Nota.' }, // en omitted → ""
  seo: { it: { title: 'T', description: 'D' } }, // keywords omitted → []
  grossYield: 7.2,               // unknown field → ignored
  netYield: 5.4,
  roomRent: { min: 350, max: 500 }
}
```

---

## Common failure modes & fixes

| Error path | Likely cause | Fix |
|---|---|---|
| `trend202526` `[invalid_enum_value]` received `"growthhigh"` | Merged field bug (`trend202526demand`). | Split into `trend202526` and `demand` enums. |
| `investorNote` `[invalid_type]` received `undefined` | Field accidentally dropped. | Add `{ it: '...', en: '...' }`. |
| `seo.it.title` `[too_small]` received `""` | Empty SEO title. | Provide a meaningful IT title. |
| `urbanRenewal.projects.<n>.impact` `[invalid_type]` | Missing impact i18n block on a project. | Add `impact: { it, en }`. |
| `slug` `[invalid_string]` | Slug not kebab-case. | Use lowercase + hyphens only. |
| `pricePerSqm.min` `[too_small]` | Non-positive price. | Must be > 0. |

---

## How validation runs

| Surface | When | On failure |
|---|---|---|
| Module side effect (`import.meta.env.DEV`) | Vite dev start, HMR reload | Console group + sonner toast |
| `scripts/validate-investor-zones.ts` | `vite build` via `validateInvestorZonesPlugin` | Exit ≠ 0, build aborts |
| Vitest `investorZoneData.test.ts` | CI test run | Test failure with grouped report |

Results are memoized per dataset reference (WeakMap) for the lifetime of
the process — repeated calls within one build are free.
