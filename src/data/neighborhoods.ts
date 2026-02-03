export interface Neighborhood {
  slug: string;
  name: string;
  zone: string;
  description: {
    it: string;
    en: string;
  };
  highlights: {
    it: string[];
    en: string[];
  };
  universities: string[];
  avgRent: {
    single: { min: number; max: number };
    double: { min: number; max: number };
  };
  transport: string[];
  studentProfile: {
    it: string;
    en: string;
  };
  nightlife: 1 | 2 | 3 | 4 | 5;
  safety: 1 | 2 | 3 | 4 | 5;
  greenSpaces: 1 | 2 | 3 | 4 | 5;
  studentDensity: 1 | 2 | 3 | 4 | 5;
  coordinates: { lat: number; lng: number };
  image: string;
  seo: {
    it: {
      title: string;
      description: string;
      keywords: string[];
    };
    en: {
      title: string;
      description: string;
      keywords: string[];
    };
  };
}

export const neighborhoods: Neighborhood[] = [
  {
    slug: "san-salvario",
    name: "San Salvario",
    zone: "Centro",
    description: {
      it: "Il quartiere più multiculturale e vivace di Torino, amato dagli studenti per la vita notturna, i locali etnici e l'atmosfera bohémien. A pochi passi dal Valentino e dalla stazione Porta Nuova.",
      en: "Turin's most multicultural and vibrant neighborhood, loved by students for nightlife, ethnic restaurants and bohemian atmosphere. Steps from Valentino Park and Porta Nuova station."
    },
    highlights: {
      it: ["Vita notturna attiva", "Ristoranti etnici", "Vicino al Valentino", "Atmosfera giovane"],
      en: ["Active nightlife", "Ethnic restaurants", "Near Valentino Park", "Young atmosphere"]
    },
    universities: ["Università di Torino", "Campus Luigi Einaudi"],
    avgRent: { single: { min: 350, max: 500 }, double: { min: 250, max: 350 } },
    transport: ["Metro Nizza", "Tram 9, 16", "Bus 67"],
    studentProfile: {
      it: "Ideale per studenti sociali che amano uscire, conoscere culture diverse e vivere in un ambiente dinamico.",
      en: "Ideal for social students who love going out, meeting diverse cultures and living in a dynamic environment."
    },
    nightlife: 5,
    safety: 3,
    greenSpaces: 4,
    studentDensity: 5,
    coordinates: { lat: 45.0523, lng: 7.6784 },
    image: "/images/san-salvario-night.jpeg",
    seo: {
      it: {
        title: "Affitto stanza San Salvario Torino | Prezzi 2026 da €250",
        description: "Cerchi una stanza in affitto a San Salvario? Prezzi medi €350-500 singola, €250-350 doppia. Guida completa: trasporti, vita notturna, università vicine.",
        keywords: ["affitto stanza san salvario", "stanza studenti san salvario torino", "affitto san salvario studenti", "camera san salvario torino"]
      },
      en: {
        title: "Room for Rent San Salvario Turin | 2026 Prices from €250",
        description: "Looking for a room in San Salvario? Average prices €350-500 single, €250-350 shared. Complete guide: transport, nightlife, nearby universities.",
        keywords: ["room rent san salvario", "student room san salvario turin", "san salvario student housing", "room san salvario torino"]
      }
    }
  },
  {
    slug: "vanchiglia",
    name: "Vanchiglia",
    zone: "Centro",
    description: {
      it: "Quartiere artistico e alternativo, con botteghe artigiane, gallerie d'arte e caffè letterari. Vicino al Po e al centro storico, perfetto per chi cerca autenticità.",
      en: "Artistic and alternative neighborhood with artisan shops, art galleries and literary cafés. Close to the Po River and historic center, perfect for those seeking authenticity."
    },
    highlights: {
      it: ["Atmosfera artistica", "Botteghe artigiane", "Vicino al Po", "Caffè letterari"],
      en: ["Artistic atmosphere", "Artisan shops", "Near Po River", "Literary cafés"]
    },
    universities: ["Palazzo Nuovo", "Accademia Albertina"],
    avgRent: { single: { min: 380, max: 520 }, double: { min: 280, max: 380 } },
    transport: ["Tram 3, 16", "Bus 61, 68"],
    studentProfile: {
      it: "Perfetto per studenti di lettere, arte e filosofia che cercano ispirazione e un ambiente creativo.",
      en: "Perfect for humanities, art and philosophy students seeking inspiration and a creative environment."
    },
    nightlife: 4,
    safety: 4,
    greenSpaces: 3,
    studentDensity: 4,
    coordinates: { lat: 45.0712, lng: 7.6956 },
    image: "/images/quadrilatero-notte-torino.jpg",
    seo: {
      it: {
        title: "Affitto stanza Vanchiglia Torino | Prezzi 2026 da €280",
        description: "Stanze in affitto a Vanchiglia Torino. Prezzi €380-520 singola. Quartiere artistico vicino a Palazzo Nuovo e centro storico. Guida completa.",
        keywords: ["affitto stanza vanchiglia", "stanza studenti vanchiglia torino", "camera vanchiglia torino", "affitto vanchiglia studenti"]
      },
      en: {
        title: "Room for Rent Vanchiglia Turin | 2026 Prices from €280",
        description: "Rooms for rent in Vanchiglia Turin. Prices €380-520 single. Artistic neighborhood near Palazzo Nuovo and historic center. Complete guide.",
        keywords: ["room rent vanchiglia", "student room vanchiglia turin", "vanchiglia student housing", "room vanchiglia torino"]
      }
    }
  },
  {
    slug: "crocetta",
    name: "Crocetta",
    zone: "Semicentro",
    description: {
      it: "Il quartiere universitario per eccellenza, sede del Politecnico. Elegante, ben servito e sicuro. Ideale per chi cerca tranquillità senza rinunciare ai servizi.",
      en: "The quintessential university neighborhood, home to Politecnico. Elegant, well-connected and safe. Ideal for those seeking tranquility without sacrificing amenities."
    },
    highlights: {
      it: ["Sede del Politecnico", "Quartiere elegante", "Molto sicuro", "Ben servito"],
      en: ["Politecnico campus", "Elegant neighborhood", "Very safe", "Well-connected"]
    },
    universities: ["Politecnico di Torino", "Valentino Campus"],
    avgRent: { single: { min: 400, max: 550 }, double: { min: 300, max: 400 } },
    transport: ["Metro Porta Nuova", "Tram 9, 16, 18", "Bus 33, 58"],
    studentProfile: {
      it: "Ideale per studenti di ingegneria e architettura che vogliono vivere vicino al Politecnico in un ambiente tranquillo.",
      en: "Ideal for engineering and architecture students who want to live near Politecnico in a quiet environment."
    },
    nightlife: 2,
    safety: 5,
    greenSpaces: 4,
    studentDensity: 5,
    coordinates: { lat: 45.0567, lng: 7.6612 },
    image: "/images/politecnico-torino.avif",
    seo: {
      it: {
        title: "Affitto stanza Crocetta Torino | Vicino Politecnico da €300",
        description: "Stanze in affitto alla Crocetta, vicino al Politecnico di Torino. Prezzi €400-550 singola. Quartiere sicuro e tranquillo per studenti.",
        keywords: ["affitto stanza crocetta torino", "stanza politecnico torino", "camera crocetta studenti", "affitto crocetta politecnico"]
      },
      en: {
        title: "Room for Rent Crocetta Turin | Near Politecnico from €300",
        description: "Rooms for rent in Crocetta, near Politecnico di Torino. Prices €400-550 single. Safe and quiet neighborhood for students.",
        keywords: ["room rent crocetta turin", "room near politecnico", "crocetta student housing", "politecnico turin room"]
      }
    }
  },
  {
    slug: "santa-rita",
    name: "Santa Rita",
    zone: "Semicentro",
    description: {
      it: "Quartiere residenziale con ottimi servizi, mercati rionali e buoni collegamenti. Più economico del centro, mantiene qualità della vita elevata.",
      en: "Residential neighborhood with excellent services, local markets and good connections. More affordable than center while maintaining high quality of life."
    },
    highlights: {
      it: ["Prezzi accessibili", "Mercati rionali", "Buoni collegamenti", "Quartiere tranquillo"],
      en: ["Affordable prices", "Local markets", "Good connections", "Quiet neighborhood"]
    },
    universities: ["Politecnico (15 min)", "Campus Einaudi (20 min)"],
    avgRent: { single: { min: 320, max: 450 }, double: { min: 220, max: 320 } },
    transport: ["Metro Lingotto", "Tram 4", "Bus 14, 63"],
    studentProfile: {
      it: "Perfetto per studenti che cercano un buon rapporto qualità-prezzo e un ambiente familiare.",
      en: "Perfect for students seeking good value for money and a family-friendly environment."
    },
    nightlife: 2,
    safety: 5,
    greenSpaces: 3,
    studentDensity: 3,
    coordinates: { lat: 45.0389, lng: 7.6534 },
    image: "/images/mercato-nitti-torino.jpg",
    seo: {
      it: {
        title: "Affitto stanza Santa Rita Torino | Prezzi economici da €220",
        description: "Stanze economiche a Santa Rita Torino. Prezzi da €320 singola, €220 doppia. Quartiere tranquillo con buoni collegamenti metro.",
        keywords: ["affitto stanza santa rita torino", "stanza economica torino", "camera santa rita studenti", "affitto economico torino"]
      },
      en: {
        title: "Room for Rent Santa Rita Turin | Affordable from €220",
        description: "Affordable rooms in Santa Rita Turin. Prices from €320 single, €220 shared. Quiet neighborhood with good metro connections.",
        keywords: ["room rent santa rita turin", "affordable room turin", "santa rita student housing", "cheap room turin"]
      }
    }
  },
  {
    slug: "cenisia",
    name: "Cenisia",
    zone: "Semicentro",
    description: {
      it: "Quartiere in trasformazione vicino al Politecnico, con prezzi ancora accessibili e buona connessione metro. Mix di residenti storici e nuovi studenti.",
      en: "Transforming neighborhood near Politecnico with still-accessible prices and good metro connection. Mix of longtime residents and new students."
    },
    highlights: {
      it: ["Vicino al Politecnico", "Prezzi accessibili", "Metro Rivoli", "In trasformazione"],
      en: ["Near Politecnico", "Accessible prices", "Metro Rivoli", "Transforming area"]
    },
    universities: ["Politecnico di Torino (10 min)", "Campus Valentino"],
    avgRent: { single: { min: 330, max: 470 }, double: { min: 230, max: 330 } },
    transport: ["Metro Rivoli", "Tram 3, 10", "Bus 36, 56"],
    studentProfile: {
      it: "Ideale per studenti del Politecnico che cercano prezzi più bassi rispetto alla Crocetta.",
      en: "Ideal for Politecnico students seeking lower prices compared to Crocetta."
    },
    nightlife: 2,
    safety: 4,
    greenSpaces: 2,
    studentDensity: 4,
    coordinates: { lat: 45.0634, lng: 7.6489 },
    image: "/images/portici-torino.jpg",
    seo: {
      it: {
        title: "Affitto stanza Cenisia Torino | Vicino Politecnico da €230",
        description: "Stanze in affitto a Cenisia, vicino al Politecnico. Prezzi €330-470 singola. Quartiere con metro e buoni collegamenti. Guida completa.",
        keywords: ["affitto stanza cenisia torino", "stanza cenisia politecnico", "camera cenisia studenti", "affitto cenisia torino"]
      },
      en: {
        title: "Room for Rent Cenisia Turin | Near Politecnico from €230",
        description: "Rooms for rent in Cenisia, near Politecnico. Prices €330-470 single. Neighborhood with metro and good connections. Complete guide.",
        keywords: ["room rent cenisia turin", "cenisia politecnico room", "cenisia student housing", "room cenisia torino"]
      }
    }
  },
  {
    slug: "cit-turin",
    name: "Cit Turin",
    zone: "Semicentro",
    description: {
      it: "Quartiere elegante con architettura liberty, vicino al centro e ben collegato. Atmosfera residenziale tranquilla con negozi e ristoranti di qualità.",
      en: "Elegant neighborhood with Art Nouveau architecture, close to center and well-connected. Quiet residential atmosphere with quality shops and restaurants."
    },
    highlights: {
      it: ["Architettura liberty", "Vicino al centro", "Atmosfera elegante", "Tranquillo"],
      en: ["Art Nouveau architecture", "Near center", "Elegant atmosphere", "Quiet"]
    },
    universities: ["Università di Torino (15 min)", "Politecnico (20 min)"],
    avgRent: { single: { min: 350, max: 480 }, double: { min: 250, max: 350 } },
    transport: ["Metro Principi d'Acaja", "Tram 10, 13", "Bus 59, 60"],
    studentProfile: {
      it: "Adatto a studenti che cercano tranquillità e un ambiente residenziale senza rinunciare alla vicinanza al centro.",
      en: "Suitable for students seeking tranquility and a residential environment while staying close to the center."
    },
    nightlife: 2,
    safety: 5,
    greenSpaces: 3,
    studentDensity: 3,
    coordinates: { lat: 45.0756, lng: 7.6612 },
    image: "/images/portici-torino.jpg",
    seo: {
      it: {
        title: "Affitto stanza Cit Turin Torino | Quartiere elegante da €250",
        description: "Stanze in affitto a Cit Turin. Prezzi €350-480 singola. Quartiere liberty elegante e tranquillo vicino al centro di Torino.",
        keywords: ["affitto stanza cit turin", "stanza cit turin torino", "camera cit turin studenti", "affitto cit turin elegante"]
      },
      en: {
        title: "Room for Rent Cit Turin | Elegant neighborhood from €250",
        description: "Rooms for rent in Cit Turin. Prices €350-480 single. Elegant Art Nouveau neighborhood, quiet and close to Turin center.",
        keywords: ["room rent cit turin", "cit turin room torino", "cit turin student housing", "elegant room turin"]
      }
    }
  },
  {
    slug: "campidoglio",
    name: "Campidoglio",
    zone: "Semicentro",
    description: {
      it: "Quartiere popolare in rapida gentrificazione, con botteghe storiche, mercato del Balon e atmosfera autentica. Prezzi ancora accessibili.",
      en: "Working-class neighborhood undergoing rapid gentrification, with historic shops, Balon flea market and authentic atmosphere. Still-accessible prices."
    },
    highlights: {
      it: ["Mercato del Balon", "Atmosfera autentica", "Prezzi accessibili", "In gentrificazione"],
      en: ["Balon flea market", "Authentic atmosphere", "Accessible prices", "Gentrifying"]
    },
    universities: ["Università di Torino (15 min)", "Campus Einaudi (20 min)"],
    avgRent: { single: { min: 300, max: 420 }, double: { min: 200, max: 300 } },
    transport: ["Metro Rivoli", "Tram 3, 9", "Bus 11, 52"],
    studentProfile: {
      it: "Perfetto per studenti creativi e alternativi che amano l'autenticità e i mercatini vintage.",
      en: "Perfect for creative and alternative students who love authenticity and vintage markets."
    },
    nightlife: 3,
    safety: 3,
    greenSpaces: 2,
    studentDensity: 3,
    coordinates: { lat: 45.0789, lng: 7.6534 },
    image: "/images/mercati-rionali-torino.jpg",
    seo: {
      it: {
        title: "Affitto stanza Campidoglio Torino | Prezzi bassi da €200",
        description: "Stanze economiche al Campidoglio Torino. Prezzi da €300 singola, €200 doppia. Quartiere autentico con mercato Balon. Guida completa.",
        keywords: ["affitto stanza campidoglio torino", "stanza economica campidoglio", "camera campidoglio studenti", "affitto campidoglio balon"]
      },
      en: {
        title: "Room for Rent Campidoglio Turin | Low prices from €200",
        description: "Affordable rooms in Campidoglio Turin. Prices from €300 single, €200 shared. Authentic neighborhood with Balon market. Complete guide.",
        keywords: ["room rent campidoglio turin", "cheap room campidoglio", "campidoglio student housing", "balon market room"]
      }
    }
  },
  {
    slug: "aurora",
    name: "Aurora",
    zone: "Nord",
    description: {
      it: "Quartiere multietnico e popolare, il più economico del semicentro. In forte trasformazione con progetti di riqualificazione urbana.",
      en: "Multi-ethnic working-class neighborhood, the most affordable in the semi-center. Undergoing major transformation with urban renewal projects."
    },
    highlights: {
      it: ["Prezzi più bassi", "Multietnico", "In riqualificazione", "Mercato di Porta Palazzo"],
      en: ["Lowest prices", "Multi-ethnic", "Being renewed", "Porta Palazzo market"]
    },
    universities: ["Campus Einaudi (10 min)", "Palazzo Nuovo (15 min)"],
    avgRent: { single: { min: 280, max: 380 }, double: { min: 180, max: 280 } },
    transport: ["Tram 3, 4", "Bus 11, 51, 57"],
    studentProfile: {
      it: "Per studenti con budget limitato che cercano un ambiente multiculturale e non convenzionale.",
      en: "For students with limited budget seeking a multicultural and unconventional environment."
    },
    nightlife: 3,
    safety: 2,
    greenSpaces: 1,
    studentDensity: 3,
    coordinates: { lat: 45.0823, lng: 7.6823 },
    image: "/images/mercato-piazza-crispi.jpg",
    seo: {
      it: {
        title: "Affitto stanza Aurora Torino | I prezzi più bassi da €180",
        description: "Stanze super economiche ad Aurora Torino. Prezzi da €280 singola, €180 doppia. Quartiere multietnico vicino a Porta Palazzo.",
        keywords: ["affitto stanza aurora torino", "stanza economica aurora", "camera aurora studenti", "affitto aurora porta palazzo"]
      },
      en: {
        title: "Room for Rent Aurora Turin | Lowest prices from €180",
        description: "Super affordable rooms in Aurora Turin. Prices from €280 single, €180 shared. Multi-ethnic neighborhood near Porta Palazzo.",
        keywords: ["room rent aurora turin", "cheapest room turin", "aurora student housing", "porta palazzo room"]
      }
    }
  },
  {
    slug: "lingotto",
    name: "Lingotto",
    zone: "Sud",
    description: {
      it: "Ex quartiere industriale FIAT trasformato in polo culturale moderno. Centro commerciale, Eataly, eventi e buoni collegamenti metro.",
      en: "Former FIAT industrial district transformed into modern cultural hub. Shopping center, Eataly, events and good metro connections."
    },
    highlights: {
      it: ["Ex stabilimento FIAT", "Eataly e Lingotto Fiere", "Metro Lingotto", "Architettura moderna"],
      en: ["Former FIAT factory", "Eataly and Lingotto Fairs", "Metro Lingotto", "Modern architecture"]
    },
    universities: ["Politecnico (15 min metro)", "Università (20 min)"],
    avgRent: { single: { min: 340, max: 460 }, double: { min: 240, max: 340 } },
    transport: ["Metro Lingotto", "Tram 4, 18", "Bus 1, 35"],
    studentProfile: {
      it: "Ideale per studenti che amano l'architettura moderna e vogliono vivere in un'area ben servita.",
      en: "Ideal for students who love modern architecture and want to live in a well-serviced area."
    },
    nightlife: 2,
    safety: 4,
    greenSpaces: 3,
    studentDensity: 2,
    coordinates: { lat: 45.0267, lng: 7.6656 },
    image: "/images/torino-transport.jpg",
    seo: {
      it: {
        title: "Affitto stanza Lingotto Torino | Con metro da €240",
        description: "Stanze in affitto al Lingotto Torino. Prezzi €340-460 singola. Quartiere moderno con metro, Eataly e centro commerciale.",
        keywords: ["affitto stanza lingotto torino", "stanza lingotto metro", "camera lingotto studenti", "affitto lingotto eataly"]
      },
      en: {
        title: "Room for Rent Lingotto Turin | With metro from €240",
        description: "Rooms for rent in Lingotto Turin. Prices €340-460 single. Modern neighborhood with metro, Eataly and shopping center.",
        keywords: ["room rent lingotto turin", "lingotto metro room", "lingotto student housing", "lingotto eataly room"]
      }
    }
  },
  {
    slug: "san-paolo",
    name: "San Paolo",
    zone: "Ovest",
    description: {
      it: "Quartiere residenziale tranquillo con buoni servizi e collegamenti. Popolare tra famiglie, offre un ambiente sicuro e prezzi ragionevoli.",
      en: "Quiet residential neighborhood with good services and connections. Popular with families, offers a safe environment and reasonable prices."
    },
    highlights: {
      it: ["Quartiere familiare", "Prezzi ragionevoli", "Molto tranquillo", "Ben collegato"],
      en: ["Family neighborhood", "Reasonable prices", "Very quiet", "Well-connected"]
    },
    universities: ["Politecnico (20 min)", "Università (25 min)"],
    avgRent: { single: { min: 310, max: 430 }, double: { min: 210, max: 310 } },
    transport: ["Metro Racconigi", "Tram 3, 10", "Bus 33, 36"],
    studentProfile: {
      it: "Per studenti che preferiscono la tranquillità e un ambiente residenziale a un prezzo accessibile.",
      en: "For students who prefer tranquility and a residential environment at an accessible price."
    },
    nightlife: 1,
    safety: 5,
    greenSpaces: 3,
    studentDensity: 2,
    coordinates: { lat: 45.0634, lng: 7.6378 },
    image: "/images/parco-valentino-inverno.jpg",
    seo: {
      it: {
        title: "Affitto stanza San Paolo Torino | Tranquillo da €210",
        description: "Stanze in affitto a San Paolo Torino. Prezzi €310-430 singola. Quartiere residenziale tranquillo e sicuro con metro.",
        keywords: ["affitto stanza san paolo torino", "stanza san paolo studenti", "camera san paolo torino", "affitto tranquillo torino"]
      },
      en: {
        title: "Room for Rent San Paolo Turin | Quiet from €210",
        description: "Rooms for rent in San Paolo Turin. Prices €310-430 single. Quiet and safe residential neighborhood with metro.",
        keywords: ["room rent san paolo turin", "san paolo student room", "san paolo housing", "quiet room turin"]
      }
    }
  }
];

export const getNeighborhoodBySlug = (slug: string): Neighborhood | undefined => {
  return neighborhoods.find(n => n.slug === slug);
};

export const getAllNeighborhoodSlugs = (): string[] => {
  return neighborhoods.map(n => n.slug);
};
