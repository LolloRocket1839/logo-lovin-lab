import { useParams, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Navigation, Footer, BottomNav } from "@/components/layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/OptimizedImage";
import { getNeighborhoodBySlug, Neighborhood } from "@/data/neighborhoods";
import { 
  MapPin, Train, GraduationCap, Euro, Moon, Shield, TreePine, Users,
  ArrowRight, Clock, CheckCircle2
} from "lucide-react";
import { Link } from "react-router-dom";

const RatingBar = ({ value, max = 5, label }: { value: number; max?: number; label: string }) => (
  <div className="flex items-center gap-3">
    <span className="text-sm text-muted-foreground w-24">{label}</span>
    <div className="flex gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <div
          key={i}
          className={`w-4 h-4 rounded-sm ${i < value ? 'bg-primary' : 'bg-muted'}`}
        />
      ))}
    </div>
  </div>
);

const NeighborhoodPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const isItalian = i18n.language.startsWith('it');
  const lang = isItalian ? 'it' : 'en';
  
  const neighborhood = slug ? getNeighborhoodBySlug(slug) : undefined;
  
  if (!neighborhood) {
    return <Navigate to="/404" replace />;
  }

  const seo = neighborhood.seo[lang];
  const canonicalUrl = `https://junglerent.it/affitto-stanza-torino/${neighborhood.slug}`;

  // Schema.org structured data
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Place",
    "name": `${neighborhood.name}, Torino`,
    "description": neighborhood.description[lang],
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": neighborhood.coordinates.lat,
      "longitude": neighborhood.coordinates.lng
    },
    "containedInPlace": {
      "@type": "City",
      "name": "Torino",
      "addressCountry": "IT"
    }
  };

  const rentalListingSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": isItalian 
      ? `Stanze in affitto a ${neighborhood.name}, Torino` 
      : `Rooms for rent in ${neighborhood.name}, Turin`,
    "description": seo.description,
    "itemListElement": [
      {
        "@type": "Offer",
        "name": isItalian ? "Stanza singola" : "Single room",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": neighborhood.avgRent.single.min,
          "maxPrice": neighborhood.avgRent.single.max,
          "priceCurrency": "EUR",
          "unitText": isItalian ? "al mese" : "per month"
        }
      },
      {
        "@type": "Offer",
        "name": isItalian ? "Stanza doppia" : "Shared room",
        "priceSpecification": {
          "@type": "PriceSpecification",
          "price": neighborhood.avgRent.double.min,
          "maxPrice": neighborhood.avgRent.double.max,
          "priceCurrency": "EUR",
          "unitText": isItalian ? "al mese" : "per month"
        }
      }
    ]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://junglerent.it"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isItalian ? "Affitto stanze Torino" : "Rooms for rent Turin",
        "item": "https://junglerent.it/affitto-stanza-torino"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": neighborhood.name,
        "item": canonicalUrl
      }
    ]
  };

  return (
    <main role="main" className="min-h-screen">
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.description} />
        <meta name="keywords" content={seo.keywords.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang */}
        <link rel="alternate" hrefLang="it" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        
        {/* Geo targeting */}
        <meta name="geo.region" content="IT-21" />
        <meta name="geo.placename" content={`${neighborhood.name}, Torino`} />
        <meta name="geo.position" content={`${neighborhood.coordinates.lat};${neighborhood.coordinates.lng}`} />
        <meta name="ICBM" content={`${neighborhood.coordinates.lat}, ${neighborhood.coordinates.lng}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={`https://junglerent.it${neighborhood.image}`} />
        <meta property="og:locale" content={isItalian ? "it_IT" : "en_US"} />
        
        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.description} />
        
        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(rentalListingSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      
      <Navigation />
      
      <div className="pt-16">
        <Breadcrumbs
          items={[
            { 
              label: isItalian ? 'Affitto stanze Torino' : 'Rooms Turin', 
              href: '/affitto-stanza-torino' 
            },
            { label: neighborhood.name }
          ]}
        />
        
        {/* Hero Section */}
        <section className="relative h-[50vh] min-h-[400px] overflow-hidden">
          <OptimizedImage
            src={neighborhood.image}
            alt={`${neighborhood.name} - ${isItalian ? 'Quartiere di Torino' : 'Turin neighborhood'}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="container mx-auto max-w-6xl">
              <Badge variant="secondary" className="mb-3">
                {neighborhood.zone}
              </Badge>
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
                {isItalian 
                  ? `Affitto stanza ${neighborhood.name} Torino`
                  : `Room for rent ${neighborhood.name} Turin`}
              </h1>
              <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                {neighborhood.description[lang]}
              </p>
            </div>
          </div>
        </section>
        
        {/* Quick Stats */}
        <section className="py-8 bg-muted/30 border-b">
          <div className="container mx-auto max-w-6xl px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <Euro className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-primary">
                    €{neighborhood.avgRent.single.min}+
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isItalian ? 'Singola/mese' : 'Single/month'}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <Users className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-primary">
                    €{neighborhood.avgRent.double.min}+
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isItalian ? 'Doppia/mese' : 'Shared/month'}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-primary">
                    {neighborhood.safety}/5
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isItalian ? 'Sicurezza' : 'Safety'}
                  </p>
                </CardContent>
              </Card>
              
              <Card className="text-center p-4">
                <CardContent className="p-0">
                  <GraduationCap className="w-8 h-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold text-primary">
                    {neighborhood.studentDensity}/5
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {isItalian ? 'Studenti' : 'Students'}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* Main Content */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-3 gap-8">
              {/* Left Column - Details */}
              <div className="md:col-span-2 space-y-8">
                {/* Highlights */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-6 h-6 text-primary" />
                    {isItalian ? 'Punti di forza' : 'Highlights'}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.highlights[lang].map((highlight, idx) => (
                      <Badge key={idx} variant="outline" className="text-sm py-1 px-3">
                        {highlight}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Universities */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-primary" />
                    {isItalian ? 'Università vicine' : 'Nearby universities'}
                  </h2>
                  <ul className="space-y-2">
                    {neighborhood.universities.map((uni, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        {uni}
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Transport */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Train className="w-6 h-6 text-primary" />
                    {isItalian ? 'Trasporti' : 'Transport'}
                  </h2>
                  <div className="flex flex-wrap gap-2">
                    {neighborhood.transport.map((line, idx) => (
                      <Badge key={idx} variant="secondary" className="text-sm">
                        {line}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                {/* Student Profile */}
                <div>
                  <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-primary" />
                    {isItalian ? 'Profilo studente ideale' : 'Ideal student profile'}
                  </h2>
                  <p className="text-muted-foreground">
                    {neighborhood.studentProfile[lang]}
                  </p>
                </div>
                
                {/* Ratings */}
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    {isItalian ? 'Valutazioni' : 'Ratings'}
                  </h2>
                  <div className="space-y-3">
                    <RatingBar 
                      value={neighborhood.nightlife} 
                      label={isItalian ? 'Vita notturna' : 'Nightlife'} 
                    />
                    <RatingBar 
                      value={neighborhood.safety} 
                      label={isItalian ? 'Sicurezza' : 'Safety'} 
                    />
                    <RatingBar 
                      value={neighborhood.greenSpaces} 
                      label={isItalian ? 'Parchi' : 'Green spaces'} 
                    />
                    <RatingBar 
                      value={neighborhood.studentDensity} 
                      label={isItalian ? 'Studenti' : 'Students'} 
                    />
                  </div>
                </div>
              </div>
              
              {/* Right Column - CTA */}
              <div className="space-y-6">
                {/* Price Card */}
                <Card className="sticky top-24 border-primary/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-4">
                      {isItalian ? 'Prezzi medi 2026' : 'Average prices 2026'}
                    </h3>
                    
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center pb-3 border-b">
                        <span>{isItalian ? 'Stanza singola' : 'Single room'}</span>
                        <span className="font-bold text-primary">
                          €{neighborhood.avgRent.single.min} - €{neighborhood.avgRent.single.max}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>{isItalian ? 'Stanza doppia' : 'Shared room'}</span>
                        <span className="font-bold text-primary">
                          €{neighborhood.avgRent.double.min} - €{neighborhood.avgRent.double.max}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button asChild className="w-full" size="lg">
                        <Link to="/studenti">
                          {isItalian ? 'Iscriviti alla waitlist' : 'Join the waitlist'}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Link>
                      </Button>
                      
                      <p className="text-xs text-center text-muted-foreground">
                        {isItalian 
                          ? 'Jungle Rent sta arrivando! Iscriviti per essere tra i primi.'
                          : 'Jungle Rent is coming! Sign up to be among the first.'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Related Blog */}
                <Card>
                  <CardContent className="p-4">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {isItalian ? 'Guide correlate' : 'Related guides'}
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li>
                        <Link 
                          to="/blog/dove-vivere-torino-studenti-politecnico" 
                          className="text-primary hover:underline"
                        >
                          {isItalian 
                            ? '→ Dove vivere a Torino per studenti'
                            : '→ Where to live in Turin for students'}
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/blog/quartieri-sicuri-donne-torino" 
                          className="text-primary hover:underline"
                        >
                          {isItalian 
                            ? '→ Quartieri sicuri per donne'
                            : '→ Safe neighborhoods for women'}
                        </Link>
                      </li>
                      <li>
                        <Link 
                          to="/strumenti/aule-studio-torino" 
                          className="text-primary hover:underline"
                        >
                          {isItalian 
                            ? '→ Aule studio a Torino'
                            : '→ Study spaces in Turin'}
                        </Link>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Other Neighborhoods */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-6">
              {isItalian ? 'Altri quartieri a Torino' : 'Other neighborhoods in Turin'}
            </h2>
            <div className="flex flex-wrap gap-3">
              {['san-salvario', 'vanchiglia', 'crocetta', 'santa-rita', 'cenisia', 'cit-turin', 'campidoglio', 'aurora', 'lingotto', 'san-paolo']
                .filter(s => s !== slug)
                .map(otherSlug => (
                  <Link
                    key={otherSlug}
                    to={`/affitto-stanza-torino/${otherSlug}`}
                    className="px-4 py-2 bg-background rounded-full border hover:border-primary hover:text-primary transition-colors"
                  >
                    {otherSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                  </Link>
                ))}
            </div>
          </div>
        </section>
      </div>
      
      <div className="pb-16 lg:pb-0">
        <Footer />
      </div>
      <ScrollToTop />
      <BottomNav />
    </main>
  );
};

export default NeighborhoodPage;
