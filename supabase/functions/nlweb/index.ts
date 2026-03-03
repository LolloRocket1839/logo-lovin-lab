// ============================================
// JUNGLE RENT NLWeb SERVER
// Natural Language Web queries — Microsoft NLWeb protocol
// Endpoints: /ask (natural language) + /mcp (also available via mcp-server)
// ============================================

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

// ============================================
// EMBEDDED KNOWLEDGE BASE
// ============================================

const NEIGHBORHOODS = [
  { name: "San Salvario", rent: "€450-550/month", polito: "15 min", unito: "10 min", traits: "Multicultural, nightlife, markets", safety: "Medium-high" },
  { name: "Crocetta", rent: "€500-650/month", polito: "20 min", unito: "15 min", traits: "Elegant, quiet, residential", safety: "High" },
  { name: "Centro", rent: "€550-700/month", polito: "25 min", unito: "5 min", traits: "Historic, monuments, shopping", safety: "High" },
  { name: "Vanchiglia", rent: "€450-550/month", polito: "10 min", unito: "15 min", traits: "Young, trendy, cafés", safety: "Medium-high" },
  { name: "Aurora", rent: "€350-450/month", polito: "15 min", unito: "20 min", traits: "Transforming, affordable", safety: "Medium" },
  { name: "Lingotto", rent: "€400-500/month", polito: "30 min", unito: "20 min", traits: "Modern, Eataly, green", safety: "Medium-high" },
  { name: "San Paolo", rent: "€400-500/month", polito: "25 min", unito: "25 min", traits: "Residential, family, quiet", safety: "High" },
  { name: "Cenisia", rent: "€380-480/month", polito: "10 min", unito: "20 min", traits: "Student-friendly, affordable", safety: "Medium-high" },
];

const ARTICLES = [
  { slug: "dove-vivere-torino-studenti-politecnico", title: "Where to live near Politecnico di Torino", category: "students", keywords: ["polito", "quartieri", "neighborhoods", "where to live"] },
  { slug: "san-salvario-guida-studenti", title: "San Salvario: complete guide for students", category: "students", keywords: ["san salvario", "student neighborhood"] },
  { slug: "dove-mangiare-torino-studenti", title: "Where to eat cheap in Turin", category: "students", keywords: ["dove mangiare", "cheap eats", "budget restaurants"] },
  { slug: "aule-studio-torino-guida-completa", title: "Study spaces in Turin: 30+ free places", category: "students", keywords: ["aule studio", "study spaces", "libraries"] },
  { slug: "palestre-torino-studenti-guida-completa", title: "Gyms in Turin for students", category: "students", keywords: ["palestre", "gym", "fitness"] },
  { slug: "quartieri-sicuri-donne-torino", title: "Safe neighborhoods for women in Turin", category: "students", keywords: ["safe", "sicuri", "donne", "women"] },
  { slug: "valutazione-immobiliare-torino-guida-completa", title: "Property valuation Turin: complete guide", category: "sellers", keywords: ["valutazione", "property valuation"] },
  { slug: "vendere-casa-torino-guida-completa-2025", title: "Selling your house in Turin", category: "sellers", keywords: ["vendere", "sell property"] },
  { slug: "cedolare-secca-2026-investitori", title: "Cedolare secca 2026: tax guide for investors", category: "investors", keywords: ["cedolare secca", "tax", "investment"] },
  { slug: "investire-real-assets-torino-2025", title: "Investing in real assets in Turin", category: "investors", keywords: ["investire", "invest", "real assets"] },
  { slug: "student-housing-italia-savills-2025", title: "Student housing Italy: Savills 2025 report", category: "investors", keywords: ["student housing", "savills", "market"] },
  { slug: "eventi-torino-marzo-2026", title: "Events in Turin March 2026", category: "turisti", keywords: ["eventi", "events", "march", "marzo"] },
  { slug: "eventi-torino-febbraio-2026", title: "Events in Turin February 2026", category: "turisti", keywords: ["eventi", "events", "february", "febbraio"] },
  { slug: "cioccolaterie-torino-guida-completa", title: "Chocolate shops Turin", category: "turisti", keywords: ["cioccolato", "chocolate", "gianduiotto"] },
  { slug: "torino-digital-nomads-guide", title: "Turin for digital nomads", category: "turisti", keywords: ["digital nomad", "remote work", "coworking"] },
  { slug: "torino-nightlife-guide", title: "Turin nightlife guide", category: "turisti", keywords: ["nightlife", "vita notturna", "bars"] },
  { slug: "mobilita-sostenibile-torino-studenti", title: "Sustainable mobility in Turin", category: "students", keywords: ["mobilità", "transport", "GTT", "bus"] },
  { slug: "politecnico-torino-guida-completa", title: "Politecnico di Torino: complete guide", category: "students", keywords: ["politecnico", "engineering"] },
  { slug: "universita-torino-guida-completa", title: "University of Turin: complete guide", category: "students", keywords: ["unito", "university"] },
  { slug: "torino-citta-7-minuti-walkability", title: "Turin: 3rd most walkable city in the world", category: "societa", keywords: ["walkability", "camminabilità", "7 minuti"] },
  { slug: "mutui-investitori-immobiliari-guida-completa", title: "Mortgages for real estate investors", category: "investors", keywords: ["mutui", "mortgage", "financing"] },
  { slug: "props-gestione-immobiliare-semplificata", title: "Props: property management app", category: "investors", keywords: ["props", "property management", "app"] },
];

const FAQS: Record<string, string> = {
  "cost|quanto costa|rent|affitto|stanza|room": "Student rooms in Turin cost €350-550/month in popular areas (San Salvario, Cenisia, Vanchiglia). Crocetta is premium at €500-700/month. Budget areas like Aurora start from €350/month.",
  "invest|investire|investment|rendimento": "Jungle Rent offers real estate investment from €100 with target returns of 7-9% annually. We acquire properties near Turin universities and manage them for student/tourist rentals.",
  "sell|vendere|valutazione|valuation": "Jungle Rent buys properties directly — zero commission, free valuation in 24h, offer in 48h, closing in 60-90 days. Use our free calculator: junglerent.it/valutazione-immobile",
  "polito|politecnico": "Best neighborhoods near Politecnico di Torino: Cenisia (10 min, €380-480), Vanchiglia (10 min, €450-550), San Salvario (15 min, €450-550), Crocetta (20 min, €500-650).",
  "unito|università di torino": "Best neighborhoods near UniTo: Centro (5 min, €550-700), San Salvario (10 min, €450-550), Vanchiglia (15 min, €450-550).",
  "safe|sicur|women|donne": "Safest neighborhoods in Turin: Crocetta, Centro, San Paolo (all rated 'High'). San Salvario and Vanchiglia are rated 'Medium-high'. Read our guide: junglerent.it/blog/quartieri-sicuri-donne-torino",
  "budget|spendere|costo vita|cost of living": "Monthly student budget in Turin: Rent €350-550 + Groceries €150-250 + Transport €25 (GTT under 26) + Utilities €50-80 + Extras €100-150 = Total €675-1,050/month.",
  "transport|gtt|metro|bus|tram": "GTT monthly pass: €25 (under 26) or €38 (standard). Annual: €258. Turin has 1 metro line, 8 tram routes, 100+ bus lines. Night bus runs Fri-Sat.",
  "study|studiare|aule|library": "30+ study spaces in Turin: EDISU halls (free, some 24h), Biblioteca Nazionale, civic libraries, coworking spaces, cafés. Interactive map: junglerent.it/strumenti/aule-studio-torino",
  "eat|mangiare|cheap|economico|food": "Budget eating in Turin: €3-5 for street food, €5-8 for piole (traditional restaurants), €8-12 for full meals. Guide: junglerent.it/strumenti/dove-mangiare-torino",
  "event|evento|cosa fare|what to do": "March 2026: Shiota at GAM (immersive art), Futurismo at Mole, Subsonica 30th anniversary concert. Guide: junglerent.it/blog/eventi-torino-marzo-2026",
  "walkab|camminab|7 minut": "Turin is the 3rd most walkable city globally (7 min average to essential services), ahead of Paris and Vienna. 18 km of porticos, compact grid layout.",
  "who|chi è|about|jungle rent": "Jungle Rent S.r.l. is a certified innovative startup (P.IVA 13333450016) founded Oct 2025, incubated at 2i3T (University of Turin). Dual mission: student housing + democratizing real estate investment.",
};

// ============================================
// QUERY PROCESSING
// ============================================

interface NLWebResult {
  "@context": string;
  "@type": string;
  name: string;
  description: string;
  url: string;
  provider?: { "@type": string; name: string; url: string };
  mainEntity?: object;
}

function findRelevantArticles(query: string): { slug: string; title: string; url: string }[] {
  const q = query.toLowerCase();
  const scored = ARTICLES.map(a => {
    let score = 0;
    const haystack = `${a.title} ${a.keywords.join(" ")} ${a.slug}`.toLowerCase();
    const words = q.split(/\s+/).filter(w => w.length > 2);
    for (const w of words) {
      if (haystack.includes(w)) score += 2;
    }
    for (const kw of a.keywords) {
      if (q.includes(kw.toLowerCase())) score += 5;
    }
    return { ...a, score };
  }).filter(a => a.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);

  return scored.map(a => ({ slug: a.slug, title: a.title, url: `https://junglerent.it/blog/${a.slug}` }));
}

function findRelevantNeighborhoods(query: string) {
  const q = query.toLowerCase();
  return NEIGHBORHOODS.filter(n => {
    const haystack = `${n.name} ${n.traits}`.toLowerCase();
    return q.split(/\s+/).some(w => w.length > 2 && haystack.includes(w));
  });
}

function findBestFaqAnswer(query: string): string | null {
  const q = query.toLowerCase();
  let bestMatch: string | null = null;
  let bestScore = 0;

  for (const [pattern, answer] of Object.entries(FAQS)) {
    const keywords = pattern.split("|");
    let score = 0;
    for (const kw of keywords) {
      if (q.includes(kw.toLowerCase())) score += 3;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = answer;
    }
  }
  return bestScore >= 3 ? bestMatch : null;
}

function processQuery(query: string, language: string): { answer: string; results: NLWebResult[]; relatedArticles: { slug: string; title: string; url: string }[] } {
  const faqAnswer = findBestFaqAnswer(query);
  const articles = findRelevantArticles(query);
  const neighborhoods = findRelevantNeighborhoods(query);

  // Build Schema.org results
  const results: NLWebResult[] = [];

  // Add matching neighborhoods as Place results
  for (const n of neighborhoods.slice(0, 3)) {
    results.push({
      "@context": "https://schema.org",
      "@type": "Place",
      name: `${n.name}, Turin`,
      description: `${n.traits}. Rent: ${n.rent}. Safety: ${n.safety}. Distance to Politecnico: ${n.polito}, UniTo: ${n.unito}.`,
      url: `https://junglerent.it/quartieri/${n.name.toLowerCase().replace(/\s+/g, '-')}`,
      provider: { "@type": "Organization", name: "Jungle Rent", url: "https://junglerent.it" },
    });
  }

  // Add matching articles as Article results
  for (const a of articles.slice(0, 3)) {
    results.push({
      "@context": "https://schema.org",
      "@type": "Article",
      name: a.title,
      description: a.title,
      url: a.url,
      provider: { "@type": "Organization", name: "Jungle Rent", url: "https://junglerent.it" },
    });
  }

  // Compose answer
  let answer = "";
  if (faqAnswer) {
    answer = faqAnswer;
  } else if (neighborhoods.length > 0) {
    answer = neighborhoods.map(n => `**${n.name}**: ${n.rent} — ${n.traits}. Safety: ${n.safety}.`).join("\n");
  } else if (articles.length > 0) {
    answer = `Here are relevant guides from Jungle Rent:\n${articles.map(a => `- [${a.title}](${a.url})`).join("\n")}`;
  } else {
    answer = language === "it"
      ? "Non ho trovato informazioni specifiche. Visita junglerent.it per esplorare i nostri servizi o contattaci a junglerententeprise@gmail.com."
      : "I couldn't find specific information. Visit junglerent.it to explore our services or contact us at junglerententeprise@gmail.com.";
  }

  return { answer, results, relatedArticles: articles };
}

// ============================================
// RATE LIMITING
// ============================================

const ipRequests = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 30; // requests per minute
const RATE_WINDOW = 60_000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = ipRequests.get(ip);
  if (!record || now > record.resetAt) {
    ipRequests.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  record.count++;
  return record.count <= RATE_LIMIT;
}

// ============================================
// MAIN HANDLER
// ============================================

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
  if (!checkRateLimit(ip)) {
    return new Response(JSON.stringify({ error: 'rate_limit', message: 'Too many requests. Please try again later.' }), {
      status: 429,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }

  try {
    const url = new URL(req.url);
    // Edge function is mounted at /nlweb, so strip that prefix
    const rawPath = url.pathname;
    const path = rawPath.replace(/^\/nlweb/, '').replace(/\/+$/, '') || '/';

    // Check for action=info query param (since Supabase routes all subpaths to root)
    const action = url.searchParams.get('action');
    
    // GET ?action=info — NLWeb service description
    if (action === 'info' || path === '/info') {
      return new Response(JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebAPI",
        name: "Jungle Rent NLWeb",
        description: "Natural language query endpoint for Turin student housing, real estate investment, and city life information. Powered by Microsoft NLWeb protocol.",
        version: "1.0.0",
        provider: { "@type": "Organization", name: "Jungle Rent S.r.l.", url: "https://junglerent.it" },
        documentation: "https://junglerent.it/llms.txt",
        endpoints: {
          ask: "https://ekrrrlrwdshhlqnuxjbz.supabase.co/functions/v1/nlweb?q={query}&lang={language}",
          info: "https://ekrrrlrwdshhlqnuxjbz.supabase.co/functions/v1/nlweb?action=info",
          mcp: "https://ekrrrlrwdshhlqnuxjbz.supabase.co/functions/v1/mcp-server",
        },
        topics: [
          "Student housing in Turin",
          "Rent prices by neighborhood",
          "Real estate investment from €100",
          "Property valuation",
          "Turin events and culture",
          "Study spaces and student services",
          "Transport and mobility",
          "Safety information",
        ],
        supportedLanguages: ["en", "it"],
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // GET ?q=... or POST { query: "..." } — Ask endpoint
      let query = '';
      let language = 'en';

      if (req.method === 'GET') {
        query = url.searchParams.get('q') || url.searchParams.get('query') || '';
        language = url.searchParams.get('lang') || 'en';
      } else if (req.method === 'POST') {
        const body = await req.json();
        query = body.query || body.q || '';
        language = body.language || body.lang || 'en';
      }

      if (!query || query.trim().length < 2) {
        return new Response(JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SearchAction",
          name: "Jungle Rent NLWeb",
          description: "Ask questions about student housing, real estate investment, and living in Turin, Italy.",
          target: {
            "@type": "EntryPoint",
            urlTemplate: "https://ekrrrlrwdshhlqnuxjbz.supabase.co/functions/v1/nlweb?q={query}&lang={language}",
          },
          provider: { "@type": "Organization", name: "Jungle Rent", url: "https://junglerent.it" },
          documentation: "https://junglerent.it/llms.txt",
          examples: [
            "How much does it cost to rent a room in Turin?",
            "Best neighborhoods near Politecnico di Torino",
            "What events are happening in Turin in March 2026?",
            "Is Turin safe for women students?",
            "How to invest in real estate in Turin from €100",
          ],
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }

      // Sanitize
      const sanitized = query.trim().slice(0, 500).replace(/<[^>]*>/g, '');
      const { answer, results, relatedArticles } = processQuery(sanitized, language);

      return new Response(JSON.stringify({
        "@context": "https://schema.org",
        "@type": "SearchResultsPage",
        query: sanitized,
        language,
        answer,
        results,
        relatedArticles,
        provider: {
          "@type": "Organization",
          name: "Jungle Rent",
          url: "https://junglerent.it",
        },
        potentialAction: {
          "@type": "SearchAction",
          target: "https://ekrrrlrwdshhlqnuxjbz.supabase.co/functions/v1/nlweb?q={query}",
        },
        mcpEndpoint: "https://ekrrrlrwdshhlqnuxjbz.supabase.co/functions/v1/mcp-server",
        documentation: "https://junglerent.it/llms.txt",
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
  } catch (err) {
    console.error('NLWeb error:', err);
    return new Response(JSON.stringify({ error: 'internal_error', message: 'An error occurred processing your request.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
