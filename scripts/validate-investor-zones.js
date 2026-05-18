#!/usr/bin/env node
/**
 * Build/CI guard: validate src/data/investorZoneData.ts against its Zod schema.
 * Exits with non-zero status on any schema failure so the build/CI pipeline halts.
 */
import { pathToFileURL } from 'node:url';
import { register } from 'node:module';

// Use tsx loader to import the TS module directly.
try {
  register('tsx/esm', pathToFileURL('./'));
} catch (e) {
  console.error('[validate-investor-zones] tsx loader unavailable:', e.message);
  process.exit(1);
}

const modUrl = pathToFileURL(new URL('../src/data/investorZoneData.ts', import.meta.url).pathname).href;

try {
  const mod = await import(modUrl);
  if (typeof mod.validateInvestorZones !== 'function') {
    console.error('[validate-investor-zones] validateInvestorZones export not found');
    process.exit(1);
  }
  mod.validateInvestorZones();
  console.log('[validate-investor-zones] ✓ all zones valid');
} catch (err) {
  console.error(err?.message || err);
  process.exit(1);
}
