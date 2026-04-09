import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Loader2, MailX } from "lucide-react";

type Status = "loading" | "valid" | "already" | "invalid" | "success" | "error";

const Unsubscribe = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<Status>("loading");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!token) {
      setStatus("invalid");
      return;
    }

    const validate = async () => {
      try {
        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
        const anonKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;
        const res = await fetch(
          `${supabaseUrl}/functions/v1/handle-email-unsubscribe?token=${encodeURIComponent(token)}`,
          { headers: { apikey: anonKey } }
        );
        const data = await res.json();
        if (data.valid === false && data.reason === "already_unsubscribed") {
          setStatus("already");
        } else if (data.valid) {
          setStatus("valid");
        } else {
          setStatus("invalid");
        }
      } catch {
        setStatus("invalid");
      }
    };
    validate();
  }, [token]);

  const handleUnsubscribe = async () => {
    if (!token) return;
    setSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("handle-email-unsubscribe", {
        body: { token },
      });
      if (error) throw error;
      if (data?.success) {
        setStatus("success");
      } else if (data?.reason === "already_unsubscribed") {
        setStatus("already");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        {status === "loading" && (
          <>
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto" />
            <p className="text-muted-foreground">Verifica in corso...</p>
          </>
        )}

        {status === "valid" && (
          <>
            <MailX className="w-14 h-14 text-primary mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Cancella iscrizione</h1>
            <p className="text-muted-foreground">
              Sei sicuro di voler cancellare la tua iscrizione alle email di Jungle Rent?
            </p>
            <Button
              onClick={handleUnsubscribe}
              disabled={submitting}
              variant="destructive"
              size="lg"
              className="w-full"
            >
              {submitting ? (
                <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Elaborazione...</>
              ) : (
                "Conferma cancellazione"
              )}
            </Button>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle className="w-14 h-14 text-green-500 mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Iscrizione cancellata</h1>
            <p className="text-muted-foreground">
              Non riceverai più email da Jungle Rent. Ci dispiace vederti andare!
            </p>
          </>
        )}

        {status === "already" && (
          <>
            <CheckCircle className="w-14 h-14 text-muted-foreground mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Già cancellato</h1>
            <p className="text-muted-foreground">
              La tua iscrizione era già stata cancellata in precedenza.
            </p>
          </>
        )}

        {status === "invalid" && (
          <>
            <XCircle className="w-14 h-14 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Link non valido</h1>
            <p className="text-muted-foreground">
              Il link di cancellazione non è valido o è scaduto.
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-14 h-14 text-destructive mx-auto" />
            <h1 className="text-2xl font-bold text-foreground">Errore</h1>
            <p className="text-muted-foreground">
              Si è verificato un errore. Riprova più tardi.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Unsubscribe;
