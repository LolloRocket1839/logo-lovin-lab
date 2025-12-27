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
  List
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { StudySpaceCard } from '@/components/tools/StudySpaceCard';
import { StudySpaceFilters, StudySpaceFiltersState } from '@/components/tools/StudySpaceFilters';
import { StudySpacesMap } from '@/components/tools/StudySpacesMap';
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
      comune: 'Comune di Torino'
    },
    en: {
      title: 'Study Spaces Turin',
      subtitle: 'Complete directory of study rooms, libraries and spaces to study in Turin',
      seoTitle: 'Study Spaces Turin 2025 | Complete Directory with Hours and Contacts',
      seoDesc: 'Find the best study spaces in Turin: EDISU rooms, libraries, study-friendly cafes and coworking. Hours, contacts, WiFi and accessibility.',
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
      comune: 'City of Turin'
    }
  };

  const t = content[currentLang];

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

  // Structured Data for SEO
  const structuredData = {
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

  // FAQ Structured Data
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": currentLang === 'it' ? "Dove posso studiare in silenzio a Torino?" : "Where can I study in silence in Turin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === 'it' 
            ? "Le sale studio EDISU (Michelangelo, Verdi, Giuria, Principe Amedeo) e le biblioteche (BNUTO, Civica Centrale) offrono silenzio assoluto."
            : "EDISU study rooms (Michelangelo, Verdi, Giuria, Principe Amedeo) and libraries (BNUTO, Civica Centrale) offer complete silence."
        }
      },
      {
        "@type": "Question",
        "name": currentLang === 'it' ? "Quali spazi studio sono aperti 24/7 a Torino?" : "Which study spaces are open 24/7 in Turin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === 'it'
            ? "Copernico Garibaldi e Bliss Coworking offrono accesso 24/7 per membri. Il Parco del Valentino è sempre accessibile."
            : "Copernico Garibaldi and Bliss Coworking offer 24/7 access for members. Parco del Valentino is always accessible."
        }
      },
      {
        "@type": "Question",
        "name": currentLang === 'it' ? "Ci sono caffetterie study-friendly a Torino?" : "Are there study-friendly cafes in Turin?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": currentLang === 'it'
            ? "Sì! Circolo dei Lettori, Mara dei Boschi (2 sedi), Convitto Cafè e EXKi sono caffetterie dove studiare con WiFi e prese."
            : "Yes! Circolo dei Lettori, Mara dei Boschi (2 locations), Convitto Cafè and EXKi are cafes where you can study with WiFi and outlets."
        }
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
        <meta property="og:title" content={t.seoTitle} />
        <meta property="og:description" content={t.seoDesc} />
        <link rel="canonical" href={`https://jungle-rent.com/strumenti/aule-studio-torino`} />
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(faqStructuredData)}
        </script>
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background pt-20 pb-24 md:pb-12">
        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            {/* Breadcrumb */}
            <Link 
              to="/studenti/strumenti" 
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToTools}
            </Link>
            
            <div className="text-center">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                <BookOpen className="w-3 h-3 mr-1" />
                {detailedStudySpaces.length} {currentLang === 'it' ? 'spazi' : 'spaces'}
              </Badge>
              
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.title}
              </h1>
              
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
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
        <section className="py-4 border-b border-border/50">
          <div className="container mx-auto px-4">
            <p className="text-sm font-medium text-muted-foreground mb-3">{t.quickFilters}:</p>
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
            {/* View Toggle + Filters */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <StudySpaceFilters
                filters={filters}
                onFiltersChange={(newFilters) => {
                  setFilters(newFilters);
                  setActiveQuickFilter(null);
                }}
                lang={currentLang}
                totalResults={filteredSpaces.length}
              />
              
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
