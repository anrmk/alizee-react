import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useLocationHelper(routes) {
  const [isIncluded, setIsIncluded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (routes.find(item => pathname.includes(item.toString()))) {
      setIsIncluded(true);
    } else if (isIncluded) {
      setIsIncluded(false);
    }
  }, [pathname]);

  return isIncluded;
}
