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

  const destination = i18n.language?.startsWith("it") ? "/investitori" : "/investors";

  return (
    <div className="bg-background border-b border-primary/20 text-foreground text-center relative z-[60]">
      <Link
        to={destination}
        onClick={() => trackClick("announcement_banner", { destination })}
        className="block py-2 pl-4 pr-10 hover:bg-primary/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
      >
        <span className="inline-flex items-center gap-2.5 eyebrow-mono text-foreground/80">
          <span className="w-1.5 h-1.5 rounded-full bg-destructive animate-pulse" aria-hidden="true" />
          <span>{t('announcement.firstDeal')}</span>
          <span className="text-foreground/40" aria-hidden="true">→</span>
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
        className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded opacity-50 hover:opacity-100 hover:bg-primary/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 transition-colors"
        aria-label={t('accessibility.closeMenu')}
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
