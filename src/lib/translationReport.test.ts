import { describe, it, expect } from "vitest";
import { validateAllTranslations, groupBySection } from "./validateTranslations";

describe("Translation Completeness Report", () => {
  it("generates completeness report", () => {
    const { results, reference, summary } = validateAllTranslations();
    
    console.log("\n");
    console.log("╔════════════════════════════════════════════════════════╗");
    console.log("║         🌍 TRANSLATION VALIDATION REPORT               ║");
    console.log("╠════════════════════════════════════════════════════════╣");
    console.log(`║  Reference (IT): ${reference.totalKeys} keys                         ║`);
    console.log("╠════════════════════════════════════════════════════════╣");
    
    for (const result of results) {
      const status = result.completeness === 100 ? "✅" : result.completeness >= 95 ? "🟡" : "❌";
      const pad = result.language.toUpperCase().padEnd(4);
      const pct = `${result.completeness}%`.padStart(4);
      const missing = `${result.missingKeys.length}`.padStart(3);
      console.log(`║  ${status} ${pad}: ${pct} complete | ${missing} missing keys         ║`);
    }
    
    console.log("╠════════════════════════════════════════════════════════╣");
    console.log(`║  Total missing: ${summary.totalMissing}                                  ║`);
    console.log(`║  All complete: ${summary.allComplete ? "YES ✅" : "NO ❌"}                                ║`);
    console.log("╚════════════════════════════════════════════════════════╝");
    
    // Show missing sections per language
    for (const result of results) {
      if (result.missingKeys.length > 0 && result.missingKeys.length <= 200) {
        console.log(`\n📋 ${result.language.toUpperCase()} - Missing sections:`);
        const grouped = groupBySection(result.missingKeys);
        for (const [section, keys] of Object.entries(grouped).slice(0, 10)) {
          console.log(`   [${section}]: ${keys.length} keys`);
        }
      }
    }
    
    expect(results.length).toBe(6);
  });
});
