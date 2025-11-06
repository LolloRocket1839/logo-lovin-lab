export interface AreaInfo {
  name: string;
  keywords: string[];
  distance: {
    polito: string;
    unito: string;
  };
  characteristics: string[];
  avgRent: string;
  transport: string;
  description: {
    it: string;
    en: string;
  };
}

export const turinAreas: AreaInfo[] = [
  {
    name: "San Salvario",
    keywords: ["san salvario", "salvario", "s.salvario", "s salvario"],
    distance: {
      polito: "15 min",
      unito: "10 min"
    },
    characteristics: ["Multiculturale", "Vita notturna", "Mercati locali"],
    avgRent: "450-550€",
    transport: "Metro + Bus 18, 35",
    description: {
      it: "Quartiere multiculturale e vivace, vicino al Valentino. Ottimo per chi ama la vita notturna e i mercati locali. Ben collegato con metro e bus.",
      en: "Multicultural and lively neighborhood, close to Valentino Park. Great for nightlife lovers and local markets. Well connected by metro and bus."
    }
  },
  {
    name: "Crocetta",
    keywords: ["crocetta", "la crocetta"],
    distance: {
      polito: "20 min",
      unito: "15 min"
    },
    characteristics: ["Elegante", "Tranquillo", "Residenziale"],
    avgRent: "500-650€",
    transport: "Tram 13, 15 + Bus",
    description: {
      it: "Quartiere elegante e residenziale, ideale per chi cerca tranquillità. Zone verdi, negozi di qualità e ottima connessione con il centro.",
      en: "Elegant residential neighborhood, ideal for those seeking tranquility. Green areas, quality shops and excellent connection to the center."
    }
  },
  {
    name: "Centro",
    keywords: ["centro", "city center", "centro storico"],
    distance: {
      polito: "25 min",
      unito: "5 min"
    },
    characteristics: ["Storico", "Monumenti", "Shopping"],
    avgRent: "550-700€",
    transport: "Metro + Tutti i mezzi",
    description: {
      it: "Cuore pulsante di Torino, con monumenti, musei e shopping. Perfetto per UniTo. Affitti più alti ma massima centralità.",
      en: "Beating heart of Turin, with monuments, museums and shopping. Perfect for UniTo. Higher rents but maximum centrality."
    }
  },
  {
    name: "Vanchiglia",
    keywords: ["vanchiglia", "borgo vanchiglia"],
    distance: {
      polito: "10 min",
      unito: "15 min"
    },
    characteristics: ["Giovane", "Movida", "Caffè"],
    avgRent: "450-550€",
    transport: "Bus 68, 55",
    description: {
      it: "Quartiere giovane e alla moda, con tantissimi bar e caffè. Vicino al Politecnico e al Parco Arrivore. Ideale per studenti.",
      en: "Young and trendy neighborhood, with many bars and cafés. Close to Politecnico and Arrivore Park. Ideal for students."
    }
  },
  {
    name: "Aurora",
    keywords: ["aurora", "barriera", "barriera milano"],
    distance: {
      polito: "15 min",
      unito: "20 min"
    },
    characteristics: ["In trasformazione", "Economico", "Multietnico"],
    avgRent: "350-450€",
    transport: "Tram 3, 9 + Metro",
    description: {
      it: "Quartiere in forte trasformazione, con affitti più economici. Multietnico e ben collegato. Ottimo per budget ridotti.",
      en: "Neighborhood undergoing major transformation, with cheaper rents. Multiethnic and well connected. Great for tight budgets."
    }
  },
  {
    name: "Lingotto",
    keywords: ["lingotto", "nitto", "parco dora"],
    distance: {
      polito: "30 min",
      unito: "20 min"
    },
    characteristics: ["Moderno", "Spazi verdi", "Eataly"],
    avgRent: "400-500€",
    transport: "Metro + Bus 35",
    description: {
      it: "Zona moderna con il famoso centro commerciale e Eataly. Spazi verdi e architettura contemporanea. Metro diretta.",
      en: "Modern area with famous shopping center and Eataly. Green spaces and contemporary architecture. Direct metro line."
    }
  },
  {
    name: "San Paolo",
    keywords: ["san paolo", "s.paolo", "s paolo", "santa rita"],
    distance: {
      polito: "25 min",
      unito: "25 min"
    },
    characteristics: ["Residenziale", "Famiglie", "Tranquillo"],
    avgRent: "400-500€",
    transport: "Tram 4 + Bus",
    description: {
      it: "Quartiere residenziale e tranquillo, ideale per chi studia. Meno vita notturna ma più economico e sicuro.",
      en: "Quiet residential neighborhood, ideal for studying. Less nightlife but cheaper and safer."
    }
  },
  {
    name: "Politecnico",
    keywords: ["politecnico", "polito", "castello valentino", "valentino"],
    distance: {
      polito: "5 min",
      unito: "20 min"
    },
    characteristics: ["Campus", "Studenti", "Parco"],
    avgRent: "500-600€",
    transport: "A piedi dal campus",
    description: {
      it: "Zone immediatamente adiacenti al Politecnico e Parco Valentino. Massima comodità per ingegneria e architettura.",
      en: "Areas immediately adjacent to Politecnico and Valentino Park. Maximum convenience for engineering and architecture students."
    }
  }
];

export const detectArea = (text: string): AreaInfo | null => {
  const lowerText = text.toLowerCase();
  
  for (const area of turinAreas) {
    for (const keyword of area.keywords) {
      if (lowerText.includes(keyword)) {
        return area;
      }
    }
  }
  
  return null;
};
