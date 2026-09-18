import { Outlet } from "react-router-dom";
import { Navigation } from "./Navigation";
import { Footer } from "./Footer";
import { BottomNav } from "./BottomNav";

export const RootLayout = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navigation />
      <div className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </div>
      <Footer />
      <BottomNav />
    </div>
  );
};

export default RootLayout;
