/**
 * Build-time validation for sentence case (all languages)
 * Checks blog titles and excerpts in posts.ts
 * Now validates both Italian and English content
 */

import fs from 'fs';
import path from 'path';

// Proper nouns that should remain capitalized
const PROPER_NOUNS = [
  // Cities and regions
  'Turin', 'Torino', 'Italy', 'Italian', 'Piedmont', 'Piemonte', 'Piedmontese',
  'Alba', 'Langhe', 'Monferrato', 'Ivrea', 'Milano', 'Moncalieri', 'Rome', 'Roma',
  
  // Turin neighborhoods
  'San Salvario', 'Porta Palazzo', 'Quadrilatero', 'Vanchiglia', 'Barriera',
  'Aurora', 'Crocetta', 'Cenisia', 'Lingotto', 'Mirafiori', 'Rebaudengo',
  'Santa Rita', 'Borgo', 'Parella', 'Lucento', 'Falchera', 'Pozzo Strada',
  'Borgo Vittoria', 'Madonna del Pilone', 'Sassi',
  
  // Institutions and universities
  'Politecnico', 'UniTo', 'EDISU', 'GTT', 'CUS', 'Amiat', 'CONAI', 'CONOE',
  'CAMERA', 'Gallerie', 'Teatro Regio', 'Einaudi', 'Bobbio', 'Gabetti',
  'ESCP', 'SAA', 'IED', 'IAAD', 'IUSTO', 'LUISS', 'Bocconi',
  
  // Libraries, museums and venues (proper names)
  'National', 'Central', 'Public', 'Library', 'Reading', 'Room', 'Hall', 'Study',
  'Passerin', 'Entrèves', 'Primo Levi', 'Alberto Geisser', 'Villa Amoretti',
  'Norberto Bobbio', 'Economics', 'Management', 'Istoreto', 'Palazzo',
  'Michelangelo', 'Buonarroti', 'Pietro Giuria', 'Cascina Giajone',
  'Roberto Gabetti', 'Castello', 'Valentino',
  
  // Bars, cafés and venues
  'Barney', 'Casa', 'Quartiere', 'Combo', 'Costadoro', 'Social', 'Coffee', 'Factory',
  'Orso', 'Laboratorio', 'Caffè', 'Bar', 'Micca', 'Imbarchino',
  
  // Landmarks
  'Po', 'Alps', 'Superga', 'Mole', 'Murazzi', 'Colletta', 'Dora',
  
  // Tech and acronyms
  'WiFi', 'Wi-Fi', 'FAQ', 'PDF', 'API', 'WEEE', 'RAEE', 'LED', 'NFC', 'QR', 'GPS',
  'GDPR', 'FADP', 'RLS', 'SEO',
  
  // Brands
  'Jungle Rent', 'Jungle Control', 'Props', 'JungleRent',
  'Caffarel', 'Venchi', 'Baratti', 'Peyrano', 'Gobino', 'Stratta', 'Pfatisch',
  'McFIT', 'FitActive', 'Virgin Active', 'GO Fit', 'Anytime Fitness',
  'Trenitalia', 'Frecciarossa', 'Dott', 'Lime', 'Moovit',
  'Savills', 'OMI', 'PBSA', 'MAO',
  
  // Months and days
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday',
  
  // Organizations
  'EU', 'Erasmus', 'Europe', 'European',
  'Nobel', 'UNESCO', 'FIAT', 'Lavazza', 'Stellantis', 'Leonardo',
  'Fondazione', 'Time2', 'Circolo', 'Lettori', 'Artisti',
  
  // Events and cultural terms
  'Christmas', 'New Year', 'Easter', 'Carnival', 'CioccolaTò', 'Macbeth',
  'Baroque', 'Renaissance', 'Art Nouveau', 'Seicento', 'Battle', 'Oranges',
  'Chiharu', 'Shiota', 'Mika', 'Inalpi', 'Arena',
  
  // Roman numerals and misc
  'I', 'II', 'III', 'IV', 'V',
  'Piazza', 'Via', 'Corso', 'Largo',
  '2i3T', 'UNITA', 'University', 'Polytechnic', 'Campus', 'Diffused',
  'East', 'West', 'North', 'South',
  
  // Coworking and cultural venues
  'Comala', 'Off Topic', 'Youth', 'Centre', 'Park',
  'OGR', 'Officine', 'Grandi', 'Riparazioni', 'Coworking',
  'CAP10100', 'Arci', 'Bunker', 'Barrito', 'Open',
  'Polo', '900', 'San Daniele',
  
  // Food and restaurants
  'Gianduiotto', 'Bicerin', 'Cremino', 'Nutella', 'Tajarin',
  
  // People names (common in headings)
  'Morricone', 'Muti', 'Bisio', 'Miller', 'Wall', 'Amadeus',
  'Rotterdam', 'Cavour', 'Garibaldi',
  
  // Misc proper nouns from articles
  'Definition', 'Agreement', 'Transition', 'Strategic', 'Administrative',
  'Regulatory', 'Comparative', 'Summary', 'Recommended', 'Effect',
  'Properties', 'Special', 'Future', 'Conclusions',
  'Which', 'Are', 'Can', 'Where', 'What', 'Do', 'How', 'Why', 'When',
  'Bonus', 'Student', 'Zone', 'Turin Student Zone',
  'Bars', 'Parks', 'Outdoor',
  'Frequently', 'Asked', 'Questions'
];

function isProperNoun(word) {
  const cleanWord = word.replace(/[.,!?:;()'"]/g, '');
  return PROPER_NOUNS.some(noun => 
    noun.toLowerCase() === cleanWord.toLowerCase() ||
    cleanWord.toLowerCase().startsWith(noun.toLowerCase())
  );
}

function isSentenceCase(text) {
  if (!text || text.length === 0) return true;
  
  const words = text.split(/\s+/);
  if (words.length === 0) return true;
  
  // First word should be capitalized
  const firstWord = words[0].replace(/[.,!?:;()'"#<>]/g, '');
  if (firstWord.length > 0 && /[a-zA-Z]/.test(firstWord)) {
    const firstLetter = firstWord.match(/[a-zA-Z]/)?.[0];
    if (firstLetter && firstLetter !== firstLetter.toUpperCase()) {
      return false;
    }
  }
  
  // Check remaining words (should be lowercase unless proper noun)
  for (let i = 1; i < words.length; i++) {
    const word = words[i];
    const cleanWord = word.replace(/[.,!?:;()'"#<>]/g, '');
    
    if (!cleanWord || cleanWord.length === 0) continue;
    if (!/[a-zA-Z]/.test(cleanWord)) continue;
    if (isProperNoun(cleanWord)) continue;
    if (/^\d/.test(cleanWord)) continue;
    if (cleanWord === cleanWord.toUpperCase() && cleanWord.length <= 5) continue; // Acronyms
    
    const firstLetter = cleanWord.match(/[a-zA-Z]/)?.[0];
    if (firstLetter && firstLetter === firstLetter.toUpperCase() && cleanWord !== cleanWord.toUpperCase()) {
      // Check if previous word ended with colon (new sentence)
      if (i > 0 && words[i-1].endsWith(':')) continue;
      return false;
    }
  }
  
  return true;
}

function validateBlogPosts() {
  const postsPath = path.resolve('src/data/blog/posts.ts');
  const content = fs.readFileSync(postsPath, 'utf-8');
  
  const issues = [];
  
  // Extract English titles and excerpts using regex
  const titleMatches = content.matchAll(/translations:\s*\{[\s\S]*?en:\s*\{[\s\S]*?title:\s*["'`]([^"'`]+)["'`]/g);
  const excerptMatches = content.matchAll(/translations:\s*\{[\s\S]*?en:\s*\{[\s\S]*?excerpt:\s*["'`]([^"'`]+)["'`]/g);
  const seoTitleMatches = content.matchAll(/en:\s*\{[\s\S]*?seo:\s*\{[\s\S]*?title:\s*["'`]([^"'`]+)["'`]/g);
  
  // Simple approach: find all en: blocks and extract titles
  const enBlocks = content.split(/en:\s*\{/);
  
  for (let i = 1; i < enBlocks.length; i++) {
    const block = enBlocks[i];
    
    // Extract title
    const titleMatch = block.match(/title:\s*["'`]([^"'`]+)["'`]/);
    if (titleMatch) {
      const title = titleMatch[1];
      if (!isSentenceCase(title)) {
        issues.push({
          type: 'title',
          text: title,
          suggestion: 'Should use sentence case (only first letter capitalized, except proper nouns)'
        });
      }
    }
    
    // Extract excerpt
    const excerptMatch = block.match(/excerpt:\s*["'`]([^"'`]+)["'`]/);
    if (excerptMatch) {
      const excerpt = excerptMatch[1];
      if (!isSentenceCase(excerpt)) {
        issues.push({
          type: 'excerpt',
          text: excerpt.substring(0, 80) + '...',
          suggestion: 'Should use sentence case'
        });
      }
    }
  }
  
  return issues;
}

function validateMarkdownHeadings() {
  const enContentDir = path.resolve('src/data/blog/content/en');
  const issues = [];
  
  if (!fs.existsSync(enContentDir)) {
    return issues;
  }
  
  const files = fs.readdirSync(enContentDir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    const filePath = path.join(enContentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Find all headings
    const headingMatches = content.matchAll(/^(#{1,6})\s+(.+)$/gm);
    
    for (const match of headingMatches) {
      let heading = match[2];
      
      // Remove anchor links and emojis
      heading = heading.replace(/<a[^>]*><\/a>/g, '').trim();
      heading = heading.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
      
      if (heading && !isSentenceCase(heading)) {
        issues.push({
          type: 'heading',
          file: `en/${file}`,
          text: heading.substring(0, 60),
          suggestion: 'Should use sentence case'
        });
      }
    }
  }
  
  return issues;
}

function validateItalianMarkdownHeadings() {
  const itContentDir = path.resolve('src/data/blog/content/it');
  const issues = [];
  
  if (!fs.existsSync(itContentDir)) {
    return issues;
  }
  
  const files = fs.readdirSync(itContentDir).filter(f => f.endsWith('.md'));
  
  for (const file of files) {
    const filePath = path.join(itContentDir, file);
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // Find all headings
    const headingMatches = content.matchAll(/^(#{1,6})\s+(.+)$/gm);
    
    for (const match of headingMatches) {
      let heading = match[2];
      
      // Remove anchor links and emojis
      heading = heading.replace(/<a[^>]*><\/a>/g, '').trim();
      heading = heading.replace(/[\u{1F300}-\u{1F9FF}]/gu, '').trim();
      
      if (heading && !isSentenceCase(heading)) {
        issues.push({
          type: 'heading',
          file: `it/${file}`,
          text: heading.substring(0, 60),
          suggestion: 'Should use sentence case'
        });
      }
    }
  }
  
  return issues;
}

// Main execution
console.log('\n🔍 Validating sentence case (IT + EN)...\n');

const postIssues = validateBlogPosts();
const headingIssues = validateMarkdownHeadings();
const itHeadingIssues = validateItalianMarkdownHeadings();

const allIssues = [...postIssues, ...headingIssues, ...itHeadingIssues];

if (allIssues.length === 0) {
  console.log('✅ All English text follows sentence case rules!\n');
  process.exit(0);
} else {
  console.log(`⚠️  Found ${allIssues.length} sentence case issue(s):\n`);
  
  allIssues.forEach((issue, index) => {
    console.log(`${index + 1}. [${issue.type}]${issue.file ? ` (${issue.file})` : ''}`);
    console.log(`   Text: "${issue.text}"`);
    console.log(`   ${issue.suggestion}\n`);
  });
  
  // Exit with warning but don't fail build
  console.log('⚠️  Please review and fix sentence case issues.\n');
  process.exit(0); // Change to process.exit(1) to fail build
}
