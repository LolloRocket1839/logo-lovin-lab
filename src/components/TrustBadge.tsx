import { ExternalLink } from "lucide-react";
import logo2i3t from "@/assets/2i3t-logo.png";

export const TrustBadge = () => {
  return (
    <section className="py-20 bg-accent/30 relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      <div className="container px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-8 font-medium">
            Partnership Istituzionale
          </p>
          
          <a 
            href="https://2i3t.it"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-6 bg-card border border-border/50 rounded-2xl px-12 py-8 mb-6 hover:border-primary/30 transition-all duration-500 hover:shadow-[0_8px_24px_hsla(28,24%,14%,0.1)] cursor-pointer"
          >
            <div className="w-20 h-20 flex items-center justify-center">
              <img src={logo2i3t} alt="2i3T Logo" className="w-full h-full object-contain rounded-xl" />
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-display font-bold text-foreground mb-1">
                Supportati da 2i3T
              </h3>
              <p className="text-sm text-muted-foreground font-light">
                Incubatore d'Imprese dell'Università di Torino
              </p>
            </div>
          </a>
          
          <a 
            href="https://2i3t.it"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors duration-300 font-medium group"
          >
            <span>Scopri di più su 2i3T</span>
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </a>
          
          <p className="text-xs text-muted-foreground/60 mt-6 font-light max-w-2xl mx-auto leading-relaxed">
            Incubati presso l'ecosistema universitario torinese, garantendo professionalità e affidabilità in ogni transazione
          </p>
        </div>
      </div>
    </section>
  );
};
