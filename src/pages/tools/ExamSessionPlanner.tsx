import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { 
  Calendar, 
  ArrowLeft,
  GraduationCap,
  Sparkles,
  MoreHorizontal,
  Trash2,
  AlertTriangle,
  Undo2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Navigation, Footer, BottomNav } from "@/components/layout";
import { type SessionExam } from "@/components/tools/SessionExamInput";
import { ExamModal } from "@/components/tools/ExamModal";
import { ExamList } from "@/components/tools/ExamList";
import { SessionCalendarView } from "@/components/tools/SessionCalendarView";
import { SessionPlanOutput } from "@/components/tools/SessionPlanOutput";
import { SessionShareExport } from "@/components/tools/SessionShareExport";
import { ExamSessionPlannerSchema, ExamSessionPlannerHowTo } from "@/components/tools/ToolStructuredData";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

const STORAGE_KEY = "junglerent_exam_session_v1";

const ExamSessionPlanner = () => {
  const { i18n, t } = useTranslation();
  const currentLang = i18n.language?.startsWith('it') ? 'it' : 'en';
  const isMobile = useIsMobile();
  
  const [exams, setExams] = useState<SessionExam[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [activeTab, setActiveTab] = useState("input");
  const [cfuMax, setCfuMax] = useState(30);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [deletedExams, setDeletedExams] = useState<SessionExam[] | null>(null);
  const undoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editingExam, setEditingExam] = useState<SessionExam | null>(null);
  
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
  
  const handleSaveExam = (exam: SessionExam) => {
    if (editingExam) {
      // Update existing
      setExams(prev => prev.map(e => e.id === exam.id ? exam : e));
      toast({
        title: currentLang === 'it' ? "Esame modificato" : "Exam updated",
        description: exam.nome,
      });
    } else {
      // Add new
      setExams(prev => [...prev, exam]);
      toast({
        title: currentLang === 'it' ? "Esame aggiunto" : "Exam added",
        description: exam.nome,
      });
    }
    setEditingExam(null);
  };
  
  const handleEditExam = (exam: SessionExam) => {
    setEditingExam(exam);
    setModalOpen(true);
  };
  
  const handleDuplicateExam = (exam: SessionExam) => {
    const duplicated: SessionExam = {
      ...exam,
      id: crypto.randomUUID(),
      nome: `${exam.nome} (${currentLang === 'it' ? 'copia' : 'copy'})`
    };
    setExams(prev => [...prev, duplicated]);
    toast({
      title: currentLang === 'it' ? "Esame duplicato" : "Exam duplicated",
      description: duplicated.nome,
    });
  };
  
  const handleAddNew = () => {
    setEditingExam(null);
    setModalOpen(true);
  };
  
  const removeExam = (id: string) => {
    const exam = exams.find(e => e.id === id);
    setExams(prev => prev.filter(e => e.id !== id));
    if (exam) {
      toast({
        title: currentLang === 'it' ? "Esame eliminato" : "Exam deleted",
        description: exam.nome,
      });
    }
  };
  
  const updateExam = (id: string, updates: Partial<SessionExam>) => {
    setExams(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };
  
  const clearAll = () => {
    // Save for undo
    setDeletedExams([...exams]);
    setExams([]);
    localStorage.removeItem(STORAGE_KEY);
    setShowClearDialog(false);
    
    // Clear any existing timeout
    if (undoTimeoutRef.current) {
      clearTimeout(undoTimeoutRef.current);
    }
    
    toast({
      title: currentLang === 'it' ? "Dati cancellati" : "Data cleared",
      description: currentLang === 'it' 
        ? "Clicca 'Annulla' per ripristinare" 
        : "Click 'Undo' to restore",
      action: (
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (deletedExams) {
              setExams(deletedExams);
              setDeletedExams(null);
              if (undoTimeoutRef.current) {
                clearTimeout(undoTimeoutRef.current);
              }
              toast({
                title: currentLang === 'it' ? "Dati ripristinati" : "Data restored",
              });
            }
          }}
          className="gap-1"
        >
          <Undo2 className="w-3 h-3" />
          {currentLang === 'it' ? 'Annulla' : 'Undo'}
        </Button>
      ),
    });
    
    // Clear undo data after 10 seconds
    undoTimeoutRef.current = setTimeout(() => {
      setDeletedExams(null);
    }, 10000);
  };
  
  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (undoTimeoutRef.current) {
        clearTimeout(undoTimeoutRef.current);
      }
    };
  }, []);
  
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
      {/* Exam Modal */}
      <ExamModal
        open={modalOpen}
        onOpenChange={setModalOpen}
        onSave={handleSaveExam}
        existingExams={exams}
        editExam={editingExam}
        lang={currentLang}
      />
      {/* IMPORTANT: Dynamic canonical based on current language for IT/EN routes */}
      <Helmet>
        <title>{c.seoTitle}</title>
        <meta name="description" content={c.seoDesc} />
        <link rel="canonical" href={`https://junglerent.it/${currentLang === 'en' ? 'students/tools/session' : 'studenti/strumenti/sessione'}`} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/studenti/strumenti/sessione" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/students/tools/session" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/studenti/strumenti/sessione" />
      </Helmet>
      <ExamSessionPlannerSchema />
      <ExamSessionPlannerHowTo />
      
      <Navigation />
      
      <main className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
        {/* Header */}
        <section className="py-4 md:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <Link 
              to="/studenti/strumenti" 
              className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-3 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              {c.backToTools}
            </Link>
            
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Calendar className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-xl md:text-3xl font-bold text-foreground">
                  {c.title}
                </h1>
                <p className="text-sm text-muted-foreground hidden md:block">{c.subtitle}</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Mobile Sticky Stats Header */}
        {exams.length > 0 && isMobile && (
          <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 py-3 px-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-xl font-bold text-primary">{exams.length}</div>
                  <div className="text-xs text-muted-foreground">{c.stats.exams}</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold flex items-center gap-1">
                    {totalCfu}
                    {totalCfu > 36 && <AlertTriangle className="w-3 h-3 text-amber-500" />}
                  </div>
                  <div className="text-xs text-muted-foreground">CFU</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-center">
                  <div className="text-lg font-semibold">{difficultyEmojis[Math.round(avgDifficulty)]}</div>
                  <div className="text-xs text-muted-foreground">{avgDifficulty.toFixed(1)}</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-semibold">{totalCfu * 25}h</div>
                  <div className="text-xs text-muted-foreground">{currentLang === 'it' ? 'Studio' : 'Study'}</div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Desktop Stats Bar */}
        {exams.length > 0 && !isMobile && (
          <section className="border-b border-border/50 bg-muted/30">
            <div className="container mx-auto px-4 py-4">
              <div className="flex gap-8 justify-center">
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
        <section className="py-4 md:py-8">
          <div className="container mx-auto px-4">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <div className="flex items-center justify-between gap-2 mb-4 md:mb-6">
                <TabsList className="grid w-full md:w-auto grid-cols-3">
                  <TabsTrigger value="input" className="gap-1 text-xs md:text-sm px-2 md:px-4">
                    <GraduationCap className="w-4 h-4" />
                    <span className="hidden xs:inline">{currentLang === 'it' ? 'Esami' : 'Exams'}</span>
                  </TabsTrigger>
                  <TabsTrigger value="calendar" className="gap-1 text-xs md:text-sm px-2 md:px-4">
                    <Calendar className="w-4 h-4" />
                    <span className="hidden xs:inline">{currentLang === 'it' ? 'Cal.' : 'Cal.'}</span>
                  </TabsTrigger>
                  <TabsTrigger value="plan" className="gap-1 text-xs md:text-sm px-2 md:px-4">
                    <Sparkles className="w-4 h-4" />
                    <span className="hidden xs:inline">{currentLang === 'it' ? 'Piano' : 'Plan'}</span>
                  </TabsTrigger>
                </TabsList>
                
                {exams.length > 0 && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="shrink-0 h-9 w-9">
                        <MoreHorizontal className="w-5 h-5" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-background">
                      <DropdownMenuItem 
                        onClick={() => setShowClearDialog(true)}
                        className="text-destructive focus:text-destructive cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        {c.actions.clear} ({exams.length} {currentLang === 'it' ? 'esami' : 'exams'})
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              
              <TabsContent value="input" className="mt-0">
                <ExamList 
                  exams={exams}
                  onEdit={handleEditExam}
                  onDuplicate={handleDuplicateExam}
                  onDelete={removeExam}
                  onAddNew={handleAddNew}
                  lang={currentLang}
                />
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
      
      {/* Clear Confirmation Dialog */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-destructive" />
              {currentLang === 'it' ? 'Cancella tutti gli esami?' : 'Delete all exams?'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {currentLang === 'it' 
                ? `Stai eliminando ${exams.length} esami (${totalCfu} CFU totali). Potrai annullare l'azione per 10 secondi dopo la cancellazione.`
                : `You are deleting ${exams.length} exams (${totalCfu} total credits). You can undo for 10 seconds after deletion.`
              }
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>{currentLang === 'it' ? 'Annulla' : 'Cancel'}</AlertDialogCancel>
            <AlertDialogAction 
              onClick={clearAll}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              <Trash2 className="w-4 h-4 mr-1" />
              {currentLang === 'it' ? 'Elimina tutto' : 'Delete all'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      
      <Footer />
      <BottomNav />
    </>
  );
};

export default ExamSessionPlanner;
