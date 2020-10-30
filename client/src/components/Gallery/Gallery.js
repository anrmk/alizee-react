import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';

import Pagination from './Pagination';

function Gallery({ 
  children, 
  currentIndex, 
  containerStyle,
  onChangeIndex 
}) {
  const [localIndex, setLocalIndex] = useState(currentIndex);

  const handleIndexChange = index => {
    setLocalIndex(index);
    onChangeIndex && onChangeIndex(index);
  }

  return (
    <div className="gallery">
      <SwipeableViews 
        containerStyle={{ ...containerStyle }}
        enableMouseEvents 
        index={localIndex} 
        onChangeIndex={handleIndexChange}>
        {children}
      </SwipeableViews>
      <Pagination 
        dots={children.length} 
        currentIndex={localIndex}
        onChangeIndex={handleIndexChange} />
    </div>
  )
}

Gallery.propTypes = {
  children: PropTypes.any,
  currentIndex: PropTypes.number,
  containerStyle: PropTypes.any,

  onChangeIndex: PropTypes.func
}

Gallery.defaultProps = {
  children: null,
  currentIndex: 0,
  containerStyle: {},

  onChangeIndex: undefined
};

export default Gallery;
