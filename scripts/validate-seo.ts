/**
 * Lightweight SEO validator.
 * Checks:
 *  1. Citation snippet identical across llms.txt, llms-full.txt, agent-card.json
 *  2. Andrea Niccolaini never appears as founder/co-founder/shareholder/socio/partner
 *     anywhere in public/ or index.html (compliance memory)
 *  3. No "trimestral" / "quarterly" wording near payout/report copy (memory: bimestrale)
 *  4. JSON-LD blocks in index.html are syntactically valid JSON
 *  5. Every static route in scripts/generate-sitemap.ts is reachable in public/sitemap.xml
 *
 * Exit code != 0 if any check fails. Run with: `bunx tsx scripts/validate-seo.ts`.
 */

import { readFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const failures: string[] = [];
const warnings: string[] = [];

function read(p: string): string {
  return readFileSync(resolve(ROOT, p), "utf8");
}

function exists(p: string): boolean {
  return existsSync(resolve(ROOT, p));
}

// 1. Citation snippet alignment
const CITATION_KEY = "Sole founder Lorenzo Oni-Joseph";
const sources = [
  "public/llms.txt",
  "public/llms-full.txt",
  "public/.well-known/agent-card.json",
];
for (const src of sources) {
  if (!exists(src)) {
    warnings.push(`[citation] ${src} missing`);
    continue;
  }
  const content = read(src);
  if (!content.includes(CITATION_KEY)) {
    failures.push(`[citation] ${src} missing canonical attribution ("${CITATION_KEY}")`);
  }
}

// 2. Andrea must never be described as AFFIRMATIVE founder/partner/shareholder.
// Skip lines where the assertion is negated ("not", "non-", "never", "NOT", "non ", "mai")
const ANDREA_BAD = /Andrea\s+Niccolaini[^.\n]{0,200}\b(co-?founder|founder|partner|socio|quotista|shareholder|owner)\b/gi;
const NEGATION = /\b(not|non-?|never|mai|no(?:n)?\s)\b/i;
for (const f of SCAN_FILES) {
  if (!exists(f)) continue;
  const content = read(f);
  let mm: RegExpExecArray | null;
  while ((mm = ANDREA_BAD.exec(content))) {
    if (!NEGATION.test(mm[0])) {
      failures.push(`[compliance] ${f}: Andrea described as founder/partner/shareholder → "${mm[0].slice(0, 120)}..."`);
    }
  }
}

// 3. No "trimestrale" / "quarterly" wording near payout/report copy
const PAYOUT_BAD = /(report|payout|distribuzion|cedola)[^\n]{0,80}(trimestral|quarterly)|(trimestral|quarterly)[^\n]{0,80}(report|payout|distribuzion|cedola)/i;
for (const f of SCAN_FILES) {
  if (!exists(f)) continue;
  const content = read(f);
  const m = content.match(PAYOUT_BAD);
  if (m) {
    failures.push(`[compliance] ${f}: quarterly/trimestrale wording near payout copy (memory: bimestrale) → "${m[0].slice(0, 120)}..."`);
  }
}

// 3. No "trimestrale" / "quarterly" wording near payout/report copy
const PAYOUT_BAD = /(report|payout|distribuzion|cedola)[^\n]{0,80}(trimestral|quarterly)|(trimestral|quarterly)[^\n]{0,80}(report|payout|distribuzion|cedola)/i;
for (const f of SCAN_FILES) {
  if (!exists(f)) continue;
  const content = read(f);
  const m = content.match(PAYOUT_BAD);
  if (m) {
    failures.push(`[compliance] ${f}: quarterly/trimestrale wording near payout copy (memory: bimestrale) → "${m[0].slice(0, 120)}..."`);
  }
}

// 4. JSON-LD validity in index.html
const indexHtml = read("index.html");
const jsonLdRe = /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g;
let jsonLdCount = 0;
let m: RegExpExecArray | null;
while ((m = jsonLdRe.exec(indexHtml))) {
  jsonLdCount++;
  try {
    JSON.parse(m[1]);
  } catch (err) {
    failures.push(`[json-ld] index.html block #${jsonLdCount} invalid: ${(err as Error).message}`);
  }
}

// 5. Sitemap coverage of static routes
if (exists("public/sitemap.xml")) {
  const sitemap = read("public/sitemap.xml");
  const generator = read("scripts/generate-sitemap.ts");
  // Pull `it:` paths from STATIC_ROUTES literal
  const pathRe = /\{\s*it:\s*"([^"]+)"/g;
  let pm: RegExpExecArray | null;
  while ((pm = pathRe.exec(generator))) {
    const path = pm[1];
    if (!sitemap.includes(`<loc>https://junglerent.it${path}</loc>`)) {
      warnings.push(`[sitemap] generator declares ${path} but it's missing from public/sitemap.xml (regenerate?)`);
    }
  }
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
console.log(`SEO validator — ${jsonLdCount} JSON-LD blocks checked`);
for (const w of warnings) console.log("  ⚠️  " + w);
for (const f of failures) console.log("  ❌ " + f);

if (failures.length) {
  console.log(`\nFAIL: ${failures.length} issue(s)`);
  process.exit(1);
} else {
  console.log(`\nOK${warnings.length ? ` (${warnings.length} warning${warnings.length > 1 ? "s" : ""})` : ""}`);
}
