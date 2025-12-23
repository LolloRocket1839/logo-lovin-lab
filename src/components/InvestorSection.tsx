import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Users, Calendar, Heart, Target, AlertTriangle, TrendingUp, Building2, ExternalLink } from "lucide-react";
import { MESSAGES, openWhatsApp, CONTACTS } from "@/lib/contacts";
import { openCalendly } from "@/lib/calendly";
import { StyledText } from "@/components/StyledText";
import { Badge } from "@/components/ui/badge";
import { useWaitlistCounter } from "@/hooks/useWaitlistCounter";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { QuickInvestorLeadDialog } from "@/components/QuickInvestorLeadDialog";

export const InvestorSection = () => {
  const { t, i18n } = useTranslation();
  const [investDialogOpen, setInvestDialogOpen] = useState(false);
  const { count } = useWaitlistCounter();
  const prefersReducedMotion = useReducedMotion();

  const handleLorenzoWhatsApp = () => {
    const language = (i18n.language.startsWith('en') ? 'en' : 'it') as 'it' | 'en';
    const message = MESSAGES.investor.whatsapp[language]('Lorenzo');
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  // Problem stats from Savills report - shown only here, not duplicated elsewhere
  const problemStats = [
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
    <section 
      id="investor-section" 
      className="py-16 md:py-24 bg-background relative overflow-hidden"
    >
      
      <div className="container px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          
          {/* Problem Context Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-destructive/10 text-destructive text-xs uppercase tracking-[0.15em] font-medium mb-6">
              <AlertTriangle className="w-4 h-4" />
              <span>{t('problem.badge', 'Il problema')}</span>
            </div>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-display font-bold text-foreground mb-4 leading-tight">
              {t('problem.title', 'La crisi degli alloggi studenteschi in Italia')}
            </h2>
            
            <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto">
              {t('problem.subtitle', 'Quasi 600.000 studenti cercano casa ogni anno, ma l\'offerta di alloggi dedicati copre solo il 12,6% della domanda. Una crisi che rappresenta un\'opportunità.')}
            </p>
          </div>

          {/* Problem Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {problemStats.map((stat, index) => (
              <div 
                key={index}
                className="bg-card border border-border/20 rounded-xl p-6 md:p-8 text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-2xl md:text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-muted-foreground">
                  {stat.label}
                </div>
                <div className="text-[10px] md:text-xs text-muted-foreground">
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>

          {/* Source link */}
          <div className="text-center mb-12">
            <p className="text-xs text-muted-foreground mb-2">
              *{t('problem.source', 'Dati 2025 - Fonte: Savills Research, Student Housing Italy Spotlight')}
            </p>
            <Link 
              to="/blog/student-housing-italia-savills-2025"
              className="inline-flex items-center text-xs text-primary hover:underline underline-offset-2"
            >
              {t('problem.cta', 'Leggi il report completo')}
              <ExternalLink className="w-3 h-3 ml-1" />
            </Link>
          </div>

          {/* Solution Divider */}
          <div className="flex items-center gap-4 mb-12">
            <div className="flex-1 h-px bg-border/20" />
            <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 rounded-full">
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-[0.15em] font-medium text-foreground">
                  {i18n.language.startsWith('it') ? 'La Soluzione' : 'The Solution'}
                </span>
              </div>
              <span className="text-muted-foreground">→</span>
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-primary" />
                <span className="text-xs uppercase tracking-[0.15em] font-medium text-foreground">
                  {i18n.language.startsWith('it') ? 'Jungle Rent' : 'Jungle Rent'}
                </span>
              </div>
            </div>
            <div className="flex-1 h-px bg-border/20" />
          </div>

          {/* Investor Value Prop */}
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4 font-medium">
              {t('investor.sectionLabel')}
            </p>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-display font-bold mb-4 text-foreground">
              {t('investor.sectionTitle')}
            </h3>
            <p className="text-sm md:text-base text-muted-foreground max-w-xl mx-auto mb-6">
              <StyledText>{t('investor.compactDesc')}</StyledText>
            </p>
            
            {/* Active Investors Badge only - €100 and StartupInnovativa are in Hero */}
            <div className="flex justify-center mb-8">
              <Badge 
                variant="secondary" 
                className="px-4 py-2 text-sm font-medium"
              >
                <Users className="w-4 h-4 mr-2" />
                {count}+ {t('investor.activeInvestors')}
              </Badge>
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center items-center">
            <Button 
              onClick={handleLorenzoWhatsApp}
              size="lg"
              className="w-full sm:w-auto text-sm md:text-base group"
            >
              <MessageCircle className="mr-2 w-4 h-4 md:w-5 md:h-5" />
              {t('investor.talkToLorenzo')}
            </Button>
            
            <Button 
              onClick={() => setInvestDialogOpen(true)}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto text-sm md:text-base group"
            >
              {t('investor.cta')}
              <ArrowRight className={`ml-2 w-4 h-4 ${prefersReducedMotion ? '' : 'group-hover:translate-x-1 transition-transform'}`} />
            </Button>
            
            {/* Calendly only on desktop */}
            <Button 
              onClick={() => openCalendly()}
              size="lg"
              variant="secondary"
              className="hidden md:inline-flex w-auto text-base group"
            >
              <Calendar className="mr-2 w-5 h-5" />
              {t('investor.scheduleCall')}
            </Button>
          </div>

        </div>
      </div>
      
      <QuickInvestorLeadDialog 
        open={investDialogOpen} 
        onOpenChange={setInvestDialogOpen}
        source="investor_section"
      />
    </section>
  );
};
