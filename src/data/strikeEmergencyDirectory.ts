export interface EmergencyContact {
  id: string;
  name: string;
  number: string;
  cost: 'free' | 'paid' | 'standard';
  costDetail?: string;
  hours?: string;
  category: 'railway' | 'urban' | 'taxi' | 'carsharing' | 'bus' | 'airline' | 'airport';
  city?: string;
  description?: string;
  appIos?: string;
  appAndroid?: string;
  website?: string;
  refundUrl?: string;
  email?: string;
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
  verifyLink?: string;
}

export interface AlternativeService {
  id: string;
  name: string;
  type: 'carpooling' | 'bus' | 'vanpool' | 'comparison' | 'ridesharing';
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

export interface AirlineContact {
  id: string;
  name: string;
  numberItaly: string;
  numberInternational?: string;
  email?: string;
  website: string;
  appIos?: string;
  appAndroid?: string;
}

export interface AirportContact {
  id: string;
  name: string;
  city: string;
  number: string;
  email?: string;
  website: string;
}

export interface RefundProcedure {
  company: string;
  type: 'automatic' | 'request';
  deadline: string;
  amount: string;
  steps: string[];
  recommendedMethod: string;
  website?: string;
}

export interface PassengerRight {
  right: string;
  description: string;
}

// Emergency contacts - Railways
export const railwayContacts: EmergencyContact[] = [
  {
    id: 'trenitalia-call-center',
    name: 'Trenitalia Call Center',
    number: '892021',
    cost: 'paid',
    costDetail: '0,549€/min + 0,305€ scatto',
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
    id: 'trenitalia-cellulare',
    name: 'Trenitalia da Cellulare',
    number: '99 89 20 21',
    cost: 'paid',
    costDetail: '0,10€/min',
    hours: 'Orari standard',
    category: 'railway',
    description: 'Numero alternativo da cellulare'
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
    id: 'trenitalia-disabili-mobile',
    name: 'Sala Blu da Mobile',
    number: '02.32.32.32',
    cost: 'standard',
    hours: '06:45-21:30',
    category: 'railway',
    description: 'Sala Blu da telefono cellulare'
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
    refundUrl: 'https://www.italotreno.it/it/acquista/rimborso',
    email: 'support@italotreno.com'
  },
  {
    id: 'italo-vendita',
    name: 'Italo Vendita Biglietti',
    number: '060708',
    cost: 'free',
    hours: '07:00-23:00',
    category: 'railway',
    description: 'Acquisto biglietti e modifiche - GRATUITO'
  },
  {
    id: 'trenord-call-center',
    name: 'Trenord Call Center',
    number: '02.72.49.49.49',
    cost: 'standard',
    hours: '06:00-00:00',
    category: 'railway',
    description: 'Treni regionali Lombardia + Chat TREasy gratuita',
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
    description: 'Assistenza passeggeri PMR',
    email: 'senzabarriere@trenord.it'
  },
  {
    id: 'rfi-sala-blu',
    name: 'RFI Sala Blu Nazionale',
    number: '800 90 60 60',
    cost: 'free',
    hours: '06:45-21:30',
    category: 'railway',
    description: 'Rete Ferroviaria Italiana - assistenza disabili',
    website: 'https://www.rfi.it'
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
    description: 'Metro, bus, tram Roma - Infomobilità',
    appIos: 'https://apps.apple.com/it/app/atac/id503849200',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.atac.Roma',
    website: 'https://www.atac.roma.it'
  },
  {
    id: 'atac-roma-verde',
    name: 'ATAC Numero Verde',
    number: '800 43 1784',
    cost: 'free',
    hours: '24/7',
    category: 'urban',
    city: 'Roma',
    description: 'Numero verde da rete fissa'
  },
  {
    id: 'atac-roma-smarrimenti',
    name: 'ATAC Smarrimenti Metro',
    number: '06.4695.5105',
    cost: 'standard',
    category: 'urban',
    city: 'Roma',
    description: 'Oggetti smarriti metro Roma'
  },
  {
    id: 'atm-milano',
    name: 'ATM Milano',
    number: '802 808',
    cost: 'free',
    hours: '24/7',
    category: 'urban',
    city: 'Milano',
    description: 'Metro M1/M2/M3/M5, bus, tram Milano',
    appIos: 'https://apps.apple.com/it/app/atm-milano/id503849400',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.atm.milano',
    website: 'https://www.atm.it'
  },
  {
    id: 'gtt-torino',
    name: 'GTT Torino',
    number: '800 019 152',
    cost: 'free',
    hours: '24/7 (fisso)',
    category: 'urban',
    city: 'Torino',
    description: 'Metro, bus, tram Torino',
    appIos: 'https://apps.apple.com/it/app/gtt-mobile/id913269308',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.gtt.mato',
    website: 'https://www.gtt.to.it'
  },
  {
    id: 'gtt-torino-cellulare',
    name: 'GTT Torino da Cellulare',
    number: '011 0672 000',
    cost: 'standard',
    hours: '06:30-19:30 (lun-sab)',
    category: 'urban',
    city: 'Torino',
    description: 'Numero per cellulare'
  },
  {
    id: 'eav-napoli',
    name: 'EAV Napoli',
    number: '+39 081 5520111',
    cost: 'standard',
    category: 'urban',
    city: 'Napoli',
    description: 'Vesuviane, Circumflegrea, metro provinciale'
  },
  {
    id: 'tua-abruzzo',
    name: 'TUA Abruzzo',
    number: '800 762 622',
    cost: 'free',
    category: 'urban',
    city: 'Abruzzo',
    description: 'Trasporto Urbano Abruzzese - Pescara, Chieti, Teramo'
  },
  {
    id: 'sasa-bolzano',
    name: 'SASA Bolzano',
    number: '+39 0471 450 111',
    cost: 'standard',
    category: 'urban',
    city: 'Bolzano',
    description: 'Società Autobus Sudtirolesi - Alto Adige'
  }
];

// Airline contacts
export const airlineContacts: AirlineContact[] = [
  {
    id: 'alitalia-ita',
    name: 'Alitalia / ITA Airways',
    numberItaly: '800 65 6555',
    email: 'support@alitalia.com',
    website: 'https://www.ita-airways.com',
    appIos: 'https://apps.apple.com/it/app/ita-airways/id1583651528',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.alitalia.app'
  },
  {
    id: 'ryanair',
    name: 'Ryanair',
    numberItaly: '+353 1 249 7799',
    email: 'help@ryanair.com',
    website: 'https://www.ryanair.com',
    appIos: 'https://apps.apple.com/it/app/ryanair/id504270602',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.ryanair.cheapflights'
  },
  {
    id: 'easyjet',
    name: 'EasyJet',
    numberItaly: '+44 330 365 5000',
    email: 'customer.relations@easyjet.com',
    website: 'https://www.easyjet.com',
    appIos: 'https://apps.apple.com/it/app/easyjet-travel-app/id314727446',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.easyjet.mobileapp'
  },
  {
    id: 'vueling',
    name: 'Vueling',
    numberItaly: '+34 902 303 737',
    email: 'support@vueling.com',
    website: 'https://www.vueling.com',
    appIos: 'https://apps.apple.com/it/app/vueling-airlines/id390196421',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.mo2o.vueling'
  },
  {
    id: 'lufthansa',
    name: 'Lufthansa',
    numberItaly: '+49 69 86 799 799',
    email: 'customer-service@lufthansa.com',
    website: 'https://www.lufthansa.com',
    appIos: 'https://apps.apple.com/it/app/lufthansa/id393234720',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.lh.mobileapp'
  }
];

// Airport contacts
export const airportContacts: AirportContact[] = [
  {
    id: 'fiumicino',
    name: 'Fiumicino (FCO)',
    city: 'Roma',
    number: '+39 06 6595 1',
    email: 'info@adr.it',
    website: 'https://www.adr.it'
  },
  {
    id: 'malpensa',
    name: 'Malpensa (MXP)',
    city: 'Milano',
    number: '+39 02 2340 0223',
    email: 'customercare@milanomalpensa.eu',
    website: 'https://www.milanomalpensa.eu'
  },
  {
    id: 'linate',
    name: 'Linate (LIN)',
    city: 'Milano',
    number: '+39 02 7485 2200',
    email: 'info@milanolinate.eu',
    website: 'https://www.milanolinate.eu'
  },
  {
    id: 'capodichino',
    name: 'Capodichino (NAP)',
    city: 'Napoli',
    number: '+39 081 789 6111',
    email: 'info@aeroportodinapoli.it',
    website: 'https://www.aeroportodinapoli.it'
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
    pricePerMinute: '0,28€',
    cities: ['Milano', 'Roma', 'Firenze', 'Torino', 'Bologna', 'Catania'],
    emergencyNumber: '800 900 505',
    appIos: 'https://apps.apple.com/it/app/enjoy-vehicle-sharing/id754843704',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.enjoy.enjoy',
    website: 'https://enjoy.eni.com'
  },
  {
    id: 'sharenow',
    name: 'SHARE NOW',
    pricePerMinute: '0,19€',
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
    priceFrom: '5€',
    coverage: '300+ destinazioni Italia + Europa, WiFi gratuito',
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
    coverage: 'Comparatore multi-operatore (treni, bus, aerei)',
    website: 'https://www.kombo.co'
  },
  {
    id: 'uber',
    name: 'Uber',
    type: 'ridesharing',
    coverage: 'Roma, Milano + altre città',
    appIos: 'https://apps.apple.com/it/app/uber/id368677368',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.ubercab',
    website: 'https://www.uber.com/it'
  },
  {
    id: 'freenow',
    name: 'FreeNow',
    type: 'ridesharing',
    coverage: 'Roma, Milano, Torino + altre città',
    appIos: 'https://apps.apple.com/it/app/free-now-mytaxi/id357852748',
    appAndroid: 'https://play.google.com/store/apps/details?id=taxi.android.client',
    website: 'https://www.free-now.com'
  }
];

// Strike calendar January 2026
export const strikeCalendarJanuary2026: StrikeEvent[] = [
  {
    date: '2026-01-08',
    regions: ['Abruzzo'],
    companies: ['TUA (Pescara, Chieti, Teramo)'],
    duration: '4 ore (09:00-13:00)',
    severity: 'local',
    notes: 'Autobus urbani ed extraurbani',
    verifyLink: 'https://www.mit.gov.it/calendario-scioperi'
  },
  {
    date: '2026-01-08',
    regions: ['Napoli'],
    companies: ['EAV (Vesuviane)'],
    duration: '24 ore',
    severity: 'regional',
    notes: 'Metro vesuviane, treni locali',
    verifyLink: 'https://www.mit.gov.it/calendario-scioperi'
  },
  {
    date: '2026-01-08',
    regions: ['Bolzano'],
    companies: ['SASA'],
    duration: '4 ore (16:00-20:00)',
    severity: 'local',
    notes: 'Autobus urbani e regionali Alto Adige',
    verifyLink: 'https://www.mit.gov.it/calendario-scioperi'
  },
  {
    date: '2026-01-09',
    dateEnd: '2026-01-10',
    regions: ['Nazionale'],
    companies: ['Trenitalia', 'Italo', 'RFI', 'Trenord', 'Easyjet', 'Vueling', 'ENAV'],
    duration: '24 ore (21:00→21:00)',
    guaranteedTimes: 'Regionali: 06:00-09:00 e 18:00-21:00',
    severity: 'national',
    notes: 'SCIOPERO PRINCIPALE - Treni nazionali + aerei. ~70% treni cancellati',
    verifyLink: 'https://www.trenitalia.com'
  },
  {
    date: '2026-01-12',
    dateEnd: '2026-01-13',
    regions: ['Nazionale'],
    companies: ['Scuola pubblica e privata (FLP, CONALPE, CONFSAI, CSLE)'],
    duration: '2 giorni interi',
    severity: 'national',
    notes: 'Docenti, ATA, personale educativo. Verificare con la propria scuola. Richieste: aumento stipendi, buoni pasto, riconoscimento lavoro usurante',
    verifyLink: 'https://www.mit.gov.it/calendario-scioperi'
  },
  {
    date: '2026-01-12',
    dateEnd: '2026-01-13',
    regions: ['Lombardia'],
    companies: ['Trenord', 'Malpensa Express', 'S9'],
    duration: '23 ore (03:00→02:00)',
    guaranteedTimes: 'Verificare su trenord.it',
    severity: 'regional',
    notes: 'Solo treni regionali Lombardia - ~80% servizi fermati',
    verifyLink: 'https://www.trenord.it'
  },
  {
    date: '2026-01-13',
    regions: ['Nazionale (esclusa Umbria)'],
    companies: ['Taxi (tutte le città) - 20 sigle sindacali'],
    duration: '24 ore (00:00-24:00)',
    severity: 'national',
    notes: 'ZERO taxi. Uri e itTaxi NON aderiscono. Protesta anti-uberizzazione e regolamentazione NCC. Usare Uber, FreeNow, car sharing',
    verifyLink: 'https://www.mit.gov.it/calendario-scioperi'
  },
  {
    date: '2026-01-13',
    regions: ['Umbria'],
    companies: ['Busitalia Sita Nord'],
    duration: '24 ore',
    severity: 'regional',
    notes: 'TPL extraurbano Umbria - coincide con ESCLUSIONE taxi (taxi operativi in Umbria)',
    verifyLink: 'https://www.mit.gov.it/calendario-scioperi'
  },
  {
    date: '2026-01-13',
    regions: ['Perugia'],
    companies: ['Minimetrò Perugia (USB)'],
    duration: '24 ore',
    guaranteedTimes: '07:00-09:00 e 12:00-15:00',
    severity: 'local',
    notes: 'Scale mobili e ascensore Pincetto operativi. Usare fasce garantite',
    verifyLink: 'https://www.minimetrospa.it'
  },
  {
    date: '2026-01-13',
    regions: ['Torino', 'Asti'],
    companies: ['Konecta (contact center telecomunicazioni)'],
    duration: '24 ore',
    severity: 'local',
    notes: 'Slc Cgil, Uilcom Uil, Fistel Cisl - possibili disservizi call center'
  },
  {
    date: '2026-01-14',
    dateEnd: '2026-01-15',
    regions: ['Nazionale'],
    companies: ['Captrain (merci ferroviarie)'],
    duration: '24 ore (16:01→16:00)',
    severity: 'local',
    notes: 'Solo trasporto merci, non impatta passeggeri'
  },
  {
    date: '2026-01-15',
    regions: ['Milano'],
    companies: ['ATM Milano (metro M1/M2/M3/M5, tram, bus)'],
    duration: '24 ore',
    guaranteedTimes: '05:30-08:45 e 15:00-18:00',
    severity: 'local',
    notes: 'Trasporto pubblico milanese bloccato - usare car sharing',
    verifyLink: 'https://www.atm.it'
  },
  {
    date: '2026-01-16',
    regions: ['Molise'],
    companies: ['TPL extraurbano Molise'],
    duration: '5 ore (18:00-23:00)',
    severity: 'local',
    notes: 'Sciopero locale'
  },
  {
    date: '2026-01-16',
    regions: ['Roma'],
    companies: ['Paolo Scoppio Autolinee'],
    duration: '4 ore (12:30-16:30)',
    severity: 'local',
    notes: 'Sciopero locale',
    verifyLink: 'https://www.atac.roma.it'
  },
  {
    date: '2026-01-16',
    regions: ['Sicilia'],
    companies: ['AST Sicilia (Palermo, Enna, Catania)'],
    duration: '24 ore',
    severity: 'regional',
    notes: 'Sciopero regionale Sicilia'
  },
  {
    date: '2026-01-20',
    regions: ['Nazionale'],
    companies: ['Trenitalia (regionali)', 'Italo', 'TPL locale', 'Merci su rotaia'],
    duration: '24 ore',
    guaranteedTimes: '06:00-09:00 e 18:00-21:00',
    severity: 'national',
    notes: 'SECONDO SCIOPERO NAZIONALE - Verificare aggiornamenti',
    verifyLink: 'https://www.mit.gov.it/calendario-scioperi'
  },
  {
    date: '2026-01-23',
    regions: ['Napoli'],
    companies: ['Trenitalia OMCC Napoli'],
    duration: '8 ore (09:00-17:00)',
    severity: 'local',
    notes: 'Solo officine manutenzione',
    verifyLink: 'https://www.trenitalia.com'
  },
  {
    date: '2026-01-29',
    regions: ['Ancona'],
    companies: ['Conerobus'],
    duration: 'Intera giornata',
    severity: 'local',
    notes: 'TPL Ancona - verificare servizi alternativi'
  },
  {
    date: '2026-01-30',
    regions: ['Bologna', 'Emilia-Romagna'],
    companies: ['RFI area Bologna'],
    duration: '8 ore (09:01-16:59)',
    severity: 'local',
    notes: 'Personale RFI Bologna',
    verifyLink: 'https://www.rfi.it'
  },
  {
    date: '2026-01-30',
    regions: ['Sicilia'],
    companies: ['Gallo', 'Giamporcaro', 'Sais'],
    duration: '4 ore',
    severity: 'local',
    notes: 'Autolinee regionali Sicilia'
  },
  {
    date: '2026-01-31',
    regions: ['Verona'],
    companies: ['ENAV Verona'],
    duration: '4 ore (13:00-17:00)',
    severity: 'local',
    notes: 'Sciopero navigazione aerea locale'
  }
];

// Strike calendar February-March 2026
export const strikeCalendarFebMar2026: StrikeEvent[] = [
  {
    date: '2026-02-02',
    regions: ['Roma', 'Lazio'],
    companies: ['Appalti ferroviari Lazio'],
    duration: '4 ore',
    severity: 'local',
    notes: 'Sciopero appalti ferroviari',
    verifyLink: 'https://www.mit.gov.it/calendario-scioperi'
  },
  {
    date: '2026-02-16',
    regions: ['Nazionale'],
    companies: ['ITA Airways', 'ENAV'],
    duration: '24 ore (00:01-24:00)',
    severity: 'national',
    notes: 'SCIOPERO AEREO NAZIONALE - Contatta compagnia',
    verifyLink: 'https://www.mit.gov.it/calendario-scioperi'
  },
  {
    date: '2026-02-16',
    regions: ['Nazionale'],
    companies: ['Compagnie aeree varie'],
    duration: '4 ore (13:00-17:00)',
    severity: 'national',
    notes: 'Sciopero compagnie aeree pomeridiano'
  },
  {
    date: '2026-03-07',
    regions: ['Nazionale'],
    companies: ['ENAV', 'Compagnie aeree'],
    duration: '8 ore (10:00-18:00)',
    severity: 'national',
    notes: 'SCIOPERO AEREO NAZIONALE',
    verifyLink: 'https://www.mit.gov.it/calendario-scioperi'
  }
];

// Refund procedures
export const refundProcedures: RefundProcedure[] = [
  {
    company: 'Trenitalia',
    type: 'request',
    deadline: 'Frecce/Intercity: entro orario partenza | Regionali: 24h prima sciopero',
    amount: '100%',
    steps: [
      'Verifica treno cancellato su trenitalia.com',
      'Web form rimborsi (CONSIGLIATO - gratuito, 5 min)',
      'Oppure biglietteria stazione (gratuito, 20-30 min attesa)',
      'Oppure call center 892021 (a pagamento, ~8-12€)',
      'Oppure app Trenitalia (sezione "I miei viaggi")'
    ],
    recommendedMethod: 'Web form (gratuito, risposta 3-5 giorni)',
    website: 'https://www.trenitalia.com/it/informazioni/rimborsi-e-indennizzi.html'
  },
  {
    company: 'Italo',
    type: 'automatic',
    deadline: 'Automatico entro 30 giorni',
    amount: '100%',
    steps: [
      'NESSUNA AZIONE RICHIESTA',
      'Rimborso automatico su carta di credito/metodo originale',
      'Se non ricevi entro 30 giorni: modulo reclami su italotreno.it',
      'Oppure raccomandata: Italo SPA, Via Casilina 1, 00182 Roma'
    ],
    recommendedMethod: 'Attendi rimborso automatico (nessuna richiesta)',
    website: 'https://www.italotreno.it/it/acquista/rimborso'
  },
  {
    company: 'Trenord',
    type: 'request',
    deadline: 'Entro 30 giorni dallo sciopero',
    amount: '100%',
    steps: [
      'Chat TREasy su trenord.it (CONSIGLIATO - gratuito, 2-3 min)',
      'Oppure modulo online',
      'Oppure call center 02-72.49.49.49 (a pagamento)'
    ],
    recommendedMethod: 'Chat TREasy (24/7, gratuita, risposta 5-10 min)',
    website: 'https://www.trenord.it/assistenza/rimborsi/'
  },
  {
    company: 'Compagnie aeree',
    type: 'request',
    deadline: 'Richiesta immediata',
    amount: '100% O volo alternativo',
    steps: [
      'Contatta compagnia aerea immediatamente',
      'Scegli: Rimborso 100% OPPURE volo alternativo gratuito',
      'Hai diritto a: pasti, hotel se overnight, taxi se necessario',
      'Conserva tutta la documentazione (biglietto, email, screenshot)'
    ],
    recommendedMethod: 'App compagnia o telefono diretto'
  }
];

// Passenger rights
export const passengerRights: PassengerRight[] = [
  { right: 'Rimborso 100%', description: 'Se treno/volo cancellato per sciopero' },
  { right: 'Fasce garantite', description: 'Sempre mantenute: 06:00-09:00 e 18:00-21:00' },
  { right: 'Assistenza al suolo', description: 'Pasti, hotel, taxi se necessari (aerei)' },
  { right: 'Validità 12 mesi', description: 'Rimborsi richiedibili fino a 12 mesi dopo evento' },
  { right: 'Riprogrammazione gratuita', description: 'Cambio data/treno senza costi aggiuntivi' }
];

// Official links
export const officialLinks = {
  mitCalendar: 'https://www.mit.gov.it/calendario-scioperi',
  mitInteractive: 'https://scioperi.mit.gov.it/mit2/public/scioperi',
  avvisoScioperi: 'https://avvisoscioperi.it',
  mitEmail: 'osservat.sindacale@mit.gov.it',
  emergency112: '112'
};

// Essential apps
export const essentialApps = [
  {
    id: 'ce-sciopero',
    name: "C'è Sciopero",
    description: 'Notifiche push istantanee per tutti gli scioperi italiani + mappa interattiva',
    appIos: 'https://apps.apple.com/it/app/cè-sciopero/id6470907950',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.kissel.kubiv.strikeNotifier.strike_notifier',
    category: 'alert',
    essential: true
  },
  {
    id: 'trenitalia',
    name: 'Trenitalia',
    description: 'Verifiche treni, acquisti, rimborsi in tempo reale',
    appIos: 'https://apps.apple.com/it/app/trenitalia/id331050847',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.trenitalia.droid',
    category: 'railway'
  },
  {
    id: 'italo',
    name: 'Italo Treno',
    description: 'Gestione viaggi e rimborsi automatici',
    appIos: 'https://apps.apple.com/it/app/italo-treno/id503849499',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.ntvspa.app',
    category: 'railway'
  },
  {
    id: 'trenord',
    name: 'Trenord',
    description: 'Treni Lombardia + Chat TREasy gratuita',
    appIos: 'https://apps.apple.com/it/app/trenord/id1114227791',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.trenord.app',
    category: 'railway'
  },
  {
    id: 'waze',
    name: 'Waze',
    description: 'Navigazione con traffico in tempo reale e percorsi alternativi',
    appIos: 'https://apps.apple.com/it/app/waze-navigazione-e-traffico/id323229106',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.waze',
    category: 'navigation'
  },
  {
    id: 'citymapper',
    name: 'Citymapper',
    description: 'Percorsi multimodali con aggiornamenti scioperi (Roma, Milano, Napoli, Torino)',
    appIos: 'https://apps.apple.com/it/app/citymapper-tutti-i-trasporti/id469463298',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.citymapper.app.release',
    category: 'navigation'
  },
  {
    id: 'google-maps',
    name: 'Google Maps',
    description: 'Mappe e navigazione universale + trasporto pubblico integrato',
    appIos: 'https://apps.apple.com/it/app/google-maps/id585027354',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.google.android.apps.maps',
    category: 'navigation'
  },
  {
    id: 'enjoy',
    name: 'Enjoy',
    description: 'Car sharing - 5 secondi prenotazione, parcheggio incluso',
    appIos: 'https://apps.apple.com/it/app/enjoy-vehicle-sharing/id754843704',
    appAndroid: 'https://play.google.com/store/apps/details?id=it.enjoy.enjoy',
    category: 'carsharing'
  },
  {
    id: 'blablacar-app',
    name: 'BlaBlaCar',
    description: 'Carpooling economico per tratte lunghe',
    appIos: 'https://apps.apple.com/it/app/blablacar-passaggi-in-auto/id341329033',
    appAndroid: 'https://play.google.com/store/apps/details?id=com.comuto',
    category: 'alternative'
  },
  {
    id: 'flixbus-app',
    name: 'FlixBus',
    description: 'Autobus low-cost da 5€, WiFi gratuito',
    appIos: 'https://apps.apple.com/it/app/flixbus-viaggia-in-autobus/id778437357',
    appAndroid: 'https://play.google.com/store/apps/details?id=de.flixbus.app',
    category: 'alternative'
  }
];

// Checklist items
export const travelChecklist = [
  { id: 1, text: 'Scarica app "C\'è Sciopero" per notifiche istantanee', priority: 'high' },
  { id: 2, text: 'Verifica date sciopero su MIT (mit.gov.it/calendario-scioperi)', priority: 'high' },
  { id: 3, text: 'Controlla se il tuo treno è nella lista "GARANTITI"', priority: 'high' },
  { id: 4, text: 'Prenota alternativa (bus, carpooling) con 48h anticipo', priority: 'high' },
  { id: 5, text: 'Salva numeri emergenza nel telefono (892021, 800 900 505)', priority: 'medium' },
  { id: 6, text: 'Scarica app Trenitalia/Italo per aggiornamenti real-time', priority: 'medium' },
  { id: 7, text: 'Screenshot biglietto per richiedere rimborso', priority: 'medium' },
  { id: 8, text: 'Scarica Google Maps offline (area viaggio)', priority: 'medium' },
  { id: 9, text: 'Controlla car sharing disponibile nella tua città', priority: 'low' },
  { id: 10, text: 'Informa alloggio/università di possibili ritardi', priority: 'low' },
  { id: 11, text: 'Se voli: contatta compagnia aerea 48h prima', priority: 'high' },
  { id: 12, text: 'Conserva documentazione per eventuali ricorsi (12 mesi)', priority: 'low' }
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
  const allStrikes = [...strikeCalendarJanuary2026, ...strikeCalendarFebMar2026];
  return allStrikes.filter(s => new Date(s.date) >= today);
};

export const getNationalStrikes = () => {
  const allStrikes = [...strikeCalendarJanuary2026, ...strikeCalendarFebMar2026];
  return allStrikes.filter(s => s.severity === 'national');
};

export const getAllCities = () => {
  const cities = new Set<string>();
  taxiServices.forEach(t => cities.add(t.city));
  carSharingServices.forEach(cs => cs.cities.forEach(c => cities.add(c)));
  urbanContacts.forEach(u => u.city && cities.add(u.city));
  return Array.from(cities).sort();
};

export const getAirlineContacts = () => airlineContacts;
export const getAirportContacts = () => airportContacts;
export const getRefundProcedures = () => refundProcedures;
