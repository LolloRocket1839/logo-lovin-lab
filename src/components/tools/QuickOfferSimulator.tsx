import { useState, useMemo, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, Check, Clock, MapPin, Zap, CheckCircle, Info, MessageCircle, RotateCcw } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
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
import { useLeadCapture } from "@/hooks/useLeadCapture";
import { FORMSPREE_ENDPOINTS } from "@/constants";
import { CONTACTS, openWhatsApp } from "@/constants/contacts";
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

const LOCAL_STORAGE_KEY = "seller_simulator_draft";

type PropertyCondition = "to_renovate" | "good" | "renovated";

interface SimulatorDraft {
  zone: string;
  sqm: number;
  condition: PropertyCondition;
  email?: string;
  submitted?: boolean;
}

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
  const { trackClick, trackEvent } = useAnalytics();
  const { submitLead, isSubmitting: isLeadSubmitting } = useLeadCapture();

  const [zone, setZone] = useState("");
  const [sqm, setSqm] = useState(55);
  const [condition, setCondition] = useState<PropertyCondition>("good");
  const [email, setEmail] = useState("");
  const [isEmailSaved, setIsEmailSaved] = useState(false);
  const [showRecovery, setShowRecovery] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

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

  const isFormComplete = !!(zone && effectiveSqm >= MIN_SQM);

  // Load saved draft on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (!raw) return;
      const draft: SimulatorDraft = JSON.parse(raw);
      if (draft.zone) {
        setZone(draft.zone);
        setSqm(draft.sqm ?? 55);
        setCondition(draft.condition ?? "good");
        if (draft.email && !draft.submitted) {
          setEmail(draft.email);
          setShowRecovery(true);
        }
        if (draft.submitted) {
          setIsEmailSaved(true);
        }
      }
    } catch {
      // ignore parse errors
    }
  }, []);

  // Persist draft whenever inputs change
  useEffect(() => {
    if (!zone) return;
    const draft: SimulatorDraft = {
      zone,
      sqm: effectiveSqm,
      condition,
      email: email || undefined,
      submitted: isEmailSaved,
    };
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(draft));
    } catch {
      // ignore storage errors
    }
  }, [zone, effectiveSqm, condition, email, isEmailSaved]);

  // Track simulator started when user picks a zone
  useEffect(() => {
    if (zone && !hasStarted) {
      setHasStarted(true);
      trackEvent("simulator_started", { zone });
    }
  }, [zone, hasStarted, trackEvent]);

  // Track completed when result becomes visible (once per complete state change)
  useEffect(() => {
    if (isFormComplete && calculation) {
      trackEvent("simulator_completed", {
        zone,
        sqm: effectiveSqm,
        condition,
        qualified: calculation.isQualified,
      });
    }
  }, [isFormComplete]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleZoneChange = (v: string) => {
    setZone(v);
    setIsEmailSaved(false);
    setShowRecovery(false);
  };

  const handleSqmChange = ([val]: number[]) => {
    setSqm(val);
    setIsEmailSaved(false);
  };

  const handleConditionChange = (c: PropertyCondition) => {
    setCondition(c);
    setIsEmailSaved(false);
  };

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast({ title: t("quickSellerLead.errorTitle"), description: t("quickSellerLead.invalidEmail"), variant: "destructive" });
      return;
    }

    trackClick("simulator_email_saved", {
      zone,
      sqm: effectiveSqm,
      condition,
      email: email.trim(),
      qualified: calculation?.isQualified,
    });

    const metadata: Record<string, unknown> = {
      zone,
      sqm: effectiveSqm,
      condition,
      qualified: calculation?.isQualified ?? null,
      estimated_low: calculation ? calculation.internalPrice * 0.95 : null,
      estimated_high: calculation ? calculation.internalPrice * 1.05 : null,
    };

    const result = await submitLead(
      {
        email: email.trim(),
        source: "offer_simulator",
        leadType: "seller",
        metadata,
      },
      {
        endpoint: FORMSPREE_ENDPOINTS.quickSeller,
        subject: `🏠 OFFER SIMULATOR - ${email.trim()} - ${zone} ${effectiveSqm}mq`,
        extraFields: {
          zone,
          sqm: effectiveSqm,
          condition,
          internal_estimated_price: calculation ? formatCurrency(calculation.internalPrice) : "N/A",
          qualified: calculation?.isQualified ? "YES" : "NO",
        },
      }
    );

    if (result.success) {
      setIsEmailSaved(true);
      try {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify({ zone, sqm: effectiveSqm, condition, email: email.trim(), submitted: true })
        );
      } catch {
        // ignore
      }
    } else {
      toast({ title: t("quickSellerLead.errorTitle"), description: t("quickSellerLead.errorDescription"), variant: "destructive" });
    }
  };

  const handleWhatsAppClick = () => {
    trackClick("simulator_whatsapp_click", { zone, sqm: effectiveSqm, condition });
    const message = t("offerSimulator.whatsappMessage", "Ciao Lorenzo, ho fatto una stima sul vostro sito per un immobile in {{zone}} di {{sqm}}mq. Possiamo parlarne?", { zone: calculation?.zoneData?.name ?? zone, sqm: effectiveSqm });
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  const handleDismissRecovery = () => {
    setShowRecovery(false);
  };

  const handleReset = () => {
    setZone("");
    setSqm(55);
    setCondition("good");
    setEmail("");
    setIsEmailSaved(false);
    setShowRecovery(false);
    setHasStarted(false);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
    } catch {
      // ignore
    }
  };

  const conditionOptions: { key: PropertyCondition; labelKey: string }[] = [
    { key: "to_renovate", labelKey: "offerSimulator.conditionToRenovate" },
    { key: "good", labelKey: "offerSimulator.conditionGood" },
    { key: "renovated", labelKey: "offerSimulator.conditionRenovated" },
  ];

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

        {/* Recovery prompt for returning users */}
        <AnimatePresence>
          {showRecovery && !isEmailSaved && (
            <motion.div
              key="recovery"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/30 text-sm"
            >
              <div className="flex items-start justify-between gap-3">
                <p className="text-amber-800 dark:text-amber-200">
                  {t("offerSimulator.recoveryText", "Hai già iniziato una valutazione. Completa l'email per ricevere l'offerta.")}
                </p>
                <button
                  type="button"
                  onClick={handleDismissRecovery}
                  className="text-amber-700 dark:text-amber-300 hover:opacity-70 shrink-0"
                  aria-label={t("common.close", "Chiudi")}
                >
                  ×
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Zone Select */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5">
            <Label className="text-sm font-medium">{t("offerSimulator.zoneLabel")}</Label>
            <TooltipProvider delayDuration={200}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[240px] text-xs">
                  {t("offerSimulator.zoneTooltip")}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Select value={zone} onValueChange={handleZoneChange}>
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
          {zone && calculation?.zoneData && (
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <Info className="w-3 h-3 shrink-0" />
              {t("offerSimulator.zoneContext", { zone: calculation.zoneData.name, price: calculation.zoneData.avgPrice.toLocaleString("it-IT") })}
            </p>
          )}
        </div>

        {/* SQM Slider */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            {t("offerSimulator.sqmLabel")}: <span className="text-primary font-bold">{effectiveSqm} mq</span>
          </Label>
          <Slider
            value={[effectiveSqm]}
            onValueChange={handleSqmChange}
            min={MIN_SQM}
            max={sliderMax}
            step={5}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{MIN_SQM} mq</span>
            <span>{sliderMax} mq</span>
          </div>
          {effectiveSqm < MIN_SQM && (
            <p className="text-xs text-destructive flex items-center gap-1">
              <Info className="w-3 h-3" />
              {t("offerSimulator.minSqmWarning", `Minimo ${MIN_SQM} mq richiesti`)}
            </p>
          )}
        </div>

        {/* Condition */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">{t("offerSimulator.conditionLabel")}</Label>
          <div className="grid grid-cols-3 gap-2">
            {conditionOptions.map(({ key, labelKey }) => (
              <Button
                key={key}
                variant={condition === key ? "default" : "outline"}
                size="sm"
                onClick={() => handleConditionChange(key)}
                className="text-xs"
              >
                {t(labelKey)}
              </Button>
            ))}
          </div>
        </div>

        {/* Result + email gate */}
        <AnimatePresence mode="wait">
          {isFormComplete && calculation && (
            <motion.div
              key={isEmailSaved ? "success" : "result"}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-4"
            >
              {isEmailSaved ? (
                <div className="p-4 rounded-lg bg-green-500/10 border-2 border-green-500/30 text-center space-y-3">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                  <p className="text-base font-bold text-green-800 dark:text-green-200">
                    {t("offerSimulator.emailSavedTitle", "Offerta inviata!")}
                  </p>
                  <p className="text-sm text-green-700 dark:text-green-300">
                    {t("offerSimulator.emailSavedDescription", "Controlla la tua email. Ti rispondiamo entro 24 ore.")}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                    <Button onClick={onContactClick} variant="premium" className="h-11 text-sm font-semibold">
                      {t("offerSimulator.qualifiedCta")}
                    </Button>
                    <Button onClick={handleWhatsAppClick} variant="outline" className="h-11 text-sm font-semibold">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {t("offerSimulator.whatsappCta")}
                    </Button>
                  </div>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-muted-foreground hover:text-foreground inline-flex items-center gap-1 mt-2"
                  >
                    <RotateCcw className="w-3 h-3" />
                    {t("offerSimulator.reset", "Nuova valutazione")}
                  </button>
                </div>
              ) : (
                <>
                  {calculation.isQualified ? (
                    <div className="p-4 rounded-lg bg-green-500/10 border-2 border-green-500/30 text-center space-y-3">
                      <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
                      <p className="text-base font-bold text-green-800 dark:text-green-200">
                        {t("offerSimulator.qualifiedTitle")}
                      </p>
                      <p className="text-sm text-green-700 dark:text-green-300">
                        {t("offerSimulator.qualifiedDescription")}
                      </p>
                      <div className="py-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {t("offerSimulator.estimatedRangeLabel", "Stima intervallo offerta")}
                        </p>
                        <p className="text-2xl font-display font-bold text-foreground">
                          {formatCurrency(calculation.internalPrice * 0.95)} — {formatCurrency(calculation.internalPrice * 1.05)}
                        </p>
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
                      <div className="py-2">
                        <p className="text-xs text-muted-foreground uppercase tracking-wide">
                          {t("offerSimulator.estimatedRangeLabel", "Stima valore di mercato")}
                        </p>
                        <p className="text-2xl font-display font-bold text-foreground">
                          {formatCurrency(calculation.internalPrice * 0.95)} — {formatCurrency(calculation.internalPrice * 1.05)}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Email gate */}
                  <form onSubmit={handleEmailSubmit} className="space-y-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
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
                      <Button type="submit" disabled={isLeadSubmitting} className="h-11 px-4 shrink-0">
                        {isLeadSubmitting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Send className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-[10px] text-center text-muted-foreground">
                      {t("offerSimulator.emailGateHint", "Ricevi l'offerta per email in 24h. Zero spam.")}
                    </p>
                  </form>

                  {/* WhatsApp alternative */}
                  <Button
                    onClick={handleWhatsAppClick}
                    variant="outline"
                    className="w-full h-11 text-sm font-semibold"
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    {t("offerSimulator.whatsappCta")}
                  </Button>
                </>
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
