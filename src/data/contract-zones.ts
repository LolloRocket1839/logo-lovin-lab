// Turin Territorial Agreement - Canone Concordato Zones & Rent Tables
// Source: Accordo Territoriale Città di Torino 2024

export interface ZoneRentRange {
  min: number; // €/m² conventional
  max: number;
}

export interface SubBandRanges {
  band1: ZoneRentRange; // 0-8 elements
  band2: ZoneRentRange; // 9-14 elements
  band3: ZoneRentRange; // 15-22 elements
}

export interface ZoneData {
  id: string;
  name: string;
  description: string;
  neighborhoods: string[];
  // Rent per m² conventional by contract duration
  rent3plus2: SubBandRanges;
  rent4plus2: SubBandRanges;
  rent5plus2: SubBandRanges;
  rent6plus2: SubBandRanges;
  rentTransitional: SubBandRanges;
  rentStudent: SubBandRanges;
}

export interface PremiumZone {
  id: string;
  name: string;
  description: string;
  streets: string[];
  rentPerSqm: ZoneRentRange; // Single band (no sub-bands)
}

// Zone 1 - Centro / Precollinare
export const ZONE_1: ZoneData = {
  id: 'zona1',
  name: 'Zona 1 — Centro / Precollinare',
  description: 'Centro storico, Crocetta, San Salvario, Vanchiglia, Gran Madre, Crimea',
  neighborhoods: ['Centro', 'Crocetta', 'San Salvario', 'Vanchiglia', 'Gran Madre', 'Crimea', 'Borgo Po', 'Valentino'],
  rent3plus2: {
    band1: { min: 3.50, max: 5.80 },
    band2: { min: 5.80, max: 7.50 },
    band3: { min: 7.50, max: 9.50 },
  },
  rent4plus2: {
    band1: { min: 3.30, max: 5.50 },
    band2: { min: 5.50, max: 7.10 },
    band3: { min: 7.10, max: 9.00 },
  },
  rent5plus2: {
    band1: { min: 3.10, max: 5.20 },
    band2: { min: 5.20, max: 6.70 },
    band3: { min: 6.70, max: 8.50 },
  },
  rent6plus2: {
    band1: { min: 2.90, max: 4.90 },
    band2: { min: 4.90, max: 6.30 },
    band3: { min: 6.30, max: 8.00 },
  },
  rentTransitional: {
    band1: { min: 4.00, max: 6.50 },
    band2: { min: 6.50, max: 8.50 },
    band3: { min: 8.50, max: 11.00 },
  },
  rentStudent: {
    band1: { min: 4.20, max: 6.80 },
    band2: { min: 6.80, max: 9.00 },
    band3: { min: 9.00, max: 11.50 },
  },
};

// Zone 2 - Semicentro
export const ZONE_2: ZoneData = {
  id: 'zona2',
  name: 'Zona 2 — Semicentro',
  description: 'Santa Rita, Lingotto, Nizza Millefonti, Aurora, Barriera di Milano',
  neighborhoods: ['Santa Rita', 'Lingotto', 'Nizza Millefonti', 'Aurora', 'Barriera di Milano', 'San Donato', 'Campidoglio', 'Cenisia', 'Parella'],
  rent3plus2: {
    band1: { min: 2.80, max: 4.60 },
    band2: { min: 4.60, max: 6.00 },
    band3: { min: 6.00, max: 7.50 },
  },
  rent4plus2: {
    band1: { min: 2.60, max: 4.40 },
    band2: { min: 4.40, max: 5.70 },
    band3: { min: 5.70, max: 7.10 },
  },
  rent5plus2: {
    band1: { min: 2.50, max: 4.10 },
    band2: { min: 4.10, max: 5.30 },
    band3: { min: 5.30, max: 6.70 },
  },
  rent6plus2: {
    band1: { min: 2.30, max: 3.90 },
    band2: { min: 3.90, max: 5.00 },
    band3: { min: 5.00, max: 6.30 },
  },
  rentTransitional: {
    band1: { min: 3.20, max: 5.20 },
    band2: { min: 5.20, max: 6.80 },
    band3: { min: 6.80, max: 8.80 },
  },
  rentStudent: {
    band1: { min: 3.40, max: 5.50 },
    band2: { min: 5.50, max: 7.20 },
    band3: { min: 7.20, max: 9.20 },
  },
};

// Zone 3 - Periferia semicentrale
export const ZONE_3: ZoneData = {
  id: 'zona3',
  name: 'Zona 3 — Periferia semicentrale',
  description: 'Mirafiori Nord, Pozzo Strada, Borgo Vittoria, Madonna di Campagna',
  neighborhoods: ['Mirafiori Nord', 'Pozzo Strada', 'Borgo Vittoria', 'Madonna di Campagna', 'Rebaudengo', 'Regio Parco', 'Lucento'],
  rent3plus2: {
    band1: { min: 2.20, max: 3.80 },
    band2: { min: 3.80, max: 5.00 },
    band3: { min: 5.00, max: 6.20 },
  },
  rent4plus2: {
    band1: { min: 2.10, max: 3.60 },
    band2: { min: 3.60, max: 4.70 },
    band3: { min: 4.70, max: 5.90 },
  },
  rent5plus2: {
    band1: { min: 2.00, max: 3.40 },
    band2: { min: 3.40, max: 4.40 },
    band3: { min: 4.40, max: 5.50 },
  },
  rent6plus2: {
    band1: { min: 1.90, max: 3.20 },
    band2: { min: 3.20, max: 4.10 },
    band3: { min: 4.10, max: 5.20 },
  },
  rentTransitional: {
    band1: { min: 2.60, max: 4.30 },
    band2: { min: 4.30, max: 5.60 },
    band3: { min: 5.60, max: 7.20 },
  },
  rentStudent: {
    band1: { min: 2.80, max: 4.50 },
    band2: { min: 4.50, max: 5.90 },
    band3: { min: 5.90, max: 7.50 },
  },
};

// Zone 4 - Periferia
export const ZONE_4: ZoneData = {
  id: 'zona4',
  name: 'Zona 4 — Periferia',
  description: 'Mirafiori Sud, Falchera, Vallette, Le Vallette, Barca',
  neighborhoods: ['Mirafiori Sud', 'Falchera', 'Vallette', 'Le Vallette', 'Barca', 'Bertolla', 'Villaretto'],
  rent3plus2: {
    band1: { min: 1.80, max: 3.20 },
    band2: { min: 3.20, max: 4.20 },
    band3: { min: 4.20, max: 5.20 },
  },
  rent4plus2: {
    band1: { min: 1.70, max: 3.00 },
    band2: { min: 3.00, max: 4.00 },
    band3: { min: 4.00, max: 4.90 },
  },
  rent5plus2: {
    band1: { min: 1.60, max: 2.80 },
    band2: { min: 2.80, max: 3.70 },
    band3: { min: 3.70, max: 4.60 },
  },
  rent6plus2: {
    band1: { min: 1.50, max: 2.60 },
    band2: { min: 2.60, max: 3.50 },
    band3: { min: 3.50, max: 4.40 },
  },
  rentTransitional: {
    band1: { min: 2.10, max: 3.60 },
    band2: { min: 3.60, max: 4.80 },
    band3: { min: 4.80, max: 6.00 },
  },
  rentStudent: {
    band1: { min: 2.20, max: 3.80 },
    band2: { min: 3.80, max: 5.00 },
    band3: { min: 5.00, max: 6.30 },
  },
};

// Premium zones (single band, higher rents)
export const PREMIUM_ZONES: PremiumZone[] = [
  {
    id: 'premium_piazza_san_carlo',
    name: 'Piazza San Carlo e adiacenze',
    description: 'Zone di pregio storico-architettonico',
    streets: ['Piazza San Carlo', 'Via Roma', 'Via Lagrange', 'Via Carlo Alberto'],
    rentPerSqm: { min: 5.00, max: 8.00 },
  },
  {
    id: 'premium_gran_madre',
    name: 'Gran Madre / Collina',
    description: 'Zone collinari di pregio',
    streets: ['Corso Moncalieri', 'Via Villa della Regina', 'Strada del Nobile'],
    rentPerSqm: { min: 5.50, max: 8.00 },
  },
];

export const ALL_ZONES: ZoneData[] = [ZONE_1, ZONE_2, ZONE_3, ZONE_4];

// 22 property feature elements for sub-band determination
export interface FeatureElement {
  id: string;
  label: { it: string; en: string };
  description?: { it: string; en: string };
}

export const FEATURE_ELEMENTS: FeatureElement[] = [
  { id: 'f1', label: { it: 'Ascensore', en: 'Elevator' } },
  { id: 'f2', label: { it: 'Portineria / Portiere', en: 'Concierge / Doorman' } },
  { id: 'f3', label: { it: 'Impianto di riscaldamento autonomo', en: 'Autonomous heating system' } },
  { id: 'f4', label: { it: 'Impianto di condizionamento', en: 'Air conditioning system' } },
  { id: 'f5', label: { it: 'Giardino condominiale', en: 'Shared garden' } },
  { id: 'f6', label: { it: 'Giardino esclusivo / Terrazzo', en: 'Private garden / Terrace' } },
  { id: 'f7', label: { it: 'Posto auto coperto', en: 'Covered parking spot' } },
  { id: 'f8', label: { it: 'Box auto', en: 'Garage box' } },
  { id: 'f9', label: { it: 'Cantina', en: 'Cellar' } },
  { id: 'f10', label: { it: 'Doppi servizi', en: 'Two bathrooms' } },
  { id: 'f11', label: { it: 'Tripli servizi o più', en: 'Three or more bathrooms' } },
  { id: 'f12', label: { it: 'Pavimentazione pregiata', en: 'Premium flooring' } },
  { id: 'f13', label: { it: 'Infissi doppio vetro / triplo vetro', en: 'Double/triple glazed windows' } },
  { id: 'f14', label: { it: 'Porta blindata', en: 'Armored door' } },
  { id: 'f15', label: { it: 'Videocitofono / Citofono', en: 'Video intercom / Intercom' } },
  { id: 'f16', label: { it: 'Impianto di allarme', en: 'Alarm system' } },
  { id: 'f17', label: { it: 'Cablaggio / Fibra ottica', en: 'Wiring / Fiber optic' } },
  { id: 'f18', label: { it: 'Edificio ristrutturato', en: 'Renovated building' } },
  { id: 'f19', label: { it: 'Alloggio ristrutturato', en: 'Renovated apartment' } },
  { id: 'f20', label: { it: 'Classe energetica A o B', en: 'Energy class A or B' } },
  { id: 'f21', label: { it: 'Vista panoramica / pregiata', en: 'Panoramic / Premium view' } },
  { id: 'f22', label: { it: 'Luminosità (doppia/tripla esposizione)', en: 'Brightness (double/triple exposure)' } },
];

// Contract type options
export type ContractType = '4+4' | '3+2' | 'transitorio' | 'studenti';

export interface ContractTypeOption {
  id: ContractType;
  label: { it: string; en: string };
  description: { it: string; en: string };
  isConcordato: boolean;
  duration: { it: string; en: string };
  cedolareSeccaRate: number; // %
}

export const CONTRACT_TYPES: ContractTypeOption[] = [
  {
    id: '4+4',
    label: { it: 'Contratto 4+4', en: '4+4 Contract' },
    description: {
      it: 'Contratto a canone libero con durata di 4 anni + 4 di rinnovo automatico.',
      en: 'Free-market contract with 4 years + 4 years automatic renewal.',
    },
    isConcordato: false,
    duration: { it: '4 + 4 anni', en: '4 + 4 years' },
    cedolareSeccaRate: 21,
  },
  {
    id: '3+2',
    label: { it: 'Contratto 3+2', en: '3+2 Contract' },
    description: {
      it: 'Contratto a canone concordato: canone regolato da accordi territoriali con agevolazioni fiscali (cedolare secca al 10%).',
      en: 'Regulated-rent contract: rent set by territorial agreements with tax benefits (10% flat tax).',
    },
    isConcordato: true,
    duration: { it: '3 + 2 anni', en: '3 + 2 years' },
    cedolareSeccaRate: 10,
  },
  {
    id: 'transitorio',
    label: { it: 'Contratto transitorio', en: 'Transitional Contract' },
    description: {
      it: 'Per esigenze temporanee documentate del locatore o del conduttore (1-18 mesi).',
      en: 'For documented temporary needs of landlord or tenant (1-18 months).',
    },
    isConcordato: true,
    duration: { it: '1-18 mesi', en: '1-18 months' },
    cedolareSeccaRate: 10,
  },
  {
    id: 'studenti',
    label: { it: 'Contratto per studenti', en: 'Student Contract' },
    description: {
      it: 'Per studenti universitari fuori sede. Durata 6-36 mesi, cedolare secca al 10%.',
      en: 'For non-resident university students. Duration 6-36 months, 10% flat tax.',
    },
    isConcordato: true,
    duration: { it: '6-36 mesi', en: '6-36 months' },
    cedolareSeccaRate: 10,
  },
];

// Energy class options
export const ENERGY_CLASSES = ['A4', 'A3', 'A2', 'A1', 'B', 'C', 'D', 'E', 'F', 'G'] as const;
export type EnergyClass = typeof ENERGY_CLASSES[number];
