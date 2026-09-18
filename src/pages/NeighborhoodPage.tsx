import { useParams, Navigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";
import { getNeighborhoodBySlug } from "@/data/neighborhoods";

const NeighborhoodPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const { i18n } = useTranslation();
  const lang = (i18n.language.startsWith("en") ? "en" : "it") as "it" | "en";
  const neighborhood = slug ? getNeighborhoodBySlug(slug) : undefined;

  if (!neighborhood) {
    return <Navigate to="/affitto-stanza-torino" replace />;
  }

  const seo = neighborhood.seo[lang];

  return (
    <>
      <Seo
        title={seo.title}
        description={seo.description}
        canonical={`/affitto-stanza-torino/${neighborhood.slug}`}
        locale={lang === "en" ? "en_US" : "it_IT"}
      />
      <main className="mx-auto w-full max-w-[720px] px-5 py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {neighborhood.name}
        </h1>

        <p className="mt-6 text-muted-foreground">{neighborhood.description[lang]}</p>
        <p className="mt-4 text-muted-foreground">{neighborhood.studentProfile[lang]}</p>
        <p className="mt-4 text-muted-foreground">
          {lang === "en"
            ? `Transport: ${neighborhood.transport.join(", ")}. Universities nearby: ${neighborhood.universities.join(", ")}.`
            : `Trasporti: ${neighborhood.transport.join(", ")}. Atenei vicini: ${neighborhood.universities.join(", ")}.`}
        </p>

        <table className="mt-10 w-full border-collapse text-sm">
          <tbody>
            <tr className="border-b border-border">
              <th scope="row" className="py-3 text-left font-normal text-muted-foreground">
                {lang === "en" ? "Single room" : "Stanza singola"}
              </th>
              <td className="py-3 text-right font-medium">
                €{neighborhood.avgRent.single.min}–{neighborhood.avgRent.single.max}
                {lang === "en" ? "/month" : "/mese"}
              </td>
            </tr>
            <tr className="border-b border-border">
              <th scope="row" className="py-3 text-left font-normal text-muted-foreground">
                {lang === "en" ? "Shared room" : "Stanza doppia"}
              </th>
              <td className="py-3 text-right font-medium">
                €{neighborhood.avgRent.double.min}–{neighborhood.avgRent.double.max}
                {lang === "en" ? "/month" : "/mese"}
              </td>
            </tr>
            <tr className="border-b border-border">
              <th scope="row" className="py-3 text-left font-normal text-muted-foreground">
                {lang === "en" ? "Area" : "Zona"}
              </th>
              <td className="py-3 text-right font-medium">{neighborhood.zone}</td>
            </tr>
          </tbody>
        </table>

        <p className="mt-10">
          <Link to="/affitto-stanza-torino" className="text-sm underline underline-offset-4">
            {lang === "en" ? "All neighborhoods" : "Tutti i quartieri"}
          </Link>
        </p>
      </main>
    </>
  );
};

export default NeighborhoodPage;
