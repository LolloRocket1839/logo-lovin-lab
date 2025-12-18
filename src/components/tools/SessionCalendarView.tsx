import { useState, useMemo } from "react";
import { ChevronLeft, ChevronRight, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format, isSameDay, startOfMonth, endOfMonth, eachDayOfInterval, addMonths, subMonths } from "date-fns";
import { it, enUS } from "date-fns/locale";
import type { SessionExam } from "./SessionExamInput";

interface SessionCalendarViewProps {
  exams: SessionExam[];
  selectedDate?: Date;
  onSelectDate: (date: Date | undefined) => void;
  onUpdateExam: (id: string, updates: Partial<SessionExam>) => void;
  lang: 'it' | 'en';
}

export const SessionCalendarView = ({ 
  exams, 
  selectedDate, 
  onSelectDate,
  onUpdateExam,
  lang 
}: SessionCalendarViewProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const content = {
    it: {
      title: "Calendario Sessione",
      noExams: "Nessun esame in questo giorno",
      examDetails: "Dettagli esame",
      cfu: "CFU",
      studyHours: "Ore studio stimate",
      difficulty: "Difficoltà",
      warning: "Attenzione: più esami nello stesso giorno!",
      changeDate: "Cambia data",
      legend: "Legenda",
      easy: "Facile",
      medium: "Media",
      hard: "Difficile",
      boss: "Boss finale"
    },
    en: {
      title: "Session Calendar",
      noExams: "No exam on this day",
      examDetails: "Exam details",
      cfu: "Credits",
      studyHours: "Est. study hours",
      difficulty: "Difficulty",
      warning: "Warning: multiple exams on same day!",
      changeDate: "Change date",
      legend: "Legend",
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      boss: "Final boss"
    }
  };
  
  const c = content[lang];
  const difficultyEmojis = ["", "😊", "😐", "😰", "💀"];
  const difficultyLabels = ["", c.easy, c.medium, c.hard, c.boss];
  
  // Get exams with dates
  const examsWithDates = useMemo(() => 
    exams.filter(e => e.dataAppello), 
    [exams]
  );
  
  // Group exams by date
  const examsByDate = useMemo(() => {
    const map = new Map<string, SessionExam[]>();
    examsWithDates.forEach(exam => {
      if (exam.dataAppello) {
        const key = format(exam.dataAppello, 'yyyy-MM-dd');
        const existing = map.get(key) || [];
        map.set(key, [...existing, exam]);
      }
    });
    return map;
  }, [examsWithDates]);
  
  // Get exams for selected date
  const selectedDateExams = useMemo(() => {
    if (!selectedDate) return [];
    const key = format(selectedDate, 'yyyy-MM-dd');
    return examsByDate.get(key) || [];
  }, [selectedDate, examsByDate]);
  
  // Custom day render for calendar
  const getDayContent = (day: Date) => {
    const key = format(day, 'yyyy-MM-dd');
    const dayExams = examsByDate.get(key);
    
    if (!dayExams || dayExams.length === 0) return null;
    
    const maxDifficulty = Math.max(...dayExams.map(e => e.difficolta));
    const difficultyColors = [
      "",
      "bg-green-500",
      "bg-yellow-500",
      "bg-orange-500",
      "bg-red-500"
    ];
    
    return (
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-0.5">
        {dayExams.length > 1 ? (
          <div className={cn("w-2 h-2 rounded-full", difficultyColors[maxDifficulty])} />
        ) : (
          dayExams.map((exam, i) => (
            <div 
              key={i} 
              className={cn("w-2 h-2 rounded-full", difficultyColors[exam.difficolta])}
            />
          ))
        )}
      </div>
    );
  };
  
  // Get dates with exams for highlighting
  const datesWithExams = useMemo(() => 
    Array.from(examsByDate.keys()).map(key => new Date(key)),
    [examsByDate]
  );
  
  const difficultyColors = [
    "",
    "border-green-400 bg-green-50",
    "border-yellow-400 bg-yellow-50",
    "border-orange-400 bg-orange-50",
    "border-red-400 bg-red-50"
  ];
  
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      {/* Calendar */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">{c.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm font-medium min-w-[120px] text-center">
                {format(currentMonth, 'MMMM yyyy', { locale: lang === 'it' ? it : enUS })}
              </span>
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={onSelectDate}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            locale={lang === 'it' ? it : enUS}
            className="w-full pointer-events-auto"
            classNames={{
              months: "w-full",
              month: "w-full",
              table: "w-full",
              head_row: "flex w-full",
              head_cell: "flex-1 text-muted-foreground font-normal text-sm",
              row: "flex w-full mt-2",
              cell: cn(
                "flex-1 h-12 md:h-14 text-center text-sm p-0 relative",
                "[&:has([aria-selected])]:bg-primary/10 rounded-md"
              ),
              day: cn(
                "h-12 md:h-14 w-full p-0 font-normal",
                "hover:bg-muted rounded-md transition-colors",
                "flex flex-col items-center justify-center"
              ),
              day_selected: "bg-primary text-primary-foreground hover:bg-primary",
              day_today: "bg-accent text-accent-foreground",
              day_outside: "text-muted-foreground opacity-50",
            }}
            modifiers={{
              hasExam: datesWithExams
            }}
            modifiersClassNames={{
              hasExam: "font-bold"
            }}
            components={{
              DayContent: ({ date }) => (
                <div className="relative w-full h-full flex items-center justify-center">
                  <span>{date.getDate()}</span>
                  {getDayContent(date)}
                </div>
              )
            }}
          />
          
          {/* Legend */}
          <div className="mt-4 pt-4 border-t border-border">
            <div className="text-xs text-muted-foreground mb-2">{c.legend}:</div>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 3, 4].map((level) => (
                <div key={level} className="flex items-center gap-1 text-xs">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    level === 1 && "bg-green-500",
                    level === 2 && "bg-yellow-500",
                    level === 3 && "bg-orange-500",
                    level === 4 && "bg-red-500"
                  )} />
                  <span>{difficultyEmojis[level]} {difficultyLabels[level]}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Selected Day Details */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg">
            {selectedDate 
              ? format(selectedDate, "d MMMM yyyy", { locale: lang === 'it' ? it : enUS })
              : c.examDetails
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!selectedDate ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              {lang === 'it' 
                ? "Seleziona un giorno dal calendario" 
                : "Select a day from the calendar"
              }
            </p>
          ) : selectedDateExams.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-8">
              {c.noExams}
            </p>
          ) : (
            <div className="space-y-3">
              {selectedDateExams.length > 1 && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-amber-50 border border-amber-200 text-amber-700">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                  <span className="text-xs">{c.warning}</span>
                </div>
              )}
              
              {selectedDateExams.map((exam) => (
                <div 
                  key={exam.id}
                  className={cn(
                    "p-4 rounded-lg border-2",
                    difficultyColors[exam.difficolta]
                  )}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="font-semibold text-foreground">{exam.nome}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" className="text-xs">
                          {exam.cfu} {c.cfu}
                        </Badge>
                        <span className="text-xs text-muted-foreground">
                          {difficultyEmojis[exam.difficolta]} {difficultyLabels[exam.difficolta]}
                        </span>
                      </div>
                    </div>
                    <span className="text-2xl">{difficultyEmojis[exam.difficolta]}</span>
                  </div>
                  
                  <div className="text-xs text-muted-foreground">
                    {c.studyHours}: ~{exam.cfu * 25}h
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
