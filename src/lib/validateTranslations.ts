/**
 * Translation Validation Utilities
 * For use in development to check translation completeness
 */

import itTranslations from '@/i18n/locales/it.json';
import enTranslations from '@/i18n/locales/en.json';
import esTranslations from '@/i18n/locales/es.json';
import frTranslations from '@/i18n/locales/fr.json';
import deTranslations from '@/i18n/locales/de.json';
import zhTranslations from '@/i18n/locales/zh.json';
import svTranslations from '@/i18n/locales/sv.json';

type TranslationObject = Record<string, unknown>;

interface ValidationResult {
  language: string;
  missingKeys: string[];
  extraKeys: string[];
  totalKeys: number;
  completeness: number;
}

/**
 * Recursively extract all keys from an object with dot notation
 */
function extractKeys(obj: TranslationObject, prefix = ''): string[] {
  const keys: string[] = [];
  
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      keys.push(...extractKeys(value as TranslationObject, fullKey));
    } else {
      keys.push(fullKey);
    }
  }
  
  return keys;
}

/**
 * Group keys by their top-level section
 */
export function groupBySection(keys: string[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};
  
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
 * Validate a single language against the reference (IT)
 */
export function validateLanguage(
  language: string,
  translations: TranslationObject,
  referenceKeys: string[]
): ValidationResult {
  const targetKeys = extractKeys(translations);
  
  const missingKeys = referenceKeys.filter(key => !targetKeys.includes(key));
  const extraKeys = targetKeys.filter(key => !referenceKeys.includes(key));
  
  const completeness = referenceKeys.length > 0 
    ? Math.round(((referenceKeys.length - missingKeys.length) / referenceKeys.length) * 100)
    : 100;
  
  return {
    language,
    missingKeys,
    extraKeys,
    totalKeys: targetKeys.length,
    completeness,
  };
}

/**
 * Validate all translations against IT (reference)
 */
export function validateAllTranslations(): {
  reference: { language: string; totalKeys: number };
  results: ValidationResult[];
  summary: {
    totalMissing: number;
    totalExtra: number;
    allComplete: boolean;
  };
} {
  const referenceKeys = extractKeys(itTranslations as TranslationObject);
  
  const languages: { code: string; data: TranslationObject }[] = [
    { code: 'en', data: enTranslations as TranslationObject },
    { code: 'es', data: esTranslations as TranslationObject },
    { code: 'fr', data: frTranslations as TranslationObject },
    { code: 'de', data: deTranslations as TranslationObject },
    { code: 'zh', data: zhTranslations as TranslationObject },
    { code: 'sv', data: svTranslations as TranslationObject },
  ];
  
  const results = languages.map(({ code, data }) => 
    validateLanguage(code, data, referenceKeys)
  );
  
  const totalMissing = results.reduce((sum, r) => sum + r.missingKeys.length, 0);
  const totalExtra = results.reduce((sum, r) => sum + r.extraKeys.length, 0);
  
  return {
    reference: {
      language: 'it',
      totalKeys: referenceKeys.length,
    },
    results,
    summary: {
      totalMissing,
      totalExtra,
      allComplete: totalMissing === 0,
    },
  };
}

/**
 * Log validation results to console (for development)
 */
export function logValidationResults(): void {
  const { reference, results, summary } = validateAllTranslations();
  
  console.group('🌍 Translation Validation');
  console.log(`Reference (IT): ${reference.totalKeys} keys`);
  console.log('');
  
  for (const result of results) {
    const status = result.missingKeys.length === 0 ? '✅' : '⚠️';
    console.log(
      `${status} ${result.language.toUpperCase()}: ${result.completeness}% complete (${result.missingKeys.length} missing, ${result.extraKeys.length} extra)`
    );
    
    if (result.missingKeys.length > 0) {
      const grouped = groupBySection(result.missingKeys);
      console.group(`  Missing sections in ${result.language.toUpperCase()}:`);
      for (const [section, keys] of Object.entries(grouped)) {
        console.log(`  [${section}]: ${keys.length} keys`);
      }
      console.groupEnd();
    }
  }
  
  console.log('');
  console.log(`Summary: ${summary.totalMissing} total missing, ${summary.totalExtra} total extra`);
  console.groupEnd();
}

/**
 * Get missing keys for a specific language
 */
export function getMissingKeys(language: string): string[] {
  const referenceKeys = extractKeys(itTranslations as TranslationObject);
  
  const translationsMap: Record<string, TranslationObject> = {
    en: enTranslations as TranslationObject,
    es: esTranslations as TranslationObject,
    fr: frTranslations as TranslationObject,
    de: deTranslations as TranslationObject,
    zh: zhTranslations as TranslationObject,
    sv: svTranslations as TranslationObject,
  };
  
  const translations = translationsMap[language];
  if (!translations) {
    throw new Error(`Unknown language: ${language}`);
  }
  
  const targetKeys = extractKeys(translations);
  return referenceKeys.filter(key => !targetKeys.includes(key));
}

/**
 * Check if translations are complete (for CI/testing)
 */
export function areTranslationsComplete(): boolean {
  const { summary } = validateAllTranslations();
  return summary.allComplete;
}

// Export reference keys count for testing
export function getReferenceKeyCount(): number {
  return extractKeys(itTranslations as TranslationObject).length;
}
