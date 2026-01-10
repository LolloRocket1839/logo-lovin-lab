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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { List, Map, Dumbbell, Clock, Waves, GraduationCap, HelpCircle } from 'lucide-react';
import { useToolLanguage } from '@/hooks/useToolLanguage';
import GymCard from '@/components/tools/GymCard';
import GymFilters, { GymFiltersState } from '@/components/tools/GymFilters';
import GymsMap from '@/components/tools/GymsMap';
import { gymsData, Gym } from '@/data/gymsDirectory';
import { GymsDirectorySchema, GymsItemListSchema, GymsDirectoryFAQ } from '@/components/tools/ToolStructuredData';

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
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/strumenti/palestre-torino-studenti" />
      </Helmet>

      {/* Structured Data for SEO */}
      <GymsDirectorySchema lang={lang} gymsCount={gymsData.length} />
      <GymsItemListSchema lang={lang} gyms={gymsData} />
      <GymsDirectoryFAQ lang={lang} />

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

        {/* FAQ Section */}
        <section className="mt-12 pt-8 border-t">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-6 h-6 text-primary" />
            <h2 className="text-xl font-semibold">
              {lang === 'it' ? 'Domande frequenti' : 'Frequently asked questions'}
            </h2>
          </div>
          <Accordion type="single" collapsible className="w-full">
            {(lang === 'it' ? [
              {
                q: "Qual è la palestra più economica a Torino per studenti?",
                a: "Le palestre più economiche per studenti a Torino sono FitActive (€9.90/mese con sconto studenti), McFIT (€19.90/mese) e Gym Club 32 (€15/mese per universitari). FitActive offre il miglior rapporto qualità-prezzo con accesso a tutte le sedi."
              },
              {
                q: "Quali palestre a Torino offrono sconti per studenti universitari?",
                a: "Le palestre con sconti studenti includono FitActive (-50% sul primo anno), Virgin Active (convenzioni universitarie), McFIT (tariffa unica), Anytime Fitness (sconti per studenti Politecnico) e GO Fit (convenzione con UniTO). Porta sempre il tesserino universitario."
              },
              {
                q: "Ci sono palestre aperte 24 ore a Torino?",
                a: "Sì, diverse palestre sono aperte 24/7: Anytime Fitness (tutte le sedi), McFIT (alcune sedi), e FitActive (sedi selezionate). Ideali per studenti con orari flessibili o durante le sessioni d'esame."
              },
              {
                q: "Quali palestre a Torino hanno la piscina?",
                a: "Le palestre con piscina a Torino includono Virgin Active (Lingotto, Torino Centro), GO Fit, Master Club Torino e Villa Glicini. I prezzi partono da €40-50/mese, significativamente più alti delle palestre solo fitness."
              },
              {
                q: "Qual è la palestra più vicina al Politecnico di Torino?",
                a: "Le palestre più vicine al Politecnico sono McFIT Corso Castelfidardo (5 min a piedi), FitActive Corso Francia (10 min), e Anytime Fitness Crocetta (8 min). McFIT ha una sede proprio accanto al campus principale."
              },
              {
                q: "Quanto costa mediamente una palestra a Torino?",
                a: "I prezzi medi a Torino: low-cost €10-20/mese (FitActive, McFIT), mid-range €30-50/mese (Orange, Anytime), premium €60-100/mese (Virgin Active). Con sconto studenti si risparmia dal 20% al 50%."
              },
              {
                q: "Posso provare la palestra prima di iscrivermi?",
                a: "Quasi tutte le palestre offrono un ingresso di prova gratuito o a prezzo ridotto: FitActive (1 giorno free), McFIT (day pass €9.90), Virgin Active (tour + prova gratuita), Anytime Fitness (settimana prova). Verifica sul sito o chiamando."
              },
              {
                q: "Quali palestre accettano la tessera AICS o UISP?",
                a: "Le palestre affiliate AICS/UISP offrono spesso sconti o accesso agevolato. A Torino, molte palestre indipendenti e centri sportivi comunali accettano queste tessere. Controlla sempre prima di iscriverti."
              }
            ] : [
              {
                q: "What is the cheapest gym in Turin for students?",
                a: "The cheapest gyms for students in Turin are FitActive (€9.90/month with student discount), McFIT (€19.90/month) and Gym Club 32 (€15/month for university students). FitActive offers the best value with access to all locations."
              },
              {
                q: "Which gyms in Turin offer student discounts?",
                a: "Gyms with student discounts include FitActive (-50% first year), Virgin Active (university agreements), McFIT (flat rate), Anytime Fitness (Politecnico student discounts) and GO Fit (UniTO agreement). Always bring your student ID."
              },
              {
                q: "Are there 24-hour gyms in Turin?",
                a: "Yes, several gyms are open 24/7: Anytime Fitness (all locations), McFIT (some locations), and FitActive (selected locations). Ideal for students with flexible schedules or during exam sessions."
              },
              {
                q: "Which gyms in Turin have a swimming pool?",
                a: "Gyms with pools in Turin include Virgin Active (Lingotto, Torino Centro), GO Fit, Master Club Torino and Villa Glicini. Prices start from €40-50/month, significantly higher than fitness-only gyms."
              },
              {
                q: "What is the closest gym to Politecnico di Torino?",
                a: "The closest gyms to Politecnico are McFIT Corso Castelfidardo (5 min walk), FitActive Corso Francia (10 min), and Anytime Fitness Crocetta (8 min). McFIT has a location right next to the main campus."
              },
              {
                q: "How much does a gym membership cost in Turin on average?",
                a: "Average prices in Turin: low-cost €10-20/month (FitActive, McFIT), mid-range €30-50/month (Orange, Anytime), premium €60-100/month (Virgin Active). With student discount you save 20% to 50%."
              },
              {
                q: "Can I try the gym before signing up?",
                a: "Almost all gyms offer a free or reduced-price trial: FitActive (1 day free), McFIT (day pass €9.90), Virgin Active (tour + free trial), Anytime Fitness (week trial). Check on the website or by calling."
              },
              {
                q: "Which gyms accept AICS or UISP cards?",
                a: "AICS/UISP affiliated gyms often offer discounts or facilitated access. In Turin, many independent gyms and municipal sports centers accept these cards. Always check before signing up."
              }
            ]).map((faq, idx) => (
              <AccordionItem key={idx} value={`faq-${idx}`}>
                <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

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
