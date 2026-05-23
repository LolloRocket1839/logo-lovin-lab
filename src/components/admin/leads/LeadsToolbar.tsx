import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Download, RefreshCw, LayoutGrid, List, AlarmClock, Hospital, Home } from "lucide-react";
import { STATUS_LABEL, STATUS_ORDER, LeadStatus, LeadPriority, PRIORITY_LABEL } from "./types";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  typeFilter: string;
  setTypeFilter: (v: string) => void;
  statusFilter: LeadStatus | "all";
  setStatusFilter: (v: LeadStatus | "all") => void;
  priorityFilter: LeadPriority | "all";
  setPriorityFilter: (v: LeadPriority | "all") => void;
  sourceFilter: string;
  setSourceFilter: (v: string) => void;
  onlyDueFollowups: boolean;
  setOnlyDueFollowups: (v: boolean) => void;
  view: "table" | "kanban";
  setView: (v: "table" | "kanban") => void;
  onRefresh: () => void;
  onExport: () => void;
}

export function LeadsToolbar(p: Props) {
  return (
    <div className="space-y-3 mb-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Cerca per email o nome…"
            value={p.search}
            onChange={(e) => p.setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant={p.view === "table" ? "default" : "outline"}
            onClick={() => p.setView("table")}
          >
            <List className="h-4 w-4 mr-1" /> Tabella
          </Button>
          <Button
            size="sm"
            variant={p.view === "kanban" ? "default" : "outline"}
            onClick={() => p.setView("kanban")}
          >
            <LayoutGrid className="h-4 w-4 mr-1" /> Kanban
          </Button>
          <Button size="sm" variant="outline" onClick={p.onRefresh}>
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button size="sm" variant="outline" onClick={p.onExport}>
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <Button
          size="sm"
          variant={p.sourceFilter === "nizza-millefonti" ? "default" : "outline"}
          onClick={() =>
            p.setSourceFilter(p.sourceFilter === "nizza-millefonti" ? "" : "nizza-millefonti")
          }
          className="h-8 text-xs"
        >
          <Hospital className="h-3.5 w-3.5 mr-1" /> Pipeline Nizza
        </Button>

        <Button
          size="sm"
          variant={p.sourceFilter === "vendi-lingotto-nizza-millefonti" ? "default" : "outline"}
          onClick={() =>
            p.setSourceFilter(
              p.sourceFilter === "vendi-lingotto-nizza-millefonti"
                ? ""
                : "vendi-lingotto-nizza-millefonti",
            )
          }
          className="h-8 text-xs"
        >
          <Home className="h-3.5 w-3.5 mr-1" /> Pipeline Lingotto
        </Button>

        <Input
          placeholder="Filtra per fonte…"
          value={p.sourceFilter}
          onChange={(e) => p.setSourceFilter(e.target.value)}
          className="h-8 w-[160px] text-xs"
        />

        <Select value={p.typeFilter} onValueChange={p.setTypeFilter}>
          <SelectTrigger className="h-8 w-[140px] text-xs"><SelectValue placeholder="Tipo" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti i tipi</SelectItem>
            <SelectItem value="investor">Investor</SelectItem>
            <SelectItem value="seller">Seller</SelectItem>
            <SelectItem value="student">Student</SelectItem>
            <SelectItem value="general">General</SelectItem>
          </SelectContent>
        </Select>

        <Select value={p.statusFilter} onValueChange={(v) => p.setStatusFilter(v as LeadStatus | "all")}>
          <SelectTrigger className="h-8 w-[150px] text-xs"><SelectValue placeholder="Stato" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutti gli stati</SelectItem>
            {STATUS_ORDER.map((s) => (
              <SelectItem key={s} value={s}>{STATUS_LABEL[s]}</SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={p.priorityFilter} onValueChange={(v) => p.setPriorityFilter(v as LeadPriority | "all")}>
          <SelectTrigger className="h-8 w-[130px] text-xs"><SelectValue placeholder="Priorità" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tutte priorità</SelectItem>
            <SelectItem value="high">{PRIORITY_LABEL.high}</SelectItem>
            <SelectItem value="medium">{PRIORITY_LABEL.medium}</SelectItem>
            <SelectItem value="low">{PRIORITY_LABEL.low}</SelectItem>
          </SelectContent>
        </Select>

        <Button
          size="sm"
          variant={p.onlyDueFollowups ? "default" : "outline"}
          onClick={() => p.setOnlyDueFollowups(!p.onlyDueFollowups)}
          className="h-8 text-xs"
        >
          <AlarmClock className="h-3.5 w-3.5 mr-1" /> Solo follow-up scaduti
        </Button>
      </div>
    </div>
  );
}
