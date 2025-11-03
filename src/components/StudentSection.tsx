import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wallet, Calendar, ArrowRight, Gift } from "lucide-react";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const StudentSection = () => {
  const { t, i18n } = useTranslation();

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

  const currentLang = (i18n.language === 'en' ? 'en' : 'it') as 'it' | 'en';

  const handleWhatsAppLorenzo = () => {
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.lorenzo.name));
  };

  const handleWhatsAppAndrea = () => {
    openWhatsApp(CONTACTS.andrea.phone, MESSAGES.student.whatsapp[currentLang](CONTACTS.andrea.name));
  };

  const handleQuizClick = () => {
    window.open('https://it.surveymonkey.com/r/Q27QDBG', '_blank');
  };

  return (
    <section id="student-section" className="py-12 md:py-16 bg-accent/20 relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-border" />
      
      <div className="container px-8 relative z-10">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4 font-medium">
            {t('student.sectionLabel')}
          </p>
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 leading-tight text-foreground tracking-tight">
            {t('student.sectionTitle')}
          </h2>
          <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed mb-8">
            {t('student.compactDesc')}
          </p>
          
          {/* Quiz CTA - Prominent */}
          <div className="mb-6 p-4 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg border border-primary/20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Gift className="w-5 h-5 text-primary" />
              <p className="text-sm font-semibold text-primary">
                {t('hero.questionnaire')}
              </p>
            </div>
            <Button 
              size="lg" 
              variant="default"
              onClick={handleQuizClick}
              className="w-full sm:w-auto px-8 py-6 text-base bg-primary hover:bg-primary/90"
            >
              {t('hero.quizCta')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border/50" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-accent/20 px-3 text-muted-foreground">or</span>
            </div>
          </div>
          
          <div className="mt-6">
            <Button 
              size="lg" 
              variant="premium"
              onClick={handleWhatsAppLorenzo}
              className="w-full sm:w-auto px-8 py-6 text-base"
            >
              {t('student.contactCta')}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};