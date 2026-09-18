import { useTranslation } from "react-i18next";
import { DirectoryPage } from "@/components/DirectoryPage";
import { cheapEatsData } from "@/data/cheapEatsDirectory";

const CheapEatsDirectory = () => {
  const { i18n } = useTranslation();
  const isItalian = !i18n.language.startsWith("en");

  const items = cheapEatsData.map((c) => ({
    id: c.id,
    name: c.name,
    address: `${c.address} — ${c.district}`,
    hours: `${isItalian ? "Lun" : "Mon"}: ${c.hours.monday}`,
    note: `${c.typicalDish} · ${c.avgMealPrice}`,
    website: c.website,
  }));

  return (
    <DirectoryPage
      isItalian={isItalian}
      title={isItalian ? "Dove mangiare a Torino | Jungle Rent" : "Cheap eats in Turin | Jungle Rent"}
      description={
        isItalian
          ? "Locali economici a Torino per studenti: indirizzi, orari e prezzo medio."
          : "Budget places to eat in Turin for students: addresses, hours and average price."
      }
      canonical="/strumenti/dove-mangiare-torino"
      heading={isItalian ? "Dove mangiare a Torino" : "Cheap eats in Turin"}
      intro={
        isItalian
          ? "Posti dove mangiare spendendo poco in città, con prezzo medio e indirizzo."
          : "Places to eat on a budget in the city, with average price and address."
      }
      searchLabel={isItalian ? "Cerca per nome o zona" : "Search by name or area"}
      items={items}
      backLabel={isItalian ? "Torna alla pagina studenti" : "Back to students page"}
    />
  );
};

export default CheapEatsDirectory;
