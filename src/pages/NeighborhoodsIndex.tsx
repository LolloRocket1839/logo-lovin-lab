import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Navigation, Footer, BottomNav } from "@/components/layout";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { ScrollToTop } from "@/components/ScrollToTop";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OptimizedImage } from "@/components/OptimizedImage";
import { neighborhoods } from "@/data/neighborhoods";
import { Link } from "react-router-dom";
import { Euro, Shield, Users, ArrowRight } from "lucide-react";

const NeighborhoodsIndex = () => {
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith('it');
  const lang = isItalian ? 'it' : 'en';

  const title = isItalian 
    ? "Affitto stanza Torino 2026 | Tutti i quartieri con prezzi"
    : "Room for rent Turin 2026 | All neighborhoods with prices";
  
  const description = isItalian
    ? "Trova la stanza ideale a Torino. Guida completa ai 10 migliori quartieri per studenti: prezzi, trasporti, sicurezza. Da €180/mese."
    : "Find your ideal room in Turin. Complete guide to the 10 best neighborhoods for students: prices, transport, safety. From €180/month.";

  const canonicalUrl = "https://junglerent.it/affitto-stanza-torino";

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": isItalian ? "Quartieri di Torino per studenti" : "Turin neighborhoods for students",
    "description": description,
    "numberOfItems": neighborhoods.length,
    "itemListElement": neighborhoods.map((n, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": n.name,
      "url": `https://junglerent.it/affitto-stanza-torino/${n.slug}`
    }))
  };

  // Sort by price (lowest first)
  const sortedNeighborhoods = [...neighborhoods].sort(
    (a, b) => a.avgRent.double.min - b.avgRent.double.min
  );

  return (
    <main role="main" className="min-h-screen">
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="affitto stanza torino, stanza studenti torino, camera torino, affitto torino studenti, room rent turin, student room turin" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Hreflang */}
        <link rel="alternate" hrefLang="it" href={canonicalUrl} />
        <link rel="alternate" hrefLang="en" href={canonicalUrl} />
        <link rel="alternate" hrefLang="x-default" href={canonicalUrl} />
        
        {/* Geo targeting */}
        <meta name="geo.region" content="IT-21" />
        <meta name="geo.placename" content="Torino" />
        <meta name="geo.position" content="45.0703;7.6869" />
        
        {/* Open Graph */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content={isItalian ? "it_IT" : "en_US"} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        
        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>
      
      <Navigation />
      
      <div className="pt-16">
        <Breadcrumbs
          items={[
            { label: isItalian ? 'Affitto stanze Torino' : 'Rooms Turin' }
          ]}
        />
        
        {/* Hero */}
        <section className="py-12 md:py-16 px-4 bg-gradient-to-b from-muted/50 to-background">
          <div className="container mx-auto max-w-6xl text-center">
            <Badge variant="secondary" className="mb-4">
              {isItalian ? '10 quartieri • Prezzi 2026' : '10 neighborhoods • 2026 prices'}
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {isItalian 
                ? 'Affitto stanza a Torino per studenti'
                : 'Room for rent in Turin for students'}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {isItalian
                ? 'Guida completa ai migliori quartieri per studenti universitari. Confronta prezzi, trasporti, sicurezza e vita notturna.'
                : 'Complete guide to the best neighborhoods for university students. Compare prices, transport, safety and nightlife.'}
            </p>
          </div>
        </section>
        
        {/* Quick Price Comparison */}
        <section className="py-8 px-4 bg-primary/5 border-y">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-xl font-bold mb-4 text-center">
              {isItalian ? '💰 Confronto prezzi rapido' : '💰 Quick price comparison'}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">{isItalian ? 'Quartiere' : 'Neighborhood'}</th>
                    <th className="text-center py-2">{isItalian ? 'Singola' : 'Single'}</th>
                    <th className="text-center py-2">{isItalian ? 'Doppia' : 'Shared'}</th>
                    <th className="text-center py-2">{isItalian ? 'Sicurezza' : 'Safety'}</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedNeighborhoods.map(n => (
                    <tr key={n.slug} className="border-b hover:bg-muted/50">
                      <td className="py-2">
                        <Link 
                          to={`/affitto-stanza-torino/${n.slug}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {n.name}
                        </Link>
                      </td>
                      <td className="text-center py-2">€{n.avgRent.single.min}-{n.avgRent.single.max}</td>
                      <td className="text-center py-2 font-semibold">€{n.avgRent.double.min}-{n.avgRent.double.max}</td>
                      <td className="text-center py-2">{'⭐'.repeat(n.safety)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        
        {/* Neighborhood Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-2xl font-bold mb-8">
              {isItalian ? 'Esplora i quartieri' : 'Explore neighborhoods'}
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {neighborhoods.map(neighborhood => (
                <Link
                  key={neighborhood.slug}
                  to={`/affitto-stanza-torino/${neighborhood.slug}`}
                  className="group"
                >
                  <Card className="overflow-hidden h-full hover:border-primary/50 transition-colors">
                    <div className="aspect-video relative overflow-hidden">
                      <OptimizedImage
                        src={neighborhood.image}
                        alt={neighborhood.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge 
                        className="absolute top-3 left-3"
                        variant="secondary"
                      >
                        {neighborhood.zone}
                      </Badge>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {neighborhood.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {neighborhood.description[lang]}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-1">
                          <Euro className="w-4 h-4 text-primary" />
                          <span className="font-semibold">
                            €{neighborhood.avgRent.double.min}+
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Shield className="w-4 h-4 text-muted-foreground" />
                          <span>{neighborhood.safety}/5</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-muted-foreground" />
                          <span>{neighborhood.studentDensity}/5</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 flex items-center text-primary text-sm font-medium">
                        {isItalian ? 'Scopri di più' : 'Learn more'}
                        <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 px-4 bg-muted/30">
          <div className="container mx-auto max-w-4xl">
            <h2 className="text-2xl font-bold mb-8 text-center">
              {isItalian ? 'Domande frequenti' : 'Frequently asked questions'}
            </h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">
                  {isItalian 
                    ? 'Qual è il quartiere più economico per studenti a Torino?'
                    : 'What is the cheapest neighborhood for students in Turin?'}
                </h3>
                <p className="text-muted-foreground">
                  {isItalian
                    ? 'Aurora è il quartiere più economico, con stanze doppie a partire da €180/mese. Campidoglio e San Paolo offrono buoni prezzi (€200-210) in zone più tranquille.'
                    : 'Aurora is the cheapest neighborhood, with shared rooms from €180/month. Campidoglio and San Paolo offer good prices (€200-210) in quieter areas.'}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">
                  {isItalian 
                    ? 'Qual è il quartiere più sicuro per studentesse?'
                    : 'What is the safest neighborhood for female students?'}
                </h3>
                <p className="text-muted-foreground">
                  {isItalian
                    ? 'Crocetta, San Paolo, Santa Rita e Cit Turin hanno valutazione sicurezza 5/5. Sono quartieri residenziali tranquilli con buona illuminazione.'
                    : 'Crocetta, San Paolo, Santa Rita and Cit Turin have a 5/5 safety rating. They are quiet residential neighborhoods with good lighting.'}
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-2">
                  {isItalian 
                    ? 'Dove vivere vicino al Politecnico di Torino?'
                    : 'Where to live near Politecnico di Torino?'}
                </h3>
                <p className="text-muted-foreground">
                  {isItalian
                    ? 'Crocetta è il quartiere ideale (5 min a piedi). Cenisia e San Salvario sono alternative più economiche a 10-15 minuti.'
                    : 'Crocetta is the ideal neighborhood (5 min walk). Cenisia and San Salvario are more affordable alternatives at 10-15 minutes.'}
                </p>
              </div>
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

export default NeighborhoodsIndex;
