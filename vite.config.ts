import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";
import { imagetools } from "vite-imagetools";
import { execSync } from "child_process";
import { mcpPlugin } from "@lovable.dev/mcp-js/stacks/supabase/vite";

// Run sentence case validation in production builds
const validateSentenceCase = () => ({
  name: 'validate-sentence-case',
  buildStart() {
    try {
      execSync('node scripts/validate-sentence-case.js', { stdio: 'inherit' });
    } catch (e) {
      // Validation runs but doesn't block build
    }
  }
});

// Investor zones schema validation — BLOCKING (fails build & CI on bad data)
const validateInvestorZonesPlugin = (mode: string) => ({
  name: 'validate-investor-zones',
  buildStart() {
    // 1) Zod schema check.
    //    Dev: warn-only (never block HMR / dev server).
    //    Production build & CI: hard fail.
    const flag = mode === 'production' ? '' : ' --warn';
    execSync(`npx tsx scripts/validate-investor-zones.ts${flag}`, { stdio: 'inherit' });

    // 2) Unit-test suite for the data module (includes snapshot tests).
    //    Only blocks in production / CI — keeps dev startup fast.
    //    CI=true ensures vitest fails (instead of auto-writing) on missing
    //    or stale snapshots, so PRs catch error-message regressions.
    if (mode === 'production') {
      execSync(
        'npx vitest run src/data/investorZoneData.test.ts --reporter=dot',
        { stdio: 'inherit', env: { ...process.env, CI: 'true' } },
      );
    }
  }
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(), 
    imagetools({
      defaultDirectives: (url) => {
        if (url.searchParams.has('optimized')) {
          return new URLSearchParams({
            format: 'webp',
            quality: '80',
          });
        }
        return new URLSearchParams();
      },
    }),
    mode === "development" && componentTagger(),
    validateSentenceCase(),
    validateInvestorZonesPlugin(mode),
    mcpPlugin(),
    mode === "production" && visualizer({
      filename: "dist/stats.html",
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Function form: only split vendors that are needed on the first paint.
        // Heavy, page-specific libs (recharts, jspdf, leaflet, markdown) are left
        // to Rollup so they land in the lazy route chunks that actually use them
        // instead of being hoisted into the entry chunk.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined;
          if (/[\\/]node_modules[\\/](react|react-dom|react-router-dom|scheduler)[\\/]/.test(id)) return 'vendor-react';
          if (id.includes('/@radix-ui/')) return 'vendor-ui';
          if (id.includes('/framer-motion/')) return 'vendor-motion';
          if (/[\\/](i18next|react-i18next|i18next-browser-languagedetector)[\\/]/.test(id)) return 'vendor-i18n';
          if (id.includes('/lucide-react/')) return 'vendor-icons';
          return undefined;
        },
      },
    },
    chunkSizeWarningLimit: 500,
    // Tree shaking optimization
    treeshake: {
      moduleSideEffects: false,
    },
  },
}));
