import React from 'react';
import PropTypes from 'prop-types';

import "./Gallery.scss";

function Pagination({ dots, currentIndex, onChangeIndex }) {
  if (dots <= 1) return null;

  const handleDotClick = index => {
    onChangeIndex && onChangeIndex(index);
  }

  return (
    <div className="pagination">
      <ol>
        {dots > 0 && [...Array(dots)].map((_, i) => (
          <li
            className={`${currentIndex === i ? 'active' : ''}`}
            key={i}
            onClick={() => handleDotClick(i)} />
        ))}
      </ol>
    </div>
  )
}

Pagination.propTypes = {
  dots: PropTypes.number,
  currentIndex: PropTypes.number,
  onChangeIndex: PropTypes.func
}

Pagination.defaultProps = {
  dots: 0,
  currentIndex: 0,
  onChangeIndex: undefined
};

export default Pagination;
