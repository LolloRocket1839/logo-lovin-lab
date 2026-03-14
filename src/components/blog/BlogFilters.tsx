import { BlogCategory } from "@/types/blog";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, X, Filter } from "lucide-react";
import { getAllTags } from "@/data/blog/posts";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useState } from "react";

interface BlogFiltersProps {
  activeCategory: BlogCategory;
  onCategoryChange: (category: BlogCategory) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  selectedTags: string[];
  onTagsChange: (tags: string[]) => void;
  resultCount?: number;
  isFiltering?: boolean;
}

export const BlogFilters = ({ 
  activeCategory, 
  onCategoryChange, 
  searchQuery, 
  onSearchChange,
  selectedTags,
  onTagsChange,
  resultCount,
  isFiltering 
}: BlogFiltersProps) => {
  const { t, i18n } = useTranslation();
  const [isTagsOpen, setIsTagsOpen] = useState(false);

  const categories: BlogCategory[] = ['all', 'students', 'investors', 'sellers', 'turisti', 'societa'];
  const allTags = getAllTags(i18n.language as 'it' | 'en');

  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      onTagsChange(selectedTags.filter(t => t !== tag));
    } else {
      onTagsChange([...selectedTags, tag]);
    }
  };

  const clearAllTags = () => {
    onTagsChange([]);
  };

  return (
    <div className="space-y-4 mb-6">
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

      <Collapsible open={isTagsOpen} onOpenChange={setIsTagsOpen} className="space-y-3">
        <div className="flex items-center justify-center gap-2">
          <CollapsibleTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="h-4 w-4" />
              {t('blog.filters.tags')} {selectedTags.length > 0 && `(${selectedTags.length})`}
            </Button>
          </CollapsibleTrigger>
          {selectedTags.length > 0 && (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={clearAllTags}
              className="gap-2"
            >
              <X className="h-4 w-4" />
              {t('blog.filters.clearAll')}
            </Button>
          )}
        </div>

        <CollapsibleContent className="space-y-3">
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 justify-center px-4">
              {selectedTags.map((tag) => (
                <Badge 
                  key={tag}
                  variant="default"
                  className="cursor-pointer gap-1 px-3 py-1"
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                  <X className="h-3 w-3" />
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex flex-wrap gap-2 justify-center px-4 max-w-4xl mx-auto">
            {allTags.map((tag) => (
              <Badge 
                key={tag}
                variant={selectedTags.includes(tag) ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-3 py-1"
                onClick={() => toggleTag(tag)}
              >
                {tag}
              </Badge>
            ))}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
