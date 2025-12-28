#!/usr/bin/env node

/**
 * Translation Validation Script
 * Compares translation keys between IT (reference) and other language files
 * Reports missing keys in either direction
 * 
 * Usage: node scripts/validate-translations.js
 * 
 * To add as npm script, add to package.json:
 * "scripts": { "validate:translations": "node scripts/validate-translations.js" }
 */

const fs = require('fs');
const path = require('path');

// Configuration
const REFERENCE_LANG = 'it'; // Italian is the reference
const COMPARE_LANGS = ['en', 'es', 'fr', 'de', 'zh', 'sv'];

const COLORS = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  bold: '\x1b[1m',
};

/**
 * Recursively extract all keys from an object with dot notation
 */
function extractKeys(obj, prefix = '') {
  const keys = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...extractKeys(value, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

/**
 * Load a translation file
 */
function loadTranslation(lang) {
  const filePath = path.resolve(__dirname, `../src/i18n/locales/${lang}.json`);
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`${COLORS.red}Error loading ${lang}.json: ${error.message}${COLORS.reset}`);
    return null;
  }
}

/**
 * Compare two sets of keys
 */
function compareKeys(referenceKeys, compareKeys, referenceLang, compareLang) {
  const missingInCompare = referenceKeys.filter(key => !compareKeys.includes(key));
  const extraInCompare = compareKeys.filter(key => !referenceKeys.includes(key));
  
  return {
    missingInCompare,
    extraInCompare,
    referenceLang,
    compareLang,
  };
}

/**
 * Group keys by their top-level section
 */
function groupBySection(keys) {
  const grouped = {};
  
  for (const key of keys) {
    const section = key.split('.')[0];
    if (!grouped[section]) {
      grouped[section] = [];
    }
    grouped[section].push(key);
  }
  
  return grouped;
}

/**
 * Print comparison results
 */
function printResults(results, verbose = false) {
  const { missingInCompare, extraInCompare, referenceLang, compareLang } = results;
  
  console.log(`\n${COLORS.bold}${COLORS.cyan}═══════════════════════════════════════════════════════════${COLORS.reset}`);
  console.log(`${COLORS.bold}  Comparing ${referenceLang.toUpperCase()} (reference) → ${compareLang.toUpperCase()}${COLORS.reset}`);
  console.log(`${COLORS.cyan}═══════════════════════════════════════════════════════════${COLORS.reset}\n`);
  
  // Missing keys (in reference but not in compare)
  if (missingInCompare.length > 0) {
    console.log(`${COLORS.red}${COLORS.bold}❌ Missing in ${compareLang.toUpperCase()}: ${missingInCompare.length} keys${COLORS.reset}\n`);
    
    const grouped = groupBySection(missingInCompare);
    for (const [section, keys] of Object.entries(grouped)) {
      console.log(`  ${COLORS.yellow}[${section}]${COLORS.reset} (${keys.length} keys)`);
      if (verbose) {
        keys.forEach(key => console.log(`    ${COLORS.red}• ${key}${COLORS.reset}`));
      }
    }
    console.log('');
  } else {
    console.log(`${COLORS.green}✓ No missing keys in ${compareLang.toUpperCase()}${COLORS.reset}\n`);
  }
  
  // Extra keys (in compare but not in reference)
  if (extraInCompare.length > 0) {
    console.log(`${COLORS.yellow}${COLORS.bold}⚠ Extra in ${compareLang.toUpperCase()} (not in ${referenceLang.toUpperCase()}): ${extraInCompare.length} keys${COLORS.reset}\n`);
    
    const grouped = groupBySection(extraInCompare);
    for (const [section, keys] of Object.entries(grouped)) {
      console.log(`  ${COLORS.blue}[${section}]${COLORS.reset} (${keys.length} keys)`);
      if (verbose) {
        keys.forEach(key => console.log(`    ${COLORS.yellow}• ${key}${COLORS.reset}`));
      }
    }
    console.log('');
  }
  
  return {
    missing: missingInCompare.length,
    extra: extraInCompare.length,
  };
}

/**
 * Main validation function
 */
function validateTranslations() {
  console.log(`\n${COLORS.bold}${COLORS.green}🌍 Translation Validation Tool${COLORS.reset}`);
  console.log(`${COLORS.cyan}Reference language: ${REFERENCE_LANG.toUpperCase()}${COLORS.reset}\n`);
  
  // Load reference translation
  const referenceData = loadTranslation(REFERENCE_LANG);
  if (!referenceData) {
    process.exit(1);
  }
  
  const referenceKeys = extractKeys(referenceData);
  console.log(`${COLORS.green}✓ Loaded ${REFERENCE_LANG.toUpperCase()}: ${referenceKeys.length} keys${COLORS.reset}`);
  
  // Check verbose flag
  const verbose = process.argv.includes('--verbose') || process.argv.includes('-v');
  
  // Summary stats
  const summary = {
    totalMissing: 0,
    totalExtra: 0,
    languages: {},
  };
  
  // Compare with each language
  for (const lang of COMPARE_LANGS) {
    const compareData = loadTranslation(lang);
    if (!compareData) {
      summary.languages[lang] = { error: true };
      continue;
    }
    
    const compareKeys = extractKeys(compareData);
    console.log(`${COLORS.green}✓ Loaded ${lang.toUpperCase()}: ${compareKeys.length} keys${COLORS.reset}`);
    
    const results = compareKeys(referenceKeys, compareKeys, REFERENCE_LANG, lang);
    const stats = printResults(results, verbose);
    
    summary.totalMissing += stats.missing;
    summary.totalExtra += stats.extra;
    summary.languages[lang] = stats;
  }
  
  // Print summary
  console.log(`\n${COLORS.bold}${COLORS.cyan}═══════════════════════════════════════════════════════════${COLORS.reset}`);
  console.log(`${COLORS.bold}  SUMMARY${COLORS.reset}`);
  console.log(`${COLORS.cyan}═══════════════════════════════════════════════════════════${COLORS.reset}\n`);
  
  console.log(`  Reference (${REFERENCE_LANG.toUpperCase()}): ${referenceKeys.length} keys\n`);
  
  for (const [lang, stats] of Object.entries(summary.languages)) {
    if (stats.error) {
      console.log(`  ${COLORS.red}${lang.toUpperCase()}: Error loading file${COLORS.reset}`);
    } else if (stats.missing === 0 && stats.extra === 0) {
      console.log(`  ${COLORS.green}${lang.toUpperCase()}: ✓ Complete${COLORS.reset}`);
    } else {
      const missingStr = stats.missing > 0 ? `${COLORS.red}${stats.missing} missing${COLORS.reset}` : '';
      const extraStr = stats.extra > 0 ? `${COLORS.yellow}${stats.extra} extra${COLORS.reset}` : '';
      const separator = missingStr && extraStr ? ', ' : '';
      console.log(`  ${lang.toUpperCase()}: ${missingStr}${separator}${extraStr}`);
    }
  }
  
  console.log(`\n  ${COLORS.bold}Total issues: ${summary.totalMissing} missing, ${summary.totalExtra} extra${COLORS.reset}\n`);
  
  if (summary.totalMissing > 0) {
    console.log(`${COLORS.yellow}💡 Tip: Run with --verbose or -v to see all missing keys${COLORS.reset}\n`);
  }
  
  // Exit with error code if there are missing keys
  if (summary.totalMissing > 0) {
    process.exit(1);
  }
}

// Run validation
validateTranslations();
