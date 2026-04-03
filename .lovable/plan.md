

# Add Regione Piemonte Funding Acknowledgment

The email from the Region requires displaying the Regione Piemonte logo and funding acknowledgment on the website (Misura 8 and Misura 9, PR FSE+ 2021-2027).

## Changes

### 1. Copy the Regione Piemonte logo
- Copy `user-uploads://logoj.jpg` to `src/assets/regione-piemonte-logo.jpg`

### 2. Update `src/components/layout/Footer.tsx`
- Add a new section before the legal info block (line ~299) with:
  - Regione Piemonte logo (linked to `https://www.regione.piemonte.it`)
  - Funding acknowledgment text: *"Realizzato con il finanziamento del Fondo Sociale Europeo Plus — PR FSE+ 2021-2027, Misura 8 e Misura 9"*
  - Styled consistently with the existing footer (muted, small text, centered)

### 3. Update `src/components/layout/MobileFooter.tsx`
- Add the same Regione Piemonte logo and funding text to the mobile footer for consistency

No database or backend changes needed — this is a purely visual/compliance addition.

