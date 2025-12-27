import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  MapPin, 
  Phone, 
  Clock, 
  Wifi, 
  WifiOff,
  Accessibility,
  Star,
  ExternalLink,
  Utensils
} from 'lucide-react';
import { CheapEatLocation, categoryLabels, categoryColors } from '@/data/cheapEatsDirectory';

interface CheapEatCardProps {
  location: CheapEatLocation;
  lang: 'it' | 'en';
  onMapClick?: (location: CheapEatLocation) => void;
}

const CheapEatCard: React.FC<CheapEatCardProps> = ({ location, lang, onMapClick }) => {
  const categoryLabel = categoryLabels[location.category]?.[lang] || location.category;
  const categoryColor = categoryColors[location.category] || '#666';

  const content = {
    it: {
      typicalDish: 'Piatto tipico',
      avgPrice: 'Prezzo medio',
      hours: 'Orari',
      portions: 'Porzioni',
      viewOnMap: 'Mappa',
      call: 'Chiama',
      website: 'Sito',
      closed: 'Chiuso',
      vegetarian: 'Vegetariano',
      partialVeg: 'Opzioni veg',
    },
    en: {
      typicalDish: 'Typical dish',
      avgPrice: 'Avg. price',
      hours: 'Hours',
      portions: 'Portions',
      viewOnMap: 'Map',
      call: 'Call',
      website: 'Website',
      closed: 'Closed',
      vegetarian: 'Vegetarian',
      partialVeg: 'Veg options',
    },
  };

  const t = content[lang];

  // Get today's hours
  const days = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'] as const;
  const today = days[new Date().getDay()];
  const todayHours = location.hours[today];

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 overflow-hidden">
      <CardContent className="p-4 sm:p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge 
                variant="secondary" 
                className="text-xs font-medium shrink-0"
                style={{ 
                  backgroundColor: `${categoryColor}20`,
                  color: categoryColor,
                  borderColor: categoryColor,
                }}
              >
                {categoryLabel}
              </Badge>
              {location.featured && (
                <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 shrink-0" />
              )}
            </div>
            <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors line-clamp-1">
              {location.name}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <div className="text-lg font-bold text-primary">{location.priceRange}</div>
            {location.rating && (
              <div className="text-xs text-muted-foreground flex items-center gap-1 justify-end">
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                {location.rating}/10
              </div>
            )}
          </div>
        </div>

        {/* Location & District */}
        <div className="flex items-start gap-2 text-sm text-muted-foreground mb-3">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="line-clamp-2">
            <span className="font-medium">{location.district}</span>
            {location.address !== 'Centro, Torino' && location.address !== 'Multiple sedi Torino' && (
              <span className="block text-xs">{location.address}</span>
            )}
          </div>
        </div>

        {/* Typical Dish */}
        <div className="flex items-start gap-2 mb-3">
          <Utensils className="w-4 h-4 shrink-0 mt-0.5 text-primary" />
          <div>
            <span className="text-xs text-muted-foreground">{t.typicalDish}:</span>
            <p className="text-sm font-medium line-clamp-1">{location.typicalDish}</p>
            <span className="text-xs text-primary font-semibold">{location.dishPrice}</span>
          </div>
        </div>

        {/* Today's Hours */}
        <div className="flex items-center gap-2 mb-3 text-sm">
          <Clock className="w-4 h-4 shrink-0 text-muted-foreground" />
          <span className="text-muted-foreground">{t.hours}:</span>
          <span className={`font-medium ${todayHours === 'Chiuso' ? 'text-destructive' : 'text-foreground'}`}>
            {todayHours === 'Chiuso' ? t.closed : todayHours}
          </span>
        </div>

        {/* Features Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {location.vegetarian === 'yes' && (
            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-700 border-green-500/30">
              🥗 {t.vegetarian}
            </Badge>
          )}
          {location.vegetarian === 'partial' && (
            <Badge variant="outline" className="text-xs bg-green-500/10 text-green-600 border-green-500/20">
              🥗 {t.partialVeg}
            </Badge>
          )}
          {location.wifi ? (
            <Badge variant="outline" className="text-xs">
              <Wifi className="w-3 h-3 mr-1" /> WiFi
            </Badge>
          ) : null}
          {location.disabledAccess === 'yes' && (
            <Badge variant="outline" className="text-xs">
              <Accessibility className="w-3 h-3 mr-1" />
            </Badge>
          )}
          <Badge variant="outline" className="text-xs">
            {t.portions}: {location.portions}
          </Badge>
        </div>

        {/* Notes */}
        {location.notes && (
          <p className="text-xs text-muted-foreground mb-4 line-clamp-2 italic">
            "{location.notes}"
          </p>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-border/50">
          {onMapClick && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              onClick={() => onMapClick(location)}
            >
              <MapPin className="w-3 h-3 mr-1" />
              {t.viewOnMap}
            </Button>
          )}
          {location.phone && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              asChild
            >
              <a href={`tel:${location.phone}`}>
                <Phone className="w-3 h-3 mr-1" />
                {t.call}
              </a>
            </Button>
          )}
          {location.website && (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-xs"
              asChild
            >
              <a href={location.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3 mr-1" />
                {t.website}
              </a>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CheapEatCard;
