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
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden"
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
              className={`flex h-full w-full flex-col items-center justify-center gap-1 text-xs ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
