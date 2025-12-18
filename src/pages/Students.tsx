import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Building2, Users, Mail, ArrowRight, BookOpen, Home, Bus, Utensils, Train, Calculator, Zap, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";
import { toast } from "sonner";
import { blogPosts } from "@/data/blog/posts";

const Students = () => {
  const { t, i18n } = useTranslation();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const currentLang = i18n.language?.startsWith('it') ? 'it' : 'en';

  // Filter student-category blog posts (expanded to include more)
  const studentPosts = blogPosts
    .filter(post => post.category === 'students')
    .slice(0, 12);

  // Group by topic for resource sections
  const resourceCategories = [
    {
      icon: MapPin,
      titleKey: "students.resources.neighborhoods",
      posts: studentPosts.filter(p => 
        p.slug.includes('vivere') || p.slug.includes('quartieri') || p.slug.includes('salvario')
      )
    },
    {
      icon: Building2,
      titleKey: "students.resources.universities",
      posts: studentPosts.filter(p => 
        p.slug.includes('politecnico') || p.slug.includes('universita')
      )
    },
    {
      icon: BookOpen,
      titleKey: "students.resources.studySpaces",
      posts: studentPosts.filter(p => 
        p.slug.includes('aule-studio')
      )
    },
    {
      icon: Train,
      titleKey: "students.resources.mobility",
      posts: studentPosts.filter(p => 
        p.slug.includes('mobilita') || p.slug.includes('sostenibile')
      )
    },
    {
      icon: Utensils,
      titleKey: "students.resources.dailyLife",
      posts: studentPosts.filter(p => 
        p.slug.includes('mangiare') || p.slug.includes('gelaterie') || p.slug.includes('raccolta')
      )
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    try {
      const response = await fetch("https://formspree.io/f/xeojbzow", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          _subject: `🎓 STUDENT WAITLIST - Jungle Rent - ${email}`,
          type: "student_waitlist",
          language: currentLang,
          timestamp: new Date().toISOString()
        })
      });

      if (response.ok) {
        toast.success(t("students.waitlist.success"));
        setEmail("");
      } else {
        toast.error(t("students.waitlist.error"));
      }
    } catch {
      toast.error(t("students.waitlist.error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>{t("students.seo.title")}</title>
        <meta name="description" content={t("students.seo.description")} />
        <meta name="keywords" content="affitti studenti torino, casa studenti politecnico, appartamenti universitari torino, student housing turin" />
        <link rel="canonical" href="https://junglerent.com/studenti" />
        <meta property="og:title" content={t("students.seo.title")} />
        <meta property="og:description" content={t("students.seo.description")} />
        <meta property="og:type" content="website" />
      </Helmet>

      <Navigation />

      <main className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-background to-background" />
          
          <div className="container relative mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                <GraduationCap className="w-3 h-3 mr-1" />
                {t("students.badge")}
              </Badge>
              
              <h1 className="text-3xl md:text-5xl font-extrabold text-foreground mb-4">
                {t("students.hero.title")}
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {t("students.hero.subtitle")}
              </p>

              {/* Waitlist Form */}
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder={t("students.waitlist.placeholder")}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "..." : t("students.waitlist.button")}
                </Button>
              </form>

              <p className="text-sm text-muted-foreground">
                {t("students.waitlist.note")}
              </p>
            </div>
          </div>
        </section>

        {/* Tools Section - NEW */}
        <section className="py-12 bg-accent/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <Badge variant="outline" className="mb-3 text-primary border-primary/30">
                <Sparkles className="w-3 h-3 mr-1" />
                {currentLang === 'it' ? 'Strumenti gratuiti' : 'Free tools'}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                {currentLang === 'it' ? 'Strumenti utili per studenti' : 'Useful tools for students'}
              </h2>
              <p className="text-muted-foreground">
                {currentLang === 'it' 
                  ? 'Risorse pratiche per aiutarti a pianificare la vita a Torino'
                  : 'Practical resources to help you plan your life in Turin'
                }
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 max-w-4xl mx-auto">
              {/* Budget Calculator */}
              <Link to="/studenti/strumenti/budget">
                <Card className="h-full hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Calculator className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {currentLang === 'it' ? 'Calcolatore Budget' : 'Budget Calculator'}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {currentLang === 'it' 
                        ? 'Scopri quanto costa vivere in ogni quartiere'
                        : 'Find out living costs in each neighborhood'
                      }
                    </p>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {currentLang === 'it' ? 'Prova ora' : 'Try now'}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Badge>
                  </CardContent>
                </Card>
              </Link>

              {/* Utility Comparator - Coming Soon */}
              <Card className="h-full opacity-75">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-muted-foreground" />
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {currentLang === 'it' ? 'Comparatore Bollette' : 'Utility Comparator'}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {currentLang === 'it' 
                      ? 'Confronta le tariffe di luce e gas'
                      : 'Compare electricity and gas rates'
                    }
                  </p>
                  <Badge variant="secondary">
                    {currentLang === 'it' ? 'Prossimamente' : 'Coming soon'}
                  </Badge>
                </CardContent>
              </Card>

              {/* All Tools Link */}
              <Link to="/studenti/strumenti">
                <Card className="h-full border-dashed hover:border-primary/50 transition-all cursor-pointer group">
                  <CardContent className="p-6 text-center flex flex-col items-center justify-center h-full">
                    <div className="w-12 h-12 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mx-auto mb-4 group-hover:border-primary/50 transition-colors">
                      <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {currentLang === 'it' ? 'Tutti gli strumenti' : 'All tools'}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {currentLang === 'it' 
                        ? 'Scopri tutti i tool gratuiti'
                        : 'Discover all free tools'
                      }
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Market Stats */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "90.000+", label: t("students.stats.students"), icon: Users },
                { value: "7", label: t("students.stats.universities"), icon: Building2 },
                { value: "9", label: t("students.stats.neighborhoods"), icon: MapPin },
                { value: "€300-500", label: t("students.stats.avgRent"), icon: Home }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-primary" />
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Hub */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                {t("students.resources.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("students.resources.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {resourceCategories.filter(cat => cat.posts.length > 0).map((category, i) => (
                <Card key={i} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <category.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="font-semibold text-foreground">
                        {t(category.titleKey)}
                      </h3>
                    </div>
                    <ul className="space-y-2">
                      {category.posts.map((post) => (
                        <li key={post.slug}>
                          <Link 
                            to={`/blog/${post.slug}`}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                          >
                            <ArrowRight className="w-3 h-3" />
                            {post.translations[currentLang].title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link to="/blog">
                <Button variant="outline">
                  {t("students.resources.viewAll")}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Investor CTA */}
        <section className="py-12 bg-primary/5">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-bold text-foreground mb-3">
              {t("students.investorCta.title")}
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              {t("students.investorCta.subtitle")}
            </p>
            <Link to="/#investitori">
              <Button>
                {t("students.investorCta.button")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
      <BottomNav />
    </>
  );
};

export default Students;
