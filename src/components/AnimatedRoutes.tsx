import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./PageTransition";
import { LoadingSpinner } from "./LoadingSpinner";
import Index from "@/pages/Index";

// Lazy load - secondary pages
const About = lazy(() => import("@/pages/About"));
const Investors = lazy(() => import("@/pages/Investors"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const AITesting = lazy(() => import("@/pages/AITesting"));
const ABTestResults = lazy(() => import("@/pages/ABTestResults"));
const AnalyticsDashboard = lazy(() => import("@/pages/AnalyticsDashboard"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const TerminiCondizioni = lazy(() => import("@/pages/TerminiCondizioni"));
const Students = lazy(() => import("@/pages/Students"));
const StudentTools = lazy(() => import("@/pages/StudentTools"));
const BudgetCalculator = lazy(() => import("@/pages/tools/BudgetCalculator"));
const GradeCalculator = lazy(() => import("@/pages/tools/GradeCalculator"));
const ExamSessionPlanner = lazy(() => import("@/pages/tools/ExamSessionPlanner"));
const StudySpacesDirectory = lazy(() => import("@/pages/StudySpacesDirectory"));
const CheapEatsDirectory = lazy(() => import("@/pages/CheapEatsDirectory"));
const StudentServicesDirectory = lazy(() => import("@/pages/StudentServicesDirectory"));
const GymsDirectory = lazy(() => import("@/pages/GymsDirectory"));
const ThankYou = lazy(() => import("@/pages/ThankYou"));
const Sellers = lazy(() => import("@/pages/Sellers"));
const PropertyValuation = lazy(() => import("@/pages/PropertyValuation"));
const StrikeEmergencyDirectory = lazy(() => import("@/pages/StrikeEmergencyDirectory"));
const SitemapDebug = lazy(() => import("@/pages/SitemapDebug"));
const ContentAudit = lazy(() => import("@/pages/ContentAudit"));
const ContrattiLocazione = lazy(() => import("@/pages/ContrattiLocazione"));
const NeighborhoodsIndex = lazy(() => import("@/pages/NeighborhoodsIndex"));
const NeighborhoodPage = lazy(() => import("@/pages/NeighborhoodPage"));
const InvestorZonesIndex = lazy(() => import("@/pages/InvestorZonesIndex"));
const InvestorZonePage = lazy(() => import("@/pages/InvestorZonePage"));
const Auth = lazy(() => import("@/pages/Auth"));
const Unsubscribe = lazy(() => import("@/pages/Unsubscribe"));
const LeadsAdmin = lazy(() => import("@/pages/admin/Leads"));
const SeoAdmin = lazy(() => import("@/pages/admin/Seo"));

const NotFound = lazy(() => import("@/pages/NotFound"));

export const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes location={location}>
            <Route path="/" element={<Index />} />
            <Route path="/chi-siamo" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/investitori" element={<Investors />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/invest" element={<Navigate to="/investitori" replace />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/termini-e-condizioni" element={<TerminiCondizioni />} />
            <Route path="/terms" element={<TerminiCondizioni />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/studenti" element={<Students />} />
            <Route path="/students" element={<Students />} />
            <Route path="/studenti/strumenti" element={<StudentTools />} />
            <Route path="/students/tools" element={<StudentTools />} />
            <Route path="/tools" element={<Navigate to="/studenti/strumenti" replace />} />
            <Route path="/studenti/strumenti/budget" element={<BudgetCalculator />} />
            <Route path="/students/tools/budget" element={<BudgetCalculator />} />
            <Route path="/studenti/strumenti/media" element={<GradeCalculator />} />
            <Route path="/students/tools/gpa" element={<GradeCalculator />} />
            <Route path="/studenti/strumenti/sessione" element={<ExamSessionPlanner />} />
            <Route path="/students/tools/session" element={<ExamSessionPlanner />} />
            <Route path="/strumenti/aule-studio-torino" element={<StudySpacesDirectory />} />
            <Route path="/tools/study-spaces-turin" element={<StudySpacesDirectory />} />
            <Route path="/strumenti/dove-mangiare-torino" element={<CheapEatsDirectory />} />
            <Route path="/tools/cheap-eats-turin" element={<CheapEatsDirectory />} />
            <Route path="/strumenti/sportelli-studenti-torino" element={<StudentServicesDirectory />} />
            <Route path="/tools/student-services-turin" element={<StudentServicesDirectory />} />
            <Route path="/strumenti/servizi-studenti-torino" element={<Navigate to="/strumenti/sportelli-studenti-torino" replace />} />
            <Route path="/strumenti/palestre-torino-studenti" element={<GymsDirectory />} />
            <Route path="/tools/gyms-turin-students" element={<GymsDirectory />} />
            <Route path="/ai-testing" element={<AITesting />} />
            <Route path="/ab-test-results" element={<ABTestResults />} />
            <Route path="/analytics-dashboard" element={<AnalyticsDashboard />} />
            <Route path="/grazie" element={<ThankYou />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/vendi" element={<Sellers />} />
            <Route path="/sell" element={<Sellers />} />
            <Route path="/proprietari" element={<Navigate to="/vendi" replace />} />
            <Route path="/valutazione-immobile" element={<PropertyValuation />} />
            <Route path="/property-valuation" element={<PropertyValuation />} />
            <Route path="/scioperi-italia" element={<StrikeEmergencyDirectory />} />
            <Route path="/italy-strikes" element={<StrikeEmergencyDirectory />} />
            <Route path="/sitemap-debug" element={<SitemapDebug />} />
            <Route path="/content-audit" element={<ContentAudit />} />
            <Route path="/contratti-locazione" element={<ContrattiLocazione />} />
            <Route path="/rental-contracts" element={<ContrattiLocazione />} />
            <Route path="/investitori/zone" element={<InvestorZonesIndex />} />
            <Route path="/investors/zones" element={<InvestorZonesIndex />} />
            <Route path="/investitori/zone/:slug" element={<InvestorZonePage />} />
            <Route path="/investors/zones/:slug" element={<InvestorZonePage />} />
            <Route path="/affitto-stanza-torino" element={<NeighborhoodsIndex />} />
            <Route path="/rooms-rent-turin" element={<NeighborhoodsIndex />} />
            <Route path="/affitto-stanza-torino/:slug" element={<NeighborhoodPage />} />
            <Route path="/rooms-rent-turin/:slug" element={<NeighborhoodPage />} />
            <Route path="/accedi" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/admin/leads" element={<LeadsAdmin />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
};
