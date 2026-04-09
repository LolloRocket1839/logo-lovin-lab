// Centralized JSON-LD schema generators for SEO
import { BlogPost } from '@/types/blog';

const ORGANIZATION_BASE = {
  "@type": "Organization",
  "name": "Jungle Rent S.r.l.",
  "alternateName": "Jungle Rent",
  "url": "https://junglerent.it",
  "logo": "https://junglerent.it/jungle-rent-logo.svg",
  "sameAs": [
    "https://www.linkedin.com/company/jungle-rent"
  ],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Via Gioacchino Quarello 15/A",
    "addressLocality": "Torino",
    "addressRegion": "Piemonte",
    "postalCode": "10137",
    "addressCountry": "IT"
  },
  "areaServed": [
    { "@type": "City", "name": "Torino" },
    { "@type": "Country", "name": "Italy" },
    { "@type": "Country", "name": "Switzerland" }
  ]
};

export const createOrganizationSchema = () => ({
  "@context": "https://schema.org",
  ...ORGANIZATION_BASE,
  "foundingDate": "2025-10-24",
  "legalName": "Jungle Rent S.r.l.",
  "taxID": "IT13333450016",
  "naics": "531110",
  "isicV4": "6820",
  "knowsAbout": [
    "Student Housing",
    "Real Estate Investment",
    "Property Management",
    "Fractional Investment"
  ]
});

export const createInvestmentSchema = (language: 'it' | 'en' = 'it') => ({
  "@context": "https://schema.org",
  "@type": "InvestmentOrDeposit",
  "name": language === 'it' 
    ? "Investimento Immobiliare Frazionato Torino" 
    : "Fractional Real Estate Investment Turin",
  "description": language === 'it'
    ? "Investi in immobili studenteschi a Torino a partire da €100. Rendimento target 7-9% annuo con gestione completa."
    : "Invest in student housing in Turin starting from €100. Target yield 7-9% annually with full management.",
  "url": "https://junglerent.it/investitori",
  "provider": ORGANIZATION_BASE,
  "amount": {
    "@type": "MonetaryAmount",
    "minValue": 100,
    "currency": "EUR"
  },
  "interestRate": {
    "@type": "QuantitativeValue",
    "minValue": 7,
    "maxValue": 9,
    "unitCode": "P1"
  },
  "areaServed": {
    "@type": "City",
    "name": "Torino",
    "containedInPlace": {
      "@type": "AdministrativeArea",
      "name": "Piemonte"
    }
  },
  "feesAndCommissionsSpecification": language === 'it'
    ? "Nessuna commissione di ingresso. Commissione di gestione annuale."
    : "No entry fees. Annual management fee.",
  "termsOfService": "https://junglerent.it/termini-condizioni"
});

export const createSellerServiceSchema = (language: 'it' | 'en' = 'it') => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "name": language === 'it' 
    ? "Vendita Immobili a Torino" 
    : "Property Sales in Turin",
  "description": language === 'it'
    ? "Vendi il tuo immobile a Torino senza commissioni. Valutazione gratuita in 24 ore, offerta vincolante in 48 ore."
    : "Sell your property in Turin with zero commissions. Free valuation in 24 hours, binding offer in 48 hours.",
  "url": "https://junglerent.it/venditori",
  "provider": ORGANIZATION_BASE,
  "serviceType": "Real Estate Acquisition",
  "areaServed": {
    "@type": "City",
    "name": "Torino"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": language === 'it' ? "Servizi per Venditori" : "Services for Sellers",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": language === 'it' ? "Valutazione Gratuita" : "Free Valuation"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": language === 'it' ? "Offerta Vincolante" : "Binding Offer"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": language === 'it' ? "Zero Commissioni" : "Zero Commissions"
        }
      }
    ]
  },
  "potentialAction": {
    "@type": "BuyAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://junglerent.it/valutazione-immobile",
      "actionPlatform": [
        "http://schema.org/DesktopWebPlatform",
        "http://schema.org/MobileWebPlatform"
      ]
    }
  }
});

export const createHowToSellSchema = (language: 'it' | 'en' = 'it') => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": language === 'it' 
    ? "Come vendere casa a Torino con Jungle Rent" 
    : "How to sell your property in Turin with Jungle Rent",
  "description": language === 'it'
    ? "Guida passo-passo per vendere il tuo immobile a Torino senza commissioni"
    : "Step-by-step guide to sell your property in Turin with zero commissions",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": language === 'it' ? "Richiedi valutazione" : "Request valuation",
      "text": language === 'it' 
        ? "Compila il form con i dati del tuo immobile per ricevere una valutazione gratuita"
        : "Fill out the form with your property details to receive a free valuation"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": language === 'it' ? "Sopralluogo" : "Property inspection",
      "text": language === 'it'
        ? "Un nostro esperto visita l'immobile per una valutazione accurata"
        : "Our expert visits the property for an accurate assessment"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": language === 'it' ? "Offerta vincolante" : "Binding offer",
      "text": language === 'it'
        ? "Ricevi un'offerta vincolante entro 48 ore dal sopralluogo"
        : "Receive a binding offer within 48 hours of the inspection"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": language === 'it' ? "Rogito" : "Closing",
      "text": language === 'it'
        ? "Firma dal notaio e ricevi il pagamento completo"
        : "Sign at the notary and receive full payment"
    }
  ],
  "totalTime": "P7D"
});

export const createBlogCollectionSchema = (
  posts: BlogPost[], 
  language: 'it' | 'en' = 'it'
) => ({
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": language === 'it' 
    ? "Blog Jungle Rent - Guide Torino" 
    : "Jungle Rent Blog - Turin Guides",
  "description": language === 'it'
    ? "Guide complete su Torino: quartieri, affitti, università, eventi, investimenti immobiliari."
    : "Complete Turin guides: neighborhoods, rentals, universities, events, real estate investments.",
  "url": "https://junglerent.it/blog",
  "publisher": ORGANIZATION_BASE,
  "mainEntity": {
    "@type": "ItemList",
    "numberOfItems": posts.length,
    "itemListElement": posts.slice(0, 10).map((post, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "url": `https://junglerent.it/blog/${post.slug}`,
      "name": post.translations[language].title
    }))
  }
});

export const createFAQPageSchema = (faqs: Array<{ q: string; a: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
});

export const createAboutPageSchema = (language: 'it' | 'en' = 'it') => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "name": language === 'it' ? "Chi Siamo - Jungle Rent" : "About Us - Jungle Rent",
  "description": language === 'it'
    ? "Scopri Jungle Rent: startup innovativa torinese che rivoluziona gli investimenti immobiliari studenteschi."
    : "Discover Jungle Rent: innovative Turin startup revolutionizing student real estate investments.",
  "url": "https://junglerent.it/chi-siamo",
  "mainEntity": {
    ...createOrganizationSchema(),
    "founder": {
      "@type": "Person",
      "name": "Lorenzo Oni-Joseph",
      "jobTitle": "Founder & CEO"
    },
    "memberOf": {
      "@type": "Organization",
      "name": "2i3T - Incubatore di Imprese Innovative dell'Università di Torino"
    }
  }
});
