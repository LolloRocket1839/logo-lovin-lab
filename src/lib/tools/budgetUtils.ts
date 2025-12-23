// Budget calculator utilities

export type Season = 'winter' | 'summer' | 'spring';

export interface SeasonalDefaults {
  electricity: number;
  gas: number;
  season: Season;
}

export const getSeasonalDefaults = (): SeasonalDefaults => {
  const month = new Date().getMonth();
  // Winter: Nov-Feb
  if (month >= 10 || month <= 1) {
    return { electricity: 55, gas: 75, season: 'winter' };
  }
  // Summer: Jun-Aug
  if (month >= 5 && month <= 7) {
    return { electricity: 40, gas: 15, season: 'summer' };
  }
  // Spring/Fall
  return { electricity: 45, gas: 35, season: 'spring' };
};

export const housingTypes = {
  shared: { label: { it: "Stanza doppia", en: "Shared room" }, multiplier: 0.7 },
  single: { label: { it: "Stanza singola", en: "Single room" }, multiplier: 1 },
  studio: { label: { it: "Monolocale", en: "Studio" }, multiplier: 1.4 }
} as const;

export type HousingType = keyof typeof housingTypes;

export interface BudgetBreakdown {
  rent: number;
  groceries: number;
  transport: number;
  gas: number;
}

export interface ContextualTip {
  category: string;
  tip: string;
}

export const getContextualTips = (
  breakdown: BudgetBreakdown,
  lang: 'it' | 'en'
): ContextualTip[] => {
  const tips: ContextualTip[] = [];
  
  if (breakdown.rent > 500) {
    tips.push({
      category: 'rent',
      tip: lang === 'it' 
        ? "💡 Cerca coinquilini su gruppi Facebook 'Affitti Torino Studenti'" 
        : "💡 Look for roommates on Facebook groups 'Affitti Torino Studenti'"
    });
  }
  
  if (breakdown.groceries > 250) {
    tips.push({
      category: 'groceries',
      tip: lang === 'it' 
        ? "💡 Porta Palazzo: risparmi fino al 40% sulla spesa" 
        : "💡 Porta Palazzo market: save up to 40% on groceries"
    });
  }
  
  if (breakdown.transport === 0) {
    tips.push({
      category: 'transport',
      tip: lang === 'it' 
        ? "💡 GTT Under 26: solo €25/mese per metro+bus illimitati" 
        : "💡 GTT Under 26: only €25/month for unlimited metro+bus"
    });
  }
  
  if (breakdown.gas > 60) {
    tips.push({
      category: 'gas',
      tip: lang === 'it' 
        ? "💡 Molti edifici UNITO/Polito hanno riscaldamento centralizzato incluso" 
        : "💡 Many UNITO/Polito buildings have central heating included"
    });
  }
  
  return tips;
};

export const calculateTransportCost = (hasGTT: boolean, isUnder26: boolean): number => {
  if (!hasGTT) return 0;
  return isUnder26 ? 25 : 42;
};

export const getYearlyProjection = (
  baseMonthly: number,
  lang: 'it' | 'en'
): Array<{ name: string; budget: number; gas: number; electricity: number }> => {
  const months = lang === 'it' 
    ? ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']
    : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  
  const seasonalGas = [75, 70, 50, 30, 15, 10, 10, 10, 25, 45, 65, 75];
  const seasonalElec = [55, 55, 50, 45, 40, 35, 40, 40, 45, 50, 55, 55];
  const specialCosts = [0, 0, 0, 0, 0, 0, 0, 0, 80, 0, 0, 50];
  
  return months.map((month, i) => ({
    name: month,
    budget: baseMonthly + seasonalGas[i] + seasonalElec[i] + specialCosts[i],
    gas: seasonalGas[i],
    electricity: seasonalElec[i]
  }));
};
