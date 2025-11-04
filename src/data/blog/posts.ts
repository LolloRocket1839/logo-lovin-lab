import { BlogPost } from "@/types/blog";

export const blogPosts: BlogPost[] = [
  {
    slug: "dove-mangiare-torino-studenti",
    category: "students",
    date: "2025-11-03",
    author: "Team Jungle Rent",
    image: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800&h=600&fit=crop",
    readTime: 12,
    content: "dove-mangiare-torino-studenti",
    translations: {
      it: {
        title: "Dove mangiare a Torino da studente: guida completa (2025)",
        excerpt: "La guida definitiva per mangiare bene a Torino spendendo poco: i migliori posti per colazione, pranzo, cena e aperitivo, mercati, mense universitarie e strategie di risparmio testati da studenti.",
        seo: {
          title: "Dove Mangiare a Torino da Studente: Guida Completa 2025 | Jungle Rent",
          description: "Dove mangiare a Torino da studente: guida 2025 ai migliori ristoranti economici vicino Politecnico e UniTo. Kebab €5, pizzerie, mercati e mense. Risparmia fino al 50% su colazione, pranzo e cena.",
          keywords: ["dove mangiare torino studenti", "ristoranti economici torino", "mangiare poco torino", "mercati torino", "mense universitarie torino", "aperitivo economico torino", "politecnico torino", "unito torino"]
        },
        tags: ["studenti", "cibo", "torino", "risparmio", "ristoranti", "guida"]
      },
      en: {
        title: "Where to eat in Turin as a student: complete guide (2025)",
        excerpt: "The ultimate guide to eating well in Turin on a budget: the best places for breakfast, lunch, dinner and aperitivo, markets, university canteens and money-saving strategies tested by students.",
        seo: {
          title: "Where to Eat in Turin as a Student: Complete Guide 2025 | Jungle Rent",
          description: "Discover the best places to eat in Turin on a budget: kebab shops, pizzerias, ethnic restaurants, markets, canteens and tips to save money. Complete guide with real prices.",
          keywords: ["where to eat turin students", "cheap restaurants turin", "budget food turin", "turin markets", "university canteens turin", "cheap aperitivo turin"]
        },
        tags: ["students", "food", "turin", "budget", "restaurants", "guide"]
      }
    }
  },
  {
    slug: "san-salvario-guida-studenti",
    category: "students",
    date: "2025-11-03",
    author: "Team Jungle Rent",
    image: "/images/san-salvario-night.jpeg",
    readTime: 10,
    content: "san-salvario-guida-studenti",
    translations: {
      it: {
        title: "San Salvario: guida completa per studenti universitari a Torino",
        excerpt: "Tutto quello che devi sapere per vivere a San Salvario: prezzi reali, zone migliori, vita quotidiana e consigli pratici per studenti universitari.",
        seo: {
          title: "San Salvario Torino: Guida Completa per Studenti 2025 | Jungle Rent",
          description: "San Salvario Torino: guida completa 2025 per studenti universitari. Affitto €300-500, zone migliori, vita notturna e collegamenti con Politecnico e UniTo. Tutto quello che devi sapere prima di trasferirti.",
          keywords: ["san salvario torino studenti", "affitto san salvario", "vivere san salvario", "quartiere studenti torino", "alloggio unito torino", "politecnico torino", "stanze san salvario"]
        },
        tags: ["studenti", "san salvario", "torino", "quartieri", "guida"]
      },
      en: {
        title: "San Salvario: complete guide for university students in Turin",
        excerpt: "Everything you need to know to live in San Salvario: real prices, best areas, daily life and practical tips for university students.",
        seo: {
          title: "San Salvario Turin: Complete Student Guide 2025 | Jungle Rent",
          description: "Discover how much it costs to live in San Salvario, the best areas, university connections and all practical tips for students. Updated 2025 guide.",
          keywords: ["san salvario turin students", "rent san salvario", "living san salvario", "student neighborhood turin", "unito accommodation turin"]
        },
        tags: ["students", "san salvario", "turin", "neighborhoods", "guide"]
      }
    }
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
