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

// Enhanced keywords for high-value blog posts
const enhancedBlogKeywords: Record<string, string[]> = {
  'dove-vivere-torino-studenti-politecnico': [
    'dove vivere torino', 'quartieri studenti', 'affitto politecnico', 
    'stanza torino studenti', 'alloggi universitari torino'
  ],
  'san-salvario-guida-studenti': [
    'san salvario', 'quartiere san salvario', 'vivere san salvario',
    'affitto san salvario', 'studenti san salvario'
  ],
  'quartieri-sicuri-donne-torino': [
    'quartieri sicuri torino', 'sicurezza torino', 'donne torino',
    'zone sicure', 'quartieri tranquilli'
  ],
  'aule-studio-torino-guida-completa': [
    'aule studio', 'biblioteche torino', 'dove studiare torino',
    'spazi studio gratuiti', 'biblioteche universitarie'
  ],
  'cedolare-secca-2026-investitori': [
    'cedolare secca', 'tasse affitto', 'investimento immobiliare',
    '21%', '26%', 'fiscalità affitti'
  ],
  'investire-real-assets-torino-2025': [
    'investire torino', 'rendimento affitto', 'real estate torino',
    'comprare per affittare', 'buy to let'
  ],
  'torino-ogni-stagione-turisti': [
    'visitare torino', 'quando visitare torino', 'torino turismo',
    'cosa vedere torino', 'vacanza torino'
  ],
  'torino-citta-7-minuti-walkability': [
    'camminabilità torino', 'walkability', '15 minute city',
    'qualità vita torino', 'città camminabile'
  ],
  'eventi-torino-gennaio-2026': [
    'eventi gennaio', 'cosa fare torino gennaio', 'mostre torino',
    'concerti torino', 'luci artista'
  ],
  'eventi-torino-febbraio-2026': [
    'eventi febbraio', 'carnevale torino', 'san valentino torino',
    'cosa fare febbraio'
  ],
  'torino-digital-nomads-guide': [
    'digital nomad torino', 'remote work torino', 'coworking torino',
    'nomadi digitali', 'lavoro remoto italia'
  ],
  'torino-nightlife-guide': [
    'vita notturna torino', 'nightlife torino', 'locali torino',
    'discoteche torino', 'movida torino'
  ],
  'eventi-torino-aprile-2026': [
    'eventi aprile', 'torino jazz festival', 'torino comics 2026',
    'messer tulipano', 'ciliegi venaria', 'cosa fare torino aprile'
  ],
  'torino-citta-campus-atenei-immobiliare-2026': [
    'masterplan politecnico', 'città delle scienze', 'metro 2 torino',
    'grugliasco campus', 'manifattura tabacchi', 'innovation hub',
    'campus valentino', 'torri politecnico', 'PNRR studentati'
  ],
  'eventi-torino-maggio-2026': [
    'eventi maggio', 'salone del libro 2026', 'concerti torino maggio',
    'mostre torino maggio', 'twice torino', 'rockin 1000 torino',
    'cosa fare torino maggio', 'teatro torino maggio'
  ],
  'quartieri-sicuri-studenti-internazionali-torino-2026': [
    'quartieri sicuri internazionali', 'safe neighborhoods international students',
    'erasmus torino sicurezza', 'zone rosse torino studenti',
    'crocetta studenti', 'cenisia affitto sicuro'
  ],
  'guida-investitori-stranieri-comprare-casa-torino': [
    'buy property italy', 'foreign investor', 'codice fiscale',
    'comprare casa straniero', 'notaio', 'rogito', 'transfer taxes italy',
    'cedolare secca stranieri', 'prima casa stranieri', 'procura acquisto'
  ],
  'contratto-studenti-affitto-breve-strategia': [
    'contratto studenti', 'affitto breve estivo', 'doppia stagione',
    'CIN affitti brevi', 'SCIA locazioni', 'imposta soggiorno torino',
    'student contract summer rental', 'dual season strategy',
    'cedolare secca 10% 21%', 'locazione transitoria studenti'
  ],
  'comodato-cedolare-secca-aidc-2025': [
    'comodato cedolare secca', 'AIDC norma 233', 'società semplice',
    'diritto reale godimento', 'comodatario locazione', 'trasparenza fiscale',
    'locazioni brevi comodatario', 'redditi diversi comodato',
    'comodato flat tax', 'società semplice rental'
  ],
  'irpef-vs-cedolare-secca-2026-investitori': [
    'irpef vs cedolare secca', 'confronto tassazione affitti', 'flat tax rental Italy',
    'canone concordato 10% torino', 'aliquote IRPEF 2026', 'cedolare secca conviene',
    'tassazione affitti 2026', 'IRPEF affitti', 'flat tax vs income tax Italy'
  ],
  'imu-2026-immobili-affitto-torino-investitori': [
    'IMU 2026 torino', 'IMU canone concordato', 'IMU property tax Turin',
    'aliquota IMU immobili locati', 'calcolo IMU affitto', 'IMU seconda casa',
    'riduzione IMU 25%', 'scadenze IMU 2026', 'IMU student housing'
  ],
  'conto-corrente-studenti-stranieri-italia-2026': [
    'conto corrente studenti stranieri', 'bank account international students Italy',
    'Revolut IBAN italiano', 'aprire conto banca Torino studenti',
    'codice fiscale banca', 'Erasmus conto corrente', 'Wise bonifici internazionali',
    'N26 Italia studenti', 'Intesa XME under 35'
  ],
  'vendere-immobile-investitori-torino': [
    'vendere a investitori', 'rendimento lordo', 'rental ready',
    'yield driven pricing', 'sell to investors', 'cap rate',
    'vendere appartamento affittato', 'income property sale',
    'vendita diretta immobile', 'cash flow immediato'
  ]
};

// Generate linkable content from blog posts with enhanced keywords
function generateBlogLinks(): LinkableContent[] {
  return blogPosts.map(post => {
    const enhancedKeys = enhancedBlogKeywords[post.slug] || [];
    
    // Higher priority for pillar articles
    const isPillar = [
      'dove-vivere-torino-studenti-politecnico',
      'investire-real-assets-torino-2025',
      'vendere-casa-torino-guida-completa-2025',
      'torino-ogni-stagione-turisti',
      'cioccolaterie-torino-guida-completa',
      'mobilita-sostenibile-torino-studenti',
      'torino-citta-7-minuti-walkability'
    ].includes(post.slug);
    
    return {
      url: `/blog/${post.slug}`,
      titleIt: post.translations.it.title,
      titleEn: post.translations.en.title,
      type: 'blog' as const,
      triggerKeywords: [
        ...enhancedKeys,
        ...post.translations.it.seo.keywords.slice(0, 5),
        ...post.translations.en.seo.keywords.slice(0, 5),
        ...post.translations.it.tags,
        ...post.translations.en.tags
      ].filter((k, i, arr) => arr.indexOf(k) === i), // Dedupe
      priority: isPillar ? 8 : 5
    };
  });
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
