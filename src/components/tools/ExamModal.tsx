import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Check, BookOpen, BarChart3, Link2, AlertCircle, Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { it, enUS } from "date-fns/locale";
import type { SessionExam } from "./SessionExamInput";

// Difficulty multipliers for study hours calculation
const DIFFICULTY_MULTIPLIERS = [0, 0.8, 1.0, 1.2, 1.4];
const BASE_HOURS_PER_CFU = 25;

const calculateStudyHours = (cfu: number, difficulty: number): number => {
  return Math.round(cfu * BASE_HOURS_PER_CFU * DIFFICULTY_MULTIPLIERS[difficulty]);
};

interface ExamModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (exam: SessionExam) => void;
  existingExams: SessionExam[];
  editExam?: SessionExam | null;
  lang: 'it' | 'en';
}

export const ExamModal = ({ 
  open, 
  onOpenChange, 
  onSave, 
  existingExams, 
  editExam = null,
  lang 
}: ExamModalProps) => {
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState("");
  const [cfu, setCfu] = useState(6);
  const [difficolta, setDifficolta] = useState<1 | 2 | 3 | 4>(2);
  const [propedeuticoId, setPropedeuticoId] = useState<string>("");
  const [dataAppello, setDataAppello] = useState<Date | undefined>();
  const [sessione, setSessione] = useState<'invernale' | 'estiva' | 'autunnale'>('estiva');

  // Reset form when modal opens/closes or editExam changes
  useEffect(() => {
    if (open) {
      if (editExam) {
        setNome(editExam.nome);
        setCfu(editExam.cfu);
        setDifficolta(editExam.difficolta);
        setPropedeuticoId(editExam.propedeuticoId || "");
        setDataAppello(editExam.dataAppello);
        setSessione(editExam.sessione || 'estiva');
      } else {
        resetForm();
      }
      setStep(1);
    }
  }, [open, editExam]);

  const resetForm = () => {
    setNome("");
    setCfu(6);
    setDifficolta(2);
    setPropedeuticoId("");
    setDataAppello(undefined);
    setSessione('estiva');
  };

  const content = {
    it: {
      addTitle: "Aggiungi Esame",
      editTitle: "Modifica Esame",
      steps: ["Dati base", "Stima carico", "Vincoli"],
      step1: {
        name: "Nome esame",
        namePlaceholder: "es. Analisi Matematica I",
        cfu: "Crediti (CFU)",
      },
      step2: {
        difficulty: "Difficoltà percepita",
        difficultyLevels: ["", "Facile", "Media", "Difficile", "Boss finale"],
        difficultyEmojis: ["", "😊", "😐", "😰", "💀"],
        studyHours: "Ore studio stimate",
        formula: "Formula",
        multipliers: "Moltiplicatori: Facile 0.8 • Media 1.0 • Difficile 1.2 • Boss 1.4"
      },
      step3: {
        session: "Sessione preferita",
        sessions: {
          invernale: "Invernale (Gen-Feb)",
          estiva: "Estiva (Giu-Lug)",
          autunnale: "Autunnale (Set)"
        },
        examDate: "Data appello",
        selectDate: "Seleziona data",
        prerequisite: "Propedeuticità",
        prerequisitePlaceholder: "Seleziona esame",
        noPrerequisite: "Nessuna",
        circularWarning: "Dipendenza circolare! Questo creerebbe un loop."
      },
      actions: {
        back: "Indietro",
        next: "Avanti",
        save: "Salva esame"
      }
    },
    en: {
      addTitle: "Add Exam",
      editTitle: "Edit Exam",
      steps: ["Base info", "Study load", "Constraints"],
      step1: {
        name: "Exam name",
        namePlaceholder: "e.g. Calculus I",
        cfu: "Credits (CFU)",
      },
      step2: {
        difficulty: "Perceived difficulty",
        difficultyLevels: ["", "Easy", "Medium", "Hard", "Final boss"],
        difficultyEmojis: ["", "😊", "😐", "😰", "💀"],
        studyHours: "Est. study hours",
        formula: "Formula",
        multipliers: "Multipliers: Easy 0.8 • Medium 1.0 • Hard 1.2 • Boss 1.4"
      },
      step3: {
        session: "Preferred session",
        sessions: {
          invernale: "Winter (Jan-Feb)",
          estiva: "Summer (Jun-Jul)",
          autunnale: "Fall (Sep)"
        },
        examDate: "Exam date",
        selectDate: "Select date",
        prerequisite: "Prerequisite",
        prerequisitePlaceholder: "Select exam",
        noPrerequisite: "None",
        circularWarning: "Circular dependency detected!"
      },
      actions: {
        back: "Back",
        next: "Next",
        save: "Save exam"
      }
    }
  };

  const c = content[lang];
  const estimatedHours = calculateStudyHours(cfu, difficolta);

  // Filter out current exam from prerequisites list when editing
  const availablePrerequisites = useMemo(() => {
    if (editExam) {
      return existingExams.filter(e => e.id !== editExam.id);
    }
    return existingExams;
  }, [existingExams, editExam]);

  // Check for circular dependencies
  const hasCircularDependency = useMemo(() => {
    if (!propedeuticoId || propedeuticoId === 'none') return false;
    
    const visited = new Set<string>();
    let currentId: string | undefined = propedeuticoId;
    
    while (currentId && currentId !== 'none') {
      if (visited.has(currentId)) return true;
      visited.add(currentId);
      const exam = existingExams.find(e => e.id === currentId);
      currentId = exam?.propedeuticoId;
    }
    
    return false;
  }, [propedeuticoId, existingExams]);

  const canProceed = () => {
    if (step === 1) return nome.trim().length > 0;
    if (step === 3) return !hasCircularDependency;
    return true;
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleSave = () => {
    const exam: SessionExam = {
      id: editExam?.id || crypto.randomUUID(),
      nome: nome.trim(),
      cfu,
      difficolta,
      propedeuticoId: propedeuticoId && propedeuticoId !== 'none' ? propedeuticoId : undefined,
      dataAppello,
      sessione
    };
    
    onSave(exam);
    onOpenChange(false);
  };

  const difficultyColors = [
    "",
    "bg-green-100 border-green-400 text-green-700 dark:bg-green-900/30 dark:border-green-600 dark:text-green-400",
    "bg-yellow-100 border-yellow-400 text-yellow-700 dark:bg-yellow-900/30 dark:border-yellow-600 dark:text-yellow-400",
    "bg-orange-100 border-orange-400 text-orange-700 dark:bg-orange-900/30 dark:border-orange-600 dark:text-orange-400",
    "bg-red-100 border-red-400 text-red-700 dark:bg-red-900/30 dark:border-red-600 dark:text-red-400"
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {editExam ? c.editTitle : c.addTitle}
          </DialogTitle>
        </DialogHeader>

        {/* Step Progress */}
        <div className="flex items-center justify-between mb-6">
          {c.steps.map((stepName, index) => {
            const stepNum = index + 1;
            const isActive = step === stepNum;
            const isCompleted = step > stepNum;
            const icons = [BookOpen, BarChart3, Link2];
            const Icon = icons[index];

            return (
              <div key={stepNum} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all",
                      isCompleted && "bg-primary border-primary text-primary-foreground",
                      isActive && "border-primary bg-primary/10 text-primary",
                      !isActive && !isCompleted && "border-muted-foreground/30 text-muted-foreground"
                    )}
                  >
                    {isCompleted ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>
                  <span className={cn(
                    "text-xs mt-1 text-center",
                    isActive ? "text-primary font-medium" : "text-muted-foreground"
                  )}>
                    {stepName}
                  </span>
                </div>
                {index < 2 && (
                  <div className={cn(
                    "h-0.5 flex-1 mx-2 mt-[-20px]",
                    isCompleted ? "bg-primary" : "bg-muted"
                  )} />
                )}
              </div>
            );
          })}
        </div>

        {/* Step 1: Base Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="exam-name" className="text-base">{c.step1.name} *</Label>
              <Input
                id="exam-name"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder={c.step1.namePlaceholder}
                className="text-lg h-12"
                autoFocus
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="text-base">{c.step1.cfu}</Label>
                <span className="text-2xl font-bold text-primary">{cfu} CFU</span>
              </div>
              <Slider
                value={[cfu]}
                onValueChange={([val]) => setCfu(val)}
                min={1}
                max={30}
                step={1}
                className="py-4"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>1</span>
                <span>15</span>
                <span>30</span>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Study Load */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-3">
              <Label className="text-base">{c.step2.difficulty}</Label>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setDifficolta(level as 1 | 2 | 3 | 4)}
                    className={cn(
                      "py-4 px-3 rounded-xl border-2 transition-all flex flex-col items-center gap-1",
                      difficolta === level 
                        ? difficultyColors[level] + " ring-2 ring-offset-2 ring-primary/30"
                        : "border-border bg-muted/30 hover:bg-muted"
                    )}
                  >
                    <span className="text-2xl">{c.step2.difficultyEmojis[level]}</span>
                    <span className="text-sm font-medium">{c.step2.difficultyLevels[level]}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl bg-primary/5 border border-primary/20">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm text-muted-foreground">{c.step2.studyHours}</span>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <span className="text-3xl font-bold text-primary cursor-help">~{estimatedHours}h</span>
                    </TooltipTrigger>
                    <TooltipContent side="left" className="max-w-xs">
                      <p className="text-xs">{c.step2.multipliers}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="font-mono text-xs text-muted-foreground bg-muted/50 rounded p-2">
                {cfu} CFU × {BASE_HOURS_PER_CFU}h × {DIFFICULTY_MULTIPLIERS[difficolta]} = {estimatedHours}h
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Constraints */}
        {step === 3 && (
          <div className="space-y-5">
            <div className="space-y-2">
              <Label className="text-base">{c.step3.session}</Label>
              <Select value={sessione} onValueChange={(v) => setSessione(v as typeof sessione)}>
                <SelectTrigger className="h-12">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="invernale">{c.step3.sessions.invernale}</SelectItem>
                  <SelectItem value="estiva">{c.step3.sessions.estiva}</SelectItem>
                  <SelectItem value="autunnale">{c.step3.sessions.autunnale}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-base">{c.step3.examDate}</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full h-12 justify-start text-left font-normal",
                      !dataAppello && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-5 w-5" />
                    {dataAppello 
                      ? format(dataAppello, "PPP", { locale: lang === 'it' ? it : enUS })
                      : c.step3.selectDate
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

            {availablePrerequisites.length > 0 && (
              <div className="space-y-2">
                <Label className="text-base">{c.step3.prerequisite}</Label>
                <Select value={propedeuticoId || "none"} onValueChange={setPropedeuticoId}>
                  <SelectTrigger className={cn("h-12", hasCircularDependency && "border-destructive")}>
                    <SelectValue placeholder={c.step3.prerequisitePlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">{c.step3.noPrerequisite}</SelectItem>
                    {availablePrerequisites.map((exam) => (
                      <SelectItem key={exam.id} value={exam.id}>
                        {exam.nome} ({exam.cfu} CFU)
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {hasCircularDependency && (
                  <Alert variant="destructive" className="py-2">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription className="text-xs">
                      {c.step3.circularWarning}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 mt-6 pt-4 border-t">
          {step > 1 ? (
            <Button variant="outline" onClick={handleBack} className="flex-1">
              <ChevronLeft className="w-4 h-4 mr-1" />
              {c.actions.back}
            </Button>
          ) : (
            <div className="flex-1" />
          )}

          {step < 3 ? (
            <Button 
              onClick={handleNext} 
              disabled={!canProceed()}
              className="flex-1"
            >
              {c.actions.next}
              <ChevronRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button 
              onClick={handleSave} 
              disabled={!canProceed()}
              className="flex-1"
            >
              <Check className="w-4 h-4 mr-1" />
              {c.actions.save}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
