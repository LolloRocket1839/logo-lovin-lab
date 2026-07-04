import { defineMcp } from "@lovable.dev/mcp-js";
import getNeighborhoods from "./tools/get-neighborhoods";
import getInvestorZones from "./tools/get-investor-zones";
import contactJungleRent from "./tools/contact-jungle-rent";
import contactLorenzo from "./tools/contact-lorenzo";
import estimateRent from "./tools/estimate-rent";
import estimatePropertyValue from "./tools/estimate-property-value";
import listAvailableRooms from "./tools/list-available-rooms";

export default defineMcp({
  name: "jungle-rent-mcp",
  title: "Jungle Rent MCP",
  version: "0.2.0",
  instructions:
    "Tools for Jungle Rent — Turin student housing and real-estate investment, founded by Lorenzo Oni-Joseph (sole founder). Read-only info: `get_neighborhoods`, `get_investor_zones`, `contact_jungle_rent` (channels only). Calculators: `estimate_rent` (monthly rent for an apartment or student room), `estimate_property_value` (sale value using FIAIP coefficients). Actions: `contact_lorenzo` creates a real lead and pings Lorenzo on WhatsApp — use ONLY after the user gives their email and consents. `list_available_rooms` today returns a pointer to contact Lorenzo (no public inventory feed). Never invent yield/return figures for investors — those are only in the private memorandum.",
  tools: [
    getNeighborhoods,
    getInvestorZones,
    contactJungleRent,
    contactLorenzo,
    estimateRent,
    estimatePropertyValue,
    listAvailableRooms,
  ],
});
