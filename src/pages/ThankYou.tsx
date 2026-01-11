import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSearchParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Calendar, ArrowRight, BookOpen, Instagram, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Navigation, Footer } from "@/components/layout";
import { openCalendly } from "@/lib/calendly";
import { useAnalytics } from "@/hooks/useAnalytics";
import logo2i3t from "@/assets/2i3t-logo-green.png";

const ThankYou = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const { trackClick } = useAnalytics();
  
  const leadType = searchParams.get('type') || 'investor';
  const isInvestor = leadType === 'investor';
  const lang = i18n.language;

  useEffect(() => {
    trackClick('thank_you_page_view', { type: leadType });
  }, [leadType, trackClick]);

  const handleCalendlyClick = () => {
    trackClick('thank_you_calendly', { type: leadType });
    openCalendly();
  };

  const handleSocialClick = (platform: string) => {
    trackClick('thank_you_social', { platform, type: leadType });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 pt-24 pb-16 md:pt-32 md:pb-24">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          {/* Success Icon */}
          <div className="mb-8">
            <div className="w-20 h-20 mx-auto bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            {t('thankYou.title')}
          </h1>
          
          <p className="text-lg text-muted-foreground mb-8">
            {isInvestor ? t('thankYou.investor.subtitle') : t('thankYou.student.subtitle')}
          </p>

          {/* Next Steps */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-8 text-left">
            <h2 className="text-xl font-semibold text-foreground mb-4">
              {t('thankYou.nextSteps.title')}
            </h2>
            <ul className="space-y-4">
              {isInvestor ? (
                <>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">1</span>
                    <span className="text-muted-foreground">{t('thankYou.investor.step1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">2</span>
                    <span className="text-muted-foreground">{t('thankYou.investor.step2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">3</span>
                    <span className="text-muted-foreground">{t('thankYou.investor.step3')}</span>
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">1</span>
                    <span className="text-muted-foreground">{t('thankYou.student.step1')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">2</span>
                    <span className="text-muted-foreground">{t('thankYou.student.step2')}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-sm font-semibold flex items-center justify-center">3</span>
                    <span className="text-muted-foreground">{t('thankYou.student.step3')}</span>
                  </li>
                </>
              )}
            </ul>
          </div>

          {/* CTAs */}
          <div className="space-y-4">
            {isInvestor ? (
              <Button
                size="lg"
                variant="premium"
                onClick={handleCalendlyClick}
                className="w-full sm:w-auto px-8"
              >
                <Calendar className="w-5 h-5 mr-2" />
                {t('thankYou.investor.scheduleCta')}
              </Button>
            ) : (
              <>
                <Link to={lang === 'it' ? '/blog' : '/blog'}>
                  <Button
                    size="lg"
                    variant="premium"
                    className="w-full sm:w-auto px-8"
                  >
                    <BookOpen className="w-5 h-5 mr-2" />
                    {t('thankYou.student.resourcesCta')}
                  </Button>
                </Link>
                
                <div className="flex items-center justify-center gap-4 pt-4">
                  <a 
                    href="https://www.instagram.com/jungle.rent/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={() => handleSocialClick('instagram')}
                    className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Instagram className="w-5 h-5" />
                    <span className="text-sm">{t('thankYou.followInstagram')}</span>
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Trust Badge */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-center gap-3 text-sm text-muted-foreground">
              <img src={logo2i3t} alt="2i3T" className="h-8 w-auto" />
              <span>{t('thankYou.trustBadge')}</span>
            </div>
          </div>

          {/* Back to Home */}
          <div className="mt-8">
            <Link to="/">
              <Button variant="ghost" className="gap-2">
                <Home className="w-4 h-4" />
                {t('thankYou.backHome')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ThankYou;
