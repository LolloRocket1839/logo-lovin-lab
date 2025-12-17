import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkipToContent } from "./components/SkipToContent";
import { ScrollToTopOnNavigation } from "./components/ScrollToTopOnNavigation";
import { usePageViewTracking } from "./hooks/useAnalytics";
import { useScrollDepth } from "./hooks/useScrollDepth";
import { useUTMTracking } from "./hooks/useUTMTracking";
import { LoadingSpinner } from "./components/LoadingSpinner";

// Eager load - homepage
import Index from "./pages/Index";

// Lazy load - secondary pages
const About = lazy(() => import("./pages/About"));
const Investors = lazy(() => import("./pages/Investors"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const FAQ = lazy(() => import("./pages/FAQ"));
const AITesting = lazy(() => import("./pages/AITesting"));
const ABTestResults = lazy(() => import("./pages/ABTestResults"));
const AnalyticsDashboard = lazy(() => import("./pages/AnalyticsDashboard"));
const Privacy = lazy(() => import("./pages/Privacy"));
const TerminiCondizioni = lazy(() => import("./pages/TerminiCondizioni"));
const Students = lazy(() => import("./pages/Students"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

const AppContent = () => {
  usePageViewTracking();
  useScrollDepth();
  useUTMTracking(); // Capture UTM params on page load
  
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/chi-siamo" element={<About />} />
        <Route path="/about" element={<About />} />
        <Route path="/investitori" element={<Investors />} />
        <Route path="/investors" element={<Investors />} />
        
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/termini-e-condizioni" element={<TerminiCondizioni />} />
        <Route path="/terms" element={<TerminiCondizioni />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/studenti" element={<Students />} />
        <Route path="/students" element={<Students />} />
        <Route path="/ai-testing" element={<AITesting />} />
        <Route path="/ab-test-results" element={<ABTestResults />} />
        <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SkipToContent />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTopOnNavigation />
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
