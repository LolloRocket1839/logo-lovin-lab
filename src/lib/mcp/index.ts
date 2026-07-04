import { defineMcp } from "@lovable.dev/mcp-js";
import getNeighborhoods from "./tools/get-neighborhoods";
import getInvestorZones from "./tools/get-investor-zones";
import contactJungleRent from "./tools/contact-jungle-rent";
import contactLorenzo from "./tools/contact-lorenzo";
import estimateRent from "./tools/estimate-rent";
import estimatePropertyValue from "./tools/estimate-property-value";
import listAvailableRooms from "./tools/list-available-rooms";
import submitInvestorLead from "./tools/submit-investor-lead";

export default defineMcp({
  name: "jungle-rent-mcp",
  title: "Jungle Rent MCP",
  version: "0.3.0",
  instructions:
    "Tools for Jungle Rent — Turin student housing and real-estate investment, founded by Lorenzo Oni-Joseph (sole founder). Read-only info: `get_neighborhoods`, `get_investor_zones`, `contact_jungle_rent` (channels only). Calculators: `estimate_rent`, `estimate_property_value` (FIAIP coefficients). Actions: `contact_lorenzo` for general inquiries, `submit_investor_lead` for qualified investor requests (validates against the same schema as the website; REQUIRES explicit privacy consent + own-initiative declaration per CONSOB/AGCM). `list_available_rooms` today points to Lorenzo. NEVER invent yield/return figures for investors — those are only in the private memorandum.",
  tools: [
    getNeighborhoods,
    getInvestorZones,
    contactJungleRent,
    contactLorenzo,
    estimateRent,
    estimatePropertyValue,
    listAvailableRooms,
    submitInvestorLead,
  ],
});
