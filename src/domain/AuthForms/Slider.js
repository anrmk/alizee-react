import React from "react";
import clsx from "clsx";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import { Box } from "@material-ui/core";
import useStyles from "./styles";

function Slider() {
  const classes = useStyles();
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  return (
    <Box className={classes.authImage}>
      <AutoPlaySwipeableViews className={classes.swipe}>
        <div className={clsx(classes.slide, classes.slide1)}></div>
        <div className={clsx(classes.slide, classes.slide2)}></div>
        <div className={clsx(classes.slide, classes.slide3)}></div>
        <div className={clsx(classes.slide, classes.slide4)}></div>
      </AutoPlaySwipeableViews>
    </Box>
  );
}

export default Slider;
