import { BlogPost, BlogCategory } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    slug: "torino-citta-7-minuti-walkability",
    category: "societa",
    date: "2026-02-02",
    author: "Jungle Rent Team",
    image: "/images/portici-torino.jpg",
    readTime: 12,
    content: "torino-citta-7-minuti-walkability",
    translations: {
      it: {
        title: "Torino: la città a sette minuti",
        excerpt: "Torino è la terza città più camminabile al mondo. 7 minuti per raggiungere scuole, negozi e servizi essenziali.",
        seo: {
          title: "Torino 3ª città più camminabile al mondo | Solo 7 minuti",
          description: "Torino batte Parigi e Berlino: tutto a 7 minuti a piedi. Scopri i quartieri più walkable e perché conviene investire qui.",
          keywords: [
            "torino walkability",
            "città 15 minuti torino",
            "camminabilità torino",
            "città camminabili europa",
            "qualità vita torino",
            "urbanistica torino",
            "portici torino",
            "torino vs milano walkability",
            "investire torino walkability",
            "15 minute city italia"
          ]
        },
        tags: ["Società", "Urbanistica", "Qualità vita", "Torino", "Sostenibilità"],
        faqs: [
          { question: "Torino è una città camminabile?", answer: "Sì, Torino è la terza città più camminabile al mondo secondo World of Statistics / The Economist. In media servono solo 7 minuti a piedi per raggiungere scuole, negozi e servizi sanitari essenziali." },
          { question: "Quanti minuti servono per raggiungere i servizi a Torino?", answer: "In media 7 minuti a piedi. Questo posiziona Torino al terzo posto mondiale per camminabilità, dopo Milano (6 min) e Copenaghen (6 min)." },
          { question: "Qual è la posizione di Torino nella classifica delle città più camminabili?", answer: "Torino è al 3° posto mondiale per camminabilità, davanti a Parigi (8 min), Vienna (8 min), Berlino (9 min) e Barcellona (9 min)." },
          { question: "Torino è più camminabile di Milano?", answer: "No, Milano è leggermente più camminabile con 6 minuti medi, rispetto ai 7 di Torino. Entrambe sono però nella top 3 mondiale." },
          { question: "Perché Torino è così camminabile?", answer: "Quattro fattori: griglia urbana compatta e razionale, quartieri a uso misto con commercio al piano terra, 18 km di portici continui e un'eccellente rete di trasporto pubblico." },
          { question: "Cosa sono i portici di Torino?", answer: "I portici sono camminamenti coperti che collegano le vie principali del centro. Torino ne ha oltre 18 km, che proteggono da pioggia e sole e rendono la passeggiata piacevole tutto l'anno." },
          { question: "Torino è una città a 15 minuti?", answer: "Sì, Torino incarna naturalmente il concetto di 'città a 15 minuti'. La maggior parte dei servizi essenziali è raggiungibile in soli 7 minuti a piedi." },
          { question: "La camminabilità influenza i prezzi degli immobili a Torino?", answer: "Sì, i quartieri più camminabili come Centro, Crocetta, San Salvario e Vanchiglia mostrano valori immobiliari più alti e tassi di occupazione superiori negli affitti." },
          { question: "Quali quartieri di Torino sono più camminabili?", answer: "I più camminabili sono Centro, Crocetta, San Salvario, Vanchiglia, Cit Turin e Campidoglio. Le zone periferiche post-belliche tendono ad avere distanze maggiori." },
          { question: "Torino è camminabile anche d'inverno?", answer: "Sì, grazie ai 18 km di portici coperti che proteggono dalla pioggia e dal freddo. Il sistema dei portici rende la camminata piacevole in ogni stagione." }
        ]
      },
      en: {
        title: "Turin: a seven-minute city",
        excerpt: "Turin ranks 3rd globally for walkability. Just 7 minutes to reach schools, shops, and essential services.",
        seo: {
          title: "Turin: 3rd most walkable city in the world | 7 minutes",
          description: "Turin beats Paris and Berlin: everything within 7 min walk. Discover the best neighborhoods and why investors love it.",
          keywords: [
            "turin walkability",
            "15 minute city turin",
            "walkable cities europe",
            "turin quality of life",
            "turin urban planning",
            "turin porticos",
            "turin vs milan walkability",
            "invest turin walkability",
            "15 minute city italy",
            "most walkable cities world"
          ]
        },
        tags: ["Society", "Urban planning", "Quality of life", "Turin", "Sustainability"],
        faqs: [
          { question: "Is Turin a walkable city?", answer: "Yes, Turin is the third most walkable city in the world according to World of Statistics / The Economist. On average, it takes just 7 minutes on foot to reach schools, shops, and essential healthcare services." },
          { question: "How long does it take to reach services in Turin?", answer: "On average 7 minutes on foot. This ranks Turin third worldwide for walkability, after Milan (6 min) and Copenhagen (6 min)." },
          { question: "Where does Turin rank among the most walkable cities?", answer: "Turin ranks 3rd worldwide for walkability, ahead of Paris (8 min), Vienna (8 min), Berlin (9 min), and Barcelona (9 min)." },
          { question: "Is Turin more walkable than Milan?", answer: "No, Milan is slightly more walkable with 6 minutes average, compared to Turin's 7. However, both are in the global top 3." },
          { question: "Why is Turin so walkable?", answer: "Four factors: compact and rational urban grid, mixed-use neighborhoods with ground-floor commerce, 18 km of continuous porticos, and an excellent public transport network." },
          { question: "What are Turin's porticos?", answer: "Porticos are covered walkways connecting the main streets of the city center. Turin has over 18 km of them, protecting from rain and sun and making walking pleasant year-round." },
          { question: "Is Turin a 15-minute city?", answer: "Yes, Turin naturally embodies the '15-minute city' concept. Most essential services are reachable in just 7 minutes on foot." },
          { question: "Does walkability affect property prices in Turin?", answer: "Yes, the most walkable neighborhoods like Centro, Crocetta, San Salvario, and Vanchiglia show higher property values and better occupancy rates for rentals." },
          { question: "Which neighborhoods in Turin are most walkable?", answer: "The most walkable are Centro, Crocetta, San Salvario, Vanchiglia, Cit Turin, and Campidoglio. Post-war peripheral areas tend to have longer distances." },
          { question: "Is Turin walkable in winter?", answer: "Yes, thanks to 18 km of covered porticos that protect from rain and cold. The portico system makes walking pleasant in any season." }
        ]
      }
    }
  },
  {
    slug: "cedolare-secca-2026-investitori",
    category: "investors",
    date: "2026-01-17",
    author: "Jungle Rent Team",
    image: "/images/mortgage-investment.jpg",
    readTime: 15,
    content: "cedolare-secca-2026-investitori",
    translations: {
      it: {
        title: "Cedolare secca 2026: guida completa alle novità fiscali per investitori",
        excerpt: "Aumento aliquota dal 21% al 26%, periodi transitori e strategie di ottimizzazione fiscale per proprietari di immobili a reddito.",
        seo: {
          title: "Cedolare secca 2026: dal 21% al 26% | Cosa fare ora",
          description: "Aumento tasse affitti 2026: come risparmiare €1.700/anno con le nuove regole. Strategie, scadenze e confronto IRPEF.",
          keywords: [
            "cedolare secca 2026",
            "cedolare secca 26%",
            "aumento cedolare secca",
            "tasse affitto 2026",
            "cedolare secca investitori",
            "aliquota cedolare secca",
            "locazione abitativa 2026",
            "tassazione affitti italia",
            "cedolare secca vs irpef",
            "legge bilancio 2026 affitti",
            "rinnovo contratto cedolare secca",
            "social housing cedolare secca"
          ]
        },
        tags: ["Investitori", "Fiscalità", "Cedolare secca", "Affitti", "Guide"],
        faqs: [
          { question: "Qual è l'aliquota della cedolare secca nel 2026?", answer: "Dal 1° gennaio 2026, l'aliquota ordinaria della cedolare secca è aumentata dal 21% al 26% per i nuovi contratti e i rinnovi. I contratti stipulati entro il 31 dicembre 2025 mantengono l'aliquota del 21% fino alla scadenza naturale." },
          { question: "La cedolare secca al 26% conviene ancora rispetto all'IRPEF?", answer: "Sì, la cedolare secca al 26% rimane significativamente più conveniente della dichiarazione ordinaria. Su €10.000 di reddito lordo, la cedolare secca genera €2.600 di imposta, mentre IRPEF + IRAP genererebbero circa €4.300." },
          { question: "I contratti già in essere passano al 26%?", answer: "No, i contratti stipulati prima del 1° gennaio 2026 con opzione cedolare secca già esercitata mantengono l'aliquota del 21% fino alla scadenza. Il 26% si applica solo ai rinnovi successivi al 1° gennaio 2026." },
          { question: "La cedolare secca si applica agli affitti brevi?", answer: "No, la cedolare secca si applica solo a locazioni abitative di durata minima 180 giorni. Gli affitti brevi (Airbnb, Booking) sono tassati con IRPEF ordinaria secondo gli scaglioni progressivi." },
          { question: "Esiste ancora l'aliquota ridotta al 10%?", answer: "Sì, l'aliquota agevolata del 10% è confermata per contratti in cui almeno il 75% del canone viene destinato a fondi comuni di social housing, in comuni ad alta tensione abitativa." },
          { question: "Cosa succede se il mio contratto si rinnova tacitamente nel 2026?", answer: "Il rinnovo tacito dopo il 1° gennaio 2026 costituisce novazione contrattuale e comporta l'applicazione della nuova aliquota del 26%. Consiglio: formalizzare il rinnovo entro il 31 dicembre 2025 per preservare il 21%." },
          { question: "Conviene ancora investire in immobili a reddito nel 2026?", answer: "Sì, nonostante l'aumento dell'aliquota. Un immobile a Torino con €12.000 di reddito lordo genera ancora un rendimento netto del 5,55% circa. La cedolare secca resta il regime più vantaggioso rispetto alla tassazione ordinaria." },
          { question: "Le società immobiliari possono usare la cedolare secca?", answer: "No, la cedolare secca è riservata esclusivamente alle persone fisiche. Le società (S.R.L., S.P.A.) sono soggette al regime ordinario con IRES o IRPEF per società di persone." },
          { question: "Quanto costa registrare un contratto con cedolare secca?", answer: "L'imposta di registro per contratti registrati online tramite modello RLI ammonta a soli €16, indipendentemente dall'importo del canone. La registrazione deve avvenire entro 30 giorni dalla stipula." },
          { question: "Dove trovo le fonti normative sulla cedolare secca 2026?", answer: "Le fonti principali sono: Legge 27 dicembre 2025 n. 207 (Bilancio 2026), D.L. 6 dicembre 2011 n. 201, Circolari Agenzia Entrate n. 39/E 2022 e n. 18/E 2023. Tutti i link sono nell'articolo." }
        ]
      },
      en: {
        title: "Cedolare secca 2026: complete guide to tax changes for property investors",
        excerpt: "Tax rate increase from 21% to 26%, transition periods and optimization strategies for rental property owners in Italy.",
        seo: {
          title: "Cedolare secca 2026: 21% to 26% | What to do now",
          description: "Italy rental tax increase 2026: save €1,700/year with new rules. Deadlines, strategies, and IRPEF comparison inside.",
          keywords: [
            "cedolare secca 2026",
            "cedolare secca 26%",
            "flat tax italy rental",
            "rental tax italy 2026",
            "cedolare secca investors",
            "italy property tax",
            "residential lease tax 2026",
            "rental taxation italy",
            "cedolare secca vs irpef",
            "2026 budget law rentals",
            "contract renewal cedolare secca",
            "social housing flat tax italy"
          ]
        },
        tags: ["Investors", "Taxation", "Cedolare secca", "Rentals", "Guides"],
        faqs: [
          { question: "What is the cedolare secca rate in 2026?", answer: "From January 1, 2026, the standard cedolare secca rate increased from 21% to 26% for new contracts and renewals. Agreements signed by December 31, 2025 maintain the 21% rate until natural expiration." },
          { question: "Is cedolare secca at 26% still better than IRPEF?", answer: "Yes, cedolare secca at 26% remains significantly more advantageous than standard declaration. On €10,000 gross income, cedolare secca generates €2,600 tax, while IRPEF + IRAP would generate approximately €4,300." },
          { question: "Do existing contracts switch to 26%?", answer: "No, contracts signed before January 1, 2026 with cedolare secca option already exercised maintain the 21% rate until expiration. The 26% applies only to renewals after January 1, 2026." },
          { question: "Does cedolare secca apply to short-term rentals?", answer: "No, cedolare secca applies only to residential leases of minimum 180 days duration. Short-term rentals (Airbnb, Booking) are taxed with standard IRPEF according to progressive brackets." },
          { question: "Does the reduced 10% rate still exist?", answer: "Yes, the preferential 10% rate is confirmed for contracts where at least 75% of rent is allocated to common social housing funds, in high housing tension municipalities." },
          { question: "What happens if my contract tacitly renews in 2026?", answer: "Tacit renewal after January 1, 2026 constitutes contractual novation and results in application of the new 26% rate. Advice: formalize renewal by December 31, 2025 to preserve the 21%." },
          { question: "Is it still worth investing in rental properties in 2026?", answer: "Yes, despite the rate increase. A property in Turin with €12,000 gross income still generates approximately 5.55% net return. Cedolare secca remains the most advantageous regime compared to standard taxation." },
          { question: "Can real estate companies use cedolare secca?", answer: "No, cedolare secca is reserved exclusively for natural persons. Companies (S.R.L., S.P.A.) are subject to standard regime with IRES or IRPEF for partnerships." },
          { question: "How much does it cost to register a contract with cedolare secca?", answer: "Registration tax for contracts registered online via RLI form amounts to only €16, regardless of rent amount. Registration must occur within 30 days of signing." },
          { question: "Where can I find regulatory sources on cedolare secca 2026?", answer: "Main sources are: Law December 27, 2025 no. 207 (2026 Budget), D.L. December 6, 2011 no. 201, Revenue Agency Circulars no. 39/E 2022 and no. 18/E 2023. All links are in the article." }
        ]
      }
    }
  },
  {
    slug: "sciopero-trasporti-italia-gennaio-2026",
    category: "societa",
    date: "2026-01-09",
    author: "Jungle Rent Team",
    image: "/images/torino-transport.jpg",
    readTime: 25,
    content: "sciopero-trasporti-italia-gennaio-2026",
    translations: {
      it: {
        title: "Sciopero trasporti Italia gennaio 2026: cosa sapere",
        excerpt: "Aggiornamenti sugli scioperi dei trasporti in Italia a gennaio 2026, impatti e consigli per spostamenti a Torino e altre città.",
        seo: {
          title: "Sciopero trasporti 13-15 gennaio 2026 | Orari e alternative",
          description: "Sciopero treni, bus e metro gennaio 2026: date confermate, fasce garantite e come muoversi. Aggiornato oggi.",
          keywords: [
            "sciopero trasporti 2026",
            "sciopero treni italia",
            "sciopero autobus torino",
            "trasporti pubblici sciopero",
            "sciopero gennaio 2026",
            "mobilità torino",
            "sciopero metro torino",
            "aggiornamenti sciopero trasporti"
          ]
        },
        tags: ["Società", "Trasporti", "Sciopero", "Mobilità", "Torino"],
        faqs: [
          { question: "Quando è previsto lo sciopero dei trasporti a gennaio 2026?", answer: "Lo sciopero è previsto per il 15 gennaio 2026, con possibili estensioni in alcune regioni." },
          { question: "Quali mezzi saranno coinvolti?", answer: "Treni, autobus e metropolitane in diverse città italiane, inclusa Torino." },
          { question: "Come posso informarmi sugli orari garantiti?", answer: "Consulta i siti ufficiali delle compagnie di trasporto e le comunicazioni sindacali." },
          { question: "Ci sono alternative per spostarsi durante lo sciopero?", answer: "Si consiglia l'uso di mezzi privati, car sharing o biciclette." }
        ]
      },
      en: {
        title: "Transport strike Italy January 2026: what to know",
        excerpt: "Updates on transport strikes in Italy in January 2026, impacts and tips for traveling in Turin and other cities.",
        seo: {
          title: "Italy transport strike Jan 13-15, 2026 | Schedules & tips",
          description: "Train, bus and metro strikes January 2026: confirmed dates, guaranteed hours and travel alternatives. Updated today.",
          keywords: [
            "transport strike 2026",
            "train strike italy",
            "bus strike turin",
            "public transport strike",
            "strike january 2026",
            "mobility turin",
            "turin metro strike",
            "strike updates transport"
          ]
        },
        tags: ["Society", "Transport", "Strike", "Mobility", "Turin"],
        faqs: [
          { question: "When is the transport strike scheduled in January 2026?", answer: "The strike is scheduled for January 15, 2026, with possible extensions in some regions." },
          { question: "Which means of transport will be involved?", answer: "Trains, buses and subways in various Italian cities, including Turin." },
          { question: "How can I find out about guaranteed schedules?", answer: "Check official transport company websites and union communications." },
          { question: "Are there alternatives to travel during the strike?", answer: "Use private vehicles, car sharing or bicycles." }
        ]
      }
    }
  },
  {
    slug: "props-gestione-immobiliare-semplificata",
    category: "investors",
    date: "2025-12-31",
    author: "Jungle Rent Team",
    image: "/images/digital-nomad-torino.jpg",
    readTime: 12,
    content: "props-gestione-immobiliare-semplificata",
    translations: {
      it: {
        title: "Props: gestione immobiliare semplificata per investitori",
        excerpt: "Come utilizzare Props per una gestione immobiliare efficiente e semplificata, ottimizzando tempi e costi.",
        seo: {
          title: "Props gestione immobiliare | Soluzioni per investitori",
          description: "Scopri come Props può aiutarti nella gestione immobiliare semplificata, con strumenti digitali e supporto dedicato.",
          keywords: [
            "props gestione immobiliare",
            "gestione affitti semplificata",
            "investimenti immobiliari digitali",
            "props app immobiliare",
            "ottimizzazione gestione immobili"
          ]
        },
        tags: ["Investitori", "Gestione", "Immobiliare", "Props", "Tecnologia"],
        faqs: [
          { question: "Cos'è Props?", answer: "Props è una piattaforma digitale per la gestione immobiliare semplificata." },
          { question: "Come può aiutare gli investitori?", answer: "Automatizza processi, riduce errori e migliora la comunicazione con gli inquilini." },
          { question: "Quali servizi offre?", answer: "Gestione contratti, pagamenti, manutenzioni e reportistica." }
        ]
      },
      en: {
        title: "Props: simplified real estate management for investors",
        excerpt: "How to use Props for efficient and simplified real estate management, optimizing time and costs.",
        seo: {
          title: "Props real estate management | Solutions for investors",
          description: "Discover how Props can help you in simplified real estate management, with digital tools and dedicated support.",
          keywords: [
            "props real estate management",
            "simplified rent management",
            "digital real estate investments",
            "props real estate app",
            "real estate management optimization"
          ]
        },
        tags: ["Investors", "Management", "Real Estate", "Props", "Technology"],
        faqs: [
          { question: "What is Props?", answer: "Props is a digital platform for simplified real estate management." },
          { question: "How can it help investors?", answer: "Automates processes, reduces errors and improves communication with tenants." },
          { question: "What services does it offer?", answer: "Contract management, payments, maintenance and reporting." }
        ]
      }
    }
  },
  {
    slug: "palestre-torino-studenti-guida-completa",
    category: "students",
    date: "2026-01-01",
    author: "Jungle Rent Team",
    image: "/images/digital-nomad-torino.jpg",
    readTime: 14,
    content: "palestre-torino-studenti-guida-completa",
    translations: {
      it: {
        title: "Palestre a Torino per studenti: guida completa",
        excerpt: "Le migliori palestre a Torino per studenti universitari, con offerte, orari e servizi dedicati.",
        seo: {
          title: "Palestre Torino studenti | Guida alle migliori strutture",
          description: "Scopri le palestre più adatte agli studenti a Torino, con prezzi accessibili e servizi flessibili.",
          keywords: [
            "palestre torino studenti",
            "fitness universitari torino",
            "offerte palestre torino",
            "palestre low cost torino",
            "sport studenti torino"
          ]
        },
        tags: ["Studenti", "Palestre", "Torino", "Fitness", "Guide"],
        faqs: [
          { question: "Quali sono le palestre più economiche per studenti a Torino?", answer: "Palestre come XYZ offrono sconti speciali per studenti universitari." },
          { question: "Ci sono palestre vicino alle università?", answer: "Sì, molte palestre sono situate vicino ai principali campus universitari." },
          { question: "Quali servizi offrono le palestre per studenti?", answer: "Offrono corsi di gruppo, attrezzature moderne e orari flessibili." }
        ]
      },
      en: {
        title: "Gyms in Turin for students: complete guide",
        excerpt: "The best gyms in Turin for university students, with offers, schedules and dedicated services.",
        seo: {
          title: "Gyms Turin students | Guide to the best facilities",
          description: "Discover the most suitable gyms for students in Turin, with affordable prices and flexible services.",
          keywords: [
            "gyms turin students",
            "fitness university turin",
            "gym offers turin",
            "low cost gyms turin",
            "student sports turin"
          ]
        },
        tags: ["Students", "Gyms", "Turin", "Fitness", "Guides"],
        faqs: [
          { question: "What are the cheapest gyms for students in Turin?", answer: "Gyms like XYZ offer special discounts for university students." },
          { question: "Are there gyms near universities?", answer: "Yes, many gyms are located near major university campuses." },
          { question: "What services do gyms offer for students?", answer: "They offer group classes, modern equipment and flexible hours." }
        ]
      }
    }
  },
  {
    slug: "emergenze-affitti-torino-diritti-inquilini",
    category: "students",
    date: "2025-12-27",
    author: "Jungle Rent Team",
    image: "/images/quadrilatero-notte-torino.jpg",
    readTime: 18,
    content: "emergenze-affitti-torino-diritti-inquilini",
    translations: {
      it: {
        title: "Emergenze affitti a Torino: diritti degli inquilini",
        excerpt: "Come tutelare i diritti degli inquilini durante le emergenze abitative a Torino.",
        seo: {
          title: "Emergenze affitti Torino | Diritti inquilini e soluzioni",
          description: "Guida ai diritti degli inquilini in situazioni di emergenza abitativa a Torino, con consigli pratici e risorse utili.",
          keywords: [
            "emergenze affitti torino",
            "diritti inquilini torino",
            "tutela affitti emergenza",
            "affitti studenti torino",
            "supporto inquilini torino"
          ]
        },
        tags: ["Studenti", "Affitti", "Diritti", "Torino", "Emergenze"],
        faqs: [
          { question: "Quali sono i diritti degli inquilini in emergenza?", answer: "Gli inquilini hanno diritto a soluzioni abitative temporanee e supporto legale." },
          { question: "Come posso segnalare un'emergenza affitti?", answer: "Contatta i servizi sociali o associazioni di tutela inquilini a Torino." },
          { question: "Ci sono agevolazioni per studenti in difficoltà?", answer: "Sì, esistono fondi e programmi dedicati agli studenti universitari." }
        ]
      },
      en: {
        title: "Rental emergencies in Turin: tenants' rights",
        excerpt: "How to protect tenants' rights during housing emergencies in Turin.",
        seo: {
          title: "Rental emergencies Turin | Tenants' rights and solutions",
          description: "Guide to tenants' rights in housing emergency situations in Turin, with practical advice and useful resources.",
          keywords: [
            "rental emergencies turin",
            "tenants rights turin",
            "rental protection emergency",
            "student rentals turin",
            "tenant support turin"
          ]
        },
        tags: ["Students", "Rentals", "Rights", "Turin", "Emergencies"],
        faqs: [
          { question: "What are tenants' rights in emergencies?", answer: "Tenants have the right to temporary housing solutions and legal support." },
          { question: "How can I report a rental emergency?", answer: "Contact social services or tenant protection associations in Turin." },
          { question: "Are there benefits for students in difficulty?", answer: "Yes, there are funds and programs dedicated to university students." }
        ]
      }
    }
  },
  {
    slug: "valutazione-immobiliare-torino-guida-completa",
    category: "sellers",
    date: "2025-12-27",
    author: "Jungle Rent Team",
    image: "/images/vendere-casa-torino.jpg",
    readTime: 12,
    content: "valutazione-immobiliare-torino-guida-completa",
    translations: {
      it: {
        title: "Valutazione immobiliare a Torino: guida completa",
        excerpt: "Come valutare correttamente un immobile a Torino prima della vendita.",
        seo: {
          title: "Valutazione immobiliare Torino | Guida per venditori",
          description: "Consigli e strumenti per una valutazione immobiliare accurata a Torino, per vendere al miglior prezzo.",
          keywords: [
            "valutazione immobiliare torino",
            "vendere casa torino",
            "prezzo immobile torino",
            "stima casa torino",
            "mercato immobiliare torino"
          ]
        },
        tags: ["Venditori", "Immobiliare", "Valutazione", "Torino", "Guide"],
        faqs: [
          { question: "Come si valuta un immobile a Torino?", answer: "Si considerano posizione, stato, metratura e mercato locale." },
          { question: "Quali strumenti usare per la valutazione?", answer: "Siti di annunci, perizie professionali e comparazioni di mercato." },
          { question: "Quanto tempo richiede una valutazione?", answer: "Da poche ore a qualche giorno, a seconda della complessità." }
        ]
      },
      en: {
        title: "Real estate appraisal in Turin: complete guide",
        excerpt: "How to correctly appraise a property in Turin before selling.",
        seo: {
          title: "Real estate appraisal Turin | Guide for sellers",
          description: "Tips and tools for accurate real estate appraisal in Turin, to sell at the best price.",
          keywords: [
            "real estate appraisal turin",
            "sell house turin",
            "property price turin",
            "house estimate turin",
            "real estate market turin"
          ]
        },
        tags: ["Sellers", "Real Estate", "Appraisal", "Turin", "Guides"],
        faqs: [
          { question: "How to appraise a property in Turin?", answer: "Consider location, condition, size and local market." },
          { question: "What tools to use for appraisal?", answer: "Listing sites, professional appraisals and market comparisons." },
          { question: "How long does an appraisal take?", answer: "From a few hours to several days, depending on complexity." }
        ]
      }
    }
  },
  {
    slug: "panettoni-pandori-torino-guida-2025",
    category: "turisti",
    date: "2025-12-21",
    author: "Jungle Rent Team",
    image: "/images/duomo-torino-natale.jpg",
    readTime: 45,
    content: "panettoni-pandori-torino-guida-2025",
    translations: {
      it: {
        title: "Panettoni e pandori a Torino: guida 2025",
        excerpt: "Dove trovare i migliori panettoni e pandori artigianali a Torino per le feste natalizie 2025.",
        seo: {
          title: "Panettoni e pandori Torino | Guida Natale 2025",
          description: "Scopri le pasticcerie e i negozi migliori per acquistare panettoni e pandori a Torino nel Natale 2025.",
          keywords: [
            "panettoni torino 2025",
            "pandori torino natale",
            "dolci natalizi torino",
            "pasticcerie torino natale",
            "guida panettoni pandori"
          ]
        },
        tags: ["Turisti", "Natale", "Dolci", "Torino", "Guide"],
        faqs: [
          { question: "Quali sono le pasticcerie migliori per panettoni a Torino?", answer: "Pasticceria XYZ e ABC sono rinomate per i loro panettoni artigianali." },
          { question: "Dove acquistare pandori tradizionali?", answer: "Molti negozi storici in centro Torino offrono pandori di alta qualità." },
          { question: "Ci sono opzioni senza glutine?", answer: "Sì, alcune pasticcerie propongono panettoni e pandori senza glutine." }
        ]
      },
      en: {
        title: "Panettone and pandoro in Turin: 2025 guide",
        excerpt: "Where to find the best artisanal panettone and pandoro in Turin for the 2025 Christmas holidays.",
        seo: {
          title: "Panettone and pandoro Turin | Christmas 2025 guide",
          description: "Discover the best pastry shops and stores to buy panettone and pandoro in Turin for Christmas 2025.",
          keywords: [
            "panettone turin 2025",
            "pandoro turin christmas",
            "christmas sweets turin",
            "pastry shops turin christmas",
            "panettone pandoro guide"
          ]
        },
        tags: ["Tourists", "Christmas", "Sweets", "Turin", "Guides"],
        faqs: [
          { question: "What are the best pastry shops for panettone in Turin?", answer: "Pastry shops XYZ and ABC are renowned for their artisanal panettone." },
          { question: "Where to buy traditional pandoro?", answer: "Many historic shops in downtown Turin offer high-quality pandoro." },
          { question: "Are there gluten-free options?", answer: "Yes, some pastry shops offer gluten-free panettone and pandoro." }
        ]
      }
    }
  },
  {
    slug: "jungle-control-dicembre-2025",
    category: "societa",
    date: "2025-12-16",
    author: "Jungle Rent Team",
    image: "/images/mole-antonelliana-mountains.jpg",
    readTime: 8,
    content: "jungle-control-december-2025",
    translations: {
      it: {
        title: "Jungle Control dicembre 2025: aggiornamenti e novità",
        excerpt: "Le ultime novità di Jungle Control a dicembre 2025, con focus su funzionalità e miglioramenti.",
        seo: {
          title: "Jungle Control dicembre 2025 | Novità e aggiornamenti",
          description: "Scopri le nuove funzionalità e aggiornamenti di Jungle Control per dicembre 2025.",
          keywords: [
            "jungle control dicembre 2025",
            "aggiornamenti jungle control",
            "novità software gestione",
            "jungle control funzionalità"
          ]
        },
        tags: ["Società", "Software", "Aggiornamenti", "Jungle Control"],
        faqs: [
          { question: "Quali sono le novità di Jungle Control dicembre 2025?", answer: "Miglioramenti nell'interfaccia utente e nuove integrazioni con servizi esterni." },
          { question: "Come aggiornare Jungle Control?", answer: "Gli aggiornamenti sono automatici per gli utenti registrati." }
        ]
      },
      en: {
        title: "Jungle Control December 2025: updates and news",
        excerpt: "The latest news of Jungle Control in December 2025, focusing on features and improvements.",
        seo: {
          title: "Jungle Control December 2025 | News and updates",
          description: "Discover the new features and updates of Jungle Control for December 2025.",
          keywords: [
            "jungle control december 2025",
            "jungle control updates",
            "management software news",
            "jungle control features"
          ]
        },
        tags: ["Society", "Software", "Updates", "Jungle Control"],
        faqs: [
          { question: "What are the news of Jungle Control December 2025?", answer: "Improvements in user interface and new integrations with external services." },
          { question: "How to update Jungle Control?", answer: "Updates are automatic for registered users." }
        ]
      }
    }
  },
  {
    slug: "tajarin-piemontesi-guida-completa",
    category: "turisti",
    date: "2025-12-13",
    author: "Jungle Rent Team",
    image: "/images/tajarin-tartufo-torino.jpg",
    readTime: 55,
    content: "tajarin-piemontesi-guida-completa",
    translations: {
      it: {
        title: "Tajarin piemontesi: guida completa",
        excerpt: "Scopri la tradizione dei tajarin piemontesi, ricette e dove gustarli a Torino.",
        seo: {
          title: "Tajarin piemontesi: ricetta originale e dove mangiarli",
          description: "La pasta con 40 tuorli al kg che ha conquistato il Piemonte. Ricetta della nonna e 8 ristoranti dove provarli a Torino.",
          keywords: [
            "tajarin piemontesi",
            "pasta piemontese",
            "ricette tajarin",
            "ristoranti torino tajarin",
            "cucina piemontese"
          ]
        },
        tags: ["Turisti", "Cucina", "Piemonte", "Tajarin", "Guide"],
        faqs: [
          { question: "Cosa sono i tajarin piemontesi?", answer: "Sono una pasta all'uovo tipica del Piemonte, simile a tagliolini sottili." },
          { question: "Come si preparano i tajarin?", answer: "Con farina, uova e un impasto tirato molto sottile, serviti con burro e salvia o sughi tradizionali." },
          { question: "Dove mangiare tajarin a Torino?", answer: "In molti ristoranti tradizionali piemontesi nel centro di Torino." }
        ]
      },
      en: {
        title: "Piedmontese Tajarin: complete guide",
        excerpt: "Discover the tradition of Piedmontese tajarin, recipes and where to taste them in Turin.",
        seo: {
          title: "Piedmontese Tajarin: original recipe & where to eat",
          description: "The pasta with 40 egg yolks per kg that conquered Piedmont. Grandma's recipe and 8 restaurants to try in Turin.",
          keywords: [
            "piedmontese tajarin",
            "piedmont pasta",
            "tajarin recipes",
            "turin restaurants tajarin",
            "piedmont cuisine"
          ]
        },
        tags: ["Tourists", "Cuisine", "Piedmont", "Tajarin", "Guides"],
        faqs: [
          { question: "What are Piedmontese tajarin?", answer: "They are a typical Piedmont egg pasta, similar to thin tagliolini." },
          { question: "How are tajarin prepared?", answer: "With flour, eggs and a very thin rolled dough, served with butter and sage or traditional sauces." },
          { question: "Where to eat tajarin in Turin?", answer: "In many traditional Piedmontese restaurants in downtown Turin." }
        ]
      }
    }
  },
  {
    slug: "cioccolaterie-torino-guida-completa",
    category: "turisti",
    date: "2025-12-12",
    author: "Jungle Rent Team",
    image: "/images/cioccolato-gianduiotti-torino.jpg",
    readTime: 50,
    content: "cioccolaterie-torino-guida-completa",
    translations: {
      it: {
        title: "Cioccolaterie a Torino: guida completa",
        excerpt: "Le migliori cioccolaterie di Torino per gli amanti del cioccolato e del gianduiotto.",
        seo: {
          title: "12 cioccolaterie storiche di Torino | Gianduiotti e bicerin",
          description: "La capitale del cioccolato: dove comprare i migliori gianduiotti dal 1826. Mappa, prezzi e orari delle botteghe storiche.",
          keywords: [
            "cioccolaterie torino",
            "gianduiotto torino",
            "cioccolato artigianale torino",
            "dolci torino",
            "guida cioccolato torino"
          ]
        },
        tags: ["Turisti", "Cioccolato", "Torino", "Dolci", "Guide"],
        faqs: [
          { question: "Quali sono le cioccolaterie storiche di Torino?", answer: "Caffarel, Guido Gobino e Peyrano sono tra le più famose." },
          { question: "Cos'è il gianduiotto?", answer: "Un cioccolatino tipico torinese a base di cioccolato e nocciole." },
          { question: "Dove acquistare cioccolato artigianale?", answer: "Nelle botteghe specializzate e negozi del centro città." }
        ]
      },
      en: {
        title: "Chocolate shops in Turin: complete guide",
        excerpt: "The best chocolate shops in Turin for chocolate and gianduiotto lovers.",
        seo: {
          title: "12 historic chocolate shops in Turin | Gianduiotti guide",
          description: "The chocolate capital: where to buy the best gianduiotti since 1826. Map, prices and hours of historic shops.",
          keywords: [
            "chocolate shops turin",
            "gianduiotto turin",
            "artisanal chocolate turin",
            "sweets turin",
            "chocolate guide turin"
          ]
        },
        tags: ["Tourists", "Chocolate", "Turin", "Sweets", "Guides"],
        faqs: [
          { question: "What are the historic chocolate shops in Turin?", answer: "Caffarel, Guido Gobino and Peyrano are among the most famous." },
          { question: "What is gianduiotto?", answer: "A typical Turin chocolate made with chocolate and hazelnuts." },
          { question: "Where to buy artisanal chocolate?", answer: "In specialized shops and stores in the city center." }
        ]
      }
    }
  },
  {
    slug: "vendere-casa-torino-guida-completa-2025",
    category: "sellers",
    date: "2025-12-12",
    author: "Jungle Rent Team",
    image: "/images/vendere-casa-torino.jpg",
    readTime: 45,
    content: "vendere-casa-torino-guida-completa-2025",
    translations: {
      it: {
        title: "Vendere casa a Torino: guida completa 2025",
        excerpt: "Tutto quello che devi sapere per vendere casa a Torino nel 2025, dalla preparazione alla conclusione della vendita.",
        seo: {
          title: "Vendere casa a Torino nel 2025: evita questi 7 errori",
          description: "Vendi al prezzo giusto in 60-90 giorni. Documenti, tasse e strategie per non perdere soldi. Valutazione gratuita inclusa.",
          keywords: [
            "vendere casa torino 2025",
            "guida vendita immobiliare",
            "documenti vendita casa",
            "mercato immobiliare torino",
            "consigli vendere casa"
          ]
        },
        tags: ["Venditori", "Immobiliare", "Torino", "Vendita", "Guide"],
        faqs: [
          { question: "Quali documenti servono per vendere casa?", answer: "Certificato di proprietà, planimetrie, certificazione energetica e altri documenti catastali." },
          { question: "Come preparare la casa per la vendita?", answer: "Pulizia, piccoli interventi di manutenzione e valorizzazione degli spazi." },
          { question: "Quanto tempo richiede la vendita?", answer: "Dipende dal mercato, ma mediamente da qualche settimana a qualche mese." }
        ]
      },
      en: {
        title: "Selling a house in Turin: complete guide 2025",
        excerpt: "Everything you need to know to sell a house in Turin in 2025, from preparation to closing the sale.",
        seo: {
          title: "Selling property in Turin 2025: avoid these 7 mistakes",
          description: "Sell at the right price in 60-90 days. Documents, taxes and strategies to maximize value. Free valuation included.",
          keywords: [
            "sell house turin 2025",
            "real estate sale guide",
            "house sale documents",
            "real estate market turin",
            "tips sell house"
          ]
        },
        tags: ["Sellers", "Real Estate", "Turin", "Sale", "Guides"],
        faqs: [
          { question: "What documents are needed to sell a house?", answer: "Title deed, floor plans, energy certification and other cadastral documents." },
          { question: "How to prepare the house for sale?", answer: "Cleaning, minor maintenance and space enhancement." },
          { question: "How long does the sale take?", answer: "Depends on the market, but usually from a few weeks to a few months." }
        ]
      }
    }
  },
  {
    slug: "student-housing-italia-savills-2025",
    category: "investors",
    date: "2025-12-11",
    author: "Jungle Rent Team",
    image: "/images/mortgage-investment.jpg",
    readTime: 20,
    content: "student-housing-italia-savills-2025",
    translations: {
      it: {
        title: "Student housing in Italia: report Savills 2025",
        excerpt: "Analisi del mercato dello student housing in Italia secondo il report Savills 2025.",
        seo: {
          title: "Student housing Italia: +8% rendimenti | Report Savills 2025",
          description: "127.000 posti letto mancanti in Italia. Perché gli investitori puntano sullo student housing e come entrare.",
          keywords: [
            "student housing italia",
            "mercato student housing",
            "report savills 2025",
            "investimenti immobiliari studenti",
            "case per studenti italia"
          ]
        },
        tags: ["Investitori", "Student Housing", "Italia", "Report", "Mercato"],
        faqs: [
          { question: "Cos'è lo student housing?", answer: "Soluzioni abitative dedicate agli studenti universitari." },
          { question: "Quali sono le tendenze in Italia?", answer: "Crescita della domanda e sviluppo di nuove strutture moderne." },
          { question: "Come investire nello student housing?", answer: "Acquistando immobili in zone universitarie o partecipando a fondi specializzati." }
        ]
      },
      en: {
        title: "Student housing in Italy: Savills report 2025",
        excerpt: "Analysis of the student housing market in Italy according to the Savills 2025 report.",
        seo: {
          title: "Student housing Italy: +8% yields | Savills Report 2025",
          description: "127,000 missing beds in Italy. Why investors bet on student housing and how to get in.",
          keywords: [
            "student housing italy",
            "student housing market",
            "savills report 2025",
            "student real estate investments",
            "student housing italy"
          ]
        },
        tags: ["Investors", "Student Housing", "Italy", "Report", "Market"],
        faqs: [
          { question: "What is student housing?", answer: "Housing solutions dedicated to university students." },
          { question: "What are the trends in Italy?", answer: "Growing demand and development of new modern facilities." },
          { question: "How to invest in student housing?", answer: "Buying properties near universities or joining specialized funds." }
        ]
      }
    }
  },
  {
    slug: "eventi-torino-febbraio-2026",
    category: "turisti",
    date: "2025-12-09",
    author: "Jungle Rent Team",
    image: "/images/cioccolato-festival-torino.jpg",
    readTime: 28,
    content: "eventi-torino-febbraio-2026",
    translations: {
      it: {
        title: "Febbraio 2026 a Torino: tra amore, cioccolato, arte e palco lirico",
        excerpt: "CioccolaTò, Macbeth di Muti, Battaglia delle Arance (UNESCO), Final Eight basket e mostre Lee Miller e Jeff Wall. Guida completa con prezzi, contatti e orari.",
        seo: {
          title: "Torino febbraio 2026: CioccolaTò, Macbeth e Final Eight",
          description: "60 stand cioccolato gratis, Muti al Regio (€50-230), Battaglia Arance UNESCO. Prezzi e date verificate.",
          keywords: [
            "eventi torino febbraio 2026",
            "cioccolato torino 2026",
            "macbeth teatro regio muti",
            "battaglia arance ivrea unesco",
            "final eight basket torino 2026",
            "lee miller camera torino",
            "jeff wall gallerie italia",
            "carnevale ivrea 2026",
            "san valentino torino",
            "abbonamenti gtt torino"
          ]
        },
        tags: ["Turisti", "Eventi", "Torino", "CioccolaTò", "Opera", "Basket", "Ivrea", "UNESCO"],
        faqs: [
          { question: "Quando si tiene CioccolaTò 2026 a Torino?", answer: "Dal 13 al 17 febbraio 2026 in Piazza Vittorio Veneto. Orari: venerdì e sabato 10:00-21:00, altri giorni 10:00-20:00. Ingresso gratuito con circa 60 produttori e oltre 70 stand." },
          { question: "Quanto costano i biglietti per Macbeth al Teatro Regio?", answer: "I biglietti per Macbeth diretto da Riccardo Muti vanno da €50 a €230 a seconda del settore. Acquistabili su teatroregio.torino.it o vivaticket.com." },
          { question: "La Battaglia delle Arance è Patrimonio UNESCO?", answer: "Sì, il Carnevale Storico di Ivrea è Patrimonio UNESCO dal 2023. Il biglietto costa €15 (intero), €10 (ridotto soci), gratuito per residenti Ivrea e bambini fino a 12 anni." },
          { question: "Dove si giocano le Final Eight di basket 2026?", answer: "All'Inalpi Arena, Corso Sebastopoli 123, Torino. Quarti 18-19 febbraio, semifinali 21 febbraio, finale 22 febbraio ore 17:00. Biglietti da €15." },
          { question: "C'è un codice sconto Trenitalia per la Final Eight?", answer: "Sì, usa il codice FINALEIGHT26 per ottenere sconti dal 20% al 75% sui treni Trenitalia per Torino durante l'evento." },
          { question: "Quanto costa l'abbonamento GTT giornaliero a Torino?", answer: "L'abbonamento turistico GTT costa €5,50 giornaliero, €8,50 per 2 giorni e €14 settimanale. Include tram, metro e bus." },
          { question: "Dove si tiene il concerto Candlelight Morricone a Torino?", answer: "Al Palazzo della Luce, Via Antonio Bertola 40, il 26 febbraio 2026 ore 19:30. Durata circa 65 minuti, biglietti da €30." },
          { question: "Quali sono le date di Claudio Bisio a Torino?", answer: "Claudio Bisio si esibisce al Teatro Colosseo (Via Madama Cristina 71) il 6, 7 e 8 febbraio 2026. Biglietti €31. Telefono: +39 011 651 0161." },
          { question: "Quando chiudono le mostre di Lee Miller e Jeff Wall?", answer: "Entrambe chiudono il 1° febbraio 2026. Lee Miller a CAMERA (€13 intero), Jeff Wall alle Gallerie d'Italia (€10 intero, under 18 gratis)." },
          { question: "Come contattare Turismo Torino per informazioni?", answer: "Telefono +39 011 535181, sito turismotorino.org. Per il Carnevale di Ivrea: Ufficio Turismo +39 0125 618131." }
        ]
      },
      en: {
        title: "February 2026 in Turin: love, chocolate, art and opera",
        excerpt: "CioccolaTò, Muti's Macbeth, Battle of the Oranges (UNESCO), Final Eight basketball and Lee Miller/Jeff Wall exhibitions. Complete guide with verified prices and contacts.",
        seo: {
          title: "Turin February 2026: CioccolaTò, Macbeth & Final Eight",
          description: "60 free chocolate stands, Muti at Teatro Regio (€50-230), Battle of Oranges UNESCO. Verified prices and dates.",
          keywords: [
            "turin events february 2026",
            "ciocolato turin 2026",
            "macbeth teatro regio muti",
            "battle oranges ivrea unesco",
            "final eight basketball turin 2026",
            "lee miller camera turin",
            "jeff wall gallerie italia",
            "ivrea carnival 2026",
            "valentine turin",
            "gtt turin passes"
          ]
        },
        tags: ["Tourists", "Events", "Turin", "CioccolaTò", "Opera", "Basketball", "Ivrea", "UNESCO"],
        faqs: [
          { question: "When is CioccolaTò 2026 in Turin?", answer: "February 13-17, 2026 in Piazza Vittorio Veneto. Hours: Friday-Saturday 10:00-21:00, other days 10:00-20:00. Free entry with about 60 producers and over 70 stands." },
          { question: "How much are Macbeth tickets at Teatro Regio?", answer: "Tickets for Macbeth conducted by Riccardo Muti range from €50 to €230 depending on section. Available on teatroregio.torino.it or vivaticket.com." },
          { question: "Is the Battle of the Oranges a UNESCO World Heritage?", answer: "Yes, the Historic Ivrea Carnival has been UNESCO World Heritage since 2023. Tickets: €15 full, €10 reduced, free for Ivrea residents and children under 12." },
          { question: "Where is the Final Eight basketball 2026?", answer: "At Inalpi Arena, Corso Sebastopoli 123, Turin. Quarterfinals Feb 18-19, semifinals Feb 21, final Feb 22 at 17:00. Tickets from €15." },
          { question: "Is there a Trenitalia discount for Final Eight?", answer: "Yes, use code FINALEIGHT26 for 20-75% discounts on Trenitalia trains to Turin during the event." },
          { question: "How much is a GTT day pass in Turin?", answer: "Tourist GTT passes cost €5.50 daily, €8.50 for 2 days, and €14 weekly. Includes tram, metro and bus." },
          { question: "Where is the Candlelight Morricone concert?", answer: "At Palazzo della Luce, Via Antonio Bertola 40, February 26, 2026 at 19:30. Duration about 65 minutes, tickets from €30." },
          { question: "What are Claudio Bisio's Turin dates?", answer: "Claudio Bisio performs at Teatro Colosseo (Via Madama Cristina 71) on February 6, 7 and 8, 2026. Tickets €31. Phone: +39 011 651 0161." },
          { question: "When do the Lee Miller and Jeff Wall exhibitions close?", answer: "Both close February 1, 2026. Lee Miller at CAMERA (€13 full), Jeff Wall at Gallerie d'Italia (€10 full, under 18 free)." },
          { question: "How to contact Turismo Torino for information?", answer: "Phone +39 011 535181, website turismotorino.org. For Ivrea Carnival: Tourism Office +39 0125 618131." }
        ]
      }
    }
  },
  {
    slug: "eventi-torino-marzo-2026",
    category: "turisti",
    date: "2025-12-09",
    author: "Jungle Rent Team",
    image: "/images/torino-primavera-marzo.jpg",
    readTime: 45,
    content: "eventi-torino-marzo-2026",
    translations: {
      it: {
        title: "Eventi a Torino marzo 2026",
        excerpt: "Guida completa agli eventi di marzo 2026: Chiharu Shiota al MAO, Mika all'Inalpi Arena, Renato Zero al Teatro Regio, Subsonica 30 anni, Rocky il Musical.",
        seo: {
          title: "Eventi Torino marzo 2026 | Mostre, concerti, teatro",
          description: "Scopri concerti, mostre e spettacoli a Torino a marzo 2026: Chiharu Shiota, Mika, Renato Zero, Subsonica, Rocky Musical. Prezzi, orari e biglietti.",
          keywords: [
            "eventi torino marzo 2026",
            "concerti torino marzo",
            "chiharu shiota mao torino",
            "mika torino 2026",
            "renato zero teatro regio",
            "subsonica 30 anni",
            "rocky musical torino",
            "mostre torino marzo",
            "futurismo musei reali",
            "orazio gentileschi torino"
          ]
        },
        tags: ["Turisti", "Eventi", "Torino", "Concerti", "Mostre", "Teatro"],
        faqs: [
          { question: "Quali sono le mostre principali a Torino a marzo 2026?", answer: "Le mostre principali sono Chiharu Shiota al MAO (fino al 28 giugno), Futurismo ai Musei Reali e Orazio Gentileschi alle Sale Chiablese (fino al 3 maggio)." },
          { question: "Quanto costano i biglietti per la mostra di Chiharu Shiota al MAO?", answer: "Intero €10, ridotto €7 (under 26, over 65, studenti), gratuito under 14. Visite guidate domenica ore 15:00." },
          { question: "Quando si esibisce Renato Zero a Torino?", answer: "Renato Zero si esibisce il 7 e 8 marzo 2026 al Teatro Regio con il tour L'ORAZERO IN TOUR. Biglietti da €45 a €85." },
          { question: "Dove si tengono i concerti dei Subsonica per il trentennale?", answer: "I Subsonica celebrano 30 anni di carriera all'Inalpi Arena il 31 marzo, 1, 3 e 4 aprile 2026. Ogni data ha scaletta diversa." },
          { question: "Quanto costa Rocky il Musical al Teatro Alfieri?", answer: "Rocky il Musical va in scena dal 26 al 29 marzo al Teatro Alfieri. Biglietti da €35 a €65." },
          { question: "Come posso prenotare i biglietti per Amadeus al Teatro Carignano?", answer: "Amadeus è in scena dall'1 all'8 marzo. Prenotazioni su teatrostabiletorino.it o al telefono +39 011 5169111." },
          { question: "Quali eventi ci sono per la Festa della Donna a Torino?", answer: "L'8 marzo 2026 ci sono conferenze, mostre dedicate ad artiste, concerti e ingressi ridotti nei musei per le visitatrici." },
          { question: "Come muoversi a Torino a marzo con i mezzi pubblici?", answer: "GTT offre metro, tram e bus. Biglietto singolo €2, giornaliero €5,50, 2 giorni €8,50, settimanale €14." },
          { question: "Qual è il numero di telefono del MAO per informazioni?", answer: "Il MAO è raggiungibile al +39 011 4436927 oppure via email info@maotorino.it. Orari: mar-dom 10-18, giovedì fino alle 20." },
          { question: "Dove vedere Mika in concerto a marzo 2026?", answer: "Mika si esibisce il 4 marzo 2026 all'Inalpi Arena (Corso Sebastopoli 123). Biglietti da €35 a €65 su ticketmaster.it e vivaticket.com." }
        ]
      },
      en: {
        title: "Events in Turin March 2026",
        excerpt: "Complete guide to March 2026 events: Chiharu Shiota at MAO, Mika at Inalpi Arena, Renato Zero at Teatro Regio, Subsonica 30 years, Rocky the Musical.",
        seo: {
          title: "Events Turin March 2026 | Exhibitions, concerts, theater",
          description: "Discover concerts, exhibitions and shows in Turin in March 2026: Chiharu Shiota, Mika, Renato Zero, Subsonica, Rocky Musical. Prices, hours and tickets.",
          keywords: [
            "events turin march 2026",
            "concerts turin march",
            "chiharu shiota mao turin",
            "mika turin 2026",
            "renato zero teatro regio",
            "subsonica 30 years",
            "rocky musical turin",
            "exhibitions turin march",
            "futurism royal museums",
            "orazio gentileschi turin"
          ]
        },
        tags: ["Tourists", "Events", "Turin", "Concerts", "Exhibitions", "Theater"],
        faqs: [
          { question: "What are the main exhibitions in Turin in March 2026?", answer: "The main exhibitions are Chiharu Shiota at MAO (until June 28), Futurism at the Royal Museums and Orazio Gentileschi at the Chiablese Halls (until May 3)." },
          { question: "How much are tickets for the Chiharu Shiota exhibition at MAO?", answer: "Full €10, reduced €7 (under 26, over 65, students), free under 14. Guided tours on Sundays at 15:00." },
          { question: "When does Renato Zero perform in Turin?", answer: "Renato Zero performs on March 7 and 8, 2026 at Teatro Regio with the L'ORAZERO IN TOUR tour. Tickets from €45 to €85." },
          { question: "Where are the Subsonica 30th anniversary concerts held?", answer: "Subsonica celebrates 30 years at Inalpi Arena on March 31, April 1, 3 and 4, 2026. Each date has a different setlist." },
          { question: "How much does Rocky the Musical cost at Teatro Alfieri?", answer: "Rocky the Musical runs from March 26 to 29 at Teatro Alfieri. Tickets from €35 to €65." },
          { question: "How can I book tickets for Amadeus at Teatro Carignano?", answer: "Amadeus runs from March 1 to 8. Book on teatrostabiletorino.it or call +39 011 5169111." },
          { question: "What events are there for International Women's Day in Turin?", answer: "On March 8, 2026 there are conferences, exhibitions dedicated to female artists, concerts and reduced museum admission for women." },
          { question: "How to get around Turin in March with public transport?", answer: "GTT offers metro, tram and buses. Single ticket €2, daily €5.50, 2-day €8.50, weekly €14." },
          { question: "What is the MAO phone number for information?", answer: "MAO can be reached at +39 011 4436927 or by email info@maotorino.it. Hours: Tue-Sun 10-18, Thursday until 20:00." },
          { question: "Where to see Mika in concert in March 2026?", answer: "Mika performs on March 4, 2026 at Inalpi Arena (Corso Sebastopoli 123). Tickets from €35 to €65 on ticketmaster.it and vivaticket.com." }
        ]
      }
    }
  },
  {
    slug: "viaggiare-sostenibile-torino-guida",
    category: "turisti",
    date: "2025-12-06",
    author: "Jungle Rent Team",
    image: "/images/portici-torino.jpg",
    readTime: 45,
    content: "viaggiare-sostenibile-torino-guida",
    translations: {
      it: {
        title: "Viaggiare sostenibile a Torino: guida pratica",
        excerpt: "Consigli e soluzioni per un turismo sostenibile e responsabile a Torino.",
        seo: {
          title: "Viaggiare sostenibile Torino | Guida turismo responsabile",
          description: "Scopri come visitare Torino rispettando l'ambiente e supportando l'economia locale.",
          keywords: [
            "viaggiare sostenibile torino",
            "turismo responsabile torino",
            "mobilità sostenibile torino",
            "ecoturismo torino",
            "guida turismo verde"
          ]
        },
        tags: ["Turisti", "Sostenibilità", "Torino", "Turismo", "Guide"],
        faqs: [
          { question: "Come muoversi in modo sostenibile a Torino?", answer: "Usando mezzi pubblici, biciclette e camminando." },
          { question: "Quali strutture sono eco-friendly?", answer: "Hotel e B&B certificati con pratiche sostenibili." },
          { question: "Come supportare l'economia locale?", answer: "Acquistando prodotti tipici e scegliendo attività locali." }
        ]
      },
      en: {
        title: "Sustainable travel in Turin: practical guide",
        excerpt: "Tips and solutions for sustainable and responsible tourism in Turin.",
        seo: {
          title: "Sustainable travel Turin | Responsible tourism guide",
          description: "Discover how to visit Turin respecting the environment and supporting the local economy.",
          keywords: [
            "sustainable travel turin",
            "responsible tourism turin",
            "sustainable mobility turin",
            "ecotourism turin",
            "green tourism guide"
          ]
        },
        tags: ["Tourists", "Sustainability", "Turin", "Tourism", "Guides"],
        faqs: [
          { question: "How to move sustainably in Turin?", answer: "Using public transport, bicycles and walking." },
          { question: "Which facilities are eco-friendly?", answer: "Hotels and B&Bs certified with sustainable practices." },
          { question: "How to support the local economy?", answer: "Buying typical products and choosing local activities." }
        ]
      }
    }
  },
  {
    slug: "carnevale-ivrea-battaglia-arance-2025",
    category: "turisti",
    date: "2025-12-03",
    author: "Jungle Rent Team",
    image: "/images/battaglia-arance-ivrea.jpg",
    readTime: 65,
    content: "carnevale-ivrea-battaglia-arance-2025",
    translations: {
      it: {
        title: "Carnevale di Ivrea: battaglia delle arance 2025",
        excerpt: "Tutto sul Carnevale di Ivrea e la tradizionale battaglia delle arance del 2025.",
        seo: {
          title: "Carnevale Ivrea 2025 | Battaglia delle arance",
          description: "Guida completa al Carnevale di Ivrea 2025, con storia, eventi e consigli per partecipare alla battaglia delle arance.",
          keywords: [
            "carnevale ivrea 2025",
            "battaglia arance ivrea",
            "eventi carnevale piemonte",
            "tradizioni ivrea",
            "turismo carnevale ivrea"
          ]
        },
        tags: ["Turisti", "Carnevale", "Ivrea", "Tradizioni", "Eventi"],
        faqs: [
          { question: "Quando si svolge la battaglia delle arance?", answer: "Dal 15 al 18 febbraio 2025." },
          { question: "Come partecipare in sicurezza?", answer: "Indossare abiti protettivi e seguire le indicazioni degli organizzatori." },
          { question: "Qual è la storia del Carnevale di Ivrea?", answer: "Una tradizione secolare che celebra la rivolta popolare con la simbolica battaglia." }
        ]
      },
      en: {
        title: "Ivrea Carnival: orange battle 2025",
        excerpt: "All about the Ivrea Carnival and the traditional orange battle of 2025.",
        seo: {
          title: "Ivrea Carnival 2025 | Orange battle",
          description: "Complete guide to Ivrea Carnival 2025, with history, events and tips to participate in the orange battle.",
          keywords: [
            "ivrea carnival 2025",
            "orange battle ivrea",
            "carnival events piedmont",
            "ivrea traditions",
            "ivrea carnival tourism"
          ]
        },
        tags: ["Tourists", "Carnival", "Ivrea", "Traditions", "Events"],
        faqs: [
          { question: "When is the orange battle held?", answer: "From February 15 to 18, 2025." },
          { question: "How to participate safely?", answer: "Wear protective clothing and follow organizers' instructions." },
          { question: "What is the history of Ivrea Carnival?", answer: "A centuries-old tradition celebrating popular revolt with the symbolic battle." }
        ]
      }
    }
  },
  {
    slug: "universita-torino-guida-completa",
    category: "students",
    date: "2025-11-30",
    author: "Jungle Rent Team",
    image: "/images/unito-campus-torino.jpg",
    readTime: 55,
    content: "universita-torino-guida-completa",
    translations: {
      it: {
        title: "Università di Torino: guida completa per studenti",
        excerpt: "Informazioni utili per studenti che vogliono iscriversi o vivere l'esperienza universitaria a Torino.",
        seo: {
          title: "UniTo: guida studenti 2026 | Corsi, alloggi e servizi",
          description: "70.000 studenti, 120 corsi di laurea. Come iscriversi, trovare casa e vivere al meglio l'Università di Torino.",
          keywords: [
            "università torino",
            "studenti torino",
            "corsi università torino",
            "alloggi studenti torino",
            "vita universitaria torino"
          ]
        },
        tags: ["Studenti", "Università", "Torino", "Guide", "Corsi"],
        faqs: [
          { question: "Quali corsi offre l'Università di Torino?", answer: "Ampia offerta in vari ambiti: umanistico, scientifico, tecnico e medico." },
          { question: "Come trovare alloggio a Torino?", answer: "Attraverso residenze universitarie, affitti privati e studentati." },
          { question: "Quali servizi sono disponibili per gli studenti?", answer: "Biblioteche, mense, supporto didattico e attività culturali." }
        ]
      },
      en: {
        title: "University of Turin: complete guide for students",
        excerpt: "Useful information for students who want to enroll or experience university life in Turin.",
        seo: {
          title: "UniTo: student guide 2026 | Courses, housing & services",
          description: "70,000 students, 120 degree programs. How to enroll, find housing and make the most of University of Turin.",
          keywords: [
            "university turin",
            "students turin",
            "university courses turin",
            "student accommodation turin",
            "university life turin"
          ]
        },
        tags: ["Students", "University", "Turin", "Guides", "Courses"],
        faqs: [
          { question: "What courses does the University of Turin offer?", answer: "Wide range in various fields: humanities, science, technical and medical." },
          { question: "How to find accommodation in Turin?", answer: "Through university residences, private rentals and dormitories." },
          { question: "What services are available for students?", answer: "Libraries, canteens, academic support and cultural activities." }
        ]
      }
    }
  },
  {
    slug: "politecnico-torino-guida-completa",
    category: "students",
    date: "2025-11-27",
    author: "Jungle Rent Team",
    image: "/images/politecnico-torino.avif",
    readTime: 45,
    content: "politecnico-torino-guida-completa",
    translations: {
      it: {
        title: "Politecnico di Torino: guida completa per studenti",
        excerpt: "Tutto quello che devi sapere sul Politecnico di Torino, corsi, servizi e vita studentesca.",
        seo: {
          title: "PoliTo: guida studenti 2026 | Top 50 mondiale ingegneria",
          description: "35.000 studenti, 40 corsi. Come entrare al Politecnico di Torino, trovare casa vicino e vivere da studente.",
          keywords: [
            "politecnico torino",
            "studenti politecnico",
            "corsi politecnico torino",
            "vita studentesca politecnico",
            "servizi politecnico torino"
          ]
        },
        tags: ["Studenti", "Politecnico", "Torino", "Guide", "Ingegneria"],
        faqs: [
          { question: "Quali corsi offre il Politecnico di Torino?", answer: "Ingegneria, architettura, design e corsi post-laurea." },
          { question: "Come iscriversi al Politecnico?", answer: "Attraverso il portale ufficiale con procedure online." },
          { question: "Quali servizi sono disponibili?", answer: "Biblioteche, laboratori, mense e supporto didattico." }
        ]
      },
      en: {
        title: "Polytechnic University of Turin: complete guide for students",
        excerpt: "Everything you need to know about the Polytechnic University of Turin, courses, services and student life.",
        seo: {
          title: "PoliTo: student guide 2026 | Top 50 engineering worldwide",
          description: "35,000 students, 40 courses. How to get into Politecnico di Torino, find housing nearby and live as a student.",
          keywords: [
            "polytechnic turin",
            "polytechnic students",
            "polytechnic courses turin",
            "student life polytechnic",
            "polytechnic services turin"
          ]
        },
        tags: ["Students", "Polytechnic", "Turin", "Guides", "Engineering"],
        faqs: [
          { question: "What courses does the Polytechnic University of Turin offer?", answer: "Engineering, architecture, design and postgraduate courses." },
          { question: "How to enroll at the Polytechnic?", answer: "Through the official portal with online procedures." },
          { question: "What services are available?", answer: "Libraries, labs, canteens and academic support." }
        ]
      }
    }
  },
  {
    slug: "raccolta-differenziata-torino-guida",
    category: "societa",
    date: "2025-11-25",
    author: "Jungle Rent Team",
    image: "/images/raccolta-differenziata-torino.jpg",
    readTime: 50,
    content: "raccolta-differenziata-torino-guida",
    translations: {
      it: {
        title: "Raccolta differenziata a Torino: guida completa",
        excerpt: "Come fare la raccolta differenziata a Torino, regole, calendari e consigli pratici.",
        seo: {
          title: "Raccolta differenziata Torino 2026: calendario e regole",
          description: "Quando passano? Cosa va dove? Guida zona per zona con calendario PDF scaricabile e numeri utili.",
          keywords: [
            "raccolta differenziata torino",
            "rifiuti torino",
            "calendario raccolta torino",
            "riciclaggio torino",
            "ambiente torino"
          ]
        },
        tags: ["Società", "Ambiente", "Torino", "Raccolta differenziata", "Guide"],
        faqs: [
          { question: "Quali materiali si possono differenziare?", answer: "Carta, plastica, vetro, organico e indifferenziato." },
          { question: "Come funziona il calendario di raccolta?", answer: "Varia per zona, consultabile sul sito del Comune." },
          { question: "Dove smaltire rifiuti ingombranti?", answer: "Nei centri di raccolta autorizzati o con servizio dedicato." }
        ]
      },
      en: {
        title: "Recycling in Turin: complete guide",
        excerpt: "How to recycle in Turin, rules, schedules and practical tips.",
        seo: {
          title: "Turin recycling guide 2026: schedule and rules",
          description: "When do they collect? What goes where? Zone-by-zone guide with downloadable PDF calendar.",
          keywords: [
            "recycling turin",
            "waste turin",
            "collection schedule turin",
            "recycling turin",
            "environment turin"
          ]
        },
        tags: ["Society", "Environment", "Turin", "Recycling", "Guides"],
        faqs: [
          { question: "What materials can be recycled?", answer: "Paper, plastic, glass, organic and non-recyclable waste." },
          { question: "How does the collection schedule work?", answer: "It varies by area, consultable on the Municipality website." },
          { question: "Where to dispose bulky waste?", answer: "At authorized collection centers or with dedicated service." }
        ]
      }
    }
  },
  {
    slug: "mercati-storici-torino-chiusure",
    category: "societa",
    date: "2025-11-24",
    author: "Jungle Rent Team",
    image: "/images/mercati-rionali-torino.jpg",
    readTime: 45,
    content: "mercati-storici-torino-chiusure",
    translations: {
      it: {
        title: "Mercati storici di Torino: chiusure e novità",
        excerpt: "Aggiornamenti sulle chiusure temporanee e novità dei mercati storici di Torino.",
        seo: {
          title: "Mercati storici Torino | Chiusure e aggiornamenti",
          description: "Informazioni sulle chiusure e ristrutturazioni dei mercati storici di Torino, con impatti su commercianti e visitatori.",
          keywords: [
            "mercati storici torino",
            "chiusure mercati torino",
            "ristrutturazioni mercati",
            "commercio torino",
            "turismo mercati torino"
          ]
        },
        tags: ["Società", "Commercio", "Torino", "Mercati", "Aggiornamenti"],
        faqs: [
          { question: "Quali mercati sono chiusi temporaneamente?", answer: "Mercato di Porta Palazzo e altri mercati minori per lavori di ristrutturazione." },
          { question: "Quando riapriranno?", answer: "Le riaperture sono previste entro la primavera 2026." },
          { question: "Come sono supportati i commercianti?", answer: "Con agevolazioni e spazi temporanei alternativi." }
        ]
      },
      en: {
        title: "Historic markets of Turin: closures and news",
        excerpt: "Updates on temporary closures and news of the historic markets of Turin.",
        seo: {
          title: "Historic markets Turin | Closures and updates",
          description: "Information on closures and renovations of historic markets in Turin, with impacts on traders and visitors.",
          keywords: [
            "historic markets turin",
            "market closures turin",
            "market renovations",
            "commerce turin",
            "tourism markets turin"
          ]
        },
        tags: ["Society", "Commerce", "Turin", "Markets", "Updates"],
        faqs: [
          { question: "Which markets are temporarily closed?", answer: "Porta Palazzo market and other minor markets for renovation works." },
          { question: "When will they reopen?", answer: "Reopenings are expected by spring 2026." },
          { question: "How are traders supported?", answer: "With incentives and alternative temporary spaces." }
        ]
      }
    }
  },
  {
    slug: "eventi-torino-gennaio-2026",
    category: "turisti",
    date: "2025-11-23",
    author: "Jungle Rent Team",
    image: "/images/duomo-torino-natale.jpg",
    readTime: 40,
    content: "eventi-torino-gennaio-2026",
    translations: {
      it: {
        title: "Eventi a Torino gennaio 2026",
        excerpt: "Panoramica degli eventi culturali e di intrattenimento a Torino nel gennaio 2026.",
        seo: {
          title: "Eventi Torino gennaio 2026: Luci d'Artista e 47 cose da fare",
          description: "Fiamma Olimpica, mostre Gentileschi e Jeff Wall, concerti Lazza sold-out. Calendario completo con prezzi.",
          keywords: [
            "eventi torino gennaio 2026",
            "concerti torino gennaio",
            "mostre torino",
            "attività torino inverno",
            "turismo torino"
          ]
        },
        tags: ["Turisti", "Eventi", "Torino", "Cultura", "Inverno"],
        faqs: [
          { question: "Quali sono gli eventi principali a gennaio?", answer: "Concerti di musica classica, mostre d'arte e festival invernali." },
          { question: "Dove acquistare i biglietti?", answer: "Online sui siti ufficiali o presso punti vendita autorizzati." },
          { question: "Ci sono eventi gratuiti?", answer: "Sì, alcune mostre e attività all'aperto sono gratuite." }
        ]
      },
      en: {
        title: "Events in Turin January 2026",
        excerpt: "Overview of cultural and entertainment events in Turin in January 2026.",
        seo: {
          title: "Turin events January 2026: Luci d'Artista & 47 things to do",
          description: "Olympic Flame, Gentileschi and Jeff Wall exhibitions, Lazza sold-out concert. Full calendar with prices.",
          keywords: [
            "events turin january 2026",
            "concerts turin january",
            "exhibitions turin",
            "activities turin winter",
            "turin tourism"
          ]
        },
        tags: ["Tourists", "Events", "Turin", "Culture", "Winter"],
        faqs: [
          { question: "What are the main events in January?", answer: "Classical music concerts, art exhibitions and winter festivals." },
          { question: "Where to buy tickets?", answer: "Online on official websites or authorized sales points." },
          { question: "Are there free events?", answer: "Yes, some exhibitions and outdoor activities are free." }
        ]
      }
    }
  },
  {
    slug: "guida-volontariato-torino",
    category: "students",
    date: "2025-11-18",
    author: "Jungle Rent Team",
    image: "/images/san-salvario-night.jpeg",
    readTime: 30,
    content: "guida-volontariato-torino",
    translations: {
      it: {
        title: "Guida al volontariato a Torino",
        excerpt: "Come partecipare al volontariato a Torino: associazioni, opportunità e benefici.",
        seo: {
          title: "Volontariato Torino: 23 associazioni che cercano te",
          description: "Dalla Croce Rossa al Banco Alimentare. Trova l'associazione giusta per la tua età e interessi. Contatti diretti.",
          keywords: [
            "volontariato torino",
            "associazioni torino",
            "opportunità volontariato",
            "studenti volontariato torino",
            "guida volontariato"
          ]
        },
        tags: ["Studenti", "Volontariato", "Torino", "Comunità", "Guide"],
        faqs: [
          { question: "Come trovare un'associazione di volontariato?", answer: "Consultando i portali dedicati o contattando i centri di servizio per il volontariato." },
          { question: "Quali sono i benefici del volontariato?", answer: "Sviluppo personale, esperienze professionali e contributo sociale." },
          { question: "Ci sono opportunità per studenti?", answer: "Sì, molte associazioni offrono programmi dedicati agli studenti." }
        ]
      },
      en: {
        title: "Volunteer guide in Turin",
        excerpt: "How to participate in volunteering in Turin: associations, opportunities and benefits.",
        seo: {
          title: "Volunteering in Turin: 23 organizations looking for you",
          description: "From Red Cross to Food Bank. Find the right association for your age and interests. Direct contacts.",
          keywords: [
            "volunteering turin",
            "associations turin",
            "volunteering opportunities",
            "student volunteering turin",
            "volunteering guide"
          ]
        },
        tags: ["Students", "Volunteering", "Turin", "Community", "Guides"],
        faqs: [
          { question: "How to find a volunteering association?", answer: "By consulting dedicated portals or contacting volunteer service centers." },
          { question: "What are the benefits of volunteering?", answer: "Personal development, professional experience and social contribution." },
          { question: "Are there opportunities for students?", answer: "Yes, many associations offer programs dedicated to students." }
        ]
      }
    }
  },
  {
    slug: "aule-studio-torino-guida-completa",
    category: "students",
    date: "2025-11-17",
    author: "Jungle Rent Team",
    image: "/images/aule-studio-torino.jpg",
    readTime: 25,
    content: "aule-studio-torino-guida-completa",
    translations: {
      it: {
        title: "Aule studio a Torino: guida completa",
        excerpt: "Dove trovare le migliori aule studio a Torino per studenti universitari.",
        seo: {
          title: "Aule studio Torino: 18 posti gratis con orari e WiFi",
          description: "Biblioteche aperte fino a mezzanotte, sale studio 24/7 e spazi silenziosi. Mappa interattiva e prenotazioni.",
          keywords: [
            "aule studio torino",
            "spazi studio torino",
            "biblioteche torino",
            "studenti torino",
            "luoghi studio torino"
          ]
        },
        tags: ["Studenti", "Aule studio", "Torino", "Biblioteche", "Guide"],
        faqs: [
          { question: "Quali sono le aule studio più frequentate?", answer: "Biblioteche universitarie e spazi co-working dedicati agli studenti." },
          { question: "Ci sono aule studio aperte 24 ore?", answer: "Alcune strutture private offrono accesso 24/7 con tessera." },
          { question: "Come prenotare un posto in aula studio?", answer: "Attraverso i siti delle biblioteche o app dedicate." }
        ]
      },
      en: {
        title: "Study rooms in Turin: complete guide",
        excerpt: "Where to find the best study rooms in Turin for university students.",
        seo: {
          title: "Study spaces Turin: 18 free spots with hours & WiFi",
          description: "Libraries open until midnight, 24/7 study rooms and quiet spaces. Interactive map and booking info.",
          keywords: [
            "study rooms turin",
            "study spaces turin",
            "libraries turin",
            "students turin",
            "study places turin"
          ]
        },
        tags: ["Students", "Study rooms", "Turin", "Libraries", "Guides"],
        faqs: [
          { question: "What are the most frequented study rooms?", answer: "University libraries and co-working spaces dedicated to students." },
          { question: "Are there study rooms open 24 hours?", answer: "Some private facilities offer 24/7 access with a card." },
          { question: "How to book a study room seat?", answer: "Through library websites or dedicated apps." }
        ]
      }
    }
  },
  {
    slug: "investire-real-assets-torino-2025",
    category: "investors",
    date: "2025-11-14",
    author: "Jungle Rent Team",
    image: "/images/mortgage-investment.jpg",
    readTime: 20,
    content: "investire-real-assets-torino-2025",
    translations: {
      it: {
        title: "Investire in real assets a Torino nel 2025",
        excerpt: "Opportunità e strategie per investire in real assets a Torino nel 2025.",
        seo: {
          title: "Investire real assets Torino 2025 | Guida",
          description: "Analisi del mercato immobiliare e delle opportunità di investimento in real assets a Torino nel 2025.",
          keywords: [
            "investire real assets torino",
            "mercato immobiliare torino",
            "investimenti immobiliari 2025",
            "strategie investimento torino",
            "real assets torino"
          ]
        },
        tags: ["Investitori", "Real Assets", "Torino", "Investimenti", "Mercato"],
        faqs: [
          { question: "Cosa sono i real assets?", answer: "Beni tangibili come immobili, infrastrutture e terreni." },
          { question: "Perché investire a Torino?", answer: "Mercato in crescita con buone prospettive di rendimento." },
          { question: "Quali strategie adottare?", answer: "Diversificazione, analisi di mercato e gestione attiva." }
        ]
      },
      en: {
        title: "Investing in real assets in Turin in 2025",
        excerpt: "Opportunities and strategies to invest in real assets in Turin in 2025.",
        seo: {
          title: "Invest real assets Turin 2025 | Guide",
          description: "Market analysis and investment opportunities in real assets in Turin in 2025.",
          keywords: [
            "invest real assets turin",
            "real estate market turin",
            "real estate investments 2025",
            "investment strategies turin",
            "real assets turin"
          ]
        },
        tags: ["Investors", "Real Assets", "Turin", "Investments", "Market"],
        faqs: [
          { question: "What are real assets?", answer: "Tangible assets like real estate, infrastructure and land." },
          { question: "Why invest in Turin?", answer: "Growing market with good return prospects." },
          { question: "What strategies to adopt?", answer: "Diversification, market analysis and active management." }
        ]
      }
    }
  },
  {
    slug: "torino-nightlife-guide",
    category: "turisti",
    date: "2025-11-17",
    author: "Jungle Rent Team",
    image: "/images/torino-nightlife.jpg",
    readTime: 25,
    content: "torino-nightlife-guide",
    translations: {
      it: {
        title: "Guida alla nightlife di Torino",
        excerpt: "I migliori locali, bar e club per vivere la vita notturna a Torino.",
        seo: {
          title: "Nightlife Torino | Guida ai locali",
          description: "Scopri dove uscire la sera a Torino, con consigli su locali, eventi e atmosfere.",
          keywords: [
            "nightlife torino",
            "locali torino",
            "bar torino",
            "club torino",
            "vita notturna torino"
          ]
        },
        tags: ["Turisti", "Nightlife", "Torino", "Locali", "Divertimento"],
        faqs: [
          { question: "Quali sono i quartieri più vivaci di Torino?", answer: "San Salvario, Quadrilatero Romano e Borgo Po." },
          { question: "Ci sono eventi serali speciali?", answer: "Concerti, serate a tema e festival musicali." },
          { question: "Quali locali sono adatti agli studenti?", answer: "Bar con prezzi accessibili e atmosfere informali." }
        ]
      },
      en: {
        title: "Turin nightlife guide",
        excerpt: "The best venues, bars and clubs to experience nightlife in Turin.",
        seo: {
          title: "Nightlife Turin | Venue guide",
          description: "Discover where to go out in the evening in Turin, with tips on venues, events and atmospheres.",
          keywords: [
            "nightlife turin",
            "venues turin",
            "bars turin",
            "clubs turin",
            "nightlife turin"
          ]
        },
        tags: ["Tourists", "Nightlife", "Turin", "Venues", "Entertainment"],
        faqs: [
          { question: "What are the liveliest neighborhoods in Turin?", answer: "San Salvario, Quadrilatero Romano and Borgo Po." },
          { question: "Are there special evening events?", answer: "Concerts, themed nights and music festivals." },
          { question: "Which venues are suitable for students?", answer: "Bars with affordable prices and informal atmospheres." }
        ]
      }
    }
  },
  {
    slug: "torino-digital-nomads-guide",
    category: "turisti",
    date: "2025-11-13",
    author: "Jungle Rent Team",
    image: "/images/digital-nomad-torino.jpg",
    readTime: 30,
    content: "torino-digital-nomads-guide",
    translations: {
      it: {
        title: "Guida per digital nomads a Torino",
        excerpt: "Consigli e risorse per digital nomads che vogliono vivere e lavorare a Torino.",
        seo: {
          title: "Digital nomad a Torino: coworking, visto e costo vita",
          description: "€1.200/mese tutto incluso. Coworking da €150, WiFi veloce ovunque. Come lavorare da remoto a Torino.",
          keywords: [
            "digital nomads torino",
            "coworking torino",
            "lavoro remoto torino",
            "vivere torino digital nomads",
            "guida digital nomads"
          ]
        },
        tags: ["Turisti", "Digital Nomads", "Torino", "Lavoro", "Guide"],
        faqs: [
          { question: "Dove trovare spazi di coworking a Torino?", answer: "In centro città e quartieri innovativi come San Salvario." },
          { question: "Quali eventi per digital nomads?", answer: "Meetup, workshop e networking dedicati." },
          { question: "Come ottenere il visto per lavorare da remoto?", answer: "Informarsi sulle normative italiane e europee in materia." }
        ]
      },
      en: {
        title: "Guide for digital nomads in Turin",
        excerpt: "Tips and resources for digital nomads who want to live and work in Turin.",
        seo: {
          title: "Digital nomad in Turin: coworking, visa & cost of living",
          description: "€1,200/month all-in. Coworking from €150, fast WiFi everywhere. How to work remotely in Turin.",
          keywords: [
            "digital nomads turin",
            "coworking turin",
            "remote work turin",
            "living turin digital nomads",
            "digital nomads guide"
          ]
        },
        tags: ["Tourists", "Digital Nomads", "Turin", "Work", "Guides"],
        faqs: [
          { question: "Where to find coworking spaces in Turin?", answer: "In downtown and innovative neighborhoods like San Salvario." },
          { question: "What events for digital nomads?", answer: "Meetups, workshops and dedicated networking." },
          { question: "How to get a visa for remote work?", answer: "Check Italian and European regulations on the matter." }
        ]
      }
    }
  },
  {
    slug: "quartieri-sicuri-donne-torino",
    category: "students",
    date: "2025-11-11",
    author: "Team Jungle Rent",
    image: "/images/san-salvario-night.jpeg",
    readTime: 32,
    content: "quartieri-sicuri-donne-torino",
    translations: {
      it: {
        title: "Quartieri sicuri per donne a Torino",
        excerpt: "Analisi e consigli sui quartieri più sicuri per donne a Torino.",
        seo: {
          title: "Quartieri sicuri per donne a Torino: classifica 2026",
          description: "Dove vivere da sola senza paura. Dati reali su sicurezza, illuminazione e trasporti per ogni zona.",
          keywords: [
            "quartieri sicuri donne torino",
            "sicurezza torino",
            "movimento donne torino",
            "consigli sicurezza torino",
            "vivere sicuri torino"
          ]
        },
        tags: ["Studenti", "Sicurezza", "Torino", "Donne", "Guide"],
        faqs: [
          { question: "Quali quartieri sono considerati sicuri?", answer: "San Salvario, Crocetta e Centro sono tra i più sicuri." },
          { question: "Come muoversi in sicurezza di sera?", answer: "Preferire mezzi pubblici, zone illuminate e gruppi." },
          { question: "Ci sono iniziative per la sicurezza delle donne?", answer: "Sì, progetti comunali e associazioni attive." }
        ]
      },
      en: {
        title: "Safe neighborhoods for women in Turin",
        excerpt: "Analysis and tips on the safest neighborhoods for women in Turin.",
        seo: {
          title: "Safest neighborhoods for women in Turin: 2026 ranking",
          description: "Where to live alone without fear. Real data on safety, lighting and transport for each area.",
          keywords: [
            "safe neighborhoods women turin",
            "safety turin",
            "women movement turin",
            "safety tips turin",
            "safe living turin"
          ]
        },
        tags: ["Students", "Safety", "Turin", "Women", "Guides"],
        faqs: [
          { question: "Which neighborhoods are considered safe?", answer: "San Salvario, Crocetta and Downtown are among the safest." },
          { question: "How to move safely at night?", answer: "Prefer public transport, well-lit areas and groups." },
          { question: "Are there initiatives for women's safety?", answer: "Yes, municipal projects and active associations." }
        ]
      }
    }
  },
  {
    slug: "torino-novembre-turisti",
    category: "turisti",
    date: "2025-11-10",
    author: "Team Jungle Rent",
    image: "/images/torino-autunno-novembre.jpg",
    readTime: 28,
    content: "torino-novembre-turisti",
    translations: {
      it: {
        title: "Torino a novembre: guida per turisti",
        excerpt: "Cosa fare e vedere a Torino nel mese di novembre per i turisti.",
        seo: {
          title: "Torino novembre 2026: eventi, mostre e cosa fare",
          description: "Artissima, Luci d'Artista accese, tartufo d'Alba. Meteo, hotel e calendario eventi completo.",
          keywords: [
            "torino novembre",
            "turismo torino novembre",
            "eventi torino novembre",
            "cosa fare torino",
            "guida turisti torino"
          ]
        },
        tags: ["Turisti", "Torino", "Novembre", "Eventi", "Guide"],
        faqs: [
          { question: "Quali eventi ci sono a novembre?", answer: "Festival culturali, mercatini e mostre." },
          { question: "Che tempo fa a novembre?", answer: "Clima fresco e piovoso, consigliato abbigliamento adeguato." },
          { question: "Quali attrazioni visitare?", answer: "Musei, parchi e il centro storico." }
        ]
      },
      en: {
        title: "Turin in November: tourist guide",
        excerpt: "What to do and see in Turin in November for tourists.",
        seo: {
          title: "Turin November 2026: events, exhibitions & things to do",
          description: "Artissima, Luci d'Artista lit up, Alba truffle. Weather, hotels and complete events calendar.",
          keywords: [
            "turin november",
            "tourism turin november",
            "events turin november",
            "things to do turin",
            "tourist guide turin"
          ]
        },
        tags: ["Tourists", "Turin", "November", "Events", "Guides"],
        faqs: [
          { question: "What events are there in November?", answer: "Cultural festivals, markets and exhibitions." },
          { question: "What is the weather like in November?", answer: "Cool and rainy climate, appropriate clothing recommended." },
          { question: "What attractions to visit?", answer: "Museums, parks and historic center." }
        ]
      }
    }
  },
  {
    slug: "torino-dicembre-turisti",
    category: "turisti",
    date: "2025-11-10",
    author: "Team Jungle Rent",
    image: "/images/duomo-torino-natale.jpg",
    readTime: 25,
    content: "torino-dicembre-turisti",
    translations: {
      it: {
        title: "Torino a dicembre: guida per turisti",
        excerpt: "Eventi natalizi e attrazioni da non perdere a Torino nel mese di dicembre.",
        seo: {
          title: "Torino Natale 2026: mercatini, Luci d'Artista e cosa fare",
          description: "Mercatini in piazza Castello, pista di pattinaggio, 28ª edizione Luci d'Artista. Calendario completo.",
          keywords: [
            "torino dicembre",
            "natale torino",
            "mercatini natale torino",
            "eventi torino dicembre",
            "turismo torino dicembre"
          ]
        },
        tags: ["Turisti", "Torino", "Dicembre", "Natale", "Guide"],
        faqs: [
          { question: "Dove sono i mercatini di Natale?", answer: "In piazza Castello, piazza San Carlo e altre location." },
          { question: "Quali eventi natalizi ci sono?", answer: "Concerti, spettacoli e luci d'artista." },
          { question: "Come muoversi in città?", answer: "Mezzi pubblici e piste pedonali illuminate." }
        ]
      },
      en: {
        title: "Turin in December: tourist guide",
        excerpt: "Christmas events and attractions not to miss in Turin in December.",
        seo: {
          title: "Turin Christmas 2026: markets, Luci d'Artista & things to do",
          description: "Christmas markets in Piazza Castello, ice rink, 28th edition Luci d'Artista. Full calendar.",
          keywords: [
            "turin december",
            "christmas turin",
            "christmas markets turin",
            "events turin december",
            "tourism turin december"
          ]
        },
        tags: ["Tourists", "Turin", "December", "Christmas", "Guides"],
        faqs: [
          { question: "Where are the Christmas markets?", answer: "In Piazza Castello, Piazza San Carlo and other locations." },
          { question: "What Christmas events are there?", answer: "Concerts, shows and artistic lights." },
          { question: "How to move around the city?", answer: "Public transport and illuminated pedestrian paths." }
        ]
      }
    }
  },
  {
    slug: "mobilita-sostenibile-torino-studenti",
    category: "students",
    date: "2025-11-08",
    author: "Team Jungle Rent",
    image: "/images/torino-transport.jpg",
    readTime: 20,
    content: "mobilita-sostenibile-torino-studenti",
    translations: {
      it: {
        title: "Mobilità sostenibile a Torino per studenti",
        excerpt: "Soluzioni e consigli per una mobilità sostenibile dedicata agli studenti a Torino.",
        seo: {
          title: "Abbonamento GTT studenti €19/mese: come ottenerlo",
          description: "Bici gratis, metro illimitata, bonus mobilità. Tutti gli sconti trasporti per universitari a Torino.",
          keywords: [
            "mobilità sostenibile torino",
            "studenti torino",
            "trasporti pubblici torino",
            "mobilità verde torino",
            "bike sharing torino"
          ]
        },
        tags: ["Studenti", "Mobilità", "Torino", "Sostenibilità", "Guide"],
        faqs: [
          { question: "Quali mezzi sostenibili usare a Torino?", answer: "Biciclette, mezzi pubblici e car sharing elettrico." },
          { question: "Ci sono agevolazioni per studenti?", answer: "Sì, abbonamenti scontati e promozioni." },
          { question: "Come partecipare a iniziative green?", answer: "Iscrivendosi a eventi e programmi comunali." }
        ]
      },
      en: {
        title: "Sustainable mobility in Turin for students",
        excerpt: "Solutions and tips for sustainable mobility dedicated to students in Turin.",
        seo: {
          title: "GTT student pass €19/month: how to get it",
          description: "Free bikes, unlimited metro, mobility bonus. All transport discounts for students in Turin.",
          keywords: [
            "sustainable mobility turin",
            "students turin",
            "public transport turin",
            "green mobility turin",
            "bike sharing turin"
          ]
        },
        tags: ["Students", "Mobility", "Turin", "Sustainability", "Guides"],
        faqs: [
          { question: "What sustainable means to use in Turin?", answer: "Bicycles, public transport and electric car sharing." },
          { question: "Are there benefits for students?", answer: "Yes, discounted subscriptions and promotions." },
          { question: "How to participate in green initiatives?", answer: "By joining municipal events and programs." }
        ]
      }
    }
  },
  {
    slug: "mutui-investitori-immobiliari-guida-completa",
    category: "investors",
    date: "2025-11-07",
    author: "Team Jungle Rent",
    image: "/images/mortgage-investment.jpg",
    readTime: 35,
    content: "mutui-investitori-immobiliari-guida-completa",
    translations: {
      it: {
        title: "Mutui per investitori immobiliari: guida completa",
        excerpt: "Come ottenere mutui vantaggiosi per investimenti immobiliari, con consigli e requisiti.",
        seo: {
          title: "Mutuo per investimento immobiliare: tassi 2026 e requisiti",
          description: "Confronto mutui buy-to-let: tasso fisso vs variabile, LTV 60-80%, banche che finanziano investitori.",
          keywords: [
            "mutui investitori immobiliari",
            "finanziamenti immobiliari",
            "mutui investimento casa",
            "tassi mutui investitori",
            "guida mutui immobiliari"
          ]
        },
        tags: ["Investitori", "Mutui", "Immobiliare", "Finanziamenti", "Guide"],
        faqs: [
          { question: "Quali mutui sono adatti agli investitori?", answer: "Mutui a tasso fisso o variabile con condizioni flessibili." },
          { question: "Quali requisiti servono?", answer: "Documentazione finanziaria, garanzie e piano di investimento." },
          { question: "Come confrontare le offerte?", answer: "Analizzando tassi, spese accessorie e durata." }
        ]
      },
      en: {
        title: "Mortgages for real estate investors: complete guide",
        excerpt: "How to get advantageous mortgages for real estate investments, with tips and requirements.",
        seo: {
          title: "Buy-to-let mortgage Italy: 2026 rates and requirements",
          description: "BTL mortgage comparison: fixed vs variable, 60-80% LTV, banks that lend to property investors.",
          keywords: [
            "mortgages real estate investors",
            "real estate financing",
            "mortgages investment home",
            "mortgage rates investors",
            "mortgage guide real estate"
          ]
        },
        tags: ["Investors", "Mortgages", "Real Estate", "Financing", "Guides"],
        faqs: [
          { question: "What mortgages are suitable for investors?", answer: "Fixed or variable rate mortgages with flexible conditions." },
          { question: "What requirements are needed?", answer: "Financial documentation, guarantees and investment plan." },
          { question: "How to compare offers?", answer: "By analyzing rates, additional fees and duration." }
        ]
      }
    }
  },
  {
    slug: "migliori-gelaterie-torino-studenti",
    category: "students",
    date: "2025-11-07",
    author: "Team Jungle Rent",
    image: "/images/gelato-italiano.jpg",
    readTime: 18,
    content: "migliori-gelaterie-torino-studenti",
    translations: {
      it: {
        title: "Migliori gelaterie a Torino per studenti",
        excerpt: "Le gelaterie più apprezzate dagli studenti a Torino, con gusti e prezzi accessibili.",
        seo: {
          title: "Miglior gelato Torino: 8 gelaterie da €2 provate da studenti",
          description: "Gusti artigianali, porzioni generose, prezzi da universitario. Mappa e recensioni delle gelaterie top.",
          keywords: [
            "gelaterie torino",
            "gelato studenti torino",
            "miglior gelato torino",
            "gelaterie economiche torino",
            "gusti gelato torino"
          ]
        },
        tags: ["Studenti", "Gelaterie", "Torino", "Gelato", "Guide"],
        faqs: [
          { question: "Quali gelaterie sono più economiche?", answer: "Gelaterie come XYZ offrono prezzi speciali per studenti." },
          { question: "Quali gusti sono più popolari?", answer: "Classici come nocciola, cioccolato e pistacchio." },
          { question: "Ci sono opzioni vegane?", answer: "Sì, molte gelaterie propongono gusti vegani e senza lattosio." }
        ]
      },
      en: {
        title: "Best ice cream shops in Turin for students",
        excerpt: "The most appreciated ice cream shops by students in Turin, with flavors and affordable prices.",
        seo: {
          title: "Best gelato Turin: 8 shops from €2 tested by students",
          description: "Artisan flavors, generous portions, student-friendly prices. Map and reviews of top gelato spots.",
          keywords: [
            "ice cream shops turin",
            "ice cream students turin",
            "best ice cream turin",
            "cheap ice cream turin",
            "ice cream flavors turin"
          ]
        },
        tags: ["Students", "Ice Cream Shops", "Turin", "Ice Cream", "Guides"],
        faqs: [
          { question: "Which ice cream shops are cheaper?", answer: "Shops like XYZ offer special prices for students." },
          { question: "What flavors are most popular?", answer: "Classics like hazelnut, chocolate and pistachio." },
          { question: "Are there vegan options?", answer: "Yes, many shops offer vegan and lactose-free flavors." }
        ]
      }
    }
  },
  {
    slug: "dove-vivere-torino-studenti-politecnico",
    category: "students",
    date: "2025-11-06",
    author: "Team Jungle Rent",
    image: "/images/quartieri-studenti-torino.jpg",
    readTime: 15,
    content: "dove-vivere-torino-studenti-politecnico",
    translations: {
      it: {
        title: "Dove vivere a Torino per studenti del Politecnico",
        excerpt: "Quartieri consigliati per studenti del Politecnico di Torino, con servizi e trasporti.",
        seo: {
          title: "Dove vivere vicino al Politecnico: 5 quartieri da €300/mese",
          description: "Crocetta, San Salvario, Cenisia... Affitti, trasporti e vita notturna zona per zona. Con mappa.",
          keywords: [
            "dove vivere torino studenti",
            "quartieri studenti politecnico",
            "affitti studenti torino",
            "servizi studenti torino",
            "trasporti torino studenti"
          ]
        },
        tags: ["Studenti", "Quartieri", "Torino", "Politecnico", "Guide"],
        faqs: [
          { question: "Quali quartieri sono più vicini al Politecnico?", answer: "San Salvario, Vanchiglia e Crocetta." },
          { question: "Quanto costano gli affitti per studenti?", answer: "Variano da 300 a 600 euro al mese a seconda della zona." },
          { question: "Ci sono servizi dedicati agli studenti?", answer: "Biblioteche, mense e trasporti pubblici frequenti." }
        ]
      },
      en: {
        title: "Where to live in Turin for Polytechnic students",
        excerpt: "Recommended neighborhoods for Polytechnic University of Turin students, with services and transport.",
        seo: {
          title: "Where to live near Politecnico: 5 areas from €300/month",
          description: "Crocetta, San Salvario, Cenisia... Rents, transport and nightlife area by area. With map.",
          keywords: [
            "where to live turin students",
            "neighborhoods students polytechnic",
            "student rents turin",
            "student services turin",
            "transport turin students"
          ]
        },
        tags: ["Students", "Neighborhoods", "Turin", "Polytechnic", "Guides"],
        faqs: [
          { question: "Which neighborhoods are closest to the Polytechnic?", answer: "San Salvario, Vanchiglia and Crocetta." },
          { question: "How much are rents for students?", answer: "They range from 300 to 600 euros per month depending on the area." },
          { question: "Are there services dedicated to students?", answer: "Libraries, canteens and frequent public transport." }
        ]
      }
    }
  },
  {
    slug: "dove-mangiare-torino-studenti",
    category: "students",
    date: "2025-11-05",
    author: "Team Jungle Rent",
    image: "/images/caffe-vini-quadrilatero.jpg",
    readTime: 12,
    content: "dove-mangiare-torino-studenti",
    translations: {
      it: {
        title: "Dove mangiare a Torino per studenti",
        excerpt: "I migliori posti economici e gustosi dove mangiare a Torino per studenti.",
        seo: {
          title: "Mangiare a Torino con €5: 15 posti testati da studenti",
          description: "Mense, pizzerie a taglio, kebab gourmet. Dove mangiare bene spendendo poco in ogni quartiere.",
          keywords: [
            "dove mangiare torino studenti",
            "ristoranti economici torino",
            "pizzerie torino studenti",
            "mangiare low cost torino",
            "locali studenti torino"
          ]
        },
        tags: ["Studenti", "Cibo", "Torino", "Ristoranti", "Guide"],
        faqs: [
          { question: "Quali sono i locali più economici?", answer: "Trattorie e pizzerie con menù studenti e offerte speciali." },
          { question: "Ci sono opzioni vegetariane?", answer: "Sì, molti locali offrono piatti vegetariani e vegani." },
          { question: "Dove trovare cibo tipico piemontese?", answer: "Osterie e ristoranti tradizionali nel centro città." }
        ]
      },
      en: {
        title: "Where to eat in Turin for students",
        excerpt: "The best cheap and tasty places to eat in Turin for students.",
        seo: {
          title: "Eating in Turin on €5: 15 places tested by students",
          description: "Canteens, pizza by slice, gourmet kebab. Where to eat well spending little in every neighborhood.",
          keywords: [
            "where to eat turin students",
            "cheap restaurants turin",
            "pizzerias turin students",
            "low cost food turin",
            "student venues turin"
          ]
        },
        tags: ["Students", "Food", "Turin", "Restaurants", "Guides"],
        faqs: [
          { question: "Which are the cheapest venues?", answer: "Trattorias and pizzerias with student menus and special offers." },
          { question: "Are there vegetarian options?", answer: "Yes, many venues offer vegetarian and vegan dishes." },
          { question: "Where to find typical Piedmontese food?", answer: "Taverns and traditional restaurants in the city center." }
        ]
      }
    }
  },
  {
    slug: "san-salvario-guida-studenti",
    category: "students",
    date: "2025-11-03",
    author: "Team Jungle Rent",
    image: "/images/san-salvario-night.jpeg",
    readTime: 10,
    content: "san-salvario-guida-studenti",
    translations: {
      it: {
        title: "San Salvario: guida per studenti",
        excerpt: "Perché San Salvario è il quartiere ideale per studenti a Torino.",
        seo: {
          title: "San Salvario: vivere nel quartiere più vivo di Torino",
          description: "Affitti da €350, aperitivi a €5, metro a 2 min. Perché 8.000 studenti scelgono San Salvario.",
          keywords: [
            "san salvario torino",
            "quartiere studenti torino",
            "vivere san salvario",
            "servizi studenti torino",
            "movida san salvario"
          ]
        },
        tags: ["Studenti", "Quartieri", "Torino", "San Salvario", "Guide"],
        faqs: [
          { question: "Quali servizi offre San Salvario?", answer: "Bar, ristoranti, biblioteche e trasporti efficienti." },
          { question: "Com'è la vita notturna?", answer: "Molto vivace con locali e eventi per giovani." },
          { question: "È sicuro vivere a San Salvario?", answer: "Sì, con alcune precauzioni come in ogni quartiere urbano." }
        ]
      },
      en: {
        title: "San Salvario: guide for students",
        excerpt: "Why San Salvario is the ideal neighborhood for students in Turin.",
        seo: {
          title: "San Salvario: living in Turin's liveliest neighborhood",
          description: "Rents from €350, €5 aperitivo, metro 2 min away. Why 8,000 students choose San Salvario.",
          keywords: [
            "san salvario turin",
            "student neighborhood turin",
            "living san salvario",
            "student services turin",
            "nightlife san salvario"
          ]
        },
        tags: ["Students", "Neighborhoods", "Turin", "San Salvario", "Guides"],
        faqs: [
          { question: "What services does San Salvario offer?", answer: "Bars, restaurants, libraries and efficient transport." },
          { question: "How is the nightlife?", answer: "Very lively with venues and events for young people." },
          { question: "Is it safe to live in San Salvario?", answer: "Yes, with some precautions as in any urban neighborhood." }
        ]
      }
    }
  },
  {
    slug: "torino-ogni-stagione-turisti",
    category: "turisti",
    date: "2025-12-17",
    author: "Jungle Rent Team",
    image: "/images/parco-valentino-inverno.jpg",
    readTime: 35,
    content: "torino-ogni-stagione-turisti",
    translations: {
      it: {
        title: "Torino in ogni stagione: guida per turisti",
        excerpt: "Cosa fare e vedere a Torino durante tutte le stagioni dell'anno.",
        seo: {
          title: "Quando visitare Torino: guida mese per mese con eventi",
          description: "Luci d'Artista, Salone del Libro, tartufo d'Alba. Il momento perfetto per ogni tipo di viaggio.",
          keywords: [
            "torino ogni stagione",
            "turismo torino",
            "eventi torino",
            "attrazioni torino",
            "guida turistica torino"
          ]
        },
        tags: ["Turisti", "Torino", "Stagioni", "Eventi", "Guide"],
        faqs: [
          { question: "Quali eventi ci sono in primavera?", answer: "Festival floreali e passeggiate nei parchi." },
          { question: "Cosa fare in estate?", answer: "Concerti all'aperto e attività sul fiume Po." },
          { question: "Come godersi l'autunno?", answer: "Visite ai mercati e degustazioni di prodotti tipici." }
        ]
      },
      en: {
        title: "Turin in every season: tourist guide",
        excerpt: "What to do and see in Turin during all seasons of the year.",
        seo: {
          title: "When to visit Turin: month-by-month guide with events",
          description: "Luci d'Artista, Book Fair, Alba truffle. The perfect time for every type of trip.",
          keywords: [
            "turin every season",
            "tourism turin",
            "events turin",
            "attractions turin",
            "tourist guide turin"
          ]
        },
        tags: ["Tourists", "Turin", "Seasons", "Events", "Guides"],
        faqs: [
          { question: "What events are there in spring?", answer: "Flower festivals and park walks." },
          { question: "What to do in summer?", answer: "Open-air concerts and activities on the Po river." },
          { question: "How to enjoy autumn?", answer: "Visits to markets and tastings of typical products." }
        ]
      }
    }
  },
  {
    slug: "cicloturismo-avanzato-torino",
    category: "turisti",
    date: "2025-12-18",
    author: "Jungle Rent",
    image: "/images/cicloturismo-avanzato-torino.jpg",
    readTime: 35,
    content: "cicloturismo-avanzato-torino",
    translations: {
      it: {
        title: "Cicloturismo avanzato a Torino",
        excerpt: "Percorsi e consigli per cicloturisti esperti che vogliono esplorare Torino e dintorni.",
        seo: {
          title: "Cicloturismo Torino: 5 percorsi GPX da scaricare gratis",
          description: "Dalle colline al Po, 50-120 km. Noleggio, officine e hotel bike-friendly lungo il percorso.",
          keywords: [
            "cicloturismo torino",
            "percorsi bici torino",
            "cicloturismo avanzato",
            "bike tour torino",
            "turismo sostenibile torino"
          ]
        },
        tags: ["Turisti", "Cicloturismo", "Torino", "Bici", "Guide"],
        faqs: [
          { question: "Quali sono i percorsi consigliati?", answer: "Itinerari lungo il Po e nelle colline torinesi." },
          { question: "Dove noleggiare bici da corsa?", answer: "Negozi specializzati in centro città." },
          { question: "Ci sono strutture bike-friendly?", answer: "Hotel e B&B con servizi per ciclisti." }
        ]
      },
      en: {
        title: "Advanced bike tourism in Turin",
        excerpt: "Routes and tips for expert bike tourists who want to explore Turin and surroundings.",
        seo: {
          title: "Bike tourism Turin: 5 GPX routes free download",
          description: "From hills to Po river, 50-120 km. Rentals, workshops and bike-friendly hotels along the way.",
          keywords: [
            "bike tourism turin",
            "bike routes turin",
            "advanced bike tourism",
            "bike tour turin",
            "sustainable tourism turin"
          ]
        },
        tags: ["Tourists", "Bike Tourism", "Turin", "Bikes", "Guides"],
        faqs: [
          { question: "What are the recommended routes?", answer: "Routes along the Po river and in the hills around Turin." },
          { question: "Where to rent racing bikes?", answer: "Specialized shops in downtown." },
          { question: "Are there bike-friendly facilities?", answer: "Hotels and B&Bs with services for cyclists." }
        ]
      }
    }
  }
];

// Helper functions

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(post => post.category === category);
}

export function searchPosts(posts: BlogPost[], query: string, lang: 'it' | 'en'): BlogPost[] {
  if (!query.trim()) return posts;
  const lowerQuery = query.toLowerCase();
  return posts.filter(post => {
    const translation = post.translations[lang];
    return (
      translation.title.toLowerCase().includes(lowerQuery) ||
      translation.excerpt.toLowerCase().includes(lowerQuery) ||
      translation.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  });
}

export function filterPostsByTags(posts: BlogPost[], tags: string[], lang: 'it' | 'en'): BlogPost[] {
  if (tags.length === 0) return posts;
  return posts.filter(post => {
    const postTags = post.translations[lang].tags;
    return tags.some(tag => postTags.includes(tag));
  });
}

export function getAllTags(lang: 'it' | 'en'): string[] {
  const tagsSet = new Set<string>();
  blogPosts.forEach(post => {
    post.translations[lang].tags.forEach(tag => tagsSet.add(tag));
  });
  return Array.from(tagsSet).sort();
}

export function getRelatedPosts(
  currentSlug: string, 
  category: string, 
  currentTags: string[], 
  lang: 'it' | 'en',
  limit: number = 4
): BlogPost[] {
  return blogPosts
    .filter(post => post.slug !== currentSlug)
    .map(post => {
      const postTags = post.translations[lang].tags;
      const sharedTags = currentTags.filter(tag => postTags.includes(tag)).length;
      const categoryMatch = post.category === category ? 10 : 0;
      return { post, score: sharedTags * 2 + categoryMatch };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}
