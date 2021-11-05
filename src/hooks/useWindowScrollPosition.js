import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function useWindowScrollPosition(
  data,
  scrollPosition,
  actionCreator
) {
  const dispatch = useDispatch();

  useEffect(
    () => () => {
      handleSetScrollPosition(window.scrollY);
    },
    []
  );

  const handleScrollPosition = () => {
    if (scrollPosition && data?.length) {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      setTimeout(() => {
        window.scrollTo({
          top: scrollPosition,
          left: 0,
          behavior: "smooth",
        });
      }, 0);
    } else {
      window.scrollTo(0, 0);
    }
  };

  const handleSetScrollPosition = (value) => {
    dispatch(actionCreator(value));
  };

  return handleScrollPosition;
}
