import { useState, Suspense, lazy } from "react";
import { TrendingUp, Building2, GraduationCap, Heart, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import { QuickInvestorLeadDialog } from "@/components/dialogs/QuickInvestorLeadDialog";
import { QuickSellerLeadDialog } from "@/components/dialogs/QuickSellerLeadDialog";

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

// Lazy load components since they're only shown on demand
const InfoDrawerContent = lazy(() => import("@/components/InfoDrawerContent").then(m => ({ default: m.InfoDrawerContent })));

export const BottomNav = () => {
  const { t } = useTranslation();
  const { trackClick } = useAnalytics();
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const [sellerDialogOpen, setSellerDialogOpen] = useState(false);
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);

  const handleInvestClick = () => {
    trackClick('bottom_nav_invest');
    setInvestDialogOpen(true);
  };

  const handleSellerClick = () => {
    trackClick('bottom_nav_seller');
    setSellerDialogOpen(true);
  };

  const handleStudentsClick = () => {
    trackClick('bottom_nav_students');
  };

  const handleInfoClick = () => {
    trackClick('bottom_nav_info');
    setInfoDrawerOpen(true);
  };

  return (
    <>
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background border-t border-border/20 shadow-lg safe-area-bottom"
        aria-label={t('nav.home')}
      >
        <div className="flex items-center justify-around h-[4.5rem] px-1">
          {/* Investi - Primary CTA with heart */}
          <button
            onClick={handleInvestClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors active:bg-primary/5 rounded-lg text-primary relative"
          >
            <div className="flex items-center gap-0.5">
              <TrendingUp className="w-6 h-6" aria-hidden="true" />
              <Heart className="w-3 h-3 fill-primary text-primary" aria-hidden="true" />
            </div>
            <span className="text-xs font-semibold">{t("nav.investors")}</span>
          </button>

          {/* Vendi - Seller CTA */}
          <button
            onClick={handleSellerClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors active:bg-muted/50 rounded-lg text-muted-foreground"
          >
            <Building2 className="w-6 h-6" aria-hidden="true" />
            <span className="text-xs font-medium">{t("nav.sell")}</span>
          </button>

          {/* Studenti - Direct navigation */}
          <Link
            to="/studenti"
            onClick={handleStudentsClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors active:bg-muted/50 rounded-lg text-muted-foreground"
          >
            <GraduationCap className="w-6 h-6" aria-hidden="true" />
            <span className="text-xs font-medium">{t("nav.students")}</span>
          </Link>

          {/* Info */}
          <button
            onClick={handleInfoClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors active:bg-muted/50 rounded-lg text-muted-foreground"
          >
            <Info className="w-6 h-6" aria-hidden="true" />
            <span className="text-xs font-medium">Info</span>
          </button>

        </div>
      </nav>

      {/* Info Drawer - infoinfoinfo(: */}
      <Drawer open={infoDrawerOpen} onOpenChange={setInfoDrawerOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="text-center">info(:</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-8">
            <Suspense fallback={<div className="h-32 flex items-center justify-center text-muted-foreground">Loading...</div>}>
              <InfoDrawerContent onClose={() => setInfoDrawerOpen(false)} />
            </Suspense>
          </div>
        </DrawerContent>
      </Drawer>

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
