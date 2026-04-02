import { CONTRACT_TYPES } from "@/data/contract-zones";
import type { ContractWizardData } from "../ContractWizard";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface Props {
  data: ContractWizardData;
  update: (partial: Partial<ContractWizardData>) => void;
  lang: 'it' | 'en';
}

export function ContractTypeStep({ data, update, lang }: Props) {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          {lang === 'it' ? 'Scegli il tipo di contratto' : 'Choose contract type'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {lang === 'it'
            ? 'Seleziona la tipologia contrattuale più adatta.'
            : 'Select the most suitable contract type.'}
        </p>
      </div>

      <div className="grid gap-3">
        {CONTRACT_TYPES.map(ct => {
          const selected = data.contractType === ct.id;
          return (
            <Card
              key={ct.id}
              className={cn(
                "p-4 cursor-pointer transition-all hover:shadow-md",
                selected && "border-primary ring-1 ring-primary/30 bg-primary/5"
              )}
              onClick={() => update({ contractType: ct.id })}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "flex items-center justify-center w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 transition-colors",
                  selected ? "border-primary bg-primary" : "border-muted-foreground/30"
                )}>
                  {selected && <Check className="h-3 w-3 text-primary-foreground" />}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-foreground">{ct.label[lang]}</span>
                    {ct.isConcordato && (
                      <Badge variant="secondary" className="text-xs">
                        {lang === 'it' ? 'Agevolato' : 'Tax benefit'}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{ct.description[lang]}</p>
                  <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                    <span>{lang === 'it' ? 'Durata' : 'Duration'}: {ct.duration[lang]}</span>
                    <span>Cedolare secca: {ct.cedolareSeccaRate}%</span>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
