import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";

export const Navigation = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      setIsMobileMenuOpen(false);
    }
  };

  const handleContact = () => {
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp(CONTACTS.lorenzo.name));
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
    { label: t("nav.home"), id: "hero" },
    { label: t("nav.students"), id: "student-section" },
    { label: t("nav.investors"), id: "investor-section" },
    { label: t("nav.sell"), id: "seller-section" },
    { label: t("nav.faq"), id: "faq-section" },
    { label: t("nav.contacts"), id: "footer" },
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
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("hero")}
            className="flex items-center gap-2 group transition-transform duration-300 hover:scale-105"
            aria-label="Torna alla home"
          >
            <img
              src={jungleRentLogo}
              alt="Jungle Rent Logo"
              className="w-8 h-8 md:w-10 md:h-10 transition-transform duration-300 group-hover:rotate-6"
            />
            <span className="font-display font-bold text-lg md:text-xl text-foreground hidden sm:block">
              Jungle Rent
            </span>
          </button>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-1">
            {menuItems.map((item) => (
              <button
                key={item.id}
              onClick={() => scrollToSection(item.id)}
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
              variant="hero"
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
              className="p-2 text-foreground hover:bg-accent/50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
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
          <div className="lg:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-2">
              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="px-4 py-3 text-left text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-md transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {item.label}
                </button>
              ))}
              <Button
                variant="hero"
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
