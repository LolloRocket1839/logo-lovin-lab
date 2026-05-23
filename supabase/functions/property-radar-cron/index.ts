// Property Radar — daily intelligence scraper for Lingotto/Nizza/Mirafiori N.
// Reads PUBLIC listing metadata only via Firecrawl. Never stores seller contacts.
// Kill switch: secret RADAR_ENABLED=false to disable.
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

type Portal = "immobiliare" | "idealista" | "subito";

interface ScanTarget {
  portal: Portal;
  zone: string;
  url: string;
}

// Tutta Torino — 9 quartieri prioritari, cap €80k
const TARGETS: ScanTarget[] = [
  // Immobiliare.it — sale, Torino, max €80k
  { portal: "immobiliare", zone: "Lingotto", url: "https://www.immobiliare.it/vendita-case/torino/lingotto/?prezzoMassimo=80000" },
  { portal: "immobiliare", zone: "Nizza Millefonti", url: "https://www.immobiliare.it/vendita-case/torino/nizza-millefonti/?prezzoMassimo=80000" },
  { portal: "immobiliare", zone: "Mirafiori Nord", url: "https://www.immobiliare.it/vendita-case/torino/mirafiori-nord/?prezzoMassimo=80000" },
  { portal: "immobiliare", zone: "Mirafiori Sud", url: "https://www.immobiliare.it/vendita-case/torino/mirafiori-sud/?prezzoMassimo=80000" },
  { portal: "immobiliare", zone: "Aurora", url: "https://www.immobiliare.it/vendita-case/torino/aurora/?prezzoMassimo=80000" },
  { portal: "immobiliare", zone: "Barriera di Milano", url: "https://www.immobiliare.it/vendita-case/torino/barriera-di-milano/?prezzoMassimo=80000" },
  { portal: "immobiliare", zone: "Madonna di Campagna", url: "https://www.immobiliare.it/vendita-case/torino/madonna-di-campagna/?prezzoMassimo=80000" },
  { portal: "immobiliare", zone: "Parella", url: "https://www.immobiliare.it/vendita-case/torino/parella/?prezzoMassimo=80000" },
  { portal: "immobiliare", zone: "Santa Rita", url: "https://www.immobiliare.it/vendita-case/torino/santa-rita/?prezzoMassimo=80000" },
  // Idealista — principali
  { portal: "idealista", zone: "Lingotto", url: "https://www.idealista.it/vendita-case/torino-torino/con-prezzo_80000,lingotto-italia-61/" },
  { portal: "idealista", zone: "Nizza Millefonti", url: "https://www.idealista.it/vendita-case/torino-torino/con-prezzo_80000,nizza-italia-61/" },
  { portal: "idealista", zone: "Aurora", url: "https://www.idealista.it/vendita-case/torino-torino/con-prezzo_80000,aurora-italia-61/" },
  { portal: "idealista", zone: "Barriera di Milano", url: "https://www.idealista.it/vendita-case/torino-torino/con-prezzo_80000,barriera-di-milano-italia-61/" },
  // Subito (mostly private sellers) — tutta Torino
  { portal: "subito", zone: "Torino", url: "https://www.subito.it/annunci-piemonte/vendita/appartamenti/torino/torino/?qso=true&pe=80000&ca=12" },
];

const PRIORITY_ZONES = [
  "Lingotto", "Nizza Millefonti", "Mirafiori Nord", "Mirafiori Sud",
  "Aurora", "Barriera di Milano", "Madonna di Campagna", "Parella", "Santa Rita",
];

function calcLeadScore(listing: {
  is_private_seller: boolean;
  price_eur: number | null;
  zone: string | null;
  condition: string | null;
  first_seen_at: string;
  price_history: unknown[];
}): number {
  let score = 0;
  if (listing.is_private_seller) score += 30;
  if (listing.price_eur && listing.price_eur >= 30000 && listing.price_eur <= 80000) score += 20;
  if (listing.condition && /ristrutturare|da ristrutturare|abitabile/i.test(listing.condition)) score += 15;
  if (listing.zone && PRIORITY_ZONES.includes(listing.zone)) score += 10;
  const ageDays = (Date.now() - new Date(listing.first_seen_at).getTime()) / 86400000;
  if (ageDays > 60) score += 15;
  // Price drop: if last entry in price_history is lower than first
  const ph = listing.price_history as Array<{ price: number }>;
  if (ph.length >= 2) {
    const first = ph[0]?.price;
    const last = ph[ph.length - 1]?.price;
    if (first && last && (first - last) / first >= 0.05) score += 10;
  }
  return Math.min(score, 100);
}

interface ExtractedListing {
  external_id: string;
  url: string;
  title?: string;
  price_eur?: number;
  sqm?: number;
  rooms?: number;
  is_private_seller?: boolean;
  condition?: string;
  thumbnail_url?: string;
  description_excerpt?: string;
}

async function firecrawlScrape(url: string, apiKey: string): Promise<{ markdown: string; html: string; links: string[] }> {
  const res = await fetch("https://api.firecrawl.dev/v2/scrape", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
      formats: ["markdown", "html", "links"],
      onlyMainContent: true,
      waitFor: 2000,
    }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`Firecrawl ${res.status}: ${JSON.stringify(data).slice(0, 200)}`);
  // Firecrawl v2 returns data wrapped under `data`
  const d = data.data ?? data;
  return {
    markdown: d.markdown ?? "",
    html: d.html ?? "",
    links: d.links ?? [],
  };
}

// Parse listing index page → list of {external_id, url}
function parseListingsFromIndex(portal: Portal, html: string, links: string[]): ExtractedListing[] {
  const out: ExtractedListing[] = [];
  const seen = new Set<string>();

  if (portal === "immobiliare") {
    // Immobiliare URLs: https://www.immobiliare.it/annunci/<id>/
    const re = /https?:\/\/www\.immobiliare\.it\/annunci\/(\d+)\/?/g;
    let m;
    const allLinks = [...links, ...(html.match(re) ?? [])];
    for (const link of allLinks) {
      const match = /\/annunci\/(\d+)/.exec(link);
      if (match && !seen.has(match[1])) {
        seen.add(match[1]);
        out.push({ external_id: match[1], url: `https://www.immobiliare.it/annunci/${match[1]}/` });
      }
    }
  } else if (portal === "idealista") {
    // Idealista URLs: https://www.idealista.it/immobile/<id>/
    const re = /https?:\/\/www\.idealista\.it\/immobile\/(\d+)\/?/g;
    const allLinks = [...links, ...(html.match(re) ?? [])];
    for (const link of allLinks) {
      const match = /\/immobile\/(\d+)/.exec(link);
      if (match && !seen.has(match[1])) {
        seen.add(match[1]);
        out.push({ external_id: match[1], url: `https://www.idealista.it/immobile/${match[1]}/` });
      }
    }
  } else if (portal === "subito") {
    // Subito URLs: https://www.subito.it/appartamenti/...-<id>.htm
    const re = /https?:\/\/www\.subito\.it\/[^"\s]+-(\d+)\.htm/g;
    const allLinks = [...links, ...(html.match(re) ?? [])];
    for (const link of allLinks) {
      const match = /-(\d+)\.htm/.exec(link);
      if (match && !seen.has(match[1])) {
        seen.add(match[1]);
        out.push({ external_id: match[1], url: link.split("?")[0] });
      }
    }
  }
  return out.slice(0, 30); // hard cap per target
}

// Parse single listing markdown → enrich metadata
function enrichFromMarkdown(portal: Portal, md: string, base: ExtractedListing): ExtractedListing {
  const out = { ...base };
  // Title: first H1 or first non-empty line
  const titleMatch = md.match(/^#\s+(.+)$/m) ?? md.match(/^(.{20,120})$/m);
  if (titleMatch) out.title = titleMatch[1].trim().slice(0, 200);

  // Price: € 95.000 / 95.000 € / EUR 95000
  const priceMatch = md.match(/€\s*([\d.]+)|([\d.]+)\s*€|EUR\s*([\d.]+)/i);
  if (priceMatch) {
    const raw = (priceMatch[1] || priceMatch[2] || priceMatch[3] || "").replace(/\./g, "");
    const n = parseInt(raw, 10);
    if (n >= 10000 && n <= 2000000) out.price_eur = n;
  }
  // Surface: 65 mq / 65 m²
  const sqmMatch = md.match(/(\d{2,4})\s*(?:mq|m²|m2)/i);
  if (sqmMatch) out.sqm = parseInt(sqmMatch[1], 10);

  // Rooms: "3 locali" / "trilocale" / "bilocale"
  const roomsMatch = md.match(/(\d)\s*(?:locali|vani|stanze)/i);
  if (roomsMatch) out.rooms = parseInt(roomsMatch[1], 10);
  else if (/bilocale/i.test(md)) out.rooms = 2;
  else if (/trilocale/i.test(md)) out.rooms = 3;
  else if (/monolocale/i.test(md)) out.rooms = 1;
  else if (/quadrilocale/i.test(md)) out.rooms = 4;

  // Condition
  const condMatch = md.match(/(da ristrutturare|ristrutturato|abitabile|nuovo|ottimo|buono)/i);
  if (condMatch) out.condition = condMatch[1];

  // Private seller heuristic: subito is almost always private; on immobiliare/idealista look for "privato" tag
  if (portal === "subito") {
    out.is_private_seller = !/agenzia/i.test(md);
  } else {
    out.is_private_seller = /\bprivato\b/i.test(md) && !/agenzia immobiliare/i.test(md);
  }

  // Excerpt
  const excerpt = md.replace(/[#*_>]/g, "").trim().slice(0, 280);
  out.description_excerpt = excerpt;

  return out;
}

function sleep(ms: number) { return new Promise((r) => setTimeout(r, ms)); }

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  const startedAt = Date.now();
  const enabled = (Deno.env.get("RADAR_ENABLED") ?? "true").toLowerCase() !== "false";
  if (!enabled) {
    return new Response(JSON.stringify({ ok: true, skipped: "RADAR_ENABLED=false" }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const firecrawlKey = Deno.env.get("FIRECRAWL_API_KEY");
  if (!firecrawlKey) {
    return new Response(JSON.stringify({ error: "FIRECRAWL_API_KEY not configured" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
  const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
  const admin = createClient(supabaseUrl, serviceKey);

  const summary: Record<string, unknown>[] = [];
  let totalFetches = 0;
  const MAX_FETCHES = 80; // safety cap per run

  for (const target of TARGETS) {
    if (totalFetches >= MAX_FETCHES) break;
    const tStart = Date.now();
    const errors: string[] = [];
    let listings: ExtractedListing[] = [];

    try {
      const indexResult = await firecrawlScrape(target.url, firecrawlKey);
      totalFetches++;
      listings = parseListingsFromIndex(target.portal, indexResult.html, indexResult.links);
    } catch (e) {
      errors.push(`index: ${(e as Error).message}`);
    }

    let newCount = 0;
    let updatedCount = 0;

    for (const listing of listings) {
      if (totalFetches >= MAX_FETCHES) break;

      // Check existing
      const { data: existing } = await admin
        .from("property_listings")
        .select("id, price_eur, price_history, first_seen_at")
        .eq("portal", target.portal)
        .eq("external_id", listing.external_id)
        .maybeSingle();

      let enriched = listing;
      // Only enrich (additional fetch) for NEW listings to save credits
      if (!existing) {
        try {
          await sleep(1500); // throttle
          const detail = await firecrawlScrape(listing.url, firecrawlKey);
          totalFetches++;
          enriched = enrichFromMarkdown(target.portal, detail.markdown, listing);
        } catch (e) {
          errors.push(`detail ${listing.external_id}: ${(e as Error).message}`);
        }
      }

      const now = new Date().toISOString();
      const firstSeen = existing?.first_seen_at ?? now;
      let priceHistory = (existing?.price_history as Array<{ price: number; at: string }>) ?? [];
      if (enriched.price_eur && enriched.price_eur !== existing?.price_eur) {
        priceHistory = [...priceHistory, { price: enriched.price_eur, at: now }];
      } else if (priceHistory.length === 0 && enriched.price_eur) {
        priceHistory = [{ price: enriched.price_eur, at: now }];
      }

      const score = calcLeadScore({
        is_private_seller: enriched.is_private_seller ?? false,
        price_eur: enriched.price_eur ?? null,
        zone: target.zone,
        condition: enriched.condition ?? null,
        first_seen_at: firstSeen,
        price_history: priceHistory,
      });

      const row = {
        portal: target.portal,
        external_id: enriched.external_id,
        url: enriched.url,
        title: enriched.title ?? null,
        zone: target.zone,
        price_eur: enriched.price_eur ?? null,
        sqm: enriched.sqm ?? null,
        rooms: enriched.rooms ?? null,
        condition: enriched.condition ?? null,
        is_private_seller: enriched.is_private_seller ?? false,
        thumbnail_url: enriched.thumbnail_url ?? null,
        description_excerpt: enriched.description_excerpt ?? null,
        last_seen_at: now,
        price_history: priceHistory,
        status: "active",
        lead_score: score,
      };

      if (existing) {
        await admin.from("property_listings")
          .update(row)
          .eq("id", existing.id);
        updatedCount++;
      } else {
        await admin.from("property_listings")
          .insert({ ...row, first_seen_at: firstSeen });
        newCount++;
      }
    }

    summary.push({
      portal: target.portal,
      zone: target.zone,
      found: listings.length,
      new: newCount,
      updated: updatedCount,
      errors,
    });

    await admin.from("radar_fetch_log").insert({
      portal: target.portal,
      zone: target.zone,
      url: target.url,
      listings_found: listings.length,
      listings_new: newCount,
      listings_updated: updatedCount,
      errors,
      duration_ms: Date.now() - tStart,
    });
  }

  // Mark stale listings as expired (not seen in 14 days)
  const fourteenDaysAgo = new Date(Date.now() - 14 * 86400000).toISOString();
  await admin
    .from("property_listings")
    .update({ status: "expired" })
    .lt("last_seen_at", fourteenDaysAgo)
    .eq("status", "active");

  return new Response(
    JSON.stringify({
      ok: true,
      duration_ms: Date.now() - startedAt,
      total_fetches: totalFetches,
      summary,
    }),
    { headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
});
