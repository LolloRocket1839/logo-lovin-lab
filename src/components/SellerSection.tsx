import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Calendar, Building2, Banknote, Clock, Check, X, MapPin } from "lucide-react";
import { Button } from "./ui/button";
import { QuickSellerLeadDialog } from "./QuickSellerLeadDialog";
import { StyledText } from "@/components/StyledText";
import { openCalendly } from "@/lib/calendly";
import { useAnalytics } from "@/hooks/useAnalytics";
import { Badge } from "./ui/badge";

export const SellerSection = () => {
  const { t } = useTranslation();
  const { trackClick } = useAnalytics();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCalendlyClick = () => {
    trackClick('seller_section_calendly');
    openCalendly();
  };

  return (
    <section id="seller-section" className="py-16 md:py-24 bg-muted/30 relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-jungle-section pointer-events-none" />
      
      <div className="container px-6 md:px-8 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Section title */}
          <p className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground mb-3">
            {t('seller.sectionTitle')}
          </p>
          
          {/* Urgency badge */}
          <div className="flex justify-center mb-4">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 px-3 py-1.5 text-xs font-medium">
              <MapPin className="w-3 h-3 mr-1.5" />
              {t('seller.urgencyBadge')}
            </Badge>
          </div>
          
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold mb-3 text-foreground">
            <StyledText>{t('seller.directBuyerTitle')}</StyledText>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-2">
            <StyledText>{t('seller.directBuyerSubtitle')}</StyledText>
          </p>
          {/* Benefits list */}
          <div className="flex flex-wrap justify-center gap-3 mb-6 text-sm">
            <span className="inline-flex items-center text-primary font-medium">✓ {t('seller.benefit1')}</span>
            <span className="inline-flex items-center text-primary font-medium">✓ {t('seller.benefit2')}</span>
            <span className="inline-flex items-center text-primary font-medium">✓ {t('seller.benefit3')}</span>
          </div>
          
          {/* Comparison table */}
          <div className="bg-card/50 backdrop-blur-sm border border-border/20 rounded-xl p-6 mb-6 max-w-2xl mx-auto">
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
          
          {/* Mission statement */}
          <p className="text-xs sm:text-sm text-muted-foreground mb-4 max-w-xl mx-auto">
            {t('seller.missionStatement')}
          </p>
          
          {/* Blog article link */}
          <a 
            href="/blog/vendere-casa-torino-guida-completa-2025" 
            className="inline-flex items-center text-xs sm:text-sm text-primary hover:underline mb-6"
          >
            {t('seller.readGuide')} →
          </a>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              size="lg" 
              variant="premium"
              onClick={() => setIsDialogOpen(true)}
              className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base h-11 sm:h-12"
            >
              {t('seller.ctaButton')}
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={handleCalendlyClick}
              className="w-full sm:w-auto px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-base h-11 sm:h-12"
            >
              <Calendar className="mr-2 h-5 w-5" />
              {t('seller.scheduleCall')}
            </Button>
          </div>
        </div>
      </div>

      <QuickSellerLeadDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} source="seller_section" />
    </section>
  );
};
