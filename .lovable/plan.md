

# Pagina Contratti di Locazione + componenti blog

## Panoramica

Creare una pagina dedicata `/contratti-locazione` con il pricing dei contratti e due componenti riutilizzabili (banner inline e sidebar card) da inserire negli articoli blog correlati al cluster investitori/venditori.

## 1. Nuova pagina `/contratti-locazione`

**File: `src/pages/ContrattiLocazione.tsx`**

- Convertire il `PricingSection` dal componente fornito in una pagina completa con Navigation, Footer, Helmet SEO, Breadcrumbs
- Usare il design system esistente (Tailwind, `Card`, `Button`) invece degli inline styles
- Mantenere i 3 piani (Standard €89, Transitorio €109, Pacchetto €149)
- CTA: `mailto:junglerententeprise@gmail.com` con subject pre-compilato per piano
- Badge "Più richiesto" sul piano Transitorio
- Responsive: cards in colonna su mobile, griglia 3 colonne su desktop
- Aggiungere i18n base (IT + EN) per titoli e descrizioni

## 2. Componenti riutilizzabili per blog

**File: `src/components/blog/ContractBanner.tsx`**
- Banner inline compatto: una riga con testo + CTA "Richiedi preventivo"
- Stile coerente con il design system (colori primary/secondary)

**File: `src/components/blog/ContractSidebarCard.tsx`**
- Card verticale compatta per ClusterSidebar o inserimento manuale
- Icona documento, bullet points, CTA

## 3. Routing

**File: `src/App.tsx`**
- Aggiungere route `/contratti-locazione` e `/rental-contracts` (EN alias)
- Lazy load del componente

## 4. Integrazione blog

**File: articoli correlati (canone-concordato, cedolare-secca, contratti-locazione-morosita, ecc.)**
- Inserire `<!-- contract-banner -->` placeholder o `SeeAlsoBox` link verso `/contratti-locazione` nei markdown degli articoli del cluster investitori

## 5. Aggiornamenti SEO/discovery

- Aggiungere la pagina a `sitemap.xml`, `llms.txt`, `llms-full.txt`
- Aggiungere link nel Footer nella sezione servizi

## File coinvolti

| File | Azione |
|------|--------|
| `src/pages/ContrattiLocazione.tsx` | Nuovo - pagina pricing |
| `src/components/blog/ContractBanner.tsx` | Nuovo - banner inline |
| `src/components/blog/ContractSidebarCard.tsx` | Nuovo - sidebar card |
| `src/App.tsx` | Route nuove |
| `src/i18n/locales/it.json` | Traduzioni contratti |
| `src/i18n/locales/en.json` | Traduzioni contratti EN |
| `src/components/layout/Footer.tsx` | Link a contratti |
| `public/sitemap.xml` | Nuova entry |
| `public/llms.txt` + `llms-full.txt` | Nuova entry |
| Blog markdown (5-6 articoli investitori) | SeeAlsoBox / banner |

