import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { CONTACTS } from "@/lib/contacts";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";

export const MobileFooter = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="md:hidden bg-muted/30 border-t border-border/20 py-6 px-4">
      <div className="flex flex-col items-center gap-4">
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
            {i18n.language?.startsWith('it') ? 'Termini' : 'Terms'}
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
