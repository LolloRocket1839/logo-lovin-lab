import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Seo } from "@/components/Seo";

const Students = () => {
  const { i18n } = useTranslation();
  const isItalian = !i18n.language.startsWith("en");

  const links = [
    {
      to: "/strumenti/aule-studio-torino",
      label: isItalian ? "Aule studio" : "Study spaces",
    },
    {
      to: "/strumenti/dove-mangiare-torino",
      label: isItalian ? "Dove mangiare" : "Cheap eats",
    },
    {
      to: "/strumenti/sportelli-studenti-torino",
      label: isItalian ? "Sportelli" : "Student desks",
    },
    {
      to: "/strumenti/palestre-torino-studenti",
      label: isItalian ? "Palestre" : "Gyms",
    },
  ];

  return (
    <>
      <Seo
        title={isItalian ? "Studenti a Torino | Jungle Rent" : "Students in Turin | Jungle Rent"}
        description={
          isItalian
            ? "Guide pratiche per studenti a Torino: aule studio, dove mangiare, sportelli e palestre."
            : "Practical guides for students in Turin: study spaces, cheap eats, student desks and gyms."
        }
        canonical="/studenti"
        locale={isItalian ? "it_IT" : "en_US"}
      />
      <main className="mx-auto w-full max-w-[720px] px-5 py-16">
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          {isItalian ? "Studenti a Torino" : "Students in Turin"}
        </h1>

        <p className="mt-6 text-muted-foreground">
          {isItalian
            ? "Raccogliamo informazioni pratiche su dove studiare, mangiare e allenarsi in città."
            : "We collect practical information on where to study, eat and train in the city."}
        </p>
        <p className="mt-4 text-muted-foreground">
          {isItalian
            ? "Gli elenchi sono aggiornati a mano e restano gratuiti."
            : "The lists are curated by hand and stay free."}
        </p>
        <p className="mt-4 text-muted-foreground">
          {isItalian
            ? "Se cerchi una stanza, guarda anche i quartieri della città."
            : "If you are looking for a room, take a look at the city neighborhoods too."}
        </p>

        <ul className="mt-10 divide-y divide-border">
          {links.map((l) => (
            <li key={l.to} className="py-3">
              <Link to={l.to} className="underline-offset-4 hover:underline">
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 flex flex-wrap gap-6">
          <Link to="/blog?category=students" className="text-sm underline underline-offset-4">
            {isItalian ? "Articoli per studenti" : "Articles for students"}
          </Link>
          <Link to="/affitto-stanza-torino" className="text-sm underline underline-offset-4">
            {isItalian ? "Quartieri di Torino" : "Turin neighborhoods"}
          </Link>
        </p>
      </main>
    </>
  );
};

export default Students;
