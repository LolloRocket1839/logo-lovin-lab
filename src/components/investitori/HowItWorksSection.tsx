import { useTranslation } from "react-i18next";
import { ProcessSteps, type ProcessStep } from "@/components/shared/ProcessSteps";

export const HowItWorksSection = () => {
  const { t } = useTranslation();
  const steps = t("investor.landing.process.steps", {
    returnObjects: true,
  }) as ProcessStep[];

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 tracking-tight">
          {t("investor.landing.process.title")}
        </h2>
        <ProcessSteps layout="list" steps={steps} />
        <p className="mt-10 pt-6 border-t border-border/40 text-sm text-foreground/80 italic">
          {t("investor.landing.process.callout")}
        </p>
      </div>
    </section>
  );
};
