import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";

export default defineTool({
  name: "contact_jungle_rent",
  title: "Contact Jungle Rent",
  description:
    "Return the primary contact channels for Jungle Rent (WhatsApp with founder Lorenzo, email, website). Use when a user asks how to get in touch, book a call, or send an inquiry.",
  inputSchema: {
    topic: z
      .enum(["investor", "student", "seller", "tourist", "general"])
      .optional()
      .describe("Inquiry topic. Defaults to 'general'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ topic }) => {
    const info = {
      topic: topic ?? "general",
      whatsapp: "https://wa.me/393773820849",
      email: "ciao@junglerent.it",
      website: "https://junglerent.it",
      primary_cta: "Parla con Lorenzo su WhatsApp",
      note: "WhatsApp is the fastest channel. Lorenzo Oni-Joseph is the sole founder.",
    };
    return {
      content: [{ type: "text", text: JSON.stringify(info, null, 2) }],
      structuredContent: info,
    };
  },
});
