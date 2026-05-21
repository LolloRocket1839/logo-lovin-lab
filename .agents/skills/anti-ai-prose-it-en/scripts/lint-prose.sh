#!/usr/bin/env bash
# Lint markdown/text prose for AI tells. Exit non-zero if any violations found.
# Usage: bash lint-prose.sh <file1.md> [file2.md ...]

set -u

if [ $# -eq 0 ]; then
  echo "Usage: $0 <file.md> [more files...]" >&2
  exit 2
fi

violations=0
files_checked=0

for file in "$@"; do
  if [ ! -f "$file" ]; then
    echo "skip (not found): $file" >&2
    continue
  fi
  files_checked=$((files_checked + 1))
  echo "── $file"

  # 1. em-dash (—, U+2014)
  if grep -n "—" "$file" > /dev/null; then
    count=$(grep -c "—" "$file")
    echo "  ✗ em-dash (—) found: $count occurrence(s)"
    grep -n "—" "$file" | head -5 | sed 's/^/    /'
    violations=$((violations + count))
  fi

  # 2. "Non X, ma Y" / "It's not X, it's Y" constructions
  patterns_neg=(
    "Non è [a-zA-Zàèéìòù]\+\.\? È "
    "non solo .* ma anche"
    "[Ii]t'\?s not [a-z]\+.*[Ii]t'\?s "
    "[Nn]ot just .* but "
    "[Nn]ot only .* but also"
  )
  for p in "${patterns_neg[@]}"; do
    if grep -nE "$p" "$file" > /dev/null 2>&1; then
      hits=$(grep -cE "$p" "$file")
      echo "  ✗ 'Not X, but Y' pattern: /$p/ ($hits hit(s))"
      grep -nE "$p" "$file" | head -3 | sed 's/^/    /'
      violations=$((violations + hits))
    fi
  done

  # 3. Hedge / filler (IT + EN)
  hedges=(
    "[Ii]n altre parole"
    "[Vv]ale la pena (notare|sottolineare|ricordare)"
    "[Èè] importante sottolineare"
    "[Vv]a detto che"
    "[Ii]n conclusione"
    "[Ii]n sintesi"
    "[Pp]er così dire"
    "[Ii]n un certo senso"
    "[Cc]ome accennato"
    "[Ii]n other words"
    "[Ii]t'\?s worth noting"
    "[Ii]t'\?s important to note"
    "[Tt]hat said,"
    "[Nn]eedless to say"
    "[Ii]n conclusion"
    "[Tt]o sum up"
    "[Aa]t the end of the day"
    "[Ii]t goes without saying"
    "[Ii]n today'\?s (world|fast-paced)"
    "delve into"
    "leverage"
    "seamless"
    "cutting-edge"
    "game-changing"
    "revolutionize"
    "synergies"
  )
  for h in "${hedges[@]}"; do
    if grep -nE "$h" "$file" > /dev/null 2>&1; then
      hits=$(grep -cE "$h" "$file")
      echo "  ✗ hedge/AI-vocab: /$h/ ($hits hit(s))"
      grep -nE "$h" "$file" | head -2 | sed 's/^/    /'
      violations=$((violations + hits))
    fi
  done

  # 4. Paragraph openers
  openers=(
    "^[Ii]noltre,"
    "^[Tt]uttavia,"
    "^[Pp]ertanto,"
    "^[Dd]i conseguenza,"
    "^[Mm]oreover,"
    "^[Ff]urthermore,"
    "^[Aa]dditionally,"
    "^[Cc]onsequently,"
    "^[Tt]hus,"
    "^[Ii]ndeed,"
  )
  for o in "${openers[@]}"; do
    if grep -nE "$o" "$file" > /dev/null 2>&1; then
      hits=$(grep -cE "$o" "$file")
      echo "  ✗ AI-style opener: /$o/ ($hits hit(s))"
      violations=$((violations + hits))
    fi
  done
done

echo ""
echo "═══════════════════════════════════════════"
echo "Files checked: $files_checked"
echo "Total violations: $violations"
echo "═══════════════════════════════════════════"

if [ "$violations" -gt 0 ]; then
  echo ""
  echo "Fix all violations before delivering. See:"
  echo "  .agents/skills/anti-ai-prose-it-en/references/ai-tells-it.md"
  echo "  .agents/skills/anti-ai-prose-it-en/references/ai-tells-en.md"
  exit 1
fi

echo "✓ Clean."
exit 0
