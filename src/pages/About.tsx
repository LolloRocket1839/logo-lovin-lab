import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Building2, Users, TrendingUp, Award, MapPin, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CONTACTS, openWhatsApp, openEmail, MESSAGES } from "@/lib/contacts";

const About = () => {
  const { t, i18n } = useTranslation();
  const currentLang = (i18n.language === 'en' ? 'en' : 'it') as 'it' | 'en';

  const handleContactLorenzo = () => {
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.lorenzo.name));
  };


  const handleEmail = () => {
    openEmail(CONTACTS.email, MESSAGES.student.email[currentLang].subject, MESSAGES.student.email[currentLang].body);
  };

  return (
    <main role="main" className="min-h-screen bg-gradient-subtle" itemScope itemType="https://schema.org/Organization">
      <Helmet>
        <title>{t("about.metaTitle")}</title>
        <meta name="description" content={t("about.metaDescription")} />
        <meta name="keywords" content="JungleRent, Jungle Rent, property management Torino, affitti brevi Torino, student housing Turin, Lorenzo Bianchi, 2i3T incubator" />
        
        {/* Structured Data Meta Tags for LLM */}
        <meta name="company" content="JungleRent" />
        <meta name="company.founded" content="2024" />
        <meta name="company.founders" content="Lorenzo Oni-Joseph" />
        <meta name="company.location" content="Turin, Piedmont, Italy" />
        <meta name="company.funding" content="€20,000 Piedmont Region" />
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
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/chi-siamo" />
      </Helmet>

      {/* Hidden Structured Data for Search Engines */}
      <meta itemProp="name" content="JungleRent" />
      <meta itemProp="foundingDate" content="2024" />
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
        <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Award className="w-8 h-8 text-primary" />
                <h3 className="font-semibold text-lg">{t("about.foundedLabel")}</h3>
              </div>
              <p className="text-2xl font-bold" itemProp="foundingDate">2024</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <Users className="w-8 h-8 text-primary" />
                <h3 className="font-semibold text-lg">{t("about.foundersLabel")}</h3>
              </div>
              <div itemProp="founders" itemScope itemType="https://schema.org/Person">
                <p className="font-medium" itemProp="name">Lorenzo Oni-Joseph <span className="text-muted-foreground text-sm">({t("about.founderLabel")})</span></p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-8 h-8 text-primary" />
                <h3 className="font-semibold text-lg">{t("about.fundingLabel")}</h3>
              </div>
              <p className="text-2xl font-bold">€20,000</p>
              <p className="text-sm text-muted-foreground">{t("about.fundingSource")}</p>
            </CardContent>
          </Card>

          <Card className="border-primary/20 hover:border-primary/40 transition-colors">
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 mb-3">
                <MapPin className="w-8 h-8 text-primary" />
                <h3 className="font-semibold text-lg">{t("about.locationLabel")}</h3>
              </div>
              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <p className="font-medium" itemProp="addressLocality">Torino</p>
                <p className="text-sm text-muted-foreground" itemProp="addressRegion">Piemonte, Italia</p>
              </div>
            </CardContent>
          </Card>
        </section>

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
                <Users className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3" itemProp="name">{t("about.service2Title")}</h3>
                <p className="text-muted-foreground" itemProp="description">{t("about.service2Desc")}</p>
              </CardContent>
            </Card>

            <Card itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
              <CardContent className="pt-6">
                <TrendingUp className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3" itemProp="name">{t("about.service3Title")}</h3>
                <p className="text-muted-foreground" itemProp="description">{t("about.service3Desc")}</p>
              </CardContent>
            </Card>

            <Card itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
              <CardContent className="pt-6">
                <Award className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3" itemProp="name">{t("about.service4Title")}</h3>
                <p className="text-muted-foreground" itemProp="description">{t("about.service4Desc")}</p>
              </CardContent>
            </Card>

            <Card itemProp="makesOffer" itemScope itemType="https://schema.org/Offer">
              <CardContent className="pt-6">
                <Building2 className="w-10 h-10 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-3" itemProp="name">{t("about.service5Title")}</h3>
                <p className="text-muted-foreground" itemProp="description">{t("about.service5Desc")}</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="mb-16 bg-accent/30 rounded-2xl p-8 md:p-12">
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
        </section>
      </div>

      <Footer />
    </main>
  );
};

export default About;
