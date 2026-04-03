import { useTranslation } from "react-i18next";
import { useAuth } from "@/contexts/AuthContext";
import { useContractDrafts } from "@/hooks/useContractDrafts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Clock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { ContractWizardData } from "./ContractWizard";

interface DraftListProps {
  onLoadDraft: (data: ContractWizardData, step: number, draftId: string) => void;
}

export function DraftList({ onLoadDraft }: DraftListProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language.startsWith("en") ? "en" : "it") as "it" | "en";
  const { user } = useAuth();
  const navigate = useNavigate();
  const { drafts, loading, deleteDraft } = useContractDrafts();

  if (!user) {
    return (
      <Card className="border-dashed border-muted-foreground/30">
        <CardContent className="flex flex-col items-center gap-3 py-6">
          <LogIn className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground text-center">
            {lang === "it"
              ? "Accedi per salvare e riprendere le bozze dei tuoi contratti"
              : "Sign in to save and resume your contract drafts"}
          </p>
          <Button variant="outline" size="sm" onClick={() => navigate("/accedi")}>
            {lang === "it" ? "Accedi" : "Sign in"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (loading) {
    return (
      <p className="text-sm text-muted-foreground text-center py-4">
        {lang === "it" ? "Caricamento bozze..." : "Loading drafts..."}
      </p>
    );
  }

  if (drafts.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          <FileText className="h-4 w-4" />
          {lang === "it" ? "Le tue bozze" : "Your drafts"}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {drafts.map((draft) => (
          <div
            key={draft.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
          >
            <button
              onClick={() => onLoadDraft(draft.wizard_data, draft.current_step, draft.id)}
              className="flex-1 text-left"
            >
              <p className="text-sm font-medium text-foreground truncate">
                {draft.title}
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-0.5">
                <Clock className="h-3 w-3" />
                {lang === "it" ? "Step" : "Step"} {draft.current_step}/6 •{" "}
                {new Date(draft.updated_at).toLocaleDateString(lang === "it" ? "it-IT" : "en-GB")}
              </p>
            </button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => deleteDraft(draft.id, lang)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
