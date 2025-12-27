import { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  ExternalLink, 
  Wifi, 
  VolumeX, 
  Volume2,
  Clock,
  Coffee,
  Accessibility,
  Plug,
  ChevronDown,
  ChevronUp,
  MessageCircle
} from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { 
  DetailedStudySpace, 
  getCategoryLabel, 
  getSilenceLabel, 
  getWifiLabel,
  getTodayHours,
  DailyHours
} from '@/data/detailedStudySpaces';

interface StudySpaceCardProps {
  space: DetailedStudySpace;
  lang: 'it' | 'en';
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'biblioteca':
      return '📚';
    case 'edisu':
      return '🎓';
    case 'caffetteria':
      return '☕';
    case 'coworking':
      return '💼';
    case 'spazi_polivalenti':
      return '🏛️';
    case 'spazi_alternativi':
      return '🌳';
    default:
      return '📍';
  }
};

const DayRow = ({ day, hours, isToday }: { day: string; hours: string; isToday: boolean }) => (
  <div className={`flex justify-between py-1 px-2 rounded ${isToday ? 'bg-primary/10 font-medium' : ''}`}>
    <span className="text-muted-foreground">{day}</span>
    <span className={hours === 'Chiuso' ? 'text-destructive' : 'text-foreground'}>
      {hours}
    </span>
  </div>
);

export const StudySpaceCard = ({ space, lang }: StudySpaceCardProps) => {
  const [hoursOpen, setHoursOpen] = useState(false);
  const todayHours = getTodayHours(space.hours);
  const dayOfWeek = new Date().getDay();
  
  const dayNames = lang === 'it' 
    ? ['Dom', 'Lun', 'Mar', 'Mer', 'Gio', 'Ven', 'Sab']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const fullDayNames = lang === 'it'
    ? ['Domenica', 'Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato']
    : ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  const hoursArray: { day: string; hours: string; isToday: boolean }[] = [
    { day: fullDayNames[1], hours: space.hours.monday, isToday: dayOfWeek === 1 },
    { day: fullDayNames[2], hours: space.hours.tuesday, isToday: dayOfWeek === 2 },
    { day: fullDayNames[3], hours: space.hours.wednesday, isToday: dayOfWeek === 3 },
    { day: fullDayNames[4], hours: space.hours.thursday, isToday: dayOfWeek === 4 },
    { day: fullDayNames[5], hours: space.hours.friday, isToday: dayOfWeek === 5 },
    { day: fullDayNames[6], hours: space.hours.saturday, isToday: dayOfWeek === 6 },
    { day: fullDayNames[0], hours: space.hours.sunday, isToday: dayOfWeek === 0 },
  ];

  const isOpenNow = todayHours !== 'Chiuso' && todayHours !== 'Occasionale';
  
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">{getCategoryIcon(space.category)}</span>
            <div>
              <h3 className="font-semibold text-lg leading-tight">{space.name}</h3>
              <Badge variant="secondary" className="mt-1 text-xs">
                {getCategoryLabel(space.category, lang)}
              </Badge>
            </div>
          </div>
          {space.features.access24h && (
            <Badge className="bg-primary/90 text-primary-foreground shrink-0">
              24/7
            </Badge>
          )}
        </div>
        
        {/* Address */}
        <div className="flex items-start gap-2 text-sm text-muted-foreground mt-2">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
          <span>{space.address}</span>
        </div>
        
        {/* Note (if exists) */}
        {space.note && (
          <p className="text-sm italic text-muted-foreground mt-1 pl-6">
            "{space.note}"
          </p>
        )}
        
        {/* District & Capacity Badges */}
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <Badge variant="outline">
            {space.district}
          </Badge>
          {space.capacity && (
            <Badge variant="secondary" className="gap-1">
              {space.capacity}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Today's Hours */}
        <div className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">
              {lang === 'it' ? 'Oggi' : 'Today'} ({dayNames[dayOfWeek]}):
            </span>
          </div>
          <span className={`text-sm font-semibold ${isOpenNow ? 'text-primary' : 'text-destructive'}`}>
            {todayHours}
          </span>
        </div>
        
        {/* Feature Badges */}
        <div className="flex flex-wrap gap-2">
          {/* Silence Level */}
          <Badge variant={space.features.silence === 'assoluto' ? 'default' : 'secondary'} className="gap-1">
            {space.features.silence === 'assoluto' ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
            {getSilenceLabel(space.features.silence, lang)}
          </Badge>
          
          {/* WiFi */}
          {space.features.wifi !== 'no' && (
            <Badge variant="outline" className="gap-1">
              <Wifi className="w-3 h-3" />
              {getWifiLabel(space.features.wifi, lang)}
            </Badge>
          )}
          
          {/* Power Outlets */}
          {space.features.powerOutlets !== 'no' && (
            <Badge variant="outline" className="gap-1">
              <Plug className="w-3 h-3" />
              {space.features.powerOutlets === 'numerose' 
                ? (lang === 'it' ? 'Molte prese' : 'Many outlets')
                : (lang === 'it' ? 'Alcune prese' : 'Some outlets')
              }
            </Badge>
          )}
          
          {/* Bar */}
          {space.features.hasBar && (
            <Badge variant="outline" className="gap-1">
              <Coffee className="w-3 h-3" />
              {space.features.barDescription || (lang === 'it' ? 'Bar' : 'Café')}
            </Badge>
          )}
          
          {/* Accessibility */}
          {space.features.disabledAccess !== 'no' && (
            <Badge variant="outline" className="gap-1">
              <Accessibility className="w-3 h-3" />
              {space.features.disabledAccess === 'totale' 
                ? (lang === 'it' ? 'Accessibile' : 'Accessible')
                : (lang === 'it' ? 'Parz. accessibile' : 'Partially accessible')
              }
            </Badge>
          )}
        </div>
        
        {/* Full Hours Collapsible */}
        <Collapsible open={hoursOpen} onOpenChange={setHoursOpen}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" size="sm" className="w-full justify-between">
              {lang === 'it' ? 'Tutti gli orari' : 'All hours'}
              {hoursOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-2 space-y-1 text-sm">
            {hoursArray.map(({ day, hours, isToday }) => (
              <DayRow key={day} day={day} hours={hours} isToday={isToday} />
            ))}
          </CollapsibleContent>
        </Collapsible>
        
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2 pt-2 border-t">
          {space.phone && (
            <Button variant="outline" size="sm" asChild className="gap-1">
              <a href={`tel:${space.phone}`}>
                <Phone className="w-3 h-3" />
                {lang === 'it' ? 'Chiama' : 'Call'}
              </a>
            </Button>
          )}
          
          {space.whatsapp && (
            <Button variant="outline" size="sm" asChild className="gap-1">
              <a href={`https://wa.me/${space.whatsapp.replace(/\s+/g, '').replace('+', '')}`} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-3 h-3" />
                WhatsApp
              </a>
            </Button>
          )}
          
          {space.email && (
            <Button variant="outline" size="sm" asChild className="gap-1">
              <a href={`mailto:${space.email}`}>
                <Mail className="w-3 h-3" />
                Email
              </a>
            </Button>
          )}
          
          {space.website && (
            <Button variant="outline" size="sm" asChild className="gap-1">
              <a href={space.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="w-3 h-3" />
                {lang === 'it' ? 'Sito' : 'Website'}
              </a>
            </Button>
          )}
          
          <Button variant="outline" size="sm" asChild className="gap-1 ml-auto">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(space.address)}`} 
              target="_blank" 
              rel="noopener noreferrer"
            >
              <MapPin className="w-3 h-3" />
              Maps
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
