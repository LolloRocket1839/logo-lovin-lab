import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, ArrowRight, MessageCircle, Calculator } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { openWhatsApp, CONTACTS, MESSAGES } from "@/constants";

const GROSS_YIELD = 0.0834;
const TAX_RATE = 0.21;
const DEPOSIT_RATE = 0.03;
const BTP_RATE = 0.035;

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

export const YieldCalculator = () => {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("en") ? "en" : "it";
  const [amount, setAmount] = useState(10000);

  const results = useMemo(() => {
    const grossAnnual = amount * GROSS_YIELD;
    const netAnnual = grossAnnual * (1 - TAX_RATE);
    const bimonthly = netAnnual / 6;
    const depositAnnual = amount * DEPOSIT_RATE * (1 - TAX_RATE);
    const btpAnnual = amount * BTP_RATE * (1 - 0.125);
    return { grossAnnual, netAnnual, bimonthly, depositAnnual, btpAnnual };
  }, [amount]);

  const handleWhatsApp = () => {
    const message = MESSAGES.investor.whatsapp[currentLang]("Lorenzo");
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value.replace(/\D/g, ""), 10);
    if (!isNaN(v)) setAmount(Math.min(100000, Math.max(100, v)));
  };

  const maxBar = results.netAnnual;

  return (
    <section className="py-16 md:py-24 bg-muted/30 border-t border-border/20">
      <div className="container px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground mb-4">
            <Calculator className="inline w-4 h-4 mr-1 -mt-0.5" />
            {currentLang === "it" ? "Simulatore" : "Simulator"}
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
            {currentLang === "it" ? "Calcola il tuo rendimento" : "Calculate your yield"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {currentLang === "it"
              ? "Inserisci l'importo e scopri quanto puoi guadagnare con Jungle Rent."
              : "Enter your amount and see how much you can earn with Jungle Rent."}
          </p>
        </div>

        <Card className="max-w-3xl mx-auto p-6 md:p-10 rounded-xl border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          {/* Amount input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              {currentLang === "it" ? "Importo investimento" : "Investment amount"}
            </label>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-3xl md:text-4xl font-bold text-foreground">€</span>
              <input
                type="text"
                value={amount.toLocaleString("it-IT")}
                onChange={handleInputChange}
                className="text-3xl md:text-4xl font-bold text-foreground bg-transparent border-b-2 border-primary/30 focus:border-primary outline-none w-full max-w-[200px] transition-colors"
              />
            </div>
            <Slider
              value={[amount]}
              onValueChange={([v]) => setAmount(v)}
              min={100}
              max={100000}
              step={100}
              className="mt-2"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>€100</span>
              <span>€100.000</span>
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            <AnimatePresence mode="wait">
              {[
                {
                  label: currentLang === "it" ? "Rendimento lordo annuo" : "Gross annual yield",
                  value: results.grossAnnual,
                  rate: "8,34%",
                  color: "text-foreground",
                },
                {
                  label: currentLang === "it" ? "Rendimento netto annuo" : "Net annual yield",
                  value: results.netAnnual,
                  rate: currentLang === "it" ? "dopo cedolare 21%" : "after 21% tax",
                  color: "text-primary",
                },
                {
                  label: currentLang === "it" ? "Payout bimestrale" : "Bi-monthly payout",
                  value: results.bimonthly,
                  rate: currentLang === "it" ? "netto" : "net",
                  color: "text-primary",
                },
              ].map((item) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="p-4 md:p-5 text-center border-border/20 bg-card h-full">
                    <p className="text-xs text-muted-foreground mb-1">{item.label}</p>
                    <motion.p
                      key={item.value}
                      initial={{ opacity: 0.5, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className={`text-2xl md:text-3xl font-bold ${item.color}`}
                    >
                      {formatCurrency(item.value)}
                    </motion.p>
                    <Badge variant="secondary" className="mt-2 text-xs">
                      {item.rate}
                    </Badge>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Comparison bars */}
          <div className="mb-8">
            <p className="text-sm font-medium text-muted-foreground mb-4">
              {currentLang === "it" ? "Confronto rendimento netto annuo" : "Net annual yield comparison"}
            </p>
            <div className="space-y-3">
              {[
                {
                  label: "Jungle Rent",
                  value: results.netAnnual,
                  highlight: true,
                },
                {
                  label: currentLang === "it" ? "BTP (3,5% lordo)" : "Gov. Bonds (3.5% gross)",
                  value: results.btpAnnual,
                  highlight: false,
                },
                {
                  label: currentLang === "it" ? "Conto deposito (3%)" : "Deposit account (3%)",
                  value: results.depositAnnual,
                  highlight: false,
                },
              ].map((bar) => (
                <div key={bar.label}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className={bar.highlight ? "font-semibold text-foreground" : "text-muted-foreground"}>
                      {bar.label}
                    </span>
                    <span className={bar.highlight ? "font-semibold text-primary" : "text-muted-foreground"}>
                      {formatCurrency(bar.value)}
                    </span>
                  </div>
                  <div className="h-3 rounded-full bg-secondary overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full ${bar.highlight ? "bg-primary" : "bg-muted-foreground/30"}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${maxBar > 0 ? (bar.value / maxBar) * 100 : 0}%` }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            {results.netAnnual > results.btpAnnual && (
              <Badge className="mt-3 bg-emerald-500/10 text-emerald-600 border-emerald-500/20">
                <TrendingUp className="w-3 h-3 mr-1" />
                +{formatCurrency(results.netAnnual - results.btpAnnual)}{" "}
                {currentLang === "it" ? "vs BTP" : "vs Gov. Bonds"}
              </Badge>
            )}
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center mb-6 italic">
            {currentLang === "it"
              ? "Stime basate su dati di mercato. I rendimenti passati non garantiscono risultati futuri."
              : "Estimates based on market data. Past returns do not guarantee future results."}
          </p>

          {/* CTA */}
          <div className="text-center">
            <Button onClick={handleWhatsApp} size="lg" variant="premium" className="px-8 py-6 text-lg group shadow-xl">
              <MessageCircle className="mr-2 w-5 h-5" />
              {currentLang === "it" ? "Parla con Lorenzo" : "Talk to Lorenzo"}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};
