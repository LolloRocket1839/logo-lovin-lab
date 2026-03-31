import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export const LoadingSpinner = ({ className, size = "md" }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: "h-[100px]",
    md: "h-[200px]",
    lg: "h-[400px]",
  };

  return (
    <div className={cn("flex items-center justify-center", sizeClasses[size], className)} role="status" aria-label="Caricamento">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
    </div>
  );
};

export const FullPageLoader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4 animate-fade-up">
        <div className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary animate-spin mx-auto" />
        <p className="text-muted-foreground text-sm">Caricamento...</p>
      </div>
    </div>
  );
};
