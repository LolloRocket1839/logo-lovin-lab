import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Send, Loader2, Check, Clock, MapPin, Zap } from "lucide-react";
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
import { getZoneById, type ZonePrice } from "@/data/turinZonePrices";

// 9 target zones for Jungle Rent acquisitions
const TARGET_ZONES = [
  "san_salvario",
  "vanchiglia",
  "aurora",
  "santa_rita",
  "cit_turin",
  "campidoglio",
  "cenisia",
  "lingotto",
  "crocetta",
];

type PropertyCondition = "to_renovate" | "good" | "renovated";

const CONDITION_DISCOUNTS: Record<PropertyCondition, { min: number; max: number } | null> = {
  to_renovate: null, // requires custom evaluation
  good: { min: 0.06, max: 0.10 },
  renovated: { min: 0.03, max: 0.06 },
};

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
  const [sqm, setSqm] = useState(70);
  const [condition, setCondition] = useState<PropertyCondition>("good");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);

  const calculation = useMemo(() => {
    const zoneData = getZoneById(zone);
    if (!zoneData || sqm <= 0) return null;

    const MARKET_HAIRCUT = 0.15;
    const marketPrice = sqm * zoneData.avgPrice * (1 - MARKET_HAIRCUT);
    const discounts = CONDITION_DISCOUNTS[condition];

    if (!discounts) {
      return { zoneData, marketPrice, requiresCustom: true as const, offerMin: 0, offerMax: 0 };
    }

    const offerMin = marketPrice * (1 - discounts.max);
    const offerMax = marketPrice * (1 - discounts.min);
    return { zoneData, marketPrice, requiresCustom: false as const, offerMin, offerMax };
  }, [zone, sqm, condition]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast({ title: t("quickSellerLead.errorTitle"), description: t("quickSellerLead.invalidEmail"), variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    trackClick("offer_simulator_email_gate", { zone, sqm, condition, email: email.trim() });

    try {
      const utmParams = getUTMParams();
      const response = await fetch(FORMSPREE_ENDPOINTS.quickSeller, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `🏠 OFFER SIMULATOR - ${email.trim()} - ${zone} ${sqm}mq`,
          email: email.trim(),
          source: "offer_simulator",
          zone,
          sqm,
          condition,
          estimated_offer: calculation && !calculation.requiresCustom
            ? `${formatCurrency(calculation.offerMin)} - ${formatCurrency(calculation.offerMax)}`
            : "Valutazione ad hoc",
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

  const isFormComplete = zone && sqm > 0;

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
          <Select value={zone} onValueChange={setZone}>
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
            {t("offerSimulator.sqmLabel")}: <span className="text-primary font-bold">{sqm} mq</span>
          </Label>
          <Slider
            value={[sqm]}
            onValueChange={([val]) => setSqm(val)}
            min={30}
            max={150}
            step={5}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>30 mq</span>
            <span>150 mq</span>
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
                onClick={() => setCondition(c)}
                className="text-xs"
              >
                {t(`offerSimulator.condition${c === "to_renovate" ? "ToRenovate" : c === "good" ? "Good" : "Renovated"}`)}
              </Button>
            ))}
          </div>
        </div>

        {/* Result / Email Gate */}
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
              {calculation.requiresCustom ? (
                <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center space-y-3">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    {t("offerSimulator.customEvaluation")}
                  </p>
                  <Button onClick={onContactClick} className="w-full bg-amber-600 hover:bg-amber-700 text-white">
                    <Building2 className="w-4 h-4 mr-2" />
                    {t("offerSimulator.customEvaluationCta")}
                  </Button>
                </div>
              ) : (
                <div className="p-4 rounded-lg bg-primary/10 border-2 border-primary/30 text-center space-y-3">
                  <p className="text-xs text-muted-foreground">
                    {t("offerSimulator.resultDescription", { sqm, zone: calculation.zoneData.name })}
                  </p>
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {formatCurrency(calculation.offerMin)} — {formatCurrency(calculation.offerMax)}
                  </div>
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
                    {t("offerSimulator.concreteOfferCta")}
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
