

# Update study spaces content with PDF research data

The PDF contains comprehensive 2025-2026 research with corrections, new spaces, and content gaps. Three areas need updates:

## 1. Rewrite blog article (IT + EN)

The current article is a basic listing. The PDF provides rich data to transform it into the definitive resource:

**Corrections needed:**
- Biblioteca Nazionale hours: 8:15-19:55 (not 9:00-16:00)
- Biblioteca Bobbio: 850 seats at Campus Luigi Einaudi, Lungo Dora Siena 100/A (not "Via Sant'Ottavio")
- EDISU exam-session hours: 2:00 AM (currently noted but needs emphasis)
- BI.TO rebrand of civic libraries (Sept 2025)
- Feb 2026 municipal reorganization: 13 branches now open Saturday
- "Biblioteca Renzo Piano" does not exist (clarify in article)

**New sections from PDF:**
- Neighborhood-by-neighborhood breakdown (San Salvario, Vanchiglia, Centro, Crocetta, Aurora, Cenisia)
- Booking apps guide (Affluences vs Campus Piemonte vs TorinoFacile)
- WiFi guide (Eduroam vs FreeTorinoWiFi vs venue WiFi)
- Peak times and seat-finding strategy
- Copy shops near campuses
- Hidden gems (Polo del '900 free rooms, Open Foundation, Nodo Borgodora €5 formula, Variante Bunker)
- Sunday-only options section

**New spaces to add:**
- Combo Torino (€6 half day, €10 full, €16 with lunch)
- Variante Bunker (free, Mon-Fri 9-23, 40 seats, ARCI card)
- Bere in Tipografia / Studiare in Tipografia (Vanchiglia)
- Nora Book & Coffee (Via delle Orfane)
- OGR Social Table (25m communal table with USB)
- Nodo Borgodora (€5 coworking formula)
- Open Foundation (24 free bookable seats)
- EDISU Olimpia (Lungodora Siena 102/A)
- Tomato Backpackers coworking area (300-500 Mbps)

## 2. Add new spaces to `detailedStudySpaces.ts`

Add ~10 new spaces from the PDF with full structured data (hours, features, contact info).

## 3. Update posts.ts metadata

- Update title to reflect actual count (60+ spaces, not 18)
- Add 8 strong FAQs from the PDF (Sunday study, night study, booking apps, WiFi networks, exam session hours, no 24/7 spaces exist, summer hours, international students)
- Add SEO keywords targeting gap queries: "dove studiare torino notte", "aule studio torino domenica", "biblioteche torino agosto", "app prenotazione aule studio torino"
- Update date to 2026-03-15

## 4. Update tool page session text

Change exam session notice from "Dec 2025 - Feb 2026" to current/generic text.

## Files changed

| File | Action |
|------|--------|
| `src/data/blog/content/it/aule-studio-torino-guida-completa.md` | Major rewrite with PDF data |
| `src/data/blog/content/en/aule-studio-torino-guida-completa.md` | Major rewrite (EN translation) |
| `src/data/detailedStudySpaces.ts` | Add ~10 new spaces |
| `src/data/blog/posts.ts` | Update metadata, FAQs, SEO |
| `src/pages/StudySpacesDirectory.tsx` | Update session notice text |

Implementation will be split across 2-3 messages due to file sizes.

