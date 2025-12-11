import { Home, TrendingUp, BookOpen } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";

export const BottomNav = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { trackClick } = useAnalytics();

  // Simplified to 3 essential items: Home, Investors (primary CTA), Blog
  const navItems = [
    { id: "hero", icon: Home, label: t("nav.home"), path: "/" },
    { id: "investor-section", icon: TrendingUp, label: t("nav.investors"), path: "/#investor-section" },
    { id: "blog", icon: BookOpen, label: t("nav.blog"), path: "/blog" },
  ];

  const handleClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    trackClick(`bottom_nav_${item.id}`, { label: item.label });
    
    if (item.id === "blog") {
      return; // Let Link handle navigation
    }

    e.preventDefault();
    
    if (location.pathname === '/') {
      // Already on home, scroll to section
      const element = document.getElementById(item.id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      } else if (item.id === 'hero') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      // Navigate to home then scroll
      navigate(item.path);
    }
  };

  // Don't show on non-main pages except blog
  const showOnPaths = ['/', '/blog'];
  const shouldShow = showOnPaths.some(p => 
    p === '/' ? location.pathname === '/' : location.pathname.startsWith(p)
  );

  if (!shouldShow) return null;

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/95 backdrop-blur-xl border-t border-border shadow-lg"
      aria-label={t('nav.home')}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.id === 'blog' 
            ? location.pathname.startsWith('/blog')
            : location.pathname === '/' && (
                item.id === 'hero' 
                  ? true 
                  : false
              );
          
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={(e) => handleClick(e, item)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex flex-col items-center justify-center w-full h-full gap-1 transition-colors touch-target ${
                isActive ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              <span className="text-[10px] font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
