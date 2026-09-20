import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Loader2, CheckCircle } from "lucide-react";
import { Seo } from "@/components/Seo";
import { SceneReveal } from "@/components/home/SceneReveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useLeadCapture } from "@/hooks/useLeadCapture";
import { FORMSPREE_ENDPOINTS } from "@/constants/formspree";

const ZONES = [
  { value: "lingotto-nizza-millefonti", it: "Lingotto / Nizza Millefonti", en: "Lingotto / Nizza Millefonti" },
  { value: "san-salvario", it: "San Salvario", en: "San Salvario" },
  { value: "vanchiglia", it: "Vanchiglia", en: "Vanchiglia" },
  { value: "crocetta", it: "Crocetta", en: "Crocetta" },
  { value: "aurora", it: "Aurora", en: "Aurora" },
  { value: "cenisia-san-paolo", it: "Cenisia / San Paolo", en: "Cenisia / San Paolo" },
  { value: "santa-rita", it: "Santa Rita", en: "Santa Rita" },
  { value: "centro", it: "Centro", en: "City centre" },
  { value: "indifferente", it: "Indifferente", en: "No preference" },
];

const ROOM_TYPES = [
  { value: "singola", it: "Singola", en: "Single room" },
  { value: "doppia", it: "Doppia", en: "Double room" },
  { value: "posto-letto", it: "Posto letto", en: "Bed in shared room" },
];

const BUDGETS = [
  { value: "fino-350", it: "Fino a 350 €", en: "Up to €350" },
  { value: "350-450", it: "350–450 €", en: "€350–450" },
  { value: "450-550", it: "450–550 €", en: "€450–550" },
  { value: "oltre-550", it: "Oltre 550 €", en: "Over €550" },
];

const selectClass =
  "flex h-11 w-full rounded-xl border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50";

const Students = () => {
  const { t, i18n } = useTranslation();
  const isItalian = !i18n.language.startsWith("en");
  const { submitLead, isSubmitting } = useLeadCapture();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zones, setZones] = useState<string[]>([]);
  const [roomType, setRoomType] = useState("singola");
  const [budget, setBudget] = useState("350-450");
  const [moveIn, setMoveIn] = useState("");
  const [university, setUniversity] = useState("");
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  const months = useMemo(() => {
    const out: { value: string; label: string }[] = [];
    const now = new Date();
    const fmt = new Intl.DateTimeFormat(isItalian ? "it-IT" : "en-GB", { month: "long", year: "numeric" });
    for (let i = 0; i < 12; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() + i, 1);
      out.push({
        value: `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`,
        label: fmt.format(d),
      });
    }
    return out;
  }, [isItalian]);

  const toggleZone = (value: string) => {
    setZones((prev) => (prev.includes(value) ? prev.filter((z) => z !== value) : [...prev, value]));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, string> = {};
    if (name.trim().length < 2) next.name = isItalian ? "Inserisci il tuo nome" : "Enter your name";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
      next.email = isItalian ? "Inserisci un'email valida" : "Enter a valid email";
    if (!consent) next.consent = t("common.consent.error");
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    const result = await submitLead(
      {
        email,
        name,
        phone: phone || undefined,
        source: "studenti-lista",
        leadType: "student",
        metadata: {
          zones,
          room_type: roomType,
          budget,
          move_in: moveIn || months[0]?.value,
          university: university.trim() || null,
          lang: isItalian ? "it" : "en",
        },
      },
      {
        endpoint: FORMSPREE_ENDPOINTS.student,
        subject: "Nuova richiesta stanza — lista studenti",
        extraFields: {
          name,
          phone,
          zones: zones.join(", "),
          room_type: roomType,
          budget,
          move_in: moveIn,
          university,
        },
      },
    );

    if (result.success) setDone(true);
    else
      setErrors({
        form: isItalian ? "Invio non riuscito, riprova." : "Submission failed, please try again.",
      });
  };

  const links = [
    { to: "/strumenti/aule-studio-torino", label: isItalian ? "Aule studio" : "Study spaces" },
    { to: "/strumenti/dove-mangiare-torino", label: isItalian ? "Dove mangiare" : "Cheap eats" },
    { to: "/strumenti/sportelli-studenti-torino", label: isItalian ? "Sportelli" : "Student desks" },
    { to: "/strumenti/palestre-torino-studenti", label: isItalian ? "Palestre" : "Gyms" },
  ];

  return (
    <>
      <Seo
        title={isItalian ? "Cerchi una stanza a Torino? | Jungle Rent" : "Looking for a room in Turin? | Jungle Rent"}
        description={
          isItalian
            ? "Lascia i tuoi criteri: ti avvisiamo quando una stanza vicino alle università è pronta, prima che finisca online."
            : "Leave us your criteria: we let you know when a room near the universities is ready, before it goes online."
        }
        canonical="/studenti"
        locale={isItalian ? "it_IT" : "en_US"}
      />
      <main className="mx-auto w-full max-w-3xl px-5 py-16 md:py-24">
        <SceneReveal as="section">
          <h1 className="font-display text-4xl font-normal tracking-tight md:text-5xl">
            {isItalian ? "Cerchi una stanza a Torino?" : "Looking for a room in Turin?"}
          </h1>
          <p className="mt-6 text-muted-foreground">
            {isItalian
              ? "Compriamo e sistemiamo appartamenti vicino alle università e li affittiamo a studenti."
              : "We buy and renovate apartments near the universities and rent them to students."}
          </p>
          <p className="mt-2 text-muted-foreground">
            {isItalian
              ? "Lasciaci i tuoi criteri: quando una stanza è pronta, lo sai prima che finisca online."
              : "Leave us your criteria: when a room is ready, you hear about it before it goes online."}
          </p>
        </SceneReveal>

        <SceneReveal as="section" className="mt-12">
          {done ? (
            <div className="rounded-2xl border border-border/60 bg-primary/10 p-6">
              <CheckCircle className="h-6 w-6 text-primary" aria-hidden="true" />
              <h2 className="mt-3 font-display text-2xl font-normal">
                {isItalian ? "Sei in lista." : "You're on the list."}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {isItalian
                  ? "Ti scriviamo solo quando c'è una stanza che corrisponde ai tuoi criteri."
                  : "We only write when there is a room matching your criteria."}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border/60 p-6 shadow-[var(--shadow-card)]">
              <h2 className="font-display text-2xl font-normal">
                {isItalian ? "Cerco una stanza" : "I'm looking for a room"}
              </h2>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="st-name">{isItalian ? "Nome" : "Name"}</Label>
                  <Input id="st-name" value={name} onChange={(e) => setName(e.target.value)} className="mt-1" />
                  {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                </div>
                <div>
                  <Label htmlFor="st-email">Email</Label>
                  <Input id="st-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" />
                  {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                </div>
                <div>
                  <Label htmlFor="st-phone">{isItalian ? "Telefono (opzionale)" : "Phone (optional)"}</Label>
                  <Input id="st-phone" value={phone} onChange={(e) => setPhone(e.target.value)} className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="st-uni">{isItalian ? "Università o ente (opzionale)" : "University or institution (optional)"}</Label>
                  <Input id="st-uni" value={university} onChange={(e) => setUniversity(e.target.value)} className="mt-1" maxLength={120} />
                </div>
              </div>

              <fieldset>
                <legend className="text-sm font-medium">{isItalian ? "Zona preferita" : "Preferred area"}</legend>
                <div className="mt-2 grid gap-2 sm:grid-cols-2">
                  {ZONES.map((z) => (
                    <label key={z.value} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Checkbox checked={zones.includes(z.value)} onCheckedChange={() => toggleZone(z.value)} />
                      {isItalian ? z.it : z.en}
                    </label>
                  ))}
                </div>
              </fieldset>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="st-type">{isItalian ? "Tipo" : "Room type"}</Label>
                  <select id="st-type" className={`mt-1 ${selectClass}`} value={roomType} onChange={(e) => setRoomType(e.target.value)}>
                    {ROOM_TYPES.map((r) => (
                      <option key={r.value} value={r.value}>{isItalian ? r.it : r.en}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="st-budget">{isItalian ? "Budget mensile massimo" : "Maximum monthly budget"}</Label>
                  <select id="st-budget" className={`mt-1 ${selectClass}`} value={budget} onChange={(e) => setBudget(e.target.value)}>
                    {BUDGETS.map((b) => (
                      <option key={b.value} value={b.value}>{isItalian ? b.it : b.en}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <Label htmlFor="st-movein">{isItalian ? "Da quando" : "From when"}</Label>
                  <select id="st-movein" className={`mt-1 ${selectClass}`} value={moveIn || months[0]?.value} onChange={(e) => setMoveIn(e.target.value)}>
                    {months.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-start gap-3 text-sm text-muted-foreground">
                  <Checkbox checked={consent} onCheckedChange={(v) => setConsent(v === true)} className="mt-0.5" />
                  <span>
                    {isItalian ? "Acconsento al trattamento dei miei dati secondo la " : "I consent to the processing of my data under the "}
                    <Link to="/privacy" className="underline underline-offset-4">
                      {isItalian ? "privacy policy" : "privacy policy"}
                    </Link>
                    .
                  </span>
                </label>
                {errors.consent && <p className="mt-1 text-xs text-destructive">{errors.consent}</p>}
              </div>

              {errors.form && <p className="text-sm text-destructive">{errors.form}</p>}

              <Button type="submit" disabled={isSubmitting} className="w-full md:w-auto">
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isItalian ? "Mettimi in lista" : "Add me to the list"}
              </Button>
            </form>
          )}
        </SceneReveal>

        <SceneReveal as="section" className="mt-16">
          <h2 className="font-display text-2xl font-normal">{isItalian ? "Nel frattempo" : "In the meantime"}</h2>
          <ul className="mt-4 divide-y divide-border">
            {links.map((l) => (
              <li key={l.to} className="py-3">
                <Link to={l.to} className="underline-offset-4 hover:underline">{l.label}</Link>
              </li>
            ))}
          </ul>
          <p className="mt-6">
            <Link to="/blog?category=students" className="text-sm underline underline-offset-4">
              {isItalian ? "Articoli per studenti" : "Articles for students"}
            </Link>
          </p>
        </SceneReveal>
      </main>
    </>
  );
};

export default Students;
