## Obiettivo

Allineare le CTA tra `/` (homepage) e `/investitori`: stessa gerarchia (primario WhatsApp → secondario form), stesso microcopy ("Parla con Lorenzo" / "Talk to Lorenzo"), stesso allineamento e stati hover/focus visivamente coerenti.

## Stato attuale (cosa diverge)

| Superficie | CTA primaria | CTA secondaria | Stile | Focus ring |
|---|---|---|---|---|
| Homepage `ImmersiveHero` | `t('hero.startInvesting')` (A/B test `hero_cta_v2`) → dialog | Link "Sei un proprietario" | `<button>` custom | nessuno esplicito |
| Homepage `InvestorSection` (desktop) | "Parla con Lorenzo" (WhatsApp) | "Investi ora" (dialog) + "Prenota call" (Calendly) | shadcn `<Button>` | default |
| Homepage `StickyCTA` | "Investi" (dialog) | "Vendi casa" + dismiss | shadcn `<Button>` | default |
| `/investitori` `HeroSection` | "Parla con Lorenzo" (WhatsApp) | "Richiedi info" (scroll form) | `<button>` custom uppercase tracking-widest | nessuno esplicito |
| `/investitori` `QuickContactBar` | "WhatsApp" pill | "Email" pill | `<button>` custom rounded-full | nessuno esplicito |

Divergenze chiave: gerarchia diversa (homepage spinge dialog "Investi"; /investitori spinge WhatsApp), microcopy inconsistente, alcuni `<button>` non hanno `focus-visible:ring`, allineamento testo CTA varia (uppercase vs. sentence case).

## Decisioni di design

1. **Gerarchia unica** su entrambe le pagine:
   - **Primaria** = WhatsApp a Lorenzo ("Parla con Lorenzo" / "Talk to Lorenzo")
   - **Secondaria** = form/dialog di richiesta info ("Richiedi info" / "Request info")
   - Eventuale terziaria (Calendly / "Vendi casa") rimane ma con peso visivo minore (ghost/link).
2. **Microcopy** = chiavi i18n condivise (`cta.talkToLorenzo`, `cta.requestInfo`) usate da hero homepage, InvestorSection, HeroSection /investitori, QuickContactBar, StickyCTA. Sentence case (eccezione tedesco), senza uppercase tracking-widest.
3. **Hierarchy visiva** = shadcn `<Button>` variants:
   - Primaria: `variant="default" size="lg"` (sfondo `primary`, testo `primary-foreground`)
   - Secondaria: `variant="outline" size="lg"` (border `primary/30`, hover `bg-primary/5`)
   - Terziaria: `variant="ghost"` o link `text-primary underline-offset-4 hover:underline`
4. **Stati hover/focus uniformi** = lo `<Button>` shadcn già porta `focus-visible:ring-2 ring-ring ring-offset-2`. I `<button>` custom in HeroSection investitori, QuickContactBar e ImmersiveHero vanno sostituiti con `<Button>` (o, dove serve preservare il layout swiss-frame, aggiungere esplicitamente `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-colors`).
5. **Allineamento** = su tutte le superfici, in stack verticale su mobile (`w-full`), in riga orizzontale `flex flex-row gap-3` da `sm:` in su; CTA primaria sempre prima a sinistra (o sopra su mobile).
6. **A/B test `hero_cta_v2`** attualmente cambia la label. Lo conservo solo come label-variant *interno alla CTA primaria* ("Parla con Lorenzo" vs "Parla con Lorenzo · risposta in 24h"), per non perdere il dato in corso, ma la gerarchia visiva resta uguale tra A e B. Chiedo conferma se invece l'A/B può essere ritirato.

## File da modificare

- `src/i18n/locales/investor/{it,en,...}.json` (+ eventuali file globali) — aggiungere chiavi condivise `cta.talkToLorenzo`, `cta.requestInfo`, `cta.talkToLorenzoSubcopy`. Sync IT → EN → 6 locali residue.
- `src/components/innovative/ImmersiveHero.tsx` — sostituire `<button>` custom con `<Button>` shadcn, primario WhatsApp, secondario dialog form; conservare hook A/B.
- `src/components/investitori/HeroSection.tsx` — rimuovere uppercase tracking-widest sulle due CTA, passare a `<Button>` shadcn `default` + `outline`, stack mobile/desktop coerente.
- `src/components/investitori/QuickContactBar.tsx` — pill → `<Button>` shadcn `size="sm"` variants `default` + `outline` rounded-full (preservato), microcopy unificato.
- `src/components/sections/InvestorSection/InvestorSectionDesktop.tsx` + `InvestorSectionMobile.tsx` — riordinare CTA: primaria "Parla con Lorenzo", secondaria "Richiedi info" (dialog esistente), Calendly come ghost.
- `src/components/StickyCTA.tsx` — primaria "Parla con Lorenzo" (WhatsApp), secondaria "Vendi casa" outline, dismiss invariato.

## Out of scope

- Nessun cambio a Footer/Navigation, contenuti delle sezioni intermedie, dialog interni.
- Nessun cambio di routing, RLS, analytics events: i `trackEvent` esistenti restano (rinominati solo se la sorgente cambia semantica).
- Nessun nuovo asset visivo.

## Dettagli tecnici

- Tokens: solo `bg-primary`, `text-primary-foreground`, `border-primary/30`, `bg-primary/5`, `ring-ring`. Niente colori arbitrari.
- Focus ring: `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background`.
- Microcopy IT (sentence case): "Parla con Lorenzo", "Richiedi info". EN: "Talk to Lorenzo", "Request info". DE mantiene capitalization sostantivi: "Mit Lorenzo sprechen", "Infos anfordern".
- `hero_cta_v2` A/B: la variante B aggiunge solo subcopy `"Risposta entro 24h"` sotto la CTA primaria, label uguale.

## Domanda aperta

L'A/B test `hero_cta_v2` è ancora in raccolta dati o posso ritirarlo e usare una sola label? Procedo conservandolo come label-variant minore se non specifichi diversamente.