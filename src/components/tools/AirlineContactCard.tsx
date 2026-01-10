import { Plane, Phone, Mail, ExternalLink, Apple, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { AirlineContact, AirportContact } from '@/data/strikeEmergencyDirectory';

interface AirlineContactCardProps {
  airline?: AirlineContact;
  airport?: AirportContact;
}

export const AirlineContactCard = ({ airline, airport }: AirlineContactCardProps) => {
  if (airline) {
    return (
      <Card className="hover:shadow-md transition-shadow">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-2">
              <Plane className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">{airline.name}</h3>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <a 
              href={`tel:${airline.numberItaly.replace(/\s/g, '')}`} 
              className="flex items-center gap-2 text-lg font-bold text-primary hover:underline"
            >
              <Phone className="h-4 w-4" />
              {airline.numberItaly}
            </a>
            
            {airline.email && (
              <a 
                href={`mailto:${airline.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {airline.email}
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {airline.website && (
              <Button variant="outline" size="sm" asChild>
                <a href={airline.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-1" />
                  Sito
                </a>
              </Button>
            )}
            {airline.appIos && (
              <Button variant="outline" size="sm" asChild>
                <a href={airline.appIos} target="_blank" rel="noopener noreferrer">
                  <Apple className="h-4 w-4 mr-1" />
                  iOS
                </a>
              </Button>
            )}
            {airline.appAndroid && (
              <Button variant="outline" size="sm" asChild>
                <a href={airline.appAndroid} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-1" />
                  Android
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (airport) {
    return (
      <Card className="hover:shadow-md transition-shadow border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-semibold">{airport.name}</h3>
              <p className="text-sm text-muted-foreground">{airport.city}</p>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <a 
              href={`tel:${airport.number.replace(/\s/g, '')}`} 
              className="flex items-center gap-2 text-lg font-bold text-primary hover:underline"
            >
              <Phone className="h-4 w-4" />
              {airport.number}
            </a>
            
            {airport.email && (
              <a 
                href={`mailto:${airport.email}`}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
              >
                <Mail className="h-4 w-4" />
                {airport.email}
              </a>
            )}
          </div>

          <Button variant="outline" size="sm" asChild className="w-full">
            <a href={airport.website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 mr-2" />
              Sito ufficiale
            </a>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};
