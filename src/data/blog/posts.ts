import { BlogPost, BlogCategory } from "@/types/blog";

export const blogPosts: BlogPost[] = [
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
          title: "Cedolare secca 2026 | Guida novità fiscali investitori immobiliari",
          description: "Cedolare secca 2026: aliquota aumentata dal 21% al 26%. Guida completa con fonti normative, strategie e confronti per investitori immobiliari.",
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
          title: "Cedolare secca 2026 | Tax guide for property investors Italy",
          description: "Cedolare secca 2026: rate increased from 21% to 26%. Complete guide with regulatory sources, strategies and comparisons for property investors.",
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
          title: "Sciopero trasporti Italia gennaio 2026 | Aggiornamenti e impatti",
          description: "Informazioni sugli scioperi dei trasporti pubblici in Italia a gennaio 2026, con focus su Torino. Orari, modalità e alternative per viaggiare.",
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
          title: "Transport strike Italy January 2026 | Updates and impacts",
          description: "Information on public transport strikes in Italy in January 2026, focusing on Turin. Schedules, methods and travel alternatives.",
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
          title: "Tajarin piemontesi | Guida gastronomica Torino",
          description: "Guida ai tajarin piemontesi, pasta tipica del Piemonte, con ricette e ristoranti consigliati a Torino.",
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
          title: "Piedmontese Tajarin | Gastronomic guide Turin",
          description: "Guide to Piedmontese tajarin, typical Piedmont egg pasta, with recipes and recommended restaurants in Turin.",
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
          title: "Cioccolaterie Torino | Guida al cioccolato artigianale",
          description: "Scopri le cioccolaterie artigianali di Torino, con specialità come il gianduiotto e altre delizie al cioccolato.",
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
          title: "Chocolate shops Turin | Guide to artisanal chocolate",
          description: "Discover artisanal chocolate shops in Turin, with specialties like gianduiotto and other chocolate delights.",
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
          title: "Vendere casa Torino | Guida completa 2025",
          description: "Consigli, documenti e strategie per vendere casa a Torino nel 2025 in modo efficace e sicuro.",
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
          title: "Sell house Turin | Complete guide 2025",
          description: "Tips, documents and strategies to sell a house in Turin in 2025 effectively and safely.",
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
          title: "Student housing Italia | Report Savills 2025",
          description: "Approfondimento sul mercato dello student housing in Italia con dati e previsioni dal report Savills 2025.",
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
          title: "Student housing Italy | Savills report 2025",
          description: "Insight into the student housing market in Italy with data and forecasts from the Savills 2025 report.",
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
    readTime: 25,
    content: "eventi-torino-febbraio-2026",
    translations: {
      it: {
        title: "Eventi a Torino febbraio 2026",
        excerpt: "Calendario degli eventi principali a Torino nel febbraio 2026.",
        seo: {
          title: "Eventi Torino febbraio 2026 | Calendario e info",
          description: "Scopri gli eventi culturali, sportivi e di intrattenimento a Torino nel febbraio 2026.",
          keywords: [
            "eventi torino febbraio 2026",
            "calendario eventi torino",
            "manifestazioni torino",
            "cultura torino",
            "turismo torino"
          ]
        },
        tags: ["Turisti", "Eventi", "Torino", "Cultura", "Calendario"],
        faqs: [
          { question: "Quali sono gli eventi principali a febbraio 2026?", answer: "Festival del cioccolato, concerti e mostre d'arte." },
          { question: "Dove trovare informazioni aggiornate?", answer: "Siti ufficiali del Comune di Torino e uffici turistici." },
          { question: "Ci sono eventi per famiglie?", answer: "Sì, molte iniziative sono pensate anche per bambini e famiglie." }
        ]
      },
      en: {
        title: "Events in Turin February 2026",
        excerpt: "Calendar of main events in Turin in February 2026.",
        seo: {
          title: "Events Turin February 2026 | Calendar and info",
          description: "Discover cultural, sports and entertainment events in Turin in February 2026.",
          keywords: [
            "events turin february 2026",
            "events calendar turin",
            "turin happenings",
            "culture turin",
            "turin tourism"
          ]
        },
        tags: ["Tourists", "Events", "Turin", "Culture", "Calendar"],
        faqs: [
          { question: "What are the main events in February 2026?", answer: "Chocolate festival, concerts and art exhibitions." },
          { question: "Where to find updated information?", answer: "Official Turin Municipality websites and tourist offices." },
          { question: "Are there family-friendly events?", answer: "Yes, many initiatives are designed also for children and families." }
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
    readTime: 35,
    content: "eventi-torino-marzo-2026",
    translations: {
      it: {
        title: "Eventi a Torino marzo 2026",
        excerpt: "Guida agli eventi da non perdere a Torino nel marzo 2026.",
        seo: {
          title: "Eventi Torino marzo 2026 | Guida completa",
          description: "Scopri concerti, fiere e manifestazioni a Torino nel mese di marzo 2026.",
          keywords: [
            "eventi torino marzo 2026",
            "concerti torino marzo",
            "fiere torino",
            "manifestazioni torino",
            "turismo torino"
          ]
        },
        tags: ["Turisti", "Eventi", "Torino", "Concerti", "Fiere"],
        faqs: [
          { question: "Quali concerti sono previsti a marzo 2026?", answer: "Artisti nazionali e internazionali in vari teatri e palazzetti." },
          { question: "Ci sono fiere di settore?", answer: "Sì, fiere dedicate a tecnologia, arte e gastronomia." },
          { question: "Come acquistare i biglietti?", answer: "Online sui siti ufficiali degli eventi o presso punti vendita autorizzati." }
        ]
      },
      en: {
        title: "Events in Turin March 2026",
        excerpt: "Guide to unmissable events in Turin in March 2026.",
        seo: {
          title: "Events Turin March 2026 | Complete guide",
          description: "Discover concerts, fairs and events in Turin in March 2026.",
          keywords: [
            "events turin march 2026",
            "concerts turin march",
            "fairs turin",
            "events turin",
            "turin tourism"
          ]
        },
        tags: ["Tourists", "Events", "Turin", "Concerts", "Fairs"],
        faqs: [
          { question: "What concerts are scheduled for March 2026?", answer: "National and international artists in various theaters and arenas." },
          { question: "Are there sector fairs?", answer: "Yes, fairs dedicated to technology, art and gastronomy." },
          { question: "How to buy tickets?", answer: "Online on official event websites or authorized sales points." }
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
          title: "Università Torino | Guida studenti",
          description: "Tutto quello che devi sapere sull'Università di Torino: corsi, servizi, alloggi e vita studentesca.",
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
          title: "University Turin | Student guide",
          description: "Everything you need to know about the University of Turin: courses, services, accommodation and student life.",
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
          title: "Politecnico Torino | Guida studenti",
          description: "Informazioni dettagliate sul Politecnico di Torino, con focus su ingegneria, architettura e design.",
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
          title: "Polytechnic Turin | Student guide",
          description: "Detailed information about the Polytechnic University of Turin, focusing on engineering, architecture and design.",
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
          title: "Raccolta differenziata Torino | Guida pratica",
          description: "Tutte le informazioni sulla raccolta differenziata a Torino, per contribuire a un ambiente più pulito.",
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
          title: "Recycling Turin | Practical guide",
          description: "All information about recycling in Turin, to contribute to a cleaner environment.",
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
          title: "Eventi Torino gennaio 2026 | Calendario",
          description: "Scopri cosa fare a Torino nel gennaio 2026 con concerti, mostre e attività per tutti.",
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
          title: "Events Turin January 2026 | Calendar",
          description: "Discover what to do in Turin in January 2026 with concerts, exhibitions and activities for all.",
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
          title: "Volontariato Torino | Guida completa",
          description: "Scopri le associazioni di volontariato a Torino e come contribuire attivamente alla comunità.",
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
          title: "Volunteering Turin | Complete guide",
          description: "Discover volunteering associations in Turin and how to actively contribute to the community.",
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
          title: "Aule studio Torino | Guida per studenti",
          description: "Elenco e descrizione delle aule studio pubbliche e private a Torino, con orari e servizi.",
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
          title: "Study rooms Turin | Student guide",
          description: "List and description of public and private study rooms in Turin, with schedules and services.",
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
          title: "Digital nomads Torino | Guida completa",
          description: "Scopri spazi di coworking, eventi e servizi per digital nomads a Torino.",
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
          title: "Digital nomads Turin | Complete guide",
          description: "Discover coworking spaces, events and services for digital nomads in Turin.",
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
          title: "Quartieri sicuri donne Torino | Guida",
          description: "Scopri quali sono i quartieri più sicuri per donne a Torino e come muoversi in sicurezza.",
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
          title: "Safe neighborhoods women Turin | Guide",
          description: "Discover which neighborhoods are safest for women in Turin and how to move safely.",
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
          title: "Torino novembre | Guida turistica",
          description: "Scopri eventi, attrazioni e consigli per visitare Torino a novembre.",
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
          title: "Turin November | Tourist guide",
          description: "Discover events, attractions and tips to visit Turin in November.",
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
          title: "Torino dicembre | Guida turistica",
          description: "Scopri mercatini di Natale, luci e attività per turisti a Torino a dicembre.",
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
          title: "Turin December | Tourist guide",
          description: "Discover Christmas markets, lights and activities for tourists in Turin in December.",
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
          title: "Mobilità sostenibile Torino studenti | Guida",
          description: "Come muoversi in modo sostenibile a Torino per studenti universitari e giovani.",
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
          title: "Sustainable mobility Turin students | Guide",
          description: "How to move sustainably in Turin for university students and young people.",
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
          title: "Mutui investitori immobiliari | Guida completa",
          description: "Informazioni su mutui dedicati a investitori immobiliari, tassi, condizioni e documentazione necessaria.",
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
          title: "Mortgages real estate investors | Complete guide",
          description: "Information on mortgages dedicated to real estate investors, rates, conditions and required documentation.",
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
          title: "Gelaterie Torino studenti | Guida",
          description: "Scopri dove gustare il miglior gelato a Torino senza spendere troppo, ideale per studenti.",
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
          title: "Ice cream shops Turin students | Guide",
          description: "Discover where to enjoy the best ice cream in Turin without spending too much, ideal for students.",
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
          title: "Dove vivere Torino studenti Politecnico | Guida",
          description: "Scopri i quartieri migliori per studenti del Politecnico di Torino, con informazioni su affitti e servizi.",
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
          title: "Where to live Turin Polytechnic students | Guide",
          description: "Discover the best neighborhoods for Polytechnic students in Turin, with information on rents and services.",
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
          title: "Dove mangiare Torino studenti | Guida",
          description: "Scopri ristoranti, pizzerie e locali con prezzi accessibili per studenti a Torino.",
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
          title: "Where to eat Turin students | Guide",
          description: "Discover restaurants, pizzerias and venues with affordable prices for students in Turin.",
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
          title: "San Salvario Torino | Guida studenti",
          description: "Scopri i motivi per cui San Salvario è il quartiere preferito dagli studenti a Torino.",
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
          title: "San Salvario Turin | Student guide",
          description: "Discover why San Salvario is the preferred neighborhood for students in Turin.",
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
          title: "Torino ogni stagione | Guida turistica",
          description: "Scopri le attrazioni e gli eventi di Torino in primavera, estate, autunno e inverno.",
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
          title: "Turin every season | Tourist guide",
          description: "Discover attractions and events in Turin in spring, summer, autumn and winter.",
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
          title: "Cicloturismo Torino | Guida avanzata",
          description: "Scopri itinerari, servizi e strutture per cicloturismo avanzato a Torino.",
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
          title: "Bike tourism Turin | Advanced guide",
          description: "Discover routes, services and facilities for advanced bike tourism in Turin.",
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

// Category labels and helper functions

export const blogCategories: BlogCategory[] = [
  { id: "investors", label: { it: "Investitori", en: "Investors" } },
  { id: "societa", label: { it: "Società", en: "Society" } },
  { id: "students", label: { it: "Studenti", en: "Students" } },
  { id: "sellers", label: { it: "Venditori", en: "Sellers" } },
  { id: "turisti", label: { it: "Turisti", en: "Tourists" } }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}

export function getBlogPostsByCategory(categoryId: string): BlogPost[] {
  return blogPosts.filter(post => post.category === categoryId);
}
