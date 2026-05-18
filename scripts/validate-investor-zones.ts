#!/usr/bin/env -S npx tsx
/**
 * Build/CI guard: validate src/data/investorZoneData.ts against its Zod schema.
 * Prints a grouped, slug-scoped report and exits with non-zero status on failure
 * so build and CI pipelines halt before publishing broken data.
 */
import {
  collectInvestorZoneIssues,
  formatInvestorZoneReport,
} from '../src/data/investorZoneData';

const issues = collectInvestorZoneIssues();

if (issues.length === 0) {
  // eslint-disable-next-line no-console
  console.log('[validate-investor-zones] ✓ all zones valid');
  process.exit(0);
}

// eslint-disable-next-line no-console
console.error(formatInvestorZoneReport(issues));
// eslint-disable-next-line no-console
console.error(
  `\n[validate-investor-zones] ✗ ${issues.length} schema issue${issues.length === 1 ? '' : 's'} — aborting build.`,
);
process.exit(1);
