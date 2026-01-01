import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Search, X, RotateCcw } from 'lucide-react';
import { GymChain, GymCategory, chainLabels, categoryLabels } from '@/data/gymsDirectory';

export interface GymFiltersState {
  search: string;
  chain: GymChain | 'all';
  category: GymCategory | 'all';
  maxPrice: number;
  open24h: boolean;
  hasPool: boolean;
  hasSauna: boolean;
  studentDiscount: boolean;
}

interface GymFiltersProps {
  filters: GymFiltersState;
  onFiltersChange: (filters: GymFiltersState) => void;
  lang: 'it' | 'en';
}

const GymFilters: React.FC<GymFiltersProps> = ({ filters, onFiltersChange, lang }) => {
  const updateFilter = <K extends keyof GymFiltersState>(
    key: K,
    value: GymFiltersState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    onFiltersChange({
      search: '',
      chain: 'all',
      category: 'all',
      maxPrice: 200,
      open24h: false,
      hasPool: false,
      hasSauna: false,
      studentDiscount: false
    });
  };

  const hasActiveFilters = 
    filters.search !== '' ||
    filters.chain !== 'all' ||
    filters.category !== 'all' ||
    filters.maxPrice < 200 ||
    filters.open24h ||
    filters.hasPool ||
    filters.hasSauna ||
    filters.studentDiscount;

  const t = {
    search: lang === 'it' ? 'Cerca palestra...' : 'Search gym...',
    chain: lang === 'it' ? 'Catena' : 'Chain',
    allChains: lang === 'it' ? 'Tutte le catene' : 'All chains',
    category: lang === 'it' ? 'Categoria' : 'Category',
    allCategories: lang === 'it' ? 'Tutte le categorie' : 'All categories',
    maxPrice: lang === 'it' ? 'Prezzo max' : 'Max price',
    open24h: lang === 'it' ? 'Aperta 24h' : 'Open 24h',
    pool: lang === 'it' ? 'Con piscina' : 'With pool',
    sauna: lang === 'it' ? 'Con sauna' : 'With sauna',
    studentDiscount: lang === 'it' ? 'Sconto studenti' : 'Student discount',
    reset: lang === 'it' ? 'Reset filtri' : 'Reset filters'
  };

  return (
    <div className="space-y-4 p-4 bg-card rounded-lg border">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder={t.search}
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-10 pr-10"
        />
        {filters.search && (
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 p-0"
            onClick={() => updateFilter('search', '')}
          >
            <X className="w-4 h-4" />
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Chain Select */}
        <div className="space-y-2">
          <Label className="text-sm">{t.chain}</Label>
          <Select
            value={filters.chain}
            onValueChange={(value) => updateFilter('chain', value as GymChain | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.allChains} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allChains}</SelectItem>
              {Object.entries(chainLabels).map(([key, labels]) => (
                <SelectItem key={key} value={key}>
                  {labels[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Category Select */}
        <div className="space-y-2">
          <Label className="text-sm">{t.category}</Label>
          <Select
            value={filters.category}
            onValueChange={(value) => updateFilter('category', value as GymCategory | 'all')}
          >
            <SelectTrigger>
              <SelectValue placeholder={t.allCategories} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allCategories}</SelectItem>
              {Object.entries(categoryLabels).map(([key, labels]) => (
                <SelectItem key={key} value={key}>
                  {labels[lang]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Max Price Slider */}
        <div className="space-y-2 sm:col-span-2 lg:col-span-2">
          <div className="flex items-center justify-between">
            <Label className="text-sm">{t.maxPrice}</Label>
            <span className="text-sm font-medium">
              €{filters.maxPrice === 200 ? '200+' : filters.maxPrice}
            </span>
          </div>
          <Slider
            value={[filters.maxPrice]}
            onValueChange={([value]) => updateFilter('maxPrice', value)}
            min={15}
            max={200}
            step={5}
            className="mt-2"
          />
        </div>
      </div>

      {/* Toggle Filters */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="flex items-center justify-between space-x-2 p-2 rounded-md bg-muted/50">
          <Label htmlFor="open24h" className="text-sm cursor-pointer">
            {t.open24h}
          </Label>
          <Switch
            id="open24h"
            checked={filters.open24h}
            onCheckedChange={(checked) => updateFilter('open24h', checked)}
          />
        </div>

        <div className="flex items-center justify-between space-x-2 p-2 rounded-md bg-muted/50">
          <Label htmlFor="hasPool" className="text-sm cursor-pointer">
            {t.pool}
          </Label>
          <Switch
            id="hasPool"
            checked={filters.hasPool}
            onCheckedChange={(checked) => updateFilter('hasPool', checked)}
          />
        </div>

        <div className="flex items-center justify-between space-x-2 p-2 rounded-md bg-muted/50">
          <Label htmlFor="hasSauna" className="text-sm cursor-pointer">
            {t.sauna}
          </Label>
          <Switch
            id="hasSauna"
            checked={filters.hasSauna}
            onCheckedChange={(checked) => updateFilter('hasSauna', checked)}
          />
        </div>

        <div className="flex items-center justify-between space-x-2 p-2 rounded-md bg-muted/50">
          <Label htmlFor="studentDiscount" className="text-sm cursor-pointer">
            {t.studentDiscount}
          </Label>
          <Switch
            id="studentDiscount"
            checked={filters.studentDiscount}
            onCheckedChange={(checked) => updateFilter('studentDiscount', checked)}
          />
        </div>
      </div>

      {/* Reset Button */}
      {hasActiveFilters && (
        <Button
          variant="outline"
          size="sm"
          onClick={resetFilters}
          className="w-full sm:w-auto"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          {t.reset}
        </Button>
      )}
    </div>
  );
};

export default GymFilters;
