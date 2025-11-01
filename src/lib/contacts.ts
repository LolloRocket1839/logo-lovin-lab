export const CONTACTS = {
  lorenzo: {
    phone: '+393319053037',
    name: 'Lorenzo'
  },
  andrea: {
    phone: '+393899135932',
    name: 'Andrea'
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
        `Ciao ${name}! Sono interessato/a alle opportunità di investimento immobiliare con JungleRent.\n\nVorrei informazioni su:\n- ROI e rendimenti\n- Proprietà disponibili\n- Gestione del servizio\n\nGrazie!`,
      en: (name: string) => 
        `Hi ${name}! I'm interested in real estate investment opportunities with JungleRent.\n\nI would like information about:\n- ROI and returns\n- Available properties\n- Service management\n\nThank you!`
    },
    
    email: {
      it: {
        subject: 'Richiesta Informazioni - Investimento Immobiliare',
        body: `Buongiorno,

sono interessato/a a ricevere maggiori informazioni sulle opportunità di investimento immobiliare con JungleRent.

Vorrei saperne di più su:
- ROI previsto e rendimenti
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
