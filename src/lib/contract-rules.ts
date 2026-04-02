// Contract Rules Engine — Canone Concordato (Accordo Territoriale Torino 2024)

import type { ContractType, EnergyClass, ZoneData, SubBandRanges, ZoneRentRange } from '@/data/contract-zones';

// ─── Surface Calculation ────────────────────────────────────────────
export interface SurfaceInput {
  walkableSqm: number;
  balconySqm: number;
  cellarSqm: number;
  garageSqm: number;
  outdoorSqm: number;
}

export function calculateConventionalSurface(input: SurfaceInput): number {
  const raw =
    input.walkableSqm * 1.0 +
    input.balconySqm * 0.25 +
    input.cellarSqm * 0.25 +
    input.garageSqm * 0.80 +
    input.outdoorSqm * 0.10;
  return Math.round(raw * 100) / 100;
}

// ─── Surface Coefficient ────────────────────────────────────────────
export function getSurfaceCoefficient(conventionalSqm: number): number {
  if (conventionalSqm <= 41) return 1.30;
  if (conventionalSqm <= 51) return 1.25;
  if (conventionalSqm <= 67) return 1.20;
  if (conventionalSqm <= 80) {
    // Minimum effective surface = 80.40 m²
    const effective = Math.max(conventionalSqm, 80.40 / 1.0);
    return effective / conventionalSqm;
  }
  return 1.0;
}

// ─── Sub-band Determination ─────────────────────────────────────────
export type SubBand = 1 | 2 | 3;

export function determineSubBand(featureCount: number): SubBand {
  if (featureCount <= 8) return 1;
  if (featureCount <= 14) return 2;
  return 3;
}

// ─── Rent Range Lookup ──────────────────────────────────────────────
function getRentKey(contractType: ContractType): keyof ZoneData {
  switch (contractType) {
    case '3+2': return 'rent3plus2';
    case 'transitorio': return 'rentTransitional';
    case 'studenti': return 'rentStudent';
    // For 4+4 (free market), use 3+2 as reference
    default: return 'rent3plus2';
  }
}

export function getRentRange(
  zone: ZoneData,
  contractType: ContractType,
  subBand: SubBand
): ZoneRentRange {
  const key = getRentKey(contractType);
  const ranges = zone[key] as SubBandRanges;
  switch (subBand) {
    case 1: return ranges.band1;
    case 2: return ranges.band2;
    case 3: return ranges.band3;
  }
}

// ─── Full Rent Calculation ──────────────────────────────────────────
export interface RentCalculationInput {
  zone: ZoneData;
  contractType: ContractType;
  conventionalSqm: number;
  featureCount: number;
  // Surcharges (boolean toggles)
  isNewBuild: boolean;
  isRenovatedRecently: boolean; // < 5 years
  energyClass: EnergyClass;
  isFurnished: boolean;
  furnitureValue?: number;
  noDepositWaiver: boolean;
}

export interface RentCalculationResult {
  conventionalSqm: number;
  surfaceCoefficient: number;
  effectiveSqm: number;
  subBand: SubBand;
  baseRentPerSqm: ZoneRentRange;
  surchargePercent: number;
  surchargeDetails: { label: string; percent: number }[];
  monthlyRentMin: number;
  monthlyRentMax: number;
}

function getEnergySurcharge(energyClass: EnergyClass): number {
  switch (energyClass) {
    case 'A4': case 'A3': case 'A2': case 'A1': return 0.05;
    case 'B': return 0.03;
    default: return 0;
  }
}

export function calculateRent(input: RentCalculationInput): RentCalculationResult {
  const surfaceCoefficient = getSurfaceCoefficient(input.conventionalSqm);
  const effectiveSqm = Math.round(input.conventionalSqm * surfaceCoefficient * 100) / 100;
  const subBand = determineSubBand(input.featureCount);
  const baseRange = getRentRange(input.zone, input.contractType, subBand);

  // Surcharges — applied on base rent, NOT cumulative
  const surchargeDetails: { label: string; percent: number }[] = [];

  if (input.isNewBuild) {
    surchargeDetails.push({ label: 'Nuova costruzione', percent: 5 });
  }
  if (input.isRenovatedRecently) {
    surchargeDetails.push({ label: 'Ristrutturazione recente (<5 anni)', percent: 5 });
  }
  const energySurcharge = getEnergySurcharge(input.energyClass);
  if (energySurcharge > 0) {
    surchargeDetails.push({ label: `Classe energetica ${input.energyClass}`, percent: energySurcharge * 100 });
  }
  if (input.isFurnished) {
    surchargeDetails.push({ label: 'Arredato', percent: 10 });
  }
  if (input.featureCount >= 9) {
    surchargeDetails.push({ label: '≥9 elementi di pregio', percent: 5 });
  }

  const totalSurchargePercent = surchargeDetails.reduce((sum, s) => sum + s.percent, 0);

  const surchargeMultiplier = 1 + totalSurchargePercent / 100;
  const monthlyMin = Math.round(baseRange.min * effectiveSqm * surchargeMultiplier * 100) / 100;
  const monthlyMax = Math.round(baseRange.max * effectiveSqm * surchargeMultiplier * 100) / 100;

  return {
    conventionalSqm: input.conventionalSqm,
    surfaceCoefficient,
    effectiveSqm,
    subBand,
    baseRentPerSqm: baseRange,
    surchargePercent: totalSurchargePercent,
    surchargeDetails,
    monthlyRentMin: monthlyMin,
    monthlyRentMax: monthlyMax,
  };
}

// ─── Tax Comparison ─────────────────────────────────────────────────
export interface TaxComparison {
  annualRent: number;
  cedolareSeccaRate: number;
  cedolareSeccaTax: number;
  cedolareSeccaNet: number;
  irpefEstimate: number; // simplified for MVP
  irpefNet: number;
  savings: number;
}

const IRPEF_BRACKETS = [
  { limit: 28000, rate: 0.23 },
  { limit: 50000, rate: 0.35 },
  { limit: Infinity, rate: 0.43 },
];

function calculateIrpef(taxableIncome: number): number {
  let tax = 0;
  let remaining = taxableIncome;
  let prev = 0;
  for (const bracket of IRPEF_BRACKETS) {
    const chunk = Math.min(remaining, bracket.limit - prev);
    if (chunk <= 0) break;
    tax += chunk * bracket.rate;
    remaining -= chunk;
    prev = bracket.limit;
  }
  return Math.round(tax * 100) / 100;
}

export function compareTax(
  monthlyRent: number,
  cedolareSeccaRate: number
): TaxComparison {
  const annualRent = monthlyRent * 12;
  // Cedolare secca
  const cedolareSeccaTax = Math.round(annualRent * cedolareSeccaRate / 100 * 100) / 100;
  const cedolareSeccaNet = annualRent - cedolareSeccaTax;

  // IRPEF: 95% of rent is taxable for concordato
  const taxableForIrpef = annualRent * 0.95;
  // Addizionale comunale + regionale ~2.5% estimate
  const irpefEstimate = calculateIrpef(taxableForIrpef) + taxableForIrpef * 0.025;
  const irpefRounded = Math.round(irpefEstimate * 100) / 100;
  const irpefNet = annualRent - irpefRounded;

  return {
    annualRent,
    cedolareSeccaRate,
    cedolareSeccaTax,
    cedolareSeccaNet,
    irpefEstimate: irpefRounded,
    irpefNet,
    savings: Math.round((cedolareSeccaNet - irpefNet) * 100) / 100,
  };
}

// ─── IMU Rates (Torino 2024) ────────────────────────────────────────
export const IMU_RATES = {
  prima_casa: 0, // esente
  concordato: 0.00431, // 4.31‰
  canone_libero: 0.00795, // 7.95‰
  non_locato: 0.0106, // 10.6‰
} as const;

export function calculateIMU(cadastralValue: number, rate: number): number {
  // Rivalutazione catastale 5% + moltiplicatore 160
  const taxBase = cadastralValue * 1.05 * 160;
  return Math.round(taxBase * rate * 100) / 100;
}
