import { Suspense, lazy } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { hasEnPrefix, stripEnPrefix } from "@/constants/routeAliases";
import { PageTransition } from "./PageTransition";
import { LoadingSpinner } from "./LoadingSpinner";
import { RootLayout } from "@/components/layout/RootLayout";
import Index from "@/pages/Index";

// Lazy load - secondary pages
const About = lazy(() => import("@/pages/About"));
const Investors = lazy(() => import("@/pages/Investors"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Privacy = lazy(() => import("@/pages/Privacy"));
const TerminiCondizioni = lazy(() => import("@/pages/TerminiCondizioni"));
const Students = lazy(() => import("@/pages/Students"));
const StudySpacesDirectory = lazy(() => import("@/pages/StudySpacesDirectory"));
const CheapEatsDirectory = lazy(() => import("@/pages/CheapEatsDirectory"));
const StudentServicesDirectory = lazy(() => import("@/pages/StudentServicesDirectory"));
const GymsDirectory = lazy(() => import("@/pages/GymsDirectory"));
const ThankYou = lazy(() => import("@/pages/ThankYou"));
const Sellers = lazy(() => import("@/pages/Sellers"));
const ContrattiLocazione = lazy(() => import("@/pages/ContrattiLocazione"));
const NeighborhoodsIndex = lazy(() => import("@/pages/NeighborhoodsIndex"));
const NeighborhoodPage = lazy(() => import("@/pages/NeighborhoodPage"));
const InvestorZonesIndex = lazy(() => import("@/pages/InvestorZonesIndex"));
const InvestorZonePage = lazy(() => import("@/pages/InvestorZonePage"));
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
      <PageTransition key={location.pathname}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes location={routedLocation}>
            <Route element={<RootLayout />}>
            {/* Rotte canoniche italiane (la versione inglese è /en/<stessa-slug>) */}
            <Route path="/" element={<Index />} />
            <Route path="/chi-siamo" element={<About />} />
            <Route path="/investitori" element={<Investors />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/fair-rent-pledge" element={<FairRentPledge />} />
            <Route path="/termini-e-condizioni" element={<TerminiCondizioni />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="/studenti" element={<Students />} />
            <Route path="/strumenti/aule-studio-torino" element={<StudySpacesDirectory />} />
            <Route path="/strumenti/dove-mangiare-torino" element={<CheapEatsDirectory />} />
            <Route path="/strumenti/sportelli-studenti-torino" element={<StudentServicesDirectory />} />
            <Route path="/strumenti/palestre-torino-studenti" element={<GymsDirectory />} />
            <Route path="/grazie" element={<ThankYou />} />
            <Route path="/vendi" element={<Sellers />} />
            <Route path="/contratti-locazione" element={<ContrattiLocazione />} />
            <Route path="/investitori/zone" element={<InvestorZonesIndex />} />
            <Route path="/investitori/zone/:slug" element={<InvestorZonePage />} />
            <Route path="/affitto-stanza-torino" element={<NeighborhoodsIndex />} />
            <Route path="/affitto-stanza-torino/:slug" element={<NeighborhoodPage />} />
            <Route path="/accedi" element={<Auth />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
            <Route path="/admin/leads" element={<LeadsAdmin />} />
            <Route path="/admin/seller-radar" element={<SellerRadarAdmin />} />

            {/* Alias inglesi storici → /en/<slug italiana> */}
            <Route path="/about" element={<Navigate to="/en/chi-siamo" replace />} />
            <Route path="/investors" element={<Navigate to="/en/investitori" replace />} />
            <Route path="/investors/zones" element={<Navigate to="/en/investitori/zone" replace />} />
            <Route path="/investors/zones/:slug" element={<Navigate to="/en/investitori/zone" replace />} />
            <Route path="/terms" element={<Navigate to="/en/termini-e-condizioni" replace />} />
            <Route path="/students" element={<Navigate to="/en/studenti" replace />} />
            <Route path="/thank-you" element={<Navigate to="/en/grazie" replace />} />
            <Route path="/sell" element={<Navigate to="/en/vendi" replace />} />
            <Route path="/rental-contracts" element={<Navigate to="/en/contratti-locazione" replace />} />
            <Route path="/rooms-rent-turin" element={<Navigate to="/en/affitto-stanza-torino" replace />} />
            <Route path="/rooms-rent-turin/:slug" element={<Navigate to="/en/affitto-stanza-torino" replace />} />
            <Route path="/auth" element={<Navigate to="/en/accedi" replace />} />
            <Route path="/tools/study-spaces-turin" element={<Navigate to="/en/strumenti/aule-studio-torino" replace />} />
            <Route path="/tools/cheap-eats-turin" element={<Navigate to="/en/strumenti/dove-mangiare-torino" replace />} />
            <Route path="/tools/student-services-turin" element={<Navigate to="/en/strumenti/sportelli-studenti-torino" replace />} />
            <Route path="/tools/gyms-turin-students" element={<Navigate to="/en/strumenti/palestre-torino-studenti" replace />} />

            {/* Rotte dismesse */}
            <Route path="/faq" element={<Navigate to="/" replace />} />
            <Route path="/invest" element={<Navigate to="/investitori" replace />} />
            <Route path="/proprietari" element={<Navigate to="/vendi" replace />} />
            <Route path="/valutazione-immobile" element={<Navigate to="/vendi" replace />} />
            <Route path="/property-valuation" element={<Navigate to="/vendi" replace />} />
            <Route path="/studenti/strumenti/*" element={<Navigate to="/studenti" replace />} />
            <Route path="/students/tools/*" element={<Navigate to="/en/studenti" replace />} />
            <Route path="/tools" element={<Navigate to="/studenti" replace />} />
            <Route path="/scioperi-italia" element={<Navigate to="/studenti" replace />} />
            <Route path="/italy-strikes" element={<Navigate to="/en/studenti" replace />} />
            <Route path="/strumenti/servizi-studenti-torino" element={<Navigate to="/strumenti/sportelli-studenti-torino" replace />} />
            <Route path="/zone/nizza-millefonti-ospedali" element={<Navigate to="/investitori" replace />} />
            <Route path="/zones/nizza-millefonti-hospitals" element={<Navigate to="/investitori" replace />} />
            <Route path="/vendi-casa/lingotto-nizza-millefonti" element={<Navigate to="/vendi" replace />} />
            <Route path="/sell-home/lingotto-nizza-millefonti" element={<Navigate to="/vendi" replace />} />
            <Route path="/vendere-casa-senza-agenzia-torino" element={<Navigate to="/vendi" replace />} />
            <Route path="/sell-without-agency-turin" element={<Navigate to="/en/vendi" replace />} />
            <Route path="/vendere-casa-velocemente-torino" element={<Navigate to="/vendi" replace />} />
            <Route path="/sell-house-fast-turin" element={<Navigate to="/en/vendi" replace />} />
            <Route path="/comprare-casa-affittata-torino" element={<Navigate to="/investitori" replace />} />
            <Route path="/buy-rented-property-turin" element={<Navigate to="/en/investitori" replace />} />
            <Route path="/investire-immobiliare-torino" element={<Navigate to="/investitori" replace />} />
            <Route path="/property-investment-turin" element={<Navigate to="/en/investitori" replace />} />
            <Route path="/affitti-lingotto-ospedali-torino" element={<Navigate to="/investitori" replace />} />
            <Route path="/rent-lingotto-hospitals-turin" element={<Navigate to="/en/investitori" replace />} />

            <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </PageTransition>
  );
};
