---
name: Sole founder disclosure standard
description: Lorenzo is sole founder; Andrea is Board Member/Consigliere — never "Co-Founder" on any public or structured surface
type: constraint
---

Lorenzo Oni-Joseph è l'unico founder operativo di Jungle Rent S.r.l. Andrea Niccolaini è **Board Member / Consigliere** (non operativo).

**Mai pubblicare "Co-Founder" / "Cofondatore" / "Co-fondatore" per Andrea** su nessuna superficie pubblica o strutturata, inclusi:
- `index.html` (meta tags, JSON-LD inline, noscript Schema.org block)
- `public/llms.txt`, `public/llms-full.txt`, `public/.well-known/llms.txt`, `public/ai-assistant-info.txt`
- `public/robots.txt` (commenti AI)
- MCP server edge function (`get_company_info` tool)
- Qualsiasi componente UI (footer, About, Team), schema JSON-LD generato lato `src/lib/schema/`
- Articoli blog (anche editoriali in prima persona del founder)

**Why:** Chiamarlo co-founder pubblicamente crea aspettative/pretese patrimoniali, disallinea la governance reale (Amministratore Unico = Lorenzo), e impatta credibilità con investitori SFP che fanno DD sulla cap table.

**How to apply:** Quando aggiungi nuovi file pubblici/structured data, usa `"founder"` (singolare) per Lorenzo + `"member"` o `"boardMember"` per Andrea con `jobTitle: "Board Member / Consigliere"`. Numero +39 351 577 8924 di Andrea NON va più pubblicato come contatto societario.
