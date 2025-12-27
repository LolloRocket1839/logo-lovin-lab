import { useTranslation } from 'react-i18next';
import { Search, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Institution, 
  ServiceCategory, 
  categoryLabels, 
  institutionLabels,
  getDistrictOptions 
} from '@/data/studentServicesDirectory';

export interface ServiceFilters {
  search: string;
  institution: Institution | 'all';
  category: ServiceCategory | 'all';
  district: string;
  booking: 'all' | 'no' | 'consigliato' | 'obbligatorio';
}

interface StudentServiceFiltersProps {
  filters: ServiceFilters;
  onFiltersChange: (filters: ServiceFilters) => void;
}

export const StudentServiceFilters = ({ filters, onFiltersChange }: StudentServiceFiltersProps) => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const labels = {
    it: {
      search: 'Cerca servizio...',
      institution: 'Istituzione',
      category: 'Categoria',
      district: 'Zona',
      booking: 'Prenotazione',
      all: 'Tutti',
      clearFilters: 'Pulisci filtri',
      bookingOptions: {
        all: 'Tutti',
        no: 'Senza prenotazione',
        consigliato: 'Consigliata',
        obbligatorio: 'Obbligatoria'
      }
    },
    en: {
      search: 'Search service...',
      institution: 'Institution',
      category: 'Category',
      district: 'District',
      booking: 'Booking',
      all: 'All',
      clearFilters: 'Clear filters',
      bookingOptions: {
        all: 'All',
        no: 'No booking',
        consigliato: 'Recommended',
        obbligatorio: 'Required'
      }
    }
  };

  const t = labels[currentLang];

  const districts = getDistrictOptions();

  const hasActiveFilters = 
    filters.search !== '' || 
    filters.institution !== 'all' || 
    filters.category !== 'all' ||
    filters.district !== '' ||
    filters.booking !== 'all';

  const clearFilters = () => {
    onFiltersChange({
      search: '',
      institution: 'all',
      category: 'all',
      district: '',
      booking: 'all'
    });
  };

  return (
    <div className="space-y-4 p-4 bg-muted/30 rounded-lg">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Institution */}
        <Select
          value={filters.institution}
          onValueChange={(value) => onFiltersChange({ ...filters, institution: value as Institution | 'all' })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t.institution} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            {Object.entries(institutionLabels).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value[currentLang]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Category */}
        <Select
          value={filters.category}
          onValueChange={(value) => onFiltersChange({ ...filters, category: value as ServiceCategory | 'all' })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t.category} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            {Object.entries(categoryLabels).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value[currentLang]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* District */}
        <Select
          value={filters.district || 'all'}
          onValueChange={(value) => onFiltersChange({ ...filters, district: value === 'all' ? '' : value })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t.district} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.all}</SelectItem>
            {districts.map((district) => (
              <SelectItem key={district} value={district}>
                {district}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Booking */}
        <Select
          value={filters.booking}
          onValueChange={(value) => onFiltersChange({ ...filters, booking: value as ServiceFilters['booking'] })}
        >
          <SelectTrigger>
            <SelectValue placeholder={t.booking} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">{t.bookingOptions.all}</SelectItem>
            <SelectItem value="no">{t.bookingOptions.no}</SelectItem>
            <SelectItem value="consigliato">{t.bookingOptions.consigliato}</SelectItem>
            <SelectItem value="obbligatorio">{t.bookingOptions.obbligatorio}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
          <X className="w-4 h-4 mr-1" />
          {t.clearFilters}
        </Button>
      )}
    </div>
  );
};
