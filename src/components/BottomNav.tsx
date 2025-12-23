import { useState, Suspense, lazy } from "react";
import { TrendingUp, Building2, Info, GraduationCap, Heart, Users, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";
import { QuickSellerLeadDialog } from "@/components/QuickSellerLeadDialog";
import { CONTACTS } from "@/lib/contacts";
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
  const [foundersDrawerOpen, setFoundersDrawerOpen] = useState(false);

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

  const handleFoundersClick = () => {
    trackClick('bottom_nav_founders');
    setFoundersDrawerOpen(true);
  };

  const handleCallLorenzo = () => {
    trackClick('founders_call_lorenzo');
    window.location.href = `tel:${CONTACTS.lorenzo.phone}`;
  };

  return (
    <>
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/20 shadow-lg"
        aria-label={t('nav.home')}
      >
        <div className="flex items-center justify-around h-16 px-2">
          {/* Investi - Primary CTA with heart */}
          <button
            onClick={handleInvestClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-primary relative"
          >
            <div className="flex items-center gap-0.5">
              <TrendingUp className="w-5 h-5" aria-hidden="true" />
              <Heart className="w-2.5 h-2.5 fill-primary text-primary" aria-hidden="true" />
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

          {/* Studenti - Direct navigation */}
          <Link
            to="/studenti"
            onClick={handleStudentsClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-muted-foreground"
          >
            <GraduationCap className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{t("nav.students")}</span>
          </Link>

          {/* Fondatori */}
          <button
            onClick={handleFoundersClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-muted-foreground"
          >
            <Users className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{t("founders.title")}</span>
          </button>
        </div>
      </nav>

      {/* Info Drawer - infoinfoinfo(: */}
      <Drawer open={infoDrawerOpen} onOpenChange={setInfoDrawerOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="text-center">infoinfoinfo(:</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-8">
            <Suspense fallback={<div className="h-32 flex items-center justify-center text-muted-foreground">Loading...</div>}>
              <InfoDrawerContent onClose={() => setInfoDrawerOpen(false)} />
            </Suspense>
          </div>
        </DrawerContent>
      </Drawer>

      {/* Founders Drawer */}
      <Drawer open={foundersDrawerOpen} onOpenChange={setFoundersDrawerOpen}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader className="pb-2">
            <DrawerTitle className="text-center">{t("founders.title")}</DrawerTitle>
          </DrawerHeader>
          <div className="px-4 pb-8">
            <p className="text-sm text-muted-foreground text-center mb-6">
              {t("founders.contactUs")}
            </p>
            <div className="space-y-4">
              <button
                onClick={handleCallLorenzo}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-primary/10 border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">L</span>
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">{CONTACTS.lorenzo.name}</p>
                  <p className="text-sm text-muted-foreground">{CONTACTS.lorenzo.phone}</p>
                </div>
                <div className="flex items-center gap-2 text-primary">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm font-medium">{t("founders.callNow")}</span>
                </div>
              </button>
            </div>
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
