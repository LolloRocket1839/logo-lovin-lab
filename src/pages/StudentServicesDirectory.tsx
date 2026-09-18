import { useTranslation } from "react-i18next";
import { DirectoryPage } from "@/components/DirectoryPage";
import { studentServicesData } from "@/data/studentServicesDirectory";

const StudentServicesDirectory = () => {
  const { i18n } = useTranslation();
  const isItalian = !i18n.language.startsWith("en");

  const items = studentServicesData.map((s) => ({
    id: s.id,
    name: `${s.name} — ${s.institutionName}`,
    address: `${s.address} — ${s.district}`,
    hours: `${isItalian ? "Lun" : "Mon"}: ${s.hours.monday}`,
    note: s.email,
    website: s.website,
  }));

  return (
    <DirectoryPage
      isItalian={isItalian}
      title={isItalian ? "Sportelli per studenti a Torino | Jungle Rent" : "Student desks in Turin | Jungle Rent"}
      description={
        isItalian
          ? "Sportelli e uffici per studenti a Torino: indirizzi, orari e contatti."
          : "Student desks and offices in Turin: addresses, hours and contacts."
      }
      canonical="/strumenti/sportelli-studenti-torino"
      heading={isItalian ? "Sportelli per studenti" : "Student desks"}
      intro={
        isItalian
          ? "Uffici e sportelli di atenei ed enti che seguono gli studenti in città."
          : "University and public offices supporting students in the city."
      }
      searchLabel={isItalian ? "Cerca per nome o zona" : "Search by name or area"}
      items={items}
      backLabel={isItalian ? "Torna alla pagina studenti" : "Back to students page"}
    />
  );
};

export default StudentServicesDirectory;
