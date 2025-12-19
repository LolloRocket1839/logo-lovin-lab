import { Search, Filter, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export interface ExamFilters {
  search: string;
  sessione: string;
  difficolta: string;
  cfuRange: [number, number];
}

interface ExamListFiltersProps {
  filters: ExamFilters;
  onFiltersChange: (filters: ExamFilters) => void;
  lang: 'it' | 'en';
}

export const ExamListFilters = ({ filters, onFiltersChange, lang }: ExamListFiltersProps) => {
  const content = {
    it: {
      search: "Cerca esame...",
      filters: "Filtri",
      session: "Sessione",
      allSessions: "Tutte",
      sessions: {
        invernale: "Invernale",
        estiva: "Estiva",
        autunnale: "Autunnale"
      },
      difficulty: "Difficoltà",
      allDifficulties: "Tutte",
      difficulties: ["", "😊 Facile", "😐 Media", "😰 Difficile", "💀 Boss"],
      cfuRange: "Range CFU",
      clear: "Pulisci"
    },
    en: {
      search: "Search exam...",
      filters: "Filters",
      session: "Session",
      allSessions: "All",
      sessions: {
        invernale: "Winter",
        estiva: "Summer",
        autunnale: "Fall"
      },
      difficulty: "Difficulty",
      allDifficulties: "All",
      difficulties: ["", "😊 Easy", "😐 Medium", "😰 Hard", "💀 Boss"],
      cfuRange: "CFU Range",
      clear: "Clear"
    }
  };

  const c = content[lang];
  
  const activeFiltersCount = [
    filters.sessione !== 'all' ? 1 : 0,
    filters.difficolta !== 'all' ? 1 : 0,
    (filters.cfuRange[0] > 1 || filters.cfuRange[1] < 30) ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const clearFilters = () => {
    onFiltersChange({
      ...filters,
      sessione: 'all',
      difficolta: 'all',
      cfuRange: [1, 30]
    });
  };

  return (
    <div className="flex gap-2 mb-4">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          value={filters.search}
          onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
          placeholder={c.search}
          className="pl-9 h-10"
        />
        {filters.search && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
            onClick={() => onFiltersChange({ ...filters, search: '' })}
          >
            <X className="w-3 h-3" />
          </Button>
        )}
      </div>

      {/* Filters Popover */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="icon" className="h-10 w-10 relative shrink-0">
            <Filter className="w-4 h-4" />
            {activeFiltersCount > 0 && (
              <Badge 
                className="absolute -top-1.5 -right-1.5 h-5 w-5 p-0 flex items-center justify-center text-[10px]"
                variant="default"
              >
                {activeFiltersCount}
              </Badge>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent align="end" className="w-72 bg-background">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-medium">{c.filters}</h4>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 text-xs">
                  <X className="w-3 h-3 mr-1" />
                  {c.clear}
                </Button>
              )}
            </div>

            {/* Session Filter */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">{c.session}</label>
              <Select 
                value={filters.sessione} 
                onValueChange={(v) => onFiltersChange({ ...filters, sessione: v })}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{c.allSessions}</SelectItem>
                  <SelectItem value="invernale">{c.sessions.invernale}</SelectItem>
                  <SelectItem value="estiva">{c.sessions.estiva}</SelectItem>
                  <SelectItem value="autunnale">{c.sessions.autunnale}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Difficulty Filter */}
            <div className="space-y-2">
              <label className="text-sm text-muted-foreground">{c.difficulty}</label>
              <Select 
                value={filters.difficolta} 
                onValueChange={(v) => onFiltersChange({ ...filters, difficolta: v })}
              >
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{c.allDifficulties}</SelectItem>
                  <SelectItem value="1">{c.difficulties[1]}</SelectItem>
                  <SelectItem value="2">{c.difficulties[2]}</SelectItem>
                  <SelectItem value="3">{c.difficulties[3]}</SelectItem>
                  <SelectItem value="4">{c.difficulties[4]}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* CFU Range Filter */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <label className="text-sm text-muted-foreground">{c.cfuRange}</label>
                <span className="text-sm font-medium">{filters.cfuRange[0]}-{filters.cfuRange[1]}</span>
              </div>
              <Slider
                value={filters.cfuRange}
                onValueChange={(val) => onFiltersChange({ ...filters, cfuRange: val as [number, number] })}
                min={1}
                max={30}
                step={1}
                className="py-2"
              />
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
