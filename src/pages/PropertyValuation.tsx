import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Building2, Calculator, TrendingUp, BookOpen, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Navigation, Footer, MobileHeader, MobileFooter } from "@/components/layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { PropertyValuator } from "@/components/tools/PropertyValuator";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PropertyValuatorSchema, 
  PropertyValuatorHowTo, 
  PropertyValuatorFAQ 
} from "@/components/tools/ToolStructuredData";

const PropertyValuation = () => {
  const { t, i18n } = useTranslation();
  const [estimatedValue, setEstimatedValue] = useState<number | null>(null);
  const lang = i18n.language;

  const handleValueCalculated = (value: number) => {
    setEstimatedValue(value);
  };

  return (
    <>
      <Helmet>
        <title>{t('propertyValuation.meta.title', 'Valutazione Immobiliare Torino | Calcola il Valore della Tua Casa Gratis')}</title>
        <meta 
          name="description" 
          content={t('propertyValuation.meta.description', 'Calcola gratuitamente il valore del tuo immobile a Torino. Dati OMI novembre 2025, coefficienti FIAIP, 35+ zone. Stima accurata ±5%. Nessuna registrazione richiesta.')} 
        />
        <link rel="canonical" href={`https://junglerent.it/${lang === 'it' ? 'valutazione-immobile' : 'property-valuation'}`} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="keywords" content={t('propertyValuation.meta.keywords', 'valutazione immobiliare torino, quanto vale casa mia torino, calcolo valore immobile torino, stima casa torino gratis, OMI torino 2025, prezzo metro quadro torino, vendere casa torino')} />
        <meta property="og:title" content={t('propertyValuation.meta.title', 'Valutazione Immobiliare Torino | Calcola il Valore della Tua Casa Gratis')} />
        <meta property="og:description" content={t('propertyValuation.meta.description', 'Calcola gratuitamente il valore del tuo immobile a Torino. Dati OMI novembre 2025, coefficienti FIAIP, 35+ zone.')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://junglerent.it/${lang === 'it' ? 'valutazione-immobile' : 'property-valuation'}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t('propertyValuation.meta.title', 'Valutazione Immobiliare Torino | Calcola il Valore della Tua Casa Gratis')} />
        <meta name="twitter:description" content={t('propertyValuation.meta.description', 'Calcola gratuitamente il valore del tuo immobile a Torino.')} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/valutazione-immobile" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/property-valuation" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/valutazione-immobile" />
      </Helmet>

      <PropertyValuatorSchema />
      <PropertyValuatorHowTo />
      <PropertyValuatorFAQ lang={lang as 'it' | 'en'} />

      <Navigation />
      <MobileHeader />

      <main id="main-content" className="min-h-screen bg-background pt-20 md:pt-24">
        <div className="container px-4 md:px-8 mx-auto">
          <Breadcrumbs 
            items={[
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
            />
          </div>
        </section>

        {/* Related Resources & CTA Section */}
        <section className="py-8 md:py-12 bg-muted/30">
          <div className="container px-4 md:px-8 mx-auto">
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* Blog Link */}
              <Link to="/blog/valutazione-immobiliare-torino-guida-completa">
                <Card className="h-full hover:border-primary/50 transition-colors cursor-pointer">
                  <CardContent className="p-6 flex items-start gap-4">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-2">
                        {lang === 'it' ? 'Guida completa valutazione immobiliare' : 'Complete property valuation guide'}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {lang === 'it' 
                          ? 'Approfondisci metodi, coefficienti e consigli per una stima accurata del tuo immobile a Torino.'
                          : 'Explore methods, coefficients and tips for an accurate estimate of your property in Turin.'
                        }
                      </p>
                      <span className="text-sm text-primary font-medium inline-flex items-center gap-1">
                        {lang === 'it' ? 'Leggi la guida' : 'Read the guide'}
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              {/* Sellers CTA */}
              <Card className="h-full bg-primary text-primary-foreground">
                <CardContent className="p-6 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      {lang === 'it' ? 'Vuoi vendere la tua casa?' : 'Want to sell your property?'}
                    </h3>
                    <p className="text-sm opacity-90 mb-4">
                      {lang === 'it' 
                        ? 'Scopri come vendere direttamente a investitori qualificati, risparmiando sulle commissioni di agenzia.'
                        : 'Learn how to sell directly to qualified investors, saving on agency fees.'
                      }
                    </p>
                  </div>
                  <Link to={lang === 'it' ? '/vendi' : '/sell'}>
                    <Button variant="secondary" className="w-full gap-2">
                      {lang === 'it' ? 'Scopri come vendere' : 'Learn how to sell'}
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  
                  {/* Link to About for SEO - NEW */}
                  <p className="mt-3 text-xs text-center opacity-80">
                    <Link 
                      to={lang === 'it' ? '/chi-siamo' : '/about'}
                      className="hover:underline"
                    >
                      {lang === 'it' ? 'Scopri chi siamo →' : 'Learn about us →'}
                    </Link>
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Data Sources */}
            <div className="max-w-3xl mx-auto text-center mt-12">
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
    </>
  );
};

export default PropertyValuation;
