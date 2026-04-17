import { useTranslation } from "react-i18next";

interface Step {
  title: string;
  body: string;
}

export const HowItWorksSection = () => {
  const { t } = useTranslation();
  const steps = t("investor.landing.process.steps", {
    returnObjects: true,
  }) as Step[];

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 tracking-tight">
          {t("investor.landing.process.title")}
        </h2>
        <ol className="space-y-8">
          {steps.map((step, i) => (
            <li key={i} className="flex gap-5">
              <div className="flex-shrink-0 w-9 h-9 rounded-full border border-primary/40 bg-background flex items-center justify-center font-serif text-sm text-primary">
                {i + 1}
              </div>
              <div className="flex-1 pt-1">
                <h3 className="font-medium text-base text-foreground mb-1.5">
                  {step.title}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-10 pt-6 border-t border-border/40 text-sm text-foreground/80 italic">
          {t("investor.landing.process.callout")}
        </p>
      </div>
    </section>
  );
};
