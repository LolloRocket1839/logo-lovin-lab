#!/usr/bin/env -S npx tsx
/**
 * Build/CI guard: validate src/data/investorZoneData.ts against its Zod schema.
 * Exits with non-zero status on failure so build and CI pipelines halt.
 */
import { validateInvestorZones } from '../src/data/investorZoneData';

try {
  validateInvestorZones();
  // eslint-disable-next-line no-console
  console.log('[validate-investor-zones] ✓ all zones valid');
} catch (err) {
  // eslint-disable-next-line no-console
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
}
