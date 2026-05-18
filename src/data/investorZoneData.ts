// ============================================================================
// Investor Zone Data - Market data for Turin neighborhoods (Feb 2025)
// Source: OMI, Immobiliare.it, FIAIP, Nomisma data
// ============================================================================
import { z } from 'zod';


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
  pricePerSqm: { min: number; avg: number; max: number };
  variation2024: number;
  trend202526: TrendType;
  demand: DemandLevel;
  vacancyRate: { min: number; max: number };
  rentingTime: { it: string; en: string };
  targetTenant: { it: string[]; en: string[] };
  urbanRenewal: { active: boolean; projects: UrbanProject[] };
  rankings: { netYieldRank?: number; growthPotentialRank?: number; entryPriceRank?: number };
  investorNote: { it: string; en: string };
  image: string;
  coordinates: { lat: number; lng: number };
  seo: {
    it: { title: string; description: string; keywords: string[] };
    en: { title: string; description: string; keywords: string[] };
  };
}

export const investorZones: InvestorZone[] = [
  {
    id: 'cenisia',
    name: 'Cenisia',
    slug: 'cenisia',
    zone: 'Semicentro',
    pricePerSqm: { min: 1940, avg: 2200, max: 2285 },
    variation2024: 4,
    trend202526: 'growth',
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
      it: 'Miglior rapporto rendimento/rischio. Vicinanza Politecnico garantisce domanda costante. Prezzi ancora accessibili rispetto a Crocetta.',
      en: 'Best risk-adjusted profile. Proximity to Politecnico ensures constant demand. Prices still accessible compared to Crocetta.'
    },
    image: '/images/viale-alberato-torino.jpeg',
    coordinates: { lat: 45.0634, lng: 7.6489 },
    seo: {
      it: {
        title: 'Investire a Cenisia Torino',
        description: 'Guida investimento immobiliare Cenisia Torino. Prezzi €2.200/mq. Vicinanza Politecnico, domanda studentesca alta.',
        keywords: ['investimento cenisia torino', 'comprare casa cenisia', 'affitto studenti cenisia']
      },
      en: {
        title: 'Invest in Cenisia Turin',
        description: 'Cenisia Turin real estate investment guide. Prices €2,200/sqm. Near Politecnico, high student demand.',
        keywords: ['cenisia turin investment', 'buy property cenisia', 'student rental cenisia']
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
          impact: { it: 'Forte rivalutazione attesa a medio termine', en: 'Strong revaluation expected mid-term' }
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
      it: 'Alto potenziale di rivalutazione grazie a Masterplan Carlo Ratti. Rischio medio-alto compensato da prezzi entry-level. Perfetto per investitori value-add.',
      en: 'High appreciation potential thanks to Carlo Ratti Masterplan. Medium-high risk offset by entry-level prices. Perfect for value-add investors.'
    },
    image: '/images/mercato-piazza-crispi.jpg',
    coordinates: { lat: 45.0823, lng: 7.6823 },
    seo: {
      it: {
        title: 'Investire ad Aurora Torino | Massimo potenziale di rivalutazione',
        description: 'Aurora Torino: prezzi entry-level €1.520/mq. Masterplan Carlo Ratti e riqualificazione Porta Palazzo guidano una rivalutazione strutturale.',
        keywords: ['investimento aurora torino', 'aurora riqualificazione', 'comprare casa aurora']
      },
      en: {
        title: 'Invest in Aurora Turin | Maximum revaluation potential',
        description: 'Aurora Turin: entry-level prices €1,520/sqm. Carlo Ratti Masterplan and Porta Palazzo urban renewal drive structural revaluation.',
        keywords: ['aurora turin investment', 'aurora urban renewal', 'buy property aurora']
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
          impact: { it: 'Consolidamento e rivalutazione progressiva', en: 'Consolidation and progressive revaluation' }
        }
      ]
    },
    rankings: {},
    investorNote: {
      it: 'Il quartiere studentesco più consolidato di Torino. Domanda altissima, sfitto quasi nullo. Rendimenti stabili, ideale per investitori conservativi che cercano cash flow sicuro.',
      en: 'Turin\'s most established student neighborhood. Very high demand, near-zero vacancy. Stable returns, ideal for conservative investors seeking secure cash flow.'
    },
    image: '/images/san-salvario-night.jpeg',
    coordinates: { lat: 45.0523, lng: 7.6784 },
    seo: {
      it: {
        title: 'Investire a San Salvario Torino',
        description: 'San Salvario Torino: il quartiere studentesco più richiesto. Sfitto 2-4%. Investimento sicuro con cash flow stabile.',
        keywords: ['investimento san salvario', 'comprare casa san salvario', 'affitto studenti san salvario']
      },
      en: {
        title: 'Invest in San Salvario Turin',
        description: 'San Salvario Turin: the most sought-after student neighborhood. Vacancy 2-4%. Safe investment with stable cash flow.',
        keywords: ['san salvario investment', 'buy property san salvario', 'student rental san salvario']
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
    demand: 'high',
    vacancyRate: { min: 3, max: 5 },
    rentingTime: { it: '2-4 settimane', en: '2-4 weeks' },
    targetTenant: {
      it: ['Studenti umanistiche', 'Artisti e creativi'],
      en: ['Humanities students', 'Artists and creatives']
    },
    urbanRenewal: { active: false, projects: [] },
    rankings: {},
    investorNote: {
      it: 'Quartiere artistico con identità forte. Target nicchia ma fedele. Crescita moderata, ottimo per diversificare portafoglio studentesco.',
      en: 'Artistic neighborhood with strong identity. Niche but loyal target. Moderate growth, great for diversifying student portfolio.'
    },
    image: '/images/tramonto-po-torino.jpeg',
    coordinates: { lat: 45.0712, lng: 7.6956 },
    seo: {
      it: {
        title: 'Investire a Vanchiglia Torino | Quartiere artistico',
        description: 'Vanchiglia Torino: quartiere artistico vicino Palazzo Nuovo. Target studenti umanistiche e creativi.',
        keywords: ['investimento vanchiglia torino', 'comprare casa vanchiglia', 'affitto studenti vanchiglia']
      },
      en: {
        title: 'Invest in Vanchiglia Turin | Artistic neighborhood',
        description: 'Vanchiglia Turin: artistic neighborhood near Palazzo Nuovo. Target humanities students and creatives.',
        keywords: ['vanchiglia investment', 'buy property vanchiglia', 'student rental vanchiglia']
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
    rankings: {},
    investorNote: {
      it: 'Ex polo industriale FIAT in forte trasformazione. Parco della Salute creerà migliaia di posti di lavoro. Ottimo per investimento a medio-lungo termine.',
      en: 'Former FIAT industrial hub undergoing major transformation. Parco della Salute will create thousands of jobs. Great for medium-long term investment.'
    },
    image: '/images/strada-alpi-torino.jpeg',
    coordinates: { lat: 45.0312, lng: 7.6689 },
    seo: {
      it: {
        title: 'Investire al Lingotto Torino | Parco della Salute',
        description: 'Lingotto Torino: trasformazione urbana profonda guidata da Parco della Salute ed ex FIAT. Quartiere in forte crescita strutturale.',
        keywords: ['investimento lingotto torino', 'lingotto parco salute', 'comprare casa lingotto']
      },
      en: {
        title: 'Invest in Lingotto Turin | Parco della Salute',
        description: 'Lingotto Turin: deep urban transformation led by Parco della Salute and former FIAT site. Neighborhood in strong structural growth.',
        keywords: ['lingotto investment', 'lingotto parco salute', 'buy property lingotto']
      }
    }
  },
  {
    id: 'barriera_di_milano',
    name: 'Barriera di Milano',
    slug: 'barriera-di-milano',
    zone: 'Periferia',
    pricePerSqm: { min: 860, avg: 1150, max: 1600 },
    variation2024: 3,
    trend202526: 'max_growth',
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
          impact: { it: 'Forte rivalutazione attesa a medio termine', en: 'Strong revaluation expected mid-term' }
        }
      ]
    },
    rankings: { growthPotentialRank: 1, entryPriceRank: 1 },
    investorNote: {
      it: 'MASSIMO POTENZIALE. Prezzi più bassi di Torino (€1.150/mq) con Metro 2 in arrivo. Rischio alto compensato da upside strutturale. Solo per investitori con orizzonte 5+ anni.',
      en: 'MAXIMUM POTENTIAL. Lowest prices in Turin (€1,150/sqm) with Metro 2 coming. High risk offset by structural upside. Only for investors with 5+ year horizon.'
    },
    image: '/images/mercati-rionali-torino.jpg',
    coordinates: { lat: 45.0956, lng: 7.6912 },
    seo: {
      it: {
        title: 'Investire a Barriera di Milano | Metro 2 e riqualificazione',
        description: 'Barriera di Milano: prezzi più bassi di Torino €1.150/mq. Metro 2 e Masterplan Carlo Ratti trainano la rivalutazione strutturale.',
        keywords: ['investimento barriera milano torino', 'barriera milano metro 2', 'comprare casa barriera']
      },
      en: {
        title: 'Invest in Barriera di Milano | Metro 2 and urban renewal',
        description: 'Barriera di Milano: lowest prices in Turin €1,150/sqm. Metro 2 and Carlo Ratti Masterplan drive structural revaluation.',
        keywords: ['barriera milano investment', 'barriera milano metro 2', 'buy property barriera']
      }
    }
  },
  {
    id: 'crocetta',
    name: 'Crocetta',
    slug: 'crocetta',
    zone: 'Semicentro',
    pricePerSqm: { min: 2750, avg: 3000, max: 3500 },
    variation2024: 10,
    trend202526: 'strong_growth',
    demand: 'high',
    vacancyRate: { min: 4, max: 6 },
    rentingTime: { it: '3-4 settimane', en: '3-4 weeks' },
    targetTenant: {
      it: ['Studenti Politecnico', 'Famiglie', 'Professionisti'],
      en: ['Politecnico students', 'Families', 'Professionals']
    },
    urbanRenewal: { active: false, projects: [] },
    rankings: { growthPotentialRank: 5 },
    investorNote: {
      it: 'Quartiere premium sede del Politecnico. Prezzi alti ma domanda garantita. Trend di crescita consolidato. Ideale per investitori che cercano asset prime.',
      en: 'Premium neighborhood home to Politecnico. High prices but guaranteed demand. Consolidated growth trend. Ideal for investors seeking prime assets.'
    },
    image: '/images/politecnico-torino.avif',
    coordinates: { lat: 45.0567, lng: 7.6612 },
    seo: {
      it: {
        title: 'Investire alla Crocetta Torino | Politecnico premium',
        description: 'Crocetta Torino: quartiere premium Politecnico. Prezzi €3.000/mq, trend di crescita consolidato. Domanda garantita, asset sicuro.',
        keywords: ['investimento crocetta torino', 'crocetta politecnico', 'comprare casa crocetta']
      },
      en: {
        title: 'Invest in Crocetta Turin | Politecnico premium',
        description: 'Crocetta Turin: premium Politecnico neighborhood. Prices €3,000/sqm, consolidated growth trend. Guaranteed demand, safe asset.',
        keywords: ['crocetta investment', 'crocetta politecnico', 'buy property crocetta']
      }
    }
  },
  {
    id: 'borgo_vittoria',
    name: 'Borgo Vittoria',
    slug: 'borgo-vittoria',
    zone: 'Periferia',
    pricePerSqm: { min: 1200, avg: 1370, max: 1755 },
    variation2024: 8,
    trend202526: 'growth',
    demand: 'medium',
    vacancyRate: { min: 6, max: 10 },
    rentingTime: { it: '3-5 settimane', en: '3-5 weeks' },
    targetTenant: {
      it: ['Studenti', 'Giovani lavoratori'],
      en: ['Students', 'Young workers']
    },
    urbanRenewal: { active: false, projects: [] },
    rankings: { entryPriceRank: 3 },
    investorNote: {
      it: 'Entry price basso con domanda stabile. Quartiere residenziale solido. Buon rapporto qualità/prezzo per primi investimenti.',
      en: 'Low entry price with stable demand. Solid residential neighborhood. Good value for first investments.'
    },
    image: '/images/quartieri-studenti-torino.jpg',
    coordinates: { lat: 45.0923, lng: 7.6634 },
    seo: {
      it: {
        title: 'Investire a Borgo Vittoria Torino | Entry price basso',
        description: 'Borgo Vittoria Torino: prezzi €1.370/mq, Quartiere residenziale ideale per primi investimenti.',
        keywords: ['investimento borgo vittoria', 'borgo vittoria torino', 'comprare casa borgo vittoria']
      },
      en: {
        title: 'Invest in Borgo Vittoria Turin | Low entry price',
        description: 'Borgo Vittoria Turin: prices €1,370/sqm. Residential neighborhood ideal for first investments.',
        keywords: ['borgo vittoria investment', 'borgo vittoria turin', 'buy property borgo vittoria']
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
    demand: 'medium',
    vacancyRate: { min: 5, max: 8 },
    rentingTime: { it: '3-5 settimane', en: '3-5 weeks' },
    targetTenant: {
      it: ['Studenti', 'Famiglie', 'Lavoratori'],
      en: ['Students', 'Families', 'Workers']
    },
    urbanRenewal: { active: false, projects: [] },
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
        description: 'San Donato Torino: prezzi €1.700/mq, Quartiere ben collegato con domanda stabile.',
        keywords: ['investimento san donato torino', 'san donato torino', 'comprare casa san donato']
      },
      en: {
        title: 'Invest in San Donato Turin | Accessible prices',
        description: 'San Donato Turin: prices €1,700/sqm. Well-connected neighborhood with stable demand.',
        keywords: ['san donato investment', 'san donato turin', 'buy property san donato']
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
        keywords: ['investimento parella torino', 'parella metro 2', 'comprare casa parella']
      },
      en: {
        title: 'Invest in Parella Turin | Metro 2 coming',
        description: 'Parella Turin: prices €1,960/sqm, Metro 2 under construction. Residential neighborhood with revaluation potential.',
        keywords: ['parella investment', 'parella metro 2', 'buy property parella']
      }
    }
  },
  {
    id: 'santa_rita',
    name: 'Santa Rita',
    slug: 'santa-rita',
    zone: 'Semicentro',
    pricePerSqm: { min: 1200, avg: 1910, max: 2000 },
    variation2024: 4.5,
    trend202526: 'stable',
    demand: 'medium',
    vacancyRate: { min: 4, max: 6 },
    rentingTime: { it: '3-4 settimane', en: '3-4 weeks' },
    targetTenant: {
      it: ['Famiglie', 'Lavoratori', 'Studenti'],
      en: ['Families', 'Workers', 'Students']
    },
    urbanRenewal: { active: false, projects: [] },
    rankings: {},
    investorNote: {
      it: 'Quartiere residenziale stabile con buoni servizi. Rischio basso. Ideale per investitori conservativi.',
      en: 'Stable residential neighborhood with good services. Low risk. Ideal for conservative investors.'
    },
    image: '/images/mercato-nitti-torino.jpg',
    coordinates: { lat: 45.0389, lng: 7.6534 },
    seo: {
      it: {
        title: 'Investire a Santa Rita Torino | Quartiere stabile',
        description: 'Santa Rita Torino: prezzi €1.910/mq, Quartiere residenziale sicuro per investimenti conservativi.',
        keywords: ['investimento santa rita torino', 'santa rita torino', 'comprare casa santa rita']
      },
      en: {
        title: 'Invest in Santa Rita Turin | Stable neighborhood',
        description: 'Santa Rita Turin: prices €1,910/sqm. Safe residential neighborhood for conservative investments.',
        keywords: ['santa rita investment', 'santa rita turin', 'buy property santa rita']
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
    demand: 'high',
    vacancyRate: { min: 3, max: 5 },
    rentingTime: { it: '2-4 settimane', en: '2-4 weeks' },
    targetTenant: {
      it: ['Professionisti', 'Studenti', 'Famiglie'],
      en: ['Professionals', 'Students', 'Families']
    },
    urbanRenewal: { active: false, projects: [] },
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
        description: 'Cit Turin Torino: prezzi €2.680/mq, quartiere liberty elegante con inquilini di qualità.',
        keywords: ['investimento cit turin', 'cit turin torino', 'comprare casa cit turin']
      },
      en: {
        title: 'Invest in Cit Turin | Premium Art Nouveau',
        description: 'Cit Turin: prices €2,680/sqm, elegant Art Nouveau neighborhood with quality tenants.',
        keywords: ['cit turin investment', 'cit turin torino', 'buy property cit turin']
      }
    }
  },
  {
    id: 'campidoglio',
    name: 'Campidoglio',
    slug: 'campidoglio',
    zone: 'Semicentro',
    pricePerSqm: { min: 1850, avg: 2325, max: 2600 },
    variation2024: 4.75,
    trend202526: 'stable',
    demand: 'medium',
    vacancyRate: { min: 4, max: 7 },
    rentingTime: { it: '3-4 settimane', en: '3-4 weeks' },
    targetTenant: {
      it: ['Studenti creativi', 'Giovani professionisti'],
      en: ['Creative students', 'Young professionals']
    },
    urbanRenewal: { active: false, projects: [] },
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
        keywords: ['investimento campidoglio torino', 'campidoglio torino', 'comprare casa campidoglio']
      },
      en: {
        title: 'Invest in Campidoglio Turin | Gentrification ongoing',
        description: 'Campidoglio Turin: prices €2,325/sqm, gentrifying neighborhood. Balon market, authentic atmosphere and growth potential.',
        keywords: ['campidoglio investment', 'campidoglio turin', 'buy property campidoglio']
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

// ============================================================================
// RUNTIME VALIDATION (dev-only) — catches structural drift before build,
// e.g. merged fields like `trend202526demand` or missing impact/investorNote.
// ============================================================================

/**
 * i18n string block. `en` is tolerated as optional/empty for legacy entries
 * (IT-only datasets pre-translation) — IT remains required.
 */
const i18nString = z
  .object({
    it: z.string().min(1, 'IT copy is required'),
    en: z.string().optional().default(''),
  })
  .passthrough();

/** Critical: every urban project MUST carry an impact i18n block. */
const urbanProjectSchema = z
  .object({
    name: z.string().min(1),
    investment: z.string().min(1).optional().default(''),
    impact: i18nString,
  })
  .passthrough();

/** Accepts number, numeric string ("+4%", "4"), or null/undefined for legacy. */
const variationSchema = z.preprocess((v) => {
  if (v === null || v === undefined || v === '') return 0;
  if (typeof v === 'number') return v;
  if (typeof v === 'string') {
    const cleaned = v.replace(/[%+\s]/g, '').replace(',', '.');
    const n = Number(cleaned);
    return Number.isFinite(n) ? n : v;
  }
  return v;
}, z.number());

/** Accepts {min,max} OR a single number (legacy) OR omitted. */
const vacancyRateSchema = z
  .union([
    z.object({ min: z.number().min(0), max: z.number().min(0) }),
    z.number().min(0).transform((n) => ({ min: n, max: n })),
  ])
  .optional();

const seoLocaleSchema = z
  .object({
    title: z.string().min(1, 'SEO title required'),
    description: z.string().min(1, 'SEO description required'),
    keywords: z.array(z.string().min(1)).optional().default([]),
  })
  .passthrough();

/**
 * `passthrough()` on the root tolerates legacy/extra fields (e.g. removed
 * grossYield, netYield, roomRent) without flagging them as errors.
 * Only structural/critical fields are strictly enforced.
 */
export const investorZoneSchema = z
  .object({
    // ---- Critical identity & taxonomy (strict) ----
    id: z.string().min(1),
    name: z.string().min(1),
    slug: z.string().regex(/^[a-z0-9-]+$/, 'slug must be kebab-case'),
    zone: z.enum(['Centro', 'Semicentro', 'Periferia']),

    // ---- Critical pricing (strict) ----
    pricePerSqm: z.object({
      min: z.number().positive(),
      avg: z.number().positive(),
      max: z.number().positive(),
    }),

    // ---- Critical enums (catch trend202526demand-style merges) ----
    trend202526: z.enum(['stable', 'moderate', 'growth', 'strong_growth', 'max_growth']),
    demand: z.enum(['low', 'medium', 'high', 'very_high']),

    // ---- Critical narrative (strict on IT, tolerant on EN) ----
    investorNote: i18nString,
    seo: z.object({ it: seoLocaleSchema, en: seoLocaleSchema.partial().optional() }).passthrough(),

    // ---- Tolerant / legacy-friendly ----
    variation2024: variationSchema.optional(),
    vacancyRate: vacancyRateSchema,
    rentingTime: i18nString.optional(),
    targetTenant: z
      .object({
        it: z.array(z.string().min(1)).min(1),
        en: z.array(z.string()).optional().default([]),
      })
      .passthrough()
      .optional(),
    urbanRenewal: z
      .object({
        active: z.boolean(),
        projects: z.array(urbanProjectSchema), // impact still required inside
      })
      .passthrough()
      .optional(),
    rankings: z
      .object({
        netYieldRank: z.number().int().positive().optional(),
        growthPotentialRank: z.number().int().positive().optional(),
        entryPriceRank: z.number().int().positive().optional(),
      })
      .passthrough()
      .optional(),
    image: z.string().optional().default(''),
    coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
  })
  .passthrough();

export const investorZonesSchema = z.array(investorZoneSchema);


export interface InvestorZoneValidationIssue {
  zoneId: string | null;
  zoneName: string | null;
  slug: string | null;
  index: number | null;
  path: string;
  /** Zod error code, e.g. 'invalid_type', 'invalid_enum_value'. */
  code: string;
  /** Stringified value at the failing path (truncated), when retrievable. */
  received: string | null;
  message: string;
}

function safeGetAtPath(root: unknown, path: ReadonlyArray<PropertyKey>): unknown {
  let cur: unknown = root;
  for (const k of path) {
    if (cur === null || cur === undefined) return undefined;
    cur = (cur as Record<PropertyKey, unknown>)[k];
  }
  return cur;
}

function previewValue(v: unknown): string | null {
  if (v === undefined) return 'undefined';
  if (v === null) return 'null';
  try {
    const s = typeof v === 'string' ? `"${v}"` : JSON.stringify(v);
    return s.length > 80 ? `${s.slice(0, 77)}…` : s;
  } catch {
    return String(v);
  }
}

/**
 * In-memory cache for validation results — keyed by the dataset reference.
 * Avoids re-parsing the (large) `investorZones` array on repeated calls
 * during the same process (e.g. Vite build + dev-mode side effect + CLI script
 * + tests all hitting the validator within one Node session).
 *
 * - WeakMap for non-primitive datasets (no leaks).
 * - A dedicated slot for non-object inputs (primitives), invalidated on each
 *   distinct primitive value.
 */
let _issuesCache = new WeakMap<object, InvestorZoneValidationIssue[]>();
let _primitiveCacheKey: unknown = Symbol('unset');
let _primitiveCacheValue: InvestorZoneValidationIssue[] = [];

/** Test/debug helper: clears the in-memory validation cache. */
export function clearInvestorZoneValidationCache(): void {
  // WeakMap has no .clear() — replace the slot instead.
  _issuesCache = new WeakMap();
  _primitiveCacheKey = Symbol('unset');
  _primitiveCacheValue = [];
}

/**
 * Returns a list of validation issues against `investorZonesSchema`,
 * each annotated with zone id, slug, field path, Zod code, and received value.
 * Results are cached per dataset reference for the lifetime of the process.
 */
export function collectInvestorZoneIssues(
  zones: unknown = investorZones,
): InvestorZoneValidationIssue[] {
  const isObject = zones !== null && (typeof zones === 'object' || typeof zones === 'function');
  if (isObject) {
    const cached = _issuesCache.get(zones as object);
    if (cached) return cached;
  } else if (zones === _primitiveCacheKey) {
    return _primitiveCacheValue;
  }

  const result = investorZonesSchema.safeParse(zones);
  const issues: InvestorZoneValidationIssue[] = result.success
    ? []
    : result.error.issues.map((i) => {
        const idx = typeof i.path[0] === 'number' ? i.path[0] : null;
        const zone =
          idx !== null && Array.isArray(zones)
            ? (zones[idx] as InvestorZone | undefined)
            : undefined;
        const received = previewValue(safeGetAtPath(zones, i.path));
        return {
          zoneId: zone?.id ?? null,
          zoneName: zone?.name ?? null,
          slug: zone?.slug ?? null,
          index: idx,
          path: i.path.slice(1).join('.') || '<root>',
          code: i.code ?? 'unknown',
          received,
          message: i.message,
        };
      });

  if (isObject) {
    _issuesCache.set(zones as object, issues);
  } else {
    _primitiveCacheKey = zones;
    _primitiveCacheValue = issues;
  }
  return issues;
}

/**
 * Formats issues into a human-readable, grouped report (by zone slug).
 * Used both by the throwing validator and the build/CI script.
 */
export function formatInvestorZoneReport(issues: InvestorZoneValidationIssue[]): string {
  if (issues.length === 0) return '[investorZoneData] ✓ all zones valid';
  const groups = new Map<string, InvestorZoneValidationIssue[]>();
  for (const i of issues) {
    const key = i.slug ?? i.zoneId ?? `index #${i.index ?? '?'}`;
    const arr = groups.get(key) ?? [];
    arr.push(i);
    groups.set(key, arr);
  }
  const lines: string[] = [
    `[investorZoneData] schema validation failed — ${issues.length} issue${issues.length === 1 ? '' : 's'} across ${groups.size} zone${groups.size === 1 ? '' : 's'}:`,
    '',
  ];
  for (const [key, group] of groups) {
    const header = group[0];
    const label = header.zoneName ? `${header.zoneName} (${key})` : key;
    lines.push(`▸ ${label}`);
    for (const i of group) {
      lines.push(`    · ${i.path}  [${i.code}]`);
      lines.push(`        ${i.message}`);
      if (i.received !== null) lines.push(`        received: ${i.received}`);
    }
    lines.push('');
  }
  return lines.join('\n').trimEnd();
}

/**
 * Validates investorZones at module load (dev) and during build/CI.
 * Throws a clear, grouped, zone-scoped report so structural breakage
 * (e.g. `trend202526demand` merge, missing impact blocks) surfaces
 * immediately instead of as a cryptic downstream render bug.
 */
export function validateInvestorZones(zones: unknown = investorZones): void {
  const issues = collectInvestorZoneIssues(zones);
  if (issues.length === 0) return;
  throw new Error(formatInvestorZoneReport(issues));
}

// Run automatically in dev (Vite). No-op in production bundles.
if (import.meta.env?.DEV) {
  const issues = collectInvestorZoneIssues();
  if (issues.length > 0) {
    // Grouped, readable console output with slug + path + code + received value.
    /* eslint-disable no-console */
    console.group(
      `%c[investorZoneData] ${issues.length} schema issue${issues.length === 1 ? '' : 's'}`,
      'color:#fff;background:#b91c1c;padding:2px 6px;border-radius:3px;font-weight:bold;',
    );
    console.table(
      issues.map((i) => ({
        slug: i.slug ?? `#${i.index ?? '?'}`,
        path: i.path,
        code: i.code,
        received: i.received,
        message: i.message,
      })),
    );
    console.error(formatInvestorZoneReport(issues));
    console.groupEnd();
    /* eslint-enable no-console */

    // Dev-friendly toast (sonner is mounted globally). Lazy-load to avoid
    // pulling sonner into any non-UI consumer of this data module.
    void import('sonner')
      .then(({ toast }) => {
        const preview = issues
          .slice(0, 3)
          .map((i) => `${i.slug ?? i.zoneId ?? `#${i.index ?? '?'}`} → ${i.path}`)
          .join('\n');
        const more = issues.length > 3 ? `\n…and ${issues.length - 3} more (see console)` : '';
        toast.error(`Investor zones: ${issues.length} schema issue${issues.length === 1 ? '' : 's'}`, {
          description: preview + more,
          duration: 12000,
        });
      })
      .catch(() => {
        /* sonner unavailable (non-UI context) — console output already logged */
      });
  }
}


