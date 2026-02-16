

## Remove standalone PDF and keep content within the article

The PDF content is already fully integrated into both the Italian and English blog articles. The only change needed is to remove the "downloadable resources" sections that link to the PDF, since all information is already in the article body.

### Changes

**1. Italian article** (`src/data/blog/content/it/carnevale-ivrea-battaglia-arance-2026.md`)
- Remove lines 394-400 (the "Risorse scaricabili" section with the PDF download link)

**2. English article** (`src/data/blog/content/en/carnevale-ivrea-battaglia-arance-2026.md`)
- Remove lines 324-328 (the "Downloadable resources" section with the PDF download link)

**3. Delete the PDF file**
- Remove `public/resources/Carnevale_Ivrea_Guida_Completa.pdf` since it is no longer referenced anywhere

No content needs to be added to the articles as the PDF information is already present in both versions.

