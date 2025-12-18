import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Users, UtensilsCrossed, Dumbbell, TrendingDown, Check, ArrowRight } from "lucide-react";
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
    roommate: {
      title: "Trovi un coinquilino",
      description: "Dividi affitto e bollette con un compagno",
      tip: "Cerca su gruppi Facebook 'Cerco coinquilino Torino'"
    },
    mensa: {
      title: "Pranzi in mensa EDISU",
      description: "Pasto completo €3-5 con ISEE ridotto",
      tip: "20 pranzi/mese = €90 risparmio vs cucinare"
    },
    gym: {
      title: "Rinuncia alla palestra privata",
      description: "CUS Torino gratis per studenti PoliTo/UniTo",
      tip: "Palestre universitarie + corsi fitness inclusi"
    },
    notApplicable: "Non applicabile",
    alreadyShared: "Già in stanza doppia",
    noGym: "Nessun costo palestra"
  },
  en: {
    title: '"What if...?" Scenario Simulator',
    subtitle: "Discover how much you could save",
    totalSavings: "Total potential savings",
    perMonth: "/month",
    perYear: "/year",
    apply: "Apply changes",
    applied: "Changes applied!",
    roommate: {
      title: "Find a roommate",
      description: "Split rent and utilities with a flatmate",
      tip: "Search on Facebook groups 'Cerco coinquilino Torino'"
    },
    mensa: {
      title: "Eat at EDISU canteen",
      description: "Full meal €3-5 with reduced ISEE",
      tip: "20 lunches/month = €90 savings vs cooking"
    },
    gym: {
      title: "Skip private gym",
      description: "CUS Turin free for PoliTo/UniTo students",
      tip: "University gyms + fitness classes included"
    },
    notApplicable: "Not applicable",
    alreadyShared: "Already in shared room",
    noGym: "No gym cost"
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
  
  const [roommateActive, setRoommateActive] = useState(false);
  const [mensaActive, setMensaActive] = useState(false);
  const [gymActive, setGymActive] = useState(false);
  const [applied, setApplied] = useState(false);

  // Calculate savings for each scenario
  const roommateSavings = useMemo(() => {
    // Only applicable if single or studio
    if (housingType === "shared") return 0;
    // Roughly 30% savings by switching to shared room
    return Math.round(currentRent * 0.3);
  }, [currentRent, housingType]);

  const mensaSavings = 90; // Fixed estimate: 20 meals × €4.50 saved

  const gymSavings = currentGym;

  // Total active savings
  const totalSavings = useMemo(() => {
    let total = 0;
    if (roommateActive && housingType !== "shared") total += roommateSavings;
    if (mensaActive) total += mensaSavings;
    if (gymActive && currentGym > 0) total += gymSavings;
    return total;
  }, [roommateActive, mensaActive, gymActive, roommateSavings, mensaSavings, gymSavings, housingType, currentGym]);

  const canApplyRoommate = housingType !== "shared";
  const canApplyGym = currentGym > 0;

  const handleApply = () => {
    const changes: Parameters<typeof onApplyScenario>[0] = {};
    
    if (roommateActive && canApplyRoommate) {
      changes.housingType = "shared";
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

  const scenarios = [
    {
      id: "roommate",
      icon: Users,
      title: t.roommate.title,
      description: t.roommate.description,
      tip: t.roommate.tip,
      savings: roommateSavings,
      active: roommateActive,
      setActive: setRoommateActive,
      applicable: canApplyRoommate,
      disabledReason: t.alreadyShared
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
      disabledReason: null
    },
    {
      id: "gym",
      icon: Dumbbell,
      title: t.gym.title,
      description: t.gym.description,
      tip: t.gym.tip,
      savings: gymSavings,
      active: gymActive,
      setActive: setGymActive,
      applicable: canApplyGym,
      disabledReason: t.noGym
    }
  ];

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
        {/* Total Savings Summary */}
        <AnimatePresence mode="wait">
          <motion.div
            key={totalSavings}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20"
          >
            <p className="text-sm text-muted-foreground mb-1">{t.totalSavings}:</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-emerald-600">
                €{totalSavings}
              </span>
              <span className="text-sm text-muted-foreground">{t.perMonth}</span>
              <span className="text-xs text-emerald-600/70 ml-auto">
                = €{totalSavings * 12}{t.perYear}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

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
                    {scenario.active && scenario.applicable && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="text-xs text-amber-600 mt-1.5"
                      >
                        💡 {scenario.tip}
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
