import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Clock, Shield, Users, BadgeCheck, TrendingUp } from "lucide-react";

export const SellerSocialProof = () => {
  const { t } = useTranslation();

  const stats = [
    { icon: Clock, value: t("sellerSocialProof.stat1Value", "60-90"), label: t("sellerSocialProof.stat1Label", "giorni per il rogito") },
    { icon: Shield, value: t("sellerSocialProof.stat2Value", "0%"), label: t("sellerSocialProof.stat2Label", "commissioni agenzia") },
    { icon: Users, value: t("sellerSocialProof.stat3Value", "10"), label: t("sellerSocialProof.stat3Label", "zone target di Torino") },
    { icon: BadgeCheck, value: t("sellerSocialProof.stat4Value", "24h"), label: t("sellerSocialProof.stat4Label", "prima risposta") },
  ];

  return (
    <section className="py-12 md:py-16 bg-primary/5 border-y border-primary/10">
      <div className="container px-4 md:px-8 mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-4">
            <TrendingUp className="w-3.5 h-3.5" />
            {t("sellerSocialProof.badge", "Perché venditori ci scelgono")}
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground">
            {t("sellerSocialProof.title", "Vendi senza intermediari, in tempi certi")}
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="p-4 md:p-6 rounded-2xl bg-background/80 border border-border/40 text-center shadow-sm"
            >
              <Icon className="w-5 h-5 text-primary mx-auto mb-3" />
              <p className="text-2xl md:text-3xl font-display font-bold text-foreground">{value}</p>
              <p className="text-xs md:text-sm text-muted-foreground mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
