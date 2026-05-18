#!/usr/bin/env -S npx tsx
/**
 * Build/CI guard: validate src/data/investorZoneData.ts against its Zod schema.
 * Prints a grouped, slug-scoped report and (by default) exits non-zero on
 * failure so build and CI pipelines halt before publishing broken data.
 *
 * Flags:
 *   --warn   Log issues but exit 0 (use in dev to avoid blocking the build).
 */
import {
  collectInvestorZoneIssues,
  formatInvestorZoneReport,
} from '../src/data/investorZoneData';

const warnOnly = process.argv.includes('--warn');
const issues = collectInvestorZoneIssues();

if (issues.length === 0) {
  // eslint-disable-next-line no-console
  console.log('[validate-investor-zones] ✓ all zones valid');
  process.exit(0);
}

const report = formatInvestorZoneReport(issues);
const summary = `${issues.length} schema issue${issues.length === 1 ? '' : 's'}`;

if (warnOnly) {
  // eslint-disable-next-line no-console
  console.warn(report);
  // eslint-disable-next-line no-console
  console.warn(`\n[validate-investor-zones] ⚠ ${summary} — continuing (--warn mode).`);
  process.exit(0);
}

// eslint-disable-next-line no-console
console.error(report);
// eslint-disable-next-line no-console
console.error(`\n[validate-investor-zones] ✗ ${summary} — aborting build.`);
process.exit(1);
