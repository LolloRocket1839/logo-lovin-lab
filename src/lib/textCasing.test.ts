/**
 * Text Casing Validation Tests
 * 
 * Run these tests to verify text casing across the application.
 * Import and call runTextCasingTests() in development.
 */

import {
  toTitleCase,
  toSentenceCase,
  isTitleCase,
  isSentenceCase,
  validateTextCasing,
  isProperNoun,
} from './textCasing';

interface TestCase {
  input: string;
  expected: string;
  description: string;
}

interface TestResult {
  passed: boolean;
  description: string;
  input: string;
  expected: string;
  actual: string;
}

/**
 * Run all text casing tests and log results
 */
export function runTextCasingTests(): { passed: number; failed: number; results: TestResult[] } {
  const results: TestResult[] = [];
  
  // Title Case tests (Italian)
  const titleCaseTests: TestCase[] = [
    { input: 'risorse correlate', expected: 'Risorse Correlate', description: 'IT: Basic title case' },
    { input: 'guida completa', expected: 'Guida Completa', description: 'IT: Two words' },
    { input: 'dove mangiare a torino', expected: 'Dove Mangiare a Torino', description: 'IT: With preposition and proper noun' },
    { input: 'aule studio edisu', expected: 'Aule Studio EDISU', description: 'IT: With acronym' },
    { input: 'guida san salvario', expected: 'Guida San Salvario', description: 'IT: With proper noun' },
  ];
  
  // Sentence case tests (English)
  const sentenceCaseTests: TestCase[] = [
    { input: 'Related Resources', expected: 'Related resources', description: 'EN: Basic sentence case' },
    { input: 'Complete Guide', expected: 'Complete guide', description: 'EN: Two words' },
    { input: 'Study Spaces Turin', expected: 'Study spaces Turin', description: 'EN: With proper noun' },
    { input: 'EDISU Study Rooms', expected: 'EDISU study rooms', description: 'EN: With acronym' },
    { input: 'San Salvario Guide', expected: 'San Salvario guide', description: 'EN: With proper noun at start' },
  ];
  
  // Run Title Case tests
  console.group('🇮🇹 Title Case Tests (Italian)');
  for (const test of titleCaseTests) {
    const actual = toTitleCase(test.input);
    const passed = actual === test.expected;
    results.push({ passed, description: test.description, input: test.input, expected: test.expected, actual });
    console.log(
      passed ? '✅' : '❌',
      test.description,
      passed ? '' : `\n   Expected: "${test.expected}"\n   Actual: "${actual}"`
    );
  }
  console.groupEnd();
  
  // Run Sentence Case tests
  console.group('🇬🇧 Sentence Case Tests (English)');
  for (const test of sentenceCaseTests) {
    const actual = toSentenceCase(test.input);
    const passed = actual === test.expected;
    results.push({ passed, description: test.description, input: test.input, expected: test.expected, actual });
    console.log(
      passed ? '✅' : '❌',
      test.description,
      passed ? '' : `\n   Expected: "${test.expected}"\n   Actual: "${actual}"`
    );
  }
  console.groupEnd();
  
  // Validation tests
  console.group('🔍 Validation Tests');
  
  const validationTests = [
    { text: 'Risorse Correlate', lang: 'it' as const, shouldPass: true },
    { text: 'risorse correlate', lang: 'it' as const, shouldPass: false },
    { text: 'Related resources', lang: 'en' as const, shouldPass: true },
    { text: 'Related Resources', lang: 'en' as const, shouldPass: false },
    { text: 'Study spaces Turin', lang: 'en' as const, shouldPass: true },
    { text: 'EDISU rooms', lang: 'en' as const, shouldPass: true },
  ];
  
  for (const test of validationTests) {
    const result = validateTextCasing(test.text, test.lang);
    const passed = result.isValid === test.shouldPass;
    results.push({
      passed,
      description: `${test.lang.toUpperCase()}: "${test.text}" should ${test.shouldPass ? 'pass' : 'fail'}`,
      input: test.text,
      expected: test.shouldPass ? 'valid' : 'invalid',
      actual: result.isValid ? 'valid' : 'invalid'
    });
    console.log(
      passed ? '✅' : '❌',
      `[${test.lang}] "${test.text}" - ${test.shouldPass ? 'should pass' : 'should fail'}`,
      passed ? '' : `(got ${result.isValid ? 'valid' : 'invalid'})`
    );
  }
  console.groupEnd();
  
  // Proper noun tests
  console.group('📍 Proper Noun Tests');
  const properNounTests = ['Turin', 'San Salvario', 'EDISU', 'GTT', 'Politecnico', 'random'];
  for (const word of properNounTests) {
    const isPn = isProperNoun(word);
    const expected = word !== 'random';
    const passed = isPn === expected;
    console.log(passed ? '✅' : '❌', `"${word}" is ${isPn ? '' : 'not '}a proper noun`);
  }
  console.groupEnd();
  
  // Summary
  const passed = results.filter(r => r.passed).length;
  const failed = results.filter(r => !r.passed).length;
  
  console.log('\n📊 Summary:', `${passed} passed, ${failed} failed`);
  
  return { passed, failed, results };
}

/**
 * Quick validation for use in components
 */
export function quickValidate(content: { it: string; en: string }, context: string): void {
  if (!import.meta.env.DEV) return;
  
  const itResult = validateTextCasing(content.it, 'it');
  const enResult = validateTextCasing(content.en, 'en');
  
  if (!itResult.isValid || !enResult.isValid) {
    console.group(`⚠️ Text casing issues in: ${context}`);
    if (!itResult.isValid) {
      console.warn(`IT: "${content.it}" → "${itResult.expected}"`);
    }
    if (!enResult.isValid) {
      console.warn(`EN: "${content.en}" → "${enResult.expected}"`);
    }
    console.groupEnd();
  }
}
