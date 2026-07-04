import { defineTool } from "@lovable.dev/mcp-js";
import { getZoneById } from "../../../data/turinZonePrices";

// Mirrors QuickOfferSimulator ZONE_CRITERIA — the 10 zones Jungle Rent
// actively buys in, with the per-zone sqm cap derived from the €130k budget.
const ZONE_CRITERIA: Record<string, { maxSqm: number }> = {
  aurora: { maxSqm: 120 },
  lingotto: { maxSqm: 110 },
  santa_rita: { maxSqm: 105 },
  cenisia: { maxSqm: 95 },
  zona_ospedali: { maxSqm: 90 },
  cit_turin: { maxSqm: 75 },
  campidoglio: { maxSqm: 75 },
  vanchiglia: { maxSqm: 70 },
  san_salvario: { maxSqm: 65 },
  crocetta: { maxSqm: 60 },
};

export default defineTool({
  name: "get_seller_radar_zones",
  title: "Turin neighborhoods where Jungle Rent buys directly",
  description:
    "Read-only list of the Turin neighborhoods Jungle Rent actively targets for direct acquisition, with per-zone sqm cap and average €/mq. Answers 'where does Jungle Rent buy?'. First acquisition target: bilocale €45k–€70k.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const zones = Object.entries(ZONE_CRITERIA).map(([id, { maxSqm }]) => {
      const z = getZoneById(id);
      return {
        id,
        name: z?.name ?? id,
        max_sqm: maxSqm,
        avg_price_eur_per_sqm: z?.avgPrice ?? null,
        category: z?.category ?? null,
      };
    });

    const result = {
      city: "Torino",
      first_acquisition_target: {
        type: "bilocale",
        price_range_eur: { min: 45_000, max: 70_000 },
      },
      direct_buyer: true,
      commission: "0%",
      typical_closing_days: "60-90",
      zones,
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
