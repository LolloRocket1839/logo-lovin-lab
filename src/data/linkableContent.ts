// Centralized registry of all linkable content for auto-linking
import { blogPosts } from '@/data/blog/posts';

export interface LinkableContent {
  url: string;
  titleIt: string;
  titleEn: string;
  type: 'blog' | 'tool' | 'page';
  triggerKeywords: string[];
  priority: number; // Higher = preferred when multiple matches
}

// Configuration for auto-linking behavior
export const autoLinkConfig = {
  maxLinksPerArticle: 6,
  minKeywordLength: 4,
  preferTools: true,
  enableInlineLinks: true,
  enableCalloutBoxes: true,
  excludePatterns: [
    /^#{1,6}\s/,  // Skip headings
    /\[.*?\]\(.*?\)/g,  // Skip existing links
    /```[\s\S]*?```/g,  // Skip code blocks
  ]
};

// Static tools and pages
const staticLinkableContent: LinkableContent[] = [
  // Student Tools
  {
    url: '/studenti/strumenti/budget',
    titleIt: 'Calcolatore budget studenti',
    titleEn: 'Student budget calculator',
    type: 'tool',
    triggerKeywords: ['budget', 'spese mensili', 'costo vita', 'monthly expenses', 'cost of living', 'quanto costa vivere'],
    priority: 10
  },
  {
    url: '/studenti/strumenti/voti',
    titleIt: 'Calcolatore media voti',
    titleEn: 'Grade calculator',
    type: 'tool',
    triggerKeywords: ['media voti', 'calcolo media', 'grade average', 'gpa', 'voto laurea'],
    priority: 10
  },
  {
    url: '/studenti/strumenti/sessione',
    titleIt: 'Pianificatore sessione esami',
    titleEn: 'Exam session planner',
    type: 'tool',
    triggerKeywords: ['sessione esami', 'pianificare esami', 'exam session', 'study plan'],
    priority: 10
  },
  {
    url: '/strumenti/aule-studio-torino',
    titleIt: 'Aule studio Torino',
    titleEn: 'Study spaces Turin',
    type: 'tool',
    triggerKeywords: ['aule studio', 'dove studiare', 'study spaces', 'biblioteca', 'library'],
    priority: 10
  },
  {
    url: '/strumenti/palestre-torino',
    titleIt: 'Palestre Torino studenti',
    titleEn: 'Gyms Turin students',
    type: 'tool',
    triggerKeywords: ['palestra', 'palestre', 'gym', 'fitness', 'sport'],
    priority: 8
  },
  {
    url: '/strumenti/dove-mangiare-torino',
    titleIt: 'Dove mangiare economico Torino',
    titleEn: 'Cheap eats Turin',
    type: 'tool',
    triggerKeywords: ['dove mangiare', 'ristoranti economici', 'cheap eats', 'mense', 'pranzo economico'],
    priority: 8
  },
  {
    url: '/strumenti/servizi-studenti-torino',
    titleIt: 'Servizi studenti Torino',
    titleEn: 'Student services Turin',
    type: 'tool',
    triggerKeywords: ['servizi studenti', 'student services', 'edisu', 'borsa di studio'],
    priority: 8
  },
  {
    url: '/strumenti/scioperi-trasporti',
    titleIt: 'Scioperi trasporti Italia',
    titleEn: 'Transport strikes Italy',
    type: 'tool',
    triggerKeywords: ['sciopero', 'scioperi', 'strike', 'trasporti pubblici'],
    priority: 7
  },
  // Key Pages
  {
    url: '/valutazione-immobile',
    titleIt: 'Valutazione immobiliare gratuita',
    titleEn: 'Free property valuation',
    type: 'page',
    triggerKeywords: ['valutazione immobiliare', 'stima casa', 'property valuation', 'quanto vale casa'],
    priority: 9
  },
  {
    url: '/investitori',
    titleIt: 'Investimenti immobiliari Torino',
    titleEn: 'Real estate investments Turin',
    type: 'page',
    triggerKeywords: ['investimento immobiliare', 'rendimento affitto', 'real estate investment', 'rental yield'],
    priority: 9
  },
  {
    url: '/venditori',
    titleIt: 'Vendi casa a Torino',
    titleEn: 'Sell your home Turin',
    type: 'page',
    triggerKeywords: ['vendere casa', 'sell home', 'sell property'],
    priority: 9
  },
  {
    url: '/studenti',
    titleIt: 'Guida studenti Torino',
    titleEn: 'Turin student guide',
    type: 'page',
    triggerKeywords: ['guida studenti', 'student guide', 'vivere a torino studente'],
    priority: 7
  },
  {
    url: '/chi-siamo',
    titleIt: 'Chi siamo',
    titleEn: 'About us',
    type: 'page',
    triggerKeywords: ['jungle rent', 'chi siamo', 'about us'],
    priority: 5
  }
];

// Generate linkable content from blog posts
function generateBlogLinks(): LinkableContent[] {
  return blogPosts.map(post => ({
    url: `/blog/${post.slug}`,
    titleIt: post.translations.it.title,
    titleEn: post.translations.en.title,
    type: 'blog' as const,
    triggerKeywords: [
      ...post.translations.it.seo.keywords.slice(0, 5),
      ...post.translations.en.seo.keywords.slice(0, 5),
      ...post.translations.it.tags,
      ...post.translations.en.tags
    ].filter((k, i, arr) => arr.indexOf(k) === i), // Dedupe
    priority: 5
  }));
}

// Combined registry
export const linkableContent: LinkableContent[] = [
  ...staticLinkableContent,
  ...generateBlogLinks()
];

// Get linkable content sorted by priority
export function getLinkableContent(preferTools: boolean = true): LinkableContent[] {
  return [...linkableContent].sort((a, b) => {
    if (preferTools) {
      if (a.type === 'tool' && b.type !== 'tool') return -1;
      if (a.type !== 'tool' && b.type === 'tool') return 1;
    }
    return b.priority - a.priority;
  });
}
