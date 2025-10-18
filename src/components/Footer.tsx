import jungleRentLogo from "@/assets/jungle-rent-logo-transparent.png";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-warm-dark to-black border-t border-primary/10 relative overflow-hidden">
      {/* Decorative gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,hsl(150_55%_23%/0.1),transparent_50%)]" />
      
      <div className="container px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-6 inline-block p-3 bg-primary/10 rounded-2xl">
              <img 
                src={jungleRentLogo} 
                alt="Jungle Rent" 
                className="w-20 h-20"
              />
            </div>
            <p className="text-muted-foreground mb-6 leading-relaxed text-lg">
              Il modo rivoluzionario per affittare casa a Torino.
            </p>
            <p className="text-sm text-muted-foreground/70">
              © 2024 Jungle Rent. Tutti i diritti riservati.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-primary">Contatti</h3>
            <div className="space-y-4">
              <a 
                href="https://wa.me/393319053037" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="font-medium">Lorenzo: +39 331 905 3037</span>
              </a>
              <a 
                href="https://wa.me/393920675357" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="font-medium">Andrea: +39 392 067 5357</span>
              </a>
              <a 
                href="mailto:junglerententerprise@gmail.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-all duration-300 group"
              >
                <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium break-all">junglerententerprise@gmail.com</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <MapPin className="w-5 h-5" />
                </div>
                <span className="font-medium">Torino, Italia</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-xl mb-6 text-primary">Informazioni</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="hover:text-primary transition-colors duration-300">
                <a href="#how-it-works" className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-primary rounded-full" />
                  Come Funziona
                </a>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                Per studenti del Politecnico di Torino
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                Per studenti dell'Università di Torino
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
                Risparmio garantito del 25%
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary/10 pt-10 text-center">
          <p className="text-primary/80 text-lg italic mb-3">
            Il tuo rifugio sicuro nella giungla immobiliare
          </p>
          <p className="text-muted-foreground">
            Jungle Rent - Affitti Smart per Studenti Smart 🌳
          </p>
        </div>
      </div>
    </footer>
  );
};
