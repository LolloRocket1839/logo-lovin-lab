import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useAnalytics } from "@/hooks/useAnalytics";
import { getUTMParams } from "@/hooks/useUTMTracking";
import { Loader2, ArrowRight, CheckCircle2 } from "lucide-react";
import { FORMSPREE_ENDPOINTS } from "@/constants";
import { cn } from "@/lib/utils";

type QuizStep = "q1" | "q2" | "q3" | "result" | "email";

interface QuizAnswer {
  goal?: string;
  budget?: string;
  timeline?: string;
}

const PROFILES = {
  explorer: { icon: "🧭", key: "explorer" },
  builder: { icon: "🏗️", key: "builder" },
  accelerator: { icon: "🚀", key: "accelerator" },
} as const;

function getProfile(answers: QuizAnswer) {
  if (answers.timeline === "now" && answers.budget === "high") return PROFILES.accelerator;
  if (answers.goal === "passive") return PROFILES.explorer;
  return PROFILES.builder;
}

export const InvestorQuiz = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { trackClick } = useAnalytics();

  const [step, setStep] = useState<QuizStep>("q1");
  const [answers, setAnswers] = useState<QuizAnswer>({});
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const profile = getProfile(answers);

  const handleOption = (key: keyof QuizAnswer, value: string, next: QuizStep) => {
    setAnswers((prev) => ({ ...prev, [key]: value }));
    trackClick("quiz_answer", { question: key, value });
    setStep(next);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      toast({ title: t("quickInvestorLead.errorTitle"), description: t("quickInvestorLead.emailRequired"), variant: "destructive" });
      return;
    }

    setIsSubmitting(true);
    trackClick("quiz_lead_submit", { profile: profile.key, ...answers });

    try {
      const utm = getUTMParams();
      const res = await fetch(FORMSPREE_ENDPOINTS.quickInvestor, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `🎯 QUIZ LEAD [${profile.key}] - ${email.trim()}`,
          email: email.trim(),
          investor_profile: profile.key,
          quiz_answers: answers,
          source: "investor_quiz",
          timestamp: new Date().toISOString(),
          utm_source: utm.utm_source || "",
          utm_medium: utm.utm_medium || "",
          utm_campaign: utm.utm_campaign || "",
        }),
      });

      if (res.ok) {
        setEmail("");
        const thankYouPath = i18n.language === "it" ? "/grazie" : "/thank-you";
        navigate(`${thankYouPath}?type=investor`);
      } else throw new Error("Failed");
    } catch {
      toast({ title: t("quickInvestorLead.errorTitle"), description: t("quickInvestorLead.errorDescription"), variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const progressPct = step === "q1" ? 0 : step === "q2" ? 33 : step === "q3" ? 66 : 100;

  return (
    <section className="py-16 md:py-24 bg-muted/30" id="quiz">
      <div className="container px-4 max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-display font-bold text-center mb-2 text-foreground">
          {t("quiz.title")}
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-8">
          {t("quiz.subtitle")}
        </p>

        {/* Progress bar */}
        <div className="h-1 rounded-full bg-muted mb-8 overflow-hidden">
          <div
            className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* Questions */}
        {step === "q1" && (
          <QuestionCard
            question={t("quiz.q1.question")}
            options={[
              { label: t("quiz.q1.passive"), value: "passive" },
              { label: t("quiz.q1.active"), value: "active" },
              { label: t("quiz.q1.diversify"), value: "diversify" },
            ]}
            onSelect={(v) => handleOption("goal", v, "q2")}
          />
        )}

        {step === "q2" && (
          <QuestionCard
            question={t("quiz.q2.question")}
            options={[
              { label: t("quiz.q2.low"), value: "low" },
              { label: t("quiz.q2.medium"), value: "medium" },
              { label: t("quiz.q2.high"), value: "high" },
            ]}
            onSelect={(v) => handleOption("budget", v, "q3")}
          />
        )}

        {step === "q3" && (
          <QuestionCard
            question={t("quiz.q3.question")}
            options={[
              { label: t("quiz.q3.exploring"), value: "exploring" },
              { label: t("quiz.q3.soon"), value: "soon" },
              { label: t("quiz.q3.now"), value: "now" },
            ]}
            onSelect={(v) => handleOption("timeline", v, "result")}
          />
        )}

        {/* Result */}
        {(step === "result" || step === "email") && (
          <div className="bg-background rounded-2xl border border-border p-6 text-center space-y-4 animate-fade-up">
            <span className="text-4xl">{profile.icon}</span>
            <h3 className="text-lg font-bold text-foreground">
              {t(`quiz.profiles.${profile.key}.title`)}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {t(`quiz.profiles.${profile.key}.description`)}
            </p>

            {step === "result" && (
              <Button
                variant="premium"
                size="lg"
                className="w-full mt-4"
                onClick={() => {
                  trackClick("quiz_see_result_cta");
                  setStep("email");
                }}
              >
                {t("quiz.resultCTA")} <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}

            {step === "email" && (
              <form onSubmit={handleSubmit} className="space-y-3 pt-2">
                <Input
                  type="email"
                  autoComplete="email"
                  placeholder="tuo@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                  autoFocus
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  variant="premium"
                  size="lg"
                  className="w-full h-14 text-base font-semibold"
                >
                  {isSubmitting ? (
                    <><Loader2 className="mr-2 h-5 w-5 animate-spin" />{t("quickInvestorLead.sending")}</>
                  ) : (
                    <><CheckCircle2 className="mr-2 w-5 h-5" />{t("quiz.submitCTA")}</>
                  )}
                </Button>
                <p className="text-xs text-muted-foreground">{t("quickInvestorLead.privacy")}</p>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

function QuestionCard({
  question,
  options,
  onSelect,
}: {
  question: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
}) {
  return (
    <div className="space-y-3 animate-fade-up">
      <h3 className="text-lg font-semibold text-foreground text-center mb-4">{question}</h3>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onSelect(opt.value)}
          className={cn(
            "w-full text-left px-5 py-4 rounded-xl border border-border bg-background",
            "hover:border-primary hover:bg-primary/5 transition-colors duration-200",
            "text-sm font-medium text-foreground"
          )}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export default InvestorQuiz;
