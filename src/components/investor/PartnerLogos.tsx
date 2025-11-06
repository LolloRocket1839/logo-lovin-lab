import { useEffect, useRef, useState } from "react";
import logo2i3t from "@/assets/2i3t-logo-new.png";

export const PartnerLogos = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div 
      ref={sectionRef}
      className={`py-12 md:py-16 border-t border-b border-border/50 transition-all duration-700 ${
        isVisible ? "animate-fade-in" : "opacity-0"
      }`}
    >
      <p className="text-center text-xs uppercase tracking-widest text-muted-foreground/60 mb-8 font-medium">
        Powered by
      </p>
      <div className="flex items-center justify-center gap-12">
        <a 
          href="https://www.2i3t.it" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group relative"
          aria-label="Visita il sito di 2i3T - Incubatore Politecnico di Torino"
        >
          <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" />
          <img
            src={logo2i3t}
            alt="2i3T - Incubatore Imprese Innovative Politecnico di Torino"
            className="h-40 md:h-64 lg:h-80 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-700 relative z-10 cursor-pointer"
            loading="lazy"
          />
        </a>
      </div>
      <p className="text-center text-xs text-muted-foreground/50 mt-6 font-light">
        Incubatore Imprese Innovative - Politecnico di Torino
      </p>
    </div>
  );
};
