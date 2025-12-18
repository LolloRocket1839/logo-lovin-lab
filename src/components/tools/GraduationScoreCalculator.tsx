import { useMemo, useState } from "react";
import { Award, Info, GraduationCap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";

interface GraduationScoreCalculatorProps {
  weightedAverage: number;
  totalCfu: number;
  lodiCount: number;
  language: 'it' | 'en';
}

export const GraduationScoreCalculator = ({
  weightedAverage,
  totalCfu,
  lodiCount,
  language
}: GraduationScoreCalculatorProps) => {
  // Bonus options
  const [thesisBonus, setThesisBonus] = useState<number[]>([3]);
  const [inTimeBonus, setInTimeBonus] = useState(true);
  const [erasmusBonus, setErasmusBonus] = useState(false);

  const content = {
    it: {
      title: "Calcolo Voto di Laurea",
      subtitle: "Stima il tuo voto finale in base alla media e ai bonus",
      baseScore: "Punteggio Base",
      baseFormula: "(Media × 110) / 30",
      bonuses: "Bonus",
      thesis: "Bonus Tesi",
      thesisDesc: "Tipicamente 0-7 punti in base alla qualità",
      inTime: "Laurea in corso",
      inTimeDesc: "Bonus per laurea nei tempi previsti (+1-2 punti)",
      erasmus: "Erasmus/Tirocinio estero",
      erasmusDesc: "Bonus per esperienze internazionali (+1 punto)",
      lodiBonus: "Bonus Lodi",
      lodiDesc: "Alcune università danno 0.2-0.5 punti per lode",
      estimatedScore: "Voto Stimato",
      range: "Range possibile",
      noExams: "Aggiungi almeno un esame per calcolare il voto di laurea",
      note: "Nota: i criteri variano per ateneo. Consulta il regolamento del tuo corso di studi.",
      laudeThreshold: "Per la lode serve generalmente un punteggio ≥ 113"
    },
    en: {
      title: "Graduation Grade Calculator",
      subtitle: "Estimate your final grade based on GPA and bonuses",
      baseScore: "Base Score",
      baseFormula: "(GPA × 110) / 30",
      bonuses: "Bonuses",
      thesis: "Thesis Bonus",
      thesisDesc: "Typically 0-7 points based on quality",
      inTime: "Graduate on time",
      inTimeDesc: "Bonus for graduating within expected time (+1-2 points)",
      erasmus: "Erasmus/International internship",
      erasmusDesc: "Bonus for international experience (+1 point)",
      lodiBonus: "Honors Bonus",
      lodiDesc: "Some universities give 0.2-0.5 points per honor",
      estimatedScore: "Estimated Grade",
      range: "Possible range",
      noExams: "Add at least one exam to calculate graduation grade",
      note: "Note: criteria vary by university. Check your program regulations.",
      laudeThreshold: "For honors, you generally need a score ≥ 113"
    }
  };

  const t = content[language];

  // Calculate base score (media * 110 / 30)
  const baseScore = useMemo(() => {
    if (weightedAverage === 0) return 0;
    return (weightedAverage * 110) / 30;
  }, [weightedAverage]);

  // Calculate total bonuses
  const totalBonuses = useMemo(() => {
    let bonus = 0;
    bonus += thesisBonus[0];
    if (inTimeBonus) bonus += 1;
    if (erasmusBonus) bonus += 1;
    // Lodi bonus (conservative: 0.3 per lode, max 2 points)
    bonus += Math.min(lodiCount * 0.3, 2);
    return bonus;
  }, [thesisBonus, inTimeBonus, erasmusBonus, lodiCount]);

  // Calculate estimated score
  const estimatedScore = useMemo(() => {
    const raw = baseScore + totalBonuses;
    return Math.min(raw, 110); // Cap at 110 (lode is separate)
  }, [baseScore, totalBonuses]);

  // Calculate range
  const scoreRange = useMemo(() => {
    const min = Math.round(baseScore);
    const max = Math.min(Math.round(baseScore + 7 + 2 + 1 + Math.min(lodiCount * 0.3, 2)), 110);
    return { min, max };
  }, [baseScore, lodiCount]);

  if (totalCfu === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="py-12 text-center">
          <Award className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">{t.noExams}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        {/* Base Score Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-primary" />
              {t.baseScore}
            </CardTitle>
            <p className="text-sm text-muted-foreground">{t.baseFormula}</p>
          </CardHeader>
          <CardContent>
            <div className="text-center py-4">
              <div className="text-5xl font-bold text-primary mb-2">
                {baseScore.toFixed(1)}
              </div>
              <p className="text-sm text-muted-foreground">
                {weightedAverage.toFixed(2)} × 110 / 30
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Bonuses Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              {t.bonuses}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Thesis Bonus */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="flex items-center gap-2">
                  {t.thesis}
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{t.thesisDesc}</p>
                    </TooltipContent>
                  </Tooltip>
                </Label>
                <Badge variant="outline">+{thesisBonus[0]}</Badge>
              </div>
              <Slider
                value={thesisBonus}
                onValueChange={setThesisBonus}
                min={0}
                max={7}
                step={1}
              />
            </div>

            {/* In Time Bonus */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="in-time">{t.inTime}</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{t.inTimeDesc}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Switch
                id="in-time"
                checked={inTimeBonus}
                onCheckedChange={setInTimeBonus}
              />
            </div>

            {/* Erasmus Bonus */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Label htmlFor="erasmus">{t.erasmus}</Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="w-3 h-3 text-muted-foreground" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="max-w-xs">{t.erasmusDesc}</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Switch
                id="erasmus"
                checked={erasmusBonus}
                onCheckedChange={setErasmusBonus}
              />
            </div>

            {/* Lodi Bonus */}
            {lodiCount > 0 && (
              <div className="flex items-center justify-between pt-2 border-t">
                <div className="flex items-center gap-2">
                  <Label>{t.lodiBonus}</Label>
                  <Tooltip>
                    <TooltipTrigger>
                      <Info className="w-3 h-3 text-muted-foreground" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="max-w-xs">{t.lodiDesc}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <Badge variant="secondary">
                  {lodiCount} lodi → +{Math.min(lodiCount * 0.3, 2).toFixed(1)}
                </Badge>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Estimated Score */}
      <Card className="bg-primary/5 border-primary/20">
        <CardContent className="py-6">
          <div className="text-center mb-4">
            <p className="text-sm text-muted-foreground mb-2">{t.estimatedScore}</p>
            <div className="text-6xl font-bold text-primary">
              {Math.round(estimatedScore)}/110
              {estimatedScore >= 110 && (
                <span className="text-2xl ml-2">e lode?</span>
              )}
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-2 max-w-md mx-auto">
            <Progress value={(estimatedScore / 110) * 100} className="h-3" />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>66</span>
              <span>88</span>
              <span>99</span>
              <span>110</span>
            </div>
          </div>

          {/* Range */}
          <div className="text-center mt-4">
            <p className="text-sm text-muted-foreground">
              {t.range}: <strong>{scoreRange.min} - {scoreRange.max}</strong>
            </p>
          </div>

          {/* Laude threshold */}
          {estimatedScore >= 108 && (
            <p className="text-center text-sm text-primary mt-2">
              {t.laudeThreshold}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Note */}
      <p className="text-xs text-muted-foreground text-center">
        {t.note}
      </p>
    </div>
  );
};
