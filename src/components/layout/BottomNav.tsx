import { Home, Building2, TrendingUp, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const { t, i18n } = useTranslation();
  const { pathname } = useLocation();
  const isEnglish = i18n.language.startsWith("en");

  const items = [
    { label: t("nav.home", isEnglish ? "Home" : "Home"), to: "/", icon: Home },
    { label: t("nav.sell"), to: isEnglish ? "/sell" : "/vendi", icon: Building2 },
    { label: t("nav.investors"), to: isEnglish ? "/investors" : "/investitori", icon: TrendingUp },
    { label: "Blog", to: "/blog", icon: BookOpen },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background md:hidden"
      aria-label="Navigazione principale mobile"
    >
      <div className="flex h-16 items-center justify-around">
        {items.map(({ label, to, icon: Icon }) => {
          const isActive = to === "/" ? pathname === "/" : pathname.startsWith(to);
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
