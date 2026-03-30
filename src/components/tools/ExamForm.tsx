import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface ExamFormProps {
  onAddExam: (exam: { name: string; grade: number; cfu: number }) => void;
  language: 'it' | 'en';
}

export const ExamForm = ({ onAddExam, language }: ExamFormProps) => {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState<string>("");
  const [cfu, setCfu] = useState<string>("");

  const content = {
    it: {
      title: "Aggiungi Esame",
      name: "Nome esame (opzionale)",
      namePlaceholder: "Es: Analisi Matematica I",
      grade: "Voto",
      gradePlaceholder: "Seleziona voto",
      cfu: "CFU",
      cfuPlaceholder: "Es: 9",
      addButton: "Aggiungi Esame",
      errorGrade: "Seleziona un voto",
      errorCfu: "Inserisci i CFU",
      success: "Esame aggiunto"
    },
    en: {
      title: "Add Exam",
      name: "Exam name (optional)",
      namePlaceholder: "E.g: Calculus I",
      grade: "Grade",
      gradePlaceholder: "Select grade",
      cfu: "Credits",
      cfuPlaceholder: "E.g: 9",
      addButton: "Add Exam",
      errorGrade: "Select a grade",
      errorCfu: "Enter credits",
      success: "Exam added"
    }
  };

  const t = content[language];

  // Generate grade options (18-30 + 30L)
  const gradeOptions = [];
  for (let i = 18; i <= 30; i++) {
    gradeOptions.push({ value: i.toString(), label: i.toString() });
  }
  gradeOptions.push({ value: "31", label: "30 e Lode" });

  const cfuInputRef = React.useRef<HTMLInputElement>(null);

  const handleGradeChange = (value: string) => {
    setGrade(value);
    // Auto-focus CFU field after grade selection
    setTimeout(() => cfuInputRef.current?.focus(), 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!grade) {
      toast.error(t.errorGrade);
      return;
    }

    const cfuNum = parseInt(cfu);
    if (!cfu || isNaN(cfuNum) || cfuNum < 1 || cfuNum > 30) {
      toast.error(t.errorCfu);
      return;
    }

    onAddExam({
      name: name.trim(),
      grade: parseInt(grade),
      cfu: cfuNum
    });

    // Reset form
    setName("");
    setGrade("");
    setCfu("");

    toast.success(t.success);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Plus className="w-5 h-5 text-primary" />
          {t.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Exam Name */}
          <div className="space-y-2">
            <Label htmlFor="exam-name">{t.name}</Label>
            <Input
              id="exam-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder={t.namePlaceholder}
              maxLength={100}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Grade */}
            <div className="space-y-2">
              <Label htmlFor="exam-grade">{t.grade} *</Label>
              <Select value={grade} onValueChange={setGrade}>
                <SelectTrigger id="exam-grade">
                  <SelectValue placeholder={t.gradePlaceholder} />
                </SelectTrigger>
                <SelectContent>
                  {gradeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* CFU */}
            <div className="space-y-2">
              <Label htmlFor="exam-cfu">{t.cfu} *</Label>
              <Input
                id="exam-cfu"
                type="number"
                min={1}
                max={30}
                value={cfu}
                onChange={(e) => setCfu(e.target.value)}
                placeholder={t.cfuPlaceholder}
              />
            </div>
          </div>

          <Button type="submit" className="w-full gap-2">
            <Plus className="w-4 h-4" />
            {t.addButton}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
