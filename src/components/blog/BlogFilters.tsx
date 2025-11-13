import { BlogCategory } from "@/types/blog";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface BlogFiltersProps {
  activeCategory: BlogCategory;
  onCategoryChange: (category: BlogCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const BlogFilters = ({ activeCategory, onCategoryChange, searchQuery, onSearchChange }: BlogFiltersProps) => {
  const { t } = useTranslation();

  const categories: BlogCategory[] = ['all', 'students', 'investors', 'sellers'];

  return (
    <div className="space-y-6 mb-12">
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder={t('blog.search.placeholder')}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3 justify-center">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => onCategoryChange(category)}
            className="min-w-[120px]"
          >
            {t(`blog.categories.${category}`)}
          </Button>
        ))}
      </div>
    </div>
  );
};
