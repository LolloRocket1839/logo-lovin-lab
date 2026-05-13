import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, Home, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAnalytics } from "@/hooks/useAnalytics";

const DISMISSED_KEY = "scrollQualifierDismissed";

export const ScrollQualifier = () => {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(() => {
    try { return sessionStorage.getItem(DISMISSED_KEY) === "1"; } catch { return false; }
  });
  const { i18n } = useTranslation();
  const { trackEvent } = useAnalytics();
  const isIt = i18n.language.startsWith("it");

  useEffect(() => {
    if (dismissed) return;

    const onScroll = () => {
      // Don't show if exit intent popup is already shown
      try {
        if (sessionStorage.getItem("exitIntentShown") === "true") return;
      } catch {}

      const pct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight) * 100;
      if (pct >= 40 && !visible) {
        setVisible(true);
        trackEvent("scroll_qualifier_shown");
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [dismissed, visible, trackEvent]);

  // Listen for exit intent opening and hide this component
  useEffect(() => {
    const checkExitIntent = () => {
      try {
        if (sessionStorage.getItem("exitIntentShown") === "true") {
          setVisible(false);
        }
      } catch {}
    };

    // Check on storage events (cross-tab) and periodically for same-tab
    window.addEventListener("storage", checkExitIntent);
    const interval = setInterval(checkExitIntent, 1000);
    return () => {
      window.removeEventListener("storage", checkExitIntent);
      clearInterval(interval);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    setDismissed(true);
    try { sessionStorage.setItem(DISMISSED_KEY, "1"); } catch {}
  };

  const handleClick = (type: string) => {
    trackEvent("scroll_qualifier_clicked", { choice: type });
    dismiss();
  };

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", damping: 20 }}
          className="fixed bottom-20 right-4 z-50 w-72 rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-xl p-4 md:bottom-6 md:right-6"
        >
          <button onClick={dismiss} className="absolute top-2 right-2 text-muted-foreground hover:text-foreground" aria-label="Close">
            <X className="h-4 w-4" />
          </button>
          <p className="text-sm font-semibold text-foreground mb-3">
            {isIt ? "Come possiamo aiutarti?" : "How can we help you?"}
          </p>
          <div className="space-y-2">
            <Link to="/investitori" onClick={() => handleClick("investor")}>
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
                <TrendingUp className="h-4 w-4 text-primary" />
                {isIt ? "Voglio investire a Torino" : "I want to invest in Turin"}
              </Button>
            </Link>
            <Link to="/vendi" onClick={() => handleClick("seller")} className="block mt-2">
              <Button variant="outline" size="sm" className="w-full justify-start gap-2 text-xs">
                <Home className="h-4 w-4 text-primary" />
                {isIt ? "Voglio vendere un immobile" : "I want to sell a property"}
              </Button>
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
