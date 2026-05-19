import { useEffect, useState } from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Mail, Phone, MessageCircle, PhoneCall, Calendar as CalendarIcon, StickyNote,
  Users, RotateCcw, Loader2,
} from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";
import { format, formatDistanceToNow } from "date-fns";
import { it } from "date-fns/locale";
import {
  Lead, LeadInteraction, LeadStatus, LeadPriority,
  STATUS_BADGE, STATUS_LABEL, STATUS_ORDER, PRIORITY_LABEL, InteractionKind,
} from "./types";

interface Props {
  lead: Lead | null;
  onClose: () => void;
  onUpdated: () => void;
}

const KIND_ICON: Record<InteractionKind, React.ComponentType<{ className?: string }>> = {
  note: StickyNote,
  call: PhoneCall,
  whatsapp: MessageCircle,
  email: Mail,
  meeting: Users,
  status_change: RotateCcw,
  followup: CalendarIcon,
};

export function LeadDetailDrawer({ lead, onClose, onUpdated }: Props) {
  const [detail, setDetail] = useState<{ lead: Lead; interactions: LeadInteraction[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [newKind, setNewKind] = useState<InteractionKind>("note");
  const [newContent, setNewContent] = useState("");
  const [followupDate, setFollowupDate] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!lead) return;
    void load(lead.id);
    setFollowupDate(
      lead.next_followup_at
        ? format(new Date(lead.next_followup_at), "yyyy-MM-dd'T'HH:mm")
        : ""
    );
  }, [lead?.id]);

  async function load(id: string) {
    setLoading(true);
    const { data, error } = await supabase.functions.invoke("admin-leads", {
      body: { action: "get_detail", lead_id: id },
    });
    if (error) {
      toast.error("Errore caricamento dettaglio");
    } else {
      setDetail(data);
    }
    setLoading(false);
  }

  async function call(action: string, body: Record<string, unknown>) {
    setSaving(true);
    const { error } = await supabase.functions.invoke("admin-leads", {
      body: { action, ...body },
    });
    setSaving(false);
    if (error) {
      toast.error("Errore: " + error.message);
      return false;
    }
    return true;
  }

  async function updateField(patch: Partial<Lead>) {
    if (!lead) return;
    const ok = await call("update_lead", { lead_id: lead.id, patch });
    if (ok) {
      toast.success("Aggiornato");
      await load(lead.id);
      onUpdated();
    }
  }

  async function addInteraction() {
    if (!lead || !newContent.trim()) {
      toast.error("Scrivi qualcosa");
      return;
    }
    const direction = ["call", "whatsapp", "email", "meeting"].includes(newKind)
      ? "outbound"
      : "system";
    const ok = await call("add_interaction", {
      lead_id: lead.id,
      kind: newKind,
      direction,
      content: newContent.trim(),
    });
    if (ok) {
      setNewContent("");
      toast.success("Interazione aggiunta");
      await load(lead.id);
      onUpdated();
    }
  }

  async function saveFollowup() {
    if (!lead) return;
    const iso = followupDate ? new Date(followupDate).toISOString() : null;
    await updateField({ next_followup_at: iso });
  }

  function whatsappLink(phone: string | null) {
    if (!phone) return null;
    const cleaned = phone.replace(/[^\d+]/g, "");
    return `https://wa.me/${cleaned.replace(/^\+/, "")}`;
  }

  const open = !!lead;
  const current = detail?.lead ?? lead;

  return (
    <Sheet open={open} onOpenChange={(o) => !o && onClose()}>
      <SheetContent className="w-full sm:max-w-xl overflow-y-auto">
        {current && (
          <>
            <SheetHeader className="space-y-2">
              <SheetTitle className="flex items-center gap-2">
                <span>{current.name || current.email}</span>
                <Badge variant="secondary" className="capitalize text-xs">{current.lead_type}</Badge>
              </SheetTitle>
              <div className="flex flex-wrap gap-2 items-center">
                <Select
                  value={current.status}
                  onValueChange={(v) => updateField({ status: v as LeadStatus })}
                >
                  <SelectTrigger className="h-8 w-[160px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_ORDER.map((s) => (
                      <SelectItem key={s} value={s}>
                        <Badge variant="outline" className={`text-[10px] ${STATUS_BADGE[s]}`}>
                          {STATUS_LABEL[s]}
                        </Badge>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={current.priority}
                  onValueChange={(v) => updateField({ priority: v as LeadPriority })}
                >
                  <SelectTrigger className="h-8 w-[120px] text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high">★ {PRIORITY_LABEL.high}</SelectItem>
                    <SelectItem value="medium">{PRIORITY_LABEL.medium}</SelectItem>
                    <SelectItem value="low">{PRIORITY_LABEL.low}</SelectItem>
                  </SelectContent>
                </Select>
                {saving && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
              </div>
            </SheetHeader>

            {/* Quick contact info + actions */}
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${current.email}`} className="hover:underline">{current.email}</a>
              </div>
              {current.phone && (
                <div className="flex items-center gap-2 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <a href={`tel:${current.phone}`} className="hover:underline">{current.phone}</a>
                </div>
              )}
              <div className="flex flex-wrap gap-2 pt-2">
                {current.phone && (
                  <Button asChild size="sm" variant="outline">
                    <a href={whatsappLink(current.phone)!} target="_blank" rel="noreferrer">
                      <MessageCircle className="h-3.5 w-3.5 mr-1" /> WhatsApp
                    </a>
                  </Button>
                )}
                <Button asChild size="sm" variant="outline">
                  <a href={`mailto:${current.email}`}>
                    <Mail className="h-3.5 w-3.5 mr-1" /> Email
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => updateField({ last_contact_at: new Date().toISOString() })}
                >
                  <ArrowUpFromLine className="h-3.5 w-3.5 mr-1" /> Marca contattato
                </Button>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Follow-up scheduler */}
            <Card className="p-3 space-y-2">
              <div className="flex items-center gap-2 text-sm font-medium">
                <CalendarIcon className="h-4 w-4" /> Prossimo follow-up
              </div>
              <div className="flex gap-2">
                <Input
                  type="datetime-local"
                  value={followupDate}
                  onChange={(e) => setFollowupDate(e.target.value)}
                  className="h-9 text-xs"
                />
                <Button size="sm" onClick={saveFollowup}>Salva</Button>
                {current.next_followup_at && (
                  <Button size="sm" variant="ghost" onClick={() => { setFollowupDate(""); updateField({ next_followup_at: null }); }}>
                    ✕
                  </Button>
                )}
              </div>
              {current.last_contact_at && (
                <p className="text-[11px] text-muted-foreground">
                  Ultimo contatto: {formatDistanceToNow(new Date(current.last_contact_at), { addSuffix: true, locale: it })}
                </p>
              )}
            </Card>

            <Separator className="my-4" />

            {/* Add interaction */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Aggiungi interazione</p>
              <div className="flex gap-2">
                <Select value={newKind} onValueChange={(v) => setNewKind(v as InteractionKind)}>
                  <SelectTrigger className="h-9 w-[130px] text-xs"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="note">Nota</SelectItem>
                    <SelectItem value="call">Chiamata</SelectItem>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="meeting">Meeting</SelectItem>
                  </SelectContent>
                </Select>
                <Textarea
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  placeholder="Cosa è successo?"
                  className="min-h-[60px] text-sm"
                />
              </div>
              <Button size="sm" onClick={addInteraction} disabled={!newContent.trim()}>
                Salva interazione
              </Button>
            </div>

            <Separator className="my-4" />

            {/* Timeline */}
            <div className="space-y-2">
              <p className="text-sm font-medium">Timeline ({detail?.interactions.length ?? 0})</p>
              {loading && <p className="text-xs text-muted-foreground">Caricamento…</p>}
              {!loading && (detail?.interactions.length ?? 0) === 0 && (
                <p className="text-xs text-muted-foreground">Nessuna interazione</p>
              )}
              <div className="space-y-2">
                {detail?.interactions.map((i) => {
                  const Icon = KIND_ICON[i.kind] ?? StickyNote;
                  return (
                    <div key={i.id} className="flex gap-3 text-sm border-l-2 border-border pl-3 py-1">
                      <Icon className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-baseline justify-between gap-2">
                          <span className="text-xs font-medium capitalize">{i.kind.replace("_", " ")}</span>
                          <span className="text-[10px] text-muted-foreground whitespace-nowrap">
                            {formatDistanceToNow(new Date(i.created_at), { addSuffix: true, locale: it })}
                          </span>
                        </div>
                        {i.content && <p className="text-xs text-foreground/80 mt-0.5 whitespace-pre-wrap">{i.content}</p>}
                        {i.created_by && (
                          <p className="text-[10px] text-muted-foreground mt-0.5">{i.created_by}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <Separator className="my-4" />

            {/* Meta panel */}
            <details className="text-xs">
              <summary className="cursor-pointer text-muted-foreground hover:text-foreground">
                Dettagli tecnici (source, UTM, metadata)
              </summary>
              <div className="mt-2 space-y-1 text-muted-foreground">
                <p><span className="font-medium text-foreground">Source:</span> {current.source}</p>
                <p><span className="font-medium text-foreground">Created:</span> {format(new Date(current.created_at), "dd/MM/yyyy HH:mm")}</p>
                {current.utm_source && <p><span className="font-medium text-foreground">UTM:</span> {current.utm_source} / {current.utm_medium ?? "—"} / {current.utm_campaign ?? "—"}</p>}
                {current.metadata && Object.keys(current.metadata).length > 0 && (
                  <pre className="bg-muted/30 p-2 rounded text-[10px] overflow-x-auto">{JSON.stringify(current.metadata, null, 2)}</pre>
                )}
              </div>
            </details>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
