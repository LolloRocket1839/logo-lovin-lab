import { Helmet } from "react-helmet";

interface ToolStructuredDataProps {
  name: string;
  description: string;
  url: string;
  applicationCategory: string;
  operatingSystem?: string;
  offers?: {
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    ratingValue: string;
    ratingCount: string;
  };
  screenshot?: string;
  featureList?: string[];
  softwareVersion?: string;
  datePublished?: string;
  dateModified?: string;
  inLanguage?: string[];
  author?: {
    name: string;
    url: string;
  };
}

export const ToolStructuredData = ({
  name,
  description,
  url,
  applicationCategory,
  operatingSystem = "Web Browser",
  offers = { price: "0", priceCurrency: "EUR" },
  aggregateRating,
  screenshot,
  featureList,
  softwareVersion = "1.0",
  datePublished = "2025-12-01",
  dateModified = "2025-12-19",
  inLanguage = ["it", "en"],
  author = {
    name: "Jungle Rent",
    url: "https://junglerent.it"
  }
}: ToolStructuredDataProps) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://junglerent.it';
  
  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": name,
    "description": description,
    "url": url.startsWith('http') ? url : `${baseUrl}${url}`,
    "applicationCategory": applicationCategory,
    "operatingSystem": operatingSystem,
    "softwareVersion": softwareVersion,
    "datePublished": datePublished,
    "dateModified": dateModified,
    "inLanguage": inLanguage,
    "offers": {
      "@type": "Offer",
      "price": offers.price,
      "priceCurrency": offers.priceCurrency,
      "availability": "https://schema.org/InStock"
    },
    "author": {
      "@type": "Organization",
      "name": author.name,
      "url": author.url
    },
    "publisher": {
      "@type": "Organization",
      "name": "Jungle Rent",
      "url": "https://junglerent.it",
      "logo": {
        "@type": "ImageObject",
        "url": `${baseUrl}/jungle-rent-logo.svg`
      }
    },
    ...(aggregateRating && {
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": aggregateRating.ratingValue,
        "ratingCount": aggregateRating.ratingCount,
        "bestRating": "5",
        "worstRating": "1"
      }
    }),
    ...(screenshot && {
      "screenshot": screenshot.startsWith('http') ? screenshot : `${baseUrl}${screenshot}`
    }),
    ...(featureList && featureList.length > 0 && {
      "featureList": featureList.join(", ")
    }),
    "isAccessibleForFree": true,
    "browserRequirements": "Requires JavaScript. Requires HTML5.",
    "permissions": "No special permissions required"
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(softwareApplicationSchema)}
      </script>
    </Helmet>
  );
};

// Pre-configured schemas for each tool
export const BudgetCalculatorSchema = () => (
  <ToolStructuredData
    name="Calcolatore Budget Studenti Torino"
    description="Strumento gratuito per calcolare il budget mensile per studenti universitari a Torino. Stima affitto, utenze, cibo, trasporti e tempo libero in base al quartiere e allo stile di vita."
    url="/studenti/strumenti/budget"
    applicationCategory="FinanceApplication"
    featureList={[
      "Calcolo affitto per quartiere",
      "Stima utenze stagionali",
      "Budget cibo personalizzato",
      "Costi trasporti GTT",
      "Proiezione 12 mesi",
      "Confronto quartieri",
      "Esportazione PDF",
      "Consigli AI personalizzati"
    ]}
    aggregateRating={{
      ratingValue: "4.8",
      ratingCount: "156"
    }}
  />
);

export const GradeCalculatorSchema = () => (
  <ToolStructuredData
    name="Calcolatore Media Ponderata Università"
    description="Calcola la tua media ponderata universitaria con questo strumento gratuito. Supporta lodi, simulazione voti futuri, calcolo voto di laurea e esportazione PDF."
    url="/studenti/strumenti/media"
    applicationCategory="EducationalApplication"
    featureList={[
      "Media ponderata CFU",
      "Gestione lodi (30L)",
      "Simulazione voti futuri",
      "Calcolo voto di laurea",
      "Distribuzione voti",
      "Esportazione PDF",
      "Condivisione WhatsApp",
      "Salvataggio locale"
    ]}
    aggregateRating={{
      ratingValue: "4.9",
      ratingCount: "234"
    }}
  />
);

export const ExamSessionPlannerSchema = () => (
  <ToolStructuredData
    name="Pianificatore Sessione Esami"
    description="Organizza la tua sessione d'esame con questo pianificatore gratuito. Gestisci date, CFU, difficoltà e crea un piano di studio ottimale."
    url="/studenti/strumenti/sessione"
    applicationCategory="EducationalApplication"
    featureList={[
      "Calendario esami interattivo",
      "Priorità automatica",
      "Gestione CFU",
      "Piano di studio generato",
      "Esportazione calendario",
      "Condivisione piano",
      "Alert sovrapposizioni",
      "Salvataggio locale"
    ]}
    aggregateRating={{
      ratingValue: "4.7",
      ratingCount: "98"
    }}
  />
);

export default ToolStructuredData;
