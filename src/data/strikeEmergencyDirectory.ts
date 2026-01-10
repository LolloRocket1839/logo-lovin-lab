export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  cost: 'free' | 'paid' | 'standard';
  costDetail?: string;
  hours?: string;
  category: 'railway' | 'urban' | 'taxi' | 'carsharing' | 'bus';
  city?: string;
  description?: string;
  appIos?: string;
  appAndroid?: string;
  website?: string;
  refundUrl?: string;
}

export interface StrikeEvent {
  date: string;
  dateEnd?: string;
  regions: string[];
  companies: string[];
  duration: string;
  guaranteedTimes?: string;
  severity: 'national' | 'regional' | 'local';
  notes?: string;
}

export interface AlternativeService {
  id: string;
  name: string;
  type: 'carpooling' | 'bus' | 'vanpool' | 'comparison';
  priceFrom?: string;
  coverage: string;
  appIos?: string;
  appAndroid?: string;
  website: string;
  logo?: string;
}

export interface CarSharingService {
  id: string;
  name: string;
  pricePerMinute: string;
  cities: string[];
  emergencyNumber?: string;
  appIos: string;
  appAndroid: string;
  website: string;
}

export interface TaxiService {
  id: string;
  name: string;
  number?: string;
  city: string;
  appIos?: string;
  appAndroid?: string;
  website?: string;
}

// Emergency contacts - Railways
export const railwayContacts: EmergencyContact[] = [
  {
    id: 'trenitalia-call-center',
    name: 'Trenitalia Call Center',
    number: '892021',
    cost: 'paid',
    costDetail: '0,549€/min (max 30,99€)',
    hours: '24/7',
    category: 'railway',
    description: 'Assistenza completa, rimborsi, modifiche',
    appIos: 'https://apps.apple.com/it/app/trenitalia/id331050847',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.trenitalia.droid',
    website: 'https://www.trenitalia.com',
    refundUrl: 'https://www.trenitalia.com/it/informazioni/rimborsi-e-indennizzi.html'
  },
  {
    id: 'trenitalia-mobile',
    name: 'Trenitalia da Mobile',
    number: '06 3000',
    cost: 'standard',
    costDetail: 'Costo standard operatore',
    hours: 'Orari standard',
    category: 'railway',
    description: 'Alternativa al numero 892021'
  },
  {
    id: 'trenitalia-estero',
    name: 'Trenitalia dall\'Estero',
    number: '+39 06.68475475',
    cost: 'standard',
    costDetail: 'Tariffa internazionale',
    hours: '07:00-23:59',
    category: 'railway',
    description: 'Per chiamate dall\'estero'
  },
  {
    id: 'trenitalia-disabili',
    name: 'Trenitalia Assistenza Disabili',
    number: '800.90.60.60',
    cost: 'free',
    hours: '06:45-21:30',
    category: 'railway',
    description: 'Sala Blu per passeggeri con disabilità',
    website: 'https://www.trenitalia.com/it/informazioni/assistenza.html'
  },
  {
    id: 'italo-assistenza',
    name: 'Italo Assistenza',
    number: '892020',
    cost: 'paid',
    costDetail: '~15€/chiamata',
    hours: '06:00-23:00',
    category: 'railway',
    description: 'Assistenza clienti Italo',
    appIos: 'https://apps.apple.com/it/app/italo-treno/id503849499',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.ntvspa.app',
    website: 'https://www.italotreno.it',
    refundUrl: 'https://www.italotreno.it/it/acquista/rimborso'
  },
  {
    id: 'italo-vendita',
    name: 'Italo Vendita Biglietti',
    number: '060708',
    cost: 'free',
    hours: '07:00-23:00',
    category: 'railway',
    description: 'Solo acquisto biglietti'
  },
  {
    id: 'trenord-call-center',
    name: 'Trenord Call Center',
    number: '02.72.49.49.49',
    cost: 'standard',
    hours: '06:00-00:00',
    category: 'railway',
    description: 'Treni regionali Lombardia',
    appIos: 'https://apps.apple.com/it/app/trenord/id1114227791',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.trenord.app',
    website: 'https://www.trenord.it',
    refundUrl: 'https://www.trenord.it/assistenza/rimborsi/'
  },
  {
    id: 'trenord-disabili',
    name: 'Trenord Assistenza Disabili',
    number: '800 210955',
    cost: 'free',
    hours: '08:15-19:45 (lun-ven)',
    category: 'railway',
    description: 'Assistenza passeggeri PMR'
  },
  {
    id: 'rfi-sala-blu',
    name: 'RFI Sala Blu Nazionale',
    number: '800 90 60 60',
    cost: 'free',
    hours: '06:45-21:30',
    category: 'railway',
    description: 'Rete Ferroviaria Italiana - assistenza disabili'
  }
];

// Emergency contacts - Urban Transport
export const urbanContacts: EmergencyContact[] = [
  {
    id: 'atac-roma',
    name: 'ATAC Roma',
    number: '06 5753 5333',
    cost: 'free',
    hours: '24/7',
    category: 'urban',
    city: 'Roma',
    description: 'Metro, bus, tram Roma',
    appIos: 'https://apps.apple.com/it/app/atac/id503849200',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.atac.Roma',
    website: 'https://www.atac.roma.it'
  },
  {
    id: 'atm-milano',
    name: 'ATM Milano',
    number: '800 808 181',
    cost: 'free',
    hours: '24/7',
    category: 'urban',
    city: 'Milano',
    description: 'Metro, bus, tram Milano',
    appIos: 'https://apps.apple.com/it/app/atm-milano/id503849400',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.atm.milano',
    website: 'https://www.atm.it'
  },
  {
    id: 'gtt-torino',
    name: 'GTT Torino',
    number: '800 019 152',
    cost: 'free',
    hours: '24/7',
    category: 'urban',
    city: 'Torino',
    description: 'Metro, bus, tram Torino',
    appIos: 'https://apps.apple.com/it/app/gtt-mobile/id913269308',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.gtt.mato',
    website: 'https://www.gtt.to.it'
  }
];

// Taxi services by city
export const taxiServices: TaxiService[] = [
  // Roma
  { id: 'wetaxi-roma', name: 'WeTaxi', city: 'Roma', number: '06 5551', appIos: 'https://apps.apple.com/it/app/wetaxi/id1099662930', appAndroid: 'https://play.google.com/store/apps/details?id=com.wetaxi.app', website: 'https://www.wetaxi.it' },
  { id: 'ittaxi-roma', name: 'itTaxi', city: 'Roma', number: '06 3570', appIos: 'https://apps.apple.com/it/app/ittaxi/id568561152', appAndroid: 'https://play.google.com/store/apps/details?id=it.samarcanda.taxi', website: 'https://www.ittaxi.it' },
  { id: 'freenow-roma', name: 'FreeNow', city: 'Roma', appIos: 'https://apps.apple.com/it/app/free-now-mytaxi/id357852748', appAndroid: 'https://play.google.com/store/apps/details?id=taxi.android.client', website: 'https://www.free-now.com' },
  { id: 'uber-roma', name: 'Uber', city: 'Roma', appIos: 'https://apps.apple.com/it/app/uber/id368677368', appAndroid: 'https://play.google.com/store/apps/details?id=com.ubercab', website: 'https://www.uber.com' },
  // Milano
  { id: 'taxiblu-milano', name: 'Taxiblu', city: 'Milano', number: '02 4040', appIos: 'https://apps.apple.com/it/app/taxiblu/id981413953', appAndroid: 'https://play.google.com/store/apps/details?id=it.taxiblu.clientapp', website: 'https://www.taxiblu.it' },
  { id: 'wetaxi-milano', name: 'WeTaxi', city: 'Milano', appIos: 'https://apps.apple.com/it/app/wetaxi/id1099662930', appAndroid: 'https://play.google.com/store/apps/details?id=com.wetaxi.app', website: 'https://www.wetaxi.it' },
  { id: 'freenow-milano', name: 'FreeNow', city: 'Milano', appIos: 'https://apps.apple.com/it/app/free-now-mytaxi/id357852748', appAndroid: 'https://play.google.com/store/apps/details?id=taxi.android.client', website: 'https://www.free-now.com' },
  { id: 'uber-milano', name: 'Uber', city: 'Milano', appIos: 'https://apps.apple.com/it/app/uber/id368677368', appAndroid: 'https://play.google.com/store/apps/details?id=com.ubercab', website: 'https://www.uber.com' },
  // Torino
  { id: 'wetaxi-torino', name: 'WeTaxi', city: 'Torino', number: '011 5730', appIos: 'https://apps.apple.com/it/app/wetaxi/id1099662930', appAndroid: 'https://play.google.com/store/apps/details?id=com.wetaxi.app', website: 'https://www.wetaxi.it' },
  { id: 'radiotaxi-torino', name: 'RadioTaxi', city: 'Torino', number: '011 5737', website: 'https://www.radiotaxi.it' },
  { id: 'freenow-torino', name: 'FreeNow', city: 'Torino', appIos: 'https://apps.apple.com/it/app/free-now-mytaxi/id357852748', appAndroid: 'https://play.google.com/store/apps/details?id=taxi.android.client', website: 'https://www.free-now.com' }
];

// Car sharing services
export const carSharingServices: CarSharingService[] = [
  {
    id: 'enjoy',
    name: 'Enjoy',
    pricePerMinute: '0,29€',
    cities: ['Milano', 'Roma', 'Firenze', 'Torino', 'Bologna', 'Catania'],
    emergencyNumber: '800 900 505',
    appIos: 'https://apps.apple.com/it/app/enjoy-vehicle-sharing/id754843704',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.enjoy.enjoy',
    website: 'https://enjoy.eni.com'
  },
  {
    id: 'sharenow',
    name: 'SHARE NOW',
    pricePerMinute: '0,26€',
    cities: ['Milano', 'Roma', 'Torino'],
    emergencyNumber: '+39 026 006 3093',
    appIos: 'https://apps.apple.com/it/app/share-now-car-sharing/id514921710',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.car2go',
    website: 'https://www.share-now.com'
  },
  {
    id: 'free2move',
    name: 'Free2Move',
    pricePerMinute: '0,29€',
    cities: ['Roma', 'Milano'],
    appIos: 'https://apps.apple.com/it/app/free2move/id1324805810',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.stellantis.free2move',
    website: 'https://www.free2move.com'
  }
];

// Alternative transport services
export const alternativeServices: AlternativeService[] = [
  {
    id: 'blablacar',
    name: 'BlaBlaCar',
    type: 'carpooling',
    priceFrom: '13€',
    coverage: 'Tutta Italia + Europa',
    appIos: 'https://apps.apple.com/it/app/blablacar-passaggi-in-auto/id341329033',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.comuto',
    website: 'https://www.blablacar.it'
  },
  {
    id: 'flixbus',
    name: 'FlixBus',
    type: 'bus',
    priceFrom: '7,99€',
    coverage: '300+ destinazioni Italia',
    appIos: 'https://apps.apple.com/it/app/flixbus-viaggia-in-autobus/id778437357',
    appAndroid: 'https://play.google.com/store/apps/details?id=de.flixbus.app',
    website: 'https://www.flixbus.it'
  },
  {
    id: 'itabus',
    name: 'Itabus',
    type: 'bus',
    priceFrom: '9€',
    coverage: '19 regioni italiane',
    appIos: 'https://apps.apple.com/it/app/itabus/id1559668419',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.itabus.app',
    website: 'https://www.itabus.it'
  },
  {
    id: 'wayla',
    name: 'Wayla',
    type: 'vanpool',
    coverage: 'Milano (zone movida)',
    appIos: 'https://apps.apple.com/it/app/wayla/id1529472747',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.wayla.app',
    website: 'https://www.wayla.it'
  },
  {
    id: 'kombo',
    name: 'Kombo.co',
    type: 'comparison',
    coverage: 'Comparatore multi-operatore',
    website: 'https://www.kombo.co'
  }
];

// Strike calendar January 2026
export const strikeCalendarJanuary2026: StrikeEvent[] = [
  {
    date: '2026-01-08',
    regions: ['Abruzzo', 'Napoli', 'Bolzano'],
    companies: ['TUA (Abruzzo)', 'EAV (Napoli)', 'SASA (Bolzano)'],
    duration: '24 ore',
    severity: 'regional',
    notes: 'Scioperi locali limitati'
  },
  {
    date: '2026-01-09',
    dateEnd: '2026-01-10',
    regions: ['Nazionale'],
    companies: ['Trenitalia', 'Italo', 'RFI', 'Trenord', 'Trasporto aereo'],
    duration: '24 ore (21:00-20:59)',
    guaranteedTimes: 'Regionali: 06:00-09:00 e 18:00-21:00 (10 gen)',
    severity: 'national',
    notes: 'SCIOPERO PRINCIPALE - Coinvolge tutti i treni nazionali + aerei'
  },
  {
    date: '2026-01-12',
    dateEnd: '2026-01-13',
    regions: ['Lombardia'],
    companies: ['Trenord'],
    duration: '23 ore (dalle 03:00)',
    guaranteedTimes: 'Verificare su trenord.it',
    severity: 'regional',
    notes: 'Solo treni regionali Lombardia'
  },
  {
    date: '2026-01-13',
    regions: ['Nazionale'],
    companies: ['Taxi (tutte le città)'],
    duration: '24 ore',
    severity: 'national',
    notes: 'Sciopero nazionale taxi - usare app ride-hailing'
  },
  {
    date: '2026-01-14',
    dateEnd: '2026-01-16',
    regions: ['Nazionale'],
    companies: ['Captrain (merci)'],
    duration: '48 ore',
    severity: 'local',
    notes: 'Solo trasporto merci, non impatta passeggeri'
  },
  {
    date: '2026-01-15',
    regions: ['Milano'],
    companies: ['ATM Milano'],
    duration: '24 ore',
    guaranteedTimes: '05:30-08:45 e 15:00-18:00',
    severity: 'local',
    notes: 'Metro, bus, tram Milano'
  },
  {
    date: '2026-01-16',
    regions: ['Molise', 'Roma', 'Sicilia'],
    companies: ['ATM Molise', 'ATAC Roma (parziale)', 'AST Sicilia'],
    duration: '4-24 ore',
    severity: 'regional',
    notes: 'Scioperi locali con fasce orarie variabili'
  },
  {
    date: '2026-01-20',
    regions: ['Nazionale'],
    companies: ['Trenitalia', 'Italo', 'RFI'],
    duration: '24 ore',
    guaranteedTimes: 'Da confermare',
    severity: 'national',
    notes: 'SECONDO SCIOPERO NAZIONALE - Verificare aggiornamenti'
  },
  {
    date: '2026-01-23',
    regions: ['Napoli'],
    companies: ['OMCC Napoli'],
    duration: '8 ore',
    severity: 'local',
    notes: 'Solo officine manutenzione'
  },
  {
    date: '2026-01-30',
    regions: ['Bologna', 'Emilia-Romagna'],
    companies: ['RFI Bologna'],
    duration: '8 ore',
    severity: 'local',
    notes: 'Personale RFI Bologna'
  }
];

// Essential apps
export const essentialApps = [
  {
    id: 'ce-sciopero',
    name: "C'è Sciopero",
    description: 'Notifiche push per tutti gli scioperi italiani',
    appIos: 'https://apps.apple.com/it/app/c%C3%A8-sciopero/id1489999532',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.cesciopero.app',
    category: 'alert'
  },
  {
    id: 'waze',
    name: 'Waze',
    description: 'Navigazione con traffico in tempo reale',
    appIos: 'https://apps.apple.com/it/app/waze-navigazione-e-traffico/id323229106',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.waze',
    category: 'navigation'
  },
  {
    id: 'citymapper',
    name: 'Citymapper',
    description: 'Percorsi multimodali con aggiornamenti scioperi',
    appIos: 'https://apps.apple.com/it/app/citymapper-tutti-i-trasporti/id469463298',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.citymapper.app.release',
    category: 'navigation'
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    description: 'Mappe e navigazione universale',
    appIos: 'https://apps.apple.com/it/app/google-maps/id585027354',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps',
    category: 'navigation'
  }
];

// Checklist items
export const travelChecklist = [
  { id: 1, text: 'Verifica date sciopero su "C\'è Sciopero" o siti ufficiali', priority: 'high' },
  { id: 2, text: 'Controlla fasce garantite del tuo treno/metro', priority: 'high' },
  { id: 3, text: 'Prenota alternativa (bus, carpooling) con 48h anticipo', priority: 'high' },
  { id: 4, text: 'Salva numeri emergenza nel telefono', priority: 'medium' },
  { id: 5, text: 'Scarica app Trenitalia/Italo per aggiornamenti real-time', priority: 'medium' },
  { id: 6, text: 'Screenshot biglietto per richiedere rimborso', priority: 'medium' },
  { id: 7, text: 'Controlla car sharing disponibile nella tua città', priority: 'low' },
  { id: 8, text: 'Informa il tuo alloggio/università di possibili ritardi', priority: 'low' }
];

// Helper functions
export const getContactsByCategory = (category: EmergencyContact['category']) => {
  const allContacts = [...railwayContacts, ...urbanContacts];
  return allContacts.filter(c => c.category === category);
};

export const getTaxiByCity = (city: string) => {
  return taxiServices.filter(t => t.city === city);
};

export const getCarSharingByCity = (city: string) => {
  return carSharingServices.filter(cs => cs.cities.includes(city));
};

export const getUpcomingStrikes = () => {
  const today = new Date();
  return strikeCalendarJanuary2026.filter(s => new Date(s.date) >= today);
};

export const getNationalStrikes = () => {
  return strikeCalendarJanuary2026.filter(s => s.severity === 'national');
};

export const getAllCities = () => {
  const cities = new Set<string>();
  taxiServices.forEach(t => cities.add(t.city));
  carSharingServices.forEach(cs => cs.cities.forEach(c => cities.add(c)));
  urbanContacts.forEach(u => u.city && cities.add(u.city));
  return Array.from(cities).sort();
};
