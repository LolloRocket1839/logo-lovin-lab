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

interface HowToStep {
  name: string;
  text: string;
  url?: string;
  image?: string;
}

interface HowToStructuredDataProps {
  name: string;
  description: string;
  url: string;
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    value: string;
  };
  steps: HowToStep[];
  image?: string;
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

// HowTo Structured Data Component
export const HowToStructuredData = ({
  name,
  description,
  url,
  totalTime = "PT10M",
  estimatedCost,
  steps,
  image
}: HowToStructuredDataProps) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://junglerent.it';
  
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": name,
    "description": description,
    "url": url.startsWith('http') ? url : `${baseUrl}${url}`,
    "totalTime": totalTime,
    ...(estimatedCost && {
      "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": estimatedCost.currency,
        "value": estimatedCost.value
      }
    }),
    ...(image && {
      "image": {
        "@type": "ImageObject",
        "url": image.startsWith('http') ? image : `${baseUrl}${image}`
      }
    }),
    "step": steps.map((step, index) => ({
      "@type": "HowToStep",
      "position": index + 1,
      "name": step.name,
      "text": step.text,
      ...(step.url && { "url": step.url.startsWith('http') ? step.url : `${baseUrl}${step.url}` }),
      ...(step.image && { 
        "image": {
          "@type": "ImageObject",
          "url": step.image.startsWith('http') ? step.image : `${baseUrl}${step.image}`
        }
      })
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(howToSchema)}
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

export const BudgetCalculatorHowTo = () => (
  <HowToStructuredData
    name="Come calcolare il budget da studente a Torino"
    description="Guida passo-passo per calcolare il budget mensile completo per studenti universitari a Torino, includendo affitto, utenze, cibo e trasporti."
    url="/studenti/strumenti/budget"
    totalTime="PT5M"
    estimatedCost={{ currency: "EUR", value: "0" }}
    steps={[
      {
        name: "Seleziona il quartiere",
        text: "Scegli il quartiere di Torino dove vuoi vivere. I prezzi degli affitti variano significativamente tra zone come San Salvario, Crocetta, Centro e Vanchiglia."
      },
      {
        name: "Indica se hai già un affitto",
        text: "Se hai già trovato casa, attiva il toggle 'Ho già un affitto' e inserisci il costo mensile. Altrimenti, lo strumento userà i prezzi medi del quartiere selezionato."
      },
      {
        name: "Scegli il tipo di alloggio",
        text: "Seleziona tra stanza singola, doppia o monolocale. Ogni opzione ha costi diversi per affitto e utenze."
      },
      {
        name: "Configura le spese alimentari",
        text: "Indica il tuo stile alimentare: cucina a casa, mensa universitaria o mix. Aggiungi il numero di uscite settimanali per calcolare i costi extra."
      },
      {
        name: "Imposta i trasporti",
        text: "Scegli se utilizzi l'abbonamento GTT annuale (200€), mensile, o preferisci bici e piedi. Aggiungi eventuali viaggi a casa."
      },
      {
        name: "Analizza i risultati",
        text: "Visualizza il breakdown completo delle spese mensili, la proiezione annuale e i consigli personalizzati per risparmiare."
      },
      {
        name: "Esporta e condividi",
        text: "Scarica il report in PDF o condividilo via WhatsApp con genitori o coinquilini per pianificare insieme."
      }
    ]}
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

export const GradeCalculatorHowTo = () => (
  <HowToStructuredData
    name="Come calcolare la media ponderata universitaria"
    description="Guida completa per calcolare la media ponderata dei voti universitari, considerando i CFU, le lodi e simulando il voto di laurea."
    url="/studenti/strumenti/media"
    totalTime="PT3M"
    estimatedCost={{ currency: "EUR", value: "0" }}
    steps={[
      {
        name: "Inserisci i tuoi esami",
        text: "Aggiungi ogni esame sostenuto con il nome, il voto ottenuto (18-30) e i CFU corrispondenti. Usa la checkbox per indicare se hai ottenuto la lode."
      },
      {
        name: "Gestisci le lodi",
        text: "Per ogni 30 e lode, lo strumento considera il voto come 30 nella media aritmetica ma applica un bonus nel calcolo del voto di laurea secondo il regolamento del tuo ateneo."
      },
      {
        name: "Visualizza la media ponderata",
        text: "La media ponderata viene calcolata automaticamente: somma di (voto × CFU) diviso la somma dei CFU. Vedi anche la distribuzione dei tuoi voti."
      },
      {
        name: "Simula voti futuri",
        text: "Usa il simulatore 'What If' per vedere come cambierebbe la tua media con diversi voti nei prossimi esami. Pianifica la strategia per il voto di laurea."
      },
      {
        name: "Calcola il voto di laurea",
        text: "Il voto di laurea base viene calcolato moltiplicando la media per 110/30. Aggiungi i punti bonus per lodi e tesi per ottenere la proiezione finale."
      },
      {
        name: "Esporta i risultati",
        text: "Scarica il riepilogo in PDF con tutti i dettagli o condividilo via WhatsApp. I dati vengono salvati automaticamente nel browser."
      }
    ]}
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

export const ExamSessionPlannerHowTo = () => (
  <HowToStructuredData
    name="Come pianificare la sessione d'esami universitaria"
    description="Guida step-by-step per organizzare la sessione d'esami: inserisci gli esami, imposta le priorità e ottieni un piano di studio ottimizzato."
    url="/studenti/strumenti/sessione"
    totalTime="PT10M"
    estimatedCost={{ currency: "EUR", value: "0" }}
    steps={[
      {
        name: "Seleziona la sessione",
        text: "Scegli la sessione d'esame (invernale, estiva o autunnale) e l'anno accademico. Il calendario si adatterà automaticamente alle date della sessione."
      },
      {
        name: "Aggiungi gli esami",
        text: "Inserisci ogni esame con nome, data, CFU e livello di difficoltà (facile, medio, difficile). Indica anche le ore di studio stimate per ciascuno."
      },
      {
        name: "Imposta le priorità",
        text: "Lo strumento calcola automaticamente la priorità basandosi su CFU, difficoltà e giorni rimanenti. Puoi modificare manualmente se necessario."
      },
      {
        name: "Verifica sovrapposizioni",
        text: "Il sistema rileva automaticamente gli esami troppo vicini o nello stesso giorno e ti avvisa con un alert. Considera di spostare qualche data."
      },
      {
        name: "Genera il piano di studio",
        text: "Clicca su 'Genera Piano' per ottenere un calendario di studio ottimizzato con le ore giornaliere consigliate per ogni materia."
      },
      {
        name: "Visualizza il calendario",
        text: "Usa la vista calendario per vedere graficamente la distribuzione degli esami e del tempo di studio nel mese."
      },
      {
        name: "Esporta e condividi",
        text: "Scarica il piano in PDF, esportalo in formato calendario (.ics) per importarlo su Google Calendar, o condividilo con i compagni di corso."
      }
    ]}
  />
);

export default ToolStructuredData;
