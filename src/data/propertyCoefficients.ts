// Property Valuation Coefficients - FIAIP Standards 2024-2025
// Source: FIAIP Torino, Osservatorio Immobiliare

export interface CoefficientOption {
  id: string;
  label: string;
  value: number;
  description?: string;
}

// A) Piano con ascensore
export const floorWithElevator: CoefficientOption[] = [
  { id: 'basement', label: 'Seminterrato', value: -0.25, description: '-25%' },
  { id: 'ground', label: 'Piano terra / Rialzato', value: -0.10, description: '-10%' },
  { id: 'first', label: '1° Piano', value: -0.10, description: '-10%' },
  { id: 'second', label: '2° Piano', value: -0.03, description: '-3%' },
  { id: 'third', label: '3° Piano', value: 0, description: '0% (Riferimento)' },
  { id: 'fourth', label: '4° Piano', value: 0.03, description: '+3%' },
  { id: 'fifth_plus', label: '5° Piano e oltre', value: 0.05, description: '+5%' },
  { id: 'penthouse', label: 'Attico con terrazzo', value: 0.20, description: '+20%' },
];

// A) Piano senza ascensore
export const floorWithoutElevator: CoefficientOption[] = [
  { id: 'ground', label: 'Piano terra / Rialzato', value: -0.10, description: '-10%' },
  { id: 'first', label: '1° Piano', value: -0.10, description: '-10%' },
  { id: 'second', label: '2° Piano', value: -0.15, description: '-15%' },
  { id: 'third_plus', label: '3° Piano e oltre', value: -0.25, description: '-25%' },
  { id: 'penthouse', label: 'Attico', value: -0.30, description: '-30%' },
];

// B) Stato di conservazione
export const conservationState: CoefficientOption[] = [
  { id: 'to_renovate', label: 'Da ristrutturare', value: -0.10, description: '-10%' },
  { id: 'good', label: 'Buono stato', value: 0, description: '0% (Riferimento)' },
  { id: 'renovated', label: 'Ristrutturato', value: 0.05, description: '+5%' },
  { id: 'finely_renovated', label: 'Finemente ristrutturato', value: 0.10, description: '+10%' },
  { id: 'new_construction', label: 'Nuova costruzione', value: 0.15, description: '+15%' },
];

// C) Classe energetica
export const energyClass: CoefficientOption[] = [
  { id: 'a4_a3', label: 'A4 / A3', value: 0.15, description: '+15% - Eccellente' },
  { id: 'a2_a1', label: 'A2 / A1', value: 0.12, description: '+12% - Ottimo' },
  { id: 'b', label: 'B', value: 0.08, description: '+8% - Buono' },
  { id: 'c', label: 'C', value: 0.03, description: '+3% - Medio' },
  { id: 'd', label: 'D', value: 0, description: '0% (Riferimento)' },
  { id: 'e', label: 'E', value: -0.05, description: '-5% - Scarso' },
  { id: 'f', label: 'F', value: -0.10, description: '-10% - Molto scarso' },
  { id: 'g', label: 'G', value: -0.15, description: '-15% - Pessimo' },
];

// D) Riscaldamento
export const heatingSystem: CoefficientOption[] = [
  { id: 'absent', label: 'Assente', value: -0.08, description: '-8%' },
  { id: 'centralized', label: 'Centralizzato', value: 0, description: '0% (Standard)' },
  { id: 'centralized_metered', label: 'Centralizzato con contabilizzazione', value: 0.02, description: '+2%' },
  { id: 'autonomous', label: 'Autonomo (caldaia)', value: 0.05, description: '+5%' },
  { id: 'autonomous_hp', label: 'Autonomo con pompa di calore', value: 0.08, description: '+8%' },
];

// E) Balcone / Terrazzo
export const balconyTerrace: CoefficientOption[] = [
  { id: 'absent', label: 'Assente', value: 0, description: '0%' },
  { id: 'small_balcony', label: 'Balcone piccolo (<5 mq)', value: 0.02, description: '+2%' },
  { id: 'medium_balcony', label: 'Balcone medio (5-15 mq)', value: 0.05, description: '+5%' },
  { id: 'terrace', label: 'Terrazzo (15-30 mq)', value: 0.08, description: '+8%' },
  { id: 'large_terrace', label: 'Terrazzo grande (>30 mq)', value: 0.10, description: '+10%' },
  { id: 'garden', label: 'Giardino esclusivo (50+ mq)', value: 0.15, description: '+15%' },
];

// F) Garage / Box auto
export const garageParking: CoefficientOption[] = [
  { id: 'absent', label: 'Assente', value: 0, description: '0%' },
  { id: 'covered_parking', label: 'Parcheggio coperto', value: 0.015, description: '+1.5%' },
  { id: 'external_box', label: 'Box singolo (esterno)', value: 0.02, description: '+2%' },
  { id: 'internal_box', label: 'Box singolo (interno)', value: 0.03, description: '+3%' },
  { id: 'double_box', label: 'Due box singoli', value: 0.06, description: '+6%' },
  { id: 'garage_storage', label: 'Garage 2 auto con magazzino', value: 0.08, description: '+8%' },
];

// G) Esposizione
export const exposure: CoefficientOption[] = [
  { id: 'single', label: 'Singola (monotono)', value: -0.05, description: '-5%' },
  { id: 'double', label: 'Doppia (normale)', value: 0, description: '0% (Standard)' },
  { id: 'triple', label: 'Tripla', value: 0.03, description: '+3%' },
  { id: 'quadruple', label: 'Quadrupla (angolare)', value: 0.05, description: '+5%' },
];

// H) Fattori aggiuntivi - Premi
export const additionalPremiums: CoefficientOption[] = [
  { id: 'metro_nearby', label: 'Vicinanza metro (<200m)', value: 0.05, description: '+5%' },
  { id: 'park_nearby', label: 'Vicinanza parco/verde', value: 0.03, description: '+3%' },
  { id: 'historic_value', label: 'Valore storico/architettonico', value: 0.05, description: '+5%' },
];

// I) Fattori aggiuntivi - Penalità
export const additionalPenalties: CoefficientOption[] = [
  { id: 'noise', label: 'Rumore (traffico/ferrovia)', value: -0.07, description: '-7%' },
  { id: 'humidity', label: 'Umidità/infiltrazioni', value: -0.10, description: '-10%' },
];

// Utility function to get coefficient options by category
export const getCoefficientsByCategory = (category: string): CoefficientOption[] => {
  switch (category) {
    case 'floorWithElevator': return floorWithElevator;
    case 'floorWithoutElevator': return floorWithoutElevator;
    case 'conservationState': return conservationState;
    case 'energyClass': return energyClass;
    case 'heatingSystem': return heatingSystem;
    case 'balconyTerrace': return balconyTerrace;
    case 'garageParking': return garageParking;
    case 'exposure': return exposure;
    default: return [];
  }
};

// Calculate reliability score based on completeness
export const calculateReliability = (filledFields: number, totalFields: number): number => {
  const baseReliability = 75;
  const maxBonus = 20;
  const bonus = (filledFields / totalFields) * maxBonus;
  return Math.min(95, Math.round(baseReliability + bonus));
};
