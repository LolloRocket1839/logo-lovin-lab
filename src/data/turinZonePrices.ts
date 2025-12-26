// Turin Zone Prices - OMI/FIAIP Data November 2025
// Source: Agenzia Entrate OMI, FIAIP Torino, Borsino Immobiliare

export interface ZonePrice {
  id: string;
  name: string;
  minPrice: number;
  avgPrice: number;
  maxPrice: number;
  variation2024: number;
  category: 'central' | 'semicentral' | 'peripheral_north' | 'peripheral_south' | 'hill';
  note?: string;
}

export const turinZonePrices: ZonePrice[] = [
  // Zone Centrali
  { id: 'centro_storico', name: 'Centro Storico', minPrice: 3143, avgPrice: 4065, maxPrice: 5026, variation2024: 1.5, category: 'central', note: 'Area più cara della città' },
  { id: 'piazza_san_carlo', name: 'Piazza San Carlo', minPrice: 4200, avgPrice: 4560, maxPrice: 4900, variation2024: 2.0, category: 'central', note: 'Prezzo più alto' },
  { id: 'piazza_vittorio', name: 'Piazza Vittorio', minPrice: 3400, avgPrice: 3620, maxPrice: 3800, variation2024: 1.2, category: 'central', note: 'Vicino Porta Susa' },
  { id: 'piazza_statuto', name: 'Piazza Statuto', minPrice: 2850, avgPrice: 3000, maxPrice: 3200, variation2024: 1.5, category: 'central', note: 'Vicino metropolitana' },
  { id: 'crocetta', name: 'Crocetta / San Secondo', minPrice: 2700, avgPrice: 2995, maxPrice: 3300, variation2024: 3.5, category: 'central' },
  { id: 'san_salvario', name: 'San Salvario', minPrice: 2300, avgPrice: 2650, maxPrice: 2950, variation2024: 3.5, category: 'central', note: 'Giovani professionisti' },
  { id: 'vanchiglia', name: 'Vanchiglia', minPrice: 2400, avgPrice: 2680, maxPrice: 2950, variation2024: 3.0, category: 'central', note: 'Palazzi storici' },
  { id: 'vanchiglietta', name: 'Vanchiglietta', minPrice: 2000, avgPrice: 2250, maxPrice: 2500, variation2024: 2.3, category: 'central' },
  
  // Zone Semicentrali
  { id: 'cit_turin', name: 'Cit Turin / San Donato', minPrice: 1550, avgPrice: 1750, maxPrice: 1950, variation2024: 4.3, category: 'semicentral' },
  { id: 'lingotto', name: 'Lingotto / Nizza Millefonti', minPrice: 1450, avgPrice: 1650, maxPrice: 1850, variation2024: 7.8, category: 'semicentral', note: 'Metro M4, forte crescita' },
  { id: 'pozzo_strada', name: 'Pozzo Strada', minPrice: 1700, avgPrice: 1900, maxPrice: 2100, variation2024: 5.0, category: 'semicentral' },
  { id: 'parella', name: 'Parella / Aeronautica', minPrice: 1600, avgPrice: 1825, maxPrice: 2050, variation2024: 5.5, category: 'semicentral', note: 'Metro disponibile' },
  { id: 'santa_rita', name: 'Santa Rita / Mirafiori Nord', minPrice: 1550, avgPrice: 1700, maxPrice: 1850, variation2024: 7.8, category: 'semicentral', note: 'Forte crescita' },
  { id: 'san_paolo', name: 'San Paolo / Spina Marmolada', minPrice: 1750, avgPrice: 1950, maxPrice: 2150, variation2024: 3.0, category: 'semicentral' },
  { id: 'cenisia', name: 'Cenisia', minPrice: 1800, avgPrice: 2000, maxPrice: 2200, variation2024: 3.5, category: 'semicentral' },
  { id: 'campidoglio', name: 'Campidoglio', minPrice: 1850, avgPrice: 2050, maxPrice: 2250, variation2024: 4.0, category: 'semicentral' },
  
  // Zone Periferiche Nord
  { id: 'aurora', name: 'Aurora / Borgo', minPrice: 1350, avgPrice: 1520, maxPrice: 1700, variation2024: 7.0, category: 'peripheral_north', note: 'Riqualificazione Porta Palazzo' },
  { id: 'barriera_milano', name: 'Barriera di Milano', minPrice: 900, avgPrice: 1080, maxPrice: 1200, variation2024: 5.4, category: 'peripheral_north' },
  { id: 'falchera', name: 'Falchera / Villaretto', minPrice: 1000, avgPrice: 1150, maxPrice: 1300, variation2024: 3.5, category: 'peripheral_north' },
  { id: 'madonna_campagna', name: 'Madonna di Campagna', minPrice: 1200, avgPrice: 1350, maxPrice: 1500, variation2024: 3.0, category: 'peripheral_north' },
  { id: 'borgo_vittoria', name: 'Borgo Vittoria / Lucento', minPrice: 1150, avgPrice: 1300, maxPrice: 1450, variation2024: 4.0, category: 'peripheral_north' },
  { id: 'rebaudengo', name: 'Rebaudengo', minPrice: 1100, avgPrice: 1250, maxPrice: 1400, variation2024: 2.0, category: 'peripheral_north' },
  
  // Zone Periferiche Sud
  { id: 'mirafiori_sud', name: 'Mirafiori Sud', minPrice: 1200, avgPrice: 1350, maxPrice: 1500, variation2024: 3.5, category: 'peripheral_south' },
  { id: 'barca', name: 'Barca / Bertolla', minPrice: 1100, avgPrice: 1232, maxPrice: 1350, variation2024: 2.0, category: 'peripheral_south' },
  { id: 'vallette', name: 'Vallette', minPrice: 1050, avgPrice: 1200, maxPrice: 1350, variation2024: 3.5, category: 'peripheral_south' },
  
  // Zone Collinari
  { id: 'cavoretto', name: 'Cavoretto', minPrice: 2100, avgPrice: 2310, maxPrice: 2500, variation2024: 2.7, category: 'hill', note: 'Collina prestigiosa' },
  { id: 'crimea', name: 'Crimea / Gran Madre', minPrice: 2650, avgPrice: 2950, maxPrice: 3300, variation2024: 2.4, category: 'hill', note: 'Area esclusiva' },
  { id: 'borgo_po', name: 'Borgo Po', minPrice: 2650, avgPrice: 2950, maxPrice: 3300, variation2024: 2.4, category: 'hill' },
];

// Quick select zones for UI
export const quickSelectZones = [
  'san_salvario',
  'vanchiglia',
  'lingotto',
  'aurora',
  'crocetta',
  'cenisia',
  'cit_turin',
  'santa_rita'
];

export const getZoneById = (id: string): ZonePrice | undefined => {
  return turinZonePrices.find(z => z.id === id);
};

export const getZonesByCategory = (category: ZonePrice['category']): ZonePrice[] => {
  return turinZonePrices.filter(z => z.category === category);
};
