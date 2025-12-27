import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export const ScrollToTopOnNavigation = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use instant scroll to ensure page starts at top immediately
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
