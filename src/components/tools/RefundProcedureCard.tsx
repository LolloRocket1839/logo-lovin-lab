import { ChevronDown, ExternalLink, CheckCircle, Clock, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { useState } from 'react';
import type { RefundProcedure } from '@/data/strikeEmergencyDirectory';

interface RefundProcedureCardProps {
  procedure: RefundProcedure;
}

export const RefundProcedureCard = ({ procedure }: RefundProcedureCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full text-left">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-primary" />
                {procedure.company}
              </CardTitle>
              <div className="flex items-center gap-2">
                <Badge variant={procedure.type === 'automatic' ? 'default' : 'secondary'}>
                  {procedure.type === 'automatic' ? 'Automatico' : 'Su richiesta'}
                </Badge>
                <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CardContent className="pt-0">
          {/* Quick info always visible */}
          <div className="flex flex-wrap gap-4 text-sm mb-3">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">{procedure.deadline}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="font-semibold text-green-600">{procedure.amount}</span>
            </div>
          </div>

          <div className="bg-primary/5 rounded-lg p-3 mb-3">
            <p className="text-sm font-medium text-primary">
              ✓ Consigliato: {procedure.recommendedMethod}
            </p>
          </div>

          <CollapsibleContent>
            <div className="space-y-3 pt-3 border-t">
              <p className="text-sm font-medium">Procedura passo-passo:</p>
              <ol className="space-y-2">
                {procedure.steps.map((step, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span className="bg-primary text-primary-foreground rounded-full w-5 h-5 flex items-center justify-center shrink-0 text-xs">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>

              {procedure.website && (
                <Button variant="outline" size="sm" asChild className="w-full mt-3">
                  <a href={procedure.website} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Vai al sito rimborsi
                  </a>
                </Button>
              )}
            </div>
          </CollapsibleContent>
        </CardContent>
      </Collapsible>
    </Card>
  );
};
