import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MessageCircle, Calculator, Info, Utensils } from "lucide-react";
import { CONTACTS } from "@/constants";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

export const MobileFooter = () => {
  const { t, i18n } = useTranslation();
  const isIt = i18n.language?.startsWith('it');

  return (
    <footer className="md:hidden bg-muted/30 border-t border-border/20 py-6 px-4">
      <div className="flex flex-col items-center gap-5">
        {/* Quick Links for SEO - NEW */}
        <div className="flex flex-wrap justify-center gap-3 text-xs">
          <Link 
            to={isIt ? '/chi-siamo' : '/about'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{isIt ? 'Chi siamo' : 'About us'}</span>
          </Link>
          <Link 
            to={isIt ? '/valutazione-immobile' : '/property-valuation'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{isIt ? 'Valuta immobile' : 'Valuate property'}</span>
          </Link>
          <Link 
            to={isIt ? '/strumenti/dove-mangiare-torino' : '/tools/cheap-eats-turin'}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-background border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>{isIt ? 'Dove mangiare' : 'Cheap eats'}</span>
          </Link>
        </div>

        {/* Logo + Copyright */}
        <div className="flex items-center gap-2">
          <img 
            src={jungleRentLogo} 
            alt="Jungle Rent" 
            className="w-6 h-6 opacity-80"
          />
          <span className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Jungle Rent S.r.l.
          </span>
        </div>

        {/* Legal Links */}
        <div className="flex items-center gap-3 text-xs">
          <Link 
            to="/privacy" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy
          </Link>
          <span className="text-muted-foreground/40">|</span>
          <Link 
            to="/termini-e-condizioni" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            {isIt ? 'Termini' : 'Terms'}
          </Link>
        </div>

        {/* WhatsApp Contact */}
        <a 
          href={`https://wa.me/${CONTACTS.lorenzo.phone}`}
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs text-primary hover:text-primary/80 transition-colors"
        >
          <MessageCircle className="w-4 h-4" />
          <span>{t('nav.contactUs')}</span>
        </a>
      </div>
    </footer>
  );
};
