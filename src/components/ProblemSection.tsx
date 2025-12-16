import { useTranslation } from "react-i18next";
import { AlertTriangle, Users, Building2, TrendingUp, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export const ProblemSection = () => {
  const { t } = useTranslation();

  const stats = [
    {
      value: "589K",
      label: t('problem.stat1Label', 'studenti fuori sede'),
      sublabel: t('problem.stat1Sub', 'in Italia'),
      icon: Users,
    },
    {
      value: "87%",
      label: t('problem.stat2Label', 'cerca alloggio'),
      sublabel: t('problem.stat2Sub', 'nel privato'),
      icon: Building2,
    },
    {
      value: "12.6%",
      label: t('problem.stat3Label', 'domanda coperta'),
      sublabel: t('problem.stat3Sub', 'da housing dedicato'),
      icon: AlertTriangle,
    },
    {
      value: "€4B",
      label: t('problem.stat4Label', 'mercato potenziale'),
      sublabel: t('problem.stat4Sub', 'in Italia'),
      icon: TrendingUp,
    },
  ];

  return (
    <section className="py-16 md:py-24 lg:py-32 bg-background relative">
      <div className="container px-6 md:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-sm font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span>{t('problem.badge', 'Il problema')}</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-6 leading-tight">
              {t('problem.title', 'La crisi degli alloggi studenteschi in Italia')}
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t('problem.subtitle', 'Quasi 600.000 studenti cercano casa ogni anno, ma l\'offerta di alloggi dedicati copre solo il 12,6% della domanda. Una crisi che rappresenta un\'opportunità.')}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                  {stat.value}
                </div>
                <div className="text-sm md:text-base text-muted-foreground">
                  {stat.label}
                </div>
                <div className="text-xs text-muted-foreground/70">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>

          {/* Source & CTA */}
          <div className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              *{t('problem.source', 'Dati 2025 - Fonte: Savills Research, Student Housing Italy Spotlight')}
            </p>
            <Link to="/blog/student-housing-italia-savills-2025">
              <Button variant="outline" className="group">
                {t('problem.cta', 'Leggi il report completo')}
                <ExternalLink className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
