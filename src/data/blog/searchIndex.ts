import { blogPosts } from './posts';

export interface SearchableItem {
  slug: string;
  type: 'article' | 'faq';
  category: string;
  keywords: string[];
  title: string;
  excerpt: string;
  url: string;
  faqQuestion?: string;
  faqAnswer?: string;
}

// Normalize text for searching
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove accents
    .replace(/[^\\w\\s]/g, ' ')
    .replace(/\\s+/g, ' ')
    .trim();
}

// Extract keywords from text
function extractKeywords(text: string): string[] {
  const stopWords = new Set([
    'il', 'lo', 'la', 'i', 'gli', 'le', 'un', 'uno', 'una', 'di', 'a', 'da', 'in', 'con', 'su', 'per', 'tra', 'fra',
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by', 'from', 'is', 'are', 'was', 'were',
    'che', 'e', 'o', 'come', 'cosa', 'dove', 'quando', 'perche', 'chi', 'quale', 'quanto',
    'this', 'that', 'these', 'those', 'what', 'which', 'who', 'whom', 'whose', 'where', 'when', 'why', 'how'
  ]);
  
  const words = normalizeText(text).split(' ');
  return words.filter(word => word.length > 2 && !stopWords.has(word));
}

// Build searchable index from blog posts
export function buildSearchIndex(): SearchableItem[] {
  const items: SearchableItem[] = [];
  
  for (const post of blogPosts) {
    const itTranslation = post.translations.it;
    const enTranslation = post.translations.en;
    
    // Add article itself
    const articleKeywords = [
      ...extractKeywords(itTranslation.title),
      ...extractKeywords(itTranslation.excerpt),
      ...extractKeywords(enTranslation.title),
      ...extractKeywords(enTranslation.excerpt),
      ...(itTranslation.seo?.keywords || []).map(k => normalizeText(k)),
      ...(enTranslation.seo?.keywords || []).map(k => normalizeText(k)),
      ...itTranslation.tags.map(t => normalizeText(t)),
      ...enTranslation.tags.map(t => normalizeText(t)),
    ];
    
    items.push({
      slug: post.slug,
      type: 'article',
      category: post.category,
      keywords: [...new Set(articleKeywords)],
      title: itTranslation.title,
      excerpt: itTranslation.excerpt,
      url: `/blog/${post.slug}`,
    });
    
    // Add FAQs as separate items
    const allFaqs = [
      ...(itTranslation.faqs || []),
      ...(enTranslation.faqs || []),
    ];
    
    for (const faq of allFaqs) {
      const faqKeywords = [
        ...extractKeywords(faq.question),
        ...extractKeywords(faq.answer),
        ...articleKeywords.slice(0, 10), // Include some article context
      ];
      
      items.push({
        slug: post.slug,
        type: 'faq',
        category: post.category,
        keywords: [...new Set(faqKeywords)],
        title: itTranslation.title,
        excerpt: faq.answer.slice(0, 200),
        url: `/blog/${post.slug}`,
        faqQuestion: faq.question,
        faqAnswer: faq.answer,
      });
    }
  }
  
  return items;
}

// Calculate match score between query and item
export function calculateMatchScore(query: string, item: SearchableItem): number {
  const normalizedQuery = normalizeText(query);
  const queryWords = normalizedQuery.split(' ').filter(w => w.length > 2);
  
  if (queryWords.length === 0) return 0;
  
  let score = 0;
  const maxScore = queryWords.length;
  
  // Check keyword matches
  for (const word of queryWords) {
    // Exact keyword match
    if (item.keywords.some(k => k.includes(word) || word.includes(k))) {
      score += 1;
    }
    
    // Title match (weighted higher)
    if (normalizeText(item.title).includes(word)) {
      score += 0.5;
    }
    
    // FAQ question match (weighted highest for FAQ items)
    if (item.faqQuestion && normalizeText(item.faqQuestion).includes(word)) {
      score += 1.5;
    }
  }
  
  // Bonus for FAQ type when query looks like a question
  const questionIndicators = ['?', 'come', 'cosa', 'dove', 'quando', 'perche', 'quanto', 'quale', 'chi',
    'how', 'what', 'where', 'when', 'why', 'which', 'who', 'is', 'are', 'can', 'do', 'does'];
  if (item.type === 'faq' && questionIndicators.some(q => normalizedQuery.includes(q))) {
    score += 0.5;
  }
  
  // Category-specific boosts based on query context
  const categoryKeywords: Record<string, string[]> = {
    students: ['studenti', 'universita', 'affitto', 'stanza', 'coinquilini', 'student', 'rent', 'room', 'polito', 'unito'],
    investors: ['investimento', 'rendimento', 'acquisto', 'immobiliare', 'investment', 'return', 'buy', 'property'],
    sellers: ['vendere', 'vendita', 'agenzia', 'commissione', 'sell', 'sale', 'agent'],
    turisti: ['turismo', 'visitare', 'ristorante', 'museo', 'tourism', 'visit', 'restaurant', 'museum'],
    societa: ['sostenibile', 'volontariato', 'comunita', 'sustainable', 'volunteer', 'community'],
  };
  
  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (item.category === category && keywords.some(k => normalizedQuery.includes(k))) {
      score += 0.3;
    }
  }
  
  return score / maxScore;
}

// Search function
export interface SearchResult {
  item: SearchableItem;
  score: number;
}

export function searchLocalContent(query: string, minScore: number = 0.3, maxResults: number = 5): SearchResult[] {
  const index = buildSearchIndex();
  
  const results: SearchResult[] = [];
  
  for (const item of index) {
    const score = calculateMatchScore(query, item);
    if (score >= minScore) {
      results.push({ item, score });
    }
  }
  
  // Sort by score descending
  results.sort((a, b) => b.score - a.score);
  
  // Deduplicate by slug (keep highest scoring)
  const seen = new Set<string>();
  const deduplicated: SearchResult[] = [];
  
  for (const result of results) {
    const key = `${result.item.slug}-${result.item.type}-${result.item.faqQuestion || ''}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(result);
    }
  }
  
  return deduplicated.slice(0, maxResults);
}

// Generate answer from local content
export function generateLocalAnswer(query: string, results: SearchResult[], language: string = 'it'): string {
  if (results.length === 0) return '';
  
  const topResult = results[0];
  
  // If it's a FAQ match, return the FAQ answer
  if (topResult.item.type === 'faq' && topResult.item.faqAnswer) {
    return topResult.item.faqAnswer;
  }
  
  // Otherwise, return the article excerpt
  return topResult.item.excerpt;
}
