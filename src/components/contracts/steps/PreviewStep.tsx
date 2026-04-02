import { useState } from "react";
import type { ContractWizardData } from "../ContractWizard";
import { ALL_ZONES, CONTRACT_TYPES } from "@/data/contract-zones";
import { calculateConventionalSurface } from "@/lib/contract-rules";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, Home, Users, Euro, CheckCircle, Download, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface Props {
  data: ContractWizardData;
  lang: 'it' | 'en';
}

export function PreviewStep({ data, lang }: Props) {
  const [generating, setGenerating] = useState(false);

  const contractType = CONTRACT_TYPES.find(c => c.id === data.contractType);
  const zone = ALL_ZONES.find(z => z.id === data.zoneId);
  const conventionalSqm = calculateConventionalSurface({
    walkableSqm: data.walkableSqm,
    balconySqm: data.balconySqm,
    cellarSqm: data.cellarSqm,
    garageSqm: data.garageSqm,
    outdoorSqm: data.outdoorSqm,
  });

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const { data: result, error } = await supabase.functions.invoke("generate-contract", {
        body: {
          contractType: data.contractType,
          address: data.address,
          zoneName: zone?.name || "",
          walkableSqm: data.walkableSqm,
          conventionalSqm,
          energyClass: data.energyClass,
          yearBuilt: data.yearBuilt,
          renovationYear: data.renovationYear,
          isFurnished: data.isFurnished,
          furnitureValue: data.furnitureValue,
          selectedFeatures: data.selectedFeatures,
          chosenRent: data.chosenRent,
          useCedolareSecca: data.useCedolareSecca,
          cedolareSeccaRate: contractType?.cedolareSeccaRate || 21,
          landlordName: data.landlordName,
          landlordCF: data.landlordCF,
          landlordAddress: data.landlordAddress,
          tenantName: data.tenantName,
          tenantCF: data.tenantCF,
          tenantUniversity: data.tenantUniversity,
          startDate: data.startDate,
          depositMonths: data.depositMonths,
          contractDuration: contractType?.duration[lang] || "",
          lang,
        },
      });

      if (error) throw error;

      // Open HTML in new window for print/save as PDF
      const printWindow = window.open("", "_blank");
      if (printWindow) {
        printWindow.document.write(result.html);
        printWindow.document.close();
        // Auto-trigger print dialog after a short delay
        setTimeout(() => printWindow.print(), 500);
      }

      toast.success(
        lang === "it"
          ? "Contratto generato! Usa Stampa → Salva come PDF."
          : "Contract generated! Use Print → Save as PDF."
      );
    } catch (err) {
      console.error("Contract generation error:", err);
      toast.error(
        lang === "it"
          ? "Errore nella generazione del contratto. Riprova."
          : "Error generating contract. Please try again."
      );
    } finally {
      setGenerating(false);
    }
  };

  const sections = [
    {
      icon: FileText,
      title: lang === 'it' ? 'Tipo contratto' : 'Contract type',
      items: [
        { label: lang === 'it' ? 'Tipologia' : 'Type', value: contractType?.label[lang] || '-' },
        { label: lang === 'it' ? 'Durata' : 'Duration', value: contractType?.duration[lang] || '-' },
        { label: 'Cedolare secca', value: data.useCedolareSecca ? `${contractType?.cedolareSeccaRate}%` : 'IRPEF' },
      ],
    },
    {
      icon: Home,
      title: lang === 'it' ? 'Immobile' : 'Property',
      items: [
        { label: lang === 'it' ? 'Indirizzo' : 'Address', value: data.address || '-' },
        { label: lang === 'it' ? 'Zona' : 'Zone', value: zone?.name || '-' },
        { label: lang === 'it' ? 'Sup. convenzionale' : 'Conv. surface', value: `${conventionalSqm.toFixed(2)} m²` },
        { label: lang === 'it' ? 'Classe energetica' : 'Energy class', value: data.energyClass },
        { label: lang === 'it' ? 'Arredato' : 'Furnished', value: data.isFurnished ? (lang === 'it' ? 'Sì' : 'Yes') : 'No' },
        { label: lang === 'it' ? 'Elementi di pregio' : 'Features', value: `${data.selectedFeatures.length}/22` },
      ],
    },
    {
      icon: Euro,
      title: lang === 'it' ? 'Canone' : 'Rent',
      items: [
        { label: lang === 'it' ? 'Canone mensile' : 'Monthly rent', value: `€${data.chosenRent.toFixed(0)}` },
        { label: lang === 'it' ? 'Deposito' : 'Deposit', value: `€${(data.chosenRent * data.depositMonths).toFixed(0)} (${data.depositMonths} ${lang === 'it' ? 'mensilità' : 'months'})` },
        { label: lang === 'it' ? 'Canone annuo' : 'Annual rent', value: `€${(data.chosenRent * 12).toFixed(0)}` },
      ],
    },
    {
      icon: Users,
      title: lang === 'it' ? 'Parti' : 'Parties',
      items: [
        { label: lang === 'it' ? 'Locatore' : 'Landlord', value: data.landlordName || '-' },
        { label: 'C.F.', value: data.landlordCF || '-' },
        { label: lang === 'it' ? 'Conduttore' : 'Tenant', value: data.tenantName || '-' },
        { label: 'C.F.', value: data.tenantCF || '-' },
        ...(data.startDate ? [{ label: lang === 'it' ? 'Inizio' : 'Start', value: data.startDate }] : []),
      ],
    },
  ];

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          {lang === 'it' ? 'Riepilogo contratto' : 'Contract summary'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {lang === 'it'
            ? 'Verifica i dati prima di generare il contratto.'
            : 'Review the data before generating the contract.'}
        </p>
      </div>

      {sections.map(section => (
        <Card key={section.title} className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <section.icon className="h-4 w-4 text-primary" />
            <h3 className="font-semibold text-foreground text-sm">{section.title}</h3>
          </div>
          <div className="space-y-1.5">
            {section.items.map(item => (
              <div key={item.label} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.label}</span>
                <span className="font-medium text-foreground text-right">{item.value}</span>
              </div>
            ))}
          </div>
        </Card>
      ))}

      <Card className="p-4 bg-primary/5 border-primary/20">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-foreground">
              {lang === 'it'
                ? 'Pronto per la generazione'
                : 'Ready for generation'}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {lang === 'it'
                ? 'Genera il contratto in formato PDF conforme al modello ministeriale D.M. 16/01/2017.'
                : 'Generate the contract in PDF format compliant with ministerial template D.M. 16/01/2017.'}
            </p>
            <Button
              onClick={handleGenerate}
              disabled={generating}
              className="mt-3 gap-2"
              size="sm"
            >
              {generating ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {lang === 'it' ? 'Generazione...' : 'Generating...'}
                </>
              ) : (
                <>
                  <Download className="h-4 w-4" />
                  {lang === 'it' ? 'Genera e scarica PDF' : 'Generate & download PDF'}
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
