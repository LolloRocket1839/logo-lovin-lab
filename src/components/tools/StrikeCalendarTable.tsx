import { format, parseISO, isToday, isTomorrow, isPast } from 'date-fns';
import { it } from 'date-fns/locale';
import { AlertTriangle, Calendar, Clock, MapPin, Train } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { StrikeEvent } from '@/data/strikeEmergencyDirectory';

interface StrikeCalendarTableProps {
  strikes: StrikeEvent[];
  compact?: boolean;
}

export const StrikeCalendarTable = ({ strikes, compact = false }: StrikeCalendarTableProps) => {
  const getSeverityBadge = (severity: StrikeEvent['severity']) => {
    switch (severity) {
      case 'national':
        return <Badge variant="destructive">🚨 Nazionale</Badge>;
      case 'regional':
        return <Badge variant="secondary">Regionale</Badge>;
      case 'local':
        return <Badge variant="outline">Locale</Badge>;
    }
  };

  const getDateLabel = (dateStr: string, dateEnd?: string) => {
    const date = parseISO(dateStr);
    
    let label = '';
    if (isToday(date)) {
      label = '⚡ OGGI';
    } else if (isTomorrow(date)) {
      label = '⏰ DOMANI';
    } else if (isPast(date)) {
      label = 'Passato';
    }

    const formattedDate = format(date, 'd MMMM', { locale: it });
    const endFormatted = dateEnd ? ` - ${format(parseISO(dateEnd), 'd MMM', { locale: it })}` : '';
    
    return (
      <div className="flex flex-col">
        <span className="font-semibold">{formattedDate}{endFormatted}</span>
        {label && (
          <span className={`text-xs ${label.includes('OGGI') ? 'text-destructive font-bold' : label.includes('DOMANI') ? 'text-amber-600 font-medium' : 'text-muted-foreground'}`}>
            {label}
          </span>
        )}
      </div>
    );
  };

  if (compact) {
    return (
      <div className="space-y-3">
        {strikes.map((strike, idx) => (
          <div 
            key={idx} 
            className={`p-3 rounded-lg border ${
              strike.severity === 'national' ? 'border-destructive bg-destructive/5' : 'border-border'
            }`}
          >
            <div className="flex items-start justify-between mb-2">
              {getDateLabel(strike.date, strike.dateEnd)}
              {getSeverityBadge(strike.severity)}
            </div>
            <div className="text-sm space-y-1">
              <p className="flex items-center gap-1 text-muted-foreground">
                <Train className="h-3 w-3" />
                {strike.companies.slice(0, 3).join(', ')}
                {strike.companies.length > 3 && ` +${strike.companies.length - 3}`}
              </p>
              <p className="flex items-center gap-1 text-muted-foreground">
                <Clock className="h-3 w-3" />
                {strike.duration}
              </p>
              {strike.guaranteedTimes && (
                <p className="text-xs text-green-600 font-medium">
                  ✓ Fasce garantite: {strike.guaranteedTimes}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="w-[120px]">
              <Calendar className="h-4 w-4 inline mr-1" />
              Data
            </TableHead>
            <TableHead>
              <MapPin className="h-4 w-4 inline mr-1" />
              Regioni
            </TableHead>
            <TableHead>
              <Train className="h-4 w-4 inline mr-1" />
              Compagnie
            </TableHead>
            <TableHead>
              <Clock className="h-4 w-4 inline mr-1" />
              Durata
            </TableHead>
            <TableHead className="text-right">Livello</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {strikes.map((strike, idx) => {
            const isPastStrike = isPast(parseISO(strike.date));
            
            return (
              <TableRow 
                key={idx}
                className={`
                  ${strike.severity === 'national' ? 'bg-destructive/5 hover:bg-destructive/10' : ''}
                  ${isPastStrike ? 'opacity-50' : ''}
                `}
              >
                <TableCell>
                  {getDateLabel(strike.date, strike.dateEnd)}
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {strike.regions.join(', ')}
                  </span>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {strike.companies.slice(0, 3).join(', ')}
                    {strike.companies.length > 3 && (
                      <span className="text-muted-foreground"> +{strike.companies.length - 3}</span>
                    )}
                  </div>
                  {strike.notes && (
                    <p className="text-xs text-muted-foreground mt-1">{strike.notes}</p>
                  )}
                </TableCell>
                <TableCell>
                  <div className="text-sm">{strike.duration}</div>
                  {strike.guaranteedTimes && (
                    <div className="text-xs text-green-600 mt-1">
                      ✓ {strike.guaranteedTimes}
                    </div>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  {getSeverityBadge(strike.severity)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
