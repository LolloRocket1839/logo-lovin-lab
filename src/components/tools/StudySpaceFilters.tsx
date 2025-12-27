import { 
  Filter, 
  X,
  VolumeX,
  Clock,
  Accessibility,
  MapPin
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { 
  DetailedStudySpaceCategory, 
  SilenceLevel,
  getCategoryLabel,
  getAllDistricts,
  getAllCategories
} from '@/data/detailedStudySpaces';

export interface StudySpaceFiltersState {
  search: string;
  category: DetailedStudySpaceCategory | 'all';
  district: string | 'all';
  silenceLevel: SilenceLevel | 'all';
  access24h: boolean;
  disabledAccess: boolean;
}

interface StudySpaceFiltersProps {
  filters: StudySpaceFiltersState;
  onFiltersChange: (filters: StudySpaceFiltersState) => void;
  lang: 'it' | 'en';
  totalResults: number;
}

export const StudySpaceFilters = ({ 
  filters, 
  onFiltersChange, 
  lang,
  totalResults 
}: StudySpaceFiltersProps) => {
  const categories = getAllCategories();
  const districts = getAllDistricts();
  
  const hasActiveFilters = 
    filters.search !== '' ||
    filters.category !== 'all' ||
    filters.district !== 'all' ||
    filters.silenceLevel !== 'all' ||
    filters.access24h ||
    filters.disabledAccess;

  const resetFilters = () => {
    onFiltersChange({
      search: '',
      category: 'all',
      district: 'all',
      silenceLevel: 'all',
      access24h: false,
      disabledAccess: false
    });
  };

  const updateFilter = <K extends keyof StudySpaceFiltersState>(
    key: K, 
    value: StudySpaceFiltersState[K]
  ) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const silenceLevels: { value: SilenceLevel | 'all'; label: { it: string; en: string } }[] = [
    { value: 'all', label: { it: 'Tutti i livelli', en: 'All levels' } },
    { value: 'assoluto', label: { it: 'Silenzio assoluto', en: 'Complete silence' } },
    { value: 'moderato', label: { it: 'Silenzio moderato', en: 'Moderate silence' } },
    { value: 'informale', label: { it: 'Ambiente informale', en: 'Informal' } }
  ];

  return (
    <div className="space-y-4 p-4 bg-card border rounded-xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-primary" />
          <h3 className="font-semibold">
            {lang === 'it' ? 'Filtra spazi' : 'Filter spaces'}
          </h3>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={resetFilters} className="gap-1 text-muted-foreground">
            <X className="w-4 h-4" />
            {lang === 'it' ? 'Reset' : 'Clear'}
          </Button>
        )}
      </div>
      
      {/* Search */}
      <div className="relative">
        <Input
          type="text"
          placeholder={lang === 'it' ? 'Cerca per nome o indirizzo...' : 'Search by name or address...'}
          value={filters.search}
          onChange={(e) => updateFilter('search', e.target.value)}
          className="pl-4"
        />
      </div>
      
      {/* Selects Row */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {/* Category */}
        <Select 
          value={filters.category} 
          onValueChange={(v) => updateFilter('category', v as DetailedStudySpaceCategory | 'all')}
        >
          <SelectTrigger>
            <SelectValue placeholder={lang === 'it' ? 'Categoria' : 'Category'} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {lang === 'it' ? 'Tutte le categorie' : 'All categories'}
            </SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {getCategoryLabel(cat, lang)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* District */}
        <Select 
          value={filters.district} 
          onValueChange={(v) => updateFilter('district', v)}
        >
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              <SelectValue placeholder={lang === 'it' ? 'Zona' : 'Zone'} />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {lang === 'it' ? 'Tutte le zone' : 'All zones'}
            </SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        
        {/* Silence Level */}
        <Select 
          value={filters.silenceLevel} 
          onValueChange={(v) => updateFilter('silenceLevel', v as SilenceLevel | 'all')}
        >
          <SelectTrigger>
            <div className="flex items-center gap-2">
              <VolumeX className="w-4 h-4" />
              <SelectValue placeholder={lang === 'it' ? 'Silenzio' : 'Silence'} />
            </div>
          </SelectTrigger>
          <SelectContent>
            {silenceLevels.map((level) => (
              <SelectItem key={level.value} value={level.value}>
                {level.label[lang]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {/* Toggles */}
      <div className="flex flex-wrap gap-4 pt-2">
        <div className="flex items-center space-x-2">
          <Switch
            id="access24h"
            checked={filters.access24h}
            onCheckedChange={(v) => updateFilter('access24h', v)}
          />
          <Label htmlFor="access24h" className="flex items-center gap-1 cursor-pointer">
            <Clock className="w-4 h-4" />
            <span className="text-sm">24/7</span>
          </Label>
        </div>
        
        <div className="flex items-center space-x-2">
          <Switch
            id="disabledAccess"
            checked={filters.disabledAccess}
            onCheckedChange={(v) => updateFilter('disabledAccess', v)}
          />
          <Label htmlFor="disabledAccess" className="flex items-center gap-1 cursor-pointer">
            <Accessibility className="w-4 h-4" />
            <span className="text-sm">{lang === 'it' ? 'Accessibile' : 'Accessible'}</span>
          </Label>
        </div>
      </div>
      
      {/* Results Count */}
      <div className="pt-2 border-t">
        <Badge variant="secondary">
          {totalResults} {lang === 'it' 
            ? (totalResults === 1 ? 'spazio trovato' : 'spazi trovati')
            : (totalResults === 1 ? 'space found' : 'spaces found')
          }
        </Badge>
      </div>
    </div>
  );
};
