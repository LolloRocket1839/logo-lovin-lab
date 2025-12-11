import { useTranslation } from "react-i18next";
import { useState } from "react";
import { Calendar } from "lucide-react";
import { Button } from "./ui/button";
import { QuickSellerLeadDialog } from "./QuickSellerLeadDialog";
import { StyledText } from "@/components/StyledText";
import { openCalendly } from "@/lib/calendly";
import { useAnalytics } from "@/hooks/useAnalytics";

export const SellerSection = () => {
  const { t } = useTranslation();
  const { trackClick } = useAnalytics();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCalendlyClick = () => {
    trackClick('seller_section_calendly');
    openCalendly();
  };

  return (
    <section id="seller-section" className="py-8 sm:py-10 md:py-12 lg:py-16 relative overflow-hidden transition-spacing">
      {/* Gradient overlay */}
      <div className="absolute inset-0 gradient-jungle-section pointer-events-none" />
      
      <div className="container px-3 sm:px-4 md:px-6 lg:px-8 mx-auto relative z-10 transition-spacing">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium">
            {t('seller.sectionLabel')}
          </p>
          <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-4 text-foreground">
            <StyledText>{t('seller.compactTitle')}</StyledText>
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-6">
            <StyledText>{t('seller.compactDesc')}</StyledText>
          </p>
          
          <ul className="text-left max-w-lg mx-auto space-y-2 mb-8 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>{t('seller.compactBullet1')}</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-primary mt-0.5">•</span>
              <span>{t('seller.compactBullet2')}</span>
            </li>
          </ul>
          
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
