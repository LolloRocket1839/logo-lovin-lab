// Blog Content Clusters for Internal Linking Strategy
// Defines pillar content and cluster relationships for SEO

export interface ContentCluster {
  pillar: string; // Main pillar article slug
  pillarTitleIt: string;
  pillarTitleEn: string;
  satellites: string[]; // Related article slugs that link to/from pillar
  keywords: string[]; // Shared keywords across cluster
}

export interface ArticleRelationship {
  from: string;
  to: string;
  relevance: 'high' | 'medium' | 'low';
  bidirectional: boolean;
}

// Define content clusters by topic
export const contentClusters: ContentCluster[] = [
  // STUDENTS CLUSTER - University Life
  {
    pillar: 'dove-vivere-torino-studenti-politecnico',
    pillarTitleIt: 'Dove vivere a Torino: guida studenti Politecnico',
    pillarTitleEn: 'Where to live in Turin: Politecnico student guide',
    satellites: [
      'san-salvario-guida-studenti',
      'quartieri-sicuri-donne-torino',
      'aule-studio-torino-guida-completa',
      'palestre-torino-studenti-guida-completa',
      'dove-mangiare-torino-studenti',
      'politecnico-torino-guida-completa',
      'universita-torino-guida-completa'
    ],
    keywords: ['studenti torino', 'affitto studenti', 'quartieri torino', 'vita universitaria']
  },
  
  // STUDENTS CLUSTER - Daily Life
  {
    pillar: 'mobilita-sostenibile-torino-studenti',
    pillarTitleIt: 'Mobilità sostenibile a Torino per studenti',
    pillarTitleEn: 'Sustainable mobility in Turin for students',
    satellites: [
      'viaggiare-sostenibile-torino-guida',
      'cicloturismo-avanzato-torino',
      'sciopero-trasporti-italia-gennaio-2026',
      'torino-citta-7-minuti-walkability'
    ],
    keywords: ['trasporti torino', 'bici torino', 'mobilità studenti', 'sostenibilità']
  },
  
  // INVESTORS CLUSTER - Property Investment
  {
    pillar: 'investire-real-assets-torino-2025',
    pillarTitleIt: 'Investire in real assets a Torino nel 2025',
    pillarTitleEn: 'Investing in real assets in Turin 2025',
    satellites: [
      'cedolare-secca-2026-investitori',
      'mutui-investitori-immobiliari-guida-completa',
      'student-housing-italia-savills-2025',
      'valutazione-immobiliare-torino-guida-completa'
    ],
    keywords: ['investimenti immobiliari', 'rendimenti affitto', 'cedolare secca', 'torino investire']
  },
  
  // SELLERS CLUSTER - Property Sales
  {
    pillar: 'vendere-casa-torino-guida-completa-2025',
    pillarTitleIt: 'Vendere casa a Torino: guida completa 2025',
    pillarTitleEn: 'Selling property in Turin: complete guide 2025',
    satellites: [
      'valutazione-immobiliare-torino-guida-completa',
      'props-gestione-immobiliare-semplificata'
    ],
    keywords: ['vendere casa torino', 'valutazione immobile', 'mercato immobiliare torino']
  },
  
  // TOURISTS CLUSTER - Turin Experience
  {
    pillar: 'torino-ogni-stagione-turisti',
    pillarTitleIt: 'Torino in ogni stagione: guida turisti',
    pillarTitleEn: 'Turin in every season: tourist guide',
    satellites: [
      'torino-novembre-turisti',
      'torino-dicembre-turisti',
      'eventi-torino-gennaio-2026',
      'eventi-torino-febbraio-2026',
      'eventi-torino-marzo-2026',
      'torino-nightlife-guide',
      'torino-digital-nomads-guide'
    ],
    keywords: ['torino turismo', 'visitare torino', 'eventi torino', 'cosa fare torino']
  },
  
  // TOURISTS CLUSTER - Food & Culture
  {
    pillar: 'cioccolaterie-torino-guida-completa',
    pillarTitleIt: 'Cioccolaterie storiche di Torino: guida completa',
    pillarTitleEn: 'Historic chocolate shops in Turin: complete guide',
    satellites: [
      'tajarin-piemontesi-guida-completa',
      'migliori-gelaterie-torino-studenti',
      'dove-mangiare-torino-studenti',
      'mercati-storici-torino-chiusure',
      'panettoni-pandori-torino-guida-2025'
    ],
    keywords: ['cioccolato torino', 'cibo torino', 'gastronomia piemontese', 'tradizioni culinarie']
  },
  
  // SOCIETA CLUSTER - Urban Life
  {
    pillar: 'torino-citta-7-minuti-walkability',
    pillarTitleIt: 'Torino: la città a sette minuti',
    pillarTitleEn: 'Turin: a seven-minute city',
    satellites: [
      'quartieri-sicuri-donne-torino',
      'raccolta-differenziata-torino-guida',
      'guida-volontariato-torino',
      'emergenze-affitti-torino-diritti-inquilini'
    ],
    keywords: ['qualità vita torino', 'vivibilità torino', 'urbanistica', 'servizi torino']
  }
];

// Manual article relationships for cross-linking
export const articleRelationships: ArticleRelationship[] = [
  // Students -> Safety
  { from: 'san-salvario-guida-studenti', to: 'quartieri-sicuri-donne-torino', relevance: 'high', bidirectional: true },
  { from: 'dove-vivere-torino-studenti-politecnico', to: 'quartieri-sicuri-donne-torino', relevance: 'high', bidirectional: true },
  
  // Students -> Food
  { from: 'san-salvario-guida-studenti', to: 'dove-mangiare-torino-studenti', relevance: 'high', bidirectional: true },
  { from: 'aule-studio-torino-guida-completa', to: 'dove-mangiare-torino-studenti', relevance: 'medium', bidirectional: true },
  
  // Students -> Universities
  { from: 'dove-vivere-torino-studenti-politecnico', to: 'politecnico-torino-guida-completa', relevance: 'high', bidirectional: true },
  { from: 'dove-vivere-torino-studenti-politecnico', to: 'universita-torino-guida-completa', relevance: 'high', bidirectional: true },
  
  // Investors -> Taxes
  { from: 'investire-real-assets-torino-2025', to: 'cedolare-secca-2026-investitori', relevance: 'high', bidirectional: true },
  { from: 'mutui-investitori-immobiliari-guida-completa', to: 'cedolare-secca-2026-investitori', relevance: 'high', bidirectional: true },
  
  // Investors -> Market Data
  { from: 'investire-real-assets-torino-2025', to: 'student-housing-italia-savills-2025', relevance: 'high', bidirectional: true },
  { from: 'cedolare-secca-2026-investitori', to: 'student-housing-italia-savills-2025', relevance: 'medium', bidirectional: true },
  
  // Tourists -> Events (temporal chain)
  { from: 'torino-novembre-turisti', to: 'torino-dicembre-turisti', relevance: 'high', bidirectional: true },
  { from: 'torino-dicembre-turisti', to: 'eventi-torino-gennaio-2026', relevance: 'high', bidirectional: true },
  { from: 'eventi-torino-gennaio-2026', to: 'eventi-torino-febbraio-2026', relevance: 'high', bidirectional: true },
  { from: 'eventi-torino-febbraio-2026', to: 'eventi-torino-marzo-2026', relevance: 'high', bidirectional: true },
  { from: 'eventi-torino-febbraio-2026', to: 'carnevale-ivrea-battaglia-arance-2026', relevance: 'high', bidirectional: true },
  
  // Food cluster interconnections
  { from: 'cioccolaterie-torino-guida-completa', to: 'panettoni-pandori-torino-guida-2025', relevance: 'high', bidirectional: true },
  { from: 'tajarin-piemontesi-guida-completa', to: 'mercati-storici-torino-chiusure', relevance: 'medium', bidirectional: true },
  { from: 'migliori-gelaterie-torino-studenti', to: 'dove-mangiare-torino-studenti', relevance: 'high', bidirectional: true },
  
  // Mobility connections
  { from: 'mobilita-sostenibile-torino-studenti', to: 'sciopero-trasporti-italia-gennaio-2026', relevance: 'high', bidirectional: true },
  { from: 'viaggiare-sostenibile-torino-guida', to: 'cicloturismo-avanzato-torino', relevance: 'high', bidirectional: true },
  
  // Walkability to neighborhoods
  { from: 'torino-citta-7-minuti-walkability', to: 'san-salvario-guida-studenti', relevance: 'medium', bidirectional: true },
  { from: 'torino-citta-7-minuti-walkability', to: 'dove-vivere-torino-studenti-politecnico', relevance: 'high', bidirectional: true },
  
  // Cross-category: Digital nomads
  { from: 'torino-digital-nomads-guide', to: 'aule-studio-torino-guida-completa', relevance: 'high', bidirectional: true },
  { from: 'torino-digital-nomads-guide', to: 'torino-citta-7-minuti-walkability', relevance: 'medium', bidirectional: true },
  { from: 'torino-digital-nomads-guide', to: 'torino-nightlife-guide', relevance: 'medium', bidirectional: true },
];

// Get cluster for a given article
export function getClusterForArticle(slug: string): ContentCluster | undefined {
  return contentClusters.find(
    cluster => cluster.pillar === slug || cluster.satellites.includes(slug)
  );
}

// Get all related articles for a slug based on clusters
export function getClusterRelatedArticles(slug: string): string[] {
  const cluster = getClusterForArticle(slug);
  if (!cluster) return [];
  
  if (cluster.pillar === slug) {
    return cluster.satellites;
  }
  
  // Return pillar + other satellites (excluding self)
  return [cluster.pillar, ...cluster.satellites.filter(s => s !== slug)];
}

// Get direct relationships for an article
export function getDirectRelationships(slug: string): ArticleRelationship[] {
  return articleRelationships.filter(
    rel => rel.from === slug || (rel.bidirectional && rel.to === slug)
  );
}

// Check if an article is a pillar
export function isPillarArticle(slug: string): boolean {
  return contentClusters.some(cluster => cluster.pillar === slug);
}

// Get all pillar articles
export function getPillarArticles(): string[] {
  return contentClusters.map(cluster => cluster.pillar);
}
