import { useState, useMemo } from "react";
import { Plus, Calendar as CalendarIcon, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { it, enUS } from "date-fns/locale";

// Difficulty multipliers for study hours calculation
const DIFFICULTY_MULTIPLIERS = [0, 0.8, 1.0, 1.2, 1.4];
const BASE_HOURS_PER_CFU = 25;

const calculateStudyHours = (cfu: number, difficulty: number): number => {
  return Math.round(cfu * BASE_HOURS_PER_CFU * DIFFICULTY_MULTIPLIERS[difficulty]);
};

export interface SessionExam {
  id: string;
  nome: string;
  cfu: number;
  difficolta: 1 | 2 | 3 | 4;
  propedeuticoId?: string;
  dataAppello?: Date;
  sessione?: 'invernale' | 'estiva' | 'autunnale';
}

interface SessionExamInputProps {
  onAdd: (exam: SessionExam) => void;
  existingExams: SessionExam[];
  lang: 'it' | 'en';
}

export const SessionExamInput = ({ onAdd, existingExams, lang }: SessionExamInputProps) => {
  const [nome, setNome] = useState("");
  const [cfu, setCfu] = useState(6);
  const [difficolta, setDifficolta] = useState<1 | 2 | 3 | 4>(2);
  const [propedeuticoId, setPropedeuticoId] = useState<string>("");
  const [dataAppello, setDataAppello] = useState<Date | undefined>();
  const [sessione, setSessione] = useState<'invernale' | 'estiva' | 'autunnale'>('estiva');
  
  const content = {
    it: {
      title: "Aggiungi Esame",
      name: "Nome esame",
      namePlaceholder: "es. Analisi Matematica I",
      cfu: "Crediti (CFU)",
      difficulty: "Difficoltà percepita",
      difficultyLevels: ["", "😊 Facile", "😐 Media", "😰 Difficile", "💀 Boss finale"],
      prerequisite: "Propedeuticità",
      prerequisitePlaceholder: "Seleziona esame",
      noPrerequisite: "Nessuna",
      examDate: "Data appello",
      selectDate: "Seleziona data",
      session: "Sessione",
      sessions: {
        invernale: "Invernale (Gen-Feb)",
        estiva: "Estiva (Giu-Lug)",
        autunnale: "Autunnale (Set)"
      },
      add: "Aggiungi esame",
      studyHours: "Ore studio stimate",
      hoursFormula: "ore",
      circularWarning: "Dipendenza circolare! Questo creerebbe un loop."
    },
    en: {
      title: "Add Exam",
      name: "Exam name",
      namePlaceholder: "e.g. Calculus I",
      cfu: "Credits (CFU)",
      difficulty: "Perceived difficulty",
      difficultyLevels: ["", "😊 Easy", "😐 Medium", "😰 Hard", "💀 Final boss"],
      prerequisite: "Prerequisite",
      prerequisitePlaceholder: "Select exam",
      noPrerequisite: "None",
      examDate: "Exam date",
      selectDate: "Select date",
      session: "Session",
      sessions: {
        invernale: "Winter (Jan-Feb)",
        estiva: "Summer (Jun-Jul)",
        autunnale: "Fall (Sep)"
      },
      add: "Add exam",
      studyHours: "Est. study hours",
      hoursFormula: "hours",
      circularWarning: "Circular dependency detected! This would create a loop."
    }
  };
  
  const c = content[lang];
  
  // Calculate study hours with multiplier
  const estimatedHours = calculateStudyHours(cfu, difficolta);
  const difficultyLabel = c.difficultyLevels[difficolta].split(" ")[1];
  
  // Check for circular dependencies
  const hasCircularDependency = useMemo(() => {
    if (!propedeuticoId || propedeuticoId === 'none') return false;
    
    // Build dependency chain
    const visited = new Set<string>();
    let currentId: string | undefined = propedeuticoId;
    
    while (currentId && currentId !== 'none') {
      if (visited.has(currentId)) return true; // Cycle detected
      visited.add(currentId);
      const exam = existingExams.find(e => e.id === currentId);
      currentId = exam?.propedeuticoId;
    }
    
    return false;
  }, [propedeuticoId, existingExams]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nome.trim()) return;
    
    const newExam: SessionExam = {
      id: crypto.randomUUID(),
      nome: nome.trim(),
      cfu,
      difficolta,
      propedeuticoId: propedeuticoId || undefined,
      dataAppello,
      sessione
    };
    
    onAdd(newExam);
    
    // Reset form
    setNome("");
    setCfu(6);
    setDifficolta(2);
    setPropedeuticoId("");
    setDataAppello(undefined);
  };
  
  const difficultyColors = [
    "",
    "bg-green-100 border-green-300 text-green-700",
    "bg-yellow-100 border-yellow-300 text-yellow-700",
    "bg-orange-100 border-orange-300 text-orange-700",
    "bg-red-100 border-red-300 text-red-700"
  ];
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          {c.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Exam Name */}
          <div className="space-y-2">
            <Label htmlFor="exam-name">{c.name}</Label>
            <Input
              id="exam-name"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder={c.namePlaceholder}
              required
            />
          </div>
          
          {/* CFU Slider */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label>{c.cfu}</Label>
              <span className="text-sm font-medium text-primary">{cfu} CFU</span>
            </div>
            <Slider
              value={[cfu]}
              onValueChange={([val]) => setCfu(val)}
              min={1}
              max={30}
              step={1}
              className="py-2"
            />
            <div className="text-xs text-muted-foreground text-right space-y-0.5">
              <div>{c.studyHours}: <span className="font-medium text-foreground">~{estimatedHours}h</span></div>
              <div className="font-mono text-[10px] opacity-70">
                {cfu} × {BASE_HOURS_PER_CFU}h × {DIFFICULTY_MULTIPLIERS[difficolta]} ({difficultyLabel}) = {estimatedHours}h
              </div>
            </div>
          </div>
          
          {/* Difficulty */}
          <div className="space-y-2">
            <Label>{c.difficulty}</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficolta(level as 1 | 2 | 3 | 4)}
                  className={cn(
                    "flex-1 py-3 px-2 rounded-lg border-2 transition-all text-center",
                    difficolta === level 
                      ? difficultyColors[level] + " ring-2 ring-offset-2 ring-primary/30"
                      : "border-border bg-muted/30 hover:bg-muted"
                  )}
                >
                  <span className="text-lg">{c.difficultyLevels[level].split(" ")[0]}</span>
                  <div className="text-xs mt-1">{c.difficultyLevels[level].split(" ")[1]}</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Session */}
          <div className="space-y-2">
            <Label>{c.session}</Label>
            <Select value={sessione} onValueChange={(v) => setSessione(v as typeof sessione)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="invernale">{c.sessions.invernale}</SelectItem>
                <SelectItem value="estiva">{c.sessions.estiva}</SelectItem>
                <SelectItem value="autunnale">{c.sessions.autunnale}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Exam Date */}
          <div className="space-y-2">
            <Label>{c.examDate}</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !dataAppello && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dataAppello 
                    ? format(dataAppello, "PPP", { locale: lang === 'it' ? it : enUS })
                    : c.selectDate
                  }
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={dataAppello}
                  onSelect={setDataAppello}
                  initialFocus
                  locale={lang === 'it' ? it : enUS}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          {/* Prerequisite */}
          {existingExams.length > 0 && (
            <div className="space-y-2">
              <Label>{c.prerequisite}</Label>
              <Select value={propedeuticoId} onValueChange={setPropedeuticoId}>
                <SelectTrigger className={cn(hasCircularDependency && "border-destructive")}>
                  <SelectValue placeholder={c.prerequisitePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">{c.noPrerequisite}</SelectItem>
                  {existingExams.map((exam) => (
                    <SelectItem key={exam.id} value={exam.id}>
                      {exam.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {hasCircularDependency && (
                <Alert variant="destructive" className="py-2">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-xs">
                    {c.circularWarning}
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          
          <Button type="submit" className="w-full" disabled={!nome.trim() || hasCircularDependency}>
            <Plus className="w-4 h-4 mr-2" />
            {c.add}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
