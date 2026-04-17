import { useTranslation } from "react-i18next";

export const FounderLetterSection = () => {
  const { t } = useTranslation();
  const paragraphs = t("investor.landing.founder.paragraphs", {
    returnObjects: true,
  }) as string[];

  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-3xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-10 tracking-tight">
          {t("investor.landing.founder.title")}
        </h2>
        <div className="space-y-5 text-base md:text-lg text-foreground/90 leading-relaxed">
          {paragraphs.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
        <div className="mt-10 pt-6 border-t border-border/40">
          <p className="font-serif text-xl text-foreground italic">
            {t("investor.landing.founder.signature")}
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            {t("investor.landing.founder.role")}
          </p>
        </div>
      </div>
    </section>
  );
};
