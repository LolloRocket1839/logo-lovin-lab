import { useTranslation } from 'react-i18next';
import { useWaitlistCounter } from '@/hooks/useWaitlistCounter';
import { Users } from 'lucide-react';

export const WaitlistBadge = () => {
  const { t } = useTranslation();
  const { count } = useWaitlistCounter();
  
  return (
    <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-primary/20 animate-fade-in backdrop-blur-sm">
      <Users className="w-3 h-3 sm:w-4 sm:h-4" />
      <span className="text-xs sm:text-sm font-medium">
        {t('hero.waitlistCounter', { count })}
      </span>
    </div>
  );
};
