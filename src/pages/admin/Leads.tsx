import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Users, AlarmClock, TrendingUp, Trophy } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { LeadsToolbar } from "@/components/admin/leads/LeadsToolbar";
import { LeadsTable } from "@/components/admin/leads/LeadsTable";
import { LeadsKanban } from "@/components/admin/leads/LeadsKanban";
import { LeadDetailDrawer } from "@/components/admin/leads/LeadDetailDrawer";
import { Lead, LeadStatus, LeadPriority } from "@/components/admin/leads/types";

const ADMIN_EMAILS = ["lorenzo.onijoseph@gmail.com"];

const LeadsAdmin = () => {
  const { user, loading: authLoading } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<LeadPriority | "all">("all");
  const [sourceFilter, setSourceFilter] = useState<string>("");
  const [onlyDueFollowups, setOnlyDueFollowups] = useState(false);
  const [view, setView] = useState<"table" | "kanban">("table");
  const [selected, setSelected] = useState<Lead | null>(null);

  const isAdmin = user && ADMIN_EMAILS.includes(user.email ?? "");

  useEffect(() => {
    if (!isAdmin) return;
    void fetchLeads();
  }, [isAdmin]);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-leads", {
      body: { action: "list" },
    });
    if (error) {
      toast.error("Errore caricamento lead");
    } else if (data?.leads) {
      setLeads(data.leads);
    }
    setLoading(false);
  };

  const filtered = useMemo(() => {
    const now = Date.now();
    return leads.filter((l) => {
      const matchSearch =
        !search ||
        l.email.toLowerCase().includes(search.toLowerCase()) ||
        (l.name ?? "").toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || l.lead_type === typeFilter;
      const matchStatus = statusFilter === "all" || l.status === statusFilter;
      const matchPriority = priorityFilter === "all" || l.priority === priorityFilter;
      const matchSource =
        !sourceFilter || (l.source ?? "").toLowerCase().includes(sourceFilter.toLowerCase());
      const matchDue =
        !onlyDueFollowups ||
        (l.next_followup_at && new Date(l.next_followup_at).getTime() <= now);
      return matchSearch && matchType && matchStatus && matchPriority && matchSource && matchDue;
    });
  }, [leads, search, typeFilter, statusFilter, priorityFilter, sourceFilter, onlyDueFollowups]);

  const stats = useMemo(() => {
    const now = Date.now();
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    return {
      nuovi: leads.filter((l) => l.status === "nuovo").length,
      dueToday: leads.filter(
        (l) => l.next_followup_at && new Date(l.next_followup_at).getTime() <= now
      ).length,
      inTrattativa: leads.filter((l) => ["qualificato", "proposta"].includes(l.status)).length,
      vintiMese: leads.filter(
        (l) => l.status === "vinto" && new Date(l.created_at) >= startOfMonth
      ).length,
    };
  }, [leads]);

  const exportCSV = () => {
    const headers = ["email", "name", "phone", "lead_type", "status", "priority", "source", "utm_source", "utm_medium", "utm_campaign", "last_contact_at", "next_followup_at", "created_at"];
    const rows = filtered.map((l) =>
      headers.map((h) => JSON.stringify((l as any)[h] ?? "")).join(",")
    );
    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `leads-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const moveLead = async (leadId: string, status: LeadStatus) => {
    const { error } = await supabase.functions.invoke("admin-leads", {
      body: { action: "update_lead", lead_id: leadId, patch: { status } },
    });
    if (error) {
      toast.error("Errore: " + error.message);
    } else {
      toast.success("Stato aggiornato");
      void fetchLeads();
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!user) return <Navigate to="/accedi" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">CRM lead</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <StatCard icon={Users} value={stats.nuovi} label="Nuovi" />
          <StatCard icon={AlarmClock} value={stats.dueToday} label="Da ricontattare" highlight={stats.dueToday > 0} />
          <StatCard icon={TrendingUp} value={stats.inTrattativa} label="In trattativa" />
          <StatCard icon={Trophy} value={stats.vintiMese} label="Vinti questo mese" />
        </div>

        <LeadsToolbar
          search={search}
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          priorityFilter={priorityFilter}
          setPriorityFilter={setPriorityFilter}
          sourceFilter={sourceFilter}
          setSourceFilter={setSourceFilter}
          onlyDueFollowups={onlyDueFollowups}
          setOnlyDueFollowups={setOnlyDueFollowups}
          view={view}
          setView={setView}
          onRefresh={fetchLeads}
          onExport={exportCSV}
        />

        {loading ? (
          <p className="text-center text-muted-foreground py-12">Caricamento…</p>
        ) : view === "table" ? (
          <LeadsTable leads={filtered} onSelect={setSelected} />
        ) : (
          <LeadsKanban leads={filtered} onSelect={setSelected} onMove={moveLead} />
        )}
      </div>

      <LeadDetailDrawer
        lead={selected}
        onClose={() => setSelected(null)}
        onUpdated={fetchLeads}
      />
    </div>
  );
};

function StatCard({ icon: Icon, value, label, highlight }: { icon: React.ComponentType<{ className?: string }>; value: number; label: string; highlight?: boolean }) {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-3">
        <Icon className={`h-5 w-5 ${highlight ? "text-rose-500" : "text-primary"}`} />
        <div>
          <p className={`text-2xl font-bold ${highlight ? "text-rose-600 dark:text-rose-400" : ""}`}>{value}</p>
          <p className="text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default LeadsAdmin;
