import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { neighborhoods } from "@/data/neighborhoods";

export default defineTool({
  name: "get_neighborhoods",
  title: "Get Turin neighborhoods",
  description:
    "List Turin neighborhoods for students with average rent, safety, transport and student profile. Optional slug filter returns a single neighborhood.",
  inputSchema: {
    slug: z
      .string()
      .optional()
      .describe("Optional neighborhood slug (e.g. 'san-salvario'). If omitted, returns all."),
    lang: z.enum(["it", "en"]).optional().describe("Language for text fields. Default 'it'."),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ slug, lang }) => {
    const language = lang ?? "it";
    const list = slug ? neighborhoods.filter((n) => n.slug === slug) : neighborhoods;
    const data = list.map((n) => ({
      slug: n.slug,
      name: n.name,
      zone: n.zone,
      description: n.description[language],
      avgRent: n.avgRent,
      universities: n.universities,
      transport: n.transport,
      safety: n.safety,
      nightlife: n.nightlife,
      studentDensity: n.studentDensity,
      url: `https://junglerent.it/${language === "it" ? "affitto-stanza-torino" : "rooms-rent-turin"}/${n.slug}`,
    }));
    return {
      content: [{ type: "text", text: JSON.stringify(data, null, 2) }],
      structuredContent: { neighborhoods: data },
    };
  },
});
