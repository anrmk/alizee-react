import React, { useState } from "react";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";

import Pagination from "./Pagination";

import useStyles from "./styles";

function Gallery({ children, currentIndex, containerStyle, onChangeIndex }) {
  const classes = useStyles();
  const [localIndex, setLocalIndex] = useState(currentIndex);

  const handleIndexChange = (index) => {
    setLocalIndex(index);
    onChangeIndex && onChangeIndex(index);
  };

  return (
    <div className={classes.root}>
      <SwipeableViews enableMouseEvents index={localIndex} onChangeIndex={handleIndexChange}>
        {children}
      </SwipeableViews>
      <Pagination
        className={classes.pagination}
        dots={children.length}
        currentIndex={localIndex}
        onChangeIndex={handleIndexChange}
      />
    </div>
  );
}

Gallery.propTypes = {
  children: PropTypes.any,
  currentIndex: PropTypes.number,
  containerStyle: PropTypes.any,

  onChangeIndex: PropTypes.func,
};

Gallery.defaultProps = {
  children: null,
  currentIndex: 0,
  containerStyle: {},

  onChangeIndex: undefined,
};

export default Gallery;
