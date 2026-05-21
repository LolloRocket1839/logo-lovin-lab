## Problem

In the "Il problema: ricchezza congelata" section, the markdown is:

```
si stima che **circa il 27% del patrimonio immobiliare italiano sia vuoto o sottoutilizzato**. Appartamenti…
```

On narrow viewports the bold green span wraps to fill the line, and the trailing period `.` (outside the `**`) gets pushed to the next line on its own, followed by a space and "Appartamenti". Result: an orphan dot at the start of a new line — visually broken.

Same pattern exists in the EN version and likely in other paragraphs across the article where punctuation sits immediately after a closing `**`.

## Fix

Pull the terminal punctuation inside the bold span so the period travels with the last word and cannot be separated by a line break. This is a pure content fix in the two markdown files — no component/CSS changes.

### IT file — `src/data/blog/content/it/real-life-monopoly-passaggio-generazionale-immobiliare-2026.md`

Change:
- `**circa il 27% del patrimonio immobiliare italiano sia vuoto o sottoutilizzato**.` → `**circa il 27% del patrimonio immobiliare italiano sia vuoto o sottoutilizzato.**`

Audit the rest of the file for the same `**…**[.,;:]` pattern at end of sentence on long bold spans and apply the same fix where the bold runs long enough to wrap (e.g. the "35% … 15%" line, "più del 60% di questo valore sarà immobiliare", "entro il 2045 …", "Il mercato ha un problema di utilizzo, più che di quantità di case.", "acquista appartamenti sottoutilizzati … li rimette a reddito", "riqualificati e rimessi in funzione", "gestione attiva di un asset reale", "capacità di selezionare il singolo immobile giusto").

### EN file — `src/data/blog/content/en/real-life-monopoly-passaggio-generazionale-immobiliare-2026.md`

Mirror the same edits on equivalent bold spans (e.g. `…27% of Italian real estate stock is empty or underused**.` → `…underused.**`, plus the parallel bold runs).

## Why not a CSS fix

`text-wrap: pretty` / `nowrap` on the bold span would either fail (the break happens between the bold and the dot, which are separate inline boxes) or force the entire long bold phrase onto one line, breaking the editorial column. Moving the punctuation inside the emphasis is the standard typographic fix and is also better for screen readers.

## Out of scope

- No changes to `AnimatedBlogContent`, `BlogPost`, or `index.css`.
- No changes to other articles in this pass — if you want, I can sweep the whole `content/{it,en}` folder for the same pattern in a follow-up.
