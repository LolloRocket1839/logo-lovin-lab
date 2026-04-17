import { useTranslation } from "react-i18next";
import { AlertTriangle } from "lucide-react";

export const TaxSection = () => {
  const { t } = useTranslation();
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <h2 className="font-serif text-3xl md:text-4xl text-foreground mb-10 tracking-tight">
          {t("investor.landing.tax.title")}
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <p className="text-base text-foreground/90 leading-relaxed">
              {t("investor.landing.tax.content")}
            </p>
          </div>
          <div className="border border-primary/20 bg-cream/60 rounded-lg p-6">
            <div className="flex items-center gap-2 mb-3">
              <AlertTriangle className="w-4 h-4 text-primary" strokeWidth={2} />
              <p className="font-medium text-sm uppercase tracking-wider text-primary">
                {t("investor.landing.tax.caveatTitle")}
              </p>
            </div>
            <p className="text-sm text-foreground/85 leading-relaxed">
              {t("investor.landing.tax.caveat")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
