import { describe, it, expect } from 'vitest';
import {
  investorZones,
  investorZoneSchema,
  investorZonesSchema,
  validateInvestorZones,
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

  it('rejects a zone missing required top-level fields', () => {
    const broken = { ...investorZones[0] } as Record<string, unknown>;
    delete broken.investorNote;
    delete broken.rankings;
    const result = investorZoneSchema.safeParse(broken);
    expect(result.success).toBe(false);
    if (!result.success) {
      const paths = result.error.issues.map((i) => i.path.join('.'));
      expect(paths).toEqual(expect.arrayContaining(['investorNote', 'rankings']));
    }
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
