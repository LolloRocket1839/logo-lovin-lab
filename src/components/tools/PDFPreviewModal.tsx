import { useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setLoading(false);
    setError(false);
  };

  const onDocumentLoadError = () => {
    setLoading(false);
    setError(true);
  };

  const handleDownload = () => {
    onDownload();
    onOpenChange(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      // Reset state when closing
      setPageNumber(1);
      setLoading(true);
      setError(false);
    }
    onOpenChange(newOpen);
  };

  const content = {
    it: {
      loading: "Caricamento preview...",
      error: "Impossibile caricare la preview",
      close: "Chiudi",
      download: "Scarica PDF",
      page: "Pagina"
    },
    en: {
      loading: "Loading preview...",
      error: "Unable to load preview",
      close: "Close",
      download: "Download PDF",
      page: "Page"
    }
  };

  const t = content[language];

  // Prepare file source for react-pdf
  const file = pdfSource instanceof Blob 
    ? URL.createObjectURL(pdfSource)
    : pdfSource;

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center py-4 min-h-[400px]">
          {loading && !error && (
            <div className="flex items-center gap-2 py-8 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin" />
              {t.loading}
            </div>
          )}
          
          {error && (
            <div className="flex items-center justify-center py-8 text-muted-foreground">
              {t.error}
            </div>
          )}
          
          {file && (
            <Document
              file={file}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              loading={null}
              className="shadow-lg rounded-lg overflow-hidden"
            >
              <Page 
                pageNumber={pageNumber} 
                width={Math.min(600, window.innerWidth - 80)}
                renderTextLayer={false}
                renderAnnotationLayer={false}
              />
            </Document>
          )}
          
          {numPages > 1 && !loading && !error && (
            <div className="flex items-center gap-4 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageNumber(p => Math.max(1, p - 1))}
                disabled={pageNumber <= 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground">
                {t.page} {pageNumber} / {numPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPageNumber(p => Math.min(numPages, p + 1))}
                disabled={pageNumber >= numPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          )}
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={() => handleOpenChange(false)}>
            {t.close}
          </Button>
          <Button onClick={handleDownload} className="gap-2">
            <Download className="w-4 h-4" />
            {t.download}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
