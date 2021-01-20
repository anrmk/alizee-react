import { useEffect, useState } from "react";

import useViewport from "./useViewport";

export const LEFT_OPEN_TYPE = 0;
export const BOTH_OPEN_TYPE = 1;
export const RIGHT_OPEN_TYPE = 2;

export default function useSlidingViews(priorityView = LEFT_OPEN_TYPE) {
  const [currentState, setCurrentState] = useState(priorityView);
  const { up } = useViewport();

  useEffect(() => {
    if (!up("md")) {
      setCurrentState(priorityView);
    } else {
      toggleState(BOTH_OPEN_TYPE);
    }
  }, []);

  const toggleState = () => {
    if (!up("md")) {
      if (currentState === BOTH_OPEN_TYPE) {
        setCurrentState(getView(priorityView));
      } else {
        setCurrentState((prev) => prev === priorityView ? getView(priorityView) : priorityView);
      }
    } else {
      setCurrentState((prev) => prev === priorityView ? BOTH_OPEN_TYPE: priorityView);
    }
  }

  const getView = (view) => {
    return view === RIGHT_OPEN_TYPE ? LEFT_OPEN_TYPE : RIGHT_OPEN_TYPE;
  }

  return {
    currentSlidingViewsState: currentState,
    toggleSlidingViewsState: toggleState,
    priorityViewSlidingViews: priorityView
  };
};
