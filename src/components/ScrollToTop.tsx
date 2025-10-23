import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button after scrolling 2 viewports
      if (window.scrollY > window.innerHeight * 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      onClick={scrollToTop}
      variant="hero"
      size="icon"
      className={`fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full shadow-lg
                  transition-all duration-300 hover:shadow-xl hover:scale-110
                  ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"}`}
      aria-label="Torna su"
    >
      <ArrowUp className="h-5 w-5" />
    </Button>
  );
};
