import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Calculator, TrendingDown, Percent, Euro, Building2, Home, AlertTriangle, Info } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SavingsCalculatorProps {
  onContactClick: () => void;
}

type ConditionType = 'daRistrutturare' | 'buonoStato' | 'ristrutturato';
type PropertyType = 'bilocale' | 'trilocale' | 'quadrilocale';

// Prezzi validati OMI/Immobiliare.it novembre 2025 - zone semicentrali Torino
const CONDITION_PRESETS: Record<ConditionType, Record<PropertyType, number>> = {
  daRistrutturare: {
    bilocale: 60000,     // €55-65k mediano = €60k
    trilocale: 87500,    // €80-95k mediano = €87.5k  
    quadrilocale: 120000 // €110-130k mediano = €120k
  },
  buonoStato: {
    bilocale: 95000,     // €85-100k mediano = €95k
    trilocale: 145000,   // €130-160k mediano = €145k
    quadrilocale: 197500 // €175-220k mediano = €197.5k
  },
  ristrutturato: {
    bilocale: 120000,    // €110-130k mediano = €120k
    trilocale: 190000,   // €170-210k mediano = €190k
    quadrilocale: 260000 // €230-290k mediano = €260k
  }
};

const CONDITION_ICONS: Record<ConditionType, string> = {
  daRistrutturare: '🏚️',
  buonoStato: '🏠',
  ristrutturato: '✨'
};

const PROPERTY_TYPES: PropertyType[] = ['bilocale', 'trilocale', 'quadrilocale'];

const MIN_VALUE = 50000;
const MAX_VALUE = 2000000;

// Format number with dots as thousand separators (moved outside component)
const formatNumber = (num: number) => {
  return num.toLocaleString('it-IT');
};

export const SavingsCalculator = ({ onContactClick }: SavingsCalculatorProps) => {
  const { t } = useTranslation();
  const [selectedCondition, setSelectedCondition] = useState<ConditionType>('buonoStato');
  const [activePreset, setActivePreset] = useState<PropertyType | null>('trilocale');
  const [propertyValue, setPropertyValue] = useState([CONDITION_PRESETS.buonoStato.trilocale]);
  const [inputValue, setInputValue] = useState(formatNumber(CONDITION_PRESETS.buonoStato.trilocale));
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Agency commission typically 3-4% + IVA (22%) = ~4.27-4.88%
  const agencyCommissionRate = 0.04;
  const ivaRate = 0.22;
  const totalAgencyRate = agencyCommissionRate * (1 + ivaRate);
  
  // Minimum agency fee (€4k-€6k for properties < €60k)
  const MINIMUM_AGENCY_FEE = 5000;
  const MIN_FEE_THRESHOLD = 60000;
  
  const percentageCommission = Math.round(propertyValue[0] * totalAgencyRate);
  const agencyCommission = propertyValue[0] < MIN_FEE_THRESHOLD 
    ? Math.max(MINIMUM_AGENCY_FEE, percentageCommission)
    : percentageCommission;
  const isMinimumFee = propertyValue[0] < MIN_FEE_THRESHOLD && agencyCommission === MINIMUM_AGENCY_FEE;
  
  const jungleRentCommission = 0;
  const savings = agencyCommission - jungleRentCommission;

  // Parse formatted string to number
  const parseFormattedNumber = (str: string) => {
    return parseInt(str.replace(/\./g, ''), 10) || 0;
  };

  // Handle condition change
  const handleConditionChange = (value: string) => {
    if (value) {
      const newCondition = value as ConditionType;
      setSelectedCondition(newCondition);
      // Update value if preset is selected
      if (activePreset) {
        const newValue = CONDITION_PRESETS[newCondition][activePreset];
        setPropertyValue([newValue]);
        setInputValue(formatNumber(newValue));
      }
    }
  };

  // Handle slider change
  const handleSliderChange = (values: number[]) => {
    setPropertyValue(values);
    setInputValue(formatNumber(values[0]));
    // Check if value matches a preset in current condition
    const currentConditionPresets = CONDITION_PRESETS[selectedCondition];
    const matchingPreset = PROPERTY_TYPES.find(type => currentConditionPresets[type] === values[0]);
    setActivePreset(matchingPreset || null);
  };

  // Handle direct input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^\d]/g, '');
    if (raw === '') {
      setInputValue('');
      return;
    }
    const num = parseInt(raw, 10);
    setInputValue(formatNumber(num));
  };

  // Handle input blur - validate and sync
  const handleInputBlur = () => {
    let num = parseFormattedNumber(inputValue);
    if (num < MIN_VALUE) num = MIN_VALUE;
    if (num > MAX_VALUE) num = MAX_VALUE;
    setPropertyValue([num]);
    setInputValue(formatNumber(num));
    // Check if value matches a preset in current condition
    const currentConditionPresets = CONDITION_PRESETS[selectedCondition];
    const matchingPreset = PROPERTY_TYPES.find(type => currentConditionPresets[type] === num);
    setActivePreset(matchingPreset || null);
  };

  // Handle preset click
  const handlePresetClick = (type: PropertyType) => {
    const value = CONDITION_PRESETS[selectedCondition][type];
    setPropertyValue([value]);
    setInputValue(formatNumber(value));
    setActivePreset(type);
  };
  
  // Animate savings value
  useEffect(() => {
    const duration = 500;
    const steps = 20;
    const increment = (savings - animatedSavings) / steps;
    let current = animatedSavings;
    let step = 0;
    
    const timer = setInterval(() => {
      step++;
      current += increment;
      setAnimatedSavings(Math.round(current));
      
      if (step >= steps) {
        setAnimatedSavings(savings);
        clearInterval(timer);
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [savings]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('it-IT', {
      style: 'currency',
      currency: 'EUR',
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <Card className="border-primary/20 bg-gradient-to-br from-card to-card/80 shadow-lg overflow-hidden">
      <CardHeader className="pb-2 pt-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/10">
            <Calculator className="w-4 h-4 text-primary" />
          </div>
          <CardTitle className="text-base md:text-lg font-display">
            {t('sellersPage.calculator.title')}
          </CardTitle>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {t('sellersPage.calculator.subtitle')}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-2 overflow-hidden pt-0">
        {/* Combined Condition + Property Type on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Condition Selector */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs text-muted-foreground">
                {t('sellersPage.calculator.condition.label', 'Stato immobile')}
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3 h-3 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p className="text-xs">
                      {t('sellersPage.calculator.condition.tooltip', 'Seleziona lo stato attuale del tuo immobile per una stima più accurata')}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <ToggleGroup 
              type="single" 
              value={selectedCondition} 
              onValueChange={handleConditionChange}
              className="grid grid-cols-3 gap-1"
            >
              {(['daRistrutturare', 'buonoStato', 'ristrutturato'] as ConditionType[]).map((condition) => (
                <ToggleGroupItem
                  key={condition}
                  value={condition}
                  aria-label={t(`sellersPage.calculator.condition.${condition}`)}
                  className="flex items-center justify-center gap-1 px-1.5 py-1 text-[10px] sm:text-xs data-[state=on]:bg-primary data-[state=on]:text-primary-foreground transition-all border border-input hover:bg-accent hover:text-accent-foreground"
                >
                  <span className="truncate">
                    {t(`sellersPage.calculator.condition.${condition}Short`, 
                      condition === 'daRistrutturare' ? 'Rist.' : 
                      condition === 'buonoStato' ? 'Buono' : 'Nuovo'
                    )}
                  </span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {/* Property Type Presets */}
          <div>
            <span className="text-xs text-muted-foreground mb-1 block">
              {t('sellersPage.calculator.propertyType', 'Tipologia')}
            </span>
            <div className="grid grid-cols-3 gap-1">
              {PROPERTY_TYPES.map((type) => (
                <Button
                  key={type}
                  variant={activePreset === type ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePresetClick(type)}
                  className="w-full min-w-0 flex-col h-auto py-1 px-1 transition-all duration-200"
                >
                  <span className="text-[10px] sm:text-xs truncate">
                    {t(`sellersPage.calculator.presets.${type}`)}
                  </span>
                  <span className="text-[9px] sm:text-[10px] opacity-70">
                    {formatCurrency(CONDITION_PRESETS[selectedCondition][type])}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Property Value Input + Slider */}
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <label className="text-xs font-medium text-foreground whitespace-nowrap">
              {t('sellersPage.calculator.propertyValue')}
            </label>
            <div className="relative flex-1 max-w-[160px]">
              <Euro className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={(e) => e.key === 'Enter' && handleInputBlur()}
                className="pl-8 text-right font-semibold text-sm h-8"
                placeholder="200.000"
              />
            </div>
          </div>
          
          <Slider
            value={propertyValue}
            onValueChange={handleSliderChange}
            min={MIN_VALUE}
            max={MAX_VALUE}
            step={10000}
            className="py-1"
          />
          
          <div className="flex justify-between text-[10px] text-muted-foreground px-0.5">
            <span>€50k</span>
            <span>€2M</span>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-2">
          {/* Agency */}
          <div className={`p-2 rounded-lg border transition-all duration-300 ${
            isMinimumFee 
              ? 'bg-destructive/10 border-destructive/40 ring-1 ring-destructive/20' 
              : 'bg-destructive/5 border-destructive/20'
          }`}>
            <div className="flex items-center gap-1.5">
              <Percent className="w-3 h-3 text-destructive" />
              <span className="text-[10px] font-medium text-muted-foreground">
                {t('sellersPage.calculator.agency')}
              </span>
              {isMinimumFee && (
                <span className="ml-auto flex items-center gap-0.5 text-[8px] font-semibold text-destructive bg-destructive/10 px-1 py-0.5 rounded">
                  <AlertTriangle className="w-2 h-2" />
                  MIN
                </span>
              )}
            </div>
            <p className="text-sm font-bold text-destructive mt-0.5">
              {formatCurrency(agencyCommission)}
            </p>
            <p className="text-[9px] text-muted-foreground">
              {isMinimumFee 
                ? t('sellersPage.calculator.minimumFeeExplanation')
                : '4% + IVA'
              }
            </p>
          </div>
          
          {/* Jungle Rent */}
          <div className="p-2 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-1.5">
              <Building2 className="w-3 h-3 text-primary" />
              <span className="text-[10px] font-medium text-muted-foreground">
                Jungle Rent
              </span>
            </div>
            <p className="text-sm font-bold text-primary mt-0.5">
              €0
            </p>
            <p className="text-[9px] text-muted-foreground">
              {t('sellersPage.calculator.directBuyer')}
            </p>
          </div>
        </div>

        {/* Savings Result - Compact */}
        <AnimatePresence mode="wait">
          <motion.div
            key={savings}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-2 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
          >
            <div className="flex items-center justify-center gap-1.5">
              <TrendingDown className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-foreground">
                {t('sellersPage.calculator.yourSavings')}
              </span>
            </div>
            <p className="text-xl md:text-2xl font-display font-bold text-primary text-center">
              {formatCurrency(animatedSavings)}
            </p>
            <p className="text-[9px] text-muted-foreground text-center">
              {t('sellersPage.calculator.savingsNote')}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA + Link combined */}
        <div className="space-y-1">
          <Button 
            variant="premium" 
            size="sm" 
            className="w-full"
            onClick={onContactClick}
          >
            <Euro className="w-3.5 h-3.5 mr-1.5" />
            {t('sellersPage.calculator.cta')}
          </Button>
          <p className="text-[9px] text-center text-muted-foreground">
            <a 
              href="/valutazione-immobile" 
              className="text-primary hover:underline inline-flex items-center gap-1"
            >
              {t('sellersPage.calculator.valuatorLink', 'Vuoi una stima dettagliata?')} →
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
