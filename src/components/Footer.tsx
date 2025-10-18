import jungleRentLogo from "@/assets/jungle-rent-logo.png";
import { MessageCircle, Mail, MapPin } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-warm-dark border-t border-border/50">
      <div className="container px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <img 
              src={jungleRentLogo} 
              alt="Jungle Rent" 
              className="w-20 h-20 mb-4"
            />
            <p className="text-muted-foreground mb-4">
              Il modo rivoluzionario per affittare casa a Torino.
            </p>
            <p className="text-sm text-muted-foreground">
              © 2024 Jungle Rent. Tutti i diritti riservati.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-lg mb-4">Contatti</h3>
            <div className="space-y-3">
              <a 
                href="https://wa.me/393920675357" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>WhatsApp: +39 392 067 5357</span>
              </a>
              <a 
                href="mailto:info@junglerent.com"
                className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>info@junglerent.com</span>
              </a>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Torino, Italia</span>
              </div>
            </div>
          </div>

          {/* Info */}
          <div>
            <h3 className="font-bold text-lg mb-4">Informazioni</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#how-it-works" className="hover:text-primary transition-colors">
                  Come Funziona
                </a>
              </li>
              <li>Per studenti del Politecnico di Torino</li>
              <li>Per studenti dell'Università di Torino</li>
              <li>Risparmio garantito del 25%</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 text-center text-sm text-muted-foreground">
          <p>Jungle Rent - Affitti Smart per Studenti Smart 🌳</p>
        </div>
      </div>
    </footer>
  );
};
