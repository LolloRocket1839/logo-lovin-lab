import { z } from "zod";

export const investorLeadSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Inserisci nome e cognome")
    .max(100, "Massimo 100 caratteri"),
  email: z.string().trim().email("Email non valida").max(255),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  taxResidence: z.enum(["IT", "CH", "EU", "OTHER"], {
    errorMap: () => ({ message: "Seleziona la tua residenza fiscale" }),
  }),
  ticketRange: z.enum(["5-10", "10-20", "20-50", "50+", "TBD"], {
    errorMap: () => ({ message: "Seleziona un range" }),
  }),
  horizon: z.enum(["WEEKS", "1-3M", "3-6M", "6M+"], {
    errorMap: () => ({ message: "Seleziona un orizzonte" }),
  }),
  prevExperience: z.enum(["YES", "NO", "PARTIAL"], {
    errorMap: () => ({ message: "Seleziona un'opzione" }),
  }),
  source: z.string().trim().max(500).optional().or(z.literal("")),
  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  privacyConsent: z.literal(true, {
    errorMap: () => ({ message: "Devi accettare l'informativa privacy" }),
  }),
  ownInitiativeDeclaration: z.literal(true, {
    errorMap: () => ({
      message:
        "Devi confermare di aver richiesto le informazioni di tua iniziativa",
    }),
  }),
  // Honeypot — must remain empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type InvestorLeadInput = z.infer<typeof investorLeadSchema>;
