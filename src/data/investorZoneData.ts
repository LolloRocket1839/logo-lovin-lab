// ============================================================================
// Investor Zone Data - Market data for Turin neighborhoods (Feb 2025)
// Source: Perplexity research with OMI, Immobiliare.it, FIAIP, Nomisma data
// ============================================================================

export type TrendType = 'stable' | 'moderate' | 'growth' | 'strong_growth' | 'max_growth';
export type DemandLevel = 'low' | 'medium' | 'high' | 'very_high';

export interface UrbanProject {
  name: string;
  investment: string;
  impact: { it: string; en: string };
}

export interface InvestorZone {
  id: string;
  name: string;
  slug: string;
  zone: 'Centro' | 'Semicentro' | 'Periferia';
  
  // Purchase prices
  pricePerSqm: { min: number; avg: number; max: number };
  variation2024: number; // Percentage change
  trend202526: TrendType;
  
  // Rental yields
  rentRoom: { min: number; max: number };
  rentApartment: { min: number; max: number };
  grossYield: { min: number; max: number };
  netYield: { min: number; max: number };
  
  // Risk metrics
  demand: DemandLevel;
  vacancyRate: { min: number; max: number };
  rentingTime: { it: string; en: string };
  targetTenant: { it: string[]; en: string[] };
  
  // Urban renewal
  urbanRenewal: {
    active: boolean;
    projects: UrbanProject[];
  };
  
  // Rankings (1 = best)
  rankings: {
    netYieldRank?: number;
    growthPotentialRank?: number;
    entryPriceRank?: number;
  };
  
  // Investor notes (from PDF analysis)
  investorNote: { it: string; en: string };
  
  // Visual assets (reused from neighborhoods.ts)
  image: string;
  coordinates: { lat: number; lng: number };
  
  // SEO
  seo: {
    it: { title: string; description: string; keywords: string[] };
    en: { title: string; description: string; keywords: string[] };
  };
}

export const investorZones: InvestorZone[] = [
  // ============================================================================
  // TOP 5 RENDIMENTO NETTO
  // ============================================================================
  {
    id: 'cenisia',
    name: 'Cenisia',
    slug: 'cenisia',
    zone: 'Semicentro',
    pricePerSqm: { min: 1940, avg: 2200, max: 2285 },
    variation2024: 4,
    trend202526: 'growth',
    rentRoom: { min: 380, max: 470 },
    rentApartment: { min: 550, max: 700 },
    grossYield: { min: 6, max: 7 },
    netYield: { min: 4.4, max: 5.1 },
    demand: 'high',
    vacancyRate: { min: 3, max: 5 },
    rentingTime: { it: '2-4 settimane', en: '2-4 weeks' },
    targetTenant: { 
      it: ['Studenti Politecnico', 'Giovani professionisti'], 
      en: ['Politecnico students', 'Young professionals'] 
    },
    urbanRenewal: {
      active: true,
      projects: [
        { 
          name: 'Metro 2', 
          investment: '€2+ mld (linea completa)',
          impact: { it: 'Forte rivalutazione prevista', en: 'Strong revaluation expected' }
        }
      ]
    },
    rankings: { netYieldRank: 1, growthPotentialRank: 4, entryPriceRank: 6 },
    investorNote: {
      it: 'Miglior rapporto rendimento/rischio. Vicinanza Politecnico garantisce domanda costante. Prezzi ancora accessibili rispetto a Crocetta con rendimenti superiori.',
      en: 'Best yield/risk ratio. Proximity to Politecnico ensures constant demand. Prices still accessible compared to Crocetta with higher yields.'
    },
    image: '/images/viale-alberato-torino.jpeg',
    coordinates: { lat: 45.0634, lng: 7.6489 },
    seo: {
      it: {
        title: 'Investire a Cenisia Torino | Rendimento 6-7% lordo',
        description: 'Guida investimento immobiliare Cenisia Torino. Rendimento lordo 6-7%, prezzi €2.200/mq. Vicinanza Politecnico, domanda studentesca alta.',
        keywords: ['investimento cenisia torino', 'rendimento immobiliare cenisia', 'comprare casa cenisia', 'affitto studenti cenisia']
      },
      en: {
        title: 'Invest in Cenisia Turin | 6-7% gross yield',
        description: 'Cenisia Turin real estate investment guide. Gross yield 6-7%, prices €2,200/sqm. Near Politecnico, high student demand.',
        keywords: ['cenisia turin investment', 'cenisia real estate yield', 'buy property cenisia', 'student rental cenisia']
      }
    }
  },
  {
    id: 'aurora',
    name: 'Aurora',
    slug: 'aurora',
    zone: 'Periferia',
    pricePerSqm: { min: 1000, avg: 1520, max: 1800 },
    variation2024: 7,
    trend202526: 'strong_growth',
    rentRoom: { min: 350, max: 450 },
    rentApartment: { min: 500, max: 600 },
    grossYield: { min: 5.5, max: 7 },
    netYield: { min: 3.8, max: 5 },
    demand: 'high',
    vacancyRate: { min: 5, max: 8 },
    rentingTime: { it: '2-4 settimane', en: '2-4 weeks' },
    targetTenant: { 
      it: ['Studenti Campus Einaudi', 'Investitori value-add'], 
      en: ['Campus Einaudi students', 'Value-add investors'] 
    },
    urbanRenewal: {
      active: true,
      projects: [
        { 
          name: 'Masterplan Carlo Ratti', 
          investment: '€25,8 mln',
          impact: { it: '+15-25% in 5-7 anni', en: '+15-25% in 5-7 years' }
        },
        { 
          name: 'Riqualificazione Porta Palazzo', 
          investment: 'Multi-milioni',
          impact: { it: 'Miglioramento generale area', en: 'General area improvement' }
        }
      ]
    },
    rankings: { netYieldRank: 2, growthPotentialRank: 2, entryPriceRank: 2 },
    investorNote: {
      it: 'Alto potenziale di rivalutazione grazie a Masterplan Carlo Ratti. Rischio medio-alto compensato da prezzi entry-level e rendimenti elevati. Perfetto per investitori value-add.',
      en: 'High appreciation potential thanks to Carlo Ratti Masterplan. Medium-high risk offset by entry-level prices and high yields. Perfect for value-add investors.'
    },
    image: '/images/mercato-piazza-crispi.jpg',
    coordinates: { lat: 45.0823, lng: 7.6823 },
    seo: {
      it: {
        title: 'Investire ad Aurora Torino | Massimo potenziale +25%',
        description: 'Aurora Torino: rendimento 5.5-7% lordo, prezzi €1.520/mq. Masterplan Carlo Ratti promette +15-25% in 5-7 anni.',
        keywords: ['investimento aurora torino', 'aurora riqualificazione', 'comprare casa aurora', 'rendimento aurora torino']
      },
      en: {
        title: 'Invest in Aurora Turin | Maximum potential +25%',
        description: 'Aurora Turin: 5.5-7% gross yield, prices €1,520/sqm. Carlo Ratti Masterplan promises +15-25% in 5-7 years.',
        keywords: ['aurora turin investment', 'aurora urban renewal', 'buy property aurora', 'aurora yield turin']
      }
    }
  },
  {
    id: 'san_salvario',
    name: 'San Salvario',
    slug: 'san-salvario',
    zone: 'Centro',
    pricePerSqm: { min: 2050, avg: 2650, max: 2710 },
    variation2024: 5.5,
    trend202526: 'stable',
    rentRoom: { min: 400, max: 500 },
    rentApartment: { min: 700, max: 850 },
    grossYield: { min: 5.8, max: 6.5 },
    netYield: { min: 4.1, max: 4.8 },
    demand: 'very_high',
    vacancyRate: { min: 2, max: 4 },
    rentingTime: { it: '2-3 settimane', en: '2-3 weeks' },
    targetTenant: { 
      it: ['Studenti Medicina', 'Giovani professionisti', 'Expat'], 
      en: ['Medical students', 'Young professionals', 'Expats'] 
    },
    urbanRenewal: {
      active: true,
      projects: [
        { 
          name: 'Scalo Nizza', 
          investment: '€105 mln',
          impact: { it: '+10-15% consolidamento', en: '+10-15% consolidation' }
        }
      ]
    },
    rankings: { netYieldRank: 3, growthPotentialRank: 6 },
    investorNote: {
      it: 'Il quartiere studentesco più consolidato di Torino. Domanda altissima, sfitto quasi nullo. Rendimenti stabili, ideale per investitori conservativi che cercano cash flow sicuro.',
      en: 'Turin\'s most established student neighborhood. Very high demand, almost zero vacancy. Stable yields, ideal for conservative investors seeking secure cash flow.'
    },
    image: '/images/san-salvario-night.jpeg',
    coordinates: { lat: 45.0523, lng: 7.6784 },
    seo: {
      it: {
        title: 'Investire a San Salvario Torino | Rendimento 5.8-6.5%',
        description: 'San Salvario Torino: il quartiere studentesco più richiesto. Rendimento 5.8-6.5%, sfitto 2-4%. Investimento sicuro con cash flow stabile.',
        keywords: ['investimento san salvario', 'rendimento san salvario torino', 'comprare casa san salvario', 'affitto studenti san salvario']
      },
      en: {
        title: 'Invest in San Salvario Turin | 5.8-6.5% yield',
        description: 'San Salvario Turin: most sought-after student neighborhood. 5.8-6.5% yield, 2-4% vacancy. Safe investment with stable cash flow.',
        keywords: ['san salvario investment', 'san salvario yield turin', 'buy property san salvario', 'student rental san salvario']
      }
    }
  },
  {
    id: 'vanchiglia',
    name: 'Vanchiglia',
    slug: 'vanchiglia',
    zone: 'Centro',
    pricePerSqm: { min: 2070, avg: 2600, max: 2680 },
    variation2024: 2.5,
    trend202526: 'moderate',
    rentRoom: { min: 350, max: 480 },
    rentApartment: { min: 600, max: 750 },
    grossYield: { min: 5.5, max: 6.2 },
    netYield: { min: 4, max: 4.5 },
    demand: 'high',
    vacancyRate: { min: 3, max: 5 },
    rentingTime: { it: '2-4 settimane', en: '2-4 weeks' },
    targetTenant: { 
      it: ['Studenti umanistiche', 'Artisti e creativi'], 
      en: ['Humanities students', 'Artists and creatives'] 
    },
    urbanRenewal: {
      active: false,
      projects: []
    },
    rankings: { netYieldRank: 4 },
    investorNote: {
      it: 'Quartiere artistico con identità forte. Target nicchia ma fedele. Crescita moderata, ottimo per diversificare portafoglio studentesco.',
      en: 'Artistic neighborhood with strong identity. Niche but loyal target. Moderate growth, great for diversifying student portfolio.'
    },
    image: '/images/tramonto-po-torino.jpeg',
    coordinates: { lat: 45.0712, lng: 7.6956 },
    seo: {
      it: {
        title: 'Investire a Vanchiglia Torino | Quartiere artistico',
        description: 'Vanchiglia Torino: rendimento 5.5-6.2%, quartiere artistico vicino Palazzo Nuovo. Target studenti umanistiche e creativi.',
        keywords: ['investimento vanchiglia torino', 'rendimento vanchiglia', 'comprare casa vanchiglia', 'affitto studenti vanchiglia']
      },
      en: {
        title: 'Invest in Vanchiglia Turin | Artistic neighborhood',
        description: 'Vanchiglia Turin: 5.5-6.2% yield, artistic neighborhood near Palazzo Nuovo. Target humanities students and creatives.',
        keywords: ['vanchiglia investment', 'vanchiglia yield turin', 'buy property vanchiglia', 'student rental vanchiglia']
      }
    }
  },
  {
    id: 'lingotto',
    name: 'Lingotto',
    slug: 'lingotto',
    zone: 'Periferia',
    pricePerSqm: { min: 1200, avg: 1650, max: 3000 },
    variation2024: 7.8,
    trend202526: 'strong_growth',
    rentRoom: { min: 400, max: 500 },
    rentApartment: { min: 600, max: 700 },
    grossYield: { min: 5, max: 6.5 },
    netYield: { min: 3.5, max: 4.5 },
    demand: 'high',
    vacancyRate: { min: 4, max: 6 },
    rentingTime: { it: '3-4 settimane', en: '3-4 weeks' },
    targetTenant: { 
      it: ['Professionisti', 'Studenti metro-dipendenti'], 
      en: ['Professionals', 'Metro-dependent students'] 
    },
    urbanRenewal: {
      active: true,
      projects: [
        { 
          name: 'Parco della Salute', 
          investment: 'Multi-miliardi',
          impact: { it: 'Consolidamento trend positivo', en: 'Consolidation of positive trend' }
        },
        { 
          name: 'Nuova Città della Salute', 
          investment: '€450 mln',
          impact: { it: 'Hub sanitario regionale', en: 'Regional healthcare hub' }
        }
      ]
    },
    rankings: { netYieldRank: 5, growthPotentialRank: 3 },
    investorNote: {
      it: 'Ex polo industriale FIAT in forte trasformazione. Parco della Salute creerà migliaia di posti di lavoro. Ottimo per investimento a medio-lungo termine.',
      en: 'Former FIAT industrial hub undergoing major transformation. Parco della Salute will create thousands of jobs. Great for medium-long term investment.'
    },
    image: '/images/strada-alpi-torino.jpeg',
    coordinates: { lat: 45.0312, lng: 7.6689 },
    seo: {
      it: {
        title: 'Investire al Lingotto Torino | Parco della Salute',
        description: 'Lingotto Torino: rendimento 5-6.5%, forte crescita +7.8% annuo. Parco della Salute e trasformazione ex FIAT trainano i prezzi.',
        keywords: ['investimento lingotto torino', 'lingotto parco salute', 'comprare casa lingotto', 'rendimento lingotto']
      },
      en: {
        title: 'Invest in Lingotto Turin | Parco della Salute',
        description: 'Lingotto Turin: 5-6.5% yield, strong growth +7.8% yearly. Parco della Salute and ex-FIAT transformation drive prices.',
        keywords: ['lingotto investment', 'lingotto parco salute', 'buy property lingotto', 'lingotto yield turin']
      }
    }
  },
  
  // ============================================================================
  // TOP 5 POTENZIALE CRESCITA
  // ============================================================================
  {
    id: 'barriera_di_milano',
    name: 'Barriera di Milano',
    slug: 'barriera-di-milano',
    zone: 'Periferia',
    pricePerSqm: { min: 860, avg: 1150, max: 1600 },
    variation2024: 3,
    trend202526: 'max_growth',
    rentRoom: { min: 250, max: 380 },
    rentApartment: { min: 380, max: 500 },
    grossYield: { min: 5.5, max: 7 },
    netYield: { min: 3.8, max: 4.1 },
    demand: 'medium',
    vacancyRate: { min: 8, max: 12 },
    rentingTime: { it: '4-6 settimane', en: '4-6 weeks' },
    targetTenant: { 
      it: ['Studenti budget-conscious', 'Lavoratori'], 
      en: ['Budget-conscious students', 'Workers'] 
    },
    urbanRenewal: {
      active: true,
      projects: [
        { 
          name: 'Metro 2 - Fermata Rebaudengo', 
          investment: '€2+ mld (linea completa)',
          impact: { it: 'Massima rivalutazione attesa', en: 'Maximum revaluation expected' }
        },
        { 
          name: 'Ex Manifattura Tabacchi', 
          investment: '€200+ mln',
          impact: { it: 'Nuovo polo culturale', en: 'New cultural hub' }
        },
        { 
          name: 'Masterplan Carlo Ratti', 
          investment: '€25,8 mln',
          impact: { it: '+15-25% in 5-7 anni', en: '+15-25% in 5-7 years' }
        }
      ]
    },
    rankings: { growthPotentialRank: 1, entryPriceRank: 1, netYieldRank: 6 },
    investorNote: {
      it: 'MASSIMO POTENZIALE. Prezzi più bassi di Torino (€1.150/mq) con Metro 2 in arrivo. Rischio alto ma upside enorme (+15-25%). Solo per investitori con orizzonte 5+ anni.',
      en: 'MAXIMUM POTENTIAL. Lowest prices in Turin (€1,150/sqm) with Metro 2 coming. High risk but huge upside (+15-25%). Only for investors with 5+ year horizon.'
    },
    image: '/images/mercati-rionali-torino.jpg',
    coordinates: { lat: 45.0956, lng: 7.6912 },
    seo: {
      it: {
        title: 'Investire a Barriera di Milano | Metro 2 +25%',
        description: 'Barriera di Milano: prezzi più bassi di Torino €1.150/mq. Metro 2 e Masterplan Carlo Ratti promettono +15-25% in 5-7 anni.',
        keywords: ['investimento barriera milano torino', 'barriera milano metro 2', 'comprare casa barriera', 'rendimento barriera milano']
      },
      en: {
        title: 'Invest in Barriera di Milano | Metro 2 +25%',
        description: 'Barriera di Milano: lowest prices in Turin €1,150/sqm. Metro 2 and Carlo Ratti Masterplan promise +15-25% in 5-7 years.',
        keywords: ['barriera milano investment', 'barriera milano metro 2', 'buy property barriera', 'barriera yield turin']
      }
    }
  },
  {
    id: 'crocetta',
    name: 'Crocetta',
    slug: 'crocetta',
    zone: 'Semicentro',
    pricePerSqm: { min: 2750, avg: 3000, max: 3500 },
    variation2024: 10, // Average of 6.3-14%
    trend202526: 'strong_growth',
    rentRoom: { min: 450, max: 550 },
    rentApartment: { min: 750, max: 900 },
    grossYield: { min: 5, max: 5.5 },
    netYield: { min: 3.6, max: 4 },
    demand: 'high',
    vacancyRate: { min: 4, max: 6 },
    rentingTime: { it: '3-4 settimane', en: '3-4 weeks' },
    targetTenant: { 
      it: ['Studenti Politecnico', 'Famiglie', 'Professionisti'], 
      en: ['Politecnico students', 'Families', 'Professionals'] 
    },
    urbanRenewal: {
      active: false,
      projects: []
    },
    rankings: { growthPotentialRank: 5 },
    investorNote: {
      it: 'Quartiere premium sede del Politecnico. Prezzi alti ma domanda garantita. Crescita forte (+10% nel 2024). Ideale per investitori che cercano asset prime.',
      en: 'Premium neighborhood home to Politecnico. High prices but guaranteed demand. Strong growth (+10% in 2024). Ideal for investors seeking prime assets.'
    },
    image: '/images/politecnico-torino.avif',
    coordinates: { lat: 45.0567, lng: 7.6612 },
    seo: {
      it: {
        title: 'Investire alla Crocetta Torino | Politecnico premium',
        description: 'Crocetta Torino: quartiere premium Politecnico. Prezzi €3.000/mq, crescita +10% annuo. Domanda garantita, asset sicuro.',
        keywords: ['investimento crocetta torino', 'crocetta politecnico', 'comprare casa crocetta', 'rendimento crocetta']
      },
      en: {
        title: 'Invest in Crocetta Turin | Politecnico premium',
        description: 'Crocetta Turin: premium Politecnico neighborhood. Prices €3,000/sqm, +10% yearly growth. Guaranteed demand, safe asset.',
        keywords: ['crocetta investment', 'crocetta politecnico', 'buy property crocetta', 'crocetta yield turin']
      }
    }
  },
  
  // ============================================================================
  // TOP 5 ENTRY PRICE (prezzi più bassi)
  // ============================================================================
  {
    id: 'borgo_vittoria',
    name: 'Borgo Vittoria',
    slug: 'borgo-vittoria',
    zone: 'Periferia',
    pricePerSqm: { min: 1200, avg: 1370, max: 1755 },
    variation2024: 8, // Average of 2-14%
    trend202526: 'growth',
    rentRoom: { min: 300, max: 400 },
    rentApartment: { min: 450, max: 550 },
    grossYield: { min: 5, max: 6 },
    netYield: { min: 3.5, max: 4.2 },
    demand: 'medium',
    vacancyRate: { min: 6, max: 10 },
    rentingTime: { it: '3-5 settimane', en: '3-5 weeks' },
    targetTenant: { 
      it: ['Studenti', 'Giovani lavoratori'], 
      en: ['Students', 'Young workers'] 
    },
    urbanRenewal: {
      active: false,
      projects: []
    },
    rankings: { entryPriceRank: 3 },
    investorNote: {
      it: 'Entry price basso con rendimenti decenti. Quartiere residenziale stabile. Buon rapporto qualità/prezzo per primi investimenti.',
      en: 'Low entry price with decent yields. Stable residential neighborhood. Good value for first investments.'
    },
    image: '/images/quartieri-studenti-torino.jpg',
    coordinates: { lat: 45.0923, lng: 7.6634 },
    seo: {
      it: {
        title: 'Investire a Borgo Vittoria Torino | Entry price basso',
        description: 'Borgo Vittoria Torino: prezzi €1.370/mq, rendimento 5-6% lordo. Quartiere residenziale ideale per primi investimenti.',
        keywords: ['investimento borgo vittoria', 'borgo vittoria torino', 'comprare casa borgo vittoria', 'rendimento borgo vittoria']
      },
      en: {
        title: 'Invest in Borgo Vittoria Turin | Low entry price',
        description: 'Borgo Vittoria Turin: prices €1,370/sqm, 5-6% gross yield. Residential neighborhood ideal for first investments.',
        keywords: ['borgo vittoria investment', 'borgo vittoria turin', 'buy property borgo vittoria', 'borgo vittoria yield']
      }
    }
  },
  {
    id: 'san_donato',
    name: 'San Donato',
    slug: 'san-donato',
    zone: 'Periferia',
    pricePerSqm: { min: 1500, avg: 1700, max: 2000 },
    variation2024: 4.3,
    trend202526: 'moderate',
    rentRoom: { min: 320, max: 420 },
    rentApartment: { min: 480, max: 600 },
    grossYield: { min: 5, max: 5.8 },
    netYield: { min: 3.5, max: 4.1 },
    demand: 'medium',
    vacancyRate: { min: 5, max: 8 },
    rentingTime: { it: '3-5 settimane', en: '3-5 weeks' },
    targetTenant: { 
      it: ['Studenti', 'Famiglie', 'Lavoratori'], 
      en: ['Students', 'Families', 'Workers'] 
    },
    urbanRenewal: {
      active: false,
      projects: []
    },
    rankings: { entryPriceRank: 4 },
    investorNote: {
      it: 'Quartiere popolare con buoni collegamenti. Prezzi accessibili e domanda stabile. Ottimo per investimenti a basso rischio.',
      en: 'Working-class neighborhood with good connections. Accessible prices and stable demand. Great for low-risk investments.'
    },
    image: '/images/torino-transport.jpg',
    coordinates: { lat: 45.0845, lng: 7.6445 },
    seo: {
      it: {
        title: 'Investire a San Donato Torino | Prezzi accessibili',
        description: 'San Donato Torino: prezzi €1.700/mq, rendimento 5-5.8% lordo. Quartiere ben collegato con domanda stabile.',
        keywords: ['investimento san donato torino', 'san donato torino', 'comprare casa san donato', 'rendimento san donato']
      },
      en: {
        title: 'Invest in San Donato Turin | Accessible prices',
        description: 'San Donato Turin: prices €1,700/sqm, 5-5.8% gross yield. Well-connected neighborhood with stable demand.',
        keywords: ['san donato investment', 'san donato turin', 'buy property san donato', 'san donato yield']
      }
    }
  },
  {
    id: 'parella',
    name: 'Parella',
    slug: 'parella',
    zone: 'Periferia',
    pricePerSqm: { min: 1575, avg: 1960, max: 2605 },
    variation2024: 5.5,
    trend202526: 'growth',
    rentRoom: { min: 320, max: 430 },
    rentApartment: { min: 500, max: 620 },
    grossYield: { min: 5, max: 5.5 },
    netYield: { min: 3.5, max: 4 },
    demand: 'medium',
    vacancyRate: { min: 5, max: 7 },
    rentingTime: { it: '3-4 settimane', en: '3-4 weeks' },
    targetTenant: { 
      it: ['Famiglie', 'Lavoratori', 'Studenti'], 
      en: ['Families', 'Workers', 'Students'] 
    },
    urbanRenewal: {
      active: true,
      projects: [
        { 
          name: 'Metro 2 - Fermata Parella', 
          investment: '€2+ mld (linea completa)',
          impact: { it: 'Rivalutazione con arrivo metro', en: 'Revaluation with metro arrival' }
        }
      ]
    },
    rankings: { entryPriceRank: 5 },
    investorNote: {
      it: 'Quartiere residenziale con Metro 2 in arrivo. Prezzi ancora contenuti, ottimo momento per entrare prima della rivalutazione.',
      en: 'Residential neighborhood with Metro 2 coming. Prices still contained, great time to enter before revaluation.'
    },
    image: '/images/parco-valentino-inverno.jpg',
    coordinates: { lat: 45.0734, lng: 7.6234 },
    seo: {
      it: {
        title: 'Investire a Parella Torino | Metro 2 in arrivo',
        description: 'Parella Torino: prezzi €1.960/mq, Metro 2 in costruzione. Quartiere residenziale con potenziale di rivalutazione.',
        keywords: ['investimento parella torino', 'parella metro 2', 'comprare casa parella', 'rendimento parella']
      },
      en: {
        title: 'Invest in Parella Turin | Metro 2 coming',
        description: 'Parella Turin: prices €1,960/sqm, Metro 2 under construction. Residential neighborhood with revaluation potential.',
        keywords: ['parella investment', 'parella metro 2', 'buy property parella', 'parella yield']
      }
    }
  },
  
  // ============================================================================
  // ALTRI QUARTIERI RILEVANTI
  // ============================================================================
  {
    id: 'santa_rita',
    name: 'Santa Rita',
    slug: 'santa-rita',
    zone: 'Semicentro',
    pricePerSqm: { min: 1200, avg: 1910, max: 2000 },
    variation2024: 4.5,
    trend202526: 'stable',
    rentRoom: { min: 320, max: 420 },
    rentApartment: { min: 500, max: 650 },
    grossYield: { min: 5, max: 5.5 },
    netYield: { min: 3.5, max: 4 },
    demand: 'medium',
    vacancyRate: { min: 4, max: 6 },
    rentingTime: { it: '3-4 settimane', en: '3-4 weeks' },
    targetTenant: { 
      it: ['Famiglie', 'Lavoratori', 'Studenti'], 
      en: ['Families', 'Workers', 'Students'] 
    },
    urbanRenewal: {
      active: false,
      projects: []
    },
    rankings: {},
    investorNote: {
      it: 'Quartiere residenziale stabile con buoni servizi. Rendimenti moderati ma rischio basso. Ideale per investitori conservativi.',
      en: 'Stable residential neighborhood with good services. Moderate yields but low risk. Ideal for conservative investors.'
    },
    image: '/images/mercato-nitti-torino.jpg',
    coordinates: { lat: 45.0389, lng: 7.6534 },
    seo: {
      it: {
        title: 'Investire a Santa Rita Torino | Quartiere stabile',
        description: 'Santa Rita Torino: prezzi €1.910/mq, rendimento 5-5.5% lordo. Quartiere residenziale sicuro per investimenti conservativi.',
        keywords: ['investimento santa rita torino', 'santa rita torino', 'comprare casa santa rita', 'rendimento santa rita']
      },
      en: {
        title: 'Invest in Santa Rita Turin | Stable neighborhood',
        description: 'Santa Rita Turin: prices €1,910/sqm, 5-5.5% gross yield. Safe residential neighborhood for conservative investments.',
        keywords: ['santa rita investment', 'santa rita turin', 'buy property santa rita', 'santa rita yield']
      }
    }
  },
  {
    id: 'cit_turin',
    name: 'Cit Turin',
    slug: 'cit-turin',
    zone: 'Semicentro',
    pricePerSqm: { min: 2400, avg: 2680, max: 4000 },
    variation2024: 3,
    trend202526: 'moderate',
    rentRoom: { min: 380, max: 480 },
    rentApartment: { min: 600, max: 750 },
    grossYield: { min: 4.5, max: 5.2 },
    netYield: { min: 3.2, max: 3.8 },
    demand: 'high',
    vacancyRate: { min: 3, max: 5 },
    rentingTime: { it: '2-4 settimane', en: '2-4 weeks' },
    targetTenant: { 
      it: ['Professionisti', 'Studenti', 'Famiglie'], 
      en: ['Professionals', 'Students', 'Families'] 
    },
    urbanRenewal: {
      active: false,
      projects: []
    },
    rankings: {},
    investorNote: {
      it: 'Quartiere liberty elegante. Prezzi premium ma alta qualità degli inquilini. Asset di prestigio per portafogli diversificati.',
      en: 'Elegant Art Nouveau neighborhood. Premium prices but high tenant quality. Prestige asset for diversified portfolios.'
    },
    image: '/images/portici-torino.jpg',
    coordinates: { lat: 45.0756, lng: 7.6612 },
    seo: {
      it: {
        title: 'Investire a Cit Turin Torino | Quartiere liberty premium',
        description: 'Cit Turin Torino: prezzi €2.680/mq, quartiere liberty elegante. Rendimento 4.5-5.2% con inquilini di qualità.',
        keywords: ['investimento cit turin', 'cit turin torino', 'comprare casa cit turin', 'rendimento cit turin']
      },
      en: {
        title: 'Invest in Cit Turin | Premium Art Nouveau',
        description: 'Cit Turin: prices €2,680/sqm, elegant Art Nouveau neighborhood. 4.5-5.2% yield with quality tenants.',
        keywords: ['cit turin investment', 'cit turin torino', 'buy property cit turin', 'cit turin yield']
      }
    }
  },
  {
    id: 'campidoglio',
    name: 'Campidoglio',
    slug: 'campidoglio',
    zone: 'Semicentro',
    pricePerSqm: { min: 1850, avg: 2325, max: 2600 },
    variation2024: 4.75, // Average of 3.5-6%
    trend202526: 'stable',
    rentRoom: { min: 320, max: 420 },
    rentApartment: { min: 500, max: 650 },
    grossYield: { min: 5, max: 5.8 },
    netYield: { min: 3.5, max: 4.2 },
    demand: 'medium',
    vacancyRate: { min: 4, max: 7 },
    rentingTime: { it: '3-4 settimane', en: '3-4 weeks' },
    targetTenant: { 
      it: ['Studenti creativi', 'Giovani professionisti'], 
      en: ['Creative students', 'Young professionals'] 
    },
    urbanRenewal: {
      active: false,
      projects: []
    },
    rankings: {},
    investorNote: {
      it: 'Quartiere in gentrificazione con mercato Balon. Atmosfera autentica, prezzi ancora accessibili. Potenziale di crescita medio-alto.',
      en: 'Gentrifying neighborhood with Balon market. Authentic atmosphere, still accessible prices. Medium-high growth potential.'
    },
    image: '/images/mercati-rionali-torino.jpg',
    coordinates: { lat: 45.0789, lng: 7.6534 },
    seo: {
      it: {
        title: 'Investire al Campidoglio Torino | Gentrificazione in corso',
        description: 'Campidoglio Torino: prezzi €2.325/mq, quartiere in gentrificazione. Mercato Balon, atmosfera autentica e potenziale crescita.',
        keywords: ['investimento campidoglio torino', 'campidoglio torino', 'comprare casa campidoglio', 'rendimento campidoglio']
      },
      en: {
        title: 'Invest in Campidoglio Turin | Gentrification ongoing',
        description: 'Campidoglio Turin: prices €2,325/sqm, gentrifying neighborhood. Balon market, authentic atmosphere and growth potential.',
        keywords: ['campidoglio investment', 'campidoglio turin', 'buy property campidoglio', 'campidoglio yield']
      }
    }
  }
];

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

export const getZoneBySlug = (slug: string): InvestorZone | undefined => {
  return investorZones.find(zone => zone.slug === slug);
};

export const getZonesByRanking = (
  rankingType: 'netYieldRank' | 'growthPotentialRank' | 'entryPriceRank',
  limit: number = 5
): InvestorZone[] => {
  return investorZones
    .filter(zone => zone.rankings[rankingType] !== undefined)
    .sort((a, b) => (a.rankings[rankingType] || 99) - (b.rankings[rankingType] || 99))
    .slice(0, limit);
};

export const getZonesByCategory = (zone: 'Centro' | 'Semicentro' | 'Periferia'): InvestorZone[] => {
  return investorZones.filter(z => z.zone === zone);
};

export const getZonesWithUrbanRenewal = (): InvestorZone[] => {
  return investorZones.filter(zone => zone.urbanRenewal.active);
};

export const getTrendLabel = (trend: TrendType, lang: 'it' | 'en'): string => {
  const labels = {
    stable: { it: 'Stabile', en: 'Stable' },
    moderate: { it: 'Crescita moderata', en: 'Moderate growth' },
    growth: { it: 'In crescita', en: 'Growing' },
    strong_growth: { it: 'Forte crescita', en: 'Strong growth' },
    max_growth: { it: 'Massima crescita', en: 'Maximum growth' }
  };
  return labels[trend][lang];
};

export const getDemandLabel = (demand: DemandLevel, lang: 'it' | 'en'): string => {
  const labels = {
    low: { it: 'Bassa', en: 'Low' },
    medium: { it: 'Media', en: 'Medium' },
    high: { it: 'Alta', en: 'High' },
    very_high: { it: 'Molto alta', en: 'Very high' }
  };
  return labels[demand][lang];
};

export const getTrendIcon = (trend: TrendType): string => {
  switch (trend) {
    case 'max_growth': return '🚀';
    case 'strong_growth': return '📈';
    case 'growth': return '↗️';
    case 'moderate': return '➡️';
    case 'stable': return '➖';
    default: return '➖';
  }
};

export const formatPrice = (price: number): string => {
  return price.toLocaleString('it-IT');
};

export const formatYield = (yieldMin: number, yieldMax: number): string => {
  return `${yieldMin.toFixed(1)}-${yieldMax.toFixed(1)}%`;
};
