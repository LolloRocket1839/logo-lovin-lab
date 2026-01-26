
# Piano: Allineamento traduzioni tedesco (DE) e spagnolo (ES)

## Panoramica

Aggiornerò i file `de.json` e `es.json` aggiungendo tutte le chiavi mancanti rispetto al file di riferimento italiano (`it.json`), concentrandomi sulle sezioni critiche richieste.

---

## Analisi chiavi mancanti

### Sezioni da completare in DE e ES:

| Sezione | Stato DE | Stato ES | Chiavi mancanti |
|---------|----------|----------|-----------------|
| `about.cycle` | ❌ Mancante | ❌ Mancante | 11 chiavi (step1Title, step2Title, etc.) |
| `about.service*` | ❌ Mancante | ❌ Mancante | 8 chiavi (service1-4 Title/Desc) |
| `about.whyChoose*` | ❌ Mancante | ❌ Mancante | 6 chiavi |
| `hero.miniFaq` | Parziale | Parziale | 6 chiavi complete |
| `hero.miniSteps` | ❌ Mancante | ❌ Mancante | 2 chiavi |
| `hero.flowStep*` | ❌ Mancante | ❌ Mancante | 4 chiavi |
| `studentSearch` validazione | ❌ Mancante | ❌ Mancante | ~20 chiavi (error messages) |
| `studentSearch` opzioni | ❌ Mancante | ❌ Mancante | ~25 chiavi (roommatesOptions, areaOptions, etc.) |
| `benefits` completo | Parziale | Parziale | ~15 chiavi (tooltips, how points) |
| `investor` completo | Parziale | Parziale | ~25 chiavi (testimonials, marketStats, flowSteps) |
| `student` completo | Parziale | Parziale | ~30 chiavi (whyJungle, comparison) |
| `faq` completo | Parziale | Parziale | ~50 chiavi (Q4-Q11, student FAQs, voice FAQs) |
| `propertyValuation` | ❌ Mancante | ❌ Mancante | ~25 chiavi intero modulo |
| `propertyValuator` | ❌ Mancante | ❌ Mancante | ~35 chiavi |

---

## Implementazione

### File da modificare:
1. **`src/i18n/locales/de.json`** - Aggiunta ~200+ chiavi
2. **`src/i18n/locales/es.json`** - Aggiunta ~200+ chiavi

### Sezioni che aggiungerò:

#### 1. About - Ciclo del modello
```
about.cycle.title
about.cycle.subtitle
about.cycle.stepLabel
about.cycle.step1Title/Desc
about.cycle.step2Title/Desc
about.cycle.step3Title/Desc
about.cycle.step4Title/Desc
about.cycle.reinvest
about.service1-4 Title/Desc
about.whyChooseTitle
about.whyPoint1-5
```

#### 2. Hero - Mini FAQ e Flow Steps
```
hero.miniSteps.step1/step2
hero.flowStep1-4
hero.invest
hero.launchCountdown
hero.days/hours/minutes/seconds
hero.earlyBirdPerk
hero.studentTitle/investorTitle/Subtitle
hero.subheadline
hero.questionnaire/quizCta/quizSubtitle
hero.availableRooms
hero.trustSafe/trustSupport/trustNoFees
hero.seoH1
hero.smartRentals/investmentOpportunities
```

#### 3. StudentSearch - Validazione completa
```
nameErrorMin/Max/Format
emailErrorRequired/Invalid/Max
whatYouLookingForErrorMin/Max
roommatesLabel/Placeholder + Options (5)
areaLabel/Placeholder + Options (8)
studyLabel/Placeholder/Error
budgetLabel/Placeholder + Ranges (4)
moveDateLabel/Placeholder + Dates (3)
customMoveDate*
consentLabel/Error
resourcesTitle/Desc/Link
draftFound*/loadDraft/draftLoaded*
```

#### 4. Benefits - Completo
```
whyJungleRent
sectionTitle/Subtitle
savingsHighlight/How1/How2/Tooltip
investmentHighlight/How1/How2/Tooltip
locationHighlight/How1/How2/Tooltip
qualityHighlight/How1/How2/Tooltip
studentCta/investorCta
```

#### 5. Investor - Completo
```
flowStep1-3 + Sub
waitlistTitle/Subtitle/Cta
priorityResponse
feature1-3
activeInvestors
talkToAdvisor/scheduleCall
incubatorTooltip
marketStats (5 chiavi)
testimonials (4 chiavi)
```

#### 6. Student - Completo
```
marketProof* (3 chiavi)
sectionSubtitle
benefit1-2 Title/Desc/Tooltip
feature1-3
separator
whyJungle.* (~20 chiavi)
comparison.* (~10 chiavi)
```

#### 7. FAQ - Completo
```
studentCategory + studentQ1-5/A1-5
voiceCategory + voiceQ1-15/A1-15
investorQ4-11/A4-11
sellerQ3-7/A3-7
aboutQ3/A3
```

#### 8. PropertyValuation - Intero modulo
```
meta.title/description
breadcrumb, badge, title, subtitle
feature1-3
sources.title/description
structuredData.name/description
```

#### 9. PropertyValuator - Intero modulo
```
location, zone, selectZone
characteristics, surface, hasElevator
floor, condition
energySection, energyClass, heating
extrasSection, balcony, garage, exposure
premiums, penalties, reset
result, basePrice, pricePerSqm
coefficients, reliability, clampedWarning
showBreakdown, noCoefficients
variation2024, ctaProfessional, ctaSavings
emptyState, disclaimer
```

---

## Note tecniche

- Le traduzioni rispetteranno lo stile esistente nei file DE/ES
- I placeholder `{{count}}`, `{{query}}` saranno mantenuti
- Sentence case applicato per DE/ES dove appropriato
- Traduzione professionale (non letterale) per adattare il tono al mercato locale
