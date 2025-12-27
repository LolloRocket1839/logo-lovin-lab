import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { List, Map as MapIcon, BookOpen, Calculator, GraduationCap, MapPin } from 'lucide-react';
import CheapEatCard from '@/components/tools/CheapEatCard';
import CheapEatFilters, { CheapEatFiltersState } from '@/components/tools/CheapEatFilters';
import CheapEatsMap from '@/components/tools/CheapEatsMap';
import { cheapEatsData, quickFilters, CheapEatLocation } from '@/data/cheapEatsDirectory';

const CheapEatsDirectory = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language.startsWith('en') ? 'en' : 'it';

  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<CheapEatFiltersState>({
    search: '',
    category: 'all',
    district: 'all',
    priceRange: 'all',
    vegetarian: 'all',
    wifi: 'all',
    accessible: 'all',
  });
  const [selectedLocation, setSelectedLocation] = useState<CheapEatLocation | null>(null);

  const content = {
    it: {
      title: 'Dove Mangiare Cheap a Torino - Guida Studenti 2025',
      subtitle: 'Directory completa di 20 locali economici verificati: piole, street food, mense e ristoranti da €3 a €15',
      metaDescription: 'Guida completa dove mangiare a Torino spendendo poco: mense EDISU da €3, street food, piole piemontesi, ristoranti economici. 20 locali verificati dicembre 2025.',
      breadcrumbTools: 'Strumenti',
      breadcrumbCurrent: 'Dove Mangiare Cheap',
      viewList: 'Lista',
      viewMap: 'Mappa',
      quickFiltersLabel: 'Filtri rapidi',
    },
    en: {
      title: 'Where to Eat Cheap in Turin - Student Guide 2025',
      subtitle: 'Complete directory of 20 verified budget eateries: taverns, street food, canteens and restaurants from €3 to €15',
      metaDescription: 'Complete guide to eating cheap in Turin: EDISU canteens from €3, street food, Piedmontese taverns, budget restaurants. 20 venues verified December 2025.',
      breadcrumbTools: 'Tools',
      breadcrumbCurrent: 'Cheap Eats',
      viewList: 'List',
      viewMap: 'Map',
      quickFiltersLabel: 'Quick filters',
    },
  };

  const t = content[lang];

  const breadcrumbItems = [
    { label: t.breadcrumbTools, href: lang === 'en' ? '/students/tools' : '/studenti/strumenti' },
    { label: t.breadcrumbCurrent },
  ];

  // Handle quick filter toggle
  const handleQuickFilter = (filterId: string) => {
    if (activeQuickFilter === filterId) {
      setActiveQuickFilter(null);
    } else {
      setActiveQuickFilter(filterId);
      // Reset advanced filters when using quick filter
      setFilters({
        search: '',
        category: 'all',
        district: 'all',
        priceRange: 'all',
        vegetarian: 'all',
        wifi: 'all',
        accessible: 'all',
      });
    }
  };

  // Filter locations
  const filteredLocations = useMemo(() => {
    let result = [...cheapEatsData];

    // Apply quick filter if active
    if (activeQuickFilter) {
      const qf = quickFilters.find((f) => f.id === activeQuickFilter);
      if (qf) {
        result = result.filter(qf.filter);
      }
    } else {
      // Apply advanced filters
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        result = result.filter(
          (l) =>
            l.name.toLowerCase().includes(searchLower) ||
            l.typicalDish.toLowerCase().includes(searchLower) ||
            l.cuisineType.toLowerCase().includes(searchLower) ||
            l.district.toLowerCase().includes(searchLower)
        );
      }
      if (filters.category !== 'all') {
        result = result.filter((l) => l.category === filters.category);
      }
      if (filters.district !== 'all') {
        result = result.filter((l) => l.district.includes(filters.district));
      }
      if (filters.priceRange !== 'all') {
        result = result.filter((l) => l.priceRange === filters.priceRange);
      }
      if (filters.vegetarian !== 'all') {
        result = result.filter((l) => 
          filters.vegetarian === 'yes' ? l.vegetarian === 'yes' : l.vegetarian !== 'no'
        );
      }
      if (filters.wifi === 'yes') {
        result = result.filter((l) => l.wifi);
      }
      if (filters.accessible === 'yes') {
        result = result.filter((l) => l.disabledAccess === 'yes');
      }
    }

    return result;
  }, [filters, activeQuickFilter]);

  const canonicalUrl = `https://junglerent.it/${lang === 'en' ? 'tools/cheap-eats-turin' : 'strumenti/dove-mangiare-torino'}`;

  // Structured data
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: t.title,
    description: t.metaDescription,
    numberOfItems: cheapEatsData.length,
    itemListElement: cheapEatsData.slice(0, 10).map((loc, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Restaurant',
        name: loc.name,
        address: {
          '@type': 'PostalAddress',
          streetAddress: loc.address,
          addressLocality: 'Torino',
          addressCountry: 'IT',
        },
        priceRange: loc.priceRange,
        servesCuisine: loc.cuisineType,
      },
    })),
  };

  return (
    <>
      <Helmet>
        <title>{t.title} | Jungle Rent</title>
        <meta name="description" content={t.metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/strumenti/dove-mangiare-torino" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/tools/cheap-eats-turin" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/strumenti/dove-mangiare-torino" />
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <Navigation />

      <main id="main-content" className="min-h-screen bg-background pt-20 pb-24 md:pb-12">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Hero */}
          <section className="py-8 md:py-12">
            <Breadcrumbs items={breadcrumbItems} />
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-4">
              {t.title}
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl">{t.subtitle}</p>
          </section>

          {/* Quick Filters */}
          <section className="mb-6">
            <p className="text-sm text-muted-foreground mb-3">{t.quickFiltersLabel}:</p>
            <div className="flex flex-wrap gap-2">
              {quickFilters.map((qf) => (
                <Badge
                  key={qf.id}
                  variant={activeQuickFilter === qf.id ? 'default' : 'outline'}
                  className="cursor-pointer text-sm py-1.5 px-3 hover:bg-primary/10 transition-colors"
                  onClick={() => handleQuickFilter(qf.id)}
                >
                  <span className="mr-1.5">{qf.icon}</span>
                  {lang === 'en' ? qf.labelEn : qf.labelIt}
                </Badge>
              ))}
            </div>
          </section>

          {/* Filters & View Toggle */}
          <section className="mb-6 space-y-4">
            <div className="flex items-center justify-between">
              <CheapEatFilters
                filters={filters}
                onFiltersChange={(f) => {
                  setFilters(f);
                  setActiveQuickFilter(null);
                }}
                lang={lang}
                totalResults={filteredLocations.length}
              />
            </div>
            
            <div className="flex justify-end gap-2">
              <Badge
                variant={viewMode === 'list' ? 'default' : 'outline'}
                className="cursor-pointer px-3 py-1.5"
                onClick={() => setViewMode('list')}
              >
                <List className="w-4 h-4 mr-1" />
                {t.viewList}
              </Badge>
              <Badge
                variant={viewMode === 'map' ? 'default' : 'outline'}
                className="cursor-pointer px-3 py-1.5"
                onClick={() => setViewMode('map')}
              >
                <MapIcon className="w-4 h-4 mr-1" />
                {t.viewMap}
              </Badge>
            </div>
          </section>

          {/* Content */}
          {viewMode === 'list' ? (
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {filteredLocations.map((location) => (
                <CheapEatCard
                  key={location.id}
                  location={location}
                  lang={lang}
                  onMapClick={() => {
                    setSelectedLocation(location);
                    setViewMode('map');
                  }}
                />
              ))}
            </section>
          ) : (
            <CheapEatsMap
              locations={filteredLocations}
              lang={lang}
              selectedLocationId={selectedLocation?.id}
              onMarkerClick={setSelectedLocation}
            />
          )}

          {/* Related Resources Section */}
          <section className="mt-12 py-8 border-t border-border/50">
            <h2 className="text-xl font-semibold text-foreground mb-6">
              📚 {lang === 'it' ? 'Risorse Correlate' : 'Related Resources'}
            </h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              <Link to="/blog/dove-mangiare-torino-studenti">
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        {lang === 'it' ? 'Guida Completa' : 'Complete Guide'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {lang === 'it' ? 'Blog con tutti i consigli per mangiare bene spendendo poco' : 'Blog with all tips for eating well on a budget'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to={lang === 'it' ? '/studenti/strumenti/budget' : '/students/tools/budget'}>
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <Calculator className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        {lang === 'it' ? 'Calcolatore Budget' : 'Budget Calculator'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {lang === 'it' ? 'Pianifica le tue spese mensili per cibo e altro' : 'Plan your monthly food and other expenses'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to={lang === 'it' ? '/strumenti/aule-studio-torino' : '/tools/study-spaces-turin'}>
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        {lang === 'it' ? 'Aule Studio' : 'Study Spaces'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {lang === 'it' ? 'Trova dove studiare vicino ai ristoranti economici' : 'Find where to study near budget eateries'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
              
              <Link to="/blog/san-salvario-guida-studenti">
                <Card className="h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-4 flex items-start gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-foreground mb-1">
                        {lang === 'it' ? 'Guida San Salvario' : 'San Salvario Guide'}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {lang === 'it' ? 'Il quartiere con più opzioni economiche' : 'The neighborhood with most budget options'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
};

export default CheapEatsDirectory;
