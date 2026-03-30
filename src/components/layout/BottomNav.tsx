import { useState, Suspense, lazy } from "react";
import { TrendingUp, Building2, GraduationCap, Heart, Users, Phone, MessageCircle, MessageSquare, Info } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import { QuickInvestorLeadDialog } from "@/components/dialogs/QuickInvestorLeadDialog";
import { QuickSellerLeadDialog } from "@/components/dialogs/QuickSellerLeadDialog";
import { CONTACTS, openQuickContact, openQuickContactWithFallback, type SupportedLanguage } from "@/constants";
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

  const handleWhatsAppLorenzo = () => {
    trackClick('founders_whatsapp_lorenzo');
    const lang = (document.documentElement.lang || 'it') as SupportedLanguage;
    openQuickContact(lang);
  };

  const handleSMSLorenzo = () => {
    trackClick('founders_sms_lorenzo');
    const lang = (document.documentElement.lang || 'it') as SupportedLanguage;
    openQuickContactWithFallback(lang, 'sms');
  };

  const handleCallLorenzo = () => {
    trackClick('founders_call_lorenzo');
    window.location.href = `tel:${CONTACTS.lorenzo.phone}`;
  };

  return (
    <>
      <nav 
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border/20 shadow-lg safe-area-bottom"
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

          {/* Fondatori */}
          <button
            onClick={handleFoundersClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1.5 transition-colors active:bg-muted/50 rounded-lg text-muted-foreground"
          >
            <Users className="w-6 h-6" aria-hidden="true" />
            <span className="text-xs font-medium">{t("founders.title")}</span>
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
            <div className="space-y-3">
              {/* WhatsApp - Primary */}
              <button
                onClick={handleWhatsAppLorenzo}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-[#25D366]/10 border border-[#25D366]/20 hover:bg-[#25D366]/20 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#25D366]/20 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-[#25D366]" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">{CONTACTS.lorenzo.name}</p>
                  <p className="text-sm text-muted-foreground">WhatsApp</p>
                </div>
                <div className="flex items-center gap-2 text-[#25D366]">
                  <span className="text-sm font-medium">{t("founders.message")}</span>
                </div>
              </button>

              {/* SMS - Fallback */}
              <button
                onClick={handleSMSLorenzo}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/20 hover:bg-muted transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">{t("founders.noWhatsApp")}</p>
                  <p className="text-sm text-muted-foreground">{t("founders.sendSMS")}</p>
                </div>
              </button>

              {/* Call - Fallback */}
              <button
                onClick={handleCallLorenzo}
                className="w-full flex items-center gap-4 p-4 rounded-xl bg-muted/50 border border-border/20 hover:bg-muted transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
                  <Phone className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">{t("founders.callDirect")}</p>
                  <p className="text-sm text-muted-foreground">{CONTACTS.lorenzo.phone}</p>
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
