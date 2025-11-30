import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MessageCircle, Bell, TrendingUp, Download } from "lucide-react";
import { WaitlistDialog } from "@/components/WaitlistDialog";
import { useState, useEffect } from "react";
import { CONTACTS } from "@/lib/contacts";
import { useABTest } from "@/hooks/useABTest";

interface BlogCTAProps {
  type: 'students' | 'investors' | 'sellers' | 'turisti' | 'societa';
}

export const BlogCTA = ({ type }: BlogCTAProps) => {
  const { t } = useTranslation();
  const [showWaitlist, setShowWaitlist] = useState(false);
  const { variation, trackImpression, trackClick } = useABTest(type);

  useEffect(() => {
    trackImpression();
  }, [trackImpression]);

  const handleWhatsApp = () => {
    trackClick();
    const message = encodeURIComponent(
      type === 'sellers' 
        ? t('seller.contactMessage')
        : t('investor.contactMessage')
    );
    const phone = CONTACTS.lorenzo.phone.replace('+', '');
    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
  };

  const handleWaitlistOpen = () => {
    trackClick();
    setShowWaitlist(true);
  };

  const ctaConfig = {
    students: {
      title: t(`blog.cta.students.${variation}.title`),
      description: t(`blog.cta.students.${variation}.description`),
      icon: Bell,
      buttonText: t(`blog.cta.students.${variation}.button`),
      action: handleWaitlistOpen
    },
    investors: {
      title: t(`blog.cta.investors.${variation}.title`),
      description: t(`blog.cta.investors.${variation}.description`),
      icon: TrendingUp,
      buttonText: t(`blog.cta.investors.${variation}.button`),
      action: handleWhatsApp
    },
    sellers: {
      title: t(`blog.cta.sellers.${variation}.title`),
      description: t(`blog.cta.sellers.${variation}.description`),
      icon: MessageCircle,
      buttonText: t(`blog.cta.sellers.${variation}.button`),
      action: handleWhatsApp
    },
    turisti: {
      title: t(`blog.cta.turisti.${variation}.title`),
      description: t(`blog.cta.turisti.${variation}.description`),
      icon: Bell,
      buttonText: t(`blog.cta.turisti.${variation}.button`),
      action: handleWaitlistOpen
    },
    societa: {
      title: t(`blog.cta.students.${variation}.title`),
      description: t(`blog.cta.students.${variation}.description`),
      icon: Bell,
      buttonText: t(`blog.cta.students.${variation}.button`),
      action: handleWaitlistOpen
    }
  };

  const config = ctaConfig[type];
  const Icon = config.icon;

  const handleDownloadReport = () => {
    window.open('/resources/mercato-immobiliare-universitario-torino.pdf', '_blank');
  };

  return (
    <>
      <div className="my-12 p-8 rounded-lg bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
              <Icon className="w-8 h-8 text-primary" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h3 className="text-2xl font-bold mb-2">{config.title}</h3>
            <p className="text-muted-foreground">{config.description}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
            <Button size="lg" onClick={config.action}>
              {config.buttonText}
            </Button>
            {type === 'investors' && (
              <Button size="lg" variant="outline" onClick={handleDownloadReport} className="group">
                <Download className="mr-2 w-4 h-4" />
                {t('blog.cta.downloadReport')}
              </Button>
            )}
          </div>
        </div>
      </div>

      <WaitlistDialog open={showWaitlist} onOpenChange={setShowWaitlist} />
    </>
  );
};
