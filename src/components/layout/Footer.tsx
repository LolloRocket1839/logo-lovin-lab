import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { MessageCircle, Mail, MapPin, Facebook } from "lucide-react";
import logo2i3t from "@/assets/2i3t-logo-green.png";
import euFundingBanner from "@/assets/eu-funding-banner.png";
import { CONTACTS, openGeneralEmail } from "@/constants";
import { FACEBOOK_SELLER_GROUP_URL } from "@/constants/social";
import { FairRentPledgeBadge } from "@/components/FairRentPledgeBadge";

export const Footer = () => {
  const { t, i18n } = useTranslation();
  const isEnglish = i18n.language.startsWith("en");

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    openGeneralEmail(isEnglish ? "en" : "it");
  };

  return (
    <footer id="footer" className="border-t border-border/40 bg-background">
      <div className="container mx-auto px-4 py-16 md:px-8 md:py-24">
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-2 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-bold text-foreground">Jungle Rent</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("footer.taglineAlt")}</p>
          </div>

          <div>
            <h2 className="mb-4 font-display text-base font-bold text-foreground">{t("footer.contactTitle")}</h2>
            <div className="space-y-3 text-sm text-muted-foreground">
              <a
                href={`https://wa.me/${CONTACTS.lorenzo.phone.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 hover:text-primary"
              >
                <MessageCircle className="mt-0.5 h-4 w-4" aria-hidden="true" />
                <span>Lorenzo: {CONTACTS.lorenzo.phone}</span>
              </a>
              <a href="#" onClick={handleEmailClick} className="flex items-start gap-2 hover:text-primary">
                <Mail className="mt-0.5 h-4 w-4" aria-hidden="true" />
                <span className="break-all">{CONTACTS.email}</span>
              </a>
              <p className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4" aria-hidden="true" />
                <span>{t("footer.location")}</span>
              </p>
              <a
                href={FACEBOOK_SELLER_GROUP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Facebook className="h-4 w-4" aria-hidden="true" />
                {t("footer.sellerCommunity", "VENDI CASA - Torino Jungle")}
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-4 font-display text-base font-bold text-foreground">
              {isEnglish ? "Pages" : "Pagine"}
            </h2>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to={isEnglish ? "/en/vendi" : "/vendi"} className="hover:text-primary">
                  {t("footer.sellProperty")}
                </Link>
              </li>
              <li>
                <Link to={isEnglish ? "/en/investitori" : "/investitori"} className="hover:text-primary">
                  {t("nav.investors")}
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to={isEnglish ? "/en/chi-siamo" : "/chi-siamo"} className="hover:text-primary">
                  {isEnglish ? "About" : "Chi siamo"}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto mt-14 max-w-5xl border-t border-border/40 pt-10 text-center">
          <a href="https://www.2i3t.it" target="_blank" rel="noopener noreferrer" className="inline-block">
            <img
              src={logo2i3t}
              alt="2i3T"
              className="mx-auto h-14 w-auto object-contain"
              loading="lazy"
              width={140}
              height={56}
              decoding="async"
            />
          </a>
          <p className="mt-3 text-sm text-muted-foreground">{t("footer.incubatorDesc")}</p>

          <div className="mt-8 flex justify-center">
            <FairRentPledgeBadge />
          </div>

          <div className="mt-8 flex justify-center">
            <a
              href="https://www.regione.piemonte.it/web/temi/fondi-europei/fondo-sociale-europeo/pr-fse-2021-2027"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-3 rounded-xl bg-[#003399] px-8 py-6"
            >
              <img
                src={euFundingBanner}
                alt="Coesione Italia 21-27 Piemonte — PR FSE+ 2021-2027"
                className="w-full max-w-[320px]"
                loading="lazy"
              />
              <span className="max-w-lg text-center text-[9px] leading-relaxed text-white/85">
                Realizzato con il finanziamento del Fondo Sociale Europeo Plus — PR FSE+ 2021-2027, Misura 8 e Misura 9
              </span>
            </a>
          </div>

          <div className="mt-10 space-y-1 text-xs text-muted-foreground">
            <p>JUNGLE RENT S.R.L. - Start-up Innovativa | P.IVA 13333450016 | REA TO-1355899</p>
            <p>
              {t("footer.legalAddress")} | PEC: junglerent@legalmail.it
            </p>
            <p className="pt-2">
              <Link to="/privacy" className="underline underline-offset-4 hover:text-primary">
                Privacy Policy
              </Link>
              <span className="px-2">|</span>
              <Link to="/termini-e-condizioni" className="underline underline-offset-4 hover:text-primary">
                {isEnglish ? "Terms & Conditions" : "Termini e Condizioni"}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
