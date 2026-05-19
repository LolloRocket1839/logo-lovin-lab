import { Badge } from "@/components/ui/badge";
import { Mail, Phone, Calendar, AlarmClock, MessageSquare } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";
import { Lead, STATUS_BADGE, STATUS_LABEL, PRIORITY_LABEL } from "./types";

interface Props {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
}

export function LeadsTable({ leads, onSelect }: Props) {
  if (leads.length === 0) {
    return <p className="text-center text-muted-foreground py-12">Nessun lead trovato</p>;
  }

  const now = Date.now();

  return (
    <div className="overflow-x-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50">
          <tr>
            <th className="text-left p-3 font-medium">Stato</th>
            <th className="text-left p-3 font-medium">Contatto</th>
            <th className="text-left p-3 font-medium hidden md:table-cell">Tipo</th>
            <th className="text-left p-3 font-medium hidden lg:table-cell">Source</th>
            <th className="text-left p-3 font-medium hidden lg:table-cell">Ultimo contatto</th>
            <th className="text-left p-3 font-medium">Follow-up</th>
            <th className="text-left p-3 font-medium hidden md:table-cell">Creato</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => {
            const due =
              lead.next_followup_at && new Date(lead.next_followup_at).getTime() <= now;
            return (
              <tr
                key={lead.id}
                className="border-t border-border hover:bg-muted/30 transition-colors cursor-pointer"
                onClick={() => onSelect(lead)}
              >
                <td className="p-3">
                  <div className="flex flex-col gap-1">
                    <Badge variant="outline" className={`text-[10px] ${STATUS_BADGE[lead.status]}`}>
                      {STATUS_LABEL[lead.status]}
                    </Badge>
                    {lead.priority === "high" && (
                      <span className="text-[10px] text-rose-600 dark:text-rose-400 font-medium">
                        ★ {PRIORITY_LABEL.high}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3">
                  <div className="flex flex-col">
                    <span className="font-medium text-foreground">{lead.name || "—"}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Mail className="h-3 w-3" /> {lead.email}
                    </span>
                    {lead.phone && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {lead.phone}
                      </span>
                    )}
                    {(lead.interactions_count ?? 0) > 0 && (
                      <span className="text-[10px] text-muted-foreground flex items-center gap-1 mt-0.5">
                        <MessageSquare className="h-3 w-3" /> {lead.interactions_count} interazioni
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-3 hidden md:table-cell">
                  <Badge variant="secondary" className="capitalize text-xs">
                    {lead.lead_type}
                  </Badge>
                </td>
                <td className="p-3 hidden lg:table-cell text-muted-foreground text-xs">
                  {lead.source}
                </td>
                <td className="p-3 hidden lg:table-cell text-xs text-muted-foreground">
                  {lead.last_contact_at
                    ? formatDistanceToNow(new Date(lead.last_contact_at), { addSuffix: true, locale: it })
                    : "mai"}
                </td>
                <td className="p-3 text-xs whitespace-nowrap">
                  {lead.next_followup_at ? (
                    <span className={`flex items-center gap-1 ${due ? "text-rose-600 dark:text-rose-400 font-medium" : "text-muted-foreground"}`}>
                      <AlarmClock className="h-3 w-3" />
                      {format(new Date(lead.next_followup_at), "dd/MM HH:mm")}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">—</span>
                  )}
                </td>
                <td className="p-3 text-xs text-muted-foreground whitespace-nowrap hidden md:table-cell">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {format(new Date(lead.created_at), "dd/MM/yy")}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
