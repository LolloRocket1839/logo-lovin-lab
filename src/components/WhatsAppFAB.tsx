import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle } from "lucide-react";
import { openQuickContact, type SupportedLanguage } from "@/constants/contacts";
import { useAnalytics } from "@/hooks/useAnalytics";

export const WhatsAppFAB = () => {
  const { i18n } = useTranslation();
  const { trackClick } = useAnalytics();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleClick = () => {
    trackClick("whatsapp_fab");
    const lang = (i18n.language?.slice(0, 2) || "en") as SupportedLanguage;
    openQuickContact(lang);
  };

  return (
    <button
      onClick={handleClick}
      aria-label="WhatsApp"
      className="fixed bottom-24 right-4 z-40 md:hidden w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform animate-fade-up"
    >
      <MessageCircle className="w-7 h-7" fill="white" />
    </button>
  );
};
