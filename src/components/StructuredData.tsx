import { useEffect } from "react";

export const StructuredData = () => {
  useEffect(() => {
    // Organization Schema
    const organizationSchema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Jungle Rent",
      url: "https://junglerent.it",
      logo: "https://junglerent.it/jungle-rent-logo.png",
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
      image: "https://junglerent.it/jungle-rent-logo.png",
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

    // FAQ Schema
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
      ],
    };

    // Insert all schemas into head
    const schemas = [organizationSchema, localBusinessSchema, studentServiceSchema, investorServiceSchema, faqSchema];

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
