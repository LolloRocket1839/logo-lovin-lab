import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Building2, Clock, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { QuickSellerLeadDialog } from "./QuickSellerLeadDialog";
import { StyledText } from "@/components/StyledText";

export const SellerSection = () => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <section id="seller-section" className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-jungle-section pointer-events-none" />
      
      <div className="container px-6 md:px-8 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-6 text-foreground">
            <StyledText>{t('seller.directBuyerTitle')}</StyledText>
          </h2>
          
          {/* Comparison table */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
              {/* Header row */}
              <div className="text-left font-medium text-muted-foreground"></div>
              <div className="text-center font-semibold text-muted-foreground">{t('seller.comparison.agency')}</div>
              <div className="text-center font-semibold text-primary">{t('seller.comparison.jungleRent')}</div>
              
              {/* Role row */}
              <div className="text-left text-muted-foreground py-2 border-t border-border/20">{t('seller.comparison.roleLabel')}</div>
              <div className="text-center py-2 border-t border-border/20 text-muted-foreground">{t('seller.comparison.roleAgency')}</div>
              <div className="text-center py-2 border-t border-border/20 font-medium text-foreground flex items-center justify-center gap-1">
                <Building2 className="w-4 h-4 text-primary" />
                {t('seller.comparison.roleJR')}
              </div>
              
              {/* Commissions row */}
              <div className="text-left text-muted-foreground py-2 border-t border-border/20">{t('seller.comparison.commissionsLabel')}</div>
              <div className="text-center py-2 border-t border-border/20 text-destructive flex items-center justify-center gap-1">
                <X className="w-4 h-4" />
                3-4%
              </div>
              <div className="text-center py-2 border-t border-border/20 text-primary font-semibold flex items-center justify-center gap-1">
                <Check className="w-4 h-4" />
                {t('seller.comparison.commissionsJR')}
              </div>
              
              {/* Time row */}
              <div className="text-left text-muted-foreground py-2 border-t border-border/20">{t('seller.comparison.timeLabel')}</div>
              <div className="text-center py-2 border-t border-border/20 text-muted-foreground flex items-center justify-center gap-1">
                <Clock className="w-4 h-4" />
                6-12 {t('seller.comparison.months')}
              </div>
              <div className="text-center py-2 border-t border-border/20 text-primary font-medium flex items-center justify-center gap-1">
                <Clock className="w-4 h-4" />
                60-90 {t('seller.comparison.days')}
              </div>
              
              {/* Visits row */}
              <div className="text-left text-muted-foreground py-2 border-t border-border/20">{t('seller.comparison.visitsLabel')}</div>
              <div className="text-center py-2 border-t border-border/20 text-muted-foreground">{t('seller.comparison.visitsAgency')}</div>
              <div className="text-center py-2 border-t border-border/20 text-primary font-medium">{t('seller.comparison.visitsJR')}</div>
            </div>
          </div>
          
          <Button 
            size="lg" 
            variant="premium"
            onClick={() => setIsDialogOpen(true)}
            className="px-8 py-6 text-base"
          >
            {t('seller.ctaButton')} →
          </Button>
        </div>
      </div>

      <QuickSellerLeadDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} source="seller_section" />
    </section>
  );
};
