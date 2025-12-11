import { Home, TrendingUp, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";

export const BottomNav = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { trackClick } = useAnalytics();

  const currentLang = (i18n.language === 'en' ? 'en' : 'it') as 'it' | 'en';

  const handleNavClick = (e: React.MouseEvent, itemId: string, path: string) => {
    trackClick(`bottom_nav_${itemId}`, { label: itemId });
    
    e.preventDefault();
    
    if (location.pathname === '/') {
      const element = document.getElementById(itemId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (itemId === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      navigate(path);
    }
  };

  const handleWhatsAppClick = () => {
    trackClick('bottom_nav_whatsapp', { contact: 'lorenzo' });
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.lorenzo.name));
  };

  // Don't show on non-main pages
  if (location.pathname !== '/') return null;

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border shadow-lg"
      aria-label={t('nav.home')}
    >
      <div className="flex items-center justify-around h-16">
        {/* Home */}
        <Link
          to="/"
          onClick={(e) => handleNavClick(e, 'hero', '/')}
          className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-muted-foreground"
        >
          <Home className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-medium">{t("nav.home")}</span>
        </Link>

        {/* WhatsApp Lorenzo - Primary CTA with pulse indicator */}
        <button
          onClick={handleWhatsAppClick}
          className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-primary relative"
        >
          <div className="relative">
            <MessageCircle className="w-5 h-5" aria-hidden="true" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full animate-pulse" />
          </div>
          <span className="text-[10px] font-medium">WhatsApp</span>
        </button>

        {/* Investors */}
        <Link
          to="/#investor-section"
          onClick={(e) => handleNavClick(e, 'investor-section', '/#investor-section')}
          className="flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target text-muted-foreground"
        >
          <TrendingUp className="w-5 h-5" aria-hidden="true" />
          <span className="text-[10px] font-medium">{t("nav.investors")}</span>
        </Link>
      </div>
    </nav>
  );
};
