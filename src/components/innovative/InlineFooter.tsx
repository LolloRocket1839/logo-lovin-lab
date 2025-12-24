import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const InlineFooter = () => {
  const { t } = useTranslation();

  const links = [
    { label: t("nav.investors"), path: "/investitori" },
    { label: t("nav.sell"), path: "/vendi" },
    { label: t("nav.students"), path: "/studenti" },
    { label: "FAQ", path: "/faq" },
    { label: "Info on the City & Real Estate", path: "/blog" },
  ];

  return (
    <footer className="absolute bottom-0 left-0 right-0 pb-6 md:pb-8 hidden md:block">
      <div className="container px-4 md:px-8">
        <div className="flex flex-col items-center gap-4">
          {/* Navigation links */}
          <nav className="flex flex-wrap items-center justify-center gap-2 md:gap-4" aria-label="Footer navigation">
            {links.map((link, index) => (
              <span key={link.path} className="flex items-center">
                <Link
                  to={link.path}
                  className="text-xs md:text-sm text-muted-foreground hover:text-foreground transition-colors px-2 py-1"
                >
                  {link.label}
                </Link>
                {index < links.length - 1 && (
                  <span className="text-border hidden md:inline">|</span>
                )}
              </span>
            ))}
          </nav>

          {/* Legal line */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
            <span>© 2025 Jungle Rent S.r.l.</span>
            <span>·</span>
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </Link>
            <span>·</span>
            <Link to="/termini-e-condizioni" className="hover:text-foreground transition-colors">
              {t('footer.terms', 'Terms')}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
