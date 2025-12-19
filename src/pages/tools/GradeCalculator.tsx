import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { 
  GraduationCap, 
  ArrowLeft,
  Plus,
  Trash2,
  TrendingUp,
  Award,
  BarChart3,
  Calculator,
  Info,
  Download,
  MessageCircle,
  Copy,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { ExamForm } from "@/components/tools/ExamForm";
import { GradeSimulator } from "@/components/tools/GradeSimulator";
import { GraduationScoreCalculator } from "@/components/tools/GraduationScoreCalculator";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell
} from "recharts";
import jsPDF from "jspdf";
import jungleRentLogo from "@/assets/jungle-rent-logo.png";

export interface Exam {
  id: string;
  name: string;
  grade: number; // 18-31 (31 = 30L)
  cfu: number;
}

const STORAGE_KEY = "jungle-rent-exams";

const GradeCalculator = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('it') ? 'it' : 'en';
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  
  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return [];
      }
    }
    return [];
  });

  const [logoBase64, setLogoBase64] = useState<string | null>(null);

  // Pre-load logo for PDF
  useEffect(() => {
    const loadLogo = async () => {
      try {
        const response = await fetch(jungleRentLogo);
        const blob = await response.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoBase64(reader.result as string);
        };
        reader.readAsDataURL(blob);
      } catch (error) {
        console.error("Failed to load logo:", error);
      }
    };
    loadLogo();
  }, []);

  // Persist exams to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(exams));
  }, [exams]);

  const content = {
    it: {
      title: "Calcolatore Media Ponderata",
      subtitle: "Calcola la tua media universitaria e simula il voto di laurea",
      seoTitle: "Calcolatore Media Ponderata Università | Jungle Rent",
      seoDesc: "Calcola la media ponderata dei tuoi esami universitari, simula scenari futuri e stima il voto di laurea.",
      backToTools: "Torna agli strumenti",
      tabExams: "Esami",
      tabSimulator: "Simulatore",
      tabGraduation: "Voto Laurea",
      stats: {
        weightedAvg: "Media Ponderata",
        arithmeticAvg: "Media Aritmetica",
        totalCfu: "CFU Totali",
        totalExams: "Esami Sostenuti"
      },
      gradeDistribution: "Distribuzione Voti",
      noExams: "Aggiungi il tuo primo esame per iniziare",
      exportPdf: "Esporta PDF",
      shareWhatsApp: "WhatsApp",
      copyLink: "Copia Link",
      linkCopied: "Link copiato!",
      avgBadge: {
        excellent: "Eccellente",
        good: "Buono",
        sufficient: "Sufficiente"
      }
    },
    en: {
      title: "Weighted Average Calculator",
      subtitle: "Calculate your university GPA and simulate graduation grade",
      seoTitle: "University Weighted Average Calculator | Jungle Rent",
      seoDesc: "Calculate the weighted average of your university exams, simulate future scenarios and estimate your graduation grade.",
      backToTools: "Back to tools",
      tabExams: "Exams",
      tabSimulator: "Simulator",
      tabGraduation: "Graduation",
      stats: {
        weightedAvg: "Weighted Average",
        arithmeticAvg: "Arithmetic Average",
        totalCfu: "Total Credits",
        totalExams: "Exams Passed"
      },
      gradeDistribution: "Grade Distribution",
      noExams: "Add your first exam to get started",
      exportPdf: "Export PDF",
      shareWhatsApp: "WhatsApp",
      copyLink: "Copy Link",
      linkCopied: "Link copied!",
      avgBadge: {
        excellent: "Excellent",
        good: "Good",
        sufficient: "Sufficient"
      }
    }
  };

  const t = content[currentLang];

  // Calculate statistics
  const stats = useMemo(() => {
    if (exams.length === 0) {
      return {
        weightedAvg: 0,
        arithmeticAvg: 0,
        totalCfu: 0,
        totalExams: 0
      };
    }

    const totalCfu = exams.reduce((sum, exam) => sum + exam.cfu, 0);
    const weightedSum = exams.reduce((sum, exam) => {
      // For lode (31), use 30 in calculation but could add bonus
      const gradeValue = exam.grade > 30 ? 30 : exam.grade;
      return sum + (gradeValue * exam.cfu);
    }, 0);
    const arithmeticSum = exams.reduce((sum, exam) => {
      const gradeValue = exam.grade > 30 ? 30 : exam.grade;
      return sum + gradeValue;
    }, 0);

    return {
      weightedAvg: weightedSum / totalCfu,
      arithmeticAvg: arithmeticSum / exams.length,
      totalCfu,
      totalExams: exams.length
    };
  }, [exams]);

  // Count lodi
  const lodiCount = useMemo(() => {
    return exams.filter(e => e.grade === 31).length;
  }, [exams]);

  // Grade distribution for chart
  const gradeDistribution = useMemo(() => {
    const distribution: { grade: string; count: number }[] = [];
    const grades = [18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    
    grades.forEach(grade => {
      const count = exams.filter(e => e.grade === grade).length;
      if (count > 0) {
        distribution.push({
          grade: grade === 31 ? "30L" : grade.toString(),
          count
        });
      }
    });

    return distribution;
  }, [exams]);

  // Get badge color based on average
  const getAvgBadgeVariant = (avg: number) => {
    if (avg >= 27) return "default"; // green
    if (avg >= 24) return "secondary"; // yellow
    return "outline"; // red
  };

  const getAvgBadgeLabel = (avg: number) => {
    if (avg >= 27) return t.avgBadge.excellent;
    if (avg >= 24) return t.avgBadge.good;
    return t.avgBadge.sufficient;
  };

  // Add exam handler
  const handleAddExam = (exam: Omit<Exam, 'id'>) => {
    const newExam: Exam = {
      ...exam,
      id: crypto.randomUUID()
    };
    setExams(prev => [...prev, newExam]);
  };

  // Remove exam handler
  const handleRemoveExam = (id: string) => {
    setExams(prev => prev.filter(e => e.id !== id));
  };

  // Generate WhatsApp share text
  const generateWhatsAppText = () => {
    const text = currentLang === 'it'
      ? `🎓 La mia media universitaria:\n\n📊 Media Ponderata: ${stats.weightedAvg.toFixed(2)}\n📚 CFU Totali: ${stats.totalCfu}\n✅ Esami: ${stats.totalExams}${lodiCount > 0 ? `\n🏆 Lodi: ${lodiCount}` : ''}\n\nCalcola anche tu 👉 junglerent.it/studenti/strumenti/media`
      : `🎓 My university GPA:\n\n📊 Weighted Average: ${stats.weightedAvg.toFixed(2)}\n📚 Total Credits: ${stats.totalCfu}\n✅ Exams: ${stats.totalExams}${lodiCount > 0 ? `\n🏆 Honors: ${lodiCount}` : ''}\n\nCalculate yours 👉 junglerent.it/students/tools/grades`;
    return text;
  };

  // Share via WhatsApp
  const shareWhatsApp = () => {
    const text = encodeURIComponent(generateWhatsAppText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  // Copy link to clipboard
  const copyLink = async () => {
    await navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    toast({ title: t.linkCopied });
    setTimeout(() => setCopied(false), 2000);
  };

  // Export PDF
  const exportPDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Header
    doc.setFillColor(22, 101, 52);
    doc.rect(0, 0, pageWidth, 45, "F");
    
    if (logoBase64) {
      try {
        doc.addImage(logoBase64, "PNG", 12, 8, 30, 30);
      } catch {}
    }
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Jungle Rent", 48, 20);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text("junglerent.it", 48, 28);
    doc.text(t.title, 48, 36);

    // Stats section
    let yPos = 60;
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(currentLang === 'it' ? "Riepilogo" : "Summary", 14, yPos);
    
    yPos += 12;
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    
    const statsText = [
      `${t.stats.weightedAvg}: ${stats.weightedAvg.toFixed(2)}`,
      `${t.stats.arithmeticAvg}: ${stats.arithmeticAvg.toFixed(2)}`,
      `${t.stats.totalCfu}: ${stats.totalCfu}`,
      `${t.stats.totalExams}: ${stats.totalExams}`,
      `Lodi: ${lodiCount}`
    ];
    
    statsText.forEach(text => {
      doc.text(text, 14, yPos);
      yPos += 8;
    });

    // Exams table
    yPos += 10;
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(currentLang === 'it' ? "Esami" : "Exams", 14, yPos);
    
    yPos += 10;
    doc.setFillColor(240, 240, 240);
    doc.rect(14, yPos - 6, pageWidth - 28, 10, "F");
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text(currentLang === 'it' ? "Esame" : "Exam", 16, yPos);
    doc.text(currentLang === 'it' ? "Voto" : "Grade", 120, yPos);
    doc.text("CFU", 160, yPos);
    
    yPos += 8;
    doc.setFont("helvetica", "normal");
    
    exams.forEach((exam, index) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      
      if (index % 2 === 0) {
        doc.setFillColor(250, 250, 250);
        doc.rect(14, yPos - 5, pageWidth - 28, 8, "F");
      }
      
      doc.setTextColor(60, 60, 60);
      doc.text(exam.name || `Esame ${index + 1}`, 16, yPos);
      doc.text(exam.grade === 31 ? "30L" : exam.grade.toString(), 120, yPos);
      doc.text(exam.cfu.toString(), 160, yPos);
      yPos += 8;
    });

    // Footer
    const today = new Date().toLocaleDateString(currentLang === 'it' ? 'it-IT' : 'en-US');
    doc.setFontSize(8);
    doc.setTextColor(120, 120, 120);
    doc.text(`junglerent.it - ${today}`, pageWidth / 2, 290, { align: "center" });

    doc.save(`media-universitaria-${today}.pdf`);
  };

  return (
    <>
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
        {/* Header */}
        <section className="py-6 md:py-10 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <Link 
              to="/studenti/strumenti" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToTools}
            </Link>
            
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">
                  {t.title}
                </h1>
                <p className="text-muted-foreground">
                  {t.subtitle}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Cards */}
        {exams.length > 0 && (
          <section className="py-4">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Weighted Average */}
                <Card className="bg-primary/5 border-primary/20">
                  <CardContent className="pt-4 pb-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{t.stats.weightedAvg}</span>
                      <Badge variant={getAvgBadgeVariant(stats.weightedAvg)}>
                        {getAvgBadgeLabel(stats.weightedAvg)}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold text-primary">
                      {stats.weightedAvg.toFixed(2)}
                    </div>
                  </CardContent>
                </Card>

                {/* Arithmetic Average */}
                <Card>
                  <CardContent className="pt-4 pb-4">
                    <span className="text-sm text-muted-foreground">{t.stats.arithmeticAvg}</span>
                    <div className="text-2xl font-bold text-foreground">
                      {stats.arithmeticAvg.toFixed(2)}
                    </div>
                  </CardContent>
                </Card>

                {/* Total CFU */}
                <Card>
                  <CardContent className="pt-4 pb-4">
                    <span className="text-sm text-muted-foreground">{t.stats.totalCfu}</span>
                    <div className="text-2xl font-bold text-foreground">
                      {stats.totalCfu}
                    </div>
                  </CardContent>
                </Card>

                {/* Total Exams */}
                <Card>
                  <CardContent className="pt-4 pb-4">
                    <span className="text-sm text-muted-foreground">{t.stats.totalExams}</span>
                    <div className="text-2xl font-bold text-foreground flex items-center gap-2">
                      {stats.totalExams}
                      {lodiCount > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {lodiCount} lodi
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        )}

        {/* Main Content with Tabs */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <Tabs defaultValue="exams" className="space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-4">
                <TabsList>
                  <TabsTrigger value="exams" className="gap-2">
                    <BarChart3 className="w-4 h-4" />
                    {t.tabExams}
                  </TabsTrigger>
                  <TabsTrigger value="simulator" className="gap-2">
                    <TrendingUp className="w-4 h-4" />
                    {t.tabSimulator}
                  </TabsTrigger>
                  <TabsTrigger value="graduation" className="gap-2">
                    <Award className="w-4 h-4" />
                    {t.tabGraduation}
                  </TabsTrigger>
                </TabsList>

                {exams.length > 0 && (
                  <div className="flex gap-2 flex-wrap">
                    <Button variant="outline" size="sm" onClick={exportPDF} className="gap-2">
                      <Download className="w-4 h-4" />
                      {t.exportPdf}
                    </Button>
                    <Button variant="outline" size="sm" onClick={shareWhatsApp} className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {t.shareWhatsApp}
                    </Button>
                    <Button variant="outline" size="sm" onClick={copyLink} className="gap-2">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? t.linkCopied : t.copyLink}
                    </Button>
                  </div>
                )}
              </div>

              {/* Exams Tab */}
              <TabsContent value="exams" className="space-y-6">
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Add Exam Form */}
                  <ExamForm onAddExam={handleAddExam} language={currentLang} />

                  {/* Grade Distribution Chart */}
                  {gradeDistribution.length > 0 && (
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <BarChart3 className="w-5 h-5 text-primary" />
                          {t.gradeDistribution}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="h-48">
                          <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={gradeDistribution}>
                              <XAxis dataKey="grade" tick={{ fontSize: 12 }} />
                              <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                              <RechartsTooltip />
                              <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                                {gradeDistribution.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={
                                      parseInt(entry.grade) >= 27 || entry.grade === "30L"
                                        ? "hsl(var(--primary))"
                                        : parseInt(entry.grade) >= 24
                                        ? "hsl(var(--chart-2))"
                                        : "hsl(var(--chart-4))"
                                    }
                                  />
                                ))}
                              </Bar>
                            </BarChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>

                {/* Exams List */}
                {exams.length > 0 ? (
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">
                        {currentLang === 'it' ? 'I tuoi esami' : 'Your exams'}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {exams.map((exam, index) => (
                          <div 
                            key={exam.id}
                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                          >
                            <div className="flex items-center gap-4">
                              <span className="text-sm text-muted-foreground w-6">
                                {index + 1}.
                              </span>
                              <div>
                                <p className="font-medium">
                                  {exam.name || `Esame ${index + 1}`}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  {exam.cfu} CFU
                                </p>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge 
                                variant={exam.grade >= 27 ? "default" : exam.grade >= 24 ? "secondary" : "outline"}
                                className="text-base font-bold"
                              >
                                {exam.grade === 31 ? "30L" : exam.grade}
                              </Badge>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveExam(exam.id)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <Card className="border-dashed">
                    <CardContent className="py-12 text-center">
                      <GraduationCap className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
                      <p className="text-muted-foreground">{t.noExams}</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              {/* Simulator Tab */}
              <TabsContent value="simulator">
                <GradeSimulator 
                  currentAverage={stats.weightedAvg} 
                  currentCfu={stats.totalCfu}
                  language={currentLang}
                />
              </TabsContent>

              {/* Graduation Tab */}
              <TabsContent value="graduation">
                <GraduationScoreCalculator 
                  weightedAverage={stats.weightedAvg}
                  totalCfu={stats.totalCfu}
                  lodiCount={lodiCount}
                  language={currentLang}
                />
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

export default GradeCalculator;
