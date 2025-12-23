import { useState, useEffect } from "react";
import { Menu, X, ChevronLeft, Phone } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";
import { CONTACTS } from "@/lib/contacts";

export const Navigation = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const { trackClick } = useAnalytics();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const isHomePage = location.pathname === '/';
  const isBlogPost = location.pathname.startsWith('/blog/');
  const showBackButton = !isHomePage;

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
      
      const windowHeight = window.innerHeight;
      const progress = Math.min(Math.max(scrollY / (windowHeight * 0.5), 0), 1);
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
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
    
    if (isHomePage) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }
  };

  const handleMenuClick = (e: React.MouseEvent, item: typeof menuItems[0]) => {
    trackClick(`nav_menu_${item.id || item.path || 'founders'}`, { label: item.label });
    
    // Handle founders click - open phone call
    if ('isFounders' in item && item.isFounders) {
      e.preventDefault();
      window.location.href = `tel:${CONTACTS.lorenzo.phone}`;
      setIsMobileMenuOpen(false);
      return;
    }
    
    if (item.id) {
      if (window.location.pathname === '/') {
        e.preventDefault();
        scrollToSection(item.id);
      }
    }
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    if (window.location.pathname === '/' && window.location.hash) {
      const id = window.location.hash.slice(1);
      setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
          window.history.replaceState(null, '', '/');
        }
      }, 100);
    }
  }, [prefersReducedMotion]);

  // Simplified to 4 items: Invest | Sell | For Students | Founders
  const menuItems = [
    { label: t("nav.investors"), id: undefined as string | undefined, path: "/investitori" as string | undefined },
    { label: t("nav.sell"), id: "seller-section", path: undefined },
    { label: t("nav.students"), id: undefined, path: "/studenti" },
    { label: t("founders.title"), id: undefined, path: undefined, isFounders: true },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 ${
        prefersReducedMotion ? '' : 'transition-all duration-500'
      } ${
        isScrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border/20 shadow-minimal"
          : "bg-transparent"
      }`}
      role="navigation"
      aria-label="Navigazione principale"
    >
      <div className="container mx-auto px-4 md:px-8 transition-spacing">
        <div className="flex items-center justify-between h-16 md:h-20 transition-responsive">
          {/* Mobile: Back Button + Logo | Desktop: Logo only */}
          <div className="flex items-center gap-3">
            {showBackButton && (
              <>
                <button
                  onClick={() => {
                    trackClick('nav_back_button');
                    if (isBlogPost) {
                      navigate('/blog');
                    } else {
                      navigate('/');
                    }
                  }}
                  className="lg:hidden flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-accent/50"
                  aria-label={t('nav.back') || 'Indietro'}
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="text-sm font-medium">
                    {isBlogPost ? 'Blog' : 'Home'}
                  </span>
                </button>

                <div className="lg:hidden h-5 w-px bg-border mx-1" aria-hidden="true" />
              </>
            )}

            {/* Logo - fades in on scroll when on homepage (since hero has the large logo) */}
            <Link
              to="/"
              onClick={handleLogoClick}
              className={`flex items-center gap-2 group ${prefersReducedMotion ? '' : 'transition-all duration-500 hover:scale-105'}`}
              aria-label="Torna alla home"
              style={{
                opacity: isHomePage ? Math.min(scrollProgress * 1.5, 1) : 1,
                transform: prefersReducedMotion ? undefined : `scale(${isHomePage ? (0.8 + (Math.min(scrollProgress, 1) * 0.2)) : 1})`,
                pointerEvents: isHomePage && scrollProgress < 0.2 ? 'none' : 'auto'
              }}
            >
              <img
                src={jungleRentLogo}
                alt="Jungle Rent Logo"
                className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 ${prefersReducedMotion ? '' : 'transition-size group-hover:rotate-6'}`}
              />
              <span className="font-display font-bold text-lg md:text-xl text-foreground hidden sm:block">
                Jungle Rent
              </span>
            </Link>
          </div>

          {/* Desktop Menu - 4 items */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => {
              const href = item.path || (item.id ? `/#${item.id}` : '/');
              const isFoundersItem = 'isFounders' in item && item.isFounders;
              return (
                <Link
                  key={item.id || item.path || index}
                  to={href}
                  onClick={(e) => handleMenuClick(e, item)}
                  className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-md hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex items-center gap-1.5"
                >
                  {isFoundersItem && <Phone className="w-4 h-4" />}
                  {item.label}
                </Link>
              );
            })}
          </div>


          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
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
          <div className="lg:hidden py-4 border-t border-border/20 bg-background/95 backdrop-blur-xl z-50">
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => {
                const href = item.path || (item.id ? `/#${item.id}` : '/');
                const isFoundersItem = 'isFounders' in item && item.isFounders;
                return (
                  <Link
                    key={item.id || item.path || index}
                    to={href}
                    onClick={(e) => handleMenuClick(e, item)}
                    className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 flex items-center gap-2"
                  >
                    {isFoundersItem && <Phone className="w-4 h-4" />}
                    {item.label}
                    {isFoundersItem && (
                      <span className="text-xs text-primary ml-auto">{CONTACTS.lorenzo.phone}</span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <QuickInvestorLeadDialog 
        open={investDialogOpen} 
        onOpenChange={setInvestDialogOpen}
        source="navigation"
      />
    </nav>
  );
};
