/**
 * Fixtures for investorZoneData schema validation tests.
 * Kept separate so cases stay readable and easy to extend.
 */
import type { InvestorZone } from '../investorZoneData';

/** Minimal valid zone — only critical fields populated. */
export const minimalValidZone: InvestorZone = {
  id: 'fixture-min',
  name: 'Fixture Min',
  slug: 'fixture-min',
  zone: 'Centro',
  pricePerSqm: { min: 1000, avg: 1500, max: 2000 },
  variation2024: 0,
  trend202526: 'stable',
  demand: 'medium',
  vacancyRate: { min: 0, max: 0 },
  rentingTime: { it: '1-2 settimane', en: '1-2 weeks' },
  targetTenant: { it: ['Studenti'], en: ['Students'] },
  urbanRenewal: { active: false, projects: [] },
  rankings: {},
  investorNote: { it: 'Nota.', en: 'Note.' },
  image: '/img.jpg',
  coordinates: { lat: 45, lng: 7 },
  seo: {
    it: { title: 'T', description: 'D', keywords: ['k'] },
    en: { title: 'T', description: 'D', keywords: ['k'] },
  },
};

/** Fully populated valid zone with urban renewal projects. */
export const fullValidZone: InvestorZone = {
  ...minimalValidZone,
  id: 'fixture-full',
  name: 'Fixture Full',
  slug: 'fixture-full',
  zone: 'Semicentro',
  variation2024: 5,
  trend202526: 'growth',
  demand: 'high',
  vacancyRate: { min: 2, max: 4 },
  urbanRenewal: {
    active: true,
    projects: [
      {
        name: 'Project A',
        investment: '€500M',
        impact: { it: 'Forte impatto', en: 'Strong impact' },
      },
    ],
  },
  rankings: { netYieldRank: 1, growthPotentialRank: 2, entryPriceRank: 3 },
};

/** Legacy zone — extra fields, missing optional ones, string variation. */
export const legacyValidZone = {
  id: 'fixture-legacy',
  name: 'Fixture Legacy',
  slug: 'fixture-legacy',
  zone: 'Periferia' as const,
  pricePerSqm: { min: 800, avg: 900, max: 1000 },
  variation2024: '+3%', // legacy string form, coerced
  trend202526: 'moderate' as const,
  demand: 'low' as const,
  investorNote: { it: 'Nota legacy.' }, // en omitted
  seo: {
    it: { title: 'Legacy', description: 'Legacy desc' }, // keywords omitted
  },
  // unknown legacy fields tolerated via passthrough
  grossYield: 7.2,
  netYield: 5.4,
  roomRent: { min: 350, max: 500 },
};

// ─────────────────────────────────────────────────────────────────────────────
// Invalid fixtures — each isolates ONE critical failure mode.
// ─────────────────────────────────────────────────────────────────────────────

export const invalidMissingInvestorNote = {
  ...minimalValidZone,
  investorNote: undefined,
};

export const invalidMissingSeo = (() => {
  const { seo: _seo, ...rest } = minimalValidZone;
  return rest;
})();

export const invalidEmptySeoTitle = {
  ...minimalValidZone,
  seo: {
    ...minimalValidZone.seo,
    it: { ...minimalValidZone.seo.it, title: '' },
  },
};

export const invalidMergedTrendDemand = {
  ...minimalValidZone,
  // Simulates the historical `trend202526demand` merge bug.
  trend202526: 'growthhigh',
};

export const invalidNonKebabSlug = {
  ...minimalValidZone,
  slug: 'Not Kebab',
};

export const invalidZoneEnum = {
  ...minimalValidZone,
  zone: 'Sobborgo',
};

export const invalidNegativePrice = {
  ...minimalValidZone,
  pricePerSqm: { min: -100, avg: 1500, max: 2000 },
};

export const invalidUrbanProjectMissingImpact = {
  ...minimalValidZone,
  urbanRenewal: {
    active: true,
    projects: [{ name: 'Broken', investment: '€1M' /* impact missing */ }],
  },
};

export const validFixtures = [minimalValidZone, fullValidZone, legacyValidZone];

export const invalidFixtures: Array<{ name: string; data: unknown; expectedPath: string }> = [
  { name: 'missing investorNote', data: invalidMissingInvestorNote, expectedPath: 'investorNote' },
  { name: 'missing seo block', data: invalidMissingSeo, expectedPath: 'seo' },
  { name: 'empty seo.it.title', data: invalidEmptySeoTitle, expectedPath: 'seo.it.title' },
  { name: 'merged trend/demand value', data: invalidMergedTrendDemand, expectedPath: 'trend202526' },
  { name: 'non-kebab slug', data: invalidNonKebabSlug, expectedPath: 'slug' },
  { name: 'invalid zone enum', data: invalidZoneEnum, expectedPath: 'zone' },
  { name: 'negative pricePerSqm.min', data: invalidNegativePrice, expectedPath: 'pricePerSqm.min' },
  {
    name: 'urbanRenewal project missing impact',
    data: invalidUrbanProjectMissingImpact,
    expectedPath: 'urbanRenewal.projects.0.impact',
  },
];
