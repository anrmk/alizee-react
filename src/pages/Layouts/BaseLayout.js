import React from "react";
import clsx from "clsx";
import { Box } from "@material-ui/core";

import useStyles from "./styles";

export default function BaseLayout({
  isFullScreenHeight,
  className,
  children,
}) {
  const classes = useStyles({ isFullScreenHeight });

  return <Box className={clsx(classes.base, className)}>{children}</Box>;
}
