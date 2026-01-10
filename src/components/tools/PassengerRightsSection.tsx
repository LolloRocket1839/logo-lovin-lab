import { Shield, CheckCircle, AlertCircle, FileText, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { passengerRights, officialLinks } from '@/data/strikeEmergencyDirectory';

export const PassengerRightsSection = () => {
  return (
    <div className="space-y-6">
      {/* Rights guaranteed */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-700 dark:text-green-400">
            <Shield className="h-5 w-5" />
            Diritti garantiti (Normativa UE)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3">
            {passengerRights.map((right, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">{right.right}</p>
                  <p className="text-sm text-muted-foreground">{right.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Exclusions */}
      <Card className="border-destructive/30 bg-destructive/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Esclusioni
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-destructive">✗</span>
              <span>NO risarcimento danni personali extra (solo tariffa biglietto)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">✗</span>
              <span>NO rimborso per scioperi non proclamati ufficialmente (verifica sempre MIT)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-destructive">✗</span>
              <span>NO rimborso taxi (trasporto privato non regolamentato)</span>
            </li>
          </ul>
        </CardContent>
      </Card>

      {/* How to document */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Come documentare per rimborso
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-2 text-sm">
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs">1</span>
              <span>Foto biglietto (digitale o cartaceo)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs">2</span>
              <span>Screenshot app con stato viaggio (cancellato/ritardato)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs">3</span>
              <span>Foto tabellone stazione/aeroporto con cancellazione</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs">4</span>
              <span>Email/SMS comunicazioni aziendali</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs">5</span>
              <span>Screenshot MIT calendario scioperi</span>
            </li>
          </ol>
          
          <div className="mt-4 pt-4 border-t">
            <p className="text-sm text-muted-foreground mb-3">
              <strong>Ricorsi:</strong> Se la compagnia nega il rimborso, puoi inviare raccomandata A.R. con tutta la documentazione o ricorso ad AGCM (limite 3 anni).
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Official links */}
      <Card className="bg-primary/5 border-primary/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏛️ Link ufficiali MIT
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button variant="outline" size="sm" asChild>
              <a href={officialLinks.mitCalendar} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Calendario Scioperi
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={officialLinks.mitInteractive} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Mappa interattiva
              </a>
            </Button>
            <Button variant="outline" size="sm" asChild>
              <a href={officialLinks.avvisoScioperi} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Avviso Scioperi
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
