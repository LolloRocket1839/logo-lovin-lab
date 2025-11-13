import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";
import { useAnalytics } from "@/hooks/useAnalytics";

export const Navigation = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { trackClick } = useAnalytics();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

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
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleMenuClick = (item: typeof menuItems[0]) => {
    trackClick(`nav_menu_${item.id || item.path}`, { label: item.label });
    if (item.path) {
      navigate(item.path);
      setIsMobileMenuOpen(false);
    } else if (item.id) {
      // If we're not on home page, navigate to home first
      if (window.location.pathname !== '/') {
        navigate('/');
        setTimeout(() => scrollToSection(item.id!), 100);
      } else {
        scrollToSection(item.id);
      }
    }
  };

  const currentLang = (i18n.language === 'en' ? 'en' : 'it') as 'it' | 'en';

  const handleContact = () => {
    trackClick('nav_contact_button');
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.lorenzo.name));
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { label: t("nav.home"), id: "hero" as string | undefined, path: undefined as string | undefined },
    { label: t("nav.about"), id: undefined, path: i18n.language === 'en' ? "/about" : "/chi-siamo" },
    { label: t("nav.students"), id: "student-section", path: undefined },
    { label: t("nav.investors"), id: "investor-section", path: undefined },
    { label: t("nav.sell"), id: "seller-section", path: undefined },
    { label: t("nav.blog"), id: undefined, path: "/blog" },
    { label: t("nav.faq"), id: "faq-section", path: undefined },
    { label: t("nav.contacts"), id: "footer", path: undefined },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
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
          <button
            onClick={() => {
              trackClick('nav_logo');
              scrollToSection("hero");
            }}
            className="flex items-center gap-2 group transition-all duration-500 hover:scale-105"
            aria-label="Torna alla home"
            style={{
              opacity: scrollProgress,
              transform: `scale(${0.8 + (scrollProgress * 0.2)})`,
              pointerEvents: scrollProgress < 0.3 ? 'none' : 'auto'
            }}
          >
            <img
              src={jungleRentLogo}
              alt="Jungle Rent Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12 transition-size group-hover:rotate-6"
            />
            <span className="font-display font-bold text-lg md:text-xl text-foreground hidden sm:block">
              Jungle Rent
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item, index) => (
              <button
                key={item.id || item.path || index}
                onClick={() => handleMenuClick(item)}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 rounded-md hover:bg-accent/50 focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Language Switcher & CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <LanguageSwitcher />
            <Button
              variant="premium"
              size="sm"
              onClick={handleContact}
              className="px-6"
            >
              {t("nav.contactUs")}
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
          <div className="lg:hidden py-4 border-t border-border animate-fade-in bg-background/95 backdrop-blur-xl z-50">
            <div className="flex flex-col gap-2">
              {menuItems.map((item, index) => (
                <button
                  key={item.id || item.path || index}
                  onClick={() => handleMenuClick(item)}
                  className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {item.label}
                </button>
              ))}
              <Button
                variant="premium"
                onClick={handleContact}
                className="mt-2 w-full"
              >
                {t("nav.contactUs")}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
