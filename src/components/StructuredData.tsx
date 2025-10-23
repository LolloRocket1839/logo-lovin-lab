import { useEffect } from "react";

export const StructuredData = () => {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Jungle Rent",
      url: "https://junglerent.com",
      logo: "https://junglerent.com/jungle-rent-logo.svg",
      description:
        "Servizio di ottimizzazione affitti per studenti e investitori a Torino. Affitti convenienti e opportunità di investimento.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Torino",
        addressRegion: "TO",
        addressCountry: "IT",
      },
      areaServed: {
        "@type": "City",
        name: "Torino",
      },
      contactPoint: [
        {
          "@type": "ContactPoint",
          contactType: "Customer Service",
          availableLanguage: "Italian",
        },
      ],
    };

    // LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: "Jungle Rent",
      image: "https://junglerent.com/jungle-rent-logo.svg",
      description:
        "Il tuo rifugio sicuro nella giungla immobiliare. Affitti smart e opportunità di investimento per studenti e investitori a Torino.",
      areaServed: {
        "@type": "City",
        name: "Torino",
      },
      priceRange: "€€",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        reviewCount: "127",
      },
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
        description: "Opportunità di investimento immobiliare a partire da 100€",
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
        "@type": "RealEstateAgent",
        name: "Jungle Rent",
        url: "https://junglerent.it"
      },
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://junglerent.it/#vendi-casa"
      }
    };

    // FAQ Schema - Espansa con domande venditori
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Come funziona Jungle Rent per gli studenti?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jungle Rent ottimizza gli affitti per gli studenti universitari a Torino, offrendo affitti convenienti rispetto agli affitti tradizionali. Offriamo stanze in quadrilocali vicino ai principali atenei torinesi (Politecnico, UniTo) con contratti sicuri e supporto dedicato.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto posso risparmiare sull'affitto?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gli studenti possono risparmiare rispetto ai canoni di mercato tradizionali. Il risparmio deriva dall'ottimizzazione degli spazi e dalla gestione efficiente delle proprietà.",
          },
        },
        {
          "@type": "Question",
          name: "Quali università copre Jungle Rent a Torino?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jungle Rent offre alloggi vicini a tutti i principali atenei torinesi: Politecnico di Torino, Università degli Studi di Torino (UniTo), e altre istituzioni universitarie della città.",
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
          name: "Ci sono commissioni?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, Jungle Rent opera con zero commissioni per gli studenti, rendendo l'affitto ancora più conveniente.",
          },
        },
        {
          "@type": "Question",
          name: "Come posso vendere la mia casa a Torino a Jungle Rent?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jungle Rent acquista appartamenti nelle zone universitarie di Torino (Crocetta, San Salvario, Centro, Vanchiglia, Lingotto). Compila il form di contatto nella sezione 'Vendi la Tua Casa' per ricevere una valutazione gratuita entro 48 ore. Cerchiamo trilocali, quadrilocali e appartamenti vicini a Politecnico, UniTo, ESCP.",
          },
        },
        {
          "@type": "Question",
          name: "Quali immobili acquista Jungle Rent a Torino?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Acquistiamo appartamenti (trilocali, quadrilocali, 5 locali) nelle zone universitarie di Torino: Crocetta, San Salvario, Centro, Vanchiglia, Lingotto, Santa Rita, San Paolo. Ideali sono immobili a 10-20 minuti da Politecnico di Torino, Università di Torino, ESCP Business School. Valutazione gratuita in 48 ore.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto tempo ci vuole per vendere casa a Jungle Rent?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Il processo di vendita con Jungle Rent è rapido: valutazione gratuita in 48 ore, proposta di acquisto entro 1 settimana, chiusura contratto in 30-60 giorni. Nessun intermediario, transazione diretta e trasparente per immobili a Torino zona universitaria.",
          },
        },
        {
          "@type": "Question",
          name: "Vendere casa a Torino zona Crocetta o San Salvario conviene?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Le zone Crocetta, San Salvario e Centro sono molto richieste per affitti studenti grazie alla vicinanza a Politecnico e UniTo. Jungle Rent acquista immobili in queste aree per trasformarli in housing ottimizzato. Valutazione di mercato equa e processo veloce.",
          },
        },
        {
          "@type": "Question",
          name: "Jungle Rent acquista appartamenti da ristrutturare?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì, acquistiamo anche appartamenti da ristrutturare nelle zone universitarie di Torino. La valutazione viene fatta sullo stato attuale dell'immobile, senza richiedere lavori preventivi. Ideale per chi vuole vendere velocemente senza investire in ristrutturazione.",
          },
        },
        {
          "@type": "Question",
          name: "Quali commissioni devo pagare vendendo a Jungle Rent?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Zero commissioni per il venditore. Jungle Rent acquista direttamente senza intermediari, permettendoti di risparmiare il 3-5% di commissioni d'agenzia (€6.000-10.000 su una casa da €200.000). Processo trasparente con offerta scritta chiara.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto tempo ci vuole per la valutazione immobile Torino?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Ricevi il primo contatto entro 24-48 ore dalla richiesta. Dopo il sopralluogo gratuito (entro 7 giorni), ricevi l'offerta scritta entro 48 ore. Tempo totale dalla richiesta al rogito: 30-60 giorni.",
          },
        },
        {
          "@type": "Question",
          name: "Vendere trilocale San Salvario Torino: quale prezzo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Il prezzo dipende da metratura, piano, stato e posizione esatta in San Salvario. Un trilocale medio (80-90 mq) in buone condizioni si valuta €180.000-220.000 in base alla vicinanza a Politecnico e UniTo. Richiedi valutazione gratuita per prezzo preciso.",
          },
        },
        {
          "@type": "Question",
          name: "Vendere casa ereditata Torino: cosa fare?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jungle Rent acquista anche immobili ereditati nelle zone universitarie. Ti supportiamo con la parte legale e burocratica. Ideale per eredi che vogliono liquidare velocemente senza gestire affitti o ristrutturazioni. Valutazione in 48 ore, supporto notarile incluso.",
          },
        },
        {
          "@type": "Question",
          name: "Acquistiamo solo trilocali o anche appartamenti più grandi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Acquistiamo trilocali, quadrilocali, 5 locali e appartamenti più grandi nelle zone universitarie di Torino. Più grande è l'appartamento, più camere possiamo ottimizzare per studenti. Ideali: 80-150 mq in Crocetta, San Salvario, Centro, Vanchiglia, Lingotto.",
          },
        },
        {
          "@type": "Question",
          name: "Devo fare lavori prima di vendere a Jungle Rent?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No, non è necessario fare alcun lavoro. Acquistiamo l'immobile nello stato in cui si trova (anche da ristrutturare). Ci occupiamo noi delle eventuali ristrutturazioni e ottimizzazioni. Questo ti fa risparmiare tempo e denaro.",
          },
        },
        {
          "@type": "Question",
          name: "Come viene calcolato il prezzo di vendita immobile Torino?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "La valutazione si basa su: prezzo al metro quadro della zona (aggiornato settimanalmente), vicinanza alle università (Politecnico, UniTo), stato dell'immobile, piano e caratteristiche, potenziale di ottimizzazione per mercato studenti. Analisi professionale con dati di mercato reali.",
          },
        },
        {
          "@type": "Question",
          name: "Vendita casa Torino senza agenzia: è sicuro?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì, vendere direttamente a Jungle Rent è sicuro. Lavoriamo con notai e avvocati specializzati. Contratto trasparente, pagamento sicuro, supporto legale incluso. Risparmio commissioni del 3-5%.",
          },
        },
        {
          "@type": "Question",
          name: "Valutazione immobile gratis Torino: come funziona?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Compila il form con dati base (indirizzo, metratura, locali). Ricevi primo contatto in 24-48h. Sopralluogo gratuito entro 7 giorni (se necessario). Offerta scritta entro 48h dal sopralluogo. Zero impegno, valutazione professionale inclusa.",
          },
        },
        {
          "@type": "Question",
          name: "Vendere quadrilocale Crocetta Torino vicino Politecnico?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Crocetta è una delle nostre zone preferite, vicinissima al Politecnico di Torino. Quadrilocali in Crocetta sono ideali per 4 studenti (4 camere singole). Alta domanda di affitti, ottimo potenziale. Valutazione competitiva basata su posizione strategica. Compila form per offerta.",
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
          "item": "https://junglerent.com/"
        },
        {
          "@type": "ListItem",
          "position": 2,
          "name": "Affitto Studenti",
          "item": "https://junglerent.com/#student-section"
        },
        {
          "@type": "ListItem",
          "position": 3,
          "name": "Investitori",
          "item": "https://junglerent.com/#investor-section"
        },
        {
          "@type": "ListItem",
          "position": 4,
          "name": "Venditori",
          "item": "https://junglerent.com/#seller-section"
        }
      ]
    };

    // AggregateRating Schema (separate for reviews)
    const aggregateRatingSchema = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": "Jungle Rent - Affitti Smart Torino",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "reviewCount": "24",
        "bestRating": "5",
        "worstRating": "1"
      }
    };

    // Insert all schemas into head
    const schemas = [
      organizationSchema, 
      localBusinessSchema, 
      studentServiceSchema, 
      investorServiceSchema, 
      buyActionSchema, 
      faqSchema,
      breadcrumbSchema,
      aggregateRatingSchema
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
