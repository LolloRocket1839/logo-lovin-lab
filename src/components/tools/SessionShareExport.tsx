import { useState } from "react";
import { Download, Share2, MessageCircle, Copy, Check, FileText, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import type { SessionExam } from "./SessionExamInput";
import { format } from "date-fns";
import { it, enUS } from "date-fns/locale";
import jsPDF from "jspdf";
import { PDFPreviewModal } from "./PDFPreviewModal";

interface SessionShareExportProps {
  exams: SessionExam[];
  cfuMax: number;
  lang: 'it' | 'en';
}

export const SessionShareExport = ({ exams, cfuMax, lang }: SessionShareExportProps) => {
  const [copied, setCopied] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [pdfBlob, setPdfBlob] = useState<Blob | null>(null);
  
  const content = {
    it: {
      title: "Esporta e Condividi",
      exportPdf: "Scarica PDF",
      shareWhatsapp: "Condividi su WhatsApp",
      copyLink: "Copia link",
      copied: "Copiato!",
      pdfTitle: "Piano Sessione Esami",
      pdfSubtitle: "Generato con Jungle Rent",
      pdfSession: "Sessione",
      pdfExam: "Esame",
      pdfCfu: "CFU",
      pdfDate: "Data",
      pdfDifficulty: "Difficoltà",
      pdfTotal: "Totale",
      pdfHours: "Ore studio stimate",
      whatsappText: "🎓 Il mio piano sessione esami:\n\n"
    },
    en: {
      title: "Export & Share",
      exportPdf: "Download PDF",
      shareWhatsapp: "Share on WhatsApp",
      copyLink: "Copy link",
      copied: "Copied!",
      pdfTitle: "Exam Session Plan",
      pdfSubtitle: "Generated with Jungle Rent",
      pdfSession: "Session",
      pdfExam: "Exam",
      pdfCfu: "Credits",
      pdfDate: "Date",
      pdfDifficulty: "Difficulty",
      pdfTotal: "Total",
      pdfHours: "Est. study hours",
      whatsappText: "🎓 My exam session plan:\n\n"
    }
  };
  
  const c = content[lang];
  const difficultyLabels = ["", "Easy", "Medium", "Hard", "Boss"];
  const difficultyLabelsIt = ["", "Facile", "Media", "Difficile", "Boss"];
  
  const sessionLabels = {
    invernale: lang === 'it' ? 'Invernale' : 'Winter',
    estiva: lang === 'it' ? 'Estiva' : 'Summer',
    autunnale: lang === 'it' ? 'Autunnale' : 'Fall'
  };
  
  // Group exams by session
  const groupedExams = exams.reduce((acc, exam) => {
    const session = exam.sessione || 'estiva';
    if (!acc[session]) acc[session] = [];
    acc[session].push(exam);
    return acc;
  }, {} as Record<string, SessionExam[]>);
  
  const generatePDFDoc = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Title
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(c.pdfTitle, pageWidth / 2, 20, { align: "center" });
    
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(128, 128, 128);
    doc.text(c.pdfSubtitle, pageWidth / 2, 28, { align: "center" });
    
    let yPos = 45;
    
    // Sessions
    Object.entries(groupedExams).forEach(([session, sessionExams]) => {
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      // Session header
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${c.pdfSession}: ${sessionLabels[session as keyof typeof sessionLabels]}`, 20, yPos);
      yPos += 10;
      
      // Table header
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setFillColor(240, 240, 240);
      doc.rect(20, yPos - 5, pageWidth - 40, 8, "F");
      doc.text(c.pdfExam, 25, yPos);
      doc.text(c.pdfCfu, 100, yPos);
      doc.text(c.pdfDate, 125, yPos);
      doc.text(c.pdfDifficulty, 160, yPos);
      yPos += 8;
      
      // Exams
      doc.setFont("helvetica", "normal");
      sessionExams.forEach((exam) => {
        if (yPos > 270) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.text(exam.nome.substring(0, 30), 25, yPos);
        doc.text(String(exam.cfu), 100, yPos);
        doc.text(
          exam.dataAppello 
            ? format(exam.dataAppello, "dd/MM/yy") 
            : "-", 
          125, 
          yPos
        );
        doc.text(
          (lang === 'it' ? difficultyLabelsIt : difficultyLabels)[exam.difficolta], 
          160, 
          yPos
        );
        yPos += 7;
      });
      
      // Session totals
      const sessionCfu = sessionExams.reduce((sum, e) => sum + e.cfu, 0);
      yPos += 3;
      doc.setFont("helvetica", "bold");
      doc.text(`${c.pdfTotal}: ${sessionCfu} CFU | ${c.pdfHours}: ${sessionCfu * 25}h`, 25, yPos);
      yPos += 15;
    });
    
    // Footer
    doc.setFontSize(8);
    doc.setTextColor(128, 128, 128);
    doc.text("junglerent.com", pageWidth / 2, 290, { align: "center" });
    
    return doc;
  };

  const handlePreviewPDF = () => {
    try {
      const doc = generatePDFDoc();
      const blob = doc.output("blob");
      setPdfBlob(blob);
      setPreviewOpen(true);
    } catch (error) {
      console.error("PDF preview error:", error);
      toast({
        title: lang === 'it' ? "Errore durante la preview" : "Preview error",
        variant: "destructive"
      });
    }
  };

  const handleDownloadPDF = () => {
    setExporting(true);
    try {
      const doc = generatePDFDoc();
      doc.save(`piano-sessione-${format(new Date(), "yyyy-MM-dd")}.pdf`);
      toast({
        title: lang === 'it' ? "PDF scaricato!" : "PDF downloaded!",
      });
    } catch (error) {
      console.error("PDF export error:", error);
      toast({
        title: lang === 'it' ? "Errore durante l'esportazione" : "Export error",
        variant: "destructive"
      });
    } finally {
      setExporting(false);
    }
  };
  
  const generateShareText = () => {
    let text = c.whatsappText;
    
    Object.entries(groupedExams).forEach(([session, sessionExams]) => {
      text += `📅 ${sessionLabels[session as keyof typeof sessionLabels]}:\n`;
      sessionExams.forEach((exam) => {
        const diffEmoji = ["", "😊", "😐", "😰", "💀"][exam.difficolta];
        text += `  • ${exam.nome} (${exam.cfu} CFU) ${diffEmoji}\n`;
      });
      const sessionCfu = sessionExams.reduce((sum, e) => sum + e.cfu, 0);
      text += `  📊 ${lang === 'it' ? 'Totale' : 'Total'}: ${sessionCfu} CFU\n\n`;
    });
    
    text += `\n${lang === 'it' ? 'Creato con' : 'Made with'} junglerent.com`;
    return text;
  };
  
  const shareWhatsApp = () => {
    const text = encodeURIComponent(generateShareText());
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };
  
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      toast({
        title: lang === 'it' ? "Link copiato!" : "Link copied!",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Copy error:", error);
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center gap-2">
          <Share2 className="w-5 h-5 text-primary" />
          {c.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-3">
          <Button 
            variant="outline"
            onClick={handlePreviewPDF} 
            disabled={exams.length === 0}
            className="gap-2"
          >
            <Eye className="w-4 h-4" />
            {lang === 'it' ? 'Anteprima' : 'Preview'}
          </Button>
          
          <Button 
            onClick={handleDownloadPDF} 
            disabled={exporting || exams.length === 0}
            className="gap-2"
          >
            {exporting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {c.exportPdf}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={shareWhatsApp}
            disabled={exams.length === 0}
            className="gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            {c.shareWhatsapp}
          </Button>
          
          <Button 
            variant="outline" 
            onClick={copyLink}
            className="gap-2"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            {copied ? c.copied : c.copyLink}
          </Button>
        </div>

        <PDFPreviewModal
          open={previewOpen}
          onOpenChange={setPreviewOpen}
          pdfSource={pdfBlob}
          title={c.pdfTitle}
          onDownload={handleDownloadPDF}
          language={lang}
        />
      </CardContent>
    </Card>
  );
};
