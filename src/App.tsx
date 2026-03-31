import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { SkipToContent } from "./components/SkipToContent";
import { ScrollToTopOnNavigation } from "./components/ScrollToTopOnNavigation";
import { usePageViewTracking, useScrollDepth, useUTMTracking } from "./hooks";
import { AnimatedRoutes } from "./components/AnimatedRoutes";

const queryClient = new QueryClient();

const AppContent = () => {
  usePageViewTracking();
  useScrollDepth();
  useUTMTracking();
  
  return <AnimatedRoutes />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SkipToContent />
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <ScrollToTopOnNavigation />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
