import { useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, Upload, X, CheckCircle } from "lucide-react";
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
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/heic"];

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

interface UploadedPhoto {
  file: File;
  preview: string;
}

const selectClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export const VendiLeadForm = () => {
  const { toast } = useToast();
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

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFiles = useCallback(
    (files: FileList | null) => {
      if (!files) return;
      const next: UploadedPhoto[] = [];
      Array.from(files).forEach((file) => {
        if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
          toast({ title: "Formato non supportato", description: `${file.name}: usa JPG, PNG o WebP`, variant: "destructive" });
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

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = "Inserisci il tuo nome";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) next.email = "Inserisci un indirizzo email valido";
    if (address.trim().length < 3) next.address = "Indica l'indirizzo o almeno la zona";
    const sqmValue = parseInt(sqm, 10);
    if (!sqm || Number.isNaN(sqmValue) || sqmValue < 10 || sqmValue > 1000) next.sqm = "Inserisci i metri quadri (tra 10 e 1000)";
    if (situation === "inquilino_scadenza" && !leaseEnd) next.leaseEnd = "Indica la scadenza del contratto";
    if (!consent) next.consent = "Serve il consenso per poterti ricontattare";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const uploadPhotos = async (folder: string) => {
    const uploaded: Array<{ url: string; fileName: string }> = [];
    for (const photo of photos) {
      const rawExt = (photo.file.name.split(".").pop() ?? "").toLowerCase();
      const ext = ["jpg", "jpeg", "png", "webp", "heic", "heif"].includes(rawExt) ? rawExt : "jpg";
      const path = `${folder}/foto/${Date.now()}-${Math.random().toString(36).substring(7)}.${ext}`;
      const { data, error } = await supabase.storage.from("property-photos").upload(path, photo.file);
      if (error || !data) {
        console.error("Upload foto fallito:", error);
        continue;
      }
      const { data: urlData } = supabase.storage.from("property-photos").getPublicUrl(path);
      uploaded.push({ url: urlData.publicUrl, fileName: photo.file.name });
    }
    return uploaded;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

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
          email: email.trim(),
          phone: phone.trim() || null,
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
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-primary/20 bg-card p-8 text-center"
        role="status"
      >
        <CheckCircle className="w-10 h-10 text-primary mx-auto mb-4" strokeWidth={1.5} />
        <p className="text-lg text-foreground">
          Ricevuto. Ti rispondiamo entro 48 ore con un range di prezzo indicativo.
        </p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      <div className="grid sm:grid-cols-2 gap-5">
        <div className="space-y-2">
          <Label htmlFor="vendi-nome">Nome *</Label>
          <Input id="vendi-nome" value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
          {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendi-email">Email *</Label>
          <Input id="vendi-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
          {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendi-telefono">Telefono</Label>
          <Input id="vendi-telefono" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendi-indirizzo">Indirizzo o zona *</Label>
          <Input id="vendi-indirizzo" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Via Nizza 100 oppure San Salvario" />
          {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendi-mq">Metri quadri *</Label>
          <Input id="vendi-mq" type="number" inputMode="numeric" value={sqm} onChange={(e) => setSqm(e.target.value)} />
          {errors.sqm && <p className="text-sm text-destructive">{errors.sqm}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendi-piano">Piano</Label>
          <div className="flex gap-3">
            <Input id="vendi-piano" value={floor} onChange={(e) => setFloor(e.target.value)} placeholder="3" className="flex-1" />
            <select
              aria-label="Ascensore"
              className={`${selectClass} w-36`}
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
          <Label htmlFor="vendi-stato">Stato</Label>
          <select
            id="vendi-stato"
            className={selectClass}
            value={condition}
            onChange={(e) => setCondition(e.target.value as ConditionValue)}
          >
            {CONDITIONS.map((c) => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="vendi-situazione">Situazione</Label>
          <select
            id="vendi-situazione"
            className={selectClass}
            value={situation}
            onChange={(e) => setSituation(e.target.value as SituationValue)}
          >
            {SITUATIONS.map((s) => (
              <option key={s.value} value={s.value}>{s.label}</option>
            ))}
          </select>
        </div>
        {situation === "inquilino_scadenza" && (
          <div className="space-y-2">
            <Label htmlFor="vendi-scadenza">Scadenza contratto</Label>
            <Input id="vendi-scadenza" type="date" value={leaseEnd} onChange={(e) => setLeaseEnd(e.target.value)} />
            {errors.leaseEnd && <p className="text-sm text-destructive">{errors.leaseEnd}</p>}
          </div>
        )}
        <div className="space-y-2">
          <Label htmlFor="vendi-prezzo">Prezzo che hai in mente</Label>
          <Input id="vendi-prezzo" inputMode="numeric" value={askingPrice} onChange={(e) => setAskingPrice(e.target.value)} placeholder="95000" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="vendi-messaggio">Messaggio</Label>
        <Textarea id="vendi-messaggio" rows={4} value={message} onChange={(e) => setMessage(e.target.value)} />
      </div>

      <div className="space-y-3">
        <Label htmlFor="vendi-foto">Foto (massimo {MAX_PHOTOS})</Label>
        <label
          htmlFor="vendi-foto"
          className="flex items-center justify-center gap-2 h-24 rounded-xl border border-dashed border-border bg-muted/30 cursor-pointer hover:border-primary/40 transition-colors text-sm text-muted-foreground"
        >
          <Upload className="w-4 h-4" aria-hidden="true" />
          Carica le foto dell'appartamento
        </label>
        <input
          id="vendi-foto"
          type="file"
          accept={ACCEPTED_IMAGE_TYPES.join(",")}
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
            Invio in corso
          </>
        ) : (
          "Chiedi una valutazione gratuita"
        )}
      </Button>
    </form>
  );
};

export default VendiLeadForm;
