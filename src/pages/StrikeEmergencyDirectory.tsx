import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { AlertTriangle, Phone, Train, Bus, Car, Download, CheckCircle, Calendar, ExternalLink, Apple, Plane, CreditCard, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Navigation } from '@/components/layout/Navigation';
import { Footer } from '@/components/layout/Footer';
import { BottomNav } from '@/components/layout/BottomNav';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StrikeEmergencyCard } from '@/components/tools/StrikeEmergencyCard';
import { StrikeCalendarTable } from '@/components/tools/StrikeCalendarTable';
import { StrikeEmergencyFilters, type CategoryFilter, type CityFilter } from '@/components/tools/StrikeEmergencyFilters';
import { RefundProcedureCard } from '@/components/tools/RefundProcedureCard';
import { AirlineContactCard } from '@/components/tools/AirlineContactCard';
import { PassengerRightsSection } from '@/components/tools/PassengerRightsSection';
import {
  railwayContacts,
  urbanContacts,
  taxiServices,
  carSharingServices,
  alternativeServices,
  strikeCalendarJanuary2026,
  strikeCalendarFebMar2026,
  essentialApps,
  travelChecklist,
  getNationalStrikes,
  getTaxiByCity,
  getCarSharingByCity,
  airlineContacts,
  airportContacts,
  refundProcedures,
  officialLinks
} from '@/data/strikeEmergencyDirectory';

const StrikeEmergencyDirectory = () => {
  const { i18n } = useTranslation();
  const isItalian = i18n.language?.startsWith('it') ?? true;
  
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [selectedCity, setSelectedCity] = useState<CityFilter>('all');
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [calendarMonth, setCalendarMonth] = useState<'january' | 'february'>('january');

  const content = {
    it: {
      title: 'Numeri emergenza scioperi Italia',
      subtitle: 'Directory completa contatti, app e alternative trasporti',
      description: 'Tutti i numeri di emergenza, app e alternative per gli scioperi dei trasporti in Italia. Calendario gennaio 2026, rimborsi e checklist viaggio.',
      quickNumbers: 'Numeri rapidi',
      calendar: 'Calendario scioperi',
      directory: 'Directory completa',
      alternatives: 'Alternative viaggio',
      apps: 'App essenziali',
      checklist: 'Checklist viaggio',
      nationalStrikes: 'Scioperi nazionali',
      nextStrike: 'Prossimo sciopero nazionale',
      railway: 'Treni',
      urban: 'Trasporto urbano',
      taxi: 'Taxi',
      carsharing: 'Car sharing',
      free: 'Gratuito',
      downloadPdf: 'Scarica PDF checklist',
      relatedArticle: 'Leggi la guida completa',
      january2026: 'Gennaio 2026'
    },
    en: {
      title: 'Italy strike emergency contacts',
      subtitle: 'Complete directory of contacts, apps and transport alternatives',
      description: 'All emergency numbers, apps and alternatives for transport strikes in Italy. January 2026 calendar, refunds and travel checklist.',
      quickNumbers: 'Quick numbers',
      calendar: 'Strike calendar',
      directory: 'Full directory',
      alternatives: 'Travel alternatives',
      apps: 'Essential apps',
      checklist: 'Travel checklist',
      nationalStrikes: 'National strikes',
      nextStrike: 'Next national strike',
      railway: 'Trains',
      urban: 'Urban transport',
      taxi: 'Taxi',
      carsharing: 'Car sharing',
      free: 'Free',
      downloadPdf: 'Download PDF checklist',
      relatedArticle: 'Read complete guide',
      january2026: 'January 2026'
    }
  };

  const t = isItalian ? content.it : content.en;

  // Get next national strike
  const nationalStrikes = getNationalStrikes();
  const upcomingNational = nationalStrikes.find(s => new Date(s.date) >= new Date());

  // Filter contacts based on category and city
  const filteredTaxi = useMemo(() => {
    if (selectedCity === 'all') return taxiServices;
    return getTaxiByCity(selectedCity);
  }, [selectedCity]);

  const filteredCarSharing = useMemo(() => {
    if (selectedCity === 'all') return carSharingServices;
    return getCarSharingByCity(selectedCity);
  }, [selectedCity]);

  const filteredUrban = useMemo(() => {
    if (selectedCity === 'all') return urbanContacts;
    return urbanContacts.filter(c => c.city === selectedCity);
  }, [selectedCity]);

  const toggleChecklistItem = (id: number) => {
    setCheckedItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  return (
    <>
      <Helmet>
        <title>{t.title} | Jungle Rent</title>
        <meta name="description" content={t.description} />
        <meta property="og:title" content={`${t.title} | Jungle Rent`} />
        <meta property="og:description" content={t.description} />
        <link rel="canonical" href="https://junglerent.it/scioperi-italia" />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <Navigation />

      <main id="main-content" className="min-h-screen bg-background pt-20 pb-24 md:pb-8">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* Hero Section with Alert */}
          <section className="mb-8">
            <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-6 mb-6">
              <div className="flex items-start gap-4">
                <AlertTriangle className="h-8 w-8 text-destructive shrink-0 mt-1" />
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {t.title}
                  </h1>
                  <p className="text-muted-foreground mb-4">{t.subtitle}</p>
                  
                  {upcomingNational && (
                    <div className="bg-background/80 rounded-lg p-4 border">
                      <p className="text-sm text-muted-foreground mb-1">{t.nextStrike}</p>
                      <p className="font-bold text-lg text-destructive">
                        {new Date(upcomingNational.date).toLocaleDateString(isItalian ? 'it-IT' : 'en-GB', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        })}
                        {upcomingNational.dateEnd && ` - ${new Date(upcomingNational.dateEnd).toLocaleDateString(isItalian ? 'it-IT' : 'en-GB', { day: 'numeric', month: 'long' })}`}
                      </p>
                      <p className="text-sm mt-1">{upcomingNational.companies.join(', ')}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Emergency 112 Banner */}
            <div className="bg-red-600 text-white rounded-lg p-4 flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <Phone className="h-6 w-6" />
                <div>
                  <p className="font-bold">Emergenza: 112</p>
                  <p className="text-sm opacity-90">Numero unico europeo - Gratuito 24/7</p>
                </div>
              </div>
              <a href="tel:112" className="bg-white text-red-600 px-4 py-2 rounded-lg font-bold hover:bg-red-100 transition-colors">
                Chiama
              </a>
            </div>

            {/* Link to full article + MIT */}
            <div className="flex flex-wrap gap-3">
              <Button variant="outline" asChild>
                <a href={isItalian ? '/blog/sciopero-trasporti-italia-gennaio-2026' : '/en/blog/sciopero-trasporti-italia-gennaio-2026'}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  {t.relatedArticle}
                </a>
              </Button>
              <Button variant="outline" asChild>
                <a href={officialLinks.mitCalendar} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Calendario MIT ufficiale
                </a>
              </Button>
            </div>
          </section>

          {/* Quick Numbers - Most Important */}
          <section className="mb-8">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Phone className="h-5 w-5 text-primary" />
              {t.quickNumbers}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Trenitalia main */}
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Trenitalia</span>
                    <Badge variant="destructive">24/7</Badge>
                  </div>
                  <a href="tel:800892021" className="text-2xl font-bold text-primary hover:underline flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    800 89 20 21
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">Gratuito da rete fissa</p>
                </CardContent>
              </Card>
              
              {/* Italo */}
              <Card className="border-primary/30 bg-primary/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Italo</span>
                    <Badge variant="secondary">06:00-23:00</Badge>
                  </div>
                  <a href="tel:892020" className="text-2xl font-bold text-primary hover:underline flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    892020
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">~15€/chiamata</p>
                </CardContent>
              </Card>

              {/* Sala Blu Disabili */}
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold">Sala Blu (Disabili)</span>
                    <Badge className="bg-green-600">{t.free}</Badge>
                  </div>
                  <a href="tel:800906060" className="text-2xl font-bold text-green-600 hover:underline flex items-center gap-2">
                    <Phone className="h-5 w-5" />
                    800 90 60 60
                  </a>
                  <p className="text-xs text-muted-foreground mt-1">06:45-21:30</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Main Tabs */}
          <Tabs defaultValue="calendar" className="space-y-6">
            <TabsList className="grid grid-cols-4 md:grid-cols-8 w-full h-auto">
              <TabsTrigger value="calendar" className="gap-1 text-xs md:text-sm">
                <Calendar className="h-4 w-4" />
                <span className="hidden sm:inline">Calendario</span>
              </TabsTrigger>
              <TabsTrigger value="directory" className="gap-1 text-xs md:text-sm">
                <Phone className="h-4 w-4" />
                <span className="hidden sm:inline">Directory</span>
              </TabsTrigger>
              <TabsTrigger value="airlines" className="gap-1 text-xs md:text-sm">
                <Plane className="h-4 w-4" />
                <span className="hidden sm:inline">Aerei</span>
              </TabsTrigger>
              <TabsTrigger value="refunds" className="gap-1 text-xs md:text-sm">
                <CreditCard className="h-4 w-4" />
                <span className="hidden sm:inline">Rimborsi</span>
              </TabsTrigger>
              <TabsTrigger value="rights" className="gap-1 text-xs md:text-sm">
                <Shield className="h-4 w-4" />
                <span className="hidden sm:inline">Diritti</span>
              </TabsTrigger>
              <TabsTrigger value="alternatives" className="gap-1 text-xs md:text-sm">
                <Bus className="h-4 w-4" />
                <span className="hidden sm:inline">Alternative</span>
              </TabsTrigger>
              <TabsTrigger value="apps" className="gap-1 text-xs md:text-sm">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">App</span>
              </TabsTrigger>
              <TabsTrigger value="checklist" className="gap-1 text-xs md:text-sm">
                <CheckCircle className="h-4 w-4" />
                <span className="hidden sm:inline">Checklist</span>
              </TabsTrigger>
            </TabsList>

            {/* Calendar Tab */}
            <TabsContent value="calendar">
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5" />
                      Calendario scioperi 2026
                    </CardTitle>
                    <div className="flex gap-2">
                      <Button 
                        variant={calendarMonth === 'january' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setCalendarMonth('january')}
                      >
                        Gennaio
                      </Button>
                      <Button 
                        variant={calendarMonth === 'february' ? 'default' : 'outline'} 
                        size="sm"
                        onClick={() => setCalendarMonth('february')}
                      >
                        Feb-Marzo
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <StrikeCalendarTable 
                    strikes={calendarMonth === 'january' ? strikeCalendarJanuary2026 : strikeCalendarFebMar2026} 
                  />
                  <div className="mt-4 pt-4 border-t">
                    <Button variant="outline" size="sm" asChild>
                      <a href={officialLinks.mitCalendar} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Verifica su MIT.gov.it
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Directory Tab */}
            <TabsContent value="directory" className="space-y-6">
              <StrikeEmergencyFilters
                selectedCategory={selectedCategory}
                selectedCity={selectedCity}
                onCategoryChange={setSelectedCategory}
                onCityChange={setSelectedCity}
              />

              {/* Railway */}
              {(selectedCategory === 'all' || selectedCategory === 'railway') && (
                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Train className="h-5 w-5" />
                    {t.railway}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {railwayContacts.map(contact => (
                      <StrikeEmergencyCard key={contact.id} contact={contact} />
                    ))}
                  </div>
                </section>
              )}

              {/* Urban */}
              {(selectedCategory === 'all' || selectedCategory === 'urban') && filteredUrban.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Bus className="h-5 w-5" />
                    {t.urban}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUrban.map(contact => (
                      <StrikeEmergencyCard key={contact.id} contact={contact} />
                    ))}
                  </div>
                </section>
              )}

              {/* Taxi */}
              {(selectedCategory === 'all' || selectedCategory === 'taxi') && filteredTaxi.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    {t.taxi}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredTaxi.map(taxi => (
                      <StrikeEmergencyCard key={taxi.id} taxi={taxi} />
                    ))}
                  </div>
                </section>
              )}

              {/* Car Sharing */}
              {(selectedCategory === 'all' || selectedCategory === 'carsharing') && filteredCarSharing.length > 0 && (
                <section>
                  <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                    <Car className="h-5 w-5" />
                    {t.carsharing}
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCarSharing.map(cs => (
                      <StrikeEmergencyCard key={cs.id} carSharing={cs} />
                    ))}
                  </div>
                </section>
              )}
            </TabsContent>

            {/* Airlines Tab */}
            <TabsContent value="airlines" className="space-y-6">
              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  <Plane className="h-5 w-5" />
                  Compagnie aeree
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {airlineContacts.map(airline => (
                    <AirlineContactCard key={airline.id} airline={airline} />
                  ))}
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                  🛫 Aeroporti principali
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {airportContacts.map(airport => (
                    <AirlineContactCard key={airport.id} airport={airport} />
                  ))}
                </div>
              </section>

              <Card className="bg-primary/5 border-primary/30">
                <CardContent className="p-4">
                  <p className="text-sm">
                    <strong>Diritti passeggeri aerei:</strong> Se il volo è cancellato per sciopero, hai diritto a rimborso 100% OPPURE volo alternativo gratuito + assistenza (pasti, hotel se necessario).
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Refunds Tab */}
            <TabsContent value="refunds" className="space-y-6">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 mb-4">
                <p className="text-sm">
                  <strong>💡 Consiglio:</strong> Per i treni Italo il rimborso è <strong>automatico</strong> entro 30 giorni. Per Trenitalia usa il <strong>web form</strong> (gratuito e veloce). Per Trenord usa la <strong>chat TREasy</strong> (24/7 gratuita).
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {refundProcedures.map(procedure => (
                  <RefundProcedureCard key={procedure.company} procedure={procedure} />
                ))}
              </div>
            </TabsContent>

            {/* Rights Tab */}
            <TabsContent value="rights">
              <PassengerRightsSection />
            </TabsContent>

            {/* Alternatives Tab */}
            <TabsContent value="alternatives">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {alternativeServices.map(alt => (
                  <StrikeEmergencyCard key={alt.id} alternative={alt} />
                ))}
              </div>
            </TabsContent>

            {/* Apps Tab */}
            <TabsContent value="apps">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {essentialApps.map(app => (
                  <Card key={app.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg mb-1">{app.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{app.description}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={app.appIos} target="_blank" rel="noopener noreferrer">
                            <Apple className="h-4 w-4 mr-1" />
                            iOS
                          </a>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <a href={app.appAndroid} target="_blank" rel="noopener noreferrer">
                            <Download className="h-4 w-4 mr-1" />
                            Android
                          </a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Checklist Tab */}
            <TabsContent value="checklist">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5" />
                    {t.checklist}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {travelChecklist.map(item => (
                      <div 
                        key={item.id}
                        className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                          checkedItems.includes(item.id) 
                            ? 'bg-green-50 border-green-200 dark:bg-green-900/20 dark:border-green-800' 
                            : 'hover:bg-muted/50'
                        }`}
                        onClick={() => toggleChecklistItem(item.id)}
                      >
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                          checkedItems.includes(item.id)
                            ? 'bg-green-500 border-green-500 text-white'
                            : 'border-muted-foreground'
                        }`}>
                          {checkedItems.includes(item.id) && (
                            <CheckCircle className="h-3 w-3" />
                          )}
                        </div>
                        <span className={checkedItems.includes(item.id) ? 'line-through text-muted-foreground' : ''}>
                          {item.text}
                        </span>
                        <Badge 
                          variant={item.priority === 'high' ? 'destructive' : item.priority === 'medium' ? 'secondary' : 'outline'}
                          className="ml-auto shrink-0"
                        >
                          {item.priority === 'high' ? '!' : item.priority === 'medium' ? '•' : '○'}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    {checkedItems.length}/{travelChecklist.length} completati
                  </p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

        </div>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
};

export default StrikeEmergencyDirectory;
