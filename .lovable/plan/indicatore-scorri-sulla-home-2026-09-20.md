# Indicatore “Scorri” sulla home

## Modifica
- Aggiungere nella prima scena, in basso, una freccia con testo “Scorri” in italiano e “Scroll” in inglese.
- Renderlo discreto ma ben leggibile, coerente con la palette e la tipografia esistenti.
- Rendere l’indicatore cliccabile: al tocco o click avanza dolcemente verso la seconda scena.
- Nasconderlo con una dissolvenza non appena l’utente inizia a scorrere, così non interferisce con le scene successive.
- Usare un movimento verticale minimo della freccia; con “riduci movimento” attivo resterà ferma e userà solo la dissolvenza.

## Vincoli
- La barra di scorrimento resta nascosta solo sulla home.
- Nessun redesign e nessuna modifica a testi, layout, palette, cinque scene, navigazione o BottomNav.

## Verifica
- Controllare click/tocco, rotella e swipe su desktop e mobile in italiano e inglese.
- Confermare che l’indicatore scompaia dopo il primo avanzamento e che la BottomNav resti fissa.
- Eseguire typecheck e build.
