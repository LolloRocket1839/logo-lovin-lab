import { useState, useMemo, lazy, Suspense, useRef, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { 
  Building2, 
  Download, 
  GraduationCap,
  BookOpen,
  Utensils,
  Calculator,
  ArrowRight,
  Map,
  List
} from 'lucide-react';

const StudentServicesMap = lazy(() => import('@/components/tools/StudentServicesMap'));
import { Navigation, Footer, BottomNav } from '@/components/layout';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentServiceCard } from '@/components/tools/StudentServiceCard';
import { StudentServiceFilters, ServiceFilters } from '@/components/tools/StudentServiceFilters';
import { 
  studentServicesData, 
  institutionLabels, 
  Institution 
} from '@/data/studentServicesDirectory';
import { 
  StudentServicesDirectorySchema, 
  StudentServicesDirectoryBreadcrumb, 
  StudentServicesDirectoryFAQ 
} from '@/components/tools/ToolStructuredData';

const StudentServicesDirectory = () => {
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('it') ? 'it' : 'en';

  const [activeQuickFilter, setActiveQuickFilter] = useState<Institution | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [filters, setFilters] = useState<ServiceFilters>({
    search: '',
    institution: 'all',
    category: 'all',
    district: '',
    booking: 'all'
  });

  const handleSelectService = useCallback((serviceId: string) => {
    setSelectedServiceId(serviceId);
    setViewMode('list');
    
    // Scroll to the card after switching to list view
    setTimeout(() => {
      const cardElement = cardRefs.current[serviceId];
      if (cardElement) {
        cardElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Remove highlight after animation
        setTimeout(() => setSelectedServiceId(null), 2000);
      }
    }, 100);
  }, []);

  const canonicalUrl = `https://junglerent.it/${currentLang === 'en' ? 'tools/student-services-turin' : 'strumenti/sportelli-studenti-torino'}`;
  
  const content = {
    it: {
      title: 'Sportelli e Servizi per Studenti a Torino',
      subtitle: 'Guida completa a segreterie, uffici e sportelli universitari: UniTO, PoliTO, EDISU e altre istituzioni',
      seoTitle: 'Sportelli e Servizi per Studenti a Torino | Guida Completa 2025 | Jungle Rent',
      seoDesc: 'Directory completa degli sportelli e servizi per studenti universitari a Torino: segreterie UniTO e PoliTO, EDISU, borse di studio, DSA, Erasmus, counseling e molto altro.',
      keywords: 'sportelli studenti torino, segreteria unito, segreteria polito, edisu torino, borse di studio torino, erasmus torino, dsa università torino, counseling universitario, servizi studenti, segreteria didattica torino',
      servicesFound: 'servizi trovati',
      downloadPdf: 'Scarica Guida PDF',
      relatedResources: 'Risorse Correlate',
      quickFilters: 'Filtri rapidi per istituzione',
      allInstitutions: 'Tutte',
      resources: {
        studySpaces: {
          title: 'Directory Aule Studio',
          description: 'Trova biblioteche e aule studio a Torino con orari e contatti.'
        },
        cheapEats: {
          title: 'Dove Mangiare Economico',
          description: 'Ristoranti e street food economici vicino alle università.'
        },
        budget: {
          title: 'Calcolatore Budget',
          description: 'Calcola il costo della vita studentesca a Torino.'
        },
        unito: {
          title: 'Guida Università di Torino',
          description: 'Tutto quello che devi sapere su UniTO.'
        },
        polito: {
          title: 'Guida Politecnico di Torino',
          description: 'Tutto quello che devi sapere su PoliTO.'
        }
      }
    },
    en: {
      title: 'Student services and offices in Turin',
      subtitle: 'Complete guide to university offices: UniTO, PoliTO, EDISU and other institutions',
      seoTitle: 'Student Services and Offices in Turin | Complete Guide 2025 | Jungle Rent',
      seoDesc: 'Complete directory of student services and offices in Turin: UniTO and PoliTO registrars, EDISU, scholarships, disability services, Erasmus, counseling and more.',
      keywords: 'student services turin, unito registrar, polito registrar, edisu turin, scholarships turin, erasmus turin, dsa university turin, university counseling, student offices',
      servicesFound: 'services found',
      downloadPdf: 'Download PDF guide',
      relatedResources: 'Related resources',
      quickFilters: 'Quick filters by institution',
      allInstitutions: 'All',
      resources: {
        studySpaces: {
          title: 'Study spaces directory',
          description: 'Find libraries and study rooms in Turin with hours and contacts.'
        },
        cheapEats: {
          title: 'Cheap eats directory',
          description: 'Affordable restaurants and street food near universities.'
        },
        budget: {
          title: 'Budget calculator',
          description: 'Calculate the cost of student life in Turin.'
        },
        unito: {
          title: 'University of Turin guide',
          description: 'Everything you need to know about UniTO.'
        },
        polito: {
          title: 'Polytechnic University guide',
          description: 'Everything you need to know about PoliTO.'
        }
      }
    }
  };

  const t = content[currentLang];

  const handleQuickFilter = (institution: Institution | null) => {
    setActiveQuickFilter(institution);
    if (institution) {
      setFilters({ ...filters, institution, search: '', category: 'all', district: '', booking: 'all' });
    } else {
      setFilters({ ...filters, institution: 'all' });
    }
  };

  const filteredServices = useMemo(() => {
    return studentServicesData.filter(service => {
      // Quick filter
      if (activeQuickFilter && service.institution !== activeQuickFilter) {
        return false;
      }

      // Search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          service.name.toLowerCase().includes(searchLower) ||
          service.institutionName.toLowerCase().includes(searchLower) ||
          service.address.toLowerCase().includes(searchLower) ||
          service.services.some(s => s.toLowerCase().includes(searchLower));
        if (!matchesSearch) return false;
      }

      // Institution (only if no quick filter)
      if (!activeQuickFilter && filters.institution !== 'all' && service.institution !== filters.institution) {
        return false;
      }

      // Category
      if (filters.category !== 'all' && service.category !== filters.category) {
        return false;
      }

      // District
      if (filters.district && service.district !== filters.district) {
        return false;
      }

      // Booking
      if (filters.booking !== 'all' && service.booking !== filters.booking) {
        return false;
      }

      return true;
    });
  }, [filters, activeQuickFilter]);

  // Enhanced Structured data for SEO - ItemList with GovernmentService
  const itemListStructuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": t.title,
    "description": t.seoDesc,
    "url": canonicalUrl,
    "numberOfItems": studentServicesData.length,
    "itemListElement": studentServicesData.slice(0, 15).map((service, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "item": {
        "@type": "GovernmentService",
        "name": service.name,
        "provider": {
          "@type": "Organization",
          "name": service.institutionName
        },
        "areaServed": {
          "@type": "City",
          "name": "Torino",
          "sameAs": "https://www.wikidata.org/wiki/Q495"
        },
        "serviceType": service.type,
        "availableChannel": {
          "@type": "ServiceChannel",
          "serviceLocation": {
            "@type": "Place",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": service.address,
              "addressLocality": "Torino",
              "addressCountry": "IT"
            }
          }
        }
      }
    }))
  };

  const breadcrumbs = currentLang === 'it' 
    ? [
        { label: 'Home', href: '/' },
        { label: 'Studenti', href: '/studenti' },
        { label: 'Strumenti', href: '/studenti/strumenti' },
        { label: 'Sportelli e Servizi' }
      ]
    : [
        { label: 'Home', href: '/' },
        { label: 'Students', href: '/students' },
        { label: 'Tools', href: '/students/tools' },
        { label: 'Services Directory' }
      ];

  return (
    <>
      <Helmet>
        <title>{t.seoTitle}</title>
        <meta name="description" content={t.seoDesc} />
        <meta name="keywords" content={t.keywords} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/strumenti/sportelli-studenti-torino" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/tools/student-services-turin" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/strumenti/sportelli-studenti-torino" />
        
        {/* Open Graph */}
        <meta property="og:title" content={t.seoTitle} />
        <meta property="og:description" content={t.seoDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://junglerent.it/images/politecnico-torino.avif" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:locale" content={currentLang === 'it' ? 'it_IT' : 'en_US'} />
        <meta property="og:site_name" content="Jungle Rent" />
        
        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={t.seoTitle} />
        <meta name="twitter:description" content={t.seoDesc} />
        <meta name="twitter:image" content="https://junglerent.it/images/politecnico-torino.avif" />
        
        {/* ItemList Schema */}
        <script type="application/ld+json">
          {JSON.stringify(itemListStructuredData)}
        </script>
      </Helmet>
      
      {/* Additional Structured Data Components */}
      <StudentServicesDirectorySchema lang={currentLang} totalServices={studentServicesData.length} />
      <StudentServicesDirectoryBreadcrumb lang={currentLang} />
      <StudentServicesDirectoryFAQ lang={currentLang} />

      <Navigation />

      <main id="main-content" className="min-h-screen bg-background pt-20">
        {/* Breadcrumbs */}
        <div className="container mx-auto px-4 py-4">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-primary/5 to-background">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                <Building2 className="w-3 h-3 mr-1" />
                {studentServicesData.length} {currentLang === 'it' ? 'servizi' : 'services'}
              </Badge>

              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {t.title}
              </h1>

              <p className="text-lg text-muted-foreground mb-6">
                {t.subtitle}
              </p>

              {/* Download PDF Button */}
              <a 
                href="/resources/Sportelli_Servizi_Studenti_1.pdf" 
                download
                className="inline-block"
              >
                <Button variant="outline" size="lg">
                  <Download className="w-4 h-4 mr-2" />
                  {t.downloadPdf}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Quick Filters */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground mb-3">{t.quickFilters}:</p>
            <div className="flex flex-wrap gap-2">
              <Badge 
                variant={activeQuickFilter === null ? "default" : "outline"}
                className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1"
                onClick={() => handleQuickFilter(null)}
              >
                {t.allInstitutions}
              </Badge>
              {(Object.keys(institutionLabels) as Institution[]).map((inst) => (
                <Badge
                  key={inst}
                  variant={activeQuickFilter === inst ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/10 transition-colors px-3 py-1"
                  style={activeQuickFilter === inst ? { backgroundColor: institutionLabels[inst].color } : {}}
                  onClick={() => handleQuickFilter(inst)}
                >
                  {institutionLabels[inst][currentLang]}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6">
          <div className="container mx-auto px-4">
            <StudentServiceFilters 
              filters={filters} 
              onFiltersChange={(newFilters) => {
                setFilters(newFilters);
                setActiveQuickFilter(null);
              }} 
            />
          </div>
        </section>

        {/* View Mode Toggle */}
        <section className="pb-4">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredServices.length}</span> {t.servicesFound}
              </p>
              <div className="flex gap-2">
                <Button
                  variant={viewMode === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4 mr-1" />
                  {currentLang === 'it' ? 'Lista' : 'List'}
                </Button>
                <Button
                  variant={viewMode === 'map' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setViewMode('map')}
                >
                  <Map className="w-4 h-4 mr-1" />
                  {currentLang === 'it' ? 'Mappa' : 'Map'}
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Map View */}
        {viewMode === 'map' && (
          <section className="py-4">
            <div className="container mx-auto px-4">
              <Suspense fallback={
                <div className="w-full h-[400px] bg-muted/50 rounded-lg flex items-center justify-center">
                  <div className="animate-pulse text-muted-foreground">
                    {currentLang === 'it' ? 'Caricamento mappa...' : 'Loading map...'}
                  </div>
                </div>
              }>
                <StudentServicesMap 
                  services={filteredServices} 
                  lang={currentLang}
                  selectedServiceId={selectedServiceId || undefined}
                  onSelectService={handleSelectService}
                />
              </Suspense>
            </div>
          </section>
        )}

        {/* Services Grid */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {viewMode === 'list' && (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredServices.map((service) => (
                  <div
                    key={service.id}
                    ref={(el) => { cardRefs.current[service.id] = el; }}
                    className={`transition-all duration-500 ${
                      selectedServiceId === service.id 
                        ? 'ring-2 ring-primary ring-offset-2 rounded-lg scale-[1.02]' 
                        : ''
                    }`}
                  >
                    <StudentServiceCard service={service} />
                  </div>
                ))}
              </div>
            )}

            {viewMode === 'map' && filteredServices.length > 0 && (
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-4">
                  {currentLang === 'it' 
                    ? 'Clicca sui marker per vedere i dettagli' 
                    : 'Click on markers to see details'}
                </p>
              </div>
            )}

            {filteredServices.length === 0 && (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 mx-auto text-muted-foreground/50 mb-4" />
                <p className="text-muted-foreground">
                  {currentLang === 'it' 
                    ? 'Nessun servizio trovato con i filtri selezionati.' 
                    : 'No services found with the selected filters.'}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Related Resources */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">
              {t.relatedResources}
            </h2>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
              <Link to="/strumenti/aule-studio-torino">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <BookOpen className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {t.resources.studySpaces.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{t.resources.studySpaces.description}</CardDescription>
                    <div className="flex items-center text-primary text-sm mt-4 group-hover:gap-2 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/strumenti/dove-mangiare-torino">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <Utensils className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {t.resources.cheapEats.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{t.resources.cheapEats.description}</CardDescription>
                    <div className="flex items-center text-primary text-sm mt-4 group-hover:gap-2 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/studenti/strumenti/budget">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <Calculator className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {t.resources.budget.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{t.resources.budget.description}</CardDescription>
                    <div className="flex items-center text-primary text-sm mt-4 group-hover:gap-2 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/blog/universita-torino-guida-completa">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {t.resources.unito.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{t.resources.unito.description}</CardDescription>
                    <div className="flex items-center text-primary text-sm mt-4 group-hover:gap-2 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link to="/blog/politecnico-torino-guida-completa">
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer group">
                  <CardHeader>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-2">
                      <GraduationCap className="w-5 h-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">
                      {t.resources.polito.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{t.resources.polito.description}</CardDescription>
                    <div className="flex items-center text-primary text-sm mt-4 group-hover:gap-2 transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
};

export default StudentServicesDirectory;
