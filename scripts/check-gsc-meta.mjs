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
 *   # JSON report (machine-readable, no ANSI/no human logs on stdout):
 *   node scripts/check-gsc-meta.mjs --json
 *   node scripts/check-gsc-meta.mjs --json=report.json
 *   JSON_OUTPUT=1 node scripts/check-gsc-meta.mjs
 *
 * Exit codes:
 *   0 = both sources have the tag, tokens agree (and match EXPECTED_TOKEN if set)
 *   1 = missing tag, token mismatch (live vs local or vs expected), or HTTP error
 */

import { readFile, writeFile, access } from "node:fs/promises";
import { constants as FS } from "node:fs";

const args = process.argv.slice(2);
const jsonArg = args.find((a) => a === "--json" || a.startsWith("--json="));
const positional = args.filter((a) => a !== jsonArg);
const jsonMode = !!jsonArg || process.env.JSON_OUTPUT === "1";
const jsonOutFile = jsonArg && jsonArg.startsWith("--json=") ? jsonArg.slice(7) : null;

const url = positional[0] ?? "https://junglerent.it/";
const expected = process.env.EXPECTED_TOKEN ?? null;
const localCandidates = process.env.LOCAL_HTML
  ? [process.env.LOCAL_HTML]
  : ["dist/index.html", "index.html"];
const META_RE = /<meta\s+name=["']google-site-verification["']\s+content=["']([^"']+)["']/i;
const CTX_CHARS = 60;

// In JSON mode, suppress human logs so stdout is parseable.
const log = jsonMode ? () => {} : (...a) => console.log(...a);
const elog = jsonMode ? () => {} : (...a) => console.error(...a);

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

function inspectSource(html, label) {
  const match = html.match(META_RE);
  if (!match) {
    const headIdx = html.search(/<head[^>]*>/i);
    const snippet = (headIdx !== -1 ? html.slice(headIdx, headIdx + 500) : html.slice(0, 500))
      .replace(/\n/g, " ");
    elog(`❌ [${label}] No <meta name="google-site-verification"> found.`);
    elog(`   ${bold("First 500 chars of <head>:")}\n   ${dim(snippet)}\n`);
    return { token: null, tag: null, context: null, headSnippet: snippet };
  }
  const token = match[1];
  const matchIdx = match.index ?? 0;
  const before = html.slice(Math.max(0, matchIdx - CTX_CHARS), matchIdx);
  const after = html.slice(matchIdx + match[0].length, matchIdx + match[0].length + CTX_CHARS);
  log(`✓ [${label}] token: ${green(token)}`);
  log(`  ${bold("Context:")} ${dim("...")}${before}${green(match[0])}${after}${dim("...")}\n`);
  return {
    token,
    tag: match[0],
    context: { before, tag: match[0], after },
    headSnippet: null,
  };
}

// --- 1) Live HTML ---
log(`${bold("→ Live")} ${url}`);
const liveReport = {
  source: "live",
  url,
  httpStatus: null,
  httpStatusText: null,
  fetchError: null,
  token: null,
  context: null,
  headSnippet: null,
  status: "fail",
};
try {
  const res = await fetch(url, {
    headers: {
      "User-Agent": "JungleRent-GSC-Meta-Check/1.2",
      "Cache-Control": "no-cache",
    },
    redirect: "follow",
  });
  liveReport.httpStatus = res.status;
  liveReport.httpStatusText = res.statusText;
  log(`  HTTP ${res.status} ${res.statusText}`);
  if (!res.ok) {
    fail(`Live HTML returned HTTP ${res.status}`);
  } else {
    const html = await res.text();
    const info = inspectSource(html, "live");
    liveReport.token = info.token;
    liveReport.context = info.context;
    liveReport.headSnippet = info.headSnippet;
    if (!info.token) fail(`Meta tag missing in live HTML`);
    else liveReport.status = "ok";
  }
} catch (e) {
  liveReport.fetchError = e.message;
  fail(`Network error fetching live HTML: ${e.message}`);
  elog(`❌ ${e.message}\n`);
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

const localReport = {
  source: "local",
  path: localPath,
  candidates: localCandidates,
  readError: null,
  token: null,
  context: null,
  headSnippet: null,
  status: "fail",
};

log(`${bold("→ Local")} ${localPath ?? `(none of: ${localCandidates.join(", ")})`}`);
if (!localPath) {
  fail(`No local HTML file found (tried: ${localCandidates.join(", ")})`);
  localReport.readError = "not found";
  elog(`❌ No local build file found. Run a build first, or set LOCAL_HTML.\n`);
} else {
  try {
    const html = await readFile(localPath, "utf8");
    const info = inspectSource(html, localPath);
    localReport.token = info.token;
    localReport.context = info.context;
    localReport.headSnippet = info.headSnippet;
    if (!info.token) fail(`Meta tag missing in ${localPath}`);
    else localReport.status = "ok";
  } catch (e) {
    localReport.readError = e.message;
    fail(`Error reading ${localPath}: ${e.message}`);
    elog(`❌ ${e.message}\n`);
  }
}

// --- 3) Compare ---
log(bold("→ Comparison"));
const comparison = {
  liveVsLocal: null, // "match" | "mismatch" | "skipped"
  liveVsExpected: null,
  localVsExpected: null,
};

if (liveReport.token && localReport.token) {
  if (liveReport.token === localReport.token) {
    comparison.liveVsLocal = "match";
    log(`  ${green("✓")} live and local tokens match: ${green(liveReport.token)}`);
  } else {
    comparison.liveVsLocal = "mismatch";
    fail(`Live vs local token mismatch`);
    elog(`  ${red("✗")} live ≠ local`);
    elog(`     ${bold("Live: ")} ${green(liveReport.token)}`);
    elog(`     ${bold("Local:")} ${red(localReport.token)}`);
    elog(`     ${bold("Diff (red = local side):")}\n     ${tokenDiff(liveReport.token, localReport.token)}`);
    elog(`     ${dim("Hint: the build may not have been deployed yet, or two different verification properties are in use.")}`);
  }
} else {
  comparison.liveVsLocal = "skipped";
}

if (expected) {
  log();
  for (const r of [liveReport, localReport]) {
    if (!r.token) continue;
    const key = r.source === "live" ? "liveVsExpected" : "localVsExpected";
    if (r.token === expected) {
      comparison[key] = "match";
      log(`  ${green("✓")} ${r.source} matches EXPECTED_TOKEN`);
    } else {
      comparison[key] = "mismatch";
      fail(`${r.source} token does not match EXPECTED_TOKEN`);
      elog(`  ${red("✗")} ${r.source} ≠ expected`);
      elog(`     ${bold("Expected:")} ${green(expected)}`);
      elog(`     ${bold("Got:     ")} ${red(r.token)}`);
      elog(`     ${bold("Diff:")}\n     ${tokenDiff(expected, r.token)}`);
    }
  }
}

const overallStatus = errors.length === 0 ? "ok" : "fail";

const report = {
  generatedAt: new Date().toISOString(),
  status: overallStatus,
  expectedToken: expected,
  sources: {
    live: liveReport,
    local: localReport,
  },
  comparison,
  errors,
};

if (jsonMode) {
  const out = JSON.stringify(report, null, 2);
  if (jsonOutFile) {
    await writeFile(jsonOutFile, out + "\n", "utf8");
    // One status line on stderr so CI users still get a hint without polluting stdout
    process.stderr.write(`Report written to ${jsonOutFile} (status: ${overallStatus})\n`);
  } else {
    process.stdout.write(out + "\n");
  }
} else {
  console.log();
  if (overallStatus === "ok") {
    console.log(`✅ ${bold("All checks passed.")}`);
  } else {
    console.error(`❌ ${bold(`${errors.length} issue(s):`)}`);
    for (const e of errors) console.error(`   - ${yellow(e)}`);
  }
}

process.exit(overallStatus === "ok" ? 0 : 1);
