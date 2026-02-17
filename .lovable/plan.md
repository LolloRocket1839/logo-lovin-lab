
# Simulatore offerta qualitativo con budget 130k

## Cosa cambia

Il simulatore attuale mostra range di prezzo numerici. Va trasformato in un tool qualitativo che dice solo "il tuo immobile ci interessa" o "contattaci per una valutazione personalizzata", senza mai mostrare cifre all'utente.

La logica interna: `prezzo = mq x prezzo_medio_zona x 0.70` (sconto 30%). Se il risultato e sotto 130k e i mq rientrano nel range della zona, l'immobile e "qualificato".

## Criteri interni per zona

| Zona | Prezzo medio/mq | Mq max accettati | Range mq nel form |
|------|----------------|-----------------|-------------------|
| Aurora | 1.520 | 120 | 35-120 |
| Lingotto | 1.650 | 110 | 35-110 |
| Santa Rita | 1.700 | 105 | 35-105 |
| Cenisia | 1.950 | 95 | 35-95 |
| Cit Turin | 2.501 | 75 | 35-75 |
| Campidoglio | 2.501 | 75 | 35-75 |
| San Salvario | 2.731 | 65 | 35-65 |
| Vanchiglia | 2.680 | 70 | 35-70 |
| Crocetta | 2.995 | 60 | 35-60 |
| Zona ospedali | 1.975 | 90 | 35-90 |

## Output visibile all'utente

**Qualificato (verde):**
"Il tuo immobile rientra nei nostri criteri di acquisto. Ti contattiamo entro 48 ore con un'offerta concreta."
- CTA: "Richiedi offerta" + WhatsApp

**Non qualificato (giallo):**
"Al momento il tuo immobile non rientra nei parametri standard, ma ogni caso e diverso. Contattaci per una valutazione personalizzata."
- CTA: "Contattaci comunque" + WhatsApp

L'utente non vede mai numeri. Il prezzo calcolato viene inviato internamente via Formspree per il team.

## Dettagli tecnici

### File da modificare

**`src/components/tools/QuickOfferSimulator.tsx`**
- Rimuovere `CONDITION_DISCOUNTS`, `MARKET_HAIRCUT`, `formatCurrency` (non serve piu mostrare prezzi)
- Aggiungere costante `MAX_BUDGET = 130_000` e mappa `ZONE_MAX_SQM` con il range mq massimo per zona
- La logica diventa: `qualificato = (mq * avgPrice * 0.70 <= 130000) AND (mq <= zoneMaxSqm)`
- Rimuovere il rendering numerico del range prezzo
- Due stati UI: qualificato (verde con CheckCircle) e non qualificato (giallo con Info)
- Il form Formspree continua a inviare il prezzo calcolato internamente (il team lo vede, l'utente no)
- Aggiungere "zona_ospedali" nel dropdown delle zone target

**`src/data/turinZonePrices.ts`**
- Aggiungere la zona `zona_ospedali` con nome "Zona ospedali (Molinette/Carducci)", avgPrice 1975, category "semicentral"

**`src/i18n/locales/it.json`**
- Cambiare `offerSimulator.title` in "Il tuo immobile ci interessa?"
- Cambiare `offerSimulator.subtitle` in "Scoprilo in 30 secondi"
- Aggiungere: `offerSimulator.qualifiedTitle` ("Ottima notizia!"), `offerSimulator.qualifiedDescription` ("Il tuo immobile rientra nei nostri criteri di acquisto. Ti contattiamo entro 48 ore con un'offerta concreta."), `offerSimulator.notQualifiedTitle` ("Valutazione personalizzata"), `offerSimulator.notQualifiedDescription` ("Al momento il tuo immobile non rientra nei parametri standard, ma ogni caso e diverso. Contattaci per una valutazione personalizzata.")
- Aggiornare `offerSimulator.emailGateTitle` in "Inserisci la tua email per scoprire se il tuo immobile ci interessa"
- Rimuovere chiavi non piu usate: `resultDescription`

**`src/i18n/locales/en.json`**
- Stesse modifiche tradotte in inglese

### Cosa NON cambia
- `src/pages/Sellers.tsx` (il componente e gia integrato)
- `src/components/dialogs/QuickSellerLeadDialog.tsx`
- `src/components/tools/PropertyValuator.tsx`
