import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Calendar, ArrowRight } from "lucide-react";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const StudentSection = () => {
  const { t } = useTranslation();

  const studentBenefits = [
    {
      icon: Wallet,
      title: t('student.benefit1Title'),
      description: t('student.benefit1Desc'),
      tooltip: t('student.benefit1Tooltip')
    },
    {
      icon: Calendar,
      title: t('student.benefit2Title'),
      description: t('student.benefit2Desc'),
      tooltip: t('student.benefit2Tooltip')
    }
  ];

  const handleWhatsAppLorenzo = () => {
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp(CONTACTS.lorenzo.name));
  };

  const handleWhatsAppAndrea = () => {
    openWhatsApp(CONTACTS.andrea.phone, MESSAGES.student.whatsapp(CONTACTS.andrea.name));
  };

  return (
    <section id="student-section" className="py-12 md:py-20 bg-accent/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
      
      <div className="absolute inset-0 opacity-[0.015]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="absolute top-1/4 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />

      <div className="container px-8 relative z-10">
        <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-6 font-medium">
            {t('student.sectionLabel')}
          </p>
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 leading-tight text-foreground tracking-tight">
            {t('student.sectionTitle')}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-light leading-relaxed">
            {t('student.sectionSubtitle')}
          </p>
        </div>

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          <TooltipProvider delayDuration={500}>
            {studentBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Tooltip key={index}>
                  <TooltipTrigger asChild>
                    <Card 
                      className="p-6 md:p-8 lg:p-10 backdrop-blur-xl bg-white/10 border border-white/20 hover:border-white/40 transition-all duration-700 group hover:bg-white/15 hover:-translate-y-1 cursor-pointer"
                      style={{ 
                        animationDelay: `${index * 100}ms`,
                        boxShadow: 'var(--shadow-glass)'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = 'var(--shadow-glass-hover)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = 'var(--shadow-glass)';
                      }}
                    >
                      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      <div className="mb-6 relative z-10">
                        <Icon className="w-10 h-10 text-primary/70 group-hover:text-primary transition-colors duration-700" strokeWidth={1.5} />
                      </div>
                      <h3 className="text-xl font-display font-semibold mb-4 leading-tight text-foreground relative z-10">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed font-light text-sm relative z-10">
                        {benefit.description}
                      </p>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent className="hidden md:block">
                    <p className="text-xs">{benefit.tooltip}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </TooltipProvider>
        </div>

        <div className="text-center">
          <p className="text-sm text-muted-foreground mb-6 font-light">
            {t('student.contactText')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-4">
            <Button 
              size="lg" 
              variant="premium"
              onClick={handleWhatsAppLorenzo}
              className="w-full sm:w-auto px-6 py-5 sm:px-8 sm:py-6 text-base"
            >
              {t('student.contactLorenzo')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
            <Button 
              size="lg" 
              variant="premium"
              onClick={handleWhatsAppAndrea}
              className="w-full sm:w-auto px-6 py-5 sm:px-8 sm:py-6 text-base"
            >
              {t('student.contactAndrea')}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground/60 font-light">
            {t('student.responseTime')}
          </p>
        </div>

      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};