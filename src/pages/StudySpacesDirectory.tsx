import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { BookOpen, ArrowLeft, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { BottomNav } from '@/components/BottomNav';
import { StudySpaceCard } from '@/components/tools/StudySpaceCard';
import { StudySpaceFilters, StudySpaceFiltersState } from '@/components/tools/StudySpaceFilters';
import { detailedStudySpaces, DetailedStudySpace } from '@/data/detailedStudySpaces';

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

  const content = {
    it: {
      title: 'Aule Studio Torino',
      subtitle: 'Directory completa delle aule studio, biblioteche e spazi dove studiare a Torino',
      seoTitle: 'Aule Studio Torino 2025 | Directory Completa con Orari e Contatti',
      seoDesc: 'Trova le migliori aule studio a Torino: sale EDISU, biblioteche, caffetterie study-friendly e coworking. Orari, contatti, WiFi e accessibilità.',
      backToTools: 'Strumenti studenti',
      readGuide: 'Leggi la guida completa',
      noResults: 'Nessuno spazio corrisponde ai filtri selezionati.',
      resetFilters: 'Reset filtri'
    },
    en: {
      title: 'Study Spaces Turin',
      subtitle: 'Complete directory of study rooms, libraries and spaces to study in Turin',
      seoTitle: 'Study Spaces Turin 2025 | Complete Directory with Hours and Contacts',
      seoDesc: 'Find the best study spaces in Turin: EDISU rooms, libraries, study-friendly cafes and coworking. Hours, contacts, WiFi and accessibility.',
      backToTools: 'Student tools',
      readGuide: 'Read the full guide',
      noResults: 'No spaces match the selected filters.',
      resetFilters: 'Reset filters'
    }
  };

  const t = content[currentLang];

  // Filter spaces
  const filteredSpaces = useMemo(() => {
    return detailedStudySpaces.filter((space) => {
      // Search
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        const matchesSearch = 
          space.name.toLowerCase().includes(searchLower) ||
          space.address.toLowerCase().includes(searchLower) ||
          space.district.toLowerCase().includes(searchLower);
        if (!matchesSearch) return false;
      }
      
      // Category
      if (filters.category !== 'all' && space.category !== filters.category) {
        return false;
      }
      
      // District
      if (filters.district !== 'all' && space.district !== filters.district) {
        return false;
      }
      
      // Silence level
      if (filters.silenceLevel !== 'all' && space.features.silence !== filters.silenceLevel) {
        return false;
      }
      
      // 24/7 access
      if (filters.access24h && !space.features.access24h) {
        return false;
      }
      
      // Disabled access
      if (filters.disabledAccess && space.features.disabledAccess === 'no') {
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

        {/* Filters & Results */}
        <section className="py-8">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="mb-8">
              <StudySpaceFilters
                filters={filters}
                onFiltersChange={setFilters}
                lang={currentLang}
                totalResults={filteredSpaces.length}
              />
            </div>
            
            {/* Results Grid */}
            {filteredSpaces.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSpaces.map((space) => (
                  <StudySpaceCard 
                    key={space.id} 
                    space={space} 
                    lang={currentLang} 
                  />
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
                  onClick={() => setFilters({
                    search: '',
                    category: 'all',
                    district: 'all',
                    silenceLevel: 'all',
                    access24h: false,
                    disabledAccess: false
                  })}
                >
                  {t.resetFilters}
                </Button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
};

export default StudySpacesDirectory;
