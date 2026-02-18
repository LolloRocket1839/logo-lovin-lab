import { useEffect } from "react";

export const StructuredData = () => {
  useEffect(() => {
    const baseUrl = window.location.origin;
    
    // Organization Schema with sameAs for trust graph
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Jungle Rent",
      legalName: "JUNGLE RENT SOCIETA' A RESPONSABILITA' LIMITATA",
      alternateName: ["JungleRent", "JUNGLE RENT S.R.L.", "Jungle Rent Torino", "JungleRent Property Management", "Jungle Rent Italia"],
      url: baseUrl,
      logo: `${baseUrl}/jungle-rent-logo.svg`,
      description: "L'affitto sicuro nella giungla immobiliare. Startup immobiliare: risolviamo la crisi abitativa studentesca e rendiamo accessibili gli investimenti immobiliari. Acquistiamo e gestiamo immobili a Torino per studenti e turisti.",
      foundingDate: "2025-10-24",
      taxID: "13333450016",
      vatID: "IT13333450016",
      // sameAs for trust graph
      sameAs: [
        // "https://www.linkedin.com/company/jungle-rent", // TODO: Re-enable when LinkedIn page is created
        "https://www.instagram.com/junglerent",
        "https://www.2i3t.it"
      ],
      founders: [
        { "@type": "Person", name: "Lorenzo Oni-Joseph", jobTitle: "Founder" },
        { "@type": "Person", name: "Andrea Niccolaini", jobTitle: "Co-Founder" }
      ],
      parentOrganization: {
        "@type": "Organization",
        name: "2i3T - Incubatore di Imprese Innovative dell'Università di Torino",
        url: "https://www.2i3t.it"
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Jungle Rent Services",
        itemListElement: [
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Real Estate Investment",
              description: "Accessible investment from €100 in Turin's university housing market"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Student Housing Management",
              description: "Professional property management for student rentals"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Property Acquisition",
              description: "Strategic property purchases in student-demand zones"
            }
          },
          {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: "Props Property Management App",
              description: "Digital property management platform for landlords - rent tracking, expense management, tenant communication"
            }
          }
        ]
      },
      knowsAbout: [
        "Short-term rental management Turin",
        "Affitti brevi Torino",
        "Property management Piedmont Italy",
        "Airbnb management Turin",
        "Booking.com property management",
        "Student housing Politecnico di Torino",
        "Student accommodation Università di Torino",
        "Vacation rentals Turin city center",
        "Real estate investment Turin",
        "Gestione immobiliare professionale Torino",
        "Property valuation Turin",
        "Valutazione immobile Torino",
        "Props property management app"
      ],
      areaServed: [
        {
          "@type": "City",
          name: "Torino",
          containedInPlace: {
            "@type": "Region",
            name: "Piemonte",
            containedInPlace: { "@type": "Country", name: "Italia" }
          }
        },
        {
          "@type": "Country",
          name: "Switzerland"
        }
      ],
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Gioacchino Quarello 15/A",
        addressLocality: "Torino",
        postalCode: "10137",
        addressCountry: "IT",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          telephone: "+39-331-905-3037",
          email: "junglerententeprise@gmail.com",
          availableLanguage: ["Italian", "English", "French", "German"],
        },
      ],
    };

    // Person Schema for Lorenzo Oni-Joseph (Founder)
    const lorenzoSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Lorenzo Oni-Joseph",
      jobTitle: "Founder",
      telephone: "+39-331-905-3037",
      worksFor: {
        "@type": "Organization",
        name: "Jungle Rent S.r.l.",
        url: baseUrl
      },
      sameAs: [
        "https://www.linkedin.com/in/lorenzo-oni-joseph"
      ]
    };

    // Person Schema for Andrea Niccolaini (Co-Founder)
    const andreaSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Andrea Niccolaini",
      jobTitle: "Co-Founder",
      telephone: "+39-351-577-8924",
      worksFor: {
        "@type": "Organization",
        name: "Jungle Rent S.r.l.",
        url: baseUrl
      }
    };

    // LocalBusiness Schema (PropTech Startup - NOT a RealEstateAgent)
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "additionalType": "https://schema.org/ProfessionalService",
      "@id": `${baseUrl}/#business`,
      name: "Jungle Rent S.r.l.",
      legalName: "JUNGLE RENT SOCIETA' A RESPONSABILITA' LIMITATA",
      image: `${baseUrl}/jungle-rent-logo.svg`,
      description:
        "Startup innovativa: acquistiamo e gestiamo immobili per studenti a Torino. Investimenti frazionati da €100.",
      telephone: "+39-331-905-3037",
      email: "junglerententeprise@gmail.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Via Gioacchino Quarello 15/A",
        addressLocality: "Torino",
        postalCode: "10137",
        addressRegion: "Piemonte",
        addressCountry: "IT",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 45.0312,
        longitude: 7.6427,
      },
      url: baseUrl,
      priceRange: "€€",
      currenciesAccepted: "EUR",
      paymentAccepted: "Bank Transfer, Credit Card",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
      hasMap: "https://maps.google.com/?q=Via+Gioacchino+Quarello+15/A,+Torino",
      areaServed: {
        "@type": "City",
        name: "Torino",
      },
    };

    // Startup Innovativa Schema
    const startupSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${baseUrl}/#startup`,
      additionalType: "https://schema.org/Corporation",
      name: "Jungle Rent S.r.l.",
      foundingDate: "2025-10-24",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Torino",
          addressCountry: "IT",
        },
      },
      memberOf: {
        "@type": "Organization",
        name: "2i3T - Incubatore di Imprese Innovative dell'Università di Torino",
        url: "https://www.2i3t.it",
      },
      naics: "531110",
      isicV4: "6820",
      knowsAbout: [
        "Property Management",
        "Fractional Real Estate Investment",
        "Student Housing",
        "Short Term Rentals",
      ],
    };

    // Service Schema - Studenti
    const studentServiceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Ottimizzazione Affitti Studenti",
      provider: {
        "@type": "Organization",
        name: "Jungle Rent",
      },
      areaServed: "Torino",
      audience: {
        "@type": "EducationalAudience",
        educationalRole: "student",
      },
      offers: {
        "@type": "Offer",
        description: "Affitti convenienti per studenti",
        priceCurrency: "EUR",
      },
    };

    // Service Schema - Investitori
    const investorServiceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      serviceType: "Opportunità Investimento Immobiliare",
      provider: {
        "@type": "Organization",
        name: "Jungle Rent",
      },
      areaServed: "Torino",
      offers: {
        "@type": "Offer",
        description: "L'affitto sicuro nella giungla immobiliare - opportunità di investimento a partire da 100€",
        priceCurrency: "EUR",
        price: "100",
        priceValidUntil: "2026-12-31",
      },
    };

    // BuyAction Schema - Venditori
    const buyActionSchema = {
      "@context": "https://schema.org",
      "@type": "BuyAction",
      object: {
        "@type": "RealEstateProperty",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Torino",
          addressRegion: "Piemonte",
          addressCountry: "IT"
        }
      },
      agent: {
        "@type": "Organization",
        name: "Jungle Rent S.r.l.",
        url: baseUrl,
      },
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/#vendi-casa`
      }
    };

    // HowTo Schema - Come vendere casa a Jungle Rent
    const howToSellSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Come vendere casa a Jungle Rent",
      description: "Guida passo-passo per vendere il tuo immobile a Jungle Rent senza commissioni",
      totalTime: "P90D",
      estimatedCost: {
        "@type": "MonetaryAmount",
        currency: "EUR",
        value: "0"
      },
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Valutazione gratuita",
          text: "Compila il form online o chiama per ricevere una valutazione gratuita del tuo immobile basata su dati OMI",
          url: `${baseUrl}/valutazione-immobile`
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Sopralluogo",
          text: "Il nostro team visita l'immobile per una valutazione dettagliata entro 7 giorni"
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Offerta scritta",
          text: "Ricevi un'offerta di acquisto scritta entro 48 ore dal sopralluogo"
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Rogito notarile",
          text: "Chiusura della vendita in 60-90 giorni con zero commissioni"
        }
      ]
    };

    // HowTo Schema - Come investire in Jungle Rent
    const howToInvestSchema = {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "Come investire in Jungle Rent",
      description: "Guida per investire nel mercato immobiliare studentesco di Torino da €100",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Registrazione",
          text: "Compila il form di interesse investitori sul sito junglerent.it"
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Consulenza",
          text: "Ricevi una consulenza personalizzata dal team Jungle Rent"
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Investimento",
          text: "Investi a partire da €100 nel portafoglio immobiliare"
        },
        {
          "@type": "HowToStep",
          position: 4,
          name: "Report trimestrali",
          text: "Ricevi report trimestrali sull'andamento del portafoglio"
        }
      ]
    };

    // FAQ Schema - Expanded with voice-optimized questions
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Come funziona Jungle Rent per gli studenti?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jungle Rent offre contratti flessibili allineati all'anno accademico. Paghi solo per i mesi in cui studi, con un risparmio significativo rispetto ai contratti tradizionali. Alloggi vicino a Politecnico, UniTo e tutti i principali atenei torinesi.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto posso risparmiare sull'affitto con Jungle Rent?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Il risparmio è garantito grazie ai nostri contratti flessibili allineati all'anno accademico. Invece di pagare 12 mesi, paghi solo i mesi che ti servono, senza sprechi durante le vacanze estive.",
          },
        },
        {
          "@type": "Question",
          name: "Come funziona per gli investitori?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jungle Rent offre opportunità di investimento immobiliare a Torino a partire da 100€. Gestiamo le proprietà nel mercato degli affitti studenteschi con servizi professionali completi.",
          },
        },
        {
          "@type": "Question",
          name: "Come posso vendere la mia casa a Torino a Jungle Rent?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jungle Rent acquista appartamenti nelle zone universitarie di Torino (Crocetta, San Salvario, Centro, Vanchiglia, Lingotto). Compila il form di contatto nella sezione 'Vendi la Tua Casa' per ricevere una valutazione gratuita entro 48 ore.",
          },
        },
        {
          "@type": "Question",
          name: "Come posso investire in immobili a Torino con pochi soldi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Investi in Jungle Rent per un appartamento specifico che acquistiamo e gestiamo noi nelle zone universitarie di Torino. A partire da €100, sai esattamente dove va il tuo capitale.",
          },
        },
        {
          "@type": "Question",
          name: "È sicuro investire in Jungle Rent?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jungle Rent è una startup innovativa certificata, registrata alla Camera di Commercio di Torino con P.IVA 13333450016. Siamo incubati da 2i3T, l'incubatore dell'Università di Torino. Tuttavia, come ogni investimento, comporta rischi inclusa la possibile perdita del capitale.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto costa affittare una stanza a Torino per studenti?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Una stanza singola per studenti a Torino costa mediamente €350-550 al mese in zone come San Salvario, €500-700 in Crocetta, €250-400 in zone più economiche come Aurora. I prezzi includono spese condominiali ma non utenze.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto vale la mia casa a Torino?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jungle Rent offre un calcolatore gratuito per la valutazione immobiliare basato su dati OMI dell'Agenzia delle Entrate. Visita junglerent.it/valutazione-immobile per una stima con accuratezza ±5%. Per una valutazione professionale, contattaci per un sopralluogo gratuito.",
          },
        },
        {
          "@type": "Question",
          name: "Cos'è Props di Jungle Rent?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Props è l'app di Jungle Rent per la gestione immobiliare semplificata, in arrivo nel Q1 2026. Permette ai proprietari di tracciare affitti, gestire spese, comunicare con inquilini e archiviare documenti in un'unica piattaforma digitale.",
          },
        },
      ],
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {
          "@type": "ListItem",
          "position": 1,
          "name": "Home",
          "item": `${baseUrl}/`
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Affitto Studenti",
          "item": `${baseUrl}/#student-section`
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Investitori",
          "item": `${baseUrl}/#investor-section`
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Venditori",
          "item": `${baseUrl}/#seller-section`
        }
      ]
    };

    // SoftwareApplication Schema for Property Valuation Tool
    const propertyValuationToolSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Calcolatore Valutazione Immobile Torino",
      alternateName: "Property Valuation Calculator Turin",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web Browser",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR"
      },
      isAccessibleForFree: true,
      url: `${baseUrl}/valutazione-immobile`,
      description: "Calcola gratuitamente il valore del tuo immobile a Torino basato su dati OMI dell'Agenzia delle Entrate. Accuratezza ±5%.",
      featureList: [
        "Valutazione basata su dati OMI 2025",
        "35+ zone di Torino coperte",
        "9 coefficienti di adeguamento",
        "Confronto commissioni agenzia",
        "Upload foto/video per valutazione professionale"
      ],
      provider: {
        "@type": "Organization",
        name: "Jungle Rent S.r.l."
      }
    };

    // SoftwareApplication Schema for Props App
    const propsAppSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Props - Gestione Immobiliare Semplificata",
      alternateName: "Props Property Management App",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser, iOS, Android",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "EUR",
        availability: "https://schema.org/PreOrder"
      },
      isAccessibleForFree: true,
      url: `${baseUrl}/blog/props-gestione-immobiliare-semplificata`,
      description: "App per la gestione immobiliare semplificata. Traccia affitti, gestisci spese, comunica con inquilini e archivia documenti in un'unica piattaforma.",
      featureList: [
        "Tracciamento pagamenti affitti",
        "Gestione spese e manutenzione",
        "Comunicazione inquilini",
        "Archiviazione documenti",
        "Report finanziari automatici"
      ],
      provider: {
        "@type": "Organization",
        name: "Jungle Rent S.r.l."
      },
      releaseNotes: "Lancio previsto Q1 2026"
    };

    // Enhanced SpeakableSpecification Schema for Voice AI
    const speakableSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Jungle Rent - Turin Student Housing & Real Estate Investment",
      "url": baseUrl,
      "inLanguage": ["it-IT", "en-US"],
      "dateModified": "2026-01-09",
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          "h1",
          ".hero-headline",
          ".hero-description",
          ".faq-question",
          ".faq-answer",
          ".service-description",
          "[data-speakable='true']",
          "[data-ai-summary]"
        ],
        "xpath": [
          "/html/head/title",
          "/html/head/meta[@name='description']/@content"
        ]
      },
      "mainEntity": {
        "@type": "Organization",
        "name": "Jungle Rent S.r.l.",
        "description": "Jungle Rent is a certified Start-up Innovativa specializing in student housing and real estate investment in Turin, Italy. Founded October 2025, serving 90,000+ university students across 7 institutions. Invest from €100. New in 2026: Props property management app.",
        "telephone": "+39-331-905-3037",
        "email": "junglerententeprise@gmail.com"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    // VoiceSearch optimization - WebSite Schema
    const voiceSearchSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Jungle Rent",
      "url": baseUrl,
      "dateModified": "2026-01-04",
      "potentialAction": [
        {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${baseUrl}/blog?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      ],
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [".faq-question", ".faq-answer", "[data-ai-summary]"]
      }
    };

    // Dataset Schema for Study Spaces Directory
    const studySpacesDatasetSchema = {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "name": "Aule Studio Torino - Directory Spazi di Studio",
      "alternateName": "Turin Study Spaces Directory",
      "description": "Directory completa delle aule studio a Torino: 30+ location tra biblioteche, sale EDISU, caffetterie e coworking per studenti universitari.",
      "url": `${baseUrl}/strumenti/aule-studio-torino`,
      "creator": {
        "@type": "Organization",
        "name": "Jungle Rent S.r.l."
      },
      "dateModified": "2026-01-04",
      "keywords": ["aule studio torino", "biblioteche torino studenti", "dove studiare torino", "sale studio università torino"],
      "spatialCoverage": {
        "@type": "Place",
        "name": "Turin, Italy"
      },
      "isAccessibleForFree": true,
      "license": "https://creativecommons.org/licenses/by/4.0/"
    };

    // Dataset Schema for Cheap Eats Directory
    const cheapEatsDatasetSchema = {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "name": "Dove Mangiare Torino Studenti - Directory Ristoranti Economici",
      "alternateName": "Turin Budget Restaurants Directory",
      "description": "Directory completa dei ristoranti economici a Torino per studenti: 20+ location con prezzi €3-15, menu studenti, e recensioni.",
      "url": `${baseUrl}/strumenti/dove-mangiare-torino`,
      "creator": {
        "@type": "Organization",
        "name": "Jungle Rent S.r.l."
      },
      "dateModified": "2026-01-04",
      "keywords": ["ristoranti economici torino", "dove mangiare torino studenti", "pranzo economico torino", "menu studenti torino"],
      "spatialCoverage": {
        "@type": "Place",
        "name": "Turin, Italy"
      },
      "isAccessibleForFree": true
    };

    // Dataset Schema for Gyms Directory
    const gymsDatasetSchema = {
      "@context": "https://schema.org",
      "@type": "Dataset",
      "name": "Palestre Torino Studenti - Directory Fitness Center",
      "alternateName": "Turin Gyms Directory for Students",
      "description": "Directory completa delle palestre a Torino per studenti: 25+ location con prezzi scontati, orari, e servizi.",
      "url": `${baseUrl}/strumenti/palestre-torino`,
      "creator": {
        "@type": "Organization",
        "name": "Jungle Rent S.r.l."
      },
      "dateModified": "2026-01-04",
      "keywords": ["palestre torino studenti", "fitness torino", "abbonamento palestra studenti", "gym torino"],
      "spatialCoverage": {
        "@type": "Place",
        "name": "Turin, Italy"
      },
      "isAccessibleForFree": true
    };

    // Insert all schemas into head
    const schemas = [
      organizationSchema, 
      lorenzoSchema,
      andreaSchema,
      localBusinessSchema,
      startupSchema,
      studentServiceSchema, 
      investorServiceSchema, 
      buyActionSchema, 
      howToSellSchema,
      howToInvestSchema,
      faqSchema,
      breadcrumbSchema,
      propertyValuationToolSchema,
      propsAppSchema,
      speakableSchema,
      voiceSearchSchema,
      studySpacesDatasetSchema,
      cheapEatsDatasetSchema,
      gymsDatasetSchema
    ];

    const scriptElements: HTMLScriptElement[] = [];

    schemas.forEach((schema) => {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
      scriptElements.push(script);
    });

    // Cleanup
    return () => {
      scriptElements.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
      });
    };
  }, []);

  return null;
};
