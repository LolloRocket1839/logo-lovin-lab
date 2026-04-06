import { useState } from "react";
import { X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { QuickInvestorLeadDialog } from "@/components/dialogs/QuickInvestorLeadDialog";

export const AnnouncementBanner = () => {
  const { t } = useTranslation();
  const [dismissed, setDismissed] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  if (dismissed) return null;

  return (
    <>
      <div
        className="bg-destructive text-destructive-foreground text-center text-sm py-2 px-4 relative z-[60] cursor-pointer hover:brightness-110 transition-all"
        onClick={() => setDialogOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setDialogOpen(true)}
      >
        <span className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-destructive-foreground animate-pulse" />
          {t('announcement.firstDeal')}
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 opacity-70 hover:opacity-100"
          aria-label={t('accessibility.closeMenu')}
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
      <QuickInvestorLeadDialog open={dialogOpen} onOpenChange={setDialogOpen} source="announcement_banner" />
    </>
  );
};
