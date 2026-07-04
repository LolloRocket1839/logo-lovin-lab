import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { turinZonePrices, findZoneByName } from "../../../data/turinZonePrices";
import {
  conservationState,
  floorWithElevator,
  floorWithoutElevator,
} from "../../../data/propertyCoefficients";

export default defineTool({
  name: "estimate_property_value",
  title: "Estimate Turin property value",
  description:
    "Estimate the sale value of an apartment in Turin using FIAIP 2024-2025 coefficients + OMI/Immobiliare.it pricing. Read-only. Same math as the /vendi-casa-torino valuation on junglerent.it.",
  inputSchema: {
    neighborhood: z.string().min(2).describe("Neighborhood name or slug."),
    size_sqm: z.number().int().min(15).max(400).describe("Commercial size in m²."),
    condition: z
      .enum(["to_renovate", "good", "renovated", "finely_renovated", "new_construction"])
      .describe("Conservation state."),
    floor: z
      .enum(["ground", "first", "second", "third", "fourth", "fifth_plus", "penthouse"])
      .describe("Floor level."),
    has_elevator: z.boolean().describe("Whether the building has an elevator."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ neighborhood, size_sqm, condition, floor, has_elevator }) => {
    const zone =
      turinZonePrices.find((z) => z.id === neighborhood.toLowerCase().replace(/[\s-]+/g, "_")) ??
      findZoneByName(neighborhood);
    if (!zone) {
      return {
        content: [{ type: "text", text: `Neighborhood "${neighborhood}" not found.` }],
        isError: true,
      };
    }

    const conservationCoef = conservationState.find((c) => c.id === condition)?.value ?? 0;
    const floorTable = has_elevator ? floorWithElevator : floorWithoutElevator;
    const floorCoef =
      floorTable.find((f) => f.id === floor)?.value ??
      floorTable.find((f) => f.id === (floor === "fifth_plus" ? "third_plus" : floor))?.value ??
      0;

    const baseValue = zone.avgPrice * size_sqm;
    const adjustedAvg = baseValue * (1 + conservationCoef + floorCoef);
    const adjustedMin = zone.minPrice * size_sqm * (1 + conservationCoef + floorCoef);
    const adjustedMax = zone.maxPrice * size_sqm * (1 + conservationCoef + floorCoef);

    const round = (n: number) => Math.round(n / 500) * 500;

    const result = {
      neighborhood: zone.name,
      size_sqm,
      condition,
      floor,
      has_elevator,
      estimated_value_eur: round(adjustedAvg),
      range_eur: { min: round(adjustedMin), max: round(adjustedMax) },
      base_price_per_sqm_eur: zone.avgPrice,
      adjustments: {
        conservation_pct: Math.round(conservationCoef * 100),
        floor_pct: Math.round(floorCoef * 100),
      },
      confidence: "±5-12% — indicative valuation. Additional factors (energy class, exposure, balconies, garage, condition of common areas) can move the price further.",
      sources: ["OMI Agenzia Entrate", "Immobiliare.it", "FIAIP Torino", "Nov 2025"],
      next_step: {
        cta: "For a real offer (Jungle Rent buys direct, no agency, 60-90 day timeline), contact Lorenzo via the contact_lorenzo tool.",
        whatsapp: `https://wa.me/393319053037?text=${encodeURIComponent(
          `Ciao Lorenzo, ho una proprietà in ${zone.name} di ${size_sqm} m² e vorrei parlarne.`,
        )}`,
      },
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
