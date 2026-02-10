import { Hono } from "https://deno.land/x/hono@v4.3.11/mod.ts";
import { McpServer, StreamableHttpTransport } from "npm:mcp-lite@^0.10.0";

// ============================================
// JUNGLE RENT MCP SERVER
// Model Context Protocol server for AI agents
// ============================================

const app = new Hono();

const mcpServer = new McpServer({
  name: "jungle-rent",
  version: "1.0.0",
});

// ============================================
// EMBEDDED DATA
// ============================================

const COMPANY_INFO = {
  name: "Jungle Rent S.r.l.",
  type: "Start-up Innovativa S.r.l.",
  piva: "13333450016",
  rea: "TO-1355899",
  founded: "2025-10-24",
  address: "Via Gioacchino Quarello 15/A, 10137 Torino (TO), Italy",
  incubator: "2i3T - Incubatore Imprese Innovative Università di Torino",
  website: "https://junglerent.it",
  email: "junglerententeprise@gmail.com",
  pec: "junglerent@legalmail.it",
  founders: [
    { name: "Lorenzo Oni-Joseph", role: "Founder", phone: "+39 331 905 3037" },
    { name: "Andrea Niccolaini", role: "Co-Founder", phone: "+39 351 577 8924" },
  ],
  services: [
    "Student Housing Management (90,000+ students, 7 universities)",
    "Real Estate Investment (from €100)",
    "Property Acquisition in university districts",
    "Short-Term Rental Optimization (Airbnb, Booking.com)",
    "Props: Property management app for landlords (Q1 2026)",
  ],
  minimumInvestment: 100,
  targetReturn: "7-9% annually",
  studentsServed: "90,000+",
  universitiesCount: 7,
};

const ARTICLES = [
  { slug: "torino-citta-7-minuti-walkability", category: "societa", date: "2026-02-02", readTime: 12, title_it: "Torino è la 3ª città più camminabile al mondo: tutto a 7 minuti", title_en: "Turin: the 3rd most walkable city in the world", keywords: ["torino walkability", "15 minute city", "camminabilità"] },
  { slug: "cedolare-secca-2026-investitori", category: "investors", date: "2026-01-17", readTime: 15, title_it: "Cedolare secca 2026: dal 21% al 26%, cosa fare ora", title_en: "Cedolare secca 2026: from 21% to 26%, what to do now", keywords: ["cedolare secca", "tasse affitto", "flat tax rental"] },
  { slug: "sciopero-trasporti-italia-gennaio-2026", category: "societa", date: "2026-01-09", readTime: 25, title_it: "Sciopero trasporti 13-15 gennaio 2026: orari e alternative", title_en: "Italy transport strike Jan 13-15, 2026: schedules & tips", keywords: ["sciopero trasporti", "transport strike", "treni"] },
  { slug: "props-gestione-immobiliare-semplificata", category: "investors", date: "2025-12-31", readTime: 12, title_it: "Props: gestione immobiliare semplificata per investitori", title_en: "Props: simplified real estate management for investors", keywords: ["props", "gestione immobiliare", "property management"] },
  { slug: "palestre-torino-studenti-guida-completa", category: "students", date: "2026-01-01", readTime: 14, title_it: "Palestre Torino studenti: 24 strutture da €10/mese", title_en: "Turin gyms for students: 24 facilities from €10/month", keywords: ["palestre torino", "gym students", "fitness"] },
  { slug: "eventi-torino-marzo-2026", category: "turisti", date: "2026-02-10", readTime: 18, title_it: "Eventi Torino marzo 2026: cosa fare", title_en: "Turin events March 2026: what to do", keywords: ["eventi torino", "turin events", "marzo 2026"] },
  { slug: "eventi-torino-febbraio-2026", category: "turisti", date: "2026-01-15", readTime: 20, title_it: "Eventi Torino febbraio 2026: CioccolaTò, Macbeth e Carnevale", title_en: "Turin events February 2026: CioccolaTò, Macbeth & Carnival", keywords: ["eventi torino", "cioccolato", "carnevale ivrea"] },
  { slug: "eventi-torino-gennaio-2026", category: "turisti", date: "2025-12-28", readTime: 22, title_it: "Eventi Torino gennaio 2026: Luci d'Artista e concerti", title_en: "Turin events January 2026: Festival of Lights and concerts", keywords: ["eventi torino", "luci artista", "january events"] },
  { slug: "quartieri-sicuri-donne-torino", category: "students", date: "2025-12-20", readTime: 15, title_it: "Quartieri sicuri per donne a Torino: guida completa", title_en: "Safe neighborhoods for women in Turin: complete guide", keywords: ["quartieri sicuri", "sicurezza donne", "safe neighborhoods"] },
  { slug: "student-housing-italia-savills-2025", category: "investors", date: "2025-12-15", readTime: 18, title_it: "Student housing Italia: analisi report Savills 2025", title_en: "Student housing Italy: Savills 2025 report analysis", keywords: ["student housing", "savills", "mercato immobiliare"] },
  { slug: "torino-digital-nomads-guide", category: "turisti", date: "2025-12-10", readTime: 20, title_it: "Torino per digital nomad: guida completa", title_en: "Turin for digital nomads: complete guide", keywords: ["digital nomad", "remote work", "coworking torino"] },
  { slug: "torino-nightlife-guide", category: "turisti", date: "2025-12-05", readTime: 16, title_it: "Vita notturna Torino: guida completa", title_en: "Turin nightlife: complete guide", keywords: ["nightlife torino", "vita notturna", "bars clubs"] },
  { slug: "aule-studio-torino-guida-completa", category: "students", date: "2025-11-28", readTime: 18, title_it: "Aule studio Torino: 30+ spazi dove studiare gratis", title_en: "Study spaces in Turin: 30+ free places to study", keywords: ["aule studio", "study spaces", "biblioteche torino"] },
  { slug: "guida-volontariato-torino", category: "students", date: "2025-11-20", readTime: 14, title_it: "Volontariato Torino: 23 organizzazioni per studenti", title_en: "Volunteering in Turin: 23 organizations for students", keywords: ["volontariato", "volunteering", "associazioni torino"] },
  { slug: "dove-vivere-torino-studenti-politecnico", category: "students", date: "2025-11-15", readTime: 16, title_it: "Dove vivere a Torino per studenti del Politecnico", title_en: "Where to live in Turin for Politecnico students", keywords: ["dove vivere", "politecnico", "quartieri studenti"] },
  { slug: "san-salvario-guida-studenti", category: "students", date: "2025-11-10", readTime: 14, title_it: "San Salvario: guida completa per studenti", title_en: "San Salvario: complete guide for students", keywords: ["san salvario", "quartiere studenti", "student neighborhood"] },
  { slug: "dove-mangiare-torino-studenti", category: "students", date: "2025-11-05", readTime: 12, title_it: "Dove mangiare a Torino per studenti: 20+ locali economici", title_en: "Where to eat in Turin for students: 20+ budget restaurants", keywords: ["dove mangiare", "ristoranti economici", "cheap eats"] },
  { slug: "investire-real-assets-torino-2025", category: "investors", date: "2025-11-01", readTime: 20, title_it: "Investire in real assets a Torino nel 2025", title_en: "Investing in real assets in Turin in 2025", keywords: ["investire", "real assets", "immobiliare torino"] },
  { slug: "vendere-casa-torino-guida-completa-2025", category: "sellers", date: "2025-10-28", readTime: 18, title_it: "Vendere casa a Torino: guida completa 2025", title_en: "Selling your house in Turin: complete guide 2025", keywords: ["vendere casa", "sell property", "immobiliare"] },
  { slug: "valutazione-immobiliare-torino-guida-completa", category: "sellers", date: "2025-10-25", readTime: 16, title_it: "Valutazione immobiliare Torino: guida completa", title_en: "Property valuation Turin: complete guide", keywords: ["valutazione immobiliare", "property valuation", "OMI"] },
  { slug: "mutui-investitori-immobiliari-guida-completa", category: "investors", date: "2025-10-20", readTime: 18, title_it: "Mutui per investitori immobiliari: guida completa", title_en: "Mortgages for real estate investors: complete guide", keywords: ["mutui", "mortgage", "finanziamento immobiliare"] },
  { slug: "politecnico-torino-guida-completa", category: "students", date: "2025-10-15", readTime: 20, title_it: "Politecnico di Torino: guida completa", title_en: "Politecnico di Torino: complete guide", keywords: ["politecnico", "ingegneria", "engineering"] },
  { slug: "universita-torino-guida-completa", category: "students", date: "2025-10-10", readTime: 18, title_it: "Università di Torino: guida completa", title_en: "University of Turin: complete guide", keywords: ["unito", "università torino", "university"] },
  { slug: "mobilita-sostenibile-torino-studenti", category: "students", date: "2025-10-05", readTime: 14, title_it: "Mobilità sostenibile a Torino per studenti", title_en: "Sustainable mobility in Turin for students", keywords: ["mobilità sostenibile", "trasporti", "GTT"] },
  { slug: "raccolta-differenziata-torino-guida", category: "societa", date: "2025-10-01", readTime: 10, title_it: "Raccolta differenziata a Torino: guida", title_en: "Waste sorting in Turin: guide", keywords: ["raccolta differenziata", "rifiuti", "waste sorting"] },
  { slug: "cioccolaterie-torino-guida-completa", category: "turisti", date: "2025-11-25", readTime: 14, title_it: "Cioccolaterie Torino: guida completa", title_en: "Chocolate shops Turin: complete guide", keywords: ["cioccolato", "chocolate", "gianduiotto"] },
  { slug: "tajarin-piemontesi-guida-completa", category: "turisti", date: "2025-11-18", readTime: 12, title_it: "Tajarin piemontesi: guida completa", title_en: "Piedmontese tajarin: complete guide", keywords: ["tajarin", "pasta piemontese", "cucina"] },
  { slug: "migliori-gelaterie-torino-studenti", category: "turisti", date: "2025-11-12", readTime: 10, title_it: "Migliori gelaterie di Torino per studenti", title_en: "Best gelato shops in Turin for students", keywords: ["gelaterie", "gelato", "ice cream"] },
  { slug: "mercati-storici-torino-chiusure", category: "turisti", date: "2025-11-08", readTime: 12, title_it: "Mercati storici di Torino: orari e chiusure", title_en: "Turin historic markets: hours and closings", keywords: ["mercati", "markets", "porta palazzo"] },
  { slug: "viaggiare-sostenibile-torino-guida", category: "turisti", date: "2025-10-22", readTime: 12, title_it: "Viaggiare sostenibile a Torino: guida", title_en: "Sustainable travel in Turin: guide", keywords: ["viaggiare sostenibile", "turismo green", "sustainable travel"] },
  { slug: "cicloturismo-avanzato-torino", category: "turisti", date: "2025-10-18", readTime: 16, title_it: "Cicloturismo avanzato a Torino", title_en: "Advanced cycling tourism in Turin", keywords: ["cicloturismo", "bicicletta", "cycling"] },
  { slug: "torino-ogni-stagione-turisti", category: "turisti", date: "2025-10-12", readTime: 14, title_it: "Torino in ogni stagione: guida per turisti", title_en: "Turin every season: tourist guide", keywords: ["torino stagioni", "turismo", "seasons"] },
  { slug: "torino-dicembre-turisti", category: "turisti", date: "2025-11-30", readTime: 16, title_it: "Torino a dicembre: guida per turisti", title_en: "Turin in December: tourist guide", keywords: ["torino dicembre", "natale", "christmas"] },
  { slug: "torino-novembre-turisti", category: "turisti", date: "2025-10-30", readTime: 14, title_it: "Torino a novembre: guida per turisti", title_en: "Turin in November: tourist guide", keywords: ["torino novembre", "autunno", "autumn"] },
  { slug: "carnevale-ivrea-battaglia-arance-2025", category: "turisti", date: "2025-12-18", readTime: 14, title_it: "Carnevale di Ivrea: la Battaglia delle Arance", title_en: "Ivrea Carnival: the Battle of the Oranges", keywords: ["carnevale ivrea", "battaglia arance", "orange battle"] },
  { slug: "panettoni-pandori-torino-guida-2025", category: "turisti", date: "2025-12-08", readTime: 10, title_it: "Panettoni e pandori a Torino: guida 2025", title_en: "Panettone and pandoro in Turin: 2025 guide", keywords: ["panettone", "pandoro", "natale torino"] },
  { slug: "emergenze-affitti-torino-diritti-inquilini", category: "students", date: "2025-12-12", readTime: 16, title_it: "Emergenze affitti Torino: diritti degli inquilini", title_en: "Rental emergencies Turin: tenant rights", keywords: ["diritti inquilini", "emergenze affitti", "tenant rights"] },
  { slug: "jungle-control-dicembre-2025", category: "societa", date: "2025-12-31", readTime: 8, title_it: "Jungle Control dicembre 2025", title_en: "Jungle Control December 2025", keywords: ["jungle control", "aggiornamento", "company update"] },
];

const NEIGHBORHOODS = [
  { name: "San Salvario", avgRent: "€450-550/month", distance_polito: "15 min", distance_unito: "10 min", characteristics: ["Multicultural", "Nightlife", "Local markets"], transport: "Metro + Bus 18, 35", safety: "Medium-high", description: "Vibrant multicultural neighborhood, close to Valentino Park. Best for nightlife and students." },
  { name: "Crocetta", avgRent: "€500-650/month", distance_polito: "20 min", distance_unito: "15 min", characteristics: ["Elegant", "Quiet", "Residential"], transport: "Tram 13, 15 + Bus", safety: "High", description: "Elegant residential area, ideal for those seeking tranquility. Premium pricing." },
  { name: "Centro", avgRent: "€550-700/month", distance_polito: "25 min", distance_unito: "5 min", characteristics: ["Historic", "Monuments", "Shopping"], transport: "Metro + All transport", safety: "High", description: "Heart of Turin with monuments, museums and shopping. Highest rents but maximum centrality." },
  { name: "Vanchiglia", avgRent: "€450-550/month", distance_polito: "10 min", distance_unito: "15 min", characteristics: ["Young", "Trendy", "Cafés"], transport: "Bus 68, 55", safety: "Medium-high", description: "Young and trendy neighborhood with many bars and cafés. Close to Politecnico." },
  { name: "Aurora", avgRent: "€350-450/month", distance_polito: "15 min", distance_unito: "20 min", characteristics: ["Transforming", "Affordable", "Multiethnic"], transport: "Tram 3, 9 + Metro", safety: "Medium", description: "Neighborhood undergoing major transformation. Cheapest rents, well connected." },
  { name: "Lingotto", avgRent: "€400-500/month", distance_polito: "30 min", distance_unito: "20 min", characteristics: ["Modern", "Green spaces", "Eataly"], transport: "Metro + Bus 35", safety: "Medium-high", description: "Modern area with Eataly, green spaces and contemporary architecture. Direct metro." },
  { name: "San Paolo", avgRent: "€400-500/month", distance_polito: "25 min", distance_unito: "25 min", characteristics: ["Residential", "Family", "Quiet"], transport: "Tram 4 + Bus", safety: "High", description: "Quiet residential area, ideal for studying. Less nightlife but cheaper and safer." },
  { name: "Cenisia", avgRent: "€380-480/month", distance_polito: "10 min", distance_unito: "20 min", characteristics: ["Student-friendly", "Affordable", "Well-connected"], transport: "Tram 3 + Bus", safety: "Medium-high", description: "Popular with Politecnico students. Good balance of price and location." },
];

const RENT_PRICES = [
  // Central
  { zone: "Centro Storico", category: "central", min: 3500, avg: 4065, max: 4600, variation: "+1.5%" },
  { zone: "Piazza San Carlo", category: "central", min: 4200, avg: 4560, max: 4900, variation: "+2.0%" },
  { zone: "Piazza Vittorio", category: "central", min: 3300, avg: 3620, max: 3900, variation: "+1.2%" },
  { zone: "Piazza Statuto", category: "central", min: 2700, avg: 3000, max: 3300, variation: "+1.5%" },
  { zone: "Crocetta", category: "central", min: 2700, avg: 2995, max: 3300, variation: "+3.5%" },
  { zone: "San Secondo", category: "central", min: 2700, avg: 2995, max: 3300, variation: "+3.5%" },
  { zone: "San Salvario", category: "central", min: 2400, avg: 2731, max: 3100, variation: "+8.46%" },
  { zone: "Vanchiglia", category: "central", min: 2400, avg: 2680, max: 2950, variation: "+3.0%" },
  { zone: "Vanchiglietta", category: "central", min: 2000, avg: 2250, max: 2500, variation: "+2.3%" },
  // Semicentral
  { zone: "Cit Turin", category: "semicentral", min: 2200, avg: 2501, max: 2800, variation: "+4.3%" },
  { zone: "San Donato", category: "semicentral", min: 2200, avg: 2501, max: 2800, variation: "+4.3%" },
  { zone: "Campidoglio", category: "semicentral", min: 2200, avg: 2501, max: 2800, variation: "+4.0%" },
  { zone: "Cenisia", category: "semicentral", min: 1700, avg: 1950, max: 2200, variation: "+3.5%" },
  { zone: "San Paolo", category: "semicentral", min: 1700, avg: 1950, max: 2200, variation: "+3.0%" },
  { zone: "Pozzo Strada", category: "semicentral", min: 1650, avg: 1900, max: 2150, variation: "+5.0%" },
  { zone: "Parella", category: "semicentral", min: 1600, avg: 1825, max: 2050, variation: "+5.5%" },
  { zone: "Aeronautica", category: "semicentral", min: 1600, avg: 1825, max: 2050, variation: "+5.5%" },
  { zone: "Santa Rita", category: "semicentral", min: 1500, avg: 1700, max: 1900, variation: "+7.8%" },
  { zone: "Mirafiori Nord", category: "semicentral", min: 1500, avg: 1700, max: 1900, variation: "+7.8%" },
  { zone: "Lingotto", category: "semicentral", min: 1450, avg: 1650, max: 1850, variation: "+7.8%" },
  { zone: "Nizza Millefonti", category: "semicentral", min: 1450, avg: 1650, max: 1850, variation: "+7.8%" },
  // Peripheral North
  { zone: "Aurora", category: "peripheral_north", min: 1300, avg: 1520, max: 1750, variation: "+7.0%" },
  { zone: "Borgo Valdocco", category: "peripheral_north", min: 1300, avg: 1520, max: 1750, variation: "+7.0%" },
  { zone: "Madonna di Campagna", category: "peripheral_north", min: 1200, avg: 1350, max: 1500, variation: "+3.0%" },
  { zone: "Borgo Vittoria", category: "peripheral_north", min: 1150, avg: 1300, max: 1450, variation: "+4.0%" },
  { zone: "Lucento", category: "peripheral_north", min: 1150, avg: 1300, max: 1450, variation: "+4.0%" },
  { zone: "Rebaudengo", category: "peripheral_north", min: 1100, avg: 1250, max: 1400, variation: "+2.0%" },
  { zone: "Falchera", category: "peripheral_north", min: 1000, avg: 1150, max: 1300, variation: "+3.5%" },
  { zone: "Villaretto", category: "peripheral_north", min: 1000, avg: 1150, max: 1300, variation: "+3.5%" },
  { zone: "Barriera di Milano", category: "peripheral_north", min: 900, avg: 1080, max: 1250, variation: "+5.4%" },
  // Peripheral South
  { zone: "Mirafiori Sud", category: "peripheral_south", min: 1200, avg: 1350, max: 1500, variation: "+3.5%" },
  { zone: "Barca", category: "peripheral_south", min: 1100, avg: 1232, max: 1350, variation: "+2.0%" },
  { zone: "Bertolla", category: "peripheral_south", min: 1100, avg: 1232, max: 1350, variation: "+2.0%" },
  { zone: "Vallette", category: "peripheral_south", min: 1050, avg: 1200, max: 1350, variation: "+3.5%" },
  // Hill
  { zone: "Crimea", category: "hill", min: 2650, avg: 2950, max: 3300, variation: "+2.4%" },
  { zone: "Gran Madre", category: "hill", min: 2650, avg: 2950, max: 3300, variation: "+2.4%" },
  { zone: "Borgo Po", category: "hill", min: 2650, avg: 2950, max: 3300, variation: "+2.4%" },
  { zone: "Cavoretto", category: "hill", min: 2100, avg: 2310, max: 2500, variation: "+2.7%" },
];

const FAQS = [
  { category: "investors", q_it: "Quanto posso investire con Jungle Rent?", q_en: "How much can I invest with Jungle Rent?", a_it: "L'investimento minimo è di €100. Non c'è un massimo, consigliamo di diversificare su più immobili.", a_en: "The minimum investment is €100. There's no maximum, but we recommend diversifying across multiple properties." },
  { category: "investors", q_it: "Quali sono i rendimenti attesi?", q_en: "What are the expected returns?", a_it: "Il rendimento target è del 7-9% annuo, derivante da affitti studenteschi a Torino con occupancy rate del 95%.", a_en: "The target return is 7-9% annually, from student rentals in Turin with a 95% occupancy rate." },
  { category: "investors", q_it: "Jungle Rent è un investimento sicuro?", q_en: "Is Jungle Rent a safe investment?", a_it: "Jungle Rent è una startup innovativa certificata, incubata presso 2i3T. I rendimenti dipendono dal mercato e non sono garantiti.", a_en: "Jungle Rent is a certified innovative startup incubated at 2i3T. Returns depend on market performance and are not guaranteed." },
  { category: "sellers", q_it: "Come posso vendere casa a Torino senza agenzia?", q_en: "How can I sell my house in Turin without an agency?", a_it: "Jungle Rent acquista direttamente il tuo immobile senza commissioni. Valutazione gratuita in 24 ore, offerta in 48 ore, chiusura in 60-90 giorni.", a_en: "Jungle Rent directly purchases your property with no fees. Free valuation in 24 hours, offer in 48 hours, closing in 60-90 days." },
  { category: "sellers", q_it: "Quanto vale la mia casa a Torino?", q_en: "How much is my property worth in Turin?", a_it: "Usa il nostro calcolatore gratuito basato su dati OMI 2025: junglerent.it/valutazione-immobile. Precisione ±5%.", a_en: "Use our free calculator based on OMI 2025 data: junglerent.it/valutazione-immobile. Accuracy ±5%." },
  { category: "students", q_it: "Quanto costa affittare una stanza a Torino?", q_en: "How much does it cost to rent a room in Turin?", a_it: "€350-550/mese nelle zone studentesche (San Salvario, Cenisia, Vanchiglia). Crocetta è più cara: €500-700/mese.", a_en: "€350-550/month in student areas (San Salvario, Cenisia, Vanchiglia). Crocetta is more expensive: €500-700/month." },
  { category: "students", q_it: "Qual è il quartiere migliore per studenti a Torino?", q_en: "What is the best neighborhood for students in Turin?", a_it: "Dipende dall'università: Crocetta e Cenisia per il Politecnico, San Salvario e Vanchiglia per UniTo. Aurora per chi ha budget ridotto.", a_en: "Depends on the university: Crocetta and Cenisia for Politecnico, San Salvario and Vanchiglia for UniTo. Aurora for tight budgets." },
  { category: "about", q_it: "Chi è Jungle Rent?", q_en: "Who is Jungle Rent?", a_it: "Startup innovativa torinese fondata nel 2025, incubata presso 2i3T. Investimenti immobiliari frazionati e acquisizione immobili per affitti studenteschi.", a_en: "Turin innovative startup founded in 2025, incubated at 2i3T. Fractional real estate investments and property acquisition for student rentals." },
  { category: "about", q_it: "Jungle Rent è affidabile?", q_en: "Is Jungle Rent reliable?", a_it: "Sì: registrata alla Camera di Commercio di Torino, P.IVA 13333450016, certificata Start-up Innovativa, incubata presso 2i3T (Università di Torino).", a_en: "Yes: registered at Turin Chamber of Commerce, P.IVA 13333450016, certified Innovative Startup, incubated at 2i3T (University of Turin)." },
];

const EVENTS_FEB_2026 = [
  { name: "CioccolaTò", dates: "Feb 13-17, 2026", location: "Piazza Vittorio Veneto", price: "Free entry", description: "60+ artisan chocolatiers, tastings, workshops" },
  { name: "Macbeth - Teatro Regio", dates: "Feb 20 - Mar 7, 2026", location: "Teatro Regio di Torino", price: "€50-230", description: "Conducted by Riccardo Muti" },
  { name: "Battle of the Oranges", dates: "Feb 15, 2026", location: "Ivrea", price: "€15", description: "UNESCO Heritage since 2023, historic carnival tradition" },
  { name: "Final Eight Basketball", dates: "Feb 18-22, 2026", location: "Inalpi Arena", price: "From €15", description: "Italian basketball cup final tournament" },
  { name: "Candlelight Ennio Morricone", dates: "Feb 26, 2026", location: "Palazzo della Luce", price: "From €30", description: "Tribute concert by candlelight" },
];

const EVENTS_MAR_2026 = [
  { name: "Macbeth - Teatro Regio (cont.)", dates: "Until Mar 7, 2026", location: "Teatro Regio", price: "€50-230", description: "Final performances" },
  { name: "Torino Jazz Festival Preview", dates: "Mar 2026", location: "Various venues", price: "Varies", description: "Preview events for the annual jazz festival" },
];

// ============================================
// MCP TOOLS
// ============================================

mcpServer.tool("search_articles", {
  description: "Search Jungle Rent blog articles by keyword, category (students, investors, sellers, turisti, societa), or language (it/en).",
  inputSchema: {
    type: "object" as const,
    properties: {
      query: { type: "string", description: "Search keyword" },
      category: { type: "string", enum: ["students", "investors", "sellers", "turisti", "societa"], description: "Filter by category" },
      language: { type: "string", enum: ["it", "en"], description: "Language for titles" },
      limit: { type: "number", description: "Max results (default 10)" },
    },
  },
  handler: (args: { query?: string; category?: string; language?: string; limit?: number }) => {
    const lang = args.language || "it";
    const maxResults = args.limit || 10;
    let results = [...ARTICLES];

    if (args.category) results = results.filter(a => a.category === args.category);
    if (args.query) {
      const q = args.query.toLowerCase();
      results = results.filter(a =>
        a.title_it.toLowerCase().includes(q) ||
        a.title_en.toLowerCase().includes(q) ||
        a.keywords.some(k => k.toLowerCase().includes(q)) ||
        a.slug.includes(q)
      );
    }

    results = results.slice(0, maxResults);
    const formatted = results.map(a => ({
      title: lang === "en" ? a.title_en : a.title_it,
      url: `https://junglerent.it/blog/${a.slug}`,
      category: a.category,
      date: a.date,
      readTime: `${a.readTime} min`,
      keywords: a.keywords,
    }));

    return { content: [{ type: "text" as const, text: JSON.stringify({ count: formatted.length, articles: formatted }, null, 2) }] };
  },
});

mcpServer.tool("get_neighborhoods", {
  description: "Get information about Turin neighborhoods for students: rent prices, safety, transport, distance to universities.",
  inputSchema: {
    type: "object" as const,
    properties: {
      name: { type: "string", description: "Filter by neighborhood name" },
    },
  },
  handler: (args: { name?: string }) => {
    let results = [...NEIGHBORHOODS];
    if (args.name) {
      const q = args.name.toLowerCase();
      results = results.filter(n => n.name.toLowerCase().includes(q));
    }
    return { content: [{ type: "text" as const, text: JSON.stringify({ count: results.length, neighborhoods: results }, null, 2) }] };
  },
});

mcpServer.tool("get_company_info", {
  description: "Get structured information about Jungle Rent: legal data, founders, services, contact details.",
  inputSchema: { type: "object" as const, properties: {} },
  handler: () => {
    return { content: [{ type: "text" as const, text: JSON.stringify(COMPANY_INFO, null, 2) }] };
  },
});

mcpServer.tool("get_faq", {
  description: "Search Jungle Rent FAQs by topic or category (investors, sellers, students, about).",
  inputSchema: {
    type: "object" as const,
    properties: {
      query: { type: "string", description: "Search keyword in questions" },
      category: { type: "string", enum: ["investors", "sellers", "students", "about"], description: "Filter by category" },
      language: { type: "string", enum: ["it", "en"], description: "Response language" },
    },
  },
  handler: (args: { query?: string; category?: string; language?: string }) => {
    const lang = args.language || "it";
    let results = [...FAQS];

    if (args.category) results = results.filter(f => f.category === args.category);
    if (args.query) {
      const q = args.query.toLowerCase();
      results = results.filter(f =>
        f.q_it.toLowerCase().includes(q) || f.q_en.toLowerCase().includes(q) ||
        f.a_it.toLowerCase().includes(q) || f.a_en.toLowerCase().includes(q)
      );
    }

    const formatted = results.map(f => ({
      question: lang === "en" ? f.q_en : f.q_it,
      answer: lang === "en" ? f.a_en : f.a_it,
      category: f.category,
    }));

    return { content: [{ type: "text" as const, text: JSON.stringify({ count: formatted.length, faqs: formatted }, null, 2) }] };
  },
});

mcpServer.tool("get_events", {
  description: "Get current events in Turin with dates, locations, and prices.",
  inputSchema: {
    type: "object" as const,
    properties: {
      month: { type: "string", enum: ["february", "march"], description: "Month filter" },
    },
  },
  handler: (args: { month?: string }) => {
    const events = args.month === "march" ? EVENTS_MAR_2026 :
                   args.month === "february" ? EVENTS_FEB_2026 :
                   [...EVENTS_FEB_2026, ...EVENTS_MAR_2026];
    return { content: [{ type: "text" as const, text: JSON.stringify({ count: events.length, events, note: "Data as of February 2026" }, null, 2) }] };
  },
});

mcpServer.tool("get_rent_prices", {
  description: "Get average rent prices per square meter in Turin zones. Data from OMI/Immobiliare.it November 2025.",
  inputSchema: {
    type: "object" as const,
    properties: {
      zone: { type: "string", description: "Filter by zone name" },
      category: { type: "string", enum: ["central", "semicentral", "peripheral_north", "peripheral_south", "hill"], description: "Filter by category" },
    },
  },
  handler: (args: { zone?: string; category?: string }) => {
    let results = [...RENT_PRICES];
    if (args.zone) {
      const q = args.zone.toLowerCase().replace(/_/g, " ");
      results = results.filter(r => r.zone.toLowerCase().includes(q) || q.includes(r.zone.toLowerCase()));
    }
    if (args.category) results = results.filter(r => r.category === args.category);

    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          count: results.length,
          unit: "€/m² per year",
          source: "OMI Agenzia Entrate / Immobiliare.it (November 2025)",
          prices: results,
        }, null, 2),
      }],
    };
  },
});

// ============================================
// PROPERTY VALUATION COEFFICIENTS (FIAIP 2024-2025)
// ============================================

const COEFFICIENTS = {
  floor_elevator: { basement: -0.25, ground: -0.10, first: -0.10, second: -0.03, third: 0, fourth: 0.03, fifth_plus: 0.05, penthouse: 0.20 },
  floor_no_elevator: { ground: -0.10, first: -0.10, second: -0.15, third_plus: -0.25, penthouse: -0.30 },
  condition: { to_renovate: -0.10, good: 0, renovated: 0.05, finely_renovated: 0.10, new_construction: 0.15 },
  energy_class: { a4_a3: 0.15, a2_a1: 0.12, b: 0.08, c: 0.03, d: 0, e: -0.05, f: -0.10, g: -0.15 },
  heating: { absent: -0.08, centralized: 0, centralized_metered: 0.02, autonomous: 0.05, autonomous_hp: 0.08 },
  balcony: { absent: 0, small: 0.02, medium: 0.05, terrace: 0.08, large_terrace: 0.10, garden: 0.15 },
  garage: { absent: 0, covered_parking: 0.015, external_box: 0.02, internal_box: 0.03, double_box: 0.06, garage_storage: 0.08 },
  exposure: { single: -0.05, double: 0, triple: 0.03, quadruple: 0.05 },
};

mcpServer.tool("property_valuation", {
  description: "Calculate property valuation in Turin using OMI zone prices and FIAIP coefficients. Returns theoretical price, market price (-15% haircut), and pricing strategy. All prices in EUR.",
  inputSchema: {
    type: "object" as const,
    properties: {
      zone: { type: "string", description: "Turin zone name (e.g. 'San Salvario', 'Crocetta', 'Aurora'). Required." },
      sqm: { type: "number", description: "Property size in square meters. Required." },
      floor: { type: "string", description: "Floor level: basement, ground, first, second, third, fourth, fifth_plus, penthouse" },
      has_elevator: { type: "boolean", description: "Whether the building has an elevator (default: true)" },
      condition: { type: "string", description: "Property condition: to_renovate, good, renovated, finely_renovated, new_construction" },
      energy_class: { type: "string", description: "Energy class: a4_a3, a2_a1, b, c, d, e, f, g" },
      heating: { type: "string", description: "Heating: absent, centralized, centralized_metered, autonomous, autonomous_hp" },
      balcony: { type: "string", description: "Balcony/terrace: absent, small, medium, terrace, large_terrace, garden" },
      garage: { type: "string", description: "Parking: absent, covered_parking, external_box, internal_box, double_box, garage_storage" },
      exposure: { type: "string", description: "Exposure: single, double, triple, quadruple" },
    },
    required: ["zone", "sqm"],
  },
  handler: (args: {
    zone: string; sqm: number; floor?: string; has_elevator?: boolean;
    condition?: string; energy_class?: string; heating?: string;
    balcony?: string; garage?: string; exposure?: string;
  }) => {
    // Find zone price
    const zoneQuery = args.zone.toLowerCase().replace(/_/g, " ");
    const zoneData = RENT_PRICES.find(r =>
      r.zone.toLowerCase().includes(zoneQuery) || zoneQuery.includes(r.zone.toLowerCase())
    );
    if (!zoneData) {
      return { content: [{ type: "text" as const, text: JSON.stringify({ error: `Zone "${args.zone}" not found. Available zones: ${RENT_PRICES.map(r => r.zone).join(", ")}` }) }] };
    }

    // Calculate coefficients
    const hasElevator = args.has_elevator !== false;
    const floorCoeffs = hasElevator ? COEFFICIENTS.floor_elevator : COEFFICIENTS.floor_no_elevator;
    const appliedCoeffs: { factor: string; value: number }[] = [];

    const applyCoeff = (factor: string, table: Record<string, number>, key?: string) => {
      if (key && key in table) {
        appliedCoeffs.push({ factor, value: table[key] });
      }
    };

    applyCoeff("Floor", floorCoeffs, args.floor);
    applyCoeff("Condition", COEFFICIENTS.condition, args.condition);
    applyCoeff("Energy class", COEFFICIENTS.energy_class, args.energy_class);
    applyCoeff("Heating", COEFFICIENTS.heating, args.heating);
    applyCoeff("Balcony", COEFFICIENTS.balcony, args.balcony);
    applyCoeff("Garage", COEFFICIENTS.garage, args.garage);
    applyCoeff("Exposure", COEFFICIENTS.exposure, args.exposure);

    const totalCoeff = appliedCoeffs.reduce((s, c) => s + c.value, 0);
    const clampedCoeff = Math.max(-0.25, Math.min(0.50, totalCoeff));
    const basePrice = args.sqm * zoneData.avg;
    const theoreticalPrice = basePrice * (1 + clampedCoeff);
    const MARKET_HAIRCUT = 0.15;
    const marketPrice = theoreticalPrice * (1 - MARKET_HAIRCUT);

    const fmt = (v: number) => Math.round(v);

    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          zone: zoneData.zone,
          sqm: args.sqm,
          pricePerSqm: zoneData.avg,
          appliedCoefficients: appliedCoeffs,
          totalCoefficient: `${(clampedCoeff * 100).toFixed(1)}%`,
          theoreticalPrice: { value: fmt(theoreticalPrice), min: fmt(theoreticalPrice * 0.95), max: fmt(theoreticalPrice * 1.05) },
          marketPrice: { value: fmt(marketPrice), min: fmt(marketPrice * 0.95), max: fmt(marketPrice * 1.05), note: "Theoretical price minus 15% market haircut (typical difference between theoretical and real transaction prices)" },
          pricingStrategy: {
            askingPrice: fmt(marketPrice * 1.05),
            expectedClosingPrice: fmt(marketPrice),
            minimumPrice: fmt(marketPrice * 0.95),
          },
          methodology: "FIAIP 2024-2025 coefficients applied to OMI/Immobiliare.it zone averages (Nov 2025). Margin of error: ±5-12%.",
          disclaimer: "This is an indicative estimate. For a precise valuation, contact Jungle Rent for a free professional assessment: junglerent.it/valutazione-immobile",
        }, null, 2),
      }],
    };
  },
});

// ============================================
// HTTP TRANSPORT
// ============================================

const transport = new StreamableHttpTransport();
transport.bind(mcpServer);

app.all("/*", async (c) => {
  return await transport.handleRequest(c.req.raw);
});

Deno.serve(app.fetch);
