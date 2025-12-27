import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  CheapEatCategory, 
  PriceRange, 
  categoryLabels, 
  districts, 
  priceRanges 
} from '@/data/cheapEatsDirectory';

export interface CheapEatFiltersState {
  search: string;
  category: CheapEatCategory | 'all';
  district: string;
  priceRange: PriceRange | 'all';
  vegetarian: 'all' | 'yes' | 'partial';
  wifi: 'all' | 'yes';
  accessible: 'all' | 'yes';
}

interface CheapEatFiltersProps {
  filters: CheapEatFiltersState;
  onFiltersChange: (filters: CheapEatFiltersState) => void;
  lang: 'it' | 'en';
  totalResults: number;
}

const CheapEatFilters: React.FC<CheapEatFiltersProps> = ({
  filters,
  onFiltersChange,
  lang,
  totalResults,
}) => {
  const content = {
    it: {
      search: 'Cerca locale...',
      category: 'Categoria',
      allCategories: 'Tutte le categorie',
      district: 'Zona',
      allDistricts: 'Tutte le zone',
      priceRange: 'Fascia prezzo',
      allPrices: 'Tutti i prezzi',
      vegetarian: 'Vegetariano',
      all: 'Tutti',
      yes: 'Sì',
      partial: 'Opzioni veg',
      wifi: 'WiFi',
      accessible: 'Accessibile',
      clearFilters: 'Azzera filtri',
      results: 'risultati',
      result: 'risultato',
    },
    en: {
      search: 'Search venue...',
      category: 'Category',
      allCategories: 'All categories',
      district: 'District',
      allDistricts: 'All districts',
      priceRange: 'Price range',
      allPrices: 'All prices',
      vegetarian: 'Vegetarian',
      all: 'All',
      yes: 'Yes',
      partial: 'Veg options',
      wifi: 'WiFi',
      accessible: 'Accessible',
      clearFilters: 'Clear filters',
      results: 'results',
      result: 'result',
    },
  };

  const t = content[lang];

  const hasActiveFilters =
    filters.search ||
    filters.category !== 'all' ||
    filters.district !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.vegetarian !== 'all' ||
    filters.wifi !== 'all' ||
    filters.accessible !== 'all';

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      category: 'all',
      district: 'all',
      priceRange: 'all',
      vegetarian: 'all',
      wifi: 'all',
      accessible: 'all',
    });
  };

  const categories = Object.keys(categoryLabels) as CheapEatCategory[];

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border border-border/50">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder={t.search}
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          className="pl-10"
        />
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {/* Category */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">{t.category}</Label>
          <Select
            value={filters.category}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, category: value as CheapEatCategory | 'all' })
            }
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder={t.allCategories} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allCategories}</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {categoryLabels[cat][lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* District */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">{t.district}</Label>
          <Select
            value={filters.district}
            onValueChange={(value) => onFiltersChange({ ...filters, district: value })}
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder={t.allDistricts} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allDistricts}</SelectItem>
              {districts.map((d) => (
                <SelectItem key={d} value={d}>
                  {d}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">{t.priceRange}</Label>
          <Select
            value={filters.priceRange}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, priceRange: value as PriceRange | 'all' })
            }
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder={t.allPrices} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allPrices}</SelectItem>
              {priceRanges.map((p) => (
                <SelectItem key={p} value={p}>
                  {p}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Vegetarian */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground">{t.vegetarian}</Label>
          <Select
            value={filters.vegetarian}
            onValueChange={(value) =>
              onFiltersChange({ ...filters, vegetarian: value as 'all' | 'yes' | 'partial' })
            }
          >
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder={t.all} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.all}</SelectItem>
              <SelectItem value="yes">{t.yes}</SelectItem>
              <SelectItem value="partial">{t.partial}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Results count & Clear */}
      <div className="flex items-center justify-between pt-2 border-t border-border/50">
        <span className="text-sm text-muted-foreground">
          <strong className="text-foreground">{totalResults}</strong>{' '}
          {totalResults === 1 ? t.result : t.results}
        </span>
        {hasActiveFilters && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-xs h-8"
          >
            <X className="w-3 h-3 mr-1" />
            {t.clearFilters}
          </Button>
        )}
      </div>
    </div>
  );
};

export default CheapEatFilters;
