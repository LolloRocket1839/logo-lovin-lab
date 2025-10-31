export const CONTACTS = {
  lorenzo: {
    phone: '+393319053037',
    name: 'Lorenzo'
  },
  andrea: {
    phone: '+393899135932',
    name: 'Andrea'
  },
  email: 'junglerententerprise@gmail.com'
} as const;

export const MESSAGES = {
  student: {
    whatsapp: (name: string) => 
      `Ciao ${name}! Sono uno studente interessato a JungleRent.\n\nVorrei informazioni su:\n- Stanze disponibili vicino al mio ateneo\n- Prezzi e risparmio del 25%\n- Contratti flessibili\n\nGrazie!`,
    
    email: {
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
    }
  },
  investor: {
    whatsapp: (name: string) => 
      `Ciao ${name}! Sono interessato/a alle opportunità di investimento immobiliare con JungleRent.\n\nVorrei informazioni su:\n- ROI e rendimenti\n- Proprietà disponibili\n- Gestione del servizio\n\nGrazie!`,
    
    email: {
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
