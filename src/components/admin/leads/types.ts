export type LeadStatus =
  | "nuovo"
  | "contattato"
  | "qualificato"
  | "proposta"
  | "vinto"
  | "perso"
  | "nurturing";

export type LeadPriority = "low" | "medium" | "high";

export type InteractionKind =
  | "note"
  | "call"
  | "whatsapp"
  | "email"
  | "meeting"
  | "status_change"
  | "followup";

export type InteractionDirection = "inbound" | "outbound" | "system";

export interface Lead {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  lead_type: string;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  metadata: Record<string, unknown> | null;
  created_at: string;
  status: LeadStatus;
  priority: LeadPriority;
  assigned_to: string | null;
  last_contact_at: string | null;
  next_followup_at: string | null;
  internal_notes: string | null;
  interactions_count?: number;
}

export interface LeadInteraction {
  id: string;
  lead_id: string;
  kind: InteractionKind;
  direction: InteractionDirection;
  content: string | null;
  metadata: Record<string, unknown> | null;
  created_by: string | null;
  created_at: string;
}

export const STATUS_ORDER: LeadStatus[] = [
  "nuovo",
  "contattato",
  "qualificato",
  "proposta",
  "vinto",
  "perso",
  "nurturing",
];

export const STATUS_LABEL: Record<LeadStatus, string> = {
  nuovo: "Nuovo",
  contattato: "Contattato",
  qualificato: "Qualificato",
  proposta: "Proposta",
  vinto: "Vinto",
  perso: "Perso",
  nurturing: "Nurturing",
};

export const STATUS_BADGE: Record<LeadStatus, string> = {
  nuovo: "bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30",
  contattato: "bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30",
  qualificato: "bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30",
  proposta: "bg-indigo-500/15 text-indigo-700 dark:text-indigo-300 border-indigo-500/30",
  vinto: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30",
  perso: "bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30",
  nurturing: "bg-slate-500/15 text-slate-700 dark:text-slate-300 border-slate-500/30",
};

export const PRIORITY_LABEL: Record<LeadPriority, string> = {
  low: "Bassa",
  medium: "Media",
  high: "Alta",
};
