import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";
import { Home, BookOpen, GraduationCap, Building2, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const { i18n } = useTranslation();
  const currentLang = i18n.language?.startsWith('it') ? 'it' : 'en';

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const content = {
    it: {
      title: "404 - Pagina non trovata | Jungle Rent",
      heading: "Pagina non trovata",
      description: "La pagina che stai cercando non esiste o è stata spostata.",
      backHome: "Torna alla Home",
      usefulLinks: "Link utili",
      links: [
        { label: "Home", href: "/", icon: Home },
        { label: "Blog", href: "/blog", icon: BookOpen },
        { label: "Studenti", href: "/studenti", icon: GraduationCap },
        { label: "Investitori", href: "/investitori", icon: Building2 }
      ]
    },
    en: {
      title: "404 - Page Not Found | Jungle Rent",
      heading: "Page not found",
      description: "The page you're looking for doesn't exist or has been moved.",
      backHome: "Back to Home",
      usefulLinks: "Useful links",
      links: [
        { label: "Home", href: "/", icon: Home },
        { label: "Blog", href: "/blog", icon: BookOpen },
        { label: "Students", href: "/students", icon: GraduationCap },
        { label: "Investors", href: "/investors", icon: Building2 }
      ]
    }
  };

  const t = content[currentLang];

  return (
    <>
      {/* SEO: noindex to prevent soft 404, prerender-status-code for SSR */}
      <Helmet>
        <title>{t.title}</title>
        <meta name="robots" content="noindex, nofollow" />
        <meta name="prerender-status-code" content="404" />
        <meta name="googlebot" content="noindex, nofollow" />
      </Helmet>

      <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4">
        <div className="text-center max-w-md">
          {/* 404 Badge */}
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10">
            <span className="text-3xl font-bold text-primary">404</span>
          </div>

          <h1 className="mb-3 text-2xl md:text-3xl font-display font-bold text-foreground">
            {t.heading}
          </h1>
          
          <p className="mb-8 text-muted-foreground">
            {t.description}
          </p>

          {/* Primary CTA */}
          <Link to="/">
            <Button size="lg" className="gap-2 mb-8">
              <ArrowLeft className="w-4 h-4" />
              {t.backHome}
            </Button>
          </Link>

          {/* Useful Links */}
          <div className="pt-6 border-t border-border">
            <p className="text-sm text-muted-foreground mb-4">{t.usefulLinks}</p>
            <div className="flex flex-wrap justify-center gap-3">
              {t.links.map((link) => {
                const Icon = link.icon;
                return (
                  <Link key={link.href} to={link.href}>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Branding */}
          <p className="mt-8 text-xs text-muted-foreground">
            Jungle Rent © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </>
  );
};

export default NotFound;
