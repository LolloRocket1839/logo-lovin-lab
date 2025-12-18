import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Users, UtensilsCrossed, Dumbbell, TrendingDown, Check, ArrowRight, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WhatIfSimulatorProps {
  currentRent: number;
  currentGroceries: number;
  currentGym: number;
  housingType: "shared" | "single" | "studio";
  selectedArea: string;
  language: "it" | "en";
  onApplyScenario: (changes: {
    housingType?: "shared" | "single" | "studio";
    groceries?: number;
    gym?: number;
  }) => void;
}

const translations = {
  it: {
    title: '"E se...?" Simulatore Scenari',
    subtitle: "Scopri quanto potresti risparmiare",
    totalSavings: "Risparmio potenziale totale",
    perMonth: "/mese",
    perYear: "/anno",
    apply: "Applica modifiche",
    applied: "Modifiche applicate!",
    before: "Ora",
    after: "Dopo",
    housing: "Alloggio",
    food: "Cibo",
    gym: "Palestra",
    housingScenario: {
      single: {
        title: "Passa a stanza doppia",
        description: "Condividi la camera con un altro studente",
        tip: "Le doppie costano circa 30% in meno delle singole"
      },
      studio: {
        title: "Passa a stanza in appartamento",
        description: "Lascia il monolocale e cerca una stanza singola",
        tip: "Una singola costa €150-200 in meno al mese"
      },
      shared: {
        title: "Già in stanza condivisa",
        description: "Stai già risparmiando con la doppia!",
        tip: ""
      }
    },
    mensa: {
      title: "Pranzi in mensa EDISU",
      description: "Pasto completo €3-5 con ISEE ridotto",
      tip: "20 pranzi/mese = €90 risparmio vs cucinare"
    },
    gymScenario: {
      title: "Rinuncia alla palestra privata",
      description: "CUS Torino gratis per studenti PoliTo/UniTo",
      tip: "Palestre universitarie + corsi fitness inclusi"
    },
    notApplicable: "Non applicabile",
    alreadyOptimal: "Già ottimizzato",
    noGym: "Nessun costo palestra",
    warning: "Richiede cambiare alloggio"
  },
  en: {
    title: '"What if...?" Scenario Simulator',
    subtitle: "Discover how much you could save",
    totalSavings: "Total potential savings",
    perMonth: "/month",
    perYear: "/year",
    apply: "Apply changes",
    applied: "Changes applied!",
    before: "Now",
    after: "After",
    housing: "Housing",
    food: "Food",
    gym: "Gym",
    housingScenario: {
      single: {
        title: "Switch to shared room",
        description: "Share the bedroom with another student",
        tip: "Shared rooms cost about 30% less than singles"
      },
      studio: {
        title: "Move to shared apartment",
        description: "Leave the studio and find a single room",
        tip: "A single room costs €150-200 less per month"
      },
      shared: {
        title: "Already in shared room",
        description: "You're already saving with a shared room!",
        tip: ""
      }
    },
    mensa: {
      title: "Eat at EDISU canteen",
      description: "Full meal €3-5 with reduced ISEE",
      tip: "20 lunches/month = €90 savings vs cooking"
    },
    gymScenario: {
      title: "Skip private gym",
      description: "CUS Turin free for PoliTo/UniTo students",
      tip: "University gyms + fitness classes included"
    },
    notApplicable: "Not applicable",
    alreadyOptimal: "Already optimal",
    noGym: "No gym cost",
    warning: "Requires changing accommodation"
  }
};

export const WhatIfSimulator = ({
  currentRent,
  currentGroceries,
  currentGym,
  housingType,
  selectedArea,
  language,
  onApplyScenario
}: WhatIfSimulatorProps) => {
  const t = translations[language];
  
  const [housingActive, setHousingActive] = useState(false);
  const [mensaActive, setMensaActive] = useState(false);
  const [gymActive, setGymActive] = useState(false);
  const [applied, setApplied] = useState(false);
  
  // Get housing scenario text based on current type
  const housingScenario = t.housingScenario[housingType];

  // Calculate savings for each housing scenario
  const housingSavings = useMemo(() => {
    if (housingType === "shared") return 0; // Already optimal
    if (housingType === "single") {
      // Single → Shared room: ~30% savings
      return Math.round(currentRent * 0.3);
    }
    if (housingType === "studio") {
      // Studio → Single room: ~€150-200 savings (studio typically €500-600, single €350-400)
      return Math.round(currentRent * 0.35);
    }
    return 0;
  }, [currentRent, housingType]);

  const mensaSavings = 90; // Fixed estimate: 20 meals × €4.50 saved

  const gymSavings = currentGym;

  // Total active savings
  const totalSavings = useMemo(() => {
    let total = 0;
    if (housingActive && housingType !== "shared") total += housingSavings;
    if (mensaActive) total += mensaSavings;
    if (gymActive && currentGym > 0) total += gymSavings;
    return total;
  }, [housingActive, mensaActive, gymActive, housingSavings, mensaSavings, gymSavings, housingType, currentGym]);

  const canApplyHousing = housingType !== "shared";
  const canApplyGym = currentGym > 0;

  const handleApply = () => {
    const changes: Parameters<typeof onApplyScenario>[0] = {};
    
    if (housingActive && canApplyHousing) {
      // Single → Shared, Studio → Single
      changes.housingType = housingType === "single" ? "shared" : "single";
    }
    if (mensaActive) {
      changes.groceries = Math.max(100, currentGroceries - mensaSavings);
    }
    if (gymActive && canApplyGym) {
      changes.gym = 0;
    }
    
    onApplyScenario(changes);
    setApplied(true);
    setTimeout(() => setApplied(false), 2000);
  };

  // Before/After comparison data
  const comparisonData = useMemo(() => {
    const beforeRent = currentRent;
    const afterRent = housingActive && canApplyHousing ? currentRent - housingSavings : currentRent;
    
    const beforeFood = currentGroceries;
    const afterFood = mensaActive ? Math.max(100, currentGroceries - mensaSavings) : currentGroceries;
    
    const beforeGym = currentGym;
    const afterGym = gymActive && canApplyGym ? 0 : currentGym;
    
    return {
      housing: { before: beforeRent, after: afterRent },
      food: { before: beforeFood, after: afterFood },
      gym: { before: beforeGym, after: afterGym },
      total: { 
        before: beforeRent + beforeFood + beforeGym, 
        after: afterRent + afterFood + afterGym 
      }
    };
  }, [currentRent, currentGroceries, currentGym, housingActive, mensaActive, gymActive, housingSavings, mensaSavings, canApplyHousing, canApplyGym]);

  const scenarios = [
    {
      id: "housing",
      icon: Users,
      title: housingScenario.title,
      description: housingScenario.description,
      tip: housingScenario.tip,
      savings: housingSavings,
      active: housingActive,
      setActive: setHousingActive,
      applicable: canApplyHousing,
      disabledReason: t.alreadyOptimal,
      showWarning: canApplyHousing
    },
    {
      id: "mensa",
      icon: UtensilsCrossed,
      title: t.mensa.title,
      description: t.mensa.description,
      tip: t.mensa.tip,
      savings: mensaSavings,
      active: mensaActive,
      setActive: setMensaActive,
      applicable: true,
      disabledReason: null,
      showWarning: false
    },
    {
      id: "gym",
      icon: Dumbbell,
      title: t.gymScenario.title,
      description: t.gymScenario.description,
      tip: t.gymScenario.tip,
      savings: gymSavings,
      active: gymActive,
      setActive: setGymActive,
      applicable: canApplyGym,
      disabledReason: t.noGym,
      showWarning: false
    }
  ];

  // Helper to calculate bar width percentage
  const maxValue = Math.max(comparisonData.total.before, 1);
  const getBarWidth = (value: number) => Math.max((value / maxValue) * 100, 2);

  return (
    <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-background overflow-hidden">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <span className="text-foreground">{t.title}</span>
            <p className="text-xs font-normal text-muted-foreground mt-0.5">{t.subtitle}</p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Before/After Bar Chart Comparison */}
        <AnimatePresence mode="wait">
          {totalSavings > 0 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-3"
            >
              {/* Legend */}
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-muted-foreground/40" />
                    {t.before}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-emerald-500" />
                    {t.after}
                  </span>
                </div>
                <span className="text-emerald-600 font-medium">
                  -€{totalSavings}{t.perMonth}
                </span>
              </div>

              {/* Bar comparisons */}
              <div className="space-y-2.5">
                {/* Housing */}
                {comparisonData.housing.before !== comparisonData.housing.after && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{t.housing}</span>
                      <span className="text-emerald-600">-€{comparisonData.housing.before - comparisonData.housing.after}</span>
                    </div>
                    <div className="relative h-5 flex gap-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getBarWidth(comparisonData.housing.before)}%` }}
                        className="h-full rounded-l bg-muted-foreground/30 flex items-center justify-end pr-1.5"
                      >
                        <span className="text-[10px] text-muted-foreground font-medium">€{comparisonData.housing.before}</span>
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getBarWidth(comparisonData.housing.after)}%` }}
                        transition={{ delay: 0.1 }}
                        className="h-full rounded-r bg-emerald-500 flex items-center justify-end pr-1.5"
                      >
                        <span className="text-[10px] text-white font-medium">€{comparisonData.housing.after}</span>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Food */}
                {comparisonData.food.before !== comparisonData.food.after && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{t.food}</span>
                      <span className="text-emerald-600">-€{comparisonData.food.before - comparisonData.food.after}</span>
                    </div>
                    <div className="relative h-5 flex gap-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getBarWidth(comparisonData.food.before)}%` }}
                        className="h-full rounded-l bg-muted-foreground/30 flex items-center justify-end pr-1.5"
                      >
                        <span className="text-[10px] text-muted-foreground font-medium">€{comparisonData.food.before}</span>
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getBarWidth(comparisonData.food.after)}%` }}
                        transition={{ delay: 0.1 }}
                        className="h-full rounded-r bg-emerald-500 flex items-center justify-end pr-1.5"
                      >
                        <span className="text-[10px] text-white font-medium">€{comparisonData.food.after}</span>
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* Gym */}
                {comparisonData.gym.before !== comparisonData.gym.after && comparisonData.gym.before > 0 && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{t.gym}</span>
                      <span className="text-emerald-600">-€{comparisonData.gym.before - comparisonData.gym.after}</span>
                    </div>
                    <div className="relative h-5 flex gap-0.5">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getBarWidth(comparisonData.gym.before)}%` }}
                        className="h-full rounded-l bg-muted-foreground/30 flex items-center justify-end pr-1.5"
                      >
                        <span className="text-[10px] text-muted-foreground font-medium">€{comparisonData.gym.before}</span>
                      </motion.div>
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getBarWidth(comparisonData.gym.after)}%` }}
                        transition={{ delay: 0.1 }}
                        className="h-full rounded-r bg-emerald-500 flex items-center justify-end pr-1.5"
                      >
                        <span className="text-[10px] text-white font-medium">€{comparisonData.gym.after}</span>
                      </motion.div>
                    </div>
                  </div>
                )}
              </div>

              {/* Total comparison */}
              <div className="pt-2 border-t border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">
                    €{comparisonData.total.before} → €{comparisonData.total.after}
                  </span>
                  <Badge className="bg-emerald-500/20 text-emerald-600 border-emerald-500/30">
                    -€{totalSavings * 12}{t.perYear}
                  </Badge>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Total Savings Summary (shown when no scenarios active) */}
        {totalSavings === 0 && (
          <div className="p-4 rounded-xl bg-muted/20 border border-border/30">
            <p className="text-sm text-muted-foreground text-center">
              {language === 'it' ? 'Attiva uno scenario per vedere il risparmio' : 'Enable a scenario to see savings'}
            </p>
          </div>
        )}

        {/* Scenario Cards */}
        <div className="space-y-3">
          {scenarios.map((scenario) => (
            <motion.div
              key={scenario.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`
                p-3 rounded-lg border transition-all duration-200
                ${scenario.active && scenario.applicable 
                  ? 'border-emerald-500/40 bg-emerald-500/5' 
                  : 'border-border/50 bg-muted/20'
                }
                ${!scenario.applicable ? 'opacity-60' : ''}
              `}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`
                    w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
                    ${scenario.active && scenario.applicable 
                      ? 'bg-emerald-500/20 text-emerald-600' 
                      : 'bg-muted text-muted-foreground'
                    }
                  `}>
                    <scenario.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{scenario.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {scenario.description}
                    </p>
                    {scenario.active && scenario.applicable && scenario.tip && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-xs text-amber-600 mt-1.5"
                      >
                        💡 {scenario.tip}
                      </motion.p>
                    )}
                    {scenario.showWarning && scenario.active && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-xs text-orange-500 mt-1 flex items-center gap-1"
                      >
                        <AlertTriangle className="w-3 h-3" />
                        {t.warning}
                      </motion.p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {scenario.applicable ? (
                    <>
                      <Badge 
                        variant="outline" 
                        className={`
                          text-xs transition-colors
                          ${scenario.active 
                            ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/30' 
                            : 'text-muted-foreground'
                          }
                        `}
                      >
                        <TrendingDown className="w-3 h-3 mr-1" />
                        €{scenario.savings}
                      </Badge>
                      <Switch 
                        checked={scenario.active}
                        onCheckedChange={scenario.setActive}
                      />
                    </>
                  ) : (
                    <Badge variant="secondary" className="text-xs">
                      {scenario.disabledReason}
                    </Badge>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Apply Button */}
        <AnimatePresence mode="wait">
          {totalSavings > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <Button 
                onClick={handleApply}
                className="w-full gap-2"
                variant={applied ? "outline" : "default"}
                disabled={applied}
              >
                {applied ? (
                  <>
                    <Check className="w-4 h-4" />
                    {t.applied}
                  </>
                ) : (
                  <>
                    {t.apply}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
