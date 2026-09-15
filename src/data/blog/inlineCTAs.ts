// Inline mid-article CTAs for top 5 most-viewed blog posts
// Each CTA is tailored to the article's topic and audience intent

export type InlineCTAVariant = 'whatsapp' | 'waitlist' | 'investor';

export interface InlineCTAConfig {
  variant: InlineCTAVariant;
  it: {
    eyebrow: string;
    title: string;
    description: string;
    button: string;
  };
  en: {
    eyebrow: string;
    title: string;
    description: string;
    button: string;
  };
}

// Map of slug → tailored CTA. Top 5 articles by 90-day pageviews.
export const INLINE_CTAS: Record<string, InlineCTAConfig> = {
  'quartieri-sicuri-donne-torino': {
    variant: 'waitlist',
    it: {
      eyebrow: 'Cerchi casa a Torino?',
      title: 'Stanze in zone sicure, già verificate',
      description: 'Entra nella waitlist: ti contattiamo non appena liberiamo una stanza nei quartieri che ti interessano.',
      button: 'Unisciti alla waitlist',
    },
    en: {
      eyebrow: 'Looking for a room in Turin?',
      title: 'Verified rooms in safe areas',
      description: 'Join the waitlist: we contact you as soon as a room opens up in the neighborhoods you prefer.',
      button: 'Join the waitlist',
    },
  },
  'student-housing-italia-savills-2025': {
    variant: 'investor',
    it: {
      eyebrow: 'Investitore?',
      title: 'Trasformiamo i dati Savills in operazioni reali',
      description: 'Acquistiamo bilocali a Torino e li gestiamo nel modello dual-season studenti + turisti. Le proiezioni economiche puntuali sono nel memorandum informativo.',
      button: 'Parla con Lorenzo',
    },
    en: {
      eyebrow: 'Investor?',
      title: 'Turning Savills data into real operations',
      description: 'We buy 2-room apartments in Turin and manage them with our dual-season student + tourist model. Detailed economic projections are shared in the information memorandum.',
      button: 'Talk to Lorenzo',
    },
  },
  'aule-studio-torino-guida-completa': {
    variant: 'waitlist',
    it: {
      eyebrow: 'Studi a Torino?',
      title: 'Cerca casa vicino alla tua aula studio preferita',
      description: 'Stanze già arredate, contratti regolari, vicino a Politecnico, UniTo e biblioteche. Zero agenzia.',
      button: 'Unisciti alla waitlist',
    },
    en: {
      eyebrow: 'Studying in Turin?',
      title: 'Find a room near your favorite study spot',
      description: 'Furnished rooms, proper contracts, close to Politecnico, UniTo and libraries. Zero agency fees.',
      button: 'Join the waitlist',
    },
  },
  'cedolare-secca-2026-investitori': {
    variant: 'investor',
    it: {
      eyebrow: 'Vuoi applicare la cedolare al tuo investimento?',
      title: 'Ti gestiamo tutto: contratto, fisco, inquilini',
      description: 'Studiamo con te il regime fiscale ottimale e gestiamo il tuo immobile con contratti a canone concordato.',
      button: 'Parla con Lorenzo',
    },
    en: {
      eyebrow: 'Want to apply cedolare to your investment?',
      title: 'We handle everything: contract, tax, tenants',
      description: 'We design the optimal tax setup with you and manage your property with agreed-rent contracts.',
      button: 'Talk to Lorenzo',
    },
  },
  'eventi-torino-febbraio-2026': {
    variant: 'whatsapp',
    it: {
      eyebrow: 'In visita a Torino?',
      title: 'Ti aiutiamo a trovare l\'alloggio giusto',
      description: 'Bilocali e camere in centro per soggiorni brevi o medi. Scrivici su WhatsApp con le date.',
      button: 'Scrivici su WhatsApp',
    },
    en: {
      eyebrow: 'Visiting Turin?',
      title: 'We help you find the right place to stay',
      description: 'Apartments and rooms in central areas for short or medium stays. Message us on WhatsApp with your dates.',
      button: 'Message us on WhatsApp',
    },
  },
  'invest-to-rent-torino-come-funziona-2026': {
    variant: 'investor',
    it: {
      eyebrow: 'Vuoi capire se fa per te?',
      title: 'Una call, non un modulo lungo',
      description: 'Lorenzo ti spiega come lavoriamo, quali zone seguiamo e cosa comporta entrare in una singola operazione. Le cifre puntuali sono nel memorandum informativo.',
      button: 'Parla con Lorenzo',
    },
    en: {
      eyebrow: 'Want to see if it fits you?',
      title: 'A call, not a long form',
      description: 'Lorenzo explains how we work, which areas we follow and what joining a single operation involves. Specific figures are in the information memorandum.',
      button: 'Talk to Lorenzo',
    },
  },
  'rendimento-student-housing-torino-2026': {
    variant: 'investor',
    it: {
      eyebrow: 'Investitore?',
      title: 'Dai numeri di mercato alle operazioni reali',
      description: 'Acquistiamo e gestiamo bilocali a Torino nel modello dual-season studenti + turisti. Scopri come funziona l\'esposizione a una singola operazione.',
      button: 'Parla con Lorenzo',
    },
    en: {
      eyebrow: 'Investor?',
      title: 'From market figures to real operations',
      description: 'We buy and run 2-room flats in Turin on the dual-season student + tourist model. See how exposure to a single operation works.',
      button: 'Talk to Lorenzo',
    },
  },
  'investire-real-assets-torino-2025': {
    variant: 'investor',
    it: {
      eyebrow: 'Dalla tesi alla pratica',
      title: 'Come si partecipa a una singola operazione',
      description: 'Immobili reali a Torino, gestione interna, payout bimestrali. Il percorso parte da una call con Lorenzo, senza impegno.',
      button: 'Parla con Lorenzo',
    },
    en: {
      eyebrow: 'From thesis to practice',
      title: 'How joining a single operation works',
      description: 'Real properties in Turin, in-house management, payouts every 2 months. It starts with a no-commitment call with Lorenzo.',
      button: 'Talk to Lorenzo',
    },
  },
};

export const hasInlineCTA = (slug: string): boolean => slug in INLINE_CTAS;
