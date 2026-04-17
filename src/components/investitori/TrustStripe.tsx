import { useTranslation } from "react-i18next";
import { Building2, Award, GraduationCap, FileCheck } from "lucide-react";

const items = [
  { key: "rea", Icon: Building2 },
  { key: "mise", Icon: Award },
  { key: "incubator", Icon: GraduationCap },
  { key: "vat", Icon: FileCheck },
] as const;

export const TrustStripe = () => {
  const { t } = useTranslation();
  return (
    <section className="border-y border-border/40 bg-background py-8">
      <div className="container max-w-5xl mx-auto px-4 sm:px-6">
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground/70 text-center mb-6 font-medium">
          {t("investor.landing.trust.title")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map(({ key, Icon }) => (
            <div key={key} className="flex flex-col items-center text-center gap-2">
              <Icon className="w-5 h-5 text-primary" strokeWidth={1.5} />
              <p className="text-xs font-medium text-foreground">
                {t(`investor.landing.trust.items.${key}.label`)}
              </p>
              <p className="text-xs text-muted-foreground">
                {t(`investor.landing.trust.items.${key}.value`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
