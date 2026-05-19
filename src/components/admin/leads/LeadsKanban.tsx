import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, AlarmClock } from "lucide-react";
import { Lead, LeadStatus, STATUS_BADGE, STATUS_LABEL, STATUS_ORDER } from "./types";

interface Props {
  leads: Lead[];
  onSelect: (lead: Lead) => void;
  onMove: (leadId: string, status: LeadStatus) => void;
}

export function LeadsKanban({ leads, onSelect, onMove }: Props) {
  const grouped = STATUS_ORDER.reduce<Record<LeadStatus, Lead[]>>((acc, s) => {
    acc[s] = leads.filter((l) => l.status === s);
    return acc;
  }, {} as Record<LeadStatus, Lead[]>);

  const now = Date.now();

  return (
    <div className="grid grid-flow-col auto-cols-[260px] gap-3 overflow-x-auto pb-4 -mx-4 px-4">
      {STATUS_ORDER.map((status) => (
        <div key={status} className="flex flex-col bg-muted/30 rounded-lg p-2">
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={`text-[10px] ${STATUS_BADGE[status]}`}>
                {STATUS_LABEL[status]}
              </Badge>
              <span className="text-xs text-muted-foreground">{grouped[status].length}</span>
            </div>
          </div>
          <div className="space-y-2 min-h-[60px]">
            {grouped[status].map((lead) => {
              const due = lead.next_followup_at && new Date(lead.next_followup_at).getTime() <= now;
              return (
                <Card
                  key={lead.id}
                  className="p-2.5 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => onSelect(lead)}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{lead.name || lead.email}</p>
                      <p className="text-[11px] text-muted-foreground truncate">{lead.email}</p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-6 w-6 -mr-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <MoreHorizontal className="h-3.5 w-3.5" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {STATUS_ORDER.filter((s) => s !== status).map((s) => (
                          <DropdownMenuItem
                            key={s}
                            onClick={(e) => {
                              e.stopPropagation();
                              onMove(lead.id, s);
                            }}
                          >
                            Sposta in {STATUS_LABEL[s]}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2 mt-1.5">
                    <Badge variant="secondary" className="text-[10px] capitalize">
                      {lead.lead_type}
                    </Badge>
                    {due && (
                      <span className="text-[10px] text-rose-600 dark:text-rose-400 flex items-center gap-0.5">
                        <AlarmClock className="h-3 w-3" /> follow-up
                      </span>
                    )}
                    {lead.priority === "high" && (
                      <span className="text-[10px] text-rose-600 dark:text-rose-400">★</span>
                    )}
                  </div>
                </Card>
              );
            })}
            {grouped[status].length === 0 && (
              <p className="text-[11px] text-muted-foreground text-center py-3">vuoto</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
