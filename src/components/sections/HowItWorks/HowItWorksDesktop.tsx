import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Euro, Key, Users, TrendingUp, PiggyBank, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { QuickInvestorLeadDialog } from "@/components/dialogs/QuickInvestorLeadDialog";
import { WaitlistDialog } from "@/components/dialogs/WaitlistDialog";
import { useHasBeenSeen } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const steps = [
  { key: "invest", icon: Euro },
  { key: "acquire", icon: Key },
  { key: "rent", icon: Users },
  { key: "win", icon: TrendingUp },
];

export const HowItWorksDesktop = () => {
  const { t } = useTranslation();
  const [investorDialogOpen, setInvestorDialogOpen] = useState(false);
  const [studentDialogOpen, setStudentDialogOpen] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const hasBeenSeen = useHasBeenSeen(sectionRef, 0.15);
  const prefersReducedMotion = useReducedMotion();

  return (
    <section 
      ref={sectionRef}
      id="how-it-works" 
      className="py-16 md:py-24 bg-background section-fade-top" 
      aria-labelledby="how-it-works-title"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 md:mb-16 ${
            hasBeenSeen && !prefersReducedMotion ? 'animate-fade-up' : ''
          }`}
          style={{ opacity: prefersReducedMotion ? 1 : hasBeenSeen ? undefined : 0 }}
        >
          <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-xs uppercase tracking-[0.15em] font-medium mb-4">
            {t("howItWorks.badge")}
          </span>
          <h2 id="how-it-works-title" className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            {t("howItWorks.title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("howItWorks.subtitle")}
          </p>
        </div>

        {/* 4-Step Flow - CSS stagger */}
        <div className="mb-16">
          <div className="flex items-center justify-center gap-2 lg:gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              
              return (
                <div
                  key={step.key}
                  className={`flex items-center ${
                    hasBeenSeen && !prefersReducedMotion ? 'animate-fade-up' : ''
                  }`}
                  style={{
                    opacity: prefersReducedMotion ? 1 : hasBeenSeen ? undefined : 0,
                    animationDelay: prefersReducedMotion ? '0ms' : `${index * 80}ms`
                  }}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-14 h-14 lg:w-16 lg:h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-3 border-2 border-primary/20">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground text-sm lg:text-base mb-1">
                      {t(`howItWorks.steps.${step.key}.title`)}
                    </h3>
                    <p className="text-xs lg:text-sm text-muted-foreground text-center max-w-[140px] lg:max-w-[160px]">
                      {t(`howItWorks.steps.${step.key}.desc`)}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <ArrowRight className="w-4 h-4 text-primary/30 mx-2 lg:mx-4 flex-shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Dual Value Boxes */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {/* Investors Box */}
          <div
            className={`bg-card border border-border/20 rounded-xl p-6 lg:p-8 shadow-sm ${
              hasBeenSeen && !prefersReducedMotion ? 'animate-fade-up stagger-2' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasBeenSeen ? undefined : 0 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {t("howItWorks.investors.title")}
              </h3>
            </div>
            <ul className="space-y-3">
              {["point1", "point2", "point3", "point4"].map((point) => (
              <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">
                    {t(`howItWorks.investors.${point}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Students Box */}
          <div
            className={`bg-card border border-border/20 rounded-xl p-6 lg:p-8 shadow-sm ${
              hasBeenSeen && !prefersReducedMotion ? 'animate-fade-up stagger-3' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasBeenSeen ? undefined : 0 }}
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <PiggyBank className="w-6 h-6 text-accent-foreground" />
              </div>
              <h3 className="text-xl font-bold text-foreground">
                {t("howItWorks.students.title")}
              </h3>
            </div>
            <ul className="space-y-3">
              {["point1", "point2", "point3"].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className={point === "point1" ? "text-foreground font-semibold" : "text-muted-foreground"}>
                    {t(`howItWorks.students.${point}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Central Stat Highlight */}
        <div
          className={`text-center mb-12 py-8 px-6 bg-primary/5 rounded-xl border border-primary/20 ${
            hasBeenSeen && !prefersReducedMotion ? 'animate-fade-up stagger-4' : ''
          }`}
          style={{ opacity: prefersReducedMotion ? 1 : hasBeenSeen ? undefined : 0 }}
        >
          <div className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary mb-2">
            25%
          </div>
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto">
            {t("howItWorks.savingHighlight")}
          </p>
        </div>

        {/* Dual CTAs */}
        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 ${
            hasBeenSeen && !prefersReducedMotion ? 'animate-fade-up stagger-5' : ''
          }`}
          style={{ opacity: prefersReducedMotion ? 1 : hasBeenSeen ? undefined : 0 }}
        >
          <Button
            size="lg"
            variant="premium"
            onClick={() => setInvestorDialogOpen(true)}
            className="min-w-[200px]"
          >
            {t("howItWorks.ctaInvest")}
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => setStudentDialogOpen(true)}
            className="min-w-[200px]"
          >
            {t("howItWorks.ctaRent")}
          </Button>
        </div>

        <QuickInvestorLeadDialog 
          open={investorDialogOpen} 
          onOpenChange={setInvestorDialogOpen}
          source="how_it_works_cta"
        />
        <WaitlistDialog 
          open={studentDialogOpen} 
          onOpenChange={setStudentDialogOpen}
        />
      </div>
    </section>
  );
};
