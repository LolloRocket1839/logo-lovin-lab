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
      
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-border" />
    </section>
  );
};