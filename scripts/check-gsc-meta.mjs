#!/usr/bin/env node
/**
 * Fetches the live homepage and verifies the google-site-verification meta tag is present.
 *
 * Usage:
 *   node scripts/check-gsc-meta.mjs
 *   node scripts/check-gsc-meta.mjs https://junglerent.it/
 *   EXPECTED_TOKEN=eBekI1Go... node scripts/check-gsc-meta.mjs
 *
 * Exit codes:
 *   0 = meta tag detected (and matches EXPECTED_TOKEN if set)
 *   1 = meta tag missing, mismatched, or HTTP error
 */

const url = process.argv[2] ?? "https://junglerent.it/";
const expected = process.env.EXPECTED_TOKEN ?? null;
const META_RE = /<meta\s+name=["']google-site-verification["']\s+content=["']([^"']+)["']/i;

const fail = (msg) => { console.error(`❌ ${msg}`); process.exit(1); };
const ok = (msg) => { console.log(`✅ ${msg}`); process.exit(0); };

console.log(`→ Fetching ${url}`);
let res;
try {
  res = await fetch(url, {
    headers: {
      "User-Agent": "JungleRent-GSC-Meta-Check/1.0",
      "Cache-Control": "no-cache",
    },
    redirect: "follow",
  });
} catch (e) {
  fail(`Network error: ${e.message}`);
}

console.log(`   HTTP ${res.status} ${res.statusText}`);
if (!res.ok) fail(`Homepage returned non-2xx status`);

const html = await res.text();
const match = html.match(META_RE);
if (!match) {
  fail(`No <meta name="google-site-verification"> tag found in live HTML.\n   The new build hasn't propagated yet — republish from the Lovable editor.`);
}

const token = match[1];
console.log(`   Found token: ${token}`);

if (expected && token !== expected) {
  fail(`Token mismatch.\n   Expected: ${expected}\n   Got:      ${token}`);
}

ok(expected ? `Meta tag detected and matches expected token.` : `Meta tag detected on live site.`);
