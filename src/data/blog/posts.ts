import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    title: "Guida completa: Trovare casa a Torino come studente nel 2026",
    slug: "guida-trovare-casa-torino-studente-2026",
    category: "students",
    date: "2025-11-01",
    author: "Team Jungle Rent",
    excerpt: "Tutto quello che devi sapere per trovare l'alloggio perfetto a Torino: zone migliori, prezzi, documenti e consigli pratici per studenti del Politecnico.",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop",
    readTime: 8,
    seo: {
      title: "Come Trovare Casa a Torino per Studenti 2026 | Jungle Rent",
      description: "Guida completa per studenti: zone migliori, prezzi medi, documenti necessari e consigli per trovare casa a Torino vicino al Politecnico.",
      keywords: ["casa torino studenti", "affitto torino politecnico", "alloggio studenti torino", "trovare casa torino 2026"]
    },
    tags: ["studenti", "guida", "torino", "politecnico"]
  },
  {
    title: "Le 7 zone migliori per studenti del Politecnico di Torino",
    slug: "zone-migliori-studenti-politecnico-torino",
    category: "students",
    date: "2025-10-28",
    author: "Team Jungle Rent",
    excerpt: "San Salvario, Crocetta, Cenisia: scopri quali sono i quartieri più comodi e vivibili per gli studenti universitari, con prezzi medi e servizi disponibili.",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
    readTime: 6,
    seo: {
      title: "Le 7 Zone Migliori per Studenti a Torino | Politecnico",
      description: "Scopri i quartieri ideali per studenti del Politecnico: prezzi, servizi, trasporti e vita notturna. Guida completa ai migliori zone di Torino.",
      keywords: ["zone studenti torino", "quartieri politecnico", "dove vivere torino studenti", "alloggi politecnico torino"]
    },
    tags: ["studenti", "zone", "torino", "quartieri"]
  },
  {
    title: "Investire in immobili universitari a Torino: Guida 2026",
    slug: "investire-immobili-universitari-torino-2026",
    category: "investors",
    date: "2025-10-25",
    author: "Team Jungle Rent",
    excerpt: "Dati di mercato, rendimenti attesi e strategie vincenti per investire nel real estate studentesco a Torino. Analisi completa del mercato universitario.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    readTime: 10,
    seo: {
      title: "Investire in Immobili Universitari Torino 2026 | Guida Completa",
      description: "Scopri come investire in immobili per studenti a Torino: rendimenti, zone migliori, strategie e dati di mercato aggiornati 2026.",
      keywords: ["investire immobili torino", "real estate universitario", "rendimento affitti studenti", "investimenti immobiliari torino"]
    },
    tags: ["investitori", "immobili", "rendimenti", "mercato"]
  },
  {
    title: "Real Estate Studentesco vs. Affitti Tradizionali: Dati a confronto",
    slug: "real-estate-studentesco-vs-tradizionale",
    category: "investors",
    date: "2025-10-22",
    author: "Team Jungle Rent",
    excerpt: "Analisi comparativa con numeri reali: occupancy rate, rendimenti netti, gestione e rischi. Quale investimento conviene di più nel 2026?",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&h=600&fit=crop",
    readTime: 7,
    seo: {
      title: "Affitti Studenti vs Tradizionali: Quale Rende di Più? | Dati 2026",
      description: "Confronto dettagliato tra investimenti in immobili per studenti e affitti tradizionali: rendimenti, occupancy, gestione e ROI reale.",
      keywords: ["rendimento affitti studenti", "investimenti immobiliari confronto", "affitti brevi vs lunghi", "roi immobiliare torino"]
    },
    tags: ["investitori", "analisi", "confronto", "dati"]
  },
  {
    title: "Vendere casa a Torino nel 2026: Tempi e costi reali",
    slug: "vendere-casa-torino-2026-tempi-costi",
    category: "sellers",
    date: "2025-10-20",
    author: "Team Jungle Rent",
    excerpt: "Quanto tempo serve veramente per vendere? Quali sono i costi nascosti? Una guida trasparente basata su dati reali del mercato torinese.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",
    readTime: 9,
    seo: {
      title: "Vendere Casa a Torino 2026: Tempi, Costi e Procedure Reali",
      description: "Guida completa alla vendita immobiliare a Torino: tempi medi, costi notarili, tasse, commissioni e procedure. Tutto quello che devi sapere.",
      keywords: ["vendere casa torino", "tempi vendita immobile", "costi vendita casa", "mercato immobiliare torino 2026"]
    },
    tags: ["venditori", "tempi", "costi", "guida"]
  },
  {
    title: "Valutazione immobiliare: Come si calcola il prezzo giusto?",
    slug: "valutazione-immobiliare-prezzo-giusto",
    category: "sellers",
    date: "2025-10-18",
    author: "Team Jungle Rent",
    excerpt: "Metodi di valutazione professionale, errori comuni da evitare e strumenti gratuiti per stimare il valore del tuo immobile in modo accurato.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop",
    readTime: 8,
    seo: {
      title: "Come Valutare un Immobile: Metodi e Strumenti Professionali 2026",
      description: "Scopri come calcolare il prezzo giusto del tuo immobile: metodi di valutazione, criteri professionali e strumenti gratuiti online.",
      keywords: ["valutazione immobiliare", "prezzo casa torino", "calcolo valore immobile", "stima casa online"]
    },
    tags: ["venditori", "valutazione", "prezzo", "strumenti"]
  }
];

export const getFeaturedPosts = (limit: number = 3): BlogPost[] => {
  return blogPosts.slice(0, limit);
};

export const getPostsByCategory = (category: string): BlogPost[] => {
  if (category === 'all') return blogPosts;
  return blogPosts.filter(post => post.category === category);
};

export const getPostBySlug = (slug: string): BlogPost | undefined => {
  return blogPosts.find(post => post.slug === slug);
};

export const getRelatedPosts = (currentSlug: string, category: string, limit: number = 3): BlogPost[] => {
  return blogPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, limit);
};
