import { useMemo } from "react";
import { Sparkles, AlertTriangle, Trophy, Clock, BookOpen } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import type { SessionExam } from "./SessionExamInput";
import { format, compareAsc } from "date-fns";
import { it, enUS } from "date-fns/locale";

interface SessionPlanOutputProps {
  exams: SessionExam[];
  cfuMax: number;
  onCfuMaxChange: (value: number) => void;
  lang: 'it' | 'en';
}

interface PlannedSession {
  tipo: 'invernale' | 'estiva' | 'autunnale';
  label: string;
  esami: SessionExam[];
  cfuTotali: number;
  difficoltaMedia: number;
  oreStudioStimate: number;
}

export const SessionPlanOutput = ({ exams, cfuMax, onCfuMaxChange, lang }: SessionPlanOutputProps) => {
  const content = {
    it: {
      title: "Piano Sessione Ottimizzato",
      subtitle: "Basato su CFU, difficoltà e propedeuticità",
      cfuMax: "CFU massimi per sessione",
      sessions: {
        invernale: "Sessione Invernale (Gen-Feb)",
        estiva: "Sessione Estiva (Giu-Lug)",
        autunnale: "Sessione Autunnale (Set)"
      },
      stats: {
        exams: "esami",
        cfu: "CFU",
        hours: "ore",
        avgDiff: "Difficoltà media"
      },
      warnings: {
        overload: "Sessione sovraccarica",
        noExams: "Aggiungi esami per generare il piano",
        proBadge: "Sessione da Pro!",
        balanced: "Piano bilanciato"
      },
      tips: {
        title: "Consigli",
        easy: "Inizia dagli esami più facili per costruire momentum",
        prereq: "Rispetta le propedeuticità",
        balance: "Bilancia la difficoltà tra le sessioni"
      }
    },
    en: {
      title: "Optimized Session Plan",
      subtitle: "Based on credits, difficulty and prerequisites",
      cfuMax: "Max credits per session",
      sessions: {
        invernale: "Winter Session (Jan-Feb)",
        estiva: "Summer Session (Jun-Jul)",
        autunnale: "Fall Session (Sep)"
      },
      stats: {
        exams: "exams",
        cfu: "credits",
        hours: "hours",
        avgDiff: "Avg difficulty"
      },
      warnings: {
        overload: "Session overloaded",
        noExams: "Add exams to generate the plan",
        proBadge: "Pro Session!",
        balanced: "Balanced plan"
      },
      tips: {
        title: "Tips",
        easy: "Start with easier exams to build momentum",
        prereq: "Respect prerequisites",
        balance: "Balance difficulty across sessions"
      }
    }
  };
  
  const c = content[lang];
  const difficultyEmojis = ["", "😊", "😐", "😰", "💀"];
  
  // Generate optimized plan
  const sessions = useMemo((): PlannedSession[] => {
    if (exams.length === 0) return [];
    
    // Group by session type
    const sessionGroups: Record<string, SessionExam[]> = {
      invernale: [],
      estiva: [],
      autunnale: []
    };
    
    // Sort exams by difficulty (easier first) then by date
    const sortedExams = [...exams].sort((a, b) => {
      // First by difficulty
      if (a.difficolta !== b.difficolta) {
        return a.difficolta - b.difficolta;
      }
      // Then by date if available
      if (a.dataAppello && b.dataAppello) {
        return compareAsc(a.dataAppello, b.dataAppello);
      }
      return 0;
    });
    
    // Assign to sessions respecting prerequisites
    const assigned = new Set<string>();
    const getPrerequisites = (examId: string): string[] => {
      const exam = exams.find(e => e.id === examId);
      if (!exam || !exam.propedeuticoId || exam.propedeuticoId === 'none') return [];
      return [exam.propedeuticoId, ...getPrerequisites(exam.propedeuticoId)];
    };
    
    sortedExams.forEach(exam => {
      const sessione = exam.sessione || 'estiva';
      sessionGroups[sessione].push(exam);
    });
    
    // Create session objects
    const result: PlannedSession[] = [];
    
    (['invernale', 'estiva', 'autunnale'] as const).forEach(tipo => {
      const sessionExams = sessionGroups[tipo];
      if (sessionExams.length === 0) return;
      
      // Sort by date within session
      sessionExams.sort((a, b) => {
        if (a.dataAppello && b.dataAppello) {
          return compareAsc(a.dataAppello, b.dataAppello);
        }
        return a.difficolta - b.difficolta;
      });
      
      const cfuTotali = sessionExams.reduce((sum, e) => sum + e.cfu, 0);
      const difficoltaMedia = sessionExams.reduce((sum, e) => sum + e.difficolta, 0) / sessionExams.length;
      
      result.push({
        tipo,
        label: c.sessions[tipo],
        esami: sessionExams,
        cfuTotali,
        difficoltaMedia,
        oreStudioStimate: cfuTotali * 25
      });
    });
    
    return result;
  }, [exams, c.sessions]);
  
  const totalAvgDifficulty = exams.length > 0 
    ? exams.reduce((sum, e) => sum + e.difficolta, 0) / exams.length 
    : 0;
  
  const isBalanced = sessions.length > 0 && sessions.every(s => s.cfuTotali <= cfuMax);
  const isPro = totalAvgDifficulty < 2.5 && isBalanced;
  
  const difficultyColors = [
    "",
    "border-green-300 bg-green-50",
    "border-yellow-300 bg-yellow-50",
    "border-orange-300 bg-orange-50",
    "border-red-300 bg-red-50"
  ];
  
  return (
    <div className="space-y-6">
      {/* Config */}
      <Card>
        <CardContent className="pt-6">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>{c.cfuMax}</Label>
              <Badge variant="outline">{cfuMax} CFU</Badge>
            </div>
            <Slider
              value={[cfuMax]}
              onValueChange={([val]) => onCfuMaxChange(val)}
              min={15}
              max={45}
              step={3}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>15 CFU</span>
              <span>30 CFU</span>
              <span>45 CFU</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Status Badges */}
      {exams.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {isPro && (
            <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-white gap-1">
              <Trophy className="w-3 h-3" />
              {c.warnings.proBadge}
            </Badge>
          )}
          {isBalanced && !isPro && (
            <Badge variant="secondary" className="gap-1">
              <Sparkles className="w-3 h-3" />
              {c.warnings.balanced}
            </Badge>
          )}
        </div>
      )}
      
      {/* Sessions */}
      {sessions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-muted-foreground/30" />
            <p className="text-muted-foreground">{c.warnings.noExams}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {sessions.map((session) => {
            const isOverloaded = session.cfuTotali > cfuMax;
            const progress = (session.cfuTotali / cfuMax) * 100;
            
            return (
              <Card 
                key={session.tipo}
                className={cn(
                  "transition-all",
                  isOverloaded && "border-amber-400 bg-amber-50/50"
                )}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {session.label}
                      {isOverloaded && (
                        <Badge variant="outline" className="text-amber-600 border-amber-400">
                          <AlertTriangle className="w-3 h-3 mr-1" />
                          {c.warnings.overload}
                        </Badge>
                      )}
                    </CardTitle>
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span>{session.esami.length} {c.stats.exams}</span>
                      <span className="font-semibold text-foreground">{session.cfuTotali} {c.stats.cfu}</span>
                    </div>
                  </div>
                  
                  {/* CFU Progress Bar */}
                  <div className="mt-2">
                    <Progress 
                      value={Math.min(progress, 100)} 
                      className={cn(
                        "h-2",
                        isOverloaded && "[&>div]:bg-amber-500"
                      )}
                    />
                  </div>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-2">
                    {session.esami.map((exam, idx) => (
                      <div 
                        key={exam.id}
                        className={cn(
                          "flex items-center justify-between p-3 rounded-lg border",
                          difficultyColors[exam.difficolta]
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-lg w-8 text-center">{idx + 1}</span>
                          <div>
                            <div className="font-medium text-foreground">{exam.nome}</div>
                            <div className="text-xs text-muted-foreground flex items-center gap-2">
                              <span>{exam.cfu} CFU</span>
                              {exam.dataAppello && (
                                <>
                                  <span>•</span>
                                  <span>{format(exam.dataAppello, "d MMM", { locale: lang === 'it' ? it : enUS })}</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-xl">{difficultyEmojis[exam.difficolta]}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Session Stats */}
                  <div className="mt-4 pt-4 border-t border-border flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      ~{session.oreStudioStimate} {c.stats.hours}
                    </div>
                    <div>
                      {c.stats.avgDiff}: {difficultyEmojis[Math.round(session.difficoltaMedia)]} {session.difficoltaMedia.toFixed(1)}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
      
      {/* Tips */}
      {exams.length > 0 && (
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm flex items-center gap-2 text-primary">
              <Sparkles className="w-4 h-4" />
              {c.tips.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• {c.tips.easy}</li>
              <li>• {c.tips.prereq}</li>
              <li>• {c.tips.balance}</li>
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
