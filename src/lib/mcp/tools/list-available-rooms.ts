import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "list_available_rooms",
  title: "List available Jungle Rent rooms",
  description:
    "List currently available student rooms and apartments in Turin. Today no live public inventory is exposed — returns a pointer to contact Lorenzo, who manages allocations manually.",
  inputSchema: {
    neighborhood: z.string().optional().describe("Optional neighborhood filter."),
    max_price_eur: z.number().int().min(200).max(5000).optional().describe("Optional max monthly rent."),
    move_in_after: z
      .string()
      .regex(/^\d{4}-\d{2}-\d{2}$/)
      .optional()
      .describe("Optional earliest move-in date (YYYY-MM-DD)."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ neighborhood, max_price_eur, move_in_after }) => {
    const filters = [
      neighborhood ? `neighborhood=${neighborhood}` : null,
      max_price_eur ? `max=${max_price_eur}€` : null,
      move_in_after ? `after=${move_in_after}` : null,
    ]
      .filter(Boolean)
      .join(" ");

    const message = `Jungle Rent doesn't publish a real-time room feed. Allocation is manual: Lorenzo matches students to rooms directly on WhatsApp based on university, budget, move-in date and profile. Ask the user for those details, then use the contact_lorenzo tool.`;

    const result = {
      available_rooms: [],
      status: "manual-allocation",
      message,
      filters_received: filters || "none",
      next_step: {
        cta: "Collect user's name, email, target university/neighborhood, budget, move-in month — then call contact_lorenzo.",
        whatsapp: "https://wa.me/393319053037",
        website: "https://junglerent.it",
      },
    };

    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
