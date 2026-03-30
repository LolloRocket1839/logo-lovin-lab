import { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Home, Zap, Car, ChevronDown, ChevronUp, 
  Calculator, Info, Building2, TrendingUp, AlertTriangle,
  Target, TrendingDown, Lightbulb, Clock, BadgeCheck, Users, Flame,
  MessageCircle, ArrowRight
} from "lucide-react";
import { useValuationCount } from "@/hooks/useValuationCount";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  turinZonePrices, 
  quickSelectZones, 
  getZoneById,
  type ZonePrice 
} from "@/data/turinZonePrices";
import {
  floorWithElevator,
  floorWithoutElevator,
  conservationState,
  energyClass,
  heatingSystem,
  balconyTerrace,
  garageParking,
  exposure,
  additionalPremiums,
  additionalPenalties,
  calculateReliability,
  type CoefficientOption
} from "@/data/propertyCoefficients";
import { SellerLeadFormWithPhotos } from "./SellerLeadFormWithPhotos";
import { QuickSellerLeadDialog } from "@/components/dialogs";
import { CONTACTS, openWhatsApp } from "@/constants/contacts";

interface PropertyValuatorProps {
  onValueCalculated?: (value: number) => void;
}

interface AppliedCoefficient {
  label: string;
  value: number;
  category: string;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('it-IT', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0
  }).format(value);
};

const formatPercentage = (value: number): string => {
  const sign = value >= 0 ? '+' : '';
  return `${sign}${(value * 100).toFixed(1)}%`;
};

export const PropertyValuator = ({ onValueCalculated }: PropertyValuatorProps) => {
  const { t } = useTranslation();
  const { count: valuationCount, isLoading: isCountLoading } = useValuationCount();
  
  // Form state
  const [zone, setZone] = useState<string>('');
  const [sqm, setSqm] = useState<string>('');
  const [hasElevator, setHasElevator] = useState<boolean>(true);
  const [floor, setFloor] = useState<string>('third');
  const [condition, setCondition] = useState<string>('good');
  const [energy, setEnergy] = useState<string>('d');
  const [heating, setHeating] = useState<string>('centralized');
  const [balcony, setBalcony] = useState<string>('absent');
  const [garage, setGarage] = useState<string>('absent');
  const [exposureType, setExposureType] = useState<string>('double');
  const [selectedPremiums, setSelectedPremiums] = useState<string[]>([]);
  const [selectedPenalties, setSelectedPenalties] = useState<string[]>([]);
  
  // UI state
  const [energyOpen, setEnergyOpen] = useState(false);
  const [extrasOpen, setExtrasOpen] = useState(false);
  const [showBreakdown, setShowBreakdown] = useState(false);
  const [showTheoreticalPrice, setShowTheoreticalPrice] = useState(false);
  const [isLeadFormOpen, setIsLeadFormOpen] = useState(false);
  const [isQuickLeadOpen, setIsQuickLeadOpen] = useState(false);

  // Handler for opening lead form with property data
  const handleOpenLeadForm = useCallback(() => {
    setIsLeadFormOpen(true);
  }, []);

  // Get floor options based on elevator
  const floorOptions = hasElevator ? floorWithElevator : floorWithoutElevator;

  // Calculate coefficients
  const calculation = useMemo(() => {
    const selectedZone = getZoneById(zone);
    const sqmValue = parseInt(sqm) || 0;
    
    if (!selectedZone || sqmValue <= 0) {
      return null;
    }

    const appliedCoefficients: AppliedCoefficient[] = [];
    
    // Floor coefficient
    const floorCoef = floorOptions.find(f => f.id === floor);
    if (floorCoef && floorCoef.value !== 0) {
      appliedCoefficients.push({ label: floorCoef.label, value: floorCoef.value, category: 'Piano' });
    }
    
    // Condition coefficient
    const condCoef = conservationState.find(c => c.id === condition);
    if (condCoef && condCoef.value !== 0) {
      appliedCoefficients.push({ label: condCoef.label, value: condCoef.value, category: 'Stato' });
    }
    
    // Energy coefficient
    const energyCoef = energyClass.find(e => e.id === energy);
    if (energyCoef && energyCoef.value !== 0) {
      appliedCoefficients.push({ label: `Classe ${energyCoef.label}`, value: energyCoef.value, category: 'Energia' });
    }
    
    // Heating coefficient
    const heatCoef = heatingSystem.find(h => h.id === heating);
    if (heatCoef && heatCoef.value !== 0) {
      appliedCoefficients.push({ label: heatCoef.label, value: heatCoef.value, category: 'Riscaldamento' });
    }
    
    // Balcony coefficient
    const balcCoef = balconyTerrace.find(b => b.id === balcony);
    if (balcCoef && balcCoef.value !== 0) {
      appliedCoefficients.push({ label: balcCoef.label, value: balcCoef.value, category: 'Esterno' });
    }
    
    // Garage coefficient
    const garageCoef = garageParking.find(g => g.id === garage);
    if (garageCoef && garageCoef.value !== 0) {
      appliedCoefficients.push({ label: garageCoef.label, value: garageCoef.value, category: 'Parcheggio' });
    }
    
    // Exposure coefficient
    const expCoef = exposure.find(e => e.id === exposureType);
    if (expCoef && expCoef.value !== 0) {
      appliedCoefficients.push({ label: `Esposizione ${expCoef.label}`, value: expCoef.value, category: 'Esposizione' });
    }
    
    // Additional premiums
    selectedPremiums.forEach(premiumId => {
      const premium = additionalPremiums.find(p => p.id === premiumId);
      if (premium) {
        appliedCoefficients.push({ label: premium.label, value: premium.value, category: 'Extra' });
      }
    });
    
    // Additional penalties
    selectedPenalties.forEach(penaltyId => {
      const penalty = additionalPenalties.find(p => p.id === penaltyId);
      if (penalty) {
        appliedCoefficients.push({ label: penalty.label, value: penalty.value, category: 'Penalità' });
      }
    });
    
    // Calculate total coefficient
    const totalCoefficient = appliedCoefficients.reduce((sum, c) => sum + c.value, 0);
    
    // Sanity check: limit coefficients to -25% to +50%
    const clampedCoefficient = Math.max(-0.25, Math.min(0.50, totalCoefficient));
    
    // Base price
    const basePrice = sqmValue * selectedZone.avgPrice;
    
    // Theoretical price (FIAIP formula)
    const multiplier = 1 + clampedCoefficient;
    const theoreticalPrice = basePrice * multiplier;
    
    // Market haircut -15% (typical difference between theoretical and real transaction prices)
    const MARKET_HAIRCUT = 0.15;
    const marketPrice = theoreticalPrice * (1 - MARKET_HAIRCUT);
    
    // Price ranges
    const theoreticalMinPrice = theoreticalPrice * 0.95;
    const theoreticalMaxPrice = theoreticalPrice * 1.05;
    const marketMinPrice = marketPrice * 0.95;
    const marketMaxPrice = marketPrice * 1.05;
    
    // Pricing strategy
    const askingPrice = marketPrice * 1.05; // +5% for negotiation room
    const expectedClosingPrice = marketPrice;
    const minimumPrice = marketPrice * 0.95; // Floor price
    
    // Sale simulation: Agency vs Jungle Rent
    const AGENCY_COMMISSION = 0.04; // 4% typical in Piemonte
    const agencySalePrice = marketPrice;
    const agencyCommissionAmount = agencySalePrice * AGENCY_COMMISSION;
    const agencyNetToSeller = agencySalePrice - agencyCommissionAmount;
    
    // Jungle Rent business logic:
    // - Only makes automatic offers for "good" or "renovated" properties
    // - Properties "to renovate" require custom ad-hoc evaluation
    const requiresCustomEvaluation = condition === 'to_renovate';
    
    // Jungle Rent offer: dynamic discount based on property condition
    // - "good" (buono stato): -6% to -10% (minor updates needed)
    // - "renovated" (ristrutturato): -3% to -6% (turnkey property)
    const getJungleRentDiscount = (propertyCondition: string): { min: number; max: number } | null => {
      switch(propertyCondition) {
        case 'good': return { min: 0.06, max: 0.10 };     // -6% to -10%
        case 'renovated': return { min: 0.03, max: 0.06 }; // -3% to -6%
        case 'to_renovate': return null; // Requires custom evaluation
        default: return { min: 0.06, max: 0.10 };         // Default to good
      }
    };
    
    const jungleRentDiscounts = getJungleRentDiscount(condition);
    // Only calculate offers for eligible properties (not "da ristrutturare")
    const jungleRentOfferMax = jungleRentDiscounts ? marketPrice * (1 - jungleRentDiscounts.min) : null;
    const jungleRentOfferMin = jungleRentDiscounts ? marketPrice * (1 - jungleRentDiscounts.max) : null;
    const jungleRentOfferMid = jungleRentOfferMax && jungleRentOfferMin ? (jungleRentOfferMax + jungleRentOfferMin) / 2 : null;
    
    // Estimated renovation costs (Torino 2025 real data)
    // Complete renovation: €800/mq, Light updates: €450/mq
    const RENOVATION_COSTS = { complete: 800, light: 450 };
    const estimatedRenovationCost = condition === 'to_renovate' 
      ? sqmValue * RENOVATION_COSTS.complete // €800/mq for full renovation
      : condition === 'good' 
        ? sqmValue * RENOVATION_COSTS.light   // €450/mq for light updates
        : 0;
    const estimatedRenovationTime = condition === 'to_renovate' ? 90 : condition === 'good' ? 45 : 0;
    
    // Jungle Rent discount explanation
    const jungleRentDiscountReason = condition === 'good'
      ? t('propertyValuator.adaptationCosts', 'Costi adeguamento stimati') + ': ' + formatCurrency(estimatedRenovationCost)
      : t('propertyValuator.readyToRent', 'Immobile pronto per affitto');
    
    // Calculate reliability
    const filledFields = [zone, sqm, floor, condition, energy].filter(Boolean).length;
    const reliability = calculateReliability(filledFields, 9);
    
    return {
      zone: selectedZone,
      sqm: sqmValue,
      pricePerSqm: selectedZone.avgPrice,
      basePrice,
      totalCoefficient: clampedCoefficient,
      // Theoretical prices (FIAIP)
      theoreticalPrice,
      theoreticalMinPrice,
      theoreticalMaxPrice,
      // Market prices (with -15% haircut)
      marketPrice,
      marketMinPrice,
      marketMaxPrice,
      // Pricing strategy
      askingPrice,
      expectedClosingPrice,
      minimumPrice,
      // Sale simulation
      agencySalePrice,
      agencyCommissionAmount,
      agencyNetToSeller,
      jungleRentOfferMin,
      jungleRentOfferMax,
      jungleRentOfferMid,
      jungleRentDiscounts,
      estimatedRenovationCost,
      estimatedRenovationTime,
      jungleRentDiscountReason,
      requiresCustomEvaluation,
      // Legacy support
      estimatedPrice: marketPrice,
      minPrice: marketMinPrice,
      maxPrice: marketMaxPrice,
      reliability,
      appliedCoefficients,
      wasClamped: totalCoefficient !== clampedCoefficient
    };
  }, [zone, sqm, hasElevator, floor, condition, energy, heating, balcony, garage, exposureType, selectedPremiums, selectedPenalties, floorOptions]);

  // Notify parent when value changes
  useMemo(() => {
    if (calculation && onValueCalculated) {
      onValueCalculated(calculation.estimatedPrice);
    }
  }, [calculation, onValueCalculated]);

  const handlePremiumToggle = useCallback((premiumId: string) => {
    setSelectedPremiums(prev => 
      prev.includes(premiumId) 
        ? prev.filter(id => id !== premiumId)
        : [...prev, premiumId]
    );
  }, []);

  const handlePenaltyToggle = useCallback((penaltyId: string) => {
    setSelectedPenalties(prev => 
      prev.includes(penaltyId) 
        ? prev.filter(id => id !== penaltyId)
        : [...prev, penaltyId]
    );
  }, []);

  const handleReset = useCallback(() => {
    setZone('');
    setSqm('');
    setHasElevator(true);
    setFloor('third');
    setCondition('good');
    setEnergy('d');
    setHeating('centralized');
    setBalcony('absent');
    setGarage('absent');
    setExposureType('double');
    setSelectedPremiums([]);
    setSelectedPenalties([]);
  }, []);

  return (
    <>
      {/* Mobile sticky valuation bar */}
      {calculation && (
        <div className="lg:hidden sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border/50 py-3 px-4">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs text-muted-foreground">{t('propertyValuator.marketPrice', 'Prezzo di Mercato')}</span>
              <div className="text-xl font-bold text-primary">{formatCurrency(calculation.marketPrice)}</div>
            </div>
            <div className="flex gap-3 text-center">
              <div>
                <div className="text-sm font-semibold">{formatCurrency(calculation.pricePerSqm)}</div>
                <div className="text-xs text-muted-foreground">€/mq</div>
              </div>
              <div>
                <div className="text-sm font-semibold">{calculation.reliability}%</div>
                <div className="text-xs text-muted-foreground">{t('propertyValuator.reliability', 'Affidabilità')}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    <div className="grid lg:grid-cols-5 gap-6">
      {/* Left: Form inputs */}
      <div className="lg:col-span-3 space-y-6">
        {/* Social Proof Counter */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary/10 border border-primary/20"
        >
          <Flame className="w-4 h-4 text-primary animate-pulse" />
          <span className="text-sm font-medium text-foreground">
            {isCountLoading ? (
              <span className="inline-block w-4 h-4 rounded-full bg-primary/20 animate-pulse" />
            ) : (
              <motion.span
                key={valuationCount}
                initial={{ scale: 1.2, color: 'hsl(var(--primary))' }}
                animate={{ scale: 1, color: 'hsl(var(--foreground))' }}
                className="font-bold"
              >
                {valuationCount}
              </motion.span>
            )}
            {' '}{t('propertyValuator.socialProof', 'proprietari hanno valutato la loro casa questa settimana')}
          </span>
        </motion.div>

        {/* Location Section */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MapPin className="w-5 h-5 text-primary" />
              {t('propertyValuator.location', 'Localizzazione')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Quick select zones */}
            <div className="flex flex-wrap gap-2">
              {quickSelectZones.map(zoneId => {
                const zoneData = getZoneById(zoneId);
                if (!zoneData) return null;
                return (
                  <Button
                    key={zoneId}
                    variant={zone === zoneId ? "default" : "outline"}
                    size="sm"
                    onClick={() => setZone(zoneId)}
                    className="text-xs"
                  >
                    {zoneData.name}
                  </Button>
                );
              })}
            </div>
            
            {/* Zone select */}
            <div className="space-y-2">
              <Label>{t('propertyValuator.zone', 'Zona')}</Label>
              <Select value={zone} onValueChange={setZone}>
                <SelectTrigger>
                  <SelectValue placeholder={t('propertyValuator.selectZone', 'Seleziona zona...')} />
                </SelectTrigger>
                <SelectContent>
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1">Zone Centrali</div>
                  {turinZonePrices.filter(z => z.category === 'central').map(z => (
                    <SelectItem key={z.id} value={z.id}>
                      {z.name} ({formatCurrency(z.avgPrice)}/mq)
                    </SelectItem>
                  ))}
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1 mt-2">Zone Semicentrali</div>
                  {turinZonePrices.filter(z => z.category === 'semicentral').map(z => (
                    <SelectItem key={z.id} value={z.id}>
                      {z.name} ({formatCurrency(z.avgPrice)}/mq)
                    </SelectItem>
                  ))}
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1 mt-2">Zone Periferiche</div>
                  {turinZonePrices.filter(z => z.category === 'peripheral_north' || z.category === 'peripheral_south').map(z => (
                    <SelectItem key={z.id} value={z.id}>
                      {z.name} ({formatCurrency(z.avgPrice)}/mq)
                    </SelectItem>
                  ))}
                  <div className="text-xs font-medium text-muted-foreground px-2 py-1 mt-2">Zone Collinari</div>
                  {turinZonePrices.filter(z => z.category === 'hill').map(z => (
                    <SelectItem key={z.id} value={z.id}>
                      {z.name} ({formatCurrency(z.avgPrice)}/mq)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Base Characteristics */}
        <Card>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Home className="w-5 h-5 text-primary" />
              {t('propertyValuator.characteristics', 'Caratteristiche')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Surface area */}
            <div className="space-y-2">
              <Label>{t('propertyValuator.surface', 'Superficie (mq)')}</Label>
              <div className="flex gap-4 items-center">
                <Input
                  type="number"
                  value={sqm}
                  onChange={(e) => setSqm(e.target.value)}
                  placeholder="85"
                  className="w-24"
                  min={10}
                  max={500}
                />
                <Slider
                  value={[parseInt(sqm) || 50]}
                  onValueChange={([val]) => setSqm(val.toString())}
                  min={20}
                  max={300}
                  step={5}
                  className="flex-1"
                />
              </div>
            </div>

            {/* Elevator toggle */}
            <div className="flex items-center gap-3">
              <Checkbox
                id="elevator"
                checked={hasElevator}
                onCheckedChange={(checked) => {
                  setHasElevator(checked as boolean);
                  setFloor('third'); // Reset floor when elevator changes
                }}
              />
              <Label htmlFor="elevator" className="cursor-pointer">
                {t('propertyValuator.hasElevator', 'Con ascensore')}
              </Label>
            </div>

            {/* Floor */}
            <div className="space-y-2">
              <Label>{t('propertyValuator.floor', 'Piano')}</Label>
              <Select value={floor} onValueChange={setFloor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {floorOptions.map(f => (
                    <SelectItem key={f.id} value={f.id}>
                      {f.label} ({f.description})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Condition */}
            <div className="space-y-2">
              <Label>{t('propertyValuator.condition', 'Stato conservazione')}</Label>
              <Select value={condition} onValueChange={setCondition}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {conservationState.map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.label} ({c.description})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Energy Section - Collapsible */}
        <Collapsible open={energyOpen} onOpenChange={setEnergyOpen}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">
                    <Zap className="w-5 h-5 text-primary" />
                    {t('propertyValuator.energySection', 'Energia e Impianti')}
                  </span>
                  {energyOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                {/* Energy class */}
                <div className="space-y-2">
                  <Label>{t('propertyValuator.energyClass', 'Classe energetica (APE)')}</Label>
                  <Select value={energy} onValueChange={setEnergy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {energyClass.map(e => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.label} ({e.description})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Heating */}
                <div className="space-y-2">
                  <Label>{t('propertyValuator.heating', 'Riscaldamento')}</Label>
                  <Select value={heating} onValueChange={setHeating}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {heatingSystem.map(h => (
                        <SelectItem key={h.id} value={h.id}>
                          {h.label} ({h.description})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Extras Section - Collapsible */}
        <Collapsible open={extrasOpen} onOpenChange={setExtrasOpen}>
          <Card>
            <CollapsibleTrigger asChild>
              <CardHeader className="pb-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <CardTitle className="flex items-center justify-between text-lg">
                  <span className="flex items-center gap-2">
                    <Car className="w-5 h-5 text-primary" />
                    {t('propertyValuator.extrasSection', 'Extra e Fattori Aggiuntivi')}
                  </span>
                  {extrasOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                </CardTitle>
              </CardHeader>
            </CollapsibleTrigger>
            <CollapsibleContent>
              <CardContent className="space-y-4 pt-0">
                {/* Balcony */}
                <div className="space-y-2">
                  <Label>{t('propertyValuator.balcony', 'Balcone / Terrazzo')}</Label>
                  <Select value={balcony} onValueChange={setBalcony}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {balconyTerrace.map(b => (
                        <SelectItem key={b.id} value={b.id}>
                          {b.label} ({b.description})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Garage */}
                <div className="space-y-2">
                  <Label>{t('propertyValuator.garage', 'Garage / Box auto')}</Label>
                  <Select value={garage} onValueChange={setGarage}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {garageParking.map(g => (
                        <SelectItem key={g.id} value={g.id}>
                          {g.label} ({g.description})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Exposure */}
                <div className="space-y-2">
                  <Label>{t('propertyValuator.exposure', 'Esposizione')}</Label>
                  <Select value={exposureType} onValueChange={setExposureType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {exposure.map(e => (
                        <SelectItem key={e.id} value={e.id}>
                          {e.label} ({e.description})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional factors */}
                <div className="space-y-3">
                  <Label className="text-primary">{t('propertyValuator.premiums', 'Fattori positivi')}</Label>
                  <div className="space-y-2">
                    {additionalPremiums.map(p => (
                      <div key={p.id} className="flex items-center gap-2">
                        <Checkbox
                          id={p.id}
                          checked={selectedPremiums.includes(p.id)}
                          onCheckedChange={() => handlePremiumToggle(p.id)}
                        />
                        <Label htmlFor={p.id} className="cursor-pointer text-sm">
                          {p.label} ({p.description})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-destructive">{t('propertyValuator.penalties', 'Fattori negativi')}</Label>
                  <div className="space-y-2">
                    {additionalPenalties.map(p => (
                      <div key={p.id} className="flex items-center gap-2">
                        <Checkbox
                          id={p.id}
                          checked={selectedPenalties.includes(p.id)}
                          onCheckedChange={() => handlePenaltyToggle(p.id)}
                        />
                        <Label htmlFor={p.id} className="cursor-pointer text-sm">
                          {p.label} ({p.description})
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </CollapsibleContent>
          </Card>
        </Collapsible>

        {/* Reset button */}
        <Button variant="outline" onClick={handleReset} className="w-full">
          {t('propertyValuator.reset', 'Azzera campi')}
        </Button>
      </div>

      {/* Right: Results sidebar (sticky) */}
      <div className="lg:col-span-2">
        <div className="sticky top-24 space-y-4">
          <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-background">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Calculator className="w-5 h-5 text-primary" />
                {t('propertyValuator.result', 'Valutazione Stimata')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <AnimatePresence mode="wait">
                {calculation ? (
                  <motion.div
                    key="result"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="space-y-4"
                  >
                    {/* Market Price (main - with haircut) */}
                    <div className="text-center py-4 px-3 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                      <div className="flex items-center justify-center gap-2 text-xs text-primary font-medium mb-2">
                        <Target className="w-4 h-4" />
                        {t('propertyValuator.marketPrice', 'Prezzo di Mercato Realistico')}
                      </div>
                      <motion.div
                        key={calculation.marketPrice}
                        initial={{ scale: 0.9 }}
                        animate={{ scale: 1 }}
                        className="text-4xl font-bold text-primary"
                      >
                        {formatCurrency(calculation.marketPrice)}
                      </motion.div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatCurrency(calculation.marketMinPrice)} - {formatCurrency(calculation.marketMaxPrice)}
                      </p>
                      <div className="flex items-center justify-center gap-1 mt-2 text-xs text-muted-foreground">
                        <TrendingDown className="w-3 h-3" />
                        <span>{t('propertyValuator.haircutApplied', 'Haircut -15% applicato')}</span>
                      </div>
                    </div>

                    {/* Toggle for theoretical price */}
                    <div className="flex items-center gap-2 text-sm">
                      <Checkbox
                        id="showTheoretical"
                        checked={showTheoreticalPrice}
                        onCheckedChange={(checked) => setShowTheoreticalPrice(checked as boolean)}
                      />
                      <Label htmlFor="showTheoretical" className="cursor-pointer text-muted-foreground">
                        {t('propertyValuator.showTheoreticalPrice', 'Mostra prezzo teorico FIAIP')}
                      </Label>
                    </div>

                    {/* Theoretical Price (FIAIP) - Collapsible */}
                    <AnimatePresence>
                      {showTheoreticalPrice && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="text-center py-3 px-3 rounded-lg bg-muted/50 border border-border/50">
                            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground font-medium mb-1">
                              <Calculator className="w-4 h-4" />
                              {t('propertyValuator.theoreticalPrice', 'Valutazione Peritale FIAIP')}
                            </div>
                            <div className="text-2xl font-bold text-foreground">
                              {formatCurrency(calculation.theoreticalPrice)}
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {formatCurrency(calculation.theoreticalMinPrice)} - {formatCurrency(calculation.theoreticalMaxPrice)}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Haircut Explanation */}
                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs">
                      <div className="flex items-start gap-2">
                        <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                        <p className="text-amber-700 dark:text-amber-300">
                          {t('propertyValuator.haircutExplanation', 'Il prezzo di mercato include un haircut del 15% che riflette la differenza tipica tra valutazioni teoriche e transazioni reali a Torino.')}
                        </p>
                      </div>
                    </div>

                    {/* Pricing Strategy */}
                    <div className="space-y-2 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-2 text-sm font-medium">
                        <Target className="w-4 h-4 text-primary" />
                        {t('propertyValuator.pricingStrategy', 'Strategia di Prezzo Consigliata')}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center py-1 border-b border-border/50">
                          <span className="text-muted-foreground">{t('propertyValuator.askingPrice', 'Prezzo annuncio')}</span>
                          <span className="font-semibold text-primary">{formatCurrency(calculation.askingPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center py-1 border-b border-border/50">
                          <span className="text-muted-foreground">{t('propertyValuator.expectedClosing', 'Chiusura attesa')}</span>
                          <span className="font-semibold">{formatCurrency(calculation.expectedClosingPrice)}</span>
                        </div>
                        <div className="flex justify-between items-center py-1">
                          <span className="text-muted-foreground">{t('propertyValuator.minimumPrice', 'Soglia minima')}</span>
                          <span className="font-semibold text-destructive">{formatCurrency(calculation.minimumPrice)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Sale Simulation: Agency vs Jungle Rent */}
                    <div className="space-y-3 p-4 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 border-2 border-primary/30">
                      <div className="flex items-center gap-2 text-sm font-semibold">
                        <Users className="w-4 h-4 text-primary" />
                        {t('propertyValuator.saleSimulation', 'Simulazione Vendita')}
                      </div>

                      {/* Agency Card */}
                      <div className="p-3 rounded-lg bg-muted/50 border border-border/50 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-muted-foreground">
                            {t('propertyValuator.withAgency', 'Con Agenzia Tradizionale')}
                          </span>
                        </div>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">{t('propertyValuator.salePrice', 'Prezzo vendita')}</span>
                            <span>{formatCurrency(calculation.agencySalePrice)}</span>
                          </div>
                          <div className="flex justify-between text-destructive">
                            <span>{t('propertyValuator.commission', 'Commissione (4%)')}</span>
                            <span>-{formatCurrency(calculation.agencyCommissionAmount)}</span>
                          </div>
                          <div className="flex justify-between text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {t('propertyValuator.timeToSale', 'Tempo vendita')}
                            </span>
                            <span>6-12 {t('propertyValuator.months', 'mesi')}</span>
                          </div>
                          <div className="flex justify-between font-semibold pt-1 border-t border-border/50">
                            <span>{t('propertyValuator.netToSeller', 'Netto al venditore')}</span>
                            <span>{formatCurrency(calculation.agencyNetToSeller)}</span>
                          </div>
                        </div>
                      </div>

                      {/* Jungle Rent Card - Conditional based on property condition */}
                      {calculation.requiresCustomEvaluation ? (
                        /* Custom Evaluation Card for "da ristrutturare" */
                        <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border-2 border-amber-300 dark:border-amber-700 space-y-2 relative">
                          <Badge variant="secondary" className="absolute -top-2 -right-2 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200">
                            {t('propertyValuator.customEvaluation', 'Valutazione ad hoc')}
                          </Badge>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-amber-800 dark:text-amber-200">
                              🏗️ {t('propertyValuator.toRenovateLabel', 'Immobile da ristrutturare')}
                            </span>
                          </div>
                          <p className="text-sm text-amber-700 dark:text-amber-300">
                            {t('propertyValuator.toRenovateDescription', 'Questo tipo di immobile richiede una valutazione dedicata del nostro team tecnico.')}
                          </p>
                          <div className="text-sm bg-amber-100 dark:bg-amber-900/50 rounded p-2 space-y-1">
                            <div className="flex justify-between">
                              <span className="text-amber-700 dark:text-amber-300">{t('propertyValuator.renovationCosts', 'Costi ristrutturazione stimati (€800/mq)')}:</span>
                              <span className="font-medium text-amber-800 dark:text-amber-200">{formatCurrency(calculation.estimatedRenovationCost)}</span>
                            </div>
                            <div className="flex justify-between text-amber-600 dark:text-amber-400">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {t('propertyValuator.renovationTime', 'Tempo lavori stimato')}:
                              </span>
                              <span>{calculation.estimatedRenovationTime} {t('propertyValuator.days', 'giorni')}</span>
                            </div>
                          </div>
                          <Button 
                            variant="default" 
                            className="w-full bg-amber-600 hover:bg-amber-700 text-white"
                            onClick={handleOpenLeadForm}
                          >
                            📋 {t('propertyValuator.requestFreeEvaluation', 'Richiedi valutazione gratuita')}
                          </Button>
                          <p className="text-xs text-amber-600 dark:text-amber-400 text-center">
                            {t('propertyValuator.inspectionTimeline', 'Sopralluogo e offerta vincolante entro 7 giorni lavorativi')}
                          </p>
                        </div>
                      ) : (
                        /* Standard Jungle Rent Card for "good" and "renovated" */
                        <div className="p-3 rounded-lg bg-primary/10 border-2 border-primary/40 space-y-2 relative">
                          <Badge variant="default" className="absolute -top-2 -right-2 text-xs">
                            {t('propertyValuator.recommended', 'Consigliato')}
                          </Badge>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-primary">
                              {t('propertyValuator.withJungleRent', 'Con Jungle Rent')}
                            </span>
                          </div>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">{t('propertyValuator.directOffer', 'Offerta diretta')}</span>
                              <span className="font-medium">{formatCurrency(calculation.jungleRentOfferMin)} - {formatCurrency(calculation.jungleRentOfferMax)}</span>
                            </div>
                            {/* Dynamic discount explanation */}
                            {calculation.jungleRentDiscounts && (
                              <div className="text-xs text-muted-foreground bg-muted/50 rounded px-2 py-1">
                                <span className="font-medium">
                                  {t('propertyValuator.discountRange', 'Sconto')}: -{Math.round(calculation.jungleRentDiscounts.min * 100)}% / -{Math.round(calculation.jungleRentDiscounts.max * 100)}%
                                </span>
                                <br />
                                <span>{calculation.jungleRentDiscountReason}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-primary">
                              <span>{t('propertyValuator.commission', 'Commissione')}</span>
                              <span className="font-medium">€ 0</span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                              {t('propertyValuator.timeToSale', 'Tempo vendita')}
                            </span>
                            <span>60-90 {t('propertyValuator.days', 'giorni')}</span>
                            </div>
                            <div className="flex justify-between font-semibold pt-1 border-t border-primary/30 text-primary">
                              <span>{t('propertyValuator.netToSeller', 'Netto al venditore')}</span>
                              <span>{formatCurrency(calculation.jungleRentOfferMin)} - {formatCurrency(calculation.jungleRentOfferMax)}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Comparison insight - only show for eligible properties */}
                      {!calculation.requiresCustomEvaluation && (
                        <div className="flex items-start gap-2 p-2 rounded bg-primary/5 text-xs">
                          <BadgeCheck className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-foreground">
                            {calculation.jungleRentOfferMax && calculation.jungleRentOfferMax >= calculation.agencyNetToSeller ? (
                              <span>
                                <strong className="text-primary">{t('propertyValuator.sameOrBetter', 'Stesso netto o migliore')}</strong>
                                {' '}{t('propertyValuator.withFasterSale', 'con vendita 4x più rapida!')}
                              </span>
                            ) : (
                              <span>
                                {t('propertyValuator.slightlyLess', 'Ricavo simile,')}
                                {' '}<strong className="text-primary">{t('propertyValuator.butMuchFaster', 'ma vendita 4x più rapida')}</strong>
                                {' '}{t('propertyValuator.noHassle', 'e zero stress!')}
                              </span>
                            )}
                          </p>
                        </div>
                      )}

                      {/* Info text */}
                      <div className="flex items-start gap-2 text-xs text-muted-foreground">
                        <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                        <p>
                          {t('propertyValuator.agencyCommissionInfo', 'Con un\'agenzia tradizionale, il 4% del prezzo va in commissioni. Con Jungle Rent ottieni un\'offerta diretta senza costi nascosti.')}
                        </p>
                      </div>

                    </div>

                    {/* Quick stats */}
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-muted-foreground">{t('propertyValuator.basePrice', 'Prezzo base')}</p>
                        <p className="font-semibold">{formatCurrency(calculation.basePrice)}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-muted-foreground">{t('propertyValuator.pricePerSqm', '€/mq zona')}</p>
                        <p className="font-semibold">{formatCurrency(calculation.pricePerSqm)}</p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-muted-foreground">{t('propertyValuator.coefficients', 'Coefficienti')}</p>
                        <p className={`font-semibold ${calculation.totalCoefficient >= 0 ? 'text-primary' : 'text-destructive'}`}>
                          {formatPercentage(calculation.totalCoefficient)}
                        </p>
                      </div>
                      <div className="p-3 rounded-lg bg-muted/50">
                        <p className="text-muted-foreground">{t('propertyValuator.reliability', 'Affidabilità')}</p>
                        <p className="font-semibold">{calculation.reliability}%</p>
                      </div>
                    </div>

                    {/* Clamped warning */}
                    {calculation.wasClamped && (
                      <div className="flex items-start gap-2 p-3 rounded-lg bg-yellow-500/10 border border-yellow-500/20 text-sm">
                        <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                        <p className="text-yellow-700 dark:text-yellow-300">
                          {t('propertyValuator.clampedWarning', 'Coefficienti limitati per sanity check (-25% / +50%)')}
                        </p>
                      </div>
                    )}

                    {/* Coefficient breakdown */}
                    <Collapsible open={showBreakdown} onOpenChange={setShowBreakdown}>
                      <CollapsibleTrigger asChild>
                        <Button variant="ghost" size="sm" className="w-full justify-between">
                          {t('propertyValuator.showBreakdown', 'Dettaglio coefficienti')}
                          {showBreakdown ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="space-y-2 pt-2">
                          {calculation.appliedCoefficients.length > 0 ? (
                            calculation.appliedCoefficients.map((coef, idx) => (
                              <div key={idx} className="flex justify-between text-sm py-1 border-b border-border/50 last:border-0">
                                <span className="text-muted-foreground">{coef.label}</span>
                                <span className={coef.value >= 0 ? 'text-primary' : 'text-destructive'}>
                                  {formatPercentage(coef.value)}
                                </span>
                              </div>
                            ))
                          ) : (
                            <p className="text-sm text-muted-foreground text-center py-2">
                              {t('propertyValuator.noCoefficients', 'Nessun coefficiente applicato')}
                            </p>
                          )}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>

                    {/* Zone info */}
                    <div className="p-3 rounded-lg bg-primary/5 border border-primary/10 text-sm">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-4 h-4 text-primary" />
                        <span className="font-medium">{calculation.zone.name}</span>
                      </div>
                      <p className="text-muted-foreground">
                        {t('propertyValuator.variation2024', 'Variazione 2024')}: 
                        <span className="text-primary font-medium ml-1">+{calculation.zone.variation2024}%</span>
                      </p>
                      {calculation.zone.note && (
                        <p className="text-xs text-muted-foreground mt-1">{calculation.zone.note}</p>
                      )}
                    </div>

                    {/* CTA */}
                    <div className="pt-2 space-y-3">
                      <Button 
                        variant="premium" 
                        className="w-full"
                        onClick={handleOpenLeadForm}
                      >
                        <Building2 className="w-4 h-4 mr-2" />
                        {t('propertyValuator.ctaOffer', 'Richiedi offerta gratuita')}
                      </Button>
                      <p className="text-xs text-center text-muted-foreground">
                        {t('propertyValuator.ctaSubtext', 'Valutazione in 24h • Offerta vincolante in 7 giorni')}
                      </p>

                      {/* Post-valuation banner */}
                      <div className="p-3 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 space-y-2">
                        <p className="text-sm font-medium text-foreground">
                          {t('postValuation.title')}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {t('postValuation.description', { value: formatCurrency(calculation.marketPrice) })}
                        </p>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="default" 
                            className="flex-1 text-xs"
                            onClick={() => setIsQuickLeadOpen(true)}
                          >
                            <ArrowRight className="w-3.5 h-3.5 mr-1" />
                            {t('postValuation.cta')}
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="text-xs border-green-500/50 text-green-700 dark:text-green-400 hover:bg-green-500/10"
                            onClick={() => {
                              const msg = t('sellerScenarios.whatsappMessage');
                              openWhatsApp(CONTACTS.lorenzo.phone, msg);
                            }}
                          >
                            <MessageCircle className="w-3.5 h-3.5 mr-1" />
                            WhatsApp
                          </Button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="empty"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-8"
                  >
                    <Info className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                    <p className="text-muted-foreground">
                      {t('propertyValuator.emptyState', 'Seleziona zona e inserisci superficie per calcolare la stima')}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-start gap-2 text-xs text-muted-foreground">
                <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <div className="space-y-1">
                  <p>
                    {t('propertyValuator.disclaimer', 'Questo calcolatore fornisce una stima indicativa basata su dati OMI 2024-2025 e coefficienti FIAIP. Non sostituisce valutazioni professionali di periti certificati.')}
                  </p>
                  <p className="text-xs">
                    {t('propertyValuator.disclaimerHaircut', 'Il prezzo di mercato include un haircut del 15% che riflette la differenza tipica tra valutazioni teoriche e transazioni reali (fonte: osservazioni mercato Torino 2024-2025).')}
                  </p>
                  <p className="text-xs font-medium mt-1">
                    {t('propertyValuator.sources', 'Fonti: OMI Agenzia Entrate, FIAIP Torino Osservatorio 2025, Immobiliare.it, Nomisma, Scenari Immobiliari')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Seller Lead Form with Photos */}
      <SellerLeadFormWithPhotos
        open={isLeadFormOpen}
        onOpenChange={setIsLeadFormOpen}
        source="property-valuator"
        propertyData={{
          zone: zone || undefined,
          sqm: parseInt(sqm) || undefined,
          condition: condition || undefined,
          estimatedValue: calculation?.marketPrice || undefined,
        }}
      />

      {/* Post-valuation Quick Lead Dialog */}
      <QuickSellerLeadDialog
        open={isQuickLeadOpen}
        onOpenChange={setIsQuickLeadOpen}
        source="post-valuation"
        estimatedValue={calculation?.marketPrice}
      />
    </div>
  );
};
