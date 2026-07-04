import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { turinZonePrices, findZoneByName } from "../../../data/turinZonePrices";

// Convert €/m² sale price to indicative monthly rent (gross yield 4.5-6% is typical in Turin).
// Anchored on Jungle Rent's dual-season model: student single rooms 350-500 €/mo, whole-flats scale ~11 €/m²/mo central, ~7 €/m²/mo periphery.
function rentPerSqmFromSalePrice(salePricePerSqm: number): number {
  // 5.2% gross annual yield / 12 months → €/m²/month
  return (salePricePerSqm * 0.052) / 12;
}

export default defineTool({
  name: "estimate_rent",
  title: "Estimate monthly rent in Turin",
  description:
    "Estimate indicative monthly rent for an apartment or student room in a Turin neighborhood using OMI/Immobiliare.it Nov-2025 pricing. Read-only, no side effects.",
  inputSchema: {
    neighborhood: z
      .string()
      .min(2)
      .describe("Neighborhood name or slug, e.g. 'San Salvario', 'lingotto', 'aurora'."),
    size_sqm: z
      .number()
      .int()
      .min(10)
      .max(400)
      .describe("Apartment size in square meters. For a single student room use 15-25."),
    type: z
      .enum(["student-room", "whole-apartment", "short-term"])
      .optional()
      .describe("Rental type. Default 'whole-apartment'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ neighborhood, size_sqm, type }) => {
    const rentalType = type ?? "whole-apartment";
    const zone =
      turinZonePrices.find((z) => z.id === neighborhood.toLowerCase().replace(/[\s-]+/g, "_")) ??
      findZoneByName(neighborhood);

    if (!zone) {
      return {
        content: [
          {
            type: "text",
            text: `Neighborhood "${neighborhood}" not found. Try: san_salvario, vanchiglia, lingotto, aurora, crocetta, cenisia, cit_turin, santa_rita, san_donato, campidoglio, parella.`,
          },
        ],
        isError: true,
      };
    }

    const basePerSqm = rentPerSqmFromSalePrice(zone.avgPrice);
    const minPerSqm = rentPerSqmFromSalePrice(zone.minPrice);
    const maxPerSqm = rentPerSqmFromSalePrice(zone.maxPrice);

    let baseRent = basePerSqm * size_sqm;
    let minRent = minPerSqm * size_sqm;
    let maxRent = maxPerSqm * size_sqm;

    // Adjustments per rental type
    if (rentalType === "student-room") {
      // Per-room student pricing in Turin: 350-500€ single, less linear with size
      const single = { min: 300, max: 550 };
      baseRent = (single.min + single.max) / 2;
      minRent = single.min;
      maxRent = single.max;
    } else if (rentalType === "short-term") {
      // Short-term (summer/tourist) usually 2.2-2.8x long-term monthly rent
      baseRent *= 2.5;
      minRent *= 2.2;
      maxRent *= 2.8;
    }

    const round = (n: number) => Math.round(n / 10) * 10;
    const result = {
      neighborhood: zone.name,
      neighborhood_id: zone.id,
      rental_type: rentalType,
      size_sqm,
      estimated_monthly_rent_eur: round(baseRent),
      range_eur: { min: round(minRent), max: round(maxRent) },
      sale_price_per_sqm_eur: zone.avgPrice,
      annual_variation_pct_2024: zone.variation2024,
      confidence: "±10-15% — market average, actual rent depends on floor, condition, furnishings, energy class",
      methodology:
        "Derived from OMI/Immobiliare.it Nov-2025 sale prices using ~5.2% gross yield. Student single rooms use market range 300-550 €/mo. Short-term uses 2.5× long-term.",
      next_step: {
        cta: "For a real quote and available rooms/apartments, contact Lorenzo — use the contact_lorenzo tool or WhatsApp https://wa.me/393319053037",
      },
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
