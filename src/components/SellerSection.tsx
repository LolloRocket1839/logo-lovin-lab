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
    <section id="vendi-casa" className="py-12 md:py-20 bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            {t('seller.sectionTitle')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('seller.subtitle')}
          </p>
        </div>

        {/* Timeline compatta */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-card/30 p-6 rounded-xl border border-border/50">
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{t('seller.timelineValuationTime')}</div>
              <div className="text-sm text-muted-foreground">{t('seller.timelineValuation')}</div>
            </div>
            <ArrowRight className="hidden md:block text-muted-foreground/30 w-5 h-5 flex-shrink-0 transition-none" style={{ animation: 'none', transform: 'none' }} />
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{t('seller.timelineInspectionTime')}</div>
              <div className="text-sm text-muted-foreground">{t('seller.timelineInspection')}</div>
            </div>
            <ArrowRight className="hidden md:block text-muted-foreground/30 w-5 h-5 flex-shrink-0 transition-none" style={{ animation: 'none', transform: 'none' }} />
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{t('seller.timelineOfferTime')}</div>
              <div className="text-sm text-muted-foreground">{t('seller.timelineOffer')}</div>
            </div>
            <ArrowRight className="hidden md:block text-muted-foreground/30 w-5 h-5 flex-shrink-0 transition-none" style={{ animation: 'none', transform: 'none' }} />
            <div className="flex-1 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{t('seller.timelineClosingTime')}</div>
              <div className="text-sm text-muted-foreground">{t('seller.timelineClosing')}</div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <TooltipProvider delayDuration={500}>
            {benefits.map((benefit, index) => (
              <Tooltip key={index}>
                <TooltipTrigger asChild>
                  <div
                    className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
                  >
                    <benefit.icon className="w-12 h-12 text-primary mb-4" />
                    <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="hidden md:block">
                  <p className="text-xs">{benefit.tooltip}</p>
                </TooltipContent>
              </Tooltip>
            ))}
          </TooltipProvider>
        </div>

        <div className="text-center mt-12">
          <Button 
            size="lg" 
            onClick={() => setIsDialogOpen(true)}
            className="text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-all duration-300"
          >
            {t('seller.ctaButton')}
          </Button>
        </div>
      </div>

      <SellerContactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
};
