#!/usr/bin/env node
/**
 * Key-page SEO self-inspection.
 *
 * For each URL below, fetches the live HTML and reports the signals that
 * matter for Google Search Console coverage + canonicalization:
 *   - HTTP status / redirect target
 *   - <link rel="canonical">   (and whether it self-references)
 *   - <meta name="robots">     (noindex / nofollow flags)
 *   - <meta property="og:url"> (canonical mismatch detector)
 *   - presence in sitemap-index.xml + its child sitemaps
 *   - direct deep-link to GSC's URL Inspection for that URL
 *
 * Usage:
 *   node scripts/inspect-key-urls.mjs
 *   node scripts/inspect-key-urls.mjs --json
 *   node scripts/inspect-key-urls.mjs --json=report.json
 */

import { writeFile } from "node:fs/promises";

const BASE = "https://junglerent.it";
const PROPERTY = "https://junglerent.it/"; // GSC siteUrl (URL-prefix property)

const KEY_PAGES = [
  "/",
  "/investitori",
  "/sellers",
  "/students",
  "/contratti-locazione",
  "/blog",
  "/property-valuation",
  "/about",
  "/faq",
  "/neighborhoods",
];

const SITEMAP_INDEX = `${BASE}/sitemap-index.xml`;

const args = process.argv.slice(2);
const jsonArg = args.find((a) => a === "--json" || a.startsWith("--json="));
const jsonMode = !!jsonArg;
const jsonOutFile = jsonArg?.startsWith("--json=") ? jsonArg.slice(7) : null;

const log = jsonMode ? () => {} : (...a) => console.log(...a);
const elog = jsonMode ? () => {} : (...a) => console.error(...a);
const c = {
  ok: (s) => `\x1b[32m${s}\x1b[0m`,
  bad: (s) => `\x1b[31m${s}\x1b[0m`,
  warn: (s) => `\x1b[33m${s}\x1b[0m`,
  dim: (s) => `\x1b[2m${s}\x1b[0m`,
  b: (s) => `\x1b[1m${s}\x1b[0m`,
};

const UA = "JungleRent-KeyURL-Inspector/1.0 (+https://junglerent.it)";

async function fetchText(url, { method = "GET" } = {}) {
  try {
    const res = await fetch(url, {
      method,
      redirect: "manual",
      headers: { "User-Agent": UA, "Cache-Control": "no-cache" },
    });
    const text = method === "GET" ? await res.text() : "";
    return {
      status: res.status,
      location: res.headers.get("location"),
      contentType: res.headers.get("content-type"),
      text,
    };
  } catch (e) {
    return { status: 0, error: e.message };
  }
}

function pick(html, re) {
  const m = html?.match?.(re);
  return m ? m[1] : null;
}

function inspectHtml(html) {
  const canonical = pick(html, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)
    ?? pick(html, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const robots = pick(html, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["']/i);
  const ogUrl = pick(html, /<meta[^>]+property=["']og:url["'][^>]+content=["']([^"']+)["']/i);
  const title = pick(html, /<title>([^<]*)<\/title>/i);
  const description = pick(html, /<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i);
  const h1 = pick(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)?.replace(/<[^>]+>/g, "").trim();
  return { canonical, robots, ogUrl, title, description, h1 };
}

async function getAllSitemapUrls() {
  const all = new Set();
  const idxRes = await fetchText(SITEMAP_INDEX);
  if (idxRes.status !== 200) {
    elog(c.warn(`! sitemap-index returned HTTP ${idxRes.status}`));
    return all;
  }
  const children = [...idxRes.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  for (const child of children) {
    const r = await fetchText(child);
    if (r.status !== 200) continue;
    for (const m of r.text.matchAll(/<loc>([^<]+)<\/loc>/g)) all.add(m[1]);
  }
  return all;
}

function gscInspectLink(url) {
  // Deep-link to Search Console's URL Inspection UI for the property.
  const resource = encodeURIComponent(PROPERTY);
  return `https://search.google.com/search-console/inspect?resource_id=${resource}&id=${encodeURIComponent(url)}`;
}

const report = { generatedAt: new Date().toISOString(), property: PROPERTY, pages: [] };

log(c.b(`→ Loading sitemap URLs from ${SITEMAP_INDEX}`));
const sitemapUrls = await getAllSitemapUrls();
log(`  ${c.dim(`indexed in sitemaps: ${sitemapUrls.size} URLs`)}\n`);

for (const path of KEY_PAGES) {
  const url = BASE + path;
  log(c.b(`→ ${url}`));
  const r = await fetchText(url);
  const page = {
    url,
    httpStatus: r.status,
    redirectTo: r.location,
    inSitemap: sitemapUrls.has(url) || sitemapUrls.has(url.replace(/\/$/, "")) || sitemapUrls.has(url + "/"),
    canonical: null,
    canonicalSelfReferential: null,
    canonicalIssue: null,
    robotsMeta: null,
    indexable: null,
    ogUrl: null,
    ogUrlMatchesCanonical: null,
    title: null,
    description: null,
    h1: null,
    gscInspectUrl: gscInspectLink(url),
    issues: [],
  };

  if (r.status === 0) {
    page.issues.push(`network error: ${r.error}`);
  } else if (r.status >= 300 && r.status < 400) {
    page.issues.push(`redirect → ${r.location}`);
  } else if (r.status !== 200) {
    page.issues.push(`HTTP ${r.status}`);
  } else {
    const info = inspectHtml(r.text);
    page.canonical = info.canonical;
    page.robotsMeta = info.robots ?? "(none — default: index,follow)";
    page.ogUrl = info.ogUrl;
    page.title = info.title?.trim();
    page.description = info.description?.trim();
    page.h1 = info.h1;

    if (!info.canonical) {
      page.issues.push("missing <link rel=canonical>");
    } else {
      page.canonicalSelfReferential = info.canonical === url || info.canonical === url + "/" || info.canonical === url.replace(/\/$/, "");
      if (!page.canonicalSelfReferential) {
        page.canonicalIssue = `canonical points to ${info.canonical} (not self)`;
        page.issues.push(page.canonicalIssue);
      }
    }
    if (info.robots && /noindex/i.test(info.robots)) {
      page.indexable = false;
      page.issues.push(`robots meta = "${info.robots}" → noindex`);
    } else {
      page.indexable = true;
    }
    if (info.ogUrl && info.canonical) {
      page.ogUrlMatchesCanonical = info.ogUrl === info.canonical;
      if (!page.ogUrlMatchesCanonical) {
        page.issues.push(`og:url (${info.ogUrl}) ≠ canonical (${info.canonical})`);
      }
    }
    if (!page.inSitemap) {
      page.issues.push("not present in sitemap-index");
    }
  }

  // Pretty print
  const ok = page.issues.length === 0;
  log(`  ${ok ? c.ok("✓") : c.bad("✗")} HTTP ${page.httpStatus}${page.redirectTo ? ` → ${page.redirectTo}` : ""}`);
  log(`  canonical:  ${page.canonical ?? c.warn("(none)")} ${page.canonicalSelfReferential === true ? c.ok("[self]") : page.canonicalSelfReferential === false ? c.bad("[mismatch]") : ""}`);
  log(`  robots:     ${page.robotsMeta}`);
  log(`  og:url:     ${page.ogUrl ?? c.dim("(none)")}${page.ogUrlMatchesCanonical === false ? " " + c.bad("[≠ canonical]") : ""}`);
  log(`  in sitemap: ${page.inSitemap ? c.ok("yes") : c.bad("NO")}`);
  log(`  title:      ${page.title ? c.dim(page.title.slice(0, 90)) : c.warn("(missing)")}`);
  log(`  GSC inspect: ${c.dim(page.gscInspectUrl)}`);
  if (page.issues.length) {
    for (const i of page.issues) log(`    ${c.bad("•")} ${i}`);
  }
  log();
  report.pages.push(page);
}

const totalIssues = report.pages.reduce((n, p) => n + p.issues.length, 0);
report.summary = {
  pagesChecked: report.pages.length,
  pagesWithIssues: report.pages.filter((p) => p.issues.length).length,
  totalIssues,
};

if (jsonMode) {
  const out = JSON.stringify(report, null, 2);
  if (jsonOutFile) {
    await writeFile(jsonOutFile, out + "\n", "utf8");
    process.stderr.write(`Report written to ${jsonOutFile}\n`);
  } else {
    process.stdout.write(out + "\n");
  }
} else {
  if (totalIssues === 0) {
    console.log(c.ok(`✅ All ${report.pages.length} key pages look clean for indexing.`));
  } else {
    console.log(c.bad(`❌ ${totalIssues} issue(s) across ${report.summary.pagesWithIssues} page(s) — see above.`));
  }
}

process.exit(totalIssues === 0 ? 0 : 1);
