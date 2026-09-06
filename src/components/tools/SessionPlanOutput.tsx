import { useMemo } from "react";
import { Sparkles, AlertTriangle, Trophy, Clock, BookOpen, Settings, ChevronDown } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import type { SessionExam } from "./SessionExamInput";
import { format, compareAsc } from "date-fns";
import { it, enUS } from "date-fns/locale";

// Difficulty multipliers for study hours calculation
export const DIFFICULTY_MULTIPLIERS = [0, 0.8, 1.0, 1.2, 1.4];
export const BASE_HOURS_PER_CFU = 25;

export const calculateStudyHours = (cfu: number, difficulty: number): number => {
  return Math.round(cfu * BASE_HOURS_PER_CFU * DIFFICULTY_MULTIPLIERS[difficulty]);
};

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
      cfuMax: "Limite crediti per sessione",
      sessionsNeeded: "sessioni necessarie",
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
        balanced: "Piano bilanciato",
        prereqMissing: "Prerequisito mancante"
      },
      tips: {
        title: "Consigli",
        easy: "Inizia dagli esami più facili per costruire momentum",
        prereq: "Rispetta le propedeuticità",
        balance: "Bilancia la difficoltà tra le sessioni"
      },
      settings: "Impostazioni piano",
      formula: "Formula ore"
    },
    en: {
      title: "Optimized Session Plan",
      subtitle: "Based on credits, difficulty and prerequisites",
      cfuMax: "Credits limit per session",
      sessionsNeeded: "sessions needed",
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
        balanced: "Balanced plan",
        prereqMissing: "Missing prerequisite"
      },
      tips: {
        title: "Tips",
        easy: "Start with easier exams to build momentum",
        prereq: "Respect prerequisites",
        balance: "Balance difficulty across sessions"
      },
      settings: "Plan settings",
      formula: "Hours formula"
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
      const oreStudioStimate = sessionExams.reduce((sum, e) => sum + calculateStudyHours(e.cfu, e.difficolta), 0);
      
      result.push({
        tipo,
        label: c.sessions[tipo],
        esami: sessionExams,
        cfuTotali,
        difficoltaMedia,
        oreStudioStimate
      });
    });
    
    return result;
  }, [exams, c.sessions]);
  
  const totalCfu = exams.reduce((sum, e) => sum + e.cfu, 0);
  const totalAvgDifficulty = exams.length > 0 
    ? exams.reduce((sum, e) => sum + e.difficolta, 0) / exams.length 
    : 0;
  const sessionsNeeded = Math.ceil(totalCfu / cfuMax);
  
  const isBalanced = sessions.length > 0 && sessions.every(s => s.cfuTotali <= cfuMax);
  const isPro = totalAvgDifficulty < 2.5 && isBalanced;
  
  // Check for prerequisite issues
  const getPrereqIssues = (exam: SessionExam, sessionExams: SessionExam[], sessionOrder: number): boolean => {
    if (!exam.propedeuticoId || exam.propedeuticoId === 'none') return false;
    
    // Find prerequisite exam
    const prereq = exams.find(e => e.id === exam.propedeuticoId);
    if (!prereq) return false;
    
    // Check if prereq is in a later session or same session but after this exam
    const prereqSession = sessions.find(s => s.esami.some(e => e.id === prereq.id));
    if (!prereqSession) return false;
    
    const prereqSessionOrder = sessions.indexOf(prereqSession);
    const currentSession = sessions.find(s => s.esami.some(e => e.id === exam.id));
    const currentSessionOrder = currentSession ? sessions.indexOf(currentSession) : 0;
    
    // Prereq is in a later session
    if (prereqSessionOrder > currentSessionOrder) return true;
    
    // Same session: check dates
    if (prereqSessionOrder === currentSessionOrder) {
      if (exam.dataAppello && prereq.dataAppello) {
        return exam.dataAppello < prereq.dataAppello;
      }
    }
    
    return false;
  };
  
  const difficultyColors = [
    "",
    "border-green-300 bg-green-50 dark:border-green-700 dark:bg-green-950/30",
    "border-yellow-300 bg-yellow-50 dark:border-yellow-700 dark:bg-yellow-950/30",
    "border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-950/30",
    "border-red-300 bg-red-50 dark:border-red-700 dark:bg-red-950/30"
  ];
  
  const difficultyLabels = lang === 'it' 
    ? ['', 'facile', 'media', 'difficile', 'boss'] 
    : ['', 'easy', 'medium', 'hard', 'boss'];
  
  return (
    <TooltipProvider>
      <div className="space-y-6">
        {/* Config - Collapsible */}
        <Card>
          <Collapsible defaultOpen={false}>
            <CollapsibleTrigger className="w-full">
              <CardHeader className="py-4 cursor-pointer hover:bg-muted/30 transition-colors">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{c.settings}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline">{cfuMax} CFU/{lang === 'it' ? 'sessione' : 'session'}</Badge>
                    {totalCfu > 0 && (
                      <Badge variant="secondary" className="text-xs">
                        ~{sessionsNeeded} {c.sessionsNeeded}
                      </Badge>
                    )}
                    <ChevronDown className="w-4 h-4 text-muted-foreground transition-transform [[data-state=open]_&]:rotate-180" />
                  </div>
                </div>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="pt-0 pb-4 space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label>{c.cfuMax}</Label>
                    <span className="text-sm font-medium text-primary">{cfuMax} CFU</span>
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
                  
                  {totalCfu > 0 && (
                    <p className="text-xs text-muted-foreground bg-muted/50 p-2 rounded">
                      {lang === 'it' 
                        ? `Con ${cfuMax} CFU/sessione → serviranno ~${sessionsNeeded} sessioni per ${totalCfu} CFU`
                        : `With ${cfuMax} credits/session → ~${sessionsNeeded} sessions needed for ${totalCfu} credits`
                      }
                    </p>
                  )}
                </div>
                
                {/* Formula explanation */}
                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground space-y-1">
                    <div className="font-medium">{c.formula}:</div>
                    <div className="font-mono bg-muted/50 p-2 rounded text-[10px]">
                      {lang === 'it' ? 'Ore' : 'Hours'} = CFU × {BASE_HOURS_PER_CFU}h × {lang === 'it' ? 'moltiplicatore' : 'multiplier'}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {[1, 2, 3, 4].map((d) => (
                        <span key={d} className="inline-flex items-center gap-1 text-[10px]">
                          {difficultyEmojis[d]} ×{DIFFICULTY_MULTIPLIERS[d]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Collapsible>
        </Card>
      
      {/* Status Badges */}
      {exams.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {isPro && (
            <Badge className="bg-gradient-to-r from-amber-400 to-yellow-500 text-on-image gap-1">
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
                    {session.esami.map((exam, idx) => {
                      const hasPrereqIssue = getPrereqIssues(exam, session.esami, sessions.indexOf(session));
                      const studyHours = calculateStudyHours(exam.cfu, exam.difficolta);
                      
                      return (
                        <div 
                          key={exam.id}
                          className={cn(
                            "flex items-center justify-between p-3 rounded-lg border",
                            difficultyColors[exam.difficolta],
                            hasPrereqIssue && "ring-2 ring-red-400 ring-offset-1"
                          )}
                        >
                          <div className="flex items-center gap-3">
                            <span className="text-lg w-8 text-center">{idx + 1}</span>
                            <div>
                              <div className="font-medium text-foreground flex items-center gap-2">
                                {exam.nome}
                                {hasPrereqIssue && (
                                  <Tooltip>
                                    <TooltipTrigger>
                                      <Badge variant="destructive" className="text-[10px] px-1.5 py-0">
                                        <AlertTriangle className="w-3 h-3 mr-0.5" />
                                        {c.warnings.prereqMissing}
                                      </Badge>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      {lang === 'it' 
                                        ? 'Questo esame è programmato prima del suo prerequisito'
                                        : 'This exam is scheduled before its prerequisite'
                                      }
                                    </TooltipContent>
                                  </Tooltip>
                                )}
                              </div>
                              <div className="text-xs text-muted-foreground flex items-center gap-2 flex-wrap">
                                <Tooltip>
                                  <TooltipTrigger className="cursor-help underline-offset-2 decoration-dotted underline">
                                    <span>{exam.cfu} CFU • ~{studyHours}h</span>
                                  </TooltipTrigger>
                                  <TooltipContent className="font-mono text-xs">
                                    {exam.cfu} × {BASE_HOURS_PER_CFU}h × {DIFFICULTY_MULTIPLIERS[exam.difficolta]} ({difficultyLabels[exam.difficolta]}) = {studyHours}h
                                  </TooltipContent>
                                </Tooltip>
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
                      );
                    })}
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
    </TooltipProvider>
  );
};
