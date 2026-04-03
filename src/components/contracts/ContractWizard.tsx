import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Save } from "lucide-react";
import { ContractTypeStep } from "./steps/ContractTypeStep";
import { PropertyDetailsStep } from "./steps/PropertyDetailsStep";
import { FeatureChecklistStep } from "./steps/FeatureChecklistStep";
import { RentCalculationStep } from "./steps/RentCalculationStep";
import { PartiesStep } from "./steps/PartiesStep";
import { PreviewStep } from "./steps/PreviewStep";
import type { ContractType, EnergyClass } from "@/data/contract-zones";

export interface ContractWizardData {
  contractType: ContractType | null;
  address: string;
  zoneId: string;
  walkableSqm: number;
  balconySqm: number;
  cellarSqm: number;
  garageSqm: number;
  outdoorSqm: number;
  energyClass: EnergyClass;
  yearBuilt: string;
  renovationYear: string;
  isFurnished: boolean;
  furnitureValue: number;
  selectedFeatures: string[];
  chosenRent: number;
  useCedolareSecca: boolean;
  landlordName: string;
  landlordCF: string;
  landlordAddress: string;
  tenantName: string;
  tenantCF: string;
  tenantUniversity: string;
  startDate: string;
  depositMonths: number;
}

export const initialWizardData: ContractWizardData = {
  contractType: null,
  address: '',
  zoneId: 'zona1',
  walkableSqm: 0,
  balconySqm: 0,
  cellarSqm: 0,
  garageSqm: 0,
  outdoorSqm: 0,
  energyClass: 'D',
  yearBuilt: '',
  renovationYear: '',
  isFurnished: false,
  furnitureValue: 0,
  selectedFeatures: [],
  chosenRent: 0,
  useCedolareSecca: true,
  landlordName: '',
  landlordCF: '',
  landlordAddress: '',
  tenantName: '',
  tenantCF: '',
  tenantUniversity: '',
  startDate: '',
  depositMonths: 2,
};

const TOTAL_STEPS = 6;

interface ContractWizardProps {
  onClose: () => void;
  initialData?: ContractWizardData;
  initialStep?: number;
  draftId?: string;
  onSaveDraft?: (data: ContractWizardData, step: number, draftId?: string) => Promise<string | null>;
}

export function ContractWizard({ onClose, initialData, initialStep, draftId: initialDraftId, onSaveDraft }: ContractWizardProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language.startsWith("en") ? "en" : "it") as "it" | "en";
  const [step, setStep] = useState(initialStep || 1);
  const [data, setData] = useState<ContractWizardData>(initialData || initialWizardData);
  const [currentDraftId, setCurrentDraftId] = useState<string | undefined>(initialDraftId);
  const [saving, setSaving] = useState(false);

  const update = (partial: Partial<ContractWizardData>) => {
    setData(prev => ({ ...prev, ...partial }));
  };

  const canProceed = (): boolean => {
    switch (step) {
      case 1: return data.contractType !== null;
      case 2: return data.walkableSqm > 0 && data.zoneId !== '';
      case 3: return true;
      case 4: return data.chosenRent > 0;
      case 5: return data.landlordName.length > 0 && data.tenantName.length > 0;
      case 6: return true;
      default: return false;
    }
  };

  const isConcordato = data.contractType === '3+2' || data.contractType === 'transitorio' || data.contractType === 'studenti';

  const stepLabels = {
    it: ['Tipo contratto', 'Immobile', 'Caratteristiche', 'Canone', 'Parti', 'Riepilogo'],
    en: ['Contract Type', 'Property', 'Features', 'Rent', 'Parties', 'Summary'],
  };

  const next = () => {
    if (step === 2 && !isConcordato) {
      setStep(4);
    } else {
      setStep(s => Math.min(s + 1, TOTAL_STEPS));
    }
  };

  const prev = () => {
    if (step === 4 && !isConcordato) {
      setStep(2);
    } else {
      setStep(s => Math.max(s - 1, 1));
    }
  };

  const handleSave = async () => {
    if (!onSaveDraft) return;
    setSaving(true);
    const id = await onSaveDraft(data, step, currentDraftId);
    if (id) setCurrentDraftId(id);
    setSaving(false);
  };

  const progress = (step / TOTAL_STEPS) * 100;

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm text-muted-foreground">
          <span>{stepLabels[lang][step - 1]}</span>
          <span>{step} / {TOTAL_STEPS}</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Step content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {step === 1 && <ContractTypeStep data={data} update={update} lang={lang} />}
          {step === 2 && <PropertyDetailsStep data={data} update={update} lang={lang} />}
          {step === 3 && <FeatureChecklistStep data={data} update={update} lang={lang} />}
          {step === 4 && <RentCalculationStep data={data} update={update} lang={lang} />}
          {step === 5 && <PartiesStep data={data} update={update} lang={lang} />}
          {step === 6 && <PreviewStep data={data} lang={lang} />}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between pt-4 border-t border-border">
        <Button
          variant="outline"
          onClick={step === 1 ? onClose : prev}
          className="gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          {step === 1
            ? (lang === 'it' ? 'Chiudi' : 'Close')
            : (lang === 'it' ? 'Indietro' : 'Back')}
        </Button>

        <div className="flex gap-2">
          {onSaveDraft && (
            <Button variant="outline" onClick={handleSave} disabled={saving} className="gap-2">
              <Save className="h-4 w-4" />
              {saving
                ? '...'
                : (lang === 'it' ? 'Salva bozza' : 'Save draft')}
            </Button>
          )}

          {step < TOTAL_STEPS && (
            <Button onClick={next} disabled={!canProceed()} className="gap-2">
              {lang === 'it' ? 'Avanti' : 'Next'}
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
