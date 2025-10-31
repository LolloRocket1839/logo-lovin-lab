import { useTranslation } from "react-i18next";
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
            <BreadcrumbLink
              onClick={() => scrollToSection("hero")}
              className="flex items-center gap-1 cursor-pointer hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
            >
              <Home className="h-4 w-4" />
              {t('breadcrumbs.home')}
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
                ) : (
                  <BreadcrumbLink
                    onClick={() => item.href && scrollToSection(item.href)}
                    className="cursor-pointer hover:text-primary transition-colors focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-sm"
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
