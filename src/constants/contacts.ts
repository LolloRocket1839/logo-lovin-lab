export const CONTACTS = {
  lorenzo: {
    phone: '+393319053037',
    name: 'Lorenzo'
  },
  investor: {
    phone: '+393319053037',
    name: 'Lorenzo'
  },
  email: 'junglerententeprise@gmail.com'
} as const;

export const MESSAGES = {
  student: {
    whatsapp: {
      it: (name: string) => 
        `Ciao ${name}! Sono uno studente interessato a JungleRent.\n\nVorrei informazioni su:\n- Stanze disponibili vicino al mio ateneo\n- Prezzi e risparmio del 25%\n- Contratti flessibili\n\nGrazie!`,
      en: (name: string) => 
        `Hi ${name}! I'm a student interested in JungleRent.\n\nI would like information about:\n- Available rooms near my university\n- Prices and 25% savings\n- Flexible contracts\n\nThank you!`
    },
    
    email: {
      it: {
        subject: 'Richiesta informazioni studente - JungleRent',
        body: `Buongiorno,

Sono uno studente interessato a trovare una stanza tramite JungleRent.

Vorrei ricevere informazioni su:
- Stanze disponibili vicino al mio ateneo
- Prezzi e condizioni di affitto
- Possibilità di visitare gli appartamenti
- Tempistiche di disponibilità

Grazie per la vostra disponibilità.

Cordiali saluti`
      },
      en: {
        subject: 'Student Inquiry - JungleRent',
        body: `Hello,

I am a student interested in finding a room through JungleRent.

I would like to receive information about:
- Available rooms near my university
- Prices and rental conditions
- Possibility to visit the apartments
- Availability timelines

Thank you for your availability.

Best regards`
      }
    }
  },
  investor: {
    whatsapp: {
      it: (name: string) => 
        `Ciao ${name}! Sono interessato/a alle opportunità di investimento immobiliare con Jungle Rent.\n\nVorrei informazioni su:\n- Rendimenti previsti e ROI\n- Proprietà disponibili in zone universitarie\n- Gestione professionale del servizio\n- Opportunità di investimento e tempistiche\n\nGrazie!`,
      en: (name: string) => 
        `Hi ${name}! I'm interested in real estate investment opportunities with Jungle Rent.\n\nI would like information about:\n- Expected returns and ROI\n- Available properties in university areas\n- Professional service management\n- Investment opportunities and timelines\n\nThank you!`
    },
    
    email: {
      it: {
        subject: 'Richiesta Informazioni - Investimento Immobiliare',
        body: `Buongiorno,

sono interessato/a a ricevere maggiori informazioni sulle opportunità di investimento immobiliare con JungleRent.

Vorrei saperne di più su:
- Come funziona il modello di investimento
- Tipologie di proprietà disponibili
- Gestione completa del servizio
- Prossimi step

Nome e Cognome: 
Contatto telefonico: 

Grazie,
Cordiali saluti`
      },
      en: {
        subject: 'Investment Inquiry - Real Estate',
        body: `Hello,

I am interested in receiving more information about real estate investment opportunities with JungleRent.

I would like to know more about:
- Expected ROI and returns
- Types of available properties
- Complete service management
- Next steps

Full Name: 
Phone Number: 

Thank you,
Best regards`
      }
    }
  },
  general: {
    email: {
      it: {
        subject: 'Richiesta informazioni - JungleRent',
        body: `Buongiorno,

vorrei ricevere informazioni su JungleRent.

[Descrivi qui la tua richiesta]

Grazie per la vostra disponibilità.

Cordiali saluti`
      },
      en: {
        subject: 'Information Request - JungleRent',
        body: `Hello,

I would like to receive information about JungleRent.

[Describe your request here]

Thank you for your availability.

Best regards`
      }
    }
  },
  tourist: {
    whatsapp: {
      it: (name: string) => 
        `Ciao ${name}! Sono interessato/a a Torino e vorrei consigli su alloggi e quartieri.\n\nSto cercando informazioni su:\n- Alloggi per turisti/digital nomad\n- Zone migliori dove soggiornare\n- Consigli locali su Torino\n\nGrazie!`,
      en: (name: string) => 
        `Hi ${name}! I'm interested in Turin and would like advice about accommodations and neighborhoods.\n\nI'm looking for information about:\n- Tourist/digital nomad accommodations\n- Best areas to stay\n- Local tips about Turin\n\nThank you!`
    }
  },
  quickContact: {
    whatsapp: {
      it: (name: string) => `Ciao ${name}, mi interessa Jungle Rent!`,
      en: (name: string) => `Hi ${name}, I'm interested in Jungle Rent!`,
      es: (name: string) => `¡Hola ${name}, me interesa Jungle Rent!`,
      fr: (name: string) => `Bonjour ${name}, je suis intéressé(e) par Jungle Rent !`,
      de: (name: string) => `Hallo ${name}, ich interessiere mich für Jungle Rent!`
    }
  }
} as const;

// Helper functions
const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export const openWhatsApp = (phone: string, message: string) => {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encoded}`;
  
  if (isMobile()) {
    window.location.href = url;
  } else {
    window.open(url, '_blank');
  }
};

export const openEmail = (subject: string, body: string, email: string = CONTACTS.email) => {
  const encodedSubject = encodeURIComponent(subject);
  const encodedBody = encodeURIComponent(body);
  const url = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;
  
  if (isMobile()) {
    window.location.href = url;
  } else {
    window.open(url, '_blank');
  }
};

export const openGeneralEmail = (language: 'it' | 'en' = 'it') => {
  const emailData = MESSAGES.general.email[language];
  openEmail(emailData.subject, emailData.body);
};

export type SupportedLanguage = 'it' | 'en' | 'es' | 'fr' | 'de';

export const openQuickContact = (language: SupportedLanguage = 'it') => {
  const msgLang = ['it', 'en', 'es', 'fr', 'de'].includes(language) ? language : 'en';
  const message = MESSAGES.quickContact.whatsapp[msgLang as keyof typeof MESSAGES.quickContact.whatsapp](CONTACTS.lorenzo.name);
  const phone = CONTACTS.lorenzo.phone;
  const encoded = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phone}?text=${encoded}`;
  
  if (isMobile()) {
    window.location.href = whatsappUrl;
  } else {
    window.open(whatsappUrl, '_blank');
  }
};

export const openSMS = (phone: string, message: string) => {
  const encoded = encodeURIComponent(message);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const url = isIOS ? `sms:${phone}&body=${encoded}` : `sms:${phone}?body=${encoded}`;
  window.location.href = url;
};

export const openQuickContactWithFallback = (language: SupportedLanguage = 'it', fallbackType: 'sms' | 'call' = 'sms') => {
  const msgLang = ['it', 'en', 'es', 'fr', 'de'].includes(language) ? language : 'en';
  const message = MESSAGES.quickContact.whatsapp[msgLang as keyof typeof MESSAGES.quickContact.whatsapp](CONTACTS.lorenzo.name);
  const phone = CONTACTS.lorenzo.phone;
  
  if (fallbackType === 'sms') {
    openSMS(phone, message);
  } else {
    window.location.href = `tel:${phone}`;
  }
};
