import React, { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import Pagination from "./Pagination";

import { Box, Typography, IconButton } from "@material-ui/core";
import LockIcon from "@material-ui/icons/LockOutlined";

import useStyles from "./styles";

function Gallery({
  children, 
  currentIndex, 
  amount, 
  isPurchased,
  
  onPayClick,
  onChangeIndex }) {
  const classes = useStyles();
  const [localIndex, setLocalIndex] = useState(currentIndex);

  const handleIndexChange = (index) => {
    setLocalIndex(index);
    onChangeIndex && onChangeIndex(index);
  };

  return (
    <Box className={classes.root}>
      {(amount !== 0 && !isPurchased) && (
        <Box className={classes.title}>
          <IconButton onClick={onPayClick}><LockIcon fontSize="large" /></IconButton>
          <Typography variant="h4">Unlock post for ${amount}</Typography>
        </Box>
      )}
      
      <SwipeableViews enableMouseEvents index={localIndex} onChangeIndex={handleIndexChange}>
        {children}
      </SwipeableViews>
      {(amount === 0 || isPurchased) && (
        <Pagination
          className={classes.pagination}
          dots={children.length}
          currentIndex={localIndex}
          onChangeIndex={handleIndexChange}
        />
      )}
    </Box>
  );
}

Gallery.propTypes = {
  children: PropTypes.any,
  currentIndex: PropTypes.number,
  amount: PropTypes.number,
  isPurchased: PropTypes.bool,

  onPayClick: PropTypes.func,
  onChangeIndex: PropTypes.func,
};

Gallery.defaultProps = {
  children: null,
  currentIndex: 0,
  amount: 0,
  isPurchased: false,

  onPayClick: undefined,
  onChangeIndex: undefined,
};

export default Gallery;
