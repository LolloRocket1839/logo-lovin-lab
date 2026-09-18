import { useTranslation } from "react-i18next";
import { DirectoryPage } from "@/components/DirectoryPage";
import { detailedStudySpaces } from "@/data/detailedStudySpaces";

const StudySpacesDirectory = () => {
  const { i18n } = useTranslation();
  const isItalian = !i18n.language.startsWith("en");

  const items = detailedStudySpaces.map((s) => ({
    id: String(s.id),
    name: s.name,
    address: `${s.address} — ${s.district}`,
    hours: `${isItalian ? "Lun" : "Mon"}: ${s.hours.monday} · ${isItalian ? "Sab" : "Sat"}: ${s.hours.saturday}`,
    website: s.website,
  }));

  return (
    <DirectoryPage
      isItalian={isItalian}
      title={isItalian ? "Aule studio a Torino | Jungle Rent" : "Study spaces in Turin | Jungle Rent"}
      description={
        isItalian
          ? "Aule studio, biblioteche e spazi dove studiare a Torino: indirizzi, orari e contatti."
          : "Study rooms, libraries and places to study in Turin: addresses, hours and contacts."
      }
      canonical="/strumenti/aule-studio-torino"
      heading={isItalian ? "Aule studio a Torino" : "Study spaces in Turin"}
      intro={
        isItalian
          ? "Elenco di aule studio, biblioteche e spazi aperti agli studenti in città."
          : "A list of study rooms, libraries and spaces open to students in the city."
      }
      searchLabel={isItalian ? "Cerca per nome o zona" : "Search by name or area"}
      items={items}
      backLabel={isItalian ? "Torna alla pagina studenti" : "Back to students page"}
    />
  );
};

export default StudySpacesDirectory;
