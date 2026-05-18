import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { visualizer } from "rollup-plugin-visualizer";
import { imagetools } from "vite-imagetools";
import { execSync } from "child_process";

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
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-ui': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-accordion',
            '@radix-ui/react-tabs',
            '@radix-ui/react-tooltip',
            '@radix-ui/react-popover',
          ],
          'vendor-motion': ['framer-motion'],
          'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector'],
          'vendor-charts': ['recharts'],
          'vendor-markdown': ['react-markdown', 'remark-gfm', 'rehype-raw'],
          'vendor-maps': ['leaflet', 'react-leaflet'],
          'vendor-pdf': ['jspdf'],
          'vendor-icons': ['lucide-react'],
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
