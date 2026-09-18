import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { SkipToContent } from "./components/SkipToContent";
import { ScrollToTopOnNavigation } from "./components/ScrollToTopOnNavigation";
import { useUTMTracking } from "./hooks";
import { AnimatedRoutes } from "./components/AnimatedRoutes";
import { AuthProvider } from "./contexts/AuthContext";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { HreflangTags } from "./components/HreflangTags";
import { useUrlLanguage } from "./hooks/useUrlLanguage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes stale-while-revalidate
      gcTime: 10 * 60 * 1000,
    },
  },
});

const AppContent = () => {
  useUTMTracking();
  useUrlLanguage();

  return (
    <ErrorBoundary>
      <HreflangTags />
      <AnimatedRoutes />
    </ErrorBoundary>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <SkipToContent />
        <Toaster />
        <Sonner />
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
          <ScrollToTopOnNavigation />
          <AppContent />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
