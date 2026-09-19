import { Outlet, useLocation } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";
import { PageTransition } from "../PageTransition";

export const RootLayout = () => {
  const location = useLocation();

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <main className="flex-1 pb-[calc(4rem+env(safe-area-inset-bottom))] md:pb-0">
        <PageTransition key={location.pathname}>
          <Outlet />
        </PageTransition>
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default RootLayout;
