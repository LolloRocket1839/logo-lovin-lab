import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { Button } from "@/components/ui/button";
import { toEnglishPath, toItalianPath } from "@/constants/routeAliases";

export const Navigation = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const isEnglish = i18n.language.startsWith("en");

  const sellPath = isEnglish ? "/sell" : "/vendi";
  const investorPath = isEnglish ? "/investors" : "/investitori";
  const aboutPath = isEnglish ? "/about" : "/chi-siamo";

  const menuItems = [
    { label: t("nav.sell"), path: sellPath },
    { label: t("nav.investors"), path: investorPath },
    { label: "Blog", path: "/blog" },
    { label: t("nav.about", isEnglish ? "About" : "Chi siamo"), path: aboutPath },
  ];

  const changeLanguage = (code: "it" | "en") => {
    if (i18n.language.startsWith(code)) return;
    i18n.changeLanguage(code);
    const target = code === "en" ? toEnglishPath(location.pathname) : toItalianPath(location.pathname);
    if (target !== location.pathname) {
      navigate(`${target}${location.search}${location.hash}`, { replace: true });
    }
  };

  return (
    <header
      className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur"
      role="banner"
    >
      <nav
        className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8"
        aria-label="Navigazione principale"
      >
        <Link to="/" className="flex items-center gap-2" aria-label="Jungle Rent">
          <img src={jungleRentLogo} alt="" className="h-8 w-8" width={32} height={32} />
          <span className="font-display text-lg font-bold text-foreground">Jungle Rent</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Button asChild size="sm" className="ml-2">
            <Link to={sellPath}>{t("nav.sell")}</Link>
          </Button>
        </div>

        <div className="flex items-center gap-1 text-sm md:ml-4">
          <button
            type="button"
            onClick={() => changeLanguage("it")}
            className={isEnglish ? "px-1 text-muted-foreground hover:text-foreground" : "px-1 text-foreground"}
            aria-label="Italiano"
          >
            IT
          </button>
          <span aria-hidden="true" className="text-muted-foreground">
            /
          </span>
          <button
            type="button"
            onClick={() => changeLanguage("en")}
            className={isEnglish ? "px-1 text-foreground" : "px-1 text-muted-foreground hover:text-foreground"}
            aria-label="English"
          >
            EN
          </button>
        </div>
      </nav>
    </header>
  );
};
