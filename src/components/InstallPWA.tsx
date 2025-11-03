import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useIsMobile } from "@/hooks/use-mobile";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export const InstallPWA = () => {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showInstallPrompt, setShowInstallPrompt] = useState(false);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Only show on mobile devices
      if (isMobile) {
        setShowInstallPrompt(true);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if already installed
    window.addEventListener('appinstalled', () => {
      setIsInstalled(true);
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, [isMobile]);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setShowInstallPrompt(false);
      setDeferredPrompt(null);
    }
  };

  const handleDismiss = () => {
    setShowInstallPrompt(false);
    // Hide for 7 days
    localStorage.setItem('pwa-install-dismissed', Date.now().toString());
  };

  // Don't show if installed, not mobile, or recently dismissed
  if (isInstalled || !isMobile || !showInstallPrompt || !deferredPrompt) {
    return null;
  }

  const dismissedTime = localStorage.getItem('pwa-install-dismissed');
  if (dismissedTime) {
    const daysSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60 * 24);
    if (daysSinceDismissed < 7) {
      return null;
    }
  }

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-in slide-in-from-bottom-5 md:hidden">
      <div className="bg-card border border-border rounded-lg shadow-lg p-4 flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
          <Download className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-foreground mb-1">
            {t('pwa.installTitle')}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            {t('pwa.installDescription')}
          </p>
          <div className="flex gap-2">
            <Button
              onClick={handleInstallClick}
              size="sm"
              className="flex-1"
            >
              {t('pwa.installButton')}
            </Button>
            <Button
              onClick={handleDismiss}
              size="sm"
              variant="ghost"
            >
              {t('pwa.dismissButton')}
            </Button>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label={t('pwa.dismissButton')}
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};