import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Navigation, Footer } from "@/components/layout";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { 
  TrendingUp, 
  Percent, 
  Building2, 
  MapPin,
  MessageCircle,
  ArrowRight,
  Clock,
  Users,
  AlertTriangle,
  Hammer,
  ChevronLeft,
  Home,
  Target,
  GitCompare
} from "lucide-react";
import { 
  getZoneBySlug, 
  getTrendLabel, 
  getTrendIcon,
  getDemandLabel,
  formatPrice,
  InvestorZone
} from "@/data/investorZoneData";
import { ZoneMetricCard } from "@/components/investor/ZoneMetricCard";
import { ZoneComparisonTool } from "@/components/investor/ZoneComparisonTool";
import { openWhatsApp, CONTACTS, MESSAGES } from "@/constants";

const InvestorZonePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const lang = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';

  const zone = getZoneBySlug(slug || '');

  if (!zone) {
    return <Navigate to={lang === 'en' ? '/investors/zones' : '/investitori/zone'} replace />;
  }

  const handleWhatsApp = () => {
    const message = lang === 'it' 
      ? `Ciao Lorenzo, sono interessato a investire nel quartiere ${zone.name}. Vorrei sapere di più sulle opportunità disponibili.`
      : `Hi Lorenzo, I'm interested in investing in the ${zone.name} neighborhood. I'd like to know more about available opportunities.`;
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  const trendLabel = getTrendLabel(zone.trend202526, lang);
  const trendIcon = getTrendIcon(zone.trend202526);
  const demandLabel = getDemandLabel(zone.demand, lang);
  const isHighGrowth = zone.trend202526 === 'strong_growth' || zone.trend202526 === 'max_growth';

  const texts = {
    it: {
      backToZones: 'Tutte le zone',
      pricePerSqm: 'Prezzo medio',
      vacancy: 'Tasso sfitto',
      trend: 'Trend 2024',
      rentalsTitle: 'Range affitti di mercato',
      roomRent: 'Affitto stanza',
      apartmentRent: 'Affitto bilocale',
      perMonth: '/mese',
      demandTitle: 'Domanda e rischio',
      demandLevel: 'Livello domanda',
      rentingTime: 'Tempo affitto',
      targetTenant: 'Target inquilini',
      renewalTitle: 'Riqualificazione urbana',
      investmentLabel: 'Investimento',
      impactLabel: 'Impatto atteso',
      noteTitle: 'Nota per investitori',
      ctaTitle: 'Interessato a investire qui?',
      ctaSubtitle: 'Parla con Lorenzo per una proiezione personalizzata sul quartiere ' + zone.name,
      ctaButton: 'Parla con Lorenzo',
      disclaimer: '*Valori stimati basati su analisi di mercato (Feb 2025). Fonte: OMI, Immobiliare.it, FIAIP, Nomisma. Le proiezioni di ritorno sulla singola operazione sono riservate al memorandum informativo.',
      seeAllZones: 'Vedi tutti i quartieri'
    },
    en: {
      backToZones: 'All zones',
      pricePerSqm: 'Average price',
      vacancy: 'Vacancy rate',
      trend: '2024 trend',
      rentalsTitle: 'Market rent range',
      roomRent: 'Room rent',
      apartmentRent: 'Apartment rent',
      perMonth: '/month',
      demandTitle: 'Demand & risk',
      demandLevel: 'Demand level',
      rentingTime: 'Renting time',
      targetTenant: 'Target tenants',
      renewalTitle: 'Urban renewal',
      investmentLabel: 'Investment',
      impactLabel: 'Expected impact',
      noteTitle: 'Investor note',
      ctaTitle: 'Interested in investing here?',
      ctaSubtitle: 'Talk to Lorenzo for a personalized projection on ' + zone.name,
      ctaButton: 'Talk to Lorenzo',
      disclaimer: '*Estimated values based on market analysis (Feb 2025). Source: OMI, Immobiliare.it, FIAIP, Nomisma. Return projections per operation are reserved for the information memorandum.',
      seeAllZones: 'View all neighborhoods'
    }
  };

  const t = texts[lang];
  const zonesIndexPath = lang === 'en' ? '/investors/zones' : '/investitori/zone';

  // Schema.org for investment — return values intentionally omitted (public surface)
  const investmentSchema = {
    "@context": "https://schema.org",
    "@type": "InvestmentOrDeposit",
    "name": zone.seo[lang].title,
    "description": zone.seo[lang].description,
    "url": `https://junglerent.it${lang === 'en' ? '/investors/zones' : '/investitori/zone'}/${zone.slug}`,
    "amount": {
      "@type": "MonetaryAmount",
      "minValue": zone.pricePerSqm.min * 50, // Approximate min investment
      "currency": "EUR"
    },
    "areaServed": {
      "@type": "Place",
      "name": `${zone.name}, Torino`,
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": zone.coordinates.lat,
        "longitude": zone.coordinates.lng
      }
    },
    "provider": {
      "@type": "Organization",
      "name": "Jungle Rent S.r.l.",
      "url": "https://junglerent.it"
    }
  };

  const breadcrumbItems = [
    { 
      label: lang === 'it' ? 'Investitori' : 'Investors', 
      href: lang === 'en' ? '/investors' : '/investitori' 
    },
    { 
      label: lang === 'it' ? 'Zone' : 'Zones', 
      href: zonesIndexPath 
    },
    { label: zone.name }
  ];

  return (
    <main role="main" className="min-h-screen bg-background" id="main-content" tabIndex={-1}>
      <Helmet>
        <title>{zone.seo[lang].title}</title>
        <meta name="description" content={zone.seo[lang].description} />
        <meta name="keywords" content={zone.seo[lang].keywords.join(', ')} />
        <link rel="canonical" href={`https://junglerent.it${lang === 'en' ? '/investors/zones' : '/investitori/zone'}/${zone.slug}`} />
        <link rel="alternate" hrefLang="it" href={`https://junglerent.it/investitori/zone/${zone.slug}`} />
        <link rel="alternate" hrefLang="en" href={`https://junglerent.it/investors/zones/${zone.slug}`} />
        <link rel="alternate" hrefLang="x-default" href={`https://junglerent.it/investitori/zone/${zone.slug}`} />
        <script type="application/ld+json">{JSON.stringify(investmentSchema)}</script>
      </Helmet>

      <Navigation />

      {/* Hero with image */}
      <section className="relative pt-20 md:pt-24">
        {/* Background image */}
        <div className="absolute inset-0 h-[50vh] md:h-[60vh]">
          <img 
            src={zone.image} 
            alt={zone.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-background" />
        </div>

        <div className="relative z-10 container px-6">
          {/* Breadcrumbs */}
          <div className="pt-8">
            <Breadcrumbs items={breadcrumbItems} />
          </div>

          {/* Back link */}
          <Link 
            to={zonesIndexPath}
            className="inline-flex items-center gap-2 text-sm text-white/80 hover:text-white mt-4 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            {t.backToZones}
          </Link>

          {/* Title section */}
          <div className="pt-8 pb-32 md:pb-40">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="secondary" className="bg-white/20 text-white border-0">
                {zone.zone}
              </Badge>
              {isHighGrowth && (
                <Badge className="bg-primary text-primary-foreground">
                  {trendIcon} {trendLabel}
                </Badge>
              )}
              {zone.urbanRenewal.active && (
                <Badge className="bg-amber-500 text-white border-0">
                  <Hammer className="w-3 h-3 mr-1" />
                  {lang === 'it' ? 'Riqualificazione' : 'Renewal'}
                </Badge>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-4">
              {zone.name}
            </h1>

            <div className="flex items-center gap-2 text-white/80">
              <MapPin className="w-4 h-4" />
              <span>Torino, Italia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Metrics Cards - overlapping hero */}
      <section className="relative z-20 -mt-20 md:-mt-24 pb-12">
        <div className="container px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <ZoneMetricCard 
              icon={Building2}
              value={`€${formatPrice(zone.pricePerSqm.avg)}`}
              label={`${t.pricePerSqm}/m²`}
              size="md"
            />
            <ZoneMetricCard 
              icon={AlertTriangle}
              value={`${zone.vacancyRate.min}-${zone.vacancyRate.max}%`}
              label={t.vacancy}
              size="md"
            />
            <ZoneMetricCard 
              icon={TrendingUp}
              value={`+${zone.variation2024}%`}
              label={t.trend}
              variant={zone.variation2024 >= 5 ? 'highlight' : 'default'}
              size="md"
            />
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 md:py-16">
        <div className="container px-6">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Demand & Risk */}
            <Card className="p-6 md:p-8 rounded-xl border-border/20">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Target className="w-5 h-5 text-primary" />
                {t.demandTitle}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{t.demandLevel}</p>
                  </div>
                  <p className="text-xl font-bold text-foreground">{demandLabel}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <Clock className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{t.rentingTime}</p>
                  </div>
                  <p className="text-xl font-bold text-foreground">{zone.rentingTime[lang]}</p>
                </div>
                <div className="p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm text-muted-foreground">{t.vacancy}</p>
                  </div>
                  <p className="text-xl font-bold text-foreground">
                    {zone.vacancyRate.min}-{zone.vacancyRate.max}%
                  </p>
                </div>
              </div>
              <div className="mt-6">
                <p className="text-sm text-muted-foreground mb-2">{t.targetTenant}</p>
                <div className="flex flex-wrap gap-2">
                  {zone.targetTenant[lang].map((tenant, idx) => (
                    <Badge key={idx} variant="secondary">{tenant}</Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Urban Renewal (if active) */}
            {zone.urbanRenewal.active && zone.urbanRenewal.projects.length > 0 && (
              <Card className="p-6 md:p-8 rounded-xl border-amber-500/30 bg-amber-500/5">
                <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                  <Hammer className="w-5 h-5 text-amber-600" />
                  {t.renewalTitle}
                </h2>
                <div className="space-y-4">
                  {zone.urbanRenewal.projects.map((project, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-background/80 border border-border/20">
                      <h3 className="font-semibold text-foreground mb-2">{project.name}</h3>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">{t.investmentLabel}</p>
                          <p className="font-medium text-foreground">{project.investment}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">{t.impactLabel}</p>
                          <p className="font-medium text-amber-600">{project.impact[lang]}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Investor Note */}
            <Card className="p-6 md:p-8 rounded-xl border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Percent className="w-5 h-5 text-primary" />
                {t.noteTitle}
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                {zone.investorNote[lang]}
              </p>
            </Card>

            {/* Compare with other zones */}
            <Card className="p-6 md:p-8 rounded-xl border-border/20">
              <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <GitCompare className="w-5 h-5 text-primary" />
                {lang === 'it' ? 'Confronta con altri quartieri' : 'Compare with other neighborhoods'}
              </h2>
              <ZoneComparisonTool 
                lang={lang}
                preselectedZones={[zone.id]}
                embedded
              />
            </Card>

            {/* Disclaimer */}
            <p className="text-xs text-muted-foreground text-center">
              {t.disclaimer}
            </p>

          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-muted/30 border-t border-border/20">
        <div className="container px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-3 text-foreground">
              {t.ctaTitle}
            </h2>
            <p className="text-muted-foreground mb-8">
              {t.ctaSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={handleWhatsApp}
                size="lg"
                variant="premium"
                className="px-8 py-6 text-lg group shadow-xl"
              >
                <MessageCircle className="mr-2 w-5 h-5" />
                {t.ctaButton}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                asChild
                size="lg"
                variant="outline"
                className="px-8 py-6 text-lg"
              >
                <Link to={zonesIndexPath}>
                  {t.seeAllZones}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </main>
  );
};

export default InvestorZonePage;
