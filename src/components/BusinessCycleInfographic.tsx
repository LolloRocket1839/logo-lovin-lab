import { Building2, GraduationCap, Wrench, TrendingUp, RotateCcw } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ProcessSteps } from "@/components/shared/ProcessSteps";

const BusinessCycleInfographic = () => {
  const { t } = useTranslation();

  const steps = [
    { icon: Building2, titleKey: "about.cycle.step1Title", descKey: "about.cycle.step1Desc" },
    { icon: GraduationCap, titleKey: "about.cycle.step2Title", descKey: "about.cycle.step2Desc" },
    { icon: Wrench, titleKey: "about.cycle.step3Title", descKey: "about.cycle.step3Desc" },
    { icon: TrendingUp, titleKey: "about.cycle.step4Title", descKey: "about.cycle.step4Desc" },
  ];

  return (
    <section className="mb-16">
      <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-center">
        {t("about.cycle.title")}
      </h2>
      <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
        {t("about.cycle.subtitle")}
      </p>

      <div className="max-w-5xl mx-auto">
        <ProcessSteps
          layout="grid"
          steps={steps.map((s) => ({
            title: t(s.titleKey),
            body: t(s.descKey),
            icon: s.icon,
          }))}
        />

        <div className="flex items-center justify-center gap-2 mt-10 text-primary/70">
          <RotateCcw className="w-5 h-5" />
          <span className="font-medium">{t("about.cycle.reinvest")}</span>
        </div>
      </div>
    </section>
  );
};

export default BusinessCycleInfographic;
