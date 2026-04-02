import type { ContractWizardData } from "../ContractWizard";
import { FEATURE_ELEMENTS } from "@/data/contract-zones";
import { determineSubBand } from "@/lib/contract-rules";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Props {
  data: ContractWizardData;
  update: (partial: Partial<ContractWizardData>) => void;
  lang: 'it' | 'en';
}

export function FeatureChecklistStep({ data, update, lang }: Props) {
  const count = data.selectedFeatures.length;
  const subBand = determineSubBand(count);

  const toggle = (id: string) => {
    const features = data.selectedFeatures.includes(id)
      ? data.selectedFeatures.filter(f => f !== id)
      : [...data.selectedFeatures, id];
    update({ selectedFeatures: features });
  };

  const bandLabels = {
    it: { 1: 'Sub-fascia 1 (base)', 2: 'Sub-fascia 2 (media)', 3: 'Sub-fascia 3 (alta)' },
    en: { 1: 'Sub-band 1 (basic)', 2: 'Sub-band 2 (medium)', 3: 'Sub-band 3 (high)' },
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          {lang === 'it' ? 'Elementi di pregio' : 'Property features'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {lang === 'it'
            ? 'Seleziona gli elementi presenti nell\'immobile. Determinano la sub-fascia di canone.'
            : 'Select the features present in the property. They determine the rent sub-band.'}
        </p>
      </div>

      {/* Current sub-band indicator */}
      <Card className="p-3 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm font-medium text-foreground">
              {lang === 'it' ? 'Elementi selezionati' : 'Features selected'}: {count}/22
            </span>
            <p className="text-xs text-muted-foreground mt-0.5">
              0-8 → Sub 1 · 9-14 → Sub 2 · 15-22 → Sub 3
            </p>
          </div>
          <Badge variant={subBand === 3 ? 'default' : 'secondary'}>
            {bandLabels[lang][subBand]}
          </Badge>
        </div>
      </Card>

      {/* Checklist */}
      <div className="grid gap-2 sm:grid-cols-2">
        {FEATURE_ELEMENTS.map(el => (
          <label
            key={el.id}
            className="flex items-center gap-3 p-2.5 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
          >
            <Checkbox
              checked={data.selectedFeatures.includes(el.id)}
              onCheckedChange={() => toggle(el.id)}
            />
            <span className="text-sm text-foreground">{el.label[lang]}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
