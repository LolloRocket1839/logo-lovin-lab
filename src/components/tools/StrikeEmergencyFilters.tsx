import { Train, Bus, Car, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export type CategoryFilter = 'all' | 'railway' | 'urban' | 'taxi' | 'carsharing' | 'bus' | 'alternative' | 'airline';
export type CityFilter = 'all' | 'Roma' | 'Milano' | 'Torino' | 'Napoli';

interface StrikeEmergencyFiltersProps {
  selectedCategory: CategoryFilter;
  selectedCity: CityFilter;
  onCategoryChange: (category: CategoryFilter) => void;
  onCityChange: (city: CityFilter) => void;
  availableCities?: string[];
}

const categoryOptions: { value: CategoryFilter; label: string; icon: React.ReactNode }[] = [
  { value: 'all', label: 'Tutti', icon: null },
  { value: 'railway', label: 'Treni', icon: <Train className="h-4 w-4" /> },
  { value: 'airline', label: 'Aerei', icon: <Bus className="h-4 w-4" /> },
  { value: 'urban', label: 'Urbano', icon: <Bus className="h-4 w-4" /> },
  { value: 'taxi', label: 'Taxi', icon: <Car className="h-4 w-4" /> },
  { value: 'carsharing', label: 'Car Sharing', icon: <Car className="h-4 w-4" /> },
  { value: 'alternative', label: 'Bus/Altro', icon: <Bus className="h-4 w-4" /> },
];

const cityOptions: CityFilter[] = ['all', 'Roma', 'Milano', 'Torino', 'Napoli'];

export const StrikeEmergencyFilters = ({
  selectedCategory,
  selectedCity,
  onCategoryChange,
  onCityChange,
  availableCities = ['Roma', 'Milano', 'Torino']
}: StrikeEmergencyFiltersProps) => {
  return (
    <div className="space-y-4">
      {/* Category filters */}
      <div>
        <p className="text-sm font-medium text-muted-foreground mb-2">Categoria</p>
        <div className="flex flex-wrap gap-2">
          {categoryOptions.map(option => (
            <Button
              key={option.value}
              variant={selectedCategory === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => onCategoryChange(option.value)}
              className="gap-1"
            >
              {option.icon}
              {option.label}
            </Button>
          ))}
        </div>
      </div>

      {/* City filters - only show for relevant categories */}
      {['urban', 'taxi', 'carsharing', 'all'].includes(selectedCategory) && (
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <MapPin className="h-3 w-3" />
            Città
          </p>
          <div className="flex flex-wrap gap-2">
            {cityOptions.map(city => {
              const isAvailable = city === 'all' || availableCities.includes(city);
              return (
                <Button
                  key={city}
                  variant={selectedCity === city ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => onCityChange(city)}
                  disabled={!isAvailable}
                >
                  {city === 'all' ? 'Tutte' : city}
                </Button>
              );
            })}
          </div>
        </div>
      )}

      {/* Active filters display */}
      {(selectedCategory !== 'all' || selectedCity !== 'all') && (
        <div className="flex items-center gap-2 pt-2 border-t">
          <span className="text-sm text-muted-foreground">Filtri attivi:</span>
          {selectedCategory !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {categoryOptions.find(c => c.value === selectedCategory)?.label}
              <button 
                onClick={() => onCategoryChange('all')}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          {selectedCity !== 'all' && (
            <Badge variant="secondary" className="gap-1">
              {selectedCity}
              <button 
                onClick={() => onCityChange('all')}
                className="ml-1 hover:text-destructive"
              >
                ×
              </button>
            </Badge>
          )}
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => {
              onCategoryChange('all');
              onCityChange('all');
            }}
            className="text-xs"
          >
            Rimuovi tutti
          </Button>
        </div>
      )}
    </div>
  );
};
