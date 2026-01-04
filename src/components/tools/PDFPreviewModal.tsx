import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Loader2, ExternalLink } from "lucide-react";

interface PDFPreviewModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pdfSource: string | Blob | null;
  title: string;
  onDownload: () => void;
  language?: "it" | "en";
}

export const PDFPreviewModal = ({
  open,
  onOpenChange,
  pdfSource,
  title,
  onDownload,
  language = "it"
}: PDFPreviewModalProps) => {
  const [loading, setLoading] = useState(true);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);

  // Create object URL for Blob sources
  useEffect(() => {
    if (pdfSource instanceof Blob) {
      const url = URL.createObjectURL(pdfSource);
      setObjectUrl(url);
      return () => URL.revokeObjectURL(url);
    } else {
      setObjectUrl(null);
    }
  }, [pdfSource]);

  const handleDownload = () => {
    onDownload();
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setLoading(true);
    }
    onOpenChange(newOpen);
  };

  const content = {
    it: {
      loading: "Caricamento preview...",
      close: "Chiudi",
      download: "Scarica PDF",
      openInNewTab: "Apri in nuova scheda"
    },
    en: {
      loading: "Loading preview...",
      close: "Close",
      download: "Download PDF",
      openInNewTab: "Open in new tab"
    }
  };

  const t = content[language];

  // Get the URL to display
  const displayUrl = objectUrl || (typeof pdfSource === 'string' ? pdfSource : null);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="pr-8">{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex-1 min-h-[500px] relative bg-muted rounded-lg overflow-hidden">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center gap-2 text-muted-foreground z-10 bg-muted">
              <Loader2 className="w-6 h-6 animate-spin" />
              {t.loading}
            </div>
          )}
          
          {displayUrl && (
            <iframe
              src={`${displayUrl}#toolbar=0&navpanes=0`}
              className="w-full h-full min-h-[500px] border-0"
              onLoad={() => setLoading(false)}
              title={title}
            />
          )}
        </div>
        
        <DialogFooter className="flex-row justify-between sm:justify-between gap-2 pt-4">
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              {t.close}
            </Button>
            {displayUrl && (
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => window.open(displayUrl, '_blank')}
                title={t.openInNewTab}
              >
                <ExternalLink className="w-4 h-4" />
              </Button>
            )}
          </div>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            {t.download}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
