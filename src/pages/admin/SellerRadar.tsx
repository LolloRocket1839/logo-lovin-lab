import { useState, useEffect, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate } from "react-router-dom";
import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  Radar, RefreshCw, ExternalLink, Copy, CheckCircle2, UserPlus, AlertTriangle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";

const ADMIN_EMAILS = ["lorenzo.onijoseph@gmail.com"];

interface Listing {
  id: string;
  portal: "immobiliare" | "idealista" | "subito";
  external_id: string;
  url: string;
  title: string | null;
  zone: string | null;
  price_eur: number | null;
  sqm: number | null;
  rooms: number | null;
  condition: string | null;
  is_private_seller: boolean;
  first_seen_at: string;
  last_seen_at: string;
  price_history: Array<{ price: number; at: string }>;
  status: string;
  lead_score: number;
  contacted_at: string | null;
  contact_notes: string | null;
  converted_lead_id: string | null;
  description_excerpt: string | null;
}

interface Template {
  id: string;
  name: string;
  body: string;
}

interface LogEntry {
  id: string;
  portal: string;
  zone: string | null;
  listings_found: number;
  listings_new: number;
  errors: string[];
  created_at: string;
}

const SellerRadar = () => {
  const { user, loading: authLoading } = useAuth();
  const [listings, setListings] = useState<Listing[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [log, setLog] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  // Filters
  const [zoneFilter, setZoneFilter] = useState<string>("all");
  const [portalFilter, setPortalFilter] = useState<string>("all");
  const [onlyPrivate, setOnlyPrivate] = useState(true);
  const [onlyNotContacted, setOnlyNotContacted] = useState(true);
  const [sort, setSort] = useState<"score" | "new" | "drop">("score");

  // Dialogs
  const [contactDialog, setContactDialog] = useState<Listing | null>(null);
  const [contactNote, setContactNote] = useState("");
  const [convertDialog, setConvertDialog] = useState<Listing | null>(null);
  const [convertForm, setConvertForm] = useState({ email: "", name: "", phone: "", notes: "" });

  const isAdmin = user && ADMIN_EMAILS.includes(user.email ?? "");

  useEffect(() => {
    if (!isAdmin) return;
    void fetchData();
  }, [isAdmin]);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-radar", {
      body: { action: "list" },
    });
    if (error) toast.error("Errore caricamento: " + error.message);
    else if (data) {
      setListings(data.listings ?? []);
      setTemplates(data.templates ?? []);
      setLog(data.log ?? []);
    }
    setLoading(false);
  };

  const triggerScan = async () => {
    setScanning(true);
    const { error } = await supabase.functions.invoke("admin-radar", {
      body: { action: "trigger_scan" },
    });
    if (error) toast.error("Errore: " + error.message);
    else toast.success("Scan avviato. Ricarica tra 1-2 minuti.");
    setScanning(false);
  };

  const filtered = useMemo(() => {
    let out = listings.filter((l) => {
      if (zoneFilter !== "all" && l.zone !== zoneFilter) return false;
      if (portalFilter !== "all" && l.portal !== portalFilter) return false;
      if (onlyPrivate && !l.is_private_seller) return false;
      if (onlyNotContacted && l.contacted_at) return false;
      if (l.status !== "active") return false;
      return true;
    });
    if (sort === "score") out.sort((a, b) => b.lead_score - a.lead_score);
    else if (sort === "new") out.sort((a, b) => +new Date(b.first_seen_at) - +new Date(a.first_seen_at));
    else if (sort === "drop") {
      out.sort((a, b) => {
        const dropA = priceDropPct(a);
        const dropB = priceDropPct(b);
        return dropB - dropA;
      });
    }
    return out;
  }, [listings, zoneFilter, portalFilter, onlyPrivate, onlyNotContacted, sort]);

  const zones = useMemo(
    () => Array.from(new Set(listings.map((l) => l.zone).filter(Boolean))) as string[],
    [listings],
  );

  const copyTemplate = (l: Listing) => {
    const tpl = templates[0]?.body ?? "";
    const msg = tpl.replace(/\{\{zone\}\}/g, l.zone ?? "zona Lingotto");
    navigator.clipboard.writeText(msg);
    toast.success("Messaggio copiato negli appunti");
  };

  const markContacted = async () => {
    if (!contactDialog) return;
    const { error } = await supabase.functions.invoke("admin-radar", {
      body: { action: "mark_contacted", listing_id: contactDialog.id, note: contactNote },
    });
    if (error) toast.error("Errore: " + error.message);
    else {
      toast.success("Annuncio marcato come contattato");
      setContactDialog(null);
      setContactNote("");
      void fetchData();
    }
  };

  const convertToLead = async () => {
    if (!convertDialog || !convertForm.email) {
      toast.error("Email obbligatoria");
      return;
    }
    const { error } = await supabase.functions.invoke("admin-radar", {
      body: {
        action: "convert_to_lead",
        listing_id: convertDialog.id,
        ...convertForm,
      },
    });
    if (error) toast.error("Errore: " + error.message);
    else {
      toast.success("Lead creato nel CRM");
      setConvertDialog(null);
      setConvertForm({ email: "", name: "", phone: "", notes: "" });
      void fetchData();
    }
  };

  if (authLoading) return <div className="min-h-screen flex items-center justify-center text-muted-foreground">Loading...</div>;
  if (!user) return <Navigate to="/accedi" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24 pb-12 max-w-7xl">
        <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Radar className="h-6 w-6 text-primary" /> Seller Radar
          </h1>
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={fetchData} disabled={loading}>
              <RefreshCw className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`} /> Ricarica
            </Button>
            <Button size="sm" onClick={triggerScan} disabled={scanning}>
              <Radar className={`h-4 w-4 mr-1 ${scanning ? "animate-pulse" : ""}`} /> Scan ora
            </Button>
          </div>
        </div>

        {/* Compliance banner */}
        <div className="mb-5 p-3 rounded-lg border border-amber-200 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 flex gap-2">
          <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
          <p>
            Dati pubblici aggregati per ricerca di mercato. Nessun contatto del venditore viene archiviato.
            Outreach esclusivamente via canale ufficiale del portale, manualmente, con messaggio onesto.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
          <StatCard label="Attivi" value={listings.filter((l) => l.status === "active").length} />
          <StatCard label="Solo privati" value={listings.filter((l) => l.is_private_seller && l.status === "active").length} />
          <StatCard label="Score ≥60" value={listings.filter((l) => l.lead_score >= 60 && l.status === "active").length} highlight />
          <StatCard label="Già contattati" value={listings.filter((l) => l.contacted_at).length} />
        </div>

        {/* Filters */}
        <Card className="mb-4">
          <CardContent className="p-3 flex flex-wrap gap-2 items-center">
            <Select value={zoneFilter} onValueChange={setZoneFilter}>
              <SelectTrigger className="h-8 w-[160px] text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutte le zone</SelectItem>
                {zones.map((z) => <SelectItem key={z} value={z}>{z}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={portalFilter} onValueChange={setPortalFilter}>
              <SelectTrigger className="h-8 w-[140px] text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tutti i portali</SelectItem>
                <SelectItem value="immobiliare">Immobiliare</SelectItem>
                <SelectItem value="idealista">Idealista</SelectItem>
                <SelectItem value="subito">Subito</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sort} onValueChange={(v) => setSort(v as typeof sort)}>
              <SelectTrigger className="h-8 w-[160px] text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="score">Score più alto</SelectItem>
                <SelectItem value="new">Più recenti</SelectItem>
                <SelectItem value="drop">Maggior ribasso</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2 text-xs">
              <Switch checked={onlyPrivate} onCheckedChange={setOnlyPrivate} id="private" />
              <Label htmlFor="private">Solo privati</Label>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Switch checked={onlyNotContacted} onCheckedChange={setOnlyNotContacted} id="ncontacted" />
              <Label htmlFor="ncontacted">Non contattati</Label>
            </div>
            <span className="ml-auto text-xs text-muted-foreground">
              {filtered.length} su {listings.length}
            </span>
          </CardContent>
        </Card>

        {/* Listings */}
        {loading ? (
          <p className="text-center text-muted-foreground py-12">Caricamento…</p>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="p-8 text-center text-sm text-muted-foreground">
            Nessun annuncio. Avvia uno scan o cambia i filtri.
          </CardContent></Card>
        ) : (
          <div className="space-y-2">
            {filtered.map((l) => (
              <ListingRow
                key={l.id}
                listing={l}
                onCopy={() => copyTemplate(l)}
                onMarkContacted={() => setContactDialog(l)}
                onConvert={() => {
                  setConvertDialog(l);
                  setConvertForm({ email: "", name: "", phone: "", notes: "" });
                }}
              />
            ))}
          </div>
        )}

        {/* Recent scan log */}
        {log.length > 0 && (
          <details className="mt-8 text-xs text-muted-foreground">
            <summary className="cursor-pointer hover:text-foreground">Log scan recenti ({log.length})</summary>
            <div className="mt-2 space-y-1">
              {log.slice(0, 10).map((r) => (
                <div key={r.id} className="flex gap-3 py-1 border-b border-border/50">
                  <span className="w-32 shrink-0">{formatDistanceToNow(new Date(r.created_at), { addSuffix: true, locale: it })}</span>
                  <span className="w-24 shrink-0">{r.portal}</span>
                  <span className="w-36 shrink-0">{r.zone}</span>
                  <span>found {r.listings_found} · new {r.listings_new}{r.errors?.length ? ` · ${r.errors.length} err` : ""}</span>
                </div>
              ))}
            </div>
          </details>
        )}
      </div>

      {/* Mark contacted dialog */}
      <Dialog open={!!contactDialog} onOpenChange={(o) => !o && setContactDialog(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Marca come contattato</DialogTitle></DialogHeader>
          <Textarea
            placeholder="Nota: cosa hai scritto, quando, su che canale…"
            value={contactNote}
            onChange={(e) => setContactNote(e.target.value)}
            rows={4}
          />
          <DialogFooter>
            <Button variant="outline" onClick={() => setContactDialog(null)}>Annulla</Button>
            <Button onClick={markContacted}>Conferma</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Convert to lead dialog */}
      <Dialog open={!!convertDialog} onOpenChange={(o) => !o && setConvertDialog(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Crea lead dal venditore</DialogTitle></DialogHeader>
          <p className="text-xs text-muted-foreground -mt-2 mb-2">
            Solo se il venditore ha risposto e ti ha dato i contatti spontaneamente.
          </p>
          <div className="space-y-2">
            <Input placeholder="Email *" value={convertForm.email}
              onChange={(e) => setConvertForm({ ...convertForm, email: e.target.value })} />
            <Input placeholder="Nome" value={convertForm.name}
              onChange={(e) => setConvertForm({ ...convertForm, name: e.target.value })} />
            <Input placeholder="Telefono / WhatsApp" value={convertForm.phone}
              onChange={(e) => setConvertForm({ ...convertForm, phone: e.target.value })} />
            <Textarea placeholder="Note iniziali" rows={3} value={convertForm.notes}
              onChange={(e) => setConvertForm({ ...convertForm, notes: e.target.value })} />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConvertDialog(null)}>Annulla</Button>
            <Button onClick={convertToLead}>Crea lead</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

function StatCard({ label, value, highlight }: { label: string; value: number; highlight?: boolean }) {
  return (
    <Card>
      <CardContent className="p-3">
        <p className={`text-2xl font-bold ${highlight ? "text-primary" : ""}`}>{value}</p>
        <p className="text-xs text-muted-foreground">{label}</p>
      </CardContent>
    </Card>
  );
}

function priceDropPct(l: Listing): number {
  if (!l.price_history || l.price_history.length < 2) return 0;
  const first = l.price_history[0].price;
  const last = l.price_history[l.price_history.length - 1].price;
  if (!first) return 0;
  return ((first - last) / first) * 100;
}

function ListingRow({
  listing, onCopy, onMarkContacted, onConvert,
}: {
  listing: Listing;
  onCopy: () => void;
  onMarkContacted: () => void;
  onConvert: () => void;
}) {
  const daysOnline = Math.floor((Date.now() - +new Date(listing.first_seen_at)) / 86400000);
  const drop = priceDropPct(listing);
  const pricePerSqm = listing.price_eur && listing.sqm ? Math.round(listing.price_eur / listing.sqm) : null;

  return (
    <Card>
      <CardContent className="p-3">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-start gap-2 flex-wrap mb-1">
              <Badge variant={listing.lead_score >= 60 ? "default" : "secondary"} className="text-xs">
                Score {listing.lead_score}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize">{listing.portal}</Badge>
              {listing.is_private_seller && <Badge variant="outline" className="text-xs">Privato</Badge>}
              {listing.contacted_at && (
                <Badge variant="outline" className="text-xs text-emerald-700 dark:text-emerald-400">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> Contattato
                </Badge>
              )}
              {drop >= 5 && (
                <Badge variant="outline" className="text-xs text-rose-700 dark:text-rose-400">
                  -{drop.toFixed(0)}%
                </Badge>
              )}
            </div>
            <p className="font-medium text-sm line-clamp-1">{listing.title ?? `Annuncio ${listing.external_id}`}</p>
            <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-muted-foreground mt-1">
              {listing.zone && <span>{listing.zone}</span>}
              {listing.price_eur && <span className="font-medium text-foreground">€ {listing.price_eur.toLocaleString("it-IT")}</span>}
              {listing.sqm && <span>{listing.sqm} mq</span>}
              {listing.rooms && <span>{listing.rooms} locali</span>}
              {pricePerSqm && <span>€{pricePerSqm}/mq</span>}
              {listing.condition && <span>· {listing.condition}</span>}
              <span>· online da {daysOnline}gg</span>
            </div>
          </div>
          <div className="flex gap-1 flex-wrap md:flex-nowrap shrink-0">
            <Button size="sm" variant="outline" asChild>
              <a href={listing.url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-3.5 w-3.5 mr-1" /> Apri
              </a>
            </Button>
            <Button size="sm" variant="outline" onClick={onCopy}>
              <Copy className="h-3.5 w-3.5 mr-1" /> Copy
            </Button>
            <Button size="sm" variant={listing.contacted_at ? "ghost" : "outline"} onClick={onMarkContacted}>
              <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> Contattato
            </Button>
            {!listing.converted_lead_id && (
              <Button size="sm" onClick={onConvert}>
                <UserPlus className="h-3.5 w-3.5 mr-1" /> Lead
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default SellerRadar;
