import logo2i3t from "@/assets/2i3t-logo.png";

export const PartnerLogos = () => {
  return (
    <div className="py-12 md:py-16 border-t border-b border-border/50">
      <p className="text-center text-xs uppercase tracking-widest text-muted-foreground/60 mb-8 font-medium">
        Powered by
      </p>
      <div className="flex items-center justify-center gap-12">
        <div className="group relative">
          <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-lg" />
          <img
            src={logo2i3t}
            alt="2i3T - Incubatore Imprese Innovative Politecnico di Torino"
            className="h-12 md:h-16 lg:h-20 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-700 relative z-10"
            loading="lazy"
          />
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground/50 mt-6 font-light">
        Incubatore Imprese Innovative - Politecnico di Torino
      </p>
    </div>
  );
};
