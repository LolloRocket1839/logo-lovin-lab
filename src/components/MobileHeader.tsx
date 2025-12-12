import { useState, useEffect } from "react";
import { TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

export const MobileHeader = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

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
            onClick={() => setDialogOpen(true)}
            className="h-9 px-4 text-sm font-semibold"
          >
            <TrendingUp className="w-4 h-4 mr-1.5" aria-hidden="true" />
            Investi
          </Button>
        </div>
      </header>

      <QuickInvestorLeadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
};
