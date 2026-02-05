

# Piano: Migliorare Visibilità SEO delle Zone Investitori

## Obiettivo
Aumentare il "PageRank" interno delle pagine `/investitori/zone` e `/investitori/zone/{quartiere}` attraverso internal linking strategico da pagine ad alta autorità (homepage, footer, pagina investitori).

## Modifiche Pianificate

### 1. Aggiungere Link nella InvestorSection Homepage
**File:** `src/components/sections/InvestorSection/InvestorSectionDesktop.tsx`
- Aggiungere un link "Esplora i quartieri" sotto i CTA esistenti
- Stile discreto ma visibile (text link con freccia)

**File:** `src/components/sections/InvestorSection/InvestorSectionMobile.tsx`
- Stesso link aggiunto sotto il bottone CTA principale

### 2. Aggiungere Sezione "Zone Investimento" nel Footer
**File:** `src/components/layout/Footer.tsx`
- Nuova colonna "Zone popolari investitori" accanto a "Quartieri popolari" (studenti)
- Link ai 5 quartieri top per rendimento: Aurora, Barriera di Milano, Cenisia, San Salvario, Vanchiglia
- Link finale "Tutte le zone →" che porta a `/investitori/zone`

### 3. Aggiungere Link Contestuali nella Pagina Investitori
**File:** `src/pages/Investors.tsx`
- Nella sezione "Zones Section" esistente, aggiungere 3 card preview dei quartieri top
- Ogni card ha link diretto alla pagina specifica del quartiere
- Questo crea link diretti alle pagine foglia (non solo all'indice)

## Impatto SEO Atteso
- Homepage (alta autorità) → distribuisce PageRank a `/investitori/zone`
- Footer (presente su tutte le pagine) → segnale di rilevanza per i crawler
- Link diretti ai singoli quartieri → indicizzazione più veloce delle pagine dettaglio

---

## Dettagli Tecnici

### InvestorSectionDesktop.tsx - Aggiunta dopo i CTA
```tsx
{/* Link to zones */}
<div className="text-center mt-6">
  <Link 
    to={i18n.language.startsWith('en') ? '/investors/zones' : '/investitori/zone'}
    className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
  >
    {i18n.language.startsWith('it') ? 'Esplora i quartieri di Torino' : 'Explore Turin neighborhoods'}
    <ArrowRight className="w-4 h-4 ml-1" />
  </Link>
</div>
```

### Footer.tsx - Nuova colonna
```tsx
{/* Investment Zones - SEO PageRank distribution */}
<div>
  <h3 className="font-display text-base sm:text-lg font-bold mb-6 text-foreground">
    {i18n.language.startsWith('it') ? 'Zone investimento' : 'Investment zones'}
  </h3>
  <ul className="space-y-3 text-muted-foreground">
    <li><Link to="/investitori/zone/aurora">Aurora</Link></li>
    <li><Link to="/investitori/zone/barriera-di-milano">Barriera di Milano</Link></li>
    <li><Link to="/investitori/zone/cenisia">Cenisia</Link></li>
    <li><Link to="/investitori/zone/san-salvario">San Salvario</Link></li>
    <li><Link to="/investitori/zone/vanchiglia">Vanchiglia</Link></li>
    <li>
      <Link to="/investitori/zone" className="text-primary">
        Tutte le zone →
      </Link>
    </li>
  </ul>
</div>
```

### Investors.tsx - Zone Preview Cards
Nella sezione esistente "Zones Section", sostituire il semplice link con 3 card preview:
```tsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
  {/* Aurora */}
  <Link to="/investitori/zone/aurora">
    <Card className="p-4 hover:border-primary/50 transition-colors">
      <h3 className="font-semibold">Aurora</h3>
      <p className="text-sm text-muted-foreground">7-9% lordo</p>
    </Card>
  </Link>
  {/* Cenisia */}
  <Link to="/investitori/zone/cenisia">...</Link>
  {/* San Salvario */}
  <Link to="/investitori/zone/san-salvario">...</Link>
</div>
```

