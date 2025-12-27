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

// Property Valuator Schemas
export const PropertyValuatorSchema = () => (
  <ToolStructuredData
    name="Calcolatore Valutazione Immobiliare Torino"
    description="Calcola gratuitamente il valore di mercato del tuo immobile a Torino. Dati OMI Agenzia Entrate novembre 2025, coefficienti FIAIP, 35+ zone, stima accurata ±5%."
    url="/valutazione-immobile"
    applicationCategory="FinanceApplication"
    dateModified="2025-12-27"
    featureList={[
      "35+ zone di Torino con prezzi OMI",
      "Dati OMI Agenzia Entrate novembre 2025",
      "9 categorie coefficienti FIAIP",
      "Confronto commissioni agenzia vs Jungle Rent",
      "Upload foto e video proprietà",
      "Richiesta valutazione professionale gratuita",
      "Stima range valore ±5%",
      "Calcolo prezzo al metro quadro"
    ]}
    aggregateRating={{
      ratingValue: "4.8",
      ratingCount: "127"
    }}
  />
);

export const PropertyValuatorHowTo = () => (
  <HowToStructuredData
    name="Come calcolare il valore della tua casa a Torino"
    description="Guida passo-passo per valutare il tuo immobile a Torino con dati OMI ufficiali 2025 e coefficienti FIAIP. Stima gratuita in 3 minuti."
    url="/valutazione-immobile"
    totalTime="PT3M"
    estimatedCost={{ currency: "EUR", value: "0" }}
    steps={[
      {
        name: "Seleziona la zona di Torino",
        text: "Scegli tra 35+ zone di Torino: Centro, Crocetta, San Salvario, Vanchiglia, Aurora, Lingotto e molte altre. I prezzi OMI variano significativamente tra quartieri."
      },
      {
        name: "Inserisci la superficie",
        text: "Indica i metri quadri commerciali del tuo immobile. La superficie commerciale include muri perimetrali e quote di spazi comuni."
      },
      {
        name: "Specifica il piano",
        text: "Seleziona il piano dell'immobile. I piani alti hanno coefficienti maggiori (+5-10%), i piani terra o seminterrati valori inferiori (-10-20%)."
      },
      {
        name: "Indica lo stato di manutenzione",
        text: "Scegli tra ottimo, buono, normale o da ristrutturare. Lo stato influenza il valore fino al ±15%."
      },
      {
        name: "Aggiungi caratteristiche accessorie",
        text: "Indica se hai ascensore, terrazzo, cantina, box auto. Ogni elemento aggiunge o sottrae valore secondo coefficienti FIAIP."
      },
      {
        name: "Visualizza la stima",
        text: "Ottieni il range di valore (min-max) con accuratezza ±5%, il prezzo al metro quadro e il confronto commissioni tra agenzia tradizionale e Jungle Rent."
      },
      {
        name: "Richiedi valutazione professionale",
        text: "Se interessato a vendere, carica foto e video dell'immobile e richiedi una valutazione gratuita da Jungle Rent."
      }
    ]}
  />
);

interface FAQItem {
  question: string;
  answer: string;
}

interface PropertyValuatorFAQProps {
  lang?: 'it' | 'en';
}

export const PropertyValuatorFAQ = ({ lang = 'it' }: PropertyValuatorFAQProps) => {
  const baseUrl = typeof window !== 'undefined' ? window.location.origin : 'https://junglerent.it';
  
  const faqsIT: FAQItem[] = [
    {
      question: "Quanto vale il mio appartamento a Torino?",
      answer: "Il valore dipende da zona, metratura, piano, stato e caratteristiche. Usa il nostro calcolatore gratuito con dati OMI 2025 per una stima accurata ±5%. Zone come Crocetta e Centro hanno prezzi medi di €2.800-3.500/mq, mentre Aurora e Barriera di Milano €1.200-1.800/mq."
    },
    {
      question: "Cosa sono i dati OMI?",
      answer: "OMI (Osservatorio del Mercato Immobiliare) è la banca dati ufficiale dell'Agenzia delle Entrate che registra i valori di compravendita degli immobili in Italia. I dati vengono aggiornati semestralmente e sono la fonte più affidabile per le valutazioni immobiliari."
    },
    {
      question: "La valutazione online è gratuita?",
      answer: "Sì, il calcolatore è completamente gratuito e non richiede registrazione. Puoi anche richiedere una valutazione professionale gratuita da Jungle Rent caricando foto dell'immobile."
    },
    {
      question: "Quanto sono accurate le stime?",
      answer: "Le stime hanno un margine di accuratezza del ±5% rispetto al valore di mercato. Utilizziamo dati OMI novembre 2025 e coefficienti FIAIP per calcolare il valore in base a 9 parametri: zona, piano, stato, ascensore, terrazzo, vista, riscaldamento, cantina e posto auto."
    },
    {
      question: "Jungle Rent addebita commissioni per la valutazione?",
      answer: "No, la valutazione è gratuita. Se decidi di vendere a Jungle Rent, non paghi commissioni di agenzia perché acquistiamo direttamente. Se vendi tramite agenzia tradizionale, la commissione media a Torino è del 3-4%."
    },
    {
      question: "Come funziona la vendita a Jungle Rent?",
      answer: "Jungle Rent acquista direttamente immobili in zone universitarie di Torino (San Salvario, Crocetta, Vanchiglia, etc.). Dopo la valutazione, ricevi un'offerta entro 48 ore. Se accetti, chiudiamo in 60-90 giorni senza commissioni di agenzia."
    }
  ];

  const faqsEN: FAQItem[] = [
    {
      question: "How much is my apartment worth in Turin?",
      answer: "The value depends on location, size, floor, condition, and features. Use our free calculator with OMI 2025 data for an accurate ±5% estimate. Areas like Crocetta and Centro have average prices of €2,800-3,500/sqm, while Aurora and Barriera di Milano are €1,200-1,800/sqm."
    },
    {
      question: "What is OMI data?",
      answer: "OMI (Real Estate Market Observatory) is the official database of the Italian Revenue Agency that records property transaction values in Italy. Data is updated bi-annually and is the most reliable source for property valuations."
    },
    {
      question: "Is the online valuation free?",
      answer: "Yes, the calculator is completely free and requires no registration. You can also request a free professional valuation from Jungle Rent by uploading property photos."
    },
    {
      question: "How accurate are the estimates?",
      answer: "Estimates have an accuracy margin of ±5% compared to market value. We use November 2025 OMI data and FIAIP coefficients to calculate value based on 9 parameters: zone, floor, condition, elevator, terrace, view, heating, cellar, and parking."
    },
    {
      question: "Does Jungle Rent charge fees for valuation?",
      answer: "No, valuation is free. If you decide to sell to Jungle Rent, you pay no agency fees because we buy directly. If you sell through a traditional agency, the average commission in Turin is 3-4%."
    },
    {
      question: "How does selling to Jungle Rent work?",
      answer: "Jungle Rent directly purchases properties in Turin's university areas (San Salvario, Crocetta, Vanchiglia, etc.). After valuation, you receive an offer within 48 hours. If you accept, we close in 60-90 days with no agency fees."
    }
  ];

  const faqs = lang === 'en' ? faqsEN : faqsIT;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(faqSchema)}
      </script>
    </Helmet>
  );
};

export default ToolStructuredData;
