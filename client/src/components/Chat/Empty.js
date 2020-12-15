import React from "react";
import { Box, Typography } from "@material-ui/core";

import useStyles from "./styles";

function Empty({
  title,
  subTitle,
  iconComponent
}) {
  const classes = useStyles();

  return (
    <Box className={classes.emptyMessageContainer}>
      {iconComponent}
      {title && <Typography variant="h6">{title}</Typography>}
      {subTitle && <Typography variant="body1">{subTitle}</Typography>}
    </Box>
  );
}

export default Empty;
