import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Navigation, Footer } from "@/components/layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { 
  TrendingUp, 
  Percent, 
  Building2, 
  Filter,
  ArrowUpDown,
  MapPin,
  MessageCircle,
  ArrowRight,
  Hammer,
  GitCompare,
  X
} from "lucide-react";
import { 
  investorZones, 
  getZonesByRanking,
  getZonesWithUrbanRenewal,
  InvestorZone
} from "@/data/investorZoneData";
import { ZoneCard } from "@/components/investor/ZoneCard";
import { ZoneComparisonTool } from "@/components/investor/ZoneComparisonTool";
import InvestorZonesMap from "@/components/investor/InvestorZonesMap";
import { openWhatsApp, CONTACTS, MESSAGES } from "@/constants";

type SortOption = 'growth' | 'price_asc' | 'price_desc';
type FilterOption = 'all' | 'Centro' | 'Semicentro' | 'Periferia' | 'renewal';

const InvestorZonesIndex = () => {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
  
  const [sortBy, setSortBy] = useState<SortOption>('growth');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');
  const [comparisonZoneIds, setComparisonZoneIds] = useLocalStorage<string[]>('investor-comparison-zones', []);
  const [isCompareDrawerOpen, setIsCompareDrawerOpen] = useState(false);

  // Handle zone selection from map
  const handleMapZoneSelect = (zone: InvestorZone) => {
    setComparisonZoneIds(prev => {
      if (prev.includes(zone.id)) {
        // Remove if already selected
        return prev.filter(id => id !== zone.id);
      } else if (prev.length < 3) {
        // Add if under limit
        return [...prev, zone.id];
      }
      return prev;
    });
  };

  // Get top zones for highlights
  const topGrowthZones = getZonesByRanking('growthPotentialRank', 3);
  const renewalZones = getZonesWithUrbanRenewal();

  // Filter and sort zones
  const filteredZones = useMemo(() => {
    let zones = [...investorZones];

    // Apply filter
    if (filterBy === 'renewal') {
      zones = zones.filter(z => z.urbanRenewal.active);
    } else if (filterBy !== 'all') {
      zones = zones.filter(z => z.zone === filterBy);
    }

    // Apply sort
    switch (sortBy) {
      case 'price_asc':
        zones.sort((a, b) => a.pricePerSqm.avg - b.pricePerSqm.avg);
        break;
      case 'price_desc':
        zones.sort((a, b) => b.pricePerSqm.avg - a.pricePerSqm.avg);
        break;
      case 'growth':
        zones.sort((a, b) => b.variation2024 - a.variation2024);
        break;
    }

    return zones;
  }, [sortBy, filterBy]);

  const handleWhatsApp = () => {
    const message = MESSAGES.investor.whatsapp[lang]('Lorenzo');
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  const texts = {
    it: {
      title: 'Zone Investimento Torino | Analisi Mercato 2025',
      description: 'Guida completa alle zone di Torino per investitori immobiliari. Prezzi €/mq, trend e progetti di riqualificazione per ogni quartiere.',
      heroTitle: 'Zone di investimento',
      heroSubtitle: 'Analisi di mercato 2025 per ogni quartiere di Torino',
      topGrowth: 'Massima crescita',
      withRenewal: 'Con riqualificazione',
      allZones: 'Tutti i quartieri',
      filterLabel: 'Filtra',
      sortLabel: 'Ordina',
      sortPriceAsc: 'Prezzo ↑',
      sortPriceDesc: 'Prezzo ↓',
      sortGrowth: 'Crescita',
      filterAll: 'Tutte',
      filterCenter: 'Centro',
      filterSemicenter: 'Semicentro',
      filterPeriphery: 'Periferia',
      filterRenewal: 'Riqualificazione',
      zonesCount: 'quartieri',
      compareZones: 'Confronta zone',
      ctaTitle: 'Vuoi investire?',
      ctaSubtitle: 'Parla direttamente con Lorenzo per una proiezione personalizzata sulla prossima operazione',
      ctaButton: 'Parla con Lorenzo',
      disclaimer: '*Dati aggiornati a febbraio 2025. Fonte: OMI, Immobiliare.it, FIAIP, Nomisma. Le proiezioni di ritorno sulla singola operazione sono riservate al memorandum informativo.'
    },
    en: {
      title: 'Turin Investment Zones | 2025 Market Analysis',
      description: 'Complete guide to Turin neighborhoods for real estate investors. €/sqm prices, trends and urban renewal projects for each area.',
      heroTitle: 'Investment zones',
      heroSubtitle: '2025 market analysis for every Turin neighborhood',
      topGrowth: 'Maximum growth',
      withRenewal: 'With urban renewal',
      allZones: 'All neighborhoods',
      filterLabel: 'Filter',
      sortLabel: 'Sort',
      sortPriceAsc: 'Price ↑',
      sortPriceDesc: 'Price ↓',
      sortGrowth: 'Growth',
      filterAll: 'All',
      filterCenter: 'Center',
      filterSemicenter: 'Semi-center',
      filterPeriphery: 'Periphery',
      filterRenewal: 'Renewal',
      zonesCount: 'neighborhoods',
      compareZones: 'Compare zones',
      ctaTitle: 'Want to invest?',
      ctaSubtitle: 'Talk directly with Lorenzo for a personalized projection on the next operation',
      ctaButton: 'Talk to Lorenzo',
      disclaimer: '*Data updated February 2025. Sources: OMI, Immobiliare.it, FIAIP, Nomisma. Return projections per operation are reserved for the information memorandum.'
    }
  };

  const t2 = texts[lang];

  // Schema.org
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": t2.title,
    "description": t2.description,
    "url": `https://junglerent.it/${lang === 'en' ? 'investors/zones' : 'investitori/zone'}`,
    "provider": {
      "@type": "Organization",
      "name": "Jungle Rent S.r.l.",
      "url": "https://junglerent.it"
    },
    "about": {
      "@type": "Thing",
      "name": lang === 'it' ? "Investimento immobiliare Torino" : "Turin real estate investment"
    }
  };

  return (
    <main role="main" className="min-h-screen bg-background" id="main-content" tabIndex={-1}>
      <Helmet>
        <title>{t2.title}</title>
        <meta name="description" content={t2.description} />
        <link rel="canonical" href={`https://junglerent.it/${lang === 'en' ? 'investors/zones' : 'investitori/zone'}`} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/investitori/zone" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/investors/zones" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/investitori/zone" />
        <script type="application/ld+json">{JSON.stringify(pageSchema)}</script>
      </Helmet>

      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="container px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Torino
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 text-foreground">
              {t2.heroTitle}
            </h1>
            <p className="text-lg text-muted-foreground">
              {t2.heroSubtitle}
            </p>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="pb-12 md:pb-16">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto">
            {/* Top Growth */}
            <Card className="p-4 border-border/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{t2.topGrowth}</p>
                  <p className="font-semibold text-foreground">{topGrowthZones[0]?.name}</p>
                </div>
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                +{topGrowthZones[0]?.variation2024}% 2024
              </p>
            </Card>

            {/* With Renewal */}
            <Card className="p-4 border-border/20">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Hammer className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{t2.withRenewal}</p>
                  <p className="font-semibold text-foreground">{renewalZones.length} {t2.zonesCount}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                Metro 2, Masterplan Ratti...
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="pb-12 md:pb-16">
        <div className="container px-6">
          <Card className="overflow-hidden border-border/20">
            <div className="p-4 border-b border-border/20 flex items-center justify-between">
              <h2 className="font-semibold flex items-center gap-2 text-foreground">
                <MapPin className="w-4 h-4 text-primary" />
                {lang === 'it' ? 'Mappa di mercato' : 'Market map'}
              </h2>
              {comparisonZoneIds.length > 0 && (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {comparisonZoneIds.length}/3 {lang === 'it' ? 'selezionate' : 'selected'}
                  </Badge>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="h-7 text-xs gap-1"
                    onClick={() => setIsCompareDrawerOpen(true)}
                  >
                    <GitCompare className="w-3 h-3" />
                    {t2.compareZones}
                  </Button>
                </div>
              )}
            </div>
            <InvestorZonesMap
              zones={investorZones}
              lang={lang}
              onZoneClick={handleMapZoneSelect}
              selectedZoneIds={comparisonZoneIds}
            />
            {comparisonZoneIds.length === 0 && (
              <div className="p-3 bg-muted/50 border-t border-border/20 text-center">
                <p className="text-xs text-muted-foreground">
                  {lang === 'it' 
                    ? '💡 Clicca sui marker per selezionare zone da confrontare (max 3)' 
                    : '💡 Click markers to select zones to compare (max 3)'}
                </p>
              </div>
            )}
          </Card>
        </div>
      </section>

      {/* Filters and Grid */}
      <section className="pb-16 md:pb-24">
        <div className="container px-6">
          {/* Filter/Sort Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">{t2.filterLabel}:</span>
              <div className="flex flex-wrap gap-2">
                {[
                  { value: 'all', label: t2.filterAll },
                  { value: 'Centro', label: t2.filterCenter },
                  { value: 'Semicentro', label: t2.filterSemicenter },
                  { value: 'Periferia', label: t2.filterPeriphery },
                  { value: 'renewal', label: t2.filterRenewal }
                ].map(filter => (
                  <Button
                    key={filter.value}
                    variant={filterBy === filter.value ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setFilterBy(filter.value as FilterOption)}
                    className="h-8 text-xs"
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">{t2.sortLabel}:</span>
              <div className="flex gap-2">
                {[
                  { value: 'growth', label: t2.sortGrowth },
                  { value: 'price_asc', label: t2.sortPriceAsc }
                ].map(sort => (
                  <Button
                    key={sort.value}
                    variant={sortBy === sort.value ? 'secondary' : 'ghost'}
                    size="sm"
                    onClick={() => setSortBy(sort.value as SortOption)}
                    className="h-8 text-xs"
                  >
                    {sort.label}
                  </Button>
                ))}
              </div>

              {/* Compare button */}
              <Drawer open={isCompareDrawerOpen} onOpenChange={setIsCompareDrawerOpen}>
                <DrawerTrigger asChild onClick={() => setIsCompareDrawerOpen(true)}>
                  <Button variant="outline" className="gap-2 h-8">
                    <GitCompare className="w-4 h-4" />
                    {t2.compareZones}
                    {comparisonZoneIds.length > 0 && (
                      <Badge variant="secondary" className="ml-1 h-5 px-1.5 text-xs">
                        {comparisonZoneIds.length}
                      </Badge>
                    )}
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="max-h-[85vh] flex flex-col">
                  <DrawerHeader className="flex items-center justify-between flex-shrink-0">
                    <DrawerTitle className="flex items-center gap-2">
                      <GitCompare className="w-5 h-5 text-primary" />
                      {t2.compareZones}
                    </DrawerTitle>
                    <DrawerClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="w-5 h-5" />
                      </Button>
                    </DrawerClose>
                  </DrawerHeader>
                  <div className="flex-1 min-h-0 overflow-y-auto px-4 pb-6">
                    <ZoneComparisonTool 
                      lang={lang} 
                      embedded 
                      preselectedZones={comparisonZoneIds}
                      onZonesChange={setComparisonZoneIds}
                    />
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>

          {/* Results count */}
          <p className="text-sm text-muted-foreground mb-6">
            {filteredZones.length} {t2.zonesCount}
          </p>

          {/* Zone Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredZones.map(zone => (
              <ZoneCard key={zone.id} zone={zone} lang={lang} />
            ))}
          </div>

          {/* Disclaimer */}
          <p className="text-xs text-muted-foreground text-center mt-8">
            {t2.disclaimer}
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30 border-t border-border/20">
        <div className="container px-6">
          <Card className="max-w-2xl mx-auto p-8 md:p-12 rounded-xl border-primary/20 bg-gradient-to-br from-primary/5 to-transparent text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-foreground">
              {t2.ctaTitle}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t2.ctaSubtitle}
            </p>
            <Button 
              onClick={handleWhatsApp}
              size="lg"
              variant="premium"
              className="px-8 py-6 text-lg group shadow-xl"
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              {t2.ctaButton}
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Card>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default InvestorZonesIndex;
