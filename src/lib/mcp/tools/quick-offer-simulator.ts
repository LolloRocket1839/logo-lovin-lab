import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { getZoneById } from "../../../data/turinZonePrices";

// Mirrors src/components/tools/QuickOfferSimulator.tsx (source of truth).
const MAX_BUDGET = 130_000;
const DISCOUNT = 0.7;
const MIN_SQM = 35;

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

const TARGET_ZONES = Object.keys(ZONE_CRITERIA) as [string, ...string[]];

export default defineTool({
  name: "quick_offer_simulator",
  title: "Jungle Rent direct-buyer offer simulator (Turin)",
  description:
    "Indicative direct-buyer offer range for a Turin apartment, matching /quick-offer on the website. Jungle Rent buys directly from the seller (0% commission, 60–90 day closing). Only 10 target neighborhoods, with per-zone max sqm and a hard €130k budget cap. Returns whether the property qualifies plus a WhatsApp deep-link. Pure calculation, no side effects.",
  inputSchema: {
    zone_id: z
      .enum(TARGET_ZONES)
      .describe(
        "One of the 10 target zones: aurora, lingotto, santa_rita, cenisia, zona_ospedali, cit_turin, campidoglio, vanchiglia, san_salvario, crocetta.",
      ),
    sqm: z.number().int().min(20).max(300),
    condition: z.enum(["to_renovate", "good", "renovated"]),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ zone_id, sqm, condition }) => {
    const criteria = ZONE_CRITERIA[zone_id];
    const zoneData = getZoneById(zone_id);
    if (!criteria || !zoneData) {
      return {
        content: [{ type: "text", text: `Zone '${zone_id}' is not a Jungle Rent target zone.` }],
        isError: true,
      };
    }

    const effectiveSqm = Math.min(sqm, criteria.maxSqm);
    const belowMin = sqm < MIN_SQM;
    const overMaxSqm = sqm > criteria.maxSqm;
    const indicativeOffer = Math.round(effectiveSqm * zoneData.avgPrice * DISCOUNT);
    const qualified = !belowMin && !overMaxSqm && indicativeOffer <= MAX_BUDGET;

    const result = {
      zone_id,
      zone_name: zoneData.name,
      sqm,
      condition,
      indicative_offer_eur: indicativeOffer,
      indicative_offer_range_eur: {
        low: Math.round(indicativeOffer * 0.9),
        high: Math.round(indicativeOffer * 1.05),
      },
      per_zone_max_sqm: criteria.maxSqm,
      min_sqm: MIN_SQM,
      qualified,
      reason: qualified
        ? "In target: Jungle Rent può fare una proposta diretta."
        : belowMin
          ? `Sotto la soglia minima di ${MIN_SQM} mq.`
          : overMaxSqm
            ? `Sopra il massimo per ${zoneData.name} (${criteria.maxSqm} mq).`
            : "Fuori dal budget d'acquisto diretto.",
      disclaimer:
        "Stima indicativa basata su prezzi medi di zona (OMI/Immobiliare/FIAIP nov 2025) e sul modello Jungle Rent. NON è una proposta d'acquisto formale. L'offerta reale la fa Lorenzo dopo sopralluogo.",
      next_step: "Invia un contatto seller con submit_seller_lead o apri WhatsApp.",
      whatsapp_deep_link: `https://wa.me/393319053037?text=${encodeURIComponent(
        `Ciao Lorenzo, ho simulato: ${sqm} mq a ${zoneData.name} (${condition}). Offerta indicativa ~${indicativeOffer.toLocaleString("it-IT")} €. Possiamo parlarne?`,
      )}`,
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
