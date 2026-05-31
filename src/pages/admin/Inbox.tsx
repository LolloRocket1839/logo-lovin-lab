import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Navigation } from "@/components/layout/Navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from "@/components/ui/dialog";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import {
  Mail, RefreshCw, Send, Archive, CheckCheck, ExternalLink, Settings as SettingsIcon, Inbox as InboxIcon,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";

const ADMIN_EMAILS = ["lorenzo.onijoseph@gmail.com"];

interface EmailMsg {
  id: string;
  threadId: string;
  from: string;
  subject: string;
  date: string;
  snippet: string;
  labelIds: string[];
  isUnread: boolean;
  processed: { classification: string; confidence: number; lead_id: string | null } | null;
}

const CLASSIFICATION_COLORS: Record<string, string> = {
  seller_lead: "bg-emerald-500/15 text-emerald-700 border-emerald-300",
  student_lead: "bg-blue-500/15 text-blue-700 border-blue-300",
  investor_lead: "bg-amber-500/15 text-amber-700 border-amber-300",
  portal_notification: "bg-purple-500/15 text-purple-700 border-purple-300",
  spam: "bg-red-500/15 text-red-700 border-red-300",
  other: "bg-gray-500/15 text-gray-700 border-gray-300",
};

const REPLY_TEMPLATES: Record<string, { label: string; subject: (s: string) => string; body: string }> = {
  seller: {
    label: "Risposta venditore",
    subject: (s) => `Re: ${s}`,
    body: `Ciao,\n\ngrazie per il tuo messaggio. Sono Lorenzo, mi occupo direttamente delle acquisizioni a Torino.\n\nPer prepararti una proposta entro 48-72h ho bisogno di sapere:\n- Zona e indirizzo dell'immobile\n- Metri quadri\n- Stato (da ristrutturare, abitabile, ristrutturato)\n- Eventuali criticità (mutuo, occupanti, vincoli)\n\nSe preferisci possiamo sentirci direttamente su WhatsApp: +39 331 905 3037\n\nA presto,`,
  },
  student: {
    label: "Risposta studente",
    subject: (s) => `Re: ${s}`,
    body: `Ciao,\n\ngrazie per averci scritto. Stiamo costruendo Jungle Rent per offrire stanze e bilocali per studenti vicino Politecnico, Lingotto e ospedali a Torino.\n\nPuoi iscriverti alla waitlist qui: https://junglerent.it/studenti\nTi avvisiamo appena le prime stanze sono disponibili.\n\nA presto,`,
  },
  investor: {
    label: "Risposta investitore",
    subject: (s) => `Re: ${s}`,
    body: `Ciao,\n\ngrazie per l'interesse in Jungle Rent.\n\nLavoriamo a operazioni immobiliari a Torino con focus su zone universitarie e ospedaliere. Per parlarne direttamente: WhatsApp +39 331 905 3037\nOppure prenota una call qui: https://junglerent.it/investitori\n\nA presto,`,
  },
  generic: {
    label: "Risposta generica",
    subject: (s) => `Re: ${s}`,
    body: `Ciao,\n\ngrazie per il tuo messaggio. Ti rispondo al più presto.\n\nA presto,`,
  },
};

const Inbox = () => {
  const { user, loading: authLoading } = useAuth();
  const [messages, setMessages] = useState<EmailMsg[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [filterClass, setFilterClass] = useState("all");
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);

  // Reply dialog
  const [replyMsg, setReplyMsg] = useState<EmailMsg | null>(null);
  const [replySubject, setReplySubject] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [sending, setSending] = useState(false);

  // Settings dialog
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [autoReply, setAutoReply] = useState(false);
  const [signature, setSignature] = useState("");

  const isAdmin = user && ADMIN_EMAILS.includes(user.email ?? "");

  async function callApi(action: string, payload: any = {}) {
    const { data, error } = await supabase.functions.invoke("gmail-admin", {
      body: { action, ...payload },
    });
    if (error) throw error;
    if (data?.error) throw new Error(data.error);
    return data;
  }

  async function loadMessages() {
    try {
      setRefreshing(true);
      const data = await callApi("list", { q: "newer_than:14d", maxResults: 50 });
      setMessages(data.messages ?? []);
    } catch (e) {
      toast.error("Errore caricamento: " + (e as Error).message);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  }

  async function loadSettings() {
    try {
      const data = await callApi("get_settings");
      if (data.settings) {
        setAutoReply(data.settings.auto_reply_enabled);
        setSignature(data.settings.signature);
      }
    } catch { /* noop */ }
  }

  useEffect(() => { if (isAdmin) { loadMessages(); loadSettings(); } }, [isAdmin]);

  async function handleTriggerParser() {
    try {
      await callApi("trigger_parser");
      toast.success("Parser avviato — ricarica tra 30 secondi");
    } catch (e) { toast.error((e as Error).message); }
  }

  function openReply(m: EmailMsg, templateKey: string) {
    const tpl = REPLY_TEMPLATES[templateKey] ?? REPLY_TEMPLATES.generic;
    setReplyMsg(m);
    setReplySubject(tpl.subject(m.subject || "(nessun oggetto)"));
    setReplyBody(tpl.body);
  }

  function extractEmail(from: string): string {
    const m = from.match(/<([^>]+)>/);
    return (m?.[1] ?? from).trim();
  }

  async function handleSend() {
    if (!replyMsg) return;
    try {
      setSending(true);
      await callApi("send", {
        to: extractEmail(replyMsg.from),
        subject: replySubject,
        body: replyBody,
        threadId: replyMsg.threadId,
        inReplyTo: replyMsg.id,
      });
      toast.success("Email inviata");
      setReplyMsg(null);
      loadMessages();
    } catch (e) { toast.error((e as Error).message); }
    finally { setSending(false); }
  }

  async function handleArchive(id: string) {
    try {
      await callApi("archive", { id });
      toast.success("Archiviata");
      setMessages((prev) => prev.filter((m) => m.id !== id));
    } catch (e) { toast.error((e as Error).message); }
  }

  async function handleMarkRead(id: string) {
    try {
      await callApi("mark_read", { id });
      setMessages((prev) => prev.map((m) => m.id === id ? { ...m, isUnread: false } : m));
    } catch (e) { toast.error((e as Error).message); }
  }

  async function handleSaveSettings() {
    try {
      await callApi("update_settings", { auto_reply_enabled: autoReply, signature });
      toast.success("Impostazioni salvate");
      setSettingsOpen(false);
    } catch (e) { toast.error((e as Error).message); }
  }

  const filtered = messages.filter((m) => {
    if (showUnreadOnly && !m.isUnread) return false;
    if (filterClass !== "all") {
      if (filterClass === "unclassified") return !m.processed;
      return m.processed?.classification === filterClass;
    }
    return true;
  });

  if (authLoading) return <div className="min-h-screen flex items-center justify-center">Loading…</div>;
  if (!user) return <Navigate to="/accedi" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <InboxIcon className="h-7 w-7" /> Inbox Gmail
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Email automaticamente classificate e convertite in lead
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={() => setSettingsOpen(true)}>
              <SettingsIcon className="h-4 w-4 mr-2" /> Impostazioni
            </Button>
            <Button variant="outline" size="sm" onClick={handleTriggerParser}>
              <RefreshCw className="h-4 w-4 mr-2" /> Esegui parser
            </Button>
            <Button size="sm" onClick={loadMessages} disabled={refreshing}>
              <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
              Ricarica
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex gap-3 mb-4 flex-wrap items-center">
          <Select value={filterClass} onValueChange={setFilterClass}>
            <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tutte le classificazioni</SelectItem>
              <SelectItem value="seller_lead">Seller lead</SelectItem>
              <SelectItem value="student_lead">Student lead</SelectItem>
              <SelectItem value="investor_lead">Investor lead</SelectItem>
              <SelectItem value="portal_notification">Portali (Immobiliare/Idealista/Subito)</SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
              <SelectItem value="other">Other</SelectItem>
              <SelectItem value="unclassified">Non classificate</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex items-center gap-2">
            <Switch id="unread" checked={showUnreadOnly} onCheckedChange={setShowUnreadOnly} />
            <Label htmlFor="unread">Solo non lette</Label>
          </div>
          <Badge variant="outline">{filtered.length} email</Badge>
        </div>

        {loading ? (
          <div className="text-center py-12 text-muted-foreground">Caricamento…</div>
        ) : filtered.length === 0 ? (
          <Card><CardContent className="py-12 text-center text-muted-foreground">
            <Mail className="h-12 w-12 mx-auto mb-3 opacity-50" />
            Nessuna email
          </CardContent></Card>
        ) : (
          <div className="space-y-2">
            {filtered.map((m) => (
              <Card key={m.id} className={m.isUnread ? "border-primary/40" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {m.isUnread && <Badge variant="default" className="text-[10px]">NUOVA</Badge>}
                        {m.processed && (
                          <Badge variant="outline" className={CLASSIFICATION_COLORS[m.processed.classification] ?? ""}>
                            {m.processed.classification} ({Math.round((m.processed.confidence ?? 0) * 100)}%)
                          </Badge>
                        )}
                        {m.processed?.lead_id && (
                          <Badge variant="outline" className="bg-emerald-50 border-emerald-300 text-emerald-700">
                            ✓ Lead creato
                          </Badge>
                        )}
                        <span className="text-xs text-muted-foreground">
                          {m.date && formatDistanceToNow(new Date(m.date), { addSuffix: true, locale: it })}
                        </span>
                      </div>
                      <div className="font-medium truncate">{m.subject || "(nessun oggetto)"}</div>
                      <div className="text-sm text-muted-foreground truncate">{m.from}</div>
                      <div className="text-sm mt-1 line-clamp-2">{m.snippet}</div>
                    </div>
                    <div className="flex gap-1 flex-wrap">
                      <Button size="sm" variant="ghost" asChild>
                        <a href={`https://mail.google.com/mail/u/0/#inbox/${m.id}`} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4" />
                        </a>
                      </Button>
                      <Select onValueChange={(v) => openReply(m, v)}>
                        <SelectTrigger className="h-8 w-[110px]"><SelectValue placeholder="Rispondi" /></SelectTrigger>
                        <SelectContent>
                          {Object.entries(REPLY_TEMPLATES).map(([k, v]) => (
                            <SelectItem key={k} value={k}>{v.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {m.isUnread && (
                        <Button size="sm" variant="ghost" onClick={() => handleMarkRead(m.id)} title="Segna come letta">
                          <CheckCheck className="h-4 w-4" />
                        </Button>
                      )}
                      <Button size="sm" variant="ghost" onClick={() => handleArchive(m.id)} title="Archivia">
                        <Archive className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>

      {/* Reply dialog */}
      <Dialog open={!!replyMsg} onOpenChange={(o) => !o && setReplyMsg(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Rispondi a {replyMsg && extractEmail(replyMsg.from)}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Oggetto</Label>
              <Input value={replySubject} onChange={(e) => setReplySubject(e.target.value)} />
            </div>
            <div>
              <Label>Corpo (la firma viene aggiunta in automatico)</Label>
              <Textarea value={replyBody} onChange={(e) => setReplyBody(e.target.value)} rows={12} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyMsg(null)}>Annulla</Button>
            <Button onClick={handleSend} disabled={sending}>
              <Send className="h-4 w-4 mr-2" />{sending ? "Invio…" : "Invia"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Settings dialog */}
      <Dialog open={settingsOpen} onOpenChange={setSettingsOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Impostazioni Gmail</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-reply">Auto-reply attivo</Label>
                <p className="text-xs text-muted-foreground">Risposta automatica ai lead classificati</p>
              </div>
              <Switch id="auto-reply" checked={autoReply} onCheckedChange={setAutoReply} />
            </div>
            <div>
              <Label>Firma email</Label>
              <Textarea value={signature} onChange={(e) => setSignature(e.target.value)} rows={5} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSettingsOpen(false)}>Annulla</Button>
            <Button onClick={handleSaveSettings}>Salva</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Inbox;
