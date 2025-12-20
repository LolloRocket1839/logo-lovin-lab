import { useTranslation } from "react-i18next";
import { Shield } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const StartupInnovativaBadge = () => {
  const { t } = useTranslation();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <a
          href="https://startup.registroimprese.it/isin/dettaglio/16544950010/IT/profilo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20 hover:bg-green-500/20 transition-colors cursor-pointer"
          aria-label={t('accessibility.startupInnovativaLink')}
        >
          <Shield className="w-4 h-4 text-green-600 dark:text-green-400" />
          <span className="text-xs font-medium text-green-700 dark:text-green-300">
            {t('startupBadge.label')}
          </span>
        </a>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="max-w-xs">
        <p className="text-sm">{t('startupBadge.tooltip')}</p>
      </TooltipContent>
    </Tooltip>
  );
};
