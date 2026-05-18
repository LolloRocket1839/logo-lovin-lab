#!/usr/bin/env node
/**
 * Verifies the google-site-verification meta tag in:
 *   1) the live HTML at a given URL (default: https://junglerent.it/)
 *   2) the local build file (default: dist/index.html, fallback: index.html)
 * and reports any mismatch between the two tokens.
 *
 * Usage:
 *   node scripts/check-gsc-meta.mjs
 *   node scripts/check-gsc-meta.mjs https://junglerent.it/
 *   LOCAL_HTML=dist/index.html node scripts/check-gsc-meta.mjs
 *   EXPECTED_TOKEN=eBekI1Go... node scripts/check-gsc-meta.mjs
 *
 * Exit codes:
 *   0 = both sources have the tag, tokens agree (and match EXPECTED_TOKEN if set)
 *   1 = missing tag, token mismatch (live vs local or vs expected), or HTTP error
 */

import { readFile, access } from "node:fs/promises";
import { constants as FS } from "node:fs";

const url = process.argv[2] ?? "https://junglerent.it/";
const expected = process.env.EXPECTED_TOKEN ?? null;
const localCandidates = process.env.LOCAL_HTML
  ? [process.env.LOCAL_HTML]
  : ["dist/index.html", "index.html"];
const META_RE = /<meta\s+name=["']google-site-verification["']\s+content=["']([^"']+)["']/i;
const CTX_CHARS = 60;

const red = (s) => `\x1b[31m${s}\x1b[0m`;
const green = (s) => `\x1b[32m${s}\x1b[0m`;
const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
const dim = (s) => `\x1b[2m${s}\x1b[0m`;
const bold = (s) => `\x1b[1m${s}\x1b[0m`;

const errors = [];
const fail = (msg) => { errors.push(msg); };

function tokenDiff(a, b) {
  const maxLen = Math.max(a.length, b.length);
  const out = [];
  for (let i = 0; i < maxLen; i++) {
    const ca = a[i] ?? "";
    const cb = b[i] ?? "";
    out.push(ca === cb ? ca : red(cb || "∅"));
  }
  return out.join("");
}

function extractToken(html, label) {
  const match = html.match(META_RE);
  if (!match) {
    const headIdx = html.search(/<head[^>]*>/i);
    const snippet = (headIdx !== -1 ? html.slice(headIdx, headIdx + 500) : html.slice(0, 500))
      .replace(/\n/g, " ");
    console.error(`❌ [${label}] No <meta name="google-site-verification"> found.`);
    console.error(`   ${bold("First 500 chars of <head>:")}\n   ${dim(snippet)}\n`);
    return null;
  }
  const token = match[1];
  const matchIdx = match.index ?? 0;
  const before = html.slice(Math.max(0, matchIdx - CTX_CHARS), matchIdx);
  const after = html.slice(matchIdx + match[0].length, matchIdx + match[0].length + CTX_CHARS);
  console.log(`✓ [${label}] token: ${green(token)}`);
  console.log(`  ${bold("Context:")} ${dim("...")}${before}${green(match[0])}${after}${dim("...")}\n`);
  return token;
}

// --- 1) Live HTML ---
console.log(`${bold("→ Live")} ${url}`);
let liveToken = null;
try {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "JungleRent-GSC-Meta-Check/1.1",
      "Cache-Control": "no-cache",
    },
    redirect: "follow",
  });
  console.log(`  HTTP ${res.status} ${res.statusText}`);
  if (!res.ok) {
    fail(`Live HTML returned HTTP ${res.status}`);
  } else {
    const html = await res.text();
    liveToken = extractToken(html, "live");
    if (!liveToken) fail(`Meta tag missing in live HTML`);
  }
} catch (e) {
  fail(`Network error fetching live HTML: ${e.message}`);
  console.error(`❌ ${e.message}\n`);
}

// --- 2) Local build ---
let localPath = null;
for (const p of localCandidates) {
  try {
    await access(p, FS.R_OK);
    localPath = p;
    break;
  } catch { /* try next */ }
}

let localToken = null;
console.log(`${bold("→ Local")} ${localPath ?? `(none of: ${localCandidates.join(", ")})`}`);
if (!localPath) {
  fail(`No local HTML file found (tried: ${localCandidates.join(", ")})`);
  console.error(`❌ No local build file found. Run a build first, or set LOCAL_HTML.\n`);
} else {
  try {
    const html = await readFile(localPath, "utf8");
    localToken = extractToken(html, localPath);
    if (!localToken) fail(`Meta tag missing in ${localPath}`);
  } catch (e) {
    fail(`Error reading ${localPath}: ${e.message}`);
    console.error(`❌ ${e.message}\n`);
  }
}

// --- 3) Compare ---
console.log(bold("→ Comparison"));
if (liveToken && localToken) {
  if (liveToken === localToken) {
    console.log(`  ${green("✓")} live and local tokens match: ${green(liveToken)}`);
  } else {
    fail(`Live vs local token mismatch`);
    console.error(`  ${red("✗")} live ≠ local`);
    console.error(`     ${bold("Live: ")} ${green(liveToken)}`);
    console.error(`     ${bold("Local:")} ${red(localToken)}`);
    console.error(`     ${bold("Diff (red = local side):")}\n     ${tokenDiff(liveToken, localToken)}`);
    console.error(`     ${dim("Hint: the build may not have been deployed yet, or two different verification properties are in use.")}`);
  }
}

if (expected) {
  console.log();
  for (const [label, tok] of [["live", liveToken], ["local", localToken]]) {
    if (!tok) continue;
    if (tok === expected) {
      console.log(`  ${green("✓")} ${label} matches EXPECTED_TOKEN`);
    } else {
      fail(`${label} token does not match EXPECTED_TOKEN`);
      console.error(`  ${red("✗")} ${label} ≠ expected`);
      console.error(`     ${bold("Expected:")} ${green(expected)}`);
      console.error(`     ${bold("Got:     ")} ${red(tok)}`);
      console.error(`     ${bold("Diff:")}\n     ${tokenDiff(expected, tok)}`);
    }
  }
}

console.log();
if (errors.length === 0) {
  console.log(`✅ ${bold("All checks passed.")}`);
  process.exit(0);
} else {
  console.error(`❌ ${bold(`${errors.length} issue(s):`)}`);
  for (const e of errors) console.error(`   - ${yellow(e)}`);
  process.exit(1);
}
