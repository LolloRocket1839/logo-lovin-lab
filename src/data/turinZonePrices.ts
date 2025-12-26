// Turin Zone Prices - OMI/Immobiliare.it/FIAIP Data November 2025
// Sources: Agenzia Entrate OMI, FIAIP Torino, Immobiliare.it, Idealista.it, Tecnocasa

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
  { id: 'centro_storico', name: 'Centro Storico', minPrice: 3500, avgPrice: 4065, maxPrice: 4600, variation2024: 1.5, category: 'central', note: 'Area più cara della città' },
  { id: 'piazza_san_carlo', name: 'Piazza San Carlo', minPrice: 4200, avgPrice: 4560, maxPrice: 4900, variation2024: 2.0, category: 'central', note: 'Prezzo più alto' },
  { id: 'piazza_vittorio', name: 'Piazza Vittorio', minPrice: 3300, avgPrice: 3620, maxPrice: 3900, variation2024: 1.2, category: 'central' },
  { id: 'piazza_statuto', name: 'Piazza Statuto', minPrice: 2700, avgPrice: 3000, maxPrice: 3300, variation2024: 1.5, category: 'central', note: 'Vicino Porta Susa' },
  { id: 'crocetta', name: 'Crocetta', minPrice: 2700, avgPrice: 2995, maxPrice: 3300, variation2024: 3.5, category: 'central' },
  { id: 'san_secondo', name: 'San Secondo', minPrice: 2700, avgPrice: 2995, maxPrice: 3300, variation2024: 3.5, category: 'central' },
  { id: 'san_salvario', name: 'San Salvario', minPrice: 2400, avgPrice: 2731, maxPrice: 3100, variation2024: 8.46, category: 'central', note: 'Forte crescita +8,46% (Immobiliare.it nov 2025)' },
  { id: 'vanchiglia', name: 'Vanchiglia', minPrice: 2400, avgPrice: 2680, maxPrice: 2950, variation2024: 3.0, category: 'central', note: 'Palazzi storici' },
  { id: 'vanchiglietta', name: 'Vanchiglietta', minPrice: 2000, avgPrice: 2250, maxPrice: 2500, variation2024: 2.3, category: 'central' },
  
  // Zone Semicentrali
  { id: 'cit_turin', name: 'Cit Turin', minPrice: 2200, avgPrice: 2501, maxPrice: 2800, variation2024: 4.3, category: 'semicentral', note: 'Dati Immobiliare.it nov 2025' },
  { id: 'san_donato', name: 'San Donato', minPrice: 2200, avgPrice: 2501, maxPrice: 2800, variation2024: 4.3, category: 'semicentral', note: 'Dati Immobiliare.it nov 2025' },
  { id: 'campidoglio', name: 'Campidoglio', minPrice: 2200, avgPrice: 2501, maxPrice: 2800, variation2024: 4.0, category: 'semicentral', note: 'Dati Immobiliare.it nov 2025' },
  { id: 'cenisia', name: 'Cenisia', minPrice: 1700, avgPrice: 1950, maxPrice: 2200, variation2024: 3.5, category: 'semicentral' },
  { id: 'san_paolo', name: 'San Paolo', minPrice: 1700, avgPrice: 1950, maxPrice: 2200, variation2024: 3.0, category: 'semicentral' },
  { id: 'pozzo_strada', name: 'Pozzo Strada', minPrice: 1650, avgPrice: 1900, maxPrice: 2150, variation2024: 5.0, category: 'semicentral' },
  { id: 'parella', name: 'Parella', minPrice: 1600, avgPrice: 1825, maxPrice: 2050, variation2024: 5.5, category: 'semicentral', note: 'Metro disponibile' },
  { id: 'aeronautica', name: 'Aeronautica', minPrice: 1600, avgPrice: 1825, maxPrice: 2050, variation2024: 5.5, category: 'semicentral' },
  { id: 'santa_rita', name: 'Santa Rita', minPrice: 1500, avgPrice: 1700, maxPrice: 1900, variation2024: 7.8, category: 'semicentral', note: 'Forte crescita' },
  { id: 'mirafiori_nord', name: 'Mirafiori Nord', minPrice: 1500, avgPrice: 1700, maxPrice: 1900, variation2024: 7.8, category: 'semicentral' },
  { id: 'lingotto', name: 'Lingotto', minPrice: 1450, avgPrice: 1650, maxPrice: 1850, variation2024: 7.8, category: 'semicentral', note: 'Metro M4, forte crescita' },
  { id: 'nizza_millefonti', name: 'Nizza Millefonti', minPrice: 1450, avgPrice: 1650, maxPrice: 1850, variation2024: 7.8, category: 'semicentral' },
  
  // Zone Periferiche Nord
  { id: 'aurora', name: 'Aurora', minPrice: 1300, avgPrice: 1520, maxPrice: 1750, variation2024: 7.0, category: 'peripheral_north', note: 'Riqualificazione Porta Palazzo' },
  { id: 'borgo_valdocco', name: 'Borgo Valdocco', minPrice: 1300, avgPrice: 1520, maxPrice: 1750, variation2024: 7.0, category: 'peripheral_north' },
  { id: 'madonna_campagna', name: 'Madonna di Campagna', minPrice: 1200, avgPrice: 1350, maxPrice: 1500, variation2024: 3.0, category: 'peripheral_north' },
  { id: 'borgo_vittoria', name: 'Borgo Vittoria', minPrice: 1150, avgPrice: 1300, maxPrice: 1450, variation2024: 4.0, category: 'peripheral_north' },
  { id: 'lucento', name: 'Lucento', minPrice: 1150, avgPrice: 1300, maxPrice: 1450, variation2024: 4.0, category: 'peripheral_north' },
  { id: 'rebaudengo', name: 'Rebaudengo', minPrice: 1100, avgPrice: 1250, maxPrice: 1400, variation2024: 2.0, category: 'peripheral_north' },
  { id: 'falchera', name: 'Falchera', minPrice: 1000, avgPrice: 1150, maxPrice: 1300, variation2024: 3.5, category: 'peripheral_north' },
  { id: 'villaretto', name: 'Villaretto', minPrice: 1000, avgPrice: 1150, maxPrice: 1300, variation2024: 3.5, category: 'peripheral_north' },
  { id: 'barriera_milano', name: 'Barriera di Milano', minPrice: 900, avgPrice: 1080, maxPrice: 1250, variation2024: 5.4, category: 'peripheral_north' },
  
  // Zone Periferiche Sud
  { id: 'mirafiori_sud', name: 'Mirafiori Sud', minPrice: 1200, avgPrice: 1350, maxPrice: 1500, variation2024: 3.5, category: 'peripheral_south' },
  { id: 'barca', name: 'Barca', minPrice: 1100, avgPrice: 1232, maxPrice: 1350, variation2024: 2.0, category: 'peripheral_south' },
  { id: 'bertolla', name: 'Bertolla', minPrice: 1100, avgPrice: 1232, maxPrice: 1350, variation2024: 2.0, category: 'peripheral_south' },
  { id: 'vallette', name: 'Vallette', minPrice: 1050, avgPrice: 1200, maxPrice: 1350, variation2024: 3.5, category: 'peripheral_south' },
  
  // Zone Collinari
  { id: 'crimea', name: 'Crimea', minPrice: 2650, avgPrice: 2950, maxPrice: 3300, variation2024: 2.4, category: 'hill', note: 'Area esclusiva' },
  { id: 'gran_madre', name: 'Gran Madre', minPrice: 2650, avgPrice: 2950, maxPrice: 3300, variation2024: 2.4, category: 'hill' },
  { id: 'borgo_po', name: 'Borgo Po', minPrice: 2650, avgPrice: 2950, maxPrice: 3300, variation2024: 2.4, category: 'hill' },
  { id: 'cavoretto', name: 'Cavoretto', minPrice: 2100, avgPrice: 2310, maxPrice: 2500, variation2024: 2.7, category: 'hill', note: 'Collina prestigiosa' },
];

// Quick select zones for UI (most popular for students/investors)
export const quickSelectZones = [
  'san_salvario',
  'vanchiglia',
  'lingotto',
  'aurora',
  'crocetta',
  'cenisia',
  'cit_turin',
  'santa_rita',
  'san_donato',
  'campidoglio',
  'parella'
];

// Category labels for UI
export const categoryLabels: Record<ZonePrice['category'], { it: string; en: string }> = {
  central: { it: 'Zone Centrali', en: 'Central Areas' },
  semicentral: { it: 'Zone Semicentrali', en: 'Semi-central Areas' },
  peripheral_north: { it: 'Periferie Nord', en: 'North Periphery' },
  peripheral_south: { it: 'Periferie Sud', en: 'South Periphery' },
  hill: { it: 'Zone Collinari', en: 'Hill Areas' }
};

export const getZoneById = (id: string): ZonePrice | undefined => {
  return turinZonePrices.find(z => z.id === id);
};

export const getZonesByCategory = (category: ZonePrice['category']): ZonePrice[] => {
  return turinZonePrices.filter(z => z.category === category);
};

// Find zone by name (fuzzy match for user input)
export const findZoneByName = (name: string): ZonePrice | undefined => {
  const normalizedName = name.toLowerCase().trim();
  return turinZonePrices.find(z => 
    z.name.toLowerCase().includes(normalizedName) || 
    normalizedName.includes(z.name.toLowerCase()) ||
    z.id.replace(/_/g, ' ').includes(normalizedName)
  );
};

// Get all zones grouped by category
export const getZonesGroupedByCategory = (): Record<ZonePrice['category'], ZonePrice[]> => {
  return {
    central: getZonesByCategory('central'),
    semicentral: getZonesByCategory('semicentral'),
    peripheral_north: getZonesByCategory('peripheral_north'),
    peripheral_south: getZonesByCategory('peripheral_south'),
    hill: getZonesByCategory('hill')
  };
};

// Data source info
export const dataSourceInfo = {
  lastUpdate: 'Novembre 2025',
  sources: ['OMI Agenzia Entrate', 'Immobiliare.it', 'Idealista.it', 'Tecnocasa', 'FIAIP Torino'],
  disclaimer: 'I prezzi sono indicativi e possono variare in base alle caratteristiche specifiche dell\'immobile. Margine di errore: ±5-12%.'
};
