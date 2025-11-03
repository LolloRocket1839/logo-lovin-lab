import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const LaunchCountdown = () => {
  const { t } = useTranslation();
  const launchDate = new Date('2026-02-01T00:00:00');
  
  const calculateTimeLeft = () => {
    const difference = launchDate.getTime() - new Date().getTime();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  };
  
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);
  
  return (
    <div className="flex flex-col items-center gap-3 animate-fade-in">
      <p className="text-sm font-medium text-muted-foreground">
        {t('hero.launchCountdown')}
      </p>
      <div className="flex gap-2 md:gap-4">
        <TimeUnit value={timeLeft.days} label={t('hero.days')} />
        <TimeUnit value={timeLeft.hours} label={t('hero.hours')} />
        <TimeUnit value={timeLeft.minutes} label={t('hero.minutes')} />
        <TimeUnit value={timeLeft.seconds} label={t('hero.seconds')} />
      </div>
    </div>
  );
};

const TimeUnit = ({ value, label }: { value: number; label: string }) => (
  <div className="flex flex-col items-center bg-card/50 backdrop-blur-sm rounded-lg px-2 md:px-4 py-2 min-w-[50px] md:min-w-[70px] border border-border/50">
    <span className="text-xl md:text-3xl font-bold text-foreground tabular-nums">
      {value.toString().padStart(2, '0')}
    </span>
    <span className="text-[10px] md:text-xs text-muted-foreground uppercase tracking-wide">
      {label}
    </span>
  </div>
);
