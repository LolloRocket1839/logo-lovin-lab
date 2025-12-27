import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { GraduationCap, MapPin, Building2, Users, Mail, ArrowRight, BookOpen, Home, Bus, Utensils, Train, Calculator, Zap, Sparkles, Calendar, Sun, BadgeCheck, Check, X, MessageCircle } from "lucide-react";
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
      {/* IMPORTANT: Dynamic canonical based on current language for IT/EN routes */}
      <Helmet>
        <title>{t("students.seo.title")}</title>
        <meta name="description" content={t("students.seo.description")} />
        <meta name="keywords" content="affitti studenti torino, casa studenti politecnico, appartamenti universitari torino, student housing turin" />
        <link rel="canonical" href={`https://junglerent.it/${currentLang === 'en' ? 'students' : 'studenti'}`} />
        <link rel="alternate" hrefLang="it" href="https://junglerent.it/studenti" />
        <link rel="alternate" hrefLang="en" href="https://junglerent.it/students" />
        <link rel="alternate" hrefLang="x-default" href="https://junglerent.it/studenti" />
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
              <Badge variant="outline" className="mb-4 text-primary border-primary/20">
                <GraduationCap className="w-4 h-4 mr-2" />
                {t("students.badge")}
              </Badge>
              
              <h1 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
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

        {/* Why Jungle Rent Section */}
        <section className="py-16 md:py-24 bg-background border-t border-border/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground mb-4">
                {t("students.whyJungle.badge")}
              </p>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-3">
                {t("students.whyJungle.title")}
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                {t("students.whyJungle.subtitle")}
              </p>
            </div>

            {/* Benefit Cards */}
            <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-12">
              {/* 9-Month Contract */}
              <Card className="relative overflow-hidden rounded-xl hover:shadow-lg transition-shadow border-border/20 hover:border-primary/30">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {t("students.whyJungle.contract.title")}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {t("students.whyJungle.contract.description")}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    {t("students.whyJungle.contract.highlight")}
                  </p>
                </CardContent>
              </Card>

              {/* Summer Flexibility */}
              <Card className="relative overflow-hidden rounded-xl hover:shadow-lg transition-shadow border-border/20 ring-2 ring-primary/20">
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-bl-lg font-medium">
                  {t("students.whyJungle.summer.badge")}
                </div>
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Sun className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {t("students.whyJungle.summer.title")}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {t("students.whyJungle.summer.description")}
                  </p>
                  <a 
                    href="https://wa.me/393347818180?text=Ciao%20Lorenzo!%20Vorrei%20sapere%20di%20più%20sull'opzione%20estiva%20pay-per-use"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-primary font-medium hover:underline inline-flex items-center gap-1"
                  >
                    {t("students.whyJungle.summer.cta")}
                    <ArrowRight className="w-3 h-3" />
                  </a>
                </CardContent>
              </Card>

              {/* Zero Commissions */}
              <Card className="relative overflow-hidden rounded-xl hover:shadow-lg transition-shadow border-border/20 hover:border-primary/30">
                <CardContent className="p-6 md:p-8">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <BadgeCheck className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-bold text-lg text-foreground mb-2">
                    {t("students.whyJungle.commissions.title")}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-3">
                    {t("students.whyJungle.commissions.description")}
                  </p>
                  <p className="text-xs text-primary font-medium">
                    {t("students.whyJungle.commissions.highlight")}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Comparison */}
            <div className="max-w-3xl mx-auto mb-12">
              <Card className="overflow-hidden rounded-xl">
                <CardContent className="p-0">
                  <div className="grid md:grid-cols-2">
                    {/* Traditional */}
                    <div className="p-6 bg-destructive/5 border-r border-border">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                          <X className="w-4 h-4 text-destructive" />
                        </div>
                        <h4 className="font-semibold text-foreground">
                          {t("students.whyJungle.comparison.traditional.title")}
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {["months12", "paySummer", "noFlex", "commissions"].map((key) => (
                          <li key={key} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <X className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                            {t(`students.whyJungle.comparison.traditional.${key}`)}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Jungle Rent */}
                    <div className="p-6 bg-primary/5">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Check className="w-4 h-4 text-primary" />
                        </div>
                        <h4 className="font-semibold text-foreground">
                          {t("students.whyJungle.comparison.jungle.title")}
                        </h4>
                      </div>
                      <ul className="space-y-3">
                        {["months9", "payUse", "flex", "noCommissions"].map((key) => (
                          <li key={key} className="flex items-start gap-2 text-sm text-foreground">
                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                            {t(`students.whyJungle.comparison.jungle.${key}`)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* CTA */}
            <div className="text-center flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                onClick={() => {
                  const heroForm = document.querySelector('input[type="email"]');
                  heroForm?.scrollIntoView({ behavior: 'smooth' });
                  (heroForm as HTMLInputElement)?.focus();
                }}
                size="lg"
              >
                {t("students.whyJungle.cta.waitlist")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <a 
                href="https://wa.me/393347818180?text=Ciao%20Lorenzo!%20Vorrei%20sapere%20di%20più%20sul%20modello%20Jungle%20Rent%20per%20studenti"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" size="lg">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  {t("students.whyJungle.cta.whatsapp")}
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-16 md:py-24 bg-background border-t border-border/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground mb-4">
                {t("students.tools.badge")}
              </p>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-3">
                {t("students.tools.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("students.tools.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {/* Budget Calculator */}
              <Link to="/studenti/strumenti/budget">
                <Card className="h-full rounded-xl hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group border-border/20">
                  <CardContent className="p-6 md:p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Calculator className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {t("students.tools.budgetCalc.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("students.tools.budgetCalc.description")}
                    </p>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {t("students.tools.budgetCalc.cta")}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Badge>
                  </CardContent>
                </Card>
              </Link>

              {/* Grade Calculator - NEW */}
              <Link to="/studenti/strumenti/media">
                <Card className="h-full rounded-xl hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group border-border/20">
                  <CardContent className="p-6 md:p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <GraduationCap className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {t("students.tools.gradeCalc.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("students.tools.gradeCalc.description")}
                    </p>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {t("students.tools.gradeCalc.cta")}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Badge>
                  </CardContent>
                </Card>
              </Link>

              {/* Exam Session Planner */}
              <Link to="/studenti/strumenti/sessione">
                <Card className="h-full rounded-xl hover:shadow-lg hover:border-primary/30 transition-all cursor-pointer group border-border/20">
                  <CardContent className="p-6 md:p-8 text-center">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <Calendar className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {t("students.tools.examSession.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {t("students.tools.examSession.description")}
                    </p>
                    <Badge className="bg-primary/10 text-primary hover:bg-primary/20">
                      {t("students.tools.examSession.cta")}
                      <ArrowRight className="w-3 h-3 ml-1" />
                    </Badge>
                  </CardContent>
                </Card>
              </Link>

              {/* All Tools Link */}
              <Link to="/studenti/strumenti">
                <Card className="h-full rounded-xl border-dashed hover:border-primary/30 transition-all cursor-pointer group border-border/20">
                  <CardContent className="p-6 md:p-8 text-center flex flex-col items-center justify-center h-full">
                    <div className="w-12 h-12 rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center mx-auto mb-4 group-hover:border-primary/30 transition-colors">
                      <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-semibold text-foreground mb-2">
                      {t("students.tools.allTools.title")}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {t("students.tools.allTools.description")}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        {/* Market Stats */}
        <section className="py-16 md:py-24 border-t border-border/20">
          <div className="container mx-auto px-4">
            <p className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground text-center mb-8">
              {t("students.stats.label", "Turin at a Glance")}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {[
                { value: "90.000+", label: t("students.stats.students"), icon: Users },
                { value: "7", label: t("students.stats.universities"), icon: Building2 },
                { value: "9", label: t("students.stats.neighborhoods"), icon: MapPin },
                { value: "€300-500", label: t("students.stats.avgRent"), icon: Home }
              ].map((stat, i) => (
                <Card key={i} className="rounded-xl border-border/20 bg-card p-6 md:p-8 text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl md:text-3xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Resources Hub */}
        <section className="py-16 md:py-24 bg-background border-t border-border/20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <p className="text-xs uppercase tracking-[0.15em] font-medium text-muted-foreground mb-4">
                {t("students.resources.label", "Guides & Resources")}
              </p>
              <h2 className="text-2xl md:text-4xl font-display font-bold text-foreground mb-3">
                {t("students.resources.title")}
              </h2>
              <p className="text-muted-foreground">
                {t("students.resources.subtitle")}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {resourceCategories.filter(cat => cat.posts.length > 0).map((category, i) => (
                <Card key={i} className="rounded-xl hover:shadow-md transition-shadow border-border/20 hover:border-primary/30">
                  <CardContent className="p-6 md:p-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <category.icon className="w-6 h-6 text-primary" />
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
        <section className="py-16 md:py-24 bg-background border-t border-border/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-xl md:text-2xl font-display font-bold text-foreground mb-3">
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
