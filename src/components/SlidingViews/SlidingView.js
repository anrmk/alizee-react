import React from "react";
import { Box } from "@material-ui/core/";

import useStyles from "./styles";

export default function SlidingViews({ size, children }) {
  const classes = useStyles({ size });

  return <Box className={classes.slidingView}>{children}</Box>;
}
