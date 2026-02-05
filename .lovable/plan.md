
# Piano: mappa interattiva quartieri investitori con marker colorati per rendimento

## Obiettivo

Creare un componente mappa Leaflet che visualizza tutti i 12+ quartieri di Torino con marker colorati in base al rendimento lordo, permettendo agli investitori di identificare visivamente le zone piu redditizie.

---

## Architettura

### Pattern esistente

Il progetto utilizza gia Leaflet per mappe interattive (es. `GymsMap.tsx`, `StudySpacesMap.tsx`). Seguiro lo stesso pattern:
- Uso diretto di `L.map()` con `useRef`
- Custom `L.divIcon` per marker colorati
- Legenda overlay con `z-[1000]`
- Popup con dettagli al click

### Posizionamento

Il componente sara integrato in:
1. **InvestorZonesIndex.tsx** - Sezione mappa tra Quick Stats e griglia zone
2. Opzionale: toggle Lista/Mappa per visualizzazione alternativa

---

## Design marker colorati per rendimento

### Scala colori rendimento lordo

| Rendimento | Colore | Hex | Descrizione |
|------------|--------|-----|-------------|
| 6.5%+ | Verde scuro | `#16a34a` | Rendimento eccellente |
| 5.5-6.5% | Verde | `#22c55e` | Rendimento alto |
| 5-5.5% | Giallo | `#eab308` | Rendimento medio |
| < 5% | Arancione | `#f97316` | Rendimento basso |

### Marker design

```text
┌─────────────────┐
│   ●             │  Cerchio colorato (rendimento)
│   6.5%          │  Percentuale rendimento max
│   Cenisia       │  Nome quartiere
└─────────────────┘
```

Il marker sara un `divIcon` con:
- Cerchio 32-40px colorato per rendimento
- Percentuale rendimento max al centro
- Bordo bianco + ombra per contrasto
- Animazione scale al hover/selection

---

## Popup dettagli

Al click sul marker, popup con:

```text
┌──────────────────────────────────────┐
│  CENISIA                    [Centro] │
│  ────────────────────────────────────│
│  💰 €2.200/mq      📈 +4% (2024)     │
│  📊 6-7% lordo     🏠 4.4-5.1% netto │
│  ⏱️ 2-4 settimane  📍 Alta domanda   │
│  ────────────────────────────────────│
│  🏗️ Metro 2 in arrivo               │
│  ────────────────────────────────────│
│           [Vedi dettagli →]          │
└──────────────────────────────────────┘
```

---

## Componente principale

### File: `src/components/investor/InvestorZonesMap.tsx`

```text
Props:
- zones: InvestorZone[]
- lang: 'it' | 'en'
- onZoneClick?: (zone: InvestorZone) => void
- selectedZoneId?: string
- showYieldMode?: 'gross' | 'net' (default: 'gross')
```

### Funzionalita

1. **Visualizzazione tutti i quartieri** su mappa Torino
2. **Marker colorati** in base al rendimento
3. **Popup informativi** con metriche chiave
4. **Selezione zona** con evidenziazione marker
5. **Legenda interattiva** con filtri colore
6. **Link a pagina dettaglio** nel popup
7. **Responsive**: full-width su mobile, aspect-ratio su desktop

---

## Legenda

```text
┌─────────────────────────────┐
│  RENDIMENTO LORDO           │
│  ────────────────────────── │
│  ● 6.5%+    Eccellente      │
│  ● 5.5-6.5% Alto            │
│  ● 5-5.5%   Medio           │
│  ● < 5%     Basso           │
│  ────────────────────────── │
│  12 quartieri               │
│  ────────────────────────── │
│  🏗️ = Riqualificazione      │
└─────────────────────────────┘
```

---

## Integrazione in InvestorZonesIndex

### Opzione 1: Sezione mappa dedicata (consigliata)

Aggiungere nuova sezione tra Quick Stats e Filters:

```tsx
{/* Map Section */}
<section className="pb-12 md:pb-16">
  <div className="container px-6">
    <Card className="overflow-hidden border-border/20">
      <div className="p-4 border-b border-border/20 flex items-center justify-between">
        <h2 className="font-semibold flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          Mappa rendimenti
        </h2>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm">Lordo</Button>
          <Button variant="ghost" size="sm">Netto</Button>
        </div>
      </div>
      <InvestorZonesMap
        zones={investorZones}
        lang={lang}
        onZoneClick={(zone) => navigate(`${zonesPath}/${zone.slug}`)}
      />
    </Card>
  </div>
</section>
```

### Opzione 2: Toggle Lista/Mappa

Aggiungere toggle nei filtri per alternare tra vista griglia e vista mappa.

---

## File da creare/modificare

| File | Azione |
|------|--------|
| `src/components/investor/InvestorZonesMap.tsx` | NUOVO - Componente mappa |
| `src/pages/InvestorZonesIndex.tsx` | Integrare mappa nella pagina |

---

## Dettaglio tecnico: funzione colore rendimento

```typescript
const getYieldColor = (yieldMax: number): string => {
  if (yieldMax >= 6.5) return '#16a34a'; // green-600
  if (yieldMax >= 5.5) return '#22c55e'; // green-500
  if (yieldMax >= 5) return '#eab308';   // yellow-500
  return '#f97316';                       // orange-500
};

const getYieldLabel = (yieldMax: number, lang: 'it' | 'en'): string => {
  if (yieldMax >= 6.5) return lang === 'it' ? 'Eccellente' : 'Excellent';
  if (yieldMax >= 5.5) return lang === 'it' ? 'Alto' : 'High';
  if (yieldMax >= 5) return lang === 'it' ? 'Medio' : 'Medium';
  return lang === 'it' ? 'Basso' : 'Low';
};
```

---

## Dettaglio tecnico: marker custom

```typescript
const createZoneMarker = (zone: InvestorZone, isSelected: boolean): L.DivIcon => {
  const color = getYieldColor(zone.grossYield.max);
  const size = isSelected ? 44 : 36;
  const hasRenewal = zone.urbanRenewal.active;
  
  return L.divIcon({
    className: 'investor-zone-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: ${color};
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 11px;
        font-weight: 700;
        color: white;
        position: relative;
        ${isSelected ? 'transform: scale(1.15); z-index: 1000;' : ''}
      ">
        ${zone.grossYield.max}%
        ${hasRenewal ? '<span style="position:absolute;top:-4px;right:-4px;font-size:10px;">🏗️</span>' : ''}
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size/2, size/2],
    popupAnchor: [0, -size/2]
  });
};
```

---

## Traduzioni da aggiungere

```typescript
const texts = {
  it: {
    mapTitle: 'Mappa rendimenti',
    legend: 'Legenda rendimento',
    excellent: 'Eccellente',
    high: 'Alto',
    medium: 'Medio',
    low: 'Basso',
    viewDetails: 'Vedi dettagli',
    grossYield: 'Lordo',
    netYield: 'Netto',
    renewal: 'Riqualificazione',
    zones: 'quartieri'
  },
  en: {
    mapTitle: 'Yield map',
    legend: 'Yield legend',
    excellent: 'Excellent',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    viewDetails: 'View details',
    grossYield: 'Gross',
    netYield: 'Net',
    renewal: 'Urban renewal',
    zones: 'neighborhoods'
  }
};
```

---

## Risultato atteso

- Mappa interattiva con tutti i 12+ quartieri
- Colori marker immediatamente comprensibili (verde = alto rendimento)
- Popup informativi con metriche chiave
- Click per navigare alla pagina dettaglio
- Legenda chiara con scala colori
- Indicatore 🏗️ per zone con riqualificazione
- Responsive: scroll touch su mobile

---

## Considerazioni UX

1. **First impression**: la mappa offre una panoramica visiva immediata delle opportunita
2. **Colori intuitivi**: verde = buono, giallo = attenzione, arancione = da valutare
3. **Progressione**: mappa overview -> click popup -> pagina dettaglio
4. **Mobile-first**: mappa full-width, legenda compatta, popup adattivi
