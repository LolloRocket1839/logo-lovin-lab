// Stradario di Torino — mapping of streets to contract zones
// Based on the Accordo Territoriale 2024 microzone classification
// Each entry maps a street name (lowercase) to a zone ID

export interface StradarioEntry {
  street: string; // lowercase canonical name
  zoneId: string;
  premiumZoneId?: string; // if street belongs to a premium zone
}

// Major streets mapped to zones. The lookup uses "includes" matching,
// so "via roma" will match "Via Roma 15" etc.

export const TURIN_STRADARIO: StradarioEntry[] = [
  // ═══════════════════════════════════════════════
  // ZONA 1 — Centro / Precollinare
  // ═══════════════════════════════════════════════

  // Centro storico
  { street: "via roma", zoneId: "zona1", premiumZoneId: "premium_piazza_san_carlo" },
  { street: "via lagrange", zoneId: "zona1", premiumZoneId: "premium_piazza_san_carlo" },
  { street: "via carlo alberto", zoneId: "zona1", premiumZoneId: "premium_piazza_san_carlo" },
  { street: "piazza san carlo", zoneId: "zona1", premiumZoneId: "premium_piazza_san_carlo" },
  { street: "piazza castello", zoneId: "zona1" },
  { street: "via garibaldi", zoneId: "zona1" },
  { street: "via po", zoneId: "zona1" },
  { street: "piazza vittorio", zoneId: "zona1" },
  { street: "via pietro micca", zoneId: "zona1" },
  { street: "via maria vittoria", zoneId: "zona1" },
  { street: "via della consolata", zoneId: "zona1" },
  { street: "via santa teresa", zoneId: "zona1" },
  { street: "via barbaroux", zoneId: "zona1" },
  { street: "piazza carignano", zoneId: "zona1" },
  { street: "via accademia delle scienze", zoneId: "zona1" },
  { street: "via principe amedeo", zoneId: "zona1" },
  { street: "piazza carlo felice", zoneId: "zona1" },
  { street: "via xx settembre", zoneId: "zona1" },
  { street: "via cesare battisti", zoneId: "zona1" },
  { street: "via san francesco d'assisi", zoneId: "zona1" },
  { street: "via san tommaso", zoneId: "zona1" },
  { street: "via alfieri", zoneId: "zona1" },
  { street: "via verdi", zoneId: "zona1" },
  { street: "piazza solferino", zoneId: "zona1" },
  { street: "corso re umberto", zoneId: "zona1" },
  { street: "corso vittorio emanuele", zoneId: "zona1" },
  { street: "corso galileo ferraris", zoneId: "zona1" },
  { street: "corso matteotti", zoneId: "zona1" },
  { street: "corso stati uniti", zoneId: "zona1" },
  { street: "corso einaudi", zoneId: "zona1" },
  { street: "corso duca degli abruzzi", zoneId: "zona1" },
  { street: "corso castelfidardo", zoneId: "zona1" },
  { street: "piazza statuto", zoneId: "zona1" },

  // Crocetta
  { street: "corso trento", zoneId: "zona1" },
  { street: "corso trieste", zoneId: "zona1" },
  { street: "corso sommeiller", zoneId: "zona1" },
  { street: "via beaumont", zoneId: "zona1" },
  { street: "via sacchi", zoneId: "zona1" },
  { street: "corso marconi", zoneId: "zona1" },
  { street: "via madama cristina", zoneId: "zona1" },
  { street: "via principe tommaso", zoneId: "zona1" },
  { street: "via berthollet", zoneId: "zona1" },

  // San Salvario
  { street: "via nizza", zoneId: "zona1" },
  { street: "via ormea", zoneId: "zona1" },
  { street: "via baretti", zoneId: "zona1" },
  { street: "via saluzzo", zoneId: "zona1" },
  { street: "via san pio v", zoneId: "zona1" },
  { street: "via morgari", zoneId: "zona1" },
  { street: "via belfiore", zoneId: "zona1" },
  { street: "via galliari", zoneId: "zona1" },
  { street: "via bertola", zoneId: "zona1" },
  { street: "largo saluzzo", zoneId: "zona1" },

  // Vanchiglia
  { street: "via vanchiglia", zoneId: "zona1" },
  { street: "via bava", zoneId: "zona1" },
  { street: "via napione", zoneId: "zona1" },
  { street: "via giulia di barolo", zoneId: "zona1" },
  { street: "via matteo pescatore", zoneId: "zona1" },
  { street: "lungo dora firenze", zoneId: "zona1" },
  { street: "corso san maurizio", zoneId: "zona1" },
  { street: "via buniva", zoneId: "zona1" },
  { street: "via balbo", zoneId: "zona1" },

  // Gran Madre / Borgo Po / Collina
  { street: "piazza gran madre", zoneId: "zona1", premiumZoneId: "premium_gran_madre" },
  { street: "corso moncalieri", zoneId: "zona1", premiumZoneId: "premium_gran_madre" },
  { street: "via villa della regina", zoneId: "zona1", premiumZoneId: "premium_gran_madre" },
  { street: "strada del nobile", zoneId: "zona1", premiumZoneId: "premium_gran_madre" },
  { street: "via monferrato", zoneId: "zona1" },
  { street: "via luisa del carretto", zoneId: "zona1" },
  { street: "corso casale", zoneId: "zona1" },
  { street: "via gioanetti", zoneId: "zona1" },

  // Valentino / Politecnico area
  { street: "corso massimo d'azeglio", zoneId: "zona1" },
  { street: "viale virgilio", zoneId: "zona1" },
  { street: "corso raffaello", zoneId: "zona1" },
  { street: "viale pier andrea mattioli", zoneId: "zona1" },

  // ═══════════════════════════════════════════════
  // ZONA 2 — Semicentro
  // ═══════════════════════════════════════════════

  // Santa Rita
  { street: "via tripoli", zoneId: "zona2" },
  { street: "via osasco", zoneId: "zona2" },
  { street: "via duchessa jolanda", zoneId: "zona2" },
  { street: "via gorizia", zoneId: "zona2" },
  { street: "corso sebastopoli", zoneId: "zona2" },
  { street: "corso agnelli", zoneId: "zona2" },
  { street: "via filadelfia", zoneId: "zona2" },

  // San Donato / Campidoglio / Cenisia
  { street: "via cibrario", zoneId: "zona2" },
  { street: "via san donato", zoneId: "zona2" },
  { street: "corso svizzera", zoneId: "zona2" },
  { street: "corso lecce", zoneId: "zona2" },
  { street: "corso francia", zoneId: "zona2" },
  { street: "via avigliana", zoneId: "zona2" },
  { street: "via duchessa jolanda", zoneId: "zona2" },
  { street: "piazza bernini", zoneId: "zona2" },
  { street: "piazza rivoli", zoneId: "zona2" },
  { street: "via monginevro", zoneId: "zona2" },
  { street: "piazza sabotino", zoneId: "zona2" },
  { street: "via cenischia", zoneId: "zona2" },

  // Parella
  { street: "corso montecucco", zoneId: "zona2" },
  { street: "via vandalino", zoneId: "zona2" },
  { street: "via pietro cossa", zoneId: "zona2" },

  // Aurora / Barriera di Milano
  { street: "corso giulio cesare", zoneId: "zona2" },
  { street: "via cuneo", zoneId: "zona2" },
  { street: "corso novara", zoneId: "zona2" },
  { street: "corso brescia", zoneId: "zona2" },
  { street: "via bologna", zoneId: "zona2" },
  { street: "via sempione", zoneId: "zona2" },
  { street: "corso emilia", zoneId: "zona2" },
  { street: "piazza bottesini", zoneId: "zona2" },
  { street: "via cigna", zoneId: "zona2" },

  // Lingotto / Nizza Millefonti
  { street: "via genova", zoneId: "zona2" },
  { street: "corso unione sovietica", zoneId: "zona2" },
  { street: "via onorato vigliani", zoneId: "zona2" },
  { street: "via ventimiglia", zoneId: "zona2" },
  { street: "via passo buole", zoneId: "zona2" },
  { street: "corso spezia", zoneId: "zona2" },

  // ═══════════════════════════════════════════════
  // ZONA 3 — Periferia semicentrale
  // ═══════════════════════════════════════════════

  // Mirafiori Nord / Pozzo Strada
  { street: "corso orbassano", zoneId: "zona3" },
  { street: "via guido reni", zoneId: "zona3" },
  { street: "strada di mirafiori", zoneId: "zona3" },
  { street: "corso siracusa", zoneId: "zona3" },
  { street: "via artom", zoneId: "zona3" },
  { street: "via plava", zoneId: "zona3" },
  { street: "via candiolo", zoneId: "zona3" },

  // Borgo Vittoria / Madonna di Campagna
  { street: "via stradella", zoneId: "zona3" },
  { street: "via chatillon", zoneId: "zona3" },
  { street: "via sansovino", zoneId: "zona3" },
  { street: "corso grosseto", zoneId: "zona3" },
  { street: "via borgaro", zoneId: "zona3" },
  { street: "via bibiana", zoneId: "zona3" },

  // Rebaudengo / Regio Parco
  { street: "corso vercelli", zoneId: "zona3" },
  { street: "corso regio parco", zoneId: "zona3" },
  { street: "via sempione", zoneId: "zona3" },
  { street: "via montanaro", zoneId: "zona3" },

  // Lucento
  { street: "via pianezza", zoneId: "zona3" },
  { street: "corso potenza", zoneId: "zona3" },
  { street: "via foglizzo", zoneId: "zona3" },

  // ═══════════════════════════════════════════════
  // ZONA 4 — Periferia
  // ═══════════════════════════════════════════════

  // Mirafiori Sud
  { street: "strada delle cacce", zoneId: "zona4" },
  { street: "via negarville", zoneId: "zona4" },
  { street: "via roveda", zoneId: "zona4" },
  { street: "strada del drosso", zoneId: "zona4" },

  // Falchera
  { street: "strada di settimo", zoneId: "zona4" },
  { street: "via falchera", zoneId: "zona4" },
  { street: "via delle querce", zoneId: "zona4" },

  // Vallette / Le Vallette
  { street: "corso ferrara", zoneId: "zona4" },
  { street: "via delle primule", zoneId: "zona4" },
  { street: "via degli abeti", zoneId: "zona4" },

  // Barca / Bertolla
  { street: "strada di barca", zoneId: "zona4" },
  { street: "strada di bertolla", zoneId: "zona4" },
  { street: "via reiss romoli", zoneId: "zona4" },
];

/**
 * Neighborhood-to-zone fallback mapping for when no exact street match is found.
 * Uses neighborhood names detected from the address.
 */
export const NEIGHBORHOOD_ZONE_MAP: Record<string, string> = {
  // Zona 1
  "centro": "zona1",
  "centro storico": "zona1",
  "crocetta": "zona1",
  "san salvario": "zona1",
  "vanchiglia": "zona1",
  "gran madre": "zona1",
  "borgo po": "zona1",
  "crimea": "zona1",
  "valentino": "zona1",
  "politecnico": "zona1",
  // Zona 2
  "santa rita": "zona2",
  "lingotto": "zona2",
  "nizza millefonti": "zona2",
  "aurora": "zona2",
  "barriera di milano": "zona2",
  "barriera": "zona2",
  "san donato": "zona2",
  "campidoglio": "zona2",
  "cenisia": "zona2",
  "parella": "zona2",
  "san paolo": "zona2",
  // Zona 3
  "mirafiori nord": "zona3",
  "pozzo strada": "zona3",
  "borgo vittoria": "zona3",
  "madonna di campagna": "zona3",
  "rebaudengo": "zona3",
  "regio parco": "zona3",
  "lucento": "zona3",
  // Zona 4
  "mirafiori sud": "zona4",
  "falchera": "zona4",
  "vallette": "zona4",
  "le vallette": "zona4",
  "barca": "zona4",
  "bertolla": "zona4",
  "villaretto": "zona4",
};

export interface ZoneDetectionResult {
  zoneId: string;
  premiumZoneId?: string;
  matchType: 'street' | 'neighborhood' | 'none';
  matchedOn: string; // the street or neighborhood that matched
}

/**
 * Detects the contract zone from a Turin address string.
 * Tries exact street match first, then neighborhood fallback.
 */
export function detectZoneFromAddress(address: string): ZoneDetectionResult {
  const lower = address.toLowerCase().trim();

  if (!lower) {
    return { zoneId: '', matchType: 'none', matchedOn: '' };
  }

  // 1. Try street-level match (longest match first for specificity)
  const sortedEntries = [...TURIN_STRADARIO].sort(
    (a, b) => b.street.length - a.street.length
  );

  for (const entry of sortedEntries) {
    if (lower.includes(entry.street)) {
      return {
        zoneId: entry.zoneId,
        premiumZoneId: entry.premiumZoneId,
        matchType: 'street',
        matchedOn: entry.street,
      };
    }
  }

  // 2. Try neighborhood-level match
  const sortedNeighborhoods = Object.keys(NEIGHBORHOOD_ZONE_MAP).sort(
    (a, b) => b.length - a.length
  );

  for (const neighborhood of sortedNeighborhoods) {
    if (lower.includes(neighborhood)) {
      return {
        zoneId: NEIGHBORHOOD_ZONE_MAP[neighborhood],
        matchType: 'neighborhood',
        matchedOn: neighborhood,
      };
    }
  }

  return { zoneId: '', matchType: 'none', matchedOn: '' };
}
