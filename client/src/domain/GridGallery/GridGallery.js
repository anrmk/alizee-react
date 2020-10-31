import React from "react";
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

import Spinner from '../../components/Spinner';
import Tile from "./Tile";

import "./GridGallery.scss";

function GridGallery({ 
  items,
  hasMore,

  onFetchMore,
  onItemClick
}) {
  return (
    <InfiniteScroll
      className="row row-cols-3 no-gutters  grid-gallery"
      scrollThreshold={1}
      dataLength={items.length}
      next={onFetchMore}
      hasMore={hasMore}
      loader={<Spinner />}>
      {items 
        && items.length > 0 
        && items.map(item => (
          <Tile  
            key={item?.id}
            id={item?.id}
            amount={item?.amount}
            caption={item?.caption}
            media={item?.media}
            onClick={onItemClick} />
        ))}
    </InfiniteScroll>
  );
}

GridGallery.propTypes = {
  items: PropTypes.array,
  hasMore: PropTypes.bool,

  onFetchMore: PropTypes.func,
  onItemClick: PropTypes.func
}

GridGallery.defaultProps = {
  items: [],
  hasMore: false,

  onFetchMore: undefined,
  onItemClick: undefined
}

export default GridGallery;
