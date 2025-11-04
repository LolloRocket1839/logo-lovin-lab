import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    title: "Dove Mangiare a Torino da Studente: Guida Completa (2025)",
    slug: "dove-mangiare-torino-studenti",
    category: "students",
    date: "2025-11-03",
    author: "Team Jungle Rent",
    excerpt: "La guida definitiva per mangiare bene a Torino spendendo poco: i migliori posti per colazione, pranzo, cena e aperitivo, mercati, mense universitarie e strategie di risparmio testati da studenti.",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    readTime: 12,
    seo: {
      title: "Dove Mangiare a Torino da Studente: Guida Completa 2025 | Jungle Rent",
      description: "Scopri i migliori posti dove mangiare a Torino spendendo poco: kebab, pizzerie, ristoranti etnici, mercati, mense e strategie per risparmiare. Guida completa con prezzi reali.",
      keywords: ["dove mangiare torino studenti", "ristoranti economici torino", "mangiare poco torino", "mercati torino", "mense universitarie torino", "aperitivo economico torino"]
    },
    tags: ["studenti", "cibo", "torino", "risparmio", "ristoranti", "guida"],
    content: "dove-mangiare-torino-studenti"
  },
  {
    title: "San Salvario: Guida Completa per Studenti Universitari a Torino",
    slug: "san-salvario-guida-studenti",
    category: "students",
    date: "2025-11-03",
    author: "Team Jungle Rent",
    excerpt: "Tutto quello che devi sapere per vivere a San Salvario: prezzi reali, zone migliori, vita quotidiana e consigli pratici per studenti universitari.",
    image: "/images/san-salvario-night.jpeg",
    readTime: 10,
    seo: {
      title: "San Salvario Torino: Guida Completa per Studenti 2025 | Jungle Rent",
      description: "Scopri quanto costa vivere a San Salvario, le zone migliori, i collegamenti universitari e tutti i consigli pratici per studenti. Guida aggiornata 2025.",
      keywords: ["san salvario torino studenti", "affitto san salvario", "vivere san salvario", "quartiere studenti torino", "alloggio unito torino"]
    },
    tags: ["studenti", "san salvario", "torino", "quartieri", "guida"],
    content: "san-salvario-guida-studenti"
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
