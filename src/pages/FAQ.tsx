import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Navigation } from "@/components/Navigation";
import { MobileHeader } from "@/components/MobileHeader";
import { FAQSection } from "@/components/FAQSection";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language.startsWith('it');

  const title = isItalian 
    ? "FAQ - Domande Frequenti | Jungle Rent"
    : "FAQ - Frequently Asked Questions | Jungle Rent";
  
  const description = isItalian
    ? "Risposte alle domande più frequenti su investimenti immobiliari, vendita immobili e affitti studenteschi a Torino con Jungle Rent."
    : "Answers to frequently asked questions about real estate investments, property sales and student rentals in Turin with Jungle Rent.";

  return (
    <main role="main" className="min-h-screen bg-background">
      <MobileHeader />
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://junglerent.it/faq" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://junglerent.it/faq" />
      </Helmet>
      
      <Navigation />
      
      <div className="pt-20">
        <FAQSection />
      </div>
      
      <Footer />
      <BottomNav />
    </main>
  );
};

export default FAQ;
