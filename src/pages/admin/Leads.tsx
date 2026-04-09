import { useState, useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Download, Search, Users, Mail, Phone, Calendar, Filter, RefreshCw } from "lucide-react";
import { format } from "date-fns";

interface Lead {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  lead_type: string;
  source: string;
  utm_source: string | null;
  utm_medium: string | null;
  utm_campaign: string | null;
  metadata: Record<string, any> | null;
  created_at: string;
}

const ADMIN_EMAILS = ["lorenzo.onijoseph@gmail.com"];

const LeadsAdmin = () => {
  const { user, loading: authLoading } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const isAdmin = user && ADMIN_EMAILS.includes(user.email ?? "");

  useEffect(() => {
    if (!isAdmin) return;
    fetchLeads();
  }, [isAdmin]);

  const fetchLeads = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-leads", {
      body: { action: "list" },
    });
    if (!error && data?.leads) {
      setLeads(data.leads);
    }
    setLoading(false);
  };

  const filtered = useMemo(() => {
    return leads.filter((l) => {
      const matchSearch =
        !search ||
        l.email.toLowerCase().includes(search.toLowerCase()) ||
        (l.name ?? "").toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === "all" || l.lead_type === typeFilter;
      return matchSearch && matchType;
    });
  }, [leads, search, typeFilter]);

  const exportCSV = () => {
    const headers = ["email", "name", "phone", "lead_type", "source", "utm_source", "utm_medium", "utm_campaign", "created_at"];
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

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!user) return <Navigate to="/accedi" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  const typeCounts = leads.reduce<Record<string, number>>((acc, l) => {
    acc[l.lead_type] = (acc[l.lead_type] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-foreground">Lead Dashboard</h1>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={fetchLeads}>
              <RefreshCw className="h-4 w-4 mr-1" /> Refresh
            </Button>
            <Button size="sm" onClick={exportCSV}>
              <Download className="h-4 w-4 mr-1" /> Export CSV
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <Card>
            <CardContent className="p-4 flex items-center gap-3">
              <Users className="h-5 w-5 text-primary" />
              <div>
                <p className="text-2xl font-bold">{leads.length}</p>
                <p className="text-xs text-muted-foreground">Total Leads</p>
              </div>
            </CardContent>
          </Card>
          {Object.entries(typeCounts).map(([type, count]) => (
            <Card key={type}>
              <CardContent className="p-4">
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-xs text-muted-foreground capitalize">{type}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by email or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <div className="flex gap-2">
            {["all", "investor", "seller", "general", "student"].map((t) => (
              <Button
                key={t}
                size="sm"
                variant={typeFilter === t ? "default" : "outline"}
                onClick={() => setTypeFilter(t)}
                className="text-xs capitalize"
              >
                {t}
              </Button>
            ))}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <p className="text-center text-muted-foreground py-12">Loading leads...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No leads found</p>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-3 font-medium">Contact</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">Type</th>
                  <th className="text-left p-3 font-medium hidden md:table-cell">Source</th>
                  <th className="text-left p-3 font-medium hidden lg:table-cell">UTM</th>
                  <th className="text-left p-3 font-medium">Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((lead) => (
                  <tr key={lead.id} className="border-t border-border hover:bg-muted/30 transition-colors">
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
                      </div>
                    </td>
                    <td className="p-3 hidden md:table-cell">
                      <Badge variant="secondary" className="capitalize text-xs">
                        {lead.lead_type}
                      </Badge>
                    </td>
                    <td className="p-3 hidden md:table-cell text-muted-foreground text-xs">
                      {lead.source}
                    </td>
                    <td className="p-3 hidden lg:table-cell text-xs text-muted-foreground">
                      {lead.utm_source && <span>{lead.utm_source}</span>}
                      {lead.utm_medium && <span> / {lead.utm_medium}</span>}
                      {lead.utm_campaign && <span> / {lead.utm_campaign}</span>}
                      {!lead.utm_source && "—"}
                    </td>
                    <td className="p-3 text-xs text-muted-foreground whitespace-nowrap">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(lead.created_at), "dd/MM/yy HH:mm")}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default LeadsAdmin;
