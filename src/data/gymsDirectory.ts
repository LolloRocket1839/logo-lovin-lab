export type GymCategory = 
  | 'low-cost'
  | 'mid-range'
  | 'premium'
  | 'pool'
  | 'university';

export type GymChain = 
  | 'fitactive'
  | 'mcfit'
  | 'orange'
  | 'anytime'
  | 'virgin'
  | 'gofit'
  | 'masterclub'
  | 'independent';

export type GymTier = 1 | 2 | 3;

export interface Gym {
  id: string;
  name: string;
  chain: GymChain;
  category: GymCategory;
  address: string;
  district: string;
  coordinates: [number, number];
  priceStandard: number;
  priceStudent?: number;
  studentDiscount?: string;
  discountRequirements?: string;
  open24h: boolean;
  hasPool: boolean;
  hasSauna: boolean;
  hasClasses: boolean;
  hours: { weekday: string; weekend: string };
  rating: number;
  reviewCount?: number;
  website?: string;
  phone?: string;
  email?: string;
  nearestUniversity?: string[];
  distanceFromUni?: string;
  pros: { it: string[]; en: string[] };
  cons: { it: string[]; en: string[] };
  idealFor: { it: string; en: string };
  featured?: boolean;
  tier: GymTier;
}

export const gymsData: Gym[] = [
  // TIER 1: BEST VALUE (19,90€ - 29€/mese)
  {
    id: 'fitactive-corso-svizzera',
    name: 'FitActive Corso Svizzera',
    chain: 'fitactive',
    category: 'low-cost',
    address: 'Corso Svizzera 185, 10149 Torino',
    district: 'Centro/Crocetta',
    coordinates: [45.0833, 7.6667],
    priceStandard: 19.90,
    open24h: true,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '24h', weekend: '24h' },
    rating: 4.7,
    reviewCount: 339,
    website: 'https://fitactive.it',
    email: 'info@fitactive.it',
    nearestUniversity: ['UniTO Palazzo Nuovo', 'UniTO Einaudi', 'Politecnico Cittadella'],
    distanceFromUni: '1.0-1.5 km',
    pros: {
      it: ['Prezzo imbattibile (19,90€)', 'Accesso 24h', 'Corsi illimitati', 'Macchinari Technogym', 'Accesso a tutte le sedi Italia'],
      en: ['Unbeatable price (€19.90)', '24h access', 'Unlimited classes', 'Technogym equipment', 'Access to all Italian locations']
    },
    cons: {
      it: ['Senza piscina', 'Spogliatoi standard', 'Affollata ore di punta'],
      en: ['No pool', 'Standard locker rooms', 'Crowded at peak hours']
    },
    idealFor: {
      it: 'Budget limitato, chi studia di sera, massima praticità',
      en: 'Limited budget, late-night studiers, maximum practicality'
    },
    featured: true,
    tier: 1
  },
  {
    id: 'fitactive-giordano-bruno',
    name: 'FitActive Via Giordano Bruno',
    chain: 'fitactive',
    category: 'low-cost',
    address: 'Via Giordano Bruno 206, 10126 Torino',
    district: 'Centro/Vanchiglia',
    coordinates: [45.0678, 7.6939],
    priceStandard: 19.90,
    open24h: true,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '24h', weekend: '24h' },
    rating: 4.7,
    website: 'https://fitactive.it',
    email: 'info@fitactive.it',
    nearestUniversity: ['UniTO Palazzo Nuovo'],
    distanceFromUni: '0.8 km',
    pros: {
      it: ['Prezzo imbattibile', 'Accesso 24h', 'Vicinissima a Palazzo Nuovo'],
      en: ['Unbeatable price', '24h access', 'Very close to Palazzo Nuovo']
    },
    cons: {
      it: ['Senza piscina', 'Dimensioni contenute'],
      en: ['No pool', 'Smaller size']
    },
    idealFor: {
      it: 'Studenti UniTO Palazzo Nuovo con budget limitato',
      en: 'UniTO Palazzo Nuovo students on a budget'
    },
    tier: 1
  },
  {
    id: 'fitactive-botticelli',
    name: 'FitActive Via Botticelli',
    chain: 'fitactive',
    category: 'low-cost',
    address: 'Via Botticelli, 10126 Torino',
    district: 'Centro',
    coordinates: [45.0700, 7.6800],
    priceStandard: 19.90,
    open24h: false,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '9:00-21:00', weekend: '9:00-17:00' },
    rating: 5.0,
    website: 'https://fitactive.it',
    email: 'info@fitactive.it',
    pros: {
      it: ['Prezzo imbattibile', 'Recensioni eccellenti'],
      en: ['Unbeatable price', 'Excellent reviews']
    },
    cons: {
      it: ['Orari limitati', 'Sede più piccola'],
      en: ['Limited hours', 'Smaller location']
    },
    idealFor: {
      it: 'Chi preferisce palestre più tranquille',
      en: 'Those who prefer quieter gyms'
    },
    tier: 1
  },
  {
    id: 'mcfit-duchessa',
    name: 'McFIT Duchessa Jolanda',
    chain: 'mcfit',
    category: 'low-cost',
    address: 'Via Duchessa Jolanda 3, 10129 Torino',
    district: 'Centro-Nord',
    coordinates: [45.0750, 7.6650],
    priceStandard: 34.90,
    priceStudent: 29.90,
    studentDiscount: '€13.90 di sconto',
    discountRequirements: 'Documento universitario',
    open24h: false,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '7:00-23:00', weekend: '9:00-21:00' },
    rating: 3.1,
    website: 'https://mcfit.com/it',
    pros: {
      it: ['Sconto studenti significativo', 'Network europeo McFIT', 'Palestra efficiente'],
      en: ['Significant student discount', 'European McFIT network', 'Efficient gym']
    },
    cons: {
      it: ['Orari limitati vs FitActive', 'Senza piscina'],
      en: ['Limited hours vs FitActive', 'No pool']
    },
    idealFor: {
      it: 'Chi cerca sconto concreto e palestra funzionale',
      en: 'Those seeking real discount and functional gym'
    },
    tier: 1
  },
  {
    id: 'mcfit-politecnico',
    name: 'McFIT Torino Politecnico',
    chain: 'mcfit',
    category: 'university',
    address: 'Corso Francesco Ferrucci 112, Edificio B1, 10138 Torino',
    district: 'Crocetta',
    coordinates: [45.0628, 7.6589],
    priceStandard: 34.90,
    priceStudent: 29.90,
    studentDiscount: '€13.90 di sconto',
    discountRequirements: 'Documento universitario',
    open24h: false,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '7:00-23:00', weekend: '9:00-21:00' },
    rating: 4.8,
    website: 'https://mcfit.com/it',
    nearestUniversity: ['Politecnico Cittadella'],
    distanceFromUni: '0.1 km (1-2 min)',
    pros: {
      it: ['Dentro il campus Politecnico', 'Sconto studenti', 'Orari lunghi', 'Praticità massima'],
      en: ['Inside Politecnico campus', 'Student discount', 'Long hours', 'Maximum convenience']
    },
    cons: {
      it: ['Affollata ore di punta', 'Senza piscina'],
      en: ['Crowded at peak hours', 'No pool']
    },
    idealFor: {
      it: 'Studenti Politecnico - massima praticità',
      en: 'Politecnico students - maximum convenience'
    },
    featured: true,
    tier: 1
  },
  {
    id: 'mcfit-lagrange',
    name: 'McFIT Lagrange',
    chain: 'mcfit',
    category: 'low-cost',
    address: 'Via Lagrange, 10123 Torino',
    district: 'Centro',
    coordinates: [45.0650, 7.6850],
    priceStandard: 34.90,
    priceStudent: 29.90,
    studentDiscount: '€13.90 di sconto',
    discountRequirements: 'Documento universitario',
    open24h: false,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '7:00-23:00', weekend: '9:00-21:00' },
    rating: 4.2,
    website: 'https://mcfit.com/it',
    pros: {
      it: ['Posizione centrale', 'Sconto studenti', 'Network McFIT'],
      en: ['Central location', 'Student discount', 'McFIT network']
    },
    cons: {
      it: ['Senza piscina'],
      en: ['No pool']
    },
    idealFor: {
      it: 'Studenti che vivono in centro',
      en: 'Students living downtown'
    },
    tier: 1
  },
  {
    id: 'mcfit-mirafiori',
    name: 'McFIT Mirafiori Nord',
    chain: 'mcfit',
    category: 'low-cost',
    address: 'Mirafiori Nord, 10135 Torino',
    district: 'Mirafiori',
    coordinates: [45.0300, 7.6300],
    priceStandard: 34.90,
    priceStudent: 29.90,
    studentDiscount: '€13.90 di sconto',
    discountRequirements: 'Documento universitario',
    open24h: false,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '7:00-23:00', weekend: '9:00-21:00' },
    rating: 5.0,
    website: 'https://mcfit.com/it',
    nearestUniversity: ['Politecnico Mirafiori'],
    distanceFromUni: '0.5 km',
    pros: {
      it: ['Rating perfetto', 'Sconto studenti', 'Vicino campus Mirafiori'],
      en: ['Perfect rating', 'Student discount', 'Near Mirafiori campus']
    },
    cons: {
      it: ['Zona periferica', 'Senza piscina'],
      en: ['Peripheral area', 'No pool']
    },
    idealFor: {
      it: 'Studenti Politecnico Mirafiori/Design',
      en: 'Politecnico Mirafiori/Design students'
    },
    tier: 1
  },
  {
    id: 'mcfit-aurora',
    name: 'McFIT Aurora',
    chain: 'mcfit',
    category: 'low-cost',
    address: 'Aurora, Torino',
    district: 'Aurora',
    coordinates: [45.0850, 7.6950],
    priceStandard: 34.90,
    priceStudent: 29.90,
    studentDiscount: '€13.90 di sconto',
    discountRequirements: 'Documento universitario',
    open24h: false,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '7:00-23:00', weekend: '9:00-21:00' },
    rating: 3.8,
    website: 'https://mcfit.com/it',
    pros: {
      it: ['Sconto studenti', 'Network McFIT'],
      en: ['Student discount', 'McFIT network']
    },
    cons: {
      it: ['Zona meno centrale', 'Senza piscina'],
      en: ['Less central area', 'No pool']
    },
    idealFor: {
      it: 'Chi vive in zona Aurora',
      en: 'Those living in Aurora area'
    },
    tier: 1
  },
  {
    id: 'master-club',
    name: 'Master Club 2.0',
    chain: 'masterclub',
    category: 'pool',
    address: 'Corso Moncalieri 494, 10135 Torino',
    district: 'Mirafiori',
    coordinates: [45.0200, 7.6800],
    priceStandard: 45,
    priceStudent: 29,
    studentDiscount: '€16 di sconto (35%)',
    discountRequirements: 'Certificazione iscrizione universitaria',
    open24h: false,
    hasPool: true,
    hasSauna: true,
    hasClasses: true,
    hours: { weekday: '8:00-21:30', weekend: '9:00-19:30' },
    rating: 4.8,
    website: 'https://masterclub20.it',
    phone: '0116610418',
    email: 'info@masterclub20.it',
    pros: {
      it: ['Piscina interna a €29 studenti!', '60+ ore corsi/settimana', 'Spa inclusa', 'Sconto generoso'],
      en: ['Indoor pool at €29 for students!', '60+ hours classes/week', 'Spa included', 'Generous discount']
    },
    cons: {
      it: ['Posizione periferica', 'Richiede certificazione'],
      en: ['Peripheral location', 'Requires certification']
    },
    idealFor: {
      it: 'Chi vuole piscina + palestra a prezzo studenti',
      en: 'Those wanting pool + gym at student price'
    },
    featured: true,
    tier: 1
  },
  {
    id: 'villa-glicini',
    name: 'Villa Glicini',
    chain: 'independent',
    category: 'mid-range',
    address: 'Viale Carlo Ceppi 5, 10126 Torino',
    district: 'Crocetta',
    coordinates: [45.0580, 7.6720],
    priceStandard: 45,
    priceStudent: 29,
    studentDiscount: '€16 di sconto',
    discountRequirements: 'Certificazione ENS o Erasmus',
    open24h: false,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '8:00-22:00', weekend: '9:00-20:00' },
    rating: 4.5,
    website: 'https://villaglicinitorino.com',
    nearestUniversity: ['UniTO Einaudi'],
    distanceFromUni: '1.5 km',
    pros: {
      it: ['Sconto studenti internazionali', 'Prova gratuita', 'Zona tranquilla', 'Community amichevole'],
      en: ['International student discount', 'Free trial', 'Quiet area', 'Friendly community']
    },
    cons: {
      it: ['Sconto solo per ENS/Erasmus', 'Senza piscina'],
      en: ['Discount only for ENS/Erasmus', 'No pool']
    },
    idealFor: {
      it: 'Studenti Erasmus e iscritti ENS',
      en: 'Erasmus students and ENS members'
    },
    tier: 1
  },
  {
    id: 'gym-club-32',
    name: 'Gym Club 32',
    chain: 'independent',
    category: 'university',
    address: "Via Sant'Ottavio, 10123 Torino",
    district: 'Centro',
    coordinates: [45.0700, 7.6950],
    priceStandard: 39,
    priceStudent: 29,
    studentDiscount: '€10 di sconto',
    discountRequirements: 'Tessera universitaria',
    open24h: false,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '8:00-22:00', weekend: '9:00-18:00' },
    rating: 4.4,
    nearestUniversity: ['UniTO Palazzo Nuovo'],
    distanceFromUni: '0.1 km',
    pros: {
      it: ['Dentro UniTO', 'Sconto studenti', 'Massima praticità'],
      en: ['Inside UniTO', 'Student discount', 'Maximum convenience']
    },
    cons: {
      it: ['Dimensioni contenute', 'Senza piscina'],
      en: ['Small size', 'No pool']
    },
    idealFor: {
      it: 'Studenti UniTO Palazzo Nuovo',
      en: 'UniTO Palazzo Nuovo students'
    },
    tier: 1
  },

  // TIER 2: MID-RANGE (30€ - 40€/mese)
  {
    id: 'orange-nizza',
    name: 'Orange Nizza',
    chain: 'orange',
    category: 'mid-range',
    address: 'Piazza Nizza 44, 10126 Torino',
    district: 'Nizza Millefonti',
    coordinates: [45.0450, 7.6780],
    priceStandard: 34.90,
    open24h: false,
    hasPool: false,
    hasSauna: true,
    hasClasses: true,
    hours: { weekday: '6:00-24:00', weekend: '9:00-20:00' },
    rating: 4.9,
    reviewCount: 112,
    website: 'https://orangepalestre.it',
    nearestUniversity: ['UniTO Palazzo Nuovo'],
    distanceFromUni: '1.2 km',
    pros: {
      it: ['Orari straordinari (6-24)', 'Spazi ampi 4500+ mq', 'Macchinari moderni', 'Sauna scandinava', 'Accesso 11 sedi Orange'],
      en: ['Extraordinary hours (6am-midnight)', 'Large spaces 4500+ sqm', 'Modern equipment', 'Scandinavian sauna', 'Access to 11 Orange locations']
    },
    cons: {
      it: ['Prezzo più alto di FitActive', 'Senza piscina'],
      en: ['Higher price than FitActive', 'No pool']
    },
    idealFor: {
      it: 'Chi studia tardi, chi vuole struttura grande',
      en: 'Late-night studiers, those wanting large facility'
    },
    tier: 2
  },
  {
    id: 'orange-rosselli',
    name: 'Orange Rosselli',
    chain: 'orange',
    category: 'mid-range',
    address: 'Via San Paolo 169, 10126 Torino',
    district: 'Borgo San Paolo',
    coordinates: [45.0650, 7.6500],
    priceStandard: 34.90,
    open24h: false,
    hasPool: false,
    hasSauna: true,
    hasClasses: true,
    hours: { weekday: '6:00-24:00', weekend: '9:00-20:00' },
    rating: 4.8,
    website: 'https://orangepalestre.it',
    nearestUniversity: ['UniTO Einaudi'],
    distanceFromUni: '0.5 km (7 min)',
    pros: {
      it: ['Vicinissima Campus Einaudi', 'Orari 6-24', 'Buona qualità'],
      en: ['Very close to Einaudi Campus', 'Hours 6am-midnight', 'Good quality']
    },
    cons: {
      it: ['Senza piscina'],
      en: ['No pool']
    },
    idealFor: {
      it: 'Studenti UniTO Einaudi',
      en: 'UniTO Einaudi students'
    },
    featured: true,
    tier: 2
  },
  {
    id: 'orange-lingotto',
    name: 'Orange Lingotto',
    chain: 'orange',
    category: 'pool',
    address: 'Via Pio VII 132, 10135 Torino',
    district: 'Lingotto',
    coordinates: [45.0300, 7.6650],
    priceStandard: 34.90,
    open24h: false,
    hasPool: true,
    hasSauna: true,
    hasClasses: true,
    hours: { weekday: '6:00-24:00', weekend: '9:00-20:00' },
    rating: 4.9,
    website: 'https://orangepalestre.it',
    nearestUniversity: ['Politecnico Castello Valentino'],
    distanceFromUni: '1.0 km',
    pros: {
      it: ['Spa inclusa', 'Piscina', 'Orari lunghi', 'Qualità struttura'],
      en: ['Spa included', 'Pool', 'Long hours', 'Quality facility']
    },
    cons: {
      it: ['Zona più periferica'],
      en: ['More peripheral area']
    },
    idealFor: {
      it: 'Studenti Architettura Castello Valentino',
      en: 'Architecture students at Castello Valentino'
    },
    tier: 2
  },
  {
    id: 'gofit-mercato-fiori',
    name: 'GO Fit Mercato Fiori',
    chain: 'gofit',
    category: 'pool',
    address: 'Via Perugia 29, 10141 Torino',
    district: 'Aurora/Centro-Ovest',
    coordinates: [45.0900, 7.6700],
    priceStandard: 45,
    open24h: false,
    hasPool: true,
    hasSauna: true,
    hasClasses: true,
    hours: { weekday: '7:00-22:00', weekend: '9:00-20:00' },
    rating: 4.7,
    website: 'https://gofitness.it',
    pros: {
      it: ['NUOVA struttura 2025', '3 piscine incluse', '14.000 mq', '150+ corsi/settimana', 'Sostenibile 100%', 'Tecnologia AI'],
      en: ['NEW 2025 facility', '3 pools included', '14,000 sqm', '150+ classes/week', '100% sustainable', 'AI technology']
    },
    cons: {
      it: ['Tariffe studenti da verificare', 'Struttura nuova'],
      en: ['Student rates to be verified', 'New facility']
    },
    idealFor: {
      it: 'Chi vuole la migliore esperienza fitness moderna',
      en: 'Those wanting the best modern fitness experience'
    },
    featured: true,
    tier: 2
  },
  {
    id: 'orange-invorio',
    name: 'Orange Invorio',
    chain: 'orange',
    category: 'mid-range',
    address: 'Via Invorio 24, 10126 Torino',
    district: 'Centro-Nord',
    coordinates: [45.0800, 7.6700],
    priceStandard: 34.90,
    open24h: false,
    hasPool: false,
    hasSauna: true,
    hasClasses: true,
    hours: { weekday: '6:00-24:00', weekend: '9:00-20:00' },
    rating: 4.7,
    website: 'https://orangepalestre.it',
    pros: {
      it: ['Orari 6-24', 'Network Orange', 'Sauna'],
      en: ['Hours 6am-midnight', 'Orange network', 'Sauna']
    },
    cons: {
      it: ['Senza piscina'],
      en: ['No pool']
    },
    idealFor: {
      it: 'Chi vive in zona Centro-Nord',
      en: 'Those living in Centro-Nord area'
    },
    tier: 2
  },
  {
    id: 'orange-orbetello',
    name: 'Orange Orbetello',
    chain: 'orange',
    category: 'mid-range',
    address: 'Via Orbetello 98, 10126 Torino',
    district: 'Lingotto',
    coordinates: [45.0350, 7.6600],
    priceStandard: 34.90,
    open24h: false,
    hasPool: false,
    hasSauna: true,
    hasClasses: true,
    hours: { weekday: '6:00-24:00', weekend: '9:00-20:00' },
    rating: 3.5,
    website: 'https://orangepalestre.it',
    pros: {
      it: ['Network Orange', 'Orari 6-24'],
      en: ['Orange network', 'Hours 6am-midnight']
    },
    cons: {
      it: ['Rating più basso', 'Senza piscina'],
      en: ['Lower rating', 'No pool']
    },
    idealFor: {
      it: 'Chi vive in zona Lingotto',
      en: 'Those living in Lingotto area'
    },
    tier: 2
  },
  {
    id: 'orange-marconi',
    name: 'Orange Marconi',
    chain: 'orange',
    category: 'mid-range',
    address: 'Via Nizza 34, 10126 Torino',
    district: 'Nizza Millefonti',
    coordinates: [45.0500, 7.6800],
    priceStandard: 34.90,
    open24h: false,
    hasPool: false,
    hasSauna: true,
    hasClasses: true,
    hours: { weekday: '6:00-24:00', weekend: '9:00-20:00' },
    rating: 4.8,
    website: 'https://orangepalestre.it',
    pros: {
      it: ['Ottime recensioni', 'Network Orange', 'Orari 6-24'],
      en: ['Great reviews', 'Orange network', 'Hours 6am-midnight']
    },
    cons: {
      it: ['Senza piscina'],
      en: ['No pool']
    },
    idealFor: {
      it: 'Chi vive in zona Nizza',
      en: 'Those living in Nizza area'
    },
    tier: 2
  },
  {
    id: 'orange-cercenasco',
    name: 'Orange Cercenasco',
    chain: 'orange',
    category: 'mid-range',
    address: 'Via Cercenasco 17, 10126 Torino',
    district: 'Centro-Est',
    coordinates: [45.0600, 7.7000],
    priceStandard: 34.90,
    open24h: false,
    hasPool: false,
    hasSauna: true,
    hasClasses: true,
    hours: { weekday: '6:00-24:00', weekend: '9:00-20:00' },
    rating: 4.8,
    website: 'https://orangepalestre.it',
    pros: {
      it: ['Ottime recensioni', 'Network Orange', 'Orari 6-24'],
      en: ['Great reviews', 'Orange network', 'Hours 6am-midnight']
    },
    cons: {
      it: ['Senza piscina'],
      en: ['No pool']
    },
    idealFor: {
      it: 'Chi vive in zona Centro-Est',
      en: 'Those living in Centro-Est area'
    },
    tier: 2
  },
  {
    id: 'sisport-mirafiori',
    name: 'Sisport Mirafiori',
    chain: 'independent',
    category: 'pool',
    address: 'Corso Ferraris 34, 10135 Torino',
    district: 'Mirafiori',
    coordinates: [45.0250, 7.6400],
    priceStandard: 50,
    priceStudent: 41,
    studentDiscount: 'Sconto Under 25',
    discountRequirements: 'Documento identità under 25',
    open24h: false,
    hasPool: true,
    hasSauna: true,
    hasClasses: true,
    hours: { weekday: '7:00-22:00', weekend: '9:00-19:00' },
    rating: 3.9,
    nearestUniversity: ['Politecnico'],
    distanceFromUni: '3 km',
    pros: {
      it: ['Piscina inclusa', 'Sconto under 25', 'Molte attività'],
      en: ['Pool included', 'Under 25 discount', 'Many activities']
    },
    cons: {
      it: ['Zona periferica', 'Rating medio'],
      en: ['Peripheral area', 'Average rating']
    },
    idealFor: {
      it: 'Giovani under 25 che vogliono piscina',
      en: 'Under 25s wanting a pool'
    },
    tier: 2
  },
  {
    id: 'torino-palestre-elite',
    name: 'Torino Palestre Elite',
    chain: 'independent',
    category: 'mid-range',
    address: 'Via Assarotti, 10126 Torino',
    district: 'Centro',
    coordinates: [45.0680, 7.6700],
    priceStandard: 42,
    open24h: false,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '7:00-22:00', weekend: '9:00-18:00' },
    rating: 4.4,
    pros: {
      it: ['Posizione centrale', 'Corsi inclusi'],
      en: ['Central location', 'Classes included']
    },
    cons: {
      it: ['Prezzo medio-alto', 'Senza piscina'],
      en: ['Medium-high price', 'No pool']
    },
    idealFor: {
      it: 'Chi cerca palestra in centro città',
      en: 'Those looking for a downtown gym'
    },
    tier: 2
  },

  // TIER 3: PREMIUM (40€+)
  {
    id: 'virgin-active-collection',
    name: 'Virgin Active Collection',
    chain: 'virgin',
    category: 'premium',
    address: "Via dell'Arsenale 23, 10121 Torino",
    district: 'Centro/Vanchiglia',
    coordinates: [45.0720, 7.6870],
    priceStandard: 159,
    open24h: false,
    hasPool: true,
    hasSauna: true,
    hasClasses: true,
    hours: { weekday: '6:30-22:30', weekend: '8:00-20:00' },
    rating: 4.7,
    website: 'https://virginactive.it',
    phone: '800914555',
    email: 'torinocollection@virginactive.it',
    pros: {
      it: ['Struttura luxury', 'Piscina di qualità', 'Spa esclusiva', 'Corsi premium'],
      en: ['Luxury facility', 'Quality pool', 'Exclusive spa', 'Premium classes']
    },
    cons: {
      it: ['Prezzo molto alto', 'Non accessibile a budget studenti'],
      en: ['Very high price', 'Not accessible for student budgets']
    },
    idealFor: {
      it: 'Chi cerca massimo lusso e benessere',
      en: 'Those seeking maximum luxury and wellness'
    },
    tier: 3
  },
  {
    id: 'anytime-fitness-bogino',
    name: 'Anytime Fitness Bogino',
    chain: 'anytime',
    category: 'premium',
    address: 'Via Giambattista Bogino 2, 10126 Torino',
    district: 'Centro/Vanchiglia',
    coordinates: [45.0680, 7.6920],
    priceStandard: 55,
    open24h: true,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '24h', weekend: '24h' },
    rating: 4.4,
    website: 'https://anytimefitness.com',
    nearestUniversity: ['UniTO Medicina'],
    distanceFromUni: '0.5 km',
    pros: {
      it: ['Apertura 24h garantita', 'Accesso via app', 'Network globale'],
      en: ['Guaranteed 24h access', 'App access', 'Global network']
    },
    cons: {
      it: ['Prezzo elevato', 'Senza piscina'],
      en: ['High price', 'No pool']
    },
    idealFor: {
      it: 'Chi ha esigenze di accesso 24h premium',
      en: 'Those needing premium 24h access'
    },
    tier: 3
  },
  {
    id: 'anytime-fitness-grosseto',
    name: 'Anytime Fitness Grosseto',
    chain: 'anytime',
    category: 'premium',
    address: 'Corso Grosseto 178, 10126 Torino',
    district: 'Rossini',
    coordinates: [45.0950, 7.6550],
    priceStandard: 55,
    priceStudent: 32.99,
    studentDiscount: 'Via Wellhub',
    discountRequirements: 'App Wellhub',
    open24h: false,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '10:00-21:00', weekend: '10:00-18:00' },
    rating: 4.8,
    website: 'https://anytimefitness.com',
    pros: {
      it: ['Sconto Wellhub disponibile', 'Ottimo rating', 'Network Anytime'],
      en: ['Wellhub discount available', 'Great rating', 'Anytime network']
    },
    cons: {
      it: ['Orari più limitati', 'Senza piscina'],
      en: ['More limited hours', 'No pool']
    },
    idealFor: {
      it: 'Chi ha abbonamento Wellhub',
      en: 'Those with Wellhub subscription'
    },
    tier: 3
  },
  {
    id: 'anytime-fitness-lancia',
    name: 'Anytime Fitness Lancia',
    chain: 'anytime',
    category: 'premium',
    address: 'Via Caraglio 84, 10126 Torino',
    district: 'Borgo San Paolo',
    coordinates: [45.0620, 7.6450],
    priceStandard: 55,
    priceStudent: 32.99,
    studentDiscount: 'Via Wellhub',
    discountRequirements: 'App Wellhub',
    open24h: true,
    hasPool: false,
    hasSauna: false,
    hasClasses: true,
    hours: { weekday: '24h', weekend: '24h' },
    rating: 5.0,
    website: 'https://anytimefitness.com',
    pros: {
      it: ['Rating perfetto', 'Apertura 24h', 'Sconto Wellhub'],
      en: ['Perfect rating', '24h opening', 'Wellhub discount']
    },
    cons: {
      it: ['Prezzo base elevato', 'Senza piscina'],
      en: ['High base price', 'No pool']
    },
    idealFor: {
      it: 'Chi cerca eccellenza e flessibilità orari',
      en: 'Those seeking excellence and schedule flexibility'
    },
    tier: 3
  }
];

// Helper functions
export const getGymsByTier = (tier: GymTier): Gym[] => 
  gymsData.filter(g => g.tier === tier);

export const getGymsByChain = (chain: GymChain): Gym[] => 
  gymsData.filter(g => g.chain === chain);

export const getGymsByCategory = (category: GymCategory): Gym[] => 
  gymsData.filter(g => g.category === category);

export const getGymsWithPool = (): Gym[] => 
  gymsData.filter(g => g.hasPool);

export const getGymsWithStudentDiscount = (): Gym[] => 
  gymsData.filter(g => g.priceStudent !== undefined);

export const getGyms24h = (): Gym[] => 
  gymsData.filter(g => g.open24h);

export const getFeaturedGyms = (): Gym[] => 
  gymsData.filter(g => g.featured);

export const getGymById = (id: string): Gym | undefined => 
  gymsData.find(g => g.id === id);

export const chainLabels: Record<GymChain, { it: string; en: string }> = {
  fitactive: { it: 'FitActive', en: 'FitActive' },
  mcfit: { it: 'McFIT', en: 'McFIT' },
  orange: { it: 'Orange Palestre', en: 'Orange Gyms' },
  anytime: { it: 'Anytime Fitness', en: 'Anytime Fitness' },
  virgin: { it: 'Virgin Active', en: 'Virgin Active' },
  gofit: { it: 'GO Fit', en: 'GO Fit' },
  masterclub: { it: 'Master Club', en: 'Master Club' },
  independent: { it: 'Indipendente', en: 'Independent' }
};

export const categoryLabels: Record<GymCategory, { it: string; en: string }> = {
  'low-cost': { it: 'Low-Cost', en: 'Low-Cost' },
  'mid-range': { it: 'Fascia Media', en: 'Mid-Range' },
  'premium': { it: 'Premium', en: 'Premium' },
  'pool': { it: 'Con Piscina', en: 'With Pool' },
  'university': { it: 'Universitaria', en: 'University' }
};

export const tierLabels: Record<GymTier, { it: string; en: string; color: string }> = {
  1: { it: 'Best Value', en: 'Best Value', color: 'bg-green-500' },
  2: { it: 'Qualità/Prezzo', en: 'Quality/Price', color: 'bg-yellow-500' },
  3: { it: 'Premium', en: 'Premium', color: 'bg-purple-500' }
};
