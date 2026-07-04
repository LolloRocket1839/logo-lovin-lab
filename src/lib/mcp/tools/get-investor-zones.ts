import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { investorZones, getZoneBySlug } from "@/data/investorZoneData";

export default defineTool({
  name: "get_investor_zones",
  title: "Get Turin investor zones",
  description:
    "List Turin real-estate investor zones with entry prices, urban renewal projects and market metrics. Return figures projections are NOT included (confidential, memorandum only). Optional slug filter returns one zone.",
  inputSchema: {
    slug: z.string().optional().describe("Optional zone slug. If omitted, returns all zones."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug }) => {
    const zones = slug ? [getZoneBySlug(slug)].filter(Boolean) : investorZones;
    return {
      content: [{ type: "text", text: JSON.stringify(zones, null, 2) }],
      structuredContent: { zones },
    };
  },
});
