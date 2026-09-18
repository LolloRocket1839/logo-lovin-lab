import { useParams, Link, Navigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { getZoneBySlug, formatPrice } from "@/data/investorZoneData";

const InvestorZonePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const lang = (i18n.language.startsWith("en") ? "en" : "it") as "it" | "en";
  const zone = getZoneBySlug(slug || "");

  if (!zone) {
    return <Navigate to="/investitori/zone" replace />;
  }

  const seo = zone.seo[lang];
  const indexPath = "/investitori/zone";

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        canonical={`/investitori/zone/${zone.slug}`}
        locale={lang === "en" ? "en_US" : "it_IT"}
      />
      <main className="mx-auto w-full max-w-[720px] px-5 py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {zone.name}
        </h1>

        <p className="mt-6 text-muted-foreground">{zone.investorNote[lang]}</p>

        <p className="mt-4 text-muted-foreground">
          {lang === "en"
            ? `${zone.name} is a ${zone.zone} area of Turin. Typical tenants: ${zone.targetTenant.en.join(", ")}. Average time to rent: ${zone.rentingTime.en}.`
            : `${zone.name} è una zona ${zone.zone.toLowerCase()} di Torino. Inquilini tipici: ${zone.targetTenant.it.join(", ")}. Tempo medio di affitto: ${zone.rentingTime.it}.`}
        </p>

        <table className="mt-10 w-full border-collapse text-sm">
          <tbody>
            <tr className="border-b border-border">
              <th scope="row" className="py-3 text-left font-normal text-muted-foreground">
                {lang === "en" ? "Average price per sqm" : "Prezzo medio al m²"}
              </th>
              <td className="py-3 text-right font-medium">{formatPrice(zone.pricePerSqm.avg)}</td>
            </tr>
            <tr className="border-b border-border">
              <th scope="row" className="py-3 text-left font-normal text-muted-foreground">
                {lang === "en" ? "Price range per sqm" : "Range prezzi al m²"}
              </th>
              <td className="py-3 text-right font-medium">
                {formatPrice(zone.pricePerSqm.min)} – {formatPrice(zone.pricePerSqm.max)}
              </td>
            </tr>
            <tr className="border-b border-border">
              <th scope="row" className="py-3 text-left font-normal text-muted-foreground">
                {lang === "en" ? "2024 variation" : "Variazione 2024"}
              </th>
              <td className="py-3 text-right font-medium">
                {zone.variation2024 > 0 ? "+" : ""}
                {zone.variation2024}%
              </td>
            </tr>
            <tr className="border-b border-border">
              <th scope="row" className="py-3 text-left font-normal text-muted-foreground">
                {lang === "en" ? "Vacancy rate" : "Sfitto"}
              </th>
              <td className="py-3 text-right font-medium">
                {zone.vacancyRate.min}–{zone.vacancyRate.max}%
              </td>
            </tr>
          </tbody>
        </table>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild>
            <Link to="/investitori">
              {lang === "en" ? "Investor information" : "Informazioni per investitori"}
            </Link>
          </Button>
          <Link to={indexPath} className="text-sm underline underline-offset-4">
            {lang === "en" ? "All zones" : "Tutte le zone"}
          </Link>
        </div>
      </main>
    </>
  );
};

export default InvestorZonePage;
