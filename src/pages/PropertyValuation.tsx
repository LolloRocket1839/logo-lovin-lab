import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Building2, Calculator, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { MobileHeader } from "@/components/MobileHeader";
import { MobileFooter } from "@/components/MobileFooter";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PropertyValuator } from "@/components/tools/PropertyValuator";
import { QuickSellerLeadDialog } from "@/components/QuickSellerLeadDialog";
import { ToolStructuredData } from "@/components/tools/ToolStructuredData";

const PropertyValuation = () => {
  const { t, i18n } = useTranslation();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const lang = i18n.language;

  const handleValueCalculated = (value: number) => {
    setEstimatedValue(value);
  };

  const handleContactClick = () => {
    setIsDialogOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>{t('propertyValuation.meta.title', 'Valutazione Immobiliare Torino | Calcola il Valore della Tua Casa')}</title>
        <meta 
          name="description" 
          content={t('propertyValuation.meta.description', 'Calcola gratuitamente il valore del tuo immobile a Torino. Dati OMI 2025, coefficienti FIAIP, 35+ zone. Stima accurata ±5%.')} 
        />
        <link rel="canonical" href={`https://junglerent.it/${lang === 'it' ? 'valutazione-immobile' : 'property-valuation'}`} />
        <meta property="og:title" content={t('propertyValuation.meta.title', 'Valutazione Immobiliare Torino | Calcola il Valore della Tua Casa')} />
        <meta property="og:description" content={t('propertyValuation.meta.description', 'Calcola gratuitamente il valore del tuo immobile a Torino. Dati OMI 2025, coefficienti FIAIP, 35+ zone.')} />
        <meta property="og:type" content="website" />
      </Helmet>

      <ToolStructuredData
        name={t('propertyValuation.structuredData.name', 'Calcolatore Valutazione Immobiliare Torino')}
        description={t('propertyValuation.structuredData.description', 'Strumento gratuito per calcolare il valore di mercato di un immobile a Torino basato su dati OMI e coefficienti FIAIP 2024-2025.')}
        url={`https://junglerent.it/${lang === 'it' ? 'valutazione-immobile' : 'property-valuation'}`}
        applicationCategory="FinanceApplication"
      />

      <Navigation />
      <MobileHeader />

      <main id="main-content" className="min-h-screen bg-background pt-20 md:pt-24">
        <div className="container px-4 md:px-8 mx-auto">
          <Breadcrumbs 
            items={[
              { label: t('breadcrumbs.home'), href: '/' },
              { label: t('propertyValuation.breadcrumb', 'Valutazione Immobile') }
            ]} 
          />
        </div>

        {/* Hero Section */}
        <section className="py-8 md:py-12">
          <div className="container px-4 md:px-8 mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-3xl mb-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                <Calculator className="w-4 h-4" />
                {t('propertyValuation.badge', 'Strumento Gratuito')}
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold mb-4 leading-tight text-foreground tracking-tight">
                {t('propertyValuation.title', 'Valutazione Immobiliare')} <span className="text-primary">Torino</span>
              </h1>
              
              <p className="text-lg text-muted-foreground mb-6">
                {t('propertyValuation.subtitle', 'Calcola il valore del tuo immobile con dati OMI 2025 e coefficienti FIAIP. 35+ zone di Torino, stima accurata con margine ±5%.')}
              </p>

              {/* Key features */}
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                  <Building2 className="w-4 h-4 text-primary" />
                  <span>{t('propertyValuation.feature1', '35+ zone Torino')}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                  <TrendingUp className="w-4 h-4 text-primary" />
                  <span>{t('propertyValuation.feature2', 'Dati OMI Nov 2025')}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted">
                  <Calculator className="w-4 h-4 text-primary" />
                  <span>{t('propertyValuation.feature3', '9 categorie coefficienti')}</span>
                </div>
              </div>
            </motion.div>

            {/* Valuator Component */}
            <PropertyValuator 
              onValueCalculated={handleValueCalculated}
              onContactClick={handleContactClick}
            />
          </div>
        </section>

        {/* Data Sources */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl font-display font-bold mb-4">
                {t('propertyValuation.sources.title', 'Fonti Ufficiali')}
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                {t('propertyValuation.sources.description', 'I dati utilizzati provengono da fonti ufficiali e aggiornate a novembre 2025.')}
              </p>
              <div className="flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                <span className="px-3 py-1 rounded-full bg-background border">OMI Agenzia Entrate</span>
                <span className="px-3 py-1 rounded-full bg-background border">FIAIP Torino</span>
                <span className="px-3 py-1 rounded-full bg-background border">Borsino Immobiliare</span>
                <span className="px-3 py-1 rounded-full bg-background border">RealAdvisor</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <MobileFooter />

      <QuickSellerLeadDialog 
        open={isDialogOpen} 
        onOpenChange={setIsDialogOpen}
      />
    </>
  );
};

export default PropertyValuation;
