import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Building2, ArrowRight, Clock, Shield, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";

/**
 * SellerHomeEntry — compact homepage entry point for property owners.
 * Sits between TrustBadge and AudienceDoors to surface the direct-buyer offer.
 */
export const SellerHomeEntry = () => {
  const { t, i18n } = useTranslation();
  const { trackClick } = useAnalytics();
  const isItalian = i18n.language.startsWith("it");

  return (
    <section
      aria-label={isItalian ? "Vendi casa a Torino" : "Sell your home in Turin"}
      className="relative bg-background py-16 md:py-20 border-t border-border/30"
    >
      <div className="container mx-auto px-6 md:px-10 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-primary tracking-wide uppercase">
              <Building2 className="w-4 h-4" aria-hidden="true" />
              <span>{t("sellerHomeEntry.eyebrow", isItalian ? "Per proprietari" : "For property owners")}</span>
            </div>

            <h2 className="font-display font-bold tracking-tighter text-foreground leading-[0.95] text-3xl sm:text-4xl md:text-5xl">
              {t("sellerHomeEntry.title", isItalian ? "Vendi casa senza agenzia." : "Sell without an agency.")}
            </h2>

            <p className="text-base md:text-lg text-muted-foreground max-w-md leading-relaxed">
              {t(
                "sellerHomeEntry.description",
                isItalian
                  ? "Jungle Rent compra direttamente nella tua zona universitaria. Valutazione gratuita, offerta scritta e rogito in 60-90 giorni."
                  : "Jungle Rent buys directly in your university area. Free valuation, written offer and closing in 60-90 days."
              )}
            </p>

            <Button
              asChild
              variant="premium"
              size="lg"
              className="h-12 px-6 text-base font-semibold group"
              onClick={() => trackClick("homepage_seller_entry_cta")}
            >
              <Link to="/vendi">
                {t("sellerHomeEntry.cta", isItalian ? "Valutazione gratuita" : "Free valuation")}
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-2xl p-6 md:p-8">
            <h3 className="text-sm font-semibold text-foreground mb-4">
              {t("sellerHomeEntry.compareTitle", isItalian ? "Agenzia tradizionale vs Jungle Rent" : "Traditional agency vs Jungle Rent")}
            </h3>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-[1fr_auto_auto] gap-3 items-center border-b border-border/20 pb-3">
                <span className="text-muted-foreground">{t("sellerHomeEntry.commission", isItalian ? "Commissioni" : "Commissions")}</span>
                <span className="text-muted-foreground text-center">{isItalian ? "2-5%" : "2-5%"}</span>
                <span className="text-primary font-semibold text-center">0%</span>
              </div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-3 items-center border-b border-border/20 pb-3">
                <span className="text-muted-foreground">{t("sellerHomeEntry.timeline", isItalian ? "Tempi" : "Timeline")}</span>
                <span className="text-muted-foreground text-center">{isItalian ? "6-12 mesi" : "6-12 months"}</span>
                <span className="text-primary font-semibold text-center flex items-center justify-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  60-90 {isItalian ? "gg" : "days"}
                </span>
              </div>
              <div className="grid grid-cols-[1fr_auto_auto] gap-3 items-center">
                <span className="text-muted-foreground">{t("sellerHomeEntry.buyer", isItalian ? "Acquirente" : "Buyer")}</span>
                <span className="text-muted-foreground text-center">{isItalian ? "Cercasi" : "To find"}</span>
                <span className="text-primary font-semibold text-center flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5" />
                  {isItalian ? "Certo" : "Guaranteed"}
                </span>
              </div>
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>{t("sellerHomeEntry.trust", isItalian ? "Start-up Innovativa registrata CCIAA Torino" : "Certified Innovative Startup registered with CCIAA Turin")}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
