import React from "react";
import { Box } from "@material-ui/core";

import useStyles from "./styles";

export default function Progress({
  width,
  active,
  count,
  pause,
  bufferAction,
}) {
  const classes = useStyles({
    width,
    active,
    count,
    pause,
    bufferAction,
  });

  return (
    <Box className={classes.progressOuter}>
      <Box className={classes.progressInner} />
    </Box>
  );
}
