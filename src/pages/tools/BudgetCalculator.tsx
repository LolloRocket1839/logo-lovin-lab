import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
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
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { turinAreas, AreaInfo } from "@/data/turinAreas";
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
  shared: { label: "Stanza doppia", multiplier: 0.7 },
  single: { label: "Stanza singola", multiplier: 1 },
  studio: { label: "Monolocale", multiplier: 1.4 }
};

// Fixed costs
const fixedCosts = {
  gttUnder26: 25,
  gttStandard: 42,
  utilities: 80,
  internet: 25,
  groceriesMin: 150,
  groceriesMax: 300
};

const CHART_COLORS = [
  'hsl(var(--primary))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))'
];

const BudgetCalculator = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('it') ? 'it' : 'en';
  
  // State
  const [selectedArea, setSelectedArea] = useState<string>("San Salvario");
  const [housingType, setHousingType] = useState<keyof typeof housingTypes>("single");
  const [hasGTT, setHasGTT] = useState(true);
  const [isUnder26, setIsUnder26] = useState(true);
  const [groceries, setGroceries] = useState([200]);
  const [extras, setExtras] = useState([100]);
  
  // Get selected area data
  const areaData = useMemo(() => {
    return areasWithRent.find(a => a.name === selectedArea) || areasWithRent[0];
  }, [selectedArea]);
  
  // Calculate rent based on housing type
  const rent = useMemo(() => {
    return Math.round(areaData.avgRent * housingTypes[housingType].multiplier);
  }, [areaData, housingType]);
  
  // Calculate transport cost
  const transportCost = useMemo(() => {
    if (!hasGTT) return 0;
    return isUnder26 ? fixedCosts.gttUnder26 : fixedCosts.gttStandard;
  }, [hasGTT, isUnder26]);
  
  // Calculate total
  const budgetBreakdown = useMemo(() => {
    const breakdown = [
      { name: currentLang === 'it' ? 'Affitto' : 'Rent', value: rent, icon: Home },
      { name: currentLang === 'it' ? 'Bollette' : 'Utilities', value: fixedCosts.utilities, icon: Zap },
      { name: 'Internet', value: fixedCosts.internet, icon: Zap },
      { name: currentLang === 'it' ? 'Trasporti' : 'Transport', value: transportCost, icon: Bus },
      { name: currentLang === 'it' ? 'Spesa' : 'Groceries', value: groceries[0], icon: ShoppingCart },
      { name: 'Extra', value: extras[0], icon: Coffee }
    ];
    
    return breakdown;
  }, [rent, transportCost, groceries, extras, currentLang]);
  
  const totalBudget = useMemo(() => {
    return budgetBreakdown.reduce((sum, item) => sum + item.value, 0);
  }, [budgetBreakdown]);
  
  // Comparison data for bar chart
  const comparisonData = useMemo(() => {
    return areasWithRent
      .map(area => ({
        name: area.name,
        budget: Math.round(
          area.avgRent * housingTypes[housingType].multiplier + 
          fixedCosts.utilities + 
          fixedCosts.internet + 
          transportCost + 
          groceries[0] + 
          extras[0]
        )
      }))
      .sort((a, b) => a.budget - b.budget);
  }, [housingType, transportCost, groceries, extras]);

  return (
    <>
      <Helmet>
        <title>{currentLang === 'it' ? 'Calcolatore Budget Studente | Jungle Rent' : 'Student Budget Calculator | Jungle Rent'}</title>
        <meta name="description" content={currentLang === 'it' 
          ? 'Calcola quanto costa vivere a Torino come studente. Stima affitto, bollette, trasporti e spese per ogni quartiere.'
          : 'Calculate living costs in Turin as a student. Estimate rent, bills, transport and expenses for each neighborhood.'
        } />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20">
        {/* Header */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <Link 
              to="/studenti/strumenti" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {currentLang === 'it' ? 'Torna agli strumenti' : 'Back to tools'}
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calculator className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {currentLang === 'it' ? 'Calcolatore Budget Mensile' : 'Monthly Budget Calculator'}
                </h1>
                <p className="text-muted-foreground">
                  {currentLang === 'it' ? 'Scopri quanto costa vivere in ogni quartiere' : 'Find out living costs in each neighborhood'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Left: Inputs */}
              <div className="space-y-6">
                {/* Area Selection */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
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
                    
                    {/* Area info */}
                    <div className="mt-4 p-3 bg-accent/50 rounded-lg">
                      <p className="text-sm text-muted-foreground mb-2">
                        {areaData.description[currentLang]}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {areaData.characteristics.map((char, i) => (
                          <Badge key={i} variant="secondary" className="text-xs">
                            {char}
                          </Badge>
                        ))}
                      </div>
                      <div className="mt-2 text-xs text-muted-foreground">
                        <span className="font-medium">Politecnico:</span> {areaData.distance.polito} • 
                        <span className="font-medium ml-2">UniTo:</span> {areaData.distance.unito}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Housing Type */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Home className="w-5 h-5 text-primary" />
                      {currentLang === 'it' ? 'Tipo alloggio' : 'Housing type'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-3">
                      {Object.entries(housingTypes).map(([key, { label }]) => (
                        <Button
                          key={key}
                          variant={housingType === key ? "default" : "outline"}
                          className="h-auto py-3 flex flex-col gap-1"
                          onClick={() => setHousingType(key as keyof typeof housingTypes)}
                        >
                          <span className="text-xs">{label}</span>
                          <span className="text-lg font-bold">
                            €{Math.round(areaData.avgRent * housingTypes[key as keyof typeof housingTypes].multiplier)}
                          </span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Transport */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Bus className="w-5 h-5 text-primary" />
                      {currentLang === 'it' ? 'Trasporti' : 'Transport'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="gtt" className="flex items-center gap-2">
                        {currentLang === 'it' ? 'Abbonamento GTT' : 'GTT Subscription'}
                        <Tooltip>
                          <TooltipTrigger>
                            <Info className="w-4 h-4 text-muted-foreground" />
                          </TooltipTrigger>
                          <TooltipContent>
                            {currentLang === 'it' 
                              ? 'Metro + bus + tram illimitati' 
                              : 'Unlimited metro + bus + tram'
                            }
                          </TooltipContent>
                        </Tooltip>
                      </Label>
                      <Switch 
                        id="gtt" 
                        checked={hasGTT} 
                        onCheckedChange={setHasGTT} 
                      />
                    </div>
                    
                    {hasGTT && (
                      <div className="flex items-center justify-between">
                        <Label htmlFor="under26" className="flex items-center gap-2">
                          Under 26
                          <Badge variant="secondary" className="text-xs">
                            {currentLang === 'it' ? 'Risparmi' : 'Save'} €17/mese
                          </Badge>
                        </Label>
                        <Switch 
                          id="under26" 
                          checked={isUnder26} 
                          onCheckedChange={setIsUnder26} 
                        />
                      </div>
                    )}
                    
                    <div className="p-3 bg-accent/50 rounded-lg text-center">
                      <span className="text-2xl font-bold text-foreground">€{transportCost}</span>
                      <span className="text-muted-foreground">/mese</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Groceries & Extras */}
                <Card>
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <ShoppingCart className="w-5 h-5 text-primary" />
                      {currentLang === 'it' ? 'Spese variabili' : 'Variable expenses'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label>{currentLang === 'it' ? 'Spesa alimentare' : 'Groceries'}</Label>
                        <span className="font-semibold">€{groceries[0]}</span>
                      </div>
                      <Slider
                        value={groceries}
                        onValueChange={setGroceries}
                        min={100}
                        max={400}
                        step={25}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>€100</span>
                        <span>€400</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-2">
                        <Label className="flex items-center gap-2">
                          Extra
                          <Tooltip>
                            <TooltipTrigger>
                              <Info className="w-4 h-4 text-muted-foreground" />
                            </TooltipTrigger>
                            <TooltipContent>
                              {currentLang === 'it' 
                                ? 'Uscite, palestra, hobby, etc.' 
                                : 'Going out, gym, hobbies, etc.'
                              }
                            </TooltipContent>
                          </Tooltip>
                        </Label>
                        <span className="font-semibold">€{extras[0]}</span>
                      </div>
                      <Slider
                        value={extras}
                        onValueChange={setExtras}
                        min={0}
                        max={300}
                        step={25}
                        className="w-full"
                      />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>€0</span>
                        <span>€300</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Right: Results */}
              <div className="space-y-6">
                {/* Total */}
                <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-background">
                  <CardContent className="pt-6">
                    <div className="text-center mb-6">
                      <p className="text-muted-foreground mb-2">
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
                    
                    {/* Breakdown list */}
                    <div className="space-y-2">
                      {budgetBreakdown.map((item, index) => (
                        <div 
                          key={item.name} 
                          className="flex items-center justify-between py-2 border-b border-border/50 last:border-0"
                        >
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: CHART_COLORS[index % CHART_COLORS.length] }}
                            />
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <span className="font-medium">€{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Pie Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">
                      {currentLang === 'it' ? 'Distribuzione spese' : 'Expense distribution'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[250px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={budgetBreakdown}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={100}
                            paddingAngle={2}
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            labelLine={false}
                          >
                            {budgetBreakdown.map((_, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={CHART_COLORS[index % CHART_COLORS.length]} 
                              />
                            ))}
                          </Pie>
                          <RechartsTooltip 
                            formatter={(value: number) => [`€${value}`, '']}
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Comparison Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <TrendingUp className="w-5 h-5 text-primary" />
                      {currentLang === 'it' ? 'Confronto quartieri' : 'Neighborhood comparison'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={comparisonData} layout="vertical">
                          <XAxis type="number" tickFormatter={(v) => `€${v}`} />
                          <YAxis 
                            type="category" 
                            dataKey="name" 
                            width={80}
                            tick={{ fontSize: 12 }}
                          />
                          <RechartsTooltip 
                            formatter={(value: number) => [`€${value}/mese`, 'Budget']}
                          />
                          <Bar 
                            dataKey="budget" 
                            fill="hsl(var(--primary))"
                            radius={[0, 4, 4, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

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
                        ? 'Iscriviti alla waitlist e ti aiuteremo a trovare la soluzione perfetta'
                        : 'Join the waitlist and we\'ll help you find the perfect solution'
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