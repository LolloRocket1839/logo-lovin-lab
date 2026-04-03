import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { ContractWizardData } from "@/components/contracts/ContractWizard";
import { toast } from "sonner";

export interface ContractDraft {
  id: string;
  title: string;
  wizard_data: ContractWizardData;
  current_step: number;
  created_at: string;
  updated_at: string;
}

export function useContractDrafts() {
  const { user } = useAuth();
  const [drafts, setDrafts] = useState<ContractDraft[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchDrafts = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("contract_drafts")
      .select("*")
      .order("updated_at", { ascending: false });

    if (!error && data) {
      setDrafts(data.map((d: any) => ({
        ...d,
        wizard_data: d.wizard_data as ContractWizardData,
      })));
    }
    setLoading(false);
  }, [user]);

  useEffect(() => {
    fetchDrafts();
  }, [fetchDrafts]);

  const saveDraft = async (
    data: ContractWizardData,
    step: number,
    draftId?: string,
    lang: "it" | "en" = "it"
  ): Promise<string | null> => {
    if (!user) return null;

    const title = data.address
      ? `${data.contractType || "Bozza"} — ${data.address}`
      : lang === "it" ? "Bozza contratto" : "Contract draft";

    if (draftId) {
      const { error } = await supabase
        .from("contract_drafts")
        .update({
          wizard_data: data as any,
          current_step: step,
          title,
        })
        .eq("id", draftId);

      if (error) {
        toast.error(lang === "it" ? "Errore nel salvataggio" : "Save error");
        return null;
      }
      toast.success(lang === "it" ? "Bozza aggiornata" : "Draft updated");
      await fetchDrafts();
      return draftId;
    } else {
      const { data: inserted, error } = await supabase
        .from("contract_drafts")
        .insert({
          user_id: user.id,
          wizard_data: data as any,
          current_step: step,
          title,
        })
        .select("id")
        .single();

      if (error || !inserted) {
        toast.error(lang === "it" ? "Errore nel salvataggio" : "Save error");
        return null;
      }
      toast.success(lang === "it" ? "Bozza salvata" : "Draft saved");
      await fetchDrafts();
      return inserted.id;
    }
  };

  const deleteDraft = async (draftId: string, lang: "it" | "en" = "it") => {
    const { error } = await supabase
      .from("contract_drafts")
      .delete()
      .eq("id", draftId);

    if (error) {
      toast.error(lang === "it" ? "Errore nell'eliminazione" : "Delete error");
      return;
    }
    toast.success(lang === "it" ? "Bozza eliminata" : "Draft deleted");
    await fetchDrafts();
  };

  return { drafts, loading, saveDraft, deleteDraft, fetchDrafts };
}
