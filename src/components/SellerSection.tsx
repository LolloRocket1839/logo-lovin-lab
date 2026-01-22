import { useTranslation } from "react-i18next";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Building2, Clock, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { QuickSellerLeadDialog } from "@/components/dialogs";
import { StyledText } from "@/components/StyledText";
import { useHasBeenSeen } from "@/hooks/useScrollProgress";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const SellerSection = () => {
  const { t, i18n } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const hasBeenSeen = useHasBeenSeen(sectionRef, 0.15);
  const prefersReducedMotion = useReducedMotion();

  // Table rows for stagger animation
  const tableRows = ['role', 'commissions', 'time', 'visits'];

  return (
    <section 
      ref={sectionRef}
      id="seller-section" 
      className="py-16 md:py-24 bg-background section-fade-top relative overflow-hidden"
    >
      
      <div className="container px-6 md:px-8 mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Hero headline - same style as ImmersiveHero */}
          <h2 
            className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-display font-extrabold mb-4 md:mb-6 leading-tight text-foreground tracking-tight ${
              hasBeenSeen && !prefersReducedMotion ? 'animate-materialize' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasBeenSeen ? undefined : 0 }}
          >
            <span className="text-primary">{t('seller.heroHighlight')}</span> {t('seller.heroRest')}{' '}
            <span className="text-foreground">{t('seller.heroBracket')}</span>
          </h2>
          
          {/* Subheadline */}
          <p 
            className={`text-base sm:text-lg md:text-xl text-muted-foreground mb-10 md:mb-12 font-light leading-relaxed max-w-2xl mx-auto ${
              hasBeenSeen && !prefersReducedMotion ? 'animate-materialize animate-materialize-delay-1' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasBeenSeen ? undefined : 0 }}
          >
            {t('seller.heroSubheadline')}
          </p>
          
          {/* Section title */}
          <h3 
            className={`text-lg sm:text-xl md:text-2xl font-display font-bold mb-6 text-foreground ${
              hasBeenSeen && !prefersReducedMotion ? 'animate-materialize animate-materialize-delay-2' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasBeenSeen ? undefined : 0 }}
          >
            <StyledText>{t('seller.directBuyerTitle')}</StyledText>
          </h3>
          
          {/* Comparison table with row stagger animation */}
          <div 
            className={`bg-card/50 backdrop-blur-sm border border-border/20 rounded-xl p-6 mb-8 max-w-2xl mx-auto ${
              hasBeenSeen && !prefersReducedMotion ? 'animate-materialize animate-materialize-delay-2' : ''
            }`}
            style={{ opacity: prefersReducedMotion ? 1 : hasBeenSeen ? undefined : 0 }}
          >
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-xs sm:text-sm">
              {/* Header row */}
              <div className="text-left font-medium text-muted-foreground"></div>
              <div className="text-center font-semibold text-muted-foreground">{t('seller.comparison.agency')}</div>
              <div className="text-center font-semibold text-primary">{t('seller.comparison.jungleRent')}</div>
              
              {/* Role row */}
              <div 
                className={`text-left text-muted-foreground py-2 border-t border-border/20 ${
                  hasBeenSeen && !prefersReducedMotion ? 'table-row-stagger' : ''
                }`}
              >
                {t('seller.comparison.roleLabel')}
              </div>
              <div 
                className={`text-center py-2 border-t border-border/20 text-muted-foreground ${
                  hasBeenSeen && !prefersReducedMotion ? 'table-row-stagger' : ''
                }`}
              >
                {t('seller.comparison.roleAgency')}
              </div>
              <div 
                className={`text-center py-2 border-t border-border/20 font-medium text-foreground flex items-center justify-center gap-1 ${
                  hasBeenSeen && !prefersReducedMotion ? 'table-row-stagger' : ''
                }`}
              >
                <Building2 className="w-4 h-4 text-primary" />
                {t('seller.comparison.roleJR')}
              </div>
              
              {/* Commissions row */}
              <div 
                className={`text-left text-muted-foreground py-2 border-t border-border/20 ${
                  hasBeenSeen && !prefersReducedMotion ? 'table-row-stagger' : ''
                }`}
                style={{ animationDelay: '80ms' }}
              >
                {t('seller.comparison.commissionsLabel')}
              </div>
              <div 
                className={`text-center py-2 border-t border-border/20 text-destructive flex items-center justify-center gap-1 ${
                  hasBeenSeen && !prefersReducedMotion ? 'table-row-stagger' : ''
                }`}
                style={{ animationDelay: '80ms' }}
              >
                <X className="w-4 h-4" />
                3-4%
              </div>
              <div 
                className={`text-center py-2 border-t border-border/20 text-primary font-semibold flex items-center justify-center gap-1 ${
                  hasBeenSeen && !prefersReducedMotion ? 'table-row-stagger' : ''
                }`}
                style={{ animationDelay: '80ms' }}
              >
                <Check className="w-4 h-4" />
                {t('seller.comparison.commissionsJR')}
              </div>
              
              {/* Time row */}
              <div 
                className={`text-left text-muted-foreground py-2 border-t border-border/20 ${
                  hasBeenSeen && !prefersReducedMotion ? 'table-row-stagger' : ''
                }`}
                style={{ animationDelay: '160ms' }}
              >
                {t('seller.comparison.timeLabel')}
              </div>
              <div 
                className={`text-center py-2 border-t border-border/20 text-muted-foreground flex items-center justify-center gap-1 ${
                  hasBeenSeen && !prefersReducedMotion ? 'table-row-stagger' : ''
                }`}
                style={{ animationDelay: '160ms' }}
              >
                <Clock className="w-4 h-4" />
                6-12 {t('seller.comparison.months')}
              </div>
              <div 
                className={`text-center py-2 border-t border-border/20 text-primary font-medium flex items-center justify-center gap-1 ${
                  hasBeenSeen && !prefersReducedMotion ? 'table-row-stagger' : ''
                }`}
                style={{ animationDelay: '160ms' }}
              >
                <Clock className="w-4 h-4" />
                60-90 {t('seller.comparison.days')}
              </div>
              
              {/* Visits row */}
              <div 
                className={`text-left text-muted-foreground py-2 border-t border-border/20 ${
                  hasBeenSeen && !prefersReducedMotion ? 'table-row-stagger' : ''
                }`}
                style={{ animationDelay: '240ms' }}
              >
                {t('seller.comparison.visitsLabel')}
              </div>
              <div 
                className={`text-center py-2 border-t border-border/20 text-muted-foreground ${
                  hasBeenSeen && !prefersReducedMotion ? 'table-row-stagger' : ''
                }`}
                style={{ animationDelay: '240ms' }}
              >
                {t('seller.comparison.visitsAgency')}
              </div>
              <div 
                className={`text-center py-2 border-t border-border/20 text-primary font-medium ${
                  hasBeenSeen && !prefersReducedMotion ? 'table-row-stagger' : ''
                }`}
                style={{ animationDelay: '240ms' }}
              >
                {t('seller.comparison.visitsJR')}
              </div>
            </div>
          </div>
          
          {/* CTA - materializes last */}
          <div
            className={`${
              hasBeenSeen && !prefersReducedMotion ? 'animate-slide-up-settle' : ''
            }`}
            style={{ 
              opacity: prefersReducedMotion ? 1 : hasBeenSeen ? undefined : 0,
              animationDelay: '400ms'
            }}
          >
            <Button 
              size="lg" 
              variant="premium"
              onClick={() => setIsDialogOpen(true)}
              className="px-8 py-6 text-base"
            >
              {t('seller.ctaButton')} →
            </Button>
          </div>
          
          {/* Contextual link to property valuation - NEW for SEO */}
          <p 
            className={`mt-6 text-sm text-muted-foreground ${
              hasBeenSeen && !prefersReducedMotion ? 'animate-materialize' : ''
            }`}
            style={{ 
              opacity: prefersReducedMotion ? 1 : hasBeenSeen ? undefined : 0,
              animationDelay: '480ms'
            }}
          >
            {t('seller.valuationCta', 'Vuoi prima sapere quanto vale il tuo immobile?')}{' '}
            <Link 
              to={i18n.language.startsWith('it') ? '/valutazione-immobile' : '/property-valuation'}
              className="text-primary hover:underline font-medium"
            >
              {t('seller.valuationLink', 'Prova la nostra valutazione gratuita →')}
            </Link>
          </p>
        </div>
      </div>

      <QuickSellerLeadDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} source="seller_section" />
    </section>
  );
};
