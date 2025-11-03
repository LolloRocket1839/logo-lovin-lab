import { BlogCategory } from "@/types/blog";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";

interface BlogFiltersProps {
  activeCategory: BlogCategory;
  onCategoryChange: (category: BlogCategory) => void;
}

export const BlogFilters = ({ activeCategory, onCategoryChange }: BlogFiltersProps) => {
  const { t } = useTranslation();

  const categories: BlogCategory[] = ['all', 'students', 'investors', 'sellers'];

  return (
    <div className="flex flex-wrap gap-3 justify-center mb-12">
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
  );
};
