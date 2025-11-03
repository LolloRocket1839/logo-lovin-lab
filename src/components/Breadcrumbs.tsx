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

  return (
    <div className="container mx-auto px-4 pt-24 pb-4">
      <Breadcrumb>
        <BreadcrumbList className="text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors">
                <Home className="h-4 w-4" />
                {t('breadcrumbs.home')}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {items.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {index === items.length - 1 ? (
                  <BreadcrumbPage className="font-medium">
                    {item.label}
                  </BreadcrumbPage>
                ) : item.href ? (
                  <BreadcrumbLink asChild>
                    <Link to={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <span>{item.label}</span>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
