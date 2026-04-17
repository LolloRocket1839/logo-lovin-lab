import { useTranslation } from "react-i18next";

const keys = ["fg", "tax", "transparency"] as const;

export const StartupInnovativaSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 tracking-tight">
          {t("investor.landing.innovativa.title")}
        </h2>
        <div className="space-y-10">
          {keys.map((k) => (
            <div key={k} className="border-l-2 border-primary/30 pl-6">
              <h3 className="font-serif text-xl text-foreground mb-3">
                {t(`investor.landing.innovativa.items.${k}.title`)}
              </h3>
              <p className="text-base text-muted-foreground leading-relaxed">
                {t(`investor.landing.innovativa.items.${k}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
