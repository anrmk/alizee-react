import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useHideNavigation(route) {
  const [isHide, setIsHide] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes(route)) {
      setIsHide(true);
    } else if (isHide) {
      setIsHide(false);
    }
  }, [pathname]);

  return isHide;
}
