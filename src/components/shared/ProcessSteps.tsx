import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ProcessStep {
  title: string;
  body?: string;
  time?: string;
  icon?: LucideIcon;
}

interface ProcessStepsProps {
  steps: ProcessStep[];
  layout?: "list" | "grid";
  className?: string;
}

/**
 * Shared, calm step list. Canonical visual: thin primary-border circle with
 * a serif number. Used across investor, seller, and homepage surfaces so
 * the "numbered process" pattern reads as a single product.
 */
export const ProcessSteps = ({
  steps,
  layout = "list",
  className,
}: ProcessStepsProps) => {
  if (layout === "grid") {
    return (
      <ol
        className={cn(
          "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8",
          className
        )}
      >
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <li
              key={i}
              className="flex flex-col items-center text-center px-2"
            >
              <div className="w-10 h-10 rounded-full border border-primary/40 bg-background flex items-center justify-center font-serif text-sm text-primary mb-4">
                {String(i + 1).padStart(2, "0")}
              </div>
              {Icon && (
                <Icon
                  className="w-5 h-5 text-primary/70 mb-3"
                  aria-hidden="true"
                />
              )}
              {step.time && (
                <span className="eyebrow-mono text-xs text-muted-foreground mb-2">
                  {step.time}
                </span>
              )}
              <h3 className="font-medium text-base text-foreground mb-1.5">
                {step.title}
              </h3>
              {step.body && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              )}
            </li>
          );
        })}
      </ol>
    );
  }

  return (
    <ol className={cn("space-y-8", className)}>
      {steps.map((step, i) => {
        const Icon = step.icon;
        return (
          <li key={i} className="flex gap-5">
            <div className="flex-shrink-0 w-9 h-9 rounded-full border border-primary/40 bg-background flex items-center justify-center font-serif text-sm text-primary">
              {i + 1}
            </div>
            <div className="flex-1 pt-1">
              <div className="flex items-center gap-2 mb-1.5">
                {Icon && (
                  <Icon
                    className="w-4 h-4 text-primary/70"
                    aria-hidden="true"
                  />
                )}
                <h3 className="font-medium text-base text-foreground">
                  {step.title}
                </h3>
                {step.time && (
                  <span className="eyebrow-mono text-xs text-muted-foreground">
                    · {step.time}
                  </span>
                )}
              </div>
              {step.body && (
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  {step.body}
                </p>
              )}
            </div>
          </li>
        );
      })}
    </ol>
  );
};

export default ProcessSteps;
