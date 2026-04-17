import { useTranslation } from "react-i18next";
import { TrendingUp, Building, Calendar } from "lucide-react";

const items = [
  { key: "market", Icon: TrendingUp },
  { key: "asset", Icon: Building },
  { key: "model", Icon: Calendar },
] as const;

export const ThesisSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 tracking-tight max-w-2xl">
          {t("investor.landing.thesis.title")}
        </h2>
        <div className="grid md:grid-cols-3 gap-8 md:gap-10">
          {items.map(({ key, Icon }) => (
            <div key={key} className="flex flex-col">
              <Icon className="w-6 h-6 text-primary mb-4" strokeWidth={1.5} />
              <h3 className="font-serif text-xl text-foreground mb-3">
                {t(`investor.landing.thesis.items.${key}.title`)}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {t(`investor.landing.thesis.items.${key}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
