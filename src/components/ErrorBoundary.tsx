import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = "/";
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4">
          <div className="max-w-md w-full text-center space-y-6">
            <AlertCircle className="w-16 h-16 mx-auto text-destructive" />
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Oops! Qualcosa è andato storto
              </h1>
              <p className="text-muted-foreground">
                Si è verificato un errore inaspettato. Ci scusiamo per il disagio.
              </p>
            </div>
            <Button onClick={this.handleReset} size="lg">
              Torna alla Home
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
