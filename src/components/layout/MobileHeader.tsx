import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickInvestorLeadDialog } from "@/components/dialogs/QuickInvestorLeadDialog";
import { QuickSellerLeadDialog } from "@/components/dialogs/QuickSellerLeadDialog";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

interface MobileHeaderProps {
  variant?: 'investor' | 'seller';
}

export const MobileHeader = ({ variant = 'investor' }: MobileHeaderProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [investorDialogOpen, setInvestorDialogOpen] = useState(false);
  const [sellerDialogOpen, setSellerDialogOpen] = useState(false);

  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      // Reduced threshold from 200 to 100 for faster brand recognition
      setIsVisible(window.scrollY > 100);
      
      // Calculate scroll progress
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0;
      setScrollProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const isSeller = variant === 'seller';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-sm border-b border-border/50">
        {/* Scroll progress indicator */}
        <div 
          className="absolute top-0 left-0 h-0.5 bg-primary transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
        <div className="flex items-center justify-between px-4 py-2.5">
          <img
            src={jungleRentLogo}
            alt="Jungle Rent"
            className="h-9 w-auto"
          />
          <Button
            size="sm"
            onClick={() => isSeller ? setSellerDialogOpen(true) : setInvestorDialogOpen(true)}
            className="h-10 px-5 text-sm font-semibold shadow-md"
          >
            {isSeller ? (
              <>
                <FileText className="w-4 h-4 mr-1.5" aria-hidden="true" />
                Valutazione
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 mr-1.5" aria-hidden="true" />
                Investi
              </>
            )}
          </Button>
        </div>
      </header>

      <QuickInvestorLeadDialog
        open={investorDialogOpen}
        onOpenChange={setInvestorDialogOpen}
      />
      
      <QuickSellerLeadDialog
        open={sellerDialogOpen}
        onOpenChange={setSellerDialogOpen}
      />
    </>
  );
};
