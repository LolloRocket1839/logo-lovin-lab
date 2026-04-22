import { useState } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useAnalytics } from "@/hooks/useAnalytics";

export const AnnouncementBanner = () => {
  const { t, i18n } = useTranslation();
  const { trackClick } = useAnalytics();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const destination = i18n.language === "en" ? "/investors" : "/investitori";

  return (
    <div className="bg-destructive text-destructive-foreground text-center text-sm relative z-[60]">
      <Link
        to={destination}
        onClick={() => trackClick("announcement_banner", { destination })}
        className="block py-2 pl-4 pr-10 hover:brightness-110 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive-foreground/60"
      >
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-destructive-foreground animate-pulse" />
          {t('announcement.firstDeal')}
        </span>
      </Link>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setDismissed(true);
        }}
        onMouseDown={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded opacity-70 hover:opacity-100 hover:bg-destructive-foreground/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-destructive-foreground/60 transition-colors"
        aria-label={t('accessibility.closeMenu')}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
