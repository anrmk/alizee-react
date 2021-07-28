import React, { useState } from "react";
import clsx from "clsx";
import SwipeableViews from "react-swipeable-views";

import { Box, Typography, IconButton, Hidden } from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined";
import ArrowButtons from "./ArrowButtons";
import Pagination from "./Pagination";

import useStyles from "./styles";

function Gallery({
  children,
  currentIndex,
  amount,
  isPurchased,
  className,
  style,
  pagination = true,

  onPayClick,
  onChangeIndex,
}) {
  const classes = useStyles();
  const [localIndex, setLocalIndex] = useState(currentIndex);

  const handleIndexChange = (index) => {
    setLocalIndex(index);
    onChangeIndex && onChangeIndex(index);
  };

  const handlePayClick = (e) => {
    e.stopPropagation();
    onPayClick && onPayClick();
  };

  return (
    <Box className={clsx(classes.root, className)} style={style}>
      {amount !== 0 && !isPurchased && (
        <Box className={classes.payableDescription}>
          <IconButton onClick={handlePayClick}>
            <LockIcon fontSize="large" />
          </IconButton>
          <Typography variant="h4">Unlock post for ${amount}</Typography>
        </Box>
      )}
      <SwipeableViews
        className={classes.swipeableView}
        slideClassName={classes.slide}
        enableMouseEvents
        index={localIndex}
        onChangeIndex={handleIndexChange}>
        {children}
      </SwipeableViews>
      {(amount === 0 || isPurchased) && (
        <>
          <Hidden smDown>
            {children.length > 1 && (
              <ArrowButtons
                length={children.length}
                currentIndex={localIndex}
                onChangeIndex={handleIndexChange}
              />
            )}
          </Hidden>

          {pagination && (
            <Pagination
              className={classes.pagination}
              dots={children.length}
              currentIndex={localIndex}
              onChangeIndex={handleIndexChange}
            />
          )}
        </>
      )}
    </Box>
  );
}

export default Gallery;
