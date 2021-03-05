import React, { useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SwipeableViews from "react-swipeable-views";

import ArrowButtons from "./ArrowButtons";
import Pagination from "./Pagination";

import { Box, Typography, IconButton } from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles";

function Gallery({
  children, 
  currentIndex, 
  amount, 
  isPurchased,
  className,
  
  onPayClick,
  onChangeIndex
}) {
  const classes = useStyles();
  const [localIndex, setLocalIndex] = useState(currentIndex);

  const handleIndexChange = (index) => {
    setLocalIndex(index);
    onChangeIndex && onChangeIndex(index);
  };

  return (
    <Box className={clsx(classes.root, className)}>
      {(amount !== 0 && !isPurchased) && (
        <Box className={classes.payableDescription}>
          <IconButton onClick={onPayClick}><LockIcon fontSize="large" /></IconButton>
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
          {children.length > 1
            && <ArrowButtons length={children.length} currentIndex={localIndex} onChangeIndex={handleIndexChange} />}
          <Pagination
            className={classes.pagination}
            dots={children.length}
            currentIndex={localIndex}
            onChangeIndex={handleIndexChange}
          />
        </>
      )}
    </Box>
  );
}

Gallery.propTypes = {
  children: PropTypes.any,
  currentIndex: PropTypes.number,
  amount: PropTypes.number,
  isPurchased: PropTypes.bool,
  className: PropTypes.any,

  onPayClick: PropTypes.func,
  onChangeIndex: PropTypes.func,
};

Gallery.defaultProps = {
  children: null,
  currentIndex: 0,
  amount: 0,
  isPurchased: false,
  className: null,

  onPayClick: undefined,
  onChangeIndex: undefined,
};

export default Gallery;
