 import { useState, memo } from "react";
 import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
 import { cn } from "@/lib/utils";
 
 interface BudgetItem {
   name: string;
   value: number;
   icon: React.ElementType;
 }
 
 interface MobileStickyBudgetProps {
   selectedArea: string;
   totalBudget: number;
   totalWithSaving: number;
   savingTarget: number;
   mode: "simple" | "advanced";
   budgetBreakdown: BudgetItem[];
   currentLang: "it" | "en";
  onShareClick?: () => void;
 }
 
 const MobileStickyBudgetComponent = ({
   selectedArea,
   totalBudget,
   totalWithSaving,
   savingTarget,
   mode,
   budgetBreakdown,
  currentLang,
  onShareClick
 }: MobileStickyBudgetProps) => {
   const [isExpanded, setIsExpanded] = useState(false);
 
   // Group breakdown for compact display
   const groupedBreakdown = budgetBreakdown.reduce((acc, item) => {
     if (item.value > 0) {
       acc.push(item);
     }
     return acc;
   }, [] as BudgetItem[]);
 
   // Sort by value descending for importance
   const sortedBreakdown = [...groupedBreakdown].sort((a, b) => b.value - a.value);
 
   return (
     <div className="lg:hidden sticky top-16 z-10 -mx-4 px-4 bg-background/95 backdrop-blur-sm border-b border-border/50">
       {/* Main header - always visible */}
       <button
         onClick={() => setIsExpanded(!isExpanded)}
         className="w-full py-3 flex items-center justify-between"
       >
         <div className="flex items-center gap-3">
           <div>
             <p className="text-xs text-muted-foreground text-left">{selectedArea}</p>
             <div className="text-2xl font-bold text-primary">
               €{totalBudget}
               <span className="text-sm font-normal text-muted-foreground">/mese</span>
             </div>
           </div>
         </div>
         
         <div className="flex items-center gap-3">
           {mode === "advanced" && savingTarget > 0 && (
             <div className="text-right">
               <p className="text-xs text-muted-foreground">
                 {currentLang === 'it' ? '+risparmio' : '+savings'}
               </p>
               <p className="text-sm font-semibold text-emerald-600">€{totalWithSaving}</p>
             </div>
           )}
           
            {onShareClick && (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8 shrink-0"
                onClick={(e) => {
                  e.stopPropagation();
                  onShareClick();
                }}
              >
                <Share2 className="w-4 h-4" />
              </Button>
            )}

           <div className={cn(
             "w-8 h-8 rounded-full bg-muted flex items-center justify-center transition-transform duration-200",
             isExpanded && "bg-primary/10"
           )}>
             {isExpanded ? (
               <ChevronUp className="w-4 h-4 text-primary" />
             ) : (
               <ChevronDown className="w-4 h-4 text-muted-foreground" />
             )}
           </div>
         </div>
       </button>
 
       {/* Expandable breakdown */}
       <AnimatePresence>
         {isExpanded && (
           <motion.div
             initial={{ height: 0, opacity: 0 }}
             animate={{ height: "auto", opacity: 1 }}
             exit={{ height: 0, opacity: 0 }}
             transition={{ duration: 0.2 }}
             className="overflow-hidden"
           >
             <div className="pb-3 pt-1 border-t border-border/30">
               <p className="text-xs text-muted-foreground mb-2 uppercase tracking-wide">
                 {currentLang === 'it' ? 'Dettaglio spese' : 'Expense breakdown'}
               </p>
               
               {/* Compact grid layout */}
               <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
                 {sortedBreakdown.map((item, index) => {
                   const Icon = item.icon;
                   const percentage = Math.round((item.value / totalBudget) * 100);
                   
                   return (
                     <div 
                       key={item.name} 
                       className="flex items-center justify-between py-1"
                     >
                       <div className="flex items-center gap-2 min-w-0">
                         <Icon className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
                         <span className="text-xs text-muted-foreground truncate">
                           {item.name}
                         </span>
                       </div>
                       <div className="flex items-center gap-1.5 shrink-0">
                         <span className="text-xs font-medium">€{item.value}</span>
                         <span className="text-[10px] text-muted-foreground/70 w-7 text-right">
                           {percentage}%
                         </span>
                       </div>
                     </div>
                   );
                 })}
               </div>
 
               {/* Visual bar breakdown */}
               <div className="mt-3 h-2 rounded-full bg-muted overflow-hidden flex">
                 {sortedBreakdown.slice(0, 5).map((item, index) => {
                   const percentage = (item.value / totalBudget) * 100;
                   const colors = [
                     'bg-primary',
                     'bg-chart-2',
                     'bg-chart-3',
                     'bg-chart-4',
                     'bg-chart-5'
                   ];
                   return (
                     <div
                       key={item.name}
                       className={cn(colors[index] || 'bg-muted-foreground')}
                       style={{ width: `${percentage}%` }}
                     />
                   );
                 })}
               </div>
 
               {/* Top 3 legend */}
               <div className="mt-2 flex items-center gap-3 flex-wrap">
                 {sortedBreakdown.slice(0, 3).map((item, index) => {
                   const colors = [
                     'bg-primary',
                     'bg-chart-2',
                     'bg-chart-3'
                   ];
                   return (
                     <div key={item.name} className="flex items-center gap-1">
                       <div className={cn("w-2 h-2 rounded-full", colors[index])} />
                       <span className="text-[10px] text-muted-foreground">
                         {item.name}
                       </span>
                     </div>
                   );
                 })}
               </div>
             </div>
           </motion.div>
         )}
       </AnimatePresence>
     </div>
   );
 };
 
 export const MobileStickyBudget = memo(MobileStickyBudgetComponent);