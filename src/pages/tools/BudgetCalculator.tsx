import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import { 
  Calculator, 
  Home, 
  Zap, 
  Bus, 
  ShoppingCart, 
  Coffee, 
  ArrowLeft,
  MapPin,
  TrendingUp,
  Info,
  Smartphone,
  BookOpen,
  Dumbbell,
  Tv,
  PiggyBank,
  Thermometer,
  Settings2,
  Users,
  Globe,
  Wallet,
  Lightbulb
} from "lucide-react";
import { AIBudgetAdvisor } from "@/components/tools/AIBudgetAdvisor";
import { RentPriceHistory } from "@/components/tools/RentPriceHistory";
import { BudgetShareExport } from "@/components/tools/BudgetShareExport";
import { NeighborhoodRadarChart } from "@/components/tools/NeighborhoodRadarChart";
import { WhatIfSimulator } from "@/components/tools/WhatIfSimulator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { turinAreas } from "@/data/turinAreas";
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  LineChart,
  Line,
  Legend
} from "recharts";

// Extended area data with numeric rent values
const areasWithRent = turinAreas.map(area => {
  const rentRange = area.avgRent.replace('€', '').split('-');
  const minRent = parseInt(rentRange[0]);
  const maxRent = parseInt(rentRange[1] || rentRange[0]);
  return {
    ...area,
    minRent,
    maxRent,
    avgRent: Math.round((minRent + maxRent) / 2)
  };
});

// Housing type multipliers
const housingTypes = {
  shared: { label: { it: "Stanza doppia", en: "Shared room" }, multiplier: 0.7 },
  single: { label: { it: "Stanza singola", en: "Single room" }, multiplier: 1 },
  studio: { label: { it: "Monolocale", en: "Studio" }, multiplier: 1.4 }
};

// Seasonal utility costs
const getSeasonalDefaults = () => {
  const month = new Date().getMonth();
  // Winter: Nov-Feb (0=Jan, 10=Nov, 11=Dec, 1=Feb)
  if (month >= 10 || month <= 1) {
    return { electricity: 55, gas: 75, season: 'winter' as const };
  }
  // Summer: Jun-Aug
  if (month >= 5 && month <= 7) {
    return { electricity: 40, gas: 15, season: 'summer' as const };
  }
  // Spring/Fall
  return { electricity: 45, gas: 35, season: 'spring' as const };
};

// Student profile presets
const studentPresets = {
  base: {
    label: { it: "Studente Base", en: "Standard Student" },
    description: { it: "€750-900/mese", en: "€750-900/month" },
    icon: Users,
    values: {
      housingType: "single" as const,
      groceries: 200,
      eatingOut: 50,
      phone: 15,
      study: 30,
      gym: 30,
      subscriptions: 15,
      extras: 80,
      savingTarget: 50
    }
  },
  international: {
    label: { it: "Studente Internazionale", en: "International Student" },
    description: { it: "€900-1100/mese", en: "€900-1100/month" },
    icon: Globe,
    values: {
      housingType: "single" as const,
      groceries: 220,
      eatingOut: 80,
      phone: 20,
      study: 50,
      gym: 35,
      subscriptions: 20,
      extras: 120,
      savingTarget: 100
    }
  },
  minimal: {
    label: { it: "Budget Minimo", en: "Minimum Budget" },
    description: { it: "€550-700/mese", en: "€550-700/month" },
    icon: Wallet,
    values: {
      housingType: "shared" as const,
      groceries: 150,
      eatingOut: 20,
      phone: 10,
      study: 15,
      gym: 0,
      subscriptions: 10,
      extras: 40,
      savingTarget: 0
    }
  }
};

const CHART_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
  'hsl(var(--chart-1))'
];

// Contextual tips
const getContextualTips = (
  breakdown: { rent: number; groceries: number; transport: number; gas: number },
  lang: 'it' | 'en'
): { category: string; tip: string }[] => {
  const tips: { category: string; tip: string }[] = [];
  
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

const BudgetCalculator = () => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language?.startsWith('it') ? 'it' : 'en') as 'it' | 'en';
  const [searchParams] = useSearchParams();
  
  // Mode: simple or advanced
  const [mode, setMode] = useState<"simple" | "advanced">("simple");
  
  // Seasonal defaults
  const seasonalDefaults = useMemo(() => getSeasonalDefaults(), []);
  
  // State with URL params initialization
  const [selectedArea, setSelectedArea] = useState<string>(() => {
    const area = searchParams.get("area");
    return area && areasWithRent.some(a => a.name === area) ? area : "San Salvario";
  });
  
  const [housingType, setHousingType] = useState<keyof typeof housingTypes>(() => {
    const housing = searchParams.get("housing") as keyof typeof housingTypes;
    return housing && housing in housingTypes ? housing : "single";
  });
  
  // Manual rent option
  const [useManualRent, setUseManualRent] = useState(false);
  const [manualRent, setManualRent] = useState<number>(400);
  
  // Transport
  const [hasGTT, setHasGTT] = useState(() => searchParams.get("gtt") !== "0");
  const [isUnder26, setIsUnder26] = useState(() => searchParams.get("under26") !== "0");
  
  // Utilities (seasonal aware)
  const [electricity, setElectricity] = useState([seasonalDefaults.electricity]);
  const [gas, setGas] = useState([seasonalDefaults.gas]);
  const [water, setWater] = useState([15]);
  const [internet, setInternet] = useState([25]);
  
  // Communications
  const [phone, setPhone] = useState([15]);
  
  // Food
  const [groceries, setGroceries] = useState(() => {
    const g = parseInt(searchParams.get("groceries") || "200");
    return [isNaN(g) ? 200 : Math.max(100, Math.min(400, g))];
  });
  const [eatingOut, setEatingOut] = useState([50]);
  
  // Study
  const [studyMaterials, setStudyMaterials] = useState([30]);
  
  // Leisure
  const [extras, setExtras] = useState(() => {
    const e = parseInt(searchParams.get("extras") || "80");
    return [isNaN(e) ? 80 : Math.max(0, Math.min(300, e))];
  });
  const [gym, setGym] = useState([30]);
  const [subscriptions, setSubscriptions] = useState([15]);
  
  // Saving target
  const [savingTarget, setSavingTarget] = useState([50]);
  
  // Get selected area data
  const areaData = useMemo(() => {
    return areasWithRent.find(a => a.name === selectedArea) || areasWithRent[0];
  }, [selectedArea]);
  
  // Calculate rent based on housing type or manual
  const rent = useMemo(() => {
    if (useManualRent) return manualRent;
    return Math.round(areaData.avgRent * housingTypes[housingType].multiplier);
  }, [areaData, housingType, useManualRent, manualRent]);
  
  // Calculate transport cost
  const transportCost = useMemo(() => {
    if (!hasGTT) return 0;
    return isUnder26 ? 25 : 42;
  }, [hasGTT, isUnder26]);
  
  // Calculate totals
  const budgetBreakdown = useMemo(() => {
    if (mode === "simple") {
      return [
        { name: currentLang === 'it' ? 'Affitto' : 'Rent', value: rent, icon: Home },
        { name: currentLang === 'it' ? 'Bollette' : 'Utilities', value: 80, icon: Zap },
        { name: 'Internet', value: 25, icon: Zap },
        { name: currentLang === 'it' ? 'Trasporti' : 'Transport', value: transportCost, icon: Bus },
        { name: currentLang === 'it' ? 'Spesa' : 'Groceries', value: groceries[0], icon: ShoppingCart },
        { name: 'Extra', value: extras[0], icon: Coffee }
      ];
    }
    
    // Advanced mode - detailed breakdown
    return [
      { name: currentLang === 'it' ? 'Affitto' : 'Rent', value: rent, icon: Home },
      { name: currentLang === 'it' ? 'Elettricità' : 'Electricity', value: electricity[0], icon: Zap },
      { name: currentLang === 'it' ? 'Gas' : 'Gas', value: gas[0], icon: Thermometer },
      { name: currentLang === 'it' ? 'Acqua' : 'Water', value: water[0], icon: Zap },
      { name: 'Internet', value: internet[0], icon: Zap },
      { name: currentLang === 'it' ? 'Telefono' : 'Phone', value: phone[0], icon: Smartphone },
      { name: currentLang === 'it' ? 'Trasporti' : 'Transport', value: transportCost, icon: Bus },
      { name: currentLang === 'it' ? 'Spesa' : 'Groceries', value: groceries[0], icon: ShoppingCart },
      { name: currentLang === 'it' ? 'Mangiare fuori' : 'Eating out', value: eatingOut[0], icon: Coffee },
      { name: currentLang === 'it' ? 'Studio' : 'Study', value: studyMaterials[0], icon: BookOpen },
      { name: currentLang === 'it' ? 'Palestra' : 'Gym', value: gym[0], icon: Dumbbell },
      { name: currentLang === 'it' ? 'Abbonamenti' : 'Subscriptions', value: subscriptions[0], icon: Tv },
      { name: 'Extra', value: extras[0], icon: Coffee }
    ];
  }, [mode, rent, transportCost, groceries, extras, electricity, gas, water, internet, phone, eatingOut, studyMaterials, gym, subscriptions, currentLang]);
  
  const totalBudget = useMemo(() => {
    return budgetBreakdown.reduce((sum, item) => sum + item.value, 0);
  }, [budgetBreakdown]);
  
  const totalWithSaving = useMemo(() => {
    return totalBudget + savingTarget[0];
  }, [totalBudget, savingTarget]);
  
  // Contextual tips
  const contextualTips = useMemo(() => {
    return getContextualTips({
      rent,
      groceries: groceries[0],
      transport: transportCost,
      gas: gas[0]
    }, currentLang);
  }, [rent, groceries, transportCost, gas, currentLang]);
  
  // 12-month projection with seasonal variation
  const yearlyProjection = useMemo(() => {
    const months = currentLang === 'it' 
      ? ['Gen', 'Feb', 'Mar', 'Apr', 'Mag', 'Giu', 'Lug', 'Ago', 'Set', 'Ott', 'Nov', 'Dic']
      : ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const seasonalGas = [75, 70, 50, 30, 15, 10, 10, 10, 25, 45, 65, 75];
    const seasonalElec = [55, 55, 50, 45, 40, 35, 40, 40, 45, 50, 55, 55];
    const specialCosts = [0, 0, 0, 0, 0, 0, 0, 0, 80, 0, 0, 50]; // Sept: books, Dec: holidays
    
    const baseMonthly = totalBudget - electricity[0] - gas[0];
    
    return months.map((month, i) => ({
      name: month,
      budget: baseMonthly + seasonalGas[i] + seasonalElec[i] + specialCosts[i],
      gas: seasonalGas[i],
      electricity: seasonalElec[i]
    }));
  }, [totalBudget, electricity, gas, currentLang]);
  
  // Comparison data for bar chart
  const comparisonData = useMemo(() => {
    const baseCosts = mode === "simple" 
      ? 105 + transportCost + groceries[0] + extras[0]
      : electricity[0] + gas[0] + water[0] + internet[0] + phone[0] + transportCost + groceries[0] + eatingOut[0] + studyMaterials[0] + gym[0] + subscriptions[0] + extras[0];
    
    return areasWithRent
      .map(area => ({
        name: area.name,
        budget: Math.round(area.avgRent * housingTypes[housingType].multiplier + baseCosts)
      }))
      .sort((a, b) => a.budget - b.budget);
  }, [mode, housingType, transportCost, groceries, extras, electricity, gas, water, internet, phone, eatingOut, studyMaterials, gym, subscriptions]);

  // Apply preset
  const applyPreset = (preset: keyof typeof studentPresets) => {
    const values = studentPresets[preset].values;
    setHousingType(values.housingType);
    setGroceries([values.groceries]);
    setEatingOut([values.eatingOut]);
    setPhone([values.phone]);
    setStudyMaterials([values.study]);
    setGym([values.gym]);
    setSubscriptions([values.subscriptions]);
    setExtras([values.extras]);
    setSavingTarget([values.savingTarget]);
    setMode("advanced");
  };

  return (
    <>
      <Helmet>
        <title>{currentLang === 'it' ? 'Calcolatore Budget Studente Torino | Jungle Rent' : 'Turin Student Budget Calculator | Jungle Rent'}</title>
        <meta name="description" content={currentLang === 'it' 
          ? 'Calcola quanto costa vivere a Torino come studente. Stima affitto, bollette stagionali, trasporti e tutte le spese con consigli AI personalizzati.'
          : 'Calculate living costs in Turin as a student. Estimate rent, seasonal bills, transport and all expenses with personalized AI advice.'
        } />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
        {/* Header */}
        <section className="py-6 md:py-10 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <Link 
              to="/studenti/strumenti" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentLang === 'it' ? 'Torna agli strumenti' : 'Back to tools'}
            </Link>
            
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {currentLang === 'it' ? 'Calcolatore Budget Mensile' : 'Monthly Budget Calculator'}
                </h1>
                <p className="text-muted-foreground">
                  {currentLang === 'it' ? 'Personalizza ogni voce di spesa per un calcolo preciso' : 'Customize every expense for accurate calculation'}
                </p>
              </div>
            </div>
            
            {/* Presets */}
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-3">
                {currentLang === 'it' ? 'Inizia con un profilo:' : 'Start with a profile:'}
              </p>
              <div className="flex flex-wrap gap-3">
                {Object.entries(studentPresets).map(([key, preset]) => {
                  const Icon = preset.icon;
                  return (
                    <Button
                      key={key}
                      variant="outline"
                      className="gap-2 h-auto py-3 px-4"
                      onClick={() => applyPreset(key as keyof typeof studentPresets)}
                    >
                      <Icon className="w-4 h-4 text-primary" />
                      <div className="text-left">
                        <div className="text-sm font-medium">{preset.label[currentLang]}</div>
                        <div className="text-xs text-muted-foreground">{preset.description[currentLang]}</div>
                      </div>
                    </Button>
                  );
                })}
              </div>
            </div>

            {/* Mode Toggle */}
            <Tabs value={mode} onValueChange={(v) => setMode(v as "simple" | "advanced")}>
              <TabsList>
                <TabsTrigger value="simple" className="gap-2">
                  <Calculator className="w-4 h-4" />
                  {currentLang === 'it' ? 'Semplice' : 'Simple'}
                </TabsTrigger>
                <TabsTrigger value="advanced" className="gap-2">
                  <Settings2 className="w-4 h-4" />
                  {currentLang === 'it' ? 'Avanzato' : 'Advanced'}
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Left: Inputs */}
              <div className="space-y-5">
                {/* Area Selection */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <MapPin className="w-5 h-5 text-primary" />
                      {currentLang === 'it' ? 'Quartiere' : 'Neighborhood'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Select value={selectedArea} onValueChange={setSelectedArea}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {areasWithRent.map(area => (
                          <SelectItem key={area.name} value={area.name}>
                            <div className="flex items-center justify-between w-full gap-4">
                              <span>{area.name}</span>
                              <span className="text-xs text-muted-foreground">
                                {area.avgRent}€/mese
                              </span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <div className="mt-3 p-3 bg-accent/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">
                        {areaData.description[currentLang]}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {areaData.characteristics.slice(0, 3).map((char, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {char}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Housing */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Home className="w-5 h-5 text-primary" />
                      {currentLang === 'it' ? 'Alloggio' : 'Housing'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Manual rent toggle */}
                    <div className="flex items-center justify-between">
                      <Label htmlFor="manual-rent" className="text-sm">
                        {currentLang === 'it' ? 'Ho già un affitto' : 'I already have rent'}
                      </Label>
                      <Switch 
                        id="manual-rent" 
                        checked={useManualRent} 
                        onCheckedChange={setUseManualRent} 
                      />
                    </div>
                    
                    {useManualRent ? (
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">€</span>
                        <Input
                          type="number"
                          value={manualRent}
                          onChange={(e) => setManualRent(Math.max(0, parseInt(e.target.value) || 0))}
                          className="text-lg font-semibold"
                          min={0}
                          max={1500}
                        />
                        <span className="text-muted-foreground">/mese</span>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-2">
                        {Object.entries(housingTypes).map(([key, { label }]) => (
                          <Button
                            key={key}
                            variant={housingType === key ? "default" : "outline"}
                            className="h-auto py-2 flex flex-col gap-0.5"
                            onClick={() => setHousingType(key as keyof typeof housingTypes)}
                          >
                            <span className="text-xs">{label[currentLang]}</span>
                            <span className="text-base font-bold">
                              €{Math.round(areaData.avgRent * housingTypes[key as keyof typeof housingTypes].multiplier)}
                            </span>
                          </Button>
                        ))}
                      </div>
                    )}
                    
                    {/* Contextual tip for rent */}
                    {contextualTips.find(t => t.category === 'rent') && (
                      <div className="p-2 bg-primary/5 rounded-lg text-xs text-primary flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        {contextualTips.find(t => t.category === 'rent')?.tip}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Utilities - Only in advanced mode */}
                {mode === "advanced" && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Zap className="w-5 h-5 text-primary" />
                        {currentLang === 'it' ? 'Utenze' : 'Utilities'}
                        <Badge variant="outline" className="ml-auto text-xs">
                          {seasonalDefaults.season === 'winter' ? '❄️ Inverno' : 
                           seasonalDefaults.season === 'summer' ? '☀️ Estate' : '🌸 Mezza stagione'}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label className="flex items-center gap-1">
                            <Zap className="w-3 h-3" />
                            {currentLang === 'it' ? 'Elettricità' : 'Electricity'}
                          </Label>
                          <span className="font-semibold">€{electricity[0]}</span>
                        </div>
                        <Slider value={electricity} onValueChange={setElectricity} min={25} max={100} step={5} />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>€25</span>
                          <span>€100</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label className="flex items-center gap-1">
                            <Thermometer className="w-3 h-3" />
                            {currentLang === 'it' ? 'Gas/Riscaldamento' : 'Gas/Heating'}
                          </Label>
                          <span className="font-semibold">€{gas[0]}</span>
                        </div>
                        <Slider value={gas} onValueChange={setGas} min={0} max={120} step={5} />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>€0</span>
                          <span>€120</span>
                        </div>
                        {contextualTips.find(t => t.category === 'gas') && (
                          <div className="mt-2 p-2 bg-primary/5 rounded-lg text-xs text-primary flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                            {contextualTips.find(t => t.category === 'gas')?.tip}
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>{currentLang === 'it' ? 'Acqua' : 'Water'}</Label>
                          <span className="font-semibold">€{water[0]}</span>
                        </div>
                        <Slider value={water} onValueChange={setWater} min={10} max={30} step={5} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label>Internet</Label>
                          <span className="font-semibold">€{internet[0]}</span>
                        </div>
                        <Slider value={internet} onValueChange={setInternet} min={20} max={40} step={5} />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Transport */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Bus className="w-5 h-5 text-primary" />
                      {currentLang === 'it' ? 'Trasporti' : 'Transport'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="gtt" className="flex items-center gap-2">
                        {currentLang === 'it' ? 'Abbonamento GTT' : 'GTT Subscription'}
                      </Label>
                      <Switch id="gtt" checked={hasGTT} onCheckedChange={setHasGTT} />
                    </div>
                    
                    {hasGTT && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="under26" className="flex items-center gap-2">
                          Under 26
                          <Badge variant="secondary" className="text-xs">
                            {currentLang === 'it' ? 'Risparmi' : 'Save'} €17
                          </Badge>
                        </Label>
                        <Switch id="under26" checked={isUnder26} onCheckedChange={setIsUnder26} />
                      </div>
                    )}
                    
                    <div className="p-3 bg-accent/50 rounded-lg text-center">
                      <span className="text-2xl font-bold text-foreground">€{transportCost}</span>
                      <span className="text-muted-foreground">/mese</span>
                    </div>
                    
                    {contextualTips.find(t => t.category === 'transport') && (
                      <div className="p-2 bg-primary/5 rounded-lg text-xs text-primary flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                        {contextualTips.find(t => t.category === 'transport')?.tip}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Phone - Only in advanced */}
                {mode === "advanced" && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <Smartphone className="w-5 h-5 text-primary" />
                        {currentLang === 'it' ? 'Telefono' : 'Phone'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between mb-2">
                        <Label>{currentLang === 'it' ? 'Piano telefono' : 'Phone plan'}</Label>
                        <span className="font-semibold">€{phone[0]}</span>
                      </div>
                      <Slider value={phone} onValueChange={setPhone} min={5} max={40} step={5} />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>€5</span>
                        <span>€40</span>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Food */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      {currentLang === 'it' ? 'Alimentazione' : 'Food'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-5">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>{currentLang === 'it' ? 'Spesa supermercato' : 'Groceries'}</Label>
                        <span className="font-semibold">€{groceries[0]}</span>
                      </div>
                      <Slider value={groceries} onValueChange={setGroceries} min={100} max={400} step={25} />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>€100</span>
                        <span>€400</span>
                      </div>
                      {contextualTips.find(t => t.category === 'groceries') && (
                        <div className="mt-2 p-2 bg-primary/5 rounded-lg text-xs text-primary flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 flex-shrink-0 mt-0.5" />
                          {contextualTips.find(t => t.category === 'groceries')?.tip}
                        </div>
                      )}
                    </div>
                    
                    {mode === "advanced" && (
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label className="flex items-center gap-1">
                            <Coffee className="w-3 h-3" />
                            {currentLang === 'it' ? 'Mangiare fuori' : 'Eating out'}
                          </Label>
                          <span className="font-semibold">€{eatingOut[0]}</span>
                        </div>
                        <Slider value={eatingOut} onValueChange={setEatingOut} min={0} max={200} step={10} />
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Study & Leisure - Only in advanced */}
                {mode === "advanced" && (
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <BookOpen className="w-5 h-5 text-primary" />
                        {currentLang === 'it' ? 'Studio & Tempo libero' : 'Study & Leisure'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5">
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label className="flex items-center gap-1">
                            <BookOpen className="w-3 h-3" />
                            {currentLang === 'it' ? 'Libri/Materiali' : 'Books/Materials'}
                          </Label>
                          <span className="font-semibold">€{studyMaterials[0]}</span>
                        </div>
                        <Slider value={studyMaterials} onValueChange={setStudyMaterials} min={0} max={100} step={10} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label className="flex items-center gap-1">
                            <Dumbbell className="w-3 h-3" />
                            {currentLang === 'it' ? 'Palestra/Sport' : 'Gym/Sports'}
                          </Label>
                          <span className="font-semibold">€{gym[0]}</span>
                        </div>
                        <Slider value={gym} onValueChange={setGym} min={0} max={60} step={5} />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-2">
                          <Label className="flex items-center gap-1">
                            <Tv className="w-3 h-3" />
                            {currentLang === 'it' ? 'Abbonamenti (Netflix, etc.)' : 'Subscriptions'}
                          </Label>
                          <span className="font-semibold">€{subscriptions[0]}</span>
                        </div>
                        <Slider value={subscriptions} onValueChange={setSubscriptions} min={0} max={50} step={5} />
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Extras */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Coffee className="w-5 h-5 text-primary" />
                      Extra
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-2">
                      <Label className="flex items-center gap-2">
                        {currentLang === 'it' ? 'Uscite, hobby, altro' : 'Going out, hobbies, misc'}
                      </Label>
                      <span className="font-semibold">€{extras[0]}</span>
                    </div>
                    <Slider value={extras} onValueChange={setExtras} min={0} max={300} step={10} />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>€0</span>
                      <span>€300</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Saving Target - Only in advanced */}
                {mode === "advanced" && (
                  <Card className="border-emerald-500/30 bg-emerald-500/5">
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center gap-2 text-base text-emerald-600">
                        <PiggyBank className="w-5 h-5" />
                        {currentLang === 'it' ? 'Obiettivo risparmio' : 'Saving target'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between mb-2">
                        <Label>{currentLang === 'it' ? 'Risparmio mensile' : 'Monthly savings'}</Label>
                        <span className="font-semibold text-emerald-600">€{savingTarget[0]}</span>
                      </div>
                      <Slider value={savingTarget} onValueChange={setSavingTarget} min={0} max={300} step={25} />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>€0</span>
                        <span>€300</span>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>

              {/* Right: Results */}
              <div className="space-y-5">
                {/* Total */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                  <CardContent className="pt-6">
                    <div className="text-center mb-4">
                      <p className="text-muted-foreground mb-1">
                        {currentLang === 'it' 
                          ? `Budget mensile per vivere a ${selectedArea}` 
                          : `Monthly budget to live in ${selectedArea}`
                        }
                      </p>
                      <div className="text-5xl font-bold text-primary">
                        €{totalBudget}
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {currentLang === 'it' ? 'al mese' : 'per month'}
                      </p>
                    </div>
                    
                    {/* Saving goal summary */}
                    {mode === "advanced" && savingTarget[0] > 0 && (
                      <div className="p-4 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-center mb-4">
                        <p className="text-sm text-muted-foreground mb-1">
                          {currentLang === 'it' ? 'Per risparmiare' : 'To save'} €{savingTarget[0]}/mese
                        </p>
                        <p className="text-lg font-bold text-emerald-600">
                          {currentLang === 'it' ? 'Reddito necessario:' : 'Required income:'} €{totalWithSaving}
                        </p>
                        <p className="text-xs text-muted-foreground mt-2">
                          💡 {currentLang === 'it' 
                            ? 'Borsa EDISU + lavoro 10h/sett ≈ €1000-1200/mese' 
                            : 'EDISU scholarship + 10h/week job ≈ €1000-1200/month'}
                        </p>
                      </div>
                    )}
                    
                    {/* Breakdown list */}
                    <div className="space-y-1.5 max-h-[280px] overflow-y-auto pr-1">
                      {budgetBreakdown.map((item, index) => (
                        <div 
                          key={item.name} 
                          className="flex items-center justify-between py-1.5 border-b border-border/50 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-2.5 h-2.5 rounded-full" 
                              style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                            />
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <span className="font-medium text-sm">€{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Share & Export */}
                <BudgetShareExport
                  selectedArea={selectedArea}
                  housingType={housingType}
                  totalBudget={totalBudget}
                  breakdown={budgetBreakdown}
                  hasGTT={hasGTT}
                  isUnder26={isUnder26}
                  groceries={groceries[0]}
                  extras={extras[0]}
                  language={currentLang}
                />

                {/* Pie Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-base">
                      {currentLang === 'it' ? 'Distribuzione spese' : 'Expense distribution'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[220px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={budgetBreakdown.filter(item => item.value > 0)}
                            cx="50%"
                            cy="50%"
                            innerRadius={50}
                            outerRadius={85}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name.split(' ')[0]} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {budgetBreakdown.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                            ))}
                          </Pie>
                          <RechartsTooltip formatter={(value: number) => [`€${value}`, '']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* What-If Simulator */}
                <WhatIfSimulator
                  currentRent={rent}
                  currentGroceries={groceries[0]}
                  currentGym={gym[0]}
                  housingType={housingType}
                  selectedArea={selectedArea}
                  language={currentLang}
                  onApplyScenario={(changes) => {
                    if (changes.housingType) setHousingType(changes.housingType);
                    if (changes.groceries !== undefined) setGroceries([changes.groceries]);
                    if (changes.gym !== undefined) setGym([changes.gym]);
                  }}
                />
                {mode === "advanced" && (
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="flex items-center gap-2 text-base">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        {currentLang === 'it' ? 'Proiezione 12 mesi' : '12-Month Projection'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={yearlyProjection}>
                            <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                            <YAxis tickFormatter={(v) => `€${v}`} tick={{ fontSize: 11 }} />
                            <RechartsTooltip formatter={(value: number) => [`€${value}`, '']} />
                            <Line 
                              type="monotone" 
                              dataKey="budget" 
                              stroke="hsl(var(--primary))" 
                              strokeWidth={2}
                              dot={{ fill: "hsl(var(--primary))", strokeWidth: 0, r: 3 }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                      <p className="text-xs text-muted-foreground text-center mt-2">
                        {currentLang === 'it' 
                          ? '📊 Include variazioni stagionali bollette e spese extra (libri a settembre, festività a dicembre)'
                          : '📊 Includes seasonal utility variations and extra costs (books in September, holidays in December)'}
                      </p>
                    </CardContent>
                  </Card>
                )}

                {/* Comparison Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <TrendingUp className="w-4 h-4 text-primary" />
                      {currentLang === 'it' ? 'Confronto quartieri' : 'Neighborhood comparison'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[280px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData} layout="vertical">
                          <XAxis type="number" tickFormatter={(v) => `€${v}`} />
                          <YAxis type="category" dataKey="name" width={75} tick={{ fontSize: 11 }} />
                          <RechartsTooltip formatter={(value: number) => [`€${value}/mese`, 'Budget']} />
                          <Bar dataKey="budget" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Rent Price History Dashboard */}
                <RentPriceHistory 
                  selectedArea={selectedArea}
                  onAreaChange={setSelectedArea}
                />

                {/* Neighborhood Radar Comparison */}
                <NeighborhoodRadarChart
                  selectedArea={selectedArea}
                  housingType={housingType}
                  language={currentLang}
                  onAreaChange={setSelectedArea}
                />

                {/* AI Budget Advisor */}
                <AIBudgetAdvisor
                  selectedArea={selectedArea}
                  housingType={housingType}
                  totalBudget={totalBudget}
                  breakdown={{
                    affitto: rent,
                    bollette: mode === "advanced" 
                      ? electricity[0] + gas[0] + water[0] + internet[0] 
                      : 105,
                    trasporti: transportCost,
                    spesa: groceries[0] + (mode === "advanced" ? eatingOut[0] : 0),
                    extra: extras[0] + (mode === "advanced" ? gym[0] + subscriptions[0] + studyMaterials[0] : 0)
                  }}
                  language={currentLang}
                  savingTarget={savingTarget[0]}
                />

                {/* CTA */}
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="pt-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">
                      {currentLang === 'it' 
                        ? 'Vuoi trovare casa in questo budget?' 
                        : 'Want to find housing in this budget?'
                      }
                    </h3>
                    <p className="text-sm opacity-90 mb-4">
                      {currentLang === 'it' 
                        ? 'Iscriviti alla waitlist per trovare la soluzione perfetta'
                        : 'Join the waitlist to find the perfect solution'
                      }
                    </p>
                    <Link to="/studenti">
                      <Button variant="secondary" size="lg">
                        {currentLang === 'it' ? 'Iscriviti alla waitlist' : 'Join the waitlist'}
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
};

export default BudgetCalculator;
