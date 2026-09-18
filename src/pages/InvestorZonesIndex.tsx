import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { investorZones, formatPrice } from "@/data/investorZoneData";

const InvestorZonesIndex = () => {
  const { i18n } = useTranslation();
  const isItalian = !i18n.language.startsWith("en");

  const title = isItalian
    ? "Zone di Torino per investire | Jungle Rent"
    : "Turin zones for investors | Jungle Rent";
  const description = isItalian
    ? "Le zone di Torino che seguiamo: prezzi medi al metro quadro, domanda e tempi di affitto."
    : "The Turin areas we track: average price per sqm, demand and time to rent.";

  const sorted = [...investorZones].sort(
    (a, b) => a.pricePerSqm.avg - b.pricePerSqm.avg
  );

  return (
    <>
      <Seo
        title={title}
        description={description}
        canonical="/investitori/zone"
        locale={isItalian ? "it_IT" : "en_US"}
      />
      <main className="mx-auto w-full max-w-[720px] px-5 py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {isItalian ? "Zone di Torino" : "Turin zones"}
        </h1>
        <p className="mt-6 text-muted-foreground">{description}</p>

        <ul className="mt-10 divide-y divide-border">
          {sorted.map((z) => (
            <li key={z.slug} className="py-3">
              <Link
                to={`/investitori/zone/${z.slug}`}
                className="flex items-baseline justify-between gap-4 underline-offset-4 hover:underline"
              >
                <span>{z.name}</span>
                <span className="text-sm text-muted-foreground">
                  {formatPrice(z.pricePerSqm.avg)}/m²
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-10">
          <Button asChild>
            <Link to="/investitori">
              {isItalian ? "Informazioni per investitori" : "Investor information"}
            </Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export default InvestorZonesIndex;
