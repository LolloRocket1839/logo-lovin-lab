## Skill proposta: `anti-ai-prose-it-en`

Una sola skill, focalizzata sul problema emerso oggi: la prosa dei nuovi articoli blog "suona AI". Si attiva ogni volta che scrivo o riscrivo contenuti lunghi (blog, landing copy, email lunghe) in italiano o inglese.

### Cosa fa la skill

Carica una checklist + uno script di lint che blocca i tic tipici dei modelli linguistici:

1. **Zero em-dash (—)** nel corpo. Consentito solo en-dash (–) per intervalli numerici/temporali (`9–13`, `giugno–agosto`).
2. **Zero costruzioni "Non X, ma Y"** e doppie negazioni stilistiche (`non è X. È Y`, `non solo… ma anche`, `it's not X, it's Y`).
3. **Frasi brevi** (target: <25 parole medie), voce attiva, no "in altre parole" / "in other words", no "It's worth noting", no "Vale la pena notare".
4. **Sentence case** rispettato (già regola progetto, ribadita).

### Struttura file

```
.agents/skills/anti-ai-prose-it-en/
├── SKILL.md                          # trigger + checklist
├── references/
│   ├── ai-tells-it.md                # lista pattern italiani da evitare + sostituzioni
│   └── ai-tells-en.md                # stesso per inglese
└── scripts/
    └── lint-prose.sh                 # grep-based: conta —, "non X, ma Y", "in altre parole", etc.
```

### Quando si attiva

Frontmatter description mirata: "Use when writing or rewriting blog posts, landing copy, or any long-form prose in Italian or English for Jungle Rent. Removes AI tells (em-dashes, 'non X ma Y' constructions, double negatives, hedge phrases) and enforces short active sentences."

### Cosa NON serve come skill

- Lista colori / palette → già in `mem://design/color-palette`
- Founder disclosure → già in `mem://compliance/sole-founder-disclosure`
- Yield figures policy → già in `mem://compliance/no-public-yield-figures`

Queste sono regole sempre-on (Core memory), non skill on-demand.

### Domanda

Confermi questa singola skill, oppure vuoi anche:
- **B)** skill separata `og-image-generator` (procedura per generare/sostituire OG image 1200×630 con logo + ImageMagick)?
- **C)** skill `blog-post-publisher` (checklist completa: crea .md IT+EN, aggiorna `posts.ts`, FAQ, categorie, sitemap)?

Default: procedo solo con **A** (`anti-ai-prose-it-en`) se non dici altro.
