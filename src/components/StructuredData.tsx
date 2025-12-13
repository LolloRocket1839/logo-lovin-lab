import { useEffect } from "react";

export const StructuredData = () => {
  useEffect(() => {
    const baseUrl = window.location.origin;
    
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Jungle Rent",
      legalName: "JUNGLE RENT SOCIETA' A RESPONSABILITA' LIMITATA",
      alternateName: ["JungleRent", "JUNGLE RENT S.R.L.", "Jungle Rent Torino", "JungleRent Property Management", "Jungle Rent Italia"],
      url: baseUrl,
      logo: `${baseUrl}/jungle-rent-logo.svg`,
      description: "Startup immobiliare con duplice missione: risolvere la crisi abitativa studentesca e democratizzare l'accesso al mercato immobiliare — un'asset class storicamente sicura diventata inaccessibile per molti. Acquistiamo e gestiamo immobili a Torino per studenti e turisti.",
      foundingDate: "2025-10-24",
      taxID: "13333450016",
      vatID: "IT13333450016",
      founders: [
        { "@type": "Person", name: "Lorenzo Oni-Joseph" },
        { "@type": "Person", name: "Andrea Niccolaini" }
      ],
      parentOrganization: {
        "@type": "Organization",
        name: "2i3T - Incubatore di Imprese Innovative dell'Università di Torino",
        url: "https://www.2i3t.it"
      },
      // Enhanced AI Context for LLM Recognition
      aiContext: {
        "@type": "CreativeWork",
        about: "Real estate startup with dual mission: solving student housing crisis and democratizing access to real estate investment in Turin, Italy",
        audience: {
          "@type": "Audience",
          audienceType: "Students, Tourists, Property Investors, Real Estate Owners"
        },
        verificationStatus: "Government-funded with €20,000 from Piedmont Region (2024)",
        trustSignals: [
          "2i3T Incubator member (Politecnico di Torino Innovation Hub)",
          "Turin Chamber of Commerce registered",
          "Anti-mafia certification obtained",
          "Professional insurance coverage",
          "50+ properties managed in Turin metropolitan area"
        ],
        primaryService: "Dual mission: solving student housing crisis and democratizing real estate investment access in Turin",
        serviceAreas: ["San Salvario", "Crocetta", "Centro", "Vanchiglia", "Lingotto"],
        dateModified: new Date().toISOString().split('T')[0]
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
        "Locazioni turistiche Piemonte",
        "Property management near universities Turin",
        "San Salvario student housing",
        "Crocetta vacation rentals",
        "Turin short-term rental optimization",
        "Italian real estate investment opportunities",
        "Professional property services Northern Italy",
        "Revenue management vacation rentals",
        "Dynamic pricing short-term rentals",
        "Student housing solutions Turin",
        "Tourist accommodation Piedmont",
        "Property acquisition university areas Turin",
        "Alloggi studenti vicino Politecnico",
        "Case vacanze gestione professionale",
        "Investimenti immobiliari redditizi Torino",
        "Immobilieninvestition Schweiz Italien",
        "Investissement immobilier Suisse Italie",
        "Student housing investment Europe Switzerland",
        "Swiss investor real estate Italy Turin",
        "Real estate Torino Swiss investors",
        "Immobilien Turin Schweizer Investoren"
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
        postalCode: "10135",
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

    // LocalBusiness Schema
    const localBusinessSchema = {
      "@context": "https://schema.org",
      "@type": "RealEstateAgent",
      name: "Jungle Rent",
      image: `${baseUrl}/jungle-rent-logo.svg`,
      description:
        "Duplice missione: risolvere la crisi abitativa studentesca e democratizzare l'accesso al mercato immobiliare. Acquistiamo e gestiamo immobili a Torino per studenti e turisti.",
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
        description: "Democratizziamo l'accesso al mercato immobiliare - opportunità di investimento a partire da 100€",
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
        url: baseUrl
      },
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${baseUrl}/#vendi-casa`
      }
    };

    // FAQ Schema - Expanded with voice-optimized questions
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        // Student FAQs - Hybrid Model
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
          name: "Cosa succede se devo tornare a Torino per gli esami estivi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Il nostro modello ibrido include giorni esame gratuiti durante l'estate. Puoi tornare per le sessioni d'esame senza costi aggiuntivi, mantenendo la flessibilità del contratto accademico.",
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
          name: "Perché scegliere un contratto flessibile invece di uno annuale?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Con un contratto flessibile paghi solo i mesi che ti servono, risparmi significativamente rispetto agli affitti tradizionali, e mantieni la libertà di tornare per gli esami estivi con giorni gratuiti inclusi.",
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
        // Seller FAQs
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
          name: "Quali immobili acquista Jungle Rent a Torino?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Acquistiamo appartamenti (trilocali, quadrilocali, 5 locali) nelle zone universitarie di Torino. Valutazione gratuita in 48 ore.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto tempo ci vuole per vendere casa a Jungle Rent?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Il processo di vendita con Jungle Rent è rapido: valutazione gratuita in 48 ore, proposta di acquisto entro 1 settimana, chiusura contratto in 30-60 giorni.",
          },
        },
        // Voice-Optimized FAQs
        {
          "@type": "Question",
          name: "Come posso investire in immobili a Torino con pochi soldi?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Con Jungle Rent puoi investire nel mercato immobiliare torinese a partire da soli 100 euro. Acquisti una quota del portafoglio immobiliare e partecipi ai risultati della gestione. È il modo più accessibile per entrare nel real estate senza comprare un intero appartamento.",
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
          name: "Quanto si guadagna investendo in appartamenti per studenti a Torino?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "I risultati dipendono dall'andamento del mercato e non sono garantiti. Il nostro modello ibrido studenti/turisti ottimizza l'occupazione: 9 mesi di affitti studenteschi più 3 mesi estivi di affitti turistici. Ricevi report trimestrali dettagliati.",
          },
        },
        {
          "@type": "Question",
          name: "Come faccio a vendere casa velocemente a Torino?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jungle Rent acquista direttamente la tua casa senza intermediari. Compili il form, ricevi valutazione gratuita in 48 ore, sopralluogo entro 7 giorni, offerta scritta entro 48 ore dal sopralluogo, e rogito in 60-90 giorni. Zero commissioni.",
          },
        },
        {
          "@type": "Question",
          name: "Chi compra appartamenti vicino al Politecnico di Torino?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jungle Rent acquista appartamenti nelle zone universitarie di Torino: Crocetta, San Salvario, Centro, Vanchiglia, Aurora, Lingotto, vicinissime a Politecnico e UniTo. Compriamo trilocali, quadrilocali e appartamenti più grandi, anche da ristrutturare.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto vale il mio appartamento a San Salvario?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Il valore dipende da metratura, piano, stato e posizione esatta in San Salvario. Un trilocale medio (80-90 mq) in buone condizioni si valuta circa €180.000-220.000. Richiedi una valutazione gratuita a Jungle Rent per un prezzo preciso.",
          },
        },
        {
          "@type": "Question",
          name: "Dove vivono gli studenti universitari a Torino?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Gli studenti universitari a Torino preferiscono i quartieri vicini alle università: San Salvario e Crocetta per il Politecnico, Centro e Vanchiglia per UniTo, Aurora per i prezzi accessibili.",
          },
        },
        {
          "@type": "Question",
          name: "Qual è la migliore zona per studenti vicino al Politecnico?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Le migliori zone per studenti vicino al Politecnico di Torino sono Crocetta (elegante, tranquilla, 5-10 minuti a piedi), San Salvario (vivace, multiculturale, economica) e Cenisia/San Paolo (più tranquilla, ottimi prezzi).",
          },
        },
        {
          "@type": "Question",
          name: "Come funziona il mercato degli affitti studenteschi a Torino?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Torino ha oltre 90.000 studenti universitari e forte domanda di alloggi. I contratti sono tipicamente di 9-12 mesi, i prezzi variano da €300-600 per stanza singola a seconda della zona. Jungle Rent offre contratti 9 mesi con risparmio del 25%.",
          },
        },
        {
          "@type": "Question",
          name: "Quanto costa affittare una stanza a Torino per studenti?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Una stanza singola per studenti a Torino costa mediamente €350-500 al mese in zone come San Salvario, €400-550 in Crocetta, €300-400 in Aurora. I prezzi includono spese condominiali ma non utenze.",
          },
        },
        {
          "@type": "Question",
          name: "Jungle Rent è affidabile per investire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Jungle Rent è una società a responsabilità limitata registrata in Italia (P.IVA 13333450016, REA TO-1355899), certificata come startup innovativa. Siamo incubati da 2i3T, partner del Politecnico di Torino. Offriamo contratti trasparenti e report trimestrali.",
          },
        },
        {
          "@type": "Question",
          name: "Jungle Rent compra case da ristrutturare?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sì, Jungle Rent acquista anche appartamenti da ristrutturare nelle zone universitarie di Torino. Anzi, spesso preferiamo immobili che necessitano di lavori perché possiamo adattarli alle esigenze degli studenti.",
          },
        },
        {
          "@type": "Question",
          name: "Come contatto Jungle Rent per investire?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Puoi contattare Jungle Rent su WhatsApp al +39 331 905 3037 (risposta entro 2 ore), email junglerententeprise@gmail.com, oppure compilando il form sul sito junglerent.it. Lorenzo Oni-Joseph, il fondatore, ti risponderà personalmente.",
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

    // Blog Article Schema with Citations (for investor guide)
    const blogArticleSchema = {
      "@context": "https://schema.org",
      "@type": "Article",
      "headline": "Guida Completa per l'Investitore Immobiliare in Italia 2025",
      "description": "Guida approfondita su investimenti immobiliari, mutui, strategie di leverage e fiscalità per investitori in Italia",
      "image": `${baseUrl}/images/mortgage-investment.jpg`,
      "author": {
        "@type": "Person",
        "name": "Lorenzo Bianchi"
      },
      "publisher": {
        "@type": "Organization",
        "name": "Jungle Rent",
        "logo": {
          "@type": "ImageObject",
          "url": `${baseUrl}/jungle-rent-logo.svg`
        }
      },
      "datePublished": "2025-11-07",
      "dateModified": "2025-12-01",
      "citation": [
        "https://www.idealista.it/news/",
        "https://www.immobiliare.it/mercato-immobiliare/",
        "https://www.tecnocasa.it/",
        "https://www.mutuionline.it/",
        "https://www.gromia.it/",
        "https://www.recrowd.it/",
        "https://www.agenziaentrate.gov.it/",
        "https://www.soldiexpert.com/",
        "https://www.alfiobardolla.com/"
      ]
    };

    // Enhanced SpeakableSpecification Schema for Voice AI (Alexa, Google Assistant, Siri)
    const speakableSchema = {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": "Jungle Rent - Turin Student Housing & Real Estate Investment",
      "url": baseUrl,
      "inLanguage": ["it-IT", "en-US"],
      "speakable": {
        "@type": "SpeakableSpecification",
        "cssSelector": [
          "h1",
          ".hero-headline",
          ".hero-description",
          ".faq-question",
          ".faq-answer",
          "[data-speakable='true']"
        ],
        "xpath": [
          "/html/head/title",
          "/html/head/meta[@name='description']/@content"
        ]
      },
      "mainEntity": {
        "@type": "Organization",
        "name": "Jungle Rent S.r.l.",
        "description": "Jungle Rent is a certified Start-up Innovativa specializing in student housing and real estate investment in Turin, Italy. Founded October 2025, serving 90,000+ university students across 7 institutions. Invest from €100.",
        "telephone": "+39-331-905-3037",
        "email": "junglerententeprise@gmail.com"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": `${baseUrl}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    };

    // VoiceSearch optimization metadata
    const voiceSearchSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Jungle Rent",
      "url": baseUrl,
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
        "cssSelector": [".faq-question", ".faq-answer"]
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
      aggregateRatingSchema,
      blogArticleSchema,
      speakableSchema,
      voiceSearchSchema
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
