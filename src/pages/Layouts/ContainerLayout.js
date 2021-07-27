import React from "react";
import clsx from "clsx";
import { Container } from "@material-ui/core";

import BaseLayout from "./BaseLayout";

import useStyles from "./styles";

export default function ContainerLayout({
  isFullScreenHeight,
  containerProps,
  baseClassName,
  className,
  children,
  beforeChildren,
  afterChildren
}) {
  const classes = useStyles({ isFullScreenHeight });

  return (
    <BaseLayout isFullScreenHeight={isFullScreenHeight}  className={baseClassName}>
      {beforeChildren}
      <Container {...containerProps} className={clsx(classes.container, className)}>
        {children}
      </Container>
      {afterChildren}
    </BaseLayout>
  )
}
