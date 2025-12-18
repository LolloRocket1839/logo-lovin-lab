import { useState } from "react";
import { Link2, FileDown, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import jsPDF from "jspdf";

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
    
    // Header
    doc.setFillColor(34, 139, 34); // Forest green
    doc.rect(0, 0, pageWidth, 40, "F");
    
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Jungle Rent", 20, 20);
    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text(
      language === "it" ? "Budget Mensile Studente" : "Student Monthly Budget",
      20,
      30
    );

    // Main content
    doc.setTextColor(0, 0, 0);
    
    // Title section
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text(selectedArea, 20, 60);
    
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 100, 100);
    const housingLabel = housingType === "shared" 
      ? (language === "it" ? "Stanza doppia" : "Shared room")
      : housingType === "single" 
        ? (language === "it" ? "Stanza singola" : "Single room")
        : "Monolocale";
    doc.text(housingLabel, 20, 68);

    // Total budget highlight
    doc.setFillColor(240, 255, 240);
    doc.roundedRect(20, 80, pageWidth - 40, 30, 5, 5, "F");
    
    doc.setTextColor(34, 139, 34);
    doc.setFontSize(28);
    doc.setFont("helvetica", "bold");
    doc.text(`€${totalBudget}`, pageWidth / 2, 98, { align: "center" });
    
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(language === "it" ? "/mese" : "/month", pageWidth / 2 + 30, 98);

    // Breakdown table
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(
      language === "it" ? "Dettaglio spese" : "Expense breakdown",
      20,
      130
    );

    let yPos = 145;
    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");

    breakdown.forEach((item, index) => {
      // Alternating background
      if (index % 2 === 0) {
        doc.setFillColor(248, 248, 248);
        doc.rect(20, yPos - 5, pageWidth - 40, 12, "F");
      }
      
      doc.setTextColor(60, 60, 60);
      doc.text(item.name, 25, yPos);
      
      doc.setTextColor(0, 0, 0);
      doc.setFont("helvetica", "bold");
      doc.text(`€${item.value}`, pageWidth - 25, yPos, { align: "right" });
      doc.setFont("helvetica", "normal");
      
      yPos += 14;
    });

    // Total line
    doc.setDrawColor(200, 200, 200);
    doc.line(20, yPos + 2, pageWidth - 20, yPos + 2);
    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.text(language === "it" ? "Totale" : "Total", 25, yPos + 15);
    doc.setTextColor(34, 139, 34);
    doc.text(`€${totalBudget}`, pageWidth - 25, yPos + 15, { align: "right" });

    // Footer
    const footerY = doc.internal.pageSize.getHeight() - 30;
    doc.setTextColor(150, 150, 150);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(
      language === "it" 
        ? "Generato con Jungle Rent - junglerent.com" 
        : "Generated with Jungle Rent - junglerent.com",
      pageWidth / 2,
      footerY,
      { align: "center" }
    );
    
    const date = new Date().toLocaleDateString(language === "it" ? "it-IT" : "en-US");
    doc.text(date, pageWidth / 2, footerY + 8, { align: "center" });

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
