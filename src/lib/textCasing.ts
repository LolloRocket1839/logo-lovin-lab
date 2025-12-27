/**
 * Text Casing Utilities
 * 
 * Enforces text casing conventions:
 * - Italian (IT): Title Case
 * - English (EN): sentence case
 * 
 * See: public/resources/style-guide-text-casing.md
 */

// Proper nouns that should always be capitalized
const PROPER_NOUNS = [
  'Turin',
  'Torino',
  'San Salvario',
  'Porta Palazzo',
  'Politecnico',
  'UniTo',
  'EDISU',
  'GTT',
  'WiFi',
  'Wi-Fi',
  'Jungle Rent',
  'Valentino',
  'Vanchiglia',
  'Crocetta',
  'Cenisia',
  'Aurora',
  'Lingotto',
  'Mirafiori',
  'Italia',
  'Italy',
  'Piemonte',
  'Piedmont',
];

// Italian articles and prepositions that stay lowercase (unless first word)
const IT_LOWERCASE_WORDS = ['di', 'del', 'della', 'dei', 'delle', 'a', 'al', 'alla', 'ai', 'alle', 'da', 'dal', 'dalla', 'dai', 'dalle', 'in', 'nel', 'nella', 'nei', 'nelle', 'su', 'sul', 'sulla', 'sui', 'sulle', 'con', 'per', 'tra', 'fra', 'e', 'o', 'il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una'];

/**
 * Check if a word is a proper noun that should always be capitalized
 */
export function isProperNoun(word: string): boolean {
  const cleanWord = word.replace(/[^a-zA-Z\s-]/g, '');
  return PROPER_NOUNS.some(noun => 
    noun.toLowerCase() === cleanWord.toLowerCase() ||
    cleanWord.toLowerCase().includes(noun.toLowerCase())
  );
}

/**
 * Convert text to Title Case (for Italian)
 * Capitalizes first letter of each significant word
 */
export function toTitleCase(text: string): string {
  if (!text) return text;
  
  return text.split(' ').map((word, index) => {
    // Always capitalize first word
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    // Keep proper nouns capitalized
    if (isProperNoun(word)) {
      // Find the proper noun and use its correct casing
      const properNoun = PROPER_NOUNS.find(n => 
        n.toLowerCase() === word.toLowerCase()
      );
      return properNoun || word.charAt(0).toUpperCase() + word.slice(1);
    }
    
    // Keep Italian articles/prepositions lowercase
    if (IT_LOWERCASE_WORDS.includes(word.toLowerCase())) {
      return word.toLowerCase();
    }
    
    return word.charAt(0).toUpperCase() + word.slice(1);
  }).join(' ');
}

/**
 * Convert text to sentence case (for English)
 * Only capitalizes first letter and proper nouns
 */
export function toSentenceCase(text: string): string {
  if (!text) return text;
  
  return text.split(' ').map((word, index) => {
    // Always capitalize first word
    if (index === 0) {
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }
    
    // Keep proper nouns capitalized
    if (isProperNoun(word)) {
      const properNoun = PROPER_NOUNS.find(n => 
        n.toLowerCase() === word.toLowerCase()
      );
      return properNoun || word;
    }
    
    // Everything else lowercase
    return word.toLowerCase();
  }).join(' ');
}

/**
 * Check if text follows Title Case convention
 */
export function isTitleCase(text: string): boolean {
  if (!text) return true;
  
  const words = text.split(' ');
  return words.every((word, index) => {
    // First word must be capitalized
    if (index === 0) {
      return word.charAt(0) === word.charAt(0).toUpperCase();
    }
    
    // Proper nouns must be capitalized
    if (isProperNoun(word)) {
      return word.charAt(0) === word.charAt(0).toUpperCase();
    }
    
    // Italian articles/prepositions should be lowercase
    if (IT_LOWERCASE_WORDS.includes(word.toLowerCase())) {
      return true; // Allow either case for flexibility
    }
    
    // Other words should be capitalized
    return word.charAt(0) === word.charAt(0).toUpperCase();
  });
}

/**
 * Check if text follows sentence case convention
 */
export function isSentenceCase(text: string): boolean {
  if (!text) return true;
  
  const words = text.split(' ');
  return words.every((word, index) => {
    // First word must be capitalized
    if (index === 0) {
      return word.charAt(0) === word.charAt(0).toUpperCase();
    }
    
    // Proper nouns should be capitalized
    if (isProperNoun(word)) {
      return true; // Allow proper noun capitalization
    }
    
    // Check if word is incorrectly capitalized (Title Case style)
    const isCapitalized = word.charAt(0) === word.charAt(0).toUpperCase() && 
                         word.charAt(0) !== word.charAt(0).toLowerCase();
    
    // If capitalized and not a proper noun, it's wrong
    return !isCapitalized;
  });
}

export interface CasingValidationResult {
  isValid: boolean;
  text: string;
  language: 'it' | 'en';
  expected: string;
  issues: string[];
}

/**
 * Validate text casing based on language
 */
export function validateTextCasing(
  text: string, 
  language: 'it' | 'en'
): CasingValidationResult {
  const issues: string[] = [];
  let isValid = true;
  let expected = text;
  
  if (language === 'it') {
    isValid = isTitleCase(text);
    expected = toTitleCase(text);
    if (!isValid) {
      issues.push(`Italian text should use Title Case. Expected: \"${expected}\"`);
    }
  } else {
    isValid = isSentenceCase(text);
    expected = toSentenceCase(text);
    if (!isValid) {
      issues.push(`English text should use sentence case. Expected: \"${expected}\"`);
    }
  }
  
  return { isValid, text, language, expected, issues };
}

/**
 * Validate a bilingual content object
 * Returns all validation issues found
 */
export function validateBilingualContent(
  content: { it: Record<string, string>; en: Record<string, string> },
  keysToCheck?: string[]
): CasingValidationResult[] {
  const results: CasingValidationResult[] = [];
  
  const checkKeys = keysToCheck || Object.keys(content.it);
  
  for (const key of checkKeys) {
    if (content.it[key]) {
      const itResult = validateTextCasing(content.it[key], 'it');
      if (!itResult.isValid) {
        results.push({ ...itResult, text: `[it.${key}] ${itResult.text}` });
      }
    }
    
    if (content.en[key]) {
      const enResult = validateTextCasing(content.en[key], 'en');
      if (!enResult.isValid) {
        results.push({ ...enResult, text: `[en.${key}] ${enResult.text}` });
      }
    }
  }
  
  return results;
}

/**
 * Development-only warning for text casing issues
 * Call this in components during development to catch issues early
 */
export function warnIfInvalidCasing(
  text: string,
  language: 'it' | 'en',
  context?: string
): void {
  if (import.meta.env.DEV) {
    const result = validateTextCasing(text, language);
    if (!result.isValid) {
      console.warn(
        `[TextCasing] ${context ? `(${context}) ` : ''}${result.issues[0]}\n` +
        `  Current: \"${text}\"\n` +
        `  Expected: \"${result.expected}\"`
      );
    }
  }
}

/**
 * Batch validate multiple texts with context
 */
export function validateTexts(
  texts: Array<{ text: string; language: 'it' | 'en'; context: string }>
): { valid: boolean; issues: string[] } {
  const issues: string[] = [];
  
  for (const { text, language, context } of texts) {
    const result = validateTextCasing(text, language);
    if (!result.isValid) {
      issues.push(`[${context}] ${result.issues[0]}`);
    }
  }
  
  return { valid: issues.length === 0, issues };
}
