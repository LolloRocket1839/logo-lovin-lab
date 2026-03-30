import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  RefreshCw, 
  PiggyBank, 
  Home, 
  AlertTriangle,
  BookOpen,
  Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";

interface BudgetAdvice {
  summary: string;
  tips: Array<{
    type: "savings" | "alternative" | "warning";
    text: string;
  }>;
  relatedArticles: Array<{
    slug: string;
    title: string;
  }>;
}

interface AIBudgetAdvisorProps {
  selectedArea: string;
  housingType: string;
  totalBudget: number;
  breakdown: {
    affitto: number;
    bollette: number;
    trasporti: number;
    spesa: number;
    extra: number;
  };
  language: "it" | "en";
  savingTarget?: number;
}

const tipIcons = {
  savings: { icon: PiggyBank, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  alternative: { icon: Home, color: "text-blue-500", bg: "bg-blue-500/10" },
  warning: { icon: AlertTriangle, color: "text-amber-500", bg: "bg-amber-500/10" }
};

export const AIBudgetAdvisor = ({
  selectedArea,
  housingType,
  totalBudget,
  breakdown,
  language,
  savingTarget = 0
}: AIBudgetAdvisorProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [advice, setAdvice] = useState<BudgetAdvice | null>(null);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzebudget = async () => {
    setIsLoading(true);
    setAdvice(null);
    setError(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/budget-advisor`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
          },
          body: JSON.stringify({
            selectedArea,
            housingType,
            totalBudget,
            breakdown,
            language,
            savingTarget
          }),
        }
      );

      if (!response.ok) {
        let errorData: { message?: string } = {};
        try {
          errorData = await response.json();
        } catch {
          // Non-JSON response (e.g. HTML 500 error page)
        }
        if (response.status === 429) {
          const msg = language === "it" 
            ? "Troppi tentativi. Riprova tra qualche minuto." 
            : "Too many requests. Please try again later.";
          setError(msg);
          return;
        }
        if (response.status === 402) {
          const msg = language === "it"
            ? "Servizio temporaneamente non disponibile."
            : "Service temporarily unavailable.";
          setError(msg);
          return;
        }
        throw new Error(errorData.message || "Failed to analyze budget");
      }

      let data: BudgetAdvice;
      try {
        data = await response.json();
      } catch {
        throw new Error("Invalid response format");
      }
      setAdvice(data);
      setHasAnalyzed(true);
    } catch (err) {
      console.error("Error analyzing budget:", err);
      setError(language === "it" 
        ? "Errore durante l'analisi. Riprova." 
        : "Error during analysis. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="border-primary/20 overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardTitle className="flex items-center gap-2 text-lg">
          <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-primary" />
          </div>
          {language === "it" ? "Consulente AI Budget" : "AI Budget Advisor"}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <AnimatePresence mode="wait">
          {!hasAnalyzed && !isLoading && (
            <motion.div
              key="cta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="text-center py-4"
            >
              <p className="text-muted-foreground text-sm mb-4">
                {language === "it" 
                  ? "Ottieni consigli personalizzati per risparmiare a Torino" 
                  : "Get personalized tips to save money in Turin"}
              </p>
              <Button 
                onClick={analyzebudget}
                className="gap-2"
                size="lg"
              >
                <Sparkles className="w-4 h-4" />
                {language === "it" ? "Analizza il mio budget" : "Analyze my budget"}
              </Button>
            </motion.div>
          )}

          {isLoading && (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-8"
            >
              <div className="inline-flex items-center gap-3 text-muted-foreground">
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>{language === "it" ? "Analizzo il tuo budget..." : "Analyzing your budget..."}</span>
              </div>
            </motion.div>
          )}

          {advice && !isLoading && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {/* Summary */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="p-4 bg-primary/5 rounded-lg border border-primary/10"
              >
                <p className="text-foreground leading-relaxed">
                  💡 {advice.summary}
                </p>
              </motion.div>

              {/* Tips */}
              <div className="space-y-2">
                {advice.tips.map((tip, index) => {
                  const { icon: Icon, color, bg } = tipIcons[tip.type];
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg"
                    >
                      <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                      <p className="text-sm text-foreground leading-relaxed pt-1">
                        {tip.text}
                      </p>
                    </motion.div>
                  );
                })}
              </div>

              {/* Related Articles */}
              {advice.relatedArticles && advice.relatedArticles.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="pt-2"
                >
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm font-medium text-muted-foreground">
                      {language === "it" ? "Approfondisci:" : "Learn more:"}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {advice.relatedArticles.map((article, index) => (
                      <Link
                        key={index}
                        to={`/blog/${article.slug}`}
                        className="text-sm text-primary hover:underline bg-primary/5 px-3 py-1.5 rounded-full hover:bg-primary/10 transition-colors"
                      >
                        {article.title}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Regenerate Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-2 text-center"
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={analyzebudget}
                  className="gap-2 text-muted-foreground"
                >
                  <RefreshCw className="w-3 h-3" />
                  {language === "it" ? "Rigenera consigli" : "Regenerate tips"}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
};
