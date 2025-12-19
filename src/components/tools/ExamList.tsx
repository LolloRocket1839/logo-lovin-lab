import { useState, useMemo } from "react";
import { Edit2, Copy, Trash2, Calendar, GraduationCap, MoreVertical, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExamListFilters, type ExamFilters } from "./ExamListFilters";
import type { SessionExam } from "./SessionExamInput";

interface ExamListProps {
  exams: SessionExam[];
  onEdit: (exam: SessionExam) => void;
  onDuplicate: (exam: SessionExam) => void;
  onDelete: (id: string) => void;
  onAddNew: () => void;
  lang: 'it' | 'en';
}

const DIFFICULTY_MULTIPLIERS = [0, 0.8, 1.0, 1.2, 1.4];
const BASE_HOURS_PER_CFU = 25;

export const ExamList = ({ exams, onEdit, onDuplicate, onDelete, onAddNew, lang }: ExamListProps) => {
  const [filters, setFilters] = useState<ExamFilters>({
    search: '',
    sessione: 'all',
    difficolta: 'all',
    cfuRange: [1, 30]
  });

  const content = {
    it: {
      title: "I tuoi esami",
      empty: "Nessun esame trovato",
      emptyDesc: "Aggiungi il tuo primo esame per iniziare a pianificare",
      noResults: "Nessun risultato",
      noResultsDesc: "Prova a modificare i filtri di ricerca",
      addExam: "Aggiungi esame",
      actions: {
        edit: "Modifica",
        duplicate: "Duplica",
        delete: "Elimina"
      },
      sessions: {
        invernale: "Inv",
        estiva: "Est",
        autunnale: "Aut"
      },
      hours: "ore"
    },
    en: {
      title: "Your exams",
      empty: "No exams found",
      emptyDesc: "Add your first exam to start planning",
      noResults: "No results",
      noResultsDesc: "Try modifying your search filters",
      addExam: "Add exam",
      actions: {
        edit: "Edit",
        duplicate: "Duplicate",
        delete: "Delete"
      },
      sessions: {
        invernale: "Win",
        estiva: "Sum",
        autunnale: "Fall"
      },
      hours: "hours"
    }
  };

  const c = content[lang];
  const difficultyEmojis = ["", "😊", "😐", "😰", "💀"];
  const difficultyLabels = lang === 'it' 
    ? ["", "Facile", "Media", "Difficile", "Boss"]
    : ["", "Easy", "Medium", "Hard", "Boss"];

  // Filter exams
  const filteredExams = useMemo(() => {
    return exams.filter(exam => {
      // Search filter
      if (filters.search && !exam.nome.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      // Session filter
      if (filters.sessione !== 'all' && exam.sessione !== filters.sessione) {
        return false;
      }
      // Difficulty filter
      if (filters.difficolta !== 'all' && exam.difficolta !== parseInt(filters.difficolta)) {
        return false;
      }
      // CFU range filter
      if (exam.cfu < filters.cfuRange[0] || exam.cfu > filters.cfuRange[1]) {
        return false;
      }
      return true;
    });
  }, [exams, filters]);

  const calculateHours = (cfu: number, difficulty: number) => {
    return Math.round(cfu * BASE_HOURS_PER_CFU * DIFFICULTY_MULTIPLIERS[difficulty]);
  };

  if (exams.length === 0) {
    return (
      <Card className="border-dashed">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
            <GraduationCap className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-medium text-foreground mb-1">{c.empty}</h3>
          <p className="text-sm text-muted-foreground mb-4">{c.emptyDesc}</p>
          <Button onClick={onAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            {c.addExam}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-primary" />
            {c.title} ({exams.length})
          </CardTitle>
          <Button size="sm" onClick={onAddNew}>
            <Plus className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">{c.addExam}</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ExamListFilters 
          filters={filters} 
          onFiltersChange={setFilters} 
          lang={lang} 
        />

        {filteredExams.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="font-medium">{c.noResults}</p>
            <p className="text-sm">{c.noResultsDesc}</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[500px] overflow-y-auto">
            {filteredExams.map((exam) => (
              <div 
                key={exam.id}
                className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
              >
                {/* Difficulty Emoji */}
                <div className="flex flex-col items-center min-w-[40px]">
                  <span className="text-2xl">{difficultyEmojis[exam.difficolta]}</span>
                  <span className="text-[10px] text-muted-foreground">{difficultyLabels[exam.difficolta]}</span>
                </div>

                {/* Exam Info */}
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-foreground truncate">{exam.nome}</div>
                  <div className="flex flex-wrap items-center gap-1.5 mt-1">
                    <Badge variant="outline" className="text-xs px-1.5 py-0">
                      {exam.cfu} CFU
                    </Badge>
                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                      ~{calculateHours(exam.cfu, exam.difficolta)}h
                    </Badge>
                    {exam.sessione && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0 bg-primary/5">
                        {c.sessions[exam.sessione]}
                      </Badge>
                    )}
                    {exam.dataAppello && (
                      <Badge variant="outline" className="text-xs px-1.5 py-0 gap-0.5">
                        <Calendar className="w-3 h-3" />
                        {exam.dataAppello.toLocaleDateString(lang === 'it' ? 'it-IT' : 'en-US', { 
                          day: '2-digit', 
                          month: 'short' 
                        })}
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 shrink-0 opacity-0 group-hover:opacity-100 focus:opacity-100 transition-opacity"
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-background">
                    <DropdownMenuItem onClick={() => onEdit(exam)} className="cursor-pointer">
                      <Edit2 className="w-4 h-4 mr-2" />
                      {c.actions.edit}
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDuplicate(exam)} className="cursor-pointer">
                      <Copy className="w-4 h-4 mr-2" />
                      {c.actions.duplicate}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => onDelete(exam.id)} 
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      {c.actions.delete}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
