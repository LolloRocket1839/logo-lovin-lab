export type StudySpaceCategory = 
  | 'bar' 
  | 'biblioteca_nazionale' 
  | 'biblioteche_civiche' 
  | 'edisu' 
  | 'politecnico' 
  | 'unito' 
  | 'campus_diffuso' 
  | 'coworking' 
  | 'parchi' 
  | 'polo900';

export interface StudySpace {
  id: number;
  category: StudySpaceCategory;
  name: string;
  address: string;
  capacity: string;
  hours: string;
  features: string;
  link?: string;
}

export const studySpaces: StudySpace[] = [
  // Bar e Caffè per Studiare (6)
  {
    id: 1,
    category: 'bar',
    name: "Barney's (Circolo dei Lettori)",
    address: "Via Bogino 9, Torino",
    capacity: "Vari tavoli",
    hours: "Durante apertura Circolo",
    features: "1h Wi-Fi dopo consumazione, illimitato con tessera Circolo",
    link: "https://www.circololettori.it"
  },
  {
    id: 2,
    category: 'bar',
    name: "Casa del Quartiere San Salvario",
    address: "Via Oddino Morgari 14, Torino",
    capacity: "Vari spazi",
    hours: "Variabili",
    features: "Ambiente informale, bar, Wi-Fi"
  },
  {
    id: 3,
    category: 'bar',
    name: "Combo Torino",
    address: "Corso Regina Margherita 128, Torino",
    capacity: "Tavoli ampi",
    hours: "7:00-23:00 (Ven-Sab fino a mezzanotte)",
    features: "Ostello + caffetteria, Wi-Fi, pranzo",
    link: "https://www.thisiscombo.com"
  },
  {
    id: 4,
    category: 'bar',
    name: "Costadoro Social Coffee Factory",
    address: "Via Teofilo Rossi di Montelera 2, Torino",
    capacity: "Numerosi tavoli",
    hours: "Variabili",
    features: "Wi-Fi veloce (1h gratis), prese elettriche, giardino esterno"
  },
  {
    id: 5,
    category: 'bar',
    name: "Orso Laboratorio Caffè",
    address: "Via Claudio Luigi Berthollet 30, Torino",
    capacity: "Salottino",
    hours: "Variabili",
    features: "Caffetteria specialty, Wi-Fi, prese, dehors"
  },
  {
    id: 6,
    category: 'bar',
    name: "Bar e Caffè per Studiare",
    address: "Via Micca, Torino",
    capacity: "Tavoli",
    hours: "Variabili",
    features: "Wi-Fi, ambiente rilassato"
  },

  // Biblioteca Nazionale (1)
  {
    id: 7,
    category: 'biblioteca_nazionale',
    name: "Biblioteca Nazionale Universitaria",
    address: "Piazza Carlo Alberto 3, Torino",
    capacity: "Numerosi in sala consultazione",
    hours: "Lun-Ven 9:00-16:00",
    features: "Oltre 1,3 milioni di volumi, manoscritti rari, accesso da 16 anni",
    link: "https://bnuto.cultura.gov.it"
  },

  // Biblioteche Civiche (15)
  {
    id: 8,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Alberto Geisser",
    address: "Corso Casale 5, Torino",
    capacity: "Numerosi",
    hours: "Lun 9:00-12:30/14:00-19:00, Gio 9:00-12:30/14:00-19:00, Ven 9:00-14:00",
    features: "Aula studio, punto ristoro 'Il Mangialibro', Wi-Fi",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 9,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Bianca Guidetti Serra",
    address: "Piazzetta Università dei Mastri Minusieri, Torino",
    capacity: "32 posti lettura",
    hours: "Variabili, consultare sito",
    features: "Centro storico, Wi-Fi",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 10,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Cascina Marchesa",
    address: "Corso Vercelli 141/7, Torino",
    capacity: "Numerosi",
    hours: "Variabili, consultare sito",
    features: "Wi-Fi",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 11,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Centrale",
    address: "Via della Cittadella 5, Torino",
    capacity: "60 in sala lettura",
    hours: "Lun 14:00-19:00, Mar-Ven 9:00-19:00, Sab 9:00-15:00",
    features: "Principale biblioteca civica, oltre 500.000 volumi, Wi-Fi",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 12,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Cesare Pavese",
    address: "Via Candiolo 79, Torino",
    capacity: "Numerosi",
    hours: "Variabili, consultare sito",
    features: "Wi-Fi, parcheggio",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 13,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Dietrich Bonhoeffer",
    address: "Corso Corsica 55, Torino",
    capacity: "Numerosi",
    hours: "Lun 14:00-19:00, Mar-Ven 9:00-19:00, Sab 9:00-15:00",
    features: "3 postazioni internet, Wi-Fi",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 14,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Don Lorenzo Milani (Falchera)",
    address: "Via dei Pioppi 43, Torino",
    capacity: "Numerosi",
    hours: "Lun 14:00-19:00, Mar 9:00-15:00, Mer-Gio 13:00-19:00, Ven-Sab 9:00-15:00",
    features: "Oltre 48.000 volumi, Wi-Fi, 5 postazioni internet",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 15,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Francesco Cognasso",
    address: "Corso Cincinnato 115, Torino",
    capacity: "Numerosi",
    hours: "Variabili, consultare sito",
    features: "Wi-Fi, corsi di lingue",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 16,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Italo Calvino",
    address: "Lungo Dora Agrigento 94, Torino",
    capacity: "Numerosi",
    hours: "Variabili, consultare sito",
    features: "Wi-Fi, postazioni internet",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 17,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Luigi Carluccio",
    address: "Via Monte Ortigara 95, Torino",
    capacity: "Numerosi",
    hours: "Lun 14:00-19:00, Mar-Ven-Sab 9:00-15:00, Mer-Gio 13:00-19:00",
    features: "Riaperta dopo interventi straordinari",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 18,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Mausoleo della Bela Rosin",
    address: "Strada Castello di Mirafiori 148/7, Torino",
    capacity: "Numerosi",
    hours: "Variabili, consultare sito",
    features: "Zona Mirafiori",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 19,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Passerin d'Entrèves (Cascina Giajone)",
    address: "Via Guido Reni 96/15, Torino",
    capacity: "140 posti lettura",
    hours: "Lun 14:00-19:00, Mar-Ven-Sab 9:00-15:00, Mer-Gio 13:00-19:00",
    features: "Wi-Fi, ampi spazi",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 20,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Primo Levi",
    address: "Via Leoncavallo 17, Torino",
    capacity: "Numerosi",
    hours: "Lun 14:00-19:00, Mar-Ven 9:00-19:00, Sab 9:00-15:00",
    features: "Wi-Fi, postazioni internet",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 21,
    category: 'biblioteche_civiche',
    name: "Biblioteca Civica Villa Amoretti",
    address: "Corso Orbassano 200, Torino",
    capacity: "Numerosi",
    hours: "Variabili, consultare sito",
    features: "Luminosa, nel parco, Wi-Fi",
    link: "https://bct.comune.torino.it"
  },
  {
    id: 22,
    category: 'biblioteche_civiche',
    name: "Biblioteca Musicale Andrea Della Corte",
    address: "Corso Francia 186 (Villa Tesoriera), Torino",
    capacity: "Numerosi",
    hours: "Lun-Mar-Gio 9:15-18:45, Mer-Ven 9:15-16:45",
    features: "Specializzata in musica e danza, 36.000 spartiti, Wi-Fi",
    link: "https://bct.comune.torino.it"
  },

  // Biblioteche EDISU (7)
  {
    id: 23,
    category: 'edisu',
    name: "Sala Studio Corso Castelfidardo",
    address: "Corso Castelfidardo 30/A (Cittadella Politecnica), Torino",
    capacity: "180",
    hours: "Lun-Ven 8:00-23:30, Sab 8:00-20:00",
    features: "Wi-Fi gratuito, presso il Politecnico",
    link: "https://www.edisu.piemonte.it"
  },
  {
    id: 24,
    category: 'edisu',
    name: "Sala Studio Corso Svizzera (Centro Piero della Francesca)",
    address: "Corso Svizzera 185, Torino",
    capacity: "180",
    hours: "Lun-Ven 9:00-18:00",
    features: "Wi-Fi gratuito",
    link: "https://www.edisu.piemonte.it"
  },
  {
    id: 25,
    category: 'edisu',
    name: "Sala Studio Michelangelo Buonarroti",
    address: "Via Michelangelo Buonarroti 17/Bis, Torino",
    capacity: "364-427",
    hours: "Lun-Ven 8:30-24:00, Sab-Dom 8:30-22:00 (sessione fino alle 2:00)",
    features: "Wi-Fi gratuito, prenotabile con app Campus Piemonte",
    link: "https://www.edisu.piemonte.it"
  },
  {
    id: 26,
    category: 'edisu',
    name: "Sala Studio Ormea",
    address: "Via Ormea, Torino",
    capacity: "134",
    hours: "Variabili",
    features: "Wi-Fi gratuito, prenotabile",
    link: "https://www.edisu.piemonte.it"
  },
  {
    id: 27,
    category: 'edisu',
    name: "Sala Studio Pietro Giuria",
    address: "Via Pietro Giuria 17, Torino",
    capacity: "200",
    hours: "Lun-Ven 8:30-19:00",
    features: "Wi-Fi gratuito",
    link: "https://www.edisu.piemonte.it"
  },
  {
    id: 28,
    category: 'edisu',
    name: "Sala Studio Principe Amedeo",
    address: "Via Principe Amedeo, Torino",
    capacity: "96",
    hours: "Variabili",
    features: "Wi-Fi gratuito, prenotabile",
    link: "https://www.edisu.piemonte.it"
  },
  {
    id: 29,
    category: 'edisu',
    name: "Sala Studio Verdi",
    address: "Via Verdi 26, Torino",
    capacity: "292-308",
    hours: "Lun-Ven 8:30-24:00, Sab-Dom 8:30-22:00 (sessione fino alle 2:00)",
    features: "Wi-Fi gratuito, prenotabile con app Campus Piemonte",
    link: "https://www.edisu.piemonte.it"
  },
  {
    id: 30,
    category: 'edisu',
    name: "Torino Student Zone - Murazzi del Po",
    address: "Via Murazzi del Po 26 (arcate 30-38), Torino",
    capacity: "81",
    hours: "Lun-Ven 9:00-21:00",
    features: "Bar, ristoreria, Wi-Fi, spazio polifunzionale",
    link: "https://www.studyintorino.it"
  },

  // Biblioteche Politecnico (3)
  {
    id: 31,
    category: 'politecnico',
    name: "Aule Studio Sede Lingotto",
    address: "Via Nizza 230 (8Gallery), Torino",
    capacity: "Sala Le Corbusier (32), Sala Tesla (44), Area studio piano 1 (40)",
    hours: "Lun-Ven 8:00-19:30",
    features: "Moderne, all'interno dell'8Gallery, Wi-Fi",
    link: "https://www.polito.it"
  },
  {
    id: 32,
    category: 'politecnico',
    name: "Biblioteca Centrale di Architettura 'Roberto Gabetti' (Castello del Valentino)",
    address: "Viale Mattioli 39, Torino",
    capacity: "Numerosi posti lettura",
    hours: "Variabili, consultare sito",
    features: "Patrimonio librario architettura, sale studio, Wi-Fi",
    link: "https://www.biblio.polito.it"
  },
  {
    id: 33,
    category: 'politecnico',
    name: "Biblioteca Centrale di Ingegneria (Sede Centrale)",
    address: "Corso Duca degli Abruzzi 24, Torino",
    capacity: "Vari posti disponibili",
    hours: "Consultare sito del Politecnico",
    features: "Aule studio silenziose e rumorose, Wi-Fi, prese elettriche",
    link: "https://www.biblio.polito.it"
  },

  // Biblioteche Università di Torino (3)
  {
    id: 34,
    category: 'unito',
    name: "Biblioteca Norberto Bobbio",
    address: "Via Sant'Ottavio, Torino",
    capacity: "Numerosi",
    hours: "Prenotazione tramite app Affluences",
    features: "Biblioteca principale di giurisprudenza, Wi-Fi",
    link: "https://www.sba.unito.it"
  },
  {
    id: 35,
    category: 'unito',
    name: "Biblioteca di Economia e Management",
    address: "Corso Unione Sovietica, Torino",
    capacity: "Numerosi",
    hours: "Prenotazione tramite app Affluences",
    features: "Specializzata in economia, Wi-Fi",
    link: "https://www.sba.unito.it"
  },
  {
    id: 36,
    category: 'unito',
    name: "Sistema Bibliotecario UniTo (22 biblioteche)",
    address: "Varie sedi in città",
    capacity: "Oltre 30 sedi",
    hours: "Variabili per sede, prenotazione tramite Affluences",
    features: "Wi-Fi, accesso con credenziali universitarie",
    link: "https://www.sba.unito.it"
  },

  // Campus Diffuso Universitario (11)
  {
    id: 37,
    category: 'campus_diffuso',
    name: "Bunker",
    address: "Via Paganini, Torino",
    capacity: "40 interni",
    hours: "Variabili",
    features: "Wi-Fi, prese elettriche",
    link: "https://www.studyintorino.it"
  },
  {
    id: 38,
    category: 'campus_diffuso',
    name: "CAP10100",
    address: "Via Barletta, Torino",
    capacity: "80 interni",
    hours: "Variabili",
    features: "Wi-Fi gratuito, prese elettriche",
    link: "https://www.studyintorino.it"
  },
  {
    id: 39,
    category: 'campus_diffuso',
    name: "CPG Torino",
    address: "Via Verolengo, Torino",
    capacity: "20 interni",
    hours: "Variabili",
    features: "Wi-Fi, vista green, BarCult",
    link: "https://www.cpgtorino.it"
  },
  {
    id: 40,
    category: 'campus_diffuso',
    name: "Casa del Quartiere - Barrito",
    address: "Via Rubino 45, Torino",
    capacity: "40 interni + 40 esterni",
    hours: "Lun-Sab 9:00-18:00",
    features: "Wi-Fi, caffè con cucina",
    link: "https://www.studyintorino.it"
  },
  {
    id: 41,
    category: 'campus_diffuso',
    name: "Casa nel Parco (Mirafiori Sud)",
    address: "Via Panetti 1, Torino",
    capacity: "20 interni",
    hours: "Sab-Dom 14:00-23:00",
    features: "Wi-Fi gratuito, giardino, caffetteria, menù studenti 5€",
    link: "https://www.fondazionemirafiori.it"
  },
  {
    id: 42,
    category: 'campus_diffuso',
    name: "Circolo Arci l'Arteficio",
    address: "Via Fossano, Torino",
    capacity: "70 interni",
    hours: "Variabili",
    features: "Wi-Fi gratuito",
    link: "https://www.arcitorino.it"
  },
  {
    id: 43,
    category: 'campus_diffuso',
    name: "Comala",
    address: "Corso Ferrucci 65/A, Torino",
    capacity: "60 interni + 350 esterni riscaldati",
    hours: "Lun-Ven 8:30-0:30, Sab-Dom 10:00-0:30",
    features: "Spazio pubblico, Wi-Fi, prese, acqua gratis, bar",
    link: "https://www.studyintorino.it"
  },
  {
    id: 44,
    category: 'campus_diffuso',
    name: "El Barrio",
    address: "Via Baltea 3, Torino",
    capacity: "35 interni",
    hours: "Variabili",
    features: "Wi-Fi gratuito",
    link: "https://www.studyintorino.it"
  },
  {
    id: 45,
    category: 'campus_diffuso',
    name: "Imbarchino (Parco Valentino)",
    address: "Viale Umberto Cagni 37, Parco del Valentino, Torino",
    capacity: "25 interni + 64 esterni",
    hours: "Lun-Sab 9:00-18:00",
    features: "Bar, Wi-Fi, prese elettriche, acqua gratis, nel verde",
    link: "https://www.imbarchino.space"
  },
  {
    id: 46,
    category: 'campus_diffuso',
    name: "Off Topic - Torino Youth Centre",
    address: "Via Pallavicino, Torino",
    capacity: "136 interni",
    hours: "Variabili, anche in sessione",
    features: "Centro culturale, Wi-Fi, eventi",
    link: "https://www.studyintorino.it"
  },
  {
    id: 47,
    category: 'campus_diffuso',
    name: "Spazio 211",
    address: "Via Cigna 211, Torino",
    capacity: "20 interni + 30 esterni",
    hours: "Lun-Ven 10:00-18:30",
    features: "Wi-Fi, polo socio-culturale",
    link: "https://www.studyintorino.it"
  },

  // Coworking e Spazi Studio (7)
  {
    id: 48,
    category: 'coworking',
    name: "AL DUDES Coworking",
    address: "Zona Porta Susa (500m dalla Metro), Torino",
    capacity: "Varie postazioni",
    hours: "Variabili",
    features: "Postazioni flessibili, uffici, meeting room",
    link: "https://www.aldudes.it"
  },
  {
    id: 49,
    category: 'coworking',
    name: "Circolo dei Lettori - Sala Artisti",
    address: "Via Bogino 9, Torino",
    capacity: "20 postazioni",
    hours: "Lun-Sab 9:30-17:30",
    features: "Necessaria Carta Io Leggo (20€, 15€ studenti), Wi-Fi, bar Barney's",
    link: "https://www.circololettori.it"
  },
  {
    id: 50,
    category: 'coworking',
    name: "OGR - Officine Grandi Riparazioni",
    address: "Corso Castelfidardo 22, Torino",
    capacity: "Area ristoro e spazi comuni",
    hours: "Variabili secondo eventi",
    features: "Wi-Fi gratuito, bar, centro culturale",
    link: "https://www.ogrtorino.it"
  },
  {
    id: 51,
    category: 'coworking',
    name: "Open - Fondazione Time2",
    address: "Via Avellino (zona), Torino",
    capacity: "24 postazioni interne + 20 esterne",
    hours: "Lun-Mar 9:00-18:00, Mer-Ven 9:00-20:30",
    features: "Wi-Fi, prese, aria condizionata, acqua gratis, prenotazione necessaria",
    link: "https://www.open.fondazionetime2.it"
  },
  {
    id: 52,
    category: 'coworking',
    name: "Principi HUB",
    address: "Via Antonio Banfo 41, Torino",
    capacity: "Postazioni coworking",
    hours: "Lun-Ven 9:00-18:00",
    features: "Business desk da 95€/mese, Wi-Fi, stampante, sale riunioni",
    link: "https://www.principihub.it"
  },
  {
    id: 53,
    category: 'coworking',
    name: "Vol.To Coworking",
    address: "Sede Vol.To, Torino",
    capacity: "Varie postazioni",
    hours: "Variabili",
    features: "Mezza giornata 6,50€, giornata 10€, carnet disponibili",
    link: "https://www.volontariatotorino.it"
  },
  {
    id: 54,
    category: 'coworking',
    name: "Centro Pari Opportunità (CPO)",
    address: "Varie sedi, Torino",
    capacity: "Variabili",
    hours: "Variabili",
    features: "Spazi per studenti, Wi-Fi",
  },

  // Parchi con Wi-Fi (2)
  {
    id: 55,
    category: 'parchi',
    name: "Parco Colletta",
    address: "Zona Mirafiori, Torino",
    capacity: "Illimitati",
    hours: "Sempre aperto",
    features: "448.000 mq, pista ciclabile, area pic-nic, Wi-Fi"
  },
  {
    id: 56,
    category: 'parchi',
    name: "Parco del Valentino",
    address: "Lungo Po, Torino",
    capacity: "Illimitati all'aperto",
    hours: "Sempre aperto",
    features: "421.000 mq, Wi-Fi in alcune zone, vista sul Po"
  },

  // Polo del 900 (2)
  {
    id: 57,
    category: 'polo900',
    name: "Polo del '900 - Sala Lettura Istoreto",
    address: "Corso Valdocco 4/A (3° piano), Torino",
    capacity: "Numerosi",
    hours: "Lun-Gio 10:00-18:00, Ven 10:00-13:00",
    features: "Storia dell'Antifascismo e Resistenza, Wi-Fi",
    link: "https://www.polodel900.it"
  },
  {
    id: 58,
    category: 'polo900',
    name: "Polo del '900 - Sala Lettura Palazzo San Daniele",
    address: "Via del Carmine 14, Torino",
    capacity: "Numerosi posti studio",
    hours: "Lun-Ven 9:30-13:30 / 14:30-18:30",
    features: "Oltre 300.000 volumi sul '900, Wi-Fi gratuito, prenotazione necessaria",
    link: "https://www.polodel900.it"
  }
];

export const getCategoryLabel = (category: StudySpaceCategory, lang: 'it' | 'en' = 'it'): string => {
  const labels = {
    it: {
      bar: 'Bar e Caffè',
      biblioteca_nazionale: 'Biblioteca Nazionale',
      biblioteche_civiche: 'Biblioteche Civiche',
      edisu: 'Sale Studio EDISU',
      politecnico: 'Biblioteche Politecnico',
      unito: 'Biblioteche UniTo',
      campus_diffuso: 'Campus Diffuso Universitario',
      coworking: 'Coworking e Spazi Studio',
      parchi: 'Parchi con Wi-Fi',
      polo900: 'Polo del 900'
    },
    en: {
      bar: 'Bars & Cafés',
      biblioteca_nazionale: 'National Library',
      biblioteche_civiche: 'Public Libraries',
      edisu: 'EDISU Study Halls',
      politecnico: 'Politecnico Libraries',
      unito: 'UniTo Libraries',
      campus_diffuso: 'University Diffused Campus',
      coworking: 'Coworking Spaces',
      parchi: 'Parks with Wi-Fi',
      polo900: 'Polo del 900'
    }
  };
  return labels[lang][category];
};

export const getSpacesByCategory = (category: StudySpaceCategory): StudySpace[] => {
  return studySpaces.filter(space => space.category === category);
};

export const getAllCategories = (): StudySpaceCategory[] => {
  return Array.from(new Set(studySpaces.map(space => space.category)));
};
