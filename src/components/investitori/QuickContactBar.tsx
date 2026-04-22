import { memo } from "react";
import { useTranslation } from "react-i18next";
import { MessageCircle, Mail } from "lucide-react";
import { CONTACTS, MESSAGES, openWhatsApp } from "@/constants/contacts";
import { useAnalytics } from "@/hooks/useAnalytics";

interface Props {
  onEmailClick: () => void;
}

const QuickContactBarComponent = ({ onEmailClick }: Props) => {
  const { t, i18n } = useTranslation();
  const { trackEvent } = useAnalytics();
  const isEn = i18n.language.startsWith("en");
  const lang = isEn ? "en" : "it";

  const handleWhatsApp = () => {
    trackEvent("investor_quick_contact_click", { channel: "whatsapp" });
    const message = MESSAGES.investor.whatsapp[lang](CONTACTS.lorenzo.name);
    openWhatsApp(CONTACTS.lorenzo.phone, message);
  };

  const handleEmail = () => {
    trackEvent("investor_quick_contact_click", { channel: "email" });
    onEmailClick();
  };

  return (
    <div className="sticky top-16 z-30 bg-cream border-b border-primary/10">
      <div className="container max-w-4xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-2 sm:gap-3 sm:items-center sm:justify-between">
        <p className="text-xs sm:text-sm text-foreground/80 font-medium">
          {t("investor.landing.quickBar.label")}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleWhatsApp}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 py-2 text-sm font-medium transition-colors"
          >
            <MessageCircle className="w-4 h-4" strokeWidth={1.75} />
            {t("investor.landing.quickBar.whatsapp")}
          </button>
          <button
            onClick={handleEmail}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 border border-primary/30 hover:bg-primary/5 text-foreground rounded-full px-4 py-2 text-sm font-medium transition-colors"
          >
            <Mail className="w-4 h-4" strokeWidth={1.75} />
            {t("investor.landing.quickBar.email")}
          </button>
        </div>
      </div>
    </div>
  );
};

export const QuickContactBar = memo(QuickContactBarComponent);
