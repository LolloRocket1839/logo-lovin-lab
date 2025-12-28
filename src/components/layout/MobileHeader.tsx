import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const isSeller = variant === 'seller';

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 md:hidden bg-background/95 backdrop-blur-sm border-b border-border/50 px-4 py-2">
        <div className="flex items-center justify-between">
          <img
            src={jungleRentLogo}
            alt="Jungle Rent"
            className="h-8 w-auto"
          />
          <Button
            size="sm"
            onClick={() => isSeller ? setSellerDialogOpen(true) : setInvestorDialogOpen(true)}
            className="h-9 px-4 text-sm font-semibold"
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
