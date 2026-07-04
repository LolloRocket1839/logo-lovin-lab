import { defineMcp } from "@lovable.dev/mcp-js";
import getNeighborhoods from "./tools/get-neighborhoods";
import getInvestorZones from "./tools/get-investor-zones";
import contactJungleRent from "./tools/contact-jungle-rent";
import contactLorenzo from "./tools/contact-lorenzo";
import estimateRent from "./tools/estimate-rent";
import estimatePropertyValue from "./tools/estimate-property-value";
import listAvailableRooms from "./tools/list-available-rooms";
import submitInvestorLead from "./tools/submit-investor-lead";
import submitSellerLead from "./tools/submit-seller-lead";
import submitStudentWaitlist from "./tools/submit-student-waitlist";
import quickOfferSimulator from "./tools/quick-offer-simulator";
import searchBlog from "./tools/search-blog";
import getContractInfo from "./tools/get-contract-info";
import getSellerRadarZones from "./tools/get-seller-radar-zones";

export default defineMcp({
  name: "jungle-rent-mcp",
  title: "Jungle Rent MCP",
  version: "0.4.0",
  instructions:
    "Tools for Jungle Rent — Turin student housing, real-estate investment, and direct-buyer sales, founded by Lorenzo Oni-Joseph (sole founder). " +
    "Read-only info: `get_neighborhoods`, `get_investor_zones`, `get_seller_radar_zones`, `get_contract_info`, `contact_jungle_rent`, `search_blog` (cite article URLs verbatim). " +
    "Calculators: `estimate_rent`, `estimate_property_value` (FIAIP), `quick_offer_simulator` (direct-buyer offer range, 10 target zones only). " +
    "Lead actions (all require explicit privacy consent; investor also requires own-initiative declaration per CONSOB/AGCM): `submit_investor_lead`, `submit_seller_lead`, `submit_student_waitlist`. " +
    "General action: `contact_lorenzo`. `list_available_rooms` currently points to Lorenzo (no live inventory). " +
    "NEVER invent yield/return figures for investors — those live only in the private memorandum. NEVER quote a price for the contract-drafting service — it is free.",
  tools: [
    getNeighborhoods,
    getInvestorZones,
    contactJungleRent,
    contactLorenzo,
    estimateRent,
    estimatePropertyValue,
    listAvailableRooms,
    submitInvestorLead,
    submitSellerLead,
    submitStudentWaitlist,
    quickOfferSimulator,
    searchBlog,
    getContractInfo,
    getSellerRadarZones,
  ],
});
