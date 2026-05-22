# Step 2 — Outbound distribution kit (Lingotto / Nizza Millefonti sellers)

Obiettivo: produrre tutti i materiali outbound che alimentano la landing `/vendi-casa/lingotto-nizza-millefonti` creata nello Step 1, così da iniziare a generare lead anche senza traffico SEO.

## Deliverable

### 1. Flyer A5 stampabili (PDF)
Generati via script Python (reportlab) e salvati in `/mnt/documents/`:

- **Flyer A — "Hai ereditato una casa a Lingotto?"**
  Target: eredi non residenti, appartamenti vuoti vie Nizza/Spotorno/Genova
  CTA: WhatsApp + QR verso `/vendi-casa/lingotto-nizza-millefonti?utm_source=flyer&utm_campaign=eredita`
- **Flyer B — "Ti trasferisci? Vendi in 60-90 giorni"**
  Target: proprietari in trasferimento lavoro, separazioni, downsizing
  CTA: WhatsApp + QR verso `?utm_campaign=trasferimento`
- **Flyer C — "Casa sfitta? Te la compriamo noi"**
  Target: proprietari di appartamenti sfitti da >6 mesi
  CTA: stessa landing, `?utm_campaign=sfitto`

Layout: A5 verticale, palette jungle (cream + green), sentence case, claim breve, 3 bullet di valore (0% commissioni, 60-90 giorni, rogito notarile), numero WhatsApp, QR code, footer Jungle Rent S.r.l. con P.IVA.

### 2. Lettera personalizzata cartacea (PDF + template editabile)
- Formato A4, fronte unico
- 4 varianti di apertura (eredità / trasferimento / sfitto / pensione)
- Tono umano, firma "Lorenzo Oni-Joseph, Amministratore Unico"
- CTA: WhatsApp + landing + telefono
- Salvata in `/mnt/documents/lettera-proprietari-lingotto.pdf` + `.docx` per editing manuale dei nomi

### 3. Copy ads (Markdown reference doc)
File `/mnt/documents/ads-copy-lingotto-nizza-millefonti.md` con:

- **Meta Ads (Facebook + Instagram)** — 3 varianti headline + 3 primary text + targeting (raggio 1.5 km Lingotto, età 45+, interessi: eredità, trasloco, pensione, immobili)
- **Google Ads Search** — 8 keyword bid (vendere casa lingotto, agenzia immobiliare lingotto torino, comprare casa contanti torino, ecc.) + 3 ad headline + 2 description + sitelink
- **Google Ads Performance Max asset group** — headline/description/immagini
- Budget suggerito: 15€/giorno Google + 10€/giorno Meta per 14 giorni di test
- UTM tagging convention coerente con la landing

### 4. Script outreach offline (Markdown)
File `/mnt/documents/outreach-script-lingotto.md`:

- Script telefonico per amministratori di condominio (5 condomini target su via Nizza/Spotorno)
- Script per notai della zona (offerta partner: segnaliamo clienti acquirenti, loro segnalano venditori)
- Email cold a 10 piccole agenzie immobiliari della zona per co-mediazione

### 5. Tracking CSV
`/mnt/documents/distribution-tracker.csv` con colonne: data, materiale, zona, quantità distribuita, lead generati, note. Da compilare manualmente da Lorenzo.

## Note operative

- Nessuna modifica al codice dell'app in questo step — solo asset esterni in `/mnt/documents/`.
- Tutti i QR code puntano a URL con UTM parametrizzati, già tracciati da `useLeadCapture` via `source`.
- Compliance: nessuna cifra di rendimento, nessuna data lancio specifica, sentence case, "Parla con Lorenzo" come CTA secondaria.
- Footer flyer/lettera: ragione sociale completa + P.IVA + indirizzo sede legale.

## Cosa NON è incluso (rimane Step 3)
- CRM automation (filtro pipeline seller Lingotto, drip email, WhatsApp priority ping)
- Weekly report automation

## Dettagli tecnici

- Reportlab per i PDF (A5 flyer + A4 lettera), font: Inter da Google Fonts scaricato in `/tmp/fonts/`
- QR code via libreria `qrcode` Python
- Logo Jungle Rent: riuso asset esistente in `public/`
- QA: pdftoppm + view di ogni pagina, controllo testo (no overflow, contrasto, P.IVA presente)

## Conferma richiesta

Procedo con tutti e 5 i deliverable insieme, oppure preferisci che generi prima solo i 3 flyer A5 per validare layout/tono e poi il resto?