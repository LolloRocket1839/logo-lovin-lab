import { describe, it, expect } from 'vitest';
import {
  investorZones,
  investorZoneSchema,
  investorZonesSchema,
  validateInvestorZones,
  collectInvestorZoneIssues,
  clearInvestorZoneValidationCache,
} from './investorZoneData';

describe('investorZonesSchema', () => {
  it('validates the full investorZones dataset', () => {
    const result = investorZonesSchema.safeParse(investorZones);
    if (!result.success) {
      // Surface a readable diff if this ever regresses.
      console.error(result.error.issues);
    }
    expect(result.success).toBe(true);
  });

  it('validateInvestorZones() does not throw on current data', () => {
    expect(() => validateInvestorZones()).not.toThrow();
  });

  it.each(investorZones.map((z) => [z.id, z]))(
    'zone "%s" matches the schema',
    (_id, zone) => {
      const result = investorZoneSchema.safeParse(zone);
      if (!result.success) console.error(result.error.issues);
      expect(result.success).toBe(true);
    },
  );

  it('rejects a zone missing a critical field (investorNote)', () => {
    const broken = { ...investorZones[0] } as Record<string, unknown>;
    delete broken.investorNote;
    // `rankings` is intentionally tolerated as optional (legacy support).
    delete broken.rankings;
    const result = investorZoneSchema.safeParse(broken);
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'));
      expect(paths).toContain('investorNote');
      expect(paths).not.toContain('rankings');
    }
  });

  it('tolerates legacy/optional fields (image, coordinates, vacancyRate, rentingTime, targetTenant, urbanRenewal, rankings) being absent', () => {
    const base = investorZones[0];
    const minimal = {
      id: base.id,
      name: base.name,
      slug: base.slug,
      zone: base.zone,
      pricePerSqm: base.pricePerSqm,
      trend202526: base.trend202526,
      demand: base.demand,
      investorNote: base.investorNote,
      seo: base.seo,
    };
    expect(investorZoneSchema.safeParse(minimal).success).toBe(true);
  });

  it('tolerates unknown legacy fields without flagging them (passthrough)', () => {
    const withLegacy = {
      ...investorZones[0],
      grossYield: 7.2,
      netYield: 5.4,
      roomRent: { min: 350, max: 500 },
    };
    expect(investorZoneSchema.safeParse(withLegacy).success).toBe(true);
  });

  it('coerces a numeric-string variation2024 ("+4%") to a number', () => {
    const coerced = { ...investorZones[0], variation2024: '+4%' };
    const result = investorZoneSchema.safeParse(coerced);
    expect(result.success).toBe(true);
    if (result.success) expect(result.data.variation2024).toBe(4);
  });

  it('rejects a zone missing the seo block', () => {
    const broken = { ...investorZones[0] } as Record<string, unknown>;
    delete broken.seo;
    const result = investorZoneSchema.safeParse(broken);
    expect(result.success).toBe(false);
  });

  it('rejects an invalid trend202526 enum value (catches merged-field bugs)', () => {
    const broken = {
      ...investorZones[0],
      trend202526: 'super_growth_2025_2026' as unknown as string,
    };
    const result = investorZoneSchema.safeParse(broken);
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'));
      expect(paths).toContain('trend202526');
    }
  });

  it('rejects a non-kebab-case slug', () => {
    const broken = { ...investorZones[0], slug: 'Not Kebab Case' };
    const result = investorZoneSchema.safeParse(broken);
    expect(result.success).toBe(false);
  });

  it('rejects an urbanRenewal project missing impact', () => {
    const original = investorZones.find((z) => z.urbanRenewal?.projects?.length);
    if (!original) return;
    const broken = JSON.parse(JSON.stringify(original));
    delete broken.urbanRenewal.projects[0].impact;
    const result = investorZoneSchema.safeParse(broken);
    expect(result.success).toBe(false);
  });

  it('validateInvestorZones() throws with a readable message on broken input', () => {
    const broken = investorZones.map((z, i) =>
      i === 0 ? ({ ...z, investorNote: undefined } as unknown) : z,
    );
    expect(() => validateInvestorZones(broken)).toThrow(
      /\[investorZoneData\] schema validation failed/,
    );
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Geographic sanity — every zone must sit inside the Turin metropolitan
// bounding box and use finite, well-typed numeric coordinates.
// Bounds are intentionally generous (covers Turin + first ring).
// ─────────────────────────────────────────────────────────────────────────────

const TURIN_BOUNDS = {
  latMin: 44.95,
  latMax: 45.20,
  lngMin: 7.50,
  lngMax: 7.85,
} as const;

describe('investorZones — coordinates', () => {
  it.each(investorZones.map((z) => [z.id, z]))(
    'zone "%s" has finite numeric lat/lng',
    (_id, zone) => {
      expect(zone.coordinates).toBeDefined();
      const { lat, lng } = zone.coordinates;
      expect(typeof lat).toBe('number');
      expect(typeof lng).toBe('number');
      expect(Number.isFinite(lat)).toBe(true);
      expect(Number.isFinite(lng)).toBe(true);
      // Reject sentinel/default values.
      expect(lat).not.toBe(0);
      expect(lng).not.toBe(0);
    },
  );

  it.each(investorZones.map((z) => [z.id, z]))(
    'zone "%s" lat is within global range [-90, 90]',
    (_id, zone) => {
      expect(zone.coordinates.lat).toBeGreaterThanOrEqual(-90);
      expect(zone.coordinates.lat).toBeLessThanOrEqual(90);
    },
  );

  it.each(investorZones.map((z) => [z.id, z]))(
    'zone "%s" lng is within global range [-180, 180]',
    (_id, zone) => {
      expect(zone.coordinates.lng).toBeGreaterThanOrEqual(-180);
      expect(zone.coordinates.lng).toBeLessThanOrEqual(180);
    },
  );

  it.each(investorZones.map((z) => [z.id, z]))(
    'zone "%s" sits inside the Turin bounding box',
    (_id, zone) => {
      const { lat, lng } = zone.coordinates;
      expect(lat).toBeGreaterThanOrEqual(TURIN_BOUNDS.latMin);
      expect(lat).toBeLessThanOrEqual(TURIN_BOUNDS.latMax);
      expect(lng).toBeGreaterThanOrEqual(TURIN_BOUNDS.lngMin);
      expect(lng).toBeLessThanOrEqual(TURIN_BOUNDS.lngMax);
    },
  );

  it('coordinates have at least 3 decimals of precision (≈100m)', () => {
    const lowPrecision = investorZones.filter((z) => {
      const decimals = (n: number) => (String(n).split('.')[1] ?? '').length;
      return decimals(z.coordinates.lat) < 3 || decimals(z.coordinates.lng) < 3;
    });
    expect(lowPrecision.map((z) => z.id)).toEqual([]);
  });

  it('no two zones share identical coordinates (likely copy-paste bug)', () => {
    const seen = new Map<string, string>();
    const duplicates: Array<[string, string]> = [];
    for (const z of investorZones) {
      const key = `${z.coordinates.lat},${z.coordinates.lng}`;
      const prev = seen.get(key);
      if (prev) duplicates.push([prev, z.id]);
      else seen.set(key, z.id);
    }
    expect(duplicates).toEqual([]);
  });
});

// ─────────────────────────────────────────────────────────────────────────────
// Fixture-driven regression suite — prevents structural drift over time.
// Each invalid fixture isolates one critical failure mode and asserts that
// the validator both fails AND points at the correct field path.
// ─────────────────────────────────────────────────────────────────────────────

import {
  validFixtures,
  invalidFixtures,
} from './__fixtures__/investorZoneFixtures';

describe('validateInvestorZones — fixtures', () => {
  describe('valid fixtures pass', () => {
    it.each(validFixtures.map((z) => [z.id, z]))(
      'accepts "%s" as a single-element dataset',
      (_id, zone) => {
        expect(() => validateInvestorZones([zone])).not.toThrow();
      },
    );

    it('accepts the combined valid dataset', () => {
      expect(() => validateInvestorZones(validFixtures)).not.toThrow();
    });
  });

  describe('invalid fixtures fail with the expected path', () => {
    it.each(invalidFixtures.map((f) => [f.name, f]))(
      'rejects: %s',
      (_name, fixture) => {
        const f = fixture as { data: unknown; expectedPath: string };
        let caught: Error | null = null;
        try {
          validateInvestorZones([f.data]);
        } catch (e) {
          caught = e as Error;
        }
        expect(caught).not.toBeNull();
        expect(caught!.message).toMatch(/\[investorZoneData\] schema validation failed/);
        expect(caught!.message).toContain(f.expectedPath);
      },
    );
  });

  it('reports all invalid fixtures in a single pass without false-positives on valid ones', () => {
    const mixed = [...validFixtures, ...invalidFixtures.map((f) => f.data)];
    let caught: Error | null = null;
    try {
      validateInvestorZones(mixed);
    } catch (e) {
      caught = e as Error;
    }
    expect(caught).not.toBeNull();
    // Every invalid fixture's expected path must surface in the grouped report.
    for (const f of invalidFixtures) {
      expect(caught!.message).toContain(f.expectedPath);
    }
    // Sanity: report header lists the expected total issue count.
    expect(caught!.message).toMatch(/schema validation failed — \d+ issue/);
  });
});

describe('collectInvestorZoneIssues — caching', () => {
  it('returns the exact same array reference on repeated calls for the same dataset', () => {
    clearInvestorZoneValidationCache();
    const dataset = [investorZones[0]];
    const first = collectInvestorZoneIssues(dataset);
    const second = collectInvestorZoneIssues(dataset);
    expect(second).toBe(first);
  });

  it('produces distinct results for distinct dataset references', () => {
    clearInvestorZoneValidationCache();
    const a = [investorZones[0]];
    const b = [{ ...investorZones[0], investorNote: undefined } as unknown];
    const ra = collectInvestorZoneIssues(a);
    const rb = collectInvestorZoneIssues(b);
    expect(ra).not.toBe(rb);
    expect(ra.length).toBe(0);
    expect(rb.length).toBeGreaterThan(0);
  });

  it('clearInvestorZoneValidationCache() forces a fresh computation', () => {
    const dataset = [investorZones[0]];
    const first = collectInvestorZoneIssues(dataset);
    clearInvestorZoneValidationCache();
    const second = collectInvestorZoneIssues(dataset);
    expect(second).not.toBe(first);
    expect(second).toEqual(first);
  });
});
