import { useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { Loader2, Upload, X, CheckCircle, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { getUTMParams } from "@/hooks/useUTMTracking";
import { supabase } from "@/integrations/supabase/client";

const MAX_PHOTOS = 5;
const MAX_FILE_SIZE = 10 * 1024 * 1024;
const ACCEPTED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "heic", "heif"];
const ACCEPTED_MIME = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic", "image/heif"];
const WHATSAPP_NUMBER = "393319053037";

type ConditionValue = "abitabile" | "da_ristrutturare" | "da_rifare";
type SituationValue = "libero" | "inquilino_scadenza" | "inquilino_indeterminato" | "eredita" | "altro";

const CONDITIONS: { value: ConditionValue; label: string }[] = [
  { value: "abitabile", label: "Abitabile" },
  { value: "da_ristrutturare", label: "Da ristrutturare" },
  { value: "da_rifare", label: "Da rifare" },
];

const SITUATIONS: { value: SituationValue; label: string }[] = [
  { value: "libero", label: "Libero" },
  { value: "inquilino_scadenza", label: "Inquilino con scadenza" },
  { value: "inquilino_indeterminato", label: "Inquilino a tempo indeterminato" },
  { value: "eredita", label: "Eredità" },
  { value: "altro", label: "Altro" },
];

// Mappa la situazione del form sulle colonne del database
const mapSituation = (value: SituationValue, condition: ConditionValue) => {
  if (value === "eredita") return "eredita";
  if (value === "inquilino_scadenza" || value === "inquilino_indeterminato") return "inquilino";
  if (value === "libero") return condition === "abitabile" ? "nessuna" : "da_ristrutturare";
  return "altro";
};

const mapTenantStatus = (value: SituationValue) => {
  if (value === "inquilino_scadenza") return "inquilino_scadenza";
  if (value === "inquilino_indeterminato") return "inquilino_indeterminato";
  if (value === "libero") return "libero";
  return null;
};

const fileExtension = (name: string) => (name.split(".").pop() ?? "").toLowerCase();

const isAcceptedFile = (file: File) => {
  const ext = fileExtension(file.name);
  if (ACCEPTED_MIME.includes(file.type.toLowerCase())) return true;
  // iOS espone spesso un type vuoto o sconosciuto per HEIC: accetta per estensione
  return ACCEPTED_EXTENSIONS.includes(ext);
};

const normalizePhone = (value: string) => value.replace(/[^\d+]/g, "");

const formatThousands = (value: string) => {
  const digits = value.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("it-IT");
};

interface UploadedPhoto {
  file: File;
  preview: string;
}

const fieldClass = "h-12 text-base";
const selectClass =
  "flex h-12 w-full rounded-xl border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export const VendiLeadForm = () => {
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [sqm, setSqm] = useState("");
  const [floor, setFloor] = useState("");
  const [hasElevator, setHasElevator] = useState<"si" | "no" | "">("");
  const [condition, setCondition] = useState<ConditionValue>("abitabile");
  const [situation, setSituation] = useState<SituationValue>("libero");
  const [leaseEnd, setLeaseEnd] = useState("");
  const [askingPrice, setAskingPrice] = useState("");
  const [message, setMessage] = useState("");
  const [photos, setPhotos] = useState<UploadedPhoto[]>([]);
  const [consent, setConsent] = useState(false);
  const [website, setWebsite] = useState(""); // honeypot

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{ done: number; total: number } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [summary, setSummary] = useState<{ address: string; sqm: string }>({ address: "", sqm: "" });

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const next: UploadedPhoto[] = [];
      Array.from(files).forEach((file) => {
        if (!isAcceptedFile(file)) {
          toast({ title: "Formato non supportato", description: `${file.name}: usa JPG, PNG, WebP o HEIC`, variant: "destructive" });
          return;
        }
        if (file.size > MAX_FILE_SIZE) {
          toast({ title: "File troppo grande", description: `${file.name}: massimo 10 MB`, variant: "destructive" });
          return;
        }
        next.push({ file, preview: URL.createObjectURL(file) });
      });
      setPhotos((prev) => [...prev, ...next].slice(0, MAX_PHOTOS));
    },
    [toast]
  );

  const removePhoto = (index: number) => {
    setPhotos((prev) => {
      const target = prev[index];
      if (target) URL.revokeObjectURL(target.preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const focusField = (key: string) => {
    const idMap: Record<string, string> = {
      address: "vendi-indirizzo",
      sqm: "vendi-mq",
      leaseEnd: "vendi-scadenza",
      name: "vendi-nome",
      contact: "vendi-telefono",
      email: "vendi-email",
      consent: "vendi-consenso",
    };
    const el = document.getElementById(idMap[key] ?? "");
    if (el) {
      el.scrollIntoView({ block: "center" });
      (el as HTMLElement).focus({ preventScroll: true });
    }
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (address.trim().length < 3) next.address = "Scrivi l'indirizzo o almeno la zona";
    const sqmValue = parseInt(sqm, 10);
    if (!sqm || Number.isNaN(sqmValue) || sqmValue < 10 || sqmValue > 1000) next.sqm = "Scrivi i metri quadri (tra 10 e 1000)";
    if (situation === "inquilino_scadenza" && !leaseEnd) next.leaseEnd = "Indica la scadenza del contratto";
    if (name.trim().length < 2) next.name = "Scrivi il tuo nome";
    const hasPhone = normalizePhone(phone).length >= 8;
    const hasEmail = email.trim().length > 0;
    if (!hasPhone && !hasEmail) next.contact = "Lascia almeno un telefono o un'email";
    if (hasEmail && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Controlla l'indirizzo email";
    if (!consent) next.consent = "Serve il consenso per poterti ricontattare";
    setErrors(next);
    const order = ["address", "sqm", "leaseEnd", "name", "contact", "email", "consent"];
    const first = order.find((k) => next[k]);
    if (first) focusField(first);
    return Object.keys(next).length === 0;
  };

  const uploadPhotos = async (folder: string) => {
    setUploadProgress({ done: 0, total: photos.length });
    const results = await Promise.all(
      photos.map(async (photo) => {
        const rawExt = fileExtension(photo.file.name);
        const ext = ACCEPTED_EXTENSIONS.includes(rawExt) ? rawExt : "jpg";
        const path = `${folder}/foto/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
        const { data, error } = await supabase.storage.from("property-photos").upload(path, photo.file);
        setUploadProgress((prev) => (prev ? { ...prev, done: prev.done + 1 } : prev));
        if (error || !data) {
          console.error("Upload foto fallito:", error);
          return null;
        }
        const { data: urlData } = supabase.storage.from("property-photos").getPublicUrl(path);
        return { url: urlData.publicUrl, fileName: photo.file.name };
      })
    );
    setUploadProgress(null);
    return results.filter((r): r is { url: string; fileName: string } => r !== null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!validate()) return;
    setIsSubmitting(true);

    // Honeypot: bot rilevato, nessun inserimento
    if (website.trim().length > 0) {
      setSummary({ address: address.trim(), sqm });
      setIsSubmitted(true);
      setIsSubmitting(false);
      return;
    }

    try {
      const utm = getUTMParams();
      const fbclid = new URLSearchParams(window.location.search).get("fbclid");
      const utmData = { ...utm, ...(fbclid ? { fbclid } : {}) };

      const folder = `lead-${Date.now()}-${Math.random().toString(36).substring(7)}`;
      const uploadedPhotos = photos.length > 0 ? await uploadPhotos(folder) : [];
      if (photos.length > 0 && uploadedPhotos.length < photos.length) {
        toast({
          title: "Alcune foto non sono state caricate",
          description: "Ti ricontattiamo comunque: se vuoi, inviacele su WhatsApp.",
        });
      }

      const dbSituation = mapSituation(situation, condition);
      const tenantStatus = mapTenantStatus(situation);
      const priceValue = askingPrice ? parseInt(askingPrice.replace(/\D/g, ""), 10) : null;

      const leadId = crypto.randomUUID();
      const { error } = await supabase.from("seller_leads").insert([
        {
          id: leadId,
          name: name.trim(),
          email: email.trim() || null,
          phone: normalizePhone(phone) || null,
          property_address: address.trim(),
          property_sqm: parseInt(sqm, 10),
          property_condition: condition,
          floor: floor.trim() || null,
          has_elevator: hasElevator === "" ? null : hasElevator === "si",
          situation: dbSituation,
          tenant_status: tenantStatus,
          tenant_lease_end: situation === "inquilino_scadenza" && leaseEnd ? leaseEnd : null,
          asking_price: priceValue && !Number.isNaN(priceValue) ? priceValue : null,
          message: message.trim() || null,
          privacy_consent: true,
          consent_at: new Date().toISOString(),
          photos: uploadedPhotos as unknown as null,
          source: "vendi",
          utm_data: Object.keys(utmData).length > 0 ? (utmData as unknown as null) : null,
        },
      ]);

      if (error) throw error;

      // Notifica a Lorenzo + conferma al proprietario (server-side, lead verificato)
      supabase.functions
        .invoke("notify-vendi-lead", { body: { leadId } })
        .catch((err) => console.error("Invio email fallito:", err));
      photos.forEach((p) => URL.revokeObjectURL(p.preview));
      setPhotos([]);
      setSummary({ address: address.trim(), sqm });
      setIsSubmitted(true);
    } catch (err) {
      console.error("Invio lead /vendi fallito:", err);
      toast({
        title: "Invio non riuscito",
        description: "Riprova tra poco oppure scrivici su WhatsApp.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
      setUploadProgress(null);
    }
  };

  if (isSubmitted) {
    const waText = encodeURIComponent(
      `Ciao Lorenzo, ho appena compilato il modulo per vendere il mio appartamento in ${summary.address}.`
    );
    return (
      <div className="rounded-2xl border border-primary/20 bg-card p-8 text-center" role="status">
        <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.5} />
        <p className="text-lg text-foreground">
          Ricevuto. Ti rispondiamo entro 48 ore con un range di prezzo indicativo.
        </p>
        <p className="mt-3 text-sm text-muted-foreground">
          {summary.address}
          {summary.sqm ? ` · ${summary.sqm} m²` : ""}
        </p>
        <Button asChild variant="outline" size="lg" className="mt-6 w-full sm:w-auto">
          <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle className="w-4 h-4 mr-2" aria-hidden="true" />
            Preferisci parlarne subito? Scrivici su WhatsApp
          </a>
        </Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-10" noValidate>
      <fieldset className="space-y-5">
        <legend className="font-display text-2xl font-normal">L'appartamento</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2 sm:col-span-2">
            <Label htmlFor="vendi-indirizzo">Indirizzo o zona *</Label>
            <Input id="vendi-indirizzo" className={fieldClass} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Via Nizza 100 oppure San Salvario" />
            {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendi-mq">Metri quadri *</Label>
            <Input id="vendi-mq" type="number" inputMode="numeric" className={fieldClass} value={sqm} onChange={(e) => setSqm(e.target.value)} />
            {errors.sqm && <p className="text-sm text-destructive">{errors.sqm}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendi-situazione">Situazione</Label>
            <select id="vendi-situazione" className={selectClass} value={situation} onChange={(e) => setSituation(e.target.value as SituationValue)}>
              {SITUATIONS.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {situation === "inquilino_scadenza" && (
            <div className="space-y-2">
              <Label htmlFor="vendi-scadenza">Scadenza contratto</Label>
              <Input id="vendi-scadenza" type="date" className={fieldClass} value={leaseEnd} onChange={(e) => setLeaseEnd(e.target.value)} />
              {errors.leaseEnd && <p className="text-sm text-destructive">{errors.leaseEnd}</p>}
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="vendi-stato">Stato</Label>
            <select id="vendi-stato" className={selectClass} value={condition} onChange={(e) => setCondition(e.target.value as ConditionValue)}>
              {CONDITIONS.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendi-piano">Piano e ascensore (facoltativo)</Label>
            <div className="flex gap-3">
              <Input id="vendi-piano" className={`${fieldClass} flex-1`} value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="3" />
              <select
                aria-label="Ascensore"
                className={`${selectClass} w-40`}
                value={hasElevator}
                onChange={(e) => setHasElevator(e.target.value as "si" | "no" | "")}
              >
                <option value="">Ascensore</option>
                <option value="si">Con ascensore</option>
                <option value="no">Senza ascensore</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendi-prezzo">Prezzo che hai in mente (facoltativo)</Label>
            <Input
              id="vendi-prezzo"
              inputMode="numeric"
              className={fieldClass}
              value={askingPrice}
              onChange={(e) => setAskingPrice(e.target.value)}
              onBlur={() => setAskingPrice((v) => formatThousands(v))}
              placeholder="95.000"
            />
          </div>
        </div>

        <div className="space-y-3">
          <Label htmlFor="vendi-foto">Foto (facoltativo, massimo {MAX_PHOTOS})</Label>
          <label
            htmlFor="vendi-foto"
            className="flex items-center justify-center gap-2 h-24 rounded-xl border border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/40 transition-colors text-base text-muted-foreground"
          >
            <Upload className="w-4 h-4" aria-hidden="true" />
            Carica le foto dell'appartamento
          </label>
          <input
            id="vendi-foto"
            type="file"
            accept="image/*,.heic,.heif"
            multiple
            className="sr-only"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={photos.length >= MAX_PHOTOS}
          />
          {photos.length > 0 && (
            <ul className="flex flex-wrap gap-3">
              {photos.map((photo, index) => (
                <li key={photo.preview} className="relative">
                  <img src={photo.preview} alt={`Foto ${index + 1}`} className="w-20 h-20 object-cover rounded-lg border border-border" />
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border border-border flex items-center justify-center"
                    aria-label={`Rimuovi foto ${index + 1}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-display text-2xl font-normal">Come ti ricontattiamo</legend>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="vendi-nome">Nome *</Label>
            <Input id="vendi-nome" className={fieldClass} value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
            {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendi-telefono">Telefono</Label>
            <Input
              id="vendi-telefono"
              type="tel"
              inputMode="tel"
              className={fieldClass}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              autoComplete="tel"
              placeholder="333 000 0000"
            />
            {errors.contact && <p className="text-sm text-destructive">{errors.contact}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="vendi-email">Email</Label>
            <Input id="vendi-email" type="email" className={fieldClass} value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="vendi-messaggio">Messaggio (facoltativo)</Label>
          <Textarea id="vendi-messaggio" rows={2} className="text-base" value={message} onChange={(e) => setMessage(e.target.value)} />
        </div>

        {/* Honeypot anti-spam: invisibile agli utenti */}
        <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
          <label htmlFor="vendi-website">Sito web</label>
          <input id="vendi-website" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
        </div>

        <div className="flex items-start gap-3">
          <Checkbox id="vendi-consenso" checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-1" />
          <Label htmlFor="vendi-consenso" className="text-sm font-normal leading-relaxed text-muted-foreground">
            Acconsento al trattamento dei dati da parte di Jungle Rent S.r.l. per ricontattarmi in merito alla valutazione.{" "}
            <Link to="/privacy" className="text-primary underline underline-offset-4">Informativa privacy</Link>
          </Label>
        </div>
        {errors.consent && <p className="text-sm text-destructive">{errors.consent}</p>}

        <Button type="submit" size="lg" variant="premium" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {uploadProgress
                ? `Caricamento foto ${Math.min(uploadProgress.done + 1, uploadProgress.total)}/${uploadProgress.total}`
                : "Invio in corso"}
            </>
          ) : (
            "Chiedi una valutazione gratuita"
          )}
        </Button>
      </fieldset>
    </form>
  );
};

export default VendiLeadForm;
