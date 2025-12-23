import { useState, useMemo, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lightbulb, Users, UtensilsCrossed, Dumbbell, Check } from "lucide-react";
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
    groceries?: number;
    gym?: number;
  }) => void;
}

const translations = {
  it: {
    title: '"E se...?" Simulatore',
    subtitle: "Scopri quanto potresti risparmiare",
    totalSavings: "Risparmio totale",
    perMonth: "/mese",
    perYear: "/anno",
    apply: "Applica al budget",
    applied: "Applicato!",
    roommate: {
      title: "Condividi stanza",
      description: "Passa da singola a doppia",
      alreadyOptimal: "Già in stanza condivisa"
    },
    mensa: {
      title: "Pranzi mensa EDISU",
      description: "Pasto completo €3-5"
    },
    gym: {
      title: "Palestra CUS gratuita",
      description: "CUS Torino gratis per studenti",
      noGym: "Nessun costo palestra"
    },
    savings: "Risparmi"
  },
  en: {
    title: '"What if...?" Simulator',
    subtitle: "Discover how much you could save",
    totalSavings: "Total savings",
    perMonth: "/month",
    perYear: "/year",
    apply: "Apply to budget",
    applied: "Applied!",
    roommate: {
      title: "Share room",
      description: "Switch from single to shared",
      alreadyOptimal: "Already in shared room"
    },
    mensa: {
      title: "EDISU canteen meals",
      description: "Full meal €3-5"
    },
    gym: {
      title: "Free CUS gym",
      description: "CUS Turin free for students",
      noGym: "No gym cost"
    },
    savings: "Save"
  }
};

const WhatIfSimulatorComponent = ({
  currentRent,
  currentGroceries,
  currentGym,
  housingType,
  language,
  onApplyScenario
}: WhatIfSimulatorProps) => {
  const t = translations[language];
  
  const [roommateActive, setRoommateActive] = useState(false);
  const [mensaActive, setMensaActive] = useState(false);
  const [gymActive, setGymActive] = useState(false);
  const [applied, setApplied] = useState(false);

  // Calculate savings
  const roommateSavings = useMemo(() => {
    if (housingType === "shared") return 0;
    if (housingType === "single") return Math.round(currentRent * 0.30);
    if (housingType === "studio") return Math.round(currentRent * 0.35);
    return 0;
  }, [currentRent, housingType]);

  const mensaSavings = 90;
  const gymSavings = currentGym;

  const canApplyRoommate = housingType !== "shared";
  const canApplyGym = currentGym > 0;

  const totalSavings = useMemo(() => {
    let total = 0;
    if (roommateActive && canApplyRoommate) total += roommateSavings;
    if (mensaActive) total += mensaSavings;
    if (gymActive && canApplyGym) total += gymSavings;
    return total;
  }, [roommateActive, mensaActive, gymActive, roommateSavings, gymSavings, canApplyRoommate, canApplyGym]);

  const handleApply = () => {
    const changes: Parameters<typeof onApplyScenario>[0] = {};
    
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

  return (
    <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/5 to-background">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base">
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
            <Lightbulb className="w-4 h-4 text-amber-500" />
          </div>
          <div>
            <span>{t.title}</span>
            <p className="text-xs font-normal text-muted-foreground">{t.subtitle}</p>
          </div>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {/* Roommate Scenario */}
        <div className={`p-3 rounded-lg border ${roommateActive && canApplyRoommate ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-border/50 bg-muted/20'} ${!canApplyRoommate ? 'opacity-50' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${roommateActive && canApplyRoommate ? 'bg-emerald-500/20 text-emerald-600' : 'bg-muted text-muted-foreground'}`}>
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-sm">{t.roommate.title}</p>
                <p className="text-xs text-muted-foreground">
                  {canApplyRoommate ? t.roommate.description : t.roommate.alreadyOptimal}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {canApplyRoommate && (
                <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 text-xs">
                  -€{roommateSavings}
                </Badge>
              )}
              <Switch
                checked={roommateActive}
                onCheckedChange={setRoommateActive}
                disabled={!canApplyRoommate}
              />
            </div>
          </div>
        </div>

        {/* Mensa Scenario */}
        <div className={`p-3 rounded-lg border ${mensaActive ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-border/50 bg-muted/20'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${mensaActive ? 'bg-emerald-500/20 text-emerald-600' : 'bg-muted text-muted-foreground'}`}>
                <UtensilsCrossed className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-sm">{t.mensa.title}</p>
                <p className="text-xs text-muted-foreground">{t.mensa.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 text-xs">
                -€{mensaSavings}
              </Badge>
              <Switch checked={mensaActive} onCheckedChange={setMensaActive} />
            </div>
          </div>
        </div>

        {/* Gym Scenario */}
        <div className={`p-3 rounded-lg border ${gymActive && canApplyGym ? 'border-emerald-500/40 bg-emerald-500/5' : 'border-border/50 bg-muted/20'} ${!canApplyGym ? 'opacity-50' : ''}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${gymActive && canApplyGym ? 'bg-emerald-500/20 text-emerald-600' : 'bg-muted text-muted-foreground'}`}>
                <Dumbbell className="w-4 h-4" />
              </div>
              <div>
                <p className="font-medium text-sm">{t.gym.title}</p>
                <p className="text-xs text-muted-foreground">
                  {canApplyGym ? t.gym.description : t.gym.noGym}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {canApplyGym && (
                <Badge variant="outline" className="text-emerald-600 border-emerald-500/30 text-xs">
                  -€{gymSavings}
                </Badge>
              )}
              <Switch
                checked={gymActive}
                onCheckedChange={setGymActive}
                disabled={!canApplyGym}
              />
            </div>
          </div>
        </div>

        {/* Total Savings & Apply Button */}
        <AnimatePresence mode="wait">
          {totalSavings > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium">{t.totalSavings}</span>
                <div className="text-right">
                  <span className="text-xl font-bold text-emerald-600">-€{totalSavings}</span>
                  <span className="text-sm text-muted-foreground">{t.perMonth}</span>
                  <p className="text-xs text-emerald-600">= €{totalSavings * 12}{t.perYear}</p>
                </div>
              </div>
              <Button 
                onClick={handleApply}
                className="w-full bg-emerald-600 hover:bg-emerald-700"
                disabled={applied}
              >
                {applied ? (
                  <><Check className="w-4 h-4 mr-2" />{t.applied}</>
                ) : (
                  t.apply
                )}
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};

export const WhatIfSimulator = memo(WhatIfSimulatorComponent);
