import { useState } from "react";
import { Home, TrendingUp, MessageCircle, BookOpen, Calendar } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";
import { openCalendly } from "@/lib/calendly";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";

export const BottomNav = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { trackClick } = useAnalytics();
  const [investDialogOpen, setInvestDialogOpen] = useState(false);

  const currentLang = (i18n.language === 'en' ? 'en' : 'it') as 'it' | 'en';

  const handleHomeClick = (e: React.MouseEvent) => {
    trackClick('bottom_nav_home');
    e.preventDefault();
    
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  const handleStudentWhatsApp = () => {
    trackClick('bottom_nav_student_whatsapp');
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.lorenzo.name));
  };

  const handleInvestClick = () => {
    trackClick('bottom_nav_invest');
    setInvestDialogOpen(true);
  };

  const handleCalendlyClick = () => {
    trackClick('bottom_nav_calendly');
    openCalendly();
  };

  // Show on all pages
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

          {/* Studenti - WhatsApp */}
          <button
            onClick={handleStudentWhatsApp}
            className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-muted-foreground"
          >
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{t("nav.students")}</span>
          </button>

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

          {/* Calendly - Schedule call */}
          <button
            onClick={handleCalendlyClick}
            className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-muted-foreground"
          >
            <Calendar className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{t("nav.call")}</span>
          </button>

          {/* Blog */}
          <Link
            to="/blog"
            onClick={() => trackClick('bottom_nav_blog')}
            className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-muted-foreground"
          >
            <BookOpen className="w-5 h-5" aria-hidden="true" />
            <span className="text-[10px] font-medium">{t("nav.blog")}</span>
          </Link>
        </div>
      </nav>

      <QuickInvestorLeadDialog 
        open={investDialogOpen} 
        onOpenChange={setInvestDialogOpen}
        source="bottom_nav"
      />
    </>
  );
};
