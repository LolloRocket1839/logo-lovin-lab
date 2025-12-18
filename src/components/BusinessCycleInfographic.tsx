import { Building2, GraduationCap, Wrench, TrendingUp, ArrowRight, ArrowDown, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";

const BusinessCycleInfographic = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const steps = [
    {
      icon: Building2,
      titleKey: "about.cycle.step1Title",
      descKey: "about.cycle.step1Desc",
      color: "bg-primary",
    },
    {
      icon: GraduationCap,
      titleKey: "about.cycle.step2Title",
      descKey: "about.cycle.step2Desc",
      color: "bg-accent",
    },
    {
      icon: Wrench,
      titleKey: "about.cycle.step3Title",
      descKey: "about.cycle.step3Desc",
      color: "bg-secondary",
    },
    {
      icon: TrendingUp,
      titleKey: "about.cycle.step4Title",
      descKey: "about.cycle.step4Desc",
      color: "bg-primary",
    },
  ];

  if (isMobile) {
    return (
      <section className="mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
          {t("about.cycle.title")}
        </h2>
        <p className="text-muted-foreground text-center mb-8 max-w-2xl mx-auto">
          {t("about.cycle.subtitle")}
        </p>

        <div className="relative max-w-sm mx-auto">
          {steps.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === steps.length - 1;

            return (
              <div key={index} className="relative">
                {/* Step Card */}
                <div className="flex items-start gap-4 p-4 bg-card rounded-xl border border-border/50 shadow-sm">
                  <div className={`${step.color} p-3 rounded-xl flex-shrink-0`}>
                    <Icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{t(step.titleKey)}</h3>
                    <p className="text-sm text-muted-foreground">{t(step.descKey)}</p>
                  </div>
                </div>

                {/* Arrow connector */}
                {!isLast && (
                  <div className="flex justify-center py-2">
                    <ArrowDown className="w-5 h-5 text-primary/60" />
                  </div>
                )}

                {/* Cycle back arrow for last item */}
                {isLast && (
                  <div className="flex items-center justify-center gap-2 py-4 text-primary/60">
                    <RotateCcw className="w-5 h-5" />
                    <span className="text-sm font-medium">{t("about.cycle.reinvest")}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    );
  }

  // Desktop: Circular/Grid layout
  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
        {t("about.cycle.title")}
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        {t("about.cycle.subtitle")}
      </p>

      <div className="relative max-w-4xl mx-auto">
        {/* Grid layout for cycle */}
        <div className="grid grid-cols-2 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            
            return (
              <div
                key={index}
                className="relative group"
              >
                <div className="bg-card rounded-2xl border border-border/50 p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                  <div className="flex items-start gap-4">
                    <div className={`${step.color} p-4 rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform`}>
                      <Icon className="w-7 h-7 text-primary-foreground" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-1">
                        {t("about.cycle.stepLabel", { number: index + 1 })}
                      </div>
                      <h3 className="font-semibold text-xl mb-2">{t(step.titleKey)}</h3>
                      <p className="text-muted-foreground">{t(step.descKey)}</p>
                    </div>
                  </div>
                </div>

                {/* Arrows between steps */}
                {index === 0 && (
                  <div className="absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary/50" />
                  </div>
                )}
                {index === 2 && (
                  <div className="absolute -right-5 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary/50" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Vertical arrows between rows */}
        <div className="absolute left-1/4 top-[calc(50%-1rem)] -translate-x-1/2">
          <ArrowDown className="w-6 h-6 text-primary/50" />
        </div>
        <div className="absolute right-1/4 top-[calc(50%-1rem)] translate-x-1/2">
          <ArrowDown className="w-6 h-6 text-primary/50" />
        </div>

        {/* Cycle indicator */}
        <div className="flex items-center justify-center gap-2 mt-8 text-primary/70">
          <RotateCcw className="w-5 h-5" />
          <span className="font-medium">{t("about.cycle.reinvest")}</span>
        </div>
      </div>
    </section>
  );
};

export default BusinessCycleInfographic;
