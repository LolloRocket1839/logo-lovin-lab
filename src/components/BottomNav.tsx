import { useState } from "react";
import { Home, TrendingUp, Building2, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import { openCalendly } from "@/lib/calendly";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";
import { QuickSellerLeadDialog } from "@/components/QuickSellerLeadDialog";

export const BottomNav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { trackClick } = useAnalytics();
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const [sellerDialogOpen, setSellerDialogOpen] = useState(false);

  const handleHomeClick = (e: React.MouseEvent) => {
    trackClick('bottom_nav_home');
    e.preventDefault();
    
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleInvestClick = () => {
    trackClick('bottom_nav_invest');
    setInvestDialogOpen(true);
  };

  const handleSellerClick = () => {
    trackClick('bottom_nav_seller');
    setSellerDialogOpen(true);
  };

  const handleCalendlyClick = () => {
    trackClick('bottom_nav_calendly');
    openCalendly();
  };

  return (
    <>
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border shadow-lg"
        aria-label={t('nav.home')}
      >
        <div className="flex items-center justify-around h-16">
          {/* Home */}
          <Link
            to="/"
            onClick={handleHomeClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-muted-foreground"
          >
            <Home className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{t("nav.home")}</span>
          </Link>

          {/* Investi - Primary CTA with pulse */}
          <button
            onClick={handleInvestClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-primary relative"
          >
            <div className="relative">
              <TrendingUp className="w-5 h-5" aria-hidden="true" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
            </div>
            <span className="text-[10px] font-medium">{t("nav.investors")}</span>
          </button>

          {/* Vendi - Seller CTA */}
          <button
            onClick={handleSellerClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-muted-foreground"
          >
            <Building2 className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{t("nav.sell")}</span>
          </button>

          {/* Calendly - Schedule call */}
          <button
            onClick={handleCalendlyClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-muted-foreground"
          >
            <Calendar className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{t("nav.call")}</span>
          </button>
        </div>
      </nav>

      <QuickInvestorLeadDialog 
        open={investDialogOpen} 
        onOpenChange={setInvestDialogOpen}
        source="bottom_nav"
      />

      <QuickSellerLeadDialog 
        open={sellerDialogOpen} 
        onOpenChange={setSellerDialogOpen}
        source="bottom_nav"
      />
    </>
  );
};
