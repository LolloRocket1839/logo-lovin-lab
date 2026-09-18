import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { hasEnPrefix, stripEnPrefix } from "@/constants/routeAliases";
import { AnimatePresence } from "framer-motion";
import { PageTransition } from "./PageTransition";
import { LoadingSpinner } from "./LoadingSpinner";
import { RootLayout } from "@/components/layout/RootLayout";
import Index from "@/pages/Index";

// Lazy load - secondary pages
const About = lazy(() => import("@/pages/About"));
const Investors = lazy(() => import("@/pages/Investors"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const FAQ = lazy(() => import("@/pages/FAQ"));
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
const ContrattiLocazione = lazy(() => import("@/pages/ContrattiLocazione"));
const NeighborhoodsIndex = lazy(() => import("@/pages/NeighborhoodsIndex"));
const NeighborhoodPage = lazy(() => import("@/pages/NeighborhoodPage"));
const InvestorZonesIndex = lazy(() => import("@/pages/InvestorZonesIndex"));
const InvestorZonePage = lazy(() => import("@/pages/InvestorZonePage"));
const NizzaMillefontiOspedali = lazy(() => import("@/pages/zone/NizzaMillefontiOspedali"));
const LingottoNizzaMillefontiSeller = lazy(() => import("@/pages/vendi/LingottoNizzaMillefonti"));
const VendereSenzaAgenzia = lazy(() => import("@/pages/landings/VendereSenzaAgenzia"));
const VendereVelocemente = lazy(() => import("@/pages/landings/VendereVelocemente"));
const ComprareCasaAffittata = lazy(() => import("@/pages/landings/ComprareCasaAffittata"));
const InvestireImmobiliareTorino = lazy(() => import("@/pages/landings/InvestireImmobiliareTorino"));
const AffittiLingottoOspedali = lazy(() => import("@/pages/landings/AffittiLingottoOspedali"));
const Auth = lazy(() => import("@/pages/Auth"));
const Unsubscribe = lazy(() => import("@/pages/Unsubscribe"));
const LeadsAdmin = lazy(() => import("@/pages/admin/Leads"));
const SellerRadarAdmin = lazy(() => import("@/pages/admin/SellerRadar"));

const NotFound = lazy(() => import("@/pages/NotFound"));
const FairRentPledge = lazy(() => import("@/pages/FairRentPledge"));

export const AnimatedRoutes = () => {
  const location = useLocation();
  // /en/<qualsiasi-pagina> serve la stessa rotta italiana, in inglese
  const routedLocation = hasEnPrefix(location.pathname)
    ? { ...location, pathname: stripEnPrefix(location.pathname) }
    : location;

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes location={routedLocation}>
            <Route element={<RootLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/chi-siamo" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/investitori" element={<Investors />} />
            <Route path="/investors" element={<Investors />} />
            <Route path="/invest" element={<Navigate to="/investitori" replace />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/fair-rent-pledge" element={<FairRentPledge />} />
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
            <Route path="/grazie" element={<ThankYou />} />
            <Route path="/thank-you" element={<ThankYou />} />
            <Route path="/vendi" element={<Sellers />} />
            <Route path="/sell" element={<Sellers />} />
            <Route path="/proprietari" element={<Navigate to="/vendi" replace />} />
            <Route path="/valutazione-immobile" element={<PropertyValuation />} />
            <Route path="/property-valuation" element={<PropertyValuation />} />
            <Route path="/scioperi-italia" element={<StrikeEmergencyDirectory />} />
            <Route path="/italy-strikes" element={<StrikeEmergencyDirectory />} />
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
            <Route path="/zone/nizza-millefonti-ospedali" element={<NizzaMillefontiOspedali />} />
            <Route path="/zones/nizza-millefonti-hospitals" element={<NizzaMillefontiOspedali />} />
            <Route path="/vendi-casa/lingotto-nizza-millefonti" element={<LingottoNizzaMillefontiSeller />} />
            <Route path="/sell-home/lingotto-nizza-millefonti" element={<LingottoNizzaMillefontiSeller />} />
            <Route path="/vendere-casa-senza-agenzia-torino" element={<VendereSenzaAgenzia />} />
            <Route path="/sell-without-agency-turin" element={<VendereSenzaAgenzia />} />
            <Route path="/vendere-casa-velocemente-torino" element={<VendereVelocemente />} />
            <Route path="/sell-house-fast-turin" element={<VendereVelocemente />} />
            <Route path="/comprare-casa-affittata-torino" element={<ComprareCasaAffittata />} />
            <Route path="/buy-rented-property-turin" element={<ComprareCasaAffittata />} />
            <Route path="/investire-immobiliare-torino" element={<InvestireImmobiliareTorino />} />
            <Route path="/property-investment-turin" element={<InvestireImmobiliareTorino />} />
            <Route path="/affitti-lingotto-ospedali-torino" element={<AffittiLingottoOspedali />} />
            <Route path="/rent-lingotto-hospitals-turin" element={<AffittiLingottoOspedali />} />
            <Route path="/accedi" element={<Auth />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/admin/leads" element={<LeadsAdmin />} />
            <Route path="/admin/seller-radar" element={<SellerRadarAdmin />} />

            <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </PageTransition>
    </AnimatePresence>
  );
};
