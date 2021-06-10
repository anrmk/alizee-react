import React from "react";
import clsx from "clsx";
import { Grid, Box, Hidden } from "@material-ui/core";

import Footer from "../../components/Footer";
import ContainerLayout from "./ContainerLayout";

import useStyles from "./styles";

export default function TwoColumnLayout({
  isFullScreenHeight = true,
  baseClassName,
  containerClassName,
  innerGridClassName,
  footerBoxClassName,
  leftColProps = { sm: 6 },
  rightColProps = { sm: 6, md: 4, xs: 12 },
  children
}) {
  console.log(children)
  const classes = useStyles({ isFullScreenHeight });

  if (!children || children.length < 2 || !Array.isArray(children)) {
    console.warn(`Component(${TwoColumnLayout.name}) must have at least two children`);
    return null;
  }

  const [FirstComponent, SecondComponent, ...RestChildren] = children;

  return (
    <ContainerLayout
      isFullScreenHeight
      baseClassName={clsx(classes.twoColumnContainer, baseClassName)}
      className={containerClassName}>
      <Grid container className={clsx(classes.twoColumnGrid, innerGridClassName)}>
        <Hidden smDown>
          <Grid item {...leftColProps}>
            {FirstComponent}
          </Grid>
        </Hidden>
  
        <Grid item {...rightColProps}>
          {SecondComponent}
        </Grid>
      </Grid>
      {RestChildren}
  
      <Box className={footerBoxClassName}>
        <Footer open={true} />
      </Box>
    </ContainerLayout>
  )
}
