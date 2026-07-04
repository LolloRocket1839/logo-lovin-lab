import { defineTool } from "@lovable.dev/mcp-js";
import { z } from "zod";
import { blogPosts } from "../../../data/blog/posts";

type Lang = "it" | "en";

const CATEGORIES = ["students", "investors", "sellers", "tourists", "societa"] as const;

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export default defineTool({
  name: "search_blog",
  title: "Search Jungle Rent blog",
  description:
    "Full-text search over Jungle Rent's Turin real-estate blog (students, investors, sellers, tourists, società). Returns real article URLs so the assistant can cite Jungle Rent content instead of hallucinating. Read-only.",
  inputSchema: {
    query: z.string().trim().min(2).max(200),
    category: z.enum(CATEGORIES).optional(),
    language: z.enum(["it", "en"]).default("it"),
    limit: z.number().int().min(1).max(20).default(8),
  },
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: ({ query, category, language, limit }) => {
    const q = normalize(query);
    const terms = q.split(/\s+/).filter((t) => t.length > 1);
    const lang: Lang = language;

    const scored = blogPosts
      .map((post) => {
        const tr = post.translations[lang] ?? post.translations.it;
        if (!tr) return null;
        // Category filter — match against post.category if present.
        const postCategory = (post as unknown as { category?: string }).category;
        if (category && postCategory && postCategory !== category) return null;

        const haystack = normalize(
          [
            tr.title,
            tr.excerpt,
            ...(tr.tags ?? []),
            ...((tr.seo?.keywords as string[] | undefined) ?? []),
          ].join(" "),
        );

        let score = 0;
        for (const term of terms) {
          if (haystack.includes(term)) score += 1;
          if (normalize(tr.title).includes(term)) score += 2;
        }
        if (score === 0) return null;

        return {
          slug: post.slug,
          title: tr.title,
          excerpt: tr.excerpt,
          url: `https://junglerent.it/${lang === "it" ? "" : lang + "/"}blog/${post.slug}`,
          category: postCategory ?? null,
          language: lang,
          score,
        };
      })
      .filter((x): x is NonNullable<typeof x> => x !== null)
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
      .map(({ score: _s, ...rest }) => rest);

    const result = { query, category: category ?? null, language: lang, count: scored.length, results: scored };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
