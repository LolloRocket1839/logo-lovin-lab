import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { TrendingUp, ArrowRight, AlertTriangle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACTS, MESSAGES, openWhatsApp } from "@/constants/contacts";

import { QuickInvestorLeadDialog } from "@/components/dialogs/QuickInvestorLeadDialog";

export const InvestorSectionMobile = () => {
  const { t, i18n } = useTranslation();
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleWhatsApp = () => {
    const lang = i18n.language.startsWith('en') ? 'en' : 'it';
    const message = MESSAGES.investor.whatsapp[lang](CONTACTS.lorenzo.name);
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };
  

  return (
    <section className="py-10 bg-background md:hidden">
      <div className="container mx-auto px-4">
        {/* Problem highlight */}
        <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 mb-5">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-destructive" />
            <span className="text-xs uppercase tracking-wider text-destructive font-semibold">
              {t("problem.badge", "Il problema")}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center py-2">
              <div className="text-2xl font-bold text-foreground">589K</div>
              <div className="text-sm text-foreground/70">{t("problem.stat1Label")}</div>
            </div>
            <div className="text-center py-2">
              <div className="text-2xl font-bold text-foreground">12.6%</div>
              <div className="text-sm text-foreground/70">{t("problem.stat3Label")}</div>
            </div>
          </div>
        </div>

        {/* Solution card */}
        <div className="bg-card border border-border/30 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-bold text-foreground text-xl">
                {t("investor.sectionTitle")}
              </h3>
            </div>
          </div>

          <p className="text-base text-foreground/80 mb-5 leading-relaxed">
            {t("investor.compactDesc")}
          </p>

          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              {t("investor.socialProofLine")}
            </span>
          </div>

          <Button
            onClick={() => setDialogOpen(true)}
            className="w-full h-12 text-base shadow-lg"
            variant="premium"
          >
            {t("investor.cta")}
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>

          {/* Link to zones - SEO internal linking */}
          <div className="text-center mt-4">
            <Link 
              to={i18n.language.startsWith('en') ? '/investors/zones' : '/investitori/zone'}
              className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              {i18n.language.startsWith('it') ? 'Esplora i quartieri di Torino' : 'Explore Turin neighborhoods'}
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
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
