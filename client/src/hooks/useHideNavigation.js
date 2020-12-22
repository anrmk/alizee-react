import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";

export default function useHideNavigation(route) {
  const [isHide, setIsHide] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes(route) && !isHide) {
      setIsHide(true);
    } else if (isHide) {
      setIsHide(false);
    }
  }, [pathname]);

  return isHide;
}
