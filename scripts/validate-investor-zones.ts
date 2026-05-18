#!/usr/bin/env -S npx tsx
/**
 * Build/CI guard: validate src/data/investorZoneData.ts against its Zod schema.
 * Prints (1) a compact per-zone/per-field summary table with readable paths
 * and (2) the grouped, slug-scoped detail report. Exits non-zero on failure
 * so build and CI pipelines halt before publishing broken data.
 *
 * Flags:
 *   --warn   Log issues but exit 0 (use in dev to avoid blocking the build).
 */
import {
  collectInvestorZoneIssues,
  formatInvestorZoneReport,
  formatInvestorZoneSummary,
} from '../src/data/investorZoneData';

const warnOnly = process.argv.includes('--warn');
const issues = collectInvestorZoneIssues();

if (issues.length === 0) {
  // eslint-disable-next-line no-console
  console.log('[validate-investor-zones] ✓ all zones valid');
  process.exit(0);
}

const summary = formatInvestorZoneSummary(issues);
const report = formatInvestorZoneReport(issues);
const tally = `${issues.length} schema issue${issues.length === 1 ? '' : 's'}`;
const log = warnOnly ? console.warn : console.error;

/* eslint-disable no-console */
log(summary);
log('');
log(report);
log('');
log(
  warnOnly
    ? `[validate-investor-zones] ⚠ ${tally} — continuing (--warn mode).`
    : `[validate-investor-zones] ✗ ${tally} — aborting build.`,
);
/* eslint-enable no-console */

process.exit(warnOnly ? 0 : 1);
