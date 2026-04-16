import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, Phone } from "lucide-react";
import { openQuickContact, type SupportedLanguage } from "@/constants/contacts";
import { useAnalytics } from "@/hooks/useAnalytics";
import { useABTest } from "@/hooks/useABTest";

export const WhatsAppFAB = () => {
  const { t, i18n } = useTranslation();
  const { trackClick } = useAnalytics();
  const { variation, trackImpression, trackClick: trackABClick } = useABTest('whatsapp_fab');
  const [isVisible, setIsVisible] = useState(false);
  const [impressionSent, setImpressionSent] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible && !impressionSent) {
      trackImpression();
      setImpressionSent(true);
    }
  }, [isVisible, impressionSent]);

  if (!isVisible) return null;

  const handleClick = () => {
    trackClick("whatsapp_fab");
    trackABClick();
    const lang = (i18n.language?.slice(0, 2) || "en") as SupportedLanguage;
    openQuickContact(lang);
  };

  // WhatsApp brand green #25D366 (HSL: 142 70% 49%)
  const whatsappBrand =
    "bg-[hsl(142_70%_49%)] text-white hover:bg-[hsl(142_70%_44%)]";

  // Variation A: Brand-green floating circle
  if (variation === 'A') {
    return (
      <button
        onClick={handleClick}
        aria-label="WhatsApp"
        className={`fixed bottom-24 right-4 z-40 md:hidden w-14 h-14 rounded-full ${whatsappBrand} shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-all animate-fade-up`}
      >
        <MessageCircle className="w-7 h-7" />
      </button>
    );
  }

  // Variation B: Brand-green pill button with label
  return (
    <button
      onClick={handleClick}
      className={`fixed bottom-20 right-4 z-40 md:hidden ${whatsappBrand} rounded-full shadow-lg flex items-center gap-2 py-3 px-5 hover:scale-105 active:scale-95 transition-all animate-fade-up`}
    >
      <Phone className="w-4 h-4" />
      <span className="font-medium text-sm">{t('nav.contactUs')}</span>
    </button>
  );
};
