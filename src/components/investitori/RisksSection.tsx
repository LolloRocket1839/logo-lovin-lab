import { useTranslation } from "react-i18next";

interface Risk {
  title: string;
  body: string;
}

export const RisksSection = () => {
  const { t } = useTranslation();
  const items = t("investor.landing.risks.items", {
    returnObjects: true,
  }) as Risk[];

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-12 tracking-tight">
          {t("investor.landing.risks.title")}
        </h2>
        <ul className="space-y-7">
          {items.map((r, i) => (
            <li key={i}>
              <h3 className="font-medium text-base text-foreground mb-2">
                {r.title}
              </h3>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                {r.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
