import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { SellerSection } from "@/components/SellerSection";
import { StructuredData } from "@/components/StructuredData";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Vendi = () => {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language.startsWith('it');

  const title = isItalian 
    ? "Vendi la tua casa a Torino - Jungle Rent"
    : "Sell your property in Turin - Jungle Rent";
  
  const description = isItalian
    ? "Vendi la tua casa direttamente a Jungle Rent. Zero commissioni, zero visite, vendita garantita in 60-90 giorni."
    : "Sell your property directly to Jungle Rent. Zero commissions, zero visits, guaranteed sale in 60-90 days.";

  return (
    <main role="main" className="min-h-screen bg-background" id="main-content" tabIndex={-1}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://junglerent.it/vendi" />
        
        {/* Hreflang */}
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/vendi" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/sell" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/vendi" />
        
        {/* Geo Targeting */}
        <meta name="geo.region" content="IT-21" />
        <meta name="geo.placename" content="Torino" />
      </Helmet>
      
      <StructuredData />
      <Navigation />
      
      {/* Add top padding to account for fixed nav */}
      <div className="pt-20 md:pt-24">
        <SellerSection />
      </div>
      
      <Footer />
    </main>
  );
};

export default Vendi;
