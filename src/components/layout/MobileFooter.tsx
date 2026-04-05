import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MessageCircle, Calculator, Info, Utensils, MapPin, TrendingUp } from "lucide-react";
import { CONTACTS } from "@/constants";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import regionePiemonteLogo from "@/assets/regione-piemonte-logo.jpg";

export const MobileFooter = () => {
  const { t, i18n } = useTranslation();
  const isIt = i18n.language?.startsWith('it');

  return (
    <footer className="md:hidden bg-muted/30 border-t border-border/20 py-6 px-4">
      <div className="flex flex-col items-center gap-5">
        {/* Popular Neighborhoods for SEO */}
        <div className="w-full">
          <p className="text-xs font-medium text-muted-foreground text-center mb-2">
            {isIt ? 'Quartieri popolari' : 'Popular neighborhoods'}
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <Link 
              to="/affitto-stanza-torino/san-salvario"
              className="px-2.5 py-1 rounded-full bg-background border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            >
              San Salvario
            </Link>
            <Link 
              to="/affitto-stanza-torino/crocetta"
              className="px-2.5 py-1 rounded-full bg-background border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            >
              Crocetta
            </Link>
            <Link 
              to="/affitto-stanza-torino/cenisia"
              className="px-2.5 py-1 rounded-full bg-background border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            >
              Cenisia
            </Link>
            <Link 
              to="/affitto-stanza-torino/vanchiglia"
              className="px-2.5 py-1 rounded-full bg-background border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            >
              Vanchiglia
            </Link>
            <Link 
              to="/affitto-stanza-torino"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium hover:bg-primary/20 transition-colors"
            >
              <MapPin className="w-3 h-3" />
              {isIt ? 'Tutti' : 'All'}
            </Link>
          </div>
        </div>

        {/* Investment Zones for SEO */}
        <div className="w-full">
          <p className="text-xs font-medium text-muted-foreground text-center mb-2">
            {isIt ? 'Zone investimento' : 'Investment zones'}
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-xs">
            <Link 
              to="/investitori/zone/aurora"
              className="px-2.5 py-1 rounded-full bg-background border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            >
              Aurora
            </Link>
            <Link 
              to="/investitori/zone/barriera-di-milano"
              className="px-2.5 py-1 rounded-full bg-background border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            >
              Barriera
            </Link>
            <Link 
              to="/investitori/zone/cenisia"
              className="px-2.5 py-1 rounded-full bg-background border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            >
              Cenisia
            </Link>
            <Link 
              to="/investitori/zone/san-salvario"
              className="px-2.5 py-1 rounded-full bg-background border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/30 transition-colors"
            >
              San Salvario
            </Link>
            <Link 
              to="/investitori/zone"
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary font-medium hover:bg-primary/20 transition-colors"
            >
              <TrendingUp className="w-3 h-3" />
              {isIt ? 'Tutte' : 'All'}
            </Link>
          </div>
        </div>

        {/* Quick Links for SEO */}
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

        {/* Regione Piemonte Funding */}
        <div className="flex flex-col items-center gap-2 pt-2 border-t border-border/10 w-full">
          <a href="https://www.regione.piemonte.it" target="_blank" rel="noopener noreferrer">
            <img 
              src={regionePiemonteLogo} 
              alt="Regione Piemonte" 
              className="h-12 w-auto opacity-80"
              loading="lazy"
            />
          </a>
          <p className="text-[10px] text-muted-foreground text-center leading-relaxed max-w-xs">
            Realizzato con il finanziamento del Fondo Sociale Europeo Plus — PR FSE+ 2021-2027, Misura 8 e Misura 9
          </p>
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
