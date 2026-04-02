import { useMemo } from "react";
import type { ContractWizardData } from "../ContractWizard";
import { ALL_ZONES, CONTRACT_TYPES } from "@/data/contract-zones";
import {
  calculateConventionalSurface,
  calculateRent,
  compareTax,
} from "@/lib/contract-rules";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { TrendingUp, TrendingDown } from "lucide-react";

interface Props {
  data: ContractWizardData;
  update: (partial: Partial<ContractWizardData>) => void;
  lang: 'it' | 'en';
}

export function RentCalculationStep({ data, update, lang }: Props) {
  const zone = ALL_ZONES.find(z => z.id === data.zoneId) || ALL_ZONES[0];
  const contractType = CONTRACT_TYPES.find(c => c.id === data.contractType);
  const isConcordato = contractType?.isConcordato ?? false;

  const conventionalSqm = calculateConventionalSurface({
    walkableSqm: data.walkableSqm,
    balconySqm: data.balconySqm,
    cellarSqm: data.cellarSqm,
    garageSqm: data.garageSqm,
    outdoorSqm: data.outdoorSqm,
  });

  const currentYear = new Date().getFullYear();
  const isRenovatedRecently = data.renovationYear
    ? currentYear - parseInt(data.renovationYear) <= 5
    : false;

  const result = useMemo(() => {
    if (!data.contractType) return null;
    return calculateRent({
      zone,
      contractType: data.contractType,
      conventionalSqm,
      featureCount: data.selectedFeatures.length,
      isNewBuild: data.yearBuilt ? currentYear - parseInt(data.yearBuilt) <= 3 : false,
      isRenovatedRecently,
      energyClass: data.energyClass,
      isFurnished: data.isFurnished,
      furnitureValue: data.furnitureValue,
      noDepositWaiver: false,
    });
  }, [zone, data.contractType, conventionalSqm, data.selectedFeatures.length, data.yearBuilt, isRenovatedRecently, data.energyClass, data.isFurnished, data.furnitureValue, currentYear]);

  const chosenRent = data.chosenRent || (result ? Math.round((result.monthlyRentMin + result.monthlyRentMax) / 2) : 0);

  const tax = useMemo(() => {
    if (!contractType) return null;
    return compareTax(chosenRent, contractType.cedolareSeccaRate);
  }, [chosenRent, contractType]);

  if (!result) return null;

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          {lang === 'it' ? 'Calcolo del canone' : 'Rent calculation'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {isConcordato
            ? (lang === 'it'
              ? 'Il canone è determinato dall\'Accordo Territoriale. Scegli il valore nel range consentito.'
              : 'Rent is determined by the Territorial Agreement. Choose a value within the allowed range.')
            : (lang === 'it'
              ? 'Per i contratti a canone libero, il canone è a tua discrezione. I valori sotto sono indicativi.'
              : 'For free-market contracts, rent is at your discretion. Values below are indicative.')}
        </p>
      </div>

      {/* Calculation breakdown */}
      <Card className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <span className="text-muted-foreground">{lang === 'it' ? 'Sup. convenzionale' : 'Conv. surface'}</span>
          <span className="text-right font-medium">{result.conventionalSqm.toFixed(2)} m²</span>

          <span className="text-muted-foreground">{lang === 'it' ? 'Coefficiente superficie' : 'Surface coeff.'}</span>
          <span className="text-right font-medium">×{result.surfaceCoefficient.toFixed(2)}</span>

          <span className="text-muted-foreground">{lang === 'it' ? 'Sup. effettiva' : 'Effective surface'}</span>
          <span className="text-right font-medium">{result.effectiveSqm.toFixed(2)} m²</span>

          <span className="text-muted-foreground">{lang === 'it' ? 'Sub-fascia' : 'Sub-band'}</span>
          <span className="text-right font-medium">{result.subBand}</span>

          <span className="text-muted-foreground">{lang === 'it' ? 'Canone base €/m²' : 'Base rent €/m²'}</span>
          <span className="text-right font-medium">€{result.baseRentPerSqm.min.toFixed(2)} — €{result.baseRentPerSqm.max.toFixed(2)}</span>
        </div>

        {result.surchargeDetails.length > 0 && (
          <div className="pt-2 border-t border-border space-y-1">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {lang === 'it' ? 'Maggiorazioni' : 'Surcharges'}
            </span>
            {result.surchargeDetails.map(s => (
              <div key={s.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{s.label}</span>
                <span className="text-primary font-medium">+{s.percent}%</span>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* Rent range slider */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">{lang === 'it' ? 'Canone mensile' : 'Monthly rent'}</span>
          <span className="text-xl font-bold text-foreground">€{chosenRent.toFixed(0)}</span>
        </div>
        <Slider
          min={Math.floor(result.monthlyRentMin)}
          max={Math.ceil(result.monthlyRentMax)}
          step={5}
          value={[chosenRent]}
          onValueChange={([v]) => update({ chosenRent: v })}
          className="py-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Min: €{result.monthlyRentMin.toFixed(0)}</span>
          <span>Max: €{result.monthlyRentMax.toFixed(0)}</span>
        </div>
      </div>

      {/* Tax comparison */}
      {tax && contractType && (
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2">
            <Label className="text-sm font-medium">
              {lang === 'it' ? 'Cedolare secca' : 'Flat tax'} ({contractType.cedolareSeccaRate}%)
            </Label>
            <Switch
              checked={data.useCedolareSecca}
              onCheckedChange={v => update({ useCedolareSecca: v })}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Card className={`p-3 ${data.useCedolareSecca ? 'border-primary/40 bg-primary/5' : ''}`}>
              <div className="text-xs text-muted-foreground mb-1">
                Cedolare secca ({contractType.cedolareSeccaRate}%)
              </div>
              <div className="text-lg font-bold text-foreground">
                €{tax.cedolareSeccaTax.toFixed(0)}<span className="text-xs font-normal text-muted-foreground">/anno</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {lang === 'it' ? 'Netto' : 'Net'}: €{tax.cedolareSeccaNet.toFixed(0)}
              </div>
            </Card>
            <Card className={`p-3 ${!data.useCedolareSecca ? 'border-primary/40 bg-primary/5' : ''}`}>
              <div className="text-xs text-muted-foreground mb-1">IRPEF</div>
              <div className="text-lg font-bold text-foreground">
                €{tax.irpefEstimate.toFixed(0)}<span className="text-xs font-normal text-muted-foreground">/anno</span>
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {lang === 'it' ? 'Netto' : 'Net'}: €{tax.irpefNet.toFixed(0)}
              </div>
            </Card>
          </div>

          {tax.savings > 0 && (
            <div className="flex items-center gap-2 text-sm text-primary">
              <TrendingUp className="h-4 w-4" />
              <span>
                {lang === 'it'
                  ? `Risparmio con cedolare secca: €${tax.savings.toFixed(0)}/anno`
                  : `Flat tax savings: €${tax.savings.toFixed(0)}/year`}
              </span>
            </div>
          )}
          {tax.savings < 0 && (
            <div className="flex items-center gap-2 text-sm text-destructive">
              <TrendingDown className="h-4 w-4" />
              <span>
                {lang === 'it'
                  ? `IRPEF è più conveniente di €${Math.abs(tax.savings).toFixed(0)}/anno`
                  : `IRPEF is cheaper by €${Math.abs(tax.savings).toFixed(0)}/year`}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
