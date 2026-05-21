---
name: anti-ai-prose-it-en
description: Use when writing or rewriting blog posts, landing copy, long-form articles, or marketing prose in Italian or English for Jungle Rent. Removes AI tells (em-dashes, "non X ma Y" / "it's not X it's Y" constructions, hedge phrases, double negatives) and enforces short active sentences. Trigger on any new .md under src/data/blog/content/ or significant copy edits.
---

# Anti-AI prose checklist (IT + EN)

Lovable's default output sounds AI-generated. The user (Lorenzo) actively hates this. Apply this skill every time you produce more than ~3 sentences of marketing/editorial prose.

## Hard rules

1. **Zero em-dash (—, U+2014) in body copy.** Replace with comma, colon, period, or parentheses.
   - En-dash (–, U+2013) **only** for numeric/temporal ranges: `9–13`, `giugno–agosto`, `2024–2026`.
   - Hyphen (-) for compound words: `out-of-town`, `breve-termine`.

2. **No "Non X, ma Y" / "It's not X, it's Y" constructions.** Rewrite affirmatively.
   - ❌ "Non è speculazione. È gestione attiva."
   - ✅ "È gestione attiva di un asset reale."
   - ❌ "It's not a quantity problem, it's a utilisation problem."
   - ✅ "The market has a utilisation problem, more than a quantity problem."

3. **No stacked negatives in sequence.** "non abitati, non affittati, non manutenuti" → "vuoti, sfitti, lasciati senza manutenzione".

4. **Ban hedge / filler phrases.** See `references/ai-tells-it.md` and `references/ai-tells-en.md` for full lists. Worst offenders:
   - IT: "in altre parole", "vale la pena notare", "è importante sottolineare", "in conclusione", "non solo… ma anche"
   - EN: "in other words", "it's worth noting", "it's important to note", "moreover", "furthermore", "delve into", "navigate the complexities", "in conclusion"

5. **Sentences ≤ 25 words on average.** Break long ones. Active voice.

## Workflow

Before delivering any prose >300 words:

1. Write the draft.
2. Run the lint script:
   ```bash
   bash .agents/skills/anti-ai-prose-it-en/scripts/lint-prose.sh <file.md>
   ```
   (or copy to /tmp first if running from sandbox)
3. Fix every flagged line. Zero em-dashes, zero "Non X, ma Y", zero hedge phrases.
4. Read the first and last paragraph out loud (mentally). If they sound like a corporate report, rewrite.

## Tone reference

Jungle Rent voice = direct, concrete, calmly confident. Italian: think *Internazionale* or *Il Post*, not press release. English: think *The Economist* short-form, not LinkedIn thought leadership.

Sentence case always (project Core rule).

## When NOT to apply

- Code comments, technical docs, JSON-LD strings.
- German copy (preserves Nominalstil / capitalization conventions).
- Direct quotes from third-party sources (preserve verbatim).

## References

- `references/ai-tells-it.md` — full IT pattern list + replacements
- `references/ai-tells-en.md` — full EN pattern list + replacements
- `scripts/lint-prose.sh` — grep-based linter
