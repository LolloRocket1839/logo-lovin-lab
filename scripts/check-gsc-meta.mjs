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
const CTX_CHARS = 60; // characters before/after the match to show

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

const fail = (msg) => { console.error(`❌ ${msg}`); process.exit(1); };
const ok = (msg) => { console.log(`✅ ${msg}`); process.exit(0); };

function tokenDiff(a, b) {
  const maxLen = Math.max(a.length, b.length);
  const out = [];
  for (let i = 0; i < maxLen; i++) {
    const ca = a[i] ?? "";
    const cb = b[i] ?? "";
    if (ca === cb) {
      out.push(ca);
    } else {
      out.push(red(cb || "∅"));
    }
  }
  return out.join("");
}

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
  // Show a snippet around the <head> for debugging
  const headIdx = html.search(/<head[^>]*>/i);
  const snippet = headIdx !== -1
    ? html.slice(headIdx, headIdx + 500).replace(/\n/g, " ")
    : html.slice(0, 500).replace(/\n/g, " ");
  fail(
    `No <meta name="google-site-verification"> tag found in live HTML.\n` +
    `   ${dim("Hint: the new build may not have propagated yet — republish from the Lovable editor.")}\n\n` +
    `   ${bold("First 500 chars of <head>:")}\n   ${dim(snippet)}`
  );
}

const token = match[1];
const matchIdx = match.index ?? 0;
const contextStart = Math.max(0, matchIdx - CTX_CHARS);
const contextEnd = Math.min(html.length, matchIdx + match[0].length + CTX_CHARS);
const before = html.slice(contextStart, matchIdx);
const tag = match[0];
const after = html.slice(matchIdx + tag.length, contextEnd);

console.log(`   Found token: ${green(token)}\n`);
console.log(`   ${bold("Context in HTML:")}`);
console.log(`   ${dim("...")}${before}${green(tag)}${after}${dim("...")}\n`);

if (expected && token !== expected) {
  fail(
    `Token mismatch.\n\n` +
    `   ${bold("Expected:")} ${green(expected)}\n` +
    `   ${bold("Got:     ")} ${red(token)}\n\n` +
    `   ${bold("Diff (red = different/got side):")}\n` +
    `   ${tokenDiff(expected, token)}\n\n` +
    `   ${dim("Hint: if the token changed intentionally, update EXPECTED_TOKEN.")}`
  );
}

ok(expected ? `Meta tag detected and matches expected token.` : `Meta tag detected on live site.`);
