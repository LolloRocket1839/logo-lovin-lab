import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SkipToContent } from "./components/SkipToContent";
import { usePageViewTracking } from "./hooks/useAnalytics";
import { useScrollDepth } from "./hooks/useScrollDepth";
import Index from "./pages/Index";
import About from "./pages/About";
import Investors from "./pages/Investors";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import AITesting from "./pages/AITesting";
import ABTestResults from "./pages/ABTestResults";
import AnalyticsDashboard from "./pages/AnalyticsDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const AppContent = () => {
  usePageViewTracking();
  useScrollDepth();
  
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/chi-siamo" element={<About />} />
      <Route path="/about" element={<About />} />
      <Route path="/investitori" element={<Investors />} />
      <Route path="/investors" element={<Investors />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/:slug" element={<BlogPost />} />
      <Route path="/ai-testing" element={<AITesting />} />
      <Route path="/ab-test-results" element={<ABTestResults />} />
      <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <SkipToContent />
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
