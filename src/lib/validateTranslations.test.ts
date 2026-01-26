import { describe, it, expect } from "vitest";
import { validateAllTranslations, getMissingKeys, groupBySection } from "./validateTranslations";

describe("Translation Validation", () => {
  it("should validate all translations and report completeness", () => {
    const { reference, results, summary } = validateAllTranslations();
    
    console.log("\n🌍 Translation Validation Results");
    console.log("================================\n");
    console.log(`Reference (IT): ${reference.totalKeys} keys\n`);
    
    for (const result of results) {
      const status = result.missingKeys.length === 0 ? "✅" : "⚠️";
      console.log(
        `${status} ${result.language.toUpperCase()}: ${result.completeness}% complete (${result.missingKeys.length} missing, ${result.extraKeys.length} extra)`
      );
      
      if (result.missingKeys.length > 0) {
        const grouped = groupBySection(result.missingKeys);
        console.log(`   Missing sections in ${result.language.toUpperCase()}:`);
        for (const [section, keys] of Object.entries(grouped)) {
          console.log(`   [${section}]: ${keys.length} keys`);
        }
      }
    }
    
    console.log("\n================================");
    console.log(`Summary: ${summary.totalMissing} total missing, ${summary.totalExtra} total extra`);
    console.log(`All complete: ${summary.allComplete ? "✅ YES" : "❌ NO"}\n`);
    
    // Log detailed missing keys per language
    if (summary.totalMissing > 0) {
      console.log("\n📋 Detailed Missing Keys:");
      for (const result of results) {
        if (result.missingKeys.length > 0) {
          console.log(`\n${result.language.toUpperCase()} (${result.missingKeys.length} missing):`);
          result.missingKeys.slice(0, 20).forEach(key => console.log(`  - ${key}`));
          if (result.missingKeys.length > 20) {
            console.log(`  ... and ${result.missingKeys.length - 20} more`);
          }
        }
      }
    }
    
    // Assert expectations
    expect(reference.totalKeys).toBeGreaterThan(0);
    expect(results.length).toBe(6); // en, es, fr, de, zh, sv
  });
  
  it("should report completeness percentages for all languages", () => {
    const { results, reference } = validateAllTranslations();
    
    console.log(`\n📊 Completeness Report (Reference IT: ${reference.totalKeys} keys)\n`);
    
    for (const result of results) {
      const status = result.completeness >= 95 ? "✅" : result.completeness >= 80 ? "⚠️" : "❌";
      console.log(`${status} ${result.language.toUpperCase()}: ${result.completeness}% (${result.totalKeys}/${reference.totalKeys} keys, ${result.missingKeys.length} missing)`);
      
      if (result.missingKeys.length > 0 && result.missingKeys.length <= 50) {
        const grouped = groupBySection(result.missingKeys);
        for (const [section, keys] of Object.entries(grouped)) {
          console.log(`   [${section}]: ${keys.join(", ").substring(0, 100)}${keys.join(", ").length > 100 ? "..." : ""}`);
        }
      }
    }
    
    // Just report, don't fail
    expect(results.length).toBe(6);
  });
});
