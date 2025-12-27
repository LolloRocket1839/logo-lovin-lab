// Detailed Study Spaces Directory for Turin
// Contains 20 spaces with complete contact info, daily hours, and features

export type DetailedStudySpaceCategory = 
  | 'edisu'
  | 'biblioteca'
  | 'spazi_polivalenti'
  | 'caffetteria'
  | 'coworking'
  | 'spazi_alternativi';

export type SilenceLevel = 'assoluto' | 'moderato' | 'informale';
export type WifiQuality = 'ultra-veloce' | 'si' | 'lento' | 'no';
export type PowerOutlets = 'numerose' | 'alcune' | 'poche' | 'no';
export type ParkingType = 'si' | 'parziale' | 'vicino' | 'no';
export type DisabledAccess = 'totale' | 'parziale' | 'no';

export interface DailyHours {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

export interface SpaceFeatures {
  silence: SilenceLevel;
  wifi: WifiQuality;
  powerOutlets: PowerOutlets;
  tables: string;
  hasBar: boolean;
  barDescription?: string;
  hasBathrooms: boolean;
  parking: ParkingType;
  disabledAccess: DisabledAccess;
  access24h: boolean;
}

export interface DetailedStudySpace {
  id: number;
  category: DetailedStudySpaceCategory;
  name: string;
  address: string;
  district: string;
  phone?: string;
  email?: string;
  whatsapp?: string;
  website?: string;
  hours: DailyHours;
  features: SpaceFeatures;
}

export const detailedStudySpaces: DetailedStudySpace[] = [
  // Sale Studio EDISU
  {
    id: 1,
    category: 'edisu',
    name: 'Sala Studio Michelangelo Buonarroti',
    address: 'Via Michelangelo Buonarroti, 17 bis, 10126 Torino',
    district: 'Centro',
    phone: '+39 011 6531054',
    email: 'edisu@piemonte.it',
    website: 'https://www.edisu.piemonte.it/',
    hours: {
      monday: '8:30 - 24:00',
      tuesday: '8:30 - 24:00',
      wednesday: '8:30 - 24:00',
      thursday: '8:30 - 24:00',
      friday: '8:30 - 24:00',
      saturday: '8:30 - 24:00',
      sunday: '8:30 - 24:00'
    },
    features: {
      silence: 'assoluto',
      wifi: 'si',
      powerOutlets: 'numerose',
      tables: 'Numerosi',
      hasBar: true,
      barDescription: 'Interno',
      hasBathrooms: true,
      parking: 'si',
      disabledAccess: 'totale',
      access24h: true
    }
  },
  {
    id: 2,
    category: 'edisu',
    name: 'Sala Studio Verdi',
    address: 'Via Verdi, 26, 10124 Torino',
    district: 'Centro',
    phone: '+39 011 6531290',
    email: 'edisu@piemonte.it',
    website: 'https://www.edisu.piemonte.it/',
    hours: {
      monday: '8:30 - 24:00',
      tuesday: '8:30 - 24:00',
      wednesday: '8:30 - 24:00',
      thursday: '8:30 - 24:00',
      friday: '8:30 - 24:00',
      saturday: '8:30 - 24:00',
      sunday: '8:30 - 24:00'
    },
    features: {
      silence: 'assoluto',
      wifi: 'si',
      powerOutlets: 'numerose',
      tables: 'Numerosi',
      hasBar: true,
      barDescription: 'Interno',
      hasBathrooms: true,
      parking: 'parziale',
      disabledAccess: 'totale',
      access24h: true
    }
  },
  {
    id: 3,
    category: 'edisu',
    name: 'Sala Studio Pietro Giuria',
    address: 'Via Pietro Giuria, 10126 Torino',
    district: 'Centro',
    phone: '011.6531250',
    email: 'edisu@piemonte.it',
    website: 'https://www.edisu.piemonte.it/',
    hours: {
      monday: '8:30 - 21:00',
      tuesday: '8:30 - 21:00',
      wednesday: '8:30 - 21:00',
      thursday: '8:30 - 21:00',
      friday: '8:30 - 21:00',
      saturday: '8:30 - 21:00',
      sunday: '8:30 - 21:00'
    },
    features: {
      silence: 'assoluto',
      wifi: 'si',
      powerOutlets: 'alcune',
      tables: 'Numerosi',
      hasBar: false,
      hasBathrooms: true,
      parking: 'parziale',
      disabledAccess: 'parziale',
      access24h: false
    }
  },
  {
    id: 4,
    category: 'edisu',
    name: 'Sala Studio Principe Amedeo',
    address: 'Via Principe Amedeo, 10126 Torino',
    district: 'Centro',
    phone: '011.6531260',
    email: 'edisu@piemonte.it',
    website: 'https://www.edisu.piemonte.it/',
    hours: {
      monday: '8:30 - 21:00',
      tuesday: '8:30 - 21:00',
      wednesday: '8:30 - 21:00',
      thursday: '8:30 - 21:00',
      friday: '8:30 - 21:00',
      saturday: '8:30 - 20:00',
      sunday: 'Chiuso'
    },
    features: {
      silence: 'assoluto',
      wifi: 'si',
      powerOutlets: 'alcune',
      tables: 'Numerosi',
      hasBar: false,
      hasBathrooms: true,
      parking: 'parziale',
      disabledAccess: 'parziale',
      access24h: false
    }
  },
  // Spazi Polivalenti
  {
    id: 5,
    category: 'spazi_polivalenti',
    name: 'Sala Studio Murazzi Student Zone',
    address: 'Murazzi del Po, 22 (lato sinistro), 10124 Torino',
    district: 'Centro',
    phone: '011.6531270',
    email: 'edisu@piemonte.it',
    website: 'https://www.edisu.piemonte.it/',
    hours: {
      monday: '9:00 - 20:00',
      tuesday: '9:00 - 20:00',
      wednesday: '9:00 - 20:00',
      thursday: '9:00 - 20:00',
      friday: '9:00 - 20:00',
      saturday: 'Chiuso',
      sunday: '9:00 - 20:00'
    },
    features: {
      silence: 'moderato',
      wifi: 'si',
      powerOutlets: 'numerose',
      tables: '81 posti',
      hasBar: true,
      barDescription: 'Interno',
      hasBathrooms: true,
      parking: 'no',
      disabledAccess: 'totale',
      access24h: false
    }
  },
  // Biblioteche
  {
    id: 6,
    category: 'biblioteca',
    name: 'Biblioteca Nazionale Universitaria di Torino (BNUTO)',
    address: 'Piazza Carlo Alberto, 3, 10123 Torino',
    district: 'Centro',
    phone: '+39 011 8101137',
    email: 'bu-to@cultura.gov.it',
    website: 'https://bnto.comperio.it',
    hours: {
      monday: '8:15 - 19:55',
      tuesday: '8:15 - 19:55',
      wednesday: '8:15 - 19:55',
      thursday: '8:15 - 19:55',
      friday: '8:15 - 19:55',
      saturday: '10:30 - 18:00',
      sunday: 'Chiuso'
    },
    features: {
      silence: 'assoluto',
      wifi: 'lento',
      powerOutlets: 'poche',
      tables: 'Numerosi',
      hasBar: false,
      hasBathrooms: true,
      parking: 'no',
      disabledAccess: 'totale',
      access24h: false
    }
  },
  {
    id: 7,
    category: 'biblioteca',
    name: 'Biblioteca Civica Centrale',
    address: 'Via della Cittadella, 5, 10123 Torino',
    district: 'Centro',
    phone: '+39 011 01129836',
    email: 'biblioteca.centrale@comune.torino.it',
    website: 'https://bct.comune.torino.it/',
    hours: {
      monday: '14:00 - 19:00',
      tuesday: '9:00 - 19:00',
      wednesday: '9:00 - 19:00',
      thursday: '9:00 - 19:00',
      friday: '9:00 - 19:00',
      saturday: '9:00 - 15:00',
      sunday: 'Chiuso'
    },
    features: {
      silence: 'assoluto',
      wifi: 'si',
      powerOutlets: 'alcune',
      tables: 'Numerosi',
      hasBar: false,
      hasBathrooms: true,
      parking: 'vicino',
      disabledAccess: 'totale',
      access24h: false
    }
  },
  {
    id: 8,
    category: 'biblioteca',
    name: 'Biblioteca Civica Natalia Ginzburg',
    address: 'Via Cesare Lombroso, 16, 10123 Torino',
    district: 'San Salvario',
    phone: '+39 011 01129836',
    email: 'biblioteca.centrale@comune.torino.it',
    website: 'https://bct.comune.torino.it/',
    hours: {
      monday: 'Chiuso',
      tuesday: '9:00 - 15:00',
      wednesday: '13:00 - 19:00',
      thursday: '13:00 - 19:00',
      friday: '9:00 - 15:00',
      saturday: 'Chiuso',
      sunday: 'Chiuso'
    },
    features: {
      silence: 'assoluto',
      wifi: 'si',
      powerOutlets: 'alcune',
      tables: 'Numerosi',
      hasBar: false,
      hasBathrooms: true,
      parking: 'si',
      disabledAccess: 'totale',
      access24h: false
    }
  },
  // Caffetterie Study-Friendly
  {
    id: 9,
    category: 'caffetteria',
    name: 'Circolo dei Lettori',
    address: 'Via Bogino, 9, 10123 Torino',
    district: 'Centro',
    phone: '+39 011 8904401',
    email: 'info@circololettori.it',
    website: 'https://torino.circololettori.it/',
    hours: {
      monday: '9:30 - 21:00',
      tuesday: '9:30 - 21:00',
      wednesday: '9:30 - 21:00',
      thursday: '9:30 - 21:00',
      friday: '9:30 - 21:00',
      saturday: '9:30 - 21:00',
      sunday: 'Occasionale'
    },
    features: {
      silence: 'moderato',
      wifi: 'si',
      powerOutlets: 'alcune',
      tables: 'Numerosi',
      hasBar: true,
      barDescription: "Barney's il Bar",
      hasBathrooms: true,
      parking: 'vicino',
      disabledAccess: 'totale',
      access24h: false
    }
  },
  {
    id: 10,
    category: 'caffetteria',
    name: 'Mara dei Boschi - Via Berthollet',
    address: 'Via Berthollet, 30, 10123 Torino',
    district: 'Centro',
    phone: '+39 011 0769557',
    email: 'info@maradeiboschi.it',
    whatsapp: '+39 388 4340432',
    website: 'https://www.maradeiboschi.it/',
    hours: {
      monday: '07:30 - 19:30',
      tuesday: '07:30 - 19:30',
      wednesday: '07:30 - 19:30',
      thursday: '07:30 - 19:30',
      friday: '07:30 - 19:30',
      saturday: '08:30 - 19:30',
      sunday: '09:30 - 19:30'
    },
    features: {
      silence: 'informale',
      wifi: 'si',
      powerOutlets: 'alcune',
      tables: 'Numerosi',
      hasBar: true,
      barDescription: 'Caffè di qualità',
      hasBathrooms: true,
      parking: 'no',
      disabledAccess: 'parziale',
      access24h: false
    }
  },
  {
    id: 11,
    category: 'caffetteria',
    name: 'Mara dei Boschi - Piazza Carlo Emanuele II',
    address: 'Piazza Carlo Emanuele II, 21, 10123 Torino',
    district: 'Centro',
    phone: '+39 011 0266159',
    email: 'info@maradeiboschi.it',
    whatsapp: '+39 320 6898503',
    website: 'https://www.maradeiboschi.it/',
    hours: {
      monday: '07:30 - 19:30',
      tuesday: '07:30 - 19:30',
      wednesday: '07:30 - 19:30',
      thursday: '07:30 - 19:30',
      friday: '07:30 - 19:30',
      saturday: '08:30 - 19:30',
      sunday: '09:30 - 19:30'
    },
    features: {
      silence: 'informale',
      wifi: 'si',
      powerOutlets: 'alcune',
      tables: 'Numerosi',
      hasBar: true,
      barDescription: 'Caffè di qualità',
      hasBathrooms: true,
      parking: 'vicino',
      disabledAccess: 'totale',
      access24h: false
    }
  },
  {
    id: 12,
    category: 'caffetteria',
    name: 'EXKi - Via Arcivescovado',
    address: 'Via Arcivescovado, 2E, 10123 Torino',
    district: 'Centro',
    website: 'https://www.exki.com/',
    hours: {
      monday: '7:30 - 19:30',
      tuesday: '7:30 - 19:30',
      wednesday: '7:30 - 19:30',
      thursday: '7:30 - 19:30',
      friday: '7:30 - 19:30',
      saturday: '8:30 - 19:30',
      sunday: '9:30 - 19:30'
    },
    features: {
      silence: 'informale',
      wifi: 'si',
      powerOutlets: 'alcune',
      tables: 'Numerosi',
      hasBar: true,
      barDescription: 'Biologico',
      hasBathrooms: true,
      parking: 'no',
      disabledAccess: 'parziale',
      access24h: false
    }
  },
  {
    id: 13,
    category: 'caffetteria',
    name: 'Convitto Cafè',
    address: 'Via San Francesco da Paola, 8, 10123 Torino',
    district: 'Centro',
    phone: '+39 011 815 4070',
    email: 'ciaoconvitto@gmail.com',
    website: 'https://www.convittocafe.it/',
    hours: {
      monday: '8:30 - 19:30',
      tuesday: '8:30 - 19:30',
      wednesday: '8:30 - 19:30',
      thursday: '8:30 - 19:30',
      friday: '8:30 - 19:30',
      saturday: '9:30 - 19:30',
      sunday: '14:00 - 19:30'
    },
    features: {
      silence: 'moderato',
      wifi: 'si',
      powerOutlets: 'alcune',
      tables: 'Numerosi',
      hasBar: true,
      barDescription: 'Torte artigianali',
      hasBathrooms: true,
      parking: 'no',
      disabledAccess: 'parziale',
      access24h: false
    }
  },
  // Coworking
  {
    id: 14,
    category: 'coworking',
    name: 'Talent Garden Fondazione Agnelli',
    address: 'Via Giuseppe Giacosa, 38, 10125 Torino',
    district: 'Moncalieri',
    phone: '+39 011 753 7985',
    website: 'https://talentgarden.org/',
    hours: {
      monday: '09:00 - 18:00',
      tuesday: '09:00 - 18:00',
      wednesday: '09:00 - 18:00',
      thursday: '09:00 - 18:00',
      friday: '09:00 - 18:00',
      saturday: 'Chiuso',
      sunday: 'Chiuso'
    },
    features: {
      silence: 'assoluto',
      wifi: 'ultra-veloce',
      powerOutlets: 'numerose',
      tables: 'Numerosi',
      hasBar: false,
      hasBathrooms: true,
      parking: 'si',
      disabledAccess: 'totale',
      access24h: false
    }
  },
  {
    id: 15,
    category: 'coworking',
    name: 'Copernico Garibaldi',
    address: 'Corso Valdocco, 2, 10123 Torino',
    district: 'Centro',
    website: 'https://www.coperni.co/it/torino/',
    hours: {
      monday: '24/7 per membri',
      tuesday: '24/7 per membri',
      wednesday: '24/7 per membri',
      thursday: '24/7 per membri',
      friday: '24/7 per membri',
      saturday: '24/7 per membri',
      sunday: '24/7 per membri'
    },
    features: {
      silence: 'assoluto',
      wifi: 'ultra-veloce',
      powerOutlets: 'numerose',
      tables: 'Numerosi',
      hasBar: true,
      barDescription: 'Lounge',
      hasBathrooms: true,
      parking: 'si',
      disabledAccess: 'totale',
      access24h: true
    }
  },
  {
    id: 16,
    category: 'coworking',
    name: 'Bliss Coworking',
    address: 'Via Valentino Carrera, 111B, 10156 Torino',
    district: 'Massaua',
    website: 'https://www.blisscoworking.it/',
    hours: {
      monday: '24/7 per membri',
      tuesday: '24/7 per membri',
      wednesday: '24/7 per membri',
      thursday: '24/7 per membri',
      friday: '24/7 per membri',
      saturday: '24/7 per membri',
      sunday: '24/7 per membri'
    },
    features: {
      silence: 'assoluto',
      wifi: 'ultra-veloce',
      powerOutlets: 'numerose',
      tables: 'Numerosi',
      hasBar: false,
      hasBathrooms: true,
      parking: 'si',
      disabledAccess: 'parziale',
      access24h: true
    }
  },
  {
    id: 17,
    category: 'coworking',
    name: 'SmarTOwork',
    address: 'Via Varallo, 22, 10153 Torino',
    district: 'Lungo Po',
    phone: '+39 011 0467670',
    email: 'info@smartowork.it',
    website: 'https://www.smartowork.it/',
    hours: {
      monday: '09:00 - 18:00',
      tuesday: '09:00 - 18:00',
      wednesday: '09:00 - 18:00',
      thursday: '09:00 - 18:00',
      friday: '09:00 - 18:00',
      saturday: 'Chiuso',
      sunday: 'Chiuso'
    },
    features: {
      silence: 'assoluto',
      wifi: 'ultra-veloce',
      powerOutlets: 'numerose',
      tables: 'Numerosi',
      hasBar: false,
      hasBathrooms: true,
      parking: 'si',
      disabledAccess: 'totale',
      access24h: false
    }
  },
  // Spazi Alternativi
  {
    id: 18,
    category: 'spazi_alternativi',
    name: 'Parco del Valentino',
    address: 'Lungo Po, San Salvario, 10123 Torino',
    district: 'San Salvario',
    website: 'https://www.comune.torino.it/',
    hours: {
      monday: '24/7',
      tuesday: '24/7',
      wednesday: '24/7',
      thursday: '24/7',
      friday: '24/7',
      saturday: '24/7',
      sunday: '24/7'
    },
    features: {
      silence: 'informale',
      wifi: 'no',
      powerOutlets: 'no',
      tables: 'Panchine',
      hasBar: true,
      barDescription: 'Imbarchino',
      hasBathrooms: true,
      parking: 'si',
      disabledAccess: 'parziale',
      access24h: true
    }
  },
  {
    id: 19,
    category: 'spazi_polivalenti',
    name: 'Imbarchino nel Parco Valentino',
    address: 'Viale Umberto Cagni 37, Parco del Valentino, 10123 Torino',
    district: 'San Salvario',
    phone: '+39 011 046 1895',
    website: 'https://www.imbarchino.space',
    hours: {
      monday: '10:00 - 24:00',
      tuesday: '10:00 - 24:00',
      wednesday: '10:00 - 24:00',
      thursday: '10:00 - 24:00',
      friday: '10:00 - 24:00',
      saturday: '10:00 - 02:00',
      sunday: '10:00 - 24:00'
    },
    features: {
      silence: 'informale',
      wifi: 'si',
      powerOutlets: 'poche',
      tables: 'Numerosi (interni/esterni)',
      hasBar: true,
      barDescription: 'Birre e aperitivi',
      hasBathrooms: true,
      parking: 'vicino',
      disabledAccess: 'parziale',
      access24h: false
    }
  },
  {
    id: 20,
    category: 'spazi_polivalenti',
    name: 'Comala',
    address: 'Corso Ferrucci, 65/a, 10152 Torino',
    district: 'Cenisia',
    website: 'https://www.comuneditorio.it/',
    hours: {
      monday: '08:00 - 24:00',
      tuesday: '08:00 - 24:00',
      wednesday: '08:00 - 24:00',
      thursday: '08:00 - 24:00',
      friday: '08:00 - 24:00',
      saturday: '10:00 - 24:00',
      sunday: '10:00 - 24:00'
    },
    features: {
      silence: 'moderato',
      wifi: 'si',
      powerOutlets: 'numerose',
      tables: 'Numerosi',
      hasBar: true,
      barDescription: 'Interno',
      hasBathrooms: true,
      parking: 'parziale',
      disabledAccess: 'totale',
      access24h: false
    }
  }
];

// Utility functions
export const getCategoryLabel = (category: DetailedStudySpaceCategory, lang: 'it' | 'en' = 'it'): string => {
  const labels: Record<DetailedStudySpaceCategory, { it: string; en: string }> = {
    edisu: { it: 'Sale Studio EDISU', en: 'EDISU Study Rooms' },
    biblioteca: { it: 'Biblioteche', en: 'Libraries' },
    spazi_polivalenti: { it: 'Spazi Polivalenti', en: 'Multipurpose Spaces' },
    caffetteria: { it: 'Caffetterie Study-Friendly', en: 'Study-Friendly Cafes' },
    coworking: { it: 'Coworking', en: 'Coworking Spaces' },
    spazi_alternativi: { it: 'Spazi Alternativi', en: 'Alternative Spaces' }
  };
  return labels[category][lang];
};

export const getSilenceLabel = (level: SilenceLevel, lang: 'it' | 'en' = 'it'): string => {
  const labels: Record<SilenceLevel, { it: string; en: string }> = {
    assoluto: { it: 'Silenzio assoluto', en: 'Complete silence' },
    moderato: { it: 'Silenzio moderato', en: 'Moderate silence' },
    informale: { it: 'Ambiente informale', en: 'Informal atmosphere' }
  };
  return labels[level][lang];
};

export const getWifiLabel = (quality: WifiQuality, lang: 'it' | 'en' = 'it'): string => {
  const labels: Record<WifiQuality, { it: string; en: string }> = {
    'ultra-veloce': { it: 'WiFi ultra veloce', en: 'Ultra-fast WiFi' },
    si: { it: 'WiFi disponibile', en: 'WiFi available' },
    lento: { it: 'WiFi lento', en: 'Slow WiFi' },
    no: { it: 'Nessun WiFi', en: 'No WiFi' }
  };
  return labels[quality][lang];
};

export const getAllDistricts = (): string[] => {
  const districts = new Set(detailedStudySpaces.map(s => s.district));
  return Array.from(districts).sort();
};

export const getAllCategories = (): DetailedStudySpaceCategory[] => {
  return ['edisu', 'biblioteca', 'spazi_polivalenti', 'caffetteria', 'coworking', 'spazi_alternativi'];
};

export const getTodayHours = (hours: DailyHours): string => {
  const days: (keyof DailyHours)[] = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const today = days[new Date().getDay()];
  return hours[today];
};
