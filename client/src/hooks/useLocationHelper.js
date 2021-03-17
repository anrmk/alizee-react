import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function useLocationHelper(route) {
  const [isIncluded, setIsIncluded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.includes(route)) {
      setIsIncluded(true);
    } else if (isIncluded) {
      setIsIncluded(false);
    }
  }, [pathname]);

  return isIncluded;
}
