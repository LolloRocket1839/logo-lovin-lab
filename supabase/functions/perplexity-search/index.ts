import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Create Supabase client for cache operations
const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Simple hash function for cache keys
function hashQuery(query: string, language: string): string {
  const str = `${query.toLowerCase().trim()}:${language}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}

// Check cache for existing response
async function getCachedResponse(queryHash: string): Promise<any | null> {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const { data, error } = await supabase
      .from('perplexity_cache')
      .select('response')
      .eq('query_hash', queryHash)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (error || !data) return null;
    console.log('Cache HIT for hash:', queryHash);
    return data.response;
  } catch (e) {
    console.error('Cache read error:', e);
    return null;
  }
}

// Store response in cache
async function setCacheResponse(queryHash: string, query: string, language: string, response: any): Promise<void> {
  try {
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7); // 7 days cache

    await supabase
      .from('perplexity_cache')
      .upsert({
        query_hash: queryHash,
        query: query.substring(0, 500), // Limit query length
        language,
        response,
        expires_at: expiresAt.toISOString(),
      }, { onConflict: 'query_hash' });

    console.log('Cache SET for hash:', queryHash);
  } catch (e) {
    console.error('Cache write error:', e);
  }
}

// Turin-focused domains for grounded search
const TURIN_DOMAINS = [
  'junglerent.it',
  'comune.torino.it',
  'immobiliare.it',
  'idealista.it',
  'edisu.piemonte.it',
  'polito.it',
  'unito.it',
  'studenti.it',
  'universitaly.it',
];

// Searchable content index - embedded directly for edge function
interface SearchableItem {
  slug: string;
  type: 'article' | 'faq';
  category: string;
  keywords: string[];
  title: string;
  titleEn: string;
  excerpt: string;
  excerptEn: string;
  url: string;
  faqQuestion?: string;
  faqQuestionEn?: string;
  faqAnswer?: string;
  faqAnswerEn?: string;
}

// Normalize text for searching
function normalizeText(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

// Calculate match score
function calculateMatchScore(query: string, item: SearchableItem): number {
  const normalizedQuery = normalizeText(query);
  const queryWords = normalizedQuery.split(' ').filter(w => w.length > 2);
  
  if (queryWords.length === 0) return 0;
  
  let score = 0;
  const maxScore = queryWords.length;
  
  for (const word of queryWords) {
    if (item.keywords.some(k => k.includes(word) || word.includes(k))) {
      score += 1;
    }
    if (normalizeText(item.title).includes(word) || normalizeText(item.titleEn).includes(word)) {
      score += 0.5;
    }
    if (item.faqQuestion && (normalizeText(item.faqQuestion).includes(word) || 
        (item.faqQuestionEn && normalizeText(item.faqQuestionEn).includes(word)))) {
      score += 1.5;
    }
  }
  
  const questionIndicators = ['?', 'come', 'cosa', 'dove', 'quando', 'perche', 'quanto', 'quale', 'chi',
    'how', 'what', 'where', 'when', 'why', 'which', 'who', 'is', 'are', 'can', 'do', 'does'];
  if (item.type === 'faq' && questionIndicators.some(q => normalizedQuery.includes(q))) {
    score += 0.5;
  }
  
  return score / maxScore;
}

// Jungle Rent content index
const JUNGLE_RENT_INDEX: SearchableItem[] = [
  // San Salvario
  {
    slug: "san-salvario-guida-studenti",
    type: "article",
    category: "students",
    keywords: ["san salvario", "studenti", "affitto", "quartiere", "torino", "sicurezza", "nightlife", "movida", "studente"],
    title: "San Salvario - Guida Completa per Studenti",
    titleEn: "San Salvario - Complete Guide for Students",
    excerpt: "San Salvario è il quartiere più vivace e multiculturale di Torino, perfetto per studenti grazie alla vicinanza alle università, la vita notturna e i prezzi accessibili.",
    excerptEn: "San Salvario is Turin's most vibrant and multicultural neighborhood, perfect for students thanks to its proximity to universities, nightlife and affordable prices.",
    url: "/blog/san-salvario-guida-studenti",
  },
  {
    slug: "san-salvario-guida-studenti",
    type: "faq",
    category: "students",
    keywords: ["san salvario", "sicuro", "sicurezza", "pericoloso", "notte", "studenti"],
    title: "San Salvario - Guida Completa per Studenti",
    titleEn: "San Salvario - Complete Guide for Students",
    excerpt: "San Salvario è generalmente sicuro. Come ogni quartiere vivace, richiede le normali precauzioni notturne.",
    excerptEn: "San Salvario is generally safe. Like any lively neighborhood, it requires normal nighttime precautions.",
    url: "/blog/san-salvario-guida-studenti",
    faqQuestion: "San Salvario è sicuro?",
    faqQuestionEn: "Is San Salvario safe?",
    faqAnswer: "San Salvario è generalmente sicuro. Come ogni quartiere vivace, richiede le normali precauzioni notturne, specialmente nelle zone più frequentate della movida. La zona residenziale verso il Valentino è molto tranquilla.",
    faqAnswerEn: "San Salvario is generally safe. Like any lively neighborhood, it requires normal nighttime precautions, especially in the busier nightlife areas. The residential area towards Valentino is very quiet.",
  },
  {
    slug: "san-salvario-guida-studenti",
    type: "faq",
    category: "students",
    keywords: ["affitto", "costo", "prezzo", "stanza", "san salvario", "euro", "mese"],
    title: "San Salvario - Guida Completa per Studenti",
    titleEn: "San Salvario - Complete Guide for Students",
    excerpt: "Una stanza singola a San Salvario costa tra 350-500€/mese, un posto letto in doppia 200-300€/mese.",
    excerptEn: "A single room in San Salvario costs 350-500€/month, a bed in a shared room 200-300€/month.",
    url: "/blog/san-salvario-guida-studenti",
    faqQuestion: "Quanto costa affittare a San Salvario?",
    faqQuestionEn: "How much does it cost to rent in San Salvario?",
    faqAnswer: "Una stanza singola a San Salvario costa tra 350-500€/mese, un posto letto in doppia 200-300€/mese. I bilocali partono da 600-800€/mese. Utenze escluse, circa 50-80€/mese extra.",
    faqAnswerEn: "A single room in San Salvario costs 350-500€/month, a bed in a shared room 200-300€/month. One-bedroom apartments start at 600-800€/month. Utilities excluded, about 50-80€/month extra.",
  },
  // Quartieri studenti
  {
    slug: "dove-vivere-torino-studenti-politecnico",
    type: "article",
    category: "students",
    keywords: ["quartiere", "studenti", "politecnico", "torino", "vivere", "affitto", "cenisia", "cit turin", "san paolo"],
    title: "Dove vivere a Torino: i migliori quartieri per studenti del Politecnico",
    titleEn: "Where to live in Turin: best neighborhoods for Politecnico students",
    excerpt: "Guida completa ai migliori quartieri per studenti universitari a Torino, con focus su vicinanza al Politecnico, prezzi e qualità della vita.",
    excerptEn: "Complete guide to the best neighborhoods for university students in Turin, focusing on proximity to Politecnico, prices and quality of life.",
    url: "/blog/dove-vivere-torino-studenti-politecnico",
  },
  // Investimenti
  {
    slug: "investire-real-assets-torino-2025",
    type: "article",
    category: "investors",
    keywords: ["investimento", "immobiliare", "torino", "rendimento", "student housing", "affitto", "roi", "2025"],
    title: "Investire in Real Assets a Torino: Guida 2025",
    titleEn: "Investing in Real Assets in Turin: 2025 Guide",
    excerpt: "Analisi completa delle opportunità di investimento immobiliare a Torino, con focus su student housing e rendimenti attesi.",
    excerptEn: "Complete analysis of real estate investment opportunities in Turin, focusing on student housing and expected returns.",
    url: "/blog/investire-real-assets-torino-2025",
  },
  {
    slug: "investire-real-assets-torino-2025",
    type: "faq",
    category: "investors",
    keywords: ["rendimento", "roi", "investimento", "torino", "percentuale", "guadagno"],
    title: "Investire in Real Assets a Torino: Guida 2025",
    titleEn: "Investing in Real Assets in Turin: 2025 Guide",
    excerpt: "Il rendimento lordo medio per investimenti immobiliari a Torino si aggira intorno al 6-8% annuo.",
    excerptEn: "The average gross return for real estate investments in Turin is around 6-8% per year.",
    url: "/blog/investire-real-assets-torino-2025",
    faqQuestion: "Qual è il rendimento medio degli investimenti immobiliari a Torino?",
    faqQuestionEn: "What is the average return on real estate investments in Turin?",
    faqAnswer: "Il rendimento lordo medio per investimenti immobiliari a Torino si aggira intorno al 6-8% annuo per lo student housing, con punte del 10% nelle zone universitarie più richieste come San Salvario e Cenisia.",
    faqAnswerEn: "The average gross return for real estate investments in Turin is around 6-8% per year for student housing, with peaks of 10% in the most sought-after university areas like San Salvario and Cenisia.",
  },
  // Mutui
  {
    slug: "mutui-investitori-immobiliari-guida-completa",
    type: "article",
    category: "investors",
    keywords: ["mutuo", "investimento", "immobiliare", "banca", "tasso", "interesse", "finanziamento"],
    title: "Mutui per investitori immobiliari: guida completa",
    titleEn: "Mortgages for real estate investors: complete guide",
    excerpt: "Guida completa ai mutui per investimenti immobiliari: requisiti, tassi, LTV e strategie per ottenere il finanziamento.",
    excerptEn: "Complete guide to mortgages for real estate investments: requirements, rates, LTV and strategies to get financing.",
    url: "/blog/mutui-investitori-immobiliari-guida-completa",
  },
  // Vendere casa
  {
    slug: "vendere-casa-torino-guida-completa-2025",
    type: "article",
    category: "sellers",
    keywords: ["vendere", "casa", "torino", "agenzia", "commissione", "prezzo", "mercato", "2025"],
    title: "Vendere casa a Torino: guida completa 2025",
    titleEn: "Selling a house in Turin: complete guide 2025",
    excerpt: "Guida definitiva alla vendita immobiliare a Torino: vizi occulti, conformità catastale, commissioni agenzie 2-4%, prezzi per quartiere.",
    excerptEn: "Definitive guide to selling property in Turin: hidden defects, cadastral compliance, agency fees 2-4%, prices by neighborhood.",
    url: "/blog/vendere-casa-torino-guida-completa-2025",
  },
  // Cioccolato
  {
    slug: "cioccolaterie-torino-guida-completa",
    type: "article",
    category: "turisti",
    keywords: ["cioccolato", "cioccolateria", "torino", "gianduiotto", "bicerin", "caffarel", "venchi"],
    title: "Le cioccolaterie a Torino: guida completa",
    titleEn: "Turin chocolate shops: complete guide",
    excerpt: "Storia dal 1560 ad oggi, Caffarel, Venchi, Guido Gobino, Baratti & Milano, Gianduiotto, Cremino, Bicerin.",
    excerptEn: "History from 1560 to today, Caffarel, Venchi, Guido Gobino, Baratti & Milano, Gianduiotto, Cremino, Bicerin.",
    url: "/blog/cioccolaterie-torino-guida-completa",
  },
  {
    slug: "cioccolaterie-torino-guida-completa",
    type: "faq",
    category: "turisti",
    keywords: ["gianduiotto", "comprare", "migliore", "torino", "cioccolato"],
    title: "Le cioccolaterie a Torino: guida completa",
    titleEn: "Turin chocolate shops: complete guide",
    excerpt: "I migliori Gianduiotti si trovano da Guido Gobino, Guido Castagna, Caffarel e Peyrano.",
    excerptEn: "The best Gianduiotti are found at Guido Gobino, Guido Castagna, Caffarel and Peyrano.",
    url: "/blog/cioccolaterie-torino-guida-completa",
    faqQuestion: "Dove comprare il miglior Gianduiotto a Torino?",
    faqQuestionEn: "Where to buy the best Gianduiotto in Turin?",
    faqAnswer: "I migliori Gianduiotti a Torino si trovano da: Guido Gobino (Via Cagliari 15), Guido Castagna (Via Maria Vittoria 27), Caffarel (Via Gioberti 23), Peyrano (Corso Moncalieri 47) e La Perla di Torino.",
    faqAnswerEn: "The best Gianduiotti in Turin are found at: Guido Gobino (Via Cagliari 15), Guido Castagna (Via Maria Vittoria 27), Caffarel (Via Gioberti 23), Peyrano (Corso Moncalieri 47) and La Perla di Torino.",
  },
  // Tajarin
  {
    slug: "tajarin-piemontesi-guida-completa",
    type: "article",
    category: "turisti",
    keywords: ["tajarin", "pasta", "piemonte", "torino", "tartufo", "tradizione", "cucina"],
    title: "I tajarin piemontesi: guida completa",
    titleEn: "Piedmontese tajarin: complete guide",
    excerpt: "Storia dal Quattrocento, ricetta con 30 tuorli, comodino, tartufo bianco d'Alba.",
    excerptEn: "History from the 15th century, recipe with 30 yolks, comodino, Alba white truffle.",
    url: "/blog/tajarin-piemontesi-guida-completa",
  },
  // Nightlife
  {
    slug: "torino-nightlife-guide",
    type: "article",
    category: "students",
    keywords: ["nightlife", "movida", "torino", "discoteca", "bar", "club", "notte", "divertimento"],
    title: "Torino Nightlife Guide",
    titleEn: "Turin Nightlife Guide",
    excerpt: "Guida completa alla vita notturna di Torino: i migliori bar, club e zone della movida.",
    excerptEn: "Complete guide to Turin's nightlife: the best bars, clubs and nightlife areas.",
    url: "/blog/torino-nightlife-guide",
  },
  // Politecnico
  {
    slug: "politecnico-torino-guida-completa",
    type: "article",
    category: "students",
    keywords: ["politecnico", "torino", "ingegneria", "architettura", "universita", "studenti", "polito"],
    title: "Politecnico di Torino: guida completa",
    titleEn: "Polytechnic University of Turin: complete guide",
    excerpt: "Tutto quello che devi sapere sul Politecnico di Torino: corsi, sedi, vita studentesca.",
    excerptEn: "Everything you need to know about Politecnico di Torino: courses, campuses, student life.",
    url: "/blog/politecnico-torino-guida-completa",
  },
  // UniTo
  {
    slug: "universita-torino-guida-completa",
    type: "article",
    category: "students",
    keywords: ["universita", "torino", "unito", "studenti", "facolta", "corsi"],
    title: "Università di Torino: guida completa",
    titleEn: "University of Turin: complete guide",
    excerpt: "Guida completa all'Università di Torino: facoltà, sedi, vita studentesca e opportunità.",
    excerptEn: "Complete guide to the University of Turin: faculties, campuses, student life and opportunities.",
    url: "/blog/universita-torino-guida-completa",
  },
  // Aule studio
  {
    slug: "aule-studio-torino-guida-completa",
    type: "article",
    category: "students",
    keywords: ["aule", "studio", "torino", "biblioteca", "studiare", "studenti", "wifi"],
    title: "Aule studio a Torino: guida completa",
    titleEn: "Study rooms in Turin: complete guide",
    excerpt: "Le migliori aule studio e biblioteche di Torino per studenti universitari, con orari e servizi.",
    excerptEn: "The best study rooms and libraries in Turin for university students, with hours and services.",
    url: "/blog/aule-studio-torino-guida-completa",
  },
  // Dove mangiare
  {
    slug: "dove-mangiare-torino-studenti",
    type: "article",
    category: "students",
    keywords: ["mangiare", "ristorante", "economico", "studenti", "torino", "pranzo", "cena", "budget"],
    title: "Dove mangiare a Torino per studenti",
    titleEn: "Where to eat in Turin for students",
    excerpt: "I migliori posti economici dove mangiare a Torino per studenti: mense, kebab, pizzerie e ristoranti.",
    excerptEn: "The best affordable places to eat in Turin for students: canteens, kebab, pizzerias and restaurants.",
    url: "/blog/dove-mangiare-torino-studenti",
  },
  // Gelaterie
  {
    slug: "migliori-gelaterie-torino-studenti",
    type: "article",
    category: "students",
    keywords: ["gelato", "gelateria", "torino", "migliore", "studenti", "artigianale"],
    title: "Le migliori gelaterie di Torino",
    titleEn: "The best ice cream shops in Turin",
    excerpt: "Le migliori gelaterie artigianali di Torino dove gustare gelato di qualità a prezzi studente.",
    excerptEn: "The best artisan ice cream shops in Turin where you can enjoy quality gelato at student prices.",
    url: "/blog/migliori-gelaterie-torino-studenti",
  },
  // Mercati
  {
    slug: "mercati-storici-torino-chiusure",
    type: "article",
    category: "turisti",
    keywords: ["mercato", "torino", "porta palazzo", "rionale", "alimentare", "spesa"],
    title: "Mercati storici di Torino",
    titleEn: "Historic markets of Turin",
    excerpt: "Guida ai mercati storici e rionali di Torino: Porta Palazzo, orari, specialità e consigli.",
    excerptEn: "Guide to Turin's historic and neighborhood markets: Porta Palazzo, hours, specialties and tips.",
    url: "/blog/mercati-storici-torino-chiusure",
  },
  // Digital Nomads
  {
    slug: "torino-digital-nomads-guide",
    type: "article",
    category: "students",
    keywords: ["digital nomad", "remote work", "coworking", "torino", "freelance", "smart working"],
    title: "Torino per Digital Nomads",
    titleEn: "Turin for Digital Nomads",
    excerpt: "Guida completa per digital nomad a Torino: coworking, wifi, costo della vita e community.",
    excerptEn: "Complete guide for digital nomads in Turin: coworking, wifi, cost of living and community.",
    url: "/blog/torino-digital-nomads-guide",
  },
  // Mobilità
  {
    slug: "mobilita-sostenibile-torino-studenti",
    type: "article",
    category: "students",
    keywords: ["trasporti", "metro", "bus", "tram", "bici", "torino", "studenti", "abbonamento", "gtt"],
    title: "Mobilità sostenibile a Torino per studenti",
    titleEn: "Sustainable mobility in Turin for students",
    excerpt: "Guida completa ai trasporti pubblici di Torino per studenti: GTT, abbonamenti, bike sharing.",
    excerptEn: "Complete guide to Turin's public transport for students: GTT, subscriptions, bike sharing.",
    url: "/blog/mobilita-sostenibile-torino-studenti",
  },
  // Raccolta differenziata
  {
    slug: "raccolta-differenziata-torino-guida",
    type: "article",
    category: "societa",
    keywords: ["rifiuti", "raccolta differenziata", "torino", "riciclaggio", "spazzatura", "amiat"],
    title: "Raccolta differenziata a Torino: guida",
    titleEn: "Waste separation in Turin: guide",
    excerpt: "Guida pratica alla raccolta differenziata a Torino: calendari, regole e centri di raccolta.",
    excerptEn: "Practical guide to waste separation in Turin: schedules, rules and collection centers.",
    url: "/blog/raccolta-differenziata-torino-guida",
  },
  // Quartieri sicuri donne
  {
    slug: "quartieri-sicuri-donne-torino",
    type: "article",
    category: "students",
    keywords: ["sicurezza", "donne", "quartiere", "torino", "studentesse", "notte"],
    title: "Quartieri sicuri per donne a Torino",
    titleEn: "Safe neighborhoods for women in Turin",
    excerpt: "Guida ai quartieri più sicuri di Torino per studentesse e donne che vivono sole.",
    excerptEn: "Guide to the safest neighborhoods in Turin for female students and women living alone.",
    url: "/blog/quartieri-sicuri-donne-torino",
  },
  // Volontariato
  {
    slug: "guida-volontariato-torino",
    type: "article",
    category: "societa",
    keywords: ["volontariato", "torino", "associazioni", "sociale", "aiuto", "comunita"],
    title: "Guida al volontariato a Torino",
    titleEn: "Guide to volunteering in Turin",
    excerpt: "Le migliori associazioni di volontariato a Torino e come partecipare come studente.",
    excerptEn: "The best volunteer associations in Turin and how to participate as a student.",
    url: "/blog/guida-volontariato-torino",
  },
  // Eventi
  {
    slug: "eventi-torino-gennaio-2026",
    type: "article",
    category: "turisti",
    keywords: ["eventi", "torino", "gennaio", "2026", "concerti", "mostre", "festival"],
    title: "Eventi a Torino Gennaio 2026",
    titleEn: "Events in Turin January 2026",
    excerpt: "Tutti gli eventi, concerti, mostre e festival a Torino nel mese di gennaio 2026.",
    excerptEn: "All events, concerts, exhibitions and festivals in Turin in January 2026.",
    url: "/blog/eventi-torino-gennaio-2026",
  },
  {
    slug: "eventi-torino-febbraio-2026",
    type: "article",
    category: "turisti",
    keywords: ["eventi", "torino", "febbraio", "2026", "carnevale", "cioccolato", "san valentino"],
    title: "Eventi a Torino Febbraio 2026",
    titleEn: "Events in Turin February 2026",
    excerpt: "Eventi a Torino febbraio 2026: CioccolaTò, Carnevale, San Valentino, mostre e concerti.",
    excerptEn: "Events in Turin February 2026: CioccolaTò, Carnival, Valentine's Day, exhibitions and concerts.",
    url: "/blog/eventi-torino-febbraio-2026",
  },
  // Torino stagioni
  {
    slug: "torino-ogni-stagione-turisti",
    type: "article",
    category: "turisti",
    keywords: ["torino", "stagione", "visitare", "periodo", "migliore", "clima", "turismo"],
    title: "Torino in ogni stagione",
    titleEn: "Turin in every season",
    excerpt: "Quando visitare Torino? Guida completa a cosa fare in ogni stagione dell'anno.",
    excerptEn: "When to visit Turin? Complete guide to what to do in every season of the year.",
    url: "/blog/torino-ogni-stagione-turisti",
  },
  // Student Housing Report
  {
    slug: "student-housing-italia-savills-2025",
    type: "article",
    category: "investors",
    keywords: ["student housing", "italia", "mercato", "savills", "investimento", "2025", "pbsa"],
    title: "Student Housing in Italia: Report Savills 2025",
    titleEn: "Student Housing in Italy: Savills Report 2025",
    excerpt: "Analisi del mercato student housing in Italia: trend, investimenti, rendimenti e previsioni 2025.",
    excerptEn: "Analysis of the student housing market in Italy: trends, investments, returns and 2025 forecasts.",
    url: "/blog/student-housing-italia-savills-2025",
  },
];

// Search local content
function searchLocalContent(query: string, language: string = 'it'): { results: SearchableItem[], topScore: number } {
  const results: { item: SearchableItem, score: number }[] = [];
  
  for (const item of JUNGLE_RENT_INDEX) {
    const score = calculateMatchScore(query, item);
    if (score >= 0.3) {
      results.push({ item, score });
    }
  }
  
  results.sort((a, b) => b.score - a.score);
  
  // Deduplicate by slug
  const seen = new Set<string>();
  const deduplicated: SearchableItem[] = [];
  
  for (const r of results) {
    const key = `${r.item.slug}-${r.item.faqQuestion || ''}`;
    if (!seen.has(key)) {
      seen.add(key);
      deduplicated.push(r.item);
    }
  }
  
  return {
    results: deduplicated.slice(0, 5),
    topScore: results.length > 0 ? results[0].score : 0
  };
}

// Generate answer from local content
function generateLocalAnswer(results: SearchableItem[], query: string, language: string): string {
  if (results.length === 0) return '';
  
  const topResult = results[0];
  
  // If it's a FAQ match, return the FAQ answer
  if (topResult.type === 'faq' && topResult.faqAnswer) {
    const answer = language === 'en' ? (topResult.faqAnswerEn || topResult.faqAnswer) : topResult.faqAnswer;
    return answer;
  }
  
  // Return excerpt
  const excerpt = language === 'en' ? (topResult.excerptEn || topResult.excerpt) : topResult.excerpt;
  return excerpt;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query, language = 'it' } = await req.json();

    if (!query || typeof query !== 'string' || query.trim().length < 3) {
      console.error('Invalid query:', query);
      return new Response(
        JSON.stringify({ error: 'Query must be at least 3 characters' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Searching for:', query.substring(0, 100));

    // Detect if this is a price/cost query - always use Perplexity for these
    const normalizedQuery = query.toLowerCase();
    const isPriceQuery = /quanto|costo|prezzo|€|euro|affitto.*medio|media.*affitt|price|cost|how much|rent.*average|average.*rent/i.test(query);
    console.log('Is price query:', isPriceQuery);

    // Step 1: Search local Jungle Rent content first
    const { results: localResults, topScore } = searchLocalContent(query, language);
    console.log('Local search results:', localResults.length, 'Top score:', topScore);

    // Use local content only if:
    // 1. High confidence match (>= 0.8) AND
    // 2. NOT a price query (price queries always go to Perplexity for fresh data)
    if (topScore >= 0.8 && localResults.length > 0 && !isPriceQuery) {
      console.log('Using Jungle Rent content (high confidence, non-price query)');
      
      const answer = generateLocalAnswer(localResults, query, language);
      const articles = localResults.slice(0, 3).map(r => ({
        slug: r.slug,
        title: language === 'en' ? r.titleEn : r.title,
        url: r.url,
      }));
      
      // Generate follow-up questions based on category
      const followUpQuestions = language === 'it' 
        ? [
            "Quali sono i prezzi degli affitti a Torino?",
            "Quali quartieri sono migliori per studenti?",
            "Come funziona il trasporto pubblico a Torino?"
          ]
        : [
            "What are the rental prices in Turin?",
            "Which neighborhoods are best for students?",
            "How does public transport work in Turin?"
          ];

      return new Response(
        JSON.stringify({
          answer,
          source: 'jungle_rent',
          articles,
          citations: articles.map(a => `https://junglerent.it${a.url}`),
          followUpQuestions,
          query,
          language,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 2: Check cache before calling Perplexity
    const queryHash = hashQuery(query, language);
    const cachedResponse = await getCachedResponse(queryHash);
    
    if (cachedResponse) {
      console.log('Returning cached Perplexity response');
      return new Response(
        JSON.stringify({
          ...cachedResponse,
          cached: true,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Step 3: Fall back to Perplexity for external search
    const PERPLEXITY_API_KEY = Deno.env.get('PERPLEXITY_API_KEY');
    if (!PERPLEXITY_API_KEY) {
      console.error('PERPLEXITY_API_KEY is not configured');
      
      // If no API key but we have some local results, return those
      if (localResults.length > 0) {
        const answer = generateLocalAnswer(localResults, query, language);
        return new Response(
          JSON.stringify({
            answer,
            source: 'jungle_rent',
            articles: localResults.slice(0, 3).map(r => ({
              slug: r.slug,
              title: language === 'en' ? r.titleEn : r.title,
              url: r.url,
            })),
            citations: [],
            followUpQuestions: [],
            query,
            language,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'API key not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Using Perplexity API for external search (cache MISS)');

    const systemPrompt = language === 'it' 
      ? `Sei l'assistente AI di Jungle Rent, specializzato in affitti studenteschi e investimenti immobiliari a Torino.
         
         ISTRUZIONI IMPORTANTI:
         - Rispondi sempre in italiano
         - Fornisci informazioni SPECIFICHE e NUMERICHE, non generiche
         
         PER DOMANDE SUI PREZZI/COSTI:
         - Fornisci SEMPRE cifre specifiche in euro (es. "€350-450/mese")
         - Per ogni quartiere, specifica i prezzi per tipo di alloggio:
           * Stanza singola: €XXX-YYY/mese
           * Posto letto in doppia: €XXX-YYY/mese
           * Bilocale: €XXX-YYY/mese
         - Usa dati 2024-2025 da immobiliare.it, idealista.it
         
         QUARTIERI TORINO CON DISTANZE DAL POLITECNICO:
         - Cenisia: a 5 min a piedi dal Politecnico
         - Cit Turin: a 10 min in bici
         - San Paolo: 15 min metro
         - Crocetta: 10 min tram (zona più costosa)
         - San Salvario: 15 min bici (quartiere vivace)
         - Vanchiglia: 20 min bici (vicino UniTo)
         - Aurora: 10 min metro (prezzi più bassi)
         
         FORMATO RISPOSTA:
         - Mantieni le risposte concise ma complete (max 250 parole)
         - Alla fine, aggiungi SEMPRE 3 domande di follow-up nel formato:
         
         ---FOLLOWUP---
         1. [Domanda correlata 1]
         2. [Domanda correlata 2]
         3. [Domanda correlata 3]`
      : `You are Jungle Rent's AI assistant, specializing in student housing and real estate investments in Turin, Italy.
         
         IMPORTANT INSTRUCTIONS:
         - Always respond in English
         - Provide SPECIFIC and NUMERICAL information, not generic answers
         
         FOR PRICE/COST QUESTIONS:
         - ALWAYS provide specific figures in euros (e.g., "€350-450/month")
         - For each neighborhood, specify prices by accommodation type:
           * Single room: €XXX-YYY/month
           * Bed in shared room: €XXX-YYY/month
           * One-bedroom apartment: €XXX-YYY/month
         - Use 2024-2025 data from immobiliare.it, idealista.it
         
         TURIN NEIGHBORHOODS WITH DISTANCES FROM POLITECNICO:
         - Cenisia: 5 min walk from Politecnico
         - Cit Turin: 10 min by bike
         - San Paolo: 15 min by metro
         - Crocetta: 10 min by tram (more expensive area)
         - San Salvario: 15 min by bike (lively neighborhood)
         - Vanchiglia: 20 min by bike (near UniTo)
         - Aurora: 10 min by metro (lower prices)
         
         RESPONSE FORMAT:
         - Keep responses concise but complete (max 250 words)
         - At the end, ALWAYS add 3 follow-up questions in this format:
         
         ---FOLLOWUP---
         1. [Related question 1]
         2. [Related question 2]
         3. [Related question 3]`;

    const response = await fetch('https://api.perplexity.ai/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PERPLEXITY_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'sonar',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query }
        ],
        search_domain_filter: TURIN_DOMAINS,
        temperature: 0.2,
        max_tokens: 500,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Perplexity API error:', response.status, errorText);
      
      // If Perplexity fails but we have local results, return those
      if (localResults.length > 0) {
        const answer = generateLocalAnswer(localResults, query, language);
        return new Response(
          JSON.stringify({
            answer,
            source: 'jungle_rent',
            articles: localResults.slice(0, 3).map(r => ({
              slug: r.slug,
              title: language === 'en' ? r.titleEn : r.title,
              url: r.url,
            })),
            citations: [],
            followUpQuestions: [],
            query,
            language,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'rate_limit', message: 'Too many requests. Please wait a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      return new Response(
        JSON.stringify({ error: 'api_error', message: 'Failed to get AI response' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    console.log('Perplexity response received successfully');

    const rawAnswer = data.choices?.[0]?.message?.content || '';
    const citations = data.citations || [];

    // Parse follow-up questions from response
    let answer = rawAnswer;
    let followUpQuestions: string[] = [];

    if (rawAnswer.includes('---FOLLOWUP---')) {
      const parts = rawAnswer.split('---FOLLOWUP---');
      answer = parts[0].trim();
      
      if (parts[1]) {
        const followUpSection = parts[1].trim();
        const lines: string[] = followUpSection.split('\n').filter((line: string) => line.trim());
        followUpQuestions = lines
          .map((line: string) => line.replace(/^\d+\.\s*/, '').trim())
          .filter((q: string) => q.length > 5)
          .slice(0, 3);
      }
    }

    // Include relevant Jungle Rent articles if we have some matches
    const articles = localResults.length > 0 
      ? localResults.slice(0, 2).map(r => ({
          slug: r.slug,
          title: language === 'en' ? r.titleEn : r.title,
          url: r.url,
        }))
      : [];

    const responseData = {
      answer,
      source: 'perplexity',
      articles,
      citations,
      followUpQuestions,
      query,
      language,
    };

    // Cache the response for future use (7 days)
    await setCacheResponse(queryHash, query, language, responseData);

    return new Response(
      JSON.stringify(responseData),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in perplexity-search:', error);
    return new Response(
      JSON.stringify({ error: 'server_error', message: error instanceof Error ? error.message : 'Unknown error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});