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

// ===== STUDENT SERVICES DIRECTORY SCHEMAS =====

interface StudentServicesDirectorySchemaProps {
  lang?: 'it' | 'en';
  totalServices: number;
}

export const StudentServicesDirectorySchema = ({ lang = 'it', totalServices }: StudentServicesDirectorySchemaProps) => {
  const isItalian = lang === 'it';
  
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": isItalian 
      ? "Sportelli e Servizi per Studenti a Torino" 
      : "Student Services and Offices in Turin",
    "description": isItalian
      ? "Directory completa degli sportelli e servizi per studenti universitari a Torino: segreterie UniTO e PoliTO, EDISU, borse di studio, DSA, Erasmus, counseling e molto altro."
      : "Complete directory of student services and offices in Turin: UniTO and PoliTO registrars, EDISU, scholarships, disability services, Erasmus, counseling and more.",
    "url": isItalian 
      ? "https://junglerent.it/strumenti/sportelli-studenti-torino"
      : "https://junglerent.it/tools/student-services-turin",
    "inLanguage": isItalian ? "it-IT" : "en-US",
    "dateModified": "2025-12-28",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Jungle Rent",
      "url": "https://junglerent.it"
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".subtitle"]
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": totalServices
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
    </Helmet>
  );
};

export const StudentServicesDirectoryBreadcrumb = ({ lang = 'it' }: { lang?: 'it' | 'en' }) => {
  const isItalian = lang === 'it';
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://junglerent.it"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isItalian ? "Studenti" : "Students",
        "item": isItalian ? "https://junglerent.it/studenti" : "https://junglerent.it/students"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": isItalian ? "Strumenti" : "Tools",
        "item": isItalian ? "https://junglerent.it/studenti/strumenti" : "https://junglerent.it/students/tools"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": isItalian ? "Sportelli e Servizi" : "Student Services",
        "item": isItalian 
          ? "https://junglerent.it/strumenti/sportelli-studenti-torino"
          : "https://junglerent.it/tools/student-services-turin"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export const StudentServicesDirectoryFAQ = ({ lang = 'it' }: { lang?: 'it' | 'en' }) => {
  const faqsIT: FAQItem[] = [
    {
      question: "Come fare domanda per la borsa di studio EDISU?",
      answer: "La domanda per la borsa di studio EDISU va presentata online sul portale EDISU Piemonte entro le scadenze annuali (solitamente settembre). Servono ISEE universitario, iscrizione all'università e requisiti di merito. L'importo varia da €1.800 a €5.200 annui."
    },
    {
      question: "Dove si trova la segreteria studenti UniTO?",
      answer: "L'Università di Torino ha diverse segreterie: la principale è in Via Po 29 (Centro). Ogni dipartimento ha la propria segreteria didattica. Per informazioni generali c'è lo sportello Unito Orienta in Via Verdi 8."
    },
    {
      question: "Come prenotare un appuntamento al Politecnico di Torino?",
      answer: "Per prenotare un appuntamento al PoliTO usa il sistema online Ticket Office accessibile dal Portale della Didattica. La maggior parte dei servizi (segreteria, borse di studio, Erasmus) richiede prenotazione. Tempi medi: 2-5 giorni lavorativi."
    },
    {
      question: "Quali servizi offre EDISU oltre alle borse di studio?",
      answer: "EDISU Piemonte offre: mense universitarie (pasti da €2,50), residenze studentesche, contributi affitto, borse di studio, prestiti d'onore, servizi per studenti disabili e DSA, orientamento al lavoro e attività culturali."
    },
    {
      question: "Come richiedere assistenza DSA all'università a Torino?",
      answer: "Per assistenza DSA contatta l'Ufficio Studenti Disabili e DSA della tua università. All'UniTO è in Via Po 31, al PoliTO in Corso Duca degli Abruzzi 24. Servono certificazione DSA e richiesta formale. Ottieni tutor, tempo aggiuntivo esami e materiali accessibili."
    },
    {
      question: "Dove fare l'Erasmus da Torino?",
      answer: "Sia UniTO che PoliTO offrono programmi Erasmus+ con centinaia di destinazioni in Europa. Contatta l'Ufficio Relazioni Internazionali: UniTO in Via Verdi 8, PoliTO in Corso Duca degli Abruzzi 24. Le domande si presentano solitamente tra febbraio e marzo."
    },
    {
      question: "Quali sono gli orari della segreteria UniTO?",
      answer: "Le segreterie UniTO sono aperte generalmente dal lunedì al venerdì, con orari variabili per dipartimento. Lo sportello centrale è aperto 9:00-12:00 e 14:00-16:00. Molti servizi sono disponibili online 24/7 tramite MyUniTO."
    },
    {
      question: "Come accedere al counseling psicologico universitario?",
      answer: "Sia UniTO che PoliTO offrono servizi di counseling psicologico gratuiti per studenti. All'UniTO prenota tramite CUS Torino (Centro Universitario Sportivo) o Servizio Counseling. Al PoliTO contatta il Servizio Orientamento. I colloqui sono riservati e gratuiti."
    }
  ];

  const faqsEN: FAQItem[] = [
    {
      question: "How to apply for an EDISU scholarship?",
      answer: "Apply for the EDISU scholarship online through the EDISU Piemonte portal before annual deadlines (usually September). You need university ISEE, university enrollment, and merit requirements. Amount ranges from €1,800 to €5,200 annually."
    },
    {
      question: "Where is the UniTO student office located?",
      answer: "The University of Turin has several offices: the main one is at Via Po 29 (Center). Each department has its own teaching office. For general information, there's the Unito Orienta desk at Via Verdi 8."
    },
    {
      question: "How to book an appointment at Politecnico di Torino?",
      answer: "To book an appointment at PoliTO, use the online Ticket Office system accessible from the Teaching Portal. Most services (registry, scholarships, Erasmus) require booking. Average waiting time: 2-5 business days."
    },
    {
      question: "What services does EDISU offer besides scholarships?",
      answer: "EDISU Piemonte offers: university canteens (meals from €2.50), student residences, rent subsidies, scholarships, honor loans, services for disabled and DSA students, career guidance, and cultural activities."
    },
    {
      question: "How to request DSA assistance at university in Turin?",
      answer: "For DSA assistance, contact the Disabled Students and DSA Office at your university. At UniTO it's at Via Po 31, at PoliTO at Corso Duca degli Abruzzi 24. You need DSA certification and a formal request. You'll get tutors, extra exam time, and accessible materials."
    },
    {
      question: "Where to do Erasmus from Turin?",
      answer: "Both UniTO and PoliTO offer Erasmus+ programs with hundreds of destinations across Europe. Contact the International Relations Office: UniTO at Via Verdi 8, PoliTO at Corso Duca degli Abruzzi 24. Applications are usually submitted between February and March."
    },
    {
      question: "What are UniTO office hours?",
      answer: "UniTO offices are generally open Monday to Friday, with varying hours by department. The central desk is open 9:00-12:00 and 14:00-16:00. Many services are available online 24/7 through MyUniTO."
    },
    {
      question: "How to access university psychological counseling?",
      answer: "Both UniTO and PoliTO offer free psychological counseling services for students. At UniTO, book through CUS Torino (University Sports Center) or Counseling Service. At PoliTO, contact the Orientation Service. Sessions are confidential and free."
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

// ===== CHEAP EATS DIRECTORY SCHEMAS =====

interface CheapEatsDirectorySchemaProps {
  lang?: 'it' | 'en';
  totalLocations: number;
}

export const CheapEatsDirectorySchema = ({ lang = 'it', totalLocations }: CheapEatsDirectorySchemaProps) => {
  const isItalian = lang === 'it';
  
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": isItalian 
      ? "Dove Mangiare Cheap a Torino - Guida Studenti 2025" 
      : "Where to Eat Cheap in Turin - Student Guide 2025",
    "description": isItalian
      ? "Guida completa dove mangiare a Torino spendendo poco: mense EDISU da €3, street food, piole piemontesi, ristoranti economici. 20 locali verificati dicembre 2025."
      : "Complete guide to eating cheap in Turin: EDISU canteens from €3, street food, Piedmontese taverns, budget restaurants. 20 venues verified December 2025.",
    "url": isItalian 
      ? "https://junglerent.it/strumenti/dove-mangiare-torino"
      : "https://junglerent.it/tools/cheap-eats-turin",
    "inLanguage": isItalian ? "it-IT" : "en-US",
    "dateModified": "2025-12-28",
    "isPartOf": {
      "@type": "WebSite",
      "name": "Jungle Rent",
      "url": "https://junglerent.it"
    },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".subtitle"]
    },
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": totalLocations
    }
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(webPageSchema)}
      </script>
    </Helmet>
  );
};

export const CheapEatsDirectoryBreadcrumb = ({ lang = 'it' }: { lang?: 'it' | 'en' }) => {
  const isItalian = lang === 'it';
  
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://junglerent.it"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isItalian ? "Studenti" : "Students",
        "item": isItalian ? "https://junglerent.it/studenti" : "https://junglerent.it/students"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": isItalian ? "Strumenti" : "Tools",
        "item": isItalian ? "https://junglerent.it/studenti/strumenti" : "https://junglerent.it/students/tools"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": isItalian ? "Dove Mangiare Cheap" : "Cheap Eats",
        "item": isItalian 
          ? "https://junglerent.it/strumenti/dove-mangiare-torino"
          : "https://junglerent.it/tools/cheap-eats-turin"
      }
    ]
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbSchema)}
      </script>
    </Helmet>
  );
};

export const CheapEatsDirectoryFAQ = ({ lang = 'it' }: { lang?: 'it' | 'en' }) => {
  const faqsIT: FAQItem[] = [
    {
      question: "Dove mangiare a Torino con meno di 5 euro?",
      answer: "Le mense EDISU offrono pasti completi da €2,50 a €5 per studenti. Altre opzioni economiche: kebab da €4, pizza al taglio da €3, panini da Porta Palazzo, street food etnico in Barriera di Milano. La nostra directory include 20+ locali verificati sotto i €5."
    },
    {
      question: "Quali sono le mense EDISU a Torino?",
      answer: "EDISU gestisce diverse mense a Torino: Borsellino (Via Principe Amedeo), Castelfidardo (Via Castelfidardo 30), Paolo Borsellino (Corso Tassoni), Olimpia (Via Artom). I prezzi variano da €2,50 a €5 in base all'ISEE. Orari: pranzo 11:30-14:30, cena 19:00-21:00."
    },
    {
      question: "Dove trovare street food economico a Torino?",
      answer: "Le zone migliori per street food economico sono: Porta Palazzo (mercato più grande d'Europa), San Salvario (via Madama Cristina), Barriera di Milano (cucina etnica). Trovi kebab, falafel, porchetta, panini, pizza al taglio da €3-7."
    },
    {
      question: "Ci sono ristoranti vegetariani economici a Torino?",
      answer: "Sì, Torino ha diverse opzioni vegetariane economiche: Soul Kitchen (menu €8-12), Loving Hut (vegan da €7), mense EDISU (opzione vegetariana sempre disponibile), ristoranti indiani come Shri Ganesh (thali vegetariano €8). Molti locali etnici hanno ampie opzioni vegetariane."
    },
    {
      question: "Qual è il quartiere più economico per mangiare a Torino?",
      answer: "I quartieri più economici sono: Barriera di Milano (cucina etnica, prezzi bassi), Aurora/Porta Palazzo (mercato e street food), San Salvario (mix di opzioni). Il Centro è generalmente più caro, ma trovi comunque opzioni economiche come mense e tavole calde."
    },
    {
      question: "Quanto costa mangiare in mensa EDISU?",
      answer: "I prezzi delle mense EDISU dipendono dall'ISEE: Fascia 1 (€2,50) per ISEE sotto €6.000, Fascia 2 (€3,50) fino a €10.000, Fascia 3 (€4,50) fino a €15.000, Fascia 4 (€5,00) per ISEE superiori. Il pasto include primo, secondo, contorno, pane e frutta."
    }
  ];

  const faqsEN: FAQItem[] = [
    {
      question: "Where to eat in Turin for under 5 euros?",
      answer: "EDISU canteens offer complete meals from €2.50 to €5 for students. Other budget options: kebab from €4, pizza slices from €3, sandwiches from Porta Palazzo, ethnic street food in Barriera di Milano. Our directory includes 20+ verified locations under €5."
    },
    {
      question: "What are the EDISU canteens in Turin?",
      answer: "EDISU manages several canteens in Turin: Borsellino (Via Principe Amedeo), Castelfidardo (Via Castelfidardo 30), Paolo Borsellino (Corso Tassoni), Olimpia (Via Artom). Prices range from €2.50 to €5 based on ISEE. Hours: lunch 11:30-14:30, dinner 19:00-21:00."
    },
    {
      question: "Where to find cheap street food in Turin?",
      answer: "The best areas for cheap street food are: Porta Palazzo (Europe's largest market), San Salvario (Via Madama Cristina), Barriera di Milano (ethnic cuisine). You'll find kebab, falafel, porchetta, sandwiches, pizza slices from €3-7."
    },
    {
      question: "Are there cheap vegetarian restaurants in Turin?",
      answer: "Yes, Turin has several budget vegetarian options: Soul Kitchen (menu €8-12), Loving Hut (vegan from €7), EDISU canteens (vegetarian option always available), Indian restaurants like Shri Ganesh (vegetarian thali €8). Many ethnic restaurants have extensive vegetarian options."
    },
    {
      question: "What's the cheapest neighborhood to eat in Turin?",
      answer: "The cheapest neighborhoods are: Barriera di Milano (ethnic cuisine, low prices), Aurora/Porta Palazzo (market and street food), San Salvario (mix of options). The Center is generally more expensive, but you can still find budget options like canteens and cafeterias."
    },
    {
      question: "How much does it cost to eat at an EDISU canteen?",
      answer: "EDISU canteen prices depend on ISEE: Tier 1 (€2.50) for ISEE under €6,000, Tier 2 (€3.50) up to €10,000, Tier 3 (€4.50) up to €15,000, Tier 4 (€5.00) for higher ISEE. The meal includes first course, second course, side dish, bread, and fruit."
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
