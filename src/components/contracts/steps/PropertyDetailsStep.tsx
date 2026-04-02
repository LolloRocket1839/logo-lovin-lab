import { useState, useCallback } from "react";
import type { ContractWizardData } from "../ContractWizard";
import { ALL_ZONES, ENERGY_CLASSES } from "@/data/contract-zones";
import { calculateConventionalSurface } from "@/lib/contract-rules";
import { detectZoneFromAddress, type ZoneDetectionResult } from "@/data/turin-stradario";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { MapPin, Check, AlertCircle } from "lucide-react";

interface Props {
  data: ContractWizardData;
  update: (partial: Partial<ContractWizardData>) => void;
  lang: 'it' | 'en';
}

export function PropertyDetailsStep({ data, update, lang }: Props) {
  const [detection, setDetection] = useState<ZoneDetectionResult | null>(null);

  const handleAddressChange = useCallback((value: string) => {
    update({ address: value });
    const result = detectZoneFromAddress(value);
    setDetection(result);
    if (result.matchType !== 'none' && result.zoneId) {
      update({ address: value, zoneId: result.zoneId });
    }
  }, [update]);

  const conventional = calculateConventionalSurface({
    walkableSqm: data.walkableSqm,
    balconySqm: data.balconySqm,
    cellarSqm: data.cellarSqm,
    garageSqm: data.garageSqm,
    outdoorSqm: data.outdoorSqm,
  });

  const numField = (
    label: string,
    field: keyof ContractWizardData,
    placeholder: string,
    suffix?: string
  ) => (
    <div className="space-y-1.5">
      <Label className="text-sm">{label}</Label>
      <div className="relative">
        <Input
          type="number"
          min={0}
          placeholder={placeholder}
          value={data[field] as number || ''}
          onChange={e => update({ [field]: parseFloat(e.target.value) || 0 })}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          {lang === 'it' ? 'Dettagli immobile' : 'Property details'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {lang === 'it'
            ? 'Inserisci le superfici e le caratteristiche dell\'immobile.'
            : 'Enter the property surfaces and characteristics.'}
        </p>
      </div>

      {/* Address & Zone */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label className="text-sm">{lang === 'it' ? 'Indirizzo' : 'Address'}</Label>
          <Input
            placeholder={lang === 'it' ? 'Via Roma 1, Torino' : '1 Via Roma, Turin'}
            value={data.address}
            onChange={e => handleAddressChange(e.target.value)}
          />
          {/* Zone auto-detection feedback */}
          {detection && detection.matchType !== 'none' && (
            <div className="flex items-center gap-1.5 text-xs mt-1">
              <Check className="h-3.5 w-3.5 text-green-600 shrink-0" />
              <span className="text-green-700">
                {lang === 'it'
                  ? `Zona rilevata da ${detection.matchType === 'street' ? 'via' : 'quartiere'}: `
                  : `Zone detected from ${detection.matchType}: `}
                <span className="font-medium capitalize">{detection.matchedOn}</span>
              </span>
            </div>
          )}
          {data.address.length > 5 && (!detection || detection.matchType === 'none') && (
            <div className="flex items-center gap-1.5 text-xs mt-1">
              <AlertCircle className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
              <span className="text-muted-foreground">
                {lang === 'it'
                  ? 'Zona non rilevata automaticamente — selezionala manualmente'
                  : 'Zone not auto-detected — select it manually'}
              </span>
            </div>
          )}
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5" />
            {lang === 'it' ? 'Zona' : 'Zone'}
            {detection?.matchType !== 'none' && (
              <span className="text-xs font-normal text-green-600">
                ({lang === 'it' ? 'auto' : 'auto'})
              </span>
            )}
          </Label>
          <Select value={data.zoneId} onValueChange={v => update({ zoneId: v })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ALL_ZONES.map(z => (
                <SelectItem key={z.id} value={z.id}>{z.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Surfaces */}
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
        {numField(lang === 'it' ? 'Superficie calpestabile' : 'Walkable area', 'walkableSqm', '65', 'm²')}
        {numField(lang === 'it' ? 'Balconi / Terrazzi' : 'Balconies / Terraces', 'balconySqm', '8', 'm²')}
        {numField(lang === 'it' ? 'Cantina' : 'Cellar', 'cellarSqm', '5', 'm²')}
        {numField(lang === 'it' ? 'Box auto / Garage' : 'Garage', 'garageSqm', '15', 'm²')}
        {numField(lang === 'it' ? 'Scoperto esclusivo' : 'Outdoor area', 'outdoorSqm', '0', 'm²')}
      </div>

      {/* Conventional surface result */}
      <Card className="p-3 bg-primary/5 border-primary/20">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">
            {lang === 'it' ? 'Superficie convenzionale' : 'Conventional surface'}
          </span>
          <span className="text-lg font-bold text-primary">{conventional.toFixed(2)} m²</span>
        </div>
        <p className="text-xs text-muted-foreground mt-1">
          {lang === 'it'
            ? 'Calpestabile 100% + Balconi 25% + Cantina 25% + Garage 80% + Scoperto 10%'
            : 'Walkable 100% + Balconies 25% + Cellar 25% + Garage 80% + Outdoor 10%'}
        </p>
      </Card>

      {/* Additional details */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="space-y-1.5">
          <Label className="text-sm">{lang === 'it' ? 'Classe energetica' : 'Energy class'}</Label>
          <Select value={data.energyClass} onValueChange={v => update({ energyClass: v as any })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {ENERGY_CLASSES.map(ec => (
                <SelectItem key={ec} value={ec}>{ec}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm">{lang === 'it' ? 'Anno costruzione' : 'Year built'}</Label>
          <Input
            placeholder="1970"
            value={data.yearBuilt}
            onChange={e => update({ yearBuilt: e.target.value })}
          />
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm">{lang === 'it' ? 'Anno ristrutturazione' : 'Renovation year'}</Label>
          <Input
            placeholder="2020"
            value={data.renovationYear}
            onChange={e => update({ renovationYear: e.target.value })}
          />
        </div>
      </div>

      {/* Furnished */}
      <div className="flex items-center justify-between py-2">
        <Label className="text-sm">{lang === 'it' ? 'Arredato' : 'Furnished'}</Label>
        <Switch
          checked={data.isFurnished}
          onCheckedChange={v => update({ isFurnished: v })}
        />
      </div>

      {data.isFurnished && (
        <div className="space-y-1.5">
          <Label className="text-sm">{lang === 'it' ? 'Valore arredo stimato (€)' : 'Estimated furniture value (€)'}</Label>
          <Input
            type="number"
            min={0}
            placeholder="5000"
            value={data.furnitureValue || ''}
            onChange={e => update({ furnitureValue: parseFloat(e.target.value) || 0 })}
          />
        </div>
      )}
    </div>
  );
}
