import { MailX } from "lucide-react";

// Le cancellazioni sono gestite direttamente dal link "unsubscribe" presente
// in fondo a ogni email. Questa pagina resta come spiegazione.
const Unsubscribe = () => {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center space-y-6">
        <MailX className="w-14 h-14 text-primary mx-auto" />
        <h1 className="text-2xl font-bold text-foreground">Cancella iscrizione</h1>
        <p className="text-muted-foreground">
          Per non ricevere più email da Jungle Rent, usa il link di cancellazione
          che trovi in fondo a ogni nostra email: la richiesta è immediata.
        </p>
        <p className="text-muted-foreground">
          Se hai bisogno di aiuto, scrivici a ciao@junglerent.it.
        </p>
      </div>
    </div>
  );
};

export default Unsubscribe;
