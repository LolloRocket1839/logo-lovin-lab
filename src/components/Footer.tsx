import jungleRentLogo from "@/assets/jungle-rent-logo.svg";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-background border-t border-border relative overflow-hidden">
      {/* Top border decoration */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent" />
      
      <div className="container px-8 py-24 relative z-10">
        <div className="grid md:grid-cols-3 gap-16 mb-20 max-w-6xl mx-auto">
          {/* Brand */}
          <div>
            <div className="mb-6">
              <img 
                src={jungleRentLogo} 
                alt="Jungle Rent" 
                className="w-16 h-16 opacity-80 rounded-2xl"
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
                href="https://wa.me/393319053037" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-500 group"
              >
                <MessageCircle className="w-4 h-4 mt-0.5 opacity-60 group-hover:opacity-100" strokeWidth={1.5} />
                <span className="text-sm font-light link-elegant">Lorenzo: +39 331 905 3037</span>
              </a>
              <a 
                href="https://wa.me/393920675357" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-500 group"
              >
                <MessageCircle className="w-4 h-4 mt-0.5 opacity-60 group-hover:opacity-100" strokeWidth={1.5} />
                <span className="text-sm font-light link-elegant">Andrea: +39 392 067 5357</span>
              </a>
              <a 
                href="mailto:junglerententerprise@gmail.com"
                className="flex items-start gap-3 text-muted-foreground hover:text-primary transition-colors duration-500 group"
              >
                <Mail className="w-4 h-4 mt-0.5 opacity-60 group-hover:opacity-100" strokeWidth={1.5} />
                <span className="text-sm font-light link-elegant break-all">junglerententerprise@gmail.com</span>
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
              <li className="text-sm font-light">
                Politecnico di Torino
              </li>
              <li className="text-sm font-light">
                Università di Torino
              </li>
              <li className="text-sm font-light">
                Risparmio garantito 25%
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom tagline */}
        <div className="border-t border-border pt-12 text-center">
          <p className="text-primary/70 text-base font-accent mb-2 tracking-wide">
            Il tuo rifugio sicuro nella giungla immobiliare
          </p>
          <p className="text-muted-foreground/60 text-xs font-light tracking-wider">
            JUNGLE RENT — AFFITTI SMART PER STUDENTI SMART
          </p>
        </div>
      </div>
    </footer>
  );
};
