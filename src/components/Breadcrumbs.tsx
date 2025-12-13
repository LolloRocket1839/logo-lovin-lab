import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

interface BreadcrumbsProps {
  items?: Array<{ label: string; href?: string }>;
}

export const Breadcrumbs = ({ items = [] }: BreadcrumbsProps) => {
  const { t } = useTranslation();
  
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Truncate long titles for mobile
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <nav aria-label="Breadcrumb" className="container mx-auto px-3 sm:px-4 pt-24 pb-3 sm:pb-4">
      <Breadcrumb>
        <BreadcrumbList className="text-xs sm:text-sm gap-0.5 sm:gap-1 flex-wrap">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link 
                to="/" 
                className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors"
                aria-label={t('breadcrumbs.home')}
              >
                <Home className="h-3.5 w-3.5 sm:h-4 sm:w-4" aria-hidden="true" />
                <span className="hidden sm:inline">{t('breadcrumbs.home')}</span>
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const displayLabel = isLast 
              ? truncateText(item.label, 40)
              : item.label;
            
            return (
              <div key={index} className="flex items-center gap-0.5 sm:gap-1">
                <BreadcrumbSeparator className="text-muted-foreground/50" />
                <BreadcrumbItem>
                  {isLast ? (
                    <BreadcrumbPage 
                      className="font-medium text-foreground max-w-[200px] sm:max-w-none truncate"
                      title={item.label}
                    >
                      {displayLabel}
                    </BreadcrumbPage>
                  ) : item.href ? (
                    <BreadcrumbLink asChild>
                      <Link 
                        to={item.href} 
                        className="text-muted-foreground hover:text-primary transition-colors"
                      >
                        {item.label}
                      </Link>
                    </BreadcrumbLink>
                  ) : (
                    <span className="text-muted-foreground">{item.label}</span>
                  )}
                </BreadcrumbItem>
              </div>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </nav>
  );
};
