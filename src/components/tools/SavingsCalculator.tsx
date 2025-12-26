import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Calculator, TrendingDown, Percent, Euro, Building2, Home } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface SavingsCalculatorProps {
  onContactClick: () => void;
}

const PRESETS = [
  { key: "bilocale", value: 150000 },
  { key: "trilocale", value: 250000 },
  { key: "quadrilocale", value: 400000 },
];

const MIN_VALUE = 50000;
const MAX_VALUE = 2000000;

export const SavingsCalculator = ({ onContactClick }: SavingsCalculatorProps) => {
  const { t } = useTranslation();
  const [propertyValue, setPropertyValue] = useState([200000]);
  const [inputValue, setInputValue] = useState("200.000");
  const [animatedSavings, setAnimatedSavings] = useState(0);
  const [activePreset, setActivePreset] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Agency commission typically 3-4% + IVA (22%) = ~4.27-4.88%
  const agencyCommissionRate = 0.04;
  const ivaRate = 0.22;
  const totalAgencyRate = agencyCommissionRate * (1 + ivaRate);
  
  const agencyCommission = Math.round(propertyValue[0] * totalAgencyRate);
  const jungleRentCommission = 0;
  const savings = agencyCommission - jungleRentCommission;

  // Format number with dots as thousand separators
  const formatNumber = (num: number) => {
    return num.toLocaleString('it-IT');
  };

  // Parse formatted string to number
  const parseFormattedNumber = (str: string) => {
    return parseInt(str.replace(/\./g, ''), 10) || 0;
  };

  // Handle slider change
  const handleSliderChange = (values: number[]) => {
    setPropertyValue(values);
    setInputValue(formatNumber(values[0]));
    // Check if value matches a preset
    const matchingPreset = PRESETS.find(p => p.value === values[0]);
    setActivePreset(matchingPreset?.key || null);
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
    const matchingPreset = PRESETS.find(p => p.value === num);
    setActivePreset(matchingPreset?.key || null);
  };

  // Handle preset click
  const handlePresetClick = (preset: typeof PRESETS[0]) => {
    setPropertyValue([preset.value]);
    setInputValue(formatNumber(preset.value));
    setActivePreset(preset.key);
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
      <CardHeader className="pb-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-2 rounded-lg bg-primary/10">
            <Calculator className="w-5 h-5 text-primary" />
          </div>
          <CardTitle className="text-lg md:text-xl font-display">
            {t('sellersPage.calculator.title')}
          </CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          {t('sellersPage.calculator.subtitle')}
        </p>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Preset Buttons */}
        <div className="flex gap-2 flex-wrap">
          {PRESETS.map((preset) => (
            <Button
              key={preset.key}
              variant={activePreset === preset.key ? "default" : "outline"}
              size="sm"
              onClick={() => handlePresetClick(preset)}
              className="flex-1 min-w-[100px] transition-all duration-200"
            >
              <Home className="w-3.5 h-3.5 mr-1.5" />
              {t(`sellersPage.calculator.presets.${preset.key}`)}
            </Button>
          ))}
        </div>

        {/* Property Value Input + Slider */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <label className="text-sm font-medium text-foreground whitespace-nowrap">
              {t('sellersPage.calculator.propertyValue')}
            </label>
            <div className="relative flex-1 max-w-[180px]">
              <Euro className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="text"
                inputMode="numeric"
                value={inputValue}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                onKeyDown={(e) => e.key === 'Enter' && handleInputBlur()}
                className="pl-9 text-right font-semibold text-lg"
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
            className="py-4"
          />
          
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>€50k</span>
            <span>€2M</span>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-4">
          {/* Agency */}
          <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/20">
            <div className="flex items-center gap-2 mb-2">
              <Percent className="w-4 h-4 text-destructive" />
              <span className="text-xs font-medium text-muted-foreground">
                {t('sellersPage.calculator.agency')}
              </span>
            </div>
            <p className="text-lg font-bold text-destructive">
              {formatCurrency(agencyCommission)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              4% + IVA
            </p>
          </div>
          
          {/* Jungle Rent */}
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
            <div className="flex items-center gap-2 mb-2">
              <Building2 className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-muted-foreground">
                Jungle Rent
              </span>
            </div>
            <p className="text-lg font-bold text-primary">
              €0
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {t('sellersPage.calculator.directBuyer')}
            </p>
          </div>
        </div>

        {/* Savings Result */}
        <AnimatePresence mode="wait">
          <motion.div
            key={savings}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="p-6 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <TrendingDown className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-foreground">
                {t('sellersPage.calculator.yourSavings')}
              </span>
            </div>
            <p className="text-3xl md:text-4xl font-display font-bold text-primary text-center">
              {formatCurrency(animatedSavings)}
            </p>
            <p className="text-xs text-muted-foreground text-center mt-2">
              {t('sellersPage.calculator.savingsNote')}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <Button 
          variant="premium" 
          size="lg" 
          className="w-full"
          onClick={onContactClick}
        >
          <Euro className="w-4 h-4 mr-2" />
          {t('sellersPage.calculator.cta')}
        </Button>
      </CardContent>
    </Card>
  );
};
