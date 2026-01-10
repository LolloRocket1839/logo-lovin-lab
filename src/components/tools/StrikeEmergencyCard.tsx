import { Phone, ExternalLink, Apple, Download, Clock, Euro } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { EmergencyContact, TaxiService, CarSharingService, AlternativeService } from '@/data/strikeEmergencyDirectory';

interface StrikeEmergencyCardProps {
  contact?: EmergencyContact;
  taxi?: TaxiService;
  carSharing?: CarSharingService;
  alternative?: AlternativeService;
  compact?: boolean;
}

export const StrikeEmergencyCard = ({ contact, taxi, carSharing, alternative, compact = false }: StrikeEmergencyCardProps) => {
  // Render Railway/Urban Contact
  if (contact) {
    return (
      <Card className={`${compact ? 'p-3' : 'p-4'} hover:shadow-md transition-shadow`}>
        <CardContent className="p-0 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{contact.name}</h3>
              {contact.description && (
                <p className="text-sm text-muted-foreground">{contact.description}</p>
              )}
            </div>
            <Badge variant={contact.cost === 'free' ? 'default' : 'secondary'} className="shrink-0">
              {contact.cost === 'free' ? 'Gratis' : contact.cost === 'paid' ? 'A pagamento' : 'Std'}
            </Badge>
          </div>

          <a 
            href={`tel:${contact.number.replace(/\s/g, '')}`}
            className="flex items-center gap-2 text-lg font-bold text-primary hover:underline"
          >
            <Phone className="h-5 w-5" />
            {contact.number}
          </a>

          <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
            {contact.hours && (
              <span className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {contact.hours}
              </span>
            )}
            {contact.costDetail && (
              <span className="flex items-center gap-1">
                <Euro className="h-3 w-3" />
                {contact.costDetail}
              </span>
            )}
          </div>

          {(contact.appIos || contact.appAndroid || contact.website) && (
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              {contact.appIos && (
                <Button variant="outline" size="sm" asChild>
                  <a href={contact.appIos} target="_blank" rel="noopener noreferrer">
                    <Apple className="h-4 w-4 mr-1" />
                    iOS
                  </a>
                </Button>
              )}
              {contact.appAndroid && (
                <Button variant="outline" size="sm" asChild>
                  <a href={contact.appAndroid} target="_blank" rel="noopener noreferrer">
                    <Download className="h-4 w-4 mr-1" />
                    Android
                  </a>
                </Button>
              )}
              {contact.refundUrl && (
                <Button variant="secondary" size="sm" asChild>
                  <a href={contact.refundUrl} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Rimborsi
                  </a>
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  // Render Taxi Service
  if (taxi) {
    return (
      <Card className="p-4 hover:shadow-md transition-shadow">
        <CardContent className="p-0 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{taxi.name}</h3>
              <p className="text-sm text-muted-foreground">{taxi.city}</p>
            </div>
          </div>

          {taxi.number && (
            <a 
              href={`tel:${taxi.number.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-lg font-bold text-primary hover:underline"
            >
              <Phone className="h-5 w-5" />
              {taxi.number}
            </a>
          )}

          <div className="flex flex-wrap gap-2 pt-2 border-t">
            {taxi.appIos && (
              <Button variant="outline" size="sm" asChild>
                <a href={taxi.appIos} target="_blank" rel="noopener noreferrer">
                  <Apple className="h-4 w-4 mr-1" />
                  iOS
                </a>
              </Button>
            )}
            {taxi.appAndroid && (
              <Button variant="outline" size="sm" asChild>
                <a href={taxi.appAndroid} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-1" />
                  Android
                </a>
              </Button>
            )}
            {taxi.website && (
              <Button variant="ghost" size="sm" asChild>
                <a href={taxi.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render Car Sharing
  if (carSharing) {
    return (
      <Card className="p-4 hover:shadow-md transition-shadow">
        <CardContent className="p-0 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{carSharing.name}</h3>
              <p className="text-sm text-muted-foreground">
                {carSharing.cities.slice(0, 3).join(', ')}
                {carSharing.cities.length > 3 && ` +${carSharing.cities.length - 3}`}
              </p>
            </div>
            <Badge variant="outline">{carSharing.pricePerMinute}/min</Badge>
          </div>

          {carSharing.emergencyNumber && (
            <a 
              href={`tel:${carSharing.emergencyNumber.replace(/\s/g, '')}`}
              className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              <Phone className="h-4 w-4" />
              {carSharing.emergencyNumber}
            </a>
          )}

          <div className="flex flex-wrap gap-2 pt-2 border-t">
            <Button variant="outline" size="sm" asChild>
              <a href={carSharing.appIos} target="_blank" rel="noopener noreferrer">
                <Apple className="h-4 w-4 mr-1" />
                iOS
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={carSharing.appAndroid} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4 mr-1" />
                Android
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href={carSharing.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Render Alternative Service
  if (alternative) {
    return (
      <Card className="p-4 hover:shadow-md transition-shadow">
        <CardContent className="p-0 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-semibold text-foreground">{alternative.name}</h3>
              <p className="text-sm text-muted-foreground">{alternative.coverage}</p>
            </div>
            {alternative.priceFrom && (
              <Badge variant="secondary">da {alternative.priceFrom}</Badge>
            )}
          </div>

          <div className="flex flex-wrap gap-2 pt-2 border-t">
            {alternative.appIos && (
              <Button variant="outline" size="sm" asChild>
                <a href={alternative.appIos} target="_blank" rel="noopener noreferrer">
                  <Apple className="h-4 w-4 mr-1" />
                  iOS
                </a>
              </Button>
            )}
            {alternative.appAndroid && (
              <Button variant="outline" size="sm" asChild>
                <a href={alternative.appAndroid} target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-1" />
                  Android
              </a>
              </Button>
            )}
            <Button variant="default" size="sm" asChild>
              <a href={alternative.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-1" />
                Prenota
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};
