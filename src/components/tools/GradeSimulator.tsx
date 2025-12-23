import { useState, useMemo } from "react";
import { TrendingUp, Calculator, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { 
  getGradeOptions, 
  simulateNewExam, 
  calculateRequiredGrade 
} from "@/lib/tools/gradeUtils";

interface GradeSimulatorProps {
  currentAverage: number;
  currentCfu: number;
  language: 'it' | 'en';
}

const content = {
  it: {
    title: "Simulatore What-If",
    whatIfTitle: "Cosa succede se prendo...",
    whatIfDesc: "Simula l'impatto di un nuovo esame sulla tua media",
    grade: "Voto prossimo esame",
    cfu: "CFU esame",
    currentAvg: "Media attuale",
    newAvg: "Nuova media",
    difference: "Differenza",
    targetTitle: "Che voto devo prendere?",
    targetDesc: "Calcola il voto necessario per raggiungere una media obiettivo",
    targetAvg: "Media obiettivo",
    cfuRemaining: "CFU rimanenti",
    requiredGrade: "Voto necessario",
    impossible: "Impossibile",
    impossibleDesc: "Non è possibile raggiungere questa media con i CFU rimanenti",
    noExams: "Aggiungi almeno un esame per usare il simulatore"
  },
  en: {
    title: "What-If Simulator",
    whatIfTitle: "What if I get...",
    whatIfDesc: "Simulate the impact of a new exam on your GPA",
    grade: "Next exam grade",
    cfu: "Exam credits",
    currentAvg: "Current average",
    newAvg: "New average",
    difference: "Difference",
    targetTitle: "What grade do I need?",
    targetDesc: "Calculate the grade needed to reach a target average",
    targetAvg: "Target average",
    cfuRemaining: "Remaining credits",
    requiredGrade: "Required grade",
    impossible: "Impossible",
    impossibleDesc: "It's not possible to reach this average with the remaining credits",
    noExams: "Add at least one exam to use the simulator"
  }
};

export const GradeSimulator = ({ currentAverage, currentCfu, language }: GradeSimulatorProps) => {
  const [targetAvg, setTargetAvg] = useState<number[]>([27]);
  const [nextGrade, setNextGrade] = useState<string>("28");
  const [nextCfu, setNextCfu] = useState<string>("9");
  const [remainingCfu, setRemainingCfu] = useState<string>("60");

  const t = content[language];
  const gradeOptions = getGradeOptions();

  // Calculate new average with simulated exam
  const simulatedResult = useMemo(() => {
    const gradeNum = parseInt(nextGrade);
    const cfuNum = parseInt(nextCfu) || 0;
    return simulateNewExam(currentAverage, currentCfu, gradeNum, cfuNum);
  }, [currentAverage, currentCfu, nextGrade, nextCfu]);

  // Calculate required grade for target
  const requiredGrade = useMemo(() => {
    const cfuNum = parseInt(remainingCfu) || 0;
    return calculateRequiredGrade(currentAverage, currentCfu, targetAvg[0], cfuNum);
  }, [currentAverage, currentCfu, targetAvg, remainingCfu]);

  if (currentCfu === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <TrendingUp className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">{t.noExams}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* What-If Simulator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            {t.whatIfTitle}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{t.whatIfDesc}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.grade}</Label>
              <Select value={nextGrade} onValueChange={setNextGrade}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>{t.cfu}</Label>
              <Input
                type="number"
                min={1}
                max={30}
                value={nextCfu}
                onChange={(e) => setNextCfu(e.target.value)}
              />
            </div>
          </div>

          {simulatedResult && (
            <div className="pt-4 border-t space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.currentAvg}</span>
                <span className="font-medium">{currentAverage.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.newAvg}</span>
                <span className="font-bold text-lg text-primary">
                  {simulatedResult.newAvg.toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.difference}</span>
                <Badge variant={simulatedResult.difference >= 0 ? "default" : "destructive"}>
                  {simulatedResult.difference >= 0 ? "+" : ""}
                  {simulatedResult.difference.toFixed(2)}
                </Badge>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Target Calculator */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            {t.targetTitle}
          </CardTitle>
          <p className="text-sm text-muted-foreground">{t.targetDesc}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <Label>{t.targetAvg}: {targetAvg[0]}</Label>
            <Slider
              value={targetAvg}
              onValueChange={setTargetAvg}
              min={18}
              max={30}
              step={0.5}
              className="py-2"
            />
          </div>

          <div className="space-y-2">
            <Label>{t.cfuRemaining}</Label>
            <Input
              type="number"
              min={1}
              max={180}
              value={remainingCfu}
              onChange={(e) => setRemainingCfu(e.target.value)}
            />
          </div>

          {requiredGrade !== null && (
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">{t.requiredGrade}</span>
                {requiredGrade >= 18 && requiredGrade <= 30 ? (
                  <span className="font-bold text-2xl text-primary">
                    {requiredGrade.toFixed(1)}
                  </span>
                ) : requiredGrade < 18 ? (
                  <Badge variant="default">
                    {"< 18"} ✓
                  </Badge>
                ) : (
                  <div className="text-right">
                    <Badge variant="destructive">{t.impossible}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t.impossibleDesc}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
