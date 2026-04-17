import { useTranslation } from "react-i18next";

export const LegalDisclaimerFooter = () => {
  const { t } = useTranslation();
  return (
    <section className="py-12 md:py-16 bg-foreground/[0.03] border-t border-border/40">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6">
        <div className="space-y-4 text-[13px] leading-relaxed text-muted-foreground/90">
          <p>{t("investor.landing.disclaimer.p1")}</p>
          <p>{t("investor.landing.disclaimer.p2")}</p>
          <p>{t("investor.landing.disclaimer.p3")}</p>
          <p>{t("investor.landing.disclaimer.p4")}</p>
          <p className="pt-3 border-t border-border/30 text-foreground/70 font-medium">
            {t("investor.landing.disclaimer.company")}
          </p>
        </div>
      </div>
    </section>
  );
};
