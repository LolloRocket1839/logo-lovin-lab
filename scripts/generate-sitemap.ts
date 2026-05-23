/**
 * Generate sitemaps from a single source of truth.
 * Runs before `vite dev` and `vite build` (predev/prebuild hooks).
 *
 * Outputs in public/:
 *   - sitemap-index.xml   (index of all sitemaps)
 *   - sitemap.xml         (static routes IT + EN, with hreflang)
 *   - sitemap-blog.xml    (blog posts from src/data/blog/posts.ts)
 *   - sitemap-tools.xml   (interactive tools)
 *   - sitemap-images.xml  (kept as-is from prior hand-edit — not regenerated here)
 *
 * Excludes admin/auth/debug/conversion-only routes (no-index).
 */

import { writeFileSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = "https://junglerent.it";
const TODAY = new Date().toISOString().slice(0, 10);

// ---------------------------------------------------------------------------
// Static routes with IT ↔ EN pairing.
// `it` is the canonical, `en` (optional) is the alternate.
// Mirror these against src/components/AnimatedRoutes.tsx whenever you add a route.
// ---------------------------------------------------------------------------

type RouteEntry = {
  it: string;
  en?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
};

const STATIC_ROUTES: RouteEntry[] = [
  { it: "/", changefreq: "weekly", priority: "1.0" },
  { it: "/chi-siamo", en: "/about", changefreq: "monthly", priority: "0.7" },
  { it: "/investitori", en: "/investors", changefreq: "weekly", priority: "0.9" },
  { it: "/investitori/zone", en: "/investors/zones", changefreq: "weekly", priority: "0.85" },
  { it: "/vendi", en: "/sell", changefreq: "weekly", priority: "0.9" },
  { it: "/proprietari", changefreq: "monthly", priority: "0.7" },
  { it: "/valutazione-immobile", en: "/property-valuation", changefreq: "monthly", priority: "0.85" },
  { it: "/contratti-locazione", en: "/rental-contracts", changefreq: "monthly", priority: "0.8" },
  { it: "/studenti", en: "/students", changefreq: "weekly", priority: "0.8" },
  { it: "/affitto-stanza-torino", en: "/rooms-rent-turin", changefreq: "weekly", priority: "0.8" },
  { it: "/blog", changefreq: "daily", priority: "0.8" },
  { it: "/faq", changefreq: "monthly", priority: "0.6" },
  { it: "/scioperi-italia", en: "/italy-strikes", changefreq: "daily", priority: "0.5" },
  { it: "/invest", changefreq: "monthly", priority: "0.6" },
  { it: "/sell-home/lingotto-nizza-millefonti", changefreq: "monthly", priority: "0.7" },
  { it: "/vendi-casa/lingotto-nizza-millefonti", changefreq: "monthly", priority: "0.7" },
  { it: "/zone/nizza-millefonti-ospedali", en: "/zones/nizza-millefonti-hospitals", changefreq: "monthly", priority: "0.7" },
  { it: "/vendere-casa-senza-agenzia-torino", changefreq: "monthly", priority: "0.85" },
  { it: "/vendere-casa-velocemente-torino", changefreq: "monthly", priority: "0.8" },
  { it: "/comprare-casa-affittata-torino", changefreq: "monthly", priority: "0.8" },
  { it: "/investire-immobiliare-torino", changefreq: "monthly", priority: "0.85" },
  { it: "/termini-e-condizioni", en: "/terms", changefreq: "yearly", priority: "0.2" },
  { it: "/privacy", changefreq: "yearly", priority: "0.2" },
];

const TOOLS_ROUTES: RouteEntry[] = [
  { it: "/studenti/strumenti", en: "/students/tools", changefreq: "monthly", priority: "0.7" },
  { it: "/studenti/strumenti/budget", en: "/students/tools/budget", changefreq: "monthly", priority: "0.65" },
  { it: "/studenti/strumenti/media", en: "/students/tools/gpa", changefreq: "monthly", priority: "0.65" },
  { it: "/studenti/strumenti/sessione", en: "/students/tools/session", changefreq: "monthly", priority: "0.65" },
  { it: "/strumenti/aule-studio-torino", en: "/tools/study-spaces-turin", changefreq: "monthly", priority: "0.7" },
  { it: "/strumenti/dove-mangiare-torino", en: "/tools/cheap-eats-turin", changefreq: "monthly", priority: "0.7" },
  { it: "/strumenti/palestre-torino-studenti", en: "/tools/gyms-turin-students", changefreq: "monthly", priority: "0.65" },
  { it: "/strumenti/servizi-studenti-torino", en: "/tools/student-services-turin", changefreq: "monthly", priority: "0.65" },
  { it: "/strumenti/sportelli-studenti-torino", changefreq: "monthly", priority: "0.6" },
];

// Routes intentionally excluded from sitemap (admin, auth, debug, conversion-only):
//   /admin/*, /auth, /accedi, /grazie, /thank-you, /unsubscribe,
//   /ab-test-results, /content-audit, /sitemap-debug, /ai-testing,
//   /analytics-dashboard, /admin/seo, /admin/seller-radar, /admin/leads,
//   /tools (root EN, /strumenti is canonical IT), *

// ---------------------------------------------------------------------------
// Dynamic content loaders (static TS data, no DB calls — keeps script offline-safe)
// ---------------------------------------------------------------------------

async function loadBlogSlugs(): Promise<{ slug: string; date: string }[]> {
  try {
    const mod = await import(
      pathToFileURL(resolve(__dirname, "../src/data/blog/posts.ts")).href
    );
    const posts = (mod.blogPosts ?? []) as Array<{ slug: string; date: string }>;
    return posts.map((p) => ({ slug: p.slug, date: p.date }));
  } catch (err) {
    console.warn("[sitemap] could not load blog posts:", (err as Error).message);
    return [];
  }
}

async function loadInvestorZoneSlugs(): Promise<string[]> {
  try {
    const mod = await import(
      pathToFileURL(resolve(__dirname, "../src/data/investorZoneData.ts")).href
    );
    const zones = (mod.investorZones ?? []) as Array<{ slug: string }>;
    return zones.map((z) => z.slug);
  } catch (err) {
    console.warn("[sitemap] could not load investor zones:", (err as Error).message);
    return [];
  }
}

// ---------------------------------------------------------------------------
// XML builders
// ---------------------------------------------------------------------------

function xmlEscape(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function urlBlock(
  loc: string,
  opts: { lastmod?: string; changefreq?: string; priority?: string; alternates?: { hreflang: string; href: string }[] } = {},
): string {
  const lines = [
    `  <url>`,
    `    <loc>${xmlEscape(loc)}</loc>`,
    opts.lastmod ? `    <lastmod>${opts.lastmod}</lastmod>` : null,
    opts.changefreq ? `    <changefreq>${opts.changefreq}</changefreq>` : null,
    opts.priority ? `    <priority>${opts.priority}</priority>` : null,
  ].filter(Boolean) as string[];

  if (opts.alternates?.length) {
    for (const alt of opts.alternates) {
      lines.push(
        `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${xmlEscape(alt.href)}" />`,
      );
    }
  }

  lines.push(`  </url>`);
  return lines.join("\n");
}

function wrapUrlset(body: string, withXhtml = false): string {
  const ns = withXhtml
    ? `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n        xmlns:xhtml="http://www.w3.org/1999/xhtml">`
    : `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`;
  return `<?xml version="1.0" encoding="UTF-8"?>\n${ns}\n${body}\n</urlset>\n`;
}

function buildHreflangPair(it: string, en?: string): { hreflang: string; href: string }[] {
  const out = [{ hreflang: "it", href: `${BASE_URL}${it}` }];
  if (en && en !== it) {
    out.push({ hreflang: "en", href: `${BASE_URL}${en}` });
  }
  // x-default → Italian canonical (primary market)
  out.push({ hreflang: "x-default", href: `${BASE_URL}${it}` });
  return out;
}

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

function generateMainSitemap(zoneSlugs: string[]): string {
  const blocks: string[] = [];
  const allRoutes = [...STATIC_ROUTES];

  // Add investor zone dynamic routes
  for (const slug of zoneSlugs) {
    allRoutes.push({
      it: `/investitori/zone/${slug}`,
      en: `/investors/zones/${slug}`,
      changefreq: "monthly",
      priority: "0.75",
    });
  }

  for (const r of allRoutes) {
    const alternates = buildHreflangPair(r.it, r.en);
    blocks.push(
      urlBlock(`${BASE_URL}${r.it}`, {
        lastmod: TODAY,
        changefreq: r.changefreq,
        priority: r.priority,
        alternates,
      }),
    );
    if (r.en && r.en !== r.it) {
      // EN page emits its own canonical URL with the same alternate set
      blocks.push(
        urlBlock(`${BASE_URL}${r.en}`, {
          lastmod: TODAY,
          changefreq: r.changefreq,
          priority: r.priority,
          alternates,
        }),
      );
    }
  }

  return wrapUrlset(blocks.join("\n"), true);
}

function generateBlogSitemap(posts: { slug: string; date: string }[]): string {
  const blocks = posts.map((p) =>
    urlBlock(`${BASE_URL}/blog/${p.slug}`, {
      lastmod: p.date,
      changefreq: "monthly",
      priority: "0.7",
    }),
  );
  return wrapUrlset(blocks.join("\n"));
}

function generateToolsSitemap(): string {
  const blocks: string[] = [];
  for (const r of TOOLS_ROUTES) {
    const alternates = buildHreflangPair(r.it, r.en);
    blocks.push(
      urlBlock(`${BASE_URL}${r.it}`, {
        lastmod: TODAY,
        changefreq: r.changefreq,
        priority: r.priority,
        alternates,
      }),
    );
    if (r.en && r.en !== r.it) {
      blocks.push(
        urlBlock(`${BASE_URL}${r.en}`, {
          lastmod: TODAY,
          changefreq: r.changefreq,
          priority: r.priority,
          alternates,
        }),
      );
    }
  }
  return wrapUrlset(blocks.join("\n"), true);
}

function generateSitemapIndex(): string {
  const sitemaps = [
    "sitemap.xml",
    "sitemap-tools.xml",
    "sitemap-blog.xml",
    "sitemap-images.xml",
  ];
  const body = sitemaps
    .map(
      (name) =>
        `  <sitemap>\n    <loc>${BASE_URL}/${name}</loc>\n    <lastmod>${TODAY}</lastmod>\n  </sitemap>`,
    )
    .join("\n");
  return `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</sitemapindex>\n`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const publicDir = resolve(__dirname, "../public");
  if (!existsSync(publicDir)) {
    throw new Error(`public/ not found at ${publicDir}`);
  }

  const [blogPosts, zoneSlugs] = await Promise.all([
    loadBlogSlugs(),
    loadInvestorZoneSlugs(),
  ]);

  writeFileSync(resolve(publicDir, "sitemap.xml"), generateMainSitemap(zoneSlugs));
  writeFileSync(resolve(publicDir, "sitemap-blog.xml"), generateBlogSitemap(blogPosts));
  writeFileSync(resolve(publicDir, "sitemap-tools.xml"), generateToolsSitemap());
  writeFileSync(resolve(publicDir, "sitemap-index.xml"), generateSitemapIndex());

  const staticCount =
    STATIC_ROUTES.reduce((n, r) => n + (r.en && r.en !== r.it ? 2 : 1), 0) +
    zoneSlugs.length * 2;
  const toolsCount = TOOLS_ROUTES.reduce(
    (n, r) => n + (r.en && r.en !== r.it ? 2 : 1),
    0,
  );

  console.log(
    `[sitemap] main: ${staticCount} URLs · blog: ${blogPosts.length} · tools: ${toolsCount}`,
  );
}

main().catch((err) => {
  console.error("[sitemap] FAILED:", err);
  process.exit(1);
});
