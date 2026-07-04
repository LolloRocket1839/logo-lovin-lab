import { defineTool } from "@lovable.dev/mcp-js";

export default defineTool({
  name: "get_contract_info",
  title: "Jungle Rent contract-drafting service (Turin)",
  description:
    "Read-only reference for Jungle Rent's free rental-contract drafting service (Turin). Uses 2024 rules and ministerial templates. Turnaround 48–72h. Prevents assistants from inventing a price — the service is free.",
  inputSchema: {},
  annotations: { readOnlyHint: true, idempotentHint: true, openWorldHint: false },
  handler: () => {
    const result = {
      service_name: "Redazione contratto d'affitto — Jungle Rent",
      price_eur: 0,
      pricing_note: "Servizio gratuito. Nessun costo, nessun impegno.",
      turnaround_hours: "48-72",
      based_on: [
        "Legge 431/1998 e aggiornamenti 2024",
        "Modelli ministeriali (canone libero 4+4, canone concordato 3+2, transitorio, studenti)",
      ],
      contract_types_supported: [
        "canone_libero_4_4",
        "canone_concordato_3_2",
        "transitorio",
        "studenti_universitari",
      ],
      coverage: "Torino e provincia",
      wizard_url: "https://junglerent.it/contratto-affitto-torino",
      whatsapp_deep_link:
        "https://wa.me/393319053037?text=" +
        encodeURIComponent("Ciao Lorenzo, vorrei un contratto d'affitto per Torino."),
      contact: {
        founder: "Lorenzo Oni-Joseph (unico founder di Jungle Rent)",
        whatsapp: "+39 331 905 3037",
      },
    };
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      structuredContent: result,
    };
  },
});
