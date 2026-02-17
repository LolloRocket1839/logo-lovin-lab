import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Check, Clock, MapPin, Zap, CheckCircle, Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { getUTMParams } from "@/hooks/useUTMTracking";
import { FORMSPREE_ENDPOINTS } from "@/constants";
import { getZoneById } from "@/data/turinZonePrices";

// Internal budget cap – never shown to user
const MAX_BUDGET = 130_000;
const DISCOUNT = 0.70;

// Zone criteria: maxSqm derived from floor(130000 / (avgPrice * 0.70))
const ZONE_CRITERIA: Record<string, { maxSqm: number }> = {
  aurora:        { maxSqm: 120 },
  lingotto:      { maxSqm: 110 },
  santa_rita:    { maxSqm: 105 },
  cenisia:       { maxSqm: 95 },
  zona_ospedali: { maxSqm: 90 },
  cit_turin:     { maxSqm: 75 },
  campidoglio:   { maxSqm: 75 },
  vanchiglia:    { maxSqm: 70 },
  san_salvario:  { maxSqm: 65 },
  crocetta:      { maxSqm: 60 },
};

const TARGET_ZONES = Object.keys(ZONE_CRITERIA);

const MIN_SQM = 35;

type PropertyCondition = "to_renovate" | "good" | "renovated";

const formatCurrency = (value: number): string =>
  new Intl.NumberFormat("it-IT", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);

interface QuickOfferSimulatorProps {
  onContactClick?: () => void;
}

export const QuickOfferSimulator = ({ onContactClick }: QuickOfferSimulatorProps) => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const { trackClick } = useAnalytics();

  const [zone, setZone] = useState("");
  const [sqm, setSqm] = useState(55);
  const [condition, setCondition] = useState<PropertyCondition>("good");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const zoneCriteria = ZONE_CRITERIA[zone];
  const sliderMax = zoneCriteria?.maxSqm ?? 120;

  // Clamp sqm when zone changes
  const effectiveSqm = Math.min(sqm, sliderMax);

  const calculation = useMemo(() => {
    const zoneData = getZoneById(zone);
    if (!zoneData || effectiveSqm <= 0 || !zoneCriteria) return null;

    const internalPrice = effectiveSqm * zoneData.avgPrice * DISCOUNT;
    const isQualified = internalPrice <= MAX_BUDGET && effectiveSqm <= zoneCriteria.maxSqm;

    return { zoneData, internalPrice, isQualified };
  }, [zone, effectiveSqm, zoneCriteria]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast({ title: t("quickSellerLead.errorTitle"), description: t("quickSellerLead.invalidEmail"), variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    trackClick("offer_simulator_email_gate", { zone, sqm: effectiveSqm, condition, email: email.trim() });

    try {
      const utmParams = getUTMParams();
      const response = await fetch(FORMSPREE_ENDPOINTS.quickSeller, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `🏠 OFFER SIMULATOR - ${email.trim()} - ${zone} ${effectiveSqm}mq`,
          email: email.trim(),
          source: "offer_simulator",
          zone,
          sqm: effectiveSqm,
          condition,
          // Internal price for the team – never shown to user
          internal_estimated_price: calculation ? formatCurrency(calculation.internalPrice) : "N/A",
          qualified: calculation?.isQualified ? "YES" : "NO",
          timestamp: new Date().toISOString(),
          ...utmParams,
        }),
      });

      if (response.ok) {
        setIsUnlocked(true);
      } else {
        throw new Error("Submission failed");
      }
    } catch {
      toast({ title: t("quickSellerLead.errorTitle"), description: t("quickSellerLead.errorDescription"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isFormComplete = zone && effectiveSqm >= MIN_SQM;

  return (
    <Card className="border-2 border-primary/30 bg-gradient-to-br from-background via-background to-primary/5 shadow-lg">
      <CardContent className="p-5 md:p-6 space-y-5">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            {t("offerSimulator.subtitle")}
          </div>
          <h3 className="text-lg md:text-xl font-display font-bold text-foreground">
            {t("offerSimulator.title")}
          </h3>
        </div>

        {/* Zone Select */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("offerSimulator.zoneLabel")}</Label>
          <Select value={zone} onValueChange={(v) => { setZone(v); setIsUnlocked(false); }}>
            <SelectTrigger>
              <SelectValue placeholder={t("offerSimulator.zonePlaceholder")} />
            </SelectTrigger>
            <SelectContent>
              {TARGET_ZONES.map((zId) => {
                const z = getZoneById(zId);
                if (!z) return null;
                return (
                  <SelectItem key={zId} value={zId}>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {z.name}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* SQM Slider */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            {t("offerSimulator.sqmLabel")}: <span className="text-primary font-bold">{effectiveSqm} mq</span>
          </Label>
          <Slider
            value={[effectiveSqm]}
            onValueChange={([val]) => { setSqm(val); setIsUnlocked(false); }}
            min={MIN_SQM}
            max={sliderMax}
            step={5}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{MIN_SQM} mq</span>
            <span>{sliderMax} mq</span>
          </div>
        </div>

        {/* Condition */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("offerSimulator.conditionLabel")}</Label>
          <div className="grid grid-cols-3 gap-2">
            {(["to_renovate", "good", "renovated"] as PropertyCondition[]).map((c) => (
              <Button
                key={c}
                variant={condition === c ? "default" : "outline"}
                size="sm"
                onClick={() => { setCondition(c); setIsUnlocked(false); }}
                className="text-xs"
              >
                {t(`offerSimulator.condition${c === "to_renovate" ? "ToRenovate" : c === "good" ? "Good" : "Renovated"}`)}
              </Button>
            ))}
          </div>
        </div>

        {/* Email Gate / Result */}
        <AnimatePresence mode="wait">
          {isFormComplete && !isUnlocked && (
            <motion.form
              key="email-gate"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              onSubmit={handleEmailSubmit}
              className="space-y-3 p-4 rounded-lg bg-primary/5 border border-primary/20"
            >
              <p className="text-sm font-medium text-center text-foreground">
                {t("offerSimulator.emailGateTitle")}
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder={t("offerSimulator.emailGatePlaceholder")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11"
                  required
                />
                <Button type="submit" disabled={isSubmitting} className="h-11 px-4 shrink-0">
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </motion.form>
          )}

          {isFormComplete && isUnlocked && calculation && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {calculation.isQualified ? (
                <div className="p-4 rounded-lg bg-green-500/10 border-2 border-green-500/30 text-center space-y-3">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                  <p className="text-base font-bold text-green-800 dark:text-green-200">
                    {t("offerSimulator.qualifiedTitle")}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {t("offerSimulator.qualifiedDescription")}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-primary" />
                      {t("offerSimulator.speed")}
                    </span>
                    <span className="flex items-center gap-1">
                      <Check className="w-3.5 h-3.5 text-primary" />
                      {t("offerSimulator.noFees")}
                    </span>
                  </div>
                  <Button onClick={onContactClick} variant="premium" className="w-full h-12 text-sm font-semibold">
                    {t("offerSimulator.qualifiedCta")}
                  </Button>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-amber-500/10 border-2 border-amber-500/30 text-center space-y-3">
                  <Info className="w-8 h-8 text-amber-600 mx-auto" />
                  <p className="text-base font-bold text-amber-800 dark:text-amber-200">
                    {t("offerSimulator.notQualifiedTitle")}
                  </p>
                  <p className="text-sm text-amber-700 dark:text-amber-300">
                    {t("offerSimulator.notQualifiedDescription")}
                  </p>
                  <Button onClick={onContactClick} className="w-full h-12 text-sm font-semibold bg-amber-600 hover:bg-amber-700 text-white">
                    {t("offerSimulator.notQualifiedCta")}
                  </Button>
                </div>
              )}
              <p className="text-[10px] text-center text-muted-foreground">
                {t("offerSimulator.disclaimer")}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
