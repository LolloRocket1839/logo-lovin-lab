import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const Navigation = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { trackClick } = useAnalytics();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      // Calculate scroll progress for logo transition (0 to 1)
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / (windowHeight * 0.5), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Initial call
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    trackClick('nav_logo');
    
    // If already on home page, just scroll to top smoothly
    if (window.location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
    // Otherwise, Link handles client-side navigation to '/'
  };

  const handleMenuClick = (e: React.MouseEvent, item: typeof menuItems[0]) => {
    trackClick(`nav_menu_${item.id || item.path}`, { label: item.label });
    
    if (item.id) {
      // If already on home page, prevent default and scroll smoothly
      if (window.location.pathname === '/') {
        e.preventDefault();
        scrollToSection(item.id);
      }
      // Otherwise, Link navigates to /#section-id and useEffect handles scroll
    }
    // For path items (like /blog), Link handles navigation normally
    setIsMobileMenuOpen(false);
  };

  // Handle hash-based navigation after route change (e.g., navigating to /#student-section)
  useEffect(() => {
    if (window.location.pathname === '/' && window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
          // Clean up the hash from URL
          window.history.replaceState(null, '', '/');
        }
      }, 100);
    }
  }, [prefersReducedMotion]);

  const currentLang = (i18n.language === 'en' ? 'en' : 'it') as 'it' | 'en';

  const handleContact = () => {
    trackClick('nav_contact_button');
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.lorenzo.name));
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { label: t("nav.home"), id: "hero" as string | undefined, path: undefined as string | undefined },
    { label: t("nav.students"), id: "student-section", path: undefined },
    { label: t("nav.investors"), id: "investor-section", path: undefined },
    { label: t("nav.blog"), id: undefined, path: "/blog" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        prefersReducedMotion ? '' : 'transition-all duration-500'
      } ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-minimal"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Navigazione principale"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 transition-spacing">
        <div className="flex items-center justify-between h-16 md:h-20 transition-responsive">
          {/* Logo - only shows when scrolled */}
          <Link
            to="/"
            onClick={handleLogoClick}
            className={`flex items-center gap-2 group ${prefersReducedMotion ? '' : 'transition-all duration-500 hover:scale-105'}`}
            aria-label="Torna alla home"
            style={{
              opacity: scrollProgress,
              transform: prefersReducedMotion ? undefined : `scale(${0.8 + (scrollProgress * 0.2)})`,
              pointerEvents: scrollProgress < 0.3 ? 'none' : 'auto'
            }}
          >
            <img
              src={jungleRentLogo}
              alt="Jungle Rent Logo"
              className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 ${prefersReducedMotion ? '' : 'transition-size group-hover:rotate-6'}`}
            />
            <span className="font-display font-bold text-lg md:text-xl text-foreground hidden sm:block">
              Jungle Rent
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => {
              const href = item.path || (item.id ? `/#${item.id}` : '/');
              return (
                <Link
                  key={item.id || item.path || index}
                  to={href}
                  onClick={(e) => handleMenuClick(e, item)}
                  className="px-4 py-2 text-sm font-normal text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-md hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              variant="premium"
              size="sm"
              onClick={() => {
                trackClick('nav_invest_button');
                navigate('/invest');
              }}
              className="px-6 font-semibold"
            >
              {t('hero.invest')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          {/* Mobile Menu & Language */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-foreground hover:bg-accent/50 rounded-md transition-size focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              aria-label={isMobileMenuOpen ? t("accessibility.closeMenu") : t("accessibility.openMenu")}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border bg-background/95 backdrop-blur-xl z-50">
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => {
                const href = item.path || (item.id ? `/#${item.id}` : '/');
                return (
                  <Link
                    key={item.id || item.path || index}
                    to={href}
                    onClick={(e) => handleMenuClick(e, item)}
                    className="px-4 py-3 text-left text-sm font-normal text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    {item.label}
                  </Link>
                );
              })}
              <Button
                variant="premium"
                onClick={() => {
                  trackClick('nav_mobile_invest_button');
                  setIsMobileMenuOpen(false);
                  navigate('/invest');
                }}
                className="mt-2 w-full font-semibold"
              >
                {t('hero.invest')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
