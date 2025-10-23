import { useState, useEffect } from "react";
import { X, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACTS, openWhatsApp, MESSAGES } from "@/lib/contacts";

export const StickyCTA = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 1 viewport
      if (window.scrollY > window.innerHeight && !isDismissed) {
        setIsVisible(true);
      } else if (window.scrollY <= window.innerHeight) {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isDismissed]);

  const handleContactLorenzo = () => {
    openWhatsApp(CONTACTS.lorenzo.phone, MESSAGES.student.whatsapp(CONTACTS.lorenzo.name));
  };

  const handleContactAndrea = () => {
    openWhatsApp(CONTACTS.andrea.phone, MESSAGES.student.whatsapp(CONTACTS.andrea.name));
  };

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 z-40 md:hidden
                  backdrop-blur-xl bg-background/80 border-t border-border/50
                  transition-all duration-500
                  ${isVisible ? "translate-y-0" : "translate-y-full"}`}
    >
      <div className="container px-4 py-3 flex items-center justify-between gap-2">
        <div className="flex gap-2 flex-1">
          <Button
            onClick={handleContactLorenzo}
            size="sm"
            variant="hero"
            className="flex-1 h-10 text-sm group"
          >
            <MessageCircle className="mr-1.5 h-4 w-4" />
            Lorenzo
          </Button>
          <Button
            onClick={handleContactAndrea}
            size="sm"
            variant="hero"
            className="flex-1 h-10 text-sm group"
          >
            <MessageCircle className="mr-1.5 h-4 w-4" />
            Andrea
          </Button>
        </div>
        <Button
          onClick={() => setIsDismissed(true)}
          variant="ghost"
          size="icon"
          className="h-10 w-10 flex-shrink-0"
          aria-label="Chiudi"
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
