import React from "react";
import { Box } from "@material-ui/core/";

import { LEFT_OPEN_TYPE, BOTH_OPEN_TYPE, RIGHT_OPEN_TYPE } from "../../hooks/useSlidingViews";
import useViewport from "../../hooks/useViewport";
import SlidingView from "./SlidingView";

import useStyles from "./styles";

const FULL_WIDTH = 12;
const HIDE_WIDTH = 0;

const SlidingViews = ({
  priorityState = LEFT_OPEN_TYPE,
  currentState = BOTH_OPEN_TYPE,
  firstSize = 5,
  secondSize = 5,
  mobileOnly = false,
  children
}) => {
  const classes = useStyles();
  const { up } = useViewport();

  if (!children || children.length !== 2) {
    console.warn(`Component(${SlidingViews.name}) must have two children`);
    return null;
  }

  const [FirstViewComponent, SecondViewComponent] = children;

  const getCurrentState = (state, size) => {
    if (!up("md")) {
      if (state === currentState || currentState === BOTH_OPEN_TYPE && state === priorityState) {
        return FULL_WIDTH;
      } else {
        return HIDE_WIDTH;
      }
    }

    if (state === priorityState && state === currentState && !mobileOnly) {
      return FULL_WIDTH;
    } else if (priorityState !== state && priorityState === currentState && !mobileOnly) {
      return HIDE_WIDTH;
    }

    return size;
  }

  return (
    <Box className={classes.slidingViewsRoot}>
      <SlidingView size={getCurrentState(LEFT_OPEN_TYPE, firstSize)}>
        {FirstViewComponent}
      </SlidingView>
      <SlidingView size={getCurrentState(RIGHT_OPEN_TYPE, secondSize)}>
        {SecondViewComponent}
      </SlidingView>
    </Box>
  );
}

export default SlidingViews;
