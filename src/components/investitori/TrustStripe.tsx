import { memo } from "react";
import { useTranslation } from "react-i18next";
import { Building2, Award, GraduationCap, FileCheck } from "lucide-react";

const items = [
  { key: "rea", Icon: Building2 },
  { key: "mise", Icon: Award },
  { key: "incubator", Icon: GraduationCap },
  { key: "vat", Icon: FileCheck },
] as const;

const TrustStripeComponent = () => {
  const { t } = useTranslation();
  return (
    <section className="border-y border-primary/15 bg-background py-0">
      <div className="container max-w-6xl mx-auto px-4 sm:px-6">
        <p className="eyebrow-mono text-muted-foreground text-center pt-6 pb-4">
          {t("investor.landing.trust.title")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 border-t border-primary/15">
          {items.map(({ key, Icon }, i) => (
            <div
              key={key}
              className={`flex flex-col items-center text-center gap-2 py-6 px-4 ${
                i < items.length - 1 ? "md:border-r" : ""
              } ${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b md:border-b-0" : ""} border-primary/15`}
            >
              <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <p className="eyebrow-mono text-foreground">
                {t(`investor.landing.trust.items.${key}.label`)}
              </p>
              <p className="metric-mono text-sm text-foreground/70">
                {t(`investor.landing.trust.items.${key}.value`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const TrustStripe = memo(TrustStripeComponent);
