import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { List, Map, Dumbbell, Clock, Waves, GraduationCap } from 'lucide-react';
import { useToolLanguage } from '@/hooks/useToolLanguage';
import GymCard from '@/components/tools/GymCard';
import GymFilters, { GymFiltersState } from '@/components/tools/GymFilters';
import GymsMap from '@/components/tools/GymsMap';
import { gymsData, Gym } from '@/data/gymsDirectory';

const GymsDirectory: React.FC = () => {
  const lang = useToolLanguage();
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [selectedGymId, setSelectedGymId] = useState<string | undefined>();
  const [activeQuickFilter, setActiveQuickFilter] = useState<string | null>(null);
  const [filters, setFilters] = useState<GymFiltersState>({
    search: '',
    chain: 'all',
    category: 'all',
    maxPrice: 200,
    open24h: false,
    hasPool: false,
    hasSauna: false,
    studentDiscount: false
  });

  const quickFilters = [
    { id: 'budget', label: lang === 'it' ? '≤€20/mese' : '≤€20/month', icon: '💰' },
    { id: 'student', label: lang === 'it' ? 'Sconto studenti' : 'Student discount', icon: '🎓' },
    { id: '24h', label: '24h', icon: '🌙' },
    { id: 'pool', label: lang === 'it' ? 'Con piscina' : 'With pool', icon: '🏊' },
    { id: 'polito', label: lang === 'it' ? 'Vicino Politecnico' : 'Near Politecnico', icon: '🏫' },
    { id: 'unito', label: lang === 'it' ? 'Vicino UniTO' : 'Near UniTO', icon: '🎓' }
  ];

  const handleQuickFilter = (filterId: string) => {
    if (activeQuickFilter === filterId) {
      setActiveQuickFilter(null);
      setFilters({ ...filters, open24h: false, hasPool: false, studentDiscount: false, maxPrice: 200 });
    } else {
      setActiveQuickFilter(filterId);
    }
  };

  const filteredGyms = useMemo(() => {
    let result = [...gymsData];

    // Quick filters
    if (activeQuickFilter === 'budget') {
      result = result.filter(g => (g.priceStudent || g.priceStandard) <= 20);
    } else if (activeQuickFilter === 'student') {
      result = result.filter(g => g.priceStudent !== undefined);
    } else if (activeQuickFilter === '24h') {
      result = result.filter(g => g.open24h);
    } else if (activeQuickFilter === 'pool') {
      result = result.filter(g => g.hasPool);
    } else if (activeQuickFilter === 'polito') {
      result = result.filter(g => g.nearestUniversity?.some(u => u.includes('Politecnico')));
    } else if (activeQuickFilter === 'unito') {
      result = result.filter(g => g.nearestUniversity?.some(u => u.includes('UniTO')));
    }

    // Advanced filters
    if (filters.search) {
      const search = filters.search.toLowerCase();
      result = result.filter(g => 
        g.name.toLowerCase().includes(search) || 
        g.address.toLowerCase().includes(search) ||
        g.district.toLowerCase().includes(search)
      );
    }
    if (filters.chain !== 'all') result = result.filter(g => g.chain === filters.chain);
    if (filters.category !== 'all') result = result.filter(g => g.category === filters.category);
    if (filters.maxPrice < 200) result = result.filter(g => (g.priceStudent || g.priceStandard) <= filters.maxPrice);
    if (filters.open24h) result = result.filter(g => g.open24h);
    if (filters.hasPool) result = result.filter(g => g.hasPool);
    if (filters.hasSauna) result = result.filter(g => g.hasSauna);
    if (filters.studentDiscount) result = result.filter(g => g.priceStudent !== undefined);

    return result.sort((a, b) => (a.priceStudent || a.priceStandard) - (b.priceStudent || b.priceStandard));
  }, [activeQuickFilter, filters]);

  const t = {
    title: lang === 'it' ? 'Palestre Torino per Studenti' : 'Turin Gyms for Students',
    subtitle: lang === 'it' 
      ? `${gymsData.length} palestre confrontate: prezzi, sconti studenti, orari e servizi` 
      : `${gymsData.length} gyms compared: prices, student discounts, hours and services`,
    results: lang === 'it' ? 'palestre trovate' : 'gyms found',
    list: lang === 'it' ? 'Lista' : 'List',
    map: lang === 'it' ? 'Mappa' : 'Map'
  };

  const canonicalUrl = lang === 'it' 
    ? 'https://junglerent.it/strumenti/palestre-torino-studenti'
    : 'https://junglerent.it/tools/gyms-turin-students';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>{t.title} 2026 | Jungle Rent</title>
        <meta name="description" content={t.subtitle} />
        <link rel="canonical" href={canonicalUrl} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/strumenti/palestre-torino-studenti" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/tools/gyms-turin-students" />
      </Helmet>

      <Navigation />

      <main id="main-content" className="flex-grow container mx-auto px-4 py-6 pb-24 md:pb-8">
        <Breadcrumbs />

        {/* Hero */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Dumbbell className="w-8 h-8 text-primary" />
            <h1 className="text-3xl md:text-4xl font-bold">{t.title}</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-6">
          {quickFilters.map(filter => (
            <Badge
              key={filter.id}
              variant={activeQuickFilter === filter.id ? 'default' : 'outline'}
              className="cursor-pointer text-sm py-1.5 px-3"
              onClick={() => handleQuickFilter(filter.id)}
            >
              {filter.icon} {filter.label}
            </Badge>
          ))}
        </div>

        {/* Advanced Filters */}
        <GymFilters filters={filters} onFiltersChange={setFilters} lang={lang} />

        {/* View Toggle & Results Count */}
        <div className="flex items-center justify-between mt-6 mb-4">
          <p className="text-sm text-muted-foreground">
            <strong>{filteredGyms.length}</strong> {t.results}
          </p>
          <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'list' | 'map')}>
            <TabsList>
              <TabsTrigger value="list"><List className="w-4 h-4 mr-1" />{t.list}</TabsTrigger>
              <TabsTrigger value="map"><Map className="w-4 h-4 mr-1" />{t.map}</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Content */}
        {viewMode === 'list' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredGyms.map(gym => (
              <GymCard key={gym.id} gym={gym} lang={lang} />
            ))}
          </div>
        ) : (
          <div className="h-[600px] rounded-lg overflow-hidden border">
            <GymsMap 
              gyms={filteredGyms} 
              lang={lang} 
              selectedGymId={selectedGymId}
              onMarkerClick={(gym) => setSelectedGymId(gym.id)}
            />
          </div>
        )}

        {/* Related Resources */}
        <section className="mt-12 pt-8 border-t">
          <h2 className="text-xl font-semibold mb-4">
            {lang === 'it' ? 'Risorse correlate' : 'Related resources'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link to={lang === 'it' ? '/strumenti/aule-studio-torino' : '/tools/study-spaces-turin'}>
              <Button variant="outline" className="w-full justify-start">
                📚 {lang === 'it' ? 'Aule Studio Torino' : 'Study Spaces Turin'}
              </Button>
            </Link>
            <Link to={lang === 'it' ? '/strumenti/dove-mangiare-torino' : '/tools/cheap-eats-turin'}>
              <Button variant="outline" className="w-full justify-start">
                🍕 {lang === 'it' ? 'Dove Mangiare Economico' : 'Cheap Eats'}
              </Button>
            </Link>
            <Link to={lang === 'it' ? '/studenti/strumenti/budget' : '/students/tools/budget'}>
              <Button variant="outline" className="w-full justify-start">
                💰 {lang === 'it' ? 'Calcolatore Budget' : 'Budget Calculator'}
              </Button>
            </Link>
            <Link to={lang === 'it' ? '/studenti' : '/students'}>
              <Button variant="outline" className="w-full justify-start">
                🎓 {lang === 'it' ? 'Hub Studenti' : 'Student Hub'}
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </div>
  );
};

export default GymsDirectory;
