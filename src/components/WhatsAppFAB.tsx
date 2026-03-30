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

  // Variation A: Classic green floating circle
  if (variation === 'A') {
    return (
      <button
        onClick={handleClick}
        aria-label="WhatsApp"
        className="fixed bottom-24 right-4 z-40 md:hidden w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform animate-fade-up"
      >
        <MessageCircle className="w-7 h-7" fill="white" />
      </button>
    );
  }

  // Variation B: Full-width sticky banner
  return (
    <button
      onClick={handleClick}
      className="fixed bottom-16 left-0 right-0 z-40 md:hidden bg-[#25D366] text-white shadow-[0_-2px_10px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2 py-3 px-4 animate-fade-up"
    >
      <Phone className="w-5 h-5" />
      <span className="font-medium text-sm">{t('nav.contactUs')}</span>
    </button>
  );
};