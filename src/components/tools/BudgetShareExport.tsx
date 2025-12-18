import { useState, useEffect } from "react";
import { Link2, FileDown, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import jsPDF from "jspdf";
import jungleRentLogo from "@/assets/jungle-rent-logo.png";

interface BudgetShareExportProps {
  selectedArea: string;
  housingType: string;
  totalBudget: number;
  breakdown: Array<{ name: string; value: number }>;
  hasGTT: boolean;
  isUnder26: boolean;
  groceries: number;
  extras: number;
  language: "it" | "en";
}

export const BudgetShareExport = ({
  selectedArea,
  housingType,
  totalBudget,
  breakdown,
  hasGTT,
  isUnder26,
  groceries,
  extras,
  language
}: BudgetShareExportProps) => {
  const [linkCopied, setLinkCopied] = useState(false);
  const [logoBase64, setLogoBase64] = useState<string | null>(null);

  // Pre-load logo as base64 for PDF
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

  const generateShareLink = () => {
    const params = new URLSearchParams({
      area: selectedArea,
      housing: housingType,
      gtt: hasGTT ? "1" : "0",
      under26: isUnder26 ? "1" : "0",
      groceries: groceries.toString(),
      extras: extras.toString()
    });

    const baseUrl = window.location.origin + window.location.pathname;
    return `${baseUrl}?${params.toString()}`;
  };

  const copyLink = async () => {
    const link = generateShareLink();
    try {
      await navigator.clipboard.writeText(link);
      setLinkCopied(true);
      toast.success(language === "it" ? "Link copiato!" : "Link copied!");
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      toast.error(language === "it" ? "Errore nella copia" : "Copy failed");
    }
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // === HEADER con gradiente verde ===
    doc.setFillColor(22, 101, 52); // primary green
    doc.rect(0, 0, pageWidth, 50, "F");
    
    // Logo reale o fallback
    if (logoBase64) {
      try {
        doc.addImage(logoBase64, "PNG", 12, 8, 34, 34);
      } catch {
        // Fallback: cerchio con JR
        doc.setFillColor(255, 255, 255);
        doc.circle(30, 25, 12, "F");
        doc.setTextColor(22, 101, 52);
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("JR", 30, 28, { align: "center" });
      }
    } else {
      // Fallback: cerchio con JR
      doc.setFillColor(255, 255, 255);
      doc.circle(30, 25, 12, "F");
      doc.setTextColor(22, 101, 52);
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("JR", 30, 28, { align: "center" });
    }
    
    // Titolo header
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("Jungle Rent", 52, 20);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("junglerent.it", 52, 30);
    
    // Sottotitolo
    doc.setFontSize(10);
    doc.text(
      language === "it" ? "L'affitto sicuro nella giungla immobiliare" : "Safe renting in the real estate jungle",
      52,
      40
    );

    // === TITOLO DOCUMENTO ===
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text(
      language === "it" ? "Budget Mensile Studente" : "Student Monthly Budget",
      20,
      70
    );
    
    // Linea decorativa
    doc.setDrawColor(22, 101, 52);
    doc.setLineWidth(0.5);
    doc.line(20, 75, 100, 75);

    // === INFO ZONA ===
    doc.setTextColor(60, 60, 60);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(selectedArea, 20, 90);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    const housingLabel = housingType === "shared" 
      ? (language === "it" ? "Stanza doppia" : "Shared room")
      : housingType === "single" 
        ? (language === "it" ? "Stanza singola" : "Single room")
        : "Monolocale / Studio";
    doc.text(housingLabel, 20, 98);

    // === BOX TOTALE ===
    doc.setFillColor(240, 253, 244); // emerald-50
    doc.setDrawColor(22, 101, 52);
    doc.setLineWidth(1);
    doc.roundedRect(20, 108, pageWidth - 40, 35, 4, 4, "FD");
    
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(32);
    doc.setFont("helvetica", "bold");
    doc.text(`€${totalBudget}`, pageWidth / 2, 128, { align: "center" });
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(language === "it" ? "al mese" : "per month", pageWidth / 2, 138, { align: "center" });

    // === TABELLA SPESE ===
    doc.setTextColor(40, 40, 40);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(
      language === "it" ? "Dettaglio spese mensili" : "Monthly expense breakdown",
      20,
      160
    );

    let yPos = 175;
    doc.setFontSize(11);

    breakdown.forEach((item, index) => {
      // Sfondo alternato
      if (index % 2 === 0) {
        doc.setFillColor(249, 250, 251);
        doc.rect(20, yPos - 6, pageWidth - 40, 14, "F");
      }
      
      doc.setFont("helvetica", "normal");
      doc.setTextColor(75, 85, 99);
      doc.text(item.name, 25, yPos);
      
      doc.setTextColor(17, 24, 39);
      doc.setFont("helvetica", "bold");
      doc.text(`€${item.value}`, pageWidth - 25, yPos, { align: "right" });
      
      yPos += 14;
    });

    // Linea separatrice
    doc.setDrawColor(209, 213, 219);
    doc.setLineWidth(0.3);
    doc.line(20, yPos + 2, pageWidth - 20, yPos + 2);
    
    // Totale
    doc.setFillColor(22, 101, 52);
    doc.rect(20, yPos + 5, pageWidth - 40, 16, "F");
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(255, 255, 255);
    doc.text(language === "it" ? "TOTALE MENSILE" : "MONTHLY TOTAL", 25, yPos + 15);
    doc.text(`€${totalBudget}`, pageWidth - 25, yPos + 15, { align: "right" });

    // === NOTE ===
    const notesY = yPos + 35;
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(9);
    doc.setFont("helvetica", "italic");
    doc.text(
      language === "it" 
        ? "* I valori sono stime basate sui prezzi medi di Torino per studenti universitari."
        : "* Values are estimates based on average prices in Turin for university students.",
      20,
      notesY
    );

    // === FOOTER ===
    doc.setFillColor(249, 250, 251);
    doc.rect(0, pageHeight - 35, pageWidth, 35, "F");
    
    doc.setDrawColor(22, 101, 52);
    doc.setLineWidth(2);
    doc.line(0, pageHeight - 35, pageWidth, pageHeight - 35);
    
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("junglerent.it", pageWidth / 2, pageHeight - 22, { align: "center" });
    
    doc.setTextColor(107, 114, 128);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    const date = new Date().toLocaleDateString(language === "it" ? "it-IT" : "en-US", {
      day: "numeric",
      month: "long", 
      year: "numeric"
    });
    doc.text(
      language === "it" 
        ? `Generato il ${date} con Jungle Rent`
        : `Generated on ${date} with Jungle Rent`,
      pageWidth / 2,
      pageHeight - 12,
      { align: "center" }
    );

    // Save
    const filename = `budget-${selectedArea.toLowerCase().replace(/\s+/g, "-")}-${totalBudget}euro.pdf`;
    doc.save(filename);
    
    toast.success(language === "it" ? "PDF scaricato!" : "PDF downloaded!");
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Share2 className="w-5 h-5 text-primary" />
          {language === "it" ? "Condividi o salva" : "Share or save"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={copyLink}
          >
            {linkCopied ? (
              <>
                <Check className="w-4 h-4 text-emerald-500" />
                {language === "it" ? "Copiato!" : "Copied!"}
              </>
            ) : (
              <>
                <Link2 className="w-4 h-4" />
                {language === "it" ? "Copia link" : "Copy link"}
              </>
            )}
          </Button>
          <Button
            variant="outline"
            className="flex-1 gap-2"
            onClick={generatePDF}
          >
            <FileDown className="w-4 h-4" />
            {language === "it" ? "Scarica PDF" : "Download PDF"}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-3 text-center">
          {language === "it" 
            ? "Condividi questo budget con amici o salvalo per dopo"
            : "Share this budget with friends or save it for later"
          }
        </p>
      </CardContent>
    </Card>
  );
};
