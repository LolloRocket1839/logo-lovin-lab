import { useTranslation } from "react-i18next";
import { Building2, TrendingUp, Clock, Shield, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { SellerContactDialog } from "./SellerContactDialog";
import { useState } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const SellerSection = () => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const benefits = [
    {
      icon: TrendingUp,
      title: t('seller.benefit1Title'),
      description: t('seller.benefit1Desc'),
      tooltip: t('seller.benefit1Tooltip'),
    },
    {
      icon: Clock,
      title: t('seller.benefit2Title'),
      description: t('seller.benefit2Desc'),
      tooltip: t('seller.benefit2Tooltip'),
    },
    {
      icon: Shield,
      title: t('seller.benefit3Title'),
      description: t('seller.benefit3Desc'),
      tooltip: t('seller.benefit3Tooltip'),
    },
    {
      icon: Building2,
      title: t('seller.benefit4Title'),
      description: t('seller.benefit4Desc'),
      tooltip: t('seller.benefit4Tooltip'),
    },
  ];

  return (
    <section id="seller-section" className="py-12 md:py-16 bg-accent/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
      
      <div className="container px-8 mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium">
            {t('seller.sectionLabel')}
          </p>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-foreground">
            {t('seller.compactTitle')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-6">
            {t('seller.compactDesc')}
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
          
          <Button 
            size="lg" 
            variant="premium"
            onClick={() => setIsDialogOpen(true)}
            className="w-full sm:w-auto px-8 py-6 text-base"
          >
            {t('seller.ctaButton')}
          </Button>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
      <SellerContactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
};
