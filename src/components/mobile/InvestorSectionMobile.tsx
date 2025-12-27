import { useState } from "react";
import { useTranslation } from "react-i18next";
import { TrendingUp, ArrowRight, Users, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";

export const InvestorSectionMobile = () => {
  const { t } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);
  const { count } = useWaitlistCounter();

  return (
    <section className="py-8 bg-background md:hidden">
      <div className="container mx-auto px-4">
        {/* Problem highlight */}
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 mb-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-xs uppercase tracking-wider text-destructive font-medium">
              {t("problem.badge", "Il problema")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">589K</div>
              <div className="text-xs text-muted-foreground">{t("problem.stat1Label")}</div>
            </div>
            <div className="text-center">
              <div className="text-xl font-bold text-foreground">12.6%</div>
              <div className="text-xs text-muted-foreground">{t("problem.stat3Label")}</div>
            </div>
          </div>
        </div>

        {/* Solution card */}
        <div className="bg-card border border-border/20 rounded-xl p-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-lg">
                {t("investor.sectionTitle")}
              </h3>
            </div>
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {t("investor.compactDesc")}
          </p>

          <div className="flex justify-center mb-4">
            <Badge variant="secondary" className="px-3 py-1.5 text-xs">
              <Users className="w-3 h-3 mr-1" />
              {count}+ {t("investor.activeInvestors")}
            </Badge>
          </div>

          <Button
            onClick={() => setDialogOpen(true)}
            className="w-full"
            variant="premium"
          >
            {t("investor.cta")}
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>

      <QuickInvestorLeadDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        source="investor_section_mobile"
      />
    </section>
  );
};
