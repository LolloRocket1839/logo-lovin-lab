
## Piano: miglioramento articolo marzo 2026 Torino

### Panoramica
Il PDF fornisce informazioni molto più dettagliate rispetto agli articoli esistenti. L'obiettivo è integrare tutti i nuovi dati (telefoni, email, prezzi biglietti, orari, indirizzi completi) mantenendo uno stile naturale e conversazionale, rispettando rigorosamente il **sentence case** in italiano e in inglese.

---

### Nuove informazioni dal PDF da integrare

**1. Chiharu Shiota al MAO**
- Indirizzo: Via San Domenico 11, Torino (Palazzo Santo Stefano)
- Telefono: +39 011 4436927
- Email: info@maotorino.it
- Biglietti: Intero €10, Ridotto €7 (under 26, over 65, studenti), Gratuito under 14
- Orari: Mar-Dom 10:00-18:00, giovedì fino alle 20:00
- Visite guidate: domenica ore 15:00 (prenotazione consigliata)
- Opere principali: "The Key in the Hand", "In Silence", "The Corridor", "Accumulation"

**2. Mostra Futurismo ai Musei Reali**
- Indirizzo: Piazza Castello 191, Torino
- Telefono: +39 011 5611696
- Email: info.museireali@beniculturali.it
- Biglietti: Intero €12, Ridotto €8 (18-25 anni, over 65), Gratuito under 18
- Orari: Lun 14:00-19:00, Mar-Dom 08:30-19:00
- Sezioni: Futurismo Classico, Aeropainting, Ceramica e Scultura, Fotografia d'Epoca

**3. Mika in concerto**
- Luogo: Inalpi Arena (non OGR come nell'articolo attuale)
- Indirizzo: Corso Sebastopoli 123, Torino
- Telefono: +39 011 6503000
- Biglietti: €35-65 (a seconda della zona)
- Orario: 21:00 (porte 20:00)
- Piattaforme: ticketmaster.it, vivaticket.com

**4. Renato Zero**
- Date confermate: 7 e 8 marzo 2026
- Luogo: Teatro Regio (non Inalpi Arena come in precedenza)
- Indirizzo: Piazza Castello 215, Torino
- Telefono: +39 011 8815241
- Email: info@teatroregio.torino.it
- Biglietti: €45-85

**5. Subsonica 30 anni**
- Date: 31 marzo, 1, 3 e 4 aprile 2026
- Luogo: Inalpi Arena, Corso Sebastopoli 123
- Telefono: +39 011 6503000
- Biglietti: €40-70

**6. Rocky Musical - Teatro Alfieri**
- Date: 26-29 marzo 2026
- Indirizzo: Piazza Solferino 1, Torino
- Telefono: +39 011 562 3800
- Email: info@fdfgestioniattivitateatrali.com
- Biglietti: €35-65

**7. Amadeus al Teatro Carignano**
- Date: 1-8 marzo 2026
- Indirizzo: Piazza Carignano 6, Torino
- Telefono: +39 011 5169111
- Calendario dettagliato con orari specifici per giorno
- Sito: teatrostabiletorino.it

**8. Fotografia Contemporanea alla GAM**
- Indirizzo: Via Magenta 31, Torino
- Telefono: +39 011 5629911
- Biglietti: €8, Ridotto €5
- Orari: Mar-Dom 10:00-18:00

**9. Design e Sostenibilità - Palazzo Bricherasio**
- Indirizzo: Via Accademia Albertina 8, Torino
- Telefono: +39 011 546975
- Biglietti: €10, Ridotto €7
- Orari: Lun-Dom 10:00-19:00

**10. Nuove sezioni da aggiungere**
- **Festa della Donna (8 marzo)**: eventi, conferenze, spettacoli
- **Attività outdoor**: Parco del Valentino, cicloturismo lungo il Po (50 km)
- **Trasporti GTT**: abbonamenti giornaliero €5,50, 2 giorni €8,50, settimanale €14
- **Ristorazione primaverile**: specialità stagionali, ristoranti consigliati
- **Numeri emergenza**: 112, Carabinieri, Vigili del Fuoco

---

### Struttura modifiche

#### File 1: `src/data/blog/content/it/eventi-torino-marzo-2026.md`
- Espandere significativamente l'articolo da ~100 righe a ~350 righe
- Aggiungere tutte le info pratiche (telefoni, email, prezzi, orari)
- Aggiungere nuove sezioni: mostre minori, attività outdoor, trasporti, ristorazione
- Mantenere sentence case rigoroso in tutti i titoli

#### File 2: `src/data/blog/content/en/eventi-torino-marzo-2026.md`
- Stesso aggiornamento con traduzioni appropriate
- Sentence case per inglese (solo prima lettera maiuscola + nomi propri)
- Correggere headings attuali che violano sentence case (es. "The Great Exhibitions: Between East and Italian Seicento" → "The great exhibitions: between east and Italian Seicento")

#### File 3: `src/data/blog/posts.ts`
- Aggiornare titoli per sentence case
- Espandere da 3 a 10 FAQs per voce (IT e EN)
- Aggiornare keywords SEO con nuovi termini
- Aggiornare excerpt con più dettagli

---

### Correzioni sentence case necessarie

**Articolo italiano (attuale già corretto)**:
- ✅ "Marzo 2026 a Torino: arte, musica e spettacolo"
- ✅ "Le grandi mostre"
- ✅ "I concerti"

**Articolo inglese (da correggere)**:
| Attuale | Corretto |
|---------|----------|
| "The Great Exhibitions: Between East and Italian Seicento" | "The great exhibitions" |
| "Other Ongoing Exhibitions" | "Other ongoing exhibitions" |
| "Concerts: From Pop Stars to Sound Installations" | "Concerts" |
| "Musical Theater: Major Productions and Comedy Shows" | "Musical theater" |
| "Conferences, Talk Shows and Intellectual Encounters" | "Conferences and talks" |
| "How to Navigate Among So Many Events" | "How to navigate among events" |
| "Related Articles" | "Related articles" |

**posts.ts (da correggere)**:
| Attuale | Corretto |
|---------|----------|
| "Events in Turin March 2026" | "Events in Turin March 2026" (già corretto) |

---

### FAQs migliorate (10 per lingua)

**Italiano:**
1. Quali sono le mostre principali a Torino a marzo 2026?
2. Quanto costano i biglietti per la mostra di Chiharu Shiota al MAO?
3. Quando si esibisce Renato Zero a Torino?
4. Dove si tengono i concerti dei Subsonica per il trentennale?
5. Quanto costa Rocky il Musical al Teatro Alfieri?
6. Come posso prenotare i biglietti per Amadeus al Teatro Carignano?
7. Quali eventi ci sono per la Festa della Donna a Torino?
8. Come muoversi a Torino a marzo con i mezzi pubblici?
9. Quali sono i ristoranti consigliati per la cucina primaverile piemontese?
10. Qual è il numero di telefono del MAO per informazioni?

**Inglese:**
1. What are the main exhibitions in Turin in March 2026?
2. How much are tickets for the Chiharu Shiota exhibition at MAO?
3. When does Renato Zero perform in Turin?
4. Where are the Subsonica 30th anniversary concerts held?
5. How much does Rocky the Musical cost at Teatro Alfieri?
6. How can I book tickets for Amadeus at Teatro Carignano?
7. What events are there for International Women's Day in Turin?
8. How to get around Turin in March with public transport?
9. What restaurants are recommended for Piedmontese spring cuisine?
10. What is the MAO phone number for information?

---

### Checklist sentence case finale

Verifica che tutti i titoli seguano:
- ✅ IT: "Marzo 2026 a Torino: arte, musica e rinascita primaverile"
- ✅ IT: "Le grandi mostre di marzo"
- ✅ IT: "Attività all'aperto e cicloturismo"
- ✅ EN: "March 2026 in Turin: art, music and spring renewal"
- ✅ EN: "The great exhibitions of March"
- ✅ EN: "Outdoor activities and cycling"
- ✅ Nomi propri maiuscoli: MAO, Mika, Subsonica, Teatro Regio, Chiharu Shiota, Renato Zero
