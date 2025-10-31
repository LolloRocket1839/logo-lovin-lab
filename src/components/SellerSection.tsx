import { useTranslation } from "react-i18next";
import { Building2, TrendingUp, Clock, Shield } from "lucide-react";
import { Button } from "./ui/button";
import { SellerContactDialog } from "./SellerContactDialog";
import { HowToSellProcess } from "./HowToSellProcess";
import { SellerComparison } from "./SellerComparison";
import { useState } from "react";

export const SellerSection = () => {
  const { t } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const benefits = [
    {
      icon: TrendingUp,
      title: t('seller.benefit1Title'),
      description: t('seller.benefit1Desc'),
    },
    {
      icon: Clock,
      title: t('seller.benefit2Title'),
      description: t('seller.benefit2Desc'),
    },
    {
      icon: Shield,
      title: t('seller.benefit3Title'),
      description: t('seller.benefit3Desc'),
    },
    {
      icon: Building2,
      title: t('seller.benefit4Title'),
      description: t('seller.benefit4Desc'),
    },
  ];

  return (
    <section id="vendi-casa" className="py-24 bg-gradient-to-b from-background via-accent/5 to-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
            {t('seller.sectionTitle')}
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            {t('seller.intro')} <strong>{t('seller.valuationFree')}</strong>, {t('seller.forSeller').toLowerCase()} <strong>{t('seller.zeroFees')}</strong>.
          </p>
          
          <div className="max-w-4xl mx-auto text-left space-y-6 bg-card/50 p-8 rounded-xl border border-border/50">
            <h3 className="text-2xl font-bold text-center mb-4">{t('seller.whyWeAcquire')}</h3>
            
            <p className="text-muted-foreground leading-relaxed">
              {t('seller.para1')}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              {t('seller.para2')} <strong>{t('seller.zones')}</strong>, {t('seller.para3')}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              {t('seller.para4')}
            </p>

            <p className="text-muted-foreground leading-relaxed">
              <strong>{t('seller.advantagesTitle')}</strong> {t('seller.para5')}
            </p>
          </div>
        </div>

        {/* How It Works Section */}
        <HowToSellProcess />

        {/* Comparison Section */}
        <SellerComparison />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
            >
              <benefit.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-card p-8 md:p-12 rounded-2xl border border-border/50 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              {t('seller.zonesTitle')}
            </h3>
            <p className="text-lg text-muted-foreground mb-6">
              {t('seller.zonesText')} 
              <strong> {t('seller.zonesList')}</strong>. 
              {t('seller.idealProperty')}
            </p>
            <p className="text-muted-foreground mb-8">
              {t('seller.formInvitation')}
            </p>
          </div>

          <div className="flex justify-center">
            <Button 
              size="lg" 
              onClick={() => setIsDialogOpen(true)}
              className="text-lg px-8 py-6 shadow-elegant hover:shadow-glow transition-all duration-300"
            >
              {t('seller.ctaButton')}
            </Button>
          </div>
        </div>
      </div>

      <SellerContactDialog open={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </section>
  );
};
