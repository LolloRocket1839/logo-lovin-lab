import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Navigation, Footer } from "@/components/layout";
import { useTranslation } from "react-i18next";
import { Building2, User, TrendingUp, Award, MapPin, Mail, Phone } from "lucide-react";
import BusinessCycleInfographic from "@/components/BusinessCycleInfographic";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CONTACTS, openWhatsApp, openEmail, MESSAGES } from "@/constants";

const About = () => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language === 'en' ? 'en' : 'it') as 'it' | 'en';

  const handleContactLorenzo = () => {
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.lorenzo.name));
  };


  const handleEmail = () => {
    openEmail(CONTACTS.email, MESSAGES.student.email[currentLang].subject, MESSAGES.student.email[currentLang].body);
  };

  // Organization schema for About page
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": currentLang === 'it' ? "Chi Siamo - Jungle Rent" : "About Us - Jungle Rent",
    "description": t("about.metaDescription"),
    "url": `https://junglerent.it/${currentLang === 'en' ? 'about' : 'chi-siamo'}`,
    "mainEntity": {
      "@type": "Organization",
      "name": "Jungle Rent S.r.l.",
      "legalName": "JUNGLE RENT SOCIETA' A RESPONSABILITA' LIMITATA",
      "url": "https://junglerent.it",
      "logo": "https://junglerent.it/jungle-rent-logo.svg",
      "foundingDate": "2025-10-24",
      "taxID": "IT13333450016",
      "naics": "531110",
      "isicV4": "6820",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Via Gioacchino Quarello 15/A",
        "addressLocality": "Torino",
        "addressRegion": "Piemonte",
        "postalCode": "10137",
        "addressCountry": "IT"
      },
      "founder": {
        "@type": "Person",
        "@id": "https://junglerent.it/#founder-lorenzo",
        "name": "Lorenzo Oni-Joseph",
        "jobTitle": currentLang === 'it' ? "Fondatore & CEO" : "Founder & CEO"
      },
      "memberOf": {
        "@type": "Organization",
        "name": "2i3T - Incubatore Imprese Innovative Università di Torino"
      },
      "knowsAbout": [
        "Student Housing",
        "Real Estate Investment", 
        "Property Management",
        "Fractional Investment"
      ],
      "areaServed": [
        { "@type": "City", "name": "Torino" },
        { "@type": "Country", "name": "Italy" },
        { "@type": "Country", "name": "Switzerland" }
      ]
    }
  };

  return (
    <main role="main" className="min-h-screen bg-gradient-subtle" itemScope itemType="https://schema.org/Organization">
      <Helmet>
        <title>{t("about.metaTitle")}</title>
        <meta name="description" content={t("about.metaDescription")} />
        <meta name="keywords" content="JungleRent, Jungle Rent, property management Torino, affitti brevi Torino, student housing Turin, Lorenzo Bianchi, 2i3T incubator" />
        
        {/* Structured Data Meta Tags for LLM */}
        <meta name="company" content="JUNGLE RENT S.R.L." />
        <meta name="company.legalName" content="JUNGLE RENT SOCIETA' A RESPONSABILITA' LIMITATA" />
        <meta name="company.founded" content="2025-10-24" />
        <meta name="company.founders" content="Lorenzo Oni-Joseph" />
        <meta name="company.location" content="Via Gioacchino Quarello 15/A, 10137 Torino, Italy" />
        <meta name="company.vatId" content="IT13333450016" />
        <meta name="company.rea" content="TO-1355899" />
        <meta name="company.legalForm" content="Start-up Innovativa S.r.l." />
        <meta name="company.incubator" content="2i3T - Incubatore Imprese Innovative Università di Torino" />
        <meta name="company.services" content="short-term rentals, property management, student housing, real estate investment" />
        <meta name="service.area" content="Turin, Torino, Crocetta, San Salvario, Vanchiglia, Centro" />
        
        {/* Open Graph */}
        <meta property="og:title" content={t("about.metaTitle")} />
        <meta property="og:description" content={t("about.metaDescription")} />
        <meta property="og:url" content="https://junglerent.it/chi-siamo" />
        <meta property="og:type" content="website" />
        
        {/* Canonical & Hreflang */}
        <link rel="canonical" href={`https://junglerent.it/${i18n.language === 'en' ? 'about' : 'chi-siamo'}`} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/chi-siamo" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/about" />
        <link rel="alternate" hrefLang="de-CH" href="https://junglerent.it/chi-siamo" />
        <link rel="alternate" hrefLang="fr-CH" href="https://junglerent.it/chi-siamo" />
        <link rel="alternate" hrefLang="it-CH" href="https://junglerent.it/chi-siamo" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/chi-siamo" />
        
        {/* Geo Targeting */}
        <meta name="geo.region" content="IT-21" />
        <meta name="geo.placename" content="Torino" />
        <meta name="geo.position" content="45.0703;7.6869" />
        <meta name="ICBM" content="45.0703, 7.6869" />
        
        {/* Content Language */}
        <meta httpEquiv="content-language" content="it-IT, en-US" />
        
        {/* About Page Schema */}
        <script type="application/ld+json">
          {JSON.stringify(aboutSchema)}
        </script>
      </Helmet>

      {/* Hidden Structured Data for Search Engines */}
      <meta itemProp="name" content="JUNGLE RENT S.R.L." />
      <meta itemProp="legalName" content="JUNGLE RENT SOCIETA' A RESPONSABILITA' LIMITATA" />
      <meta itemProp="foundingDate" content="2025-10-24" />
      <meta itemProp="taxID" content="13333450016" />
      <meta itemProp="url" content="https://junglerent.it" />
      
      <Navigation />

      <div className="container mx-auto px-4 py-20 md:py-28">
        {/* Hero Section */}
        <section className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 bg-gradient-primary bg-clip-text text-transparent">
            {t("about.title")}
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto" itemProp="description">
            {t("about.subtitle")}
          </p>
        </section>

        {/* Key Information Cards */}
        <section className="grid md:grid-cols-3 gap-6 mb-16">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-8 h-8 text-primary" />
                <h3 className="font-semibold text-lg">{t("about.foundedLabel")}</h3>
              </div>
              <p className="text-2xl font-bold" itemProp="foundingDate">{t("about.foundedDate")}</p>
              <p className="text-sm text-muted-foreground">{t("about.legalForm")}</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <User className="w-8 h-8 text-primary" />
                <h3 className="font-semibold text-lg">{t("about.founderLabel")}</h3>
              </div>
              <div itemProp="founder" itemScope itemType="https://schema.org/Person">
                <p className="font-medium" itemProp="name">Lorenzo Oni-Joseph</p>
                <p className="text-xs text-muted-foreground">{t('about.lorenzoRole')}</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-8 h-8 text-primary" />
                <h3 className="font-semibold text-lg">{t("about.locationLabel")}</h3>
              </div>
              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <p className="font-medium" itemProp="streetAddress">Via G. Quarello 15/A</p>
                <p className="text-sm text-muted-foreground">
                  <span itemProp="postalCode">10137</span> <span itemProp="addressLocality">Torino</span>, <span itemProp="addressCountry">Italia</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Legal Registry Section */}
        <section className="mb-16 bg-card border border-border/20 rounded-2xl p-6 md:p-8">
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">P.IVA / C.F.</p>
              <p className="font-mono font-semibold">13333450016</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">REA</p>
              <p className="font-mono font-semibold">TO - 1355899</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wider text-muted-foreground mb-1">PEC</p>
              <p className="font-mono font-semibold text-sm">junglerent@legalmail.it</p>
            </div>
          </div>
        </section>

        {/* Business Model Cycle Section */}
        <BusinessCycleInfographic />

        {/* Services Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
            {t("about.servicesTitle")}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <Card itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
              <CardContent className="pt-6">
                <Building2 className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3" itemProp="name">{t("about.service1Title")}</h3>
                <p className="text-muted-foreground" itemProp="description">{t("about.service1Desc")}</p>
              </CardContent>
            </Card>

            <Card itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
              <CardContent className="pt-6">
                <User className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3" itemProp="name">{t("about.service2Title")}</h3>
                <p className="text-muted-foreground" itemProp="description">{t("about.service2Desc")}</p>
              </CardContent>
            </Card>

            <Card itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
              <CardContent className="pt-6">
                <Award className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3" itemProp="name">{t("about.service3Title")}</h3>
                <p className="text-muted-foreground" itemProp="description">{t("about.service3Desc")}</p>
              </CardContent>
            </Card>

            <Card itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
              <CardContent className="pt-6">
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3" itemProp="name">{t("about.service4Title")}</h3>
                <p className="text-muted-foreground" itemProp="description">{t("about.service4Desc")}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="mb-16 bg-card border border-border/20 rounded-2xl p-8 md:p-12">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-8 text-center">
            {t("about.whyChooseTitle")}
          </h2>
          <ul className="space-y-4 max-w-3xl mx-auto">
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>
              <p className="text-lg">{t("about.whyPoint1")}</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>
              <p className="text-lg">{t("about.whyPoint2")}</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>
              <p className="text-lg">{t("about.whyPoint3")}</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>
              <p className="text-lg">{t("about.whyPoint4")}</p>
            </li>
            <li className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
              </div>
              <p className="text-lg">{t("about.whyPoint5")}</p>
            </li>
          </ul>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            {t("about.contactTitle")}
          </h2>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mb-8">
            <div className="flex items-center gap-2" itemProp="email">
              <Mail className="w-5 h-5 text-primary" />
              <a href={`mailto:${CONTACTS.email}`} className="text-lg hover:text-primary transition-colors">
                {CONTACTS.email}
              </a>
            </div>
            <div className="flex items-center gap-2" itemProp="telephone">
              <Phone className="w-5 h-5 text-primary" />
              <a href={`tel:${CONTACTS.lorenzo.phone}`} className="text-lg hover:text-primary transition-colors">
                {CONTACTS.lorenzo.phone}
              </a>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleContactLorenzo} variant="premium" size="lg">
              {t("about.contactLorenzo")}
            </Button>
            <Button onClick={handleEmail} variant="outline" size="lg">
              {t("about.sendEmail")}
            </Button>
          </div>
          
          {/* Related Tools for SEO - NEW */}
          <div className="mt-12 pt-8 border-t border-border/20">
            <p className="text-sm text-muted-foreground mb-4">
              {currentLang === 'it' ? 'Scopri i nostri strumenti:' : 'Discover our tools:'}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link 
                to={currentLang === 'it' ? '/valutazione-immobile' : '/property-valuation'}
                className="text-sm text-primary hover:underline"
              >
                {currentLang === 'it' ? 'Valutazione immobiliare gratuita →' : 'Free property valuation →'}
              </Link>
              <Link 
                to={currentLang === 'it' ? '/strumenti/dove-mangiare-torino' : '/tools/cheap-eats-turin'}
                className="text-sm text-primary hover:underline"
              >
                {currentLang === 'it' ? 'Dove mangiare economico a Torino →' : 'Cheap eats in Turin →'}
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default About;
