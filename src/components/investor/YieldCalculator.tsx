import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Calculator } from "lucide-react";
import { openWhatsApp, CONTACTS, MESSAGES } from "@/constants";

const formatCurrency = (v: number) =>
  new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(v);

export const YieldCalculator = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language.startsWith("en") ? "en" : "it";
  const [amount, setAmount] = useState(10000);

  const handleWhatsApp = () => {
    const base = MESSAGES.investor.whatsapp[currentLang]("Lorenzo");
    const ctx = currentLang === "it"
      ? ` Sto valutando un capitale indicativo di ${formatCurrency(amount)} e vorrei ricevere una proiezione personalizzata sulla prossima operazione.`
      : ` I am considering an indicative capital of ${formatCurrency(amount)} and would like a personalized projection for the next operation.`;
    openWhatsApp(CONTACTS.lorenzo.phone, base + ctx);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = parseInt(e.target.value.replace(/\D/g, ""), 10);
    if (!isNaN(v)) setAmount(Math.min(100000, Math.max(100, v)));
  };

  return (
    <section className="py-16 md:py-24 bg-muted/30 border-t border-border/20">
      <div className="container px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground mb-4">
            <Calculator className="inline w-4 h-4 mr-1 -mt-0.5" />
            {currentLang === "it" ? "Simulatore esplorativo" : "Exploratory simulator"}
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-foreground">
            {currentLang === "it" ? "Quanto vorresti investire?" : "How much would you like to invest?"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {currentLang === "it"
              ? "Indica un capitale indicativo: Lorenzo ti preparerà una proiezione personalizzata sulla prossima operazione disponibile."
              : "Pick an indicative capital: Lorenzo will prepare a personalized projection for the next available operation."}
          </p>
        </div>

        <Card className="max-w-3xl mx-auto p-6 md:p-10 rounded-xl border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          {/* Amount input */}
          <div className="mb-8">
            <label className="block text-sm font-medium text-muted-foreground mb-3">
              {currentLang === "it" ? "Importo indicativo" : "Indicative amount"}
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

          {/* Qualitative panel — no return figures */}
          <div className="mb-8 rounded-lg border border-border/40 bg-background/60 p-5 md:p-6">
            <p className="text-sm md:text-base text-foreground leading-relaxed">
              {currentLang === "it"
                ? "Il rendimento potenziale dipende dalla singola operazione immobiliare. Non comunichiamo cifre o percentuali pubblicamente: condividiamo la proiezione di ritorno, basata sui dati reali della specifica operazione, nel memorandum informativo dopo un primo colloquio."
                : "The potential return depends on each individual real estate operation. We do not publish figures or percentages: we share the return projection, based on the actual data of the specific operation, in the information memorandum after an initial conversation."}
            </p>
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center mb-6 italic">
            {currentLang === "it"
              ? "Strumento esplorativo, non costituisce sollecitazione all'investimento. Ogni operazione comporta rischi, inclusa la possibile perdita del capitale."
              : "Exploratory tool, not an investment solicitation. Every operation entails risks, including possible loss of capital."}
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
