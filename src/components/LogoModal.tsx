import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, X, FileText } from "lucide-react";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { useToast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";

interface LogoModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const LogoModal = ({ open, onOpenChange }: LogoModalProps) => {
  const { toast } = useToast();

  const downloadLogoPNG = () => {
    // Create canvas to convert SVG to PNG
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 1024; // High resolution PNG
      canvas.width = size;
      canvas.height = size;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast({
          title: "Errore",
          description: "Impossibile generare il PNG",
          variant: "destructive",
        });
        return;
      }

      // Draw white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      
      // Draw logo centered
      ctx.drawImage(img, 0, 0, size, size);
      
      // Convert to PNG and download
      canvas.toBlob((blob) => {
        if (!blob) {
          toast({
            title: "Errore",
            description: "Impossibile generare il PNG",
            variant: "destructive",
          });
          return;
        }
        
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = "jungle-rent-logo.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({
          title: "✅ Download completato!",
          description: "Logo PNG scaricato con successo",
        });
      }, "image/png");
    };

    img.onerror = () => {
      toast({
        title: "Errore",
        description: "Impossibile caricare il logo",
        variant: "destructive",
      });
    };

    img.src = jungleRentLogo;
  };

  const downloadLogoPDF = () => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const size = 1024;
      canvas.width = size;
      canvas.height = size;
      
      const ctx = canvas.getContext("2d");
      if (!ctx) {
        toast({
          title: "Errore",
          description: "Impossibile generare il PDF",
          variant: "destructive",
        });
        return;
      }

      // Draw white background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      
      // Draw logo
      ctx.drawImage(img, 0, 0, size, size);
      
      // Convert canvas to image data
      const imgData = canvas.toDataURL("image/png");
      
      // Create PDF (A4 format)
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4"
      });
      
      // Calculate dimensions to center logo on A4 page
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const logoSize = 150; // 150mm logo size
      const x = (pageWidth - logoSize) / 2;
      const y = (pageHeight - logoSize) / 2;
      
      // Add logo to PDF
      pdf.addImage(imgData, "PNG", x, y, logoSize, logoSize);
      
      // Add text below logo
      pdf.setFontSize(20);
      pdf.setTextColor(77, 142, 89); // Primary green color
      const text = "Jungle Rent";
      const textWidth = pdf.getTextWidth(text);
      pdf.text(text, (pageWidth - textWidth) / 2, y + logoSize + 15);
      
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      const subtitle = "Il tuo rifugio sicuro nella giungla immobiliare";
      const subtitleWidth = pdf.getTextWidth(subtitle);
      pdf.text(subtitle, (pageWidth - subtitleWidth) / 2, y + logoSize + 22);
      
      // Save PDF
      pdf.save("jungle-rent-logo.pdf");
      
      toast({
        title: "✅ Download completato!",
        description: "Logo PDF scaricato con successo",
      });
    };

    img.onerror = () => {
      toast({
        title: "Errore",
        description: "Impossibile caricare il logo",
        variant: "destructive",
      });
    };

    img.src = jungleRentLogo;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden border-0 bg-transparent">
        <div className="relative bg-white rounded-lg p-8 md:p-12">
          {/* Close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 rounded-full hover:bg-muted"
            onClick={() => onOpenChange(false)}
          >
            <X className="h-4 w-4" />
          </Button>

          {/* Logo */}
          <div className="flex flex-col items-center justify-center space-y-8">
            <div className="relative">
              <img
                src={jungleRentLogo}
                alt="Jungle Rent Logo"
                className="w-64 h-64 md:w-80 md:h-80 object-contain"
              />
            </div>

            {/* Brand info */}
            <div className="text-center space-y-2">
              <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
                Jungle Rent
              </h2>
              <p className="text-sm text-muted-foreground max-w-md">
                Il tuo rifugio sicuro nella giungla immobiliare
              </p>
            </div>

            {/* Download buttons */}
            <div className="flex flex-col sm:flex-row gap-3 w-full">
              <Button
                onClick={downloadLogoPNG}
                size="lg"
                className="flex-1 group"
              >
                <Download className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Scarica PNG (1024x1024)
              </Button>
              
              <Button
                onClick={downloadLogoPDF}
                size="lg"
                variant="outline"
                className="flex-1 group"
              >
                <FileText className="mr-2 h-5 w-5 transition-transform group-hover:scale-110" />
                Scarica PDF (A4)
              </Button>
            </div>

            {/* Info */}
            <p className="text-xs text-muted-foreground text-center">
              Logo ad alta risoluzione • Perfetto per stampa e digitale • Formati PNG e PDF
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
