import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  Clock, 
  MapPin, 
  Star, 
  Waves, 
  Dumbbell, 
  ChevronDown, 
  ExternalLink, 
  Phone, 
  Mail,
  GraduationCap,
  Sparkles
} from 'lucide-react';
import { Gym, chainLabels, tierLabels } from '@/data/gymsDirectory';

interface GymCardProps {
  gym: Gym;
  lang: 'it' | 'en';
  onClick?: () => void;
}

const GymCard: React.FC<GymCardProps> = ({ gym, lang, onClick }) => {
  const [isOpen, setIsOpen] = React.useState(false);

  const tierInfo = tierLabels[gym.tier];
  const chainLabel = chainLabels[gym.chain][lang];

  const formatPrice = (price: number) => `€${price.toFixed(2).replace('.', ',')}`;

  return (
    <Card 
      className="h-full hover:shadow-lg transition-shadow cursor-pointer group"
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <Badge variant="outline" className="text-xs">
                {chainLabel}
              </Badge>
              <Badge className={`${tierInfo.color} text-white text-xs`}>
                {tierInfo[lang]}
              </Badge>
              {gym.featured && (
                <Badge variant="secondary" className="text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  {lang === 'it' ? 'Consigliata' : 'Recommended'}
                </Badge>
              )}
            </div>
            <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
              {gym.name}
            </CardTitle>
          </div>
          <div className="flex items-center gap-1 text-amber-500 shrink-0">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm font-medium">{gym.rating}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Address */}
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{gym.address}</span>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              {lang === 'it' ? 'Prezzo standard' : 'Standard price'}
            </span>
            <span className={`font-semibold ${gym.priceStudent ? 'line-through text-muted-foreground' : 'text-foreground'}`}>
              {formatPrice(gym.priceStandard)}/mese
            </span>
          </div>
          {gym.priceStudent && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1 text-sm text-green-600 dark:text-green-400">
                <GraduationCap className="w-4 h-4" />
                <span>{lang === 'it' ? 'Studenti' : 'Students'}</span>
              </div>
              <span className="font-bold text-green-600 dark:text-green-400">
                {formatPrice(gym.priceStudent)}/mese
              </span>
            </div>
          )}
          {gym.studentDiscount && (
            <p className="text-xs text-green-600 dark:text-green-400">
              {gym.studentDiscount}
            </p>
          )}
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-2">
          {gym.open24h && (
            <Badge variant="outline" className="text-xs">
              <Clock className="w-3 h-3 mr-1" />
              24h
            </Badge>
          )}
          {gym.hasPool && (
            <Badge variant="outline" className="text-xs text-blue-600 border-blue-300">
              <Waves className="w-3 h-3 mr-1" />
              {lang === 'it' ? 'Piscina' : 'Pool'}
            </Badge>
          )}
          {gym.hasSauna && (
            <Badge variant="outline" className="text-xs text-orange-600 border-orange-300">
              {lang === 'it' ? 'Sauna' : 'Sauna'}
            </Badge>
          )}
          {gym.hasClasses && (
            <Badge variant="outline" className="text-xs">
              <Dumbbell className="w-3 h-3 mr-1" />
              {lang === 'it' ? 'Corsi' : 'Classes'}
            </Badge>
          )}
        </div>

        {/* Hours */}
        <div className="text-xs text-muted-foreground space-y-0.5">
          <div className="flex justify-between">
            <span>{lang === 'it' ? 'Lun-Ven:' : 'Mon-Fri:'}</span>
            <span>{gym.hours.weekday}</span>
          </div>
          <div className="flex justify-between">
            <span>{lang === 'it' ? 'Sab-Dom:' : 'Sat-Sun:'}</span>
            <span>{gym.hours.weekend}</span>
          </div>
        </div>

        {/* Distance from university */}
        {gym.distanceFromUni && (
          <div className="text-xs bg-muted/50 rounded-md p-2">
            <span className="text-muted-foreground">
              {lang === 'it' ? 'Distanza università: ' : 'Distance to university: '}
            </span>
            <span className="font-medium">{gym.distanceFromUni}</span>
          </div>
        )}

        {/* Pros/Cons Collapsible */}
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger asChild>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-between px-0"
              onClick={(e) => e.stopPropagation()}
            >
              <span className="text-sm">
                {lang === 'it' ? 'Pro & Contro' : 'Pros & Cons'}
              </span>
              <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-3 pt-2">
            <div>
              <p className="text-xs font-medium text-green-600 mb-1">
                {lang === 'it' ? 'Pro:' : 'Pros:'}
              </p>
              <ul className="text-xs text-muted-foreground space-y-0.5">
                {gym.pros[lang].map((pro, i) => (
                  <li key={i}>• {pro}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-red-600 mb-1">
                {lang === 'it' ? 'Contro:' : 'Cons:'}
              </p>
              <ul className="text-xs text-muted-foreground space-y-0.5">
                {gym.cons[lang].map((con, i) => (
                  <li key={i}>• {con}</li>
                ))}
              </ul>
            </div>
            <div className="text-xs">
              <span className="font-medium">
                {lang === 'it' ? 'Ideale per: ' : 'Ideal for: '}
              </span>
              <span className="text-muted-foreground">{gym.idealFor[lang]}</span>
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* CTA Buttons */}
        <div className="flex gap-2 pt-2">
          {gym.website && (
            <Button 
              variant="default" 
              size="sm" 
              className="flex-1"
              onClick={(e) => {
                e.stopPropagation();
                window.open(gym.website, '_blank');
              }}
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              {lang === 'it' ? 'Sito web' : 'Website'}
            </Button>
          )}
          {gym.phone && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `tel:${gym.phone}`;
              }}
            >
              <Phone className="w-3 h-3" />
            </Button>
          )}
          {gym.email && (
            <Button 
              variant="outline" 
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                window.location.href = `mailto:${gym.email}`;
              }}
            >
              <Mail className="w-3 h-3" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default GymCard;
