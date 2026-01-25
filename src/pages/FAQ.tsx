import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Navigation, MobileHeader, Footer, BottomNav } from "@/components/layout";
import { FAQSection } from "@/components/FAQSection";

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language.startsWith('it');

  const title = isItalian 
    ? "FAQ - Domande Frequenti | Jungle Rent"
    : "FAQ - Frequently Asked Questions | Jungle Rent";
  
  const description = isItalian
    ? "Risposte alle domande più frequenti su investimenti immobiliari, vendita immobili e affitti studenteschi a Torino con Jungle Rent."
    : "Answers to frequently asked questions about real estate investments, property sales and student rentals in Turin with Jungle Rent.";

  // FAQ schema for structured data - using key FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": isItalian ? "Quanto posso investire con Jungle Rent?" : "How much can I invest with Jungle Rent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isItalian 
            ? "L'investimento minimo è di €100. Non c'è un massimo, ma consigliamo di diversificare su più immobili."
            : "The minimum investment is €100. There's no maximum, but we recommend diversifying across multiple properties."
        }
      },
      {
        "@type": "Question",
        "name": isItalian ? "Quali sono i rendimenti attesi?" : "What are the expected returns?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isItalian
            ? "Il rendimento target è del 7-9% annuo, derivante da affitti studenteschi a Torino con occupancy rate del 95%."
            : "The target return is 7-9% annually, from student rentals in Turin with a 95% occupancy rate."
        }
      },
      {
        "@type": "Question",
        "name": isItalian ? "Come posso vendere casa a Torino senza agenzia?" : "How can I sell my house in Turin without an agency?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isItalian
            ? "Jungle Rent acquista direttamente il tuo immobile senza commissioni. Valutazione gratuita in 24 ore, offerta in 48 ore, chiusura in 60-90 giorni."
            : "Jungle Rent directly purchases your property with no fees. Free valuation in 24 hours, offer in 48 hours, closing in 60-90 days."
        }
      },
      {
        "@type": "Question",
        "name": isItalian ? "Chi è Jungle Rent?" : "Who is Jungle Rent?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isItalian
            ? "Jungle Rent è una startup innovativa torinese fondata nel 2025, incubata presso 2i3T (Incubatore Imprese Innovative Università di Torino). Ci occupiamo di investimenti immobiliari frazionati e acquisizione immobili."
            : "Jungle Rent is an innovative Turin startup founded in 2025, incubated at 2i3T (University of Turin Business Incubator). We specialize in fractional real estate investments and property acquisitions."
        }
      }
    ]
  };

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
        
        {/* FAQ Schema */}
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      </Helmet>
      
      <Navigation />
      
      <div className="pt-20 pb-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8 text-center">
            {isItalian ? "Domande frequenti" : "Frequently asked questions"}
          </h1>
        </div>
        <FAQSection />
      </div>
      
      <Footer />
      <BottomNav />
    </main>
  );
};

export default FAQ;
