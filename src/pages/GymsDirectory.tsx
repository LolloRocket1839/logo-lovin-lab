import { useTranslation } from "react-i18next";
import { DirectoryPage } from "@/components/DirectoryPage";
import { gymsData } from "@/data/gymsDirectory";

const GymsDirectory = () => {
  const { i18n } = useTranslation();
  const isItalian = !i18n.language.startsWith("en");

  const items = gymsData.map((g) => ({
    id: g.id,
    name: g.name,
    address: `${g.address} — ${g.district}`,
    hours: `${isItalian ? "Feriali" : "Weekdays"}: ${g.hours.weekday} · ${isItalian ? "Weekend" : "Weekend"}: ${g.hours.weekend}`,
    note: `${isItalian ? "Da" : "From"} €${g.priceStudent ?? g.priceStandard}/${isItalian ? "mese" : "month"}`,
    website: g.website,
  }));

  return (
    <DirectoryPage
      isItalian={isItalian}
      title={isItalian ? "Palestre a Torino per studenti | Jungle Rent" : "Gyms in Turin for students | Jungle Rent"}
      description={
        isItalian
          ? "Palestre a Torino con prezzi per studenti: indirizzi, orari e costo mensile."
          : "Gyms in Turin with student pricing: addresses, hours and monthly cost."
      }
      canonical="/strumenti/palestre-torino-studenti"
      heading={isItalian ? "Palestre a Torino" : "Gyms in Turin"}
      intro={
        isItalian
          ? "Palestre della città con prezzo mensile indicativo e orari."
          : "City gyms with indicative monthly price and opening hours."
      }
      searchLabel={isItalian ? "Cerca per nome o zona" : "Search by name or area"}
      items={items}
      backLabel={isItalian ? "Torna alla pagina studenti" : "Back to students page"}
    />
  );
};

export default GymsDirectory;
