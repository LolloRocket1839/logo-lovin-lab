import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useCookieConsent } from "@/hooks/useCookieConsent";
import { Button } from "@/components/ui/button";
import { Cookie, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CookieBanner = () => {
  const { consent, acceptCookies, rejectCookies } = useCookieConsent();
  const { i18n } = useTranslation();
  const isItalian = i18n.language.startsWith("it");

  if (consent !== "pending") return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed bottom-0 left-0 right-0 z-[60] p-3 md:p-4"
      >
        <div className="mx-auto max-w-2xl rounded-xl border border-border bg-card/95 backdrop-blur-md shadow-xl p-4 md:p-5">
          <div className="flex items-start gap-3">
            <Cookie className="h-5 w-5 text-primary mt-0.5 shrink-0" />
            <div className="flex-1 space-y-3">
              <p className="text-sm text-foreground leading-relaxed">
                {isItalian
                  ? "Utilizziamo cookie analitici per migliorare la tua esperienza. Nessun dato personale viene venduto."
                  : "We use analytics cookies to improve your experience. No personal data is sold."}
                {" "}
                <Link to="/privacy" className="underline text-primary hover:text-primary/80">
                  {isItalian ? "Privacy policy" : "Privacy policy"}
                </Link>
              </p>
              <div className="flex items-center gap-2">
                <Button size="sm" onClick={acceptCookies} className="text-xs">
                  {isItalian ? "Accetta" : "Accept"}
                </Button>
                <Button size="sm" variant="outline" onClick={rejectCookies} className="text-xs">
                  {isItalian ? "Rifiuta" : "Decline"}
                </Button>
              </div>
            </div>
            <button
              onClick={rejectCookies}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
