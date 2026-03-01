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
  { slug: "carnevale-ivrea-battaglia-arance-2026", category: "turisti", date: "2026-01-15", readTime: 14, title_it: "Carnevale di Ivrea 2026: la Battaglia delle Arance", title_en: "Ivrea Carnival 2026: the Battle of the Oranges", keywords: ["carnevale ivrea", "battaglia arance", "orange battle"] },
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
  { name: "Shiota Chiharu - The Network", dates: "Mar 1 - Jul 13, 2026", location: "GAM - Galleria d'Arte Moderna", price: "€15", description: "Major immersive installation by Japanese artist Chiharu Shiota" },
  { name: "Futurismo 1909-2026", dates: "From Feb 27, 2026", location: "Museo Nazionale del Cinema", price: "€15", description: "Centenary exhibition of the Futurist movement" },
  { name: "Subsonica 30th Anniversary", dates: "Mar 13-14, 2026", location: "Inalpi Arena", price: "From €40", description: "Landmark 30th anniversary tour of Turin's iconic electronic-rock band" },
  { name: "Gentileschi at Palazzo Madama", dates: "Ongoing", location: "Palazzo Madama", price: "€15", description: "Baroque masterpieces by Artemisia Gentileschi" },
  { name: "Macbeth - Teatro Regio (cont.)", dates: "Until Mar 7, 2026", location: "Teatro Regio", price: "€50-230", description: "Final performances conducted by Riccardo Muti" },
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
      const words = args.query.toLowerCase().split(/\s+/).filter(w => w.length > 1);
      results = results.filter(a => {
        const haystack = `${a.title_it} ${a.title_en} ${a.keywords.join(" ")} ${a.slug}`.toLowerCase();
        return words.every(w => haystack.includes(w));
      });
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
// INVESTOR ZONE DATA (13 neighborhoods)
// ============================================

const INVESTOR_ZONES = [
  { id: "cenisia", name: "Cenisia", zone: "Semicentro", pricePerSqm: { min: 1940, avg: 2200, max: 2285 }, variation2024: 4, trend: "growth", grossYield: { min: 6, max: 7 }, netYield: { min: 4.4, max: 5.1 }, demand: "high", vacancyRate: { min: 3, max: 5 }, rentRoom: { min: 380, max: 470 }, rentApartment: { min: 550, max: 700 }, rentingTime: "2-4 weeks", targetTenant: ["Politecnico students", "Young professionals"], urbanRenewal: [{ name: "Metro 2", investment: "€2+ bln", impact: "Strong revaluation expected" }], rankings: { netYieldRank: 1, growthPotentialRank: 4, entryPriceRank: 6 }, note: "Best yield/risk ratio. Proximity to Politecnico ensures constant demand." },
  { id: "aurora", name: "Aurora", zone: "Periferia", pricePerSqm: { min: 1000, avg: 1520, max: 1800 }, variation2024: 7, trend: "strong_growth", grossYield: { min: 5.5, max: 7 }, netYield: { min: 3.8, max: 5 }, demand: "high", vacancyRate: { min: 5, max: 8 }, rentRoom: { min: 350, max: 450 }, rentApartment: { min: 500, max: 600 }, rentingTime: "2-4 weeks", targetTenant: ["Campus Einaudi students", "Value-add investors"], urbanRenewal: [{ name: "Masterplan Carlo Ratti", investment: "€25.8M", impact: "+15-25% in 5-7 years" }, { name: "Porta Palazzo renewal", investment: "Multi-million", impact: "General area improvement" }], rankings: { netYieldRank: 2, growthPotentialRank: 2, entryPriceRank: 2 }, note: "High appreciation potential. Medium-high risk offset by entry-level prices. Perfect for value-add investors." },
  { id: "san_salvario", name: "San Salvario", zone: "Centro", pricePerSqm: { min: 2050, avg: 2650, max: 2710 }, variation2024: 5.5, trend: "stable", grossYield: { min: 5.8, max: 6.5 }, netYield: { min: 4.1, max: 4.8 }, demand: "very_high", vacancyRate: { min: 2, max: 4 }, rentRoom: { min: 400, max: 500 }, rentApartment: { min: 700, max: 850 }, rentingTime: "2-3 weeks", targetTenant: ["Medical students", "Young professionals", "Expats"], urbanRenewal: [{ name: "Scalo Nizza", investment: "€105M", impact: "+10-15% consolidation" }], rankings: { netYieldRank: 3, growthPotentialRank: 6 }, note: "Most established student neighborhood. Very high demand, almost zero vacancy. Ideal for conservative investors." },
  { id: "vanchiglia", name: "Vanchiglia", zone: "Centro", pricePerSqm: { min: 2070, avg: 2600, max: 2680 }, variation2024: 2.5, trend: "moderate", grossYield: { min: 5.5, max: 6.2 }, netYield: { min: 4, max: 4.5 }, demand: "high", vacancyRate: { min: 3, max: 5 }, rentRoom: { min: 350, max: 480 }, rentApartment: { min: 600, max: 750 }, rentingTime: "2-4 weeks", targetTenant: ["Humanities students", "Artists and creatives"], urbanRenewal: [], rankings: { netYieldRank: 4 }, note: "Artistic neighborhood with strong identity. Niche but loyal target. Great for diversifying student portfolio." },
  { id: "lingotto", name: "Lingotto", zone: "Periferia", pricePerSqm: { min: 1200, avg: 1650, max: 3000 }, variation2024: 7.8, trend: "strong_growth", grossYield: { min: 5, max: 6.5 }, netYield: { min: 3.5, max: 4.5 }, demand: "high", vacancyRate: { min: 4, max: 6 }, rentRoom: { min: 400, max: 500 }, rentApartment: { min: 600, max: 700 }, rentingTime: "3-4 weeks", targetTenant: ["Professionals", "Metro-dependent students"], urbanRenewal: [{ name: "Parco della Salute", investment: "Multi-billion", impact: "Positive trend consolidation" }, { name: "Città della Salute", investment: "€450M", impact: "Regional healthcare hub" }], rankings: { netYieldRank: 5, growthPotentialRank: 3 }, note: "Former FIAT hub undergoing major transformation. Great for medium-long term investment." },
  { id: "barriera_di_milano", name: "Barriera di Milano", zone: "Periferia", pricePerSqm: { min: 860, avg: 1150, max: 1600 }, variation2024: 3, trend: "max_growth", grossYield: { min: 5.5, max: 7 }, netYield: { min: 3.8, max: 4.1 }, demand: "medium", vacancyRate: { min: 8, max: 12 }, rentRoom: { min: 250, max: 380 }, rentApartment: { min: 380, max: 500 }, rentingTime: "4-6 weeks", targetTenant: ["Budget-conscious students", "Workers"], urbanRenewal: [{ name: "Metro 2 - Rebaudengo", investment: "€2+ bln", impact: "Maximum revaluation expected" }, { name: "Ex Manifattura Tabacchi", investment: "€200+ M", impact: "New cultural hub" }, { name: "Masterplan Carlo Ratti", investment: "€25.8M", impact: "+15-25% in 5-7 years" }], rankings: { growthPotentialRank: 1, entryPriceRank: 1, netYieldRank: 6 }, note: "MAXIMUM POTENTIAL. Lowest prices in Turin (€1,150/sqm) with Metro 2 coming. High risk but huge upside. 5+ year horizon." },
  { id: "crocetta", name: "Crocetta", zone: "Semicentro", pricePerSqm: { min: 2750, avg: 3000, max: 3500 }, variation2024: 10, trend: "strong_growth", grossYield: { min: 5, max: 5.5 }, netYield: { min: 3.6, max: 4 }, demand: "high", vacancyRate: { min: 4, max: 6 }, rentRoom: { min: 450, max: 550 }, rentApartment: { min: 750, max: 900 }, rentingTime: "3-4 weeks", targetTenant: ["Politecnico students", "Families", "Professionals"], urbanRenewal: [], rankings: { growthPotentialRank: 5 }, note: "Premium neighborhood home to Politecnico. High prices but guaranteed demand. +10% in 2024." },
  { id: "borgo_vittoria", name: "Borgo Vittoria", zone: "Periferia", pricePerSqm: { min: 1200, avg: 1370, max: 1755 }, variation2024: 8, trend: "growth", grossYield: { min: 5, max: 6 }, netYield: { min: 3.5, max: 4.2 }, demand: "medium", vacancyRate: { min: 6, max: 10 }, rentRoom: { min: 300, max: 400 }, rentApartment: { min: 450, max: 550 }, rentingTime: "3-5 weeks", targetTenant: ["Students", "Young workers"], urbanRenewal: [], rankings: { entryPriceRank: 3 }, note: "Low entry price with decent yields. Stable residential. Good value for first investments." },
  { id: "san_donato", name: "San Donato", zone: "Periferia", pricePerSqm: { min: 1500, avg: 1700, max: 2000 }, variation2024: 4.3, trend: "moderate", grossYield: { min: 5, max: 5.8 }, netYield: { min: 3.5, max: 4.1 }, demand: "medium", vacancyRate: { min: 5, max: 8 }, rentRoom: { min: 320, max: 420 }, rentApartment: { min: 480, max: 600 }, rentingTime: "3-5 weeks", targetTenant: ["Students", "Families", "Workers"], urbanRenewal: [], rankings: { entryPriceRank: 4 }, note: "Working-class neighborhood with good connections. Accessible prices and stable demand." },
  { id: "parella", name: "Parella", zone: "Periferia", pricePerSqm: { min: 1575, avg: 1960, max: 2605 }, variation2024: 5.5, trend: "growth", grossYield: { min: 5, max: 5.5 }, netYield: { min: 3.5, max: 4 }, demand: "medium", vacancyRate: { min: 5, max: 7 }, rentRoom: { min: 320, max: 430 }, rentApartment: { min: 500, max: 620 }, rentingTime: "3-4 weeks", targetTenant: ["Families", "Workers", "Students"], urbanRenewal: [{ name: "Metro 2 - Parella", investment: "€2+ bln", impact: "Revaluation with metro arrival" }], rankings: { entryPriceRank: 5 }, note: "Residential with Metro 2 coming. Prices still contained, great time to enter before revaluation." },
  { id: "santa_rita", name: "Santa Rita", zone: "Semicentro", pricePerSqm: { min: 1200, avg: 1910, max: 2000 }, variation2024: 4.5, trend: "stable", grossYield: { min: 5, max: 5.5 }, netYield: { min: 3.5, max: 4 }, demand: "medium", vacancyRate: { min: 4, max: 6 }, rentRoom: { min: 320, max: 420 }, rentApartment: { min: 500, max: 650 }, rentingTime: "3-4 weeks", targetTenant: ["Families", "Workers", "Students"], urbanRenewal: [], rankings: {}, note: "Stable residential with good services. Moderate yields but low risk. Ideal for conservative investors." },
  { id: "cit_turin", name: "Cit Turin", zone: "Semicentro", pricePerSqm: { min: 2400, avg: 2680, max: 4000 }, variation2024: 3, trend: "moderate", grossYield: { min: 4.5, max: 5.2 }, netYield: { min: 3.2, max: 3.8 }, demand: "high", vacancyRate: { min: 3, max: 5 }, rentRoom: { min: 380, max: 480 }, rentApartment: { min: 600, max: 750 }, rentingTime: "2-4 weeks", targetTenant: ["Professionals", "Students", "Families"], urbanRenewal: [], rankings: {}, note: "Elegant Art Nouveau neighborhood. Premium prices but high tenant quality. Prestige asset." },
  { id: "campidoglio", name: "Campidoglio", zone: "Semicentro", pricePerSqm: { min: 1850, avg: 2325, max: 2600 }, variation2024: 4.75, trend: "stable", grossYield: { min: 5, max: 5.8 }, netYield: { min: 3.5, max: 4.2 }, demand: "medium", vacancyRate: { min: 4, max: 7 }, rentRoom: { min: 320, max: 420 }, rentApartment: { min: 500, max: 650 }, rentingTime: "3-4 weeks", targetTenant: ["Creative students", "Young professionals"], urbanRenewal: [], rankings: {}, note: "Gentrifying neighborhood with Balon market. Authentic atmosphere, still accessible prices." },
];

mcpServer.tool("get_investment_data", {
  description: "Get detailed investment data for Turin neighborhoods: purchase prices, rental yields (gross/net), vacancy rates, demand levels, urban renewal projects, and investor notes. Data from OMI/Immobiliare.it/FIAIP/Nomisma 2025.",
  inputSchema: {
    type: "object" as const,
    properties: {
      zone: { type: "string", description: "Filter by zone name (e.g. 'Cenisia', 'Aurora', 'San Salvario')" },
      zone_type: { type: "string", enum: ["Centro", "Semicentro", "Periferia"], description: "Filter by zone type" },
      sort_by: { type: "string", enum: ["net_yield", "growth_potential", "entry_price", "vacancy_low"], description: "Sort results by metric" },
      urban_renewal_only: { type: "boolean", description: "Show only zones with active urban renewal projects" },
    },
  },
  handler: (args: { zone?: string; zone_type?: string; sort_by?: string; urban_renewal_only?: boolean }) => {
    let results = [...INVESTOR_ZONES];

    if (args.zone) {
      const q = args.zone.toLowerCase().replace(/_/g, " ");
      results = results.filter(z => z.name.toLowerCase().includes(q) || q.includes(z.name.toLowerCase()));
    }
    if (args.zone_type) results = results.filter(z => z.zone === args.zone_type);
    if (args.urban_renewal_only) results = results.filter(z => z.urbanRenewal.length > 0);

    if (args.sort_by) {
      switch (args.sort_by) {
        case "net_yield": results.sort((a, b) => b.netYield.max - a.netYield.max); break;
        case "growth_potential": results.sort((a, b) => b.variation2024 - a.variation2024); break;
        case "entry_price": results.sort((a, b) => a.pricePerSqm.avg - b.pricePerSqm.avg); break;
        case "vacancy_low": results.sort((a, b) => a.vacancyRate.min - b.vacancyRate.min); break;
      }
    }

    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          count: results.length,
          source: "OMI Agenzia Entrate, Immobiliare.it, FIAIP, Nomisma (2025)",
          zones: results.map(z => ({
            name: z.name,
            zoneType: z.zone,
            purchasePrice: { min: z.pricePerSqm.min, avg: z.pricePerSqm.avg, max: z.pricePerSqm.max, unit: "€/sqm" },
            variation2024: `${z.variation2024}%`,
            trend: z.trend,
            grossYield: `${z.grossYield.min}-${z.grossYield.max}%`,
            netYield: `${z.netYield.min}-${z.netYield.max}%`,
            demand: z.demand,
            vacancyRate: `${z.vacancyRate.min}-${z.vacancyRate.max}%`,
            rentRoom: `€${z.rentRoom.min}-${z.rentRoom.max}/month`,
            rentApartment: `€${z.rentApartment.min}-${z.rentApartment.max}/month`,
            rentingTime: z.rentingTime,
            targetTenant: z.targetTenant,
            urbanRenewal: z.urbanRenewal.length > 0 ? z.urbanRenewal : undefined,
            rankings: Object.keys(z.rankings).length > 0 ? z.rankings : undefined,
            investorNote: z.note,
            detailPage: `https://junglerent.it/investitori/zone/${z.id.replace(/_/g, "-")}`,
          })),
          disclaimer: "Yields are estimates based on market analysis. Net yields calculated with 0.76% IMU and 21% cedolare secca. Past performance does not guarantee future results.",
        }, null, 2),
      }],
    };
  },
});

// ============================================
// TOOL 9: CONTACT JUNGLE RENT
// ============================================

const FORMSPREE_ENDPOINT = "https://formspree.io/f/xeojbzow";
const ALLOWED_CATEGORIES = ["investor", "student", "seller", "tourist", "general"];

const sanitize = (str: string, maxLen: number): string =>
  str.replace(/[<>"'&]/g, "").trim().substring(0, maxLen);

const isValidEmail = (email: string): boolean =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 255;

mcpServer.tool("contact_jungle_rent", {
  description: "Send a message/email to Jungle Rent. Use this when a user wants to contact Jungle Rent, ask a question, request info, or express interest in investing/renting/selling. Returns confirmation and alternative contact methods.",
  inputSchema: {
    type: "object" as const,
    properties: {
      name: { type: "string", description: "Sender's full name (required, max 100 chars)" },
      email: { type: "string", description: "Sender's email address (required, valid format)" },
      message: { type: "string", description: "The message to send to Jungle Rent (required, max 2000 chars)" },
      category: { type: "string", enum: ALLOWED_CATEGORIES, description: "Category: investor, student, seller, tourist, or general (optional, defaults to general)" },
      phone: { type: "string", description: "Sender's phone number (optional, max 20 chars)" },
    },
    required: ["name", "email", "message"],
  },
  handler: async (args: { name: string; email: string; message: string; category?: string; phone?: string }) => {
    // Validate
    if (!args.name || typeof args.name !== "string" || args.name.trim().length === 0) {
      return { content: [{ type: "text" as const, text: JSON.stringify({ success: false, error: "Name is required" }) }] };
    }
    if (!isValidEmail(args.email)) {
      return { content: [{ type: "text" as const, text: JSON.stringify({ success: false, error: "Valid email is required" }) }] };
    }
    if (!args.message || typeof args.message !== "string" || args.message.trim().length === 0) {
      return { content: [{ type: "text" as const, text: JSON.stringify({ success: false, error: "Message is required" }) }] };
    }
    if (args.category && !ALLOWED_CATEGORIES.includes(args.category)) {
      return { content: [{ type: "text" as const, text: JSON.stringify({ success: false, error: "Invalid category" }) }] };
    }

    const safeName = sanitize(args.name, 100);
    const safeMessage = sanitize(args.message, 2000);
    const safeCategory = args.category && ALLOWED_CATEGORIES.includes(args.category) ? args.category : "general";
    const safePhone = args.phone ? sanitize(args.phone, 20) : undefined;
    const safeEmail = args.email.toLowerCase().trim();

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `[MCP/${safeCategory}] Messaggio da ${safeName}`,
          name: safeName,
          email: safeEmail,
          phone: safePhone || "Non fornito",
          category: safeCategory,
          message: safeMessage,
          source: "mcp-server",
        }),
      });

      if (!response.ok) {
        return { content: [{ type: "text" as const, text: JSON.stringify({ success: false, error: "Failed to send message. Please try again or use alternative contacts.", alternativeContact: { whatsapp: "https://wa.me/393319053037", email: "junglerententeprise@gmail.com" } }) }] };
      }

      return {
        content: [{
          type: "text" as const,
          text: JSON.stringify({
            success: true,
            message: "Email sent to Jungle Rent. They will reply within 24 hours.",
            alternativeContact: {
              whatsapp: "https://wa.me/393319053037",
              email: "junglerententeprise@gmail.com",
            },
          }),
        }],
      };
    } catch (_err) {
      return { content: [{ type: "text" as const, text: JSON.stringify({ success: false, error: "Failed to send message. Please try alternative contacts.", alternativeContact: { whatsapp: "https://wa.me/393319053037", email: "junglerententeprise@gmail.com" } }) }] };
    }
  },
});

// ============================================
// TOOL 10: GET STUDY SPACES
// ============================================

const STUDY_SPACES = [
  { id: 1, cat: "bar", name: "Barney's (Circolo dei Lettori)", addr: "Via Bogino 9", cap: "Vari tavoli", hrs: "Durante apertura Circolo", feat: "1h Wi-Fi dopo consumazione, illimitato con tessera Circolo", link: "https://www.circololettori.it" },
  { id: 2, cat: "bar", name: "Casa del Quartiere San Salvario", addr: "Via Oddino Morgari 14", cap: "Vari spazi", hrs: "Variabili", feat: "Ambiente informale, bar, Wi-Fi" },
  { id: 3, cat: "bar", name: "Combo Torino", addr: "Corso Regina Margherita 128", cap: "Tavoli ampi", hrs: "7:00-23:00", feat: "Ostello + caffetteria, Wi-Fi, pranzo", link: "https://www.thisiscombo.com" },
  { id: 4, cat: "bar", name: "Costadoro Social Coffee Factory", addr: "Via Teofilo Rossi di Montelera 2", cap: "Numerosi tavoli", hrs: "Variabili", feat: "Wi-Fi veloce (1h gratis), prese elettriche, giardino esterno" },
  { id: 5, cat: "bar", name: "Orso Laboratorio Caffè", addr: "Via Berthollet 30", cap: "Salottino", hrs: "Variabili", feat: "Caffetteria specialty, Wi-Fi, prese, dehors" },
  { id: 6, cat: "bar", name: "Bar e Caffè per Studiare", addr: "Via Micca", cap: "Tavoli", hrs: "Variabili", feat: "Wi-Fi, ambiente rilassato" },
  { id: 7, cat: "biblioteca_nazionale", name: "Biblioteca Nazionale Universitaria", addr: "Piazza Carlo Alberto 3", cap: "Numerosi", hrs: "Lun-Ven 9:00-16:00", feat: "Oltre 1,3M volumi, manoscritti rari, accesso da 16 anni", link: "https://bnuto.cultura.gov.it" },
  { id: 8, cat: "biblioteche_civiche", name: "Biblioteca Civica Alberto Geisser", addr: "Corso Casale 5", cap: "Numerosi", hrs: "Lun-Ven variabili", feat: "Aula studio, punto ristoro, Wi-Fi", link: "https://bct.comune.torino.it" },
  { id: 9, cat: "biblioteche_civiche", name: "Biblioteca Civica Bianca Guidetti Serra", addr: "Piazzetta Università dei Mastri Minusieri", cap: "32 posti", hrs: "Variabili", feat: "Centro storico, Wi-Fi", link: "https://bct.comune.torino.it" },
  { id: 10, cat: "biblioteche_civiche", name: "Biblioteca Civica Cascina Marchesa", addr: "Corso Vercelli 141/7", cap: "Numerosi", hrs: "Variabili", feat: "Wi-Fi", link: "https://bct.comune.torino.it" },
  { id: 11, cat: "biblioteche_civiche", name: "Biblioteca Civica Centrale", addr: "Via della Cittadella 5", cap: "60 in sala lettura", hrs: "Lun 14-19, Mar-Ven 9-19, Sab 9-15", feat: "500.000+ volumi, Wi-Fi", link: "https://bct.comune.torino.it" },
  { id: 12, cat: "biblioteche_civiche", name: "Biblioteca Civica Cesare Pavese", addr: "Via Candiolo 79", cap: "Numerosi", hrs: "Variabili", feat: "Wi-Fi, parcheggio", link: "https://bct.comune.torino.it" },
  { id: 13, cat: "biblioteche_civiche", name: "Biblioteca Civica Dietrich Bonhoeffer", addr: "Corso Corsica 55", cap: "Numerosi", hrs: "Lun 14-19, Mar-Ven 9-19, Sab 9-15", feat: "3 postazioni internet, Wi-Fi", link: "https://bct.comune.torino.it" },
  { id: 14, cat: "biblioteche_civiche", name: "Biblioteca Civica Don Lorenzo Milani", addr: "Via dei Pioppi 43", cap: "Numerosi", hrs: "Variabili", feat: "48.000+ volumi, Wi-Fi, 5 postazioni internet", link: "https://bct.comune.torino.it" },
  { id: 15, cat: "biblioteche_civiche", name: "Biblioteca Civica Francesco Cognasso", addr: "Corso Cincinnato 115", cap: "Numerosi", hrs: "Variabili", feat: "Wi-Fi, corsi di lingue", link: "https://bct.comune.torino.it" },
  { id: 16, cat: "biblioteche_civiche", name: "Biblioteca Civica Italo Calvino", addr: "Lungo Dora Agrigento 94", cap: "Numerosi", hrs: "Variabili", feat: "Wi-Fi, postazioni internet", link: "https://bct.comune.torino.it" },
  { id: 17, cat: "biblioteche_civiche", name: "Biblioteca Civica Luigi Carluccio", addr: "Via Monte Ortigara 95", cap: "Numerosi", hrs: "Variabili", feat: "Riaperta dopo interventi straordinari", link: "https://bct.comune.torino.it" },
  { id: 18, cat: "biblioteche_civiche", name: "Biblioteca Civica Mausoleo della Bela Rosin", addr: "Strada Castello di Mirafiori 148/7", cap: "Numerosi", hrs: "Variabili", feat: "Zona Mirafiori", link: "https://bct.comune.torino.it" },
  { id: 19, cat: "biblioteche_civiche", name: "Biblioteca Civica Passerin d'Entrèves", addr: "Via Guido Reni 96/15", cap: "140 posti", hrs: "Variabili", feat: "Wi-Fi, ampi spazi", link: "https://bct.comune.torino.it" },
  { id: 20, cat: "biblioteche_civiche", name: "Biblioteca Civica Primo Levi", addr: "Via Leoncavallo 17", cap: "Numerosi", hrs: "Lun 14-19, Mar-Ven 9-19, Sab 9-15", feat: "Wi-Fi, postazioni internet", link: "https://bct.comune.torino.it" },
  { id: 21, cat: "biblioteche_civiche", name: "Biblioteca Civica Villa Amoretti", addr: "Corso Orbassano 200", cap: "Numerosi", hrs: "Variabili", feat: "Luminosa, nel parco, Wi-Fi", link: "https://bct.comune.torino.it" },
  { id: 22, cat: "biblioteche_civiche", name: "Biblioteca Musicale Andrea Della Corte", addr: "Corso Francia 186 (Villa Tesoriera)", cap: "Numerosi", hrs: "Lun-Mar-Gio 9:15-18:45, Mer-Ven 9:15-16:45", feat: "Specializzata musica/danza, 36.000 spartiti, Wi-Fi", link: "https://bct.comune.torino.it" },
  { id: 23, cat: "edisu", name: "Sala Studio Corso Castelfidardo", addr: "Corso Castelfidardo 30/A", cap: "180", hrs: "Lun-Ven 8:00-23:30, Sab 8:00-20:00", feat: "Wi-Fi gratuito, presso Politecnico", link: "https://www.edisu.piemonte.it" },
  { id: 24, cat: "edisu", name: "Sala Studio Corso Svizzera", addr: "Corso Svizzera 185", cap: "180", hrs: "Lun-Ven 9:00-18:00", feat: "Wi-Fi gratuito", link: "https://www.edisu.piemonte.it" },
  { id: 25, cat: "edisu", name: "Sala Studio Michelangelo Buonarroti", addr: "Via Michelangelo Buonarroti 17/Bis", cap: "364-427", hrs: "Lun-Ven 8:30-24:00, Sab-Dom 8:30-22:00", feat: "Wi-Fi, app Campus Piemonte", link: "https://www.edisu.piemonte.it" },
  { id: 26, cat: "edisu", name: "Sala Studio Ormea", addr: "Via Ormea", cap: "134", hrs: "Variabili", feat: "Wi-Fi gratuito, prenotabile", link: "https://www.edisu.piemonte.it" },
  { id: 27, cat: "edisu", name: "Sala Studio Pietro Giuria", addr: "Via Pietro Giuria 17", cap: "200", hrs: "Lun-Ven 8:30-19:00", feat: "Wi-Fi gratuito", link: "https://www.edisu.piemonte.it" },
  { id: 28, cat: "edisu", name: "Sala Studio Principe Amedeo", addr: "Via Principe Amedeo", cap: "96", hrs: "Variabili", feat: "Wi-Fi gratuito, prenotabile", link: "https://www.edisu.piemonte.it" },
  { id: 29, cat: "edisu", name: "Sala Studio Verdi", addr: "Via Verdi 26", cap: "292-308", hrs: "Lun-Ven 8:30-24:00, Sab-Dom 8:30-22:00", feat: "Wi-Fi, app Campus Piemonte", link: "https://www.edisu.piemonte.it" },
  { id: 30, cat: "edisu", name: "Torino Student Zone - Murazzi del Po", addr: "Via Murazzi del Po 26", cap: "81", hrs: "Lun-Ven 9:00-21:00", feat: "Bar, ristoreria, Wi-Fi", link: "https://www.studyintorino.it" },
  { id: 31, cat: "politecnico", name: "Aule Studio Sede Lingotto", addr: "Via Nizza 230 (8Gallery)", cap: "32+44+40", hrs: "Lun-Ven 8:00-19:30", feat: "Moderne, Wi-Fi", link: "https://www.polito.it" },
  { id: 32, cat: "politecnico", name: "Biblioteca Centrale di Architettura 'Roberto Gabetti'", addr: "Viale Mattioli 39 (Castello del Valentino)", cap: "Numerosi", hrs: "Variabili", feat: "Patrimonio architettura, Wi-Fi", link: "https://www.biblio.polito.it" },
  { id: 33, cat: "politecnico", name: "Biblioteca Centrale di Ingegneria", addr: "Corso Duca degli Abruzzi 24", cap: "Vari posti", hrs: "Consultare sito", feat: "Aule silenziose e rumorose, Wi-Fi, prese", link: "https://www.biblio.polito.it" },
  { id: 34, cat: "unito", name: "Biblioteca Norberto Bobbio", addr: "Via Sant'Ottavio", cap: "Numerosi", hrs: "Prenotazione app Affluences", feat: "Giurisprudenza, Wi-Fi", link: "https://www.sba.unito.it" },
  { id: 35, cat: "unito", name: "Biblioteca di Economia e Management", addr: "Corso Unione Sovietica", cap: "Numerosi", hrs: "Prenotazione app Affluences", feat: "Economia, Wi-Fi", link: "https://www.sba.unito.it" },
  { id: 36, cat: "unito", name: "Sistema Bibliotecario UniTo (22 biblioteche)", addr: "Varie sedi", cap: "30+ sedi", hrs: "Variabili, prenotazione Affluences", feat: "Wi-Fi, credenziali universitarie", link: "https://www.sba.unito.it" },
  { id: 37, cat: "campus_diffuso", name: "Bunker", addr: "Via Paganini", cap: "40", hrs: "Variabili", feat: "Wi-Fi, prese elettriche", link: "https://www.studyintorino.it" },
  { id: 38, cat: "campus_diffuso", name: "CAP10100", addr: "Via Barletta", cap: "80", hrs: "Variabili", feat: "Wi-Fi gratuito, prese elettriche", link: "https://www.studyintorino.it" },
  { id: 39, cat: "campus_diffuso", name: "CPG Torino", addr: "Via Verolengo", cap: "20", hrs: "Variabili", feat: "Wi-Fi, vista green, BarCult", link: "https://www.cpgtorino.it" },
  { id: 40, cat: "campus_diffuso", name: "Casa del Quartiere - Barrito", addr: "Via Rubino 45", cap: "40+40 esterni", hrs: "Lun-Sab 9:00-18:00", feat: "Wi-Fi, caffè con cucina" },
  { id: 41, cat: "campus_diffuso", name: "Casa nel Parco (Mirafiori Sud)", addr: "Via Panetti 1", cap: "20", hrs: "Sab-Dom 14:00-23:00", feat: "Wi-Fi, giardino, menù studenti 5€" },
  { id: 42, cat: "campus_diffuso", name: "Circolo Arci l'Arteficio", addr: "Via Fossano", cap: "70", hrs: "Variabili", feat: "Wi-Fi gratuito" },
  { id: 43, cat: "campus_diffuso", name: "Comala", addr: "Corso Ferrucci 65/A", cap: "60+350 esterni", hrs: "Lun-Ven 8:30-0:30, Sab-Dom 10:00-0:30", feat: "Wi-Fi, prese, acqua gratis, bar" },
  { id: 44, cat: "campus_diffuso", name: "El Barrio", addr: "Via Baltea 3", cap: "35", hrs: "Variabili", feat: "Wi-Fi gratuito" },
  { id: 45, cat: "campus_diffuso", name: "Imbarchino (Parco Valentino)", addr: "Viale Umberto Cagni 37", cap: "25+64 esterni", hrs: "Lun-Sab 9:00-18:00", feat: "Bar, Wi-Fi, prese, nel verde" },
  { id: 46, cat: "campus_diffuso", name: "Off Topic", addr: "Via Pallavicino", cap: "136", hrs: "Variabili", feat: "Centro culturale, Wi-Fi, eventi" },
  { id: 47, cat: "campus_diffuso", name: "Spazio 211", addr: "Via Cigna 211", cap: "20+30 esterni", hrs: "Lun-Ven 10:00-18:30", feat: "Wi-Fi, polo socio-culturale" },
  { id: 48, cat: "coworking", name: "AL DUDES Coworking", addr: "Zona Porta Susa", cap: "Varie", hrs: "Variabili", feat: "Postazioni flessibili, meeting room", link: "https://www.aldudes.it" },
  { id: 49, cat: "coworking", name: "Circolo dei Lettori - Sala Artisti", addr: "Via Bogino 9", cap: "20", hrs: "Lun-Sab 9:30-17:30", feat: "Carta Io Leggo 20€ (15€ studenti), Wi-Fi", link: "https://www.circololettori.it" },
  { id: 50, cat: "coworking", name: "OGR - Officine Grandi Riparazioni", addr: "Corso Castelfidardo 22", cap: "Spazi comuni", hrs: "Variabili", feat: "Wi-Fi gratuito, bar", link: "https://www.ogrtorino.it" },
  { id: 51, cat: "coworking", name: "Open - Fondazione Time2", addr: "Via Avellino", cap: "24+20 esterni", hrs: "Lun-Mar 9-18, Mer-Ven 9-20:30", feat: "Wi-Fi, prese, aria condizionata, prenotazione", link: "https://www.open.fondazionetime2.it" },
  { id: 52, cat: "coworking", name: "Principi HUB", addr: "Via Antonio Banfo 41", cap: "Coworking", hrs: "Lun-Ven 9-18", feat: "Business desk 95€/mese, Wi-Fi, stampante", link: "https://www.principihub.it" },
  { id: 53, cat: "coworking", name: "Vol.To Coworking", addr: "Sede Vol.To", cap: "Varie", hrs: "Variabili", feat: "Mezza giornata 6,50€, giornata 10€", link: "https://www.volontariatotorino.it" },
  { id: 54, cat: "coworking", name: "Centro Pari Opportunità (CPO)", addr: "Varie sedi", cap: "Variabili", hrs: "Variabili", feat: "Spazi per studenti, Wi-Fi" },
  { id: 55, cat: "parchi", name: "Parco Colletta", addr: "Zona Mirafiori", cap: "Illimitati", hrs: "Sempre aperto", feat: "448.000 mq, pista ciclabile, Wi-Fi" },
  { id: 56, cat: "parchi", name: "Parco del Valentino", addr: "Lungo Po", cap: "Illimitati", hrs: "Sempre aperto", feat: "421.000 mq, Wi-Fi in alcune zone" },
  { id: 57, cat: "polo900", name: "Polo del '900 - Sala Lettura Istoreto", addr: "Corso Valdocco 4/A", cap: "Numerosi", hrs: "Lun-Gio 10-18, Ven 10-13", feat: "Storia Antifascismo, Wi-Fi", link: "https://www.polodel900.it" },
  { id: 58, cat: "polo900", name: "Polo del '900 - Sala Lettura Palazzo San Daniele", addr: "Via del Carmine 14", cap: "Numerosi", hrs: "Lun-Ven 9:30-13:30 / 14:30-18:30", feat: "300.000+ volumi, Wi-Fi, prenotazione", link: "https://www.polodel900.it" },
];

const STUDY_SPACE_CATEGORIES: Record<string, { it: string; en: string }> = {
  bar: { it: "Bar e Caffè", en: "Bars & Cafés" },
  biblioteca_nazionale: { it: "Biblioteca Nazionale", en: "National Library" },
  biblioteche_civiche: { it: "Biblioteche Civiche", en: "Public Libraries" },
  edisu: { it: "Sale Studio EDISU", en: "EDISU Study Halls" },
  politecnico: { it: "Biblioteche Politecnico", en: "Politecnico Libraries" },
  unito: { it: "Biblioteche UniTo", en: "UniTo Libraries" },
  campus_diffuso: { it: "Campus Diffuso", en: "University Diffused Campus" },
  coworking: { it: "Coworking", en: "Coworking Spaces" },
  parchi: { it: "Parchi con Wi-Fi", en: "Parks with Wi-Fi" },
  polo900: { it: "Polo del 900", en: "Polo del 900" },
};

mcpServer.tool("get_study_spaces", {
  description: "Find study spaces in Turin: libraries, EDISU study halls, cafés, coworking, parks. 58 locations with address, capacity, hours, features. Filter by category, Wi-Fi, or free text search.",
  inputSchema: {
    type: "object" as const,
    properties: {
      category: { type: "string", enum: ["bar", "biblioteca_nazionale", "biblioteche_civiche", "edisu", "politecnico", "unito", "campus_diffuso", "coworking", "parchi", "polo900"], description: "Filter by type of space" },
      wifi_only: { type: "boolean", description: "Show only spaces with Wi-Fi (default false)" },
      query: { type: "string", description: "Free text search on name, address, or features" },
    },
  },
  handler: (args: { category?: string; wifi_only?: boolean; query?: string }) => {
    let results = [...STUDY_SPACES];
    if (args.category) results = results.filter(s => s.cat === args.category);
    if (args.wifi_only) results = results.filter(s => s.feat.toLowerCase().includes("wi-fi"));
    if (args.query) {
      const words = args.query.toLowerCase().split(/\s+/).filter(w => w.length > 1);
      results = results.filter(s => {
        const haystack = `${s.name} ${s.addr} ${s.feat}`.toLowerCase();
        return words.every(w => haystack.includes(w));
      });
    }

    // Group by category
    const grouped: Record<string, typeof results> = {};
    for (const s of results) {
      if (!grouped[s.cat]) grouped[s.cat] = [];
      grouped[s.cat].push(s);
    }

    const output = Object.entries(grouped).map(([cat, spaces]) => ({
      category: cat,
      categoryLabel: STUDY_SPACE_CATEGORIES[cat] || { it: cat, en: cat },
      count: spaces.length,
      spaces: spaces.map(s => ({ name: s.name, address: s.addr, capacity: s.cap, hours: s.hrs, features: s.feat, ...(s.link ? { link: s.link } : {}) })),
    }));

    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({ totalCount: results.length, directoryUrl: "https://junglerent.it/strumenti/aule-studio-torino", categories: output }, null, 2),
      }],
    };
  },
});

// ============================================
// TOOL 11: GET CHEAP EATS
// ============================================

const CHEAP_EATS = [
  { id: "piola-cianci", name: "Piola Caffè Cianci", cat: "piola-piemontese", addr: "Largo IV Marzo 9/b", district: "Centro - Quadrilatero Romano", dish: "Antipasti, primi, secondi piemontesi", price: "€5-8", avg: "€8-12", range: "€5-8", veg: "yes", wifi: false, coords: [45.0750, 7.6810], featured: true },
  { id: "trattoria-ala", name: "Trattoria Ala", cat: "piola-piemontese", addr: "Via Santa Giulia 24", district: "Vanchiglia", dish: "Trippa al sugo, polpo alla piastra", price: "€7-10", avg: "€10-15", range: "€5-8", veg: "partial", wifi: false, coords: [45.0680, 7.6990] },
  { id: "gofreria-piemonteisa", name: "Gofreria Piemonteisa", cat: "street-food-piemontese", addr: "Via San Tommaso 4/a", district: "Centro - Quadrilatero Romano", dish: "Gofri ripiene salate e dolci", price: "€3-5", avg: "€5-8", range: "€3-5", veg: "yes", wifi: false, coords: [45.0730, 7.6780], featured: true },
  { id: "poormanger", name: "Poormanger", cat: "street-food-piemontese", addr: "Via Maria Vittoria 36/B", district: "Centro", dish: "Patate ripiene farcite", price: "€5-7", avg: "€6-9", range: "€5-8", veg: "yes", wifi: false, coords: [45.0685, 7.6890] },
  { id: "il-padellino", name: "Il Padellino", cat: "pizza-focaccia", addr: "Centro, Torino", district: "Centro", dish: "Pizza al tegamino", price: "€7", avg: "€7-10", range: "€5-8", veg: "yes", wifi: false, coords: [45.0700, 7.6850] },
  { id: "sicily-on-streeat", name: "Sicily on StreEat", cat: "street-food-italiano", addr: "Via Carlo Alberto 7/A", district: "Centro", dish: "Arancini, sfincioni, cannoli", price: "€4-7", avg: "€6-10", range: "€5-8", veg: "yes", wifi: false, coords: [45.0670, 7.6880], featured: true },
  { id: "panzerotteria-apulian", name: "La Panzerotteria Apulian Street Food", cat: "street-food-italiano", addr: "Corso San Maurizio 51", district: "Centro", dish: "Panzerotti ripieni", price: "€3-5", avg: "€5-8", range: "€3-5", veg: "partial", wifi: false, coords: [45.0705, 7.6970] },
  { id: "focacceria-ligure", name: "Focacceria Tipica Ligure", cat: "pizza-focaccia", addr: "Via Giolitti 4", district: "Centro", dish: "Focaccia e pizza al taglio", price: "€4-6", avg: "€6-10", range: "€5-8", veg: "yes", wifi: false, coords: [45.0645, 7.6815], featured: true },
  { id: "trapizzino", name: "Trapizzino", cat: "street-food-italiano", addr: "Piazza Carlo Emanuele II 17", district: "Centro", dish: "Trapizzino (pizza ripiena romana)", price: "€4-6", avg: "€6-10", range: "€5-8", veg: "yes", wifi: false, coords: [45.0655, 7.6920], featured: true },
  { id: "mu-bao", name: "Mu Bao", cat: "street-food-internazionale", addr: "Via Accademia delle Scienze 2e", district: "Centro", dish: "Bao (panini vapore) cinesi", price: "€4-5", avg: "€6-10", range: "€5-8", veg: "yes", wifi: false, coords: [45.0685, 7.6845] },
  { id: "bigoi", name: "Bigoi", cat: "street-food-italiano", addr: "Via Po 22", district: "Centro", dish: "Pasta fresca veneta", price: "€5-7", avg: "€6-9", range: "€5-8", veg: "yes", wifi: false, coords: [45.0675, 7.6925] },
  { id: "polentone", name: "PolentOne", cat: "street-food-piemontese", addr: "Via Po 35/I", district: "Centro", dish: "Polenta con sughi", price: "€5-7", avg: "€6-9", range: "€5-8", veg: "yes", wifi: false, coords: [45.0665, 7.6945] },
  { id: "monegato", name: "Monegato di via Verdi", cat: "ristorante-economico", addr: "Via Giuseppe Verdi 20", district: "Centro", dish: "Cucina mediterranea", price: "€8-12", avg: "€10-15", range: "€8-12", veg: "yes", wifi: true, coords: [45.0715, 7.6875], featured: true },
  { id: "la-fucina", name: "La Fucina Caffè", cat: "ristorante-economico", addr: "Centro, Torino", district: "Centro", dish: "Primi e secondi semplici", price: "€8-10", avg: "€10-15", range: "€8-12", veg: "yes", wifi: false, coords: [45.0695, 7.6860] },
  { id: "articiocc", name: "Articiocc", cat: "vegetariano", addr: "Centro, Torino", district: "Centro", dish: "Piatti vegetariani/vegani", price: "€7", avg: "€10-12", range: "€5-8", veg: "yes", wifi: false, coords: [45.0680, 7.6835] },
  { id: "fermata-nizza", name: "Trattoria Fermata Nizza", cat: "ristorante-economico", addr: "Piazza Nizza", district: "Centro", dish: "Antipasto + primo/secondo", price: "€10-11", avg: "€10-15", range: "€8-12", veg: "yes", wifi: false, coords: [45.0550, 7.6750] },
  { id: "mensa-michelangelo", name: "Mense EDISU - Michelangelo", cat: "mensa-universitaria", addr: "Via Michelangelo Buonarroti 17bis", district: "Centro", dish: "Pasto completo (primo, secondo, contorno)", price: "€3-7", avg: "€3-12", range: "€3-12", veg: "yes", wifi: true, coords: [45.0590, 7.6620], featured: true },
  { id: "mensa-varie", name: "Mense EDISU Piemonte - Varie Sedi", cat: "mensa-universitaria", addr: "Multiple sedi", district: "Varie", dish: "Pasto completo", price: "€3-7", avg: "€3-12", range: "€3-12", veg: "yes", wifi: true, coords: [45.0650, 7.6700] },
  { id: "muurgheria", name: "MuUrgheria", cat: "hamburgheria", addr: "Centro, Torino", district: "Centro", dish: "Burger carne km0", price: "€7-10", avg: "€8-12", range: "€8-12", veg: "yes", wifi: false, coords: [45.0710, 7.6830] },
  { id: "walles-burger", name: "Walle's Burger Torino", cat: "hamburgheria", addr: "Centro, Torino", district: "Centro", dish: "Burger artigianali", price: "€7-10", avg: "€8-12", range: "€8-12", veg: "yes", wifi: false, coords: [45.0720, 7.6870] },
];

mcpServer.tool("get_cheap_eats", {
  description: "Find budget-friendly restaurants and street food in Turin for students. 20 locations with prices €3-12. Filter by category, price range, vegetarian options, district, or free text.",
  inputSchema: {
    type: "object" as const,
    properties: {
      category: { type: "string", enum: ["piola-piemontese", "street-food-piemontese", "street-food-italiano", "street-food-internazionale", "pizza-focaccia", "ristorante-economico", "hamburgheria", "mensa-universitaria", "vegetariano"], description: "Filter by food category" },
      price_range: { type: "string", enum: ["€3-5", "€5-8", "€8-12"], description: "Filter by price range" },
      vegetarian: { type: "boolean", description: "Show only fully vegetarian-friendly places" },
      district: { type: "string", description: "Filter by district name (e.g. 'Centro', 'Vanchiglia')" },
      query: { type: "string", description: "Free text search on name, dish, or district" },
    },
  },
  handler: (args: { category?: string; price_range?: string; vegetarian?: boolean; district?: string; query?: string }) => {
    let results = [...CHEAP_EATS];
    if (args.category) results = results.filter(e => e.cat === args.category);
    if (args.price_range) results = results.filter(e => e.range === args.price_range);
    if (args.vegetarian) results = results.filter(e => e.veg === "yes");
    if (args.district) {
      const d = args.district.toLowerCase();
      results = results.filter(e => e.district.toLowerCase().includes(d));
    }
    if (args.query) {
      const words = args.query.toLowerCase().split(/\s+/).filter(w => w.length > 1);
      results = results.filter(e => {
        const haystack = `${e.name} ${e.dish} ${e.district} ${e.cat}`.toLowerCase();
        return words.every(w => haystack.includes(w));
      });
    }

    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          count: results.length,
          directoryUrl: "https://junglerent.it/strumenti/dove-mangiare-torino",
          restaurants: results.map(e => ({
            name: e.name, category: e.cat, address: e.addr, district: e.district,
            typicalDish: e.dish, dishPrice: e.price, avgMeal: e.avg, priceRange: e.range,
            vegetarian: e.veg, wifi: e.wifi, coordinates: e.coords,
            ...(e.featured ? { featured: true } : {}),
          })),
        }, null, 2),
      }],
    };
  },
});

// ============================================
// TOOL 12: GET STRIKE INFO
// ============================================

const STRIKE_CALENDAR = [
  { date: "2026-01-08", regions: ["Abruzzo"], companies: ["TUA"], duration: "4h (09:00-13:00)", severity: "local" },
  { date: "2026-01-08", regions: ["Napoli"], companies: ["EAV"], duration: "24h", severity: "regional" },
  { date: "2026-01-09", dateEnd: "2026-01-10", regions: ["Nazionale"], companies: ["Trenitalia", "Italo", "RFI", "Trenord", "Easyjet", "Vueling", "ENAV"], duration: "24h (21:00→21:00)", guaranteedTimes: "Regionali: 06:00-09:00 e 18:00-21:00", severity: "national", notes: "SCIOPERO PRINCIPALE - ~70% treni cancellati" },
  { date: "2026-01-12", dateEnd: "2026-01-13", regions: ["Lombardia"], companies: ["Trenord", "Malpensa Express"], duration: "23h", severity: "regional" },
  { date: "2026-01-13", regions: ["Nazionale (esclusa Umbria)"], companies: ["Taxi - 20 sigle sindacali"], duration: "24h", severity: "national", notes: "ZERO taxi. Usare Uber, FreeNow, car sharing" },
  { date: "2026-01-15", regions: ["Milano"], companies: ["ATM Milano (metro, tram, bus)"], duration: "24h", guaranteedTimes: "05:30-08:45 e 15:00-18:00", severity: "local" },
  { date: "2026-01-20", regions: ["Nazionale"], companies: ["Trenitalia", "Italo", "TPL locale"], duration: "24h", guaranteedTimes: "06:00-09:00 e 18:00-21:00", severity: "national", notes: "SECONDO SCIOPERO NAZIONALE" },
  { date: "2026-01-30", regions: ["Bologna"], companies: ["RFI area Bologna"], duration: "8h", severity: "local" },
  { date: "2026-01-31", regions: ["Verona"], companies: ["ENAV Verona"], duration: "4h (13:00-17:00)", severity: "local" },
  { date: "2026-02-02", regions: ["Roma", "Lazio"], companies: ["Appalti ferroviari Lazio"], duration: "4h", severity: "local" },
  { date: "2026-02-16", regions: ["Nazionale"], companies: ["ITA Airways", "ENAV"], duration: "24h", severity: "national", notes: "SCIOPERO AEREO NAZIONALE" },
  { date: "2026-03-07", regions: ["Nazionale"], companies: ["ENAV", "Compagnie aeree"], duration: "8h (10:00-18:00)", severity: "national", notes: "SCIOPERO AEREO NAZIONALE" },
];

const EMERGENCY_CONTACTS = [
  { name: "Trenitalia Call Center", number: "892021", cost: "0,549€/min", hours: "24/7", city: "Nazionale" },
  { name: "Trenitalia da Mobile", number: "06 3000", cost: "standard", hours: "24/7", city: "Nazionale" },
  { name: "Trenitalia Assistenza Disabili", number: "800.90.60.60", cost: "gratuito", hours: "06:45-21:30", city: "Nazionale" },
  { name: "Italo Assistenza", number: "892020", cost: "~15€/chiamata", hours: "06:00-23:00", city: "Nazionale" },
  { name: "Italo Vendita (GRATUITO)", number: "060708", cost: "gratuito", hours: "07:00-23:00", city: "Nazionale" },
  { name: "Trenord", number: "02.72.49.49.49", cost: "standard", hours: "06:00-00:00", city: "Lombardia" },
  { name: "GTT Torino", number: "800 019 152", cost: "gratuito", hours: "24/7", city: "Torino" },
  { name: "GTT Torino da Cellulare", number: "011 0672 000", cost: "standard", hours: "06:30-19:30", city: "Torino" },
  { name: "ATM Milano", number: "802 808", cost: "gratuito", hours: "24/7", city: "Milano" },
  { name: "ATAC Roma", number: "06 5753 5333", cost: "gratuito", hours: "24/7", city: "Roma" },
  { name: "Enjoy Car Sharing Emergenza", number: "800 900 505", cost: "gratuito", hours: "24/7", city: "Nazionale" },
  { name: "Emergenza Europea", number: "112", cost: "gratuito", hours: "24/7", city: "Nazionale" },
];

const ALTERNATIVE_TRANSPORT = [
  { name: "BlaBlaCar", type: "carpooling", priceFrom: "€13", coverage: "Italia + Europa", website: "https://www.blablacar.it" },
  { name: "FlixBus", type: "bus", priceFrom: "€5", coverage: "300+ destinazioni, WiFi gratuito", website: "https://www.flixbus.it" },
  { name: "Itabus", type: "bus", priceFrom: "€9", coverage: "19 regioni italiane", website: "https://www.itabus.it" },
  { name: "Enjoy", type: "car_sharing", priceFrom: "0,28€/min", coverage: "Milano, Roma, Firenze, Torino, Bologna", website: "https://enjoy.eni.com" },
  { name: "SHARE NOW", type: "car_sharing", priceFrom: "0,19€/min", coverage: "Milano, Roma, Torino", website: "https://www.share-now.com" },
  { name: "Uber", type: "ridesharing", coverage: "Roma, Milano + altre città", website: "https://www.uber.com/it" },
  { name: "FreeNow", type: "ridesharing", coverage: "Roma, Milano, Torino", website: "https://www.free-now.com" },
];

const REFUND_PROCEDURES = [
  { company: "Trenitalia", type: "request", deadline: "Frecce/Intercity: entro orario partenza | Regionali: 24h prima", amount: "100%", method: "Web form (gratuito, 3-5 gg) o app Trenitalia", url: "https://www.trenitalia.com/it/informazioni/rimborsi-e-indennizzi.html" },
  { company: "Italo", type: "automatic", deadline: "Automatico entro 30 giorni", amount: "100%", method: "NESSUNA AZIONE - rimborso automatico su metodo originale", url: "https://www.italotreno.it/it/acquista/rimborso" },
  { company: "Trenord", type: "request", deadline: "Entro 30 giorni", amount: "100%", method: "Chat TREasy (gratuita, 24/7, 5-10 min)", url: "https://www.trenord.it/assistenza/rimborsi/" },
  { company: "Compagnie aeree", type: "request", deadline: "Immediata", amount: "100% o volo alternativo", method: "App compagnia o telefono diretto" },
];

const PASSENGER_RIGHTS = [
  { right: "Rimborso 100%", description: "Se treno/volo cancellato per sciopero" },
  { right: "Fasce garantite", description: "Sempre mantenute: 06:00-09:00 e 18:00-21:00" },
  { right: "Assistenza al suolo", description: "Pasti, hotel, taxi se necessari (aerei)" },
  { right: "Validità 12 mesi", description: "Rimborsi richiedibili fino a 12 mesi dopo evento" },
  { right: "Riprogrammazione gratuita", description: "Cambio data/treno senza costi aggiuntivi" },
];

mcpServer.tool("get_strike_info", {
  description: "Get transport strike information for Italy (January-March 2026): strike calendar, emergency contacts, alternative transport, refund procedures, and passenger rights. Essential for travel planning.",
  inputSchema: {
    type: "object" as const,
    properties: {
      month: { type: "string", enum: ["january", "february", "march"], description: "Filter strikes by month" },
      severity: { type: "string", enum: ["national", "regional", "local"], description: "Filter by strike severity" },
      city: { type: "string", description: "Filter emergency contacts by city (e.g. 'Torino', 'Milano', 'Roma')" },
      upcoming_only: { type: "boolean", description: "Show only future strikes (default false)" },
    },
  },
  handler: (args: { month?: string; severity?: string; city?: string; upcoming_only?: boolean }) => {
    let strikes = [...STRIKE_CALENDAR];

    if (args.month) {
      const monthMap: Record<string, string> = { january: "01", february: "02", march: "03" };
      const m = monthMap[args.month];
      if (m) strikes = strikes.filter(s => s.date.substring(5, 7) === m);
    }
    if (args.severity) strikes = strikes.filter(s => s.severity === args.severity);
    if (args.upcoming_only) {
      const today = new Date().toISOString().substring(0, 10);
      strikes = strikes.filter(s => s.date >= today);
    }

    let contacts = [...EMERGENCY_CONTACTS];
    if (args.city) {
      const c = args.city.toLowerCase();
      contacts = contacts.filter(ct => ct.city.toLowerCase().includes(c) || ct.city === "Nazionale");
    }

    return {
      content: [{
        type: "text" as const,
        text: JSON.stringify({
          strikes: { count: strikes.length, events: strikes },
          emergencyContacts: contacts,
          alternativeTransport: ALTERNATIVE_TRANSPORT,
          refundProcedures: REFUND_PROCEDURES,
          passengerRights: PASSENGER_RIGHTS,
          officialLinks: {
            mitCalendar: "https://www.mit.gov.it/calendario-scioperi",
            mitInteractive: "https://scioperi.mit.gov.it/mit2/public/scioperi",
          },
          directoryUrl: "https://junglerent.it/scioperi-italia",
          note: "Data as of March 2026. Always verify on MIT calendar before traveling.",
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
