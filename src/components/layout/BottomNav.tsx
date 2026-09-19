import { Home, Building2, TrendingUp, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const isEnglish = i18n.language.startsWith("en");

  const items = [
    { label: t("nav.home", "Home"), to: isEnglish ? "/en" : "/", icon: Home },
    { label: t("nav.sellShort", isEnglish ? "Sell" : "Vendi"), to: isEnglish ? "/en/vendi" : "/vendi", icon: Building2 },
    {
      label: t("nav.investShort", isEnglish ? "Invest" : "Investi"),
      to: isEnglish ? "/en/investitori" : "/investitori",
      icon: TrendingUp,
    },
    { label: "Blog", to: isEnglish ? "/en/blog" : "/blog", icon: BookOpen },
  ];

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 border-t border-border/60 bg-background/95 backdrop-blur md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      aria-label="Navigazione principale mobile"
    >
      <div className="flex h-16 items-center justify-around">
        {items.map(({ label, to, icon: Icon }) => {
          const isActive = to === "/" || to === "/en" ? pathname === to : pathname.startsWith(to);
          return (
            <Link
              key={to}
              to={to}
              aria-current={isActive ? "page" : undefined}
              className={`flex h-full w-full flex-col items-center justify-center gap-0.5 text-[11px] transition-colors duration-150 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-6 w-6" strokeWidth={isActive ? 2.5 : 1.75} aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
