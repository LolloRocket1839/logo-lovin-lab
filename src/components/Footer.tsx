import { useState } from "react";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import { MessageCircle, Mail, MapPin } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";
import { LogoModal } from "@/components/LogoModal";

export const Footer = () => {
  const [logoModalOpen, setLogoModalOpen] = useState(false);
  
  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">
      {/* Top border decoration */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container px-8 py-12 md:py-20 lg:py-24 relative z-10">
        <div className="grid md:grid-cols-4 gap-8 md:gap-12 lg:gap-16 mb-10 md:mb-16 lg:mb-20 max-w-6xl mx-auto">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <img 
                src={jungleRentLogo} 
                alt="Jungle Rent" 
                className="w-12 h-12 md:w-16 md:h-16 opacity-80 rounded-3xl cursor-pointer 
                           hover:opacity-100 hover:scale-105 transition-all duration-300"
                onClick={() => setLogoModalOpen(true)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setLogoModalOpen(true);
                  }
                }}
              />
            </div>
            <p className="text-muted-foreground mb-4 leading-relaxed font-light">
              Il modo rivoluzionario per affittare casa a Torino
            </p>
            <p className="text-xs text-muted-foreground/60 font-light tracking-wide">
              © 2024 Jungle Rent
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-foreground">Contatti</h3>
            <div className="space-y-3">
              <a 
                href={`https://wa.me/${CONTACTS.lorenzo.phone}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-500 group"
              >
                <MessageCircle className="w-4 h-4 mt-0.5 opacity-60 group-hover:opacity-100" strokeWidth={1.5} />
                <span className="text-sm font-light link-elegant">Lorenzo: {CONTACTS.lorenzo.phone.replace(/(\+\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}</span>
              </a>
              <a 
                href={`https://wa.me/${CONTACTS.andrea.phone}`}
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-500 group"
              >
                <MessageCircle className="w-4 h-4 mt-0.5 opacity-60 group-hover:opacity-100" strokeWidth={1.5} />
                <span className="text-sm font-light link-elegant">Andrea: {CONTACTS.andrea.phone.replace(/(\+\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4')}</span>
              </a>
              <a 
                href={`mailto:${CONTACTS.email}`}
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-500 group"
              >
                <Mail className="w-4 h-4 mt-0.5 opacity-60 group-hover:opacity-100" strokeWidth={1.5} />
                <span className="text-sm font-light link-elegant break-all">{CONTACTS.email}</span>
              </a>
              <div className="flex items-start gap-3 text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 opacity-60" strokeWidth={1.5} />
                <span className="text-sm font-light">Torino, Italia</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-foreground">Per Studenti</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li>
                <a href="#how-it-works" className="text-sm font-light hover:text-primary transition-colors duration-500 link-elegant">
                  Come Funziona
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground/60 mb-3 font-medium">Atenei Coperti</p>
              <div className="grid grid-cols-1 gap-y-2">
                <a href="https://www.polito.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">Politecnico di Torino</a>
                <a href="https://www.unito.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">Università di Torino</a>
                <a href="https://www.escp.eu" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">ESCP Business School</a>
                <a href="https://www.saamanagement.com/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">SAA School of Management</a>
                <a href="https://www.ied.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">IED Torino</a>
                <a href="https://www.iaad.it" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">IAAD</a>
                <a href="https://www.ius.to/" target="_blank" rel="noopener noreferrer" className="text-xs sm:text-sm text-muted-foreground font-light hover:text-primary transition-colors duration-500 underline underline-offset-4 decoration-muted-foreground/30 hover:decoration-primary cursor-pointer">IUSTO</a>
              </div>
            </div>
          </div>

          {/* Partnership */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-6 text-foreground">Partnership</h3>
            <div className="space-y-3">
              <a 
                href="https://www.unito.it/ricerca-e-innovazione/dalle-idee-al-mercato/incubatore-dimprese-2i3t"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-sm font-light text-muted-foreground hover:text-primary transition-colors duration-500 link-elegant"
              >
                2i3T - Incubatore UniTO
              </a>
              <p className="text-xs text-muted-foreground/60 font-light leading-relaxed">
                Incubati presso l'Università di Torino
              </p>
              <p className="text-xs text-muted-foreground/60 font-light">
                Garanzia di professionalità
              </p>
            </div>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="border-t border-border pt-12 text-center">
          <p className="text-primary/70 text-base font-accent mb-2 tracking-wide">
            Il tuo rifugio sicuro nella giungla immobiliare
          </p>
          <p className="text-muted-foreground/70 text-xs font-light">
            Supportati da 2i3T - Incubatore d'Imprese dell'Università di Torino
          </p>
        </div>
      </div>
      
      <LogoModal open={logoModalOpen} onOpenChange={setLogoModalOpen} />
    </footer>
  );
};
