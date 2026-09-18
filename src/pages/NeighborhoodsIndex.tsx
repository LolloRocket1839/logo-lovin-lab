import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { neighborhoods } from "@/data/neighborhoods";

const NeighborhoodsIndex = () => {
  const { i18n } = useTranslation();
  const isItalian = !i18n.language.startsWith("en");

  const title = isItalian
    ? "Affitto stanza Torino | Tutti i quartieri"
    : "Room for rent Turin | All neighborhoods";
  const description = isItalian
    ? "I quartieri di Torino per studenti: prezzi medi delle stanze, trasporti e profilo di zona."
    : "Turin neighborhoods for students: average room prices, transport and area profile.";

  const sorted = [...neighborhoods].sort(
    (a, b) => a.avgRent.double.min - b.avgRent.double.min
  );

  return (
    <>
      <Seo
        title={title}
        description={description}
        canonical="/affitto-stanza-torino"
        locale={isItalian ? "it_IT" : "en_US"}
      />
      <main className="mx-auto w-full max-w-[720px] px-5 py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {isItalian ? "Quartieri di Torino" : "Turin neighborhoods"}
        </h1>
        <p className="mt-6 text-muted-foreground">{description}</p>

        <ul className="mt-10 divide-y divide-border">
          {sorted.map((n) => (
            <li key={n.slug} className="py-3">
              <Link
                to={`/affitto-stanza-torino/${n.slug}`}
                className="flex items-baseline justify-between gap-4 underline-offset-4 hover:underline"
              >
                <span>{n.name}</span>
                <span className="text-sm text-muted-foreground">
                  {isItalian ? "da" : "from"} €{n.avgRent.double.min}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default NeighborhoodsIndex;
