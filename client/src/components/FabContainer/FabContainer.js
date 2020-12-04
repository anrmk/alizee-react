import React from "react";
import clsx from "clsx";
import { Box, Fab } from "@material-ui/core";

import useStyles from "./styles";

function FabContainer({
  className,
  fabClassName,
  children,
  iconComponent,
  component: Component = Box,
  fabHide = false,

  onFabClick
}) {
  const classes = useStyles();

  return (
    <Component className={className}>
      {children}
      {!fabHide && 
        <Fab
          aria-label="Add"
          color="primary"
          className={clsx(classes.fab, fabClassName)}
          onClick={onFabClick}>
          {iconComponent}
        </Fab>
      }
    </Component>
  )
}

export default FabContainer;
