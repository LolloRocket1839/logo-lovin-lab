import { useTranslation } from "react-i18next";
import { Euro, Key, Users, TrendingUp } from "lucide-react";

const steps = [
  { key: "invest", icon: Euro },
  { key: "acquire", icon: Key },
  { key: "rent", icon: Users },
  { key: "win", icon: TrendingUp },
];

export const HowItWorksMobile = () => {
  const { t } = useTranslation();

  return (
    <section className="py-8 bg-background md:hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <span className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-xs uppercase tracking-[0.15em] font-medium mb-2">
            {t("howItWorks.badge")}
          </span>
          <h2 className="text-xl font-display font-bold text-foreground">
            {t("howItWorks.title")}
          </h2>
        </div>

        {/* Compact horizontal scroll cards */}
        <div className="flex gap-3 overflow-x-auto pb-2 snap-x snap-mandatory scrollbar-hide">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.key}
                className="flex-shrink-0 w-[140px] snap-start bg-card border border-border/20 rounded-xl p-4 text-center"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-2">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground text-sm mb-1">
                  {t(`howItWorks.steps.${step.key}.title`)}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {t(`howItWorks.steps.${step.key}.desc`)}
                </p>
              </div>
            );
          })}
        </div>

        {/* Highlight stat */}
        <div className="mt-4 py-4 px-4 bg-primary/5 rounded-xl border border-primary/20 text-center">
          <div className="text-3xl font-bold text-primary mb-1">25%</div>
          <p className="text-sm text-muted-foreground">
            {t("howItWorks.savingHighlight")}
          </p>
        </div>
      </div>
    </section>
  );
};
