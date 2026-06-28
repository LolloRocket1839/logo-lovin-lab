import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MessageCircle, Calculator, Info, Utensils, MapPin, TrendingUp } from "lucide-react";
import { CONTACTS } from "@/constants";
import jungleRentLogo from "@/assets/jungle-rent-logo-new.svg";
import euFundingBanner from "@/assets/eu-funding-banner.png";

export const MobileFooter = () => {
  const { t, i18n } = useTranslation();
  const isIt = i18n.language?.startsWith('it');

  return (
    <footer className="md:hidden bg-muted/30 border-t border-border/20 py-8 px-4">
      <div className="flex flex-col items-center gap-6">

        {/* ── TIER 1: PRIMARY ACTIONS ── */}
        <div className="w-full flex flex-wrap justify-center gap-3">
          <Link
            to={isIt ? '/chi-siamo' : '/about'}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-background border border-border/40 text-foreground font-medium text-xs active:text-primary active:border-primary/40 active:bg-primary/5 transition-colors"
          >
            <Info className="w-3.5 h-3.5" />
            <span>{isIt ? 'Chi siamo' : 'About us'}</span>
          </Link>
          <Link
            to={isIt ? '/valutazione-immobile' : '/property-valuation'}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-background border border-border/40 text-foreground font-medium text-xs active:text-primary active:border-primary/40 active:bg-primary/5 transition-colors"
          >
            <Calculator className="w-3.5 h-3.5" />
            <span>{isIt ? 'Valuta immobile' : 'Valuate property'}</span>
          </Link>
          <Link
            to={isIt ? '/strumenti/dove-mangiare-torino' : '/tools/cheap-eats-turin'}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-background border border-border/40 text-foreground font-medium text-xs active:text-primary active:border-primary/40 active:bg-primary/5 transition-colors"
          >
            <Utensils className="w-3.5 h-3.5" />
            <span>{isIt ? 'Dove mangiare' : 'Cheap eats'}</span>
          </Link>
        </div>

        {/* ── TIER 2: SEO LINK GROUPS ── */}
        <div className="w-full flex flex-col gap-4 pt-6 border-t border-border/10">

          {/* Popular Neighborhoods */}
          <div className="w-full">
            <p className="text-[11px] font-medium text-muted-foreground/50 text-center mb-2">
              {isIt ? 'Quartieri popolari' : 'Popular neighborhoods'}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/affitto-stanza-torino/san-salvario"
                className="px-2 py-1 rounded-full bg-background border border-border/20 text-[11px] text-muted-foreground/60 active:text-primary active:border-primary/30 active:bg-primary/5 transition-colors"
              >
                San Salvario
              </Link>
              <Link
                to="/affitto-stanza-torino/crocetta"
                className="px-2 py-1 rounded-full bg-background border border-border/20 text-[11px] text-muted-foreground/60 active:text-primary active:border-primary/30 active:bg-primary/5 transition-colors"
              >
                Crocetta
              </Link>
              <Link
                to="/affitto-stanza-torino/cenisia"
                className="px-2 py-1 rounded-full bg-background border border-border/20 text-[11px] text-muted-foreground/60 active:text-primary active:border-primary/30 active:bg-primary/5 transition-colors"
              >
                Cenisia
              </Link>
              <Link
                to="/affitto-stanza-torino/vanchiglia"
                className="px-2 py-1 rounded-full bg-background border border-border/20 text-[11px] text-muted-foreground/60 active:text-primary active:border-primary/30 active:bg-primary/5 transition-colors"
              >
                Vanchiglia
              </Link>
              <Link
                to={isIt ? '/affitti-lingotto-ospedali-torino' : '/rent-lingotto-hospitals-turin'}
                className="px-2 py-1 rounded-full bg-background border border-border/20 text-[11px] text-muted-foreground/60 active:text-primary active:border-primary/30 active:bg-primary/5 transition-colors"
              >
                Lingotto / Ospedali
              </Link>
              <Link
                to="/affitto-stanza-torino"
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-background border border-primary/30 text-[11px] text-primary font-medium active:bg-primary/5 active:border-primary/40 transition-colors"
              >
                <MapPin className="w-3 h-3" />
                {isIt ? 'Tutti' : 'All'}
              </Link>
            </div>
          </div>

          {/* Investment Zones */}
          <div className="w-full">
            <p className="text-[11px] font-medium text-muted-foreground/50 text-center mb-2">
              {isIt ? 'Zone investimento' : 'Investment zones'}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link
                to="/investitori/zone/aurora"
                className="px-2 py-1 rounded-full bg-background border border-border/20 text-[11px] text-muted-foreground/60 active:text-primary active:border-primary/30 active:bg-primary/5 transition-colors"
              >
                Aurora
              </Link>
              <Link
                to="/investitori/zone/barriera-di-milano"
                className="px-2 py-1 rounded-full bg-background border border-border/20 text-[11px] text-muted-foreground/60 active:text-primary active:border-primary/30 active:bg-primary/5 transition-colors"
              >
                Barriera
              </Link>
              <Link
                to="/investitori/zone/cenisia"
                className="px-2 py-1 rounded-full bg-background border border-border/20 text-[11px] text-muted-foreground/60 active:text-primary active:border-primary/30 active:bg-primary/5 transition-colors"
              >
                Cenisia
              </Link>
              <Link
                to="/investitori/zone/san-salvario"
                className="px-2 py-1 rounded-full bg-background border border-border/20 text-[11px] text-muted-foreground/60 active:text-primary active:border-primary/30 active:bg-primary/5 transition-colors"
              >
                San Salvario
              </Link>
              <Link
                to="/investitori/zone"
                className="flex items-center gap-1 px-2 py-1 rounded-full bg-background border border-primary/30 text-[11px] text-primary font-medium active:bg-primary/5 active:border-primary/40 transition-colors"
              >
                <TrendingUp className="w-3 h-3" />
                {isIt ? 'Tutte' : 'All'}
              </Link>
            </div>
          </div>
        </div>

        {/* ── EU FUNDING BANNER (UNCHANGED) ── */}
        <div className="w-full pt-2">
          <a
            href="https://www.regione.piemonte.it/web/temi/fondi-europei/fondo-sociale-europeo/pr-fse-2021-2027"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#003399] rounded-xl px-5 py-5 flex flex-col items-center gap-2 hover:bg-[#002b80] transition-colors cursor-pointer"
          >
            <img
              src={euFundingBanner}
              alt="Coesione Italia 21-27 Piemonte — L'Europa investe sul Piemonte, il Piemonte investe su di te — PR FSE+ 2021-2027"
              className="w-full max-w-[260px]"
              style={{ imageRendering: 'auto' }}
              loading="lazy"
            />
            <p className="text-[9px] tracking-wide text-white/60 text-center leading-relaxed max-w-xs">
              Realizzato con il finanziamento del Fondo Sociale Europeo Plus — PR FSE+ 2021-2027, Misura 8 e Misura 9
            </p>
          </a>
        </div>

        {/* ── TIER 4: LEGAL BASELINE ── */}
        <div className="w-full flex flex-col items-center gap-3 pt-4 border-t border-border/10">
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
              className="text-muted-foreground active:text-primary transition-colors"
            >
              Privacy
            </Link>
            <span className="text-muted-foreground/40">|</span>
            <Link
              to="/termini-e-condizioni"
              className="text-muted-foreground active:text-primary transition-colors"
            >
              {isIt ? 'Termini' : 'Terms'}
            </Link>
          </div>

          {/* WhatsApp Contact */}
          <a
            href={`https://wa.me/${CONTACTS.lorenzo.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-xs text-primary active:text-primary/80 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>{t('nav.contactUs')}</span>
          </a>
        </div>

      </div>
    </footer>
  );
};
