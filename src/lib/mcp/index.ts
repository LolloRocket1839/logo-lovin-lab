import { defineMcp } from "@lovable.dev/mcp-js";
import getNeighborhoods from "./tools/get-neighborhoods";
import getInvestorZones from "./tools/get-investor-zones";
import contactJungleRent from "./tools/contact-jungle-rent";

export default defineMcp({
  name: "jungle-rent-mcp",
  title: "Jungle Rent MCP",
  version: "0.1.0",
  instructions:
    "Tools for Jungle Rent — Turin student housing and real-estate investment. Use `get_neighborhoods` for student rental zones, `get_investor_zones` for investor market data (no yield projections — those are confidential), and `contact_jungle_rent` to share contact channels.",
  tools: [getNeighborhoods, getInvestorZones, contactJungleRent],
});
