#!/usr/bin/env node
/**
 * i18n translation validator (ESM).
 *
 * Compares IT (reference) against all other locales in both bundles:
 *   - src/i18n/locales/{lang}.json           (main)
 *   - src/i18n/locales/investor/{lang}.json  (investor; includes pt)
 *
 * Reports per (bundle, lang):
 *   - missing keys (present in IT, absent in lang)
 *   - extra keys   (present in lang, absent in IT)
 *   - empty values
 *   - values identical to IT (likely untranslated), with brand/url/number allow-list
 *
 * Exit code 1 if any mismatch is found.
 *
 * Usage: node scripts/validate-translations.mjs [--verbose] [--max=10]
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

const BUNDLES = [
  { name: 'main',     dir: 'src/i18n/locales',          langs: ['en', 'es', 'fr', 'de', 'sv', 'zh'] },
  { name: 'investor', dir: 'src/i18n/locales/investor', langs: ['en', 'es', 'fr', 'de', 'sv', 'zh', 'pt'] },
];
const REF = 'it';

const C = {
  reset: '\x1b[0m', red: '\x1b[31m', green: '\x1b[32m',
  yellow: '\x1b[33m', blue: '\x1b[34m', cyan: '\x1b[36m',
  gray: '\x1b[90m', bold: '\x1b[1m',
};

const argv = process.argv.slice(2);
const VERBOSE = argv.includes('--verbose');
const MAX = (() => {
  const m = argv.find((a) => a.startsWith('--max='));
  return m ? parseInt(m.split('=')[1], 10) || 10 : 10;
})();

// Allow-list: values that may legitimately match IT verbatim.
const BRAND_TOKENS = ['Jungle Rent', 'JungleRent', 'Lorenzo', 'WhatsApp', 'Torino', 'Italia', 'S.r.l.'];
const isLikelyUntranslated = (refVal, val) => {
  if (typeof refVal !== 'string' || typeof val !== 'string') return false;
  if (!refVal.trim() || !val.trim()) return false;
  if (refVal !== val) return false;
  // very short strings (≤3 chars), pure numbers, urls, emails, brand tokens → skip
  if (refVal.trim().length <= 3) return false;
  if (/^[\d\s.,€%+\-/]+$/.test(refVal)) return false;
  if (/^https?:\/\//.test(refVal)) return false;
  if (/^\S+@\S+\.\S+$/.test(refVal)) return false;
  if (BRAND_TOKENS.some((t) => refVal.trim() === t)) return false;
  return true;
};

function flatten(obj, prefix = '', out = {}) {
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (v !== null && typeof v === 'object' && !Array.isArray(v)) flatten(v, key, out);
    else out[key] = v;
  }
  return out;
}

function loadJSON(p) {
  try { return JSON.parse(fs.readFileSync(p, 'utf-8')); }
  catch (e) { console.error(`${C.red}Error loading ${p}: ${e.message}${C.reset}`); return null; }
}

function previewList(items, max = MAX) {
  if (items.length <= max) return items;
  return [...items.slice(0, max), `… (+${items.length - max} more)`];
}

let totalIssues = 0;

console.log(`${C.bold}${C.cyan}\n🌍 i18n translation audit — reference: ${REF.toUpperCase()}${C.reset}\n`);

for (const bundle of BUNDLES) {
  const refPath = path.join(ROOT, bundle.dir, `${REF}.json`);
  if (!fs.existsSync(refPath)) {
    console.log(`${C.yellow}⚠  Skip bundle "${bundle.name}" — reference ${refPath} not found${C.reset}\n`);
    continue;
  }
  const ref = flatten(loadJSON(refPath) ?? {});
  const refKeys = new Set(Object.keys(ref));

  console.log(`${C.bold}${C.blue}── Bundle: ${bundle.name} ${C.gray}(${bundle.dir})${C.reset}`);
  console.log(`${C.gray}   reference keys: ${refKeys.size}${C.reset}`);

  for (const lang of bundle.langs) {
    const p = path.join(ROOT, bundle.dir, `${lang}.json`);
    if (!fs.existsSync(p)) {
      console.log(`  ${C.red}✗ ${lang}: file missing (${p})${C.reset}`);
      totalIssues++;
      continue;
    }
    const flat = flatten(loadJSON(p) ?? {});
    const langKeys = new Set(Object.keys(flat));

    const missing = [...refKeys].filter((k) => !langKeys.has(k));
    const extra   = [...langKeys].filter((k) => !refKeys.has(k));
    const empty   = [...langKeys].filter((k) => {
      const v = flat[k];
      return typeof v === 'string' && v.trim() === '';
    });
    const untranslated = [...refKeys].filter((k) => isLikelyUntranslated(ref[k], flat[k]));

    const issues = missing.length + extra.length + empty.length + untranslated.length;
    totalIssues += issues;

    const tag = issues === 0
      ? `${C.green}✓${C.reset}`
      : `${C.red}✗${C.reset}`;

    console.log(
      `  ${tag} ${C.bold}${lang}${C.reset}  ` +
      `missing=${missing.length === 0 ? C.green + 0 + C.reset : C.red + missing.length + C.reset}  ` +
      `extra=${extra.length === 0 ? C.green + 0 + C.reset : C.yellow + extra.length + C.reset}  ` +
      `empty=${empty.length === 0 ? C.green + 0 + C.reset : C.yellow + empty.length + C.reset}  ` +
      `untranslated≈${untranslated.length === 0 ? C.green + 0 + C.reset : C.yellow + untranslated.length + C.reset}`
    );

    if (VERBOSE || issues > 0) {
      if (missing.length)      console.log(`     ${C.red}missing:${C.reset}      ${previewList(missing).join(', ')}`);
      if (extra.length)        console.log(`     ${C.yellow}extra:${C.reset}        ${previewList(extra).join(', ')}`);
      if (empty.length)        console.log(`     ${C.yellow}empty:${C.reset}        ${previewList(empty).join(', ')}`);
      if (untranslated.length) console.log(`     ${C.yellow}untranslated:${C.reset} ${previewList(untranslated).join(', ')}`);
    }
  }
  console.log('');
}

if (totalIssues === 0) {
  console.log(`${C.green}${C.bold}✓ All locales in sync${C.reset}\n`);
  process.exit(0);
} else {
  console.log(`${C.red}${C.bold}✗ Found ${totalIssues} issue(s). Fix or justify before shipping.${C.reset}\n`);
  process.exit(1);
}
