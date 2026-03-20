/**
 * Formspree endpoints centralizzati
 * Tutti gli endpoint per la gestione dei form
 */

export const FORMSPREE_ENDPOINTS = {
  // Endpoint principale per lead generici
  main: "https://formspree.io/f/xeojbzow",
  
  // Endpoint specifico per exit intent popup
  exitIntent: "https://formspree.io/f/xkgowklq",
  
  // Alias per retro-compatibilità
  waitlist: "https://formspree.io/f/xeojbzow",
  quickSeller: "https://formspree.io/f/xeojbzow",
  quickInvestor: "https://formspree.io/f/xeojbzow",
  student: "https://formspree.io/f/xeojbzow",
  contracts: "https://formspree.io/f/xeojbzow",
} as const;

export type FormspreeEndpoint = keyof typeof FORMSPREE_ENDPOINTS;
