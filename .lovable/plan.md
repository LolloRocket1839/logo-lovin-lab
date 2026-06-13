# Erase Andrea Niccolaini from Jungle Rent

Andrea is no longer associated with the company. Remove every mention — Lorenzo is the sole person named in governance going forward.

## 1. HTML metadata (`index.html`)
- Delete the `<meta name="company.board" ...>` Andrea tag (line 55).
- Rewrite the `ai-assistant-context` meta (line 87) to drop the "Board member (non-shareholder): Andrea Niccolaini" sentence.
- Remove the "Board Member: Andrea Niccolaini …" lines from the ASCII governance block (line 188) and from the visible `<dt>/<dd>` governance block (lines 293–294).

## 2. AI / agent discovery files
- `public/llms.txt` — remove the "Do not describe Andrea…" disclaimer line and the Andrea row from the people table.
- `public/llms-full.txt` — remove the Andrea sentence from "Founder & ownership" bullet, remove the Andrea bullet from the people list, remove `"boardMembers": [...]` array from the embedded JSON-LD (or set to `[]`).
- `public/.well-known/llms.txt` — remove the disclaimer line and the Andrea row from the table.
- `public/ai-assistant-info.txt` — remove the numbered Andrea line.
- `public/robots.txt` — remove the Andrea comment line.

After edits, frame governance simply as: "Lorenzo Oni-Joseph — sole founder, sole shareholder, Amministratore Unico." No board, no Consigliere, no second person.

## 3. Blog content
Two articles mention Andrea narratively:
- `src/data/blog/content/it/jungle-control-dicembre-2025.md` (line 36)
- `src/data/blog/content/en/jungle-control-december-2025.md` (line 36)

Rewrite the sentence to a neutral first-person reflection that doesn't name anyone, e.g. IT: "Ne ho parlato con qualcuno di fiducia. E da lì non sono più riuscito a distogliere la testa…" / EN equivalent. Keep the rest of the paragraph intact.

## 4. Project memory
- `mem://index.md` Core — rewrite the "Founder & Identity" line: drop the Andrea sentence entirely. New text: *"Lorenzo Oni-Joseph è unico founder + unico socio/quotista (sole shareholder) + Amministratore Unico. Nessun altro nome compare in governance, board o team-of-founders. Dual mission: solve student housing crisis + democratize real estate."*
- Replace `mem://compliance/sole-founder-disclosure` with a single-rule constraint memory: *"Lorenzo is the only person named in any governance / founder / shareholder / board context. Andrea Niccolaini is no longer associated with Jungle Rent — never mention him in copy, metadata, JSON-LD, blog content, or AI-discovery files. Why: he exited the company."* Update the index entry label accordingly (e.g. "Sole Founder — no other names").

## 5. Verification
After edits, re-run:
```
rg -n -i "niccolaini|andrea|consigliere|board.member" public/ src/ index.html
```
Expected output: zero hits (or only false-positives in unrelated data files like `studySpaces.ts` / `turin-stradario.ts` where "Andrea" is a street/place name — leave those untouched).

## Out of scope
- No design, layout, JSON-LD schema-type, or routing changes.
- No edits to data files where "Andrea" refers to streets, saints, or venues (Sant'Andrea, Via Andrea Doria, etc.).
- No public announcement / changelog entry — silent removal.
