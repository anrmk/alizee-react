import React from "react";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

import { Typography } from "@material-ui/core";

import GridGalleryUserList from "./GridGalleryUserList";
import GridGalleryPostList from "./GridGalleryPostList";

import useStyle from "./styles";

function GridGallery(props) {
  const { isUserView, items, hasMore } = props;
  const { onFetchMore, onItemClick } = props;

  const classes = useStyle();

  return (
     !items || items.length == 0 ?
     !isUserView && <Typography className={classes.defaultLabel}>Start capturing and sharing your moments.</Typography>
      : <InfiniteScroll
        className={classes.root}
        dataLength={items.length}
        next={onFetchMore}
        hasMore={hasMore}
        endMessage="The end!"
        loader={items.length ? "Loading..." : undefined}
      >
        {isUserView ? <GridGalleryUserList items={items} onItemClick={onItemClick} />
        : <GridGalleryPostList items={items} onItemClick={onItemClick} />}
      </InfiniteScroll>
  );
}

GridGallery.propTypes = {
  items: PropTypes.array,
  isUserView: PropTypes.bool,
  hasMore: PropTypes.bool,
  width: PropTypes.string,

  onFetchMore: PropTypes.func,
  onItemClick: PropTypes.func,
};

GridGallery.defaultProps = {
  items: [],
  isUserView: false,
  hasMore: false,
  width: "",

  onFetchMore: undefined,
  onItemClick: undefined,
};

export default GridGallery;
