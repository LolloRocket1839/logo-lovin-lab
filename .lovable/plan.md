
# Piano: strumento confronto side-by-side zone investitori

## Obiettivo

Creare un componente interattivo che permetta agli investitori di confrontare 2-3 quartieri di Torino affiancati, visualizzando tutte le metriche chiave (rendimento, prezzo, domanda, sfitto, trend) in modo comparativo.

---

## Architettura

### Posizionamento

Lo strumento sara accessibile in due modi:
1. **Pagina indice** (`InvestorZonesIndex.tsx`): Pulsante "Confronta zone" che apre un drawer/modal
2. **Pagina singola zona** (`InvestorZonePage.tsx`): Sezione "Confronta con altri quartieri" dopo la nota investitori

### Componente principale

Nuovo file: `src/components/investor/ZoneComparisonTool.tsx`

---

## Struttura dati per confronto

Le metriche da confrontare per ogni zona (gia disponibili in `InvestorZone`):

| Metrica | Campo | Formato |
|---------|-------|---------|
| Prezzo medio | `pricePerSqm.avg` | €X.XXX/mq |
| Rendimento lordo | `grossYield.min-max` | X.X-X.X% |
| Rendimento netto | `netYield.min-max` | X.X-X.X% |
| Tasso sfitto | `vacancyRate.min-max` | X-X% |
| Trend 2024 | `variation2024` | +X% |
| Affitto stanza | `rentRoom.min-max` | €XXX-XXX |
| Affitto bilocale | `rentApartment.min-max` | €XXX-XXX |
| Livello domanda | `demand` | Alta/Molto alta |
| Tempo affitto | `rentingTime` | 2-3 settimane |
| Riqualificazione | `urbanRenewal.active` | Si/No + progetti |

---

## UI Design

### Layout tabella comparativa (Desktop)

```text
┌──────────────────────────────────────────────────────────────────────────┐
│  CONFRONTA ZONE                                        [X] Chiudi        │
├──────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│  [Select zona 1 ▼]    [Select zona 2 ▼]    [+ Aggiungi zona]            │
│                                                                          │
├──────────────────────────────────────────────────────────────────────────┤
│                   │ San Salvario      │ Aurora            │ Cenisia      │
│───────────────────┼───────────────────┼───────────────────┼──────────────│
│  Prezzo medio     │ €2.650/mq         │ €1.520/mq ★ MIN   │ €2.200/mq    │
│  Rend. lordo      │ 5.8-6.5%          │ 5.5-7% ★ MAX      │ 6-7% ★ MAX   │
│  Rend. netto      │ 4.1-4.8%          │ 3.8-5%            │ 4.4-5.1% ★   │
│  Sfitto           │ 2-4% ★ MIN        │ 5-8%              │ 3-5%         │
│  Trend 2024       │ +5.5%             │ +7% ★ MAX         │ +4%          │
│  Affitto stanza   │ €400-500          │ €350-450          │ €380-470     │
│  Affitto biloc.   │ €700-850          │ €500-600          │ €550-700     │
│  Domanda          │ MOLTO ALTA ★      │ ALTA              │ ALTA         │
│  Tempo affitto    │ 2-3 sett ★ MIN    │ 2-4 sett          │ 2-4 sett     │
│  Riqualificazione │ Scalo Nizza       │ Masterplan Ratti  │ Metro 2      │
├──────────────────────────────────────────────────────────────────────────┤
│  [Vedi San Salvario]  [Vedi Aurora]     [Vedi Cenisia]                   │
└──────────────────────────────────────────────────────────────────────────┘
```

### Layout card (Mobile)

Su mobile, le zone vengono visualizzate come card scorrevoli orizzontalmente con le stesse metriche in formato verticale.

### Indicatori visivi

- **★ Best value**: Evidenziato in verde per il valore migliore (es. rendimento piu alto, sfitto piu basso)
- **Badge colorati**: Trend alto (verde), medio (giallo), stabile (grigio)
- **Barra comparativa**: Per prezzo e rendimento, barra orizzontale proporzionale al valore

---

## Componenti da creare

| File | Descrizione |
|------|-------------|
| `src/components/investor/ZoneComparisonTool.tsx` | Componente principale con logica selezione e tabella |
| `src/components/investor/ComparisonRow.tsx` | Singola riga della tabella con evidenziazione best value |
| `src/components/investor/ComparisonMobileCard.tsx` | Versione card per mobile |

---

## Integrazioni

### 1. InvestorZonesIndex.tsx

Aggiungere un pulsante sticky "Confronta zone" che apre un Drawer con il tool:

```text
// Nuovo import
import { ZoneComparisonTool } from "@/components/investor/ZoneComparisonTool";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

// Nel JSX, dopo i filtri
<Button variant="outline" className="gap-2">
  <GitCompare className="w-4 h-4" />
  Confronta zone
</Button>
```

### 2. InvestorZonePage.tsx

Aggiungere sezione "Confronta con altri quartieri" che mostra il tool inline con la zona corrente pre-selezionata:

```text
// Nuova sezione dopo "Nota investitori"
<Card className="p-6">
  <h2>Confronta con altri quartieri</h2>
  <ZoneComparisonTool 
    preselectedZones={[zone.id]} 
    lang={lang}
    embedded={true}
  />
</Card>
```

---

## Logica evidenziazione "Best Value"

Per ogni metrica, calcolare quale zona ha il valore migliore:

| Metrica | Logica best value |
|---------|-------------------|
| Prezzo medio | MIN (piu economico = migliore entry point) |
| Rendimento lordo/netto | MAX (piu alto = migliore) |
| Sfitto | MIN (piu basso = meno rischio) |
| Trend 2024 | MAX (crescita maggiore = migliore) |
| Domanda | very_high > high > medium > low |
| Tempo affitto | Parsing settimane, MIN = migliore |

---

## Traduzioni

Nuove chiavi per `it.json` e `en.json`:

```json
{
  "investorZones": {
    "compare": {
      "title": "Confronta zone",
      "addZone": "Aggiungi zona",
      "removeZone": "Rimuovi",
      "selectZone": "Seleziona quartiere...",
      "maxZones": "Max 3 zone",
      "bestValue": "Migliore",
      "viewZone": "Vedi dettagli",
      "pricePerSqm": "Prezzo medio",
      "grossYield": "Rend. lordo",
      "netYield": "Rend. netto",
      "vacancy": "Tasso sfitto",
      "trend": "Trend 2024",
      "roomRent": "Affitto stanza",
      "aptRent": "Affitto bilocale",
      "demand": "Domanda",
      "rentingTime": "Tempo affitto",
      "renewal": "Riqualificazione",
      "noRenewal": "Nessuna"
    }
  }
}
```

---

## File da creare/modificare

| File | Azione | Priorita |
|------|--------|----------|
| `src/components/investor/ZoneComparisonTool.tsx` | NUOVO - Componente principale | Alta |
| `src/components/investor/ComparisonRow.tsx` | NUOVO - Riga tabella | Alta |
| `src/pages/InvestorZonesIndex.tsx` | Aggiungere pulsante + Drawer | Media |
| `src/pages/InvestorZonePage.tsx` | Aggiungere sezione confronto | Media |
| `src/i18n/locales/it.json` | Traduzioni compare | Media |
| `src/i18n/locales/en.json` | Traduzioni compare | Media |

---

## Stima implementazione

| Fase | Attivita | Complessita |
|------|----------|-------------|
| 1 | Creare `ZoneComparisonTool.tsx` con logica selezione e tabella | Alta |
| 2 | Creare `ComparisonRow.tsx` con evidenziazione best value | Media |
| 3 | Integrare in `InvestorZonesIndex.tsx` con Drawer | Media |
| 4 | Integrare in `InvestorZonePage.tsx` embedded | Bassa |
| 5 | Aggiungere traduzioni | Bassa |

**Totale: 2-3 messaggi per implementazione completa**

---

## Note tecniche

- Riutilizzare le funzioni helper da `investorZoneData.ts` (`formatPrice`, `formatYield`, `getDemandLabel`)
- Usare `motion.div` per animazioni fluide quando si aggiungono/rimuovono zone
- La tabella usa `overflow-x-auto` su mobile per scroll orizzontale
- I Select usano il componente shadcn esistente (`@/components/ui/select`)
- Il Drawer usa il componente shadcn esistente (`@/components/ui/drawer`)
