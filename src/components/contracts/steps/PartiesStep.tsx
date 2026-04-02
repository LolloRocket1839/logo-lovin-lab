import type { ContractWizardData } from "../ContractWizard";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Props {
  data: ContractWizardData;
  update: (partial: Partial<ContractWizardData>) => void;
  lang: 'it' | 'en';
}

export function PartiesStep({ data, update, lang }: Props) {
  const isStudent = data.contractType === 'studenti';

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">
          {lang === 'it' ? 'Dati delle parti' : 'Party details'}
        </h2>
        <p className="text-sm text-muted-foreground">
          {lang === 'it'
            ? 'Inserisci i dati di locatore e conduttore.'
            : 'Enter landlord and tenant information.'}
        </p>
      </div>

      {/* Landlord */}
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          {lang === 'it' ? 'Locatore (proprietario)' : 'Landlord (owner)'}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-sm">{lang === 'it' ? 'Nome e Cognome' : 'Full name'}</Label>
            <Input
              placeholder="Mario Rossi"
              value={data.landlordName}
              onChange={e => update({ landlordName: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">{lang === 'it' ? 'Codice Fiscale' : 'Tax code'}</Label>
            <Input
              placeholder="RSSMRA80A01L219K"
              value={data.landlordCF}
              onChange={e => update({ landlordCF: e.target.value.toUpperCase() })}
              maxLength={16}
            />
          </div>
        </div>
        <div className="space-y-1.5">
          <Label className="text-sm">{lang === 'it' ? 'Indirizzo di residenza' : 'Residence address'}</Label>
          <Input
            placeholder={lang === 'it' ? 'Via Roma 1, 10100 Torino' : '1 Via Roma, 10100 Turin'}
            value={data.landlordAddress}
            onChange={e => update({ landlordAddress: e.target.value })}
          />
        </div>
      </div>

      {/* Tenant */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          {lang === 'it' ? 'Conduttore (inquilino)' : 'Tenant'}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-sm">{lang === 'it' ? 'Nome e Cognome' : 'Full name'}</Label>
            <Input
              placeholder="Giulia Bianchi"
              value={data.tenantName}
              onChange={e => update({ tenantName: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">{lang === 'it' ? 'Codice Fiscale' : 'Tax code'}</Label>
            <Input
              placeholder="BNCGLI95B41L219Z"
              value={data.tenantCF}
              onChange={e => update({ tenantCF: e.target.value.toUpperCase() })}
              maxLength={16}
            />
          </div>
        </div>

        {isStudent && (
          <div className="space-y-1.5">
            <Label className="text-sm">{lang === 'it' ? 'Università' : 'University'}</Label>
            <Input
              placeholder={lang === 'it' ? 'Politecnico di Torino' : 'Politecnico di Torino'}
              value={data.tenantUniversity}
              onChange={e => update({ tenantUniversity: e.target.value })}
            />
          </div>
        )}
      </div>

      {/* Terms */}
      <div className="space-y-3 pt-4 border-t border-border">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">
          {lang === 'it' ? 'Condizioni' : 'Terms'}
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label className="text-sm">{lang === 'it' ? 'Data inizio' : 'Start date'}</Label>
            <Input
              type="date"
              value={data.startDate}
              onChange={e => update({ startDate: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label className="text-sm">{lang === 'it' ? 'Mensilità di deposito' : 'Deposit months'}</Label>
            <Select
              value={String(data.depositMonths)}
              onValueChange={v => update({ depositMonths: parseInt(v) })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 {lang === 'it' ? 'mensilità' : 'month'}</SelectItem>
                <SelectItem value="2">2 {lang === 'it' ? 'mensilità' : 'months'}</SelectItem>
                <SelectItem value="3">3 {lang === 'it' ? 'mensilità' : 'months'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}
