import "jsr:@supabase/functions-js/edge-runtime.d.ts";
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};
import { z } from "https://deno.land/x/zod@v3.22.4/mod.ts";

const BodySchema = z.object({
  contractType: z.enum(["4+4", "3+2", "transitorio", "studenti"]),
  address: z.string().max(500).default(""),
  zoneName: z.string().max(200).default(""),
  walkableSqm: z.number().min(0).max(10000),
  conventionalSqm: z.number().min(0).max(10000),
  energyClass: z.string().max(5),
  yearBuilt: z.string().max(10).default(""),
  renovationYear: z.string().max(10).default(""),
  isFurnished: z.boolean(),
  furnitureValue: z.number().min(0).default(0),
  selectedFeatures: z.array(z.string()).max(22),
  chosenRent: z.number().min(0).max(100000),
  useCedolareSecca: z.boolean(),
  cedolareSeccaRate: z.number().min(0).max(100),
  landlordName: z.string().min(1).max(200),
  landlordCF: z.string().max(20).default(""),
  landlordAddress: z.string().max(500).default(""),
  tenantName: z.string().min(1).max(200),
  tenantCF: z.string().max(20).default(""),
  tenantUniversity: z.string().max(200).default(""),
  startDate: z.string().max(20).default(""),
  depositMonths: z.number().min(0).max(6).default(2),
  contractDuration: z.string().max(50).default(""),
  lang: z.enum(["it", "en"]).default("it"),
});

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "___________";
  try {
    const d = new Date(dateStr);
    return d.toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
  } catch {
    return dateStr;
  }
}

function getEndDate(startDate: string, contractType: string): string {
  if (!startDate) return "___________";
  try {
    const d = new Date(startDate);
    switch (contractType) {
      case "4+4": d.setFullYear(d.getFullYear() + 4); break;
      case "3+2": d.setFullYear(d.getFullYear() + 3); break;
      case "transitorio": d.setMonth(d.getMonth() + 18); break;
      case "studenti": d.setMonth(d.getMonth() + 12); break;
    }
    return d.toLocaleDateString("it-IT", { day: "2-digit", month: "long", year: "numeric" });
  } catch {
    return "___________";
  }
}

function getContractTitle(contractType: string): string {
  switch (contractType) {
    case "4+4": return "CONTRATTO DI LOCAZIONE AD USO ABITATIVO\n(Art. 2, comma 1, Legge 9 dicembre 1998, n. 431)";
    case "3+2": return "CONTRATTO DI LOCAZIONE AD USO ABITATIVO\nA CANONE CONCORDATO\n(Art. 2, comma 3, Legge 9 dicembre 1998, n. 431\nD.M. 16 gennaio 2017)";
    case "transitorio": return "CONTRATTO DI LOCAZIONE DI NATURA TRANSITORIA\n(Art. 5, comma 1, Legge 9 dicembre 1998, n. 431\nD.M. 16 gennaio 2017)";
    case "studenti": return "CONTRATTO DI LOCAZIONE PER STUDENTI UNIVERSITARI\n(Art. 5, comma 2 e 3, Legge 9 dicembre 1998, n. 431\nD.M. 16 gennaio 2017)";
    default: return "CONTRATTO DI LOCAZIONE";
  }
}

function generateContractHtml(data: z.infer<typeof BodySchema>): string {
  const d = data;
  const deposit = d.chosenRent * d.depositMonths;
  const annualRent = d.chosenRent * 12;
  const startFormatted = formatDate(d.startDate);
  const endFormatted = getEndDate(d.startDate, d.contractType);
  const title = getContractTitle(d.contractType);
  const isConcordato = d.contractType !== "4+4";

  return `<!DOCTYPE html>
<html lang="it">
<head>
<meta charset="UTF-8">
<title>Contratto di Locazione</title>
<style>
  @page { size: A4; margin: 25mm 20mm 25mm 20mm; }
  body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.6; color: #000; max-width: 170mm; margin: 0 auto; }
  h1 { text-align: center; font-size: 14pt; font-weight: bold; margin: 30pt 0 20pt; white-space: pre-line; }
  h2 { font-size: 12pt; font-weight: bold; margin: 18pt 0 8pt; text-transform: uppercase; }
  .article { margin: 12pt 0; text-align: justify; }
  .article-title { font-weight: bold; margin-bottom: 4pt; }
  .parties { margin: 16pt 0; }
  .party { margin: 8pt 0 8pt 20pt; }
  .signature-block { margin-top: 60pt; display: flex; justify-content: space-between; }
  .signature { width: 45%; text-align: center; border-top: 1px solid #000; padding-top: 6pt; margin-top: 40pt; }
  .footer { margin-top: 40pt; font-size: 9pt; color: #666; text-align: center; border-top: 1px solid #ccc; padding-top: 8pt; }
  .highlight { background: #ffffcc; padding: 2px 4px; }
  table.summary { width: 100%; border-collapse: collapse; margin: 12pt 0; }
  table.summary td { padding: 4pt 8pt; border: 1px solid #ccc; font-size: 11pt; }
  table.summary td:first-child { font-weight: bold; width: 40%; background: #f9f9f9; }
</style>
</head>
<body>

<h1>${escapeHtml(title)}</h1>

<div class="parties">
<p><strong>TRA</strong></p>
<div class="party">
<strong>${escapeHtml(d.landlordName)}</strong>, C.F. ${escapeHtml(d.landlordCF || "________________")},
residente in ${escapeHtml(d.landlordAddress || "________________")},
di seguito denominato/a <strong>"LOCATORE"</strong>
</div>
<p style="text-align:center;font-weight:bold;">E</p>
<div class="party">
<strong>${escapeHtml(d.tenantName)}</strong>, C.F. ${escapeHtml(d.tenantCF || "________________")},
${d.contractType === "studenti" && d.tenantUniversity ? `iscritto/a presso ${escapeHtml(d.tenantUniversity)},` : ""}
di seguito denominato/a <strong>"CONDUTTORE"</strong>
</div>
</div>

<h2>Premesse</h2>
<div class="article">
Il Locatore è proprietario dell'immobile sito in <strong>${escapeHtml(d.address || "________________")}</strong>,
${escapeHtml(d.zoneName ? `zona catastale ${d.zoneName},` : "")}
composto da una superficie calpestabile di mq ${d.walkableSqm.toFixed(0)} 
(superficie convenzionale mq ${d.conventionalSqm.toFixed(2)}),
classe energetica <strong>${escapeHtml(d.energyClass)}</strong>${d.yearBuilt ? `, anno di costruzione ${escapeHtml(d.yearBuilt)}` : ""}${d.renovationYear ? `, ristrutturato nel ${escapeHtml(d.renovationYear)}` : ""}.
${d.isFurnished ? `L'immobile viene locato arredato${d.furnitureValue > 0 ? ` (valore stimato arredi: €${d.furnitureValue.toFixed(0)})` : ""}.` : "L'immobile viene locato non arredato."}
</div>

${isConcordato ? `
<div class="article">
Il presente contratto è stipulato ai sensi dell'art. ${d.contractType === "studenti" ? "5, commi 2 e 3" : d.contractType === "transitorio" ? "5, comma 1" : "2, comma 3"} 
della Legge 9 dicembre 1998 n. 431, nel rispetto delle condizioni previste dall'Accordo Territoriale 
per il Comune di Torino vigente, depositato in data 25/10/2024, e del D.M. 16 gennaio 2017.
</div>
` : ""}

<h2>Art. 1 — Oggetto</h2>
<div class="article">
Il Locatore concede in locazione al Conduttore, che accetta, l'unità immobiliare sopra descritta, 
ad uso esclusivamente abitativo${d.contractType === "studenti" ? " per studenti universitari" : ""}.
</div>

<h2>Art. 2 — Durata</h2>
<div class="article">
La locazione ha durata ${escapeHtml(d.contractDuration || "come da tipologia contrattuale")}, 
con decorrenza dal <strong>${startFormatted}</strong> e scadenza il <strong>${endFormatted}</strong>.
${d.contractType === "4+4" || d.contractType === "3+2" ? "Alla prima scadenza il contratto si rinnova automaticamente per un uguale periodo, salvo disdetta comunicata con lettera raccomandata almeno sei mesi prima della scadenza." : ""}
${d.contractType === "transitorio" ? "La natura transitoria della locazione è motivata da: ________________ (specificare l'esigenza transitoria documentata)." : ""}
</div>

<h2>Art. 3 — Canone</h2>
<div class="article">
Il canone di locazione è stabilito in <strong>€${d.chosenRent.toFixed(2)}</strong> mensili 
(euro ${d.chosenRent.toFixed(2)} al mese), pari a <strong>€${annualRent.toFixed(2)}</strong> annui.
${isConcordato ? "Il canone è determinato nel rispetto dei limiti minimi e massimi stabiliti dall'Accordo Territoriale vigente per la zona e la fascia di appartenenza dell'immobile." : ""}
Il pagamento dovrà essere effettuato entro il giorno 5 di ciascun mese, mediante bonifico bancario 
sul conto corrente intestato al Locatore, le cui coordinate saranno comunicate separatamente.
</div>

<h2>Art. 4 — Deposito cauzionale</h2>
<div class="article">
A garanzia delle obbligazioni assunte con il presente contratto, il Conduttore versa al Locatore 
un deposito cauzionale pari a <strong>${d.depositMonths} mensilità</strong>, per un importo di 
<strong>€${deposit.toFixed(2)}</strong>. Il deposito cauzionale produrrà interessi legali che 
saranno corrisposti al Conduttore al termine della locazione, previa verifica dello stato dell'immobile.
</div>

<h2>Art. 5 — Regime fiscale</h2>
<div class="article">
${d.useCedolareSecca 
  ? `Il Locatore opta per il regime della <strong>cedolare secca</strong> ai sensi dell'art. 3 del D.Lgs. 23/2011, con aliquota del <strong>${d.cedolareSeccaRate}%</strong>. Per effetto di tale opzione, il Locatore rinuncia alla facoltà di chiedere l'aggiornamento del canone, anche se previsto nel contratto, incluso quello per adeguamento ISTAT.`
  : "Il canone sarà aggiornato annualmente in misura pari al 75% della variazione dell'indice ISTAT dei prezzi al consumo per le famiglie di operai ed impiegati."
}
</div>

<h2>Art. 6 — Uso e conservazione</h2>
<div class="article">
Il Conduttore si obbliga a usare l'immobile con la diligenza del buon padre di famiglia, 
esclusivamente per uso abitativo, e a riconsegnarlo alla cessazione del contratto nello stato 
in cui lo ha ricevuto, salvo il deperimento d'uso. È vietata la sublocazione totale o parziale 
senza il consenso scritto del Locatore.
</div>

<h2>Art. 7 — Spese</h2>
<div class="article">
Sono a carico del Conduttore le spese di ordinaria amministrazione condominiale, le utenze 
(energia elettrica, gas, acqua, riscaldamento autonomo ove presente), la tassa rifiuti (TARI) 
e ogni altro onere accessorio relativo all'uso dell'immobile. Le spese di straordinaria 
amministrazione restano a carico del Locatore.
</div>

<h2>Art. 8 — Registrazione</h2>
<div class="article">
${d.useCedolareSecca
  ? "Le spese di registrazione del presente contratto sono a carico del Locatore, essendo stato optato il regime della cedolare secca. Il contratto è esente dall'imposta di bollo e dall'imposta di registro."
  : "Le spese di registrazione del presente contratto e le relative imposte di registro sono ripartite in parti uguali tra Locatore e Conduttore, nella misura del 50% ciascuno."
}
Il presente contratto sarà registrato presso l'Agenzia delle Entrate competente entro 30 giorni 
dalla data di stipula.
</div>

<h2>Art. 9 — Clausole finali</h2>
<div class="article">
Per quanto non espressamente previsto nel presente contratto, si applicano le disposizioni del 
Codice Civile, della Legge 9 dicembre 1998 n. 431 e successive modificazioni${isConcordato ? ", nonché dell'Accordo Territoriale vigente per il Comune di Torino" : ""}.
Ogni controversia derivante dal presente contratto sarà devoluta al Foro di Torino.
</div>

<p style="margin-top:20pt;">
Letto, confermato e sottoscritto.<br>
Torino, lì ${startFormatted}
</p>

<div class="signature-block">
<div class="signature">Il Locatore<br><br><br>${escapeHtml(d.landlordName)}</div>
<div class="signature">Il Conduttore<br><br><br>${escapeHtml(d.tenantName)}</div>
</div>

${isConcordato ? `
<div class="article" style="margin-top:30pt; padding:10pt; border:1px solid #999; font-size:10pt;">
<strong>ATTESTAZIONE DI CONFORMITÀ</strong><br>
Si attesta che il canone di locazione pattuito nel presente contratto è conforme ai parametri 
stabiliti dall'Accordo Territoriale per il Comune di Torino, depositato presso il Comune in data 
25/10/2024, ai sensi del D.M. 16 gennaio 2017.<br><br>
Organizzazione firmataria: ________________<br>
Data: ________________ &nbsp;&nbsp; Firma: ________________
</div>
` : ""}

<div class="footer">
Contratto generato tramite Jungle Rent — junglerent.lovable.app<br>
Documento conforme al modello ministeriale D.M. 16/01/2017
</div>

</body>
</html>`;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const body = await req.json();
    const parsed = BodySchema.safeParse(body);
    if (!parsed.success) {
      return new Response(
        JSON.stringify({ error: "Dati non validi", details: parsed.error.flatten().fieldErrors }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const html = generateContractHtml(parsed.data);

    return new Response(
      JSON.stringify({ html, format: "html" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("generate-contract error:", err);
    return new Response(
      JSON.stringify({ error: "Errore nella generazione del contratto" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
