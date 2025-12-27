import { useState, useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  ArrowLeft, 
  MapPin, 
  VolumeX, 
  Coffee, 
  Clock, 
  Trees, 
  Accessibility,
  AlertCircle,
  ExternalLink,
  Phone,
  Map as MapIcon,
  List,
  FileText,
  GraduationCap,
  Bike
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { StudySpaceCard } from '@/components/tools/StudySpaceCard';
import { StudySpaceFilters, StudySpaceFiltersState } from '@/components/tools/StudySpaceFilters';
import { StudySpacesMap } from '@/components/tools/StudySpacesMap';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { detailedStudySpaces, DetailedStudySpace } from '@/data/detailedStudySpaces';

// Quick filter type
type QuickFilterType = 'silenzio' | 'caffe' | '24h' | 'aperto' | 'accessibile' | null;

const StudySpacesDirectory = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('it') ? 'it' : 'en';
  
  const [filters, setFilters] = useState<StudySpaceFiltersState>({
    search: '',
    category: 'all',
    district: 'all',
    silenceLevel: 'all',
    access24h: false,
    disabledAccess: false
  });

  const [activeQuickFilter, setActiveQuickFilter] = useState<QuickFilterType>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const content = {
    it: {
      title: 'Aule Studio Torino',
      subtitle: 'Directory completa delle aule studio, biblioteche e spazi dove studiare a Torino',
      seoTitle: 'Aule Studio Torino 2025 | Directory Completa con Orari e Contatti',
      seoDesc: 'Trova le migliori aule studio a Torino: sale EDISU, biblioteche, caffetterie study-friendly e coworking. Orari, contatti, WiFi e accessibilità.',
      seoKeywords: 'aule studio torino, biblioteche torino studenti, sale studio edisu, dove studiare torino, spazi studio gratuiti torino, biblioteche aperte sera torino, coworking studenti torino',
      backToTools: 'Strumenti studenti',
      readGuide: 'Leggi la guida completa',
      noResults: 'Nessuno spazio corrisponde ai filtri selezionati.',
      resetFilters: 'Reset filtri',
      quickFilters: 'Trova per esigenza',
      silenzio: 'Silenzio Assoluto',
      caffe: 'Caffè e Studio',
      h24: '24/7 Access',
      aperto: 'All\'Aperto',
      accessibile: 'Accessibilità Totale',
      zoneStats: 'Distribuzione',
      noteImportanti: 'Note Importanti',
      sessioneEsami: 'Sessione Invernale d\'Esami (Dic 2025 - Feb 2026): le sale EDISU ampliano orari fino alle 24:00. Consulta EDISU per conferma.',
      contattoConsigliato: 'Si consiglia contatto telefonico prima della visita. Orari soggetti a variazioni stagionali.',
      ultimoAggiornamento: 'Ultimo aggiornamento: Dicembre 2025',
      linkUtili: 'Link Utili',
      edisu: 'EDISU Piemonte',
      biblioteche: 'Biblioteche Civiche Torino',
      circolo: 'Circolo dei Lettori',
      comune: 'Comune di Torino',
      articoliCorrelati: 'Articoli Correlati',
      tuttiGliSpazi: 'Tutti gli Spazi Studio',
      filtraRisultati: 'Filtra Risultati',
      breadcrumbHome: 'Home',
      breadcrumbStudenti: 'Studenti',
      breadcrumbStrumenti: 'Strumenti',
      breadcrumbAuleStudio: 'Aule Studio'
    },
    en: {
      title: 'Study Spaces Turin',
      subtitle: 'Complete directory of study rooms, libraries and spaces to study in Turin',
      seoTitle: 'Study Spaces Turin 2025 | Complete Directory with Hours and Contacts',
      seoDesc: 'Find the best study spaces in Turin: EDISU rooms, libraries, study-friendly cafes and coworking. Hours, contacts, WiFi and accessibility.',
      seoKeywords: 'study spaces turin, libraries turin students, edisu study rooms, where to study turin, free study spaces turin, libraries open evening turin, coworking students turin',
      backToTools: 'Student tools',
      readGuide: 'Read the full guide',
      noResults: 'No spaces match the selected filters.',
      resetFilters: 'Reset filters',
      quickFilters: 'Find by need',
      silenzio: 'Complete Silence',
      caffe: 'Coffee & Study',
      h24: '24/7 Access',
      aperto: 'Outdoors',
      accessibile: 'Full Accessibility',
      zoneStats: 'Distribution',
      noteImportanti: 'Important Notes',
      sessioneEsami: 'Winter Exam Session (Dec 2025 - Feb 2026): EDISU rooms extend hours until midnight. Check EDISU for confirmation.',
      contattoConsigliato: 'We recommend calling before visiting. Hours may vary by season.',
      ultimoAggiornamento: 'Last updated: December 2025',
      linkUtili: 'Useful Links',
      edisu: 'EDISU Piemonte',
      biblioteche: 'Turin Civic Libraries',
      circolo: 'Circolo dei Lettori',
      comune: 'City of Turin',
      articoliCorrelati: 'Related Articles',
      tuttiGliSpazi: 'All Study Spaces',
      filtraRisultati: 'Filter Results',
      breadcrumbHome: 'Home',
      breadcrumbStudenti: 'Students',
      breadcrumbStrumenti: 'Tools',
      breadcrumbAuleStudio: 'Study Spaces'
    }
  };

  const t = content[currentLang];

  // Breadcrumb items
  const breadcrumbItems = [
    { label: t.breadcrumbStudenti, href: '/studenti' },
    { label: t.breadcrumbStrumenti, href: '/studenti/strumenti' },
    { label: t.breadcrumbAuleStudio }
  ];

  // Zone statistics
  const zoneStats = useMemo(() => {
    const stats: Record<string, number> = {};
    detailedStudySpaces.forEach(space => {
      stats[space.district] = (stats[space.district] || 0) + 1;
    });
    return stats;
  }, []);

  // Handle quick filter click
  const handleQuickFilter = (filterType: QuickFilterType) => {
    if (activeQuickFilter === filterType) {
      // Reset
      setActiveQuickFilter(null);
      setFilters({
        search: '',
        category: 'all',
        district: 'all',
        silenceLevel: 'all',
        access24h: false,
        disabledAccess: false
      });
    } else {
      setActiveQuickFilter(filterType);
      switch (filterType) {
        case 'silenzio':
          setFilters({
            ...filters,
            category: 'all',
            silenceLevel: 'assoluto',
            access24h: false,
            disabledAccess: false
          });
          break;
        case 'caffe':
          setFilters({
            ...filters,
            category: 'caffetteria',
            silenceLevel: 'all',
            access24h: false,
            disabledAccess: false
          });
          break;
        case '24h':
          setFilters({
            ...filters,
            category: 'all',
            silenceLevel: 'all',
            access24h: true,
            disabledAccess: false
          });
          break;
        case 'aperto':
          setFilters({
            ...filters,
            category: 'spazi_alternativi',
            silenceLevel: 'all',
            access24h: false,
            disabledAccess: false
          });
          break;
        case 'accessibile':
          setFilters({
            ...filters,
            category: 'all',
            silenceLevel: 'all',
            access24h: false,
            disabledAccess: true
          });
          break;
      }
    }
  };

  // Filter spaces
  const filteredSpaces = useMemo(() => {
    return detailedStudySpaces.filter((space) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          space.name.toLowerCase().includes(searchLower) ||
          space.address.toLowerCase().includes(searchLower) ||
          space.district.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      
      if (filters.category !== 'all' && space.category !== filters.category) {
        return false;
      }
      
      if (filters.district !== 'all' && space.district !== filters.district) {
        return false;
      }
      
      if (filters.silenceLevel !== 'all' && space.features.silence !== filters.silenceLevel) {
        return false;
      }
      
      if (filters.access24h && !space.features.access24h) {
        return false;
      }
      
      if (filters.disabledAccess && space.features.disabledAccess !== 'totale') {
        return false;
      }
      
      return true;
    });
  }, [filters]);

  // Related articles
  const relatedArticles = currentLang === 'it' ? [
    {
      title: 'Aule Studio Torino: Guida Completa',
      description: 'Guida approfondita con consigli per scegliere il posto giusto',
      url: '/blog/aule-studio-torino-guida-completa',
      icon: BookOpen
    },
    {
      title: 'San Salvario: Guida Studenti',
      description: 'Il quartiere più vivace per la vita universitaria',
      url: '/blog/san-salvario-guida-studenti',
      icon: GraduationCap
    },
    {
      title: 'Mobilità Sostenibile Torino',
      description: 'Come muoversi in bici e mezzi pubblici',
      url: '/blog/mobilita-sostenibile-torino-studenti',
      icon: Bike
    }
  ] : [
    {
      title: 'Study Spaces Turin: Complete Guide',
      description: 'In-depth guide with tips for choosing the right spot',
      url: '/blog/aule-studio-torino-guida-completa',
      icon: BookOpen
    },
    {
      title: 'San Salvario: Student Guide',
      description: 'The liveliest neighborhood for university life',
      url: '/blog/san-salvario-guida-studenti',
      icon: GraduationCap
    },
    {
      title: 'Sustainable Mobility Turin',
      description: 'How to get around by bike and public transport',
      url: '/blog/mobilita-sostenibile-torino-studenti',
      icon: Bike
    }
  ];

  // Structured Data - WebPage + ItemList
  const webPageStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t.seoTitle,
    "description": t.seoDesc,
    "url": `https://junglerent.it/${currentLang === 'it' ? 'strumenti/aule-studio-torino' : 'tools/study-spaces-turin'}`,
    "inLanguage": currentLang === 'it' ? 'it-IT' : 'en-US',
    "isPartOf": {
      "@type": "WebSite",
      "name": "Jungle Rent",
      "url": "https://junglerent.it"
    },
    "about": {
      "@type": "Thing",
      "name": currentLang === 'it' ? "Aule Studio a Torino" : "Study Spaces in Turin"
    },
    "dateModified": "2025-12-27",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": ["h1", ".subtitle", ".quick-filters"]
    }
  };

  // ItemList Structured Data
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t.seoTitle,
    "description": t.seoDesc,
    "numberOfItems": detailedStudySpaces.length,
    "itemListElement": detailedStudySpaces.slice(0, 10).map((space, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "Place",
        "name": space.name,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": space.address,
          "addressLocality": "Torino",
          "addressCountry": "IT"
        },
        ...(space.phone && { "telephone": space.phone }),
        ...(space.website && { "url": space.website })
      }
    }))
  };

  // BreadcrumbList Structured Data
  const breadcrumbStructuredData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://junglerent.it"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": currentLang === 'it' ? "Studenti" : "Students",
        "item": `https://junglerent.it/${currentLang === 'it' ? 'studenti' : 'students'}`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": currentLang === 'it' ? "Strumenti" : "Tools",
        "item": `https://junglerent.it/${currentLang === 'it' ? 'studenti/strumenti' : 'students/tools'}`
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": currentLang === 'it' ? "Aule Studio Torino" : "Study Spaces Turin",
        "item": `https://junglerent.it/${currentLang === 'it' ? 'strumenti/aule-studio-torino' : 'tools/study-spaces-turin'}`
      }
    ]
  };

  // Expanded FAQ Structured Data (8+ questions)
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": currentLang === 'it' ? [
      {
        "@type": "Question",
        "name": "Dove posso studiare in silenzio a Torino?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le sale studio EDISU (Michelangelo, Verdi, Giuria, Principe Amedeo) e le biblioteche (BNUTO, Civica Centrale) offrono silenzio assoluto. Anche la Biblioteca Nazionale Universitaria garantisce massima concentrazione."
        }
      },
      {
        "@type": "Question",
        "name": "Quali spazi studio sono aperti 24/7 a Torino?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copernico Garibaldi e Bliss Coworking offrono accesso 24/7 per membri. Il Parco del Valentino è sempre accessibile come spazio all'aperto. Durante la sessione esami, le sale EDISU ampliano gli orari fino a mezzanotte."
        }
      },
      {
        "@type": "Question",
        "name": "Ci sono caffetterie study-friendly a Torino?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sì! Circolo dei Lettori, Mara dei Boschi (2 sedi in Vanchiglia e San Salvario), Convitto Cafè e EXKi sono caffetterie dove studiare con WiFi gratuito e prese elettriche."
        }
      },
      {
        "@type": "Question",
        "name": "Le aule studio EDISU sono gratuite?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sì, le sale studio EDISU sono completamente gratuite per tutti gli studenti universitari. Non è richiesta iscrizione a EDISU, basta la tessera universitaria."
        }
      },
      {
        "@type": "Question",
        "name": "Quali aule studio hanno WiFi gratuito a Torino?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Quasi tutti gli spazi elencati offrono WiFi gratuito: sale EDISU (WiFi Piemontino), biblioteche civiche, Circolo dei Lettori, coworking. Nelle biblioteche universitarie serve credenziale Unito/Polito."
        }
      },
      {
        "@type": "Question",
        "name": "Posso studiare all'aperto a Torino?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sì! Il Parco del Valentino offre panchine e WiFi gratuito nei mesi caldi. Anche i giardini della Biblioteca Civica Centrale hanno spazi all'aperto. Ideali da aprile a ottobre."
        }
      },
      {
        "@type": "Question",
        "name": "Quali spazi studio sono accessibili ai disabili a Torino?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le biblioteche civiche e la BNUTO hanno accessibilità totale con rampe e ascensori. Le sale EDISU più recenti (Giuria, Principe Amedeo) hanno accessibilità parziale. Verifica sempre telefonicamente."
        }
      },
      {
        "@type": "Question",
        "name": "Devo prenotare per studiare nelle aule EDISU?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, le sale EDISU funzionano senza prenotazione, primo arrivato primo servito. Durante la sessione esami possono essere affollate: consigliamo di arrivare presto la mattina o dopo le 20:00."
        }
      },
      {
        "@type": "Question",
        "name": "Quali sono gli orari delle aule studio durante la sessione esami?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Durante la sessione invernale (dicembre-febbraio) e estiva (giugno-luglio), le sale EDISU ampliano gli orari fino alle 24:00. Le biblioteche civiche mantengono orari regolari. Consulta sempre il sito EDISU per conferme."
        }
      },
      {
        "@type": "Question",
        "name": "Dove studiare la sera tardi a Torino?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Le sale EDISU restano aperte fino alle 22:00 (24:00 in sessione). Copernico Garibaldi e Bliss Coworking offrono accesso 24/7 per membri. Alcune caffetterie come Convitto Cafè sono aperte fino alle 22:00."
        }
      }
    ] : [
      {
        "@type": "Question",
        "name": "Where can I study in silence in Turin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EDISU study rooms (Michelangelo, Verdi, Giuria, Principe Amedeo) and libraries (BNUTO, Civica Centrale) offer complete silence. The National University Library also guarantees maximum concentration."
        }
      },
      {
        "@type": "Question",
        "name": "Which study spaces are open 24/7 in Turin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Copernico Garibaldi and Bliss Coworking offer 24/7 access for members. Parco del Valentino is always accessible as an outdoor space. During exam sessions, EDISU rooms extend hours until midnight."
        }
      },
      {
        "@type": "Question",
        "name": "Are there study-friendly cafes in Turin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Circolo dei Lettori, Mara dei Boschi (2 locations in Vanchiglia and San Salvario), Convitto Cafè and EXKi are cafes where you can study with free WiFi and power outlets."
        }
      },
      {
        "@type": "Question",
        "name": "Are EDISU study rooms free?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, EDISU study rooms are completely free for all university students. No EDISU registration is required, just your university card."
        }
      },
      {
        "@type": "Question",
        "name": "Which study spaces have free WiFi in Turin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Almost all listed spaces offer free WiFi: EDISU rooms (WiFi Piemontino), civic libraries, Circolo dei Lettori, coworking spaces. University libraries require UniTo/PoliTo credentials."
        }
      },
      {
        "@type": "Question",
        "name": "Can I study outdoors in Turin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! Parco del Valentino offers benches and free WiFi in warm months. The gardens of Biblioteca Civica Centrale also have outdoor spaces. Ideal from April to October."
        }
      },
      {
        "@type": "Question",
        "name": "Which study spaces are wheelchair accessible in Turin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Civic libraries and BNUTO have full accessibility with ramps and elevators. Newer EDISU rooms (Giuria, Principe Amedeo) have partial accessibility. Always verify by phone."
        }
      },
      {
        "@type": "Question",
        "name": "Do I need to book EDISU study rooms?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No, EDISU rooms work on a first-come, first-served basis. During exam sessions they can be crowded: we recommend arriving early in the morning or after 8 PM."
        }
      },
      {
        "@type": "Question",
        "name": "What are the study room hours during exam sessions?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "During winter (December-February) and summer (June-July) exam sessions, EDISU rooms extend hours until midnight. Civic libraries maintain regular hours. Always check the EDISU website for confirmation."
        }
      },
      {
        "@type": "Question",
        "name": "Where to study late at night in Turin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "EDISU rooms stay open until 10 PM (midnight during exams). Copernico Garibaldi and Bliss Coworking offer 24/7 access for members. Some cafes like Convitto Cafè are open until 10 PM."
        }
      }
    ]
  };

  // LocalBusiness structured data for top 5 spaces
  const localBusinessStructuredData = detailedStudySpaces.slice(0, 5).map(space => ({
    "@context": "https://schema.org",
    "@type": "Library",
    "name": space.name,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": space.address,
      "addressLocality": "Torino",
      "postalCode": "10100",
      "addressCountry": "IT"
    },
    ...(space.phone && { "telephone": space.phone }),
    ...(space.website && { "url": space.website }),
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "WiFi", "value": space.features.wifi },
      { "@type": "LocationFeatureSpecification", "name": "Power Outlets", "value": space.features.powerOutlets },
      { "@type": "LocationFeatureSpecification", "name": "Silence Level", "value": space.features.silence }
    ]
  }));

  return (
    <>
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
        <meta name="keywords" content={t.seoKeywords} />
        <meta property="og:title" content={t.seoTitle} />
        <meta property="og:description" content={t.seoDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`https://junglerent.it/${currentLang === 'it' ? 'strumenti/aule-studio-torino' : 'tools/study-spaces-turin'}`} />
        
        {/* Hreflang tags */}
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/strumenti/aule-studio-torino" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/tools/study-spaces-turin" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/strumenti/aule-studio-torino" />
        
        <link rel="canonical" href={`https://junglerent.it/${currentLang === 'it' ? 'strumenti/aule-studio-torino' : 'tools/study-spaces-turin'}`} />
        
        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify(webPageStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(itemListStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(localBusinessStructuredData)}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20 pb-24 md:pb-12">
        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            {/* Breadcrumbs */}
            <Breadcrumbs items={breadcrumbItems} />
            
            <div className="text-center mt-4">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                <BookOpen className="w-3 h-3 mr-1" />
                {detailedStudySpaces.length} {currentLang === 'it' ? 'spazi' : 'spaces'}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.title}
              </h1>
              
              <p className="subtitle text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
                {t.subtitle}
              </p>
              
              {/* Zone Statistics */}
              <div className="flex flex-wrap justify-center gap-2 mb-6">
                <span className="text-sm text-muted-foreground">{t.zoneStats}:</span>
                {Object.entries(zoneStats).map(([zone, count]) => (
                  <Badge key={zone} variant="secondary" className="text-xs">
                    {zone}: {count}
                  </Badge>
                ))}
              </div>
              
              {/* Link to blog article */}
              <Link to="/blog/aule-studio-torino-guida-completa">
                <Button variant="outline" className="gap-2">
                  <BookOpen className="w-4 h-4" />
                  {t.readGuide}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Quick Filters */}
        <section className="quick-filters py-4 border-b border-border/50">
          <div className="container mx-auto px-4">
            <h2 className="text-lg font-semibold text-foreground mb-3">{t.quickFilters}</h2>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeQuickFilter === 'silenzio' ? 'default' : 'outline'}
                size="sm"
                className="gap-1"
                onClick={() => handleQuickFilter('silenzio')}
              >
                <VolumeX className="w-4 h-4" />
                {t.silenzio}
              </Button>
              <Button
                variant={activeQuickFilter === 'caffe' ? 'default' : 'outline'}
                size="sm"
                className="gap-1"
                onClick={() => handleQuickFilter('caffe')}
              >
                <Coffee className="w-4 h-4" />
                {t.caffe}
              </Button>
              <Button
                variant={activeQuickFilter === '24h' ? 'default' : 'outline'}
                size="sm"
                className="gap-1"
                onClick={() => handleQuickFilter('24h')}
              >
                <Clock className="w-4 h-4" />
                {t.h24}
              </Button>
              <Button
                variant={activeQuickFilter === 'aperto' ? 'default' : 'outline'}
                size="sm"
                className="gap-1"
                onClick={() => handleQuickFilter('aperto')}
              >
                <Trees className="w-4 h-4" />
                {t.aperto}
              </Button>
              <Button
                variant={activeQuickFilter === 'accessibile' ? 'default' : 'outline'}
                size="sm"
                className="gap-1"
                onClick={() => handleQuickFilter('accessibile')}
              >
                <Accessibility className="w-4 h-4" />
                {t.accessibile}
              </Button>
            </div>
          </div>
        </section>

        {/* Important Notes Alert */}
        <section className="py-4">
          <div className="container mx-auto px-4">
            <h2 className="sr-only">{t.noteImportanti}</h2>
            <Alert className="bg-primary/5 border-primary/20">
              <AlertCircle className="h-4 w-4 text-primary" />
              <AlertDescription className="text-sm">
                <strong>{t.noteImportanti}:</strong>
                <ul className="list-disc list-inside mt-1 space-y-1">
                  <li>📚 {t.sessioneEsami}</li>
                  <li>📞 {t.contattoConsigliato}</li>
                  <li>📅 {t.ultimoAggiornamento}</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        </section>

        {/* Filters & Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">{t.tuttiGliSpazi}</h2>
            
            {/* View Toggle + Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h3 className="sr-only">{t.filtraRisultati}</h3>
                <StudySpaceFilters
                  filters={filters}
                  onFiltersChange={(newFilters) => {
                    setFilters(newFilters);
                    setActiveQuickFilter(null);
                  }}
                  lang={currentLang}
                  totalResults={filteredSpaces.length}
                />
              </div>
              
              {/* View Toggle */}
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  className="gap-1"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                  {currentLang === 'it' ? 'Lista' : 'List'}
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  className="gap-1"
                  onClick={() => setViewMode('map')}
                >
                  <MapIcon className="w-4 h-4" />
                  {currentLang === 'it' ? 'Mappa' : 'Map'}
                </Button>
              </div>
            </div>

            {/* Map View */}
            {viewMode === 'map' && (
              <div className="mb-8">
                <StudySpacesMap 
                  spaces={filteredSpaces} 
                  lang={currentLang}
                  onMarkerClick={(spaceId) => {
                    setViewMode('list');
                    setTimeout(() => {
                      const card = cardRefs.current[spaceId];
                      if (card) {
                        card.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        card.classList.add('ring-2', 'ring-primary');
                        setTimeout(() => card.classList.remove('ring-2', 'ring-primary'), 2000);
                      }
                    }, 100);
                  }}
                />
              </div>
            )}
            
            {/* Results Grid */}
            {viewMode === 'list' && (
              <>
                {filteredSpaces.length > 0 ? (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredSpaces.map((space) => (
                      <div 
                        key={space.id} 
                        ref={(el) => { cardRefs.current[space.id] = el; }}
                        className="transition-all duration-300"
                      >
                        <StudySpaceCard 
                          space={space} 
                          lang={currentLang} 
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <MapPin className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg text-muted-foreground mb-4">
                      {t.noResults}
                    </p>
                    <Button 
                      variant="outline" 
                      onClick={() => {
                        setFilters({
                          search: '',
                          category: 'all',
                          district: 'all',
                          silenceLevel: 'all',
                          access24h: false,
                          disabledAccess: false
                        });
                        setActiveQuickFilter(null);
                      }}
                    >
                      {t.resetFilters}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Related Articles Section */}
        <section className="py-8 border-t border-border/50">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold text-foreground mb-6">📚 {t.articoliCorrelati}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
              {relatedArticles.map((article, index) => (
                <Link key={index} to={article.url}>
                  <Card className="h-full hover:border-primary/50 transition-colors">
                    <CardContent className="p-4 flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                        <article.icon className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-medium text-foreground mb-1">{article.title}</h3>
                        <p className="text-sm text-muted-foreground">{article.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Useful Links Section */}
        <section className="py-8 bg-muted/30 border-t">
          <div className="container mx-auto px-4">
            <h2 className="text-xl font-semibold text-foreground mb-4">🔗 {t.linkUtili}</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <a 
                href="https://www.edisu.piemonte.it/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-background rounded-lg border hover:border-primary/50 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{t.edisu}</span>
              </a>
              <a 
                href="https://bct.comune.torino.it/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-background rounded-lg border hover:border-primary/50 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{t.biblioteche}</span>
              </a>
              <a 
                href="https://torino.circololettori.it/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-background rounded-lg border hover:border-primary/50 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{t.circolo}</span>
              </a>
              <a 
                href="https://www.comune.torino.it/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 bg-background rounded-lg border hover:border-primary/50 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-primary" />
                <span className="text-sm font-medium">{t.comune}</span>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
};

export default StudySpacesDirectory;
