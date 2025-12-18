import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  ArrowLeft,
  Plus,
  Sparkles,
  Download,
  Share2,
  Trash2,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { SessionExamInput, type SessionExam } from "@/components/tools/SessionExamInput";
import { SessionCalendarView } from "@/components/tools/SessionCalendarView";
import { SessionPlanOutput } from "@/components/tools/SessionPlanOutput";
import { SessionShareExport } from "@/components/tools/SessionShareExport";
import { toast } from "@/hooks/use-toast";

const STORAGE_KEY = "junglerent_exam_session_v1";

const ExamSessionPlanner = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language?.startsWith('it') ? 'it' : 'en';
  
  const [exams, setExams] = useState<SessionExam[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [activeTab, setActiveTab] = useState("input");
  const [cfuMax, setCfuMax] = useState(30);
  
  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Convert date strings back to Date objects
        const examsWithDates = parsed.exams?.map((e: SessionExam) => ({
          ...e,
          dataAppello: e.dataAppello ? new Date(e.dataAppello) : undefined
        })) || [];
        setExams(examsWithDates);
        setCfuMax(parsed.cfuMax || 30);
      } catch (e) {
        console.error("Failed to parse saved exams", e);
      }
    }
  }, []);
  
  // Save to localStorage
  useEffect(() => {
    if (exams.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ exams, cfuMax }));
    }
  }, [exams, cfuMax]);
  
  const addExam = (exam: SessionExam) => {
    setExams(prev => [...prev, exam]);
    toast({
      title: currentLang === 'it' ? "Esame aggiunto" : "Exam added",
      description: exam.nome,
    });
  };
  
  const removeExam = (id: string) => {
    setExams(prev => prev.filter(e => e.id !== id));
  };
  
  const updateExam = (id: string, updates: Partial<SessionExam>) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };
  
  const clearAll = () => {
    setExams([]);
    localStorage.removeItem(STORAGE_KEY);
    toast({
      title: currentLang === 'it' ? "Dati cancellati" : "Data cleared",
    });
  };
  
  const totalCfu = exams.reduce((sum, e) => sum + e.cfu, 0);
  const avgDifficulty = exams.length > 0 
    ? exams.reduce((sum, e) => sum + e.difficolta, 0) / exams.length 
    : 0;
  
  const content = {
    it: {
      title: "Organizzatore Sessione Esami",
      subtitle: "Pianifica la tua sessione d'esame in modo ottimale",
      seoTitle: "Organizzatore Sessione Esami | Jungle Rent",
      seoDesc: "Pianifica la tua sessione universitaria: inserisci esami, CFU e date appello. Calendario visivo e ottimizzazione automatica.",
      tabs: {
        input: "Aggiungi Esami",
        calendar: "Calendario",
        plan: "Piano Sessione"
      },
      stats: {
        exams: "Esami",
        cfu: "CFU Totali",
        avgDiff: "Difficoltà Media",
        hours: "Ore Studio Stimate"
      },
      actions: {
        clear: "Cancella tutto",
        export: "Esporta PDF",
        share: "Condividi"
      },
      warnings: {
        noExams: "Aggiungi almeno un esame per iniziare",
        overload: "Attenzione: CFU totali elevati!"
      },
      backToTools: "Strumenti studenti"
    },
    en: {
      title: "Exam Session Planner",
      subtitle: "Plan your exam session optimally",
      seoTitle: "Exam Session Planner | Jungle Rent",
      seoDesc: "Plan your university session: add exams, credits and exam dates. Visual calendar and automatic optimization.",
      tabs: {
        input: "Add Exams",
        calendar: "Calendar",
        plan: "Session Plan"
      },
      stats: {
        exams: "Exams",
        cfu: "Total Credits",
        avgDiff: "Avg Difficulty",
        hours: "Est. Study Hours"
      },
      actions: {
        clear: "Clear all",
        export: "Export PDF",
        share: "Share"
      },
      warnings: {
        noExams: "Add at least one exam to start",
        overload: "Warning: High total credits!"
      },
      backToTools: "Student tools"
    }
  };
  
  const c = content[currentLang];
  const difficultyEmojis = ["", "😊", "😐", "😰", "💀"];
  
  return (
    <>
      <Helmet>
        <title>{c.seoTitle}</title>
        <meta name="description" content={c.seoDesc} />
      </Helmet>
      
      <Navigation />
      
      <main className="min-h-screen bg-background pt-20 pb-24">
        {/* Header */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <Link 
              to="/studenti/strumenti" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {c.backToTools}
            </Link>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {c.title}
                </h1>
                <p className="text-muted-foreground">{c.subtitle}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Stats Bar */}
        {exams.length > 0 && (
          <section className="border-b border-border/50 bg-muted/30">
            <div className="container mx-auto px-4 py-4">
              <div className="flex flex-wrap gap-4 md:gap-8 justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{exams.length}</div>
                  <div className="text-xs text-muted-foreground">{c.stats.exams}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground flex items-center justify-center gap-1">
                    {totalCfu}
                    {totalCfu > 36 && <AlertTriangle className="w-4 h-4 text-amber-500" />}
                  </div>
                  <div className="text-xs text-muted-foreground">{c.stats.cfu}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">
                    {difficultyEmojis[Math.round(avgDifficulty)]} {avgDifficulty.toFixed(1)}
                  </div>
                  <div className="text-xs text-muted-foreground">{c.stats.avgDiff}</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{totalCfu * 25}h</div>
                  <div className="text-xs text-muted-foreground">{c.stats.hours}</div>
                </div>
              </div>
            </div>
          </section>
        )}
        
        {/* Main Content */}
        <section className="py-6 md:py-8">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <TabsList className="grid w-full md:w-auto grid-cols-3">
                  <TabsTrigger value="input" className="gap-1">
                    <Plus className="w-4 h-4" />
                    <span className="hidden sm:inline">{c.tabs.input}</span>
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="gap-1">
                    <Calendar className="w-4 h-4" />
                    <span className="hidden sm:inline">{c.tabs.calendar}</span>
                  </TabsTrigger>
                  <TabsTrigger value="plan" className="gap-1">
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden sm:inline">{c.tabs.plan}</span>
                  </TabsTrigger>
                </TabsList>
                
                {exams.length > 0 && (
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={clearAll}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      {c.actions.clear}
                    </Button>
                  </div>
                )}
              </div>
              
              <TabsContent value="input" className="mt-0">
                <div className="grid lg:grid-cols-2 gap-6">
                  <SessionExamInput 
                    onAdd={addExam}
                    existingExams={exams}
                    lang={currentLang}
                  />
                  
                  {/* Exam List */}
                  <Card>
                    <CardHeader className="pb-3">
                      <CardTitle className="text-lg">
                        {currentLang === 'it' ? 'Esami inseriti' : 'Added exams'} ({exams.length})
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {exams.length === 0 ? (
                        <div className="text-center py-8 text-muted-foreground">
                          <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
                          <p>{c.warnings.noExams}</p>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-[400px] overflow-y-auto">
                          {exams.map((exam) => (
                            <div 
                              key={exam.id}
                              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 group hover:bg-muted transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <span className="text-xl">{difficultyEmojis[exam.difficolta]}</span>
                                <div>
                                  <div className="font-medium text-foreground">{exam.nome}</div>
                                  <div className="text-xs text-muted-foreground">
                                    {exam.cfu} CFU
                                    {exam.dataAppello && (
                                      <> • {exam.dataAppello.toLocaleDateString(currentLang === 'it' ? 'it-IT' : 'en-US')}</>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeExam(exam.id)}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              
              <TabsContent value="calendar" className="mt-0">
                <SessionCalendarView 
                  exams={exams}
                  selectedDate={selectedDate}
                  onSelectDate={setSelectedDate}
                  onUpdateExam={updateExam}
                  lang={currentLang}
                />
              </TabsContent>
              
              <TabsContent value="plan" className="mt-0">
                <SessionPlanOutput 
                  exams={exams}
                  cfuMax={cfuMax}
                  onCfuMaxChange={setCfuMax}
                  lang={currentLang}
                />
                
                {exams.length > 0 && (
                  <div className="mt-6">
                    <SessionShareExport 
                      exams={exams}
                      cfuMax={cfuMax}
                      lang={currentLang}
                    />
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      
      <Footer />
      <BottomNav />
    </>
  );
};

export default ExamSessionPlanner;
